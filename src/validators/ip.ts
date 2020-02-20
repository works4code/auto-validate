import { curryRight } from "../utils/index";
import { IValidatorOptions } from "../validatorOptions";
import { validator } from "./validator";

const rules: Record<string, RegExp> = {
    4: /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/,
    6: /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))/,
};

type IPVersion = 4 | 6;

interface IIPValidatorOptions {
    version?: IPVersion;
}

/**
 * Returns a Boolean indicates whether or not the value is an IP (version 4 or 6).
 * @param value The value to be checked.
 * @param version IP version, default is 4.
 */
export function isIP(value: string, options?: IIPValidatorOptions) {
    options = Object.assign({ version: 4 }, options);
    const regex = rules[options.version];
    if (!regex) { return false; }
    return regex.test(value);
}

/**
 * Indicates whether or not the current property value is an IP (version 4 or 6).
 * @param version IP version.
 * @param options Validator options.
 */
export function ip(options?: IIPValidatorOptions & IValidatorOptions) {
    const predicate = curryRight(isIP, options);
    options = Object.assign({ arguments, type: "ip" }, options);
    return validator(predicate as any, options);
}
