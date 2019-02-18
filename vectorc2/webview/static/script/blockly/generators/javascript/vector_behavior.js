Blockly.JavaScript['vector_behavior_drive_off_charger'] = function(block) {
  var variable_robot_var = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('robot_var'), Blockly.Variables.NAME_TYPE);
  var code = `${variable_robot_var}.behavior.driveOffCharger();\n`;
  return code;
};

Blockly.JavaScript['vector_behavior_drive_on_charger'] = function(block) {
  var variable_robot_var = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('robot_var'), Blockly.Variables.NAME_TYPE);
  var code = `${variable_robot_var}.behavior.driveOnCharger();\n`;
  return code;
};

Blockly.JavaScript['vector_behavior_drive_straight'] = function(block) {
  var variable_robot_var = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('robot_var'), Blockly.Variables.NAME_TYPE);
  var value_distance = Blockly.JavaScript.valueToCode(block, 'distance', Blockly.JavaScript.ORDER_ATOMIC);
  var value_speed = Blockly.JavaScript.valueToCode(block, 'speed', Blockly.JavaScript.ORDER_ATOMIC);
  var checkbox_should_play_anim = block.getFieldValue('should_play_anim') == 'TRUE';
  var number_num_retries = block.getFieldValue('num_retries');
  var code = `${variable_robot_var}.behavior.driveStraight(${value_distance}, ${value_speed}, ${checkbox_should_play_anim}, ${number_num_retries});\n`;
  return code;
};