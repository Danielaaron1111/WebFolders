// @vitest-environment jsdom
import { describe, it, expect, beforeEach, afterEach, beforeAll } from 'vitest';
import { JSDOM } from 'jsdom';
import path from 'path';


describe('The HTML file', () => {
    beforeAll(() => {
        // NOTE: Remember, JSDOM does not implement `.innerText` on elements
        //       because `.innerText` requires layout, which JSDOM does not support.
        //       Tests should use `.textContent` instead
        //       OR use the following in a beforeAll():
        Object.defineProperty(HTMLElement.prototype, 'innerText', {
            get: function () {
                return this.textContent;
            },
            set: function (str) {
                this.textContent = str.toString();
            }
        })
    });

    const indexFile = path.join(process.cwd(), 'index.html');
    beforeEach(async () => {
        await JSDOM.fromFile(indexFile).then(dom => document = dom.window.document);
    });

    it('should have one script tag', () => {
        const scripts = document.querySelectorAll('script');
        expect(scripts.length).toBe(1);
    });

    it('should have the script tag in the head', () => {
        const script = document.querySelector('head script');
        expect(script).not.toBeNull();
    });

    it('should not be an inline script', () => {
        const script = document.querySelector('script');
        expect(script.innerText).toBeUndefined();
    })

    it('should not have type="module" on script tag', () => {
        const script = document.querySelector('script');
        const type = script.type;
        expect(type).toBe('');
    });

    it('should have the defer attribute on script tag', () => {
        const script = document.querySelector('script');
        expect(script.defer).toBeTruthy();
    });

    it('should reference main.js as the source for the script', () => {
        const script = document.querySelector('script') ?? {};
        const source = script.src;
        expect(source).toMatch(/js\/main.js$/);
    })

    it('should not have the copyright year in the markup', () => {
        const copyright = document.getElementById('copyright');
        expect(copyright).toBeDefined();
        expect(copyright.textContent).toBe('');
    })

    it('should not have byline text in the markup', () => {
        const bylines = document.querySelectorAll('[data-byline]');
        expect(bylines.length).toBe(2);
        expect(bylines[0].textContent).toBe('');
        expect(bylines[1].textContent).toBe('');
    })
})