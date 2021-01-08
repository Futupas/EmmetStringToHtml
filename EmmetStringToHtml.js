'use strict';

/**
 * 
 * @param {string} emmet 
 * @returns {Array<HTMLElement>}
 */
function emmetToHTML(emmet) {

}

/**
 * @returns {Array<HTMLElement>}
 */
String.prototype.toHtml = function () {
    return emmetToHTML(this);
}

'hello world'.toHtml();

class PseudoHTML {
    /** @type {string} */
    tag;

    /** @type {Array<PseudoHTML>} */
    children = [];

    /** @type {PseudoHTML | undefined} */
    parent;

    /**
     * @param {string} tag 
     * @param {PseudoHTML | undefined} parent 
     */
    constructor(tag, parent) {
        this.tag = tag;
        this.parent = parent;
    }
}

/**
 * Main function at the moment
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
        let parent = currentElement.parent;
        // check changing levels
        if (element.startsWith('>')) {
            parent = currentElement;
            element = '+' + element.substring(1);
        } else if (element.startsWith('^')) {
            while (element.startsWith('^')) {
                currentElement = currentElement.parent;
                parent = currentElement.parent
                element = element.substring(1);
            }
            if (element === '') continue;
            element = '+' + element;
        }

        // one level
        if (element.startsWith('+')) {
            if (element.charAt(1) === '(') {
                let pseudoHtmls = stringToPseudoHTML(element.substring(2, element.length-1));
                if (pseudoHtmls.length < 1) {
                    throw new EmmetStringParsingError('Error parsing with brackets (I guess, it\'s because of there are empty brackets)');
                } else {
                    currentElement = pseudoHtmls[0];
                }
                for (const addedElement of pseudoHtmls) {
                    addedElement.parent = parent;
                    parent.children.push(addedElement);
                }
            } else {
                let newElement = new PseudoHTML(element.substring(1), parent);
                parent.children.push(newElement);
                currentElement = newElement;
            }
        }  else {
            throw new EmmetStringParsingError('Incorrect first symbol');
        }
    }

    for (const el of pseudoParent.children) {
        el.parent = undefined;
    }

    return pseudoParent.children;
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
        let curlyBrackets = false;
        for (let i = 0; i < str.length; i-=-1) {
            if (str.charAt(i) === '{') curlyBrackets = true;
            if (str.charAt(i) === '}') curlyBrackets = false;
            if (str.charAt(i) === '(' && !curlyBrackets) level++;
            if (str.charAt(i) === ')' && !curlyBrackets) level--;
            if (level === 0) {
                startIndex = i+1;
                str = str.substring(i+1);
                break;
            }
        }
        // Check here if allright (level === 0)
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

class EmmetStringParsingError extends Error { };


// TODO: store index of string to print understandable errors

