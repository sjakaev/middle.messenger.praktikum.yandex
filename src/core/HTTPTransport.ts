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
    get: HTTPMethod = (url, options = {}) => this
        .request(url, { ...options, method: METHOD.GET }, options.timeout);

    post: HTTPMethod = (url, options = {}) => this
        .request(url, { ...options, method: METHOD.POST }, options.timeout);

    put: HTTPMethod = (url, options = {}) => this
        .request(url, { ...options, method: METHOD.PUT }, options.timeout);

    delete: HTTPMethod = (url, options = {}) => this
        .request(url, { ...options, method: METHOD.DELETE }, options.timeout);

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

            xhr.onload = function () {
                resolve(xhr);
            };

            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;

            if (isGet || !data) {
                xhr.send();
            } else {
                xhr.send(data);
            }
        });
    }
}

export default HTTPTransport;
