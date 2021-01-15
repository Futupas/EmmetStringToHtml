'use strict';

function makePseudoHtml(str) {



var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var PseudoHTML = /** @class */ (function () {
    function PseudoHTML(tag, parent) {
        this.tag = tag;
        this.parent = parent;
        this.children = [];
    }
    return PseudoHTML;
}());

/**
 * Main function at the moment
 * @param str
 * @returns
 */
function stringToPseudoHTML(str) {
    var splitted = splitStringToPseudoHTMLElements(str);
    var pseudoParent = new PseudoHTML('PSEUDO_PARENT', undefined);
    // Very good kostyl
    pseudoParent.parent = pseudoParent;
    var currentElement = pseudoParent;
    for (var _i = 0, splitted_1 = splitted; _i < splitted_1.length; _i++) {
        var celement = splitted_1[_i];
        var element = celement;
        var parent_1 = currentElement.parent;
        // check changing levels
        if (element.startsWith('>')) {
            parent_1 = currentElement;
            element = '+' + element.substring(1);
        }
        else if (element.startsWith('^')) {
            while (element.startsWith('^')) {
                currentElement = currentElement.parent;
                parent_1 = currentElement.parent;
                element = element.substring(1);
            }
            if (element === '')
                continue;
            element = '+' + element;
        }
        // one level
        if (element.startsWith('+')) {
            if (element.charAt(1) === '(') {
                var pseudoHtmls = stringToPseudoHTML(element.substring(2, element.length - 1));
                if (pseudoHtmls.length < 1) {
                    throw new EmmetStringParsingError('Error parsing with brackets (I guess, it\'s because of there are empty brackets)');
                }
                else {
                    currentElement = pseudoHtmls[0];
                }
                for (var _a = 0, pseudoHtmls_1 = pseudoHtmls; _a < pseudoHtmls_1.length; _a++) {
                    var addedElement = pseudoHtmls_1[_a];
                    addedElement.parent = parent_1;
                    parent_1.children.push(addedElement);
                }
            }
            else {
                var newElement = new PseudoHTML(element.substring(1), parent_1);
                parent_1.children.push(newElement);
                currentElement = newElement;
            }
        }
        else {
            throw new EmmetStringParsingError('Incorrect first symbol');
        }
    }
    for (var _b = 0, _c = pseudoParent.children; _b < _c.length; _b++) {
        var el = _c[_b];
        el.parent = undefined;
    }
    return pseudoParent.children;
}
/**
 *
 * @param str
 * @returns
 */
function splitStringToPseudoHTMLElements(str) {
    var resultArr = [];
    var symbol = '+';
    var firstOccurence = getFirstOccurenceOfSpecialCharacter(str);
    while (firstOccurence !== false && str.length > 0) {
        var tag = symbol + str.substring(0, firstOccurence);
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
 * @param str
 * @returns false if nothing found
 */
function getFirstOccurenceOfSpecialCharacter(str) {
    var startIndex = 0;
    // Kostyl. Needs to be refactored because () are not equal to {}. case: 'div>(hello+{world)}'
    if (str.startsWith('(') || str.startsWith('{')) {
        var level = 0;
        var curlyBrackets = false;
        for (var i = 0; i < str.length; i -= -1) {
            if (str.charAt(i) === '{')
                curlyBrackets = true;
            if (str.charAt(i) === '}')
                curlyBrackets = false;
            if (str.charAt(i) === '(' && !curlyBrackets)
                level++;
            if (str.charAt(i) === ')' && !curlyBrackets)
                level--;
            if (level === 0) {
                startIndex = i + 1;
                str = str.substring(i + 1);
                break;
            }
        }
        // Check here if allright (level === 0)
    }
    var indexOfPlus = str.indexOf('+');
    var indexOfNesting = str.indexOf('>');
    var indexOfUp = str.indexOf('^');
    if (indexOfPlus === -1 && indexOfNesting === -1 && indexOfUp === -1)
        return false;
    if (indexOfPlus === -1)
        indexOfPlus = Math.max(indexOfNesting, indexOfUp);
    if (indexOfNesting === -1)
        indexOfNesting = Math.max(indexOfPlus, indexOfUp);
    if (indexOfUp === -1)
        indexOfUp = Math.max(indexOfPlus, indexOfNesting);
    return Math.min(indexOfPlus, indexOfNesting, indexOfUp) + startIndex;
}
var EmmetStringParsingError = /** @class */ (function (_super) {
    __extends(EmmetStringParsingError, _super);
    function EmmetStringParsingError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return EmmetStringParsingError;
}(Error));

/**
 *
 * @param notPreparedString
 * @returns
 */
function prepareString(notPreparedString) {
    // TODO make this method
    /*
    1. All '\specialcharacter' replace with appropriate &... (https://www.w3schools.com/html/html_symbols.asp)
    1.1. Special characters: >{}()[]"'\+^
    2. Everything inside {} replace also (it's just text)
    3. Maybe, there's something else, but now it's enough
    */
    return notPreparedString;
}

// import { PseudoHTML } from './PseudoHTML';
// String.prototype.toHtml = function () {
//     return emmetToHTML(this);
// }
// To make library https://aganglada.com/blog/how-to-create-your-own-typescript-library
function emmetToHTML(emmetString) {
    var preparedString = prepareString(emmetString);
    var pseudoHtml = makePseudoHtml(preparedString);
    // Make real html from pseudoHtml
    // Catch errors
    return [new HTMLDivElement()];
}
function emmetToPseudoHTML(emmetString) {
    var preparedString = prepareString(emmetString);
    var pseudoHtml = makePseudoHtml(preparedString);
    return pseudoHtml;
}
function appendEmmet(emmetString, container) {
    var elements = emmetToHTML(emmetString);
    elements.forEach(function (el) {
        container.appendChild(el);
    });
}

    return stringToPseudoHTML(str);
}

