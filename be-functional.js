import { define } from 'be-decorated/be-decorated.js';
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
            proxy.addEventListener(key, (e) => {
                const scriptEl = rn.querySelector(`#${param.from}`);
                const fn = scriptEl._modExports[param.fn];
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
            virtualProps: [],
            noParse: true,
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
