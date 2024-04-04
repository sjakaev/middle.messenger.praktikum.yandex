export interface IChatListItem {
    avatar: string;
    created_by: number;
    id: number;
    last_message: string;
    title: string;
    unread_count: number;
}

export interface IChatList {
    // eslint-disable-next-line no-unused-vars
    events?: { [key: string]: (event: Event) => void };
    items: IChatListItem[];
}
