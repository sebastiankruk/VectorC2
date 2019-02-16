Blockly.Python['vector_say_text'] = function(block) {
  var variable_robot_var = Blockly.Python.variableDB_.getName(block.getFieldValue('robot_var'), Blockly.Variables.NAME_TYPE);
  var value_text = Blockly.Python.valueToCode(block, 'text', Blockly.Python.ORDER_ATOMIC);
  var checkbox_use_vector_voice = block.getFieldValue('use_vector_voice') == 'TRUE';
  var number_duration_scalar = block.getFieldValue('duration_scalar');
  // TODO: Assemble Python into code variable.
  var code = '...\n';
  return code;
};