interface ILastMessageUserInfo {
    avatar: string;
    display_name: string;
    first_name: string;
    login: string;
    second_name: string;
}

interface ILastMessageInfo {
    content: string;
    id: number;
    time: string;
    user: ILastMessageUserInfo;
}

export interface IChatListItem {
    avatar: string;
    created_by: number;
    id: number;
    last_message: ILastMessageInfo;
    title: string;
    unread_count: number;
}

export interface IChatList {
    // eslint-disable-next-line no-unused-vars
    events?: { [key: string]: (event: Event) => void };
    items: IChatListItem[];
}
