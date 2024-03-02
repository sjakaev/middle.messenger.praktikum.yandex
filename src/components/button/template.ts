const tpl = `
    {{ text }}
    {{#if icon}}
        <img class="message-send-form__send-icon" src="{{ icon }}" alt="{{ alt }}"/>
    {{/if}}
`;

export default tpl;
