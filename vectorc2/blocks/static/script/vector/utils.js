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
/*jshint esversion: 8 */

/**
 * Class with utility functions
 */
const VectorUtils = (function(){

  'use strict';

  /**
   * Wrapper function to get variable by name or default value if variable not present
   * @param {*} block 
   * @param {*} varName 
   * @param {*} defaultVal 
   */
  function _getFieldValue(block, varName, defaultVal) {
    return block.getFieldValue(varName) || defaultVal;
  }
  /**
   * Wrapper function to get variable by name or default text if variable not present
   * @param {*} block 
   * @param {*} varName 
   * @param {*} defaultText 
   */
  function _getFieldText(block, varName, defaultText) {
    return ((block.getField(varName) !== null) ? block.getField(varName).getText() : null) || defaultText;
  }
  /**
   * Shortcut for getting robot var
   * @param {Blockly.Block} block 
   */
  function _getRobotVar(block, context=Blockly.JavaScript) {
    return context.variableDB_.getName(_getFieldText(block, 'ROBOT_VAR', 'robot'), 
                                       Blockly.Variables.NAME_TYPE)
  }

  /**
   * Returns true if robot variable is defined
   * @param {Blockly.Block} block 
   */
  function _isRobotVar(block) {
    return block.getField('ROBOT_VAR') !== null
  }

  /**
   * Renders given variable value as a Python boolean parameter or empty string if given variable is not set
   * @param {Blockly.Block} block 
   * @param {String} varName 
   * @param {String} defaultVal 'TRUE' or 'FAlSE'
   */
  function _getBoolFieldAsPythonParam(block, varName, defaultVal=null) {
    let value = _getFieldValue(block, varName, defaultVal);
    return (value !== null) ? `, ${(value === 'TRUE') ? 'True': 'False'}`: '';
  }

  /**
   * Renders given variable value as a JavaScript boolean parameter or empty string if given variable is not set
   * @param {Blockly.Block} block 
   * @param {String} varName 
   * @param {String} defaultVal true or false
   */
  function _getBoolFieldAsParam(block, varName, defaultVal=null) {
    let value = _getFieldValue(block, varName, defaultVal);
    return (value !== null) ? `, ${value === 'TRUE'}`: '';
  }

  /**
   * Renders given variable value as a number parameter or empty string if given variable is not set
   * @param {Blockly.Block} block 
   * @param {String} varName 
   * @param {String} defaultVal 
   */
  function _getNumberFieldAsParam(block, varName, defaultVal=null) {
    let value = _getFieldValue(block, varName, defaultVal);
    return (value !== null) ? `, ${value}` : '';
  }

  /**
   * Renders given variable value as a number parameter or empty string if given variable is not set
   * @param {Blockly.Block} block 
   * @param {String} varName 
   * @param {String} defaultVal 
   */
  function _getNumberBlockAsParam(block, varName, context=Blockly.JavaScript, defaultVal=null) {

    let value = context.valueToCode(block, varName, context.ORDER_ATOMIC) ||
                context.valueToCode(block, `${varName}_DUMMY`, context.ORDER_ATOMIC) || 
                defaultVal;

    return (value !== null) ? `, ${value}` : ''
  }

  /**
   * Returns only first line of the given text
   * @param {String} text Text to be analyzed
   */
  function _getFirstLine(text) {
    return text.trim().split('\n').pop();
  }

  /**
   * Initializes one or more custom Blockly block
   * @param {JSON Object} ...blocks 
   */
  function _initializeBlocks(...blocks) {
    for ( let block of blocks ) { 
      Blockly.Blocks[block.type] = {
        init: function() {
          this.jsonInit(block);
        }
      };
    };
  }  

  return {
    getFieldValue: _getFieldValue,
    getFieldText: _getFieldText,
    getRobotVar: _getRobotVar,
    isRobotVar: _isRobotVar,
    getBoolFieldAsParam: _getBoolFieldAsParam,
    getBoolFieldAsPythonParam: _getBoolFieldAsPythonParam,
    getNumberFieldAsParam: _getNumberFieldAsParam,
    getNumberBlockAsParam: _getNumberBlockAsParam,
    getFirstLine: _getFirstLine,
    initializeBlocks: _initializeBlocks
  };

})();
