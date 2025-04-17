module.exports = {
    presets: ['@babel/preset-react'],
    plugins: [
      process.env.NODE_ENV === 'production' && [
        'react-remove-properties',
        { properties: ['data-testid'] },
      ],
    ].filter(Boolean),
  };
  