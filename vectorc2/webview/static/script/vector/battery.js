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
 * Main class for managing UI for Vector Remote Control
 */
const VectorBattery = (function(){

  var __battery;

  var __state;

  /**
   * Initializes the UI component
   */
  function __init__() {
    $('[data-toggle="tooltip"]').tooltip();
    __battery = $('ul.navbar-nav li.nav-item a.i-battery');
    __state = 'unknown'
  }

  /**
   * Shows given battery state
   * @param {String} state 
   */
  function _setState(state) {
    if ( ['charging', 'empty', 'full', 'half', 'low', 'unknown'].includes(state) ){
      __battery.removeClass(`battery-${__state}`).addClass(`battery-${state}`);
      __state = state;
    }
  }

  return {
    init: __init__,
    setState: _setState
  }
})()

$( document ).ready(VectorBattery.init)
