import { define } from 'be-decorated/DE.js';
import { register } from 'be-hive/register.js';
export class BeFunctionalController extends EventTarget {
    #exportsLookup = new Map();
    intro(proxy, target, beDecorProps) {
        const attr = target.getAttribute(`is-${beDecorProps.ifWantsToBe}`);
        const params = JSON.parse(attr);
        proxy.fnParams = params;
    }
    onFnParams({ fnParams, proxy }) {
        const rn = proxy.getRootNode();
        for (const key in fnParams) {
            const param = fnParams[key];
            proxy.addEventListener(key, async (e) => {
                const { scriptRef, fn } = param;
                if (this.#exportsLookup.has(scriptRef)) {
                    const exports = this.#exportsLookup.get(scriptRef);
                    const fun = exports[fn];
                    fun.bind(proxy)(e);
                    return;
                }
                const { importFromScriptRef } = await import('be-exportable/importFromScriptRef.js');
                const exports = await importFromScriptRef(proxy, param.scriptRef);
                this.#exportsLookup.set(scriptRef, exports);
                const fun = exports[fn];
                fun.bind(proxy)(e);
            });
        }
        proxy.resolved = true;
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
            noParse: true,
            intro: 'intro',
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
