import { OTIO_Base } from "./OTIO_base.mjs"
import { STACK_SCHEMA } from "./constants.mjs"
import { Marker } from "./Marker.mjs"
import type { color_t } from "./constants.mjs"
import { Track } from "./Track.mjs"
import { RationalTime } from "./Rational_base.mjs"


export class TrackList extends OTIO_Base{
    OTIO_SCHEMA      = STACK_SCHEMA
    name:string  ="tracks";  
    source_range     = null
    effects:any[]    = []
    markers:Marker[] = []
    enabled:boolean  = true
    color:  color_t  = null;
    children:Track[] = []
    add_track_marker(tp: RationalTime|Marker){
        if(tp instanceof RationalTime){ 
            this.markers.push(new Marker(tp));
        }else{ 
            this.markers.push(tp); 
        }
    }
    add_track(track:Track) {
        this.children.push(track);
    }
}
