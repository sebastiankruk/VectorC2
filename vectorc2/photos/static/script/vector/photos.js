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
/**
 * Main class for Vector C2 photos use
 */
const VectorPhotos = (function(){
  'use strict';

  /**
   * URL to the default photo
   */
  let __default;

  /**
   * Initializes the UI component
   */
  function __init__(defaultPhoto='/static/img/empty_photo.png') {
    __default = defaultPhoto;
  }

  /**
   * Will generate callback function that should be called when photo was choosen
   * @param {Event} e 
   */
  function __onPhotoSelected(blocklyImage) {
    return function(photo) {

      blocklyImage.attr('xlink:href', photo.attr('src'));
      blocklyImage.attr('data-id', photo.attr('data-id'));
      blocklyImage.attr('data-label', photo.attr('alt'));

      let block = Blockly.mainWorkspace.getBlockById($(e.target).parent('g').parent('g[data-id]').attr('data-id'));
    }
  }

  /**
   * Handles click on the vector_photo block
   * @param {MouseEvent} e 
   */
  function _selectPhoto(e){
    PhotosAdmin.choosePhoto( __onPhotoSelected( $(e.target) ) );
  }

  return {
    init: __init__,
    getDefault: () => __default,
    selectPhoto: _selectPhoto
  }
}());

