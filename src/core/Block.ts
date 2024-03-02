// eslint-disable-next-line max-classes-per-file

import Handlebars from 'handlebars';
import EventBus from './EventBus.ts';

export default class Block {
    static EVENTS = {
        INIT: 'init',
        FLOW_CDM: 'flow:component-did-mount',
        FLOW_CDU: 'flow:component-did-update',
        FLOW_RENDER: 'flow:render',
    };

    _props;
    _id;
    _children;
    _element: any;
    _meta;
    _eventBus;
    _setUpdate = false;

    constructor(tagName = 'div', propsAndChilds = {}) {
        const { children, props } = this.getChildren(propsAndChilds);

        this._eventBus = new EventBus();
        this._meta = { tagName, props };
        this._id = 1;
        this._props = this.makePropsProxy(props);
        this._children = this.makePropsProxy(children);
        this.registerEvents();
        this._eventBus.emit(Block.EVENTS.INIT);
    }

    registerEvents() {
        this._eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        this._eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        this._eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        this._eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    init() {
        this._element = this.createDocumentElement(this._meta?.tagName);
        this._eventBus.emit(Block.EVENTS.FLOW_RENDER);
    }

    // eslint-disable-next-line class-methods-use-this
    createDocumentElement(tagName) {
        const element = document.createElement(tagName);

        return element;
    }

    _render() {
        const block = this.render();
        this.removeEvents();
        this._element.innerHTML = '';
        this._element.appendChild(block);
        this.addEvents();
        this.addAttributes();
    }

    render() {}

    addEvents() {
        const { events = {} } = this._props;

        if (!events) return;
        Object.keys(events).forEach((eventName) => {
            this._element.addEventListener(eventName, events[eventName]);
        });
    }

    addAttributes() {
        const { attr = {} } = this._props;

        if (!attr || !this._element) return;

        Object.entries(attr).forEach(([key, velue]) => {
            this._element!.setAttribute(key, velue);
        });
    }

    removeEvents() {
        const { events = {} } = this._props;

        if (!events || !this._element) return;

        Object.keys(events).forEach((eventName) => {
            this._element!.removeEventListener(eventName, events[eventName]);
        });
    }

    _componentDidMount() {
        this.componentDidMount();
        Object.values(this._children).forEach((child) => child.dispatchComponentDidMount());
    }

    componentDidMount() {}

    dispatchComponentDidMount() {
        this._eventBus.emit(Block.EVENTS.FLOW_CDM);
        if (Object.keys(this._children).length) {
            this._eventBus.emit(Block.EVENTS.FLOW_RENDER);
        }
    }

    _componentDidUpdate(oldProps, newProps) {
        const isReRender = this.componentDidUpdate(oldProps, newProps);

        if (isReRender) {
            this._eventBus.emit(Block.EVENTS.FLOW_RENDER);
        }
    }

    // eslint-disable-next-line
    componentDidUpdate(oldProps, newProps) {
        return true;
    }

    setProps = (nextProps: any) => {
        if (!nextProps) {
            return;
        }

        const { children, props } = this.getChildren(nextProps);

        if (Object.values(children).length) {
            Object.assign(this._children, children);
        }

        if (Object.values(props).length) {
            Object.assign(this._props, props);
        }

        this._eventBus.emit(Block.EVENTS.FLOW_RENDER);
    };

    // eslint-disable-next-line class-methods-use-this
    getChildren(propsAndChilds) {
        const children = {};
        const props = {};

        Object.keys(propsAndChilds).forEach((key) => {
            if (propsAndChilds[key] instanceof Block) {
                children[key] = propsAndChilds[key];
            } else {
                props[key] = propsAndChilds[key];
            }
        });

        return { children, props };
    }

    compile(template, props) {
        if (typeof (props) === 'undefined') {
            // eslint-disable-next-line no-param-reassign
            props = this._props;
        }

        const propsAndStubs = { ...props };

        Object.entries(this._children).forEach(([key, child]) => {
            propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
        });

        const fragment = this.createDocumentElement('template');
        fragment.innerHTML = Handlebars.compile(template)(propsAndStubs);

        Object.values(this._children).forEach((child) => {
            const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
            if (stub) {
                stub.replaceWith(child.getContent());
            }
        });

        return fragment.content;
    }

    makePropsProxy(props) {
        const self = this;
        return new Proxy(props, {
            get(target, prop) {
                const value = target[prop];
                return typeof value === 'function' ? value.bind(target) : value;
            },
            set(target, prop, value) {
                const oldValue = { ...target };
                // eslint-disable-next-line no-param-reassign
                target[prop] = value;
                self._eventBus.emit(Block.EVENTS.FLOW_CDU, oldValue, target);
                return true;
            },
        });
    }

    show() {
        this.getContent().style.display = 'block';
    }

    hide() {
        this.getContent().style.display = 'none';
    }

    getContent() {
        return this._element;
    }
}
