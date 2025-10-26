import { setupFooterControls } from './footerControls';
import { setupPlaylistSharing } from './playlistSharing';
import { setupOwnerHandler } from './setupOwnerForm';
import { setupPlaylistHandler } from './setupPlaylistForm';

const ownerForm = document.getElementById('faux-login');
const inputControls = document.getElementById('input-controls');
const output = document.getElementById('output-name');
const playlistForm = document.getElementById('playlist-form');
const playlistContainer = document.getElementById('playlists');
const footerForm = document.getElementById('admin-form');

setupOwnerHandler(ownerForm, inputControls, output, playlistForm, playlistContainer);
setupPlaylistHandler(playlistForm, playlistContainer);
setupPlaylistSharing(playlistContainer);
setupFooterControls(footerForm);
