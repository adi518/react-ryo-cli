module.exports = {
  ...(process.env.NODE_ENV !== 'test' && {
    babel: {
      plugins: [
        [
          'prismjs',
          {
            languages: ['javascript', 'css', 'markup', 'diff'],
            plugins: [
              'autolinker',
              'line-numbers',
              'show-language',
              'copy-to-clipboard'
            ]
          }
        ]
      ]
    }
  })
};
