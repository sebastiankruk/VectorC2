Blockly.Blocks['vector_utils_distance_mm'] = {
  init: function() {
    this.appendValueInput("value")
        .setCheck("Number")
        .appendField("distance in mm");
    this.setOutput(true, "Distance");
    this.setColour(230);
 this.setTooltip("distance_mm");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['vector_utils_speed_mmps'] = {
  init: function() {
    this.appendValueInput("value")
        .setCheck("Number")
        .appendField("speed in mm/s");
    this.setOutput(true, "Speed");
    this.setColour(230);
 this.setTooltip("speed_mmps");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['vector_utils_degrees'] = {
  init: function() {
    this.appendValueInput("value")
        .setCheck("Number")
        .appendField("degrees");
    this.setOutput(true, "Angle");
    this.setColour(230);
 this.setTooltip("degrees");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['vector_utils_sleep'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Sleep for")
        .appendField(new Blockly.FieldNumber(5, 0, 120, 1), "sleep_var")
        .appendField("seconds");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(240);
 this.setTooltip("Will sleep/wait for given amount seconds");
 this.setHelpUrl("");
  }
};