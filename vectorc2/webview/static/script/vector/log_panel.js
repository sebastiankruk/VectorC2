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
 * Wrapper class for log panel view in the Vector C2 web view.
 */
const LogPanel = (function(){

  /**
   * The main, multiline log text element. Complete log shown here.
   */
  var __panel;
  /**
   * Single line of log (last log entry) shown here
   */
  var __title;

  /**
   * Handles mouse event on clicking the log panel expand button.
   * Expands the log panel. With CSS rules it will show __panel instead of __title.
   * @param {MouseEvent} event 
   */
  function __expandPanel(event) {
    $('body').addClass('panel-expanded');
    VectorC2.resizeArea(event);
  }
  /**
   * Handles mouse event on clicking the log panel collapse button.
   * Collapses the log panel. With CSS rules it will show __title instead of __panel.
   * @param {MouseEvent} event 
   */
  function __collapsePanel(event) {
    $('body').removeClass('panel-expanded');
    VectorC2.resizeArea(event);
  }
  /**
   * Handles mouse event on clicking the log panel clear button.
   * Clears both __panel and __title content
   * @param {MouseEvent} event 
   */
  function _clear(event) {
    __panel.empty()
    __title.empty()
  }

  // ---------------------------------------------------------------------------

  /**
   * Adds given text as a regular text to the log. 
   * Extends __panel with new entry. 
   * Replaces __title with given text.
   * Also logs the text to the console.
   * @param {String} text 
   */
  function _logText(text) {
    let stext = $.trim(text);
    if (stext.length > 0) {
      __panel.append(document.createTextNode(text+'\n'));
      __title.html(document.createTextNode(VectorUtils.getFirstLine(text)));
      console.log(text);
    }
  }

  /**
   * Adds given text as a error text to the log (formatted as <strong> and colored in red with CSS)
   * Extends __panel with new entry. 
   * Replaces __title with given text.
   * Also logs the text to the console as error.
   * @param {String} error 
   */
  function _logError(error) {
    let serror = $.trim(error);
    if (serror.length > 0) {
      __panel.append($('<strong>').append(document.createTextNode(error+'\n')));
      __title.html($('<strong>').append(document.createTextNode(VectorUtils.getFirstLine(error))));
      console.error(error);
    }
  }

  /**
   * Adds given text as a regular text (styled with the given CSS style entry) to the log. 
   * Extends __panel with new entry. 
   * Replaces __title with given text.
   * Also logs the text to the console.
   * @param {String} error 
   */
  function _logTextWithStyle(text, style) {
    let stext = $.trim(text);
    if (stext.length > 0) {
      let htext = `<strong style='${style}'>`+text+'</strong>\n';
      __panel.append(htext);
      __title.html(htext);
      console.log(text);
    }
  }

  // ---------------------------------------------------------------------------


  /**
   * Initilizes LogPanel by registring click handlers.
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
      logError: _logError,
      logTextWithStyle: _logTextWithStyle
  }

})();

$( document ).ready(LogPanel.init)