//spinner closure excercise
var spinner = {};
(function (s) {
    'use strict';
    var count = 0;
    s.up = function () {
        return ++count;
    };
    s.down = function () {
        return --count;
    };
}(spinner));

function getSpinner() {
    var count = 0;
    function increment () {
        return ++count;
    }
    function decrement () {
        return --count;
    }
    return {
        up: increment,
        down: decrement
    }
}
var spinner = getSpinner();
