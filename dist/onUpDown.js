"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _TablePosition = _interopRequireDefault(require("./TablePosition"));

var _moveSelectionBy = _interopRequireDefault(require("./changes/moveSelectionBy"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function onUpDown(event, editor, opts) {
  var _editor = editor,
      value = _editor.value;
  var direction = event.key === "ArrowUp" ? -1 : +1;
  var startBlock = value.startBlock;

  var pos = _TablePosition["default"].create(value, startBlock, opts);

  if (pos.isFirstRow() && direction === -1 || pos.isLastRow() && direction === +1) {
    // Let the default behavior move out of the table
    return editor;
  } else {
    event.preventDefault();
    editor = (0, _moveSelectionBy["default"])(opts, editor, 0, event.key === "ArrowUp" ? -1 : +1);
    return editor;
  }
}

var _default = onUpDown;
exports["default"] = _default;