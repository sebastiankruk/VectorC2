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
 * Class for getting Vector status over WebSocket channel
 */
const VectorStatus = (function(commander){

  /**
   * Reference to chat socket
   */
  var __chatSocket;

  /**
   * Reference to the callback method (if provided), defaults to console.log
   */
  var __onMessageCallback = console.log;

  // ---------------------------------------------------------------------------

  /**
   * Handling WebSocket messages when their arive
   * @param {WebSocket Message}  
   */
  async function __onMessage(e) {
    var statusData = JSON.parse(e.data);
    if (__onMessageCallback) {
      __onMessageCallback(statusData);
    }
  };

  /**
   * In case socket is closed, log this even and restart the socket.
   */
  async function __onClose(e) {
    console.log('Status communication socket closed unexpectedly. Restarting connection.');
    await __init__(); //TODO CHECK ???
  };

  // ---------------------------------------------------------------------------

  /**
   * Send given message over WebSocket channel
   * @param {String} message 
   * @param {int} checking frequency in seconds
   */
  async function _readStatus(statuses, frequency=60) {
    if ( [WebSocket.CLOSED, WebSocket.CLOSING].includes(__chatSocket.readyState) ) {
      await __onClose();
    } else if ( __chatSocket.readyState === WebSocket.CONNECTING ) {
      console.warn('Delaying _readStatus by 100ms until WebSocket is ready');
      setTimeout(_readStatus, 100, statuses, frequency);
    } else {
      __chatSocket.send(JSON.stringify({
        'statuses': statuses,
        'frequency': frequency
      }));    
    }
  }

  /**
   * Initializes this communication channel
   */
  function __init__(callback) {
    __chatSocket = new WebSocket('ws://' + window.location.host + '/ws/vector/state/');
    __chatSocket.onmessage = __onMessage;
    __chatSocket.onclose = __onClose;

    if($.isFunction(callback)) {
      __onMessageCallback = callback
    }
  }

  return {
      init: __init__,
      readStatus: _readStatus
  }

})();