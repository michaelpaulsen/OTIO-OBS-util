import { OTIO_Base } from "./OTIO_base.mjs";
import { Duration, RationalTime } from "./Rational_base.mjs";
import { Marker } from "./Marker.mjs";
import { ExternalReferance_wrapper } from "./clip_source.mjs";
export declare class Clip extends OTIO_Base {
    OTIO_SCHEMA: string;
    name: string;
    source_range: Duration;
    effects: any[];
    markers: Marker[];
    enabled: boolean;
    color: null;
    media_references: ExternalReferance_wrapper;
    active_media_reference_key: string;
    constructor(duration: RationalTime);
    add_marker(marker: Marker): void;
    set_url(url: string): void;
}
//# sourceMappingURL=Clip.d.mts.map