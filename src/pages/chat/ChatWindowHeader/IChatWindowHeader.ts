import {
    Button,
} from '../../../components/index.ts';
import { IUser } from '../IChat.ts';

export interface IChatWindowHeader {
    chatName: string;
    chatId: number;
    users: IUser[];
    usersFormattedString: string;
    userSettingsButton: Button,
    addUsersButton: Button,
    deleteUsersButton: Button,
}
