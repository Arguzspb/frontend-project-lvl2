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
          return `Property '${currentPath}' was updated. From ${checkValue(item.value1)} to ${checkValue(item.value2)}`;
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

// [
// {
//     key: 'common',
//     children: [
//       [Object], [Object],
//       [Object], [Object],
//       [Object], [Object],
//       [Object]
//     ],
//     type: 'nested'
//   },
//   {
//     key: 'group1',
//     children: [ [Object], [Object], [Object] ],
//     type: 'nested'
//   },
//   {
//     key: 'group2',
//     value: { abc: 12345, deep: [Object] },
//     type: 'removed'
//   },
//   {
//     key: 'group3',
//     value: { deep: [Object], fee: 100500 },
//     type: 'added'
//   }
// ]
export default plain;
