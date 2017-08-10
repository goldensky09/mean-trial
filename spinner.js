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

input {
    padding:10px 15px;
    -webkit-border-radius: 25px;
  -moz-border-radius: 25px;
border-radius: 25px;
    background: -moz-linear-gradient(top, #f6e6b4 0%, #ed9017 100%); /* firefox */
    border: solid #ccc 3px;
    box-shadow: 0 1px 2px #fff, 0 -1px 1px #666, inset 0 -1px 1px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.8);
    -moz-box-shadow: 0 1px 2px #fff, 0 -1px 1px #666, inset 0 -1px 1px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.8);
    -webkit-box-shadow: 0 1px 2px #fff, 0 -1px 1px #666, inset 0 -1px 1px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.8);
    text-shadow: 0 1px 2px #fff;

background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#f6e6b4), color-stop(100%,#ed9017)); /* webkit */font-size:20px}
