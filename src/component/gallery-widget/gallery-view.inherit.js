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

  var PATCH_OP = {
    SHIFT: 'shift',
    POP: 'pop',
    UNSHIFT: 'unshift',
    PUSH: 'push' 
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
    this.id = config.id;
    this.domId = 'gallery-' + this.id;
    this.idSelector = '#' + this.domId;
    this.$wrap = $('<div class="gallery-wrap"></div>');
    this.$root = $('<div class="gallery-root" id=' + this.domId +  '></div>');
    this.$title = $('<div class="gallery-title">' + config.title + '</div>');


    this.rootWidth = 0;
    this.rootLeft = 0;
    this.rootOffset = 0;

    this.contentsWidth = [];
    this.contentsLeft = [];

    this.focusLeft = 0;

    this.parentWidth = 0;

    this.$focus = null;
    this.$select = null;

    this.repository = repository;
    this.config = config;

    this.onGetView = config.onGetView; //如何通过数据装配成element

    this.pages = [];
    this.contents = [];
    this.itemLength = 0;
    this._watchModel();
    this.action = 'unknown';


    this.globalFocusIndex = 0;
    this.localFocusIndex = 0;
    this.selectIndex = repository.currentSelectItemIndex;


    this.offset = 0;

    this.focusIndexExist = true;
    this._init();
  };

  GalleryView.prototype = Object.assign(new BaseView(), {
    _init: function() {
      this._initRecycleNodes();
      this._initContents();
      this._initStyle();
      this._initFocus();
    },
    /*
     * 监听model中成员的变化
     */
    _watchModel: function() {
      this.repository.watch('renderData', function(renderData) {
        //FIXME: 这里需要检查传入的index在当前所有page中是否已经存在，否则需要整体reset（说明是外部设置了index）
        this._reRender(renderData);
        //this._recalculateStyle();
        //this.setFocusIndex(renderData.currentFocusItemIndex);
        //this._updateContents(pages);
      }.bind(this));
    },
    keyEventHandler: function(keyCode) {
      switch(keyCode) {
        case 37:
          this.prevFocus();
          break;
        case 39:
          this.nextFocus();
          break;
        case 13:
          this.selectFocus();
          break;
        default: 
          break;
      }
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
      this.$wrap.append(this.$title);
      this.$wrap.append(this.$root);
      this.$parent.append(this.$wrap);
    },
    /*
     * 将初始的数据加入到gallery中
     */
    _initContents: function() {
      var i = 0, j = 0;
      this.contents = this.repository.queriedPages;
      this.itemLength = 0;
      for(;i < this.contents.length; i ++) {
        for(j = 0; j < this.contents[i].items.length; j ++) {
          var $container = this._reuseNode(this.onGetView(this.contents[i].items[j]));
          this.itemLength ++;
        }
      }
    },
    _initItemsStyle: function() {
      var i = 0;
      var left = 0;
      var list = $(this.idSelector + '>.__used');//this.$root.children();
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
      this._setFocusIndex(this.repository.currentFocusItemIndex);
    },
    _recoverNode: function($node) {
      $node.removeClass('__used').addClass('__unused');
      //this.recycleNodes.push($node);
    },
    _recoverNodes: function() {

    },
    _reuseNode: function(content) {
      var $list = $(this.idSelector+'>.__unused');
      var $node = $list.eq(0);
      $node.removeClass('__unused').addClass('__used').get(0).innerHTML = content;
      //$list.eq(0).removeClass('__u');
      return $node || null;//this.recycleNodes.shift().removeClass('__unused').addClass('__used').get(0).innerHTML = content || null;
    },
    _resetParentWidth: function() {
      //根据当前所有的元素计算宽度
      var i = 0;
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

      var offset = (parent_width - focus_width) / 2 - focus_left - this.rootLeft;

      return offset;
    },
    _recalculateItemStyle: function() {
      var i = 0;
      var left = 0;
      var list = $(this.idSelector+ '>.__used');//this.$root.children();
      var lastIndex = list.length - 1;
      var originFocusLeft = this.contentsLeft[this.localFocusIndex];
      var nextFocusLeft = 0;

      
      for(; i < list.length; i ++) {
        this.contentsLeft[i] = left;
        this.contentsWidth[i] = $(list[i]).width() + parseInt($(list[i]).css('margin-left'));
        left += $(list[i]).width() + parseInt($(list[i]).css('margin-left'));
      }

      nextFocusLeft = this.contentsLeft[this.localFocusIndex];

      //rootLeft在offset之前计算
      this.rootLeft = this.focusIndexExist? this.rootLeft - (nextFocusLeft - originFocusLeft) : 0; 
      this.offset = this.focusIndexExist ? 0 : this._getFocusCenterOffset();
      this.rootWidth = left;
    },
    /*
     * 综合offset，左右边界，计算出当前的left值
     */
    _recalculateRootStyle: function() {
      var offset = this.offset;
      var width = this.rootWidth;
      var left = this.rootLeft;
      if(left + offset < 0 && left + offset >= (0 - width)) {
        this.rootLeft = left + offset;
      } else if(left + offset > 0) {
        this.rootLeft = 0;
      } else if(left + offset < (0 - width)) {
        this.rootLeft = 0 - width;
      }
      //this.$root.data('left', left + offset);
      this.offset = 0;
    },
    _recalculateStyle: function() {
      //对每一个元素设置left
      this._recalculateItemStyle();
      this._recalculateRootStyle();
      this._reLayout();
    },
    _reLayout: function() {
      //var left = this.$root.data('left');
      this.$root.css({
        left: this.rootLeft + 'px',
        width: this.rootWidth
      });

      var i = 0;
      var list = $(this.idSelector + '>.__used');
      for(; i < list.length; i ++) {
        left = this.contentsLeft[i];//$(list[i]).data('left');
        $(list[i]).css({
          left: left + 'px',
          visibility: 'visible'
        });
      }

      list = $(this.idSelector + '>.__unused');
      for(i = 0; i < list.length; i ++) {
        $(list[i]).css('visibility', 'hidden');
      }
    },
    /*
     * 根据renderData生成节点信息
     */
    _reRender: function(renderData) {

      this.selectIndex = renderData.currentSelectItemIndex;
      this._setFocusIndex(renderData.currentFocusItemIndex);
      this._updateContents(renderData);
    },

    
    _diffContents: function(contents) {
      var i = 0, j = 0;
      var patch = {
        recover: [],
        reuse: []
      };
      var existFlag = false;
      //得到recover的patch list
      for(i = 0; i < this.contents.length; i ++) {
        for(j = 0; j < contents.length; j ++) {
          if(this.contents[i].pageIndex == contents[j].pageIndex) {
            existFlag = true;
          }
        }
        if(!existFlag) {
          if(this.contents[i].pageIndex < contents[0].pageIndex) {
            patch.recover.unshift({
              op: PATCH_OP.SHIFT,
              items: this.contents[i].items
            });
          } else {
            patch.recover.push({
              op: PATCH_OP.POP,
              items: this.contents[i].items
            })
          }
        }
        existFlag = false;
      }

      //得到reuse的patch list
      existFlag = false;
      for(i = 0; i < contents.length; i ++) {
        for(j = 0; j < this.contents.length; j ++) {
          if(contents[i].pageIndex == this.contents[j].pageIndex) {
            existFlag = true;
          }
        }

        if(!existFlag) {
          if(contents[i].pageIndex < this.contents[0].pageIndex) {
            patch.reuse.push({
              op: PATCH_OP.UNSHIFT,
              items: contents[i].items
            });
          } else {
            patch.reuse.unshift({
              op: PATCH_OP.PUSH,
              items: contents[i].items
            });
          }
        }
        existFlag = false;
      }

      return patch;
    },
    _isPatchEmpty: function(patch) {
      return (patch.recover.length == 0 &&  patch.reuse.length == 0) ? true: false;
    },

    _applyPatchToContents: function(patch) {
      var patchElement = null;
      var i = 0;
      var $NodeInUse = $(this.idSelector+'>.__used');
      var start = 0, end = $NodeInUse.length - 1;
      while(patch.recover.length) {
        patchElement = patch.recover.pop();
        for(i = 0; i < patchElement.items.length; i ++) {
          if(patchElement.op == PATCH_OP.POP) {
            this._recoverNode($NodeInUse.eq(end--));
            this.contentsLeft.pop();
            this.contentsWidth.pop();

          } else if (patchElement.op == PATCH_OP.SHIFT) {
            this._recoverNode($NodeInUse.eq(start++));
            this.contentsLeft.shift();
            this.contentsWidth.shift();
          }
          this.itemLength --;
        }
      }

      while(patch.reuse.length) {
        patchElement = patch.reuse.pop();
        if(patchElement.op == PATCH_OP.PUSH) {
          for(i = 0; i < patchElement.items.length; i ++) {
            var $container = this._reuseNode(this.onGetView(patchElement.items[i]));
            this.$root.append($container);
            this.contentsLeft.push(0);
            this.contentsWidth.push(0);
            this.itemLength ++;
          }
        } else if (patchElement.op == PATCH_OP.UNSHIFT) {
          for(i = patchElement.items.length - 1; i >= 0; i --) {
            var $container = this._reuseNode(this.onGetView(patchElement.items[i]));
            this.$root.prepend($container);
            this.contentsLeft.unshift(0);
            this.contentsWidth.unshift(0);
            this.itemLength ++;
          }
        }
        
      }
    },
    /*
     * 更新gallery中的内容
     * @param {Array} contents
     */
    //FIXME: 此处由view层判断action是prev或next，是否合理？
    _updateContents: function(renderData) {
      var i = 0, j = 0;
      var dirtyFlag = false;
      var contents = renderData.queriedPages;
      var currentFocusIndex = renderData.currentFocusItemIndex;
      var itemIndex = 0;
      var $itemsInUse = $(this.idSelector+'>.__used');


      var patch = this._diffContents(contents);
      //说明内容未变
      if(this._isPatchEmpty(patch)) {
        return false;
      }
      this._applyPatchToContents(patch);
      this.contents = contents;
      this._recalculateLocalFocusIndex(currentFocusIndex);
      this._recalculateLocalSelectIndex();
      this._recalculateStyle();

      return true;
    },
    /*
     * 焦点居中逻辑
     */
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
    selectFocus: function() {
      this.selectIndex = PAGE_SIZE * this.contents[0].pageIndex + this.localFocusIndex;
      this.trigger('selectSilent', this.selectIndex);
      var content = null;
      this.trigger('select', this.id, this.repository.itemList[this.selectIndex]);
    },
    _recalculateLocalFocusIndex: function(index) {
      this.localFocusIndex = index - PAGE_SIZE * (this.contents[0].pageIndex);
      this.$focus.removeClass('__focused');
      $(this.idSelector+'>.__used').eq(this.localFocusIndex).addClass('__focused');
    },
    _recalculateLocalSelectIndex: function() {
      this.localSelectIndex = this.selectIndex - PAGE_SIZE * (this.contents[0].pageIndex);
      this.$select.removeClass('__selected');
        console.log('--_recalculateLocalSelectIndex--' + this.localSelectIndex);
      if(this.localSelectIndex > 0 && this.localSelectIndex < this.itemLength) {
        $(this.idSelector+'>.__used').eq(this.localSelectIndex).addClass('__selected');
      }
    },
    _setFocusLater: function() {
      this.focusIndexExist = false;
    },
    /*
     * 根据策略设置焦点
     */
    _setFocus: function() {
      var $list = $(this.idSelector + '>.__used');
      if(this.$focus != null && this.$focus != $($list[this.localFocusIndex])) {
        this.$focus.removeClass('__focused');
      }
      this.$focus = $($list[this.localFocusIndex]);
      this.$focus.addClass('__focused');

      if(this.localSelectIndex >= 0 && this.localSelectIndex < this.itemLength) {
        this.$select && this.$select.removeClass('__selected');
        this.$select = $list.eq(this.localSelectIndex);
        //console.log('--_setFocus--' + this.id + ' ' + this.localSelectIndex);
        this.$select.addClass('__selected');
      }
      //TODO: 按照策略focus
      this._focusCenter();
    },
    /*
     * 设置gallery的focusIndex, contents可能还未更新
     * @param {Number} index
     */
    _setFocusIndex: function(index) {
      //确定全局index在当前显示列表中的位置
      this.localFocusIndex = index - PAGE_SIZE * (this.contents[0].pageIndex);
      this.localSelectIndex = this.selectIndex - PAGE_SIZE * (this.contents[0].pageIndex);
      
      //TODO: setFocusLater
      if(this.localFocusIndex < 0 || this.localFocusIndex >= this.itemLength) {
        this._setFocusLater();
        return;
      }
      this.focusIndexExist = true;
      this._setFocus();
    }
  });
  GalleryView.prototype.constructor = GalleryView;
})();

