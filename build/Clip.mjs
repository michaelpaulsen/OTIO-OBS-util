import { OTIO_Base } from "./OTIO_base.mjs";
import { CLIP_SCHEMA } from "./constants.mjs";
import { Duration, RationalTime } from "./Rational_base.mjs";
import { Marker } from "./Marker.mjs";
import { ExternalReferance_wrapper } from "./clip_source.mjs";
export class Clip extends OTIO_Base {
    OTIO_SCHEMA = CLIP_SCHEMA;
    name = "";
    source_range = new Duration(0, 0, 0);
    effects = [];
    markers = [];
    enabled = true;
    color = null;
    media_references;
    active_media_reference_key = "DEFAULT_MEDIA";
    constructor(duration) {
        super();
        this.media_references =
            new ExternalReferance_wrapper(duration);
        this.source_range.duration = duration;
        this.source_range.start_time.rate = duration.rate;
        this.media_references.DEFAULT_MEDIA.setLength(duration);
    }
    add_marker(marker) {
        console.log(typeof (marker));
        this.markers.push(marker);
    }
    set_url(url) {
        let nm = url.split(/[\\/]/gm).at(-1);
        if (nm != undefined) {
            this.name = nm;
        }
        this.media_references.set_url(url);
    }
}
//# sourceMappingURL=Clip.mjs.map