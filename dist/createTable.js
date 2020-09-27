"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _immutable = require("immutable");

var _createRow = _interopRequireDefault(require("./createRow"));

var _slate = require("slate");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Create a table
 *
 * @param {Object} opts
 * @param {Number} columns
 * @param {Number} rows
 * @param {Function} textGetter
 * @return {Slate.Block}
 */
function createTable(opts, columns, rows, textGetter) {
  var rowNodes = (0, _immutable.Range)(0, rows).map(function (i) {
    return (0, _createRow["default"])(opts, columns, textGetter ? textGetter.bind(null, i) : null);
  }).toList();
  return _slate.Block.create({
    type: opts.typeTable,
    nodes: rowNodes,
    key: Date.now().toString(),
    data: {}
  });
}

var _default = createTable;
exports["default"] = _default;