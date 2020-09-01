import Immutable from "immutable";
import createCell from "./createCell";
import { Block } from "slate";

/**
 * Create a new row block
 *
 * @param {Object} opts
 * @param {Number} columns
 * @param {Function} textGetter
 * @return {State.Block}
 */
function createRow(opts, columns, textGetter) {
  const cellNodes = Immutable.Range(0, columns)
    .map((i) => createCell(opts, textGetter ? textGetter(i) : ""))
    .toList();

  return Block.create({
    type: opts.typeRow,
    nodes: cellNodes,
  });
}

export default createRow;
