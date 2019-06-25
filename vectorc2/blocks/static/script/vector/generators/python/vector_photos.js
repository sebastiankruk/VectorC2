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
Blockly.Python['vector_set_screen_image'] = function(block) {
  var value_image_ref = Blockly.Python.valueToCode(block, 'image_ref', Blockly.Python.ORDER_ATOMIC);
  var number_duration_sec = block.getFieldValue('duration_sec');
  var checkbox_interrupt_running = block.getFieldValue('interrupt_running') == 'TRUE';
  // TODO: Assemble Python into code variable.
  var code = '...\n';
  return code;
};

Blockly.Python['vector_select_photo'] = function(block) {
  // TODO: Assemble Python into code variable.
  var code = '...';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};