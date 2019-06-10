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
   * References the photos administration modal element
   */
  let __photosModal;
  /**
   * References the form for uploading new photos
   */
  let __photosUploadForm;

  /**
   * Initializes the UI component
   */
  function __init__() {
    __photosModal = $('#photosModal');
    __photosModal.on('shown.bs.modal', __onModalShow);
    __photosModal.find('.modal-footer button.btn-primary').mouseup(__onClose);

    __photosUploadForm = $('#photosModalUploadForm');
    __photosUploadForm.submit(__uploadPhotos);

    __loadPhotos();

    $(window).scroll(function() {
      if($(window).scrollTop() == $(document).height() - $(window).height()) {
             // ajax call get data from server and append to the div
      }
    });    
  }

  /**
   * Will initialize modal by loading images
   * @param {Event} e 
   */
  function __onModalShow(e) {
    let allPhotosHeight = $('.form-group.photo-images').height();
    let shownPhotosHeight = $('#photosModal .modal-body').height();




  }

  /**
   * Loads given $count of photos as a ready to use HTML mixing, starting from $offset index 
   * @param {int} offset 
   * @param {int} count
   */
  function __loadPhotos(offset=0, count=20) {

    $.ajax({
      url: '/photos/list',
      type: 'get',
      data: {
        offset: offset,
        max_count: count
      },
      success: function(response) {
        console.log(response);
      },
      error: function(xhr) {
        console.error(xhr);
      }
    })
  }

  /**
   * Handle even of uploading photos to the server
   * @param {Event} e 
   */
  function __uploadPhotos(e) {
    e.preventDefault();

    var data = new FormData(__photosUploadForm.get(0));
    
    $.ajax({
        url: $(this).attr('action'),
        type: $(this).attr('method'),
        data: data,
        cache: false,
        processData: false,
        contentType: false,
        success: function(data) {
            console.log('successfully uploaded photo'); //TODO: change to Vector logger 
            __onClose(e);
        }
    });
    return false;    
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
