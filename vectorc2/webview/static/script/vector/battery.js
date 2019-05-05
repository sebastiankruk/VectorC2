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

  /**
   * Reference to the battery HTML wrapper element
   */
  var __battery;
  /**
   * Name of the current state
   */
  var __state;
  /**
   * Handle for the last executed setInterval
   */
  var __stateCheckerInterval;
  /**
   * Detailed data with the state
   */
  var __stateData;

  /**
   * Initializes the UI component
   */
  function __init__() {
    __state = 'unknown';
    __stateData = {};
    __battery = $('ul.navbar-nav li.nav-item a.i-battery');
    __battery.tooltip({ 
      boundary: 'window',
      delay: { 
        "show": 100, 
        "hide": 500 
      } 
    });

    __battery.mouseup(__logState);

    VectorStatus.init(__onStateChecked);

    // TODO #25 _startStateChecking();
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

  /**
   * Call to check the current Vector state
   */
  async function _checkState() {
    VectorStatus.readStatus();
  }

  /**
   * Logs detailed information from Vector sate
   */
  function __logState() {
    //TODO i18n
    let log = `<h3>Vector state:</h3>\n` +
    `<b>are_motors_moving</b>: ${__stateData.current.are_motors_moving}\n` + 
    `<b>are_wheels_moving</b>: ${__stateData.current.are_wheels_moving}\n` + 
    `<b>is_animating</b>: ${__stateData.current.is_animating}\n` + 
    `<b>is_being_held</b>: ${__stateData.current.is_being_held}\n` + 
    `<b>is_button_pressed</b>: ${__stateData.current.is_button_pressed}\n` + 
    `<b>is_carrying_block</b>: ${__stateData.current.is_carrying_block}\n` + 
    `<b>is_charging</b>: ${__stateData.current.is_charging}\n` + 
    `<b>is_cliff_detected</b>: ${__stateData.current.is_cliff_detected}\n` + 
    `<b>is_docking_to_marker</b>: ${__stateData.current.is_docking_to_marker}\n` + 
    `<b>is_falling</b>: ${__stateData.current.is_falling}\n` + 
    `<b>is_head_in_pos</b>: ${__stateData.current.is_head_in_pos}\n` + 
    `<b>is_in_calm_power_mode</b>: ${__stateData.current.is_in_calm_power_mode}\n` + 
    `<b>is_on_charger</b>: ${__stateData.current.is_on_charger}\n` + 
    `<b>is_pathing</b>: ${__stateData.current.is_pathing}\n` + 
    `<b>is_picked_up</b>: ${__stateData.current.is_picked_up}\n` + 
    `<b>is_robot_moving</b>: ${__stateData.current.is_robot_moving}\n` + 
    `<b>head_angle_rad</b>: ${__stateData.robot.head_angle_rad}\n` +
    `<b>lift_height_mm</b>: ${__stateData.robot.lift_height_mm}\n` +
    `<b>pose_angle_rad</b>: ${__stateData.robot.pose_angle_rad}\n` +
    `<b>pose_pitch_rad</b>: ${__stateData.robot.pose_pitch_rad}\n` +
    `<b>right_wheel_speed_mmps</b>: ${__stateData.robot.right_wheel_speed_mmps}\n` +
    `<b>x_y_z</b>: ${__stateData.robot.x_y_z}\n` +
    `<b>battery_volts</b>: ${__stateData.battery.battery_volts}\n` + 
    `<b>battery_level</b>: ${__stateData.battery.battery_level}\n` + 
    `<b>is_charging</b>: ${__stateData.battery.is_charging}\n` + 
    `<b>is_on_charger_platform</b>: ${__stateData.battery.is_on_charger_platform}\n` + 
    `<b>suggested_charger_sec</b>: ${__stateData.battery.suggested_charger_sec}\n` + 
    `<b>network</b>: ${__stateData.network}\n` +
    `<b>os_version</b>: ${__stateData.version.os_version}\n` +
    `<b>engine_build_id</b>: ${__stateData.version.engine_build_id}\n`;

    LogPanel.logText(log);
  }

  /**
   * Function called as VectorStatus.onMessage callback
   * @param {StateObject} data 
   */
  function __onStateChecked(data) {
    __stateData = data;
    console.log(data);

    let state = 'unknown';
    try {
      if (data.battery.is_charging) {
        state = 'charging'
      } else {
        switch (data.battery.battery_level) {
          case 3: state = 'full'; break;
          case 2: state = 'half'; break;
          case 1: state = 'low'; break;
          default:
            state = 'empty'
        }
      }
      _setState(state);
      __battery.attr('data-original-title', __generateTooltip(data));
    } catch (e) {
      console.warn('Could not retrieve Vector state');
    }
  }

  /**
   * Generates status tooltip based on status data
   * @param {StatusObject} data 
   */
  function __generateTooltip(data) {
    let tooltip = '<div class="container">' +
        '<h4>Battery:</h4>'+
        `<div class='row'><b class='col-md-8'>Level:</b><span class='col-md-4'>${data.battery.battery_level}</span></div>` +
        `<div class='row'><b class='col-md-8'>Volts:</b><span class='col-md-4'>${data.battery.battery_volts.toFixed(2)}</span></div>` +
        `<div class='row'><b class='col-md-8'>Charging:</b><span class='col-md-4'>${data.battery.is_charging}</span></div>` +
        `<div class='row'><b class='col-md-8'>Chargein:</b><span class='col-md-4'>${data.battery.suggested_charger_sec}s</span></div>` +
    '</div>';

    return tooltip;
  }

  /**
   * Start checking state at given frequency in ms.
   * Will close previous state checking interval if present
   * @param {Number} frequency in ms
   */
  function _startStateChecking(frequency) {
    if ( !$.isEmptyObject(__stateCheckerInterval) ) {
      _stopStateChecking()
    } else {
      setTimeout(_checkState, 500);
    }

    let _freq = frequency || 60000;
    __stateCheckerInterval = setInterval(_checkState, _freq);
    console.info(`Starting periodical Vector state checking at frequency every ${_freq/1000}s`)
  }

  /**
   * Stops state checking
   */
  function _stopStateChecking() {
    console.info("Will stop checking for Vector state");
    clearInterval(__stateCheckerInterval);
  }

  return {
    init: __init__,
    setState: _setState,
    checkState: _checkState,
    startStateChecking: _startStateChecking,
    stopStateChecking: _stopStateChecking
  }
})()

$( document ).ready(VectorBattery.init)
