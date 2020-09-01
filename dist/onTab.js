"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _TablePosition = _interopRequireDefault(require("./TablePosition"));

var _moveSelectionBy = _interopRequireDefault(require("./changes/moveSelectionBy"));

var _insertRow = _interopRequireDefault(require("./changes/insertRow"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Select all text of current block.
 * @param {Slate.Editor} editor
 * @return {Slate.Editor}
 */
function selectAllText(editor) {
  var value = editor.value;
  var startBlock = value.startBlock;
  return editor.moveToRangeOfNode(startBlock);
}
/**
 * Pressing "Tab" moves the cursor to the next cell
 * and select the whole text
 */


function onTab(event, editor, opts) {
  var _editor = editor,
      value = _editor.value;
  event.preventDefault();
  var direction = event.shiftKey ? -1 : +1; // Create new row if needed

  var startBlock = value.startBlock;

  var pos = _TablePosition["default"].create(value, startBlock, opts);

  if (pos.isFirstCell() && direction === -1) {
    editor = (0, _insertRow["default"])(opts, editor, 0);
  } else if (pos.isLastCell() && direction === 1) {
    editor = (0, _insertRow["default"])(opts, editor);
  } // Move


  editor = (0, _moveSelectionBy["default"])(opts, editor, direction, 0); // Select all cell.

  return selectAllText(editor);
}

var _default = onTab;
exports["default"] = _default;