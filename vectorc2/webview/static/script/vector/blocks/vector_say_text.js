Blockly.Blocks['vector_say_text_simple'] = {
  init: function() {
    this.appendValueInput("text")
        .setCheck("String")
        .appendField("Vector")
        .appendField(new Blockly.FieldVariable("robot"), "robot_var")
        .appendField("say");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(150);
 this.setTooltip("Vector will say something");
 this.setHelpUrl("https://developer.anki.com/vector/docs/generated/anki_vector.robot.html#anki_vector.robot.Robot.say_text");
  }
};

Blockly.Blocks['vector_say_text'] = {
  init: function() {
    this.appendValueInput("text")
        .setCheck("String")
        .appendField("Vector")
        .appendField(new Blockly.FieldVariable("robot"), "robot_var")
        .appendField("say:");
    this.appendDummyInput()
        .appendField("with vector voice")
        .appendField(new Blockly.FieldCheckbox("TRUE"), "use_vector_voice");
    this.appendDummyInput()
        .appendField("at relative speed")
        .appendField(new Blockly.FieldNumber(1, 0.1, 2, 0.1), "duration_scalar");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(150);
 this.setTooltip("Vector will say something");
 this.setHelpUrl("https://developer.anki.com/vector/docs/generated/anki_vector.robot.html#anki_vector.robot.Robot.say_text");
  }
};