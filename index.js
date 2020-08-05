(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.validator = void 0;
var constants_1 = __webpack_require__(3);
var index_1 = __webpack_require__(1);
/**
 * The default validator which can validate by pass a predicate function.
 * @param predicate The predicate function to validate current value.
 * @param options validator options.
 */
function validator(predicate, options) {
    return function (target, name) {
        var validators = index_1.Reflect.getMetadata(constants_1.VALIDATORS, target) || [];
        var message = constants_1.DEFAULT_ERROR_MEESSAGES[options && options.type] || "Verification failed.";
        options = Object.assign({ message: message, type: "default", order: Number.MAX_VALUE }, options);
        validators.push({ predicate: predicate, options: options, name: name });
        index_1.Reflect.defineMetadata(constants_1.VALIDATORS, validators, target);
    };
}
exports.validator = validator;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Reflect = void 0;
var tslib_1 = __webpack_require__(2);
var curry_1 = __webpack_require__(11);
Object.defineProperty(exports, "curryRight", { enumerable: true, get: function () { return curry_1.curryRight; } });
var isArrayLike_1 = __webpack_require__(12);
Object.defineProperty(exports, "isArrayLike", { enumerable: true, get: function () { return isArrayLike_1.isArrayLike; } });
var isNil_1 = __webpack_require__(13);
Object.defineProperty(exports, "isNil", { enumerable: true, get: function () { return isNil_1.isNil; } });
var reflect_1 = tslib_1.__importDefault(__webpack_require__(14));
exports.Reflect = reflect_1.default;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("tslib");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_ERROR_MEESSAGES = exports.PRECONDITION = exports.DISPLAY_NAME = exports.VALIDATORS = void 0;
exports.VALIDATORS = Symbol("Validators symbol key");
exports.DISPLAY_NAME = Symbol("Display name symbol key");
exports.PRECONDITION = Symbol('Precondition symbol key');
exports.DEFAULT_ERROR_MEESSAGES = {
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


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.equals = exports.isEqual = void 0;
var validator_1 = __webpack_require__(0);
/**
 * Compare between two values to determine if they are equivalent.
 * @param value The value being compared.
 * @param other Other value to compare.
 */
function isEqual(value, other) {
    if (value === other) {
        return true;
    }
    else if (isNaN(value) && value !== value) {
        return isNaN(other) && other !== other;
    }
    else {
        return false;
    }
}
exports.isEqual = isEqual;
/**
 * Compare between two values to determine if they are equivalent.
 * @param other The other value to compare.
 * @param options Validator options.
 */
function equals(other, options) {
    options = Object.assign({ arguments: arguments, type: "equals" }, options);
    var predicate = function (value, target) {
        other = typeof other === "function" ? other(target) : other;
        options.arguments[0] = other;
        return isEqual(value, other);
    };
    return validator_1.validator(predicate, options);
}
exports.equals = equals;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.gt = exports.isGreaterThan = void 0;
var index_1 = __webpack_require__(1);
var validator_1 = __webpack_require__(0);
/**
 * Indicates whether or not the value is greater than other value.
 * @param value The value being compared.
 * @param other Other value to compare.
 */
function isGreaterThan(value, other) {
    return value > other;
}
exports.isGreaterThan = isGreaterThan;
/**
 * Indicates whether or not the current value is greater than other value.
 * @param other Other value to compare.
 * @param options Validator options.
 */
function gt(other, options) {
    options = Object.assign({ arguments: arguments, type: "gt" }, options);
    var predicate = index_1.curryRight(isGreaterThan, other);
    return validator_1.validator(predicate, options);
}
exports.gt = gt;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.range = exports.isInRange = void 0;
var index_1 = __webpack_require__(1);
var validator_1 = __webpack_require__(0);
/**
 * Return a boolean value to indicates whether or not value is between start and end.
 * @param value The value to be checked.
 * @param start Start value.
 * @param end End value.
 */
function isInRange(value, start, end) {
    return start <= value && value <= end;
}
exports.isInRange = isInRange;
/**
 * Indicates whether or not current value is between start and end.
 * @param start Start value.
 * @param end End value.
 * @param options Validator options.
 */
function range(start, end, options) {
    options = Object.assign({ arguments: arguments, type: "range" }, options);
    var predicate = index_1.curryRight(isInRange, start, end);
    return validator_1.validator(predicate, options);
}
exports.range = range;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.matches = exports.isMatch = void 0;
var index_1 = __webpack_require__(1);
var validator_1 = __webpack_require__(0);
/**
 * Returns a Boolean value that indicates whether or not a pattern exists in a searched string.
 * @param value The string against which to match the regular expression.
 * @param pattern The text of the regular expression.
 * @param options Validator options.
 */
function isMatch(value, pattern, options) {
    if (typeof pattern === "string") {
        return isMatch(value, new RegExp(pattern, options && options.flags));
    }
    else if (pattern instanceof RegExp) {
        return pattern.test(value);
    }
    else {
        return false;
    }
}
exports.isMatch = isMatch;
/**
 * Indicates whether or not a pattern exists in current value.
 * @param pattern The text of the regular expression.
 * @param options
 */
function matches(pattern, options) {
    var predicate = index_1.curryRight(isMatch, pattern, options);
    options = Object.assign({ arguments: arguments, type: "matches" }, options);
    return validator_1.validator(predicate, options);
}
exports.matches = matches;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateResult = void 0;
var tslib_1 = __webpack_require__(2);
var ValidateResult = /** @class */ (function () {
    function ValidateResult(value, errors) {
        this.errors = errors.reduce(function (result, error) {
            if (!result.has(error.name)) {
                result.set(error.name, [error]);
            }
            else {
                result.get(error.name).push(error);
            }
            ;
            return result;
        }, new Map());
        this.value = value;
        if (this.hasError()) {
            this.message = this.toSingle().message;
        }
    }
    /**
     * Get all errors by special property name.
     * @param property property name
     */
    ValidateResult.prototype.getErrors = function (property) {
        if (this.hasError(property)) {
            return this.errors.get(property);
        }
        else {
            return [];
        }
    };
    /**
     * Get error by property name and error type.
     * @param property property name
     * @param errorType error type
     */
    ValidateResult.prototype.getError = function (property, errorType) {
        if (this.hasError(property, errorType)) {
            return this.errors.get(property).find(function (e) { return e.type === errorType; });
        }
        else {
            return null;
        }
    };
    /**
     * Determine if there is a specified type of error on a specified property.
     * If the error type is omitted, it is judged whether there is any type of error on the specified property.
     * If the property name is also omitted, it is judged whether or not it contains any error.
     * @param property property name
     * @param errorType error type
     */
    ValidateResult.prototype.hasError = function (property, errorType) {
        if (this.errors instanceof Map) {
            if (property) {
                if (errorType) {
                    return this.errors.has(property) && this.errors.get(property).some(function (e) { return e.type === errorType; });
                }
                else {
                    return this.errors.has(property);
                }
            }
            else {
                return this.errors.size > 0;
            }
        }
        return false;
    };
    /**
     * Convert errors to the specified type based on a custom function.
     * @param callback custom convert function.
     */
    ValidateResult.prototype.map = function (callback) {
        if (typeof callback === "function") {
            return callback(this.errors);
        }
        else {
            return this.errors;
        }
    };
    /**
     * Convert the current grouping errors into a list form.
     */
    ValidateResult.prototype.toList = function () {
        if (this.hasError()) {
            var list_1 = [];
            this.errors.forEach(function (errors) { return errors.forEach(function (error) { return list_1.push(error); }); });
            return list_1;
        }
        return [];
    };
    /**
     * Convert the current grouping errors into a single error object.
     */
    ValidateResult.prototype.toSingle = function () {
        var e_1, _a;
        if (this.hasError()) {
            try {
                for (var _b = tslib_1.__values(this.errors.values()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var errors = _c.value;
                    return errors[0];
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        return null;
    };
    return ValidateResult;
}());
exports.ValidateResult = ValidateResult;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
tslib_1.__exportStar(__webpack_require__(10), exports);
var validate_1 = __webpack_require__(29);
Object.defineProperty(exports, "validate", { enumerable: true, get: function () { return validate_1.validate; } });
Object.defineProperty(exports, "validateAsync", { enumerable: true, get: function () { return validate_1.validateAsync; } });
var display_1 = __webpack_require__(32);
Object.defineProperty(exports, "display", { enumerable: true, get: function () { return display_1.display; } });
var precondition_1 = __webpack_require__(33);
Object.defineProperty(exports, "precondition", { enumerable: true, get: function () { return precondition_1.precondition; } });
var validateResult_1 = __webpack_require__(8);
Object.defineProperty(exports, "ValidateResult", { enumerable: true, get: function () { return validateResult_1.ValidateResult; } });


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
tslib_1.__exportStar(__webpack_require__(5), exports);
tslib_1.__exportStar(__webpack_require__(17), exports);
tslib_1.__exportStar(__webpack_require__(18), exports);
tslib_1.__exportStar(__webpack_require__(19), exports);
tslib_1.__exportStar(__webpack_require__(4), exports);
tslib_1.__exportStar(__webpack_require__(20), exports);
tslib_1.__exportStar(__webpack_require__(21), exports);
tslib_1.__exportStar(__webpack_require__(7), exports);
tslib_1.__exportStar(__webpack_require__(22), exports);
tslib_1.__exportStar(__webpack_require__(23), exports);
tslib_1.__exportStar(__webpack_require__(7), exports);
tslib_1.__exportStar(__webpack_require__(24), exports);
tslib_1.__exportStar(__webpack_require__(6), exports);
tslib_1.__exportStar(__webpack_require__(25), exports);
tslib_1.__exportStar(__webpack_require__(26), exports);
tslib_1.__exportStar(__webpack_require__(0), exports);
tslib_1.__exportStar(__webpack_require__(27), exports);
tslib_1.__exportStar(__webpack_require__(28), exports);


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.curryRight = void 0;
var tslib_1 = __webpack_require__(2);
function curryRight(fn) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return function () {
        var innerarguments = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            innerarguments[_i] = arguments[_i];
        }
        var length = args.length + innerarguments.length;
        if (fn.length === length) {
            return fn.apply(this, tslib_1.__spread(innerarguments, args));
        }
        else if (fn.length > length) {
            return curryRight(fn, tslib_1.__spread(innerarguments, args));
        }
        else {
            var subarguments = innerarguments.slice(0, fn.length - args.length);
            return fn.apply(this, tslib_1.__spread(subarguments, args));
        }
    };
}
exports.curryRight = curryRight;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.isArrayLike = void 0;
function isArrayLike(value) {
    if (Array.isArray(value) || typeof value === "string") {
        return true;
    }
    if (!value) {
        return false;
    }
    if (typeof value !== "object") {
        return false;
    }
    if (value.nodeType === 1) {
        return !!value.length;
    }
    if (value.length === 0) {
        return true;
    }
    if (typeof value.length === "number" && value.length > 0) {
        return "0" in value && "" + (value.length - 1) in value;
    }
    return false;
}
exports.isArrayLike = isArrayLike;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.isNil = void 0;
function isNil(value) {
    return value === undefined || value === null;
}
exports.isNil = isNil;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {
Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(16);
function isValid(obj) {
    return typeof obj === "object" && typeof obj.getMetadata === "function";
}
var reflect = (function () {
    if (isValid(Reflect)) {
        return Reflect;
    }
    else if (isValid(global.Reflect)) {
        return global.Reflect;
    }
    else if (isValid(global.global && global.global.Reflect)) {
        return global.global.Reflect;
    }
    return {};
}());
exports.default = reflect;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(15)))

/***/ }),
/* 15 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("reflect-metadata");

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.gte = exports.isGreaterThanOrEqualTo = void 0;
var index_1 = __webpack_require__(1);
var equals_1 = __webpack_require__(4);
var gt_1 = __webpack_require__(5);
var validator_1 = __webpack_require__(0);
/**
 * Indicates whether or not the value is greater than other value.
 * @param value The value being compared.
 * @param other Other value to compare.
 */
function isGreaterThanOrEqualTo(value, other) {
    return gt_1.isGreaterThan(value, other) || equals_1.isEqual(value, other);
}
exports.isGreaterThanOrEqualTo = isGreaterThanOrEqualTo;
/**
 * Indicates whether or not the value is greater than or equal to other value.
 * @param other Other value to compare.
 * @param options Validator options.
 */
function gte(other, options) {
    options = Object.assign({ arguments: arguments, type: "gte" }, options);
    var predicate = index_1.curryRight(isGreaterThanOrEqualTo, other);
    return validator_1.validator(predicate, options);
}
exports.gte = gte;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.contains = exports.isContain = void 0;
var index_1 = __webpack_require__(1);
var equals_1 = __webpack_require__(4);
var validator_1 = __webpack_require__(0);
/**
 * Checks if value is in collection. If collection is a string, it's checked for a substring of value.
 * @param collection The collection to inspect.
 * @param value The value to search for.
 * @param position The index at which to begin searching the collection.
 * If omitted, search starts at the beginning of the collection.
 */
function isContain(collection, value, position) {
    if (position === void 0) { position = 0; }
    if (typeof collection === "string") {
        return collection.indexOf(value, position) > -1;
    }
    else if (index_1.isArrayLike(collection)) {
        for (var index = position, length_1 = collection.length; index < length_1; index++) {
            var item = collection[index];
            if (equals_1.isEqual(value, item)) {
                return true;
            }
        }
    }
    else if (typeof collection === "object") {
        return value in collection;
    }
    return false;
}
exports.isContain = isContain;
/**
 * Checks if current property value is a collection include the special value or is object include the special key.
 * @param value The value to search for.
 * @param position The index at which to begin searching the collection.
 * If omitted, search starts at the beginning of the collection.
 * @param options Validator options.
 */
function contains(value, position, options) {
    if (position === void 0) { position = 0; }
    var predicate = index_1.curryRight(isContain, value, position);
    options = Object.assign({ arguments: arguments, type: "contains" }, options);
    return validator_1.validator(predicate, options);
}
exports.contains = contains;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.email = exports.isEmail = void 0;
var validator_1 = __webpack_require__(0);
/**
 * Indicates whether or not the value is a is a valid email address.
 * @param value The value being checked.
 */
function isEmail(value) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
}
exports.isEmail = isEmail;
/**
 * Indicates whether or not the current value is a valid email address.
 * @param options Validator options
 */
function email(options) {
    options = Object.assign({ arguments: arguments, type: "email" }, options);
    return validator_1.validator(isEmail, options);
}
exports.email = email;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ip = exports.isIP = void 0;
var index_1 = __webpack_require__(1);
var validator_1 = __webpack_require__(0);
var rules = {
    4: /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/,
    6: /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))/,
};
/**
 * Returns a Boolean indicates whether or not the value is an IP (version 4 or 6).
 * @param value The value to be checked.
 * @param version IP version, default is 4.
 */
function isIP(value, options) {
    options = Object.assign({ version: 4 }, options);
    var regex = rules[options.version];
    if (!regex) {
        return false;
    }
    return regex.test(value);
}
exports.isIP = isIP;
/**
 * Indicates whether or not the current property value is an IP (version 4 or 6).
 * @param version IP version.
 * @param options Validator options.
 */
function ip(options) {
    var predicate = index_1.curryRight(isIP, options);
    options = Object.assign({ arguments: arguments, type: "ip" }, options);
    return validator_1.validator(predicate, options);
}
exports.ip = ip;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.length = exports.isLengthSatisfied = void 0;
var index_1 = __webpack_require__(1);
var range_1 = __webpack_require__(6);
var validator_1 = __webpack_require__(0);
/**
 * Returns a Boolean value that indicates whether or not the value's length is satisfied the special demand.
 * @param options Validator Options.
 */
function isLengthSatisfied(value, options) {
    if (index_1.isNil(value)) {
        return false;
    }
    var len;
    if (index_1.isArrayLike(value)) {
        len = value.length;
    }
    else if (typeof value === "object") {
        len = Object.keys(value).length;
    }
    if (len && options) {
        if (options.length) {
            return len === options.length;
        }
        options = Object.assign({ minLength: 0 }, options);
        if (options.maxLength) {
            return range_1.isInRange(len, options.minLength, options.maxLength);
        }
        else {
            return len >= options.minLength;
        }
    }
    return false;
}
exports.isLengthSatisfied = isLengthSatisfied;
/**
 * Indicates whether or not current value's length is satisfied the special demand.
 * @param options Validator Options.
 */
function length(options) {
    var predicate = index_1.curryRight(isLengthSatisfied, options);
    options = Object.assign({ arguments: arguments, type: "length" }, options);
    return validator_1.validator(predicate, options);
}
exports.length = length;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.lt = exports.isLessThan = void 0;
var index_1 = __webpack_require__(1);
var validator_1 = __webpack_require__(0);
/**
 *  Returns a Boolean value that indicates whether or not the value is less than other or equal to value.
 * @param value The value being compared.
 * @param other Other value to compare.
 */
function isLessThan(value, other) {
    return value < other;
}
exports.isLessThan = isLessThan;
/**
 * Indicates whether or not the value is less than or equal to other value.
 * @param other Other value to compare.
 * @param options Validator options.
 */
function lt(other, options) {
    options = Object.assign({ arguments: arguments, type: "lt" }, options);
    var predicate = index_1.curryRight(isLessThan, other);
    return validator_1.validator(predicate, options);
}
exports.lt = lt;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.lte = exports.isLessThanOrEqualTo = void 0;
var index_1 = __webpack_require__(1);
var validator_1 = __webpack_require__(0);
/**
 * Returns a Boolean value that indicates whether or not the value is less than other or equal to value.
 * @param value The value being compared.
 * @param other Other value to compare.
 */
function isLessThanOrEqualTo(value, other) {
    return value <= other;
}
exports.isLessThanOrEqualTo = isLessThanOrEqualTo;
/**
 * Indicates whether or not the value is less than or equal to other value.
 * @param other Other value to compare.
 * @param options Validator options.
 */
function lte(other, options) {
    options = Object.assign({ arguments: arguments, type: "lte" }, options);
    var predicate = index_1.curryRight(isLessThanOrEqualTo, other);
    return validator_1.validator(predicate, options);
}
exports.lte = lte;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.negate = void 0;
var validator_1 = __webpack_require__(0);
/**
 * Reverse the validator and take the opposite result.
 * @param predicate The predicate function for validator.
 * @param options Validator options.
 */
function negate(predicate, options) {
    return validator_1.validator(function (value) { return !predicate(value); }, options);
}
exports.negate = negate;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.required = exports.isRequired = void 0;
var utils_1 = __webpack_require__(1);
var validator_1 = __webpack_require__(0);
/**
 * Return a boolean value to indicates whether or not value is required.
 * @param value The string value to be indicated.
 * @param options options
 */
function isRequired(value, options) {
    options = Object.assign({ allowEmpty: true, allowWhitespace: true }, options);
    if (value === undefined) {
        return false;
    }
    else if (value === null) {
        return !!options.allowNull;
    }
    else if (isNaN(value) && value !== value) {
        return !!options.allowNaN;
    }
    else if (typeof value === "string" && /^\s+$/.test(value)) {
        return !!options.allowWhitespace;
    }
    else if (utils_1.isArrayLike(value) && value.length === 0) {
        return !!options.allowEmpty;
    }
    else if (typeof value === "object" && Object.keys(value).length === 0) {
        return !!options.allowEmpty;
    }
    else {
        return true;
    }
}
exports.isRequired = isRequired;
/**
 * Indicates whether or not value is required.
 * @param options Validator options.
 */
function required(options) {
    options = Object.assign({ arguments: arguments, type: "required" }, options);
    var predicate = utils_1.curryRight(isRequired, options);
    return validator_1.validator(predicate, options);
}
exports.required = required;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.url = exports.isURL = void 0;
var validator_1 = __webpack_require__(0);
/**
 * Return a boolean value to indicates whether or not the string is an URL.
 * @param value The value to be check.
 */
function isURL(value) {
    return /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)$/.test(value);
}
exports.isURL = isURL;
/**
 * Indicates whether or not current value is an URL.
 * @param options Validator Options
 */
function url(options) {
    options = Object.assign({ arguments: arguments, type: "url" }, options);
    return validator_1.validator(isURL, options);
}
exports.url = url;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.numeric = exports.isNumeric = void 0;
var validator_1 = __webpack_require__(0);
/**
 * Indicates whether or not value is valid number or string contains only numbers.
 * If the value is object type, check value by result of valueOf.
 * @param value the value to be check.
 */
function isNumeric(value) {
    var type = typeof value;
    if (type === "number") {
        return !isNaN(value);
    }
    else if (type === "string") {
        return isNumeric(Number(value));
    }
    else if (type === "object") {
        return isNumeric(value.valueOf());
    }
    else {
        return false;
    }
}
exports.isNumeric = isNumeric;
/**
 * Indicates whether or not value is valid number or string contains only numbers.
 * If the value is object type, check value by result of valueOf.
 * @param options Validator Options
 */
function numeric(options) {
    options = Object.assign({ arguments: arguments, type: "numeric" }, options);
    return validator_1.validator(isNumeric, options);
}
exports.numeric = numeric;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.type = exports.isType = void 0;
var utils_1 = __webpack_require__(1);
var validator_1 = __webpack_require__(0);
/**
 * Indicates whether or not value is the special type.
 * @param value the value to be check.
 * @param typeName type string.
 */
function isType(value, typeName) {
    return typeof value === typeName;
}
exports.isType = isType;
/**
 * Indicates whether or not the current value is the special type.
 * @param options Validator Options
 */
function type(typeName, options) {
    options = Object.assign({ arguments: arguments, type: "type" }, options);
    var predicate = utils_1.curryRight(isType, typeName);
    return validator_1.validator(predicate, options);
}
exports.type = type;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAsync = exports.validate = void 0;
var constants_1 = __webpack_require__(3);
var utils_1 = __webpack_require__(1);
var validateError_1 = __webpack_require__(30);
var validateResult_1 = __webpack_require__(8);
function satisfied(target, instance, info, options) {
    try {
        if (info.options && typeof info.options.precondition === 'function') {
            return info.options.precondition.call(instance, options.preconditionParam, instance);
        }
        var precondition = utils_1.Reflect.getMetadata(constants_1.PRECONDITION, target, info.name);
        if (typeof precondition === 'function') {
            return precondition.call(instance, options.preconditionParam, instance);
        }
    }
    catch (error) {
        console.error(error);
        return false;
    }
    return true;
}
/**
 * Validate objects and generate results with errors.
 * @param instance validated object.
 * @param options validate options
 */
function validate(instance, options) {
    var target = instance;
    options = Object.assign({}, options);
    if (options && options.type && typeof options.type === "function") {
        target = options.type.prototype;
    }
    var errors = (utils_1.Reflect.getMetadata(constants_1.VALIDATORS, target) || [])
        .filter(function (validator) { return satisfied(target, instance, validator, options); })
        .filter(function (validator) { return !validator.predicate(instance[validator.name], instance); })
        .sort(function (x, y) { return x.options.order - y.options.order; })
        .map(function (validator, index) {
        var error = new validateError_1.ValidateError(instance, index, validator);
        error.setMessageFromObject(options.messages, options.selector);
        return error;
    });
    return new validateResult_1.ValidateResult(instance, errors);
}
exports.validate = validate;
/**
 * Validate object and generate results with errors asynchronously.
 * @param instance validated object.
 * @param options validated options.
 */
function validateAsync(instance, options) {
    try {
        var result = validate(instance, options);
        if (result.hasError()) {
            return Promise.reject(result);
        }
        return Promise.resolve(result.value);
    }
    catch (error) {
        return Promise.reject(error);
    }
}
exports.validateAsync = validateAsync;


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateError = void 0;
var secure_template_1 = __webpack_require__(31);
var constants_1 = __webpack_require__(3);
var utils_1 = __webpack_require__(1);
var ValidateError = /** @class */ (function () {
    function ValidateError(target, order, validator) {
        var _this = this;
        /**
         * The error sequence number.
         */
        this.order = 0;
        this.type = validator.options.type;
        this.name = validator.name;
        this.value = target[validator.name];
        this.order = order;
        this.display = utils_1.Reflect.getMetadata(constants_1.DISPLAY_NAME, target, validator.name) || validator.name;
        if (utils_1.isArrayLike(validator.options.arguments)) {
            Array.from(validator.options.arguments).forEach(function (val, idx) { return _this["$" + idx] = val; });
        }
        this.setMessage(validator.options.message);
    }
    /**
     * Set the error message
     * @param template The template of error message
     */
    ValidateError.prototype.setMessage = function (template) {
        if (typeof template !== 'string')
            return;
        this.message = secure_template_1.format(template, this);
    };
    /**
     * Set the error message from template object.
     * @param templates The template object.
     * @param selector The key selector
     */
    ValidateError.prototype.setMessageFromObject = function (templates, selector) {
        if (Object.prototype.toString.call(templates) !== "[object Object]")
            return this;
        selector = typeof selector === 'function' ? selector : function (err) { return err.display + "." + err.type; };
        var key = selector(this);
        this.setMessage(templates[key]);
        return this;
    };
    ValidateError.prototype.toString = function () {
        return this.message;
    };
    return ValidateError;
}());
exports.ValidateError = ValidateError;


/***/ }),
/* 31 */
/***/ (function(module, exports) {

module.exports = require("secure-template");

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.display = void 0;
var constants_1 = __webpack_require__(3);
var index_1 = __webpack_require__(1);
/**
 * Set the alias for the property, default is current property name.
 * @param name The display alias
 */
function display(name) {
    return function (target, originName) {
        index_1.Reflect.defineMetadata(constants_1.DISPLAY_NAME, name, target, originName);
    };
}
exports.display = display;


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.precondition = void 0;
var constants_1 = __webpack_require__(3);
function precondition(predicate) {
    return Reflect.metadata(constants_1.PRECONDITION, predicate);
}
exports.precondition = precondition;


/***/ })
/******/ ])));
//# sourceMappingURL=index.js.map