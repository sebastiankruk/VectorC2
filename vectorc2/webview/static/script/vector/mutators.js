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
 * Class with mutator generator functions
 */
const VectorMutator = (function(){
  'use strict';

  const __RVEVAROPT = 'controls_vector_robot_vector_ext_variable_opt';
  const __ROBOTVAR  = 'robotvar'
  const __ROBOT_VAR_DUMMY = 'ROBOT_VAR_DUMMY';
  const __ROBOT_VAR_U = 'ROBOT_VAR';

  function __mutatorBlock(id) {
    return   {
      "_comment": "Block representing mutator UI wrapper",
      "type": `${id}_wrapper`,
      "message0": `%{BKY_${id.toUpperCase()}_MESSAGE}`,
      "args0": [
        {
          "type": "input_dummy"
        }
      ],
      "nextStatement": [
        "controls_vector_robot_vector_ext_variable_opt"
      ],
      "colour": 150,
      "tooltip": `%{BKY_${id.toUpperCase()}_TOOLTIP}`,
      "helpUrl": "" 
    }
  }

  /**
   * @param {*} id 'controls_vector_say_text_opt'
   */
  function __mixim(id) {

    return {
      robotVar_: false,
  
      /**
       * Create XML to represent the vector_say_text mutations
       * @return {Element} XML storage element.
       * @this Blockly.Block
       */
      mutationToDom: function() {
  
        if (!this.robotVar_) {
          return null;
        }
        let container = document.createElement('mutation');
        container.setAttribute(__ROBOTVAR, this.robotVar_);
        return container;
      },
      /**
       * Parse XML to restore vector_say_text mutations
       * @param {!Element} xmlElement XML storage element.
       * @this Blockly.Block
       */
      domToMutation: function(xmlElement) {
        this.robotVar_ = xmlElement.getAttribute(__ROBOTVAR) === 'true';
        this.rebuildShape_();
      },
      /**
       * Populate the mutator's dialog with this block's components.
       * @param {!Blockly.Workspace} workspace Mutator's workspace.
       * @return {!Blockly.Block} Root block in mutator.
       * @this Blockly.Block
       */
      decompose: function(workspace) {
        let topBlock = workspace.newBlock(`${id}_wrapper`);
        topBlock.initSvg();
  
        var connection = topBlock.nextConnection;
        if (this.robotVar_) {
          let robotVarBlock = workspace.newBlock(__RVEVAROPT);
          robotVarBlock.setColour('#5ba580');
          robotVarBlock.initSvg();
          connection.connect(robotVarBlock.previousConnection);
          connection = robotVarBlock.nextConnection;
        }
  
        return topBlock;
      },
      /**
       * Reconfigure this block based on the mutator dialog's components.
       * @param {!Blockly.Block} containerBlock Root block in mutator.
       * @this Blockly.Block
       */
      compose: function(topBlock) {
        var clauseBlock = topBlock.nextConnection.targetBlock();
        
        // Reset and detect options
        this.robotVar_ = false;
        var extVariableConnection = null;
  
        while (clauseBlock) {
          switch (clauseBlock.type) {
            case __RVEVAROPT:
              if (!this.robotVar_) {
                this.robotVar_ = true;
                extVariableConnection = clauseBlock.statementConnection_;
              }
              break;
            default:
              throw TypeError(`Unknown block type: ${clauseBlock.type}`);
          }
          clauseBlock = clauseBlock.nextConnection &&
              clauseBlock.nextConnection.targetBlock();
        }
        this.updateShape_();
  
        // Reconnect any child blocks.
        this.reconnectChildBlocks_(extVariableConnection);
  
      },
      /**
       * Modify this block to have the correct number of inputs.
       * @this Blockly.Block
       * @private
       */
      updateShape_: function() {
        // Delete everything.
        if (this.getInput(__ROBOT_VAR_DUMMY)) {
          this.removeInput(__ROBOT_VAR_DUMMY);
        }
        if (this.robotVar_) {
            this.appendDummyInput(__ROBOT_VAR_DUMMY)
                .appendField(Blockly.Msg.VECTOR_ROBOT_EX_VARIABLE_TITLE)
                .appendField(new Blockly.FieldVariable('robot_var'), __ROBOT_VAR_U);
        }
        if (this.robotVar_) {
          this.setInputsInline(false);
        }
  
        /*
        TODO
        if (this.robotVar_ && this.serialNumber_) {
          this.setTooltip("Use Vector %1 %2 with serial %3 %4");
        } else if (this.robotVar_ && !this.serialNumber_) {
          this.setTooltip("Use Vector %1 %2 %3");
        } else if (!this.robotVar_ && this.serialNumber_) {
          this.setTooltip("Use Vector %1 with serial %2 %3");
        }
        */
  
      },
      /**
       * Reconstructs the block with all child blocks attached.
       */
      rebuildShape_: function() {
  
        var extVariableConnection = null;
  
        if (this.getInput(__ROBOT_VAR_DUMMY)) {
          extVariableConnection = this.getInput(__ROBOT_VAR_DUMMY).fieldRow[1].connection.targetConnection;
        }
  
        this.updateShape_();
        this.reconnectChildBlocks_(extVariableConnection, extVoiceConnection, extSpeedConnection);
      },
        
      /**
       * Reconnects child blocks.
       */
      reconnectChildBlocks_: function(extVariableConnection, extVoiceConnection, extSpeedConnection) {
        Blockly.Mutator.reconnect(extVariableConnection, this, __ROBOT_VAR_U);
      }
  
  
    };


  }

  /**
   * @param {*} id 'controls_vector_say_text_opt'
   */
  function _init(id) {
    const block_ = __mutatorBlock(id);
    const mutator_ = `${id}_mutator`;
    const mixin_ = `${mutator_.toUpperCase()}_MIXIN`;

    Blockly.Blocks[block_.type] = {
      init: function() {
        this.jsonInit(block_);
      }
    };

    Blockly.Constants.VectorUtils[mixin_] = __mixim(id);

    Blockly.Extensions.registerMutator(mutator_,
      Blockly.Constants.VectorUtils[mixin_], 
      null, //opt_helperFn
      [ __RVEVAROPT ]
    );
  }

  return {
    init: _init
  };

})();
