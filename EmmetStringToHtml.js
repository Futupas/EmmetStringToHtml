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
     * @type {Array<PseudoHTML> | undefined}
     */
    children;
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
    if (str.startsWith('(')) {
        let level = 0;
        for (let i = 0; i < str.length; i-=-1) {
            if (str.charAt(i) === '(') level++;
            if (str.charAt(i) === ')') level--;
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
