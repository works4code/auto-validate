export const VALIDATORS = Symbol("Validators");
export const DISPLAY_NAME = Symbol("Display name symbol");
export const REQUIRED_VALIDATE_PROPERYIES = Symbol("All properties rquired to be validate");
export const DEFAULT_ERROR_MEESSAGES = {
    contains: "The {display} is not contains {$0}.",
    email: "The {display} is not the correct email address format.",
    equals: "The {display} is not equal to {$0}.",
    gt: "The {display} must be greater than {$0}, current is {value}.",
    gte: "The {display} must be greater than or equal to {$0}, current is {value}.",
    ip: "The {display} is a invalid IP address.",
    length: "The {display} length does not match.",
    lt: "The {display} must be less than {$0}, current is {value}.",
    lte: "The {display} must be less than or equal to {$0}, current is {value}.",
    matches: "The {display} does not match the requested format.",
    numeric: "The {display} is not a numeric type.",
    range: "The {display} must be between {$0} and {$1}.",
    required: "The {display} is required.",
    type: "The {display} must be a {$0} type.",
    url: "The {display} is not a valid url.",
};
