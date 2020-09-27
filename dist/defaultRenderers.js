"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/**
 * split rows into thead contens and body contents,
 * unless "headless" option is set
 */
var splitHeader = function splitHeader(props) {
  var rows = props.children;
  var header = !props.node.get("data").get("headless");
  var border = !props.node.get("data").get("border");
  return {
    header: null,
    rows: rows,
    border: border
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

      case opts.typeTable:
        var _splitHeader = splitHeader(props),
            header = _splitHeader.header,
            rows = _splitHeader.rows,
            border = _splitHeader.border;

        var colGroups = props.node.get("data").get("colGroups");
        return /*#__PURE__*/_react["default"].createElement("table", _extends({
          className: "doc-v3-table ".concat(border ? " border " : "null")
        }, props.attributes), colGroups ? /*#__PURE__*/_react["default"].createElement("colgroup", null, colGroups.map(function (col) {
          return /*#__PURE__*/_react["default"].createElement("col", {
            width: col
          });
        })) : null, header && /*#__PURE__*/_react["default"].createElement("thead", props.attributes, header), /*#__PURE__*/_react["default"].createElement("tbody", props.attributes, rows));

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