;'use strict';
(function() {
  GalleryItemModel = function() {
    BaseModel.call(this);
    this.content = null;
  };

  GalleryItemModel.prototype = Object.create(BaseModel, {
    constructor: GalleryItemModel,
    setContent: function() {
    }
  });
})();

