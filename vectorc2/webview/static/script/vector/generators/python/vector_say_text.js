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
Blockly.Python.vector_say_text_simple = function(block) {
  let variable_robot_var = Blockly.Python.variableDB_
                                  .getName(VectorUtils.getFieldValue(block, 'robot_var', 'robot'), 
                                           Blockly.Variables.NAME_TYPE);
  let value_text = Blockly.Python.valueToCode(block, 'text', Blockly.Python.ORDER_ATOMIC);

  let code = `${variable_robot_var}.say_text(${value_text})\n`;
  return code;
};
Blockly.Python.vector_say_text = function(block) {
  let variable_robot_var = Blockly.Python.variableDB_
                                  .getName(block.getFieldValue('robot_var'), 
                                           Blockly.Variables.NAME_TYPE);
  let value_text = Blockly.Python.valueToCode(block, 'text', Blockly.Python.ORDER_ATOMIC);
  let checkbox_use_vector_voice = GeneratorUtils.getPythonBooleanValue(block, 'use_vector_voice');
  let number_duration_scalar = block.getFieldValue('duration_scalar');

  let code = `${variable_robot_var}.say_text(${value_text}, ${checkbox_use_vector_voice}, ${number_duration_scalar})\n`;
  return code;
};