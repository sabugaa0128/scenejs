/*@import FrameTimeline from "./FrameTimeline";*/
/*@import Frame from "./Frame";*/
/*@import {isUndefined, defineGetterSetter} from "./Util";*/

/*@export default */class SceneItem {
    static addRole(role) {

    }
    constructor() {
        this.options = {};
        this._playState = "paused";//paused|running|initial|inherit
        this.timeline = new FrameTimeline();
        this._currentTime = 0;
    }
    get currentTime() {
        return this._currentTime;
    }
    set currentTime(time) {
        this._currentTime = time;
    }
    get timingFunction() {
    }
    set timgingFunction(value) {
    }
    get duration() {
    }
    get playState() {
    }
    addName(name) {
        this.names[name] = true;
    }
    update() {

    }
    updateFrame(frame) {

    }
    newFrame(time) {
        const timeline = this.timeline;
        if(timeline.has(time))
            return this.getFrame(time);

        this.setFrame(time, new Frame());
        return this.getFrame(time);
    }
    setFrame(time, frame) {
        this.timeline.add(time, frame);
        return this;
    }
    getFrame(time) {
        return this.timeline.get(time);
    }
    getNowValue(time, role, property, left, right) {
        const timeline = this.timeline, times = timeline.times, length = times.length;

        let prevFrame, nextFrame, i;
        let prevTime = times[left], nextTime = times[right];

        if(time < prevTime)
            return;

        for(i = left; i >= 0; --i) {
            prevFrame = this.frames[times[i]];
            prevTime = times[i];
            if(prevFrame[role].has(property))
                break;
        }
        for(i = right; i < length; ++i) {
            nextFrame = this.frames[times[i]];
            nextTime = times[i];
            if(nextFrame[role].has(property))
                break;
        }

        const prevValue = prevFrame[name].get(property);
        if(isUndefined(prevValue))
            return;

        if(!nextFrame)
            return prevValue;

        const nextValue = nextFrame[name].get(property);

        if(isUndefined(nextValue))
            return prevValue;


        if(prevTime < 0)
            prevTime = 0;

        // 전값과 나중값을 시간에 의해 내적을 한다.

        let value = _u.dot(prevValue, nextValue, time - prevTime, nextFrame.time - time);

        return value;
    }
    getLeftRightIndex(time) {
        const timeline = this.timeline, {times, last, length} = timeline;

        if(length === 0)
            return;

        // index : length = time : last
        let index = parseInt(last > 0 ? time * length / last : 0) , right = length - 1, left = 0;

        if(index < 0)
            index = 0;
        else if(index > right)
            index = right;

        if(time < times[right]) {
            //Binary Search
            while (left < right) {
                if( (left === index  || right === index ) && (left +1 === right)) {
                    break;
                } else if (times[index] > time) {
                    right = index;
                } else if (times[index] < time) {
                    left = index;
                } else {
                    left = right = index;
                    break;
                }
                index = parseInt((left + right) / 2);
            }
        } else {
            left = index = right;
        }
        return {left, right};
    }
    getNowFrame(time) {
        const indices = this.getLeftRightIndex();
        if(!indices)
            return;

        const {left, right} = indices;
        const frame = new Frame();

        const names = this.names,length = names.length;
        let role, propertyNames, nameLength, property, value;
        let i,j;
        for(i = 0; i < length; ++i) {
            role = _roles[i];

            propertyNames = names[roleName];
            nameLength = propertyNames.length;
            for(j = 0; j < nameLength; ++j) {
                property = propertyNames[j];
                value = this.getNowValue(time, roleName, property, left, right);

                if(isUndefined(value))
                    continue;

                frame.set(roleName, property, value);
            }
        }
        return frame;
    }
}



//timingFunciton
//duration
//playState  paused|running|initial|inherit

//iterationCount //infinite | number
defineGetterSetter(SceneItem.prototype, "inifiniteCount", "options");
//none|forwards|backwards|both|initial
defineGetterSetter(SceneItem.prototype, "fillMode", "options");
//normal|reverse|alternate|alternate-reverse|initial
defineGetterSetter(SceneItem.prototype, "direction", "options");
//time
defineGetterSetter(SceneItem.prototype, "delay", "options");
