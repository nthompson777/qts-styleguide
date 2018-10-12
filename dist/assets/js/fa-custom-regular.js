// Custom REGULAR - Font Awesome Icon Set
// - Much more light weight to only list icons we're using

/*!
 * Font Awesome Pro 5.0.9 by @fontawesome - https://fontawesome.com
 * License - https://fontawesome.com/license (Commercial License)
 */
(function () {
  'use strict';
  
  var _WINDOW = {};
  try {
    if (typeof window !== 'undefined') _WINDOW = window;
    
  } catch (e) {}
  
  var _ref = _WINDOW.navigator || {};
  var _ref$userAgent = _ref.userAgent;
  var userAgent = _ref$userAgent === undefined ? '' : _ref$userAgent;
  
  var WINDOW = _WINDOW;
  
  

  var IS_IE = ~userAgent.indexOf('MSIE') || ~userAgent.indexOf('Trident/');
  
  var NAMESPACE_IDENTIFIER = '___FONT_AWESOME___';
  
  

  var PRODUCTION = function () {
    try {
      return "production" === 'production';
    } catch (e) {
      return false;
    }
  }();
  
  var oneToTen = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  var oneToTwenty = oneToTen.concat([11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
  
  
  
  var RESERVED_CLASSES = ['xs', 'sm', 'lg', 'fw', 'ul', 'li', 'border', 'pull-left', 'pull-right', 'spin', 'pulse', 'rotate-90', 'rotate-180', 'rotate-270', 'flip-horizontal', 'flip-vertical', 'stack', 'stack-1x', 'stack-2x', 'inverse', 'layers', 'layers-text', 'layers-counter'].concat(oneToTen.map(function (n) {
    return n + 'x';
  })).concat(oneToTwenty.map(function (n) {
    return 'w-' + n;
  }));
  
  function bunker(fn) {
    try {
      fn();
    } catch (e) {
      if (!PRODUCTION) {
        throw e;
      }
    }
  }
  
  var w = WINDOW || {};
  
  if (!w[NAMESPACE_IDENTIFIER]) w[NAMESPACE_IDENTIFIER] = {};
  if (!w[NAMESPACE_IDENTIFIER].styles) w[NAMESPACE_IDENTIFIER].styles = {};
  if (!w[NAMESPACE_IDENTIFIER].hooks) w[NAMESPACE_IDENTIFIER].hooks = {};
  if (!w[NAMESPACE_IDENTIFIER].shims) w[NAMESPACE_IDENTIFIER].shims = [];
  
  var namespace = w[NAMESPACE_IDENTIFIER];
  
  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
  
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
  
    return target;
  };
  
  function define(prefix, icons) {
    var normalized = Object.keys(icons).reduce(function (acc, iconName) {
      var icon = icons[iconName];
      var expanded = !!icon.icon;
  
      if (expanded) {
        acc[icon.iconName] = icon.icon;
      } else {
        acc[iconName] = icon;
      }
      return acc;
    }, {});
  
    if (typeof namespace.hooks.addPack === 'function') {
      namespace.hooks.addPack(prefix, normalized);
    } else {
      namespace.styles[prefix] = _extends({}, namespace.styles[prefix] || {}, normalized);
    }
  
    /**
     * Font Awesome 4 used the prefix of `fa` for all icons. With the introduction
     * of new styles we needed to differentiate between them. Prefix `fa` is now an alias
     * for `fas` so we'll easy the upgrade process for our users by automatically defining
     * this as well.
     */
    if (prefix === 'fas') {
      define('fa', icons);
    }
  }
  
  var icons = {

  // Exchange
  "exchange-alt": [512, 512, [], "f362", "M508.485 168.48l-96.16 96.16c-7.58 7.58-20.485 2.14-20.485-8.485L391.833 184H12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h379.833l.01-72.162c.001-10.683 12.949-16.022 20.485-8.485l96.156 96.156c4.687 4.686 4.688 12.285.001 16.971zM3.515 360.491l96.156 96.156c7.536 7.536 20.484 2.198 20.485-8.485l.01-72.162H500c6.627 0 12-5.373 12-12v-24c0-6.628-5.373-12-12-12H120.167l-.007-72.154c0-10.625-12.905-16.066-20.485-8.485l-96.16 96.16c-4.687 4.685-4.686 12.284 0 16.97z"],
  // Line Chart w/ Upwards Arrow
  "chart-line": [512, 512, [], "f201", "M500 400c6.6 0 12 5.4 12 12v24c0 6.6-5.4 12-12 12H12c-6.6 0-12-5.4-12-12V76c0-6.6 5.4-12 12-12h24c6.6 0 12 5.4 12 12v324h452zM468 96H332c-10.7 0-16 12.9-8.5 20.5l52 52L288 256l-64-64L79 334.1l34 33.9 111-110.1 64 62.1 120.8-118.2 50.7 50.7c7.6 7.6 20.5 2.2 20.5-8.5V108c0-6.6-5.4-12-12-12z"],
  // Clipboard with Checkmark
  "clipboard-check": [384, 512, [], "f46c", "M269.3 225.8c-3.9-3.9-10.2-3.9-14.1-.1l-88 87.3-38.1-38.5c-3.9-3.9-10.2-3.9-14.1-.1l-23.6 23.4c-3.9 3.9-3.9 10.2-.1 14.1l68.5 69.1c3.9 3.9 10.2 3.9 14.1.1l118.6-117.6c3.9-3.9 3.9-10.2.1-14.1l-23.3-23.6zM336 64h-80c0-35.3-28.7-64-64-64s-64 28.7-64 64H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zM192 48c8.8 0 16 7.2 16 16s-7.2 16-16 16-16-7.2-16-16 7.2-16 16-16zm144 408c0 4.4-3.6 8-8 8H56c-4.4 0-8-3.6-8-8V120c0-4.4 3.6-8 8-8h40v32c0 8.8 7.2 16 16 16h160c8.8 0 16-7.2 16-16v-32h40c4.4 0 8 3.6 8 8v336z"],
};

bunker(function () {
  define('far', icons);
});

}());
