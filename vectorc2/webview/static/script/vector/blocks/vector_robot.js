Blockly.Blocks['vector_robot'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Use Vector")
        .appendField(new Blockly.FieldVariable("robot"), "robot_var");
    this.appendValueInput("serial_var")
        .setCheck("String")
        .appendField("of (optional) serial");
    this.appendStatementInput("wrapped_code")
        .setCheck(null);
    this.setColour(240);
 this.setTooltip("Wrap all Vector calls around");
 this.setHelpUrl("");
  }
};