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
Blockly.Python.play_animation = function(block) {
  let variable_robot_var = VectorUtils.getRobotVar(block);

  let value_text = Blockly.Python.valueToCode(block, 'animation', Blockly.Python.ORDER_ATOMIC);
  let trigger = (block.getFieldValue('animation_type') === 'trigger') ? '_trigger' : '';
  // let param_speed = VectorUtils.getNumberFieldAsParam(block, 'SPEED_VAR');
  // let param_voice = VectorUtils.getBoolFieldAsPythonParam(block, 'VOICE_VAR', (param_speed !== '') ? 'TRUE' : null);

  let code = `${variable_robot_var}.animation.play_animation${trigger}(${value_text})\n`;
  return code;
};
Blockly.Python.find_animation = function(block) {
  let variable_robot_var = VectorUtils.getRobotVar(block);

  let query_tags = Blockly.Python.valueToCode(block, 'query_tags', Blockly.Python.ORDER_ATOMIC);
  let is_trigger = (block.getFieldValue('search_source') === 'animation_trigger');
  let dropdown_search_type = block.getFieldValue('search_type');

  let code = `find_animation(${query_tags}, ${dropdown_search_type}, ${is_trigger});\n`;
  return [code, Blockly.Python.ORDER_NONE];
};
