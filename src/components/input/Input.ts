import tpl from './template.ts';
import Block from '../../core/Block.ts';

export default class Input extends Block {
    render() {
        return this.compile(tpl, this._props);
    }

    setAttributeValue(event) {
        const newValue = event.target.value;
        const inputValue = this._element.querySelector('.input__item');
        inputValue.setAttribute('value', newValue);
    }

    validateInput(validationFunction) {
        const inputItem = this._element.querySelector('.input__item');
        const inputValue = inputItem.getAttribute('value');
        const validationMessage = validationFunction(inputValue);

        if (validationMessage) {
            this.setProps({ error: validationMessage, value: '' });
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

    addEvents() {
        this._element
            .querySelector('.input__item')
            .addEventListener('blur', this._props.events?.blur);

        this._element
            .querySelector('.input__item')
            .addEventListener('focus', this._props.events?.focus);

        this._element
            .querySelector('.input__item')
            .addEventListener('input', this.setAttributeValue.bind(this));

        super.addEvents();
    }
}