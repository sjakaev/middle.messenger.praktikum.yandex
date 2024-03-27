const tmp = `
    {{#each items}}
        <div class="chat-item__wrapper">
            <div class="chat-item__first-column">
                <div class="chat-item__avatar"></div>
            </div>
            <div class="chat-item__second-column">
                <div class="chat-item__name">{{ chatName }}</div>
                <div class="chat-item__last-message">{{ lastMessage }}</div>
            </div>

            <div class="chat-item__third-column">
                <div class="chat-item__time">{{ time }}</div>
                <div class="chat-item__unread-count">{{ unreadsCount }}</div>
            </div>
        </div>
    {{/each}}
`;

export default tmp;
