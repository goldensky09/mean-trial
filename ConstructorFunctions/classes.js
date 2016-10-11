/*
    Constructor Function (syntax wise there is no difference between a regular function and a constructor function)
    1. are invoked using "new" keyword
    2. this -> a new object (not the invocation context)
    3. the default return value is -> this. (default return value of a function is undefined)
    4. created object has a property constructor using which it maintains the reference to the function using which it was created
*/

function Employee(id, name, salary) {
    'use strict';
    this.id = id;
    this.name = name;
    this.salary = salary;
}
