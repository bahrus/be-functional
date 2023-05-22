import {BE, propDefaults, propInfo} from 'be-enhanced/BE.js';
import {BEConfig} from 'be-enhanced/types';
import {XE} from 'xtal-element/XE.js';
import {Actions, AllProps, AP, PAP, ProPAP, POA} from './types';
import {register} from 'be-hive/register.js';

export class BeFunctional extends BE<AP, Actions> implements Actions{
    static  override get beConfig(){
        return {
            parse: true,
            primaryProp: 'fnParams',
            primaryPropReq: true,
        } as BEConfig
    }
    #exportsLookup = new Map<string, any>();
    onFnParams(self: this): Partial<AllProps> {
        const {fnParams, enhancedElement} = self;
        import('be-exportable/be-exportable.js');
        for(const key in fnParams){
            const param = fnParams[key];
            enhancedElement.addEventListener(key, async (e: Event) => {
                const {scriptRef, fn} = param;
                if(this.#exportsLookup.has(scriptRef)){
                    const exports = this.#exportsLookup.get(scriptRef);
                    const fun = exports[fn];
                    fun.bind(self)(e);
                    return;
                }
                const rn = enhancedElement.getRootNode() as DocumentFragment;
                const scriptEl = rn.getElementById(scriptRef);
                if(scriptEl === null) throw '404';
                const base = await (<any>scriptEl).beEnhanced.whenResolved('be-exportable');
                const exports = base.exports;
                this.#exportsLookup.set(scriptRef, exports);
                const fun = exports[fn]; 
                fun.bind(self)(e);

            });
        }
        return{
            resolved: true,
        } as PAP;
    }
}

export interface BeFunctional extends AllProps{}

const tagName = 'be-functional';
const ifWantsToBe = 'functional';
const upgrade = '*';

const xe = new XE<AP, Actions>({
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
        actions:{
            onFnParams: 'fnParams'
        }
    },
    superclass: BeFunctional
});

register(ifWantsToBe, upgrade, tagName);