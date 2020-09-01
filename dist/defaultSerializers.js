"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// default rules to pass to slate's html serializer (see tests)
var makeSerializerRules = function makeSerializerRules() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  opts.typeTable = opts.typeTable || "table";
  opts.typeRow = opts.typeRow || "table_row";
  opts.typeCell = opts.typeCell || "table_cell";
  opts.typeContent = opts.typeContent || "paragraph";
  var TABLE_CHILD_TAGS = {
    tr: opts.typeRow,
    th: opts.typeCell,
    td: opts.typeCell
  };
  return [{
    serialize: function serialize(obj, children) {
      if (obj.object == "block") {
        switch (obj.type) {
          case opts.typeTable:
            var headers = !obj.data.get("headless");
            var rows = children;
            var split = !headers || !rows || !rows.size || rows.size === 1 ? {
              header: null,
              rows: rows
            } : {
              header: rows.get(0),
              rows: rows.slice(1)
            };
            return /*#__PURE__*/_react["default"].createElement("table", {
              className: "doc-v3-table"
            }, headers && /*#__PURE__*/_react["default"].createElement("thead", null, split.header), /*#__PURE__*/_react["default"].createElement("tbody", null, split.rows));

          case opts.typeRow:
            return /*#__PURE__*/_react["default"].createElement("tr", null, children);

          case opts.typeCell:
            return /*#__PURE__*/_react["default"].createElement("td", null, children);

          case opts.typeContent:
            return /*#__PURE__*/_react["default"].createElement("p", null, children);

          default:
            return;
        }
      }

      if (obj.object == "inline" && obj.type == "link") {
        return /*#__PURE__*/_react["default"].createElement("a", null, children);
      }
    },
    deserialize: function deserialize(el, next) {
      var tag = el.tagName.toLowerCase();

      if (tag === "table") {
        var data = {
          headless: true
        };

        if (el.firstElementChild && el.firstElementChild.tagName.toLowerCase() === "thead") {
          data.headless = false;
        }

        return {
          object: "block",
          type: opts.typeTable,
          data: data,
          nodes: next(el.childNodes)
        };
      }

      var type = TABLE_CHILD_TAGS[tag];

      if (type) {
        return {
          object: "block",
          type: type,
          data: {},
          nodes: next(el.childNodes)
        };
      }
    }
  }];
};

var _default = makeSerializerRules;
exports["default"] = _default;