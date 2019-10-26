/**
 *  Copyright 2019 Sebastian Ryszard Kruk <vectorc2@kruk.me>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 *
 * @author vectorc2@kruk.me
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

  /**
   * Sends given code over to Server to execute against Vector API. 
   * Once the code is done executing _callback function is called.
   * @param {String} code 
   * @param {Function} _callback 
   */
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
        throw gettext('Maximum execution iterations exceeded.');
        _callback('timeout');
      }
    };
    Blockly.JavaScript.INFINITE_LOOP_TRAP = null;

    try {
      eval(code);
    } catch (e) {
      let msg = gettext('Program error:\n%(error)s'); 
      LogPanel.logError(interpolate(msg, {error: e}, true));
    }
    _callback('finished');
  };


  /**
   * Initializes Commander by starting WebSocket 
   */
  function __init__() {
    _vectorSocket = VectorSocket('c2', Commander);
  }

  /**
   * Called by the server
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