const tmp = `
    <main class="profile">
        <div class="profile__avatar-wrapper">
            <img class="profile__avatar-icon" src={{avatar}} alt="avatar" />
        </div>
        <div class="profile__name-wrapper">
            <p class="profile__name">Ivan</p>
        </div>

        <div class="profile__fields-wrapper">
            <form name="user-settings">
                {{{ userSettingsMail }}}
                {{{ userSettingsLogin }}}
                {{{ userSettingsFirstName }}}
                {{{ userSettingsSecondName }}}
                {{{ userSettingsDisplayName }}}
                {{{ userSettingsPhoneNumber }}}
                {{{ buttonSaveUserSettings }}}
            </form>
        </div>

        <div class="profile__buttons-wrapper">
            <div class="profile__button-wrapper">
                {{{ buttonChangeData }}}
            </div>
            <div class="profile__button-wrapper">
                {{{ buttonChangePassword}}}
            </div>
            <div class="profile__button-wrapper">
                {{{ buttonLogOut }}}
            </div>
        </div>
    </main>
`;

export default tmp;
