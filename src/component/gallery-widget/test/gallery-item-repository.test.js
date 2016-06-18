var assert = require('chai').assert;
require('../base-model.js');
require('../gallery-item-repository.inherit.js');

var testcase1 = require('./mockData/gallery-item-repository1.mock.js').testcase;
var testcase2 = require('./mockData/gallery-item-repository2.mock.js').testcase;

describe('GalleryItemRepository', function() {

  describe('#constructor()', function() {
    it('itemListLength=23, selectIndex=5', function() {
      var galleryItemRepository1 = new GalleryItemRepository(testcase1.items, testcase1.selectIndex);
      assert.equal(3, galleryItemRepository1.pageNum, 'page number is 3');
      assert.equal(5, galleryItemRepository1.currentSelectItemIndex, 'currentSelectItemIndex is 5');
      assert.equal(5, galleryItemRepository1.currentFocusItemIndex, 'currentFocusItemIndex is 5');
      assert.equal(0, galleryItemRepository1.currentSelectPageIndex, 'currentSelectPageIndex is 0');
      assert.equal(0, galleryItemRepository1.currentFocusPageIndex, 'currentFocusPageIndex is 0');
      assert.equal(2, galleryItemRepository1.queriedPages.length, 'queriedPages length is 2')
    });
  });

  describe('#nextFocusItemIndex()', function() {
    it('itemListLength=23, selectIndex=9', function() {
      var galleryItemRepository1 = new GalleryItemRepository(testcase1.items, 9);
      galleryItemRepository1.nextFocusItemIndex();
      assert.equal(10, galleryItemRepository1.currentFocusItemIndex, 'currentFocusItemIndex is 10');
      assert.equal(9, galleryItemRepository1.currentSelectItemIndex, 'currentSelectItemIndex is 9');
      assert.equal(1, galleryItemRepository1.currentFocusPageIndex, 'currentFocusPageIndex is 1');
      assert.equal(3, galleryItemRepository1.queriedPages.length, 'queriedPages length is 3');
    });
    it('itemListLength=23, selectIndex=22', function() {
      var galleryItemRepository1 = new GalleryItemRepository(testcase1.items, 22);
      galleryItemRepository1.nextFocusItemIndex();
      assert.equal(22, galleryItemRepository1.currentFocusItemIndex, 'currentFocusItemIndex is 22');
      assert.equal(22, galleryItemRepository1.currentSelectItemIndex, 'currentSelectItemIndex is 22');
      assert.equal(2, galleryItemRepository1.currentFocusPageIndex, 'currentFocusPageIndex is 2');
      assert.equal(2, galleryItemRepository1.queriedPages.length, 'queriedPages length is 2');
    });
  });

  describe('#prevFocusItemIndex()', function() {
    it('itemListLength=23, selectIndex=10', function() {
      var galleryItemRepository1 = new GalleryItemRepository(testcase1.items, 10);
      galleryItemRepository1.prevFocusItemIndex();
      assert.equal(9, galleryItemRepository1.currentFocusItemIndex, 'currentFocusItemIndex is 9');
      assert.equal(10, galleryItemRepository1.currentSelectItemIndex, 'currentSelectItemIndex is 10');
      assert.equal(0, galleryItemRepository1.currentFocusPageIndex, 'currentFocusPageIndex is 0');
      assert.equal(2, galleryItemRepository1.queriedPages.length, 'queriedPages length is 2');
    });
    it('itemListLength=23, selectIndex=0', function() {
      var galleryItemRepository1 = new GalleryItemRepository(testcase1.items, 0);
      galleryItemRepository1.prevFocusItemIndex();
      assert.equal(0, galleryItemRepository1.currentFocusItemIndex, 'currentFocusItemIndex is 0');
      assert.equal(0, galleryItemRepository1.currentSelectItemIndex, 'currentSelectItemIndex is 0');
      assert.equal(0, galleryItemRepository1.currentFocusPageIndex, 'currentFocusPageIndex is 0');
      assert.equal(2, galleryItemRepository1.queriedPages.length, 'queriedPages length is 2');
    });
  });

  describe('#setSelectItemIndex()', function() {
  });

  describe('#setFocusItemIndex()', function() {
    it('initstate:itemListLength=51,selectIndex=6; setFocusItemIndex(23)', function() {
      var galleryItemRepository1 = new GalleryItemRepository(testcase2.items, 6);
      galleryItemRepository1.setFocusItemIndex(23);
      assert.equal(23, galleryItemRepository1.currentFocusItemIndex, 'currentFocusItemIndex is 23');
      assert.equal(3, galleryItemRepository1.queriedPages.length, 'queriedPages length is 3');
      assert.sameMembers([10,11,12,13,14,15,16,17,18,19], galleryItemRepository1.queriedPages[0], 'queriedPages[0] is 10~19');
    })
  });
});

