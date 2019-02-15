/**
 * 
 * @author sebastian@kruk.me
 */

'use strict';

/**
 * Main class for managing UI for Vector Remote Control
 */
const LogPanel = (function(){

  function __expandPanel(event) {
    $('body').addClass('panel-expanded');
    VectorC2.resizeArea(event);
  }

  function __collapsePanel(event) {
    $('body').removeClass('panel-expanded');
    VectorC2.resizeArea(event);
  }

  // ---------------------------------------------------------------------------

  function _clear() {
    //TODO
  }

  function _logText(text) {
    //TODO
    console.log(text);
  }

  /**
   * 
   * @param {String} error 
   */
  function _logError(error) {
    console.error(error);
  }


  // ---------------------------------------------------------------------------


  /**
   * 
   * @param {*} event 
   */
  function __init__(event) {
    $('.panel .clickable.panel-collapsed').mouseup(__expandPanel);
    $('.panel .clickable.panel-expanded').mouseup(__collapsePanel);
  }

  // ---------------------------------------------------------------------------

  return {
      init: __init__,
      clear: _clear,
      logText: _logText,
      logError: _logError
  }

})();

$( document ).ready(LogPanel.init)