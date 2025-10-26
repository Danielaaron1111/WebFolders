/**
 * Sets up an event handler for a form used for purging/logging data in localStorage.
 * @param {HTMLFormElement} footerForm A form element.
 */
export const setupFooterControls = function(footerForm) {
    footerForm.addEventListener('submit', handleFooterSubmit);
};

/**
 * Some "admin" control over local storage
 * @param {SubmitEvent} ev Submit event for the form
 */
const handleFooterSubmit = (ev) => {
    ev.preventDefault();

    const button = ev.submitter;

    switch(button.value) {
        case 'purge':
            if(confirm('WARNING! This is a destructive action. Are you sure?')) {
                localStorage.clear();
                alert('Local storage has been cleared of all data.');
            }
            break;
        case 'dump':
            console.clear();
            Object
                .getOwnPropertyNames(localStorage)
                // .filter(key => key !== '_fauxLogin_')
                .sort()
                .forEach(key => console.log(`key:, ${key},\n value: '${localStorage[key]}'`));
            alert('See the console log for details of what "user" information is in storage.');
            break;
        default:
            break;
    }
}