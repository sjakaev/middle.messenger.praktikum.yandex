import Route from './Route.ts';
import Block from './Block.ts';

interface IRouter {
    __instance?: IRouter | null;
    routes?: Array<any>;
    history?: History;
    _currentRoute?: any;
    _rootQuery?: any;
}

class Router implements IRouter {
    static __instance = null;
    routes;
    history;
    _currentRoute : any;
    _rootQuery;

    constructor(rootQuery : any) {
        if (Router.__instance) {
            // eslint-disable-next-line
            return Router.__instance;
        }

        this.routes = [];
        this.history = window.history;
        this._currentRoute = null;
        this._rootQuery = rootQuery;

        // @ts-expect-error - Router.__instance is assigned here to ensure singleton behavior
        Router.__instance = this;
    }

    use(pathname: string, block: Block) {
        const route = new Route(pathname, block, { rootQuery: this._rootQuery });

        this.routes?.push(route);

        return this;
    }

    start() {
        window.onpopstate = ((event) => {
            const pathname = (event.currentTarget as Window)?.location.pathname;
            this._onRoute(pathname);
        });

        this._onRoute(window.location.pathname);
    }

    _onRoute(pathname: string) {
        const route = this.getRoute(pathname);

        if (!route) {
            return;
        }

        if (this._currentRoute && this._currentRoute !== route) {
            this._currentRoute.leave();
        }

        this._currentRoute = route;

        route.render(route, pathname);
    }

    go(pathname: string) {
        this.history?.pushState({}, '', pathname);
        this._onRoute(pathname);
    }

    back() {
        this.history?.back();
    }

    forward() {
        this.history?.forward();
    }

    getRoute(pathname: string) {
        return this.routes?.find((route: string) => route.match(pathname));
    }
}

export default new Router('#app');
