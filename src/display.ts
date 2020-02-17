import { DISPLAY_NAME } from "./constants";
import { Reflect } from "./utils/index";

/**
 * Set the alias for the property, default is current property name.
 * @param name The display alias
 */
export function display(name: string) {
    return function(target: any, originName: string) {
        Reflect.defineMetadata(DISPLAY_NAME, name, target, originName);
    };
}
