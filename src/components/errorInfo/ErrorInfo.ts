import Block from '../../core/Block.ts';
import template from './template.ts';

export default class ErrorInfo extends Block {
    render() {
        return this.compile(template);
    }
}