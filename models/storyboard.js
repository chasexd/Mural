var fs = require('fs');

/**
 *  IMPORTANT:  THIS IS NOT USED CURRENTLY!!!!
 *
 */
function Storyboard(filename) {
    this.filename = filename;
    this.data = {};
    this.meta = {};
    this.items = {};
    // TODO: add any other class attributes we might need here
};

Storyboard.prototype = {
    readFile: function (filename) {
        fs.readFile(filename, 'utf8', function (err, data) {
            if (!err) {
                return data;
            }
        });
    },

    writeFile: function (filename, data) {
        fs.writeFile(filename, data, function (err) {
            if (err) {
                return console.log(err);
            }
        });
    },

    addMeta: function (meta) {
        this.meta = meta;

        return this;
    },

    getMeta: function () {
        return this.data;
    },

    addItems: function (item) {
    },

    getItems: function () {
        return this.data;
    }
};

module.exports = Storyboard;