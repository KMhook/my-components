class Rect {
    constructor() {
        if (arguments.length !== 0) {
            this.set.apply(this, arguments);
        } else {
            this.left = 0;
            this.top = 0;
            this.right = 0;
            this.bottom = 0;
        }
    }
    toString() {
        return '[' + this.left + ',' + this.top + ',' + this.right + ',' + this.bottom + ']';
    }

    width() {
        return this.right - this.left;
    }
    height() {
        return this.bottom - this.top;
    }
    isEmpty() {
        return this.left >= this.right || this.top >= this.bottom;
    }
    setEmpty() {
        this.left = 0;
        this.right = 0;
        this.top = 0;
        this.bottom = 0;
    }
    set(left, top, right, bottom) {
        if (arguments.length == 1) {
            if (left instanceof Rect) {
                if (this === left) {
                    return this;
                }
            }
            bottom = left.bottom;
            right = left.right;
            top = left.top;
            left = left.left;
        }
        this.left = left || 0;
        this.top = top || 0;
        this.right = right || 0;
        this.bottom = bottom || 0;
        return this;
    }
    offset(dx, dy) {
        this.left += dx;
        this.top += dy;
        this.right += dx;
        this.bottom += dy;
        return this;
    }
    containsRect(r) {
        // check for empty first
        return this.left < this.right && this.top < this.bottom
            // now check for containment
            && this.left <= r.left && this.top <= r.top && this.right >= r.right && this.bottom >= r.bottom;
    }
    contains(left, top, right, bottom) {
        var _left = null;
        if (arguments.length == 1) {
            if (left instanceof Rect) {
                _left = left.left;
                top = left.top;
                right = left.right;
                bottom = left.bottom;
            } else {
                _left = left.left;
                top = left.top;
                right = left.right;
                bottom = left.bottom;
            }
        }
        // check for empty first
        return this.left < this.right && this.top < this.bottom
            // now check for containment
            && this.left <= _left && this.top <= top && this.right >= right && this.bottom >= bottom;
    }
    inset(dx, dy) {
        this.left += dx;
        this.top += dy;
        this.right -= dx;
        this.bottom -= dy;
    }
    centerX() {
        return (this.left + this.right) / 2;
    }
    centerY() {
        return (this.top + this.bottom) / 2;
    }
    center() {
        return {
            x: this.centerX(),
            y: this.centerY()
        };
    }

    clone() {
            return new Rect(this);
        }

    /**
     * 判断是否相同
     */
    equal(target) {
            return target && this.left == target.left && this.top == target.top && this.right == target.right && this.bottom == target.bottom;
        }

    /**
     * 获取交集区域
     */
    intersect(left, top, right, bottom) {
            var _left = null;
            if (arguments.length == 1) {
                if (left instanceof Rect) {
                    _left = left.left;
                    top = left.top;
                    right = left.right;
                    bottom = left.bottom;
                } else {
                    _left = left.left;
                    top = left.top;
                    right = left.right;
                    bottom = left.bottom;
                }
            }
            if (this.left < right && _left < this.right && this.top < bottom && top < this.bottom) {
                if (this.left < _left) {
                    this.left = _left;
                }
                if (this.top < top) {
                    this.top = top;
                }
                if (this.right > right) {
                    this.right = right;
                }
                if (this.bottom > bottom) {
                    this.bottom = bottom;
                }
                return true;
            }
            return false;
        }

    /**
     * 判断是否相交
     */
    intersects(left, top, right, bottom) {
        var _left = null;
        if (arguments.length == 1) {
            if (left instanceof Rect) {
                _left = left.left;
                top = left.top;
                right = left.right;
                bottom = left.bottom;
            } else {
                _left = left.left;
                top = left.top;
                right = left.right;
                bottom = left.bottom;
            }
        }
        return this.left < right && _left < this.right && this.top < bottom && top < this.bottom;
    }

    _setWidthHeight(width,height){
        var cX = this.centerX();
        var cY = this.centerY();
        this.left = cX - width / 2;
        this.top = cY - height / 2;
        this.right = this.left + width;
        this.bottom = this.top + height;
    }

    scale(sx,sy){
        this._setWidthHeight(this.width() * sx,this.height() * sy);
    }

    unScale(sx,sy){
        if(!sx || !sy || (sx == 1 && sy == 1)){
            return;
        }
        this._setWidthHeight(this.width() / sx,this.height() / sy);
    }

    //修改矩形大小.左上角位置不变,调整右边和下边
    resize(w,h){
        if(w || w === 0){
            this.right = this.left + w;
        }

        if(h || h === 0){
            this.height = this.top + h;
        }
    }
}

export default Rect;
