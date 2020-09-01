"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _createTable = _interopRequireDefault(require("../createTable"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Insert a new table by path, if index is left empty it defaults to 0
 *
 * @param {Object} opts
 * @param {Slate.Editor} editor
 * @param {List} path
 * @param {Number} index
 * @param {Number} columns
 * @param {Number} rows
 * @return {Slate.Editor}
 */
function insertTableByPath(opts, editor, path) {
  var index = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
  var columns = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 2;
  var rows = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 2;

  // Create the table node
  var fillWithEmptyText = function fillWithEmptyText(x, y) {
    return "";
  };

  var table = (0, _createTable["default"])(opts, columns, rows, fillWithEmptyText);
  var done = editor.insertNodeByPath(path, index, table);
  return done;
}

var _default = insertTableByPath;
exports["default"] = _default;