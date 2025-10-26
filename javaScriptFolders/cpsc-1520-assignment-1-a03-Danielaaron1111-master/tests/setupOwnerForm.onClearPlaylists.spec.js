import { describe, it, expect, beforeEach, afterEach, beforeAll, afterAll, vi } from 'vitest';
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
        setOwner: vi.fn(() => { }), // always returns undefined in the original
        removeOwner: vi.fn(() => { }), // always returns undefined in the original
        loadPlaylist: vi.fn(() => ''), // mock as though there is no playlist for the owner
        deletePlaylist: vi.fn(() => {}), // always returns undefined in the original
        savePlaylist: vi.fn(() => { }) // always returns undefined in the original
    };
});

describe('setupOwnerHandler submit event handler on Clear playlists', () => {

    let originalConfirm;
    let originalPrompt;

    beforeEach(() => {
        perTestDocumentBodySetup();
        // Save original implementations
        originalConfirm = global.confirm;
        originalPrompt = global.prompt;

        // Mock implementations
        global.confirm = vi.fn();
        global.prompt = vi.fn();
    });

    afterEach(() => {
        perTestCleanup();
        // Restore original implementations
        global.confirm = originalConfirm;
        global.prompt = originalPrompt;
    });


    it('should confirm that the user wants to clear the playlist', () => {
        // Arrange
        // a) Call SUT
        arrange_expect_setupOwnerHandler(); // expects pre-condition
        // b) setup form
        const ownerName = 'Bob';
        const { ownerForm, submitEvent } = arrange_pageState_SignIn({ ownerInput: ownerName, ownerOutput: ownerName, submitterValue: 'clear' });
        // c) Set page as though login has happened (e.g.: set visibility as though an owner exists and playlists have been added)
        const playlist = '<b>Playlist is empty. Does not matter if it is realistic.</b>';
        arrange_revealPlaylistForm_WithData({ playlistHtml: playlist });
        // d) Mock storage (in case student uses that instead of form element)
        vi.mocked(getOwner).mockReturnValue(ownerName);
        // e) Mock confirmation response
        global.confirm.mockReturnValue(false);

        // Act
        ownerForm.dispatchEvent(submitEvent);

        // Assert
        expect(global.confirm, 'expected a confirmation prompt to have been presented to the user').toHaveBeenCalledOnce();
    });

    it('should not call delete playlist information when the action is cancelled', () => {
        // Arrange
        // a) Call SUT
        arrange_expect_setupOwnerHandler(); // expects pre-condition
        // b) setup form
        const ownerName = 'Bob';
        const { ownerForm, submitEvent } = arrange_pageState_SignIn({ ownerInput: ownerName, ownerOutput: ownerName, submitterValue: 'clear' });
        // c) Set page as though login has happened (e.g.: set visibility as though an owner exists and playlists have been added)
        const playlist = '<b>Playlist is empty. Does not matter if it\'s content is realistic.</b>';
        arrange_revealPlaylistForm_WithData({ playlistHtml: playlist });
        // d) Mock storage (in case student uses that instead of form element)
        vi.mocked(getOwner).mockReturnValue(ownerName);
        // e) Mock confirmation response
        global.confirm.mockReturnValue(false);

        // Act
        ownerForm.dispatchEvent(submitEvent);

        // Assert
        expect(vi.mocked(deletePlaylist)).not.toHaveBeenCalled();
        const [, , , , playlistContainer] = givenArgs();
        expect(playlistContainer.innerHTML).toBe(playlist);
    });

    // it.todo('should not change visibility of the appropriate elements when action cancelled', () => {
    //     // Arrange
    //     // a) Call SUT
    //     arrange_expect_setupOwnerHandler(); // expects pre-condition
    //     // b) setup form
    //     const ownerName = 'Bob';
    //     const { ownerForm, submitEvent } = arrange_pageState_SignIn({ ownerInput: ownerName, ownerOutput: ownerName, submitterValue: 'clear' });
    //     // c) Set page as though login has happened (e.g.: set visibility as though an owner exists and playlists have been added)
    //     const playlist = '<b>Playlist is empty. Does not matter if it is realistic.</b>';
    //     arrange_revealPlaylistForm_WithData({ playlistHtml: playlist });
    //     // d) Mock storage (in case student uses that instead of form element)
    //     vi.mocked(getOwner).mockReturnValue(ownerName);

    //     // Act
    //     ownerForm.dispatchEvent(submitEvent);

    //     // Assert
    //     const [, inputControls, displayContainer, playlistForm, playlistContainer] = givenArgs();
    //     expect.fail('TEST IS INCOMPLETE - Requires specific expectations');
    // });

    it('should call delete playlist if the action is confirmed', () => {
        // Arrange
        // a) Call SUT
        arrange_expect_setupOwnerHandler(); // expects pre-condition
        // b) setup form
        const ownerName = 'Bob';
        const { ownerForm, submitEvent } = arrange_pageState_SignIn({ ownerInput: ownerName, ownerOutput: ownerName, submitterValue: 'clear' });
        // c) Set page as though login has happened (e.g.: set visibility as though an owner exists and playlists have been added)
        const playlist = '<b>Playlist is empty. Does not matter if it\'s content is realistic.</b>';
        arrange_revealPlaylistForm_WithData({ playlistHtml: playlist });
        // d) Mock storage (in case student uses that instead of form element)
        vi.mocked(getOwner).mockReturnValue(ownerName);
        // e) Mock confirmation response
        global.confirm.mockReturnValue(true);

        // Act
        ownerForm.dispatchEvent(submitEvent);

        // Assert
        expect(vi.mocked(deletePlaylist)).toHaveBeenCalledExactlyOnceWith(ownerName);
    });

    it('should empty the playlist container if the action is confirmed', () => {
        // Arrange
        // a) Call SUT
        arrange_expect_setupOwnerHandler(); // expects pre-condition
        // b) setup form
        const ownerName = 'Bob';
        const { ownerForm, submitEvent } = arrange_pageState_SignIn({ ownerInput: ownerName, ownerOutput: ownerName, submitterValue: 'clear' });
        // c) Set page as though login has happened (e.g.: set visibility as though an owner exists and playlists have been added)
        const playlist = '<b>Playlist is NOT empty. Does not matter if it is realistic.</b>';
        arrange_revealPlaylistForm_WithData({ playlistHtml: playlist });
        // d) Mock storage (in case student uses that instead of form element)
        vi.mocked(getOwner).mockReturnValue(ownerName);
        // e) Mock confirmation response
        global.confirm.mockReturnValue(true);

        // Act
        ownerForm.dispatchEvent(submitEvent);

        // Assert
        const [, , , , playlistContainer] = givenArgs();
        expect(playlistContainer.innerHTML).toBe('');
    });
    /*
    it.todo('should ', () => {});
    it.todo('should ', () => {});
    it.todo('should ', () => {});
    it.todo('should ', () => {});
    it.todo('should ', () => {});
    */
});
