var fs = require('fs');
var path = require("path");
var archiver = require('archiver');
var sdate = require('silly-datetime');

//拷贝任务
var copyTask = function (src, dst) {
  if (!fs.existsSync(src)) {
    console.log('源文件不存在!');
    return false;
  }
  var paths = fs.readdirSync(src);
  paths.forEach(function (path) {
    var _src = src + '/' + path,
      _dst = dst + '/' + path,
      readable, writable;
    var st = fs.statSync(_src);
    console.log(_dst);
    // 判断是否为文件
    if (st.isFile()) {
      //*.web.js不拷贝
      if (path.indexOf("web.js") < 0) {
        readable = fs.createReadStream(_src);
        writable = fs.createWriteStream(_dst);
        readable.pipe(writable);
      }
    }
    else if (st.isDirectory()) {
      if (!fs.existsSync(_dst)) {
        fs.mkdirSync(_dst);
      }
      return copyTask(_src, _dst);
    }
  });
  return true;
};

//删除任务
var removeTask = function (dir, cb) {

  var iterator = function (url, dirs) {
    var stat = fs.statSync(url);
    if (stat.isDirectory()) {
      dirs.unshift(url);//收集目录
      inner(url, dirs);
    } else if (stat.isFile()) {
      fs.unlinkSync(url);//直接删除文件
    }
  };

  var inner = function (path, dirs) {
    var arr = fs.readdirSync(path);
    for (var i = 0, el; el = arr[i++];) {
      iterator(path + "/" + el, dirs);
    }
  };

  cb = cb || function () {
  };
  var dirs = [];
  try {
    iterator(dir, dirs);
    for (var i = 0, el; el = dirs[i++];) {
      fs.rmdirSync(el);
    }
    cb()
  } catch (e) {
    //如果文件或目录本来就不存在，fs.statSync会报错，当成没有异常发生
    e.code === "ENOENT" ? cb() : cb(e);
  }
};

//压缩任务
var zipTask = function () {
  var output = fs.createWriteStream(zipFile);
  var archive = archiver('zip', {zlib: {level: 9}});

  output.on('close', function () {
    console.log('压缩完成!');
  });
  archive.on('error', function (err) {
    console.error('压缩失败!');
    console.error(err);
    removeTask(zipFile);
  });
  archive.pipe(output);
  archive.directory(dst, false);
  archive.finalize();
};

function mkdirsSync(dirname) {
  if (fs.existsSync(dirname)) {
    return true;
  } else {
    if (mkdirsSync(path.dirname(dirname))) {
      fs.mkdirSync(dirname);
      return true;
    }
  }
}

// 拷贝源文件目录
var src = "./dist";
var dst = "./output/publish";
// 获取日期
var dateString = sdate.format(new Date(), 'YYYYMMDD');
var zipFile = './output/bundle-' + dateString + '.zip';

//先删除publish目录，
// 之后进行拷贝，
// 最后进行压缩
removeTask(dst, () => {
  if (!fs.existsSync(dst)) {
    mkdirsSync(dst);
  }
  console.log('开始拷贝文件......');
  var result = copyTask(src, dst);
  if (!result) return;
  console.log('正在压缩文件......');
  zipTask();
});
