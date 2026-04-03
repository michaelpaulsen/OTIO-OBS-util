import type { PathLike } from "node:fs";
import { type FileHandle } from "node:fs/promises";
type PathOrFileHandle = PathLike | FileHandle;
export declare function normalize_url(path: string): string;
export declare function get_path_from_url(path: string): string[];
export declare function stringify_ingore_priv(key: string, value: any): any;
export declare function mime_type_from_file_extesion(ext: string): string;
export declare function read_file(path: PathOrFileHandle): Promise<false | NonSharedBuffer>;
export {};
//# sourceMappingURL=util.d.mts.map