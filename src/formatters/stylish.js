import _ from 'lodash';

const indent = (depth, spaceCount = 4) => ' '.repeat(depth * spaceCount - 2);
const bracketIndent = (depth, spacesCount = 4) => ' '.repeat((depth * spacesCount) - 4);

const stringify = (data, depth = 1) => {
  const iter = (currentValue, currentDepth) => {
    if (!_.isObject(currentValue)) {
      return String(currentValue);
    }
    const result = Object.entries(currentValue).map(([key, value]) => {
      const beginSpace = indent(currentDepth + 1);
      return `${beginSpace} ${key}: ${stringify(value, currentDepth + 1)}`;
    });
    return ['{', ...result, `${indent(depth)}  }`].join('\n');
  };
  return iter(data, 0);
};

const stylish = (diff, depth = 1) => {
  const lines = diff.map((item) => {
    switch (item.type) {
      case 'removed':
        return `${indent(depth)}- ${item.key}: ${stringify(item.value)}`;
      case 'added':
        return `${indent(depth)}+ ${item.key}: ${stringify(item.value)}`;
      case 'unchanged':
        return `${indent(depth)}  ${item.key}: ${stringify(item.value)}`;
      case 'updated':
        return `${indent(depth)}- ${item.key}: ${stringify(item.value1)}\n${indent(depth)}+ ${item.key}: ${stringify(item.value2)}`;
      default:
        throw new Error('fuck this shit!');
    }
  });
  return ['{', ...lines, `${bracketIndent(depth)}}`].join('\n');
};
export default stylish;
