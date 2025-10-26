import { describe, it, each, expect, beforeEach, afterEach, beforeAll, afterAll, vi } from 'vitest';
import { setupOwnerHandler } from '../js/setupOwnerForm';
import { getOwner, setOwner, removeOwner, loadPlaylist, savePlaylist, deletePlaylist } from '../js/storage';
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

describe('setupOwnerHandler submit event handler on Save playlist', () => {
    beforeEach(perTestDocumentBodySetup);

    afterEach(perTestCleanup);


    it('should call savePlaylist with the owner name and playlist content', () => {
        // Arrange
        // a) Call SUT
        arrange_expect_setupOwnerHandler(); // expects pre-condition
        // b) setup form
        const ownerName = 'Bob';
        const { ownerForm, submitEvent} = arrange_pageState_SignIn({ownerInput: ownerName, ownerOutput: ownerName, submitterValue: 'save'});
        // c) Set page as though login has happened (e.g.: set visibility as though an owner exists and playlists have been added)
        const playlist = '<b>Playlist is empty. Does not matter if it is realistic.</b>';
        arrange_revealPlaylistForm_WithData({playlistHtml:playlist});
        // d) Mock storage (in case student uses that instead of form element)
        vi.mocked(getOwner).mockReturnValue(ownerName);
        
        // Act
        ownerForm.dispatchEvent(submitEvent);
        
        // Assert
        const [, inputControls, displayContainer, playlistForm, playlistContainer] = givenArgs();
        expect(vi.mocked(savePlaylist)).toHaveBeenCalledExactlyOnceWith(ownerName, playlist);
    });

    it('should not change visibility of current elements', () => {
        // NOTE: This is effectively a free mark;
        //       It's only here if the student is trying to "extra" work and
        //       winds up inadvertantly breaking the component visibility
        //       states (e.g.: the presence/absence of `class="hide"`)
        // Arrange
        // a) Call SUT
        arrange_expect_setupOwnerHandler(); // expects pre-condition
        // b) setup form
        const ownerName = 'Bob';
        const { ownerForm, submitEvent} = arrange_pageState_SignIn({ownerInput: ownerName, ownerOutput: ownerName, submitterValue: 'save'});
        // c) Set page as though login has happened (e.g.: set visibility as though an owner exists and playlists have been added)
        const playlist = '<b>Playlist is empty. Does not matter if it is realistic.</b>';
        arrange_revealPlaylistForm_WithData({playlistHtml:playlist});
        // d) Mock storage (in case student uses that instead of form element)
        vi.mocked(getOwner).mockReturnValue(ownerName);
        
        // Act
        ownerForm.dispatchEvent(submitEvent);
        
        // Assert
        const [, inputControls, displayContainer, playlistForm, playlistContainer] = givenArgs();
        expect(inputControls.classList.contains('hide'), 'expected the "inputControls" element to still be hidden').toBeTruthy();
        expect(displayContainer.classList.contains('hide'), 'expected the "displayContainer" element to still be visible').toBeFalsy();
        expect(playlistForm.classList.contains('hide'), 'expected the "playlistForm" element to still be visible').toBeFalsy();
        expect(playlistContainer.classList.contains('hide'), 'expected the "playlistContainer" element to still be visible').toBeFalsy();
    });
});
