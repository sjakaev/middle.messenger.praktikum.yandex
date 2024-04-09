const tmp = `
    <div class="chat-window-header">
        <div class="chat-window-header__title-wrapper">
            <p class="chat-window-header__title">
                {{{ chatName }}}
            </p>
            <p class="chat-window-header__users">
                users: {{{ usersFormattedString }}}
            </p>
        </div>
        {{{ userSettingsButton }}}
        <div class="chat-window-header__settings-wrapper">
            {{{ addUsersButton }}}
            {{{ deleteUsersButton }}}
        </div>
    </div>
`;

export default tmp;
