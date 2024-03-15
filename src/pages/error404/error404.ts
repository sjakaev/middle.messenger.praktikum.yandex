import Block from '../../core/Block.ts';
import { ErrorInfo } from '../../components/index.ts';
import template from './template.ts';

interface IError404PageProps {
    errorInfo: ErrorInfo;
}

const errorInfo = new ErrorInfo(
    'div',
    {
        code: '404',
        message: 'Page not found',
        attr: {
            class: 'error-info',
        },
    },

);

export default class Error404Page extends Block<IError404PageProps> {
    constructor() {
        super('section', {
            errorInfo,
        });
    }
    render() {
        return this.compile(template, this._props);
    }
}
