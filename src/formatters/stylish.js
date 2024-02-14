import _ from 'lodash';

const indent = (depth, spaceCount = 4) => ' '.repeat(depth * spaceCount - 2);
const bracketIndent = (depth, spacesCount = 4) => ' '.repeat((depth * spacesCount) - 4);

const stringify = (data, depth = 1) => {
  if (!_.isObject(data)) {
    return String(data);
  }
  const result = Object.entries(data).map(([key, value]) => {
    const beginSpace = indent(depth + 1);
    return `${beginSpace}  ${key}: ${stringify(value, depth + 1)}`;
  });
  return ['{', ...result, `${indent(depth)}  }`].join('\n');
};

const stylish = (diff, depth = 1) => {
  const lines = diff.map((item) => {
    switch (item.type) {
      case 'nested':
        return `${indent(depth)}  ${item.key}: ${stringify(stylish(item.children, depth + 1), depth)}`;
      case 'removed':
        return `${indent(depth)}- ${item.key}: ${stringify(item.value, depth)}`;
      case 'added':
        return `${indent(depth)}+ ${item.key}: ${stringify(item.value, depth)}`;
      case 'unchanged':
        return `${indent(depth)}  ${item.key}: ${stringify(item.value, depth)}`;
      case 'updated':
        return `${indent(depth)}- ${item.key}: ${stringify(item.oldValue, depth)}\n${indent(depth)}+ ${item.key}: ${stringify(item.newValue, depth)}`;
      default:
        throw new Error(`Error! ${item.type} unknown format!`);
    }
  });
  return ['{', ...lines, `${bracketIndent(depth)}}`].join('\n');
};

export default stylish;
