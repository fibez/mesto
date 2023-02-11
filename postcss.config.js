const autoprefixer = require('autoprefixer');
const cssnanoPlugin = require('cssnano');

module.exports = {
  plugons: [autoprefixer, cssnanoPlugin({ preset: 'default' })],
};
