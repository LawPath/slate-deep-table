"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _TablePosition = _interopRequireDefault(require("../TablePosition"));

var _moveSelection = _interopRequireDefault(require("./moveSelection"));

var _createCell = _interopRequireDefault(require("../createCell"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Insert a new column in current table
 *
 * @param {Object} opts
 * @param {Slate.Editor} editor
 * @param {Number} at
 * @return {Slate.Editor}
 */
function insertColumn(opts, editor, at) {
  var value = editor.value;
  var startBlock = value.startBlock;

  var pos = _TablePosition["default"].create(value, startBlock, opts);

  var table = pos.table;

  if (typeof at === "undefined") {
    at = pos.getColumnIndex() + 1;
  } // Insert the new cell


  editor.withoutNormalizing(function () {
    table.nodes.forEach(function (row) {
      var newCell = (0, _createCell["default"])(opts);
      editor.insertNodeByKey(row.key, at, newCell);
    });
  }); // Update the selection (not doing can break the undo)

  return (0, _moveSelection["default"])(opts, editor, pos.getColumnIndex() + 1, pos.getRowIndex());
}

var _default = insertColumn;
exports["default"] = _default;