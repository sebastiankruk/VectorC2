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
Blockly.Python['vector_utils_distance_mm'] = function(block) {
  var value_value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_ATOMIC);
  var code = `distance_mm(${value_value})`;
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['vector_utils_speed_mmps'] = function(block) {
  var value_value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_ATOMIC);
  var code = `speed_mmps(${value_value})`;
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['vector_utils_degrees'] = function(block) {
  var value_value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_ATOMIC);
  var code = `degrees(${value_value})`;
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['vector_utils_sleep'] = function(block) {
  var number_sleep_var = block.getFieldValue('sleep_var');
  var code = `time.sleep(${number_sleep_var})\n`;
  return code;
};

Blockly.Python['vector_const_min_head_angle'] = function(block) {
  var code = 'anki_vector.behavior.MIN_HEAD_ANGLE';
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['vector_const_max_head_angle'] = function(block) {
  var code = 'anki_vector.behavior.MAX_HEAD_ANGLE';
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['vector_const_max_lift_height'] = function(block) {
  var code = '1.0';
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['vector_const_min_lift_height'] = function(block) {
  var code = '0.0';
  return [code, Blockly.Python.ORDER_NONE];
};