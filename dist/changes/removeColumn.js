"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _TablePosition = _interopRequireDefault(require("../TablePosition"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Delete current column in a table
 *
 * @param {Object} opts
 * @param {Slate.Editor} editor
 * @param {Number} at
 * @return {Slate.Editor}
 */
function removeColumn(opts, editor, at) {
  var value = editor.value;
  var startBlock = value.startBlock;

  var pos = _TablePosition["default"].create(value, startBlock, opts);

  var table = pos.table;

  if (typeof at === "undefined") {
    at = pos.getColumnIndex();
  }

  var rows = table.nodes; // Remove the cell from every row

  if (pos.getWidth() > 1) {
    editor.withoutNormalizing(function () {
      rows.forEach(function (row) {
        var cell = row.nodes.get(at);
        editor.removeNodeByKey(cell.key);
      });
    });
  } // If last column, clear text in cells instead
  else {
      editor.withoutNormalizing(function () {
        rows.forEach(function (row) {
          row.nodes.forEach(function (cell) {
            // remove all children of cells
            // the schema will create an empty child content block in each cell
            cell.nodes.forEach(function (node) {
              editor.removeNodeByKey(node.key);
            });
          });
        });
      });
    } // Replace the table


  return editor;
}

var _default = removeColumn;
exports["default"] = _default;