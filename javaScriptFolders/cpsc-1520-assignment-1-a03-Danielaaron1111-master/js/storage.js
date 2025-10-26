/* storage.js
 *  Manages the "preserved state" of the page between launches 
 *  Think of this as a fake database system, complete with user management,
 *  but with none of the reliability or permanace of a true database system
 */

// TODO: 👀✨💡🚀 Pop up a toast on every Storage action!

/** @type {string} */
const key = '_fauxLogin_';

/**
 * Returns the name of the current playlist owner, or an empty string if none is available.
 * (When a non-empty string is returned, it simulates an auto-login; intended for when the page loads the first time.)
 * @returns {string} The name of the playlist owner
 */
const getOwner = () => localStorage.getItem(key) || '';

/**
 * Sets the current playlist owner (simulates a sign-in).
 * @param {string} owner The name of a playlist owner to set as the current owner.
 */
const setOwner = (owner) => {
    localStorage.setItem(key, owner);
};

/**
 * Removes the current (active) playlist owner (simulates a log-out).
 * @param {string} owner The name of a playlist owner.
 * 
 * > ⚠️ Warning! This is a destructive action. The owner and their playlist information will be permanently deleted.
 */
const removeOwner = (owner) => {
    localStorage.removeItem(key);
};

/**
 * Returns the contents of the owner's playlist as an HTML string. If no playlist is available, an empty string is returned.
 * @param {string} owner The name of the playlist owner.
 * @returns {string} The contents of the playlist (as an HTML string)
 */
const loadPlaylist = (owner) => localStorage.getItem(owner) || '';

/**
 * Stores the owner's playlist.
 * @param {string} owner The name of the playlist owner.
 * @param {string} data The contents of the playlist (as an HTML string)
 */
const savePlaylist = (owner, data) => {
    localStorage.setItem(owner, data);
}

/**
 * Removes the owner's playlist from storage.
 * @param {string} owner The name of the playlist owner.
 */
const deletePlaylist = (owner) => {
    localStorage.removeItem(owner);
}

export { getOwner, setOwner, removeOwner, loadPlaylist, savePlaylist, deletePlaylist }
