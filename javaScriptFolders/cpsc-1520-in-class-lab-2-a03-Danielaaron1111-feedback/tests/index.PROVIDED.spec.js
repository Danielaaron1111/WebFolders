// @vitest-environment jsdom
import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import path from 'path';


describe('PROVIDED CODE: The HTML file', () => {
    const indexFile = path.join(process.cwd(), 'index.html');
    beforeEach(async () => {
        await JSDOM.fromFile(indexFile).then(dom => document = dom.window.document);
    });
    it.each(['first-value', 'second-value'])
    ('should have placeholder text in the %s element', (id) => {
        const element = document.getElementById(id);
        expect(element).toBeDefined();
        expect(element.textContent).toBe('TBD');
    })

    it.each(['add-result', 'subtract-result', 'multiply-result', 'divide-result', 'modulus-result', 'hypotenuse-result'])
    ('should not have hardcoded text in the %s element', (id) => {
        const element = document.getElementById(id);
        expect(element).toBeDefined();
        expect(element.textContent).toBe('');
    })
})