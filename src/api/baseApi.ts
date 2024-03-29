import HTTPTransport from '../core/HTTPTransport.ts';

export default class BaseAPI {
    _http: HTTPTransport;

    constructor(endpoint: string) {
        this._http = new HTTPTransport(endpoint);
    }
}
