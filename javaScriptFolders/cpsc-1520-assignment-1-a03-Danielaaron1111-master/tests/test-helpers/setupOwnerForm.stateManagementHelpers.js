/* Helper functions to control the state of the page elements

    There are two main states for the user:
    - A) Not Logged In
    - B) Logged In

    Depending on the state, certain parts of the page should be hidden while others are made visible.

    A) When a user is NOT logged in, the only thing that they should be allowed to do is log in.

    B) When a user is logged in, they should have access to
        - Create new playlists
        - Save their playlists
        - Clear (empty) their playlists
        - Log Out
 */

import { expect } from "vitest";
import { vi } from "vitest";
import { setupOwnerHandler } from "../../js/setupOwnerForm";

/* ****************************************** */
/* *                HELPERS                 * */
/* ********** Arrange Sign-In Form ********** */

/**
 * Calls the `setupOwnerHandler()` and expects the pre-condition that
 * the ownerForm is handling submit events
 */
export const arrange_expect_setupOwnerHandler = () => {
    // a) arrange form event listener
    const [ownerForm] = givenArgs();
    //    i) spy on .addEventListener()
    const spyArrange = vi.spyOn(ownerForm,'addEventListener');
    //    ii) [1]
    setupOwnerHandler(...givenArgs()); // the SUT
    //    iii) !! .addEventListener()
    expect(spyArrange, '(precondition) expect ownerForm to handle submit events')
        .toHaveBeenCalledExactlyOnceWith('submit', expect.any(Function));
}


/**
 * Sets the data for the Sign-In Form controls and the visibility of the elements on the page
 * @param {{ownerInput:string, ownerOutput:string, submitterValue:string}} formState The data for the form
 * @returns {{ownerForm: HTMLFormElement, submitEvent: SubmitEvent}} The prepared form with the submit event
 */
export const arrange_pageState_SignIn = ({ownerInput = '', ownerOutput = '', submitterValue = 'sign-in'} = {}) => {
    // The correct state for the sign-in form to be visibile/usable is one where the
    const [ownerForm, inputControls, displayContainer, playlistForm, playlistContainer] = givenArgs();
    // 1) Page Data
    ownerForm.elements.displayOwner.value = ownerOutput;
    ownerForm.elements.owner.value = ownerInput;
    playlistContainer.innerHTML = ''; // should always be empty in this state
    // 2) Element Visibility
    //    Set visibility as though the initial student setup was correct
    //    (should not really affect behaviour, unless, for some reason,
    //     the student is doing unnecessary "checks" before proceeding)
    inputControls.classList.remove('hide');
    displayContainer.classList.add('hide');
    playlistForm.classList.add('hide');
    playlistContainer.classList.add('hide');
    // Form's SubmitEvent
    const submitter = ownerForm.querySelector(`[value=${submitterValue}]`);
    const submitEvent = new SubmitEvent('submit', { submitter, bubbles:true, cancelable:true });

    return {
        ownerForm,
        submitEvent
    }
}

export const arrange_revealPlaylistForm_WithData = ({playlistHtml = ''} = {}) => {
    const [, inputControls, displayContainer, playlistForm, playlistContainer] = givenArgs();
    // Set HTML
    playlistContainer.innerHTML = playlistHtml;
    // Set visibility
    inputControls.classList.add('hide');
    displayContainer.classList.remove('hide');
    playlistForm.classList.remove('hide');
    playlistContainer.classList.remove('hide');
}

// describe.skip('SELF-CHECK-HELPERS: arrange_pageState_SignIn should', () => {
//     beforeEach(perTestDocumentBodySetup);
//     afterEach(perTestCleanup);

//     it('set the ownerForm.elements.displayOwner to an empty string', () => {
//         const actual = arrange_pageState_SignIn();
//         expect(actual.ownerForm.elements.displayOwner.value).toBe('');
//     })

//     it('set the ownerForm.elements.owner to an empty string', () => {
//         const actual = arrange_pageState_SignIn();
//         expect(actual.ownerForm.elements.owner.value).toBe('');
//     })

//     it.each([' Stewart '])('set the owner to %s and the displayOwner to an empty string', (ownerInput) => {
//         const actual = arrange_pageState_SignIn({ownerInput});
//         expect(actual.ownerForm.elements.owner.value).toBe(ownerInput);
//         expect(actual.ownerForm.elements.displayOwner.value).toBe('');
//     })
// })


/**
 * Returns an array of elements obtained using `document.getElementById()`.
 * 
 * The order of the elements is as follows (and corresponds to the array of element ids in {@link givenElementIds}):
 *
 * - {HTMLFormElement} ownerForm - The form element for entering the owner name
 * - {HTMLElement} inputControls - The element that contains the input controls for the form
 * - {HTMLElement} displayContainer - The element that wraps the display of the owner name
 * - {HTMLFormElement} playlistForm - The form element to be shown when an owner's name is available
 * - {HTMLElement} playlistContainer - The container that holds all the playlists
 *
 * @returns {HTMLElement[]} An array of elements from the document
 */
export const givenArgs = () => givenElementIds().map(id => document.getElementById(id));

/**
 * Returns a copy of an array of ids, in this order: `['faux-login','input-controls','display-name','playlist-form','playlists']`
 * @returns {string[]} All the document ids of the controls required by `setupOwnerHandler`
 */
const givenElementIds = () => ['faux-login','input-controls','display-name','playlist-form','playlists'].slice();


