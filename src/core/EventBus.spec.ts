import sinon from 'sinon';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import EventBus from './EventBus.ts';

const { expect, use } = chai;
use(sinonChai);

describe('EventBus', () => {
    let eventBus: EventBus;

    beforeEach(() => {
        eventBus = new EventBus();
    });

    it('method "on" should register the event', () => {
        const callback = sinon.spy();
        eventBus.on('testEvent', callback);
        eventBus.emit('testEvent');
        expect(callback).to.have.been.called;
    });

    it('method "off" should unregister an event', () => {
        const callback = sinon.spy();
        eventBus.on('testEvent', callback);
        eventBus.off('testEvent', callback);
        eventBus.emit('testEvent');
        expect(callback).to.not.have.been.called;
    });
});
