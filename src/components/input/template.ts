const tpl = `
    <label
        class="{{#if label}}input__label{{/if}}{{#if labelClass}} {{labelClass}} {{/if}}"
        for="{{name}}"
    >
        {{label}}
    </label>
    <input
        class="input__item {{class}}{{#if error}} input__item-error{{/if}}"
        type="{{type}}"
        id="{{name}}"
        name="{{name}}"
        placeholder="{{placeholder}}"
        value="{{value}}"
        {{#if required}}required{{/if}}
        {{#if disabled}}disabled{{/if}}
        {{#if readonly}}readonly{{/if}}
    >
    {{#if error}}
        <span class="input__error-message">{{ error }}</span>
    {{/if}}
`;

export default tpl;
