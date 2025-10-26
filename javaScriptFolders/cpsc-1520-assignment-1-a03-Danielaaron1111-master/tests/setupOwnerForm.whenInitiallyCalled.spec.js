import { describe, it, each, expect, beforeEach, afterEach, beforeAll, afterAll, vi } from 'vitest';
import { setupOwnerHandler } from '../js/setupOwnerForm';
import { getOwner, setOwner, removeOwner, loadPlaylist, savePlaylist } from '../js/storage';
import { perTestDocumentBodySetup, perTestCleanup } from './test-helpers/setupOwnerForm.BeforeEach_AfterEach';
import { givenArgs } from './test-helpers/setupOwnerForm.stateManagementHelpers';

// TODO: Add ☠️poison☠️ expectation for tests that pass with no effort by student

// NOTE: 1) This mock will be hoisted,
//          which is the default way vi works,
//          so it is placed hear to make it obvious
// NOTE: 2) These mocks are in place to intercept and replace the use of localStorage access.
vi.mock('../js/storage', async () => {
    return {
        getOwner: vi.fn(() => ''),
        setOwner: vi.fn(() => {}), // always returns undefined in the original
        removeOwner: vi.fn(() => {}), // always returns undefined in the original
        loadPlaylist: vi.fn(() => ''), // mock as though there is no playlist for the owner
        deletePlaylist: vi.fn(() => {}), // always returns undefined in the original
        savePlaylist: vi.fn(() => {}) // always returns undefined in the original
    };
});

describe('setupOwnerHandler when initially called', () => {
    beforeEach(perTestDocumentBodySetup);

    afterEach(perTestCleanup);

    it('should add a submit event listener to the owner form', () => {
        // Arrange
        /* (A) */
        const [ownerForm] = givenArgs();
        const spy = vi.spyOn(ownerForm, 'addEventListener');

        // Act
        /* [1] */
        setupOwnerHandler(...givenArgs());

        // Assert
        /* (...D) */
        expect(spy).toHaveBeenCalledExactlyOnceWith(expect.stringContaining('submit'), expect.any(Function));
    });

    it('should check the existing owner', () => {
        // Arrange
        /* (B|C) */
        // Act
        /* [1] */
        setupOwnerHandler(...givenArgs());

        // Assert
        /* (...H | ...I) */
        expect(vi.mocked(getOwner)).toHaveBeenCalledOnce();
    });

    it('should get the playlist for the existing owner', () => {
        // Arrange
        /* (B|C) */
        let expected = 'Stewart';
        vi.mocked(getOwner).mockReturnValueOnce(expected);

        // Act
        /* [1] */
        setupOwnerHandler(...givenArgs());

        // Assert
        /* (...H | ...I) */
        expect(vi.mocked(loadPlaylist)).toHaveBeenCalledExactlyOnceWith(expected);
    });

    it('should populate the playlist container with the existing owner playlist', () => {
        // Arrange
        /* (C) */
        let [,,,,playlistContainer] = givenArgs();
        let spy = vi.spyOn(playlistContainer, 'innerHTML', "set");
        let expected = '<b>Playlist is empty</b>';
        vi.mocked(loadPlaylist).mockReturnValueOnce(expected);

        // Act
        /* [1] */
        setupOwnerHandler(...givenArgs());

        // Assert
        /* (...I) */
        expect(spy).toHaveBeenCalledExactlyOnceWith(expected)
    });

    it.each(['input-controls'])
    ('should make the "%s" element visible if there is no existing owner', (elementId) => {
        // Arrange
        /* (A) */
        vi.mocked(getOwner).mockReturnValueOnce('');

        // Act
        /* [1] */
        setupOwnerHandler(...givenArgs());

        // Assert
        /* (...D) */
        const actual = document.getElementById(elementId).classList;
        expect(actual.contains('hide'), "expected to NOT find the 'hide' class applied to the element").toBeFalsy();
    });

    it.each(['display-name', 'playlist-form', 'playlists'])
    ('should make the "%s" element hidden if there is no existing owner', (elementId) => {
        // Arrange
        /* (A) */
        vi.mocked(getOwner).mockReturnValueOnce('');

        // Act
        /* [1] */
        setupOwnerHandler(...givenArgs());

        // Assert
        /* (...D) */
        const actual = document.getElementById(elementId).classList;
        expect(actual.contains('hide'), "expected to find the 'hide' class applied to the element").toBeTruthy();
    });

    it.each(['display-name', 'playlist-form', 'playlists'])
    ('should make the "%s" element visible for an existing owner', (elementId) => {
        // Arrange
        /* (B|C) */
        vi.mocked(getOwner).mockReturnValueOnce('Ann Other');

        // Act
        /* [1] */
        setupOwnerHandler(...givenArgs());

        // Assert
        /* (...H | ...I) */
        const actual = document.getElementById(elementId).classList;
        expect(actual.contains('hide'), "expected to find the 'hide' class applied to the element").toBeFalsy();
    });

    it.each(['input-controls'])
    ('should make the "%s" element hidden for an existing owner', (elementId) => {
        // Arrange
        /* (B|C) */
        vi.mocked(getOwner).mockReturnValueOnce('Ann Other');

        // Act
        /* [1] */
        setupOwnerHandler(...givenArgs());

        // Assert
        /* (...H | ...I) */
        const actual = document.getElementById(elementId).classList;
        expect(actual.contains('hide'), "expected to NOT find the 'hide' class applied to the element").toBeTruthy();
    });

    it.each(['Annie Bo-Dee', 'Bee Deviled'])
    ('should put "%s" into the form output', (expected) => {
        // Arrange
        /* (B|C) */
        vi.mocked(getOwner).mockReturnValueOnce(expected);

        // Act
        /* [1] */
        setupOwnerHandler(...givenArgs());

        // Assert
        /* (...H | ...I) */
        const [ownerForm] = givenArgs();
        expect(ownerForm.elements.displayOwner.value).toBe(expected);
    });
});
