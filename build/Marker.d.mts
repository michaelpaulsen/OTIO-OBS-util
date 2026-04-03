import { Duration, RationalTime } from "./Rational_base.mjs";
import type { color_t } from "./constants.mjs";
export declare class Marker {
    OTIO_SCHEMA: string;
    metadata: {};
    name: string;
    color: color_t;
    marked_range: Duration;
    comment: string;
    constructor(tp: RationalTime);
}
//# sourceMappingURL=Marker.d.mts.map