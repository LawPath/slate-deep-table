import createTable from "../createTable";
import { Block } from "slate";

/**
 * Insert a new table
 *
 * @param {Object} opts
 * @param {Slate.Editor} editor
 * @param {Number} columns
 * @param {Number} rows
 * @return {Slate.Editor}
 */
function insertTable(opts, editor, columns = 2, rows = 2) {
  const { value } = editor;

  if (!value.selection.start.key) return false;

  // Create the table node
  const fillWithEmptyText = (x, y) => "";
  const table = createTable(opts, columns, rows, fillWithEmptyText);

  // /* Start testing add new paragraph underneath the table */
  // const done = editor.insertBlock(table);
  // const tableParent = value.document.getParent(value.startBlock.key);
  // const tableIndex = tableParent.nodes.indexOf(table);
  // const textBlock = Block.create({
  //   object: "block",
  //   type: "paragraph",
  //   nodes: [{ object: "text", text: "" }],
  // });
  // editor.insertNodeByKey(tableParent.key, tableIndex, textBlock);
  // /* End testing add new paragraph underneath the table */

  editor.insertBlock(table);
  return done;
}

export default insertTable;
