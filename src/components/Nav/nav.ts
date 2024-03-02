import Block from '../../core/Block.ts';
import template from './template.ts';

export default class Nav extends Block {
    render() {
        return this.compile(template);
    }
}
