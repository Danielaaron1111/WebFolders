import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';
import { getOwner, loadPlaylist, removeOwner, savePlaylist, setOwner, deletePlaylist } from '../js/storage';

const key = '_fauxLogin_'; // as copied from internals of storage.js

describe('PROVIDED CODE: storage.js (using localstorage)', () => {
    // assign the spy instance to a const
    const getItemSpy = vi.spyOn(Storage.prototype, 'getItem');

    afterEach(() => {
        vi.restoreAllMocks();
        localStorage.clear();
    });

    /* Owner Name */
    it('should get playlist owner', () => {
        localStorage.setItem(key, 'Me');
        expect(getOwner()).toBe('Me');
    });

    it('should get empty result from playlist owner', () => {
        expect(getOwner()).toBe('');
    });

    it('should save playlist owner', () => {
        setOwner('Bob')
        expect(getOwner()).toBe('Bob');
    });

    it('should remove playlist owner', () => {
        setOwner('Bob');
        removeOwner();
        expect(getOwner()).toBe('');
    });

    /* Playlist Information */
    it('should load owner\'s playlist', () => {
        // Arrange
        const givenName = 'Jane';
        const expectedData = '<b>Your playlist does not exist</b>'
        localStorage.setItem(givenName, expectedData);

        // Act
        const actual = loadPlaylist(givenName);

        // Assert
        expect(actual).toBe(expectedData);
    });

    it('should get an empty playlist for an owner', () => {
        expect(loadPlaylist('Everyone')).toBe('');
    });

    /* Use of localStorage */
    it('should get owner using localStorage.getItem()', () => {
        let spy = vi.spyOn(Storage.prototype, 'getItem')
        const _ = getOwner();
        expect(spy).toHaveBeenCalledOnce();
    });

    it('should save owner using localStorage.setItem()', () => {
        let spy = vi.spyOn(Storage.prototype, 'setItem')
        const _ = setOwner('Stewart');
        expect(spy).toHaveBeenCalledOnce();
    });

    it('should remove owner using localStorage.removeItem()', () => {
        let spy = vi.spyOn(Storage.prototype, 'removeItem')
        const _ = removeOwner('lost');
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(key);
    });

    it('should load owner playlist using localStorage.getItem()', () => {
        let spy = vi.spyOn(Storage.prototype, 'getItem');
        const _ = loadPlaylist('nobody');
        expect(spy).toHaveBeenCalledExactlyOnceWith('nobody');
    });

    it('should save owner playlist using localStorage.setItem()', () => {
        let spy = vi.spyOn(Storage.prototype, 'setItem');
        savePlaylist('no-one', "<div>Contents don't matter</div>");
        expect(spy).toHaveBeenCalledExactlyOnceWith('no-one', "<div>Contents don't matter</div>");
    });

    it('should delete owner playlist using localStorage.removeItem()', () => {
        let spy = vi.spyOn(Storage.prototype, 'removeItem')
        const _ = deletePlaylist('lost');
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith('lost');
    });

    it('should never call localStorage.clear()', () => {
        let spy = vi.spyOn(Storage.prototype, 'clear');
        let _;
        _ = getOwner();
        setOwner(_);
        savePlaylist(_, '<i></i>');
        loadPlaylist(_);
        removeOwner(_);
        deletePlaylist(_);

        expect(spy).toHaveBeenCalledTimes(0);
    })
});

/* Credits:
    Local Storage spying lessons learned through https://runthatline.com/vitest-mock-localstorage/ (2023)

    Here's a key takeaway from that article:

        "Notice that we are latching the spy on Storage.prototype and not localStorage itself. It’s because of an issue with jsdom. To overcome this limitation use happy-dom or spy on the Prototype itself. Moreover, we are clearing the spy so that in each test we don’t have any call history."
 */