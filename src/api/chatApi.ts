import BaseAPI from './baseApi.ts';

class Api extends BaseAPI {
    constructor() {
        super('/chats');
    }

    getChats() {
        return this._http.get('');
    }

    getChatUsers(id: number) {
        return this._http.get(`/${id}/users`);
    }

    createChat(data: object) {
        return this._http.post('', data);
    }

    deleteChat(data: object) {
        return this._http.delete('', data);
    }

    addUsersToChat(data: object) {
        return this._http.put('/users', data);
    }

    deleteUsersFromChat(data: object) {
        return this._http.delete('/users', data);
    }

    uploadChatAvatar(data: object) {
        return this._http.put('/avatar', data);
    }
}

const chatApi = new Api();
export default chatApi;

// for browser testing
(window as any).chatApi = chatApi;
