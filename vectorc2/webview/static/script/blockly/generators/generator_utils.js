/**
 * 
 * @author sebastian@kruk.me
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