/*****************************************************************************
#=============================================================================
# Author: kuanmin.hkm - kuanmin.hkm@alibaba-inc.com
#
# Tel : 81168376
#
# Last modified: 2016-04-19 14:51
#
# Filename: focus-manager.js
#
# Description: manage the focus life cycle
#
#============================================================================
****************************************************************************/

class FocusManager {
  /**
   * Constructor of FocusManger
   * @param {React.Component} rootCmpt   the root component
   */
  constructor(rootCmpt) {
    this.root = rootCmpt;
    this._constructFocusableTree();
  }

  /**
   *
   *
  _constructFocusableTree() {
    this.root
  }
}

export default FocusManger;
