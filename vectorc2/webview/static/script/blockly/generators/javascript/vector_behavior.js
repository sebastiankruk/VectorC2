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

Blockly.JavaScript['vector_behavior_turn_in_place'] = function(block) {
  var variable_robot_var = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('robot_var'), Blockly.Variables.NAME_TYPE);
  var value_angle = Blockly.JavaScript.valueToCode(block, 'angle', Blockly.JavaScript.ORDER_ATOMIC);
  var value_speed = GeneratorUtils.getNamedValueOrNothing(block, Blockly.JavaScript, 'speed');
  var value_accel = GeneratorUtils.getNamedValueOrNothing(block, Blockly.JavaScript, 'accel');
  var value_angle_tolerance = GeneratorUtils.getNamedValueOrNothing(block, Blockly.JavaScript, 'angle_tolerance');
  var checkbox_is_absolute = block.getFieldValue('is_absolute') == 'TRUE';
  var number_num_retries = block.getFieldValue('num_retries');
  var code = `${variable_robot_var}.behavior.turnInPlace(${value_angle}${value_speed}${value_accel}${value_angle_tolerance}, ${checkbox_is_absolute}, ${number_num_retries});\n`;
  return code;
};