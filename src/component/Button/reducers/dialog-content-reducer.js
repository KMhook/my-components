var i = 0;
const initState = {
  content: 123
};

const dialogContent = (state = initState, action) => {
  let count = 'count';
  switch (action.type) {
    case 'CHANGE_DIALOG_CONTENT': 
      count = count + (i ++);
      return {
        content: count
      };
    default:
      return state;
  }
}; 

export default dialogContent;
