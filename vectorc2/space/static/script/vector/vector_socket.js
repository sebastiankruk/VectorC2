/**
 * 
 * @author sebastian@kruk.me
 */
'use strict';

/**
 * Main class for managing UI for Vector Remote Control
 */
const VectorSocket = function(spaceName){

  /**
   * 
   */
  var __chatSocket;

  // ---------------------------------------------------------------------------

  function __onMessage(e) {
    var data = JSON.parse(e.data);
    var message = data['message'];
    LogPanel.logText(message);
  };

  function __onClose(e) {
    LogPanel.logError('Chat socket closed unexpectedly');
  };

  // ---------------------------------------------------------------------------

  function _sendMessage(message) {
    __chatSocket.send(JSON.stringify({
      'message': message
    }));    
  }

  // /**
  //  * 
  //  * @param {String} spaceName name of the spaceName to use  
  //  */
  // function __init__(spaceName) {
  __chatSocket = new WebSocket('ws://' + window.location.host + '/ws/space/' + spaceName + '/');
  __chatSocket.onmessage = __onMessage;
  __chatSocket.onclose = __onClose;
  // }

  // ---------------------------------------------------------------------------

  return {
      sendMessage: _sendMessage
  }

};