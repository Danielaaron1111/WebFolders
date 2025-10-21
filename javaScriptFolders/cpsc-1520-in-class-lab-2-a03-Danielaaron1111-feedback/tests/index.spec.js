// @vitest-environment jsdom
import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import path from 'path';


describe('The HTML file', () => {
    const indexFile = path.join(process.cwd(), 'index.html');
    beforeEach(async () => {
        await JSDOM.fromFile(indexFile).then(dom => document = dom.window.document);
    });

    it('should have one `<script>` tag inside the document `<head>`', () => {
        // A) Only one script in the whole document
        const scripts = document.querySelectorAll('script');
        expect.soft(scripts.length).toBe(1);
        // B) Should have the script tag in the <head>
        const headScript = document.querySelector('head script');
        expect.soft(headScript).not.toBeNull();
        // C) Should not be an inline script
        expect.soft(headScript.innerText).toBeUndefined();
    });

    it('should reference main.js as the source for the script', () => {
        const headScript = document.querySelector('head script');
        // A) Should have type="module" on script tag
        expect.soft(headScript.type).toBe('module');
        // B) Should reference main.js
        expect.soft(headScript.src).toMatch(/js\/main.js$/);
    })
})