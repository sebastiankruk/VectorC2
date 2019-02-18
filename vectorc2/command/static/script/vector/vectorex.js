/**
 * 
 * @author sebastian@kruk.me
 */
'use strict';

/**
 * Class simulating Vector API in JavaScript for the purpose of running blockly algorithm tests in JavaScript 
 */
const Vectorex = (function(){

  var __serial;

  /**
   * Initializes Vectorex
   */
  function __init__(serial) {
    //TODO any initialization that might be required in the future
    __serial = serial;

    LogPanel.logText(`Running Vector with serial number = ${__serial}`);
  }

  // -----------------------------------

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
   * The API
   */
  return {
    init: __init__,
    sayText: _sayText,
    behavior: {
      driveOffCharger: _driveOffCharger,
      driveOnCharger: _driveOnCharger,
      driveStraight: _driveStraight,
      turnInPlace: _turnInPlace
    }
  }
})();

$( document ).ready(Vectorex.init)