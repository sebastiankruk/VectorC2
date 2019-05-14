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
Blockly.Python.vector_robot = function(block) {
  let variable_robot_var = VectorUtils.getRobotVar(block);
  let value_serial = Blockly.Python.valueToCode(block, 'SERIAL_VAR', Blockly.Python.ORDER_ATOMIC);
  let value_name = Blockly.Python.valueToCode(block, 'NAME_VAR', Blockly.Python.ORDER_ATOMIC);
  let statements_wrapped_code = Blockly.Python.statementToCode(block, 'wrapped_code');

  let value_serial_var = (value_serial !== '') ? `serial=${value_serial}` : '';
  let value_name_var = (value_name !== '') ? `${(value_serial !== '') ? ', ': ''}name=${value_name}` : '';

  let code = `import time\nimport anki_vector\nfrom anki_vector.util import degrees, distance_mm, speed_mmps\nwith anki_vector.Robot(${value_serial_var}${value_name_var}) as ${variable_robot_var}:\n${statements_wrapped_code}`;
  return code;
};