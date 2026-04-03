import { OTIO_Base } from "./OTIO_base.mjs";
import { Marker } from "./Marker.mjs";
import type { color_t } from "./constants.mjs";
import { Track } from "./Track.mjs";
import { RationalTime } from "./Rational_base.mjs";
export declare class TrackList extends OTIO_Base {
    OTIO_SCHEMA: string;
    name: string;
    source_range: null;
    effects: any[];
    markers: Marker[];
    enabled: boolean;
    color: color_t;
    children: Track[];
    add_track_marker(tp: RationalTime | Marker): void;
    add_track(track: Track): void;
}
//# sourceMappingURL=TrackList.d.mts.map