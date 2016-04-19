var i = 0;
const initState = {
  text: 'Button'
};

const buttonContent = (state = initState, action) => {
  let count = 'count';
  switch (action.type) {
    case 'CLICK_BUTTON': 
      console.log('click');
      count = count + (i ++);
      return {
        text: 'click' + count
      };
    default:
      return state;
  }
}; 

export default buttonContent;
