import yaml from 'js-yaml';

const parseData = (data, extention) => {
  switch (extention) {
    case 'json':
      return JSON.parse(data);
    case 'yml':
    case 'yaml':
      return yaml.load(data, 'utf8');
    default:
      throw new Error(`Error! ${extention} unknown format name!`);
  }
};

export default parseData;
