import sinon from 'sinon';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import Block from './Block.ts';

const { expect, use } = chai;
use(sinonChai);

interface TestProps {
    text: string;
    events?: { click?: () => void; };
    attr?: { [key: string]: string };
    children?: any;
}

const template = '<span>{{ text }}</span>';

class TestBlock extends Block<TestProps> {
    render() {
        return this.compile(template, this._props);
    }
}

describe('Block', () => {
    it('should create a valid instance', () => {
        const block = new TestBlock('div', { text: 'Hello World' });

        expect(block.getContent().outerHTML).equal('<div><span>Hello World</span></div>');
    });

    it('should add attributes', () => {
        const block = new TestBlock('div', { text: '', attr: { id: '13' } });

        expect(block.getContent().outerHTML).equal('<div id="13"><span></span></div>');
    });

    it('should add children', () => {
        const child = new TestBlock('div', { text: 'Child' });
        const block = new TestBlock('div', { children: child });

        const childrenBlock = block._children.children as Block;
        const childrenContent = childrenBlock._element as HTMLElement;

        expect(childrenContent.innerHTML).to.equal('<span>Child</span>');
    });

    it('should add events', () => {
        const handleClick = sinon.spy();
        const block = new TestBlock('section', {
            text: 'text',
            events: {
                click: handleClick,
            },
        });

        const blockContent = block.getContent();
        blockContent.click();

        // eslint-disable-next-line no-unused-expressions
        expect(handleClick.calledOnce).to.be.true;
    });

    it('should set props', () => {
        const block = new TestBlock('div', { text: 'Hi!' });
        block.setProps({ text: 'Bye!' });

        expect(block.getContent().outerHTML).equal('<div><span>Bye!</span></div>');
    });
});
