# study
my personal study

## gulp と ES6

gulp3.9からbebelを標準サポートしたことによりファイル名をgulpfile.bebel.jsとすればES6で書いたものが変換される

    npm install --save-dev babel-core

ただしimportは対応されていないので別途babel-preset-es2015と.babelrcが必要

    npm install --save-dev babel-preset-es2015

.babelrc

    {
      "presets": ["es2015"]
    }
