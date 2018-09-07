(function(win) {
    'use strict';
    
    var listeners = [], 
    doc = win.document, 
    MutationObserver = win.MutationObserver || win.WebKitMutationObserver,
    observer;
    
    function ready(selector, fn) {
        // Store the selector and callback to be monitored
        listeners.push({
            selector: selector,
            fn: fn
        });
        if (!observer) {
            // Watch for changes in the document
            observer = new MutationObserver(check);
            observer.observe(doc.documentElement, {
                childList: true,
                subtree: true
            });
        }
        // Check if the element is currently in the DOM
        check();
    }
        
    function check() {
        // Check the DOM for elements matching a stored selector
        for (var i = 0, len = listeners.length, listener, elements; i < len; i++) {
            listener = listeners[i];
            // Query for elements matching the specified selector
            elements = doc.querySelectorAll(listener.selector);
            for (var j = 0, jLen = elements.length, element; j < jLen; j++) {
                element = elements[j];
                // Make sure the callback isn't invoked with the 
                // same element more than once
                if (!element.ready) {
                    element.ready = true;
                    // Invoke the callback with the element
                    listener.fn.call(element, element);
                }
            }
        }
    }

    // Expose `ready`
    win.ready = ready;
            
})(this);





!function() {
  var emitter = {
    emit: console.dir.bind(console)
  }

  function emit(mutation) {
    var target = mutation.target
    var name = mutation.attributeName
    var value = target.getAttribute(name)

    emitter.emit({
      mutation: mutation,
      target: target,
      name: name,
      value: value,
      state: value != null
    })
  }

  var observer = new MutationObserver(function(mutations) {
    mutations.forEach(emit)
  });

  observer.observe(document.body, {
    subtree: true,
    attributes: true
  });
}();

var targetNodes         = $(".myclass");
var MutationObserver    = window.MutationObserver || window.WebKitMutationObserver;
var myObserver          = new MutationObserver (mutationHandler);
var obsConfig           = { childList: true, characterData: true, attributes: true, subtree: true };

//--- Add a target node to the observer. Can only add one node at a time.
targetNodes.each ( function () {
    myObserver.observe (this, obsConfig);
} );

function mutationHandler (mutationRecords) {
    console.info ("mutationHandler:");

    mutationRecords.forEach ( function (mutation) {
        console.log (mutation.type);
        if (typeof mutation.removedNodes == "object") {
            var jq = $(mutation.removedNodes);
            console.log (jq);
            console.log (jq.is("span.myclass2"));
            console.log (jq.find("span") );
        }
    } );
}

/**************************************
    jsFiddle only
*/
$("button").click ( function () {
    var target   = $("#payload");
    if (/censored/i.test (target.text () ) ) {
        target.html ('<span class="myclass2">My <span class="boldly">vastly</span> improved</span> text.');
    }
    else {
        target.html ('[censored!]');
    }
} );
