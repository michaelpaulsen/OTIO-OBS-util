'use strict';
//node stuff
import { createServer, IncomingMessage, ServerResponse } from "node:http";
import { writeFile, readFile } from "node:fs/promises";
//OBS stuff.
import OBSWebSocket from "obs-websocket-js";
import { await_connection } from "./connect.mjs";
//OTIO stuff
import { Timeline } from "./Timeline.mjs";
import { Clip } from "./Clip.mjs";
import { AudioTrack, VideoTrack } from "./Track.mjs";
import { RationalTime } from "./Rational_base.mjs";
import { Marker } from "./Marker.mjs";
//non node server Stuff..
import { get_path_from_url, mime_type_from_file_extesion, normalize_url, read_file, stringify_ingore_priv } from "./util.mjs";
import { GetOutputStatus } from "./obs.mjs";
console.log("--- NEW INSTANCE ---");
console.log("");
console.log("");
const DOC_ROOT = "html";
let tl = new Timeline(0);
let fps = 0;
let clip = null;
const obs = new OBSWebSocket();
await await_connection(obs);
let sts = (await GetOutputStatus(obs));
if (sts.outputActive) {
    clip = new Clip(new RationalTime(fps, sts.outputTotalFrames));
}
{
    let { fpsNumerator, fpsDenominator } = await obs.call("GetVideoSettings");
    fps = fpsNumerator / fpsDenominator;
}
//OBS EVENTS
obs.on("ConnectionClosed", () => {
    console.log("OBS DISCONECTED CLOSING!");
    process.exit(0);
});
obs.on("RecordStateChanged", async (e) => {
    if (e.outputState == 'OBS_WEBSOCKET_OUTPUT_STARTED') {
        clip = new Clip(new RationalTime(0, fps));
        return;
    }
    if (e.outputState == 'OBS_WEBSOCKET_OUTPUT_STOPPED') {
        let t = await GetOutputStatus(obs);
        if (clip == null) {
            console.error("[ERROR] Clip Ended Without Starting");
            return;
        }
        clip.source_range.duration.value = t.outputTotalFrames;
        clip.set_url(e.outputPath);
        tl.tracks.children.forEach(element => {
            element.add_clip(clip);
        });
        //tl.add_clip_to_all_tracks(clip);
        tl.update_cursor_pos(t.outputTotalFrames);
        clip = null;
        return;
    }
    console.log(`-- un handled event type ${e.outputState} --`);
});
//Since OTIO doesn't support MTA out of the box we
//only add one track, to prevent NLEs from not adding the audio properly.
tl.add_track(new VideoTrack(fps));
tl.add_track(new AudioTrack(fps));
function add_marker_to_timeline(tl, tp) {
    if (tp instanceof Marker) {
        tl.tracks.markers.push(tp);
        return;
    }
    tl.tracks.markers.push(new Marker(tp));
}
console.log();
async function main(request, response) {
    let url = new URL(`http://${process.env.HOST ?? 'localhost'}${request.url}`);
    let headers = {};
    console.log();
    if (url.pathname == "/favicon.ico") {
        //todo make this work.
        headers["content-type"] = "text/plain";
        response.writeHead(200, "OK", headers);
        response.end("OK");
        return;
    }
    let res = {
        status: 200,
        message: "<p class ='okay'>OK</p>"
    };
    //switch(get_path_from_url())
    let pathname = `./${DOC_ROOT}${normalize_url(`${url.pathname}`)}`;
    let path = get_path_from_url(url.pathname);
    console.log({ path });
    if (path[0] == "add") {
        if (path[1] == "marker") {
            if (!clip) {
                response.writeHead(500, "NO CLIP", {
                    "content-type": "aplication/json"
                });
                res.message = `<h3 class = error>NO CLIP</h3>
                <p>The server has no clip this usually means that the main output of your OBS is not recording</p>
                <p>if you are recording and still seeing this that meansthat something went <i>wrong</i>
                <br>
                please see this for trouble shooting steps : <a href="#">trouble shooting</a>
                <br>
                if that doesn't help please make a bug report here: <a href="#">bug reports</a>.
                `;
                res.status = 500;
                response.end(JSON.stringify(res));
                return;
            }
            let rt = new RationalTime(fps, ((await GetOutputStatus(obs)).outputTotalFrames));
            let marker = new Marker(rt);
            marker.comment = url.searchParams.get("comment") ?? "Marker";
            add_marker_to_timeline(tl, marker);
            ;
            res.message = `<p> added marker with comment ${marker.comment}</p>
                <p> total markers : ${tl.tracks.markers.length}</p> 
            `;
            response.writeHead(200, "OK", headers);
            response.end(JSON.stringify(res));
            return;
        }
    }
    if (path[0] == "load") {
        console.log();
        let newFile = url.searchParams.get("file");
        if (newFile == null) {
            response.writeHead(400, "BAD REQUEST", {
                "content-type": "application/json"
            });
            res.status = 400;
            res.message = `<p class = "error">No file given to load cannot load</p>`;
            response.end(JSON.stringify(res));
            return;
        }
        try {
            let new_tl_json = JSON.parse((await readFile(`./out/${newFile}`)).toString());
            tl = new_tl_json;
            res.status = 500;
            res.message = `<p class = "Ok"> Loaded file ./out/${newFile}</p>`;
            response.writeHead(200, "OK", {
                "content-type": "application/json"
            });
            response.end(JSON.stringify(res));
        }
        catch (e) {
            console.log(e);
            res.status = 500;
            res.message = `<p class = "error"> ${JSON.stringify(e)}</p>`;
            response.writeHead(500, "OK", {
                "content-type": "application/json"
            });
            response.end(JSON.stringify(res));
        }
        return;
    }
    if (path[0] == "save") {
        let xprt = JSON.stringify(tl, stringify_ingore_priv);
        try {
            let date = new Date();
            let f_name = `${date.getFullYear()}_${date.getMonth() + 1}_${date.getDate()}`;
            f_name += `T${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`;
            console.log(f_name);
            await writeFile(`./out/${f_name}.otio`, xprt);
            res.message = `<p class = "ok"> saved time line to ./out/${f_name}.otio<p>`;
            response.writeHead(200, "OK", {
                "content-type": "application/json"
            });
            response.end(JSON.stringify(res));
        }
        catch (e) {
            console.log(e);
        }
        return;
    }
    let mime = mime_type_from_file_extesion(pathname.split(".").at(-1) ?? "");
    let a = (await read_file(pathname));
    console.log({ mime });
    headers["content-type"] = mime;
    if (!!a) {
        response.writeHead(200, "OK", headers);
        response.end(a.toString());
    }
    else {
        headers["content-type"] = "text/html";
        response.writeHead(404, "NOT FOUND", headers);
        response.end(`
            <html>
                <body>
                    <h1> ${pathname} is not found on this server!</h1>
                    <p> the file ${pathname} does not exist</p>
                </body>
            </html>
        `);
    }
}
createServer(main).listen(8000);
//# sourceMappingURL=index.js.map