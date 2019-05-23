(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}(function () { 'use strict';

  var errorCatch = {
    init: function init(cb) {
      // img window.addEventListener('error', fn, true)
      // promise错误 window.addEventListener('unhandledrejection', fn, false)
      window.onerror = function (message, source, lineno, colno, error) {
        console.dir(error);
        var info = {
          message: error.message,
          type: error.name
        };
        var stack = error.stack;
        var matchUrl = stack.match(/http:\/\/[^\n]*/)[0];
        info.filename = matchUrl.match(/http:\/\/(?:\S*)\.js/)[0]; // console.log(matchUrl.match(/:(\d+):(\d+)/))
        // 行号

        info.lineno = lineno; // 列号

        info.colume = colno; // 上线时代码压缩 source-map 找到对应的真实的报错

        cb(info);
      };
    }
  };

  // 监控页面的性能 - 算时间差
  errorCatch.init(function (data) {
    console.log(data);
  });

}));
