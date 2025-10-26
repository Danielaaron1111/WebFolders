/********* Before/After Each + Arg Helpers *********/

import { vi } from "vitest";

/**
 * Sets document.body.innerHTML with a comparable markup to the actual index.html
 */
export const perTestDocumentBodySetup = () => {
    document.body.innerHTML = `
        <form id="faux-login">
            <div id="display-name" class="grid">
                <output name="displayOwner"></output>
                <button name="action" type="submit" value="clear">Clear</button>
                </div>
                <button name="action" type="submit" value="save">Save</button>
                <button name="action" type="submit" value="log-out">Log Me Out</button>
            <div id="input-controls" class="grid">
                <input type="text" name="owner" placeholder="Playlist Owner" />
                <button name="action" type="submit" value="sign-in">Sign-in</button>
            </div>
        </form>

        <form id="playlist-form"></form>

        <section id="playlists"></section>
    `;
};

/**
 * Calls vi.restoreAllMocks()
 */
export const perTestCleanup = () => {
    vi.restoreAllMocks();
    document.body.innerHTML = '';
};
