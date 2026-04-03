import { readFile } from "node:fs/promises";
export function normalize_url(path) {
    if (path.at(-1) == "/") {
        return `${path}index.html`;
    }
    console.log(path);
    if (!path.includes(".")) {
        return `${path}/index.html`;
    }
    return path;
}
export function get_path_from_url(path) {
    let pop = path.includes(".");
    let arr = path.split("/");
    return arr.filter((e) => {
        if (!e)
            return false;
        if (e.includes('.'))
            return false;
        console.log(e);
        return true;
    });
}
export function stringify_ingore_priv(key, value) {
    if (key[0] == "_") {
        return undefined;
    }
    return value;
}
export function mime_type_from_file_extesion(ext) {
    let text_type = "text/";
    console.log(ext.toLowerCase());
    switch (ext.toLowerCase()) {
        case "html": return `${text_type}html`;
        case "js": return `${text_type}javascript`;
        case "css": return `${text_type}css`;
        case "json": return "application/json";
        default: return "text/plain";
    }
}
export async function read_file(path) {
    try {
        return await readFile(path);
    }
    catch (e) {
        console.error(e);
        return false;
    }
}
//# sourceMappingURL=util.mjs.map