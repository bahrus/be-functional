import { BE, propDefaults, propInfo } from 'be-enhanced/BE.js';
import { XE } from 'xtal-element/XE.js';
import { register } from 'be-hive/register.js';
export class BeFunctional extends BE {
    static get beConfig() {
        return {
            parse: true,
            primaryProp: 'fnParams',
            primaryPropReq: true,
        };
    }
    #exportsLookup = new Map();
    onFnParams(self) {
        const { fnParams, enhancedElement } = self;
        import('be-exportable/be-exportable.js');
        for (const key in fnParams) {
            const param = fnParams[key];
            enhancedElement.addEventListener(key, async (e) => {
                const { scriptRef, fn } = param;
                if (this.#exportsLookup.has(scriptRef)) {
                    const exports = this.#exportsLookup.get(scriptRef);
                    const fun = exports[fn];
                    fun.bind(self)(e);
                    return;
                }
                const rn = enhancedElement.getRootNode();
                const scriptEl = rn.getElementById(scriptRef);
                if (scriptEl === null)
                    throw '404';
                const base = await scriptEl.beEnhanced.whenResolved('be-exportable');
                const exports = base.exports;
                this.#exportsLookup.set(scriptRef, exports);
                const fun = exports[fn];
                fun.bind(self)(e);
            });
        }
        return {
            resolved: true,
        };
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
            ...propInfo,
            fnParams: {
                type: 'Object',
                parse: false,
            }
        },
        actions: {
            onFnParams: 'fnParams'
        }
    },
    superclass: BeFunctional
});
register(ifWantsToBe, upgrade, tagName);
