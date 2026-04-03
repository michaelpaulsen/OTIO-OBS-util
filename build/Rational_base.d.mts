declare class RationalTime {
    OTIO_SCHEMA: string;
    rate: number;
    value: number;
    constructor(r: number, v: number);
}
declare class Duration {
    OTIO_SCHEMA: string;
    duration: RationalTime;
    start_time: RationalTime;
    constructor(start: number, duration: number, fps: number);
}
export { RationalTime, Duration };
//# sourceMappingURL=Rational_base.d.mts.map