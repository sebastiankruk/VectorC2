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
   * Handles click on the vector_photo block
   * @param {MouseEvent} e 
   */
  function _selectPhoto(e){
    console.log(e);
    PhotosAdmin.show();
  }

  return {
    init: __init__,
    getDefault: () => __default,
    selectPhoto: _selectPhoto
  }
}());

