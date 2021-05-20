//To run: A:\DL\ytdl\node> node folder

var fs = require('fs');
var path = require('path');
var fromDir = "./contracts/levels"

// Loop through all the files in the directory
fs.readdir(fromDir, function (err, files) {
    if (err) {
        console.error("Could not list the directory.", err);
        process.exit(1);
    }

    files.forEach(function (file, index) {
        if (!file.includes("Factory") && file.includes(".sol")) { // console.log(file)

            const filePath = path.join(fromDir, file);
            const data = fs.readFileSync(filePath)
            const fd = fs.openSync(filePath, 'w+')
            const insert = new Buffer.from("// SPDX-License-Identifier: MIT\n")
            fs.writeSync(fd, insert, 0, insert.length, 0)
            fs.writeSync(fd, data, 0, data.length, insert.length)
            fs.close(fd, (err) => {
                if (err) throw err;
            });
        }
    });
});
    // if (file.match("Delegation.sol")) {