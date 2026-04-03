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


import type OBSWebSocket from "obs-websocket-js";

export async function connect(obs : OBSWebSocket) {
	//since OBS can throw we need to wrap it in a try catch block
	try {
		//NOTE(skc): if you use a password on your obs websock[which you should]
		//you will need to edit this...
		await obs.connect("ws://127.0.0.1:4455", "password", {
			rpcVersion: 1,
		});
		return true;
	} catch (e) {
		//console.error(e);
		return false;
	}
}


export async function await_connection(obs:OBSWebSocket,attempts:number = 3, connection_try:number = 1){
	let t = await connect(obs);
	if(t) {
		return true;
	}
	if(!t) {
		console.log(`unable to connect ${connection_try}/${attempts}`);

		if(connection_try == 3)  {
			process.exit(0);
		}
		return new Promise(
			()=>{
				setTimeout(
					()=>{
						await_connection(obs,attempts, ++connection_try);
					}, 1000);
			}
		)


	}
}



export async function disconnect(obs: OBSWebSocket){
	try{
		await obs.disconnect();
	}catch(e){

	}
}

