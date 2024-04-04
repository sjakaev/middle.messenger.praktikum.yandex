const tmp = `
    {{#each items}}
        <div class="chat-list__item" data-id={{id}}>
        <div class="chat-list__item-first-column">
            <div class="chat-list__item-avatar"></div>
        </div>
        <div class="chat-list__item-second-column">
            <div class="chat-list__item-name">{{ title }} (id: {{id}})</div>
            <div class="chat-list__item-last-message">{{ last_message }}</div>
        </div>

        <div class="chat-list__item-third-column">
            <div class="chat-list__item-time">13:55</div>
            <div class="chat-list__item-unread-count">{{ unread_count }}</div>
        </div>
    </div>
    {{/each}}
`;

export default tmp;
