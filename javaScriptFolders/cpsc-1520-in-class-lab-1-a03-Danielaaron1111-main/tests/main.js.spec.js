// @vitest-environment jsdom
// See footnote #1 below
import { describe, it, expect, beforeEach, afterEach, vi, beforeAll } from 'vitest';
import { JSDOM, VirtualConsole } from 'jsdom';
import path from 'path';


describe('The main.js file', async () => {
    beforeAll(() => {
        // NOTE: Remember, JSDOM does not implement `.innerText` on elements
        //       because `.innerText` requires layout, which JSDOM does not support.
        //       Tests should use `.textContent` instead
        //       OR use the following in a beforeAll():
        Object.defineProperty(HTMLElement.prototype, 'innerText', {
            get: function () {
                return this.textContent.toString();
            },
            set: function (str) {
                this.textContent = str.toString();
            }
        })
    });

    let consoleLog = undefined;
    let consoleError = undefined;
    let dom;
    beforeEach(async () => {
        const indexFile = path.resolve(process.cwd(), 'index.html');
        consoleLog = vi.spyOn(console, 'log');
        consoleError = vi.spyOn(console, 'error');
        const virtualConsole = new VirtualConsole();
        virtualConsole.sendTo(console);
        await JSDOM.fromFile(indexFile, {
            virtualConsole,
            runScripts: 'dangerously',
            resources: 'usable'
        }).then(d => {
            dom = d;
            document = dom.window.document;
        });
        await new Promise((resolve) =>
            dom.window.addEventListener('load', resolve)
        );
    });

    afterEach(() => {
        vi.clearAllMocks();
    })


    it('should indicate the script has been loaded in the console', async () => {
        expect(consoleLog).toBeCalled();
        expect(consoleLog).toHaveBeenLastCalledWith('loaded');
    })

    it('should change the copyright text programmatically', () => {
        const copyright = document.getElementById('copyright');
        expect(copyright.innerText).toBeDefined();
    })

    it('should use the current year for the copyright', () => {
        // NOTE: This is NOT resilient: The student might just hardcode the year
        const expected = new Date().getFullYear().toString();
        const copyright = document.getElementById('copyright');
        expect(copyright.innerText.toString()).toBe(expected);
    })

    it('should inject byline text programmatically', () => {
        const bylines = document.querySelectorAll('[data-byline]');
        expect(bylines.length).toBe(2);
        expect.soft(bylines[0].innerText).toBeDefined();
        expect.soft(bylines[1].innerText).toBeDefined();
    })

    it('should have the byline text start with the word "by"', () => {
        const bylines = document.querySelectorAll('[data-byline]');
        expect(bylines.length).toBe(2);
        expect.soft(bylines[0].innerText).toMatch(/^by /);
        expect.soft(bylines[1].innerText).toMatch(/^by /);
    })

    it('should have a name in the byline elements', () => {
        const bylines = document.querySelectorAll('[data-byline]');
        expect(bylines.length).toBe(2);
        const cleaned = Array.from(bylines).map(x => x.innerText.replace(/^by /, '').replace(/\s+/g, ''));
        const because = "The byline name should be at least three characters in length";
        expect.soft(cleaned[0].length, because).toBeGreaterThanOrEqual(3);
        expect.soft(cleaned[1].length, because).toBeGreaterThanOrEqual(3);
        expect.soft(cleaned[0].toLowerCase(), 'because you should be using your real name').not.toContain('stewartdent');
        expect.soft(cleaned[1].toLowerCase(), 'because you should be using your real name').not.toContain('stewartdent');
    })

    it('should not generate any console errors in the script', async () => {
        expect(consoleError).not.toBeCalled();
    });
})


/* Footnote #1:
    When trying to spy on the console as it is loaded/parsed by JSDOM, it will only work if the script is NOT brought in as a `type="module"`.
    So, you should prefer <script src=".." defer></script>
 */
