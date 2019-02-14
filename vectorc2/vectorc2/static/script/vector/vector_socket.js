/**
 * 
 * @author sebastian@kruk.me
 */
'use strict';

/**
 * Main class for managing UI for Vector Remote Control
 */
const VectorSocket = function(channel){

  /**
   * 
   */
  let __chatSocket;

  // ---------------------------------------------------------------------------

  function __onMessage(e) {
    var data = JSON.parse(e.data);
    var message = data['message'];
    LogPanel.addText(message);
  };

  function __onClose(e) {
    console.error('Chat socket closed unexpectedly');
  };

  // ---------------------------------------------------------------------------

  function _sendMessage(message) {
    __chatSocket.send(JSON.stringify({
      'message': message
    }));    
  }

  // /**
  //  * 
  //  * @param {String} channel name of the channel to use  
  //  */
  // function __init__(channel) {
  __chatSocket = new WebSocket('ws://' + window.location.host + '/ws/channel/' + channel + '/');
  __chatSocket.onmessage = __onMessage;
  __chatSocket.onclose = __onClose;
  // }

  // ---------------------------------------------------------------------------

  return {
      sendMessage: _sendMessage
  }

};