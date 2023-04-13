/**
 * @jest-environment jsdom
 */

'use strict';

import fs from 'fs';
import simpleContents from '../src';

test('test init', () => {
    // read the example html document
    document.body.innerHTML = fs.readFileSync('./examples/index.html', 'utf8');

    // remove script tags
    Array.from(document.querySelectorAll('script')).forEach(scriptTag => {
        document.body.removeChild(scriptTag);
    });

    // run simpleContents
    simpleContents.init('.article', '#contents');

    const source = simpleContents.getSource();
    const target = simpleContents.getTarget();
    
    if (target === undefined || target === null) {
        expect(target !== null && target !== undefined).toEqual(true);
        return;
    }

    // get the list and heading elements
    const listElements = Array.from(target.querySelectorAll('li'));
    const headingElements = Array.from(source.querySelectorAll('h1, h2, h3, h4, h5, h6'));

    // run checks
    expect(listElements.length > 0).toEqual(true);
    expect(headingElements.length > 0).toEqual(true);
    expect(listElements.length).toEqual(headingElements.length);

    // TODO write test for contents hierarchy
});
