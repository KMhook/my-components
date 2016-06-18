;'use strict';
(function() {
  BaseObserver = function() {
    this._listeners = {};
  };

  BaseObserver.prototype = {
    one: function(event, callback) {
      var obj = {};
      if(Object.prototype.toString.call(this._listeners) === '[object Array]') {
        this._listeners[event] = [];
      }
      if(typeof callback === 'function') {
        obj.callback = callback;
        obj.times = 1;
        this._listeners[event].push(obj);
      }
    },

    on: function(event, callback) {
      var obj = {};
      if(!(this._listeners[event] instanceof Array)) {
        this._listeners[event] = [];
      }
      if(typeof callback === 'function') {
        obj.callback = callback;
        obj.times = 0;
        this._listeners[event].push(obj);
      }
    },
  
    off: function(event, callback) {
      if(this._listeners[event] instanceof Array) {
        if(typeof callback === 'function') {
          var index = this._listeners[event].findIndex(function(item) {
            if(item.callback === callback) {
              return true;
            }
          });
          if(index > -1) {
            this._listeners[event].splice(index, 1);
          }

        } else if(callback === undefined || callback === null) {
          this._listeners[event] = [];
        }
      }
    },

    trigger: function(event) {
      var args = [].slice.call(arguments, 1),
          self = this,
          onceArray = [];
      if(this._listeners[event] instanceof Array) {
        this._listeners[event].forEach(function(item, index) {
          if(typeof item.callback === 'function') {
            item.callback.apply(self, args);
          }
          if(item.times === 1) {
            onceArray.push(item.callback);
          }
        });

        if(onceArray.length > 0) {
          onceArray.forEach(function(callback) {
            self.off(event, callback);
          });
        }
      }
    }

  };
})();

