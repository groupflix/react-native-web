/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

import getBoundingClientRect from '../../modules/getBoundingClientRect';
import setValueForStyles from '../../modules/setValueForStyles';
var getRect = node => {
  // Unlike the DOM's getBoundingClientRect, React Native layout measurements
  // for "height" and "width" ignore scale transforms.
  // https://developer.mozilla.org/en-US/docs/Web/API/CSS_Object_Model/Determining_the_dimensions_of_elements
  var _getBoundingClientRec = getBoundingClientRect(node),
    x = _getBoundingClientRec.x,
    y = _getBoundingClientRec.y,
    top = _getBoundingClientRec.top,
    left = _getBoundingClientRec.left;
  var width = node.offsetWidth;
  var height = node.offsetHeight;
  return {
    x,
    y,
    width,
    height,
    top,
    left
  };
};
var measureLayout = (node, relativeToNativeNode, callback) => {
  var relativeNode = relativeToNativeNode || node && node.parentNode;
  if (node && relativeNode) {
    setTimeout(() => {
      var relativeRect = getBoundingClientRect(relativeNode);
      var _getRect = getRect(node),
        height = _getRect.height,
        left = _getRect.left,
        top = _getRect.top,
        width = _getRect.width;
      var x = left - relativeRect.left;
      var y = top - relativeRect.top;
      callback(x, y, width, height, left, top);
    }, 0);
  }
};
var elementsToIgnore = {
  A: true,
  BODY: true,
  INPUT: true,
  SELECT: true,
  TEXTAREA: true
};
var UIManager = {
  blur(node) {
    try {
      node.blur();
    } catch (err) {}
  },
  focus(node) {
    try {
      var name = node.nodeName;
      // A tabIndex of -1 allows element to be programmatically focused but
      // prevents keyboard focus. We don't want to set the tabindex value on
      // elements that should not prevent keyboard focus.
      if (node.getAttribute('tabIndex') == null && node.isContentEditable !== true && elementsToIgnore[name] == null) {
        node.setAttribute('tabIndex', '-1');
      }
      node.focus();
    } catch (err) {}
  },
  measure(node, callback) {
    measureLayout(node, null, callback);
  },
  measureInWindow(node, callback) {
    if (node) {
      setTimeout(() => {
        var _getRect2 = getRect(node),
          height = _getRect2.height,
          left = _getRect2.left,
          top = _getRect2.top,
          width = _getRect2.width;
        callback(left, top, width, height);
      }, 0);
    }
  },
  measureLayout(node, relativeToNativeNode, onFail, onSuccess) {
    measureLayout(node, relativeToNativeNode, onSuccess);
  },
  updateView(node, props) {
    for (var prop in props) {
      if (!Object.prototype.hasOwnProperty.call(props, prop)) {
        continue;
      }
      var value = props[prop];
      switch (prop) {
        case 'style':
          {
            setValueForStyles(node, value);
            break;
          }
        case 'class':
        case 'className':
          {
            node.setAttribute('class', value);
            break;
          }
        case 'text':
        case 'value':
          // native platforms use `text` prop to replace text input value
          node.value = value;
          break;
        default:
          node.setAttribute(prop, value);
      }
    }
  },
  configureNextLayoutAnimation(config, onAnimationDidEnd) {
    onAnimationDidEnd();
  },
  // mocks
  setLayoutAnimationEnabledExperimental() {}
};
export default UIManager;