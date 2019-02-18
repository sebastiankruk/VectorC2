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