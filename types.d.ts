import {BeDecoratedProps, MinimalProxy} from 'be-decorated/types';

export interface EndUserProps {
    fnParams: {[key: string]: FnParam}
}

export interface VirtualProps extends EndUserProps, MinimalProxy{}

export type Proxy = Element & VirtualProps;

export interface ProxyProps extends VirtualProps{
    proxy: Proxy
}

export type PP = ProxyProps;

export interface Actions{
    intro(proxy: Proxy, target: Element, beDecorProps: BeDecoratedProps): void;
    onFnParams(pp: PP): void;
}

export interface FnParam{
    scriptRef: string;
    fn: string;
}