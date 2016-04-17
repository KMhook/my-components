var expect = require('chai').expect;
var assert = require('chai').assert;

import * as actions from '../../src/component/Dialog/actions';

describe('mocha tests', function() {

  it('test actions', function() {
    const expectedAction = {
      type: 'CHANGE_DIALOG_CONTENT'
    };

    assert.deepEqual(actions.changeDialogContent(), expectedAction);
  });
});


