'use strict';

const tests = [
    'div',
    'div>span',
    'div+span>hello',
    'div>span+hii',
    'div>(span>j+i)+hello>(world+k)',
    'div1>div2>div3>div4^^div5',
    'div1>div2^div3',
    'div1>(div2+div3>div4)^div7',
    'div>(header>ul>li*2>a)+footer>p'
];

function TEST(funcToTest) {
    for (const test of tests) {
        console.log(test);
        let result = funcToTest(test);
        // console.log(result);
        console.log(pseudoHtmlStructureToString(result));
        console.log('');
    }
}

/**
 * 
 * @param {Array<PseudoHTML>} pseudoHtml
 * @returns {string}
 */
function pseudoHtmlStructureToString(pseudoHtml, level) {
    let returnedStr = '';
    if (level === undefined) level = 0;
    for (const element of pseudoHtml) {
        let tabStr = '';
        for (let i = 0; i < level; i-=-1) tabStr += '|  ';
        returnedStr += `${tabStr}+ <${element.tag}> Parent=${element.parent && `<${element.parent.tag}>`}\n`;
        returnedStr += pseudoHtmlStructureToString(element.children, level+1);
    }
    return returnedStr;
}
