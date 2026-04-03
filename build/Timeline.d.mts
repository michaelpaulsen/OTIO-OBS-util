import { OTIO_Base } from "./OTIO_base.mjs";
import { Track } from "./Track.mjs";
import { TrackList } from "./TrackList.mjs";
import { Clip } from "./Clip.mjs";
import { RationalTime } from "./Rational_base.mjs";
import { Marker } from "./Marker.mjs";
export declare class Timeline extends OTIO_Base {
    OTIO_SCHEMA: string;
    name: string;
    global_start_time: null;
    tracks: TrackList;
    _current_clip_start_frame: number;
    _fps: number;
    constructor(fps: number);
    add_marker(tp: RationalTime | Marker): void;
    add_track(track: Track): void;
    add_clip_to_all_tracks(clip: Clip): void;
    update_cursor_pos(frames: number): void;
}
//# sourceMappingURL=Timeline.d.mts.map