module.exports = {
  presets: [
    ['@babel/preset-env', { targets: 'defaults' }],
    '@babel/preset-react',
  ],
  plugins: [
    'inline-react-svg',
  ],
};
