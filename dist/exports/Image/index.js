import _objectSpread from "@babel/runtime/helpers/objectSpread2";
import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
var _excluded = ["aria-label", "blurRadius", "defaultSource", "draggable", "onError", "onLayout", "onLoad", "onLoadEnd", "onLoadStart", "pointerEvents", "source", "style"];
/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

import * as React from 'react';
import createElement from '../createElement';
import { getAssetByID } from '../../modules/AssetRegistry';
import { createBoxShadowValue } from '../StyleSheet/preprocess';
import ImageLoader from '../../modules/ImageLoader';
import PixelRatio from '../PixelRatio';
import StyleSheet from '../StyleSheet';
import TextAncestorContext from '../Text/TextAncestorContext';
import View from '../View';
import { warnOnce } from '../../modules/warnOnce';
var ERRORED = 'ERRORED';
var LOADED = 'LOADED';
var LOADING = 'LOADING';
var IDLE = 'IDLE';
var _filterId = 0;
var svgDataUriPattern = /^(data:image\/svg\+xml;utf8,)(.*)/;
function createTintColorSVG(tintColor, id) {
  return tintColor && id != null ? /*#__PURE__*/React.createElement("svg", {
    style: {
      position: 'absolute',
      height: 0,
      visibility: 'hidden',
      width: 0
    }
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("filter", {
    id: "tint-" + id,
    suppressHydrationWarning: true
  }, /*#__PURE__*/React.createElement("feFlood", {
    floodColor: "" + tintColor,
    key: tintColor
  }), /*#__PURE__*/React.createElement("feComposite", {
    in2: "SourceAlpha",
    operator: "atop"
  })))) : null;
}
function getFlatStyle(style, blurRadius, filterId, tintColorProp) {
  var flatStyle = StyleSheet.flatten(style);
  var filter = flatStyle.filter,
    resizeMode = flatStyle.resizeMode,
    shadowOffset = flatStyle.shadowOffset,
    tintColor = flatStyle.tintColor;
  if (flatStyle.resizeMode) {
    warnOnce('Image.style.resizeMode', 'Image: style.resizeMode is deprecated. Please use props.resizeMode.');
  }
  if (flatStyle.tintColor) {
    warnOnce('Image.style.tintColor', 'Image: style.tintColor is deprecated. Please use props.tintColor.');
  }

  // Add CSS filters
  // React Native exposes these features as props and proprietary styles
  var filters = [];
  var _filter = null;
  if (filter) {
    filters.push(filter);
  }
  if (blurRadius) {
    filters.push("blur(" + blurRadius + "px)");
  }
  if (shadowOffset) {
    var shadowString = createBoxShadowValue(flatStyle);
    if (shadowString) {
      filters.push("drop-shadow(" + shadowString + ")");
    }
  }
  if ((tintColorProp || tintColor) && filterId != null) {
    filters.push("url(#tint-" + filterId + ")");
  }
  if (filters.length > 0) {
    _filter = filters.join(' ');
  }

  // These styles are converted to CSS filters applied to the
  // element displaying the background image.
  delete flatStyle.blurRadius;
  delete flatStyle.shadowColor;
  delete flatStyle.shadowOpacity;
  delete flatStyle.shadowOffset;
  delete flatStyle.shadowRadius;
  delete flatStyle.tintColor;
  // These styles are not supported on View
  delete flatStyle.overlayColor;
  delete flatStyle.resizeMode;
  return [flatStyle, resizeMode, _filter, tintColor];
}
function resolveAssetDimensions(source) {
  if (typeof source === 'number') {
    var _getAssetByID = getAssetByID(source),
      _height = _getAssetByID.height,
      _width = _getAssetByID.width;
    return {
      height: _height,
      width: _width
    };
  } else if (source != null && !Array.isArray(source) && typeof source === 'object') {
    var _height2 = source.height,
      _width2 = source.width;
    return {
      height: _height2,
      width: _width2
    };
  }
}
function resolveAssetUri(source) {
  var uri = null;
  if (typeof source === 'number') {
    // get the URI from the packager
    var asset = getAssetByID(source);
    if (asset == null) {
      throw new Error("Image: asset with ID \"" + source + "\" could not be found. Please check the image source or packager.");
    }
    var scale = asset.scales[0];
    if (asset.scales.length > 1) {
      var preferredScale = PixelRatio.get();
      // Get the scale which is closest to the preferred scale
      scale = asset.scales.reduce((prev, curr) => Math.abs(curr - preferredScale) < Math.abs(prev - preferredScale) ? curr : prev);
    }
    var scaleSuffix = scale !== 1 ? "@" + scale + "x" : '';
    uri = asset ? asset.httpServerLocation + "/" + asset.name + scaleSuffix + "." + asset.type : '';
  } else if (typeof source === 'string') {
    uri = source;
  } else if (source && typeof source.uri === 'string') {
    uri = source.uri;
  }
  if (uri) {
    var match = uri.match(svgDataUriPattern);
    // inline SVG markup may contain characters (e.g., #, ") that need to be escaped
    if (match) {
      var prefix = match[1],
        svg = match[2];
      var encodedSvg = encodeURIComponent(svg);
      return "" + prefix + encodedSvg;
    }
  }
  return uri;
}
var Image = /*#__PURE__*/React.forwardRef((props, ref) => {
  var ariaLabel = props['aria-label'],
    blurRadius = props.blurRadius,
    defaultSource = props.defaultSource,
    draggable = props.draggable,
    onError = props.onError,
    onLayout = props.onLayout,
    onLoad = props.onLoad,
    onLoadEnd = props.onLoadEnd,
    onLoadStart = props.onLoadStart,
    pointerEvents = props.pointerEvents,
    source = props.source,
    style = props.style,
    rest = _objectWithoutPropertiesLoose(props, _excluded);
  if (process.env.NODE_ENV !== 'production') {
    if (props.children) {
      throw new Error('The <Image> component cannot contain children. If you want to render content on top of the image, consider using the <ImageBackground> component or absolute positioning.');
    }
  }
  var _React$useState = React.useState(() => {
      var uri = resolveAssetUri(source);
      if (uri != null) {
        var isLoaded = ImageLoader.has(uri);
        if (isLoaded) {
          return LOADED;
        }
      }
      return IDLE;
    }),
    state = _React$useState[0],
    updateState = _React$useState[1];
  var _React$useState2 = React.useState({}),
    layout = _React$useState2[0],
    updateLayout = _React$useState2[1];
  var hasTextAncestor = React.useContext(TextAncestorContext);
  var hiddenImageRef = React.useRef(null);
  var filterRef = React.useRef(_filterId++);
  var requestRef = React.useRef(null);
  var shouldDisplaySource = state === LOADED || state === LOADING && defaultSource == null;
  var _getFlatStyle = getFlatStyle(style, blurRadius, filterRef.current, props.tintColor),
    flatStyle = _getFlatStyle[0],
    _resizeMode = _getFlatStyle[1],
    filter = _getFlatStyle[2],
    _tintColor = _getFlatStyle[3];
  var resizeMode = props.resizeMode || _resizeMode || 'cover';
  var tintColor = props.tintColor || _tintColor;
  var selectedSource = shouldDisplaySource ? source : defaultSource;
  var displayImageUri = resolveAssetUri(selectedSource);
  var imageSizeStyle = resolveAssetDimensions(selectedSource);
  var backgroundImage = displayImageUri ? "url(\"" + displayImageUri + "\")" : null;
  var backgroundSize = getBackgroundSize();

  // Accessibility image allows users to trigger the browser's image context menu
  var hiddenImage = displayImageUri ? createElement('img', {
    alt: ariaLabel || '',
    style: styles.accessibilityImage$raw,
    draggable: draggable || false,
    ref: hiddenImageRef,
    src: displayImageUri
  }) : null;
  function getBackgroundSize() {
    if (hiddenImageRef.current != null && (resizeMode === 'center' || resizeMode === 'repeat')) {
      var _hiddenImageRef$curre = hiddenImageRef.current,
        naturalHeight = _hiddenImageRef$curre.naturalHeight,
        naturalWidth = _hiddenImageRef$curre.naturalWidth;
      var _height3 = layout.height,
        _width3 = layout.width;
      if (naturalHeight && naturalWidth && _height3 && _width3) {
        var scaleFactor = Math.min(1, _width3 / naturalWidth, _height3 / naturalHeight);
        var x = Math.ceil(scaleFactor * naturalWidth);
        var y = Math.ceil(scaleFactor * naturalHeight);
        return x + "px " + y + "px";
      }
    }
  }
  function handleLayout(e) {
    if (resizeMode === 'center' || resizeMode === 'repeat' || onLayout) {
      var _layout = e.nativeEvent.layout;
      onLayout && onLayout(e);
      updateLayout(_layout);
    }
  }

  // Image loading
  var uri = resolveAssetUri(source);
  React.useEffect(() => {
    abortPendingRequest();
    if (uri != null) {
      updateState(LOADING);
      if (onLoadStart) {
        onLoadStart();
      }
      requestRef.current = ImageLoader.load(uri, function load(e) {
        updateState(LOADED);
        if (onLoad) {
          onLoad(e);
        }
        if (onLoadEnd) {
          onLoadEnd();
        }
      }, function error() {
        updateState(ERRORED);
        if (onError) {
          onError({
            nativeEvent: {
              error: "Failed to load resource " + uri + " (404)"
            }
          });
        }
        if (onLoadEnd) {
          onLoadEnd();
        }
      });
    }
    function abortPendingRequest() {
      if (requestRef.current != null) {
        ImageLoader.abort(requestRef.current);
        requestRef.current = null;
      }
    }
    return abortPendingRequest;
  }, [uri, requestRef, updateState, onError, onLoad, onLoadEnd, onLoadStart]);
  return /*#__PURE__*/React.createElement(View, _extends({}, rest, {
    "aria-label": ariaLabel,
    onLayout: handleLayout,
    pointerEvents: pointerEvents,
    ref: ref,
    style: [styles.root, hasTextAncestor && styles.inline, imageSizeStyle, flatStyle]
  }), /*#__PURE__*/React.createElement(View, {
    style: [styles.image, resizeModeStyles[resizeMode], {
      backgroundImage,
      filter
    }, backgroundSize != null && {
      backgroundSize
    }],
    suppressHydrationWarning: true
  }), hiddenImage, createTintColorSVG(tintColor, filterRef.current));
});
Image.displayName = 'Image';

// $FlowIgnore: This is the correct type, but casting makes it unhappy since the variables aren't defined yet
var ImageWithStatics = Image;
ImageWithStatics.getSize = function (uri, success, failure) {
  ImageLoader.getSize(uri, success, failure);
};
ImageWithStatics.prefetch = function (uri) {
  return ImageLoader.prefetch(uri);
};
ImageWithStatics.queryCache = function (uris) {
  return ImageLoader.queryCache(uris);
};
var styles = StyleSheet.create({
  root: {
    flexBasis: 'auto',
    overflow: 'hidden',
    zIndex: 0
  },
  inline: {
    display: 'inline-flex'
  },
  image: _objectSpread(_objectSpread({}, StyleSheet.absoluteFillObject), {}, {
    backgroundColor: 'transparent',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    height: '100%',
    width: '100%',
    zIndex: -1
  }),
  accessibilityImage$raw: _objectSpread(_objectSpread({}, StyleSheet.absoluteFillObject), {}, {
    height: '100%',
    opacity: 0,
    width: '100%',
    zIndex: -1
  })
});
var resizeModeStyles = StyleSheet.create({
  center: {
    backgroundSize: 'auto'
  },
  contain: {
    backgroundSize: 'contain'
  },
  cover: {
    backgroundSize: 'cover'
  },
  none: {
    backgroundPosition: '0',
    backgroundSize: 'auto'
  },
  repeat: {
    backgroundPosition: '0',
    backgroundRepeat: 'repeat',
    backgroundSize: 'auto'
  },
  stretch: {
    backgroundSize: '100% 100%'
  }
});
export default ImageWithStatics;