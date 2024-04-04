/* eslint-disable no-unused-vars */

// eslint-disable-next-line no-shadow
enum METHOD {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE',
  }

type Options = {
    headers?: Record<string, string>;
    method?: METHOD;
    data?: any;
    timeout?: number;
};

type HTTPMethod = (url: string, options?: Options) => Promise<unknown>

function queryStringify(data: Record<string, any>) {
    if (typeof data !== 'object') {
        throw new Error('Data must be object');
    }

    const keys = Object.keys(data);
    return keys
        .reduce((result, key, index) => `${result}${key}
            = ${data[key]}${index < keys.length - 1 ? '&' : ''}`, '?');
}

class HTTPTransport {
    static API_URL = 'https://ya-praktikum.tech/api/v2';
    _baseUrl: string;

    constructor(endpoint: string) {
        this._baseUrl = `${HTTPTransport.API_URL}${endpoint}`;
    }

    get: HTTPMethod = (url, data = {}) => this
        .request(this._baseUrl + url, { data, method: METHOD.GET });

    post: HTTPMethod = (url, data = {}) => this
        .request(this._baseUrl + url, { data, method: METHOD.POST });

    put: HTTPMethod = (url, data = {}) => this
        .request(this._baseUrl + url, { data, method: METHOD.PUT });

    delete: HTTPMethod = (url, data = {}) => this
        .request(this._baseUrl + url, { data, method: METHOD.DELETE });

    // eslint-disable-next-line class-methods-use-this
    request(
        url: string,
        options: Options,
        timeout?: number,
    ) {
        const { headers = {}, method, data } = options;

        return new Promise((resolve, reject) => {
            if (!method) {
                reject(new Error('Method not found'));
                return;
            }

            const xhr = new XMLHttpRequest();
            const isGet = method === METHOD.GET;

            xhr.open(method, isGet && !!data ? `${url}${queryStringify(data)}` : url);

            Object.keys(headers).forEach((key) => {
                xhr.setRequestHeader(key, headers[key]);
            });

            if (timeout) {
                xhr.timeout = timeout;
            }

            xhr.onload = function onload() {
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve(xhr);
                } else {
                    reject(new Error(`Error: ${xhr.status}`));
                }
            };

            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;

            if (data instanceof FormData === false) {
                xhr.setRequestHeader('Content-Type', 'application/json');
            }

            xhr.withCredentials = true;
            xhr.responseType = 'json';

            if (isGet || !data) {
                xhr.send();
            } else if (data instanceof FormData) {
                xhr.send(data);
            } else {
                xhr.send(JSON.stringify(data));
            }
        });
    }
}

export default HTTPTransport;
