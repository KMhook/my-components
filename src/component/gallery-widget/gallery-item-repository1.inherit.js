;'use strict';
(function() {
  //共有多少页
  var DEFAULT_MAX_PAGE_NUM = 3; 
  //每页的size
  var DEFAULT_PAGE_SIZE = 10;
  GalleryItemRepository = function(itemList, selectIndex) {
    BaseModel.call(this);

    this.TAG = 'GalleryItemRepository: ';

    this.itemList = itemList;
    this.itemListLength = this.itemList.length;

    this.pageNum =  null;//(tmpPageNum < DEFAULT_MAX_PAGE_NUM) ? tmpPageNum: DEFAULT_MAX_PAGE_NUM;
    this.pageList = [];
    this.queriedPages = null;
    this.pageSize = DEFAULT_PAGE_SIZE;
    this.currentFocusItemIndex = null;
    this.currentSelectItemIndex = null;
    this.currentFocusPageIndex = null;
    this.currentSelectPageIndex = null;



    this.renderData = null;

    if(selectIndex >= 0 && selectIndex < this.itemListLength) {
      //由于model在view之前初始化，因此第一次设置currentFocusItemIndex，view层收不到事件 
      this._set('currentFocusItemIndex', selectIndex || 0);
      this._set('currentSelectItemIndex', selectIndex || 0);
    } else {
      throw new Error(this.TAG + '--constructor-- invalid initial selected index');
    }

    this._paginate();
  };

  GalleryItemRepository.prototype = Object.assign(new BaseModel(), {
    /*
     * 对item分页
     */
    _paginate: function() {
      var tmpPageNum = Math.ceil(this.itemListLength / this.pageSize),
          i = 0,
          j = 0,
          pageStart = 0,
          pageEnd = 0,
          pageList = [];

      this._set('pageNum', tmpPageNum);
      for(; i < this.pageNum; i ++) {
        pageStart = i * this.pageSize;
        pageEnd = pageStart + this.pageSize;
        if(pageEnd > this.itemListLength) { 
          pageEnd = this.itemListLength;
        }
        this.pageList[i] = this.itemList.slice(pageStart, pageEnd);
      }

      this._set('currentSelectPageIndex', Math.floor(this.currentSelectItemIndex / this.pageSize));
      this._set('currentFocusPageIndex', Math.floor(this.currentSelectPageIndex));

      this._queryPages();
    },

    /*
     * 请求所需数目的item分页
     */
    _queryPages: function() {
      var currentFocusPageIndex = this._get('currentFocusPageIndex');
      var pageList = this._get('pageList');

      //找到请求item第一页的index
      var startPageIndex = Math.floor(currentFocusPageIndex - (DEFAULT_MAX_PAGE_NUM - 1) / 2); 
      if(startPageIndex < 0) {
        startPageIndex = 0;
      }

      var endPageIndex = Math.floor(currentFocusPageIndex + DEFAULT_MAX_PAGE_NUM / 2);
      if(endPageIndex >= pageList.length) {
        endPageIndex = pageList.length - 1;
      }

      var rawPageList = pageList.slice(startPageIndex, endPageIndex + 1);

      var i = 0;
      var queriedPages = [];

      for(; i < rawPageList.length; i ++) {
        queriedPages.push({
          pageIndex: startPageIndex + i, 
          items: rawPageList[i]
        });
      }

      this.queriedPages = queriedPages;
      //this.renderData.queriedPages = queriedPages;
      //this._set('queriedPages', queriedPages);
      //this._set('renderData', renderData);
    },

    /*
     * 根据当前focus的index去更新页列表的状态 
     */
    _updateFocusPageIndex: function() {
      var currentFocusItemIndex = this._get('currentFocusItemIndex');
      var currentFocusPageIndex = this._get('currentFocusPageIndex');

      var pageStartItemIndex = currentFocusPageIndex * this.pageSize;
      var pageEndItemIndex = pageStartItemIndex + this.pageList[currentFocusPageIndex].length - 1;

        console.log('--_updateFocusPageIndex-- currentFocusItemIndex' + currentFocusItemIndex);
      if(currentFocusItemIndex >= pageStartItemIndex && currentFocusItemIndex <= pageEndItemIndex) {
        return;
      } else {
        currentFocusPageIndex = Math.floor(currentFocusItemIndex / this.pageSize);

        this._set('currentFocusPageIndex', currentFocusPageIndex);
        /*
        if(currentFocusItemIndex < pageStartItemIndex) {
          this._set('currentFocusPageIndex', currentFocusPageIndex - 1);
        } else {
          this._set('currentFocusPageIndex', currentFocusPageIndex + 1);
        }
        */
        console.log('--_updateFocusPageIndex--' + currentFocusPageIndex);
        this._queryPages();
      }
    },
    /*
     * 联动的需求，主动设置index时，返回正常的focusindex和相应的页
     * @param {Number} index
     */
    _resetFocusItemIndex: function(index) {
      //此处不应触发watcher事件，
      this.currentFocusItemIndex = index;
      this._updateFocusPageIndex();
    },
    /*
     * 更新当前焦点index
     * @param {Number} index
     */
    updateFocusItemIndex: function(index) {
      this._set('currentFocusItemIndex', index);
      this._updateFocusPageIndex();
    },

    /*
     * 前一个焦点的index
     */
    prevFocusItemIndex: function() {
      var currentFocusItemIndex = this._get('currentFocusItemIndex');
      if(currentFocusItemIndex > 0) {
        currentFocusItemIndex --;
      } else {
        currentFocusItemIndex = 0;
      }
      this.updateFocusItemIndex(currentFocusItemIndex);
      var renderData = {
        currentSelectItemIndex: this.currentSelectItemIndex,
        currentFocusItemIndex: this.currentFocusItemIndex,
        queriedPages: this.queriedPages
      };
      this._set('renderData', renderData);
    },

    /*
     * 下一个焦点的index
     */
    nextFocusItemIndex: function() {
      var currentFocusItemIndex = this._get('currentFocusItemIndex');
      if(currentFocusItemIndex < this.itemListLength - 1) {
        currentFocusItemIndex ++;
      } else {
        currentFocusItemIndex = this.itemListLength - 1;
      }
      this.updateFocusItemIndex(currentFocusItemIndex);
      var renderData = {
        currentSelectItemIndex: this.currentSelectItemIndex,
        currentFocusItemIndex: this.currentFocusItemIndex,
        queriedPages: this.queriedPages
      };
      this._set('renderData', renderData);
    },
    setFocusItemIndex: function(index) {
      this._resetFocusItemIndex(index);
      var renderData = {
        currentSelectItemIndex: this.currentSelectItemIndex,
        currentFocusItemIndex: this.currentFocusItemIndex,
        queriedPages: this.queriedPages
      };
      this._set('renderData', renderData);

    },
    setSelectItemIndex: function(index) {
      this.currentSelectItemIndex = index;
      this._resetFocusItemIndex(index);
      var renderData = {
        currentSelectItemIndex: this.currentSelectItemIndex,
        currentFocusItemIndex: this.currentFocusItemIndex,
        queriedPages: this.queriedPages
      };
      console.log('--setSelectItemIndex--');
      console.log(renderData);
      this._set('renderData', renderData);
    },
    setSelectItemIndexSilent: function(index) {
      this.currentSelectItemIndex = index;
    }

  });
  GalleryItemRepository.prototype.constructor = GalleryItemRepository; 
})();

