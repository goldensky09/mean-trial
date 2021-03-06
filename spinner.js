//spinner closure excercise.
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
    'use strict';
    var count = 0;

    function increment() {
        return ++count;
    }

    function decrement() {
        return --count;
    }
    return {
        up: increment,
        down: decrement
    };
}
var spinner = getSpinner();

function Spinner (){
    var count = 0;
    this.up = function() {
        return ++count;
    }
    this.down = function() {
        return --count();
    }
}
