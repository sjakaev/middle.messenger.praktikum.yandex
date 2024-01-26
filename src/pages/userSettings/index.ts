import Handlebars from "handlebars";
export { default as userSettings } from './userSettings.hbs?raw';
import avatar from '../../assets/default-avatar.svg';
import {UserSettingsField} from "./userSettingsField/index.ts";
import "./userSettingsField/userSettingsField.scss";

Handlebars.registerPartial('UserSettingsField', UserSettingsField);
Handlebars.registerHelper('avatar', () => {
    return avatar
})
