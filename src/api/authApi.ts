import BaseAPI from './baseApi.ts';

class Api extends BaseAPI {
    constructor() {
        super('/auth');
    }

    signUp(data: object) {
        return this._http.post('/signup', data);
    }

    signIn(data: object) {
        return this._http.post('/signin', data);
    }

    getUser() {
        return this._http.get('/user');
    }

    logout() {
        return this._http.post('/logout');
    }
}

const authApi = new Api();
export default authApi;
