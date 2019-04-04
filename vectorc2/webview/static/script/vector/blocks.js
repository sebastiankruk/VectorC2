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
'use strict';

/**
 * Class used to initialize custom blocks based on the definitions in JSON
 */
const VectorBlocks = (function(){

  const JSON_BLOCK_SPECS = {
    'vector_robot':'VectorUtils',
    'vector_util':'VectorUtils',
    'vector_say_text':'VectorBehavior',
    'vector_behavior':'VectorBehavior'
  }

  /**
   * Function creates a callback that is called back when a single JSON file is successfully fetched.
   * It will process that JSON spec of custom blocks with Blockly.Blocks.jsonInit.
   * After processing JSON spec the given json file is noted as processed
   * @param {String} jsonFile file name that is being initialized
   */
  function __loadCustomBlocks(jsonFile) {
    return function(data) {
      if (Array.isArray(data)) {
        for ( let block of data ) {
          __initializeSingleBlock(block);
        }
      } else {
        __initializeSingleBlock(data);
      }
      JSON_BLOCK_SPECS[jsonFile] = true;
      __isInitialized();
    }
  }

  /**
   * Initializes a single custom Blockly block
   * @param {JSON Object} block 
   */
  function __initializeSingleBlock(block) {
    Blockly.Blocks[block.type] = {
      init: function() {
        this.jsonInit(block)
      }
    }
  }

  /**
   * Called to check whethere all JSON files are initialized and we can initialize VectorC2
   */
  function __isInitialized() {
    if (Object.values(JSON_BLOCK_SPECS).every(Boolean)) { // if all JSON files are initialized
      VectorC2.init();
    }
  }

  /**
   * Initializes custom Vector blocks by reading them from JSON files
   */
  function __init__(){
    for ( let jsonFile in JSON_BLOCK_SPECS ) {
      if ( !(JSON_BLOCK_SPECS[jsonFile] in Blockly.Constants) ) {
        Blockly.Constants[ JSON_BLOCK_SPECS[jsonFile] ] = {};
      }
      $.getJSON(`/static/script/vector/blocks/${jsonFile}.json`, __loadCustomBlocks(jsonFile));
    }
  }

  return {
    init: __init__
  }

})();

$( document ).ready(VectorBlocks.init)
