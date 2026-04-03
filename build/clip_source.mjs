import { OTIO_Base } from "./OTIO_base.mjs";
import { Duration, RationalTime } from "./Rational_base.mjs";
export class ExternalReferance extends OTIO_Base {
    OTIO_SCHEMA = "ExternalReference.1";
    name = "";
    available_range;
    available_image_bounds = null;
    target_url;
    constructor(targetUrl) {
        super();
        this.target_url = targetUrl;
        this.available_range = new Duration(0, 0, 0);
    }
    setLength(duration) {
        this.available_range.duration = duration;
        this.available_range.start_time.rate = duration.rate;
    }
}
// I think that this could have more than one key if you use transions or something
// but since this is super simple I don't need any of that here!
export class ExternalReferance_wrapper {
    DEFAULT_MEDIA;
    constructor(duration) {
        this.DEFAULT_MEDIA = new ExternalReferance("");
        this.DEFAULT_MEDIA.available_range.duration = duration;
        this.DEFAULT_MEDIA.setLength(duration);
    }
    set_url(url) {
        this.DEFAULT_MEDIA.target_url = url;
    }
}
//# sourceMappingURL=clip_source.mjs.map