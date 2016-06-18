;'use strict';
(function() {

  var DEFAULT_BUFFER_SIZE = 50;
  var PAGE_SIZE = 10;

  var KEY_CODE = {
    KEY_ENTER: 13,
    KEY_ARROW_LEFT: 37, 
    KEY_ARROW_UP: 38,
    KEY_ARROW_RIGHT: 39,
    KEY_ARROW_DOWN: 40,
    KEY_ESCAPE: 27
  };

  /*
   * constructor
   * @param {Array} contents 
   * @param {Object} $parent
   * @param {Object} config
   */
  GalleryView = function(repository, $parent, config) {
    BaseView.call(this);
    this.$parent = $parent;
    this.$root = $('<div class="gallery-root"></div>');


    this.rootWidth = 0;
    this.rootLeft = 0;

    this.contentsWidth = [];
    this.contentsLeft = [];

    this.parentWidth = 0;

    this.$focus = null;
    this.$select = null;

    this.repository = repository;
    this.config = config;

    this.onGetView = config.onGetView; //如何通过数据装配成element

    this._watchModel();
    this._init();
    this.direction = null;

    this.globalFocusIndex = 0;
    this.localFocusIndex = 0;


    this.offset = 0;
  };

  GalleryView.prototype = Object.assign(new BaseView(), {
    _init: function() {
      this._initRecycleNodes();
      this._initContents();
      this._initStyle();
      this._initFocus();
      //this._recalculateStyle();
      //this._reLayout();
      this._reRender();
    },
    
    /*
     * 初始化所有可以复用的node，并加入到parent中
     */
    _initRecycleNodes: function() {
      var i = 0;
      for(; i < this.config.bufferSize; i ++) {
        var $item = $('<div class="gallery-item __unused"></div>');
        this.$root.append($item);
      }
      this.$parent.append(this.$root);
    },
    /*
     * 将初始的数据加入到gallery中
     */
    _initContents: function() {
      var i = 0, j = 0;
      this.contents = this.repository.queriedPages;
      for(;i < this.contents.length; i ++) {
        for(j = 0; j < this.contents[i].items.length; j ++) {
          var $container = this._reuseNode(this.onGetView(this.contents[i].items[j]));
          //$container.append(this.onGetView(this.contents[i].items[j]));
        }
      }
      //this.$parent.append(this.$root);
    },
    _initItemsStyle: function() {
      var i = 0;
      var left = 0;
      var list = $('.__used');//this.$root.children();
      for(; i < list.length; i ++) {
        this.contentsLeft[i] = left;
        this.contentsWidth[i] = $(list[i]).width() + parseInt($(list[i]).css('margin-left'));
        //$(list[i]).data('left', left);
        $(list[i]).css('left',left + 'px');
        left += $(list[i]).width() + parseInt($(list[i]).css('margin-left'));
      }
      this.rootWidth = left;
    },
    _initRootStyle: function() {
      this.$root.css('left', this.rootLeft);
      this.$root.css('width', this.rootWidth);
    },
    _initStyle: function() {
      this.parentWidth = this.$parent.width();
      this._initItemsStyle();
      this._initRootStyle();
    },

    _initFocus: function() {
      this.setFocusIndex(this.repository.currentFocusItemIndex);
    },
    _recoverNode: function($node) {
      $node.removeClass('__used').addClass('__unused');
      //this.recycleNodes.push($node);
    },
    _recoverNodes: function() {

    },
    _reuseNode: function(content) {
      var $list = $('.__unused');
      var $node = $list.eq(0);
      $node.removeClass('__unused').addClass('__used').get(0).innerHTML = content;
      //$list.eq(0).removeClass('__u');
      return $node || null;//this.recycleNodes.shift().removeClass('__unused').addClass('__used').get(0).innerHTML = content || null;
    },
    /*
     * 监听model中成员的变化
     */
    _watchModel: function() {
      this.repository.watch('currentFocusItemIndex', function(index) {
        this.setFocusIndex(index);
      }.bind(this));
      this.repository.watch('queriedPages', function(pages) {
        this._updateContents(pages);
      }.bind(this));
      /*
      this.repository.watch('renderData', function(renderData) {
        //FIXME: 这里需要检查传入的index在当前所有page中是否已经存在，否则需要整体reset（说明是外部设置了index）
        this.setFocusIndex(renderData.currentFocusItemIndex);
        this._updateContents(pages);
      });
      */
    },
    keyEventHandler: function(e) {
      if(e.type == 'keydown') {
        var keyCode = e.keyCode;
        switch(keyCode) {
          case 37:
            this.prevFocus();
            break;
          case 39:
            this.nextFocus();
            break;
          default: 
            break;
        }
      }
    },

    _resetParentWidth: function() {
      //根据当前所有的元素计算宽度
      var i = 0;
    },

    _removePageFromTail: function() {
      this._reRender();
    },
    _removePageFromFront: function() {
      this._reRender();
    },
    _appendPageToTail: function() {
      this._reRender();
    },
    _appendPageToFront: function() {
      this._reRender();
    },
    /*
     * 计算当前focus居中，$root的偏移量offset
     * @return {Number} offset
     */
    _getFocusCenterOffset: function() {
      var $parent = this.$parent,
          $root = this.$root,
          $focus = this.$focus,
          parent_width = this.parentWidth,
          root_width = this.rootWidth,
          focus_width = this.contentsWidth[this.localFocusIndex],//$focus.width(),
          focus_left = this.contentsLeft[this.localFocusIndex];

      if(root_width < parent_width) {
        return 0;
      }

      //居中函数
      var offset = (parent_width - focus_width) / 2 - focus_left - this.rootLeft;

      return offset;
    },
    _recalculateItemStyle: function() {
      var i = 0;
      var left = 0;
      var list = $('.__used');//this.$root.children();
      var lastIndex = list.length - 1;

      
      if(this.direction == 'next') {
        //this.offset = $(list[0]).data('left');
        this.offset = this.contentsLeft[0];
        for(; i < list.length; i ++) {
          //$(list[i]).data('left', left);
          //$(list[i]).css('left',left + 'px'); 
          //$(list[i]).data('width', $(list[i]).width() + parseInt($(list[i]).css('margin-left')));
          this.contentsLeft[i] = left;
          this.contentsWidth[i] = $(list[i]).width() + parseInt($(list[i]).css('margin-left'));
          left += $(list[i]).width() + parseInt($(list[i]).css('margin-left'));
        }
      } else if(this.direction == 'prev') {
        //this.offset = $(list[lastIndex]).data('left') + $(list[lastIndex]).width() + parseInt($(list[lastIndex]).css('margin-left'));
        this.offset = this.contentsLeft[lastIndex] + $(list[lastIndex]).width() + parseInt($(list[lastIndex]).css('margin-left'));
        for(; i < list.length; i ++) {
          //$(list[i]).data('left', left);
          //$(list[i]).css('left',left + 'px');
          //$(list[i]).data('width', $(list[i]).width() + parseInt($(list[i]).css('margin-left')));
          this.contentsLeft[i] = left; 
          this.contentsWidth[i] = $(list[i]).width() + parseInt($(list[i]).css('margin-left'));
          left += $(list[i]).width() + parseInt($(list[i]).css('margin-left'));
        }
        this.offset = this.offset - left; 
      }
      this.rootWidth = left;
    },
    /*
     * 综合offset，左右边界，计算出当前的left值
     */
    _recalculateRootStyle: function() {
      var offset = this.offset;
      var width = this.rootWidth;//this.$root.data('width');
      var left = this.rootLeft;//this.$root.data('left');


      if(left + offset > 0 || left + offset < (0 - width)) {
        return;
      } 

      //this.$root.data('left', left + offset);
      this.rootLeft = left + offset;
      this.offset = 0;
      /*
      this.$root.css({
        left: left + offset + 'px',
        width: width
      });
      */

      /*
      this.$root.css({
        transform: 'translateX('+offset+'px)',
        transition: 'transform 0.1s'
      });
      */
    },
    _recalculateStyle: function() {
      //对每一个元素设置left
      this._recalculateItemStyle();
      this._recalculateRootStyle();
      requestAnimationFrame(this._reLayout.bind(this));
    },
    _reLayout: function() {
      //var left = this.$root.data('left');
      this.$root.css({
        left: this.rootLeft + 'px',
        width: this.rootWidth
      });

      var i = 0;
      var list = $('.__used');
      for(; i < list.length; i ++) {
        left = this.contentsLeft[i];//$(list[i]).data('left');
        $(list[i]).css({
          left: left + 'px',
          visibility: 'visible'
        });
      }

      list = $('.__unused');
      for(i = 0; i < list.length; i ++) {
        $(list[i]).css('visibility', 'hidden');
      }
    },
    _reRender: function() {
      var i = 0, j = 0;
      var contentsLength = this.contents.length;
      var pageClassName = 'gallery-item-page';

      this._resetParentWidth(); 
    },

    
    /*
     * 更新gallery中的内容
     * @param {Array} contents
     */
    _updateContents: function(contents) {
      //TODO: 判断是否需要添加或者删除page
      var i = 0, j = 0;
      var dirtyFlag = false;
      var itemIndex = 0;
      var $itemsInUse = $('.__used');
      //FIXME: 此处假定所有数据都是按pageIndex顺序的
      //回收
      for(; i < this.contents.length; i ++) {
        for(j = 0; j < contents.length; j ++) {
          if(this.contents[i].pageIndex == contents[j].pageIndex) {
            dirtyFlag = true;
          }
        }
        //回收container
        if(!dirtyFlag) {
          var removeLength = this.contents[i].items.length;
          this.contentsWidth.splice(itemIndex, removeLength);
          this.contentsLeft.splice(itemIndex, removeLength);
          for(j = 0; j < removeLength; j ++) {
            this._recoverNode($itemsInUse.eq(itemIndex + j));
          }
        }
        itemIndex += this.contents[i].items.length;
        dirtyFlag = false;
      }
      //复用
      //prev时向前插入页
      if(this.direction == 'prev') {
        //说明已经到第一页，不用分配新的页面
        if(contents[0].pageIndex != this.contents[0].pageIndex) {
          for(i = contents[0].items.length - 1; i >= 0; i --) {
            var $container = this._reuseNode(this.onGetView(contents[0].items[i]));
            this.$root.prepend($container);
            //在更新数据的同时，更新缓存的left和width
            this.contentsLeft.unshift(0);
            this.contentsWidth.unshift(0);
          }
        }
      } else if(this.direction == 'next') {
        var last = contents.length - 1;
        var currentLast = this.contents.length - 1;
        //如果最后的pageIndex相同，说明已经到最后的页，不用再从recycleNodes中分配新的node了
        if(contents[last].pageIndex != this.contents[currentLast].pageIndex) {
          for(i = 0; i < contents[last].items.length; i ++) {
            var $container = this._reuseNode(this.onGetView(contents[last].items[i]));
            this.$root.append($container);
            this.contentsLeft.push(0);
            this.contentsWidth.push(0);
          }
        }
      } 
      this._recalculateStyle();
      this.contents = contents;
    },
    _focusCenter: function() {
      var offset = this._getFocusCenterOffset();
      this.offset = offset;
      this._recalculateRootStyle();
      this._reLayout();
    },
    prevFocus: function() {
      this.direction = 'prev';
      this.trigger('prev');
    },
    nextFocus: function() {
      this.direction = 'next';
      this.trigger('next');
    },
    /*
     * 设置gallery的focus
     * @param {Number} index
     */
    setFocusIndex: function(index) {
      var list = $('.__used');
      var i = 0, j = 0;

      //确定全局index在当前显示列表中的位置
      this.localFocusIndex = index - PAGE_SIZE * (this.contents[0].pageIndex);
      
      //如果跨页，延迟layout
      //如果index不在页面中，延迟recalculate

      if(this.$focus != null && this.$focus != $(list[this.localFocusIndex])) {
        this.$focus.removeClass('__focused');
      }
      this.$focus = $(list[this.localFocusIndex]);
      $(list[this.localFocusIndex]).addClass('__focused');
      this._focusCenter();
    }
  });
  GalleryView.prototype.constructor = GalleryView;
})();

