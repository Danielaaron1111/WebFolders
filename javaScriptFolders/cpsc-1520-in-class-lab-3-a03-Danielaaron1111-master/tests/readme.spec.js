import { describe, it, expect, beforeEach } from 'vitest';
import fs from 'fs';
import path from 'path';
import os from 'os';

describe('ReadMe documentation', () => {
    const readMePath = path.resolve(process.cwd(), 'README.md');
    const contents = fs.readFileSync(readMePath, { encoding: 'utf-8' });
    const newline = os.EOL;

    it('should have the student name in the third or fourth line as indicated', () => {
        const lines = contents.split(newline);
        const index = lines[0].includes('https://classroom.github.com') ? 3 : 2;
        const name = lines[index]
            .replace(/> Your Name:/, '')
            .replace(/\s+/g, '');
        expect(name.length, 'Your name should have at least three characters').toBeGreaterThanOrEqual(3);
    })

    it('should have the prefix text "> Your Name:" for the student name in the third or fourth line as indicated', () => {
        const lines = contents.split(newline);
        const index = lines[0].includes('https://classroom.github.com') ? 3 : 2;
        expect(lines[index], 'The line should start with "> Your Name:"').toMatch(/> Your Name:/);
    })
});