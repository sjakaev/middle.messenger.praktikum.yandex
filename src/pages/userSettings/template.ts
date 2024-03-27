const tmp = `
    <main class="profile">
        <div class="profile__avatar-wrapper">
            <img class="profile__avatar-icon" src={{avatar}} alt="avatar" />
        </div>
        <div class="profile__name-wrapper">
            <p class="profile__name">Ivan</p>
        </div>

        <div class="profile__fields-wrapper">
            {{{ userSettingsForm }}}
            {{{ changePasswordForm }}}
        </div>

        <div class="profile__buttons-wrapper">
            {{{ buttonChangeData }}}
            {{{ buttonChangePassword}}}
            {{{ buttonLogOut }}}
        </div>
    </main>
`;

export default tmp;
