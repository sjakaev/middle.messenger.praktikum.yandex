import Block from '../../core/Block.ts';
import template from './template.ts';

export interface IErrorInfo {
    code: string;
    message: string;
}

export default class ErrorInfo extends Block<IErrorInfo> {
    render() {
        return this.compile(template, this._props);
    }
}
