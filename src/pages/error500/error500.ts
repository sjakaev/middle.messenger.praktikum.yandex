import Block from '../../core/Block.ts';
import { ErrorInfo } from '../../components/index.ts';
import template from './template.ts';

interface IError500Page {
    errorInfo: ErrorInfo;
}

const errorInfo = new ErrorInfo(
    'div',
    {
        code: '500',
        message: "We've already fixed it",
        attr: {
            class: 'error-info',
        },
    },

);

export default class Error500Page extends Block<IError500Page> {
    constructor() {
        super('section', {
            errorInfo,
        });
    }
    render() {
        return this.compile(template, this._props);
    }
}
