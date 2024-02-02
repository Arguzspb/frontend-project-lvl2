import stylishFormat from './stylish.js';
import plainFormat from './plain.js';

const getFormat = (data, formatName) => {
  switch (formatName) {
    case 'stylish':
      return stylishFormat(data);
    case 'plain':
      return plainFormat(data);
    default:
      return `Error! ${formatName} is unknown format name!`;
  }
};

export default getFormat;
