var i = 0;
const initState = {
  content: 123,
  buttons: [
    {
      id: 0,
      content: 'hello'
    },
    {
      id: 1,
      content: 'world'
    }
  ]
};

const dialogButtonList = (state = initState, action) => {
  let count = 'count';
  switch (action.type) {
    case 'CHANGE_DIALOG_CONTENT': 
      count = count + (i ++);
      return Object.assign({}, state, {
        content: count
      });
    default:
      return state;
  }
}; 

export default dialogButtonList;
