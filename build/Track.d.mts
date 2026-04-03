import { Duration } from "./Rational_base.mjs";
import { Clip } from "./Clip.mjs";
import type { color_t } from "./constants.mjs";
import type { Marker } from "./Marker.mjs";
export declare class Track {
    OTIO_SCHEMA: string;
    metadata: {
        ffmpeg_audio_stream: number;
    } | {};
    name: string;
    source_range: Duration;
    effects: any[];
    markers: Marker[];
    enabled: boolean;
    color: color_t;
    children: Clip[];
    constructor(fps: number);
    add_clip(clip: Clip): void;
}
export declare class AudioTrack extends Track {
    kind: string;
    static _track_id: number;
    constructor(fps: number);
}
export declare class VideoTrack extends Track {
    kind: string;
}
//# sourceMappingURL=Track.d.mts.map