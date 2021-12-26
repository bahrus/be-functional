import {define, BeDecoratedProps} from 'be-decorated/be-decorated.js';
import {BeFunctionalProps, BeFunctionalActions, BeFunctionalVirtualProps, FnParam} from './types';
import {register} from 'be-hive/register.js';

export class BeFunctionalController implements BeFunctionalActions{
    intro(proxy: Element & BeFunctionalVirtualProps, target: Element, beDecorProps: BeDecoratedProps){
        const attr = target.getAttribute(`is-${beDecorProps.ifWantsToBe}`);
        const params = JSON.parse(attr!) as {[key: string]: FnParam};
        proxy.fnParams = params;
    }
    onFnParams({fnParams, proxy}: this){
        const rn = proxy.getRootNode() as DocumentFragment;
        for(const key in fnParams){
            const param = fnParams[key];
            proxy.addEventListener(key, async (e: Event) => {
                const scriptEl = rn.querySelector(`#${param.scriptRef}`) as HTMLScriptElement;
                //TODO check if data-loaded is true, if not, add event handler for "load", then bind.
                //Do that before creating the addEventListener on the proxy.
                const fn = (<any>scriptEl)._modExport[param.fn]
                fn.bind(proxy)(e);
            });
        }
    }
}

export interface BeFunctionalController extends BeFunctionalProps{

}

const tagName = 'be-functional';
const ifWantsToBe = 'functional';
const upgrade = '*';

define<
    BeFunctionalProps & BeDecoratedProps<BeFunctionalProps, BeFunctionalActions>,
    BeFunctionalActions
>({
    config:{
        tagName,
        propDefaults:{
            ifWantsToBe,
            upgrade,
            virtualProps:['fnParams'],
            noParse: true,
            intro: 'intro',
        },
        actions:{
            onFnParams:{
                ifAllOf:['fnParams']
            }
        }
    },
    complexPropDefaults:{
        controller: BeFunctionalController
    }
});

register(ifWantsToBe, upgrade, tagName);