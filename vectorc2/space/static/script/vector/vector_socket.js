/**
 * 
 * @author sebastian@kruk.me
 */
'use strict';

/**
 * Main class for managing UI for Vector Remote Control
 */
const VectorSocket = function(spaceName, commander){

  /**
   * Reference to chat socket
   */
  var __chatSocket;
  /**
   * Space name to be remembered and reused in the future if necessary
   */
  var __spaceName;

  // ---------------------------------------------------------------------------

  /**
   * Handling WebSocket messages when their arive
   * @param {WebSocket Message}  
   */
  async function __onMessage(e) {
    var data = JSON.parse(e.data);
    var message = data['message'];
    var type = data['type'];
    if (type == 'error') {
      LogPanel.logError(message);
    } else if (type == 'command') {
      Commander.onCommand(message);
    } else {
      LogPanel.logText(message);
    }
    
  };

  /**
   * In case socket is closed, log this even and restart the socket.
   */
  async function __onClose(e) {
    console.log('Chat socket closed unexpectedly. Restarting connection.');
    await __init__(spaceName); //TODO CHECK ???
  };

  // ---------------------------------------------------------------------------

  /**
   * Send given message over WebSocket channel
   * @param {String} message 
   */
  async function _sendMessage(message) {
    __chatSocket.send(JSON.stringify({
      'message': message
    }));    
  }

  /**
   * 
   * @param {String} spaceName name of the spaceName to use  
   */
  async function __init__(spaceName) {
    __spaceName = spaceName;
    __chatSocket = new WebSocket('ws://' + window.location.host + '/ws/space/' + spaceName + '/');
    __chatSocket.onmessage = __onMessage;
    __chatSocket.onclose = __onClose;
  }

  // ---------------------------------------------------------------------------

  __init__(spaceName);

  return {
      sendMessage: _sendMessage
  }

};