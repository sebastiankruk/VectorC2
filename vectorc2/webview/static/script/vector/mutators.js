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
  const __EXTVAROPTS = {};
  const __ROBOTVAR  = 'robotvar'
  const __ROBOT_VAR_DUMMY = 'ROBOT_VAR_DUMMY';
  const __ROBOT_VAR_U = 'ROBOT_VAR';

  
  /**
   * Returns an array of one or multiple Blockly JSON object definitions 
   * that should be pre-initilized before initilizing the rest of the mutator
   * @param {Blockly array} id 
   * @param {JSON Object} extensions (optional) definition of extensions to this mutator
   */
  function __mutatorBlocks(id, extensions=[]) {
    return [
      // each mutator will have vector robot variable
      {
        _comment: "Block representing mutator UI wrapper",
        type: `${id}_wrapper`,
        message0: `%{BKY_${id.toUpperCase()}_MESSAGE}`,
        args0: [
          {
            type: "input_dummy"
          }
        ],
        nextStatement: [
          __RVEVAROPT,
          // potential optional extensions
          ...Object.keys(__EXTVAROPTS)
        ],
        colour: 150,
        tooltip: `%{BKY_${id.toUpperCase()}_TOOLTIP}`,
        helpUrl: "" 
      },
      // and optional list of other extensions
      ...Array.from(Object.keys(extensions)
                          .map(ex => ({
          _comment: `Block representing mutator UI ${ex} option`,
          type: `${id}_${ex}_opt`,
          message0: `%{BKY_${id}_${ex}_OPT_TITLE}`.toUpperCase(),
          args0: [],
          previousStatement: null,
          nextStatement: null,
          enableContextMenu: false,
          colour: 150,
          tooltip: `%{BKY__${id}_${ex}_OPT_TOOLTIP}`.toUpperCase()
        }) 
      ))
    ]
  }

  /**
   * @param {String} id 'controls_vector_say_text_opt'
   * @param {JSON Object} extensions (optional) definition of extensions to this mutator
   */
  function __mixim(id, extensions=[]) {

    return {
      robotVar_: false,
      exVars_: { //TODO generate base on extensions
        /*
        someName: {
          status: false, //default value
          var: `${name}var`,
          varDummy: `${name.toUpperCase()}_VAR_DUMMY`,
          varU: `${name.toUpperCase()}_VAR'
          




        }
        */
      },
  
      /**
       * Create XML to represent the vector_say_text mutations
       * @return {Element} XML storage element.
       * @this Blockly.Block
       */
      mutationToDom: function() {
  
        if (!this.robotVar_ && 
            Object.values(this.exVars_)
                  .map( o => o.status)
                  .every(Boolean)) {
          return null;
        }
        let container = document.createElement('mutation');
        container.setAttribute(__ROBOTVAR, this.robotVar_);
        // map extensions
        Object.entries(this.exVars_)
              .forEach( entry => container.setAttribute(`${entry[0]}var`, entry[1].status) )
        return container;
      },
      /**
       * Parse XML to restore vector_say_text mutations
       * @param {!Element} xmlElement XML storage element.
       * @this Blockly.Block
       */
      domToMutation: function(xmlElement) {
        this.robotVar_ = xmlElement.getAttribute(__ROBOTVAR) === 'true';
        // map extensions
        Object.entries(this.exVars_)
              .forEach( entry =>  entry[1].status = xmlElement.getAttribute(`${entry[0]}var`) === 'true' )
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
        // decompose active extensions
        Object.entries(ex_)
              .filter( entry => entry[1].status )
              .forEach( entry => {
                let exVarBlock = workspace.newBlock(`${id}_${entry[0]}_opt`);
                exVarBlock.initSvg();
                connection.connect(exVarBlock.previousConnection);
                connection = exVarBlock.nextConnection;
              })
  
        return topBlock;
      },
      /**
       * Reconfigure this block based on the mutator dialog's components.
       * @param {!Blockly.Block} containerBlock Root block in mutator.
       * @this Blockly.Block
       */
      compose: function(topBlock) {
        var clauseBlock = topBlock.nextConnection.targetBlock();
        let extVariableConnection = {};
        
        // Reset and detect options
        this.robotVar_ = false;
        Object.values(this.exVars_)
              .forEach(value => value.status = false);
  
        while (clauseBlock) {
          if (clauseBlock.type === __RVEVAROPT) {
              if (!this.robotVar_) {
                this.robotVar_ = true;
                extVariableConnection[__ROBOT_VAR_U] = clauseBlock.statementConnection_;
              } 
          } else
          if (clauseBlock.type in __EXTVAROPTS) {
            let exVar = this.exVars_[ __EXTVAROPTS[clauseBlock.type] ];
            if (exVar.status) {
              exVar.status = true;
              extVariableConnection[exVar.varU] = clauseBlock.statementConnection_
            }
          } 
          else
            throw TypeError(`Unknown block type: ${clauseBlock.type}`);

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
        Object.values(this.exVars_)
              .forEach(value => {
                if (this.getInput(value.varDummy)) {
                  this.removeInput(value.varDummy);
                }
              })

        //recreate
        if (this.robotVar_) {
            this.appendDummyInput(__ROBOT_VAR_DUMMY)
                .appendField(Blockly.Msg.VECTOR_ROBOT_EX_VARIABLE_TITLE)
                .appendField(new Blockly.FieldVariable('robot'), __ROBOT_VAR_U);
        }
        Object.entries(this.exVars_)
              .filter(entry => entry[1].status)
              .filter(entry => typeof entry[1].blockCreateFunction !== 'undefined')
              .forEach(entry => entry[1].blockCreateFunction(this));
        Object.entries(this.exVars_)
              .filter(entry => entry[1].status)
              .filter(entry => typeof entry[1].blockFieldFunction !== 'undefined')
              .forEach(entry => {
                this.appendDummyInput(entry[1].varDummy)
                    .appendField(Blockly.Msg[`${id}_${ex}_OPT_TITLE`.toUpperCase()])
                    .appendField(entry[1].blockFieldFunction(this), entry[1].varU);
              });

        if (this.robotVar_ ||
            Object.values(this.exVars_)
                  .map(value => value.status)
                  .every(Boolean)) {
          this.setInputsInline(false);
        }
  
      },
      /**
       * Reconstructs the block with all child blocks attached.
       */
      rebuildShape_: function() {
  
        let extVariableConnection = {};
  
        if (this.getInput(__ROBOT_VAR_DUMMY)) {
          extVariableConnection[__ROBOT_VAR_U] = this.getInput(__ROBOT_VAR_DUMMY).fieldRow[1].connection.targetConnection;
        }
  
        this.updateShape_();
        this.reconnectChildBlocks_(extVariableConnection);
      },
        
      /**
       * Reconnects child blocks.
       */
      reconnectChildBlocks_: function(extVariableConnection) {
        Object.entries(extVariableConnection)
              .forEach(entry => Blockly.Mutator.reconnect(entry[1], this, entry[0]));
      }
  
    };


  }

  /**
   * @param {*} id 'controls_vector_say_text_opt'
   */
  function _init(id, extensions) {
    Object.keys(extensions)
          .forEach(ex => __EXTVAROPTS.push( `${id}_${ex}_opt` )); 

    const blocks_ = __mutatorBlocks(id, extensions);
    const mutator_ = `${id}_mutator`;
    const mixin_ = `${mutator_.toUpperCase()}_MIXIN`;

    VectorUtils.initializeBlocks(...blocks_)

    Blockly.Constants.VectorUtils[mixin_] = __mixim(id, extensions);

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
