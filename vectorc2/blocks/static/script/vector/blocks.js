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
/*jshint esversion: 8 */

/**
 * Class used to initialize custom blocks based on the definitions in JSON
 */
const VectorBlocks = (function(){

  'use strict';

  const JSON_BLOCK_SPECS = {
    'vector_robot': {
      'initiazed': false,
      'mutators': true,
      'constants': 'VectorUtils'
    },
    'vector_util': {
      'initiazed': false,
      'mutators': false,
      'constants': 'VectorUtils'
    },
    'vector_say_text': {
      'initiazed': false,
      'mutators': true,
      'constants': 'VectorBehavior'
    },
    'vector_behavior': {
      'initiazed': false,
      'mutators': true,
      'constants': 'VectorBehavior'
    }
  };

  /**
   * Function creates a callback that is called back when a single JSON file is successfully fetched.
   * It will process that JSON spec of custom blocks with Blockly.Blocks.jsonInit.
   * After processing JSON spec the given json file is noted as processed
   * @param {String} jsonFile file name that is being initialized
   */
  function __loadCustomBlocks(jsonFile) {
    return function(data) {
      VectorUtils.initializeBlocks(...data);
      if (JSON_BLOCK_SPECS[jsonFile].mutators) {
        __cachedScript(`/static/script/vector/blocks/${jsonFile}.js`).then(data => __isInitialized(jsonFile));
      } else {
        __isInitialized(jsonFile);
      }

    };
  }

  /**
   * Called to check whethere all JSON files are initialized and we can initialize VectorC2
   */
  function __isInitialized(jsonFile) {
    JSON_BLOCK_SPECS[jsonFile].initiazed = true;

    if (Object.values(JSON_BLOCK_SPECS).map( o => o.initiazed ).every(Boolean)) { // if all JSON files are initialized
      VectorC2.init();
    }
  }

  /**
   * Loads given script with caching enabled
   * @param {*} url Script URL to be loaded
   * @param {*} options additional options to the ajax call
   */
  function __cachedScript( url, options ) {
 
    // Allow user to set any option except for dataType, cache, and url
    options = $.extend( options || {}, {
      dataType: "script",
      cache: true,
      url: url
    });
   
    // Use $.ajax() since it is more flexible than $.getScript
    // Return the jqXHR object so we can chain callbacks
    return $.ajax( options );
  }

  /**
   * Initializes custom Vector blocks by reading them from JSON files
   */
  function __init__(){
    for ( let jsonFile in JSON_BLOCK_SPECS ) {
      if ( !(JSON_BLOCK_SPECS[jsonFile].constants in Blockly.Constants) ) {
        Blockly.Constants[ JSON_BLOCK_SPECS[jsonFile].constants ] = {};
      }
      $.getJSON(`/static/script/vector/blocks/${jsonFile}.json`, __loadCustomBlocks(jsonFile));
    }
  }

  return {
    init: __init__
  };

})();

$( document ).ready(VectorBlocks.init);