import Block from '../../core/Block.ts';
import template from './template.ts';

interface NanItem {
    url: string;
    page: string;
    title: string;
}
export interface INavProps {
    url?: string;
    page: string;
    title: string;
    items?: NanItem[];
    attr?: { [key: string]: string };
}

export default class Nav extends Block<INavProps> {
    render() {
        return this.compile(template, this._props);
    }
}
