"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _immutable = _interopRequireDefault(require("immutable"));

var _createCell = _interopRequireDefault(require("./createCell"));

var _slate = require("slate");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Create a new row block
 *
 * @param {Object} opts
 * @param {Number} columns
 * @param {Function} textGetter
 * @return {State.Block}
 */
function createRow(opts, columns, textGetter) {
  var cellNodes = _immutable["default"].Range(0, columns).map(function (i) {
    return (0, _createCell["default"])(opts, textGetter ? textGetter(i) : "");
  }).toList();

  return _slate.Block.create({
    type: opts.typeRow,
    nodes: cellNodes
  });
}

var _default = createRow;
exports["default"] = _default;