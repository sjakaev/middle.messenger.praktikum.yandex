const tmp = `
    <div
        class="chat-message__element {{#if isResponse}}chat-message__element_type_responce{{/if}}"
    >
        {{{ messageInfo.content }}}
    </div>
`;

export default tmp;
