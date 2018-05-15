import cubicBezier from "./cubicBezier";

export const PREFIX = "__SCENEJS_";
export const PROPERTY = "property";
export const SCENE_ROLES = {[PROPERTY]: true};
export const ANIMATION_PLAY_STATE = ["idle", "pending", "paused", "running", "finished"];
export const FILL_MODE = ["none", "forwards", "backwards", "both", "auto"];
export const PLAY_DIRECTION = ["normal", "reverse", "alternate", "alternate-reverse"];
export const LINEAR = cubicBezier(0, 0, 1, 1);
export const EASE = cubicBezier(0.25, 0.1, 0.25, 1);
export const EASE_IN = cubicBezier(0.42, 0, 1, 1);
export const EASE_OUT = cubicBezier(0, 0, 0.58, 1);
export const EASE_IN_OUT = cubicBezier(0.42, 0, 0.58, 1);

// export const TYPE_PROPERTY_OBJECT = "propertyobject";
// export const TYPE_ARRAY = "array";
// export const TYPE_TEXT = "text";
