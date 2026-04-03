import type OBSWebSocket from "obs-websocket-js";
export declare function connect(obs: OBSWebSocket): Promise<boolean>;
export declare function await_connection(obs: OBSWebSocket, attempts?: number, connection_try?: number): Promise<unknown>;
export declare function disconnect(obs: OBSWebSocket): Promise<void>;
//# sourceMappingURL=connect.d.mts.map