import {BeDecoratedProps} from 'be-decorated/types';

export interface BeFunctionalVirtualProps{
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
    from: string;
    fn: string;
}