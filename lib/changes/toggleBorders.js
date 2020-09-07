import TablePosition from "../TablePosition";

/**
 * Toggles table headers on / off
 *
 * @param {Object} opts
 * @param {Slate.Editor} editor
 * @return {Slate.Editor}
 */
function toggleBorder(opts, editor) {
  const { value } = editor;
  const { startBlock } = value;

  const pos = TablePosition.create(value, startBlock, opts);
  const { table } = pos;

  const currentSetting = !!table.get("data").get("border");

  editor.setNodeByKey(table.key, {
    data: {
      border: !currentSetting,
    },
  });

  return editor;
}

export default toggleBorder;
