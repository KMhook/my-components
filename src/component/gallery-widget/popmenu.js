;'use strict';
(function() {
  PopMenu = function() {
    //var testcase = [0,1,2,3,4,5];
    var testcase = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50];
    var i = 0;
    var $list = [];
    console.log(testcase.length);
    var size = testcase.length;

    var config = {
      bufferSize: 30,
      onGetView: function(item) {
        return '<span>' + 'hello' +  item + '</span>';
      },
      needPagination: true
    };
    var mGalleryItemRepository = new GalleryItemRepository(testcase, 13);
    var mGalleryView = new GalleryView(mGalleryItemRepository, $('#gallery-parent'), config);
    var mGalleryController = new GalleryController(mGalleryItemRepository, mGalleryView);

    //mGalleryController.setSelectIndex(16);

    document.addEventListener('keydown', function(e) {
      mGalleryView.keyEventHandler(e);
    });
  };

  PopMenu.prototype = {

  };

  var popMenu = new PopMenu();
})();

