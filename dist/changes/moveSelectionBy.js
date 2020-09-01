"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _TablePosition = _interopRequireDefault(require("../TablePosition"));

var _moveSelection = _interopRequireDefault(require("./moveSelection"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * Move selection by a {x,y} relative movement
 *
 * @param {Object} opts
 * @param {Slate.Editor} editor
 * @param {Number} x Move horizontally by x
 * @param {Number} y Move vertically by y
 * @return {Slate.Editor}
 */
function moveSelectionBy(opts, editor, x, y) {
  var value = editor.value;
  var startBlock = value.startBlock;

  if (!_TablePosition["default"].isInCell(value, startBlock, opts)) {
    throw new Error("moveSelectionBy can only be applied in a cell");
  }

  var pos = _TablePosition["default"].create(value, startBlock, opts);

  var rowIndex = pos.getRowIndex();
  var colIndex = pos.getColumnIndex();
  var width = pos.getWidth();
  var height = pos.getHeight();

  var _normPos = normPos(x + colIndex, y + rowIndex, width, height),
      _normPos2 = _slicedToArray(_normPos, 2),
      absX = _normPos2[0],
      absY = _normPos2[1];

  if (absX === -1) {
    // Out of table
    return editor;
  }

  return (0, _moveSelection["default"])(opts, editor, absX, absY);
}
/**
 * Normalize position in a table. If x is out of the row, update y accordingly
 * @param {Number} x
 * @param {Number} y
 * @param {Number} width
 * @param {Number} height
 * @return {Array<Number>} [-1, -1] if the new selection is out of table
 */


function normPos(x, y, width, height) {
  if (x < 0) {
    x = width - 1;
    y--;
  }

  if (y < 0) {
    return [-1, -1];
  }

  if (x >= width) {
    x = 0;
    y++;
  }

  if (y >= height) {
    return [-1, -1];
  }

  return [x, y];
}

var _default = moveSelectionBy;
exports["default"] = _default;