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
Blockly.Python['vector_robot'] = function(block) {
  var variable_robot_var = Blockly.Python.variableDB_.getName(block.getFieldValue('robot_var'), Blockly.Variables.NAME_TYPE);
  var value_serial_var = Blockly.Python.valueToCode(block, 'serial_var', Blockly.Python.ORDER_ATOMIC);
  var statements_wrapped_code = Blockly.Python.statementToCode(block, 'wrapped_code');

  var code = `import time\nimport anki_vector\nfrom anki_vector.util import degrees, distance_mm, speed_mmps\nwith anki_vector.Robot(${value_serial_var}) as ${variable_robot_var}:\n${statements_wrapped_code}`;
  return code;
};