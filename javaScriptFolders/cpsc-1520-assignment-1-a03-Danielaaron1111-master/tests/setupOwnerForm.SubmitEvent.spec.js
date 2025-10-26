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

describe('setupOwnerHandler submit event handler', () => {
    beforeEach(perTestDocumentBodySetup);

    afterEach(perTestCleanup);


    it('should prevent the default submit action', () => {
        // Arrange
        // a) arrange form event listener
        setupOwnerHandler(...givenArgs()); // the SUT
        // b) arrange event
        const [ownerForm] = givenArgs();
        ownerForm.elements.owner.value = 'Stew Dent';
        const submitter = ownerForm.querySelector('[value=save]');
        const ev = new SubmitEvent('submit', { submitter });
        // c) arrange spy
        const spy = vi.spyOn(ev, 'preventDefault');

        // Act
        ownerForm.dispatchEvent(ev);

        // Assert
        expect(spy).toHaveBeenCalledOnce();
    });
});
