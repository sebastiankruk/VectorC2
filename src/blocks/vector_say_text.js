Blockly.JavaScript['vector_say_text'] = function(block) {
  var variable_robot_var = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('robot_var'), Blockly.Variables.NAME_TYPE);
  var value_text = Blockly.JavaScript.valueToCode(block, 'text', Blockly.JavaScript.ORDER_ATOMIC);
  var checkbox_use_vector_voice = block.getFieldValue('use_vector_voice') == 'TRUE';
  var number_duration_scalar = block.getFieldValue('duration_scalar');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};