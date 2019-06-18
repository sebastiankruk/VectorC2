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
   * References the element where collection of photos is presented
   */
  let __photosGallery;
  /**
   * References the form for uploading new photos
   */
  let __photosUploadForm;
  /**
   * Body of the modal with gallery
   */
  let __galleryBody;
  /**
   * Currently loaded photos count
   */
  let __photosOffset = 0;
  /**
   * 
   */
  let __photosDiff = 0;

  /**
   * Initializes the UI component
   */
  function __init__() {
    __photosModal = $('#photosModal');
    __photosModal.on('shown.bs.modal', __onModalShow);
    // __photosModal.find('.modal-footer button.btn-primary').mouseup(__onClose);

    __photosGallery = __photosModal.find('.photo-images');

    __photosUploadForm = $('#photosModalUploadForm');
    __photosUploadForm.submit(__uploadPhotos);

    __galleryBody = __photosModal.find('.modal-body');

    let initialPhotos = Math.ceil(__galleryBody.height()/195)*5;
    console.log(`initial photos: ${initialPhotos}`);

    __loadPhotos(0, initialPhotos);
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
   * Handles scroll events on the photo gallery
   * @param {Event} e 
   */
  function __onGalleryScroll(e) {
    if ( __galleryBody.scrollTop() >= __photosGallery.height() - __galleryBody.height() ) {
      __loadPhotos(__photosOffset);
    }
  }

  /**
   * Loads given $count of photos as a ready to use HTML mixing, starting from $offset index 
   * @param {int} offset 
   * @param {int} count
   */
  function __loadPhotos(offset=0, count=10) {

    $.ajax({
      url: '/photos/',
      type: 'get',
      data: {
        offset: offset,
        max_count: count
      },
      success: function(response) {
        __photosOffset = offset + count;
        
        if (response.total_count > __photosOffset + __photosDiff) {
          __galleryBody.on('scroll', __onGalleryScroll);    
        } else {
          __galleryBody.off('scroll');
          console.log('Will stop checking for more photos now'); 
        }
        __addPhotosToGallery(response.html, offset>0)
      },
      error: function(xhr) {
        console.error(xhr.responseText)
        console.error(xhr); //TODO: change to Vector logger 
      }
    })
  }

  /**
   * Adds photos given as HTML mixim to the gallery.
   * If append is false, it will clear the gallery content 
   * 
   * @param {*} htmlMixim 
   * @param {*} append 
   */
  function __addPhotosToGallery(htmlMixim, append=true, atBegining=false) {
    if (!append || __photosGallery.find('#box-image-empty').length > 0) {
      __photosGallery.empty();
    }
    if (atBegining) {
      __photosGallery.prepend(htmlMixim);
    } else {
      __photosGallery.append(htmlMixim);
    }

    __photosGallery.find('.box-image > div > button').mouseup(__onRemoveImage);
  }

  /**
   * Prepares to remove a photo. 
   * Will show confirmation dialog before
   * @param {Event} e onMouseUp event
   */
  function __onRemoveImage(e) {
    let boxImage = e.currentTarget.closest('.box-image');
    let id = $(boxImage).find('.thumbnail > img').attr('data-id');
    let label = $(boxImage).find('.thumbnail > div.caption > p').text()

    bootbox.confirm({
      title: "Remove photo?", //TODO -i18n
      message: `Do you want to the remove photo "${label}"?`,  //TODO -i18n
      buttons: {
          cancel: {
              label: '<i class="fa fa-times"></i> Cancel'  //TODO -i18n
          },
          confirm: {
              label: '<i class="fa fa-check"></i> Confirm'  //TODO -i18n
          }
      },
      callback: result => (result) ? __removeImage(boxImage, id) : console.log(`You decided not to remove the photo "${label}"`) //TODO: use VectorC2 logger
    });    
  }

  /**
   * Removing image with given
   * @param {Event} e 
   */
  function __removeImage(boxImage, id) {
    $.ajax({
      url: `/photos/${id}`,
      type: 'delete',
      headers: {
        "X-CSRFToken": $("#photosModalUploadForm").find("input[name='csrfmiddlewaretoken']").attr('value'),
      },
      success: response => {
        boxImage.remove();
        __photosDiff--;
      },
      error: xhr => console.error(xhr) //TODO: change to Vector logger 
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
        success: function(response) {
          __photosDiff++;
          console.log('successfully uploaded photo'); //TODO: change to Vector logger 
          __addPhotosToGallery(response.html, true, true);
        },
        error: function(xhr) {
          console.error(xhr); //TODO: change to Vector logger 
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
    init: __init__,
    show: () => __photosModal.modal('show')
  }
})()

$( document ).ready(PhotosAdmin.init)
