import { OTIO_Base } from "./OTIO_base.mjs";
import { Track } from "./Track.mjs";
import { TIME_LINE_SCHEMA } from "./constants.mjs";
import { TrackList } from "./TrackList.mjs";
import { Clip } from "./Clip.mjs";
import { RationalTime } from "./Rational_base.mjs";
import { Marker } from "./Marker.mjs";
export class Timeline extends OTIO_Base {
    OTIO_SCHEMA = TIME_LINE_SCHEMA;
    name = "";
    global_start_time = null;
    tracks = new TrackList();
    _current_clip_start_frame = 0;
    _fps;
    constructor(fps) {
        super();
        this._fps = fps;
    }
    add_marker(tp) {
        if (tp instanceof RationalTime) {
            tp.value += this._current_clip_start_frame;
        }
        else {
            tp.marked_range.start_time.value += this._current_clip_start_frame;
        }
        this.tracks.add_track_marker(tp);
    }
    add_track(track) {
        this.tracks.add_track(track);
    }
    add_clip_to_all_tracks(clip) {
        for (let track of this.tracks.children) {
            track.add_clip(clip);
        }
    }
    update_cursor_pos(frames) {
        this._current_clip_start_frame += frames;
    }
}
//# sourceMappingURL=Timeline.mjs.map