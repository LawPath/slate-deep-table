import { Text, Block } from "slate";

/**
 * Create a new cell
 * @param {String} type
 * @param {String} text?
 * @return {Slate.Node}
 */
function createCell(opts, text) {
  text = text || "";
  const { typeCell, typeContent } = opts;

  return Block.create({
    type: typeCell,
    nodes: [
      Block.create({
        type: typeContent,
        nodes: [
          Text.fromJSON({
            object: "text",
            text,
          }),
        ],
      }),
    ],
  });
}

export default createCell;
