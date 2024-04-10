import chai from 'chai';
import sinon from 'sinon';
import router from './Router.ts';
import Block from './Block.ts';

const { expect } = chai;

describe('Router', () => {
    let historyBackStub: any;
    let historyForwardStub: any;

    beforeEach(() => {
        historyBackStub = sinon.stub(window.history, 'back');
        historyForwardStub = sinon.stub(window.history, 'forward');
    });

    afterEach(() => {
        sinon.restore();
        historyBackStub.restore();
    });

    it('method "use" should add a new route', () => {
        class TestPage extends Block<any> {
            constructor() {
                const props = {};
                super('div', props);
            }
            render() {
                return this.compile('', this._props);
            }
        }
        const testPage = new TestPage();
        router.use('/test', testPage);
        const hasRoute = router.routes?.some((route: any) => route._pathname === '/test');
        expect(hasRoute).to.be.true;
    });

    it('method "go" should provide transition to the route', () => {
        router.go('/messenger');
        expect(window.location.pathname).to.equal('/messenger');
    });

    it('method "back" should call window.history.back', () => {
        router.back();
        expect(historyBackStub.calledOnce).to.be.true;
    });

    it('method "forward" should call window.history.forward', () => {
        router.forward();
        expect(historyForwardStub.calledOnce).to.be.true;
    });
});
