import BaseObserver from "./base-observer.js";

class BaseView extends BaseObserver{
  constructor(parentId) {
    super();
    this.TAG = "BaseView: "
    this.parent = document.getElementById(parentId); 
    this.config = {};
    this._parseConfig()
  }

  _parseConfig() {
    var configKv = null;
    var self = this;
    var configString = this.parent.getAttribute('data-config');

    if(typeof configString === 'string') {
      configKv = configString.split(';');
      configKv.forEach(function(kvString) {
        var kv = kvString.split(':');
        if(kv.length === 2) {
          self.config[kv[0]] = kv[1];
        } else if(kv.length === 1) {
          self.config[kv[0]] = true;
        }
      });
    }
    console.log(this.TAG + "--_parseConfig-- End, config, " + JSON.stringify(self.config));
  }

  hasClass(element, className) {
    if(element.classList) {
      return element.classList.contains(className);
    } else {
      return !!element.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
    }
  }

  addClass(element, className) {
    if(element.classList) {
      element.classList.add(className)
    } else if(!this.hasClass(element, className)) {
      element.className += " " + className;
    }
  }

  removeClass(element, className) {
    if(element.classList) {
      element.classList.remove(className);
    } else if(this.hasClass(element, className)) {
      var reg = new RegExp("(\\s+|^)" + className + "(\\s+|$)");
      element.className = element.className.replace(reg, "");
    }
  }
}

export default BaseView;
