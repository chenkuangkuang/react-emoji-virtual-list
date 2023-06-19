var fs = require("fs");

fs.mkdir("./dist/svg", function (err) {
  if (err) return console.log("mkdir err", err);
  fs.copyFile('./src/svg/CategoryNav.svg', './dist/static/CategoryNav.svg', function (err) {
    if (err) console.log('something wrong was happened:', err)
    else console.log('copy file succeed');
  });
})

