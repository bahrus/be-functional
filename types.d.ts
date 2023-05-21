import { ActionOnEventConfigs } from "trans-render/froop/types";
import {IBE} from 'be-enhanced/types';

export interface EndUserProps extends IBE {
    fnParams: {[key: string]: FnParam},
}

export interface AllProps extends EndUserProps {}

export type AP = AllProps;

export type PAP = Partial<AP>;

export type ProPAP = Promise<PAP>;

export type POA = [PAP | undefined, ActionOnEventConfigs<PAP, Actions>];



export interface Actions{
    onFnParams(self: this): PAP;
}

export interface FnParam{
    scriptRef: string;
    fn: string;
}