import { OBSWebSocket } from 'obs-websocket-js';
export const MAIN_OUT_SRC = "adv_file_output";
export async function GetOutputStatus(obs) {
    return await obs.call("GetOutputStatus", { "outputName": MAIN_OUT_SRC });
}
// class OBS_ObsStreamReport{ 
//     total_streams:number = 1;
//     active_streams:boolean[] = new Array(6);
// }
// async function get_active_streams(obs: OBSWebSocket): 
//     Promise<OBS_ObsStreamReport>  {
//         let {parameterValue} = await obs.call("GetProfileParameter",
//         {
//             "parameterCategory": "AdvOut",
//             "parameterName": "RecTracks"
//         });
//         let pv:number = Number(parameterValue); 
//         let ret:OBS_ObsStreamReport = new OBS_ObsStreamReport(); 
//         //start at one for the video stream
//         ret.total_streams = 1; 
//         for(let i = 0; i < 6; ++i){
//             ret.active_streams[i] = ((pv >>i) & 1) == 1;
//             ret["total_streams"] += (pv >>i) & 1;
//         }
//         return ret;
// }
// export {
//     OBS_ObsStreamReport,
//     get_active_streams
// }
//# sourceMappingURL=obs.mjs.map