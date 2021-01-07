'use strict';

/**
 * 
 * @param {string} emmet 
 * @returns {Array<HTMLElement>}
 */
function EmmetToHTML(emmet) {

}

/**
 * @returns {Array<HTMLElement>}
 */
String.prototype.toHtml = function () {
    return EmmetToHTML(this);
}

'hello world'.toHtml();

class PseudoHTML {
    /**
     * @type {string}
     */
    tag;

    /**
     * @type {Array<PseudoHTML>}
     */
    children = [];

    /**
     * @type {PseudoHTML | undefined}
     */
    parent;

    constructor(tag, parent) {
        this.tag = tag;
        this.parent = parent;
    }
}

// /**
//  * 
//  * @param {string} str 
//  * @returns {Array<PseudoHTML>}
//  */
// function stringToPseudoHTML(str) {
//     let splitted = splitStringToPseudoHTMLElements(str);

//     /** @type {Array<PseudoHTML>} */
//     let returnArray = [];
//     let currentArray = returnArray;
//     /** @type {PseudoHTML | undefined} */
//     let currentElement = undefined;
//     /** @type {PseudoHTML | undefined} */
//     let currentParent = undefined;

//     for (const celement of splitted) {
//         let element = celement;
//         // check changing levels
//         if (element.startsWith('>')) {
//             if (currentElement === undefined) {
//                 // throw error?
//             }
//             currentArray = currentElement.children;
//             currentParent = currentElement;
//             element = element.substring(1);
//             element = '+' + element;
//         } else if (element.startsWith('^')) {
//             // if level is maksimum up, throw an error
//             while (element.startsWith('^')) {
//                 currentArray = currentElement.parent.children;
//                 currentParent = currentElement.parent.parent;
//                 currentElement = currentElement.parent;
//                 element = element.substring(1);
//             }
//             element = '+' + element;
//         }

//         // one level
//         if (element.startsWith('+')) {
//             // add {}
//             if (element.charAt(1) === '(') {
//                 let pseudoHtmls = stringToPseudoHTML(element.substring(2, element.length-1));
//                 for (const addedElement of pseudoHtmls) {
//                     addedElement.parent = currentParent;
//                     currentArray.push(addedElement);
//                 }
//             } else {
//                 let pseudoHtml = new PseudoHTML();
//                 pseudoHtml.tag = element.substring(1);
//                 pseudoHtml.parent = currentParent;
//                 currentElement = pseudoHtml;
//                 // if (currentParent !== undefined) {
//                 //     currentArray = currentElement.parent.children;
//                 // }

//                 currentArray.push(pseudoHtml);
//             }
//         }  else {
//             // throw an error
//         }
//     }

//     return returnArray;
// }

/**
 * 
 * @param {string} str 
 * @returns {Array<PseudoHTML>}
 */
function stringToPseudoHTML(str) {
    let splitted = splitStringToPseudoHTMLElements(str);

    /** @type {PseudoHTML} */
    let pseudoParent = new PseudoHTML('PSEUDO_PARENT', undefined);
    // Very good kostyl
    pseudoParent.parent = pseudoParent;

    /** @type {PseudoHTML} */
    let currentElement = pseudoParent;

    for (const celement of splitted) {
        let element = celement;
        // check changing levels
        if (element.startsWith('>')) {
            if (element.charAt(1) === '(') {
                let pseudoHtmls = stringToPseudoHTML(element.substring(2, element.length-1));
                for (const addedElement of pseudoHtmls) {
                    addedElement.parent = currentElement;
                    currentElement.children.push(addedElement);
                }
                // currentElement = newElement; (?)
            } else {
                let newElement = new PseudoHTML(element.substring(1), currentElement.parent);
                currentElement.children.push(newElement);
                currentElement = newElement;
            }
        } else if (element.startsWith('^')) {
            // if level is maksimum up, throw an error
            while (element.startsWith('^')) {
                currentElement = currentElement.parent;
                element = element.substring(1);
            }
            element = '+' + element;
        }

        // one level
        if (element.startsWith('+')) {
            // add {}
            if (element.charAt(1) === '(') {
                let pseudoHtmls = stringToPseudoHTML(element.substring(2, element.length-1));
                for (const addedElement of pseudoHtmls) {
                    addedElement.parent = currentElement.parent;
                    currentElement.parent.children.push(addedElement);
                }
            } else {
                let newElement = new PseudoHTML(element.substring(1), currentElement.parent);
                currentElement.parent.children.push(newElement);
                currentElement = newElement;
            }
        }  else {
            // throw an error
        }
    }

    for (const el of pseudoParent.children) {
        el.parent = undefined;
    }

    return pseudoParent.children;
}

function a(str) {
    return splitStringToPseudoHTMLElements(str);
}

/**
 * 
 * @param {string} str 
 * @returns {Array<string>}
 */
function splitStringToPseudoHTMLElements(str) {
    /**
     * @type {Array<string>}
     */
    let resultArr = [];
    let symbol = '+';
    let firstOccurence = getFirstOccurenceOfSpecialCharacter(str);
    while (firstOccurence !== false && str.length > 0) {
        let tag = symbol + str.substring(0, firstOccurence);
        resultArr.push(tag);
        symbol = str.charAt(firstOccurence);
        str = str.substring(firstOccurence + 1);
        firstOccurence = getFirstOccurenceOfSpecialCharacter(str);
    }
    resultArr.push(symbol + str);
    
    return resultArr;
}

/**
 * If string starts with round bracket, it returns first occurence out of brackets
 * @param {string} str 
 * @returns {number | false} false if nothing found
 */
function getFirstOccurenceOfSpecialCharacter(str) {
    let startIndex = 0;
    // Kostyl. Needs to be refactored because () are not equal to {}. case: 'div>(hello+{world)}'
    if (str.startsWith('(') || str.startsWith('{')) {
        let level = 0;
        for (let i = 0; i < str.length; i-=-1) {
            if (str.charAt(i) === '(' || str.charAt(i) === '{') level++;
            if (str.charAt(i) === ')' || str.charAt(i) === '}') level--;
            if (level === 0) {
                startIndex = i+1;
                str = str.substring(i+1);
                break;
            }
        }
    }
    let indexOfPlus = str.indexOf('+');
    let indexOfNesting = str.indexOf('>');
    let indexOfUp = str.indexOf('^');

    if (indexOfPlus === -1 && indexOfNesting === -1 && indexOfUp === -1) return false;

    if (indexOfPlus === -1) indexOfPlus = Math.max(indexOfNesting, indexOfUp);
    if (indexOfNesting === -1) indexOfNesting = Math.max(indexOfPlus, indexOfUp);
    if (indexOfUp === -1) indexOfUp = Math.max(indexOfPlus, indexOfNesting);

    return Math.min(indexOfPlus, indexOfNesting, indexOfUp) + startIndex;
}


TEST(stringToPseudoHTML);
