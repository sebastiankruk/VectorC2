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
/* jshint esversion: 6 */
(function() {
  'use strict';

  /**
   * Mutator methods added to vector_say_text blocks.
   * @mixin
   * @augments Blockly.Block
   * @package
   * @readonly
   */
  Blockly.Constants.VectorUtils.CONTROLS_VECTOR_SAY_TEXT_EX_MUTATOR_MIXIN = {
    robotVar_: false,
    voiceVar_: false,
    speedVar_: false,

    /**
     * Create XML to represent the vector_say_text mutations
     * @return {Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom: function() {

      if (!this.robotVar_ && 
          !this.voiceVar_ &&
          !this.speedVar_) {
        return null;
      }
      let container = document.createElement('mutation');
      container.setAttribute('robotvar', this.robotVar_);
      container.setAttribute('voicevar', this.voiceVar_);
      container.setAttribute('speedvar', this.speedVar_);
      return container;
    },
    /**
     * Parse XML to restore vector_say_text mutations
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation: function(xmlElement) {
      this.robotVar_ = xmlElement.getAttribute('robotvar') === 'true';
      this.voiceVar_ = xmlElement.getAttribute('voicevar') === 'true';
      this.speedVar_ = xmlElement.getAttribute('speedvar') === 'true';

      this.rebuildShape_();
    },
    /**
     * Populate the mutator's dialog with this block's components.
     * @param {!Blockly.Workspace} workspace Mutator's workspace.
     * @return {!Blockly.Block} Root block in mutator.
     * @this Blockly.Block
     */
    decompose: function(workspace) {
      let topBlock = workspace.newBlock('controls_vector_say_text_opt_wrapper');
      topBlock.initSvg();

      var connection = topBlock.nextConnection;
      if (this.robotVar_) {
        let robotVarBlock = workspace.newBlock('controls_vector_robot_vector_ext_variable_opt');
        robotVarBlock.setColour('#5ba580');
        robotVarBlock.initSvg();
        connection.connect(robotVarBlock.previousConnection);
        connection = robotVarBlock.nextConnection;
      }
      if (this.voiceVar_) {
        let voiceVarBlock = workspace.newBlock('controls_vector_say_text_ext_voice_opt');
        voiceVarBlock.initSvg();
        connection.connect(voiceVarBlock.previousConnection);
      }
      if (this.speedVar_) {
        let speedVarBlock = workspace.newBlock('controls_vector_say_text_ext_speed_opt');
        speedVarBlock.initSvg();
        connection.connect(speedVarBlock.previousConnection);
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
      this.voiceVar_ = false;
      this.speedVar_ = false;

      var extVariableConnection = null;
      var extVoiceConnection = null;
      var extSpeedConnection = null;

      while (clauseBlock) {
        switch (clauseBlock.type) {
          case 'controls_vector_robot_vector_ext_variable_opt':
            if (!this.robotVar_) {
              this.robotVar_ = true;
              extVariableConnection = clauseBlock.statementConnection_;
            }
            break;
          case 'controls_vector_say_text_ext_voice_opt':
            if (!this.voiceVar_) {
              this.voiceVar_ = true;
              extVoiceConnection = clauseBlock.statementConnection_;
            }
            break;
          case 'controls_vector_say_text_ext_speed_opt':
            if (!this.speedVar_) {
              this.speedVar_ = true;
              extSpeedConnection = clauseBlock.statementConnection_;
            }
            break;
          default:
            throw TypeError('Unknown block type: ' + clauseBlock.type);
        }
        clauseBlock = clauseBlock.nextConnection &&
            clauseBlock.nextConnection.targetBlock();
      }
      this.updateShape_();

      // Reconnect any child blocks.
      this.reconnectChildBlocks_(extVariableConnection, extVoiceConnection, extSpeedConnection);

    },
    /**
     * Modify this block to have the correct number of inputs.
     * @this Blockly.Block
     * @private
     */
    updateShape_: function() {
      // Delete everything.
      if (this.getInput('ROBOT_VAR_DUMMY')) {
        this.removeInput('ROBOT_VAR_DUMMY');
      }
      if (this.getInput('VOICE_VAR_DUMMY')) {
        this.removeInput('VOICE_VAR_DUMMY');
      }
      if (this.getInput('SPEED_VAR_DUMMY')) {
        this.removeInput('SPEED_VAR_DUMMY');
      }

      if (this.voiceVar_) {
        this.appendDummyInput('VOICE_VAR_DUMMY')
          .appendField(Blockly.Msg.VECTOR_SAY_TEXT_EX_VOICE_OPT_TITLE)
          .appendField(new Blockly.FieldCheckbox("TRUE"), 'VOICE_VAR');
      }
      if (this.speedVar_) {
        this.appendDummyInput('SPEED_VAR_DUMMY')
          .appendField(Blockly.Msg.VECTOR_SAY_TEXT_EX_SPEED_OPT_TITLE)
          .appendField(new Blockly.FieldNumber(1, 0.1, 2, 0.1), "SPEED_VAR");
    
      }
      if (this.robotVar_) {
          this.appendDummyInput('ROBOT_VAR_DUMMY')
              .appendField(Blockly.Msg.VECTOR_ROBOT_EX_VARIABLE_TITLE)
              .appendField(new Blockly.FieldVariable('robot'), 'ROBOT_VAR');
      }
      if (this.robotVar_ || this.speedVar_ || this.voiceVar_) {
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
      var extVoiceConnection = null;
      var extSpeedConnection = null;

      if (this.getInput('VOICE_VAR')) {
        extVoiceConnection = this.getInput('VOICE_VAR').connection.targetConnection;
      }
      if (this.getInput('SPEED_VAR')) {
        extSpeedConnection = this.getInput('SPEED_VAR').connection.targetConnection;
      }
      if (this.getInput('ROBOT_VAR_DUMMY')) {
        extVariableConnection = this.getInput('ROBOT_VAR_DUMMY').fieldRow[1].connection.targetConnection;
      }

      this.updateShape_();
      this.reconnectChildBlocks_(extVariableConnection, extVoiceConnection, extSpeedConnection);
    },
      
    /**
     * Reconnects child blocks.
     */
    reconnectChildBlocks_: function(extVariableConnection, extVoiceConnection, extSpeedConnection) {
      Blockly.Mutator.reconnect(extVariableConnection, this, 'ROBOT_VAR');
      Blockly.Mutator.reconnect(extVoiceConnection, this, 'VOICE_VAR');
      Blockly.Mutator.reconnect(extSpeedConnection, this, 'SPEED_VAR');
    }


  };

  Blockly.Extensions.registerMutator('controls_vector_say_text_ex_mutator',
      Blockly.Constants.VectorUtils.CONTROLS_VECTOR_SAY_TEXT_EX_MUTATOR_MIXIN, 
      null, //opt_helperFn
      [
        'controls_vector_robot_vector_ext_variable_opt', 
        'controls_vector_say_text_ext_voice_opt',
        'controls_vector_say_text_ext_speed_opt'
      ]);


}());
