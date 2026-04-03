import { OTIO_Base } from "./OTIO_base.mjs";
import { Duration, RationalTime } from "./Rational_base.mjs";
export declare class ExternalReferance extends OTIO_Base {
    OTIO_SCHEMA: string;
    name: string;
    available_range: Duration;
    available_image_bounds: null;
    target_url: string;
    constructor(targetUrl: string);
    setLength(duration: RationalTime): void;
}
export declare class ExternalReferance_wrapper {
    DEFAULT_MEDIA: ExternalReferance;
    constructor(duration: RationalTime);
    set_url(url: string): void;
}
//# sourceMappingURL=clip_source.d.mts.map