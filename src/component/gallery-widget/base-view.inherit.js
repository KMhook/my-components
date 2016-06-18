;(function() {
  BaseView = function() {
    BaseObserver.call(this);
  };

  BaseView.prototype = Object.assign(new BaseObserver(), {
  });

  BaseView.prototype.constructor = BaseView;

})();

