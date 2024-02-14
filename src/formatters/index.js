import stylishFormat from './stylish.js';
import plainFormat from './plain.js';
import jsonFormat from './json.js';

const getFormat = (data, formatName) => {
  switch (formatName) {
    case 'stylish':
      return stylishFormat(data);
    case 'plain':
      return plainFormat(data);
    case 'json':
      return jsonFormat(data);
    default:
      return `Error! ${formatName} is unknown format name!`;
  }
};

export default getFormat;
