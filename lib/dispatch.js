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

;(function(window, document, undefined) {

  var events = {};

  function observe ( action ) {
    events[action] = {};
    document.observe(action, function ( event ) {
      var x;
      for ( x in events[action] )
        if ( event.findElement(x) )
          return events[action][x]( event );
    });
  }

  function stop ( action ) {
    document.stopObserving( action );
    delete events[action];
  }

  function add ( action, lookFor, doStuff ) {
    if ( ! events[action] )
      observe( action );
    events[action][lookFor] = doStuff;    
  }

  function remove ( action, lookFor ) {
    delete events[action][lookFor];
    if ( Object.keys( events[action] ).length < 1 )
      stop( action );
  }

  // Prototype convenience methods
  Element.addMethods({
    dispatch: function ( elem, action, selector, hollaGf3 ) {
      var lookFor;
      elem = $( elem )
      lookFor = '#' + elem.identify();

      if ( Object.isFunction( selector ) )
        hollaGf3 = selector, selector = null;
      else
        lookFor += ' ' + selector;

      add( action, lookFor, hollaGf3 );

      return elem;
    },

    kill: function ( elem, action, selector ) {
      var lookFor;
      elem = $( elem )
      lookFor = '#' + elem.identify();

      if ( selector )
        lookFor += ' ' + selector;

      remove( action, lookFor );

      return elem;
    }
  });

})(window, document);

