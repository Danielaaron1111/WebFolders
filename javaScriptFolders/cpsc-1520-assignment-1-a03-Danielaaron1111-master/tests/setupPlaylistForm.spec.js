import { describe, it, expect, beforeEach, afterEach, beforeAll, afterAll, vi } from 'vitest';
import { setupPlaylistHandler } from '../js/setupPlaylistForm';
import Path from 'path';
// TODO: Add ☠️poison☠️ expectation for tests that pass with no effort by student

describe('setupPlaylistForm()', () => {
    beforeEach(perTestDocumentBodySetup);
    afterEach(perTestCleanup);


    it('should add an event listener to the playlistForm', () => {
        // Arrange
        const [playlistForm] = givenArgs();
        const spy = vi.spyOn(playlistForm, 'addEventListener');
        // Act
        setupPlaylistHandler(...givenArgs());
        // Assert
        expect(spy).toHaveBeenCalledExactlyOnceWith(expect.stringContaining('submit'), expect.any(Function));
    });

    it('should prevent the default submit action', () => {
        // Arrange
        // a) arrange form event listern
        setupPlaylistHandler(...givenArgs()); // the SUT
        // b) Form Inputs/Outputs
        const options = {
            // by  Carl Franklin (of DotNet Rocks! fame - https://www.dotnetrocks.com/)
            // see https://www.carlfranklin.com/
            name: 'Music to Code By',
            description: 'Instrumental music with rythm, beat and progression designed to enhance the programming experience. It gets you in the "zone". By Carl Franklin.',
            cover: coverOptions.optGravity
        }
        const given = fillForm(options);
        const [playlistForm, outputContainer] = givenArgs();
        // c) arrange event
        const ev = new SubmitEvent('submit', { submitter: given.button})
        // d) arrange spy
        const spy = vi.spyOn(ev, 'preventDefault');

        // Act
        playlistForm.dispatchEvent(ev);

        // Assert
        expect(spy).toHaveBeenCalledOnce();
    });

    it.each([
        '  ',   // spaces
        '',     // empty string
        '123456789012345678901'    // 21 characters
    ])
    ('should show error when playlist short name is "%s"', (badName) => {
        // Arrange
        // a) SUT
        setupPlaylistHandler(...givenArgs()); // student function that builds SUT
        // b) Form Inputs/Outputs
        const options = {
            // by  Carl Franklin (of DotNet Rocks! fame - https://www.dotnetrocks.com/)
            // see https://www.carlfranklin.com/
            name: badName,
            description: 'Instrumental music.',
            cover: coverOptions.optGravity
        }
        const given = fillForm(options);
        const [playlistForm] = givenArgs();
        // c) Expectations
        // d) Submit Event
        const ev = new SubmitEvent('submit', { submitter: given.button})

        // Act
        playlistForm.dispatchEvent(ev);

        // Assert
        // ✅ We can see help info for playlist name
        const isHelpHidden = given.helpName.classList.contains('hide');
        expect(isHelpHidden).toBeFalsy();
        const isAriaInvalidSetTrue = given.inputName.getAttribute('aria-invalid')?.toLowerCase() === 'true';
        expect(isAriaInvalidSetTrue).toBeTruthy();
    });

    it.each([
        '  ',   // spaces
        '',     // empty string
        '123456789',    // 9 characters
        ' 123456789 ',  // 9 meaningful characters
        '123456789_123456789_123456789_123456789_1' // 41 characters
    ])
    ('should show error when playlist description is "%s"', (badDescription) => {
        // Arrange
        // a) SUT
        setupPlaylistHandler(...givenArgs()); // student function that builds SUT
        // b) Form Inputs/Outputs
        const options = {
            // by  Carl Franklin (of DotNet Rocks! fame - https://www.dotnetrocks.com/)
            // see https://www.carlfranklin.com/
            name: 'Music to Code By',
            description: badDescription,
            cover: coverOptions.optGravity
        }
        const given = fillForm(options);
        const [playlistForm] = givenArgs();
        // c) Expectations
        // d) Submit Event
        const ev = new SubmitEvent('submit', { submitter: given.button})

        // Act
        playlistForm.dispatchEvent(ev);

        // Assert
        // ✅ We can see help info for playlist description
        const isHelpHidden = given.helpDescription.classList.contains('hide');
        expect(isHelpHidden).toBeFalsy();
        const isAriaInvalidSetTrue = given.inputDescription.getAttribute('aria-invalid')?.toLowerCase() === 'true';
        expect(isAriaInvalidSetTrue).toBeTruthy();
    });

    it('should show error when playlist cover is none', () => {
        // Arrange
        // a) SUT
        setupPlaylistHandler(...givenArgs()); // student function that builds SUT
        // b) Form Inputs/Outputs
        const options = {
            // by  Carl Franklin (of DotNet Rocks! fame - https://www.dotnetrocks.com/)
            // see https://www.carlfranklin.com/
            name: 'Music to Code By',
            description: 'Instrumental music by Carl Franklin.',
            cover: coverOptions.none
        }
        const given = fillForm(options);
        const [playlistForm] = givenArgs();
        // c) Expectations
        // d) Submit Event
        const ev = new SubmitEvent('submit', { submitter: given.button})

        // Act
        playlistForm.dispatchEvent(ev);

        // Assert
        // ✅ We can see help info for playlist cover
        const isHelpHidden = given.helpCover.classList.contains('hide');
        expect(isHelpHidden).toBeFalsy();
        const isAriaInvalidSetTrue = given.inputCover.getAttribute('aria-invalid')?.toLowerCase() === 'true';
        expect(isAriaInvalidSetTrue).toBeTruthy();
    });

    it.each([
        {name: '', description: '', cover: coverOptions.none },
        {name: 'Valid', description: '', cover: coverOptions.none },
        {name: 'Good', description: 'Present and accounted for.', cover: coverOptions.none },
        {name: 'Good', description: '', cover: coverOptions.optGuitar },
        {name: '', description: 'Instrumental and Soothing', cover: coverOptions.none },
        {name: '', description: 'Digitized Vinyl Records', cover: coverOptions.optVinyl },
    ])
    ('should not add item to playlist when validation errors occur: %o', (options) => {
        // Arrange
        // a) SUT
        setupPlaylistHandler(...givenArgs()); // student function that builds SUT
        // b) Form Inputs/Outputs
        const given = fillForm(options);
        const [playlistForm, outputContainer] = givenArgs();
        // c) Expectations
        // const spyOn = given[`input${options.focus}`];
        // const spy = vi.spyOn(spyOn, 'focus');
        // d) Submit Event
        const ev = new SubmitEvent('submit', { submitter: given.button})

        // Act
        playlistForm.dispatchEvent(ev);
        const actual = getActualPlaylistElements();

        // Assert
        expect(actual.length).toBe(0);
        // expect(spy, `expected the ${options.focus} control to be given focus`).toHaveBeenCalled();
        // expect(spyOn === document.activeElement, `expected the ${options.focus} control to be the focused element on the page`).toBeTruthy();
    });

    it.each([
        {name: '', description: '', cover: coverOptions.none, focus: 'Name' },
        {name: 'Valid', description: '', cover: coverOptions.none, focus: 'Description' },
        {name: 'Good', description: 'Present and accounted for.', cover: coverOptions.none, focus: 'Cover' },
        // {name: 'Good', description: '', cover: coverOptions.optGuitar, focus: 'Description' },
        // {name: '', description: 'Instrumental and Soothing', cover: coverOptions.none, focus: 'Name' },
        // {name: '', description: 'Digitized Vinyl Records', cover: coverOptions.optVinyl, focus: 'Name' },
    ])
    ('should give the correct input focus when validation errors occur: %o', (options) => {
        // Arrange
        // a) SUT
        setupPlaylistHandler(...givenArgs()); // student function that builds SUT
        // b) Form Inputs/Outputs
        const given = fillForm(options);
        const [playlistForm, outputContainer] = givenArgs();
        // c) Expectations
        const spyOn = given[`input${options.focus}`];
        const spy = vi.spyOn(spyOn, 'focus');
        // d) Submit Event
        const ev = new SubmitEvent('submit', { submitter: given.button})

        // Act
        playlistForm.dispatchEvent(ev);

        // Assert
        expect(spy, `expected the ${options.focus} control to be given focus`).toHaveBeenCalled();
        expect(spyOn === document.activeElement, `expected the ${options.focus} control to be the focused element on the page`).toBeTruthy();
    });

    it.each([
        {name: 'Good', description: 'Present and accounted for.', cover: coverOptions.none, focus: 'Cover' },
        {name: 'Good', description: '', cover: coverOptions.optGuitar, focus: 'Description' },
        {name: '', description: 'Digitized Vinyl Records', cover: coverOptions.optVinyl, focus: 'Name' },
    ])
    ('should remove error when input corrected: %o', (options) => {
        // Arrange
        // a) SUT
        setupPlaylistHandler(...givenArgs()); // student function that builds SUT
        // b) Form Inputs/Outputs
        const given = fillForm(options);
        const [playlistForm] = givenArgs();
        // c) Expectations
        const spyOn = given[`input${options.focus}`];
        const spy = vi.spyOn(spyOn, 'focus');
        const helpId = spyOn.getAttribute('aria-describedby');
        const helpEl = document.getElementById(helpId);
        // d) Submit Event
        const ev = new SubmitEvent('submit', { submitter: given.button})
        playlistForm.dispatchEvent(ev);
        // e) Precondition
        // ✅ We can see help info
        let isAriaInvalidSetTrue = spyOn.getAttribute('aria-invalid')?.toLowerCase() === 'true';
        expect(isAriaInvalidSetTrue, `(precondition) expected ${options.focus} control to have aria-invalid set for bad input.`).toBeTruthy();
        let isHelpHidden = helpEl.classList.contains('hide');
        expect(isHelpHidden, `(precondition) expected help for ${options.focus} control to be visible`).toBeFalsy();

        // Act
        // - NOTE: Use a value from the select options, whether you are correcting the <select> or the <input>s
        //         The reason is that if you use some OTHER value when it's a <select>, setting the .value
        //         won't work whenever the supplied value does not match the value of an existing <option>
        spyOn.value = coverOptions.optGazingAtStars;
        playlistForm.dispatchEvent(ev);

        // Assert
        // ✅ Error state is cleared
        isAriaInvalidSetTrue = spyOn.getAttribute('aria-invalid')?.toLowerCase() === 'true';
        expect(isAriaInvalidSetTrue, `expected ${options.focus} control to have aria-invalid corrected for fixed input.`).toBeFalsy();
        isHelpHidden = helpEl.classList.contains('hide');
        expect(isHelpHidden, `expected help for ${options.focus} control to be hidden`).toBeTruthy();
    });

    it.each(['/img/', '/images/'])
    ('should construct a correct image path using hidden input value "%s"', (folderPath) => {
        // NOTE: set the hidden input value to something different than the index.html version:
        //       `expect src to be ${expected} when the hidden input value is ${folderPath}`
        // Arrange
        // a) SUT
        setupPlaylistHandler(...givenArgs()); // student function that builds SUT
        // b) Form Inputs/Outputs
        const options = {
            // by  Carl Franklin (of DotNet Rocks! fame - https://www.dotnetrocks.com/)
            // see https://www.carlfranklin.com/
            name: 'Music to Code By',
            description: 'Instrumental music By Carl Franklin.',
            cover: coverOptions.optGravity
        }
        const given = fillForm(options);
        const [playlistForm, outputContainer] = givenArgs();
        // c) Expectations
        given.inputImageFolder.value = folderPath;
        const expectedSrc = Path.join(given.inputImageFolder.value, options.cover).replaceAll('\\', '/');
        // d) Submit Event
        const ev = new SubmitEvent('submit', { submitter: given.button})

        // Act
        playlistForm.dispatchEvent(ev);
        const actual = getActualPlaylistElements();

        // Assert
        expect(actual.length, `expect an item to be added to the playlist for ${JSON.stringify(options)}`).toBe(1);
        const src = actual[0].imgSrc;
        expect(src,`expect src to be set to '${expectedSrc}' when the hidden input value is '${folderPath}'`).toEqual(expect.stringContaining(expectedSrc));
    });

    it('should add item to playlist', () => {
        // Arrange
        // a) SUT
        setupPlaylistHandler(...givenArgs()); // student function that builds SUT
        // b) Form Inputs/Outputs
        const options = {
            // by  Carl Franklin (of DotNet Rocks! fame - https://www.dotnetrocks.com/)
            // see https://www.carlfranklin.com/
            name: 'Music to Code By',
            description: 'Instrumental music with Carl Franklin.',
            cover: coverOptions.optGravity
        }
        const given = fillForm(options);
        const [playlistForm] = givenArgs();
        // c) Submit Event
        const ev = new SubmitEvent('submit', { submitter: given.button})

        // Act
        playlistForm.dispatchEvent(ev);
        const actual = getActualPlaylistElements();

        // Assert
        expect(actual.length).toBe(1);

        expect(actual[0].h2Text).toBe(options.name);
        expect(actual[0].imgSrc).toEqual(expect.stringContaining(options.cover));
        expect(actual[0].pText).toEqual(expect.stringContaining(options.description));
    });

    it('should add second item to playlist', () => {
        // Arrange
        // a) SUT
        setupPlaylistHandler(...givenArgs()); // student function that builds SUT
        // b) Form Inputs/Outputs
        const options = {
            // by  Carl Franklin (of DotNet Rocks! fame - https://www.dotnetrocks.com/)
            // see https://www.carlfranklin.com/
            name: 'Music to Code By',
            description: 'Instrumental music.',
            cover: coverOptions.optLongPlay
        }
        let given = fillForm(options);
        const [playlistForm, outputContainer] = givenArgs();
        // c) Submit Event
        const ev = new SubmitEvent('submit', { submitter: given.button})
        playlistForm.dispatchEvent(ev);
        let actual = getActualPlaylistElements();
        // d) Expectations
        expect(actual.length, '(precondition) expect one item to be added to the playlist').toBe(1);
        // e) Second item
        const second = {name: '2nd', cover: coverOptions.optRecRoom, description: 'Second Item'};
        given = fillForm(second);

        // Act
        playlistForm.dispatchEvent(ev);
        actual = getActualPlaylistElements()

        // Assert
        // 1) # of playlist items
        expect(actual.length).toBe(2);
        let names = Array.from(outputContainer.querySelectorAll('h2')).map(el => el.textContent.trim());
        let images = Array.from(outputContainer.querySelectorAll('img')).map(el => el.src);
        let descriptions = Array.from(outputContainer.querySelectorAll('p')).map(el => el.textContent.trim());
        //    redundant, but wondering how they might "hack" it
        expect(names.length, 'for the number of <h2> tags').toBe(2);
        expect(images.length, 'for the number of <img> tags').toBe(2);
        expect(descriptions.length, 'for the number of <p> tags').toBe(4); // Recall that the template has 2 <p> tags per PlayList

        // 2) Content of one of the items
        expect(names, `one of the playlist items should have a <h2> holding ${second.name}`).toContain(second.name);
        expect(images, `one of the playlist items should have a <img> holding ${second.cover}`).toEqual(expect.arrayContaining([expect.stringContaining(second.cover)]));
        expect(descriptions, `one of the playlist items should have a <p> holding ${second.description}`).toEqual(expect.arrayContaining([expect.stringContaining(second.description)]));
    });

    it('should prepend additional items to the start of the playlist', () => {
        // Arrange
        // a) SUT
        setupPlaylistHandler(...givenArgs()); // student function that builds SUT
        // b) Form Inputs/Outputs
        const first = {name: '1st', description: 'First Playlist Item', cover: coverOptions.optConcert};
        const second = {name: '2nd', description: 'Second Playlist Item', cover: coverOptions.optGravity};
        const third = {name: '3rd', description: 'Third Playlist Item', cover: coverOptions.optGuitar};
        const [playlistForm] = givenArgs();
        // c) Submit Event
        const ev = new SubmitEvent('submit', { submitter: playlistForm.querySelector('button')})

        // Act
        const givenFirst = fillForm(first);
        playlistForm.dispatchEvent(ev);
        const givenSecond = fillForm(second);
        playlistForm.dispatchEvent(ev);
        const givenThird = fillForm(third);
        playlistForm.dispatchEvent(ev);

        
        // Assert
        const actual = getActualPlaylistElements();
        expect(actual.length).toBe(3);

        expect(actual[0].h2Text, 'expected last item added to be at the start of the playlist (looking for the text in <h2>)').toBe(third.name);
        expect(actual[0].imgSrc, 'expected last item added to be at the start of the playlist (looking for the src <img>)').toEqual(expect.stringContaining(third.cover));
        expect(actual[0].pText, 'expected last item added to be at the start of the playlist (looking for the text in <p>)').toEqual(expect.stringContaining(third.description));

        expect(actual[1].h2Text, 'expected the second item <h2>.textContent to be in the middle of the playlist').toBe(second.name);
        expect(actual[1].imgSrc, 'expected the second item <img>.src to be in the middle of the playlist').toEqual(expect.stringContaining(second.cover));
        expect(actual[1].pText, 'expected the second item <p>.textContent to be in the middle of the playlist').toEqual(expect.stringContaining(second.description));

        expect(actual[2].h2Text, 'expected first item added to be at the end of the playlist (looking for the text in <h2>)').toBe(first.name);
        expect(actual[2].imgSrc, 'expected first item added to be at the end of the playlist (looking for the src <img>)').toEqual(expect.stringContaining(first.cover));
        expect(actual[2].pText, 'expected first item added to be at the end of the playlist (looking for the text in <p>)').toEqual(expect.stringContaining(first.description));
    });


    /* SAMPLE test (kitchen sink)
        // trim short name
        // trim description
    it.skip('SAMPLE_SETUP ', () => {
        // Arrange
        // a) SUT
        setupPlaylistHandler(...givenArgs()); // student function that builds SUT
        // b) Form Inputs/Outputs
        const options = {
            // by  Carl Franklin (of DotNet Rocks! fame - https://www.dotnetrocks.com/)
            // see https://www.carlfranklin.com/
            name: 'Music to Code By',
            description: 'Instrumental music with rythm, beat and progression designed to enhance the programming experience. It gets you in the "zone". By Carl Franklin.',
            cover: coverOptions.optGravity
        }
        const given = fillForm(options);
        const [playlistForm, outputContainer] = givenArgs();
        // c) Expectations
        const src = Path.join(given.IMG_FOLDER, options.cover);

        const expected = getPlaylistMarkup({ name: options.name, description: options.description, })
        // d) Submit Event
        const ev = new SubmitEvent('submit', { submitter: given.button})

        // Act
        playlistForm.dispatchEvent(ev);
        const actual = getActualPlaylistElements();

        // Assert
        // // Arrange
        // const first = {name: '1st', src: '/img/1.png', description: 'First'};
        // const second = {name: '2nd', src: '/img/2.jpg', description: 'Second'};
        // const third = {name: '3rd', src: '/img/3.gif', description: 'Third'};
        // const [,container] = givenArgs();
        // container.innerHTML = getPlaylistMarkup(first);
        // container.innerHTML = getPlaylistMarkup(second) + container.innerHTML;
        // container.innerHTML = getPlaylistMarkup(third) + container.innerHTML;
        // // Act
        // const actual = getActualPlaylistElements();
        // // Assert
        // expect(actual.length).toBe(3);

        // expect(actual[0].h2Text).toBe(third.name);
        // expect(actual[0].imgSrc).toEqual(expect.stringContaining(third.src));
        // expect(actual[0].pText).toEqual(expect.stringContaining(third.description));

        // expect(actual[1].h2Text).toBe(second.name);
        // expect(actual[1].imgSrc).toEqual(expect.stringContaining(second.src));
        // expect(actual[1].pText).toEqual(expect.stringContaining(second.description));

        // expect(actual[2].h2Text).toBe(first.name);
        // expect(actual[2].imgSrc).toEqual(expect.stringContaining(first.src));
        // expect(actual[2].pText).toEqual(expect.stringContaining(first.description));
        expect.fail('TBD 🚦⤴️');
    });
    */
    /* Empty tests...

    it.todo('should ', () => {});
    it.todo('should ', () => {});
    it.todo('should ', () => {});
    it.todo('should ', () => {});
    it.todo('should ', () => {});
    it.todo('should ', () => {});
    it.todo('should ', () => {});
    it.todo('should ', () => {});
    it.todo('should ', () => {});
    it.todo('should ', () => {});
    it.todo('should ', () => {});
    it.todo('should ', () => {});
    */
});



/********* Before/After Each + Arg Helpers *********/

/**
 * The order of the elements is as follows:
 *
 * - {HTMLFormElement} playlistForm - The form element to be shown when an owner's name is available
 * - {HTMLElement} playlistContainer - The container that holds all the playlists
 *
 * @returns {HTMLElement[]} An array of elements from the document
 */
const givenArgs = () => givenElementIds().map(id => document.getElementById(id));

/**
 * Returns a copy of an array of ids, in this order: `['faux-login','input-controls','display-name','playlist-form','playlists']`
 * @returns {string[]} All the document ids of the controls required by `setupOwnerHandler`
 */
const givenElementIds = () => ['playlist-form','playlists'].slice();

/**
 * @name fillForm()
 *
 * @description A test-helper that fills the Playlist Form with initial values and constructs an object with getters for the form and key constants along with each input control and its help element.
 *
 * @param {{name:string, description:string, cover:string}} param0 Options for setting User Input values (each defaults to an empty string)
 * @returns {{
 *              form:HTMLFormElement,
 *              button:HTMLButtonElement,
 *              IMG_FOLDER:string,
 *              inputImageFolder:HTMLInputElement,
 *              inputName:HTMLInputElement,
 *              helpName:HTMLElement,
 *              inputDescription:HTMLInputElement,
 *              helpDescription:HTMLElement,
 *              inputCover:HTMLSelectElement,
 *              helpCover:HTMLElement
 *          }} Helper object to simplify code in tests
 */
const fillForm = (userInput={name:'', description:'', cover:''}) => {
    const {name, description, cover} = userInput;
    const form = document.getElementById('playlist-form');
    const result =  {
        get form() { return form; },
        get button() { return form.querySelector('button'); },
        get IMG_FOLDER() { return  '/img/'; },
        get inputImageFolder() { return form.elements['img-folder']; },
        get inputName() { return form.elements.name; },
        get helpName() { return document.getElementById('invalid-playlist-name'); },
        get inputDescription() { return form.elements.description; },
        get helpDescription() { return document.getElementById('invalid-description'); },
        get inputCover() { return form.elements.cover; },
        get helpCover() { return document.getElementById('invalid-cover'); }
    };
    result.inputName.value = name;
    result.inputDescription.value = description;
    result.inputCover.value = cover;
    return result;
}
/* SELF-CHECK: fillForm()
describe('SELF-CHECK: fillForm()', () => {
    beforeEach(perTestDocumentBodySetup);
    afterEach(perTestCleanup);

    it.only('with defaults', () => {
        // Arrange
        // Act
        const actual = fillForm();
        // Assert
        expect(actual.form).toBeInstanceOf(HTMLFormElement);
        expect(actual.button).toBeInstanceOf(HTMLButtonElement);

        expect(actual.inputName).toBeInstanceOf(HTMLInputElement);
        expect(actual.inputName.value).toBe('');
        expect(actual.helpName).toBeInstanceOf(HTMLElement);

        expect(actual.inputDescription).toBeInstanceOf(HTMLInputElement);
        expect(actual.inputDescription.value).toBe('');
        expect(actual.helpDescription).toBeInstanceOf(HTMLElement);

        expect(actual.inputCover).toBeInstanceOf(HTMLSelectElement);
        expect(actual.inputCover.value).toBe('');
        expect(actual.helpCover).toBeInstanceOf(HTMLElement);
    });

    it.only('with user input', () => {
        // Arrange
        const inputs = {name: 'Music', description: 'Nice music', cover: coverOptions.optConcert };
        // Act
        const actual = fillForm(inputs);
        // Assert
        expect(actual.form).toBeInstanceOf(HTMLFormElement);
        expect(actual.button).toBeInstanceOf(HTMLButtonElement);

        expect(actual.inputName).toBeInstanceOf(HTMLInputElement);
        expect(actual.inputName.value).toBe(inputs.name);
        expect(actual.helpName).toBeInstanceOf(HTMLElement);

        expect(actual.inputDescription).toBeInstanceOf(HTMLInputElement);
        expect(actual.inputDescription.value).toBe(inputs.description);
        expect(actual.helpDescription).toBeInstanceOf(HTMLElement);

        expect(actual.inputCover).toBeInstanceOf(HTMLSelectElement);
        expect(actual.inputCover.value).toBe(inputs.cover);
        expect(actual.helpCover).toBeInstanceOf(HTMLElement);
    });
});
*/


/**
 * A test helper reflecting all the `<select>` option values.
 */
const coverOptions = {
    get none() { return ''; },
    get optRetroCassette() { return "cassette.jpg"; },
    get optConcert() { return "concert_dj.jjpg"; },
    get optGazingAtStars() { return "gazing_at_stars.jpg"; },
    get optGlacierLake() { return "glacier_lake.jpg"; },
    get optGravity() { return "gravity.jpg"; },
    get optGuitar() { return "guitar.jpg"; },
    get optLongPlay() { return "lp_profile.jpg"; },
    get optMountains() { return "mountains.jpg"; },
    get optMetalPedals() { return "pedal_for_the_metal.jpg"; },
    get optRetroTv() { return "tv.jpg"; },
    get optVinyl() { return "vinyl.png"; },
    get optRecRoom() { return "what_you_listen_to.jpg"; },
}

/**
 * A test helper to build an expected playlist item.
 * @param {{name, src, description}} param0 Options for setting the name, image src, and description of the playlist item
 * @returns {string} The markup for the playlist item.
 */
const getPlaylistMarkup = ({name, src, description}) => `
<article>
    <header>
        <h2>${name}</h2>
    </header>
    <img src="${src}" alt="cover image"/>
    <footer>
        <p>
            <input name="public" type="checkbox" role="switch" /> <i>Make Public</i>
            ${description}
        </p>
    </footer>
</article>
`;
/* SELF-CHECK: getPlaylistMarkup()
it.only('SELF-CHECK: getPlaylistMarkup', () => {
    // Arrange
    const given = { name: 'Music', src: './img/placeholder.png', description: 'I like music' };
    // Act
    const actual = getPlaylistMarkup(given);
    // Assert
    expect(actual).toEqual(expect.stringContaining(given.name));
    expect(actual).toEqual(expect.stringContaining(given.src));
    expect(actual).toEqual(expect.stringContaining(given.description));
});
*/

/**
 * A test helper that queries the DOM for `<article>` elements and extracts the pertinant data.
 * @returns {{h2Text:string, imgSrc:string, pText:string}[]} Pertinant data for all `<article>` elements.
 */
const getActualPlaylistElements = () => {
    const results = [];
    const articles = document.querySelectorAll('article');
    articles.forEach(entry => {
        let h2Text = entry.querySelector('h2').textContent.trim();
        let imgSrc = entry.querySelector('img').src;
        let pText = entry.querySelector('p').textContent.trim();
        results.push({h2Text, imgSrc, pText});
    })
    return results;
}
/* SELF-CHECK: getActualPlaylistElements()
describe.only('SELF-CHECK:', () => {
    beforeEach(perTestDocumentBodySetup);
    afterEach(perTestCleanup);
    it('should find three playlist items', () => {
        // Arrange
        const first = {name: '1st', src: '/img/1.png', description: 'First'};
        const second = {name: '2nd', src: '/img/2.jpg', description: 'Second'};
        const third = {name: '3rd', src: '/img/3.gif', description: 'Third'};
        const [,container] = givenArgs();
        container.innerHTML = getPlaylistMarkup(first);
        container.innerHTML = getPlaylistMarkup(second) + container.innerHTML;
        container.innerHTML = getPlaylistMarkup(third) + container.innerHTML;
        // Act
        const actual = getActualPlaylistElements();
        // Assert
        expect(actual.length).toBe(3);

        expect(actual[0].h2Text).toBe(third.name);
        expect(actual[0].imgSrc).toEqual(expect.stringContaining(third.src));
        expect(actual[0].pText).toEqual(expect.stringContaining(third.description));

        expect(actual[1].h2Text).toBe(second.name);
        expect(actual[1].imgSrc).toEqual(expect.stringContaining(second.src));
        expect(actual[1].pText).toEqual(expect.stringContaining(second.description));

        expect(actual[2].h2Text).toBe(first.name);
        expect(actual[2].imgSrc).toEqual(expect.stringContaining(first.src));
        expect(actual[2].pText).toEqual(expect.stringContaining(first.description));
    });
});
*/

/**
 * Sets document.body.innerHTML with a comparable markup to the actual index.html
 */
const perTestDocumentBodySetup = () => {
    document.body.innerHTML = `
    <form id="playlist-form">
      <input type="hidden" name="img-folder" value="/img/" />
      <fieldset class="grid">
        <label>
          <input name="name" type="text"
                 placeholder="Playlist Title" autocomplete="off"
                 aria-describedby="invalid-playlist-name" />
          <small id="invalid-playlist-name" class="hide">
            Title is required and cannot exceed 20 characters
          </small>
        </label>
        <label>
          <input name="description" type="text"
                 placeholder="Describe Playlist" autocomplete="off"
                 aria-describedby="invalid-description" />
          <small id="invalid-description" class="hide">
            Description must be from 10 to 40 characters
          </small>
        </label>
        <label>
          <select name="cover" aria-describedby="invalid-cover">
            <option value="">Choose a Cover</option>
            <option value="cassette.jpg">Retro Cassette</option>
            <option value="concert_dj.jjpg">Concert</option>
            <option value="gazing_at_stars.jpg">Gazing at Stars</option>
            <option value="glacier_lake.jpg">Glacier Lake</option>
            <option value="gravity.jpg">Gravity</option>
            <option value="guitar.jpg">Guitar</option>
            <option value="lp_profile.jpg">Long-Play</option>
            <option value="mountains.jpg">Mountains</option>
            <option value="pedal_for_the_metal.jpg">Metal Pedals</option>
            <option value="tv.jpg">Retro TV</option>
            <option value="vinyl.png">Vinyl</option>
            <option value="what_you_listen_to.jpg">Rec Room</option>
          </select>
          <small id="invalid-cover" class="hide">
            You must select a cover image for the playlist
          </small>
        </label>
        <button type="submit">Save</button>
      </fieldset>
    </form>

    <section id="playlists"></section>
    `;
};

/**
 * Calls vi.restoreAllMocks()
 */
const perTestCleanup = () => {
    vi.restoreAllMocks();
};
