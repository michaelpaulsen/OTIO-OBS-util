import * as constants from "./constants.mjs";
import { Duration, RationalTime } from "./Rational_base.mjs";
export class Marker {
    OTIO_SCHEMA = constants.MARKER_SCHEMA;
    metadata = {};
    name = "";
    color = "CYAN";
    marked_range;
    comment = "marker";
    constructor(tp) {
        console.log(tp);
        this.marked_range = new Duration(tp.value, 1, tp.rate);
        console.log(this);
    }
}
//# sourceMappingURL=Marker.mjs.map