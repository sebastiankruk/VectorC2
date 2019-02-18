Blockly.Python['vector_say_text'] = function(block) {
  var variable_robot_var = Blockly.Python.variableDB_.getName(block.getFieldValue('robot_var'), Blockly.Variables.NAME_TYPE);
  var value_text = Blockly.Python.valueToCode(block, 'text', Blockly.Python.ORDER_ATOMIC);
  var checkbox_use_vector_voice = (block.getFieldValue('use_vector_voice') == 'TRUE') ? 'True' : 'False';
  var number_duration_scalar = block.getFieldValue('duration_scalar');
  // TODO: Assemble Python into code variable.

  var code = `import anki_vector\nwith anki_vector.Robot() as robot:\n\trobot.say_text(${value_text}, ${checkbox_use_vector_voice}, ${number_duration_scalar})`
  // var code = `import anki_vector\nwith anki_vector.Robot() as robot:\n\trobot.say_text(${value_text})`
  return code;
};