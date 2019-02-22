Blockly.Python['vector_utils_distance_mm'] = function(block) {
  var value_value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_ATOMIC);
  var code = `distance_mm(${value_value})`;
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['vector_utils_speed_mmps'] = function(block) {
  var value_value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_ATOMIC);
  var code = `speed_mmps(${value_value})`;
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['vector_utils_degrees'] = function(block) {
  var value_value = Blockly.Python.valueToCode(block, 'value', Blockly.Python.ORDER_ATOMIC);
  var code = `degrees(${value_value})`;
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['vector_utils_sleep'] = function(block) {
  var number_sleep_var = block.getFieldValue('sleep_var');
  // TODO: Assemble Python into code variable.
  var code = `time.sleep(${number_sleep_var})\n`;
  return code;
};

Blockly.Python['vector_const_min_head_angle'] = function(block) {
  var code = 'anki_vector.behavior.MIN_HEAD_ANGLE';
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['vector_const_max_head_angle'] = function(block) {
  var code = 'anki_vector.behavior.MAX_HEAD_ANGLE';
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['vector_const_max_lift_height'] = function(block) {
  var code = '1.0';
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['vector_const_min_lift_height'] = function(block) {
  var code = '0.0';
  return [code, Blockly.Python.ORDER_NONE];
};