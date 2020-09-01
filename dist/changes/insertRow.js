"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _createRow = _interopRequireDefault(require("../createRow"));

var _TablePosition = _interopRequireDefault(require("../TablePosition"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Insert a new row in current table
 *
 * @param {Object} opts
 * @param {Slate.Editor} editor
 * @param {Number} at
 * @param {Function} textGetter
 * @return {Slate.Editor}
 */
function insertRow(opts, editor, at, textGetter) {
  var value = editor.value;
  var startBlock = value.startBlock;

  var pos = _TablePosition["default"].create(value, startBlock, opts);

  var table = pos.table; // Create a new row with the right count of cells

  var firstRow = table.nodes.get(0);
  var newRow = (0, _createRow["default"])(opts, firstRow.nodes.size, textGetter);

  if (typeof at === "undefined") {
    at = pos.getRowIndex() + 1;
  }

  return editor.insertNodeByKey(table.key, at, newRow).moveToEndOfNode(newRow.nodes.get(pos.getColumnIndex()));
}

var _default = insertRow;
exports["default"] = _default;