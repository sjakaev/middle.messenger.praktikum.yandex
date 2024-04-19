import chai from 'chai';
import sinonChai from 'sinon-chai';
import sinon, {
    SinonFakeXMLHttpRequest, SinonFakeXMLHttpRequestStatic,
} from 'sinon';
import HTTPTransport from './HTTPTransport.ts';

const { expect, use } = chai;
use(sinonChai);

describe('HTTPTransport', () => {
    let xhr: SinonFakeXMLHttpRequestStatic;
    let http: HTTPTransport;
    const requests: SinonFakeXMLHttpRequest[] = [];
    const API_URL = 'https://ya-praktikum.tech/api/v2';

    beforeEach(() => {
        xhr = sinon.useFakeXMLHttpRequest();
        // @ts-ignore
        global.XMLHttpRequest = xhr;
        xhr.onCreate = (req) => {
            requests.push(req);
        };
        http = new HTTPTransport('');
    });

    afterEach(() => {
        requests.length = 0;
        xhr.restore();
    });

    describe('GET', () => {
        it('should call request with correct method', () => {
            http.get('', {});
            const [request] = requests;
            expect(request.method).to.equal('GET');
        });

        it('should call request with correct URL', () => {
            const path = '/user';
            http.get(`${path}`, {});
            const [request] = requests;
            expect(request.url).to.equal(`${API_URL}${path}?`);
        });
    });

    describe('POST', () => {
        it('should call request with correct method', () => {
            http.post('', {});
            const [request] = requests;
            expect(request.method).to.equal('POST');
        });

        it('should call request with correct URL', () => {
            const path = '/user';
            http.post(`${path}`, {});
            const [request] = requests;
            expect(request.url).to.equal(`${API_URL}${path}`);
        });
    });

    describe('PUT', () => {
        it('should call request with correct method', () => {
            http.put('', {});
            const [request] = requests;
            expect(request.method).to.equal('PUT');
        });

        it('should call request with correct URL', () => {
            const path = '/user';
            http.put(`${path}`, {});
            const [request] = requests;
            expect(request.url).to.equal(`${API_URL}${path}`);
        });
    });

    describe('DELETE', () => {
        it('should call request with correct method', () => {
            http.delete('', {});
            const [request] = requests;
            expect(request.method).to.equal('DELETE');
        });

        it('should call request with correct URL', () => {
            const path = '/user';
            http.delete(`${path}`, {});
            const [request] = requests;
            expect(request.url).to.equal(`${API_URL}${path}`);
        });
    });
});
