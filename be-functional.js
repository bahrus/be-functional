import { define } from 'be-decorated/DE.js';
import { register } from 'be-hive/register.js';
export class BeFunctionalController extends EventTarget {
    #exportsLookup = new Map();
    onFnParams({ fnParams, self }) {
        for (const key in fnParams) {
            const param = fnParams[key];
            self.addEventListener(key, async (e) => {
                const { scriptRef, fn } = param;
                if (this.#exportsLookup.has(scriptRef)) {
                    const exports = this.#exportsLookup.get(scriptRef);
                    const fun = exports[fn];
                    fun.bind(self)(e);
                    return;
                }
                const { importFromScriptRef } = await import('be-exportable/importFromScriptRef.js');
                const exports = await importFromScriptRef(self, param.scriptRef);
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
define({
    config: {
        tagName,
        propDefaults: {
            ifWantsToBe,
            upgrade,
            virtualProps: ['fnParams'],
            primaryProp: 'fnParams',
            primaryPropReq: true,
        },
        actions: {
            onFnParams: {
                ifAllOf: ['fnParams']
            }
        }
    },
    complexPropDefaults: {
        controller: BeFunctionalController
    }
});
register(ifWantsToBe, upgrade, tagName);
