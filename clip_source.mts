
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
import { Duration, RationalTime } from "./Rational_base.mjs";
export class ExternalReferance extends OTIO_Base
{
OTIO_SCHEMA: string = "ExternalReference.1"; 
name: string =""; 
available_range:Duration; 
available_image_bounds:null = null;
target_url:string; 
constructor(targetUrl:string){ 
    super(); 
    this.target_url = targetUrl; 
    this.available_range = new Duration(0,0,0) ;
}
setLength(duration:RationalTime ){ 
    this.available_range.duration = duration; 
    this.available_range.start_time.rate = duration.rate; 
}

}

// I think that this could have more than one key if you use transions or something
// but since this is super simple I don't need any of that here!
export class ExternalReferance_wrapper{ 
    DEFAULT_MEDIA:ExternalReferance; 
    constructor(duration:RationalTime){ 
        this.DEFAULT_MEDIA = new ExternalReferance("")
        this.DEFAULT_MEDIA.available_range.duration = duration; 
        this.DEFAULT_MEDIA.setLength(duration); 
    }
    set_url(url:string) { 
        this.DEFAULT_MEDIA.target_url = url; 
    } 
}

