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



import { OBSWebSocket} from 'obs-websocket-js';
export const MAIN_OUT_SRC = "adv_file_output";

export async function GetOutputStatus(obs:OBSWebSocket){ 
   return await obs.call(
            "GetOutputStatus",
            { "outputName": MAIN_OUT_SRC }
        );
}


// class OBS_ObsStreamReport{ 
//     total_streams:number = 1;
//     active_streams:boolean[] = new Array(6);

// }

// async function get_active_streams(obs: OBSWebSocket): 
//     Promise<OBS_ObsStreamReport>  {

//         let {parameterValue} = await obs.call("GetProfileParameter",
//         {
//             "parameterCategory": "AdvOut",
//             "parameterName": "RecTracks"
//         });
//         let pv:number = Number(parameterValue); 
//         let ret:OBS_ObsStreamReport = new OBS_ObsStreamReport(); 
//         //start at one for the video stream
//         ret.total_streams = 1; 


//         for(let i = 0; i < 6; ++i){
//             ret.active_streams[i] = ((pv >>i) & 1) == 1;
//             ret["total_streams"] += (pv >>i) & 1;
//         }
//         return ret;
// }
// export {
//     OBS_ObsStreamReport,
//     get_active_streams
// }
