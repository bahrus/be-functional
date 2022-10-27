import {define, BeDecoratedProps} from 'be-decorated/DE.js';
import {Proxy, PP, Actions, VirtualProps, FnParam, PPP} from './types';
import {register} from 'be-hive/register.js';

export class BeFunctionalController extends EventTarget implements Actions{
    #exportsLookup = new Map<string, any>();

    onFnParams({fnParams, self}: PP){
        for(const key in fnParams){
            const param = fnParams[key];
            self.addEventListener(key, async (e: Event) => {
                const {scriptRef, fn} = param;
                if(this.#exportsLookup.has(scriptRef)){
                    const exports = this.#exportsLookup.get(scriptRef);
                    const fun = exports[fn];
                    fun.bind(self)(e);
                    return;
                }
                const {importFromScriptRef} = await import('be-exportable/importFromScriptRef.js');
                const exports = await importFromScriptRef<any>(self, param.scriptRef);
                this.#exportsLookup.set(scriptRef, exports);
                const fun = exports[fn]; 
                fun.bind(self)(e);

            });
        }
        return{
            resolved: true,
        } as PPP;
    }
}


const tagName = 'be-functional';
const ifWantsToBe = 'functional';
const upgrade = '*';

define<
    Proxy & BeDecoratedProps<Proxy, Actions>,
    Actions
>({
    config:{
        tagName,
        propDefaults:{
            ifWantsToBe,
            upgrade,
            virtualProps:['fnParams'],
            primaryProp: 'fnParams',
            primaryPropReq: true,
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