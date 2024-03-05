import tpl from './template.ts';
import Block from '../../core/Block.ts';

export interface IInput {
    name?: string;
    type?: string;
    placeholder?: string;
    label?: string;
    labelClass?: string;
    error?: string;
    readonly?: boolean;
    required?: boolean;
    disabled?: boolean;
    value?: string;
    class?: string;
    attr?: { [key: string]: string };
    // eslint-disable-next-line no-unused-vars
    events?: { [key: string]: (event: Event) => void };
}

export default class Input extends Block<IInput> {
    render() {
        return this.compile(tpl, this._props);
    }

    validateInput(validationFunction: any) {
        const inputItem = this._element.querySelector('.input__item');
        const inputValue = inputItem.getAttribute('value');
        const validationMessage = validationFunction(inputValue);

        if (validationMessage) {
            this.setProps({ error: validationMessage, value: inputValue });
        }

        if (!validationMessage && this._props.error) {
            this.setProps({ error: '', value: inputValue });
        }
    }

    validateConfirmPassword(password: string, confirmPassword: string) {
        const inputItem = this._element.querySelector('.input__item');
        const inputValue = inputItem.getAttribute('value');

        if (password !== confirmPassword) {
            this.setProps({ error: 'Password mismatch', value: inputValue });
        }

        if (password === confirmPassword) {
            this.setProps({ error: '', value: inputValue });
        }
    }

    _addEvents() {
        super._addEvents();

        this._element
            .querySelector('.input__item')
            .addEventListener('blur', this._props.events?.blur);
    }
}
