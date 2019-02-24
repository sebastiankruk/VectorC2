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
Blockly.JavaScript['vector_say_text_simple'] = function(block) {
  var variable_robot_var = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('robot_var'), Blockly.Variables.NAME_TYPE);
  var value_text = Blockly.JavaScript.valueToCode(block, 'text', Blockly.JavaScript.ORDER_ATOMIC);
  var code = `${variable_robot_var}.sayText(${value_text});\n`
  return code;
};

/**
 * Generator of the JavaScript code for the first block: vector_say_text
 */
Blockly.JavaScript['vector_say_text'] = function(block) {
  var variable_robot_var = Blockly.JavaScript.variableDB_
                                  .getName(block.getFieldValue('robot_var'), 
                                           Blockly.Variables.NAME_TYPE);
  var value_text = Blockly.JavaScript.valueToCode(block, 'text', Blockly.JavaScript.ORDER_ATOMIC);
  var checkbox_use_vector_voice = block.getFieldValue('use_vector_voice') == 'TRUE';
  var number_duration_scalar = block.getFieldValue('duration_scalar');

  var code = `${variable_robot_var}.sayText(${value_text}, ${checkbox_use_vector_voice}, ${number_duration_scalar});\n`

  return code;
};