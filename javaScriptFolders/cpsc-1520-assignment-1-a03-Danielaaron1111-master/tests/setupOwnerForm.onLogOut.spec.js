import { describe, it, each, expect, beforeEach, afterEach, beforeAll, afterAll, vi } from 'vitest';
import { setupOwnerHandler } from '../js/setupOwnerForm';
import { getOwner, setOwner, removeOwner, loadPlaylist, savePlaylist } from '../js/storage';
import { perTestDocumentBodySetup, perTestCleanup } from './test-helpers/setupOwnerForm.BeforeEach_AfterEach';
import { arrange_expect_setupOwnerHandler, arrange_pageState_SignIn, arrange_revealPlaylistForm_WithData, givenArgs } from './test-helpers/setupOwnerForm.stateManagementHelpers';


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

describe('setupOwnerHandler submit event handler on Log-Out', () => {
    beforeEach(perTestDocumentBodySetup);

    afterEach(perTestCleanup);

    it('should clear the contents of the playlist container', () => {
        // Arrange
        // a) Call SUT
        arrange_expect_setupOwnerHandler(); // expects pre-condition
        setupOwnerHandler(...givenArgs());
        // b) setup form
        const ownerName = 'Bob';
        const { ownerForm, submitEvent} = arrange_pageState_SignIn({ownerInput: ownerName, ownerOutput: ownerName, submitterValue: 'log-out'});
        // c) Set page as though login has happened (e.g.: set visibility as though an owner exists and playlists have been added)
        const playlist = '<b>Playlist is empty. Does not matter if it is realistic.</b>';
        arrange_revealPlaylistForm_WithData({playlistHtml:playlist});
        // d) Mock storage (in case student uses that instead of form element)
        vi.mocked(getOwner).mockReturnValue(ownerName);
        
        // Act
        ownerForm.dispatchEvent(submitEvent);
        
        // Assert
        const [, inputControls, displayContainer, playlistForm, playlistContainer] = givenArgs();
        expect(playlistContainer.innerHTML).toBe('');
    });

    it('should clear the value of the display owner output control', () => {
        // Arrange
        // a) Call SUT
        arrange_expect_setupOwnerHandler(); // expects pre-condition
        setupOwnerHandler(...givenArgs());
        // b) setup form
        const ownerName = 'Bob';
        const { ownerForm, submitEvent} = arrange_pageState_SignIn({ownerInput: ownerName, ownerOutput: ownerName, submitterValue: 'log-out'});
        // c) Set page as though login has happened (e.g.: set visibility as though an owner exists and playlists have been added)
        const playlist = '<b>Playlist is empty. Does not matter if it is realistic.</b>';
        arrange_revealPlaylistForm_WithData({playlistHtml:playlist});
        // d) Mock storage (in case student uses that instead of form element)
        vi.mocked(getOwner).mockReturnValue(ownerName);
        
        // Act
        ownerForm.dispatchEvent(submitEvent);
        
        // Assert
        expect(ownerForm.elements.displayOwner.value).toBe('');
    });

    it('should clear the value of the owner input control', () => {
        // Arrange
        // a) Call SUT
        arrange_expect_setupOwnerHandler(); // expects pre-condition
        setupOwnerHandler(...givenArgs());
        // b) setup form
        const ownerName = 'Bob';
        const { ownerForm, submitEvent} = arrange_pageState_SignIn({ownerInput: ownerName, ownerOutput: ownerName, submitterValue: 'log-out'});
        // c) Set page as though login has happened (e.g.: set visibility as though an owner exists and playlists have been added)
        const playlist = '<b>Playlist is empty. Does not matter if it is realistic.</b>';
        arrange_revealPlaylistForm_WithData({playlistHtml:playlist});
        // d) Mock storage (in case student uses that instead of form element)
        vi.mocked(getOwner).mockReturnValue(ownerName);
        
        // Act
        ownerForm.dispatchEvent(submitEvent);
        
        // Assert
        expect(ownerForm.elements.owner.value).toBe('');
    });

    it('should change visibility of the appropriate elements', () => {
        // Arrange
        // a) Call SUT
        arrange_expect_setupOwnerHandler(); // expects pre-condition
        setupOwnerHandler(...givenArgs());
        // b) setup form
        const ownerName = 'Bob';
        const { ownerForm, submitEvent} = arrange_pageState_SignIn({ownerInput: ownerName, ownerOutput: ownerName, submitterValue: 'log-out'});
        // c) Set page as though login has happened (e.g.: set visibility as though an owner exists and playlists have been added)
        const playlist = '<b>Playlist is empty. Does not matter if it is realistic.</b>';
        arrange_revealPlaylistForm_WithData({playlistHtml:playlist});
        // d) Mock storage (in case student uses that instead of form element)
        vi.mocked(getOwner).mockReturnValue(ownerName);
        
        // Act
        ownerForm.dispatchEvent(submitEvent);
        
        // Assert
        const [, inputControls, displayContainer, playlistForm, playlistContainer] = givenArgs();
        expect(inputControls.classList.contains('hide'), 'expected the "inputControls" element to be visible').toBeFalsy();
        expect(displayContainer.classList.contains('hide'), 'expected the "displayContainer" element to be hidden').toBeTruthy()
        expect(playlistForm.classList.contains('hide'), 'expected the "displayContainer" element to be hidden').toBeTruthy()
        expect(playlistContainer.classList.contains('hide'), 'expected the "displayContainer" element to be hidden').toBeTruthy()
    });
});
