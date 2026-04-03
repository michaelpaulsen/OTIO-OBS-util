import * as constants from "./constants.mjs";
//repersents value/rate as a number of seconds. 
//this allows for frame independant posintioning. 
//though the way that I use it rate will always be equal to the FPS. 
class RationalTime {
    OTIO_SCHEMA = "RationalTime.1";
    rate;
    value;
    constructor(r, v) {
        this.rate = r;
        this.value = v;
    }
}
class Duration {
    OTIO_SCHEMA = constants.MARKED_RANGE_SCHEMA;
    duration;
    start_time;
    constructor(start, duration, fps) {
        this.duration = new RationalTime(fps, duration);
        this.start_time = new RationalTime(fps, start);
    }
}
export { RationalTime, Duration };
//# sourceMappingURL=Rational_base.mjs.map