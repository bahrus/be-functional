import {BE, propDefaults, propInfo} from 'be-enhanced/BE.js';
import {BEConfig} from 'be-enhanced/types';
import {XE} from 'xtal-element/XE.js';
import {Actions, AllProps, AP, PAP, ProPAP, POA} from './types';
import {register} from 'be-hive/register.js';

export class BeFunctional extends BE<AP, Actions> implements Actions{
    onFnParams(self: this): Partial<AllProps> {
        return {};
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
            ...propInfo
        },
        actions:{

        }
    },
    superclass: BeFunctional
});

register(ifWantsToBe, upgrade, tagName);