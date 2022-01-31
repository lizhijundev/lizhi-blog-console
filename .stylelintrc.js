const HtmlExtensions = ['.vue', '.htm', '.html']

module.exports = {
  extends: ['stylelint-config-recess-order', 'stylelint-config-prettier'],
  overrides: [
    {
      files: HtmlExtensions.flatMap((ext) => [`*${ext}`, `**/*${ext}`]),
      customSyntax: 'postcss-html',
    },
    {
      files: ['*.js', '**/*.js'],
      customSyntax: 'postcss-jsx',
    },
    {
      files: ['**/*.scss'],
      customSyntax: 'postcss-scss',
    },
    {
      files: ['**/*.md'],
      customSyntax: 'postcss-markdown',
    },
  ],
}
