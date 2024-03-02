/* eslint-disable no-unused-vars */
enum METHOD {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE',
  }

  type Options = {
    headers?: Record<string, string>;
    method: METHOD;
    data?: any;
  };

  type OptionsWithoutMethod = Omit<Options, 'method'>;

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
    get(
        url: string,
        options: OptionsWithoutMethod = {},
    ) {
        return this.request(url, { ...options, method: METHOD.GET });
    }

    post(
        url: string,
        options: OptionsWithoutMethod = {},
    ) {
        return this.request(url, { ...options, method: METHOD.POST });
    }

    put(
        url: string,
        options: OptionsWithoutMethod = {},
    ) {
        return this.request(url, { ...options, method: METHOD.POST });
    }

    delete(
        url: string,
        options: OptionsWithoutMethod = {},
    ) {
        return this.request(url, { ...options, method: METHOD.POST });
    }

    // eslint-disable-next-line class-methods-use-this
    request(
        url: string,
        options: Options = { method: METHOD.GET },
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
