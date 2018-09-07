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
