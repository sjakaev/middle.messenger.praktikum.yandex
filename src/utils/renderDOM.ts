import Block from '../core/Block.ts';

export default function render(query: string, block: Block): HTMLElement | null {
    const root = document.querySelector(query) as HTMLElement;

    if (!root) {
        console.error(`No element found with query: ${query}`);
        return null;
    }

    const content = block.getContent();

    if (!(content instanceof Node)) {
        console.error('Block content is not a DOM node');
        return null;
    }

    root.appendChild(content);
    block.dispatchComponentDidMount();

    return root;
}
