/**
 * 
 * @author sebastian@kruk.me
 */

'use strict';

const SessionStorage = (function(){

  return (function(){

    try {
        return window.sessionStorage;
    } catch(e) {}
    return null;

  })() || {

    setItem: function(){},
    getItem: function(){ return null },
    removeItem: function(){},
    clear: function(){},
    key: function(){},
    length: function(){ return 0; }
  };

})();

const REDUCE_TO_MAP = function(prev,curr){prev[curr[0]]=curr[1];return prev;};


/**
 * Main class for managing UI for Vector Remote Control
 */
const VectorC2 = (function(){

  // ---------------------------------------------------------------------------
  //                                  constants 
  // ---------------------------------------------------------------------------
  /**
   * List of tab names.
   * @private
   */
  const __VIEWS = ['blocks', 'javascript', 'python', 'xml'];

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

  // ---------------------------------------------------------------------------
  //                                  variables 
  // ---------------------------------------------------------------------------

  /**
   * Main workspace object
   * @type {Blockly.WorkspaceSvg}
   */
  var __workspace = null;
  /**
   * 
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
  //                                  private methods 
  // ---------------------------------------------------------------------------

  /**
   * Initializing all necessary stuff to have VectorRC run
   */
  function __init__() {
    // initialize key element references
    $.each(__elements, function (index, value) {
        __elements[index] = $('#'+index)[0];
    });

    __sourceCode = $('#sourceCode .content .source')
                    .map(function(){ return [[this.id.replace(/source_/, ''), 
                                              this]] })
                    .get()
                    .reduce(REDUCE_TO_MAP,{});
    
    // hook actions
    $('#languageMenu').change(__beforeLanguageChange);
    $('.dropdown.a-options-sourcecode .dropdown-item').mouseup(__onSourceCodeSelectionChange);
    $(window).resize(__onAreaResize);
    

    // initilize blockly
    __workspace =  Blockly.inject(__elements.blocklyDiv,
                                  $.extend(__BLOCKLY_CONFIG, {
                                    toolbox: __elements.toolbox
                                  }));        
    
    Blockly.JavaScript.addReservedWords('code,timeouts,checkTimeout');
    
    __onAreaResize();
    prettyPrint();
  }

  /**
   * Called when source code shown is being changed
   * @param {*} event 
   */
  function __onSourceCodeSelectionChange(event) {
    var options = $('.dropdown.a-options-sourcecode');
    options.removeClass('a-option-selected-'+__selectedView);
    __selectedView = $(this).attr('class').replace(/dropdown-item.a-option-(\w+)\b.*/, '$1')
    options.addClass('a-option-selected-'+__selectedView);

    __updateSourceCode();
  }

  /**
   * 
   * @param {Event} event 
   */
  function __beforeLanguageChange(event) {
      var xml = Blockly.Xml.workspaceToDom(__workspace);
      var text = Blockly.Xml.domToText(xml);
      SessionStorage.setItem('loadOnceBlocks', text);
  }

  /**
   * Event handler called when the window resizes
   * @param {*} e 
   */
  function __onAreaResize(e) {
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

  // ------------------------------------------------------------------

  /**
   * Updates source code of 
   */
  function __updateSourceCode() {
    // if('xml' === __selectedView) {
    //   var xmlText = __sourceCode.xml.value;
    //   var xmlDom = null;
    //   try {
    //     xmlDom = Blockly.Xml.textToDom(xmlText);
    //   } catch (e) {
    //     alert(MSG['badXml'].replace('%1', e));
    //   }
    //   if (xmlDom) {
    //     __workspace.clear();
    //     Blockly.Xml.domToWorkspace(xmlDom, __workspace);
    //   }
    // }
    __renderContent();
    Blockly.svgResize(__workspace);
  };

  /**
   * Populate the currently selected pane with content generated from the blocks.
   */
  function __renderContent() {
    switch(__selectedView) {
      case 'xml':
        var xmlDom = Blockly.Xml.workspaceToDom(__workspace);
        var xmlText = Blockly.Xml.domToPrettyText(xmlDom);
        __sourceCode.xml.value = xmlText;
        __sourceCode.xml.focus();
        break;
      case 'python':
        __generateCode(Blockly.Python, 'py');
        break;
      case 'javascript':
      default:
        __generateCode(Blockly.JavaScript, 'js');
        break;
    }
  };


  /**
   * Attempt to generate the code and display it in the UI, pretty printed.
   * @param generator {!Blockly.Generator} The generator to use.
   * @param prettyPrintType {string} The file type key for the pretty printer.
   */
  function __generateCode(generator, prettyPrintType) {
    var content = __sourceCode[__selectedView];
    content.textContent = '';
    if (__checkFunctionsAvailable(generator)) {
      var code = generator.workspaceToCode(__workspace);

      content.textContent = code;
      if (typeof PR.prettyPrintOne == 'function') {
        code = content.textContent;
        code = PR.prettyPrintOne(code, prettyPrintType);
        content.innerHTML = code;
      }
    }
  };

  /**
   * Check whether all blocks in use have generator functions.
   * @param generator {!Blockly.Generator} The generator to use.
   */
  function __checkFunctionsAvailable(generator) {
    var blocks = __workspace.getAllBlocks(false);
    var missingBlockGenerators = [];
    for (var i = 0; i < blocks.length; i++) {
      var blockType = blocks[i].type;
      if (!generator[blockType]) {
        if (missingBlockGenerators.indexOf(blockType) === -1) {
          missingBlockGenerators.push(blockType);
        }
      }
    }

    var valid = missingBlockGenerators.length == 0;
    if (!valid) {
      var msg = 'The generator code for the following blocks not specified for '
          + generator.name_ + ':\n - ' + missingBlockGenerators.join('\n - ');
      Blockly.alert(msg);  // Assuming synchronous. No callback.
    }
    return valid;
  };


  // ---------------------------------------------------------------------------

  return {
      init: __init__
  }

})();

$( document ).ready(VectorC2.init)