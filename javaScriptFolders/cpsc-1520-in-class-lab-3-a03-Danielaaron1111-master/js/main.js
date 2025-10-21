import { hide, show, turnOnDarkTheme, turnOffDarkTheme, toggleTagEmphasis, openPopoverOnClick, addMouseHandlers, showResources } from './interactive';
                                                                                                                                     //there is a problem here with the path, run in the pnpm server 
                                                                                                                                     //but not in live server.                         
// DO NOT change the code above this line

// TODO: Student work starts here...
///      "Drive" the page by calling the functions with the correct arguments
turnOnDarkTheme(document.getElementById('dark-theme-on'));
turnOffDarkTheme(document.getElementById('dark-theme-off'));

show(document.getElementById('theme-switcher'));

show(document.getElementById('show-resources'));

hide(document.querySelector('main > section'));
toggleTagEmphasis(document.querySelector('main > section'));
addMouseHandlers(document.querySelector('main > section'));
showResources(
    document.getElementById('show-resources'),
    document.querySelector('main > section'),
    document.querySelector('dialog'));

openPopoverOnClick(document.querySelector('main > section'), document.getElementById('usage'));
// or, this alternate approach
// openPopoverOnClick(document.querySelector('main > section'), document.querySelector('[popover]'));
