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

  VectorMutator.init('vector_play_animation_ex', {
    /*
      {
        "type": "field_number",
        "name": "loop_animation",
        "value": 0,
        "min": 1,
        "max": 10,
        "precision": 1
      },
      {
        "type": "input_dummy",
        "align": "RIGHT"
      },
      {
        "type": "input_dummy"
      },
      {
        "type": "field_checkbox",
        "name": "ignore_body_track",
        "checked": false
      },
      {
        "type": "input_dummy",
        "align": "RIGHT"
      },
      {
        "type": "field_checkbox",
        "name": "ignore_head_track",
        "checked": false
      },
      {
        "type": "input_dummy",
        "align": "RIGHT"
      },
      {
        "type": "field_checkbox",
        "name": "ignore_lift_track",
        "checked": false
      },
      {
        "type": "input_dummy",
        "align": "RIGHT"
      },
      {
        "type": "field_checkbox",
        "name": "use_lift_safe",
        "checked": true
      }
      */
    loop_animation: {
      align: Blockly.ALIGN_RIGHT,
      blockFieldFunction: () => new Blockly.FieldNumber(1, 1, 10, 1)
    },
    ignore_body_track: {
      align: Blockly.ALIGN_RIGHT,
      blockFieldFunction: () => new Blockly.FieldCheckbox("FALSE")
    },
    ignore_head_track: {
      align: Blockly.ALIGN_RIGHT,
      blockFieldFunction: () => new Blockly.FieldCheckbox("FALSE")
    },
    ignore_lift_track: {
      align: Blockly.ALIGN_RIGHT,
      blockFieldFunction: () => new Blockly.FieldCheckbox("FALSE")
    },
    use_lift_safe: {
      align: Blockly.ALIGN_RIGHT,
      blockFieldFunction: () => new Blockly.FieldCheckbox("TRUE")
    }
  });

  
}());