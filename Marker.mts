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


import * as constants from "./constants.mjs" 
import { Duration, RationalTime } from "./Rational_base.mjs";
import type { color_t } from "./constants.mjs";
export class Marker{
    OTIO_SCHEMA = constants.MARKER_SCHEMA;
    metadata = {};
    name = "";
    color:color_t = "CYAN";
    marked_range:Duration;
    comment:string = "marker"; 
    constructor(tp: RationalTime){
        console.log(tp); 
        this.marked_range = new Duration(tp.value,1,tp.rate)
        console.log(this); 
    }

}