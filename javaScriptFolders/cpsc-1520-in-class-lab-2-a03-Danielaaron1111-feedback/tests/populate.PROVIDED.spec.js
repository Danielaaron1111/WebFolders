// @vitest-environment jsdom
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { JSDOM } from 'jsdom';
import { populateWithRandomValues } from '../js/populate';

describe('PROVIDED CODE: `populate.js`', () => {
    const originalRandom = Math.ceil;
    beforeEach(() => {
        const dom = new JSDOM('<span id="first-value">TBD</span><span id="second-value">TBD</span>');
        document = dom.window.document;
    });
    afterEach(() => {
        Math.ceil = originalRandom;
    });

    it.each([
        { selector: '#first-value', value: 8 },
        { selector: '#second-value', value: 9 }
    ])
    ('should replace the inner text of the $selector element with the random number $value', ({ selector, value }) => {
        Math.ceil = vi.fn(() => value);
        populateWithRandomValues(document.querySelector('#first-value'), document.querySelector('#second-value'));
        expect(document.querySelector(selector).innerText).toBe(value);
    })

    it('should be calling Math.ceil twice', () => {
        const spy = vi.spyOn(Math, 'ceil');
        populateWithRandomValues(document.querySelector('#first-value'), document.querySelector('#second-value'));
        expect(spy).toHaveBeenCalledTimes(2);
    })

    it('should be calling Math.random twice', () => {
        const spy = vi.spyOn(Math, 'random');
        populateWithRandomValues(document.querySelector('#first-value'), document.querySelector('#second-value'));
        expect(spy).toHaveBeenCalledTimes(2);
    })
});