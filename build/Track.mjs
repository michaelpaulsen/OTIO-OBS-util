import { OTIO_Base } from "./OTIO_base.mjs";
import { TRACK_SCHEMA, AUDIO_TRACK, VIDEO_TRACK } from "./constants.mjs";
import { Duration } from "./Rational_base.mjs";
import { Clip } from "./Clip.mjs";
export class Track {
    OTIO_SCHEMA = TRACK_SCHEMA;
    metadata = {};
    name = "";
    source_range;
    effects = [];
    markers = [];
    enabled = true;
    color = null;
    children = [];
    constructor(fps) {
        this.source_range = new Duration(0, 0, fps);
    }
    add_clip(clip) {
        this.children.push(clip);
        //FIXME(skc): this assumes that the rate is the same for each clip. 
        //this is not nessiarily the case. Should implement a from value. 
        this.source_range.duration.value += clip.source_range.duration.value;
    }
}
export class AudioTrack extends Track {
    kind = AUDIO_TRACK;
    static _track_id = 0;
    constructor(fps) {
        super(fps);
        this.metadata = { ffmpeg_audio_stream: ++AudioTrack._track_id };
    }
}
export class VideoTrack extends Track {
    kind = VIDEO_TRACK;
}
//# sourceMappingURL=Track.mjs.map