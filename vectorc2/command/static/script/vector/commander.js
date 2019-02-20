/**
 * 
 * @author sebastian@kruk.me
 */
'use strict';

/**
 * Main class handling commands being sent from VectorC2 WebUI to Python ... and logging back.
 */
const Commander = (function(){

  /**
   * Reference to VectorSocket object
   */
  var _vectorSocket;

  /**
   * Temporary reference to the callback method
   */
  var __onCommandCallback = null;

  function _runPython(code, _callback) {
    _vectorSocket.sendMessage(code);
    __onCommandCallback = _callback;
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

  /**
   * Called by the 
   * @param {String} message 
   */
  function _onCommand(message) {
    if (__onCommandCallback !== null) {
      __onCommandCallback(message);
      __onCommandCallback = null;
    }
  }
  // ---------------------------------------------------------------------------

  return {
      init: __init__,
      onCommand: _onCommand,
      run: {
        'js': _runJavaScript,
        'py': _runPython
      }
  }

})();

$( document ).ready(Commander.init)