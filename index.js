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
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = __webpack_require__(3);
var index_1 = __webpack_require__(1);
var validateError_1 = __webpack_require__(6);
/**
 * The default validator which can validate by pass a predicate function.
 * @param predicate The predicate function to validate current value.
 * @param options validator options.
 */
function validator(predicate, options) {
    return function (target, name) {
        var validators = index_1.Reflect.getMetadata(constants_1.VALIDATORS, target, name) || new Map();
        var properties = index_1.Reflect.getMetadata(constants_1.REQUIRED_VALIDATE_PROPERYIES, target) || new Set();
        var message = "Verification failed.";
        options = Object.assign({ message: message, type: "default", order: validators.size }, options);
        var fn = function (obj) {
            var valid = predicate(obj[name], obj);
            return valid ? undefined : new validateError_1.ValidateError(obj, name, options);
        };
        properties.add(name);
        if (validators.has(options.type)) {
            console.warn("Duplicate added " + options.type + " validator for " + name);
            console.warn("Only one validator of the same type can exist on property, please set validator's type to use multiple custom validators.");
        }
        validators.set(options.type, fn);
        index_1.Reflect.defineMetadata(constants_1.REQUIRED_VALIDATE_PROPERYIES, properties, target);
        index_1.Reflect.defineMetadata(constants_1.VALIDATORS, validators, target, name);
    };
}
exports.validator = validator;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var curry_1 = __webpack_require__(12);
exports.curryRight = curry_1.curryRight;
var isArrayLike_1 = __webpack_require__(13);
exports.isArrayLike = isArrayLike_1.isArrayLike;
var array_1 = __webpack_require__(14);
exports.ArrayHelper = array_1.ArrayHelper;
var isNil_1 = __webpack_require__(16);
exports.isNil = isNil_1.isNil;
var pushByOrder_1 = __webpack_require__(17);
exports.pushByOrder = pushByOrder_1.pushByOrder;
var reflect_1 = tslib_1.__importDefault(__webpack_require__(18));
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
exports.VALIDATORS = Symbol("Validators");
exports.DISPLAY_NAME = Symbol("Display name symbol");
exports.REQUIRED_VALIDATE_PROPERYIES = Symbol("All properties rquired to be validate");


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
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
    var message = "The {display} is not equal to {$0}.";
    options = Object.assign({ arguments: arguments, message: message, type: "equals" }, options);
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
    var message = "The {display} must be greater than {$0}, current is {value}.";
    options = Object.assign({ arguments: arguments, message: message, type: "gt" }, options);
    var predicate = index_1.curryRight(isGreaterThan, other);
    return validator_1.validator(predicate, options);
}
exports.gt = gt;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var secure_template_1 = __webpack_require__(21);
var constants_1 = __webpack_require__(3);
var utils_1 = __webpack_require__(1);
var ValidateError = /** @class */ (function () {
    function ValidateError(target, name, options) {
        var _this = this;
        /**
         * The error sequence number. the default is the order in which the decorators are added.
         */
        this.order = 0;
        this.type = options.type;
        this.name = name;
        this.value = target[name];
        this.order = options.order;
        this.display = utils_1.Reflect.getMetadata(constants_1.DISPLAY_NAME, target, name) || name;
        if (utils_1.isArrayLike(options.arguments)) {
            utils_1.ArrayHelper.from(options.arguments).forEach(function (val, idx) { return _this["$" + idx] = val; });
        }
        this.message = secure_template_1.format(options.message, this);
    }
    ValidateError.prototype.toString = function () {
        return this.message;
    };
    return ValidateError;
}());
exports.ValidateError = ValidateError;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
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
    var message = "The {display} must be between {$0} and {$1}.";
    options = Object.assign({ arguments: arguments, message: message, type: "range" }, options);
    var predicate = index_1.curryRight(isInRange, start, end);
    return validator_1.validator(predicate, options);
}
exports.range = range;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
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
    var message = "The {display} does not match the requested format.";
    options = Object.assign({ arguments: arguments, message: message, type: "matches" }, options);
    return validator_1.validator(predicate, options);
}
exports.matches = matches;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var ValidateResult = /** @class */ (function () {
    function ValidateResult(value, errors) {
        this.errors = errors;
        this.value = value;
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
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
tslib_1.__exportStar(__webpack_require__(11), exports);
var validate_1 = __webpack_require__(34);
exports.validate = validate_1.validate;
exports.validateAsync = validate_1.validateAsync;
var display_1 = __webpack_require__(35);
exports.display = display_1.display;
var validateResult_1 = __webpack_require__(9);
exports.ValidateResult = validateResult_1.ValidateResult;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
tslib_1.__exportStar(__webpack_require__(5), exports);
tslib_1.__exportStar(__webpack_require__(22), exports);
tslib_1.__exportStar(__webpack_require__(23), exports);
tslib_1.__exportStar(__webpack_require__(24), exports);
tslib_1.__exportStar(__webpack_require__(4), exports);
tslib_1.__exportStar(__webpack_require__(25), exports);
tslib_1.__exportStar(__webpack_require__(26), exports);
tslib_1.__exportStar(__webpack_require__(8), exports);
tslib_1.__exportStar(__webpack_require__(27), exports);
tslib_1.__exportStar(__webpack_require__(28), exports);
tslib_1.__exportStar(__webpack_require__(8), exports);
tslib_1.__exportStar(__webpack_require__(29), exports);
tslib_1.__exportStar(__webpack_require__(7), exports);
tslib_1.__exportStar(__webpack_require__(30), exports);
tslib_1.__exportStar(__webpack_require__(31), exports);
tslib_1.__exportStar(__webpack_require__(0), exports);
tslib_1.__exportStar(__webpack_require__(32), exports);
tslib_1.__exportStar(__webpack_require__(33), exports);


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
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
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
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
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var isIterator_1 = __webpack_require__(15);
var ArrayHelper = /** @class */ (function () {
    function ArrayHelper(iterable) {
        this.values = iterable;
    }
    ArrayHelper.from = function (iterable) {
        return new ArrayHelper(iterable);
    };
    ArrayHelper.prototype.flatten = function () {
        var values = this.values;
        function createIterator() {
            var values_1, values_1_1, value, _a, _b, iterator, e_1_1, e_2_1;
            var e_2, _c, e_1, _d;
            return tslib_1.__generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _e.trys.push([0, 14, 15, 16]);
                        values_1 = tslib_1.__values(values), values_1_1 = values_1.next();
                        _e.label = 1;
                    case 1:
                        if (!!values_1_1.done) return [3 /*break*/, 13];
                        value = values_1_1.value;
                        if (!(Array.isArray(value) || isIterator_1.isIterable(value))) return [3 /*break*/, 10];
                        _e.label = 2;
                    case 2:
                        _e.trys.push([2, 7, 8, 9]);
                        _a = (e_1 = void 0, tslib_1.__values(value)), _b = _a.next();
                        _e.label = 3;
                    case 3:
                        if (!!_b.done) return [3 /*break*/, 6];
                        iterator = _b.value;
                        return [4 /*yield*/, iterator];
                    case 4:
                        _e.sent();
                        _e.label = 5;
                    case 5:
                        _b = _a.next();
                        return [3 /*break*/, 3];
                    case 6: return [3 /*break*/, 9];
                    case 7:
                        e_1_1 = _e.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 9];
                    case 8:
                        try {
                            if (_b && !_b.done && (_d = _a.return)) _d.call(_a);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7 /*endfinally*/];
                    case 9: return [3 /*break*/, 12];
                    case 10: return [4 /*yield*/, value];
                    case 11:
                        _e.sent();
                        _e.label = 12;
                    case 12:
                        values_1_1 = values_1.next();
                        return [3 /*break*/, 1];
                    case 13: return [3 /*break*/, 16];
                    case 14:
                        e_2_1 = _e.sent();
                        e_2 = { error: e_2_1 };
                        return [3 /*break*/, 16];
                    case 15:
                        try {
                            if (values_1_1 && !values_1_1.done && (_c = values_1.return)) _c.call(values_1);
                        }
                        finally { if (e_2) throw e_2.error; }
                        return [7 /*endfinally*/];
                    case 16: return [2 /*return*/];
                }
            });
        }
        return ArrayHelper.from(createIterator());
    };
    ArrayHelper.prototype.filter = function (predicate) {
        var values = this.values;
        function createIterator() {
            var index, values_2, values_2_1, value, e_3_1;
            var e_3, _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        index = 0;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 6, 7, 8]);
                        values_2 = tslib_1.__values(values), values_2_1 = values_2.next();
                        _b.label = 2;
                    case 2:
                        if (!!values_2_1.done) return [3 /*break*/, 5];
                        value = values_2_1.value;
                        if (!predicate(value, index++)) return [3 /*break*/, 4];
                        return [4 /*yield*/, value];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4:
                        values_2_1 = values_2.next();
                        return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 8];
                    case 6:
                        e_3_1 = _b.sent();
                        e_3 = { error: e_3_1 };
                        return [3 /*break*/, 8];
                    case 7:
                        try {
                            if (values_2_1 && !values_2_1.done && (_a = values_2.return)) _a.call(values_2);
                        }
                        finally { if (e_3) throw e_3.error; }
                        return [7 /*endfinally*/];
                    case 8: return [2 /*return*/];
                }
            });
        }
        return ArrayHelper.from(createIterator());
    };
    ArrayHelper.prototype.forEach = function (func) {
        var e_4, _a;
        if (typeof func !== "function") {
            return;
        }
        var index = 0;
        var values = this.values;
        try {
            for (var values_3 = tslib_1.__values(values), values_3_1 = values_3.next(); !values_3_1.done; values_3_1 = values_3.next()) {
                var value = values_3_1.value;
                func(value, index++);
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (values_3_1 && !values_3_1.done && (_a = values_3.return)) _a.call(values_3);
            }
            finally { if (e_4) throw e_4.error; }
        }
    };
    ArrayHelper.prototype.map = function (func) {
        var values = this.values;
        function createIterator() {
            var index, values_4, values_4_1, value, e_5_1;
            var e_5, _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        index = 0;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 6, 7, 8]);
                        values_4 = tslib_1.__values(values), values_4_1 = values_4.next();
                        _b.label = 2;
                    case 2:
                        if (!!values_4_1.done) return [3 /*break*/, 5];
                        value = values_4_1.value;
                        return [4 /*yield*/, func(value, index++)];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4:
                        values_4_1 = values_4.next();
                        return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 8];
                    case 6:
                        e_5_1 = _b.sent();
                        e_5 = { error: e_5_1 };
                        return [3 /*break*/, 8];
                    case 7:
                        try {
                            if (values_4_1 && !values_4_1.done && (_a = values_4.return)) _a.call(values_4);
                        }
                        finally { if (e_5) throw e_5.error; }
                        return [7 /*endfinally*/];
                    case 8: return [2 /*return*/];
                }
            });
        }
        return ArrayHelper.from(createIterator());
    };
    ArrayHelper.prototype.reduce = function (func, seed) {
        var e_6, _a;
        var index = 0;
        var values = this.values;
        try {
            for (var values_5 = tslib_1.__values(values), values_5_1 = values_5.next(); !values_5_1.done; values_5_1 = values_5.next()) {
                var value = values_5_1.value;
                seed = func(seed, value, index++);
            }
        }
        catch (e_6_1) { e_6 = { error: e_6_1 }; }
        finally {
            try {
                if (values_5_1 && !values_5_1.done && (_a = values_5.return)) _a.call(values_5);
            }
            finally { if (e_6) throw e_6.error; }
        }
        return seed;
    };
    ArrayHelper.prototype.valueOf = function () {
        return Array.from(this.values);
    };
    return ArrayHelper;
}());
exports.ArrayHelper = ArrayHelper;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function isIterable(obj) {
    if (obj == null) {
        return false;
    }
    return typeof obj[Symbol.iterator] === "function";
}
exports.isIterable = isIterable;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function isNil(value) {
    return value === undefined || value === null;
}
exports.isNil = isNil;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function pushByOrder(collection, value, orderBy) {
    for (var index = 0, length_1 = collection.length; index < length_1; index++) {
        if (value[orderBy] <= collection[index][orderBy]) {
            collection.splice(index, 0, value);
            return collection;
        }
    }
    collection.push(value);
    return collection;
}
exports.pushByOrder = pushByOrder;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {
Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(20);
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

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(19)))

/***/ }),
/* 19 */
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
/* 20 */
/***/ (function(module, exports) {

module.exports = require("reflect-metadata");

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = require("secure-template");

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
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
    var message = "The {display} must be greater than or equal to {$0}, current is {value}.";
    options = Object.assign({ arguments: arguments, message: message, type: "gte" }, options);
    var predicate = index_1.curryRight(isGreaterThanOrEqualTo, other);
    return validator_1.validator(predicate, options);
}
exports.gte = gte;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
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
    var message = "The {display} is not contains {$0}.";
    var predicate = index_1.curryRight(isContain, value, position);
    options = Object.assign({ arguments: arguments, message: message, type: "contains" }, options);
    return validator_1.validator(predicate, options);
}
exports.contains = contains;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
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
    var message = "The {display} is not the correct email address format.";
    options = Object.assign({ arguments: arguments, message: message, type: "email" }, options);
    return validator_1.validator(isEmail, options);
}
exports.email = email;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
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
    var message = "The {display} is a invalid IP address.";
    var predicate = index_1.curryRight(isIP, options);
    options = Object.assign({ arguments: arguments, message: message, type: "ip" }, options);
    return validator_1.validator(predicate, options);
}
exports.ip = ip;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __webpack_require__(1);
var range_1 = __webpack_require__(7);
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
    var message = "The {display} length does not match.";
    options = Object.assign({ arguments: arguments, message: message, type: "length" }, options);
    return validator_1.validator(predicate, options);
}
exports.length = length;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
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
    var message = "The {display} must be less than {$0}, current is {value}.";
    options = Object.assign({ arguments: arguments, message: message, type: "lt" }, options);
    var predicate = index_1.curryRight(isLessThan, other);
    return validator_1.validator(predicate, options);
}
exports.lt = lt;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
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
    var message = "The {display} must be less than or equal to {$0}, current is {value}.";
    options = Object.assign({ arguments: arguments, message: message, type: "lte" }, options);
    var predicate = index_1.curryRight(isLessThanOrEqualTo, other);
    return validator_1.validator(predicate, options);
}
exports.lte = lte;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
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
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
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
    var message = "The {display} is required.";
    options = Object.assign({ arguments: arguments, message: message, type: "required" }, options);
    var predicate = utils_1.curryRight(isRequired, options);
    return validator_1.validator(predicate, options);
}
exports.required = required;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
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
    var message = "The {display} is not a valid url.";
    options = Object.assign({ arguments: arguments, message: message, type: "url" }, options);
    return validator_1.validator(isURL, options);
}
exports.url = url;


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
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
    var message = "The {display} is not a numeric type.";
    options = Object.assign({ arguments: arguments, message: message, type: "numeric" }, options);
    return validator_1.validator(isNumeric, options);
}
exports.numeric = numeric;


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
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
    var message = "The {display} must be a {$0} type.";
    options = Object.assign({ arguments: arguments, message: message, type: "type" }, options);
    var predicate = utils_1.curryRight(isType, typeName);
    return validator_1.validator(predicate, options);
}
exports.type = type;


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = __webpack_require__(3);
var utils_1 = __webpack_require__(1);
var validateError_1 = __webpack_require__(6);
var validateResult_1 = __webpack_require__(9);
/**
 * Validate objects and generate results with errors.
 * @param instance validated object.
 * @param options validate options
 */
function validate(instance, options) {
    var target = instance;
    if (options && options.type && typeof options.type === "function") {
        target = options.type.prototype;
    }
    var properties = utils_1.Reflect.getMetadata(constants_1.REQUIRED_VALIDATE_PROPERYIES, target) || [];
    var errors = utils_1.ArrayHelper.from(properties)
        .map(function (key) { return utils_1.Reflect.getMetadata(constants_1.VALIDATORS, target, key); })
        .map(function (value) { return value.values(); })
        .flatten()
        .reduce(function (result, validateFn) {
        var error = validateFn(instance);
        if (error instanceof validateError_1.ValidateError) {
            if (!result.has(error.name)) {
                result.set(error.name, [error]);
            }
            else {
                utils_1.pushByOrder(result.get(error.name), error, "order");
            }
        }
        return result;
    }, new Map());
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
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
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


/***/ })
/******/ ])));
//# sourceMappingURL=index.js.map