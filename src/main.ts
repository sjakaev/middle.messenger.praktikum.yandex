import renderDOM from './utils/renderDOM.ts';
import IndexLayout from './layout/index.ts';

import {
    LoginPage,
    RegisterPage,
    ChatPage,
    Error404Page,
    Error500Page,
    UserSettingsPage,
} from './pages/index.ts';

const changePage = (newPage: any) => {
    // eslint-disable-next-line no-use-before-define
    page.setProps({ content: newPage });
};

const loginPage = new LoginPage();
const chatPage = new ChatPage();
const registerPage = new RegisterPage();
const error404Page = new Error404Page();
const error500Page = new Error500Page();
const userSettingsPage = new UserSettingsPage();

const page = new IndexLayout(
    'div',
    {
        content: loginPage,
        attr: {
            class: 'page',
        },
        events: {
            click: (e: any) => {
                if (e.target.getAttribute('page')) {
                    const newPage = e.target.getAttribute('page');
                    if (newPage === 'login') {
                        changePage(loginPage);
                    }
                    if (newPage === 'register') {
                        changePage(registerPage);
                    }

                    if (newPage === 'chat') {
                        changePage(chatPage);
                    }

                    if (newPage === 'error404') {
                        changePage(error404Page);
                    }

                    if (newPage === 'error500') {
                        changePage(error500Page);
                    }

                    if (newPage === 'user-settings') {
                        changePage(userSettingsPage);
                    }
                }
                e.preventDefault();
                e.stopPropagation();
            },
        },
    },
);

renderDOM('#app', page);
