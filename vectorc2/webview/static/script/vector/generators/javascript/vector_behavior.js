/**
 *  Copyright 2019 Sebastian Ryszard Kruk <vectorc2@kruk.me>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 * 
 * @author vectorc2@kruk.me
 */
Blockly.JavaScript['vector_behavior_drive_off_charger'] = function(block) {
  var variable_robot_var = VectorUtils.getRobotVar(block);
  var code = `${variable_robot_var}.behavior.driveOffCharger();\n`;
  return code;
};

Blockly.JavaScript['vector_behavior_drive_on_charger'] = function(block) {
  var variable_robot_var = VectorUtils.getRobotVar(block);
  var code = `${variable_robot_var}.behavior.driveOnCharger();\n`;
  return code;
};

Blockly.JavaScript['vector_dock_with_cube'] = function(block) {
  var variable_robot_var = VectorUtils.getRobotVar(block);
  var code = `${variable_robot_var}.behavior.dockWithCube();\n`;
  return code;
};

Blockly.JavaScript['vector_set_eye_color'] = function(block) {
  var variable_robot_var = VectorUtils.getRobotVar(block);
  var value_color_rgb = Blockly.JavaScript.valueToCode(block, 'color_rgb', Blockly.JavaScript.ORDER_ATOMIC);
  var code = `${variable_robot_var}.behavior.setEyeColor(${value_color_rgb});\n`;
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

Blockly.JavaScript['vector_set_eye_color_hue_saturation'] = function(block) {
  var variable_robot_var = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('robot_var'), Blockly.Variables.NAME_TYPE);
  var angle_hue = block.getFieldValue('hue');
  var number_saturation = block.getFieldValue('saturation');
  var code = `${variable_robot_var}.behavior.setEyeColorHS(${angle_hue/360}, ${number_saturation});\n`;
  return code;
};

Blockly.JavaScript['vector_set_head_angle'] = function(block) {
  var variable_robot_var = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('robot_var'), Blockly.Variables.NAME_TYPE);
  var value_angle = Blockly.JavaScript.valueToCode(block, 'angle', Blockly.JavaScript.ORDER_ATOMIC);
  var code = `${variable_robot_var}.behavior.setHeadAngle(${value_angle});\n`;
  return code;
};

Blockly.JavaScript['vector_set_lift_height'] = function(block) {
  var variable_robot_var = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('robot_var'), Blockly.Variables.NAME_TYPE);
  var value_height = Blockly.JavaScript.valueToCode(block, 'height', Blockly.JavaScript.ORDER_ATOMIC);
  var code = `${variable_robot_var}.behavior.setLiftHeight(${value_height});\n`;
  return code;
};
