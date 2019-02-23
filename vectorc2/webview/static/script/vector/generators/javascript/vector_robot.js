Blockly.JavaScript['vector_robot'] = function(block) {
  var variable_robot_var = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('robot_var'), Blockly.Variables.NAME_TYPE);
  var value_serial_var = Blockly.JavaScript.valueToCode(block, 'serial_var', Blockly.JavaScript.ORDER_ATOMIC);
  var statements_wrapped_code = Blockly.JavaScript.statementToCode(block, 'wrapped_code');

  var code = `${variable_robot_var} = Vectorex;\n${variable_robot_var}.init(${value_serial_var});\n${statements_wrapped_code}\n`;
  return code;
};