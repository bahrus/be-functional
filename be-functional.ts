import {define, BeDecoratedProps} from 'be-decorated/be-decorated.js';
import {BeFunctionalProps, BeFunctionalActions, BeFunctionalVirtualProps} from './types';

export class BeFunctionalController implements BeFunctionalActions{
    intro(proxy: Element & BeFunctionalVirtualProps, target: Element, beDecorProps: BeDecoratedProps){
        const attr = target.getAttribute(`is-${beDecorProps.ifWantsToBe}`);
        const params = JSON.parse(attr!);
        for(const key in params){
            target
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
        }
    },
    complexPropDefaults:{
        controller: BeFunctionalController
    }
})