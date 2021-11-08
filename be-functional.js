import { define } from 'be-decorated/be-decorated.js';
import { register } from 'be-hive/register.js';
import { getProxy } from 'be-observant/getProxy.js';
export class BeFunctionalController {
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
                const scriptEl = rn.querySelector(`#${param.from}`);
                const proxy = await getProxy(scriptEl, 'exportable');
                console.log(proxy);
                const fn = scriptEl._modExport[param.fn];
                fn.bind(proxy)(e);
            });
        }
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
