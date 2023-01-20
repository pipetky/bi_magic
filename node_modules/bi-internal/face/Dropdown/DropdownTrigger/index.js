'use strict';



function ___$insertStyle(css) {
  if (!css) {
    return;
  }
  if (typeof window === 'undefined') {
    return;
  }

  var style = document.createElement('style');

  style.setAttribute('type', 'text/css');
  style.innerHTML = css;
  document.head.appendChild(style);
  return css;
}

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _tslib = require('../../_virtual/_tslib.js');
var React = require('react');
var React__default = _interopDefault(React);
var index = require('../../Providers/index.js');

var Tippy = require("@tippyjs/react/headless").default;
var cn = require('classnames');
var DropdownTrigger = function (props) {
    var children = props.children, className = props.className, _a = props.trigger, trigger = _a === void 0 ? 'click' : _a, interactive = props.interactive, _b = props.placement, placement = _b === void 0 ? 'bottom' : _b, menu = props.menu, onClick = props.onClick, visible = props.visible, hideOnClick = props.hideOnClick, showOnCreate = props.showOnCreate, rest = _tslib.__rest(props, ["children", "className", "trigger", "interactive", "placement", "menu", "onClick", "visible", "hideOnClick", "showOnCreate"]);
    var containerRef = React.useContext(index.DropdownRefContext);
    var _trigger = trigger;
    var _hideOnClick = hideOnClick;
    var _showOnCreate = showOnCreate;
    if (props.visible !== undefined) {
        _trigger = undefined;
        _hideOnClick = undefined;
        _showOnCreate = undefined;
    }
    return (React__default.createElement(Tippy, _tslib.__assign({ render: function (attrs) { return React__default.createElement("div", _tslib.__assign({}, attrs, { className: cn(className) }), menu); }, appendTo: containerRef || document.body, trigger: _trigger, interactive: typeof interactive === 'boolean' ? interactive : true, placement: placement, visible: visible, hideOnClick: _hideOnClick, showOnCreate: _showOnCreate }, rest), React__default.cloneElement(children, { onClick: onClick })));
};

module.exports = DropdownTrigger;
//# sourceMappingURL=index.js.map
