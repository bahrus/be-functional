import {define, BeDecoratedProps} from 'be-decorated/be-decorated.js';
import {BeFunctionalProps, BeFunctionalActions} from './types';

export class BeFunctionalController implements BeFunctionalActions{

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
        controller:BeFunctionalController
    }
})