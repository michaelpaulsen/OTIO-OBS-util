import { OBSWebSocket } from 'obs-websocket-js';
export declare const MAIN_OUT_SRC = "adv_file_output";
export declare function GetOutputStatus(obs: OBSWebSocket): Promise<{
    outputActive: boolean;
    outputReconnecting: boolean;
    outputTimecode: string;
    outputDuration: number;
    outputCongestion: number;
    outputBytes: number;
    outputSkippedFrames: number;
    outputTotalFrames: number;
}>;
//# sourceMappingURL=obs.d.mts.map