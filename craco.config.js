const { transform } = require('@formatjs/ts-transformer')

module.exports = {
  babel: {
    plugins: [
      [
        'formatjs',
        {
          idInterpolationPattern: '[sha512:contenthash:base64:6]',
          ast: true
        }
      ]
    ]
  }
  // webpack: {
  //   configure: (config, { env, paths }) => {
  //     config.module.rules.unshift({
  //       test: /\.tsx?$/,
  //       use: [
  //         {
  //           loader: 'ts-loader',
  //           options: {
  //             getCustomTransformers () {
  //               return {
  //                 before: [
  //                   transform({
  //                     overrideIdFn: '[sha512:contenthash:base64:6]'
  //                   })
  //                 ]
  //               }
  //             }
  //           }
  //         }
  //       ]
  //     })
  //     return config
  //   }
  // }
}
