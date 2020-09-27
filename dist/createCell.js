"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.createCell = void 0;

var _slate = require("slate");

/**
 * Create a new cell
 * @param {String} type
 * @param {String} text?
 * @return {Slate.Node}
 */
var createCell = function createCell(opts, text) {
  text = text || "";
  var typeCell = opts.typeCell,
      typeContent = opts.typeContent;

  var innerNode = _slate.Block.create({
    object: "block",
    type: typeContent,
    key: Date.now().toString(),
    nodes: [_slate.Text.fromJSON({
      object: "text",
      text: text
    })]
  });

  var createCellBlock = _slate.Block.create({
    type: typeCell,
    key: Date.now().toString(),
    object: "block",
    nodes: [innerNode]
  });

  return createCellBlock;
};

exports.createCell = createCell;
var _default = createCell;
exports["default"] = _default;