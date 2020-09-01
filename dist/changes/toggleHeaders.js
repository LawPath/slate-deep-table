"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _TablePosition = _interopRequireDefault(require("../TablePosition"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Toggles table headers on / off
 *
 * @param {Object} opts
 * @param {Slate.Editor} editor
 * @return {Slate.Editor}
 */
function toggleHeaders(opts, editor) {
  var value = editor.value;
  var startBlock = value.startBlock;

  var pos = _TablePosition["default"].create(value, startBlock, opts);

  var table = pos.table;
  var currentSetting = !!table.get("data").get("headless");
  editor.setNodeByKey(table.key, {
    data: {
      headless: !currentSetting
    }
  });
  return editor;
}

var _default = toggleHeaders;
exports["default"] = _default;