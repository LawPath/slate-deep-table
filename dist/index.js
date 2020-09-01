"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _insertTable = _interopRequireDefault(require("./changes/insertTable"));

var _insertTableByKey = _interopRequireDefault(require("./changes/insertTableByKey"));

var _insertTableByPath = _interopRequireDefault(require("./changes/insertTableByPath"));

var _insertRow = _interopRequireDefault(require("./changes/insertRow"));

var _removeRow = _interopRequireDefault(require("./changes/removeRow"));

var _insertColumn = _interopRequireDefault(require("./changes/insertColumn"));

var _removeColumn = _interopRequireDefault(require("./changes/removeColumn"));

var _removeTable = _interopRequireDefault(require("./changes/removeTable"));

var _moveSelection = _interopRequireDefault(require("./changes/moveSelection"));

var _moveSelectionBy = _interopRequireDefault(require("./changes/moveSelectionBy"));

var _toggleHeaders = _interopRequireDefault(require("./changes/toggleHeaders"));

var _TablePosition = _interopRequireDefault(require("./TablePosition"));

var _onTab = _interopRequireDefault(require("./onTab"));

var _onUpDown = _interopRequireDefault(require("./onUpDown"));

var _makeSchema2 = _interopRequireDefault(require("./makeSchema"));

var _defaultRenderers = _interopRequireDefault(require("./defaultRenderers"));

var _defaultSerializers = _interopRequireDefault(require("./defaultSerializers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var KEY_TAB = "Tab";
var KEY_DOWN = "ArrowUp";
var KEY_UP = "ArrowDown";
/**
 * @param {String} opts.typeTable The type of table blocks
 * @param {String} opts.typeRow The type of row blocks
 * @param {String} opts.typeCell The type of cell blocks
 * @param {String} opts.typeContent The type of default content blocks
 */

function EditTable(opts) {
  opts = opts || {};
  opts.typeTable = opts.typeTable || "table";
  opts.typeRow = opts.typeRow || "table_row";
  opts.typeCell = opts.typeCell || "table_cell";
  opts.typeContent = opts.typeContent || "paragraph";
  /**
   * Is the selection in a table
   */

  function isSelectionInTable(editor) {
    var startBlock = editor.value.startBlock;
    if (!startBlock) return false;
    return _TablePosition["default"].isInCell(editor.value, startBlock, opts);
  }
  /**
   * Bind an editor command to our instance options as first arg
   */


  function bindEditor(fn) {
    return function (editor) {
      if (!isSelectionInTable(editor)) {
        return editor;
      }

      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      return fn.apply(void 0, _toConsumableArray([opts, editor].concat(args)));
    };
  }
  /**
   * User is pressing a key in the editor
   */


  function onKeyDown(event, editor, next) {
    // Only handle events in cells
    if (!isSelectionInTable(editor)) {
      return next();
    } // Build arguments list


    var args = [event, editor, opts];

    switch (event.key) {
      case KEY_TAB:
        return _onTab["default"].apply(void 0, args);

      case KEY_DOWN:
      case KEY_UP:
        return _onUpDown["default"].apply(void 0, args);
    }

    return next();
  }

  var _makeSchema = (0, _makeSchema2["default"])(opts),
      schema = _makeSchema.schema,
      normalizeNode = _makeSchema.normalizeNode;

  var renderBlock = (0, _defaultRenderers["default"])(opts);

  function getPosition(editor) {
    if (!_TablePosition["default"].isInCell(editor.value, editor.value.startBlock, opts)) {
      return null;
    }

    return _TablePosition["default"].create(editor.value, editor.value.startBlock, opts);
  }

  return {
    onKeyDown: onKeyDown,
    schema: schema,
    normalizeNode: normalizeNode,
    renderBlock: renderBlock,
    queries: {
      isSelectionInTable: isSelectionInTable,
      getTablePosition: getPosition
    },
    commands: {
      insertTable: _insertTable["default"].bind(null, opts),
      insertTableByKey: _insertTableByKey["default"].bind(null, opts),
      insertTableByPath: _insertTableByPath["default"].bind(null, opts),
      insertRow: bindEditor(_insertRow["default"]),
      removeRow: bindEditor(_removeRow["default"]),
      insertColumn: bindEditor(_insertColumn["default"]),
      removeColumn: bindEditor(_removeColumn["default"]),
      removeTable: bindEditor(_removeTable["default"]),
      moveTableSelection: bindEditor(_moveSelection["default"]),
      moveTableSelectionBy: bindEditor(_moveSelectionBy["default"]),
      toggleTableHeaders: bindEditor(_toggleHeaders["default"])
    }
  };
} // attach top-level function to create serializer rules


EditTable.makeSerializerRules = _defaultSerializers["default"];
var _default = EditTable;
exports["default"] = _default;