/*
     OTIO-OBS-util 
    Copyright (C) 2026  Michael "Skeleton_craft" Paulsen

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

import { TRACK_SCHEMA,AUDIO_TRACK,VIDEO_TRACK } from "./constants.mjs";
import { Duration } from "./Rational_base.mjs";
import { Clip } from "./Clip.mjs";
import type { color_t } from "./constants.mjs";
import type { Marker } from "./Marker.mjs";
export class Track {
    OTIO_SCHEMA: string = TRACK_SCHEMA;
    metadata: { ffmpeg_audio_stream: number} | {}= {}; 
    name:        string = "";
    source_range:Duration;
    effects:     any[] =[]; 
    markers:     Marker[] =[]
    enabled:     boolean = true;
    color:       color_t= null;
    children:    Clip[] = [];
    constructor(fps:number) {
        this.source_range = new Duration(0, 0, fps);
    }
    add_clip(clip:Clip){ 
        this.children.push(clip);
        //FIXME(skc): this assumes that the rate is the same for each clip. 
        //this is not nessiarily the case. Should implement a from value. 
        this.source_range.duration.value += clip.source_range.duration.value; 
    }

}
export class AudioTrack extends Track{
    kind = AUDIO_TRACK;
    static _track_id = 0;
    constructor(fps:number){ 
        super(fps);
        this.metadata = {ffmpeg_audio_stream : ++AudioTrack._track_id}; 
    }

}
export class VideoTrack extends Track{
    kind = VIDEO_TRACK;
}
