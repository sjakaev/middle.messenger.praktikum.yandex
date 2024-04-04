import Nav from '../../../components/nav/Nav.ts';

export interface IChatWindowBody {
    nav: Nav;
    activeChat: number;
    attr?: { [key: string]: string };
}
