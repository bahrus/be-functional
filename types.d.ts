import {BeDecoratedProps, MinimalProxy} from 'be-decorated/types';

export interface BeFunctionalVirtualProps extends MinimalProxy{
    fnParams: {[key: string]: FnParam}
}
export interface BeFunctionalProps extends BeFunctionalVirtualProps{
    proxy: Element & BeFunctionalVirtualProps;
}

export interface BeFunctionalActions{
    intro(proxy: Element & BeFunctionalVirtualProps, target: Element, beDecorProps: BeDecoratedProps): void;
    onFnParams(self: this): void;
}

export interface FnParam{
    scriptRef: string;
    fn: string;
}