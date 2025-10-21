import { describe, it, expect } from 'vitest';
import project from '../package.json' assert { type: 'json' };
import path from 'path';

const allowTwoDashes = (_, index, array) => index > array.length - 4;
const combinations = (_, index, array) => array.slice(index).join('-');

describe('package.json documentation', () => {
    it('should have your GitHub username as the author', () => {
        // Arrange
        const repoFolder = path.basename(process.cwd());
        const lines = repoFolder.split('-');
        const lastThree = lines.filter(allowTwoDashes);
        const names = lastThree.map(combinations);

        // Assert
        expect.soft(project.author, 'because the "author" information should exist in the package.json file').toBeDefined();
        expect.soft(project.author, 'found the the "author" information empty').not.toBe('');
        expect.soft(project.author, '(presuming you have done a simple clone of your repository so that the local folder name is the same as the GitHub repository name)').toBeOneOf(names);
    })
});