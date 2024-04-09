const tmp = `
    <main class="profile">
        {{{ userAvatar }}}
        <div class="profile__fields-wrapper">
            {{{ userSettingsForm }}}
            {{{ changePasswordForm }}}
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
