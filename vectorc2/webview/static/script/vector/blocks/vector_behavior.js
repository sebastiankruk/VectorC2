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
(function() {
  'use strict';

  VectorMutator.init('vector_behavior_drive_off_charger_ex');
  VectorMutator.init('vector_behavior_drive_on_charger_ex');
  VectorMutator.init('vector_dock_with_cube_ex');
  VectorMutator.init('vector_set_eye_color_ex');
  VectorMutator.init('vector_behavior_drive_straight_ex', {
/*
    {
      "type": "input_value",
      "name": "speed",
      "check": "Speed",
      "align": "RIGHT"
    },
*/
    speed: {
      blockCreateFunction: (context) =>  context.appendValueInput("SPEED_VAR")
                                                .setCheck("Speed")
                                                .setAlign(Blockly.ALIGN_RIGHT)
                                                .appendField("at speed")     
    },
/*    {
      "type": "field_checkbox",
      "name": "should_play_anim",
      "checked": true
    },
*/
    should_play_anim: {
      align: Blockly.ALIGN_RIGHT,
      isPreLabel: false,
      isPostLabel: true,
      blockFieldFunction: () => new Blockly.FieldCheckbox("TRUE")
    },
/*
    {
      "type": "input_dummy",
      "align": "RIGHT"
    },
    {
      "type": "field_number",
      "name": "num_retries",
      "value": 0,
      "min": 0,
      "max": 10,
      "precision": 1
    }
*/
    num_retries: {
      align: Blockly.ALIGN_RIGHT,
      isPostLabel: true,
      blockFieldFunction: () => new Blockly.FieldNumber(0, 0, 10, 1)
    }
}); //TODO make speed, animation, repeat
  VectorMutator.init('vector_behavior_turn_in_place_ex'); //TODO make speed, acceleration, complete toleration, absolute, repeat
  VectorMutator.init('vector_set_eye_color_hue_saturation_ex'); 
  VectorMutator.init('vector_set_head_angle_ex'); 
  VectorMutator.init('vector_set_lift_height_ex'); 


}());
