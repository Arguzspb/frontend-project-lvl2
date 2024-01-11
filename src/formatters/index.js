import stylishFormat from './stylish.js';

const getFormat = (data, formatName) => {
  switch (formatName) {
    case 'stylish':
      return stylishFormat(data);
    default:
      return `Error! ${formatName} is unknown format name!`;
  }
};

export default getFormat;
