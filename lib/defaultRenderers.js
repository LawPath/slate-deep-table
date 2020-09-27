import React from "react";
/**
 * split rows into thead contens and body contents,
 * unless "headless" option is set
 */
const splitHeader = (props) => {
  const rows = props.children;
  const header = !props.node.get("data").get("headless");
  const border = !props.node.get("data").get("border");

  return { header: null, rows: rows, border: border };
};

/**
 * default renderers for easier use in your own schema
 * @param {Object} opts The same opts passed into plugin instance
 */
const makeRenderers = (opts = {}) => (props, editor, next) => {
  switch (props.node.type) {
    case "paragraph":
      return <p {...props.attributes}>{props.children}</p>;
    case opts.typeTable:
      const { header, rows, border } = splitHeader(props);
      const colGroups = props.node.get("data").get("colGroups");

      return (
        <table className={`doc-v3-table ${border ? " border " : "null"}`} {...props.attributes}>
          {colGroups ? (
            <colgroup>
              {colGroups.map((col) => (
                <col width={col} />
              ))}
            </colgroup>
          ) : null}
          {header && <thead {...props.attributes}>{header}</thead>}
          <tbody {...props.attributes}>{rows}</tbody>
        </table>
      );
    case opts.typeRow:
      return <tr {...props.attributes}>{props.children}</tr>;
    case opts.typeCell:
      return <td {...props.attributes}>{props.children}</td>;
    default:
      return next();
  }
};

export default makeRenderers;
