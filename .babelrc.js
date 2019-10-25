const presets = [
  [
    "@babel/env",
    {
      "useBuiltIns": "entry"
    },
  ],
];

const testPresets = [
  [
    "@babel/react",
  ],
];

module.exports = {
  presets,
  env: {
    test: {
      presets: testPresets,
    },
  },
};
