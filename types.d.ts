import {BeDecoratedProps} from 'be-decorated/types';

export interface BeFunctionalVirtualProps{

}
export interface BeFunctionalProps extends BeFunctionalVirtualProps{
    proxy: Element & BeFunctionalVirtualProps;
}

export interface BeFunctionalActions{
    intro(proxy: Element & BeFunctionalVirtualProps, target: Element, beDecorProps: BeDecoratedProps): void;
}