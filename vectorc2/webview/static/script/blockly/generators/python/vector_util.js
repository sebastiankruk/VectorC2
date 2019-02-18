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