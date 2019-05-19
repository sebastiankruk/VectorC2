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
/* jshint esversion: 6 */
Blockly.JavaScript.play_animation = function(block) {
  let variable_robot_var = VectorUtils.getRobotVar(block);

  let value_text = Blockly.JavaScript.valueToCode(block, 'animation', Blockly.JavaScript.ORDER_ATOMIC);
  let trigger = (block.getFieldValue('animation_type') === 'animation_trigger') ? 'Trigger' : '';
  // let param_speed = VectorUtils.getNumberFieldAsParam(block, 'SPEED_VAR');
  // let param_voice = VectorUtils.getBoolFieldAsParam(block, 'VOICE_VAR',  (param_speed !== '') ? 'TRUE' : null);

  let code = `${variable_robot_var}.playAnimation${trigger}(${value_text});\n`;

  return code;
};
Blockly.JavaScript.find_animation = function(block) {
  let variable_robot_var = VectorUtils.getRobotVar(block);

  let query_tags = Blockly.JavaScript.valueToCode(block, 'query_tags', Blockly.JavaScript.ORDER_ATOMIC);
  let is_trigger = (block.getFieldValue('search_source') === 'animation_trigger');
  let dropdown_search_type = block.getFieldValue('search_type');

  let code = `${variable_robot_var}.findAnimation(${query_tags}, ${dropdown_search_type}, ${is_trigger});\n`;

  return [code, Blockly.Python.ORDER_NONE];
};