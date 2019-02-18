Blockly.Blocks['vector_behavior_drive_off_charger'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Drive")
        .appendField(new Blockly.FieldVariable("robot"), "robot_var")
        .appendField("off charger");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(345);
 this.setTooltip("Drive Vector off the charger");
 this.setHelpUrl("https://developer.anki.com/vector/docs/generated/anki_vector.behavior.html#anki_vector.behavior.BehaviorComponent.drive_off_charger");
  }
};

Blockly.Blocks['vector_behavior_drive_on_charger'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Drive")
        .appendField(new Blockly.FieldVariable("robot"), "robot_var")
        .appendField("on charger");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(345);
 this.setTooltip("Drive Vector onto the charger");
 this.setHelpUrl("https://developer.anki.com/vector/docs/generated/anki_vector.behavior.html#anki_vector.behavior.BehaviorComponent.drive_on_charger");
  }
};

Blockly.Blocks['vector_behavior_drive_straight'] = {
  init: function() {
    this.appendValueInput("distance")
        .setCheck("Distance")
        .appendField("Vector")
        .appendField(new Blockly.FieldVariable("robot"), "robot_var")
        .appendField("drives straight");
    this.appendValueInput("speed")
        .setCheck("Speed")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("at speed");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(new Blockly.FieldCheckbox("TRUE"), "should_play_anim")
        .appendField("and plays animation");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Repeat attempts")
        .appendField(new Blockly.FieldNumber(0, 0, 10, 1), "num_retries")
        .appendField("times");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(30);
 this.setTooltip("Tells Vector to drive in a straight line.");
 this.setHelpUrl("https://developer.anki.com/vector/docs/generated/anki_vector.behavior.html#anki_vector.behavior.BehaviorComponent.drive_straight");
  }
};