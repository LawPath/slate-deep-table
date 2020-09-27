const RADIO_INPUT_VALUE = "radioOptionsInput";
const VARIABLE_MARK = "variable";
const T_BODY = "tbody";
const NODE_TYPES = {
  "#text": 1,
  mark: 2,
};

export const createParagraph = (text) => {
  const p = document.createElement("P");
  const t = document.createTextNode(text);
  p.appendChild(t);
  return p;
};

export const getRadioVariableMark = (node) => {
  const radioVariableInputs = [];
  const firstNodeOfTheRow = node.nodes.size > 0 ? node.nodes.get(0) : null;
  if (firstNodeOfTheRow) {
    const texts = firstNodeOfTheRow.getTextsAsArray();
    texts.forEach((text) => {
      text.marks
        .filter((mark) => mark.type === VARIABLE_MARK)
        .forEach((mark) => {
          const variableMarkData = mark.data.get(VARIABLE_MARK);
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
export const deserialiseTableCell = (el) => {
  const childNodes = [];
  el.childNodes.forEach((node) => {
    const nodeName = node.nodeName.toLowerCase();
    let nodeValue;

    if (NODE_TYPES[nodeName] === NODE_TYPES["#text"]) {
      /* Filter emtpty text node */
      if (node.textContent.trim() !== "") {
        nodeValue = createParagraph(node.textContent);
      }

      /* we do not add text of the text is empty */
    } else if (NODE_TYPES[nodeName] === NODE_TYPES.mark) {
      /* Create a text text paragraph to warp teh mark  */
      const p = createParagraph(node.textContent);
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
export const deserialiseColgroup = (el) => {
  const colGroups = [];

  Array.from(el.childNodes)
    .filter((node) => {
      return node.nodeName.toLowerCase() === "colgroup";
    })
    .forEach((colgroup) => {
      Array.from(colgroup.childNodes)
        .filter((node) => node.nodeName.toLowerCase() === "col")
        .forEach((col) => {
          if (col) {
            colGroups.push(col.getAttribute("width"));
          }
        });
    });
  return colGroups;
};

export const deserialiseTbody = (el) => {
  const tbodyNodes = [];

  /* Filter empty text element in the tbody tag */
  Array.from(el.childNodes)
    .filter((item) => {
      return item.textContent.trim() !== "";
    }) /* Filter out empty nodes */
    .forEach((node) => {
      if (node.tagName.toLowerCase() === T_BODY) {
        /* Flter out empty nodes in tbody element */
        Array.prototype.push.apply(
          tbodyNodes,
          Array.from(node.childNodes).filter((item) => item.textContent.trim() !== "")
        );
      }
    });
  return tbodyNodes;
};
