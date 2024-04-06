export interface IMessage {
    chat_id?: number;
    content: string;
    file?: null;
    id: number;
    is_read?: true;
    time: string;
    type: string;
    user_id: number;
}
