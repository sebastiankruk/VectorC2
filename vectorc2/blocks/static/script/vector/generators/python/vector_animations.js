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
Blockly.Python.vector_play_animation = function(block) {
  let variable_robot_var = VectorUtils.getRobotVar(block);

  let value_text = Blockly.Python.valueToCode(block, 'animation', Blockly.Python.ORDER_ATOMIC);
  let is_trigger = block.getFieldValue('animation_type') === 'consts.animation.TRIGGER';
  let trigger = (is_trigger) ? '_trigger' : '';

  let param_loop = VectorUtils.getNumberFieldAsParam(block, 'LOOP_ANIMATION_VAR', 1);
  let param_body = VectorUtils.getBoolFieldAsPythonParam(block, 'IGNORE_BODY_TRACK_VAR',  'FALSE');
  let param_head = VectorUtils.getBoolFieldAsPythonParam(block, 'IGNORE_HEAD_TRACK_VAR',  'FALSE');
  let param_lift = VectorUtils.getBoolFieldAsPythonParam(block, 'IGNORE_LIFT_TRACK_VAR',  'FALSE');
  let param_safe_lift = (is_trigger) ? VectorUtils.getBoolFieldAsPythonParam(block, 'USE_LIFT_SAFE_VAR', 'TRUE') : '';

  let code = `${variable_robot_var}.anim.play_animation${trigger}(${value_text}${param_loop}${param_body}${param_head}${param_lift}${param_safe_lift})\n`;
  return code;
};

Blockly.Python.vector_find_animation = function(block) {
  let variable_robot_var = VectorUtils.getRobotVar(block);

  let query_tags = Blockly.Python.valueToCode(block, 'query_tags', Blockly.Python.ORDER_ATOMIC);
  let is_trigger = (block.getFieldValue('search_source') === 'consts.animation.TRIGGER') ? 'True' : 'False';
  let dropdown_search_type = block.getFieldValue('search_type');

  let code = `find_animation(${query_tags}, ${dropdown_search_type}, ${is_trigger})`;
  return [code, Blockly.Python.ORDER_NONE];
};
