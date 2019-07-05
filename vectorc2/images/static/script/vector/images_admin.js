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
 * Main class for Vector C2 images administration
 */
const ImagesAdmin = (function(){
  'use strict';

  /**
   * References the images administration modal element
   */
  let __imagesModal;
  /**
   * References the element where collection of images is presented
   */
  let __imagesGallery;
  /**
   * References the form for uploading new images
   */
  let __imagesUploadForm;
  /**
   * Body of the modal with gallery
   */
  let __galleryBody;
  /**
   * Currently loaded images count
   */
  let __imagesOffset = 0;
  /**
   * Index used to keep track of images added/removed since load
   */
  let __imagesDiff = 0;
  /**
   * Will be true when choosing images for Blockly
   */
  let __chooseModeCallback = null;

  /**
   * Initializes the UI component
   */
  function __init__() {
    __imagesModal = $('#imagesModal');
    __imagesModal.on('shown.bs.modal', __onModalShow);
    __imagesModal.on('hidden.bs.modal', __onModalHidden);
    // __imagesModal.find('.modal-footer button.btn-primary').mouseup(__onClose);

    __imagesGallery = __imagesModal.find('.photo-images');

    __imagesUploadForm = $('#imagesModalUploadForm');
    __imagesUploadForm.submit(__uploadImages);

    __galleryBody = __imagesModal.find('.modal-body');

    let initialPhotos = Math.ceil(__galleryBody.height()/195)*5;
    console.log(`initial images: ${initialPhotos}`);

    __loadImages(0, initialPhotos);
  }

  /**
   * Will initialize modal by loading images
   * @param {Event} e 
   */
  function __onModalShow(e) {
    let allPhotosHeight = $('.form-group.photo-images').height();
    let shownPhotosHeight = $('#imagesModal .modal-body').height();
  }

  /**
   * Clean up when the modal is hidden
   * @param {Event} e 
   */
  function __onModalHidden(e) {
    __chooseModeCallback = null;
    __imagesModal.removeClass('choose');
  }

  /**
   * Handles scroll events on the image gallery
   * @param {Event} e 
   */
  function __onGalleryScroll(e) {
    if ( __galleryBody.scrollTop() >= __imagesGallery.height() - __galleryBody.height() ) {
      __loadImages(__imagesOffset);
    }
  }

  /**
   * Loads given $count of images as a ready to use HTML mixing, starting from $offset index 
   * @param {int} offset 
   * @param {int} count
   */
  function __loadImages(offset=0, count=10) {

    $.ajax({
      url: '/images/',
      type: 'get',
      data: {
        offset: offset,
        max_count: count
      },
      success: function(response) {
        __imagesOffset = offset + count;
        
        if (response.total_count > __imagesOffset + __imagesDiff) {
          __galleryBody.on('scroll', __onGalleryScroll);    
        } else {
          __galleryBody.off('scroll');
          console.log('Will stop checking for more images now'); 
        }
        __addImagesToGallery(response.html, offset>0)
      },
      error: function(xhr) {
        LogPanel.logError(xhr.responseText)
        LogPanel.logError(xhr);
      }
    })
  }

  /**
   * Adds images given as HTML mixim to the gallery.
   * If append is false, it will clear the gallery content 
   * 
   * @param {*} htmlMixim 
   * @param {*} append 
   */
  function __addImagesToGallery(htmlMixim, append=true, atBegining=false) {
    if (!append || __imagesGallery.find('#box-image-empty').length > 0) {
      __imagesGallery.empty();
    }
    if (atBegining) {
      __imagesGallery.prepend(htmlMixim);
    } else {
      __imagesGallery.append(htmlMixim);
    }

    __imagesGallery.find('.box-image > div > button').mouseup(__onPhotoAction);
  }

  /**
   * Prepares to remove a image or select image (if __chooseMode == true)
   * Will show confirmation dialog before
   * @param {Event} e onMouseUp event
   */
  function __onPhotoAction(e) {

    if (__chooseModeCallback) {
      // we will select this image for blockly
      let selectedImg = $(e.target).parents('button').siblings('img')[0] || 
                        $(e.target).siblings('img')[0];
      __chooseModeCallback($(selectedImg));
      __onClose(e);
    } else {
      // we will check whether we can remove this image
      let boxImage = e.currentTarget.closest('.box-image');
      let id = $(boxImage).find('.thumbnail > img').attr('data-id');
      let label = $(boxImage).find('.thumbnail > div.caption > p').text()
  
      bootbox.confirm({
        title: gettext("Remove image?"),
        message: interpolate(gettext('Do you want to the remove image "%(label)s"?'), {label: label}, true),
        buttons: {
            cancel: {
                label: gettext('<i class="fa fa-times"></i> Cancel')
            },
            confirm: {
                label: gettext('<i class="fa fa-check"></i> Confirm')
            }
        },
        callback: result => (result) 
                         ? __removeImage(boxImage, id) 
                         : LogPanel.logText(interpolate(gettext('You decided not to remove the image "%(label)s"'), {}, true))
      });    
    }
  }

  /**
   * Removing image with given
   * @param {Event} e 
   */
  function __removeImage(boxImage, id) {
    $.ajax({
      url: `/images/${id}`,
      type: 'delete',
      headers: {
        "X-CSRFToken": $("#imagesModalUploadForm").find("input[name='csrfmiddlewaretoken']").attr('value'),
      },
      success: response => {
        boxImage.remove();
        __imagesDiff--;
      },
      error: xhr => LogPanel.logError(xhr)
    })
  }

  /**
   * Handle even of uploading images to the server
   * @param {Event} e 
   */
  function __uploadImages(e) {
    e.preventDefault();

    var data = new FormData(__imagesUploadForm.get(0));
    
    $.ajax({
        url: $(this).attr('action'),
        type: $(this).attr('method'),
        data: data,
        cache: false,
        processData: false,
        contentType: false,
        success: function(response) {
          __imagesDiff++;
          LogPanel.logText('successfully uploaded image');
          __addImagesToGallery(response.html, true, true);
        },
        error: function(xhr) {
          LogPanel.logError(xhr);
        }
    });
    return false;    
  }

  /**
   * Closes the modal
   */
  function __onClose(e) {
    __imagesModal.modal('hide');
  }

  /**
   * Opens the modal with images gallery ready for picking up a image
   * @param {Function} callback 
   */
  function _chooseImage(callback) {
    __chooseModeCallback = callback;
    __imagesModal.modal('show');
    __imagesModal.addClass('choose');
  }

  return {
    init: __init__,
    chooseImage: _chooseImage
  }
})()

$( document ).ready(ImagesAdmin.init)
