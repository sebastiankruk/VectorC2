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
 * Main class for Vector configuration UI and model
 */
const VectorConfiguration = (function(){
  'use strict';

  /**
   * References to the configuration modal element
   */
  let __configModal;
  /**
   * References to the status interval slider element
   */
  let __statusIntervalSlider;

  /**
   * The actual value how often should we check the status
   */
  let __statusInterval;

  /**
   * Initializes the UI component
   */
  function __init__() {
    __configModal = $('#configModal');
    __statusIntervalSlider = $('#statusCheckInterval');

    $('#configModal .modal-footer button.btn-primary').mouseup(__onConfigSave);
    // TODO #25 _startStateChecking();
  }

  /**
   * Logs detailed information from Vector sate
   */
  function __onConfigSave(e) {
    __configModal.modal('hide');
    __statusInterval = __statusIntervalSlider.slider('getValue');

    if (__statusInterval) {
      VectorBattery.startStateChecking(1000*__statusInterval);
    } else {
      VectorBattery.stopStateChecking();
    }
  }

  /**
   * Returns current status checking interval
   */
  function _getStatusInterval() {
    return __statusInterval;
  }

  return {
    init: __init__,
    getStatusInterval: _getStatusInterval
  }
})()

$( document ).ready(VectorConfiguration.init)
