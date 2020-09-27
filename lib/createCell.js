import { Text, Block } from "slate";

/**
 * Create a new cell
 * @param {String} type
 * @param {String} text?
 * @return {Slate.Node}
 */
export const createCell = (opts, text) => {
  text = text || "";
  const { typeCell, typeContent } = opts;
  const innerNode = Block.create({
    object: "block",
    type: typeContent,
    key: Date.now().toString(),
    nodes: [
      Text.fromJSON({
        object: "text",
        text,
      }),
    ],
  });
  const createCellBlock = Block.create({
    type: typeCell,
    key: Date.now().toString(),
    object: "block",
    nodes: [innerNode],
  });
  return createCellBlock;
};
export default createCell;
