// @vitest-environment happy-dom
import { describe, it, expect, beforeEach, beforeAll, afterEach, vi } from 'vitest';

import { calculateResult } from '../js/calculate';
import * as populate from '../js/populate';

describe('The calculateResult() function', () => {
    beforeAll(() => {
        // NOTE: Remember, JSDOM does not implement `.innerText` on elements
        //       because `.innerText` requires layout, which JSDOM does not support.
        //       Tests should use `.textContent` instead.
        Object.defineProperty(HTMLElement.prototype, 'innerText', {
            get: function() {
                return this.textContent;
            },
            set: function(str) {
                this.textContent = str.toString();
            }
        })
    });

    let spy;
    const el = (id) => document.getElementById(id);
    const mockPopulate = (lh, rh) => {
        spy.mockImplementationOnce((first, second) => {
            first.textContent = lh;
            second.textContent = rh;
        })
    };
    beforeEach(() => {
        document.body.innerHTML = `
        <div id="first-value">TBD</div>
        <div id="second-value">TBD</div>
        <div id="add-result">TBD</div>
        <div id="subtract-result">TBD</div>
        <div id="multiply-result">TBD</div>
        <div id="divide-result">TBD</div>
        <div id="modulus-result">TBD</div>
        <div id="hypotenuse-result">TBD</div>
        `;
        spy = vi.spyOn(populate, 'populateWithRandomValues');
    });
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('should be calling populateWithRandomValues()', () => {
        mockPopulate(3, 7);
        calculateResult();
        expect.soft(spy).toHaveBeenCalledOnce();
        expect.soft(el('first-value').textContent).toBe('3');
        expect.soft(el('second-value').textContent).toBe('7');
    });

    it.each([
        { first: 3, second: 7, expected: '10' },
        { first: 7, second: 5, expected: '12' }
    ])
    ('should perform addition: $first + $second = $expected', ({first, second, expected}) => {
        mockPopulate(first, second);
        calculateResult();
        expect.soft(el('add-result').textContent).toBe(expected);
    })

    it.each([
        { first: 3, second: 7, expected: '-4' },
        { first: 7, second: 5, expected: '2' }
    ])
    ('should perform subtraction: $first - $second = $expected', ({first, second, expected}) => {
        mockPopulate(first, second);
        calculateResult();
        expect.soft(el('subtract-result').textContent).toBe(expected);
    })

    it.each([
        { first: 3, second: 7, expected: '21' },
        { first: 7, second: 5, expected: '35' }
    ])
    ('should perform multiplication: $first x $second = $expected', ({first, second, expected}) => {
        mockPopulate(first, second);
        calculateResult();
        expect.soft(el('multiply-result').textContent).toBe(expected);
    })

    it.each([
        { first: 3, second: 7, expected: '0.6' },
        { first: 7, second: 5, expected: '1.4' }
    ])
    ('should divide by 5: $first / 5 = $expected', ({first, second, expected}) => {
        mockPopulate(first, second);
        calculateResult();
        expect.soft(el('divide-result').textContent).toBe(expected);
    })
    it.each([
        { first: 3, second: 7, expected: '3' },
        { first: 7, second: 5, expected: '0' }
    ])
    ('should modulus by 7: $first \% 7 = $expected', ({first, second, expected}) => {
        mockPopulate(first, second);
        calculateResult();
        expect.soft(el('modulus-result').textContent).toBe(expected);
    })

    it.each([
        { first: 3, second: 7, expected: '7.62' },
        { first: 7, second: 5, expected: '8.60' }
    ])
    ('should calculate the hypotenuse where a = $first, b = $second: $expected', ({first, second, expected}) => {
        mockPopulate(first, second);
        calculateResult();
        expect.soft(el('hypotenuse-result').textContent).toBeCloseTo(expected);
    })
});
