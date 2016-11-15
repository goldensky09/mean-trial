//finding if a given number is a prime number or not

function getPrimeFinder() {

    var cache = {};

    function isPrime(n) {
        window.console.log("processing for : " + n);
        if (n < 3) return true;
        for (var i = 2; i <= n / 2; i++)
            if (n % i === 0) return false;
        return true;
    }

    return function(n) {
        if (typeof cache[n] === "undefined")
            cache[n] = isPrime(n);
        return cache[n];
    };
}
