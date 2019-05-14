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
/**
 * Generator of the JavaScript code for the first block: vector_say_text
 */
Blockly.JavaScript.vector_say_text = function(block) {
  let variable_robot_var = VectorUtils.getRobotVar(block);

  let value_text = Blockly.JavaScript.valueToCode(block, 'text', Blockly.JavaScript.ORDER_ATOMIC);
  let param_speed = VectorUtils.getNumberFieldAsParam(block, 'SPEED_VAR');
  let param_voice = VectorUtils.getBoolFieldAsParam(block, 'VOICE_VAR',  (param_speed !== '') ? 'TRUE' : null);

  let code = `${variable_robot_var}.sayText(${value_text}${param_voice}${param_speed});\n`;

  return code;
};