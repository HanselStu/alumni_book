module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
    // 为了解决element-ui按需引入报错问题 @babel/preset-env不能写es2015 另外需要npm i @babel/preset-env -D
    [ "@babel/preset-env", { "modules": false } ]
  ],
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}
