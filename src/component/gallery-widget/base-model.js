;'use strict';

(function() {
  BaseModel = function() {
    this._watchers = {};
  }

  BaseModel.prototype = {
    _set: function(key, value) {
      var self = this;
      if(this.hasOwnProperty(key) && this[key] !== 'function') {
        this[key] = value;
        if(self._watchers[key] instanceof Array) {
          self._watchers[key].forEach(function(watcher) {
            watcher.call(self, value);
          });
        }
        return;
      }
    },

    _get: function(key) {
      if(this.hasOwnProperty(key)) {
        return this[key];
      } else {
        return null;
      }
    },

    //observer functions
    watch: function(key, callback) {
      if(this.hasOwnProperty(key) && typeof this.key !== 'function') {
        if(!(this._watchers[key] instanceof Array)) {
          this._watchers[key] = [];
        } 
        this._watchers[key].push(callback);
      }
    },

    unwatch: function(key, callback) {
      if(this.hasOwnProperty(key) && typeof this.key !== 'function') {
        if(typeof callback === 'function' &&
           this._watchers[key] instanceof Array) {

          var index = this._watchers[key].indexOf(callback);
          if(index > -1) {
            this._watchers[key].splice(index, 1);
          }

        } else if(callback === undefined || callback === null) {
          this._watchers[key] = [];
        }
      }
    }
  }
})();
