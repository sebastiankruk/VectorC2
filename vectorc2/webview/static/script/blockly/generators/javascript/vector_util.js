Blockly.JavaScript['vector_utils_distance_mm'] = function(block) {
  var value_value = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);
  var code = `${value_value}/*mm*/`;
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['vector_utils_speed_mmps'] = function(block) {
  var value_value = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);
  var code = `${value_value}/*mm/s*/`;
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['vector_utils_degrees'] = function(block) {
  var value_value = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);
  var code = `${value_value}/*deg*/`;
  return [code, Blockly.JavaScript.ORDER_NONE];
};