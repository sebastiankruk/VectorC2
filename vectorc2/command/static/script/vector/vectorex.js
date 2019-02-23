/**
 * 
 * @author sebastian@kruk.me
 */
'use strict';

/**
 * Class simulating Vector API in JavaScript for the purpose of running blockly algorithm tests in JavaScript 
 */
const Vectorex = (function(){

  /**
   * Serial number for "fake" Vector calls
   */
  var __serial;
  /**
   * Delays execution by given number of milliseconds
   * @param {Number} ms 
   */  
  const __wait = ms => new Promise((r, j)=>setTimeout(r, ms))

  /**
   * Initializes Vectorex
   */
  function __init__(serial) {
    __serial = serial;

    if (serial) {
      LogPanel.logText(`Running Vector with serial number = ${__serial}`);
    } else {
      LogPanel.logText('Running Vector');
    }
  }

  // ------------------------------------------------------------------------------------------------
  // Implementation of fake Vector API
  // ------------------------------------------------------------------------------------------------

  /**
   * Wait given number of seconds
   * @param {Number} seconds 
   */
  function _wait(seconds) {
    var prom = __wait(2000)  // prom, is a promise
    var showdone = ()=>LogPanel.logText(`Should have waited ${seconds}s`)
    prom.then(showdone)
  } 

  function _driveOffCharger() {
    LogPanel.logText('Vector drives off charger');
  }
  function _driveOnCharger() {
    LogPanel.logText('Vector drives on charger');
  }
  function _driveStraight(distance, speed, should_play_anim, num_retries) {
    LogPanel.logText(`Vector drives ${distance} at ${speed}. (Plays animation: ${should_play_anim}. Retries: ${num_retries})`);
  }
  function _turnInPlace(angle, speed, accel, angle_tolerance, is_absolute, num_retries) {
    LogPanel.logText(`Vector rotates ${angle} at speed ${speed} with acceleration ${accel}, at tolerance ${angle_tolerance}. Angle is absolute: ${is_absolute}. Retries:  ${num_retries}`)  
  }
  function _setEyeColor(color) {
    LogPanel.logTextWithStyle(`Vector eyes color set to ${color}`, `color: ${color}`);
  }
  function _setEyeColorHS(hue, saturation) {
    LogPanel.logText(`Vector eyes color set with hue=${hue} and saturation=${saturation}`);
  }
  function _dockWithCube() {
    LogPanel.logText(`Vector will dock with cube`);
  }
  function _setHeadAngle(angle) {
    LogPanel.logText(`Vector will set head angle to ${angle}`);
  }
  function _setLiftHeight(height) {
    LogPanel.logText(`Vector will lift to ${height}`);
  }

  /**
   * Implementation of the anki_vector.robot.say_text(text, use_vector_voice=True, duration_scalar=1.0)
   */
  function _sayText(text, use_vector_voice/*=True*/, duration_scalar/*=1.0*/) {
    if (use_vector_voice === false) {
      LogPanel.logError(text);
    } else {
      LogPanel.logText(text);
    }
  }

  // -----------------------------------

  /**
   * The fake  API
   */
  return {
    init: __init__,
    sayText: _sayText,
    wait: _wait,
    behavior: {
      driveOffCharger: _driveOffCharger,
      driveOnCharger: _driveOnCharger,
      driveStraight: _driveStraight,
      turnInPlace: _turnInPlace,
      setEyeColor: _setEyeColor,
      setEyeColorHS: _setEyeColorHS,
      dockWithCube: _dockWithCube,
      setHeadAngle: _setHeadAngle,
      setLiftHeight: _setLiftHeight
    },
    const: {
      MIN_HEAD_ANGLE: -22.0,
      MAX_HEAD_ANGLE: 45.0,
      MAX_LIFT_HEIGHT: 1.0,
      MIN_LIFT_HEIGHT: 0.0
    }
  }
})();
