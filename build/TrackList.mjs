import { OTIO_Base } from "./OTIO_base.mjs";
import { STACK_SCHEMA } from "./constants.mjs";
import { Marker } from "./Marker.mjs";
import { Track } from "./Track.mjs";
import { RationalTime } from "./Rational_base.mjs";
export class TrackList extends OTIO_Base {
    OTIO_SCHEMA = STACK_SCHEMA;
    name = "tracks";
    source_range = null;
    effects = [];
    markers = [];
    enabled = true;
    color = null;
    children = [];
    add_track_marker(tp) {
        if (tp instanceof RationalTime) {
            this.markers.push(new Marker(tp));
        }
        else {
            this.markers.push(tp);
        }
    }
    add_track(track) {
        this.children.push(track);
    }
}
//# sourceMappingURL=TrackList.mjs.map