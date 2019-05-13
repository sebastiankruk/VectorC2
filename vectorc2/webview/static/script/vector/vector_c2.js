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
const VectorC2 = (function(){

  // ---------------------------------------------------------------------------
  //                                  constants 
  // ---------------------------------------------------------------------------
  /**
   * Default configuration of Blockly used
   */
  const __BLOCKLY_CONFIG = {
    collapse: false,
    grid: {
      spacing: 20,
      length: 1,
      colour: '#777',
      snap: true },
    horizontalLayout: false,
    oneBasedIndex: false,
    scrollbars: false,
    sounds: false,
    trashcan: true,
    maxTrashcanContents: 10,
    zoom: false 
  }

  /**
   * Key used to set/retrieve stuff from local storage
   */
  const __LOCAL_STORAGE_KEY  = 'VectorC2:workspace:current';

  // ---------------------------------------------------------------------------
  //                                  variables 
  // ---------------------------------------------------------------------------

  /**
   * Main workspace object
   * @type {Blockly.WorkspaceSvg}
   */
  var __workspace = null;
  /**
   * Code view selected by default
   */
  var __selectedView = 'javascript';

  /**
   * References to key elements
   */
  var __elements = {
      blocklyArea: null,
      blocklyDiv: null,
      sourceCode: null,
      toolbox: null
  }
  /**
   * Source code elements
   */
  var __sourceCode;

  // ---------------------------------------------------------------------------
  //                           event handler methods 
  // ---------------------------------------------------------------------------


  /**
   * Called when source code shown is being changed
   * @param {*} event 
   */
  function __onSourceCodeSelectionChange(event) {
    var options = $('.dropdown.a-options-sourcecode');
    options.removeClass('a-option-selected-'+__selectedView);
    __selectedView = $(this).attr('class').replace(/dropdown-item.a-option-(\w+)\b.*/, '$1')
    options.addClass('a-option-selected-'+__selectedView);

    __renderContent();
  }

  /**
   * Notified about any changes in the workspace
   * @param {Blockly.Event} event 
   */
  function __onWorkspaceChange(event) {
    if ([Blockly.Events.UI].indexOf(event.type) < 0) {
      __renderContent();
    }
  }  

  /**
   * 
   * @param {Event} event 
   */
  function __beforeUnload(event) {
      var xml = Blockly.Xml.workspaceToDom(__workspace);
      var text = Blockly.Xml.domToText(xml);
      LocalStorage.setItem(__LOCAL_STORAGE_KEY, text);

      console.log(gettext('Current workspace state was saved to local storage'));
  }

  /**
   * Attempts to load workspace from session storage
   * @param {*} event 
   */
  function __afterLoad(event) {
    let workspaceBlocks = LocalStorage.getItem(__LOCAL_STORAGE_KEY);
    if (workspaceBlocks) {
      _updateWorkspaceBlocks(workspaceBlocks);
    } else {
      console.log(gettext('No previously saved workspace was found')); 
    }
  }

  /**
   * Event handler called when the window resizes
   */
  function _onAreaResize(event) {
      // Compute the absolute coordinates and dimensions of blocklyArea.
      var element = __elements.blocklyArea;
      var x = 0;
      var y = 0;
      do {
          x += element.offsetLeft;
          y += element.offsetTop;
          element = element.offsetParent;
      } while (element);
      // Position blocklyDiv over blocklyArea.
      __elements.blocklyDiv.style.left = x + 'px';
      __elements.blocklyDiv.style.top = y + 'px';
      __elements.blocklyDiv.style.width = ( __elements.blocklyArea.offsetWidth - __elements.sourceCode.offsetWidth) + 'px';
      __elements.blocklyDiv.style.height = __elements.blocklyArea.offsetHeight + 'px';
      Blockly.svgResize(__workspace);      
  }

  // ---------------------------------------------------------------------------
  //                              private methods 
  // ---------------------------------------------------------------------------

  /**
   * Initializing all necessary stuff to have VectorRC run
   */
  function __init__() {
    // initialize key element references
    $.each(__elements, function (index, value) {
        __elements[index] = $('#'+index)[0];
    });

    // instead of predefining list of supported laguages - let's read it from HTML 
    __sourceCode = $('#sourceCode .content .source')
                    .map(function(){ return [[this.id.replace(/source_/, ''), this]] })
                    .get()
                    .reduce((p,c)=>{p[c[0]]=c[1]; return p},{});
    
    // hook actions
    $( window ).on('beforeunload', __beforeUnload);
    $('.dropdown.a-options-sourcecode .dropdown-item').mouseup(__onSourceCodeSelectionChange);
    
    // hook button actions
    $('.nav-link.a-button-test').mouseup(_testJavaScript);
    $('.nav-link.a-button-run').mouseup(_runPython);
    $('.nav-link.a-button-cleanup').mouseup(_cleanupWorkspace);

    // initilizes auto-resize
    $(window).resize(_onAreaResize);

    // initilize blockly
    __workspace =  Blockly.inject(__elements.blocklyDiv,
                                  $.extend(__BLOCKLY_CONFIG, {
                                    toolbox: __elements.toolbox
                                  }));        
    __workspace.addChangeListener(__onWorkspaceChange);
    
    Blockly.JavaScript.addReservedWords('code,timeouts,checkTimeout');
    
    __afterLoad();
    _onAreaResize();
  }

  // ------------------------------------------------------------------

  /**
   * Updates blocks definitions from given source
   */
  function _updateWorkspaceBlocks(workspaceBlocks) {
    let xmlDom = null;
    try {
      xmlDom = Blockly.Xml.textToDom(workspaceBlocks);
    } catch (e) {
      let msg = gettext('Error parsing XML:\n%(error)s\n\nSelect "OK" to abandon your changes or "Cancel" to further edit the XML.'); 
      alert(interpolate(msg, {error: e}, true));
    }
    if (xmlDom) {
      __workspace.clear();
      Blockly.Xml.domToWorkspace(xmlDom, __workspace);
    }
    __renderContent();
    Blockly.svgResize(__workspace);
  };

  /**
   * Returns current workspace as XML
   */
  function _getWorkspaceXML() {
    let xmlDom = Blockly.Xml.workspaceToDom(__workspace);
    let xmlText = Blockly.Xml.domToPrettyText(xmlDom);
    return xmlText;
  }

  /**
   * Populate the currently selected pane with content generated from the blocks.
   */
  function __renderContent() {
    $(__sourceCode[__selectedView]).removeClass('prettyprinted')
    switch(__selectedView) {
      case 'xml':
        __sourceCode.xml.textContent = _getWorkspaceXML();
        __pretifyCode(__sourceCode.xml);
        break;
      case 'python':
        __generateCode(Blockly.Python);
        break;
      case 'javascript':
      default:
        __generateCode(Blockly.JavaScript);
        break;
    }
  };


  /**
   * Attempt to generate the code and display it in the UI, pretty printed.
   * @param generator {!Blockly.Generator} The generator to use.
   */
  function __generateCode(generator) {
    let content = __sourceCode[__selectedView];
    content.textContent = '';
    if (__checkFunctionsAvailable(generator)) {
      content.textContent = generator.workspaceToCode(__workspace);
      __pretifyCode(content);
    }
  };

  /**
   * Prettifies code
   * @param {Element} content 
   */
  function __pretifyCode(content) {
    if (typeof PR.prettyPrintOne == 'function' &&
        typeof content.attr == 'function') {
      let code = content.textContent;
      //automatically determine which language to generate
      let lang = content.attr('class').replace(/^.*lang[-](\w+)\b.*$/, '$1');
      code = PR.prettyPrintOne(code, lang, true);
      content.innerHTML = code;
    }
  };

  /**
   * Check whether all blocks in use have generator functions.
   * @param generator {!Blockly.Generator} The generator to use.
   * @todo: review and reimplement
   */
  function __checkFunctionsAvailable(generator) {
    let blocks = __workspace.getAllBlocks(false);
    let missing = $.unique(blocks.filter(block => !generator[block.type]))
    var valid = missing.length == 0;
    if (!valid) {
      let d = {
        generatorName: generator.name_,
        missingJoined: missing.join('\n - ')
      }
      let msg = gettext('The generator code for the following blocks not specified for %(generatorName)s:\n - %(missingJoined)s'); 
      console.log(interpolate(msg, d, true));  
    }
    return valid;
  };

  /**
   * Callback function called by Commander
   * @param {String} state callback information 
   */
  function __commanderCallback(lang, state) {
    var but = null;
    switch(lang) {
      case 'js': but = '.a-button-test'; break;
      case 'py': but = '.a-button-run'; break;
    }

    return function(state) {
      if (but) {
        $(but).parent().removeClass('disabled').addClass('active');
      }
    }
  }


  // ---------------------------------------------------------------------------

  /**
   * Run user block in Python, server-side.
   */
  function _runPython() {
    var code = Blockly.Python.workspaceToCode(__workspace);

    if (code) {
      $('.a-button-run').parent().removeClass('active').addClass('disabled');

      Commander.run['py'](code, __commanderCallback('py'))
    }
  }

  /**
   * Run user block in JavaScript.
   * For quick and dirty test purposes
   */
  function _testJavaScript() {
    var code = Blockly.JavaScript.workspaceToCode(__workspace);

    if (code) {
      $('.a-button-test').parent().removeClass('active').addClass('disabled');

      Commander.run['js'](code, __commanderCallback('js'))
    }
  };

  /**
   * Cleaning up current workspace
   */
  function _cleanupWorkspace() {
    var count = __workspace.getAllBlocks(false).length;
    if (window.confirm(Blockly.Msg['DELETE_ALL_BLOCKS'].replace('%1', count))) {
      __workspace.clear();
      if (window.location.hash) {
        window.location.hash = '';
      }
    }
  };  

  // ---------------------------------------------------------------------------

  return {
      init: __init__,
      testJavaScript: _testJavaScript,
      cleanupWorkspace: _cleanupWorkspace,
      updateWorkspaceBlocks: _updateWorkspaceBlocks,
      getWorkspaceXML: _getWorkspaceXML,
      resizeArea: _onAreaResize
  }

})();

//We need to move that to Blocks.__isInitialized $( document ).ready(VectorC2.init)