const tmp = `
    <main class="profile">
        <div class="profile__fields-wrapper">
            {{{ userAvatar }}}
            {{{ userSettingsForm }}}
            {{{ changePasswordForm }}}

            {{{ buttonSaveUserSettings}}}
            {{{ buttonSavePassword }}}
            {{{ buttonCancel }}}
        </div>

        <div class="profile__buttons-wrapper">
            {{{ buttonChangeData }}}
            {{{ buttonChangePassword}}}
            {{{ buttonLogOut }}}
        </div>
        {{{ buttonBackToMessenger }}}
    </main>
`;

export default tmp;
