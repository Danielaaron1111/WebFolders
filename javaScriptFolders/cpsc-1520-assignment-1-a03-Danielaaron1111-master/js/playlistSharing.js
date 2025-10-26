/**
 * Supports the illusion of sharing playlists (in an entirely fake way - don't do this for real).
 * @param {HTMLElement} playlistContainer Element that holds the displayed playlist items
 */
export const setupPlaylistSharing = function(playlistContainer) {
    playlistContainer.addEventListener('change', handleCheckbox)
}

/**
 * @deprecated Because you should NEVER really do this in real life!
 * 
 * Handles checking and un-checking of checkboxes to "fake record" the "state"
 * by adding/removing the checked attribute.
 * 
 * @param {Event} ev The input event that has occurred
*/
const handleCheckbox = (ev) => {
    /** @type {HTMLInputElement} */ const target = ev.target;
    if(target.type === 'checkbox') {
        if(target.checked === true) {
            target.setAttribute('checked', true);
        }
        if(target.checked === false) {
            target.removeAttribute('checked');
        }
    }
}
