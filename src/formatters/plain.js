import _ from 'lodash';

const checkValue = (data) => {
  if (_.isObject(data)) {
    return '[complex value]';
  }
  if (typeof data === 'string') {
    return `'${data}'`;
  } return data;
};

const plain = (diff, path = '') => {
  const lines = diff
    .filter((node) => node.type !== 'unchanged')
    .map((item) => {
      const currentPath = path === '' ? item.key : `${path}.${item.key}`;
      switch (item.type) {
        case 'added':
          return `Property '${currentPath}' was added with value: ${checkValue(item.value)}`;
        case 'updated':
          return `Property '${currentPath}' was updated. From ${checkValue(item.oldValue)} to ${checkValue(item.newValue)}`;
        case 'removed':
          return `Property '${currentPath}' was removed`;
        case 'nested':
          return `${plain(item.children, currentPath)}`;
        default:
          throw new Error(`Error! ${item.type} unknown format!`);
      }
    });
  return [...lines].join('\n');
};

export default plain;
