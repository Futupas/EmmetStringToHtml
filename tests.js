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
];

function TEST(funcToTest) {
    for (const test of tests) {
        console.log(test);
        let result = funcToTest(test);
        console.log(result);
    }
}
