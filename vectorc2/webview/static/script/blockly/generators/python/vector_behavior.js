Blockly.Python['vector_behavior_drive_off_charger'] = function(block) {
  var variable_robot_var = Blockly.Python.variableDB_.getName(block.getFieldValue('robot_var'), Blockly.Variables.NAME_TYPE);
  var code = `${variable_robot_var}.behavior.drive_off_charger()\n`;
  return code;
};

Blockly.Python['vector_behavior_drive_on_charger'] = function(block) {
  var variable_robot_var = Blockly.Python.variableDB_.getName(block.getFieldValue('robot_var'), Blockly.Variables.NAME_TYPE);
  var code = `${variable_robot_var}.behavior.drive_on_charger()\n`;
  return code;
};

Blockly.Python['vector_behavior_drive_straight'] = function(block) {
  var variable_robot_var = Blockly.Python.variableDB_.getName(block.getFieldValue('robot_var'), Blockly.Variables.NAME_TYPE);
  var value_distance = Blockly.Python.valueToCode(block, 'distance', Blockly.Python.ORDER_ATOMIC);
  var value_speed = Blockly.Python.valueToCode(block, 'speed', Blockly.Python.ORDER_ATOMIC);
  var checkbox_should_play_anim = (block.getFieldValue('should_play_anim') == 'TRUE') ? 'True' : 'False';
  var number_num_retries = block.getFieldValue('num_retries');
  var code = `${variable_robot_var}.behavior.drive_straight(${value_distance}, ${value_speed}, ${checkbox_should_play_anim}, ${number_num_retries})\n`;
  return code;
};