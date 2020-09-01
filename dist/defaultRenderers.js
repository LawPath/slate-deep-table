"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * split rows into thead contens and body contents,
 * unless "headless" option is set
 */
var splitHeader = function splitHeader(props) {
  var rows = props.children;
  var header = !props.node.get("data").get("headless");

  if (!header || !rows || !rows.length || rows.length === 1) {
    return {
      header: null,
      rows: rows
    };
  }

  return {
    header: rows[0],
    rows: rows.slice(1)
  };
};
/**
 * default renderers for easier use in your own schema
 * @param {Object} opts The same opts passed into plugin instance
 */


var makeRenderers = function makeRenderers() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return function (props, editor, next) {
    switch (props.node.type) {
      case "paragraph":
        return /*#__PURE__*/_react["default"].createElement("p", props.attributes, props.children);

      case "heading":
        return /*#__PURE__*/_react["default"].createElement("h1", props.attributes, props.children);

      case "subheading":
        return /*#__PURE__*/_react["default"].createElement("h2", props.attributes, props.children);

      case opts.typeTable:
        var _splitHeader = splitHeader(props),
            header = _splitHeader.header,
            rows = _splitHeader.rows;

        return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("h3", null, "This is the new build"), /*#__PURE__*/_react["default"].createElement("table", {
          className: "doc-v3-table"
        }, header && /*#__PURE__*/_react["default"].createElement("thead", props.attributes, header), /*#__PURE__*/_react["default"].createElement("tbody", props.attributes, rows)));

      case opts.typeRow:
        return /*#__PURE__*/_react["default"].createElement("tr", props.attributes, props.children);

      case opts.typeCell:
        return /*#__PURE__*/_react["default"].createElement("td", props.attributes, props.children);

      default:
        return next();
    }
  };
};

var _default = makeRenderers;
exports["default"] = _default;