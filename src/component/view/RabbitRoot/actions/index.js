export const RabbitRootViewActionTypes = {
  INIT_VIEW_TREE: 'INIT_VIEW_TREE' 
};

export const initViewTree = (rootEle) => {
  return {
    type: RabbitRootViewActionTypes.INIT_VIEW_TREE,
    rootEle: rootEle
  };
}; 
