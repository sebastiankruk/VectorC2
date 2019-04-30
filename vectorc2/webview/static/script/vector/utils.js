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
   * @param {*} block 
   */
  function _getRobotVar(block) {
    return Blockly.JavaScript.variableDB_.getName(_getFieldText(block, 'ROBOT_VAR', 'robot'), 
                                                  Blockly.Variables.NAME_TYPE)
  }

  return {
    getFieldValue: _getFieldValue,
    getFieldText: _getFieldText,
    getRobotVar: _getRobotVar
  };

})();
