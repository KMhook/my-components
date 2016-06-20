;'use strict';
(function() {
  var testcase = [
      {
        id: 'episode',
        title: '选集',
        content: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36],
        current: 8
      },
      {
        id: 'resolution',
        title: '清晰度',
        content: ['自动','流畅','清晰','高清','超清','4K'],
        current: 2
      },
      {
        id: 'ratio',
        title: '画面比例',
        content: ['原始比例', '全屏','16 : 9', '4 : 3'],
        current:2 
      },
      {
        id: 'skip',
        title: '跳过片头片尾',
        content: ['开启','关闭'],
        current: 0
      }

    ];
  Yuntv.PopMenu = function(parent, popMenuContents) {
    this.TAG = 'PopMenu: ';
    console.log(this.TAG + 'hello1');
    this.focusGalleryIndex = 0;
    this.contents = popMenuContents;
    this.gallerys = [];
    this.$parent = $(parent); 
    this.domId = 'gallery-parent';
    this.idSelector = '#gallery-parent';
    this.$root = $('<div id="gallery-parent"></div>');
    this.showing = false;
    this.closeTimer = null;

    this._init(popMenuContents);
    
  };

  Yuntv.PopMenu.prototype = {
    _init: function() {
      var i = 0;
      var contents = this.contents;

      this.$parent.append(this.$root);
      for(i = 0; i < contents.length; i ++) {
        var config = {
          bufferSize: 30,
          id: contents[i].id,
          title: contents[i].title,
          onGetView: function(item) {
            return '<span>' + item + '</span>';
          },
          needPagination: true
        };
        this.gallerys[i] = {};
        this.gallerys[i].mGalleryItemRepository = new GalleryItemRepository(contents[i].content, contents[i].current);
        this.gallerys[i].mGalleryView = new GalleryView(this.gallerys[i].mGalleryItemRepository, $('#gallery-parent'), config);
        this.gallerys[i].mGalleryController = new GalleryController(this.gallerys[i].mGalleryItemRepository, this.gallerys[i].mGalleryView);
      }

      //var $focus = $('.gallery-wrap').eq(0);
      $('.gallery-wrap').eq(0).addClass('__focused');

     
      /*
      document.addEventListener('keydown', function(e) {
        if(e.keyCode == '38') {
          if(this.focusGalleryIndex > 0) {
            $('.gallery-wrap').eq(this.focusGalleryIndex).removeClass('__focused');
            this.focusGalleryIndex = this.focusGalleryIndex - 1;
            $('.gallery-wrap').eq(this.focusGalleryIndex).addClass('__focused');
          } else {
            this.focusGalleryIndex = 0;
          }
        } else if (e.keyCode == '40') {
          if(this.focusGalleryIndex < this.gallerys.length - 1) {
            $('.gallery-wrap').eq(this.focusGalleryIndex).removeClass('__focused');
            this.focusGalleryIndex = this.focusGalleryIndex + 1;
           $('.gallery-wrap').eq(this.focusGalleryIndex).addClass('__focused');
          } else {
            this.focusGalleryIndex = this.gallerys.length - 1;
          }
        } else if (e.keyCode == '37' || e.keyCode == '39' || e.keyCode == '13') {
          this.gallerys[this.focusGalleryIndex].mGalleryView.keyEventHandler(e);
        } else if (e.keyCode == '27') {
          this.hide();
        } else if (e.keyCode == '48') {

          this.setSelected('episode', 28);
        }

        //this.setCloseTimer();
      }.bind(this));
      */

      //this.setCloseTimer();
    },
    setCloseTimer: function() {
      clearTimeout(this.closeTimer);
      this.closeTimer = setTimeout(function() {
        this.hide();
      }.bind(this), 10*1000);
    },
    show: function() {
      console.log(this.TAG + '--show--');
      $('#gallery-parent').css('visibility', 'visible');
      this.showing = true;
      this.setCloseTimer();
    },
    hide: function() {
      console.log(this.TAG + '--hide--');
      $('#gallery-parent').css('visibility', 'hidden');
      this.showing = false;
    },
    setSelected: function(id, index) {
      console.log('--setSelected-- ' +'id=' + id + 'index=' + index );
      var galleryIndex = 0;
      var i = 0;
      for(i = 0; i < this.contents.length; i ++) {
        if(id === this.contents.id) {
          galleryIndex = i;
          break;
        }
      }

      this.gallerys[galleryIndex].mGalleryController.setSelectIndex(index);
    },
    getShowing: function() {
      return this.showing;
    },
    keydownEventHandler: function(keyCode) {
      console.log(this.TAG + 'keydownEventHandler ' + keyCode);
        if(keyCode == '38') {
          if(this.focusGalleryIndex > 0) {
            $('.gallery-wrap').eq(this.focusGalleryIndex).removeClass('__focused');
            this.focusGalleryIndex = this.focusGalleryIndex - 1;
            $('.gallery-wrap').eq(this.focusGalleryIndex).addClass('__focused');
          } else {
            this.focusGalleryIndex = 0;
          }
        } else if (keyCode == '40') {
          if(this.focusGalleryIndex < this.gallerys.length - 1) {
            $('.gallery-wrap').eq(this.focusGalleryIndex).removeClass('__focused');
            this.focusGalleryIndex = this.focusGalleryIndex + 1;
           $('.gallery-wrap').eq(this.focusGalleryIndex).addClass('__focused');
          } else {
            this.focusGalleryIndex = this.gallerys.length - 1;
          }
        } else if (keyCode == '37' || keyCode == '39' || keyCode == '13') {
          console.log(this.TAG + ' keycode ' + keyCode);
          this.gallerys[this.focusGalleryIndex].mGalleryView.keyEventHandler(keyCode);
          if(keyCode == '13') {
            this.hide();
          }
        } else if (keyCode == '27') {
          this.hide();
        } else if (keyCode == '48') {
          this.setSelected('episode', 28);
        }
        this.setCloseTimer();
    },
    on: function(id, callback) {
      var i = 0;
      for(i = 0; i < this.gallerys.length; i ++) {
        this.gallerys[i].mGalleryView.on('select', callback);
      }
    }
  };

  console.log('PopMenu loaded');
  /*
  Yuntv = Yuntv || {};
  Yuntv.PopMenu = PopMenu;

  var popMenu = new PopMenu('body', testcase);
  popMenu.show();
  popMenu.on('select', function(id, item) {
    console.log('--select--' + id + ' ' + item);
  });
  */
})();

