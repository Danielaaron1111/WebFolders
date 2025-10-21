import { describe, test, it, beforeEach, afterEach, vi, expect } from 'vitest';
import { hide, show, turnOnDarkTheme, turnOffDarkTheme, showResources, openPopoverOnClick, addMouseHandlers, toggleTagEmphasis } from '../js/interactive';
import { afterAll } from 'vitest';

describe('interactive.js module\'s', () => {
    describe('hide(el) function', () => {
        it('should apply the .hide class to the element', () => {
            const div = document.createElement('div');
            hide(div);
            expect(div.classList).toContain('hide');
        });
    });

    describe('show(el) function', () => {
        it('should remove the .hide class from the element', () => {
            const div = document.createElement('div');
            div.classList.add('hide');
            show(div);
            expect(div.classList).not.toContain('hide');
        });
    });

    describe('turnOnDarkTheme(el) function', () => {
        it('should add a "click" event listener to the element', () => {
            const div = document.createElement('div');
            const spy = vi.spyOn(div, 'addEventListener');
            turnOnDarkTheme(div);
            expect(spy).toHaveBeenCalledOnce();
            expect(spy).toHaveBeenCalledWith('click', expect.any(Function));
        });

        it('should prevent the default behaviour of the event', () => {
            const div = document.createElement('div');
            const ev = new MouseEvent('click');
            const spy = vi.spyOn(ev, 'preventDefault');
            turnOnDarkTheme(div);
            div.dispatchEvent(ev);
            expect(spy).toHaveBeenCalledOnce();
        });

        it('should set the "data-theme" attribute to "dark" on the <html> element', () => {
            const div = document.createElement('div');
            document.body.append(div);
            const ev = new MouseEvent('click');
            turnOnDarkTheme(div);
            div.dispatchEvent(ev);
            const html = document.body.parentElement
            expect(html.getAttributeNames()).toContain('data-theme');
            expect(html.getAttribute('data-theme')).toBe('dark')
        });
    });

    describe('turnOffDarkTheme(el) function', () => {
        it('should add a "click" event listener to the element', () => {
            const div = document.createElement('div');
            const spy = vi.spyOn(div, 'addEventListener');
            turnOffDarkTheme(div);
            expect(spy).toHaveBeenCalledOnce();
            expect(spy).toHaveBeenCalledWith('click', expect.any(Function));
        });

        it('should prevent the default behaviour of the event', () => {
            const div = document.createElement('div');
            const ev = new MouseEvent('click');
            const spy = vi.spyOn(ev, 'preventDefault');
            turnOffDarkTheme(div);
            div.dispatchEvent(ev);
            expect(spy).toHaveBeenCalledOnce();
        });

        it('should set the "data-theme" attribute to "light" on the <html> element', () => {
            const div = document.createElement('div');
            document.body.append(div);
            const ev = new MouseEvent('click');
            turnOffDarkTheme(div);
            div.dispatchEvent(ev);
            const html = document.body.parentElement
            expect(html.getAttributeNames()).toContain('data-theme');
            expect(html.getAttribute('data-theme')).toBe('light')
        });
    });

    describe('showResources(elBtn, elReveal, elDialog) function', () => {
        beforeAll(() => {
            HTMLDialogElement.prototype.show = vi.fn();
            HTMLDialogElement.prototype.showModal = vi.fn();
            HTMLDialogElement.prototype.close = vi.fn();
        });
        afterAll(() => {
            delete HTMLDialogElement.prototype.show;
            delete HTMLDialogElement.prototype.showModal;
            delete HTMLDialogElement.prototype.close;
            vi.restoreAllMocks();
        })

        // beforeEach() "globals"
        let btn;
        let section;
        let dlg;
        beforeEach(() => {
            // Setup the DOM
            btn = document.createElement('button');
            section = document.createElement('section');
            section.classList.add('hide');
            dlg = document.createElement('dialog');
            document.body.append(btn);
            document.body.append(section);
            document.body.append(dlg);
        });
        afterEach(() => {
            document.body.innerHTML = '';
            vi.resetAllMocks(); // ... probably not needed
        });

        it('should listen for the "click" event on the first parameter', () => {
            // Arrange
            const spy = vi.spyOn(btn, 'addEventListener');
            // Act
            showResources(btn, section, dlg);
            // Assert
            expect.soft(spy).toHaveBeenCalledOnce();
            expect.soft(spy).toHaveBeenCalledWith('click', expect.any(Function));
            const reason = 'because hiding/revealing of elements should only happen on click events';
            expect.soft(btn.classList, reason).not.toContain('hide');
            expect.soft(section.classList, reason).toContain('hide')
        });

        it('should reveal the element when clicked', () => {
            // Arrange
            const ev = new MouseEvent('click');
            showResources(btn, section, dlg);
            // Act
            btn.dispatchEvent(ev);
            // Assert
            expect(section.classList).not.toContain('hide');
        });

        it('should hide the button when clicked', () => {
            // Arrange
            const ev = new MouseEvent('click');
            showResources(btn, section, dlg);
            // Act
            btn.dispatchEvent(ev);
            // Assert
            expect(btn.classList).toContain('hide');
        });

        it('should show the dialog as a modal', () => {
            // Arrange
            const spyShowModal = vi.spyOn(dlg, 'showModal');
            const ev = new MouseEvent('click');
            showResources(btn, section, dlg);
            // Act
            btn.dispatchEvent(ev);
            // Assert
            expect(spyShowModal).toHaveBeenCalledOnce();
        });

        it('should add a "click" event listener to the <dialog> element', () => {
            // Arrange
            const spyAddEventListener = vi.spyOn(dlg, 'addEventListener');
            const ev = new MouseEvent('click');
            // Act
            showResources(btn, section, dlg);
            btn.dispatchEvent(ev); // because they *might* add the listener only when the dialog is shown
            // Assert
            expect(spyAddEventListener).toHaveBeenCalledOnce();
        });

        it('should prevent the click on the dialog from bubbling up the DOM', () => {
            // Arrange
            const ev = new MouseEvent('click');
            const spyEvent = vi.spyOn(ev, 'stopPropagation');
            showResources(btn, section, dlg);
            btn.dispatchEvent(ev); // to open the dialog
            // Act
            dlg.dispatchEvent(ev);
            // Assert
            expect.soft(spyEvent).toHaveBeenCalledOnce();
            const reason = 'because hiding/revealing of other elements should not happen when clicking on the dialog';
            expect.soft(btn.classList, reason).toContain('hide');
            expect.soft(section.classList, reason).not.toContain('hide')
        });

        it('should close the dialog when clicked', () => {
            // Arrange
            const ev = new MouseEvent('click');
            const spyDialogClose = vi.spyOn(dlg, 'close');
            showResources(btn, section, dlg);
            btn.dispatchEvent(ev); // to open the dialog
            // Act
            dlg.dispatchEvent(ev);
            // Assert
            expect.soft(spyDialogClose).toHaveBeenCalledOnce();
            const reason = 'because hiding/revealing of other elements should not happen when clicking on the dialog';
            expect.soft(btn.classList, reason).toContain('hide');
            expect.soft(section.classList, reason).not.toContain('hide')
        });
    });

    describe('openPopoverOnClick(el, popover) function', () => {
        beforeAll(() => {
            HTMLParagraphElement.prototype.togglePopover = vi.fn();
        });
        afterAll(() => {
            delete HTMLParagraphElement.prototype.togglePopover;
            vi.restoreAllMocks();
        })

        let el;
        let popoverEl;
        beforeEach(() => {
            el = document.createElement('div');
            popoverEl = document.createElement('p');
            popoverEl.setAttribute("popover", "");
            document.body.append(el);
            document.body.append(popoverEl);
        });
        afterEach(() => {
            document.body.innerHTML = '';
            vi.resetAllMocks();
        });

        it('should listen for the "click" event', () => {
            // Arrange
            const spy = vi.spyOn(el, 'addEventListener');
            // Act
            openPopoverOnClick(el, popoverEl);
            // Assert
            expect(spy).toHaveBeenCalledOnce();
            expect(spy).toHaveBeenCalledWith('click', expect.any(Function));
        });

        it('should prevent the default behaviour of the event', () => {
            // Arrange
            const ev = new MouseEvent('click');
            const spy = vi.spyOn(ev, 'preventDefault');
            openPopoverOnClick(el, popoverEl);
            // Act
            el.dispatchEvent(ev);
            // Assert
            expect(spy).toHaveBeenCalledOnce();
        });

        it('should toggle the popover', () => {
            // Arrange
            const ev = new MouseEvent('click');
            const spy = vi.spyOn(popoverEl, 'togglePopover');
            openPopoverOnClick(el, popoverEl);
            // Act
            el.dispatchEvent(ev);
            // Assert
            expect(spy).toHaveBeenCalledOnce();
        });
    });

    describe('addMouseHandlers(el) function', () => {
        let el;
        let nestedChild;
        const filler = (id) => createDiv('"Lorem Ipsum" is my name', id);
        const createDiv = (text, id) => {
            const div = document.createElement('div');
            div.innerText = text;
            div.id = id;
            return div;
        }
        beforeEach(() => {
            el = document.createElement('div');
            el.append(filler('first'));
            nestedChild = document.createElement('p');
            nestedChild.innerText = 'Over and Out';
            el.appendChild(nestedChild);
            el.append(filler('last'));
            document.body.append(el);
        });
        afterEach(() => {
            document.body.innerHTML = '';
            vi.resetAllMocks();
        });

        it('should listen for mouse over events', () => {
            // Arrange
            const spy = vi.spyOn(el, 'addEventListener');
            // Act
            addMouseHandlers(el);
            // Assert
            expect(spy).toHaveBeenCalledWith('mouseover', expect.any(Function));
        });

        it('should listen for mouse out events', () => {
            // Arrange
            const spy = vi.spyOn(el, 'addEventListener');
            // Act
            addMouseHandlers(el);
            // Assert
            expect(spy).toHaveBeenCalledWith('mouseout', expect.any(Function));
        });

        it('should add the .emphasize class to the correct element', () => {
            // Arrange
            const ev = new MouseEvent('mouseover', { 'bubbles': true, 'cancelable': true });
            addMouseHandlers(el);
            // Act
            nestedChild.dispatchEvent(ev);
            // Assert
            expect(nestedChild.classList).toContain('emphasize');
            expect(el.classList).not.toContain('emphasize'); // to check that they are modifying the .target
        });

        it('should remove the .emphasize class from the correct element', () => {
            // Arrange
            const ev = new MouseEvent('mouseout', { 'bubbles': true, 'cancelable': true });
            el.classList.add('emphasize');
            nestedChild.classList.add('emphasize');
            expect(nestedChild.classList).toContain('emphasize');
            addMouseHandlers(el);
            // Act
            nestedChild.dispatchEvent(ev);
            // Assert
            expect(nestedChild.classList).not.toContain('emphasize');
            expect(el.classList).toContain('emphasize'); // to check that they are modifying the .target
        });
    });

    describe('toggleTagEmphasis(el) function', () => {
        beforeAll(() => {
            // window.gets
        })
        let el;
        let nestedChild;
        beforeEach(() => {
            document.body.innerHTML = `<div>Unit testing is a <strong>GOAT</strong> experience. <i>Try it!</i></div>`;
            el = document.querySelector('div');
            nestedChild = document.querySelector('strong');
        });
        afterEach(() => {
            document.body.innerHTML = '';
            vi.resetAllMocks();
        });


        it('should listen for the correct event on the element', () => {
            // Arrange
            const spy = vi.spyOn(el, 'addEventListener');
            // Act
            toggleTagEmphasis(el);
            // Assert
            expect(spy).toHaveBeenCalledWith('dblclick', expect.any(Function));
        });

        it.todo('should ensure selected text from double-clicking is cleared', () => {
            /* WARNING: Manual Code Review Required!
             *          Due to the limitations of the current test setup,
             *          the student's code should be examined to ensure
             *          that they have correctly implemented this portion. */
        });

        it('should add .tag-emphasize to the element', () => {
            /* WARNING: Manual Code Review Required!
             *          This is a "shallow" test in that it cannot ensure
             *          that the implementation is using the .target of
             *          the event. */
            // Arrange
            const ev = new MouseEvent('dblclick');
            toggleTagEmphasis(el);
            // Act
            el.dispatchEvent(ev);
            // Assert
            expect(el.classList).toContain('tag-emphasize')
        });

        it('should remove .tag-emphasize from the element', () => {
            /* WARNING: Manual Code Review Required!
             *          This is a "shallow" test in that it cannot ensure
             *          that the implementation is using the .target of
             *          the event. */
            // Arrange
            el.classList.add('tag-emphasize');
            const ev = new MouseEvent('dblclick');
            toggleTagEmphasis(el);
            // Act
            el.dispatchEvent(ev);
            // Assert
            expect(el.classList).not.toContain('tag-emphasize')
        });
    });
});
