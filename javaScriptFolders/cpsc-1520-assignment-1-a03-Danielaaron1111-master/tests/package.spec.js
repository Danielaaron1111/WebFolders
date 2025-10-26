import { describe, it, expect } from 'vitest';
import project from '../package.json' assert { type: 'json' };
import { SemVer, gte, diff, parse, coerce } from 'semver';
// import { semverGte } from 'semver/'
import path from 'path';

const allowTwoDashes = (_, index, array) => index > array.length - 4;
const combinations = (_, index, array) => array.slice(index).join('-');

describe('package.json documentation', () => {
    /*
    - dependencies
*/
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
    });

    it('should have a description of the assignment', () => {
        expect(project.description, 'because the "description" information should be present').toBeDefined();
        expect(project.description.length, 'because the "description" provided is too short').toBeGreaterThanOrEqual(20);
    });

    it('should have the proper reference to the license', () => {
        expect(project.license, 'because the "license" information should be present').toBeDefined();
        expect(project.license).toBe('SEE LICENSE IN LICENSE.md');
    });

    it.each([
        { name:"vite", minVersion:  "6.3.5"},
        { name:"vitest", minVersion:  "3.1.4"},
        { name:"@vitest/ui", minVersion:  "3.1.4"},
        { name:"jsdom",  minVersion: "26.1.0"},
        { name:"semver", minVersion:  "3.1.4"},
    ])
    ('should have $name as a developer dependency with a min version of $minVersion', ({name, minVersion}) => {
        // Arrange/Act
        let actual = project.devDependencies[name];
        let actualSemver;
        let act = () => actualSemver = coerce(actual, true);

        // Assert
        expect(actual).toBeDefined();
        expect(act, `unable to construct legitimate SemVer for ${name}`).not.toThrow();
        expect(gte(actualSemver.version, minVersion), `expected version ${minVersion} or higher but the actual version is ${actual}`).toBeTruthy();
    });

    it.each([
        {scriptName: 'dev', command: 'vite' },
        {scriptName: 'test', command: 'vitest' },
        {scriptName: 'test:ui', command: 'vitest --ui' },
        // {scriptName: 'swedish-chef', command: 'BORK BORK BORK'}
    ])
    ('should have the correct command for the $scriptName script', ({scriptName, command}) => {
        let actual = project.scripts[scriptName];
        expect(actual, `The script "${scriptName}" does not exist`).toBeDefined();
        expect(actual.trim()).toBe(command);
    });
});
