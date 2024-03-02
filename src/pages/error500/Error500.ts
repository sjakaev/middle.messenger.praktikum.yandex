import Block from '../../core/Block.ts';
import ErrorInfo from '../../components/errorInfo/ErrorInfo.ts';
import template from './template.ts';

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

export default class Error500Page extends Block {
    constructor() {
        super('section', {
            errorInfo,
        });
    }
    render() {
        return this.compile(template);
    }
}
