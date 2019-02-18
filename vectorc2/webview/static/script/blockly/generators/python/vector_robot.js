Blockly.Python['vector_robot'] = function(block) {
  var variable_robot_var = Blockly.Python.variableDB_.getName(block.getFieldValue('robot_var'), Blockly.Variables.NAME_TYPE);
  var value_serial_var = Blockly.Python.valueToCode(block, 'serial_var', Blockly.Python.ORDER_ATOMIC);
  var statements_wrapped_code = Blockly.Python.statementToCode(block, 'wrapped_code');

  var code = `import anki_vector\nwith anki_vector.Robot(${value_serial_var}) as ${variable_robot_var}:\n${statements_wrapped_code}`;
  return code;
};