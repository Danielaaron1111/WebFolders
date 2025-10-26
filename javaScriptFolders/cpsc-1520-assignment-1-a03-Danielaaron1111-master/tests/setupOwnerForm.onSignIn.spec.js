import { describe, it, each, expect, beforeEach, afterEach, beforeAll, afterAll, vi } from 'vitest';
import { setupOwnerHandler } from '../js/setupOwnerForm';
import { getOwner, setOwner, removeOwner, loadPlaylist, savePlaylist } from '../js/storage';
import { perTestDocumentBodySetup, perTestCleanup } from './test-helpers/setupOwnerForm.BeforeEach_AfterEach';
import { arrange_expect_setupOwnerHandler, arrange_pageState_SignIn, givenArgs } from './test-helpers/setupOwnerForm.stateManagementHelpers';

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

describe('setupOwnerHandler submit event handler on Sign-In', async () => {
    beforeEach(perTestDocumentBodySetup);

    afterEach(perTestCleanup);



    it.each(['', '  '])('should set focus to input if owner name is "%s"', (ownerName) => {
        // Arrange
        /* (D) */
        // a) setup SUT
        arrange_expect_setupOwnerHandler(); // expects pre-condition
        // b) setup form
        const { ownerForm, submitEvent} = arrange_pageState_SignIn({ownerInput: ownerName});
        // // c) Mock storage (in case student did something with saving info for some reason)
        // vi.mocked(getOwner).mockReturnValue('');
        // vi.mocked(loadPlaylist).mockReturnValue('');

        // Act
        /* [0] */
        ownerForm.dispatchEvent(submitEvent);

        // Assert
        /* (-D) */
        expect(document.activeElement).toBe(ownerForm.elements.owner);
    });

    it.each(['', '  '])('should not change visibility of current elements if owner name is "%s"', async (ownerName) => {
        // Arrange
        /* (D) */
        // a) setup SUT
        arrange_expect_setupOwnerHandler(); // expects pre-condition
        // b) setup form
        const { ownerForm, submitEvent} = arrange_pageState_SignIn({ownerInput: ownerName});
        // // c) Mock storage (in case student did something with saving info for some reason)
        // vi.mocked(getOwner).mockReturnValue(ownerName);
        // vi.mocked(loadPlaylist).mockReturnValue('');
        
        // Act
        /* [0] */
        ownerForm.dispatchEvent(submitEvent);
        // await new Promise(resolve => setTimeout(resolve, 550));
        
        // Assert
        /* (-D) */
        // Personal 👀 NOTE: The discard variable (_) is important,
        //                    as I don't need the input form itself
        //                    (can't tell you how long I stared at
        //                     this problem....)
        const [_,inputControls, displayContainer, playlistForm, playlistContainer] = givenArgs();
        expect.soft(inputControls.classList.contains('hide'), 'expected the "inputControls" element to still be visible').toBeFalsy();
        expect.soft(displayContainer.classList.contains('hide'), 'expected the "displayContainer" element to still be hidden').toBeTruthy();
        expect.soft(playlistForm.classList.contains('hide'), 'expected the "playlistForm" element to still be hidden').toBeTruthy();
        expect.soft(playlistContainer.classList.contains('hide'), 'expected the "playlistContainer" element to still be hidden').toBeTruthy();
    });

    it.each(['', '  '])('should not call setOwner with empty name if owner name is "%s"', (ownerName) => {
        // Arrange
        /* (D) */
        // a) setup SUT
        arrange_expect_setupOwnerHandler(); // expects pre-condition
        // b) setup form
        const { ownerForm, submitEvent} = arrange_pageState_SignIn({ownerInput: ownerName});
        
        // Act
        /* [0] */
        ownerForm.dispatchEvent(submitEvent);

        // Assert
        /* (-D) */
        expect(vi.mocked(setOwner)).toHaveBeenCalledTimes(0);
    });

    it('should call setOwner with the trimmed owner name', () => {
        // Arrange
        /* (D) */
        // a) setup SUT
        arrange_expect_setupOwnerHandler(); // expects pre-condition
        // b) setup form
        const ownerName = '  Stacey  ';
        const { ownerForm, submitEvent} = arrange_pageState_SignIn({ownerInput: ownerName});
        
        // Act
        /* [3] */
        ownerForm.dispatchEvent(submitEvent);

        // Assert
        /* (...H) */
        expect(vi.mocked(setOwner), `expect the user-entered value "${ownerName}" to be trimmed when calling storage`).toHaveBeenCalledExactlyOnceWith(ownerName.trim());
    });

    it('should call loadPlaylist with the trimmed owner name', () => {
        // Arrange
        /* (D) */
        // a) setup SUT
        arrange_expect_setupOwnerHandler(); // expects pre-condition
        // b) setup form
        const ownerName = '  Stacey  ';
        const { ownerForm, submitEvent} = arrange_pageState_SignIn({ownerInput: ownerName});
        
        // Act
        /* [3] */
        ownerForm.dispatchEvent(submitEvent);

        // Assert
        /* (...H) */
        expect(vi.mocked(loadPlaylist), `expect the user-entered value "${ownerName}" to be trimmed when calling storage`).toHaveBeenLastCalledWith(ownerName.trim());
    });

    it('should set the content of the playlist container', () => {
        // Arrange
        /* (D) */
        // a) setup SUT
        arrange_expect_setupOwnerHandler(); // expects pre-condition
        // b) setup form
        const ownerName = '  Stacey  ';
        const { ownerForm, submitEvent} = arrange_pageState_SignIn({ownerInput: ownerName});
        // e) Mock storage of 
        const playlist = '<p>Stored content</p>';
        vi.mocked(loadPlaylist).mockReturnValue(playlist);

        // Act
        /* [3] */
        ownerForm.dispatchEvent(submitEvent);

        // Assert
        /* (...H) */
        const [,,,,playlistContainer] = givenArgs();
        expect(playlistContainer.innerHTML).toBe(playlist);
    });

    it('should set the value of the display owner output control', () => {
        // Arrange
        /* (D) */
        // a) setup SUT
        arrange_expect_setupOwnerHandler(); // expects pre-condition
        // b) setup form
        const ownerName = ' Dwight ';
        const { ownerForm, submitEvent } = arrange_pageState_SignIn({ownerInput: ownerName});
        // expect(ownerForm.elements.owner.value, 'WHY?!').toBe('');

        // Act
        ownerForm.dispatchEvent(submitEvent);

        // Assert
        expect(ownerForm.elements.displayOwner.value).toBe(ownerName.trim());
    });

    it('should set appropriate visibility for elements on the page', () => {
        // Arrange
        /* (D) */
        // a) setup SUT
        arrange_expect_setupOwnerHandler(); // expects pre-condition
        // b) setup form
        const ownerName = 'Stewart';
        const { ownerForm, submitEvent} = arrange_pageState_SignIn({ownerInput: ownerName});
        
        // Act
        /* [3] */
        ownerForm.dispatchEvent(submitEvent);
        
        // Assert
        /* (...H) */
        const [_,inputControls, displayContainer, playlistForm, playlistContainer] = givenArgs();
        expect(inputControls.classList.contains('hide'), 'expected the "inputControls" element be changed to hidden').toBeTruthy();
        expect(displayContainer.classList.contains('hide'), 'expectd tehe "displayContainer" element be changed to visible').toBeFalsy();
        expect(playlistForm.classList.contains('hide'), 'expecetd the "playlistForm" element be changed to visible').toBeFalsy();
        expect(playlistContainer.classList.contains('hide'), 'expectd thee "playlistContainer" element be changed to visible').toBeFalsy();
    });
});



