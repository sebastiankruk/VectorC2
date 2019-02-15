/**
 * 
 * @author sebastian@kruk.me
 */

'use strict';

/**
 * Main class for managing UI for Vector Remote Control
 */
const LogPanel = (function(){

  var __panel;
  var __title;

  function __expandPanel(event) {
    $('body').addClass('panel-expanded');
    VectorC2.resizeArea(event);
  }

  function __collapsePanel(event) {
    $('body').removeClass('panel-expanded');
    VectorC2.resizeArea(event);
  }

  // ---------------------------------------------------------------------------

  function _clear(event) {
    __panel.empty()
    __title.empty()
  }

  function _logText(text) {
    let stext = $.trim(text);
    if (stext.length > 0) {
      __panel.append(text+'\n');
      __title.text(text);
      console.log(text);
    }
  }

  /**
   * 
   * @param {String} error 
   */
  function _logError(error) {
    let serror = $.trim(error);
    if (serror.length > 0) {
      let herror = '<strong>'+error+'</strong>';
      __panel.append(herror);
      __title.html(herror);
      console.error(error);
    }
  }


  // ---------------------------------------------------------------------------


  /**
   * 
   * @param {*} event 
   */
  function __init__(event) {
    __panel = $('.panel pre.panel-body code');
    __title = $('.panel pre.panel-title code');
    $('.panel .clickable.panel-collapsed').mouseup(__expandPanel);
    $('.panel .clickable.panel-expanded').mouseup(__collapsePanel);
    $('.panel .clickable.panel-clear').mouseup(_clear);
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