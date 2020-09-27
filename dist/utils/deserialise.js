"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deserialiseTbody = exports.deserialiseColgroup = exports.deserialiseTableCell = exports.getRadioVariableMark = exports.createParagraph = void 0;
var RADIO_INPUT_VALUE = "radioOptionsInput";
var VARIABLE_MARK = "variable";
var T_BODY = "tbody";
var NODE_TYPES = {
  "#text": 1,
  mark: 2
};

var createParagraph = function createParagraph(text) {
  var p = document.createElement("P");
  var t = document.createTextNode(text);
  p.appendChild(t);
  return p;
};

exports.createParagraph = createParagraph;

var getRadioVariableMark = function getRadioVariableMark(node) {
  var radioVariableInputs = [];
  var firstNodeOfTheRow = node.nodes.size > 0 ? node.nodes.get(0) : null;

  if (firstNodeOfTheRow) {
    var texts = firstNodeOfTheRow.getTextsAsArray();
    texts.forEach(function (text) {
      text.marks.filter(function (mark) {
        return mark.type === VARIABLE_MARK;
      }).forEach(function (mark) {
        var variableMarkData = mark.data.get(VARIABLE_MARK);

        if (variableMarkData && variableMarkData.type === RADIO_INPUT_VALUE) {
          radioVariableInputs.push(variableMarkData);
        }
      });
    });
  }

  return radioVariableInputs.length === 0 ? null : radioVariableInputs[0];
};
/**
 * Deserialise the table cell, from the html. it will filter out empty text
 * it will wrap texts and marks in to paragraph
 *
 *
 * @param {*} el
 */


exports.getRadioVariableMark = getRadioVariableMark;

var deserialiseTableCell = function deserialiseTableCell(el) {
  var childNodes = [];
  el.childNodes.forEach(function (node) {
    var nodeName = node.nodeName.toLowerCase();
    var nodeValue;

    if (NODE_TYPES[nodeName] === NODE_TYPES["#text"]) {
      /* Filter emtpty text node */
      if (node.textContent.trim() !== "") {
        nodeValue = createParagraph(node.textContent);
      }
      /* we do not add text of the text is empty */

    } else if (NODE_TYPES[nodeName] === NODE_TYPES.mark) {
      /* Create a text text paragraph to warp teh mark  */
      var p = createParagraph(node.textContent);
      p.appendChild(node);
      nodeValue = p;
    } else {
      nodeValue = node;
    }

    if (nodeValue) childNodes.push(nodeValue);
  });
  return childNodes;
};
/**
 * Deserialise the colgroup to get the col size of tables
 * @param {*} el
 */


exports.deserialiseTableCell = deserialiseTableCell;

var deserialiseColgroup = function deserialiseColgroup(el) {
  var colGroups = [];
  Array.from(el.childNodes).filter(function (node) {
    return node.nodeName.toLowerCase() === "colgroup";
  }).forEach(function (colgroup) {
    Array.from(colgroup.childNodes).filter(function (node) {
      return node.nodeName.toLowerCase() === "col";
    }).forEach(function (col) {
      if (col) {
        colGroups.push(col.getAttribute("width"));
      }
    });
  });
  return colGroups;
};

exports.deserialiseColgroup = deserialiseColgroup;

var deserialiseTbody = function deserialiseTbody(el) {
  var tbodyNodes = [];
  /* Filter empty text element in the tbody tag */

  Array.from(el.childNodes).filter(function (item) {
    return item.textContent.trim() !== "";
  })
  /* Filter out empty nodes */
  .forEach(function (node) {
    if (node.tagName.toLowerCase() === T_BODY) {
      /* Flter out empty nodes in tbody element */
      Array.prototype.push.apply(tbodyNodes, Array.from(node.childNodes).filter(function (item) {
        return item.textContent.trim() !== "";
      }));
    }
  });
  return tbodyNodes;
};

exports.deserialiseTbody = deserialiseTbody;