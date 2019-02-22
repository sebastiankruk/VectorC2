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

Blockly.Blocks['vector_const_min_head_angle'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("MIN_HEAD_ANGLE");
    this.setOutput(true, "Angle");
    this.setColour(195);
 this.setTooltip("The minimum angle the robot’s head can be set to.");
 this.setHelpUrl("https://developer.anki.com/vector/docs/generated/anki_vector.behavior.html?highlight=sleep#anki_vector.behavior.MIN_HEAD_ANGLE");
  }
};

Blockly.Blocks['vector_const_max_head_angle'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("MAX_HEAD_ANGLE");
    this.setOutput(true, "Angle");
    this.setColour(195);
 this.setTooltip("The maximum angle the robot’s head can be set to");
 this.setHelpUrl("https://developer.anki.com/vector/docs/generated/anki_vector.behavior.html?highlight=sleep#anki_vector.behavior.MAX_HEAD_ANGLE");
  }
};

Blockly.Blocks['vector_const_max_lift_height'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("MAX_LIFT_HEIGHT");
    this.setOutput(true, "Number");
    this.setColour(195);
 this.setTooltip("The largest height-above-ground that lift can be moved to");
 this.setHelpUrl("https://developer.anki.com/vector/docs/generated/anki_vector.behavior.html?highlight=sleep#anki_vector.behavior.MAX_LIFT_HEIGHT");
  }
};

Blockly.Blocks['vector_const_min_lift_height'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("MIN_LIFT_HEIGHT ");
    this.setOutput(true, "Number");
    this.setColour(195);
 this.setTooltip("The lowest height-above-ground that lift can be moved to");
 this.setHelpUrl("https://developer.anki.com/vector/docs/generated/anki_vector.behavior.html?highlight=sleep#anki_vector.behavior.MIN_LIFT_HEIGHT");
  }
};

