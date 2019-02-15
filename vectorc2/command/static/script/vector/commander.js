/**
 * 
 * @author sebastian@kruk.me
 */
'use strict';

/**
 * Main class handling commands being sent from VectorC2 WebUI to Python ... and logging back.
 */
const Commander = (function(){

  var _vectorSocket;

  function _runPython(code, _callback) {
    // console.log(code);

    _vectorSocket.sendMessage(code);

    _callback('finished');
  }

  /**
   * Run user block in JavaScript.
   * For quick and dirty test purposes
   */
  function _runJavaScript(code, _callback) {
    Blockly.JavaScript.INFINITE_LOOP_TRAP = '  checkTimeout();\n';
    var timeouts = 0;
    var checkTimeout = function() {
      if (timeouts++ > 1000000) {
        throw MSG['timeout'];
        _callback('timeout');
      }
    };
    Blockly.JavaScript.INFINITE_LOOP_TRAP = null;

    try {
      eval(code);
    } catch (e) {
      LogPanel.logError(MSG['badCode'].replace('%1', e));
    }
    _callback('finished');
  };


  /**
   * 
   */
  function __init__() {
    _vectorSocket = VectorSocket('c2');
  }

  // ---------------------------------------------------------------------------

  return {
      init: __init__,
      run: {
        'js': _runJavaScript,
        'py': _runPython
      }
  }

})();

$( document ).ready(Commander.init)