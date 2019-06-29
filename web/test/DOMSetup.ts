import { JSDOM } from 'jsdom';

const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const { window } = jsdom;

declare const global: any;

function copyProps(src: any, target: any) {
    Object.defineProperties(target, {
        ...Object.getOwnPropertyDescriptors(src),
        ...Object.getOwnPropertyDescriptors(target),
    });
}

const platform = process.platform || 'mac';
global.window = window;
global.document = window.document;
global.navigator = {
    userAgent: 'node.js',
    platform: platform,
    appName: 'my-app-name',
};
global.requestAnimationFrame = function(callback: () => void) {
    return setTimeout(callback, 0);
};
global.cancelAnimationFrame = function(id: number) {
    clearTimeout(id);
};
copyProps(window, global);

import { configure } from 'enzyme';
const Adapter = require('enzyme-adapter-react-16');

configure({ adapter: new Adapter() });
