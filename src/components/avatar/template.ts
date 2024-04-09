const tpl = `
    <div class="avatar">
        <img class="avatar__image" src={{src}} alt="avatar" />
        <input
            class="avatar__input"
            name="avatar"
            accept="image/*"
            type="file"
            class="profile__avatar-input"
            id="avatar"
        />
    </div>
    {{#if displayName}}
        <div class="avatar__name-wrapper">
            <p class="avatar__name">{{{ displayName }}}</p>
        </div>
    {{/if}}
`;

export default tpl;
