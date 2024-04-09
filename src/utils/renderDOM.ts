import Block from '../core/Block.ts';

export default function render(query: string, block: Block): HTMLElement | null {
    const root = document.querySelector(query) as HTMLElement;

    if (!root) {
        // eslint-disable-next-line
        console.error(`No element found with query: ${query}`);
        return null;
    }

    const content = block.getContent();

    if (!(content instanceof Node)) {
        // eslint-disable-next-line
        console.error('Block content is not a DOM node');
        return null;
    }

    root.appendChild(content);
    block.dispatchComponentDidMount();

    return root;
}
