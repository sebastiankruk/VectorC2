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

  Blockly.Blocks['vector_select_photo'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("pick a photo")
          .appendField(new Blockly.FieldImage(VectorPhotos.getDefault(), 100, 100, "photo", VectorPhotos.selectPhoto));
       // .appendField(new Blockly.FieldTextInput(""), "image-id")
       // .appendField(new Blockly.FieldTextInput(""), "image-label");
      this.appendValueInput('image-id')
      this.appendValueInput('image-label');
      this.setOutput(true, "VectorC2Photo");
      this.setColour(230);
   this.setTooltip("Enables to pick photo from Vector C2 gallery");
   this.setHelpUrl("");
    }
  };  


}());