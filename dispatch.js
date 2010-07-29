/*
Copyright (c) 2010 diago

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
 */
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
