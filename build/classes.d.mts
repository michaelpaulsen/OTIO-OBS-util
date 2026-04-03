import { OTIO_Base } from "./OTIO_base.mjs";
import { Track } from "./Track.mjs";
import { TrackList } from "./TrackList.mjs";
declare class Timeline extends OTIO_Base {
    OTIO_SCHEMA: string;
    name: string;
    global_start_time: null;
    tracks: TrackList;
    _last_frame: number;
    _fps: number;
    constructor(fps: number);
    add_track_marker(start_frame: number): void;
    add_track(track: Track): void;
}
export { Timeline, TrackList };
//# sourceMappingURL=classes.d.mts.map