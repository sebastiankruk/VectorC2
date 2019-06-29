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

  
  /**
   * Returns an array of one or multiple Blockly JSON object definitions 
   * that should be pre-initialized before initializing the rest of the mutator
   * @param {Blockly array} id 
   * @param {JSON Object} extensions (optional) definition of extensions to this mutator
   */
  function __mutatorBlocks(id, _extVarOpts, extensions=[]) {
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
        nextStatement: null, /*[
          // potential optional extensions
          ...Object.keys(_extVarOpts),
          __RVEVAROPT
        ].filter(el => true), */
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
          tooltip: `%{BKY_${id}_${ex}_OPT_TOOLTIP}`.toUpperCase()
        }) 
      ))
    ]
  }

  /**
   * @param {String} id e.g., 'vector_say_text_ex'
   * @param {JSON Object} extensions (optional) definition of extensions to this mutator
   */
  function __mixim(id, _extVarOpts, extensions=[]) {

    return {
      robotVar_: false,
      exVars_: Object.entries(extensions).reduce( (exVars, entry) => {
        exVars[entry[0]] = {
          status: false,
          var: `${entry[0]}var`,
          varDummy: `${entry[0].toUpperCase()}_VAR_DUMMY`,
          varU: `${entry[0].toUpperCase()}_VAR`,
          appendFunction: entry[1].appendFunction,
          checkType: entry[1].checkType,
          blockCreateFunction: entry[1].blockCreateFunction,
          blockFieldFunction: entry[1].blockFieldFunction,
          align: entry[1].align
        };
        return exVars;
      }, {}),
      extVarOpts: _extVarOpts,

      /**
       * Create XML to represent the vector_say_text mutations
       * @return {Element} XML storage element.
       * @this Blockly.Block
       */
      mutationToDom: function() {
  
        if (!this.robotVar_ && 
            !Object.values(this.exVars_)
                   .map( o => o.status)
                   .some(Boolean)) {
          return null;
        }
        let container = document.createElement('mutation');
        container.setAttribute(__ROBOTVAR, this.robotVar_);
        // map extensions
        Object.values(this.exVars_)
              .forEach( entry => container.setAttribute(entry.var, entry.status) )
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
        Object.values(this.exVars_)
              .forEach( entry =>  entry.status = xmlElement.getAttribute(entry.var) === 'true' )
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
        // decompose active extensions
        Object.entries(this.exVars_)
              .filter( entry => entry[1].status )
              .forEach( entry => {
                let exVarBlock = workspace.newBlock(`${id}_${entry[0]}_opt`);
                exVarBlock.initSvg();
                connection.connect(exVarBlock.previousConnection);
                connection = exVarBlock.nextConnection;
              })
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
          if (clauseBlock.type in this.extVarOpts) {
            let exVar = this.exVars_[ this.extVarOpts[clauseBlock.type] ];
            if (!exVar.status) {
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
                if (this.getInput(value.varU)) {
                  this.removeInput(value.varU);
                }
              })

        //recreate
        Object.entries(this.exVars_)
              .filter(entry => entry[1].status)
              .filter(entry => typeof entry[1].blockCreateFunction === 'function')
              .forEach(entry => entry[1].blockCreateFunction(this));
        Object.entries(this.exVars_)
              .filter(entry => entry[1].status)
              .filter(entry => entry[1].appendFunction ||
                               typeof entry[1].blockFieldFunction === 'function')
              .forEach(entry => {
                let input = this[entry[1].appendFunction || 'appendDummyInput'](entry[1].varDummy);
                if (entry[1].align) {
                  input.setAlign(entry[1].align);
                };
                if (entry[1].checkType) {
                  input.setCheck(entry[1].checkType);
                }
                input.appendField(Blockly.Msg[`${id}_${entry[0]}_OPT_PRE_TITLE`.toUpperCase()]);
                if (typeof entry[1].blockFieldFunction === 'function') {
                  input.appendField(entry[1].blockFieldFunction(this), entry[1].varU);
                }
                input.appendField(Blockly.Msg[`${id}_${entry[0]}_OPT_POST_TITLE`.toUpperCase()]);
              });
        if (this.robotVar_) {
          this.appendDummyInput(__ROBOT_VAR_DUMMY)
              .appendField(Blockly.Msg.VECTOR_ROBOT_EX_VARIABLE_TITLE)
              .appendField(new Blockly.FieldVariable('robot'), __ROBOT_VAR_U);
        }
    
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
  
        Object.values(this.exVars_)
              .filter(v => this.getInput(v.varU))
              .forEach(v => { 
                extVariableConnection[v.varU] = this.getInput(v.varU).connection.targetConnection
              })
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
   * @param {*} id e.g., 'controls_vector_say_text_opt'
   */
  function _init(id, extensions={}) {
    const extVarOpts_ = Object.keys(extensions)
                               .reduce( (vars, ex) => {
                                 vars[`${id}_${ex}_opt`] = ex;
                                 return vars
                               }, {} ); 
    const blocks_ = __mutatorBlocks(id, extVarOpts_, extensions);
    const mutator_ = `${id}_mutator`;
    const mixin_ = `${mutator_.toUpperCase()}_MIXIN`;

    VectorUtils.initializeBlocks(...blocks_)

    Blockly.Constants.VectorUtils[mixin_] = __mixim(id, extVarOpts_, extensions);

    Blockly.Extensions.registerMutator(mutator_,
      Blockly.Constants.VectorUtils[mixin_], 
      null, //opt_helperFn
      [ 
        // potential optional extensions
        ...Object.keys(extVarOpts_),
        __RVEVAROPT
      ].filter(el => true)
    );
  }

  return {
    init: _init
  };

})();
