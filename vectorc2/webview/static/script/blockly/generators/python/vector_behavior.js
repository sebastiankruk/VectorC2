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
  var checkbox_should_play_anim = GeneratorUtils.getPythonBooleanValue(block, 'should_play_anim');
  var number_num_retries = block.getFieldValue('num_retries');
  var code = `${variable_robot_var}.behavior.drive_straight(${value_distance}, ${value_speed}, ${checkbox_should_play_anim}, ${number_num_retries})\n`;
  return code;
};

Blockly.Python['vector_behavior_turn_in_place'] = function(block) {
  var variable_robot_var = Blockly.Python.variableDB_.getName(block.getFieldValue('robot_var'), Blockly.Variables.NAME_TYPE);
  var value_angle = Blockly.Python.valueToCode(block, 'angle', Blockly.Python.ORDER_ATOMIC);
  var value_speed = GeneratorUtils.getNamedValueOrNothing(block, Blockly.Python, 'speed');
  var value_accel = GeneratorUtils.getNamedValueOrNothing(block, Blockly.Python, 'accel');
  var value_angle_tolerance = GeneratorUtils.getNamedValueOrNothing(block, Blockly.Python, 'angle_tolerance');
  var checkbox_is_absolute = GeneratorUtils.getPythonBooleanValue(block, 'is_absolute');
  var number_num_retries = block.getFieldValue('num_retries');
  
  // var code = `${variable_robot_var}.behavior.turn_in_place(${value_angle}${value_speed}${value_accel}${value_angle_tolerance}, ${checkbox_is_absolute}, ${number_num_retries});\n`;
  var code = `${variable_robot_var}.behavior.turn_in_place(${value_angle}${value_speed}${value_accel}${value_angle_tolerance});\n`;

  return code;
};

Blockly.Python['vector_set_eye_color'] = function(block) {
  var variable_robot_var = Blockly.Python.variableDB_.getName(block.getFieldValue('robot_var'), Blockly.Variables.NAME_TYPE);
  var value_color_rgb = Blockly.Python.valueToCode(block, 'color_rgb', Blockly.Python.ORDER_ATOMIC);
  var code = `${variable_robot_var}.behavior.set_eye_color(**rgb_to_hs(${value_color_rgb}))\n`;
  return code;
};

Blockly.Python['vector_set_eye_color_hue_saturation'] = function(block) {
  var variable_robot_var = Blockly.Python.variableDB_.getName(block.getFieldValue('robot_var'), Blockly.Variables.NAME_TYPE);
  var angle_hue = block.getFieldValue('hue');
  var number_saturation = block.getFieldValue('saturation');
  var code = `${variable_robot_var}.behavior.set_eye_color(hue=${angle_hue/360}, saturation=${number_saturation})\n`;
  return code;
};

Blockly.Python['vector_dock_with_cube'] = function(block) {
  var variable_robot_var = Blockly.Python.variableDB_.getName(block.getFieldValue('robot_var'), Blockly.Variables.NAME_TYPE);
  var code = `${variable_robot_var}.behavior.dock_with_cube(target_object=con${variable_robot_var}.world.connected_light_cube)\n`;
  return code;
};

Blockly.Python['vector_set_head_angle'] = function(block) {
  var variable_robot_var = Blockly.Python.variableDB_.getName(block.getFieldValue('robot_var'), Blockly.Variables.NAME_TYPE);
  var value_angle = Blockly.Python.valueToCode(block, 'angle', Blockly.Python.ORDER_ATOMIC);
  var code = `${variable_robot_var}.behavior.set_head_angle(${value_angle})\n`;
  return code;
};

Blockly.Python['vector_set_lift_height'] = function(block) {
  var variable_robot_var = Blockly.Python.variableDB_.getName(block.getFieldValue('robot_var'), Blockly.Variables.NAME_TYPE);
  var value_height = Blockly.Python.valueToCode(block, 'height', Blockly.Python.ORDER_ATOMIC);
  var code = `${variable_robot_var}.behavior.set_lift_height(${value_height})\n`;
  return code;
};
