import Handlebars from 'handlebars';
import avatar from '../../assets/default-avatar.svg';
import { UserSettingsField } from './userSettingsField/index.ts';
import './userSettingsField/userSettingsField.scss';

export { default as userSettings } from './userSettings.hbs?raw';

Handlebars.registerPartial('UserSettingsField', UserSettingsField);
Handlebars.registerHelper('avatar', () => avatar);
