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
