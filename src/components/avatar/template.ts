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
`;

export default tpl;
