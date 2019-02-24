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

const GeneratorUtils = (function(){

  /**
   * 
   * @param {Blockly block} block 
   * @param {Blockly.Python} generator 
   * @param {String} variable_name 
   * @param {String} param_name 
   * @param {Order} order 
   */
  function _getNamedValueOrNothing(block, generator, variable_name, param_name, order/*=null*/) {
    let value = generator.valueToCode(block, variable_name, order || generator.ORDER_ATOMIC);
    
    if (value) {
      let parameter_name = param_name || variable_name;
      return (generator === Blockly.Python) ? `, ${parameter_name}=${value}` : `, ${value}`;
    }
    return ''
  }

  /**
   * Return correct 'True' or 'False' as expected by Python.
   * @param {Block} block 
   * @param {String} variable_name 
   */
  function _getPythonBooleanValue(block, variable_name) {
    return (block.getFieldValue(variable_name) == 'TRUE') ? 'True' : 'False'    
  }


  return {
    getNamedValueOrNothing: _getNamedValueOrNothing,
    getPythonBooleanValue: _getPythonBooleanValue
  }

})();