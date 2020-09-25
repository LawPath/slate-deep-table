"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _createTable = _interopRequireDefault(require("../createTable"));

var _slate = require("slate");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Insert a new table
 *
 * @param {Object} opts
 * @param {Slate.Editor} editor
 * @param {Number} columns
 * @param {Number} rows
 * @return {Slate.Editor}
 */
function insertTable(opts, editor) {
  var columns = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 2;
  var rows = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 2;
  var value = editor.value;
  if (!value.selection.start.key) return false; // Create the table node

  var fillWithEmptyText = function fillWithEmptyText(x, y) {
    return "";
  };

  var table = (0, _createTable["default"])(opts, columns, rows, fillWithEmptyText);
  var done = editor.insertBlock(table);
  return done;
}

var _default = insertTable;
exports["default"] = _default;