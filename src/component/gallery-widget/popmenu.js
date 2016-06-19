;'use strict';
(function() {
  PopMenu = function() {
    var focusGalleryIndex = 0;
    var testcase = [
      {
        id: 'episode',
        title: '选集',
        items: [0,1,2,3,4,5],
        selectIndex: 3
      },
      {
        id: 'resolution',
        title: '清晰度',
        items: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
        selectIndex: 12
      },
      {
        id: 'scale',
        title: '画面比例',
        items: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50],
        selectIndex: 50
      }
    ];
    var i = 0;
    var $list = [];
    var size = testcase.length;
    var gallerys = [];

    for(i = 0; i < testcase.length; i ++) {
      var config = {
        bufferSize: 30,
        id: testcase[i].id,
        onGetView: function(item) {
          return '<span>' + 'hello' +  item + '</span>';
        },
        needPagination: true
      };
      gallerys[i] = {};
      gallerys[i].mGalleryItemRepository = new GalleryItemRepository(testcase[i].items, testcase[i].selectIndex);
      gallerys[i].mGalleryView = new GalleryView(gallerys[i].mGalleryItemRepository, $('#gallery-parent'), config);
      gallerys[i].mGalleryController = new GalleryController(gallerys[i].mGalleryItemRepository, gallerys[i].mGalleryView);
    }

    //var $focus = $('.gallery-root').eq(0);
    $('.gallery-root').eq(0).addClass('__focused');

   
    document.addEventListener('keydown', function(e) {
      if(e.keyCode == '38') {
        if(focusGalleryIndex > 0) {
          $('.gallery-root').eq(focusGalleryIndex).removeClass('__focused');
          focusGalleryIndex = focusGalleryIndex - 1;
          $('.gallery-root').eq(focusGalleryIndex).addClass('__focused');
        } else {
          focusGalleryIndex = 0;
        }
      } else if (e.keyCode == '40') {
        if(focusGalleryIndex < gallerys.length - 1) {
          $('.gallery-root').eq(focusGalleryIndex).removeClass('__focused');
          focusGalleryIndex = focusGalleryIndex + 1;
         $('.gallery-root').eq(focusGalleryIndex).addClass('__focused');
        } else {
          focusGalleryIndex = gallerys.length - 1;
        }
      } else if (e.keyCode == '37' || e.keyCode == '39') {
        gallerys[focusGalleryIndex].mGalleryView.keyEventHandler(e);
      }
    });
  };

  PopMenu.prototype = {

  };

  var popMenu = new PopMenu();
})();

