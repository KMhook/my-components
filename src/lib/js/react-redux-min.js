!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e(require("react"),require("redux")):"function"==typeof define&&define.amd?define(["react","redux"],e):"object"==typeof exports?exports.ReactRedux=e(require("react"),require("redux")):t.ReactRedux=e(t.React,t.Redux)}(this,function(t,e){return function(t){function e(o){if(r[o])return r[o].exports;var n=r[o]={exports:{},id:o,loaded:!1};return t[o].call(n.exports,n,n.exports,e),n.loaded=!0,n.exports}var r={};return e.m=t,e.c=r,e.p="",e(0)}([function(t,e,r){"use strict";function o(t){return t&&t.__esModule?t:{"default":t}}e.__esModule=!0,e.connect=e.Provider=void 0;var n=r(3),s=o(n),i=r(4),a=o(i);e.Provider=s["default"],e.connect=a["default"]},function(e,r){e.exports=t},function(t,e,r){"use strict";e.__esModule=!0;var o=r(1);e["default"]=o.PropTypes.shape({subscribe:o.PropTypes.func.isRequired,dispatch:o.PropTypes.func.isRequired,getState:o.PropTypes.func.isRequired})},function(t,e,r){"use strict";function o(t){return t&&t.__esModule?t:{"default":t}}function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function s(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}e.__esModule=!0,e["default"]=void 0;var a=r(1),p=r(2),u=o(p),c=function(t){function e(r,o){n(this,e);var i=s(this,t.call(this,r,o));return i.store=r.store,i}return i(e,t),e.prototype.getChildContext=function(){return{store:this.store}},e.prototype.render=function(){var t=this.props.children;return a.Children.only(t)},e}(a.Component);e["default"]=c,c.propTypes={store:u["default"].isRequired,children:a.PropTypes.element.isRequired},c.childContextTypes={store:u["default"].isRequired}},function(t,e,r){"use strict";function o(t){return t&&t.__esModule?t:{"default":t}}function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function s(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function a(t){return t.displayName||t.name||"Component"}function p(t,e){return(0,w["default"])((0,m["default"])(t),"`%sToProps` must return an object. Instead received %s.",e?"mapDispatch":"mapState",t),t}function u(t,e,r){function o(t,e,r){var o=v(t,e,r);return(0,w["default"])((0,m["default"])(o),"`mergeProps` must return an object. Instead received %s.",o),o}var u=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},h=!!t,l=t||x,P=(0,m["default"])(e)?(0,b["default"])(e):e||C,v=r||T,g=u.pure,O=void 0===g?!0:g,j=u.withRef,_=void 0===j?!1:j,D=O&&v!==T,R=M++;return function(t){var e=function(e){function r(t,o){n(this,r);var i=s(this,e.call(this,t,o));i.version=R,i.store=t.store||o.store,(0,w["default"])(i.store,'Could not find "store" in either the context or '+('props of "'+i.constructor.displayName+'". ')+"Either wrap the root component in a <Provider>, "+('or explicitly pass "store" as a prop to "'+i.constructor.displayName+'".'));var a=i.store.getState();return i.state={storeState:a},i.clearCache(),i}return i(r,e),r.prototype.shouldComponentUpdate=function(){return!O||this.haveOwnPropsChanged||this.hasStoreStateChanged},r.prototype.computeStateProps=function(t,e){if(!this.finalMapStateToProps)return this.configureFinalMapState(t,e);var r=t.getState(),o=this.doStatePropsDependOnOwnProps?this.finalMapStateToProps(r,e):this.finalMapStateToProps(r);return p(o)},r.prototype.configureFinalMapState=function(t,e){var r=l(t.getState(),e),o="function"==typeof r;return this.finalMapStateToProps=o?r:l,this.doStatePropsDependOnOwnProps=1!==this.finalMapStateToProps.length,o?this.computeStateProps(t,e):p(r)},r.prototype.computeDispatchProps=function(t,e){if(!this.finalMapDispatchToProps)return this.configureFinalMapDispatch(t,e);var r=t.dispatch,o=this.doDispatchPropsDependOnOwnProps?this.finalMapDispatchToProps(r,e):this.finalMapDispatchToProps(r);return p(o,!0)},r.prototype.configureFinalMapDispatch=function(t,e){var r=P(t.dispatch,e),o="function"==typeof r;return this.finalMapDispatchToProps=o?r:P,this.doDispatchPropsDependOnOwnProps=1!==this.finalMapDispatchToProps.length,o?this.computeDispatchProps(t,e):p(r,!0)},r.prototype.updateStatePropsIfNeeded=function(){var t=this.computeStateProps(this.store,this.props);return this.stateProps&&(0,y["default"])(t,this.stateProps)?!1:(this.stateProps=t,!0)},r.prototype.updateDispatchPropsIfNeeded=function(){var t=this.computeDispatchProps(this.store,this.props);return this.dispatchProps&&(0,y["default"])(t,this.dispatchProps)?!1:(this.dispatchProps=t,!0)},r.prototype.updateMergedPropsIfNeeded=function(){var t=o(this.stateProps,this.dispatchProps,this.props);return this.mergedProps&&D&&(0,y["default"])(t,this.mergedProps)?!1:(this.mergedProps=t,!0)},r.prototype.isSubscribed=function(){return"function"==typeof this.unsubscribe},r.prototype.trySubscribe=function(){h&&!this.unsubscribe&&(this.unsubscribe=this.store.subscribe(this.handleChange.bind(this)),this.handleChange())},r.prototype.tryUnsubscribe=function(){this.unsubscribe&&(this.unsubscribe(),this.unsubscribe=null)},r.prototype.componentDidMount=function(){this.trySubscribe()},r.prototype.componentWillReceiveProps=function(t){O&&(0,y["default"])(t,this.props)||(this.haveOwnPropsChanged=!0)},r.prototype.componentWillUnmount=function(){this.tryUnsubscribe(),this.clearCache()},r.prototype.clearCache=function(){this.dispatchProps=null,this.stateProps=null,this.mergedProps=null,this.haveOwnPropsChanged=!0,this.hasStoreStateChanged=!0,this.renderedElement=null,this.finalMapDispatchToProps=null,this.finalMapStateToProps=null},r.prototype.handleChange=function(){if(this.unsubscribe){var t=this.state.storeState,e=this.store.getState();O&&t===e||(this.hasStoreStateChanged=!0,this.setState({storeState:e}))}},r.prototype.getWrappedInstance=function(){return(0,w["default"])(_,"To access the wrapped instance, you need to specify { withRef: true } as the fourth argument of the connect() call."),this.refs.wrappedInstance},r.prototype.render=function(){var e=this.haveOwnPropsChanged,r=this.hasStoreStateChanged,o=this.renderedElement;this.haveOwnPropsChanged=!1,this.hasStoreStateChanged=!1;var n=!0,s=!0;O&&o&&(n=r||e&&this.doStatePropsDependOnOwnProps,s=e&&this.doDispatchPropsDependOnOwnProps);var i=!1,a=!1;n&&(i=this.updateStatePropsIfNeeded()),s&&(a=this.updateDispatchPropsIfNeeded());var p=!0;return p=i||a||e?this.updateMergedPropsIfNeeded():!1,!p&&o?o:this.renderedElement=_?(0,f.createElement)(t,c({},this.mergedProps,{ref:"wrappedInstance"})):(0,f.createElement)(t,this.mergedProps)},r}(f.Component);return e.displayName="Connect("+a(t)+")",e.WrappedComponent=t,e.contextTypes={store:d["default"]},e.propTypes={store:d["default"]},(0,S["default"])(e,t)}}e.__esModule=!0;var c=Object.assign||function(t){for(var e=1;arguments.length>e;e++){var r=arguments[e];for(var o in r)Object.prototype.hasOwnProperty.call(r,o)&&(t[o]=r[o])}return t};e["default"]=u;var f=r(1),h=r(2),d=o(h),l=r(5),y=o(l),P=r(6),b=o(P),v=r(12),m=o(v),g=r(7),S=o(g),O=r(8),w=o(O),x=function(t){return{}},C=function(t){return{dispatch:t}},T=function(t,e,r){return c({},r,t,e)},M=0},function(t,e){"use strict";function r(t,e){if(t===e)return!0;var r=Object.keys(t),o=Object.keys(e);if(r.length!==o.length)return!1;for(var n=Object.prototype.hasOwnProperty,s=0;r.length>s;s++)if(!n.call(e,r[s])||t[r[s]]!==e[r[s]])return!1;return!0}e.__esModule=!0,e["default"]=r},function(t,e,r){"use strict";function o(t){return function(e){return(0,n.bindActionCreators)(t,e)}}e.__esModule=!0,e["default"]=o;var n=r(13)},function(t,e){"use strict";var r={childContextTypes:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,mixins:!0,propTypes:!0,type:!0},o={name:!0,length:!0,prototype:!0,caller:!0,arguments:!0,arity:!0};t.exports=function(t,e){for(var n=Object.getOwnPropertyNames(e),s=0;n.length>s;++s)if(!r[n[s]]&&!o[n[s]])try{t[n[s]]=e[n[s]]}catch(i){}return t}},function(t,e,r){"use strict";var o=function(t,e,r,o,n,s,i,a){if(!t){var p;if(void 0===e)p=Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var u=[r,o,n,s,i,a],c=0;p=Error(e.replace(/%s/g,function(){return u[c++]})),p.name="Invariant Violation"}throw p.framesToPop=1,p}};t.exports=o},function(t,e){function r(t){return o(Object(t))}var o=Object.getPrototypeOf;t.exports=r},function(t,e){function r(t){var e=!1;if(null!=t&&"function"!=typeof t.toString)try{e=!!(t+"")}catch(r){}return e}t.exports=r},function(t,e){function r(t){return!!t&&"object"==typeof t}t.exports=r},function(t,e,r){function o(t){if(!i(t)||h.call(t)!=a||s(t))return!1;var e=n(t);if(null===e)return!0;var r=c.call(e,"constructor")&&e.constructor;return"function"==typeof r&&r instanceof r&&u.call(r)==f}var n=r(9),s=r(10),i=r(11),a="[object Object]",p=Object.prototype,u=Function.prototype.toString,c=p.hasOwnProperty,f=u.call(Object),h=p.toString;t.exports=o},function(t,r){t.exports=e}])});