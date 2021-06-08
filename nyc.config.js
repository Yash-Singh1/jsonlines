const defaultExclude = require('@istanbuljs/schema/default-exclude');

module.exports = {
  exclude: ['spec/*.js'].concat(defaultExclude)
};
