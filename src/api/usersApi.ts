import BaseAPI from './baseApi.ts';

class Api extends BaseAPI {
    constructor() {
        super('/user');
    }

    changeSettings(data: object) {
        return this._http.put('/profile', data);
    }

    changeAvatar(data: object) {
        return this._http.put('/profile/avatar', data);
    }

    changePassword(data: object) {
        return this._http.put('/password', data);
    }

    searchUser(data: object) {
        return this._http.post('/search', data);
    }
}

const usersApi = new Api();
export default usersApi;
