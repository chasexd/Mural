var fs = require('fs');
var Preferences = require('./preferences');
const electron = require('electron');
const path = require('path');
const USER_DATA_FOLDER = electron.app.getPath('userData');

function Storyboard() {
    this.filename = null;
    this.data = {};
    this.meta = {};
    this.nav = [];
    this.items = [];
};


function createNav(items) {
    const nav = [];

    items.forEach((item, id) => {
      const [mediaType] = Object.keys(item);
      let writeToNav = true;
      if (item[mediaType].suppress) {
        writeToNav = false;
      }

      const title = item[mediaType].nav_title;
      if (writeToNav) {
        nav.push({
            id,
            title
        });
      }
    });

    return nav;
}

Storyboard.prototype = {

    getFilename: function(cb) {
        var preferences = new Preferences();
        var self = this;
        // get filename from preferences file
        preferences.readFile(null, function(err, data) {
            if (err) {
                cb(err, null);
            }
            console.log("Reading from preferences file", data.storyboard);
            self.filename = data.storyboard;
            cb(null, path.join(USER_DATA_FOLDER, 'data', 'stories', data.storyboard));
        })
    },

    readFile: function (cb) {
        var self = this;
        self.getFilename(function (err, filename) {
            fs.readFile(filename, 'utf8', function (err, data) {
                if (!err) {
                    self.data = data;

                    const json = JSON.parse(data)
                    self.meta = json.meta;
                    self.items = json.items;
                    self.nav = json.nav;

                    console.log('Successfully read storyboard file.');
                    if (cb) {
                        cb(null, json);
                    }
                } else {
                    console.log('Error reading storyboard file.', err);
                    if (cb) {
                        cb(err, null);
                    }
                }
            });
        });
    },

    writeFile: function (data) {
        var self = this;

        const fileData = Object.assign({}, data, {nav: createNav(data.items)});
        const fileContents = JSON.stringify(fileData);

        self.getFilename(function (err, filename) {
            fs.writeFile(filename, fileContents, function (err) {
                if (err) {
                    console.log('Write Storyboard File Error: ' + err);
                } else {
                    console.log('Write Storyboard File Success');
                    self.data = data;
                }
            });
        });
    },

    deleteFile: function () {
        var self = this;
        self.getFilename(function (err, filename) {
            fs.unlink(filename, (err) => {
                if (err) {
                    console.log('Error deleting file' + filename);
                }
                console.log(filename +' was deleted');
            });
        });
    },

    getMeta: function () {
        return this.meta;
    },

    getItems: function () {
        return this.items;
    },

    getNav: function () {
        return this.nav;
    }
};

module.exports = Storyboard;
