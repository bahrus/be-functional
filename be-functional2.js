import { BE, propDefaults, propInfo } from 'be-enhanced/BE.js';
import { XE } from 'xtal-element/XE.js';
import { register } from 'be-hive/register.js';
export class BeFunctional extends BE {
    onFnParams(self) {
        return {};
    }
}
const tagName = 'be-functional';
const ifWantsToBe = 'functional';
const upgrade = '*';
const xe = new XE({
    config: {
        tagName,
        propDefaults: {
            ...propDefaults,
        },
        propInfo: {
            ...propInfo
        },
        actions: {}
    },
    superclass: BeFunctional
});
register(ifWantsToBe, upgrade, tagName);
