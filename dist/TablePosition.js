"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _immutable = _interopRequireDefault(require("immutable"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var DEFAULTS = {
  // Block containr for the table
  table: null,
  // Block for current row
  row: null,
  // Block for current cell
  cell: null
};

var TablePosition = /*#__PURE__*/function (_Immutable$Record) {
  _inherits(TablePosition, _Immutable$Record);

  var _super = _createSuper(TablePosition);

  function TablePosition() {
    _classCallCheck(this, TablePosition);

    return _super.apply(this, arguments);
  }

  _createClass(TablePosition, [{
    key: "getWidth",

    /**
     * Get count of columns
     * @return {Number}
     */
    value: function getWidth() {
      var table = this.table;
      var rows = table.nodes;
      var cells = rows.get(0).nodes;
      return cells.size;
    }
    /**
     * Get count of rows
     * @return {Number}
     */

  }, {
    key: "getHeight",
    value: function getHeight() {
      var table = this.table;
      var rows = table.nodes;
      return rows.size;
    }
    /**
     * Get index of current row in the table.
     * @return {Number}
     */

  }, {
    key: "getRowIndex",
    value: function getRowIndex() {
      var table = this.table,
          row = this.row;
      var rows = table.nodes;
      return rows.findIndex(function (x) {
        return x === row;
      });
    }
    /**
     * Get index of current column in the row.
     * @return {Number}
     */

  }, {
    key: "getColumnIndex",
    value: function getColumnIndex() {
      var row = this.row,
          cell = this.cell;
      var cells = row.nodes;
      return cells.findIndex(function (x) {
        return x === cell;
      });
    }
    /**
     * @return {Boolean} True if on first cell of the table
     */

  }, {
    key: "isFirstCell",
    value: function isFirstCell() {
      return this.isFirstRow() && this.isFirstColumn();
    }
    /**
     * @return {Boolean} True if on last cell of the table
     */

  }, {
    key: "isLastCell",
    value: function isLastCell() {
      return this.isLastRow() && this.isLastColumn();
    }
    /**
     * @return {Boolean} True if on first row
     */

  }, {
    key: "isFirstRow",
    value: function isFirstRow() {
      return this.getRowIndex() === 0;
    }
    /**
     * @return {Boolean} True if on last row
     */

  }, {
    key: "isLastRow",
    value: function isLastRow() {
      return this.getRowIndex() === this.getHeight() - 1;
    }
    /**
     * @return {Boolean} True if on first column
     */

  }, {
    key: "isFirstColumn",
    value: function isFirstColumn() {
      return this.getColumnIndex() === 0;
    }
    /**
     * @return {Boolean} True if on last column
     */

  }, {
    key: "isLastColumn",
    value: function isLastColumn() {
      return this.getColumnIndex() === this.getWidth() - 1;
    }
    /**
     * Create a new instance of a TablePosition from a Slate value
     * and a current cell or node within a cell.
     *
     * @param  {Slate.Value} value
     * @param  {Slate.Block} startBlock
     * @param  {Object} opts
     * @return {TablePosition}
     */

  }], [{
    key: "create",
    value: function create(value, startBlock, opts) {
      var cell = value.document.getClosest(startBlock.key, function (p) {
        return p.type === opts.typeCell;
      });
      var row = value.document.getClosest(startBlock.key, function (p) {
        return p.type === opts.typeRow;
      });
      var table = value.document.getClosest(startBlock.key, function (p) {
        return p.type === opts.typeTable;
      });
      return new TablePosition({
        table: table,
        row: row,
        cell: cell
      });
    }
    /**
     * Check to see if current node is within a cell
     *
     * @param {Slate.Value} value
     * @param {Slate.Block} startBlock
     * @param {Object} opts
     * @return {Boolean}
     */

  }, {
    key: "isInCell",
    value: function isInCell(value, startBlock, opts) {
      return startBlock.type === opts.typeCell || value.document.getClosest(startBlock.key, function (p) {
        return p.type === opts.typeCell;
      }) ? true : false;
    }
  }]);

  return TablePosition;
}(_immutable["default"].Record(DEFAULTS));

var _default = TablePosition;
exports["default"] = _default;