import { Range } from "immutable";
import createRow from "./createRow";
import { Block } from "slate";

/**
 * Create a table
 *
 * @param {Object} opts
 * @param {Number} columns
 * @param {Number} rows
 * @param {Function} textGetter
 * @return {Slate.Block}
 */
function createTable(opts, columns, rows, textGetter) {
  const rowNodes = Range(0, rows)
    .map((i) => createRow(opts, columns, textGetter ? textGetter.bind(null, i) : null))
    .toList();

  return Block.create({
    type: opts.typeTable,
    nodes: rowNodes,
    key: Date.now().toString(),
    data: {},
  });
}

export default createTable;
