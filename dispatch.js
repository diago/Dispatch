var dispatch = {
  events: {},

  observe: function(action){
    this.events[action] = {};
    document.observe(action, function(ev){
      for(var x in dispatch.events[action]){
        if(ev.findElement(x)) return dispatch.events[action][x](ev);
      }
    });
  },

  stop: function(action){
    document.stopObserving(action);
    delete this.events[action];
  },

  add: function(action, lookFor, doStuff){
    if( ! this.events[action]) this.observe(action);
    this.events[action][lookFor] = doStuff;    
  },

  remove: function(action, lookFor){
    delete this.events[action][lookFor];
    if(Object.keys(this.events[action]).length < 1) this.stop(action);
  }

};


Element.addMethods({
  dispatch: function(elem, action, selector, hollaGf3){
    var lookFor = '#'+$(elem).identify();

    if(Object.isFunction(selector)){
      var hollaGf3 = selector;
    } else {
      lookFor = lookFor+' '+selector;
    }

    dispatch.add(action, lookFor, hollaGf3);
    return elem;
  },
  kill: function(elem, action, selector){
    var lookFor = '#'+$(elem).identify();

    if(selector){
      lookFor = lookFor+' '+selector;
    }

    dispatch.remove(action, lookFor);
    return elem;
  }
});


// TESTS
var clickHandler = function(ev, test){ev.stop(); console.log(this); console.log(test);};
$('footer').dispatch('click', clickHandler.bindAsEventListener(this, 'hello'));
