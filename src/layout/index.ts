import Block from '../core/Block.ts';
import template from './template.ts';

interface ILayoutProps {
    content: Object;
    attr?: { [key: string]: string };
    // eslint-disable-next-line no-unused-vars
    events?: { [key: string]: (event: Event) => void };
}

export default class IndexLayout extends Block<ILayoutProps> {
    render() {
        return this.compile(template, this._props);
    }

    // componentDidUpdate(oldProps: any, newProps: any): boolean {
    //     return oldProps['title'] !== newProps['title'];
    // }
}
