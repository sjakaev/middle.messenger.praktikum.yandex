const tmp = `
    <main class="chat">
        <div class="chat__wrapper">
            <div class="chat__sidebar">
                <div class="chat__user-settings">
                    {{{ userSettingsButton }}}
                </div>
                {{{ chatSearch }}}
                {{{ chatList }}}
                {{{ buttonCreateNewChat }}}
                {{{ buttonDeleteChat }}}
            </div>
            <div class="chat__window">
            {{#if activeChat}}
                {{{ chatWindowHeader }}}
                {{{ chatWindowBody }}}
                {{{ messageSendForm }}}
            {{else}}
                <p class="chat__default-text ">Select a chat to send a message</p>
            {{/if}}
            </div>
        </div>
    </main>
`;

export default tmp;
