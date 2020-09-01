"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _slate = require("slate");

/**
 * Create a new cell
 * @param {String} type
 * @param {String} text?
 * @return {Slate.Node}
 */
function createCell(opts, text) {
  text = text || "";
  var typeCell = opts.typeCell,
      typeContent = opts.typeContent;
  return _slate.Block.create({
    type: typeCell,
    nodes: [_slate.Block.create({
      type: typeContent,
      nodes: [_slate.Text.fromJSON({
        object: "text",
        text: text
      })]
    })]
  });
}

var _default = createCell;
exports["default"] = _default;