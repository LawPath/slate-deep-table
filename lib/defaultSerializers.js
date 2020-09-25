import React from "react";
const RADIO_INPUT_VALUE = "radioOptionsInput";

const getRadioVariableMark = (node) => {
  const radioVariableInputs = [];
  const firstNodeOfTheRow = node.nodes.size > 0 ? node.nodes.get(0) : null;
  if (firstNodeOfTheRow) {
    const texts = firstNodeOfTheRow.getTextsAsArray();
    texts.forEach((text) => {
      text.marks
        .filter((mark) => mark.type === "variable")
        .forEach((mark) => {
          const variableMarkData = mark.data.get("variable");
          if (variableMarkData && variableMarkData.type === RADIO_INPUT_VALUE) {
            radioVariableInputs.push(variableMarkData);
          }
        });
    });
  }
  return radioVariableInputs.length === 0 ? null : radioVariableInputs[0];
};

// default rules to pass to slate's html serializer (see tests)
const makeSerializerRules = (opts = {}) => {
  opts.typeTable = opts.typeTable || "table";
  opts.typeRow = opts.typeRow || "table_row";
  opts.typeCell = opts.typeCell || "table_cell";
  opts.typeContent = opts.typeContent || "paragraph";

  const TABLE_CHILD_TAGS = {
    tr: opts.typeRow,
    th: opts.typeCell,
    td: opts.typeCell,
    p: opts.paragraph,
  };

  return [
    {
      serialize(obj, children) {
        if (obj.object == "block") {
          switch (obj.type) {
            case opts.typeTable:
              const headers = !obj.data.get("headless");
              const rows = children;
              const split =
                !headers || !rows || !rows.size || rows.size === 1
                  ? { header: null, rows: rows }
                  : {
                      header: rows.get(0),
                      rows: rows.slice(1),
                    };

              return (
                <table className="doc-v3-table">
                  {headers && <thead>{split.header}</thead>}
                  <tbody>{split.rows}</tbody>
                </table>
              );
            case opts.typeRow:
              const radioVariable = getRadioVariableMark(obj);
              if (radioVariable) {
                return (
                  <tr type="condition" equals={radioVariable.value} id={radioVariable.name}>
                    {children}
                  </tr>
                );
              }
              return <tr>{children}</tr>;
            case opts.typeCell:
              return <td>{children}</td>;
            case opts.typeContent:
              return <p>{children}</p>;
            default:
              return;
          }
        }
        if (obj.object == "inline" && obj.type == "link") {
          return <a>{children}</a>;
        }
      },
      deserialize(el, next) {
        const tag = el.tagName.toLowerCase();

        if (tag === "table") {
          const data = { headless: true };

          if (el.firstElementChild && el.firstElementChild.tagName.toLowerCase() === "thead") {
            data.headless = false;
          }

          return {
            object: "block",
            type: opts.typeTable,
            data: data,
            nodes: next(el.childNodes),
          };
        }

        const type = TABLE_CHILD_TAGS[tag];
        if (type) {
          const filteredChildNodes = Array.from(el.childNodes).filter((item, index) => {
            return index !== 0 || (index === 0 && item.textContent.trim() !== "");
          });
          return {
            object: "block",
            type: type,
            data: {},
            nodes: next(filteredChildNodes),
          };
        }
      },
    },
  ];
};

export default makeSerializerRules;
