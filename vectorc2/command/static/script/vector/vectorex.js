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
    sayText: _sayText
  }
})();

$( document ).ready(Vectorex.init)