// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
    'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
    'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
    'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
    'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Place any jQuery/helper plugins in here.
var UTILS = (function () {

    return {
        /**
         * Check if a given value is a plain Object
         *
         * @param  {*}       o Any value to be checked
         * @return {Boolean}   true if it's an Object
         */
         isObject: function (o) {
            var toString = Object.prototype.toString;
            return (toString.call(o) === toString.call({}));
        },

        /**
         * Cross browser even handler
         *
         * @param {Object}   elm     Element on which the event will be bound
         * @param {string}   type    Event type or types (e.g. 'click', 'click input')
         * @param {Function} handler Callback function to run when event is fired
         */
         addEvent: function (elm, type, handler) {
            var types = type.split(' '),
            ieHandler;

            // Recurse if multiple event types were given
            if (types.length > 1) {
                // On each iteration, remove the first value in the array
                while (types.length) {
                    UTILS.addEvent(elm, types.shift(), handler);
                }

                return;
            }

            if (window.addEventListener) {
                // Modern browsers
                elm.addEventListener(type, handler, false);
            } else if (window.attachEvent) {
                // IE8 and below
                // Required for normalizing the "event" object
                ieHandler = function (e) {
                    e.target = e.target || e.srcElement;
                    e.currentTarget = e.currentTarget || elm;

                    e.stopPropagation = e.stopPropagation || function () {
                        e.cancelBubble = true;
                    };

                    e.preventDefault = e.preventDefault || function () {
                        e.returnValue = false;
                    };

                    return handler.call(elm, e);
                };

                // Save a reference to the handler as a unique key
                elm[type + handler] = ieHandler;
                elm.attachEvent('on' + type, ieHandler);
            }
        },

        /**
         * Cross browser event removal
         *
         * @param {Object}   elm     Element on which the event should be unbound
         * @param {string}   type    Event type to unbind
         * @param {Function} handler Reference to the original callback function
         */
         removeEvent: function (elm, type, handler) {
            var handlerRef;

            if (window.removeEventListener) {
                // Modern browsers
                elm.removeEventListener(type, handler, false);
            } else if (window.detachEvent) {
                // IE8 and below
                handlerRef = elm[type + handler];

                // Make sure the handler key exists
                if (handlerRef) {
                    elm.detachEvent('on' + type, handlerRef);
                    // Remove the key from the object, prevent memory leaks
                    delete elm[type + handler];
                }
            }
        },

        /**
         * Check if a given value is a plain Object
         *
         * @param  {*}       o Any value to be checked
         * @return {Boolean}   true if it's an Object
         */
         isObject: function (o) {
            var toString = Object.prototype.toString;
            return (toString.call(o) === toString.call({}));
        },

        
    };


}());