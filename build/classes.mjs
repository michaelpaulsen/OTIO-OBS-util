import { OTIO_Base } from "./OTIO_base.mjs";
import { Track } from "./Track.mjs";
import { TIME_LINE_SCHEMA } from "./constants.mjs";
import { TrackList } from "./TrackList.mjs";
class Timeline extends OTIO_Base {
    OTIO_SCHEMA = TIME_LINE_SCHEMA;
    name = "";
    global_start_time = null;
    tracks = new TrackList();
    _last_frame = 0;
    _fps;
    constructor(fps) {
        super();
        this._fps = fps;
    }
    add_track_marker(start_frame) {
        this.tracks.add_track_marker(start_frame, this._fps);
    }
    add_track(track) {
        this.tracks.add_track(track);
    }
}
export { Timeline, TrackList };
//# sourceMappingURL=classes.mjs.map