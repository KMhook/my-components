/*
 * focus finder
 *
 */
const FocusFinder = {
  findNextFocus: _findNextFocus,
  findNextFocusFromRect: _findNextFocusFromRect,
  getReverserDirection: _getReverseDirection
};

/**
 * find the next focused component under the parent view
 * @param {React.Component} parent    the parent component
 * @param {React.Component} focused   the current focused component
 * @param {Integer} direction   the searching direction
 * @return {React.Component}
 */
function _findNextFocus(parent, focused, direction) {
  if(focused === null) {
    console.warn('focused is null');
    return null;
  }

  var focusedRect = null;
  if (focused instanceof Rect) {
  } else {
    focusedRect = focused.rect();
  }
}

export default FocusFinder;
