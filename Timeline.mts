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


import { OTIO_Base } from "./OTIO_base.mjs";
import { Track } from "./Track.mjs";
import { TIME_LINE_SCHEMA } from "./constants.mjs";
import { TrackList } from "./TrackList.mjs";
import { Clip } from "./Clip.mjs";
import { RationalTime } from "./Rational_base.mjs";
import { Marker } from "./Marker.mjs";




export class Timeline extends OTIO_Base{
    OTIO_SCHEMA:string = TIME_LINE_SCHEMA
    name:string ="";
    global_start_time = null;
    tracks:TrackList = new TrackList();
    _current_clip_start_frame:number = 0;
    _fps:number; 
    constructor(fps:number){
        super(); 
        this._fps = fps;
    }
    add_marker(tp:RationalTime|Marker){
        if(tp instanceof RationalTime){ 
            tp.value += this._current_clip_start_frame; 
        }else { 
            tp.marked_range.start_time.value += this._current_clip_start_frame; 
        }
        this.tracks.add_track_marker(tp);
    }
    add_track(track:Track) {
        this.tracks.add_track(track); 
    }
    add_clip_to_all_tracks(clip:Clip){ 
        for(let track of this.tracks.children){ 
            track.add_clip(clip); 
            
        }
    }
    update_cursor_pos(frames: number){ 
        this._current_clip_start_frame += frames; 
    }

}

