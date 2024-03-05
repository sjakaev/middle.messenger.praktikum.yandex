import Block from '../../core/Block.ts';
import template from './template.ts';

export interface INav {
    url?: string;
    page: string;
    title: string;
}

export default class Nav extends Block<INav> {
    render() {
        return this.compile(template, this._props);
    }
}
