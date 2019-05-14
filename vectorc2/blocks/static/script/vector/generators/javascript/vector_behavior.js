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
  let variable_robot_var = VectorUtils.getRobotVar(block);
  let code = `${variable_robot_var}.behavior.driveOffCharger();\n`;
  return code;
};

Blockly.JavaScript['vector_behavior_drive_on_charger'] = function(block) {
  let variable_robot_var = VectorUtils.getRobotVar(block);
  let code = `${variable_robot_var}.behavior.driveOnCharger();\n`;
  return code;
};

Blockly.JavaScript['vector_dock_with_cube'] = function(block) {
  let variable_robot_var = VectorUtils.getRobotVar(block);
  let code = `${variable_robot_var}.behavior.dockWithCube();\n`;
  return code;
};

Blockly.JavaScript['vector_set_eye_color'] = function(block) {
  let variable_robot_var = VectorUtils.getRobotVar(block);
  let value_color_rgb = Blockly.JavaScript.valueToCode(block, 'color_rgb', Blockly.JavaScript.ORDER_ATOMIC);
  let code = `${variable_robot_var}.behavior.setEyeColor(${value_color_rgb});\n`;
  return code;
};

Blockly.JavaScript['vector_behavior_drive_straight'] = function(block) {
  let variable_robot_var = VectorUtils.getRobotVar(block);
  let value_distance = Blockly.JavaScript.valueToCode(block, 'distance', Blockly.JavaScript.ORDER_ATOMIC);

  let param_retries = VectorUtils.getNumberFieldAsParam(block, 'NUM_RETRIES_VAR');
  let param_anim = VectorUtils.getBoolFieldAsParam(block, 'SHOULD_PLAY_ANIM_VAR', (param_retries !== '') ? 'TRUE': null);
  let param_speed = VectorUtils.getNumberBlockAsParam(block, 'SPEED_VAR', Blockly.JavaScript, (param_retries !== '' || param_anim !== '') ? '1': null);
  
  let code = `${variable_robot_var}.behavior.driveStraight(${value_distance}${param_speed}${param_anim}${param_retries});\n`;
  return code;
};

Blockly.JavaScript['vector_behavior_turn_in_place'] = function(block) {
  let variable_robot_var = VectorUtils.getRobotVar(block);
  let value_angle = Blockly.JavaScript.valueToCode(block, 'angle', Blockly.JavaScript.ORDER_ATOMIC);

  let param_retries = VectorUtils.getNumberFieldAsParam(block, 'NUM_RETRIES_VAR');
  let param_absolute =  VectorUtils.getBoolFieldAsParam(block, 'IS_ABSOLUTE_VAR', (param_retries !== '') ? 'FALSE': null);
  let param_tolerance = VectorUtils.getNumberBlockAsParam(block, 'ANGLE_TOLERANCE_VAR', Blockly.JavaScript, (param_retries !== '' || param_absolute !== '') ? '1': null);
  let param_accel = VectorUtils.getNumberBlockAsParam(block, 'ACCEL_VAR', Blockly.JavaScript, (param_retries !== '' || param_absolute !== '' || param_tolerance !== '') ? '1': null);
  let param_speed = VectorUtils.getNumberBlockAsParam(block, 'SPEED_VAR', Blockly.JavaScript, (param_retries !== '' || param_absolute !== '' || param_tolerance !== '' || param_accel !== '') ? '10': null);

  let code = `${variable_robot_var}.behavior.turnInPlace(${value_angle}${param_speed}${param_accel}${param_tolerance}${param_absolute}${param_retries});\n`;
  return code;
};

Blockly.JavaScript['vector_set_eye_color_hue_saturation'] = function(block) {
  let variable_robot_var = VectorUtils.getRobotVar(block);
  let angle_hue = block.getFieldValue('hue');
  let number_saturation = block.getFieldValue('saturation');
  let code = `${variable_robot_var}.behavior.setEyeColorHS(${angle_hue/360}, ${number_saturation});\n`;
  return code;
};

Blockly.JavaScript['vector_set_head_angle'] = function(block) {
  let variable_robot_var = VectorUtils.getRobotVar(block);
  let value_angle = Blockly.JavaScript.valueToCode(block, 'angle', Blockly.JavaScript.ORDER_ATOMIC);
  let code = `${variable_robot_var}.behavior.setHeadAngle(${value_angle});\n`;
  return code;
};

Blockly.JavaScript['vector_set_lift_height'] = function(block) {
  let variable_robot_var = VectorUtils.getRobotVar(block);
  let value_height = Blockly.JavaScript.valueToCode(block, 'height', Blockly.JavaScript.ORDER_ATOMIC);
  let code = `${variable_robot_var}.behavior.setLiftHeight(${value_height});\n`;
  return code;
};
