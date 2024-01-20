import Handlebars from "handlebars";
export { default as userSettings } from './userSettings.hbs?raw';
import avatar from '../../assets/default-avatar.svg'

Handlebars.registerHelper('avatar', () => {
    return avatar
})
