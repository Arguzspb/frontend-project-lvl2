import _ from 'lodash';

const buildDiff = (data1, data2) => {
  const keys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)));
  return keys.map((key) => {
    if (!_.has(data1, key)) {
      return { key, value: data2[key], type: 'added' };
    }
    if (!_.has(data2, key)) {
      return { key, value: data1[key], type: 'removed' };
    }
    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      return {
        key,
        children: buildDiff(data1[key], data2[key]),
        type: 'nested',
      };
    }
    if (_.isEqual(data1[key], data2[key])) {
      return { key, value: data1[key], type: 'unchanged' };
    }
    return {
      key,
      oldValue: data1[key],
      newValue: data2[key],
      type: 'updated',
    };
  });
};

export default buildDiff;
