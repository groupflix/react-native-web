"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
exports.__esModule = true;
exports.default = void 0;
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _AccessibilityUtil = _interopRequireDefault(require("../AccessibilityUtil"));
var _StyleSheet2 = _interopRequireDefault(require("../../exports/StyleSheet"));
var _warnOnce = require("../warnOnce");
var _excluded = ["aria-activedescendant", "accessibilityActiveDescendant", "aria-atomic", "accessibilityAtomic", "aria-autocomplete", "accessibilityAutoComplete", "aria-busy", "accessibilityBusy", "aria-checked", "accessibilityChecked", "aria-colcount", "accessibilityColumnCount", "aria-colindex", "accessibilityColumnIndex", "aria-colspan", "accessibilityColumnSpan", "aria-controls", "accessibilityControls", "aria-current", "accessibilityCurrent", "aria-describedby", "accessibilityDescribedBy", "aria-details", "accessibilityDetails", "aria-disabled", "accessibilityDisabled", "aria-errormessage", "accessibilityErrorMessage", "aria-expanded", "accessibilityExpanded", "aria-flowto", "accessibilityFlowTo", "aria-haspopup", "accessibilityHasPopup", "aria-hidden", "accessibilityHidden", "aria-invalid", "accessibilityInvalid", "aria-keyshortcuts", "accessibilityKeyShortcuts", "aria-label", "accessibilityLabel", "aria-labelledby", "accessibilityLabelledBy", "aria-level", "accessibilityLevel", "aria-live", "accessibilityLiveRegion", "aria-modal", "accessibilityModal", "aria-multiline", "accessibilityMultiline", "aria-multiselectable", "accessibilityMultiSelectable", "aria-orientation", "accessibilityOrientation", "aria-owns", "accessibilityOwns", "aria-placeholder", "accessibilityPlaceholder", "aria-posinset", "accessibilityPosInSet", "aria-pressed", "accessibilityPressed", "aria-readonly", "accessibilityReadOnly", "aria-required", "accessibilityRequired", "role", "accessibilityRole", "aria-roledescription", "accessibilityRoleDescription", "aria-rowcount", "accessibilityRowCount", "aria-rowindex", "accessibilityRowIndex", "aria-rowspan", "accessibilityRowSpan", "aria-selected", "accessibilitySelected", "aria-setsize", "accessibilitySetSize", "aria-sort", "accessibilitySort", "aria-valuemax", "accessibilityValueMax", "aria-valuemin", "accessibilityValueMin", "aria-valuenow", "accessibilityValueNow", "aria-valuetext", "accessibilityValueText", "dataSet", "focusable", "id", "nativeID", "pointerEvents", "style", "tabIndex", "testID"];
var emptyObject = {};
var hasOwnProperty = Object.prototype.hasOwnProperty;
var isArray = Array.isArray;
var uppercasePattern = /[A-Z]/g;
function toHyphenLower(match) {
  return '-' + match.toLowerCase();
}
function hyphenateString(str) {
  return str.replace(uppercasePattern, toHyphenLower);
}
function processIDRefList(idRefList) {
  return isArray(idRefList) ? idRefList.join(' ') : idRefList;
}
var pointerEventsStyles = _StyleSheet2.default.create({
  auto: {
    pointerEvents: 'auto'
  },
  'box-none': {
    pointerEvents: 'box-none'
  },
  'box-only': {
    pointerEvents: 'box-only'
  },
  none: {
    pointerEvents: 'none'
  }
});
var createDOMProps = (elementType, props, options) => {
  if (!props) {
    props = emptyObject;
  }
  var _props = props,
    ariaActiveDescendant = _props['aria-activedescendant'],
    accessibilityActiveDescendant = _props.accessibilityActiveDescendant,
    ariaAtomic = _props['aria-atomic'],
    accessibilityAtomic = _props.accessibilityAtomic,
    ariaAutoComplete = _props['aria-autocomplete'],
    accessibilityAutoComplete = _props.accessibilityAutoComplete,
    ariaBusy = _props['aria-busy'],
    accessibilityBusy = _props.accessibilityBusy,
    ariaChecked = _props['aria-checked'],
    accessibilityChecked = _props.accessibilityChecked,
    ariaColumnCount = _props['aria-colcount'],
    accessibilityColumnCount = _props.accessibilityColumnCount,
    ariaColumnIndex = _props['aria-colindex'],
    accessibilityColumnIndex = _props.accessibilityColumnIndex,
    ariaColumnSpan = _props['aria-colspan'],
    accessibilityColumnSpan = _props.accessibilityColumnSpan,
    ariaControls = _props['aria-controls'],
    accessibilityControls = _props.accessibilityControls,
    ariaCurrent = _props['aria-current'],
    accessibilityCurrent = _props.accessibilityCurrent,
    ariaDescribedBy = _props['aria-describedby'],
    accessibilityDescribedBy = _props.accessibilityDescribedBy,
    ariaDetails = _props['aria-details'],
    accessibilityDetails = _props.accessibilityDetails,
    ariaDisabled = _props['aria-disabled'],
    accessibilityDisabled = _props.accessibilityDisabled,
    ariaErrorMessage = _props['aria-errormessage'],
    accessibilityErrorMessage = _props.accessibilityErrorMessage,
    ariaExpanded = _props['aria-expanded'],
    accessibilityExpanded = _props.accessibilityExpanded,
    ariaFlowTo = _props['aria-flowto'],
    accessibilityFlowTo = _props.accessibilityFlowTo,
    ariaHasPopup = _props['aria-haspopup'],
    accessibilityHasPopup = _props.accessibilityHasPopup,
    ariaHidden = _props['aria-hidden'],
    accessibilityHidden = _props.accessibilityHidden,
    ariaInvalid = _props['aria-invalid'],
    accessibilityInvalid = _props.accessibilityInvalid,
    ariaKeyShortcuts = _props['aria-keyshortcuts'],
    accessibilityKeyShortcuts = _props.accessibilityKeyShortcuts,
    ariaLabel = _props['aria-label'],
    accessibilityLabel = _props.accessibilityLabel,
    ariaLabelledBy = _props['aria-labelledby'],
    accessibilityLabelledBy = _props.accessibilityLabelledBy,
    ariaLevel = _props['aria-level'],
    accessibilityLevel = _props.accessibilityLevel,
    ariaLive = _props['aria-live'],
    accessibilityLiveRegion = _props.accessibilityLiveRegion,
    ariaModal = _props['aria-modal'],
    accessibilityModal = _props.accessibilityModal,
    ariaMultiline = _props['aria-multiline'],
    accessibilityMultiline = _props.accessibilityMultiline,
    ariaMultiSelectable = _props['aria-multiselectable'],
    accessibilityMultiSelectable = _props.accessibilityMultiSelectable,
    ariaOrientation = _props['aria-orientation'],
    accessibilityOrientation = _props.accessibilityOrientation,
    ariaOwns = _props['aria-owns'],
    accessibilityOwns = _props.accessibilityOwns,
    ariaPlaceholder = _props['aria-placeholder'],
    accessibilityPlaceholder = _props.accessibilityPlaceholder,
    ariaPosInSet = _props['aria-posinset'],
    accessibilityPosInSet = _props.accessibilityPosInSet,
    ariaPressed = _props['aria-pressed'],
    accessibilityPressed = _props.accessibilityPressed,
    ariaReadOnly = _props['aria-readonly'],
    accessibilityReadOnly = _props.accessibilityReadOnly,
    ariaRequired = _props['aria-required'],
    accessibilityRequired = _props.accessibilityRequired,
    ariaRole = _props.role,
    accessibilityRole = _props.accessibilityRole,
    ariaRoleDescription = _props['aria-roledescription'],
    accessibilityRoleDescription = _props.accessibilityRoleDescription,
    ariaRowCount = _props['aria-rowcount'],
    accessibilityRowCount = _props.accessibilityRowCount,
    ariaRowIndex = _props['aria-rowindex'],
    accessibilityRowIndex = _props.accessibilityRowIndex,
    ariaRowSpan = _props['aria-rowspan'],
    accessibilityRowSpan = _props.accessibilityRowSpan,
    ariaSelected = _props['aria-selected'],
    accessibilitySelected = _props.accessibilitySelected,
    ariaSetSize = _props['aria-setsize'],
    accessibilitySetSize = _props.accessibilitySetSize,
    ariaSort = _props['aria-sort'],
    accessibilitySort = _props.accessibilitySort,
    ariaValueMax = _props['aria-valuemax'],
    accessibilityValueMax = _props.accessibilityValueMax,
    ariaValueMin = _props['aria-valuemin'],
    accessibilityValueMin = _props.accessibilityValueMin,
    ariaValueNow = _props['aria-valuenow'],
    accessibilityValueNow = _props.accessibilityValueNow,
    ariaValueText = _props['aria-valuetext'],
    accessibilityValueText = _props.accessibilityValueText,
    dataSet = _props.dataSet,
    focusable = _props.focusable,
    id = _props.id,
    nativeID = _props.nativeID,
    pointerEvents = _props.pointerEvents,
    style = _props.style,
    tabIndex = _props.tabIndex,
    testID = _props.testID,
    domProps = (0, _objectWithoutPropertiesLoose2.default)(_props, _excluded);
  if (accessibilityDisabled != null) {
    (0, _warnOnce.warnOnce)('accessibilityDisabled', "accessibilityDisabled is deprecated.");
  }
  var disabled = ariaDisabled || accessibilityDisabled;
  var role = _AccessibilityUtil.default.propsToAriaRole(props);

  // ACCESSIBILITY
  if (accessibilityActiveDescendant != null) {
    (0, _warnOnce.warnOnce)('accessibilityActiveDescendant', "accessibilityActiveDescendant is deprecated. Use aria-activedescendant.");
  }
  var _ariaActiveDescendant = ariaActiveDescendant || accessibilityActiveDescendant;
  if (_ariaActiveDescendant != null) {
    domProps['aria-activedescendant'] = _ariaActiveDescendant;
  }
  if (accessibilityAtomic != null) {
    (0, _warnOnce.warnOnce)('accessibilityAtomic', "accessibilityAtomic is deprecated. Use aria-atomic.");
  }
  var _ariaAtomic = ariaAtomic || accessibilityAtomic;
  if (_ariaAtomic != null) {
    domProps['aria-atomic'] = _ariaAtomic;
  }
  if (accessibilityAutoComplete != null) {
    (0, _warnOnce.warnOnce)('accessibilityAutoComplete', "accessibilityAutoComplete is deprecated. Use aria-autocomplete.");
  }
  var _ariaAutoComplete = ariaAutoComplete || accessibilityAutoComplete;
  if (_ariaAutoComplete != null) {
    domProps['aria-autocomplete'] = _ariaAutoComplete;
  }
  if (accessibilityBusy != null) {
    (0, _warnOnce.warnOnce)('accessibilityBusy', "accessibilityBusy is deprecated. Use aria-busy.");
  }
  var _ariaBusy = ariaBusy || accessibilityBusy;
  if (_ariaBusy != null) {
    domProps['aria-busy'] = _ariaBusy;
  }
  if (accessibilityChecked != null) {
    (0, _warnOnce.warnOnce)('accessibilityChecked', "accessibilityChecked is deprecated. Use aria-checked.");
  }
  var _ariaChecked = ariaChecked || accessibilityChecked;
  if (_ariaChecked != null) {
    domProps['aria-checked'] = _ariaChecked;
  }
  if (accessibilityColumnCount != null) {
    (0, _warnOnce.warnOnce)('accessibilityColumnCount', "accessibilityColumnCount is deprecated. Use aria-colcount.");
  }
  var _ariaColumnCount = ariaColumnCount || accessibilityColumnCount;
  if (_ariaColumnCount != null) {
    domProps['aria-colcount'] = _ariaColumnCount;
  }
  if (accessibilityColumnIndex != null) {
    (0, _warnOnce.warnOnce)('accessibilityColumnIndex', "accessibilityColumnIndex is deprecated. Use aria-colindex.");
  }
  var _ariaColumnIndex = ariaColumnIndex || accessibilityColumnIndex;
  if (_ariaColumnIndex != null) {
    domProps['aria-colindex'] = _ariaColumnIndex;
  }
  if (accessibilityColumnSpan != null) {
    (0, _warnOnce.warnOnce)('accessibilityColumnSpan', "accessibilityColumnSpan is deprecated. Use aria-colspan.");
  }
  var _ariaColumnSpan = ariaColumnSpan || accessibilityColumnSpan;
  if (_ariaColumnSpan != null) {
    domProps['aria-colspan'] = _ariaColumnSpan;
  }
  if (accessibilityControls != null) {
    (0, _warnOnce.warnOnce)('accessibilityControls', "accessibilityControls is deprecated. Use aria-controls.");
  }
  var _ariaControls = ariaControls || accessibilityControls;
  if (_ariaControls != null) {
    domProps['aria-controls'] = processIDRefList(_ariaControls);
  }
  if (accessibilityCurrent != null) {
    (0, _warnOnce.warnOnce)('accessibilityCurrent', "accessibilityCurrent is deprecated. Use aria-current.");
  }
  var _ariaCurrent = ariaCurrent || accessibilityCurrent;
  if (_ariaCurrent != null) {
    domProps['aria-current'] = _ariaCurrent;
  }
  if (accessibilityDescribedBy != null) {
    (0, _warnOnce.warnOnce)('accessibilityDescribedBy', "accessibilityDescribedBy is deprecated. Use aria-describedby.");
  }
  var _ariaDescribedBy = ariaDescribedBy || accessibilityDescribedBy;
  if (_ariaDescribedBy != null) {
    domProps['aria-describedby'] = processIDRefList(_ariaDescribedBy);
  }
  if (accessibilityDetails != null) {
    (0, _warnOnce.warnOnce)('accessibilityDetails', "accessibilityDetails is deprecated. Use aria-details.");
  }
  var _ariaDetails = ariaDetails || accessibilityDetails;
  if (_ariaDetails != null) {
    domProps['aria-details'] = _ariaDetails;
  }
  if (disabled === true) {
    domProps['aria-disabled'] = true;
    // Enhance with native semantics
    if (elementType === 'button' || elementType === 'form' || elementType === 'input' || elementType === 'select' || elementType === 'textarea') {
      domProps.disabled = true;
    }
  }
  if (accessibilityErrorMessage != null) {
    (0, _warnOnce.warnOnce)('accessibilityErrorMessage', "accessibilityErrorMessage is deprecated. Use aria-errormessage.");
  }
  var _ariaErrorMessage = ariaErrorMessage || accessibilityErrorMessage;
  if (_ariaErrorMessage != null) {
    domProps['aria-errormessage'] = _ariaErrorMessage;
  }
  if (accessibilityExpanded != null) {
    (0, _warnOnce.warnOnce)('accessibilityExpanded', "accessibilityExpanded is deprecated. Use aria-expanded.");
  }
  var _ariaExpanded = ariaExpanded || accessibilityExpanded;
  if (_ariaExpanded != null) {
    domProps['aria-expanded'] = _ariaExpanded;
  }
  if (accessibilityFlowTo != null) {
    (0, _warnOnce.warnOnce)('accessibilityFlowTo', "accessibilityFlowTo is deprecated. Use aria-flowto.");
  }
  var _ariaFlowTo = ariaFlowTo || accessibilityFlowTo;
  if (_ariaFlowTo != null) {
    domProps['aria-flowto'] = processIDRefList(_ariaFlowTo);
  }
  if (accessibilityHasPopup != null) {
    (0, _warnOnce.warnOnce)('accessibilityHasPopup', "accessibilityHasPopup is deprecated. Use aria-haspopup.");
  }
  var _ariaHasPopup = ariaHasPopup || accessibilityHasPopup;
  if (_ariaHasPopup != null) {
    domProps['aria-haspopup'] = _ariaHasPopup;
  }
  if (accessibilityHidden != null) {
    (0, _warnOnce.warnOnce)('accessibilityHidden', "accessibilityHidden is deprecated. Use aria-hidden.");
  }
  var _ariaHidden = ariaHidden || accessibilityHidden;
  if (_ariaHidden === true) {
    domProps['aria-hidden'] = _ariaHidden;
  }
  if (accessibilityInvalid != null) {
    (0, _warnOnce.warnOnce)('accessibilityInvalid', "accessibilityInvalid is deprecated. Use aria-invalid.");
  }
  var _ariaInvalid = ariaInvalid || accessibilityInvalid;
  if (_ariaInvalid != null) {
    domProps['aria-invalid'] = _ariaInvalid;
  }
  if (accessibilityKeyShortcuts != null) {
    (0, _warnOnce.warnOnce)('accessibilityKeyShortcuts', "accessibilityKeyShortcuts is deprecated. Use aria-keyshortcuts.");
  }
  var _ariaKeyShortcuts = ariaKeyShortcuts || accessibilityKeyShortcuts;
  if (_ariaKeyShortcuts != null) {
    domProps['aria-keyshortcuts'] = processIDRefList(_ariaKeyShortcuts);
  }
  if (accessibilityLabel != null) {
    (0, _warnOnce.warnOnce)('accessibilityLabel', "accessibilityLabel is deprecated. Use aria-label.");
  }
  var _ariaLabel = ariaLabel || accessibilityLabel;
  if (_ariaLabel != null) {
    domProps['aria-label'] = _ariaLabel;
  }
  if (accessibilityLabelledBy != null) {
    (0, _warnOnce.warnOnce)('accessibilityLabelledBy', "accessibilityLabelledBy is deprecated. Use aria-labelledby.");
  }
  var _ariaLabelledBy = ariaLabelledBy || accessibilityLabelledBy;
  if (_ariaLabelledBy != null) {
    domProps['aria-labelledby'] = processIDRefList(_ariaLabelledBy);
  }
  if (accessibilityLevel != null) {
    (0, _warnOnce.warnOnce)('accessibilityLevel', "accessibilityLevel is deprecated. Use aria-level.");
  }
  var _ariaLevel = ariaLevel || accessibilityLevel;
  if (_ariaLevel != null) {
    domProps['aria-level'] = _ariaLevel;
  }
  if (accessibilityLiveRegion != null) {
    (0, _warnOnce.warnOnce)('accessibilityLiveRegion', "accessibilityLiveRegion is deprecated. Use aria-live.");
  }
  var _ariaLive = ariaLive || accessibilityLiveRegion;
  if (_ariaLive != null) {
    domProps['aria-live'] = _ariaLive === 'none' ? 'off' : _ariaLive;
  }
  if (accessibilityModal != null) {
    (0, _warnOnce.warnOnce)('accessibilityModal', "accessibilityModal is deprecated. Use aria-modal.");
  }
  var _ariaModal = ariaModal || accessibilityModal;
  if (_ariaModal != null) {
    domProps['aria-modal'] = _ariaModal;
  }
  if (accessibilityMultiline != null) {
    (0, _warnOnce.warnOnce)('accessibilityMultiline', "accessibilityMultiline is deprecated. Use aria-multiline.");
  }
  var _ariaMultiline = ariaMultiline || accessibilityMultiline;
  if (_ariaMultiline != null) {
    domProps['aria-multiline'] = _ariaMultiline;
  }
  if (accessibilityMultiSelectable != null) {
    (0, _warnOnce.warnOnce)('accessibilityMultiSelectable', "accessibilityMultiSelectable is deprecated. Use aria-multiselectable.");
  }
  var _ariaMultiSelectable = ariaMultiSelectable || accessibilityMultiSelectable;
  if (_ariaMultiSelectable != null) {
    domProps['aria-multiselectable'] = _ariaMultiSelectable;
  }
  if (accessibilityOrientation != null) {
    (0, _warnOnce.warnOnce)('accessibilityOrientation', "accessibilityOrientation is deprecated. Use aria-orientation.");
  }
  var _ariaOrientation = ariaOrientation || accessibilityOrientation;
  if (_ariaOrientation != null) {
    domProps['aria-orientation'] = _ariaOrientation;
  }
  if (accessibilityOwns != null) {
    (0, _warnOnce.warnOnce)('accessibilityOwns', "accessibilityOwns is deprecated. Use aria-owns.");
  }
  var _ariaOwns = ariaOwns || accessibilityOwns;
  if (_ariaOwns != null) {
    domProps['aria-owns'] = processIDRefList(_ariaOwns);
  }
  if (accessibilityPlaceholder != null) {
    (0, _warnOnce.warnOnce)('accessibilityPlaceholder', "accessibilityPlaceholder is deprecated. Use aria-placeholder.");
  }
  var _ariaPlaceholder = ariaPlaceholder || accessibilityPlaceholder;
  if (_ariaPlaceholder != null) {
    domProps['aria-placeholder'] = _ariaPlaceholder;
  }
  if (accessibilityPosInSet != null) {
    (0, _warnOnce.warnOnce)('accessibilityPosInSet', "accessibilityPosInSet is deprecated. Use aria-posinset.");
  }
  var _ariaPosInSet = ariaPosInSet || accessibilityPosInSet;
  if (_ariaPosInSet != null) {
    domProps['aria-posinset'] = _ariaPosInSet;
  }
  if (accessibilityPressed != null) {
    (0, _warnOnce.warnOnce)('accessibilityPressed', "accessibilityPressed is deprecated. Use aria-pressed.");
  }
  var _ariaPressed = ariaPressed || accessibilityPressed;
  if (_ariaPressed != null) {
    domProps['aria-pressed'] = _ariaPressed;
  }
  if (accessibilityReadOnly != null) {
    (0, _warnOnce.warnOnce)('accessibilityReadOnly', "accessibilityReadOnly is deprecated. Use aria-readonly.");
  }
  var _ariaReadOnly = ariaReadOnly || accessibilityReadOnly;
  if (_ariaReadOnly != null) {
    domProps['aria-readonly'] = _ariaReadOnly;
    // Enhance with native semantics
    if (elementType === 'input' || elementType === 'select' || elementType === 'textarea') {
      domProps.readOnly = true;
    }
  }
  if (accessibilityRequired != null) {
    (0, _warnOnce.warnOnce)('accessibilityRequired', "accessibilityRequired is deprecated. Use aria-required.");
  }
  var _ariaRequired = ariaRequired || accessibilityRequired;
  if (_ariaRequired != null) {
    domProps['aria-required'] = _ariaRequired;
    // Enhance with native semantics
    if (elementType === 'input' || elementType === 'select' || elementType === 'textarea') {
      domProps.required = accessibilityRequired;
    }
  }
  if (accessibilityRole != null) {
    (0, _warnOnce.warnOnce)('accessibilityRole', "accessibilityRole is deprecated. Use role.");
  }
  if (role != null) {
    // 'presentation' synonym has wider browser support
    domProps['role'] = role === 'none' ? 'presentation' : role;
  }
  if (accessibilityRoleDescription != null) {
    (0, _warnOnce.warnOnce)('accessibilityRoleDescription', "accessibilityRoleDescription is deprecated. Use aria-roledescription.");
  }
  var _ariaRoleDescription = ariaRoleDescription || accessibilityRoleDescription;
  if (_ariaRoleDescription != null) {
    domProps['aria-roledescription'] = _ariaRoleDescription;
  }
  if (accessibilityRowCount != null) {
    (0, _warnOnce.warnOnce)('accessibilityRowCount', "accessibilityRowCount is deprecated. Use aria-rowcount.");
  }
  var _ariaRowCount = ariaRowCount || accessibilityRowCount;
  if (_ariaRowCount != null) {
    domProps['aria-rowcount'] = _ariaRowCount;
  }
  if (accessibilityRowIndex != null) {
    (0, _warnOnce.warnOnce)('accessibilityRowIndex', "accessibilityRowIndex is deprecated. Use aria-rowindex.");
  }
  var _ariaRowIndex = ariaRowIndex || accessibilityRowIndex;
  if (_ariaRowIndex != null) {
    domProps['aria-rowindex'] = _ariaRowIndex;
  }
  if (accessibilityRowSpan != null) {
    (0, _warnOnce.warnOnce)('accessibilityRowSpan', "accessibilityRowSpan is deprecated. Use aria-rowspan.");
  }
  var _ariaRowSpan = ariaRowSpan || accessibilityRowSpan;
  if (_ariaRowSpan != null) {
    domProps['aria-rowspan'] = _ariaRowSpan;
  }
  if (accessibilitySelected != null) {
    (0, _warnOnce.warnOnce)('accessibilitySelected', "accessibilitySelected is deprecated. Use aria-selected.");
  }
  var _ariaSelected = ariaSelected || accessibilitySelected;
  if (_ariaSelected != null) {
    domProps['aria-selected'] = _ariaSelected;
  }
  if (accessibilitySetSize != null) {
    (0, _warnOnce.warnOnce)('accessibilitySetSize', "accessibilitySetSize is deprecated. Use aria-setsize.");
  }
  var _ariaSetSize = ariaSetSize || accessibilitySetSize;
  if (_ariaSetSize != null) {
    domProps['aria-setsize'] = _ariaSetSize;
  }
  if (accessibilitySort != null) {
    (0, _warnOnce.warnOnce)('accessibilitySort', "accessibilitySort is deprecated. Use aria-sort.");
  }
  var _ariaSort = ariaSort || accessibilitySort;
  if (_ariaSort != null) {
    domProps['aria-sort'] = _ariaSort;
  }
  if (accessibilityValueMax != null) {
    (0, _warnOnce.warnOnce)('accessibilityValueMax', "accessibilityValueMax is deprecated. Use aria-valuemax.");
  }
  var _ariaValueMax = ariaValueMax || accessibilityValueMax;
  if (_ariaValueMax != null) {
    domProps['aria-valuemax'] = _ariaValueMax;
  }
  if (accessibilityValueMin != null) {
    (0, _warnOnce.warnOnce)('accessibilityValueMin', "accessibilityValueMin is deprecated. Use aria-valuemin.");
  }
  var _ariaValueMin = ariaValueMin || accessibilityValueMin;
  if (_ariaValueMin != null) {
    domProps['aria-valuemin'] = _ariaValueMin;
  }
  if (accessibilityValueNow != null) {
    (0, _warnOnce.warnOnce)('accessibilityValueNow', "accessibilityValueNow is deprecated. Use aria-valuenow.");
  }
  var _ariaValueNow = ariaValueNow || accessibilityValueNow;
  if (_ariaValueNow != null) {
    domProps['aria-valuenow'] = _ariaValueNow;
  }
  if (accessibilityValueText != null) {
    (0, _warnOnce.warnOnce)('accessibilityValueText', "accessibilityValueText is deprecated. Use aria-valuetext.");
  }
  var _ariaValueText = ariaValueText || accessibilityValueText;
  if (_ariaValueText != null) {
    domProps['aria-valuetext'] = _ariaValueText;
  }

  // "dataSet" replaced with "data-*"
  if (dataSet != null) {
    for (var dataProp in dataSet) {
      if (hasOwnProperty.call(dataSet, dataProp)) {
        var dataName = hyphenateString(dataProp);
        var dataValue = dataSet[dataProp];
        if (dataValue != null) {
          domProps["data-" + dataName] = dataValue;
        }
      }
    }
  }

  // FOCUS
  if (tabIndex === 0 || tabIndex === '0' || tabIndex === -1 || tabIndex === '-1') {
    domProps.tabIndex = tabIndex;
  } else {
    if (focusable != null) {
      (0, _warnOnce.warnOnce)('focusable', "focusable is deprecated.");
    }

    // "focusable" indicates that an element may be a keyboard tab-stop.
    if (focusable === false) {
      domProps.tabIndex = '-1';
    }
    if (
    // These native elements are keyboard focusable by default
    elementType === 'a' || elementType === 'button' || elementType === 'input' || elementType === 'select' || elementType === 'textarea') {
      if (focusable === false || accessibilityDisabled === true) {
        domProps.tabIndex = '-1';
      }
    } else if (
    // These roles are made keyboard focusable by default
    role === 'button' || role === 'checkbox' || role === 'link' || role === 'radio' || role === 'textbox' || role === 'switch') {
      if (focusable !== false) {
        domProps.tabIndex = '0';
      }
    } else {
      // Everything else must explicitly set the prop
      if (focusable === true) {
        domProps.tabIndex = '0';
      }
    }
  }

  // Resolve styles
  if (pointerEvents != null) {
    (0, _warnOnce.warnOnce)('pointerEvents', "props.pointerEvents is deprecated. Use style.pointerEvents");
  }
  var _StyleSheet = (0, _StyleSheet2.default)([style, pointerEvents && pointerEventsStyles[pointerEvents]], {
      writingDirection: options ? options.writingDirection : 'ltr'
    }),
    className = _StyleSheet[0],
    inlineStyle = _StyleSheet[1];
  if (className) {
    domProps.className = className;
  }
  if (inlineStyle) {
    domProps.style = inlineStyle;
  }

  // OTHER
  // Native element ID
  if (nativeID != null) {
    (0, _warnOnce.warnOnce)('nativeID', "nativeID is deprecated. Use id.");
  }
  var _id = id || nativeID;
  if (_id != null) {
    domProps.id = _id;
  }
  // Automated test IDs
  if (testID != null) {
    domProps['data-testid'] = testID;
  }
  if (domProps.type == null && elementType === 'button') {
    domProps.type = 'button';
  }
  return domProps;
};
var _default = createDOMProps;
exports.default = _default;
module.exports = exports.default;