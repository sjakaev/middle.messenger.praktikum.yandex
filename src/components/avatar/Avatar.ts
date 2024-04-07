import Block from '../../core/Block.ts';
import tpl from './template.ts';

export interface IAvatarProps {
    displayName?: string;
    src?: string;
    attr?: { [key: string]: string };
    // eslint-disable-next-line no-unused-vars
    events?: { [key: string]: (event: Event) => void };
}

export default class Avatar extends Block<IAvatarProps> {
    constructor(props: IAvatarProps) {
        super('div', props);
    }
    render(): DocumentFragment {
        return this.compile(tpl, this._props);
    }
}
