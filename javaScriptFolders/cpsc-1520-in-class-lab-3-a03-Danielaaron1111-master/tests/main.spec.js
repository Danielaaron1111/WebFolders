import { describe, test, it, expect, vi, beforeAll, beforeEach, afterAll } from 'vitest';
import { defineInnerText, readTestFile, resolvePath, spies as spyFor } from './__helpers';

describe('PROVIDED CODE: main.js driver', async () => {
    beforeAll(async () => {
        defineInnerText();
        document.body.innerHTML = readTestFile('main.html');
        await import(resolvePath('js', 'main.js'));
    });

    afterAll(() => {
        vi.resetAllMocks();
    })

    const DOM = (dataTestValue) => document.querySelector(`[data-test="${dataTestValue}"]`);

    it('should hide the main section element', () => {
        const expected = DOM('mainSection');
        expect(spyFor.fn_Hide).toHaveBeenCalledOnce();
        expect(spyFor.fn_Hide).toHaveBeenCalledWith(expected);
    });

    it('should un-hide the Show Resources button', () => {
        const expected = DOM('showResourcesButton');
        expect(spyFor.fn_Show).toHaveBeenCalledWith(expected);
    });

    it('should reveal the Theme Switching element', () => {
        const expected = DOM('showThemeButtons');
        expect(spyFor.fn_Show).toHaveBeenCalledWith(expected);
    });

    it('should supply the Show Resources button as the first parameter to showResources()', () => {
        const expected = DOM('showResourcesButton');
        expect(spyFor.fn_ShowResources).toHaveBeenCalledOnce();
        expect(spyFor.fn_ShowResources).toHaveBeenCalledWith(expected, expect.anything(), expect.anything());
    });

    it('should supply the main section element as the second parameter to showResources()', () => {
        const expected = DOM('mainSection');
        expect(spyFor.fn_ShowResources).toHaveBeenCalledOnce();
        expect(spyFor.fn_ShowResources).toHaveBeenCalledWith(expect.anything(), expected, expect.anything());
    });

    it('should supply the dialog element as the third parameter to showResources()', () => {
        const expected = DOM('dialogElement');
        expect(spyFor.fn_ShowResources).toHaveBeenCalledOnce();
        expect(spyFor.fn_ShowResources).toHaveBeenCalledWith(expect.anything(), expect.anything(), expected);
    });

    it('should supply the correct DOM element for turning on the dark theme', () => {
        const expected = DOM('btnDarkOn');
        expect(spyFor.fn_TurnOnDarkTheme).toHaveBeenCalledOnce();
        expect(spyFor.fn_TurnOnDarkTheme).toHaveBeenCalledWith(expected);
    });

    it('should supply the correct DOM element for turning off the dark theme', () => {
        const expected = DOM('btnDarkOff');
        expect(spyFor.fn_TurnOffDarkTheme).toHaveBeenCalledOnce();
        expect(spyFor.fn_TurnOffDarkTheme).toHaveBeenCalledWith(expected);
    });

    it('should supply the correct DOM element for responding to mouse events', () => {
        const expected = DOM('mainSection');
        expect(spyFor.fn_AddMouseHandlers).toHaveBeenCalledOnce();
        expect(spyFor.fn_AddMouseHandlers).toHaveBeenCalledWith(expected);
    });

    it('should supply the correct DOM element for responding to double-click events', () => {
        const expected = DOM('mainSection');
        expect(spyFor.fn_ToggleTagEmphasis).toHaveBeenCalledOnce();
        expect(spyFor.fn_ToggleTagEmphasis).toHaveBeenCalledWith(expected);
    });

    it('should supply the main section as the correct parameter to openPopoverOnClick()', () => {
        const expected = DOM('mainSection');
        expect(spyFor.fn_OpenPopoverOnClick).toHaveBeenCalledOnce();
        expect(spyFor.fn_OpenPopoverOnClick).toHaveBeenCalledWith(expected, expect.anything());
    });

    it('should supply the popover element as the correct parameter to the openPopoverOnClick()', () => {
        const expected = DOM('popoverElement');
        expect(spyFor.fn_OpenPopoverOnClick).toHaveBeenCalledOnce();
        expect(spyFor.fn_OpenPopoverOnClick).toHaveBeenCalledWith(expect.anything(), expected);
    });
});
