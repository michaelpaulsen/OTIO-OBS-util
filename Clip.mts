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
import {CLIP_SCHEMA} from "./constants.mjs"
import { Duration, RationalTime } from "./Rational_base.mjs";
import { Marker } from "./Marker.mjs";
import { ExternalReferance_wrapper } from "./clip_source.mjs";
export class Clip extends OTIO_Base{ 
    OTIO_SCHEMA :string   = CLIP_SCHEMA;
    name        :string   = ""; 
    source_range:Duration = new Duration(0,0,0); 
    effects     :any[]    = []; 
    markers     :Marker[] = [];
    enabled     :boolean  = true; 
    color       :null     = null; 
    media_references: ExternalReferance_wrapper; 
    active_media_reference_key = "DEFAULT_MEDIA"; 
    constructor( duration:RationalTime){ 
        super();
        
        this.media_references = 
        new ExternalReferance_wrapper(duration);
        this.source_range.duration = duration; 
        this.source_range.start_time.rate = duration.rate; 
        this.media_references.DEFAULT_MEDIA.setLength(duration);
    }
    add_marker(marker:Marker){ 
        console.log(typeof(marker)); 
        this.markers.push(marker);
    }
    set_url(url:string){ 
        let nm = url.split(/[\\/]/gm).at(-1); 
        if(nm != undefined){ 
            this.name = nm;  

        }
        this.media_references.set_url(url);

    }
}

