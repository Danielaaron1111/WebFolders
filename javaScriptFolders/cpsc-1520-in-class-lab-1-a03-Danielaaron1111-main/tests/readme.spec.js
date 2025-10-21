import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import os from 'os';

describe('ReadMe documentation', () => {
    const readMePath = path.resolve(process.cwd(), 'README.md');
    const contents = fs.readFileSync(readMePath, { encoding: 'utf-8' });
    const newline = os.EOL;

    it('should have the student name in the third line', () => {
        const lines = contents.split(newline);
        const name = lines[2]
            .replace(/> Your Name:/, '')
            .replace(/\s+/g, '');
        expect(name.length, 'Your name should have at least three characters').toBeGreaterThanOrEqual(3);
        expect(name, 'because you should be using your real name').not.toContain('Stewart Dent');
    })

    it('should have the prompt for the student name in the third line', () => {
        const lines = contents.split(newline);
        expect(lines[2], 'The third line should start with "> Your Name:"').toMatch(/> Your Name:/);
    })
});