import Block from '../core/Block.ts';
import template from './template.ts';

interface ILayout {
    content: Object;
}

export default class IndexLayout extends Block<ILayout> {
    render() {
        return this.compile(template, this._props);
    }

    // componentDidUpdate(oldProps: any, newProps: any): boolean {
    //     return oldProps['title'] !== newProps['title'];
    // }
}
