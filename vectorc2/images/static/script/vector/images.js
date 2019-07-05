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
 * Class for keeping image related metadata
 */
class ImageMeta {
  /**
   * Constructs the metadata object
   * @param {Object} meta metatadata to be handled
   */
  constructor(meta) {
    Object.assign(this, meta);
  }
  
  toString() {
     return JSON.stringify(this);
  }
}

/**
 * Main class for Vector C2 images use
 */
const VectorImages = (function(){
  'use strict';

  /**
   * URL to the default image
   */
  let __default;

  /**
   * Initializes the UI component
   */
  function __init__(defaultPhoto='/static/img/empty_photo.png') {
    __default = defaultPhoto;
  }

  /**
   * Will generate callback function that should be called when image was choosen
   * @param {Event} e 
   */
  function __onImageSelected(blocklyImage) {
    return function(image) {

      let imageData = new ImageMeta({
        'xlink:href': image.attr('src'),
        'data-id': image.attr('data-id'),
        'data-label': image.attr('alt')
      })

      let blockId = $(blocklyImage).parent('g').parent('g[data-id]').attr('data-id');
      let block = Blockly.mainWorkspace.getBlockById(blockId);

      blocklyImage.attr(imageData);
      block.data = imageData; //new ImageMeta({...block.data, ...imageData})
    }
  }

  /**
   * Handles click on the vector_image block
   * @param {MouseEvent} e 
   */
  function _selectImage(e){
    ImagesAdmin.chooseImage( __onImageSelected( $(e.target) ) );
  }

  return {
    init: __init__,
    getDefault: () => __default,
    selectImage: _selectImage
  }
}());

