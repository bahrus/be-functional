import {define, BeDecoratedProps} from 'be-decorated/be-decorated.js';
import {BeFunctionalProps, BeFunctionalActions, BeFunctionalVirtualProps, FnParam} from './types';

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
            proxy.addEventListener(key, (e: Event) => {
                const scriptEl = rn.querySelector(`#${param.from}`) as HTMLScriptElement;
                const fn = (<any>scriptEl)._modExports[param.fn]
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
            virtualProps:[],
            noParse: true,
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
})