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



import type { PathLike } from "node:fs";
import { readFile, type FileHandle} from "node:fs/promises";

//since the promises code doesn't define this (for some reason) I guess I'll do it here. 
type PathOrFileHandle = PathLike|FileHandle; 



export function normalize_url(path:string){ 
    if(path.at(-1) == "/"){
        return `${path}index.html`; 
    }
    console.log(path); 
    if(!path.includes(".")){ 
        return `${path}/index.html`; 
    }
    return path; 
}
export function get_path_from_url(path:string){ 
    let pop = path.includes("."); 
    
    let arr = path.split("/"); 
    return arr.filter((e)=>{
        if(!e) return false; 
        
        if(e.includes('.')) return false; 
        console.log(e); 
        
        return true; 
    }) 
}
export function stringify_ingore_priv(key: string, value: any) {
    if (key[0] == "_") {
        return undefined;
    }
    return value;
}
export function mime_type_from_file_extesion(ext:string):string{ 
    let text_type = "text/";
    console.log(ext.toLowerCase()); 
    switch(ext.toLowerCase()) { 
        case "html" : return `${text_type}html`;
        case "js"   : return `${text_type}javascript`; 
        case "css"  : return `${text_type}css`;
        case "json" : return "application/json"
        default     : return "text/plain"; 

    } 
}
export async function read_file(path:PathOrFileHandle){
    try{ 
        return await readFile(path); 
    }catch(e){ 
        console.error(e); 
        return false; 
    }
}