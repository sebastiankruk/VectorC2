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

Blockly.Blocks['vector_behavior_turn_in_place'] = {
  init: function() {
    this.appendValueInput("angle")
        .setCheck("Angle")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Rotate")
        .appendField(new Blockly.FieldVariable("robot"), "robot_var")
        .appendField("by");
    this.appendValueInput("speed")
        .setCheck("Angle")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("angle at speed");
    this.appendValueInput("accel")
        .setCheck("Angle")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("with acceleration");
    this.appendValueInput("angle_tolerance")
        .setCheck("Angle")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("complete at toleration");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(new Blockly.FieldCheckbox("TRUE"), "is_absolute")
        .appendField("Angle is absolute");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Repeat attempts")
        .appendField(new Blockly.FieldNumber(0, 0, 10, 1), "num_retries")
        .appendField("times");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(30);
 this.setTooltip("Turn the robot around its current position.");
 this.setHelpUrl("https://developer.anki.com/vector/docs/generated/anki_vector.behavior.html#anki_vector.behavior.BehaviorComponent.turn_in_place");
  }
};

Blockly.Blocks['vector_set_eye_color'] = {
  init: function() {
    this.appendValueInput("color_rgb")
        .setCheck("Colour")
        .appendField("Set Vector")
        .appendField(new Blockly.FieldVariable("robot"), "robot_var")
        .appendField("eye color to");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(45);
 this.setTooltip("Set Vector’s eye color.");
 this.setHelpUrl("https://sdk-resources.anki.com/vector/docs/generated/anki_vector.behavior.html#anki_vector.behavior.BehaviorComponent.set_eye_color");
  }
};

Blockly.Blocks['vector_set_eye_color_hue_saturation'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Set Vector")
        .appendField(new Blockly.FieldVariable("robot"), "robot_var")
        .appendField("eye color with")
        .appendField("hue")
        .appendField(new Blockly.FieldAngle(90), "hue")
        .appendField("saturation")
        .appendField(new Blockly.FieldNumber(0, 0, 1, 0.01), "saturation");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(45);
 this.setTooltip("Set Vector’s eye color.");
 this.setHelpUrl("https://sdk-resources.anki.com/vector/docs/generated/anki_vector.behavior.html#anki_vector.behavior.BehaviorComponent.set_eye_color");
  }
};

Blockly.Blocks['vector_dock_with_cube'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Tell Vector")
        .appendField(new Blockly.FieldVariable("robot"), "robot_var")
        .appendField("to dock with cube");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(345);
 this.setTooltip("Tells Vector to dock with a light cube, optionally using a given approach angle and distance.");
 this.setHelpUrl("https://developer.anki.com/vector/docs/generated/anki_vector.behavior.html?highlight=sleep#anki_vector.behavior.BehaviorComponent.dock_with_cube");
  }
};

Blockly.Blocks['vector_set_head_angle'] = {
  init: function() {
    this.appendValueInput("angle")
        .setCheck("Angle")
        .appendField("Tell Vector")
        .appendField(new Blockly.FieldVariable("robot"), "robot_var")
        .appendField("to set head angle to");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(45);
 this.setTooltip("Tell Vector’s head to move to a given angle.");
 this.setHelpUrl("https://developer.anki.com/vector/docs/generated/anki_vector.behavior.html?highlight=sleep#anki_vector.behavior.BehaviorComponent.set_head_angle");
  }
};

Blockly.Blocks['vector_set_lift_height'] = {
  init: function() {
    this.appendValueInput("height")
        .setCheck("Number")
        .appendField("Tell Vector")
        .appendField(new Blockly.FieldVariable("robot"), "robot_var")
        .appendField("to set lift height to");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(45);
 this.setTooltip("Tell Vector’s lift to move to a given height.");
 this.setHelpUrl("https://developer.anki.com/vector/docs/generated/anki_vector.behavior.html?highlight=sleep#anki_vector.behavior.BehaviorComponent.set_lift_height");
  }
};
