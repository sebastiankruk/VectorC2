'use strict';

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
