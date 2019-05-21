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
Blockly.JavaScript.vector_play_animation = function(block) {
  let variable_robot_var = VectorUtils.getRobotVar(block);
  
  let value_text = Blockly.JavaScript.valueToCode(block, 'animation', Blockly.JavaScript.ORDER_ATOMIC);
  let is_trigger = block.getFieldValue('animation_type') === 'consts.animation.TRIGGER';
  let trigger = (is_trigger) ? 'Trigger' : '';

  let param_loop = VectorUtils.getNumberFieldAsParam(block, 'LOOP_ANIMATION_VAR', 1);
  let param_body = VectorUtils.getBoolFieldAsParam(block, 'IGNORE_BODY_TRACK_VAR',  'FALSE');
  let param_head = VectorUtils.getBoolFieldAsParam(block, 'IGNORE_HEAD_TRACK_VAR',  'FALSE');
  let param_lift = VectorUtils.getBoolFieldAsParam(block, 'IGNORE_LIFT_TRACK_VAR',  'FALSE');
  let param_safe_lift = (is_trigger) ? VectorUtils.getBoolFieldAsParam(block, 'USE_LIFT_SAFE_VAR', 'TRUE') : '';

  let code = `${variable_robot_var}.anim.playAnimation${trigger}(${value_text}${param_loop}${param_body}${param_head}${param_lift}${param_safe_lift});\n`;

  return code;
};
Blockly.JavaScript.vector_find_animation = function(block) {
  let variable_robot_var = VectorUtils.getRobotVar(block);

  let query_tags = Blockly.JavaScript.valueToCode(block, 'query_tags', Blockly.JavaScript.ORDER_ATOMIC);
  let is_trigger = (block.parentBlock_ && block.parentBlock_.getFieldValue('animation_type') === 'consts.animation.TRIGGER');
  let dropdown_search_type = block.getFieldValue('search_type');

  let code = `${variable_robot_var}.anim.findAnimation(${query_tags}, ${dropdown_search_type}, ${is_trigger})`;

  return [code, Blockly.Python.ORDER_NONE];
};