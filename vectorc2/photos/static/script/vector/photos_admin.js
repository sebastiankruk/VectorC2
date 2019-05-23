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
 * Main class for Vector C2 photos administration
 */
const PhotosAdmin = (function(){
  'use strict';

  /**
   * References to the photos administration modal element
   */
  let __photosModal;

  /**
   * Initializes the UI component
   */
  function __init__() {
    __photosModal = $('#photosModal');

    $('#configModal .modal-footer button.btn-primary').mouseup(__onClose);
  }

  /**
   * Closes the modal
   */
  function __onClose(e) {
    __photosModal.modal('hide');
  }

  return {
    init: __init__
  }
})()

$( document ).ready(PhotosAdmin.init)
