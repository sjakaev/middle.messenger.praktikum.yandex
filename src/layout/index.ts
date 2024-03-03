import Block from '../core/Block.ts';
import template from './template.ts';

export default class IndexLayout extends Block {
    render() {
        return this.compile(template, this._props);
    }

    // componentDidUpdate(oldProps: any, newProps: any): boolean {
    //     return oldProps['title'] !== newProps['title'];
    // }
}
