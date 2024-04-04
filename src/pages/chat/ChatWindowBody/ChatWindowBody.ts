import Block from '../../../core/Block.ts';
import template from './template.ts';
import {
    Nav,
} from '../../../components/index.ts';
import { IChatWindowBody } from './IChatWindowBody.ts';

const nav = new Nav();

export default class ChatWindowBody extends Block<IChatWindowBody> {
    constructor() {
        super('div', {
            nav,
        });
    }

    render() {
        return this.compile(template, this._props);
    }
}
