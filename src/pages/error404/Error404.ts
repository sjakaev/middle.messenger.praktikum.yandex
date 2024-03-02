import Block from '../../core/Block.ts';
import ErrorInfo from '../../components/errorInfo/ErrorInfo.ts';
import template from './template.ts';

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

export default class Error404Page extends Block {
    constructor() {
        super('section', {
            errorInfo,
        });
    }
    render() {
        return this.compile(template);
    }
}
