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
