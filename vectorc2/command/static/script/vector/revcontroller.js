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
/**
 * Class required to receive communication from the ReverseController
 */
const ReverseController = (function(){
  'use strict';

  /**
   * Reference to VectorSocket object
   */
  var __vectorSocket;


  /**
   * Called by the server to execute given command
   * @param {String} command 
   */
  function _onCommand(command) {
    console.log(JSON.stringify(command));
  }

  /**
   * Initializes Vectorex
   */
  function __init__(serial) {
    __vectorSocket = VectorSocket('revcontrol', ReverseController);
    __vectorSocket.sendMessage({
      init: true
    });
  }

  return {
    init: __init__,
    onCommand: _onCommand
  }

})();

$( document ).ready(ReverseController.init)