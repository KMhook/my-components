;'use strict';
(function() {
  GalleryController = function(model, view) {
    this.model = model;
    this.view = view;
    this.view.on('prev', this.prevFocusIndex.bind(this));
    this.view.on('next', this.nextFocusIndex.bind(this));
    this.view.on('selectSilent', this.setSelectIndex.bind(this));
    /*
    document.addEventListener('keydown', function() {
      this.view.prevFocus();
    }.bind(this));
    */
  };
  GalleryController.prototype = {
    prevFocusIndex: function() {
      this.model.prevFocusItemIndex();
    },
    nextFocusIndex: function() {
      this.model.nextFocusItemIndex();
    },
    setSelectIndex: function(index) {
      this.model.setSelectItemIndex(index);
    }
  };
})();

