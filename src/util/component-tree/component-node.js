
const POSITION_REALTIME = 0;
const POSITION_CACHE = 1;

class CmptNode {
  static get POSITION_REALTIME() {
    return POSITION_REALTIME;
  }

  static get POSITION_CACHE() {
    return POSITION_CACHE;
  }

  constructor(obj) {
    this._transform = null;

    this._scrollX = 0;
  }
}
