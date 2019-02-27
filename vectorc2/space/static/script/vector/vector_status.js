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

  // ---------------------------------------------------------------------------

  /**
   * Handling WebSocket messages when their arive
   * @param {WebSocket Message}  
   */
  async function __onMessage(e) {
    var statusData = JSON.parse(e.data);
    console.log(statusData);
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
   */
  async function _readStatus(statuses) {
    __chatSocket.send(JSON.stringify({
      'statuses': statuses
    }));    
  }

  /**
   * Initializes this communication channel
   */
  function __init__() {
    __chatSocket = new WebSocket('ws://' + window.location.host + '/ws/vector/state/');
    __chatSocket.onmessage = __onMessage;
    __chatSocket.onclose = __onClose;
  }

  return {
      init: __init__,
      readStatus: _readStatus
  }

})();