// import renderDOM from './utils/renderDOM.ts';
// import IndexLayout from './layout/index.ts';
import Router from './core/Router.ts';

import {
    LoginPage,
    RegisterPage,
    ChatPage,
    Error404Page,
    Error500Page,
    UserSettingsPage,
} from './pages/index.ts';

Router
    .use('/', LoginPage)
    .use('/error404', Error404Page)
    .use('/messenger', ChatPage)
    .use('/sign-up', RegisterPage)
    .use('/error500', Error500Page)
    .use('/settings', UserSettingsPage)
    .start();
