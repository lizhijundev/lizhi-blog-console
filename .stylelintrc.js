module.exports = {
  extends: ['stylelint-config-recess-order', 'stylelint-config-prettier'],
  overrides: [
    {
      files: ['**/*.html', '**/*.vue'],
      customSyntax: 'postcss-html',
    },
    {
      files: ['**/*.js'],
      customSyntax: 'postcss-jsx',
    },
    {
      files: ['**/*.scss'],
      customSyntax: 'postcss-scss',
    },
  ],
}
