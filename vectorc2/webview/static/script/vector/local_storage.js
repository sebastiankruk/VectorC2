/**
 * 
 * @author sebastian@kruk.me
 */
'use strict';

/**
 * Wrapper class for window.localStorage
 * When window.localStorage is not available a fake object is used to avoid exceptions thrown
 */
const LocalStorage = (function(){

  return (function(){

    try {
        return window.localStorage;
    } catch(e) {}
    return null;

  })() || {

    setItem: function(){},
    getItem: function(){ return null },
    removeItem: function(){},
    clear: function(){},
    key: function(){},
    length: function(){ return 0; }
  };

})();
