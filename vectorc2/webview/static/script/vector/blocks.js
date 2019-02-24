/**
 * 
 * @author sebastian@kruk.me
 */

'use strict';

/**
 * Class used to initialize custom blocks based on the definitions in JSON
 */
const VectorBlocks = (function(){

  const JSON_BLOCK_SPECS = [
    'vector_robot',
    'vector_util',
    'vector_say_text'
  ]

  /**
   * Function called back when a single JSON file is successfully fetched.
   * It will process that JSON spec of custom blocks with Blockly.Blocks.jsonInit
   * @param {JSON} data 
   */
  function __loadCustomBlocks(data) {
    if (Array.isArray(data)) {
      for ( let block of data ) {
        __initializeSingleBlock(block);
      }
    } else {
      __initializeSingleBlock(data);
    }
    // Blockly.Block.jsonInit(data);
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
   * Initializes custom Vector blocks by reading them from JSON files
   */
  function __init__(){
    for ( let jsonFile of JSON_BLOCK_SPECS ) {
      $.getJSON(`/static/script/vector/blocks/${jsonFile}.json`, __loadCustomBlocks);
    }
  }

  return {
    init: __init__
  }

})();

$( document ).ready(VectorBlocks.init)
