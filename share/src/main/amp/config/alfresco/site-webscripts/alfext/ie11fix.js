(function() {
    // patch yui to support IE 11 UA detection
    /**
     * patch ie11 UA detection for yui2
     * https://github.com/jenkinsci/jenkins/commit/980de3601c66d1ca1807bca98efd8ddc7827b843
     * 
     */
    /**
     * parses a user agent string (or looks for one in navigator to parse if not
     * supplied).
     * 
     * @method parseUA
     * @since 2.9.0
     * @static
     */
    YAHOO.env.parseUA = function(agent) {

        var numberify = function(s) {
            var c = 0;
            return parseFloat(s.replace(/\./g, function() {
                return (c++ == 1) ? '' : '.';
            }));
        },

        nav = navigator,

        o = {

            /**
             * Internet Explorer version number or 0. Example: 6
             * 
             * @property ie
             * @type float
             * @static
             */
            ie : 0,

            /**
             * Opera version number or 0. Example: 9.2
             * 
             * @property opera
             * @type float
             * @static
             */
            opera : 0,

            /**
             * Gecko engine revision number. Will evaluate to 1 if Gecko is
             * detected but the revision could not be found. Other browsers will
             * be 0. Example: 1.8
             * 
             * <pre>
             * Firefox 1.0.0.4: 1.7.8   &lt;-- Reports 1.7
             * Firefox 1.5.0.9: 1.8.0.9 &lt;-- 1.8
             * Firefox 2.0.0.3: 1.8.1.3 &lt;-- 1.81
             * Firefox 3.0   &lt;-- 1.9
             * Firefox 3.5   &lt;-- 1.91
             * </pre>
             * 
             * @property gecko
             * @type float
             * @static
             */
            gecko : 0,

            /**
             * AppleWebKit version. KHTML browsers that are not WebKit browsers
             * will evaluate to 1, other browsers 0. Example: 418.9
             * 
             * <pre>
             * Safari 1.3.2 (312.6): 312.8.1 &lt;-- Reports 312.8 -- currently the
             *                                   latest available for Mac OSX 10.3.
             * Safari 2.0.2:         416     &lt;-- hasOwnProperty introduced
             * Safari 2.0.4:         418     &lt;-- preventDefault fixed
             * Safari 2.0.4 (419.3): 418.9.1 &lt;-- One version of Safari may run
             *                                   different versions of webkit
             * Safari 2.0.4 (419.3): 419     &lt;-- Tiger installations that have been
             *                                   updated, but not updated
             *                                   to the latest patch.
             * Webkit 212 nightly:   522+    &lt;-- Safari 3.0 precursor (with native
             * SVG and many major issues fixed).
             * Safari 3.0.4 (523.12) 523.12  &lt;-- First Tiger release - automatic
             * update from 2.x via the 10.4.11 OS patch.
             * Webkit nightly 1/2008:525+    &lt;-- Supports DOMContentLoaded event.
             *                                   yahoo.com user agent hack removed.
             * </pre>
             * 
             * http://en.wikipedia.org/wiki/Safari_version_history
             * 
             * @property webkit
             * @type float
             * @static
             */
            webkit : 0,

            /**
             * Chrome will be detected as webkit, but this property will also be
             * populated with the Chrome version number
             * 
             * @property chrome
             * @type float
             * @static
             */

            chrome : 0,

            /**
             * The mobile property will be set to a string containing any
             * relevant user agent information when a modern mobile browser is
             * detected. Currently limited to Safari on the iPhone/iPod Touch,
             * Nokia N-series devices with the WebKit-based browser, and Opera
             * Mini.
             * 
             * @property mobile
             * @type string
             * @static
             */
            mobile : null,

            /**
             * Adobe AIR version number or 0. Only populated if webkit is
             * detected. Example: 1.0
             * 
             * @property air
             * @type float
             */
            air : 0,
            /**
             * Detects Apple iPad's OS version
             * 
             * @property ipad
             * @type float
             * @static
             */
            ipad : 0,
            /**
             * Detects Apple iPhone's OS version
             * 
             * @property iphone
             * @type float
             * @static
             */
            iphone : 0,
            /**
             * Detects Apples iPod's OS version
             * 
             * @property ipod
             * @type float
             * @static
             */
            ipod : 0,
            /**
             * General truthy check for iPad, iPhone or iPod
             * 
             * @property ios
             * @type float
             * @static
             */
            ios : null,
            /**
             * Detects Googles Android OS version
             * 
             * @property android
             * 
             * @type float
             * @static
             */
            android : 0,
            /**
             * Detects Palms WebOS version
             * 
             * @property webos
             * @type float
             * @static
             */
            webos : 0,

            /**
             * Google Caja version number or 0.
             * 
             * @property caja
             * @type float
             */
            caja : nav && nav.cajaVersion,

            /**
             * Set to true if the page appears to be in SSL
             * 
             * @property secure
             * @type boolean
             * @static
             */
            secure : false,

            /**
             * The operating system. Currently only detecting windows or
             * macintosh
             * 
             * @property os
             * @type string
             * @static
             */
            os : null

        },

        ua = agent || (navigator && navigator.userAgent),

        loc = window && window.location,

        href = loc && loc.href,

        m;

        o.secure = href && (href.toLowerCase().indexOf("https") === 0);

        if (ua) {

            if ((/windows|win32/i).test(ua)) {

                o.os = 'windows';
            } else if ((/macintosh/i).test(ua)) {
                o.os = 'macintosh';
            } else if ((/rhino/i).test(ua)) {
                o.os = 'rhino';
            }

            // Modern KHTML browsers should qualify as Safari X-Grade
            if ((/KHTML/).test(ua)) {
                o.webkit = 1;
            }
            // Modern WebKit browsers are at least X-Grade
            m = ua.match(/AppleWebKit\/([^\s]*)/);
            if (m && m[1]) {
                o.webkit = numberify(m[1]);

                // Mobile browser check
                if (/ Mobile\//.test(ua)) {
                    o.mobile = 'Apple'; // iPhone or iPod Touch

                    m = ua.match(/OS ([^\s]*)/);
                    if (m && m[1]) {
                        m = numberify(m[1].replace('_', '.'));
                    }
                    o.ios = m;
                    o.ipad = o.ipod = o.iphone = 0;

                    m = ua.match(/iPad|iPod|iPhone/);
                    if (m && m[0]) {
                        o[m[0].toLowerCase()] = o.ios;
                    }
                } else {
                    m = ua.match(/NokiaN[^\/]*|Android \d\.\d|webOS\/\d\.\d/);
                    if (m) {
                        // Nokia N-series, Android, webOS, ex: NokiaN95
                        o.mobile = m[0];
                    }
                    if (/webOS/.test(ua)) {
                        o.mobile = 'WebOS';
                        m = ua.match(/webOS\/([^\s]*);/);
                        if (m && m[1]) {
                            o.webos = numberify(m[1]);
                        }
                    }
                    if (/ Android/.test(ua)) {
                        o.mobile = 'Android';
                        m = ua.match(/Android ([^\s]*);/);
                        if (m && m[1]) {
                            o.android = numberify(m[1]);
                        }

                    }
                }

                m = ua.match(/Chrome\/([^\s]*)/);
                if (m && m[1]) {
                    o.chrome = numberify(m[1]); // Chrome
                } else {
                    m = ua.match(/AdobeAIR\/([^\s]*)/);
                    if (m) {
                        o.air = m[0]; // Adobe AIR 1.0 or better
                    }
                }
            }

            if (!o.webkit) { // not webkit
                // @todo check Opera/8.01 (J2ME/MIDP; Opera Mini/2.0.4509/1316;
                // fi;
                // U; ssr)
                m = ua.match(/Opera[\s\/]([^\s]*)/);
                if (m && m[1]) {
                    o.opera = numberify(m[1]);
                    m = ua.match(/Version\/([^\s]*)/);
                    if (m && m[1]) {
                        o.opera = numberify(m[1]); // opera 10+
                    }
                    m = ua.match(/Opera Mini[^;]*/);
                    if (m) {
                        o.mobile = m[0]; // ex: Opera Mini/2.0.4509/1316
                    }
                } else { // not opera or webkit
                    m = ua.match(/MSIE ([^;]*)|Trident.*; rv:([0-9.]+)/);
                    if (m && (m[1] || m[2])) {
                        o.ie = numberify(m[1] || m[2]);
                    } else { // not opera, webkit, or ie
                        m = ua.match(/Gecko\/([^\s]*)/);
                        if (m) {
                            o.gecko = 1; // Gecko detected, look for revision
                            m = ua.match(/rv:([^\s\)]*)/);
                            if (m && m[1]) {
                                o.gecko = numberify(m[1]);
                            }
                        }
                    }
                }
            }
        }

        return o;
    };

    YAHOO.env.ua = YAHOO.env.parseUA();
})();

// patched from file js/flash/AC_OETags-min.js

// AC_OE fix flash previewer detection with IE11
// file js/flash/AC_OETags-min.js defined the global isIE

isIE = YAHOO.env.ua.ie > 0 ? true : false;

function DetectFlashVer(reqMajorVer, reqMinorVer, reqRevision) {
    versionStr = GetSwfVer();
    if (versionStr == -1) {
        return false;
    } else if (versionStr != 0) {
        // patch: isWin is true for ie11 but versionStr does not contain WIN...
        if (isIE && versionStr.match(/.*\s+.*/) && !isOpera) {
            // Given "WIN 2,0,0,11"
            tempArray = versionStr.split(" "); // ["WIN", "2,0,0,11"]
            tempString = tempArray[1]; // "2,0,0,11"
            versionArray = tempString.split(","); // ['2', '0', '0', '11']
        } else {
            versionArray = versionStr.split(".");
        }
        var versionMajor = versionArray[0];
        var versionMinor = versionArray[1];
        var versionRevision = versionArray[2];

        // is the major.revision >= requested major.revision AND the minor
        // version >= requested minor
        if (versionMajor > parseFloat(reqMajorVer)) {
            return true;
        } else if (versionMajor == parseFloat(reqMajorVer)) {
            if (versionMinor > parseFloat(reqMinorVer))
                return true;
            else if (versionMinor == parseFloat(reqMinorVer)) {
                if (versionRevision >= parseFloat(reqRevision))
                    return true;
            }
        }
        return false;
    }
}
