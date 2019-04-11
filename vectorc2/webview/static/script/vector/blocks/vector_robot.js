Blockly.defineBlocksWithJsonArray([{
  "type": "vector_robot_ex",
  "message0": "%{BKY_VECTOR_ROBOT_EX_MESSAGE}",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "wrapped_code"
    }
  ],
  "colour": 240,
  "tooltip": "%{BKY_VECTOR_ROBOT_EX_TOOLTIP}",
  "mutator": "controls_vector_robot_ex_mutator",
  "extensions": [], //["controls_vector_robot_vector_ext_variable", "controls_vector_robot_vector_ext_serial"],
  "helpUrl": ""
}])

Blockly.defineBlocksWithJsonArray([ // Mutator blocks. Do not extract.
  // Block representing robot variable
  {
    "type": "controls_vector_robot_vector_ext_variable",
    "message0": "%{BKY_VECTOR_ROBOT_EX_VARIABLE_TITLE}",
    "args0": [
      {
        "type": "field_variable",
        "name": "robot_var",
        "variable": "robot"
      }
    ],
    "nextStatement": null,
    "enableContextMenu": false,
    "colour": "240",
    "tooltip": "%{BKY_VECTOR_ROBOT_EX_VARIABLE_TOOLTIP}"
  },
  // Block representing robot serial number
  {
    "type": "controls_vector_robot_vector_ext_serial",
    "message0": "%{BKY_VECTOR_ROBOT_EX_SERIAL_TITLE}",
    "args0": [
      {
        "type": "input_value",
        "name": "serial_var",
        "check": "String"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "enableContextMenu": false,
    "colour": "240",
    "tooltip": "%{BKY_VECTOR_ROBOT_EX_SERIAL_TOOLTIP}"
  }
]);

/**
 * Mutator methods added to controls_if blocks.
 * @mixin
 * @augments Blockly.Block
 * @package
 * @readonly
 */
Blockly.Constants.VectorUtils.CONTROLS_VECTOR_ROBOT_EX_MUTATOR_MIXIN = {
  selectCount_: 0,

  /**
   * Create XML to represent the number of else-if and else inputs.
   * @return {Element} XML storage element.
   * @this Blockly.Block
   */
  mutationToDom: function() {

    if (!this.selectCount_) {
      return null;
    }
    var container = document.createElement('mutation');
    if (this.selectCount_) {
      container.setAttribute('selectRobot', this.selectCount_);
    }
    return container;
  },
  /**
   * Parse XML to restore the else-if and else inputs.
   * @param {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   */
  domToMutation: function(xmlElement) {
    this.selectCount_ = parseInt(xmlElement.getAttribute('selectRobot'), 10) || 0;
    this.rebuildShape_();
  },

  decompose: function(workspace) {
    var topBlock = Blockly.Block.obtain(workspace, 'controls_if_if');
    topBlock.initSvg();

    //TODO
    console.log("De-Composing");

    return topBlock;
  },

  compose: function(topBlock) {
    //TODO
    console.log("Composing");
  }



};

Blockly.Extensions.registerMutator('controls_vector_robot_ex_mutator',
    Blockly.Constants.VectorUtils.CONTROLS_VECTOR_ROBOT_EX_MUTATOR_MIXIN, 
    null, //opt_helperFn
    ['controls_vector_robot_vector_ext_variable', 'controls_vector_robot_vector_ext_serial']);




// --------
// Blockly.Constants.VectorUtils.controls_vector_robot_ex_mutator_MIXIN = {
//   selectCount_: 0,

//   /**
//    * Create XML to represent the number of else-if and else inputs.
//    * @return {Element} XML storage element.
//    * @this Blockly.Block
//    */
//   mutationToDom: function() {
//     if (!this.selectCount_) {
//       return null;
//     }
//     var container = document.createElement('mutation');
//     if (this.selectCount_) {
//       container.setAttribute('selectRobot', this.selectCount_);
//     }
//     return container;
//   },
//   /**
//    * Parse XML to restore the else-if and else inputs.
//    * @param {!Element} xmlElement XML storage element.
//    * @this Blockly.Block
//    */
//   domToMutation: function(xmlElement) {
//     this.selectCount_ = parseInt(xmlElement.getAttribute('selectRobot'), 10) || 0;
//     this.rebuildShape_();
//   },
//   /**
//    * Populate the mutator's dialog with this block's components.
//    * @param {!Blockly.Workspace} workspace Mutator's workspace.
//    * @return {!Blockly.Block} Root block in mutator.
//    * @this Blockly.Block
//    */
//   decompose: function(workspace) {
//     var containerBlock = workspace.newBlock('controls_vector_robot_vector_ext_variable');
//     containerBlock.initSvg();
//     var connection = containerBlock.nextConnection;
//     for (var i = 1; i <= this.selectCount_; i++) {
//       var selectBlock = workspace.newBlock('controls_vrobot_robot_select');
//       selectBlock.initSvg();
//       connection.connect(selectBlock.previousConnection);
//       connection = selectBlock.nextConnection;
//     }
//     return containerBlock;
//   },
//   /**
//    * Reconfigure this block based on the mutator dialog's components.
//    * @param {!Blockly.Block} containerBlock Root block in mutator.
//    * @this Blockly.Block
//    */
//   compose: function(containerBlock) {
//     var clauseBlock = containerBlock.nextConnection.targetBlock();
//     // Count number of inputs.
//     this.selectCount_ = 0;
//     var valueConnections = [null]; //TODO-remove ?
//     var statementConnections = [null]; //TODO-remove ?
//     var elseStatementConnection = null; //TODO-remove ?
//     while (clauseBlock) {
//       switch (clauseBlock.type) {
//         case 'controls_vrobot_robot_select':
//           this.selectCount_++;
//           valueConnections.push(clauseBlock.valueConnection_);
//           statementConnections.push(clauseBlock.statementConnection_);
//           break;
//         default:
//           throw TypeError('Unknown block type: ' + clauseBlock.type);
//       }
//       clauseBlock = clauseBlock.nextConnection &&
//           clauseBlock.nextConnection.targetBlock();
//     }
//     this.updateShape_();
//     // Reconnect any child blocks.
//     this.reconnectChildBlocks_(valueConnections, statementConnections,
//         elseStatementConnection);
//   },
//   /**
//    * Store pointers to any connected child blocks.
//    * @param {!Blockly.Block} containerBlock Root block in mutator.
//    * @this Blockly.Block
//    */
//   saveConnections: function(containerBlock) {
//     var clauseBlock = containerBlock.nextConnection.targetBlock();
//     var i = 1;
//     while (clauseBlock) {
//       switch (clauseBlock.type) {
//         case 'controls_if_elseif':
//           var inputIf = this.getInput('IF' + i);
//           var inputDo = this.getInput('DO' + i);
//           clauseBlock.valueConnection_ =
//               inputIf && inputIf.connection.targetConnection;
//           clauseBlock.statementConnection_ =
//               inputDo && inputDo.connection.targetConnection;
//           i++;
//           break;
//         case 'controls_if_else':
//           var inputDo = this.getInput('ELSE');
//           clauseBlock.statementConnection_ =
//               inputDo && inputDo.connection.targetConnection;
//           break;
//         default:
//           throw TypeError('Unknown block type: ' + clauseBlock.type);
//       }
//       clauseBlock = clauseBlock.nextConnection &&
//           clauseBlock.nextConnection.targetBlock();
//     }
//   },
//   /**
//    * Reconstructs the block with all child blocks attached.
//    */
//   rebuildShape_: function() {
//     var valueConnections = [null];
//     var statementConnections = [null];
//     var elseStatementConnection = null;

//     if (this.getInput('ELSE')) {
//       elseStatementConnection = this.getInput('ELSE').connection.targetConnection;
//     }
//     var i = 1;
//     while (this.getInput('IF' + i)) {
//       var inputIf = this.getInput('IF' + i);
//       var inputDo = this.getInput('DO' + i);
//       valueConnections.push(inputIf.connection.targetConnection);
//       statementConnections.push(inputDo.connection.targetConnection);
//       i++;
//     }
//     this.updateShape_();
//     this.reconnectChildBlocks_(valueConnections, statementConnections,
//         elseStatementConnection);
//   },
//   /**
//    * Modify this block to have the correct number of inputs.
//    * @this Blockly.Block
//    * @private
//    */
//   updateShape_: function() {
//     // Delete everything.
//     if (this.getInput('ELSE')) {
//       this.removeInput('ELSE');
//     }
//     var i = 1;
//     while (this.getInput('IF' + i)) {
//       this.removeInput('IF' + i);
//       this.removeInput('DO' + i);
//       i++;
//     }
//     // Rebuild block.
//     for (var i = 1; i <= this.elseifCount_; i++) {
//       this.appendValueInput('IF' + i)
//           .setCheck('Boolean')
//           .appendField(Blockly.Msg['CONTROLS_IF_MSG_ELSEIF']);
//       this.appendStatementInput('DO' + i)
//           .appendField(Blockly.Msg['CONTROLS_IF_MSG_THEN']);
//     }
//     if (this.elseCount_) {
//       this.appendStatementInput('ELSE')
//           .appendField(Blockly.Msg['CONTROLS_IF_MSG_ELSE']);
//     }
//   },
//   /**
//    * Reconnects child blocks.
//    * @param {!Array<?Blockly.RenderedConnection>} valueConnections List of value
//    * connectsions for if input.
//    * @param {!Array<?Blockly.RenderedConnection>} statementConnections List of
//    * statement connections for do input.
//    * @param {?Blockly.RenderedConnection} elseStatementConnection Statement
//    * connection for else input.
//    */
//   reconnectChildBlocks_: function(valueConnections, statementConnections,
//       elseStatementConnection) {
//     for (var i = 1; i <= this.elseifCount_; i++) {
//       Blockly.Mutator.reconnect(valueConnections[i], this, 'IF' + i);
//       Blockly.Mutator.reconnect(statementConnections[i], this, 'DO' + i);
//     }
//     Blockly.Mutator.reconnect(elseStatementConnection, this, 'ELSE');
//   }
// };



/**
 * "controls_if" extension function. Adds mutator, shape updating methods, and
 * dynamic tooltip to "controls_if" blocks.
 * @this Blockly.Block
 * @package
 */
Blockly.Constants.VectorUtils.CONTROLS_VROBOT_TOOLTIP_EXTENSION = function() {

  this.setTooltip(function() {
    if (!this.selectCount_) {
      return Blockly.Msg['BKY_VECTOR_ROBOT_EX_TOOLTIP'];
    // } else if (!this.elseifCount_ && this.elseCount_) {
    //   return Blockly.Msg['BKY_VECTOR_ROBOT_EX_ROBOT_TOOLTIP'];
    // } else if (this.elseifCount_ && !this.elseCount_) {
    //   return Blockly.Msg['CONTROLS_IF_TOOLTIP_3'];
    } else if (this.selectCount_) {
      return Blockly.Msg['BKY_VECTOR_ROBOT_EX_ROBOT_TOOLTIP'];
    }
    return '';
  }.bind(this));
};

Blockly.Extensions.register('controls_vrobot_tooltip',
    Blockly.Constants.VectorUtils.CONTROLS_VROBOT_TOOLTIP_EXTENSION);
