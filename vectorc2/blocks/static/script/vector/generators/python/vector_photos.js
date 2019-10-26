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
Blockly.Python.vector_photos_count = function(block) {
  let variable_robot_var = VectorUtils.getRobotVar(block);
  let code = `len(${variable_robot_var}.photos.photo_info)`;

  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python.vector_show_photo = function(block) {
  let window_name = VectorUtils.getFieldText(block, 'WINDOW_NAME_VAR', '_blank');
  let photo_id = Blockly.Python.valueToCode(block, 'photo_id', Blockly.JavaScript.ORDER_ATOMIC);
  let code = `show_photo(${photo_id}, '${window_name}');\n`;

  return code;
};

Blockly.Python.vector_photo_list = function(block) {
  let variable_robot_var = VectorUtils.getRobotVar(block);
  let code = `${variable_robot_var}.photos.photo_info`;

  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python.vector_get_photo_id = function(block) {
  let photo_info = Blockly.Python.valueToCode(block, 'photo_info', Blockly.JavaScript.ORDER_ATOMIC);

  let code = `${photo_info}.photo_id`;
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python.vector_get_photo_timestamp = function(block) {
  let photo_info = Blockly.Python.valueToCode(block, 'photo_info', Blockly.JavaScript.ORDER_ATOMIC);

  let code = `${photo_info}.timestamp_utc`;
  return [code, Blockly.Python.ORDER_NONE];
};