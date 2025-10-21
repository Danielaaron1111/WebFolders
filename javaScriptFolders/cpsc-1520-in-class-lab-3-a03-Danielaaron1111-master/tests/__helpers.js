import fs from 'fs';
import path from 'path';

/**
 * resolvePath() is a wrapper for the @see {@link path.resolve} function
 * @param  {...any} paths - A sequence of paths or path segments
 * @returns {String} The fully-qualified path
 */
export const resolvePath = (...paths) => path.resolve(...paths);

/**
 * readTestFile() returns the contents of a file in the `~/tests/` folder
 * @param  {...any} paths - Typically just the file name, but can be a deeply nested file 
 * @returns {String} The contents of the file in the `~/tests/` folder
 */
export const readTestFile = (...paths) => fs.readFileSync(path.resolve('tests', ...paths));

/**
 * definInnerText() will add an `.innerText` property onto the 
 * `HTMLElement.prototype` whose implementation gets/sets the 
 * `.textContent` of a DOM element.
 * @description
 * HACK: Remember, JSDOM does not implement `.innerText` on elements
 *       because `.innerText` requires layout, which JSDOM does not support.
 *       This is a suitable hack, however, as long as you are expecting
 *       the DOM elements under test to only have text (no nested DOM elements).
 */
export const defineInnerText = function() {
    Object.defineProperty(HTMLElement.prototype, 'innerText', {
        get: function() {
            return this.textContent.toString();
        },
        set: function(str) {
            this.textContent = str.toString();
        }
    });
}

/* ______________________________ */
/* vvv  Custom Helpers Below  vvv */
import { vi } from 'vitest';
import * as lib from '../js/interactive'

/**
 * spies is an object with a vi.spyOn for each exported function from `../js/interactive`.
 * If using with more than one test, call `vi.resetAllMocks()` in an `afterEach()`.
 */
export const spies = {
    fn_Hide: vi.spyOn(lib, 'hide'),
    fn_Show: vi.spyOn(lib, 'show'),
    fn_TurnOnDarkTheme: vi.spyOn(lib, 'turnOnDarkTheme'),
    fn_TurnOffDarkTheme: vi.spyOn(lib, 'turnOffDarkTheme'),
    fn_ShowResources: vi.spyOn(lib, 'showResources'),
    fn_AddMouseHandlers: vi.spyOn(lib, 'addMouseHandlers'),
    fn_OpenPopoverOnClick: vi.spyOn(lib, 'openPopoverOnClick'),
    fn_ToggleTagEmphasis: vi.spyOn(lib, 'toggleTagEmphasis')
}
export const createSpies = () => {
    const spies = {};
    spies.fn_Hide = vi.spyOn(lib, 'hide');
    spies.fn_Show = vi.spyOn(lib, 'show');
    spies.fn_TurnOnDarkTheme = vi.spyOn(lib, 'turnOnDarkTheme');
    spies.fn_TurnOffDarkTheme = vi.spyOn(lib, 'turnOffDarkTheme');
    spies.fn_ShowResources = vi.spyOn(lib, 'showResources');
    spies.fn_AddMouseHandlers = vi.spyOn(lib, 'addMouseHandlers');
    spies.fn_OpenPopoverOnClick = vi.spyOn(lib, 'openPopoverOnClick');
    spies.fn_ToggleTagEmphasis = vi.spyOn(lib, 'toggleTagEmphasis');
    return spies;
}