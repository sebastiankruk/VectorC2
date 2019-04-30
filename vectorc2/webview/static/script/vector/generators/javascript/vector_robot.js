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
Blockly.JavaScript.vector_robot = function(block) {
  let variable_robot_var = VectorUtils.getRobotVar(block);
  let value_serial_var = Blockly.JavaScript.valueToCode(block, 'SERIAL_VAR', Blockly.JavaScript.ORDER_ATOMIC);
  let statements_wrapped_code = Blockly.JavaScript.statementToCode(block, 'wrapped_code');

  let code = `${variable_robot_var} = Vectorex;\n${variable_robot_var}.init(${value_serial_var});\n${statements_wrapped_code}\n`;
  return code;
};