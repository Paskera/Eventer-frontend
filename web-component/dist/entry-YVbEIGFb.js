import { n as e, t } from "./chunk-efA98nb6.js";
//#region node_modules/react/cjs/react.production.js
var n = /* @__PURE__ */ t(((e) => {
	var t = Symbol.for("react.transitional.element"), n = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), i = Symbol.for("react.strict_mode"), a = Symbol.for("react.profiler"), o = Symbol.for("react.consumer"), s = Symbol.for("react.context"), c = Symbol.for("react.forward_ref"), l = Symbol.for("react.suspense"), u = Symbol.for("react.memo"), d = Symbol.for("react.lazy"), f = Symbol.iterator;
	function p(e) {
		return typeof e != "object" || !e ? null : (e = f && e[f] || e["@@iterator"], typeof e == "function" ? e : null);
	}
	var m = {
		isMounted: function() {
			return !1;
		},
		enqueueForceUpdate: function() {},
		enqueueReplaceState: function() {},
		enqueueSetState: function() {}
	}, h = Object.assign, g = {};
	function _(e, t, n) {
		this.props = e, this.context = t, this.refs = g, this.updater = n || m;
	}
	_.prototype.isReactComponent = {}, _.prototype.setState = function(e, t) {
		if (typeof e != "object" && typeof e != "function" && e != null) throw Error("takes an object of state variables to update or a function which returns an object of state variables.");
		this.updater.enqueueSetState(this, e, t, "setState");
	}, _.prototype.forceUpdate = function(e) {
		this.updater.enqueueForceUpdate(this, e, "forceUpdate");
	};
	function v() {}
	v.prototype = _.prototype;
	function y(e, t, n) {
		this.props = e, this.context = t, this.refs = g, this.updater = n || m;
	}
	var b = y.prototype = new v();
	b.constructor = y, h(b, _.prototype), b.isPureReactComponent = !0;
	var x = Array.isArray, S = {
		H: null,
		A: null,
		T: null,
		S: null
	}, C = Object.prototype.hasOwnProperty;
	function w(e, n, r, i, a, o) {
		return r = o.ref, {
			$$typeof: t,
			type: e,
			key: n,
			ref: r === void 0 ? null : r,
			props: o
		};
	}
	function T(e, t) {
		return w(e.type, t, void 0, void 0, void 0, e.props);
	}
	function E(e) {
		return typeof e == "object" && !!e && e.$$typeof === t;
	}
	function D(e) {
		var t = {
			"=": "=0",
			":": "=2"
		};
		return "$" + e.replace(/[=:]/g, function(e) {
			return t[e];
		});
	}
	var O = /\/+/g;
	function k(e, t) {
		return typeof e == "object" && e && e.key != null ? D("" + e.key) : t.toString(36);
	}
	function A() {}
	function j(e) {
		switch (e.status) {
			case "fulfilled": return e.value;
			case "rejected": throw e.reason;
			default: switch (typeof e.status == "string" ? e.then(A, A) : (e.status = "pending", e.then(function(t) {
				e.status === "pending" && (e.status = "fulfilled", e.value = t);
			}, function(t) {
				e.status === "pending" && (e.status = "rejected", e.reason = t);
			})), e.status) {
				case "fulfilled": return e.value;
				case "rejected": throw e.reason;
			}
		}
		throw e;
	}
	function M(e, r, i, a, o) {
		var s = typeof e;
		(s === "undefined" || s === "boolean") && (e = null);
		var c = !1;
		if (e === null) c = !0;
		else switch (s) {
			case "bigint":
			case "string":
			case "number":
				c = !0;
				break;
			case "object": switch (e.$$typeof) {
				case t:
				case n:
					c = !0;
					break;
				case d: return c = e._init, M(c(e._payload), r, i, a, o);
			}
		}
		if (c) return o = o(e), c = a === "" ? "." + k(e, 0) : a, x(o) ? (i = "", c != null && (i = c.replace(O, "$&/") + "/"), M(o, r, i, "", function(e) {
			return e;
		})) : o != null && (E(o) && (o = T(o, i + (o.key == null || e && e.key === o.key ? "" : ("" + o.key).replace(O, "$&/") + "/") + c)), r.push(o)), 1;
		c = 0;
		var l = a === "" ? "." : a + ":";
		if (x(e)) for (var u = 0; u < e.length; u++) a = e[u], s = l + k(a, u), c += M(a, r, i, s, o);
		else if (u = p(e), typeof u == "function") for (e = u.call(e), u = 0; !(a = e.next()).done;) a = a.value, s = l + k(a, u++), c += M(a, r, i, s, o);
		else if (s === "object") {
			if (typeof e.then == "function") return M(j(e), r, i, a, o);
			throw r = String(e), Error("Objects are not valid as a React child (found: " + (r === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : r) + "). If you meant to render a collection of children, use an array instead.");
		}
		return c;
	}
	function N(e, t, n) {
		if (e == null) return e;
		var r = [], i = 0;
		return M(e, r, "", "", function(e) {
			return t.call(n, e, i++);
		}), r;
	}
	function P(e) {
		if (e._status === -1) {
			var t = e._result;
			t = t(), t.then(function(t) {
				(e._status === 0 || e._status === -1) && (e._status = 1, e._result = t);
			}, function(t) {
				(e._status === 0 || e._status === -1) && (e._status = 2, e._result = t);
			}), e._status === -1 && (e._status = 0, e._result = t);
		}
		if (e._status === 1) return e._result.default;
		throw e._result;
	}
	var F = typeof reportError == "function" ? reportError : function(e) {
		if (typeof window == "object" && typeof window.ErrorEvent == "function") {
			var t = new window.ErrorEvent("error", {
				bubbles: !0,
				cancelable: !0,
				message: typeof e == "object" && e && typeof e.message == "string" ? String(e.message) : String(e),
				error: e
			});
			if (!window.dispatchEvent(t)) return;
		} else if (typeof process == "object" && typeof process.emit == "function") {
			process.emit("uncaughtException", e);
			return;
		}
		console.error(e);
	};
	function I() {}
	e.Children = {
		map: N,
		forEach: function(e, t, n) {
			N(e, function() {
				t.apply(this, arguments);
			}, n);
		},
		count: function(e) {
			var t = 0;
			return N(e, function() {
				t++;
			}), t;
		},
		toArray: function(e) {
			return N(e, function(e) {
				return e;
			}) || [];
		},
		only: function(e) {
			if (!E(e)) throw Error("React.Children.only expected to receive a single React element child.");
			return e;
		}
	}, e.Component = _, e.Fragment = r, e.Profiler = a, e.PureComponent = y, e.StrictMode = i, e.Suspense = l, e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = S, e.act = function() {
		throw Error("act(...) is not supported in production builds of React.");
	}, e.cache = function(e) {
		return function() {
			return e.apply(null, arguments);
		};
	}, e.cloneElement = function(e, t, n) {
		if (e == null) throw Error("The argument must be a React element, but you passed " + e + ".");
		var r = h({}, e.props), i = e.key, a = void 0;
		if (t != null) for (o in t.ref !== void 0 && (a = void 0), t.key !== void 0 && (i = "" + t.key), t) !C.call(t, o) || o === "key" || o === "__self" || o === "__source" || o === "ref" && t.ref === void 0 || (r[o] = t[o]);
		var o = arguments.length - 2;
		if (o === 1) r.children = n;
		else if (1 < o) {
			for (var s = Array(o), c = 0; c < o; c++) s[c] = arguments[c + 2];
			r.children = s;
		}
		return w(e.type, i, void 0, void 0, a, r);
	}, e.createContext = function(e) {
		return e = {
			$$typeof: s,
			_currentValue: e,
			_currentValue2: e,
			_threadCount: 0,
			Provider: null,
			Consumer: null
		}, e.Provider = e, e.Consumer = {
			$$typeof: o,
			_context: e
		}, e;
	}, e.createElement = function(e, t, n) {
		var r, i = {}, a = null;
		if (t != null) for (r in t.key !== void 0 && (a = "" + t.key), t) C.call(t, r) && r !== "key" && r !== "__self" && r !== "__source" && (i[r] = t[r]);
		var o = arguments.length - 2;
		if (o === 1) i.children = n;
		else if (1 < o) {
			for (var s = Array(o), c = 0; c < o; c++) s[c] = arguments[c + 2];
			i.children = s;
		}
		if (e && e.defaultProps) for (r in o = e.defaultProps, o) i[r] === void 0 && (i[r] = o[r]);
		return w(e, a, void 0, void 0, null, i);
	}, e.createRef = function() {
		return { current: null };
	}, e.forwardRef = function(e) {
		return {
			$$typeof: c,
			render: e
		};
	}, e.isValidElement = E, e.lazy = function(e) {
		return {
			$$typeof: d,
			_payload: {
				_status: -1,
				_result: e
			},
			_init: P
		};
	}, e.memo = function(e, t) {
		return {
			$$typeof: u,
			type: e,
			compare: t === void 0 ? null : t
		};
	}, e.startTransition = function(e) {
		var t = S.T, n = {};
		S.T = n;
		try {
			var r = e(), i = S.S;
			i !== null && i(n, r), typeof r == "object" && r && typeof r.then == "function" && r.then(I, F);
		} catch (e) {
			F(e);
		} finally {
			S.T = t;
		}
	}, e.unstable_useCacheRefresh = function() {
		return S.H.useCacheRefresh();
	}, e.use = function(e) {
		return S.H.use(e);
	}, e.useActionState = function(e, t, n) {
		return S.H.useActionState(e, t, n);
	}, e.useCallback = function(e, t) {
		return S.H.useCallback(e, t);
	}, e.useContext = function(e) {
		return S.H.useContext(e);
	}, e.useDebugValue = function() {}, e.useDeferredValue = function(e, t) {
		return S.H.useDeferredValue(e, t);
	}, e.useEffect = function(e, t) {
		return S.H.useEffect(e, t);
	}, e.useId = function() {
		return S.H.useId();
	}, e.useImperativeHandle = function(e, t, n) {
		return S.H.useImperativeHandle(e, t, n);
	}, e.useInsertionEffect = function(e, t) {
		return S.H.useInsertionEffect(e, t);
	}, e.useLayoutEffect = function(e, t) {
		return S.H.useLayoutEffect(e, t);
	}, e.useMemo = function(e, t) {
		return S.H.useMemo(e, t);
	}, e.useOptimistic = function(e, t) {
		return S.H.useOptimistic(e, t);
	}, e.useReducer = function(e, t, n) {
		return S.H.useReducer(e, t, n);
	}, e.useRef = function(e) {
		return S.H.useRef(e);
	}, e.useState = function(e) {
		return S.H.useState(e);
	}, e.useSyncExternalStore = function(e, t, n) {
		return S.H.useSyncExternalStore(e, t, n);
	}, e.useTransition = function() {
		return S.H.useTransition();
	}, e.version = "19.0.0";
})), r = /* @__PURE__ */ t(((e, t) => {
	t.exports = n();
})), i = /* @__PURE__ */ t(((e) => {
	function t(e, t) {
		var n = e.length;
		e.push(t);
		a: for (; 0 < n;) {
			var r = n - 1 >>> 1, a = e[r];
			if (0 < i(a, t)) e[r] = t, e[n] = a, n = r;
			else break a;
		}
	}
	function n(e) {
		return e.length === 0 ? null : e[0];
	}
	function r(e) {
		if (e.length === 0) return null;
		var t = e[0], n = e.pop();
		if (n !== t) {
			e[0] = n;
			a: for (var r = 0, a = e.length, o = a >>> 1; r < o;) {
				var s = 2 * (r + 1) - 1, c = e[s], l = s + 1, u = e[l];
				if (0 > i(c, n)) l < a && 0 > i(u, c) ? (e[r] = u, e[l] = n, r = l) : (e[r] = c, e[s] = n, r = s);
				else if (l < a && 0 > i(u, n)) e[r] = u, e[l] = n, r = l;
				else break a;
			}
		}
		return t;
	}
	function i(e, t) {
		var n = e.sortIndex - t.sortIndex;
		return n === 0 ? e.id - t.id : n;
	}
	if (e.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
		var a = performance;
		e.unstable_now = function() {
			return a.now();
		};
	} else {
		var o = Date, s = o.now();
		e.unstable_now = function() {
			return o.now() - s;
		};
	}
	var c = [], l = [], u = 1, d = null, f = 3, p = !1, m = !1, h = !1, g = typeof setTimeout == "function" ? setTimeout : null, _ = typeof clearTimeout == "function" ? clearTimeout : null, v = typeof setImmediate < "u" ? setImmediate : null;
	function y(e) {
		for (var i = n(l); i !== null;) {
			if (i.callback === null) r(l);
			else if (i.startTime <= e) r(l), i.sortIndex = i.expirationTime, t(c, i);
			else break;
			i = n(l);
		}
	}
	function b(e) {
		if (h = !1, y(e), !m) if (n(c) !== null) m = !0, A();
		else {
			var t = n(l);
			t !== null && j(b, t.startTime - e);
		}
	}
	var x = !1, S = -1, C = 5, w = -1;
	function T() {
		return !(e.unstable_now() - w < C);
	}
	function E() {
		if (x) {
			var t = e.unstable_now();
			w = t;
			var i = !0;
			try {
				a: {
					m = !1, h && (h = !1, _(S), S = -1), p = !0;
					var a = f;
					try {
						b: {
							for (y(t), d = n(c); d !== null && !(d.expirationTime > t && T());) {
								var o = d.callback;
								if (typeof o == "function") {
									d.callback = null, f = d.priorityLevel;
									var s = o(d.expirationTime <= t);
									if (t = e.unstable_now(), typeof s == "function") {
										d.callback = s, y(t), i = !0;
										break b;
									}
									d === n(c) && r(c), y(t);
								} else r(c);
								d = n(c);
							}
							if (d !== null) i = !0;
							else {
								var u = n(l);
								u !== null && j(b, u.startTime - t), i = !1;
							}
						}
						break a;
					} finally {
						d = null, f = a, p = !1;
					}
					i = void 0;
				}
			} finally {
				i ? D() : x = !1;
			}
		}
	}
	var D;
	if (typeof v == "function") D = function() {
		v(E);
	};
	else if (typeof MessageChannel < "u") {
		var O = new MessageChannel(), k = O.port2;
		O.port1.onmessage = E, D = function() {
			k.postMessage(null);
		};
	} else D = function() {
		g(E, 0);
	};
	function A() {
		x || (x = !0, D());
	}
	function j(t, n) {
		S = g(function() {
			t(e.unstable_now());
		}, n);
	}
	e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(e) {
		e.callback = null;
	}, e.unstable_continueExecution = function() {
		m || p || (m = !0, A());
	}, e.unstable_forceFrameRate = function(e) {
		0 > e || 125 < e ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : C = 0 < e ? Math.floor(1e3 / e) : 5;
	}, e.unstable_getCurrentPriorityLevel = function() {
		return f;
	}, e.unstable_getFirstCallbackNode = function() {
		return n(c);
	}, e.unstable_next = function(e) {
		switch (f) {
			case 1:
			case 2:
			case 3:
				var t = 3;
				break;
			default: t = f;
		}
		var n = f;
		f = t;
		try {
			return e();
		} finally {
			f = n;
		}
	}, e.unstable_pauseExecution = function() {}, e.unstable_requestPaint = function() {}, e.unstable_runWithPriority = function(e, t) {
		switch (e) {
			case 1:
			case 2:
			case 3:
			case 4:
			case 5: break;
			default: e = 3;
		}
		var n = f;
		f = e;
		try {
			return t();
		} finally {
			f = n;
		}
	}, e.unstable_scheduleCallback = function(r, i, a) {
		var o = e.unstable_now();
		switch (typeof a == "object" && a ? (a = a.delay, a = typeof a == "number" && 0 < a ? o + a : o) : a = o, r) {
			case 1:
				var s = -1;
				break;
			case 2:
				s = 250;
				break;
			case 5:
				s = 1073741823;
				break;
			case 4:
				s = 1e4;
				break;
			default: s = 5e3;
		}
		return s = a + s, r = {
			id: u++,
			callback: i,
			priorityLevel: r,
			startTime: a,
			expirationTime: s,
			sortIndex: -1
		}, a > o ? (r.sortIndex = a, t(l, r), n(c) === null && r === n(l) && (h ? (_(S), S = -1) : h = !0, j(b, a - o))) : (r.sortIndex = s, t(c, r), m || p || (m = !0, A())), r;
	}, e.unstable_shouldYield = T, e.unstable_wrapCallback = function(e) {
		var t = f;
		return function() {
			var n = f;
			f = t;
			try {
				return e.apply(this, arguments);
			} finally {
				f = n;
			}
		};
	};
})), a = /* @__PURE__ */ t(((e, t) => {
	t.exports = i();
})), o = /* @__PURE__ */ t(((e) => {
	var t = r();
	function n(e) {
		var t = "https://react.dev/errors/" + e;
		if (1 < arguments.length) {
			t += "?args[]=" + encodeURIComponent(arguments[1]);
			for (var n = 2; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
		}
		return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
	}
	function i() {}
	var a = {
		d: {
			f: i,
			r: function() {
				throw Error(n(522));
			},
			D: i,
			C: i,
			L: i,
			m: i,
			X: i,
			S: i,
			M: i
		},
		p: 0,
		findDOMNode: null
	}, o = Symbol.for("react.portal");
	function s(e, t, n) {
		var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
		return {
			$$typeof: o,
			key: r == null ? null : "" + r,
			children: e,
			containerInfo: t,
			implementation: n
		};
	}
	var c = t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
	function l(e, t) {
		if (e === "font") return "";
		if (typeof t == "string") return t === "use-credentials" ? t : "";
	}
	e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = a, e.createPortal = function(e, t) {
		var r = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
		if (!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11) throw Error(n(299));
		return s(e, t, null, r);
	}, e.flushSync = function(e) {
		var t = c.T, n = a.p;
		try {
			if (c.T = null, a.p = 2, e) return e();
		} finally {
			c.T = t, a.p = n, a.d.f();
		}
	}, e.preconnect = function(e, t) {
		typeof e == "string" && (t ? (t = t.crossOrigin, t = typeof t == "string" ? t === "use-credentials" ? t : "" : void 0) : t = null, a.d.C(e, t));
	}, e.prefetchDNS = function(e) {
		typeof e == "string" && a.d.D(e);
	}, e.preinit = function(e, t) {
		if (typeof e == "string" && t && typeof t.as == "string") {
			var n = t.as, r = l(n, t.crossOrigin), i = typeof t.integrity == "string" ? t.integrity : void 0, o = typeof t.fetchPriority == "string" ? t.fetchPriority : void 0;
			n === "style" ? a.d.S(e, typeof t.precedence == "string" ? t.precedence : void 0, {
				crossOrigin: r,
				integrity: i,
				fetchPriority: o
			}) : n === "script" && a.d.X(e, {
				crossOrigin: r,
				integrity: i,
				fetchPriority: o,
				nonce: typeof t.nonce == "string" ? t.nonce : void 0
			});
		}
	}, e.preinitModule = function(e, t) {
		if (typeof e == "string") if (typeof t == "object" && t) {
			if (t.as == null || t.as === "script") {
				var n = l(t.as, t.crossOrigin);
				a.d.M(e, {
					crossOrigin: n,
					integrity: typeof t.integrity == "string" ? t.integrity : void 0,
					nonce: typeof t.nonce == "string" ? t.nonce : void 0
				});
			}
		} else t ?? a.d.M(e);
	}, e.preload = function(e, t) {
		if (typeof e == "string" && typeof t == "object" && t && typeof t.as == "string") {
			var n = t.as, r = l(n, t.crossOrigin);
			a.d.L(e, n, {
				crossOrigin: r,
				integrity: typeof t.integrity == "string" ? t.integrity : void 0,
				nonce: typeof t.nonce == "string" ? t.nonce : void 0,
				type: typeof t.type == "string" ? t.type : void 0,
				fetchPriority: typeof t.fetchPriority == "string" ? t.fetchPriority : void 0,
				referrerPolicy: typeof t.referrerPolicy == "string" ? t.referrerPolicy : void 0,
				imageSrcSet: typeof t.imageSrcSet == "string" ? t.imageSrcSet : void 0,
				imageSizes: typeof t.imageSizes == "string" ? t.imageSizes : void 0,
				media: typeof t.media == "string" ? t.media : void 0
			});
		}
	}, e.preloadModule = function(e, t) {
		if (typeof e == "string") if (t) {
			var n = l(t.as, t.crossOrigin);
			a.d.m(e, {
				as: typeof t.as == "string" && t.as !== "script" ? t.as : void 0,
				crossOrigin: n,
				integrity: typeof t.integrity == "string" ? t.integrity : void 0
			});
		} else a.d.m(e);
	}, e.requestFormReset = function(e) {
		a.d.r(e);
	}, e.unstable_batchedUpdates = function(e, t) {
		return e(t);
	}, e.useFormState = function(e, t, n) {
		return c.H.useFormState(e, t, n);
	}, e.useFormStatus = function() {
		return c.H.useHostTransitionStatus();
	}, e.version = "19.0.0";
})), s = /* @__PURE__ */ t(((e, t) => {
	function n() {
		if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
			__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
		} catch (e) {
			console.error(e);
		}
	}
	n(), t.exports = o();
})), c = /* @__PURE__ */ t(((e) => {
	var t = a(), n = r(), i = s();
	function o(e) {
		var t = "https://react.dev/errors/" + e;
		if (1 < arguments.length) {
			t += "?args[]=" + encodeURIComponent(arguments[1]);
			for (var n = 2; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
		}
		return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
	}
	function c(e) {
		return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
	}
	var l = Symbol.for("react.element"), u = Symbol.for("react.transitional.element"), d = Symbol.for("react.portal"), f = Symbol.for("react.fragment"), p = Symbol.for("react.strict_mode"), m = Symbol.for("react.profiler"), h = Symbol.for("react.provider"), g = Symbol.for("react.consumer"), _ = Symbol.for("react.context"), v = Symbol.for("react.forward_ref"), y = Symbol.for("react.suspense"), b = Symbol.for("react.suspense_list"), x = Symbol.for("react.memo"), S = Symbol.for("react.lazy"), C = Symbol.for("react.offscreen"), w = Symbol.for("react.memo_cache_sentinel"), T = Symbol.iterator;
	function E(e) {
		return typeof e != "object" || !e ? null : (e = T && e[T] || e["@@iterator"], typeof e == "function" ? e : null);
	}
	var D = Symbol.for("react.client.reference");
	function O(e) {
		if (e == null) return null;
		if (typeof e == "function") return e.$$typeof === D ? null : e.displayName || e.name || null;
		if (typeof e == "string") return e;
		switch (e) {
			case f: return "Fragment";
			case d: return "Portal";
			case m: return "Profiler";
			case p: return "StrictMode";
			case y: return "Suspense";
			case b: return "SuspenseList";
		}
		if (typeof e == "object") switch (e.$$typeof) {
			case _: return (e.displayName || "Context") + ".Provider";
			case g: return (e._context.displayName || "Context") + ".Consumer";
			case v:
				var t = e.render;
				return e = e.displayName, e ||= (e = t.displayName || t.name || "", e === "" ? "ForwardRef" : "ForwardRef(" + e + ")"), e;
			case x: return t = e.displayName || null, t === null ? O(e.type) || "Memo" : t;
			case S:
				t = e._payload, e = e._init;
				try {
					return O(e(t));
				} catch {}
		}
		return null;
	}
	var k = n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, A = Object.assign, j, M;
	function N(e) {
		if (j === void 0) try {
			throw Error();
		} catch (e) {
			var t = e.stack.trim().match(/\n( *(at )?)/);
			j = t && t[1] || "", M = -1 < e.stack.indexOf("\n    at") ? " (<anonymous>)" : -1 < e.stack.indexOf("@") ? "@unknown:0:0" : "";
		}
		return "\n" + j + e + M;
	}
	var P = !1;
	function F(e, t) {
		if (!e || P) return "";
		P = !0;
		var n = Error.prepareStackTrace;
		Error.prepareStackTrace = void 0;
		try {
			var r = { DetermineComponentFrameRoot: function() {
				try {
					if (t) {
						var n = function() {
							throw Error();
						};
						if (Object.defineProperty(n.prototype, "props", { set: function() {
							throw Error();
						} }), typeof Reflect == "object" && Reflect.construct) {
							try {
								Reflect.construct(n, []);
							} catch (e) {
								var r = e;
							}
							Reflect.construct(e, [], n);
						} else {
							try {
								n.call();
							} catch (e) {
								r = e;
							}
							e.call(n.prototype);
						}
					} else {
						try {
							throw Error();
						} catch (e) {
							r = e;
						}
						(n = e()) && typeof n.catch == "function" && n.catch(function() {});
					}
				} catch (e) {
					if (e && r && typeof e.stack == "string") return [e.stack, r.stack];
				}
				return [null, null];
			} };
			r.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
			var i = Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot, "name");
			i && i.configurable && Object.defineProperty(r.DetermineComponentFrameRoot, "name", { value: "DetermineComponentFrameRoot" });
			var a = r.DetermineComponentFrameRoot(), o = a[0], s = a[1];
			if (o && s) {
				var c = o.split("\n"), l = s.split("\n");
				for (i = r = 0; r < c.length && !c[r].includes("DetermineComponentFrameRoot");) r++;
				for (; i < l.length && !l[i].includes("DetermineComponentFrameRoot");) i++;
				if (r === c.length || i === l.length) for (r = c.length - 1, i = l.length - 1; 1 <= r && 0 <= i && c[r] !== l[i];) i--;
				for (; 1 <= r && 0 <= i; r--, i--) if (c[r] !== l[i]) {
					if (r !== 1 || i !== 1) do
						if (r--, i--, 0 > i || c[r] !== l[i]) {
							var u = "\n" + c[r].replace(" at new ", " at ");
							return e.displayName && u.includes("<anonymous>") && (u = u.replace("<anonymous>", e.displayName)), u;
						}
					while (1 <= r && 0 <= i);
					break;
				}
			}
		} finally {
			P = !1, Error.prepareStackTrace = n;
		}
		return (n = e ? e.displayName || e.name : "") ? N(n) : "";
	}
	function I(e) {
		switch (e.tag) {
			case 26:
			case 27:
			case 5: return N(e.type);
			case 16: return N("Lazy");
			case 13: return N("Suspense");
			case 19: return N("SuspenseList");
			case 0:
			case 15: return e = F(e.type, !1), e;
			case 11: return e = F(e.type.render, !1), e;
			case 1: return e = F(e.type, !0), e;
			default: return "";
		}
	}
	function ee(e) {
		try {
			var t = "";
			do
				t += I(e), e = e.return;
			while (e);
			return t;
		} catch (e) {
			return "\nError generating stack: " + e.message + "\n" + e.stack;
		}
	}
	function te(e) {
		var t = e, n = e;
		if (e.alternate) for (; t.return;) t = t.return;
		else {
			e = t;
			do
				t = e, t.flags & 4098 && (n = t.return), e = t.return;
			while (e);
		}
		return t.tag === 3 ? n : null;
	}
	function ne(e) {
		if (e.tag === 13) {
			var t = e.memoizedState;
			if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
		}
		return null;
	}
	function re(e) {
		if (te(e) !== e) throw Error(o(188));
	}
	function ie(e) {
		var t = e.alternate;
		if (!t) {
			if (t = te(e), t === null) throw Error(o(188));
			return t === e ? e : null;
		}
		for (var n = e, r = t;;) {
			var i = n.return;
			if (i === null) break;
			var a = i.alternate;
			if (a === null) {
				if (r = i.return, r !== null) {
					n = r;
					continue;
				}
				break;
			}
			if (i.child === a.child) {
				for (a = i.child; a;) {
					if (a === n) return re(i), e;
					if (a === r) return re(i), t;
					a = a.sibling;
				}
				throw Error(o(188));
			}
			if (n.return !== r.return) n = i, r = a;
			else {
				for (var s = !1, c = i.child; c;) {
					if (c === n) {
						s = !0, n = i, r = a;
						break;
					}
					if (c === r) {
						s = !0, r = i, n = a;
						break;
					}
					c = c.sibling;
				}
				if (!s) {
					for (c = a.child; c;) {
						if (c === n) {
							s = !0, n = a, r = i;
							break;
						}
						if (c === r) {
							s = !0, r = a, n = i;
							break;
						}
						c = c.sibling;
					}
					if (!s) throw Error(o(189));
				}
			}
			if (n.alternate !== r) throw Error(o(190));
		}
		if (n.tag !== 3) throw Error(o(188));
		return n.stateNode.current === n ? e : t;
	}
	function ae(e) {
		var t = e.tag;
		if (t === 5 || t === 26 || t === 27 || t === 6) return e;
		for (e = e.child; e !== null;) {
			if (t = ae(e), t !== null) return t;
			e = e.sibling;
		}
		return null;
	}
	var L = Array.isArray, R = i.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, oe = {
		pending: !1,
		data: null,
		method: null,
		action: null
	}, se = [], ce = -1;
	function le(e) {
		return { current: e };
	}
	function ue(e) {
		0 > ce || (e.current = se[ce], se[ce] = null, ce--);
	}
	function de(e, t) {
		ce++, se[ce] = e.current, e.current = t;
	}
	var fe = le(null), pe = le(null), me = le(null), he = le(null);
	function ge(e, t) {
		switch (de(me, t), de(pe, e), de(fe, null), e = t.nodeType, e) {
			case 9:
			case 11:
				t = (t = t.documentElement) && (t = t.namespaceURI) ? xd(t) : 0;
				break;
			default: if (e = e === 8 ? t.parentNode : t, t = e.tagName, e = e.namespaceURI) e = xd(e), t = Sd(e, t);
			else switch (t) {
				case "svg":
					t = 1;
					break;
				case "math":
					t = 2;
					break;
				default: t = 0;
			}
		}
		ue(fe), de(fe, t);
	}
	function _e() {
		ue(fe), ue(pe), ue(me);
	}
	function ve(e) {
		e.memoizedState !== null && de(he, e);
		var t = fe.current, n = Sd(t, e.type);
		t !== n && (de(pe, e), de(fe, n));
	}
	function ye(e) {
		pe.current === e && (ue(fe), ue(pe)), he.current === e && (ue(he), wf._currentValue = oe);
	}
	var be = Object.prototype.hasOwnProperty, xe = t.unstable_scheduleCallback, Se = t.unstable_cancelCallback, Ce = t.unstable_shouldYield, we = t.unstable_requestPaint, Te = t.unstable_now, Ee = t.unstable_getCurrentPriorityLevel, De = t.unstable_ImmediatePriority, Oe = t.unstable_UserBlockingPriority, ke = t.unstable_NormalPriority, Ae = t.unstable_LowPriority, je = t.unstable_IdlePriority, Me = t.log, Ne = t.unstable_setDisableYieldValue, Pe = null, Fe = null;
	function Ie(e) {
		if (Fe && typeof Fe.onCommitFiberRoot == "function") try {
			Fe.onCommitFiberRoot(Pe, e, void 0, (e.current.flags & 128) == 128);
		} catch {}
	}
	function Le(e) {
		if (typeof Me == "function" && Ne(e), Fe && typeof Fe.setStrictMode == "function") try {
			Fe.setStrictMode(Pe, e);
		} catch {}
	}
	var Re = Math.clz32 ? Math.clz32 : Ve, ze = Math.log, Be = Math.LN2;
	function Ve(e) {
		return e >>>= 0, e === 0 ? 32 : 31 - (ze(e) / Be | 0) | 0;
	}
	var He = 128, Ue = 4194304;
	function We(e) {
		var t = e & 42;
		if (t !== 0) return t;
		switch (e & -e) {
			case 1: return 1;
			case 2: return 2;
			case 4: return 4;
			case 8: return 8;
			case 16: return 16;
			case 32: return 32;
			case 64: return 64;
			case 128:
			case 256:
			case 512:
			case 1024:
			case 2048:
			case 4096:
			case 8192:
			case 16384:
			case 32768:
			case 65536:
			case 131072:
			case 262144:
			case 524288:
			case 1048576:
			case 2097152: return e & 4194176;
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432: return e & 62914560;
			case 67108864: return 67108864;
			case 134217728: return 134217728;
			case 268435456: return 268435456;
			case 536870912: return 536870912;
			case 1073741824: return 0;
			default: return e;
		}
	}
	function Ge(e, t) {
		var n = e.pendingLanes;
		if (n === 0) return 0;
		var r = 0, i = e.suspendedLanes, a = e.pingedLanes, o = e.warmLanes;
		e = e.finishedLanes !== 0;
		var s = n & 134217727;
		return s === 0 ? (s = n & ~i, s === 0 ? a === 0 ? e || (o = n & ~o, o !== 0 && (r = We(o))) : r = We(a) : r = We(s)) : (n = s & ~i, n === 0 ? (a &= s, a === 0 ? e || (o = s & ~o, o !== 0 && (r = We(o))) : r = We(a)) : r = We(n)), r === 0 ? 0 : t !== 0 && t !== r && (t & i) === 0 && (i = r & -r, o = t & -t, i >= o || i === 32 && o & 4194176) ? t : r;
	}
	function Ke(e, t) {
		return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
	}
	function qe(e, t) {
		switch (e) {
			case 1:
			case 2:
			case 4:
			case 8: return t + 250;
			case 16:
			case 32:
			case 64:
			case 128:
			case 256:
			case 512:
			case 1024:
			case 2048:
			case 4096:
			case 8192:
			case 16384:
			case 32768:
			case 65536:
			case 131072:
			case 262144:
			case 524288:
			case 1048576:
			case 2097152: return t + 5e3;
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432: return -1;
			case 67108864:
			case 134217728:
			case 268435456:
			case 536870912:
			case 1073741824: return -1;
			default: return -1;
		}
	}
	function Je() {
		var e = He;
		return He <<= 1, !(He & 4194176) && (He = 128), e;
	}
	function Ye() {
		var e = Ue;
		return Ue <<= 1, !(Ue & 62914560) && (Ue = 4194304), e;
	}
	function Xe(e) {
		for (var t = [], n = 0; 31 > n; n++) t.push(e);
		return t;
	}
	function Ze(e, t) {
		e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
	}
	function Qe(e, t, n, r, i, a) {
		var o = e.pendingLanes;
		e.pendingLanes = n, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= n, e.entangledLanes &= n, e.errorRecoveryDisabledLanes &= n, e.shellSuspendCounter = 0;
		var s = e.entanglements, c = e.expirationTimes, l = e.hiddenUpdates;
		for (n = o & ~n; 0 < n;) {
			var u = 31 - Re(n), d = 1 << u;
			s[u] = 0, c[u] = -1;
			var f = l[u];
			if (f !== null) for (l[u] = null, u = 0; u < f.length; u++) {
				var p = f[u];
				p !== null && (p.lane &= -536870913);
			}
			n &= ~d;
		}
		r !== 0 && $e(e, r, 0), a !== 0 && i === 0 && e.tag !== 0 && (e.suspendedLanes |= a & ~(o & ~t));
	}
	function $e(e, t, n) {
		e.pendingLanes |= t, e.suspendedLanes &= ~t;
		var r = 31 - Re(t);
		e.entangledLanes |= t, e.entanglements[r] = e.entanglements[r] | 1073741824 | n & 4194218;
	}
	function et(e, t) {
		var n = e.entangledLanes |= t;
		for (e = e.entanglements; n;) {
			var r = 31 - Re(n), i = 1 << r;
			i & t | e[r] & t && (e[r] |= t), n &= ~i;
		}
	}
	function tt(e) {
		return e &= -e, 2 < e ? 8 < e ? e & 134217727 ? 32 : 268435456 : 8 : 2;
	}
	function nt() {
		var e = R.p;
		return e === 0 ? (e = window.event, e === void 0 ? 32 : zf(e.type)) : e;
	}
	function rt(e, t) {
		var n = R.p;
		try {
			return R.p = e, t();
		} finally {
			R.p = n;
		}
	}
	var it = Math.random().toString(36).slice(2), at = "__reactFiber$" + it, ot = "__reactProps$" + it, st = "__reactContainer$" + it, ct = "__reactEvents$" + it, lt = "__reactListeners$" + it, ut = "__reactHandles$" + it, z = "__reactResources$" + it, dt = "__reactMarker$" + it;
	function ft(e) {
		delete e[at], delete e[ot], delete e[ct], delete e[lt], delete e[ut];
	}
	function pt(e) {
		var t = e[at];
		if (t) return t;
		for (var n = e.parentNode; n;) {
			if (t = n[st] || n[at]) {
				if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = Id(e); e !== null;) {
					if (n = e[at]) return n;
					e = Id(e);
				}
				return t;
			}
			e = n, n = e.parentNode;
		}
		return null;
	}
	function mt(e) {
		if (e = e[at] || e[st]) {
			var t = e.tag;
			if (t === 5 || t === 6 || t === 13 || t === 26 || t === 27 || t === 3) return e;
		}
		return null;
	}
	function ht(e) {
		var t = e.tag;
		if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
		throw Error(o(33));
	}
	function gt(e) {
		var t = e[z];
		return t ||= e[z] = {
			hoistableStyles: /* @__PURE__ */ new Map(),
			hoistableScripts: /* @__PURE__ */ new Map()
		}, t;
	}
	function _t(e) {
		e[dt] = !0;
	}
	var vt = /* @__PURE__ */ new Set(), yt = {};
	function bt(e, t) {
		B(e, t), B(e + "Capture", t);
	}
	function B(e, t) {
		for (yt[e] = t, e = 0; e < t.length; e++) vt.add(t[e]);
	}
	var xt = !(typeof window > "u" || window.document === void 0 || window.document.createElement === void 0), St = RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), Ct = {}, wt = {};
	function Tt(e) {
		return be.call(wt, e) ? !0 : be.call(Ct, e) ? !1 : St.test(e) ? wt[e] = !0 : (Ct[e] = !0, !1);
	}
	function V(e, t, n) {
		if (Tt(t)) if (n === null) e.removeAttribute(t);
		else {
			switch (typeof n) {
				case "undefined":
				case "function":
				case "symbol":
					e.removeAttribute(t);
					return;
				case "boolean":
					var r = t.toLowerCase().slice(0, 5);
					if (r !== "data-" && r !== "aria-") {
						e.removeAttribute(t);
						return;
					}
			}
			e.setAttribute(t, "" + n);
		}
	}
	function Et(e, t, n) {
		if (n === null) e.removeAttribute(t);
		else {
			switch (typeof n) {
				case "undefined":
				case "function":
				case "symbol":
				case "boolean":
					e.removeAttribute(t);
					return;
			}
			e.setAttribute(t, "" + n);
		}
	}
	function Dt(e, t, n, r) {
		if (r === null) e.removeAttribute(n);
		else {
			switch (typeof r) {
				case "undefined":
				case "function":
				case "symbol":
				case "boolean":
					e.removeAttribute(n);
					return;
			}
			e.setAttributeNS(t, n, "" + r);
		}
	}
	function Ot(e) {
		switch (typeof e) {
			case "bigint":
			case "boolean":
			case "number":
			case "string":
			case "undefined": return e;
			case "object": return e;
			default: return "";
		}
	}
	function kt(e) {
		var t = e.type;
		return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
	}
	function At(e) {
		var t = kt(e) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), r = "" + e[t];
		if (!e.hasOwnProperty(t) && n !== void 0 && typeof n.get == "function" && typeof n.set == "function") {
			var i = n.get, a = n.set;
			return Object.defineProperty(e, t, {
				configurable: !0,
				get: function() {
					return i.call(this);
				},
				set: function(e) {
					r = "" + e, a.call(this, e);
				}
			}), Object.defineProperty(e, t, { enumerable: n.enumerable }), {
				getValue: function() {
					return r;
				},
				setValue: function(e) {
					r = "" + e;
				},
				stopTracking: function() {
					e._valueTracker = null, delete e[t];
				}
			};
		}
	}
	function jt(e) {
		e._valueTracker ||= At(e);
	}
	function Mt(e) {
		if (!e) return !1;
		var t = e._valueTracker;
		if (!t) return !0;
		var n = t.getValue(), r = "";
		return e && (r = kt(e) ? e.checked ? "true" : "false" : e.value), e = r, e === n ? !1 : (t.setValue(e), !0);
	}
	function Nt(e) {
		if (e ||= typeof document < "u" ? document : void 0, e === void 0) return null;
		try {
			return e.activeElement || e.body;
		} catch {
			return e.body;
		}
	}
	var Pt = /[\n"\\]/g;
	function Ft(e) {
		return e.replace(Pt, function(e) {
			return "\\" + e.charCodeAt(0).toString(16) + " ";
		});
	}
	function It(e, t, n, r, i, a, o, s) {
		e.name = "", o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" ? e.type = o : e.removeAttribute("type"), t == null ? o !== "submit" && o !== "reset" || e.removeAttribute("value") : o === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + Ot(t)) : e.value !== "" + Ot(t) && (e.value = "" + Ot(t)), t == null ? n == null ? r != null && e.removeAttribute("value") : Rt(e, o, Ot(n)) : Rt(e, o, Ot(t)), i == null && a != null && (e.defaultChecked = !!a), i != null && (e.checked = i && typeof i != "function" && typeof i != "symbol"), s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" ? e.name = "" + Ot(s) : e.removeAttribute("name");
	}
	function Lt(e, t, n, r, i, a, o, s) {
		if (a != null && typeof a != "function" && typeof a != "symbol" && typeof a != "boolean" && (e.type = a), t != null || n != null) {
			if (!(a !== "submit" && a !== "reset" || t != null)) return;
			n = n == null ? "" : "" + Ot(n), t = t == null ? n : "" + Ot(t), s || t === e.value || (e.value = t), e.defaultValue = t;
		}
		r ??= i, r = typeof r != "function" && typeof r != "symbol" && !!r, e.checked = s ? e.checked : !!r, e.defaultChecked = !!r, o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" && (e.name = o);
	}
	function Rt(e, t, n) {
		t === "number" && Nt(e.ownerDocument) === e || e.defaultValue === "" + n || (e.defaultValue = "" + n);
	}
	function zt(e, t, n, r) {
		if (e = e.options, t) {
			t = {};
			for (var i = 0; i < n.length; i++) t["$" + n[i]] = !0;
			for (n = 0; n < e.length; n++) i = t.hasOwnProperty("$" + e[n].value), e[n].selected !== i && (e[n].selected = i), i && r && (e[n].defaultSelected = !0);
		} else {
			for (n = "" + Ot(n), t = null, i = 0; i < e.length; i++) {
				if (e[i].value === n) {
					e[i].selected = !0, r && (e[i].defaultSelected = !0);
					return;
				}
				t !== null || e[i].disabled || (t = e[i]);
			}
			t !== null && (t.selected = !0);
		}
	}
	function Bt(e, t, n) {
		if (t != null && (t = "" + Ot(t), t !== e.value && (e.value = t), n == null)) {
			e.defaultValue !== t && (e.defaultValue = t);
			return;
		}
		e.defaultValue = n == null ? "" : "" + Ot(n);
	}
	function Vt(e, t, n, r) {
		if (t == null) {
			if (r != null) {
				if (n != null) throw Error(o(92));
				if (L(r)) {
					if (1 < r.length) throw Error(o(93));
					r = r[0];
				}
				n = r;
			}
			n ??= "", t = n;
		}
		n = Ot(t), e.defaultValue = n, r = e.textContent, r === n && r !== "" && r !== null && (e.value = r);
	}
	function H(e, t) {
		if (t) {
			var n = e.firstChild;
			if (n && n === e.lastChild && n.nodeType === 3) {
				n.nodeValue = t;
				return;
			}
		}
		e.textContent = t;
	}
	var Ht = new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));
	function U(e, t, n) {
		var r = t.indexOf("--") === 0;
		n == null || typeof n == "boolean" || n === "" ? r ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : r ? e.setProperty(t, n) : typeof n != "number" || n === 0 || Ht.has(t) ? t === "float" ? e.cssFloat = n : e[t] = ("" + n).trim() : e[t] = n + "px";
	}
	function Ut(e, t, n) {
		if (t != null && typeof t != "object") throw Error(o(62));
		if (e = e.style, n != null) {
			for (var r in n) !n.hasOwnProperty(r) || t != null && t.hasOwnProperty(r) || (r.indexOf("--") === 0 ? e.setProperty(r, "") : r === "float" ? e.cssFloat = "" : e[r] = "");
			for (var i in t) r = t[i], t.hasOwnProperty(i) && n[i] !== r && U(e, i, r);
		} else for (var a in t) t.hasOwnProperty(a) && U(e, a, t[a]);
	}
	function Wt(e) {
		if (e.indexOf("-") === -1) return !1;
		switch (e) {
			case "annotation-xml":
			case "color-profile":
			case "font-face":
			case "font-face-src":
			case "font-face-uri":
			case "font-face-format":
			case "font-face-name":
			case "missing-glyph": return !1;
			default: return !0;
		}
	}
	var Gt = new Map([
		["acceptCharset", "accept-charset"],
		["htmlFor", "for"],
		["httpEquiv", "http-equiv"],
		["crossOrigin", "crossorigin"],
		["accentHeight", "accent-height"],
		["alignmentBaseline", "alignment-baseline"],
		["arabicForm", "arabic-form"],
		["baselineShift", "baseline-shift"],
		["capHeight", "cap-height"],
		["clipPath", "clip-path"],
		["clipRule", "clip-rule"],
		["colorInterpolation", "color-interpolation"],
		["colorInterpolationFilters", "color-interpolation-filters"],
		["colorProfile", "color-profile"],
		["colorRendering", "color-rendering"],
		["dominantBaseline", "dominant-baseline"],
		["enableBackground", "enable-background"],
		["fillOpacity", "fill-opacity"],
		["fillRule", "fill-rule"],
		["floodColor", "flood-color"],
		["floodOpacity", "flood-opacity"],
		["fontFamily", "font-family"],
		["fontSize", "font-size"],
		["fontSizeAdjust", "font-size-adjust"],
		["fontStretch", "font-stretch"],
		["fontStyle", "font-style"],
		["fontVariant", "font-variant"],
		["fontWeight", "font-weight"],
		["glyphName", "glyph-name"],
		["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
		["glyphOrientationVertical", "glyph-orientation-vertical"],
		["horizAdvX", "horiz-adv-x"],
		["horizOriginX", "horiz-origin-x"],
		["imageRendering", "image-rendering"],
		["letterSpacing", "letter-spacing"],
		["lightingColor", "lighting-color"],
		["markerEnd", "marker-end"],
		["markerMid", "marker-mid"],
		["markerStart", "marker-start"],
		["overlinePosition", "overline-position"],
		["overlineThickness", "overline-thickness"],
		["paintOrder", "paint-order"],
		["panose-1", "panose-1"],
		["pointerEvents", "pointer-events"],
		["renderingIntent", "rendering-intent"],
		["shapeRendering", "shape-rendering"],
		["stopColor", "stop-color"],
		["stopOpacity", "stop-opacity"],
		["strikethroughPosition", "strikethrough-position"],
		["strikethroughThickness", "strikethrough-thickness"],
		["strokeDasharray", "stroke-dasharray"],
		["strokeDashoffset", "stroke-dashoffset"],
		["strokeLinecap", "stroke-linecap"],
		["strokeLinejoin", "stroke-linejoin"],
		["strokeMiterlimit", "stroke-miterlimit"],
		["strokeOpacity", "stroke-opacity"],
		["strokeWidth", "stroke-width"],
		["textAnchor", "text-anchor"],
		["textDecoration", "text-decoration"],
		["textRendering", "text-rendering"],
		["transformOrigin", "transform-origin"],
		["underlinePosition", "underline-position"],
		["underlineThickness", "underline-thickness"],
		["unicodeBidi", "unicode-bidi"],
		["unicodeRange", "unicode-range"],
		["unitsPerEm", "units-per-em"],
		["vAlphabetic", "v-alphabetic"],
		["vHanging", "v-hanging"],
		["vIdeographic", "v-ideographic"],
		["vMathematical", "v-mathematical"],
		["vectorEffect", "vector-effect"],
		["vertAdvY", "vert-adv-y"],
		["vertOriginX", "vert-origin-x"],
		["vertOriginY", "vert-origin-y"],
		["wordSpacing", "word-spacing"],
		["writingMode", "writing-mode"],
		["xmlnsXlink", "xmlns:xlink"],
		["xHeight", "x-height"]
	]), Kt = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
	function qt(e) {
		return Kt.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
	}
	var Jt = null;
	function Yt(e) {
		return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
	}
	var Xt = null, Zt = null;
	function Qt(e) {
		var t = mt(e);
		if (t && (e = t.stateNode)) {
			var n = e[ot] || null;
			a: switch (e = t.stateNode, t.type) {
				case "input":
					if (It(e, n.value, n.defaultValue, n.defaultValue, n.checked, n.defaultChecked, n.type, n.name), t = n.name, n.type === "radio" && t != null) {
						for (n = e; n.parentNode;) n = n.parentNode;
						for (n = n.querySelectorAll("input[name=\"" + Ft("" + t) + "\"][type=\"radio\"]"), t = 0; t < n.length; t++) {
							var r = n[t];
							if (r !== e && r.form === e.form) {
								var i = r[ot] || null;
								if (!i) throw Error(o(90));
								It(r, i.value, i.defaultValue, i.defaultValue, i.checked, i.defaultChecked, i.type, i.name);
							}
						}
						for (t = 0; t < n.length; t++) r = n[t], r.form === e.form && Mt(r);
					}
					break a;
				case "textarea":
					Bt(e, n.value, n.defaultValue);
					break a;
				case "select": t = n.value, t != null && zt(e, !!n.multiple, t, !1);
			}
		}
	}
	var $t = !1;
	function en(e, t, n) {
		if ($t) return e(t, n);
		$t = !0;
		try {
			return e(t);
		} finally {
			if ($t = !1, (Xt !== null || Zt !== null) && (au(), Xt && (t = Xt, e = Zt, Zt = Xt = null, Qt(t), e))) for (t = 0; t < e.length; t++) Qt(e[t]);
		}
	}
	function tn(e, t) {
		var n = e.stateNode;
		if (n === null) return null;
		var r = n[ot] || null;
		if (r === null) return null;
		n = r[t];
		a: switch (t) {
			case "onClick":
			case "onClickCapture":
			case "onDoubleClick":
			case "onDoubleClickCapture":
			case "onMouseDown":
			case "onMouseDownCapture":
			case "onMouseMove":
			case "onMouseMoveCapture":
			case "onMouseUp":
			case "onMouseUpCapture":
			case "onMouseEnter":
				(r = !r.disabled) || (e = e.type, r = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !r;
				break a;
			default: e = !1;
		}
		if (e) return null;
		if (n && typeof n != "function") throw Error(o(231, t, typeof n));
		return n;
	}
	var nn = !1;
	if (xt) try {
		var rn = {};
		Object.defineProperty(rn, "passive", { get: function() {
			nn = !0;
		} }), window.addEventListener("test", rn, rn), window.removeEventListener("test", rn, rn);
	} catch {
		nn = !1;
	}
	var an = null, on = null, sn = null;
	function cn() {
		if (sn) return sn;
		var e, t = on, n = t.length, r, i = "value" in an ? an.value : an.textContent, a = i.length;
		for (e = 0; e < n && t[e] === i[e]; e++);
		var o = n - e;
		for (r = 1; r <= o && t[n - r] === i[a - r]; r++);
		return sn = i.slice(e, 1 < r ? 1 - r : void 0);
	}
	function ln(e) {
		var t = e.keyCode;
		return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
	}
	function un() {
		return !0;
	}
	function dn() {
		return !1;
	}
	function fn(e) {
		function t(t, n, r, i, a) {
			for (var o in this._reactName = t, this._targetInst = r, this.type = n, this.nativeEvent = i, this.target = a, this.currentTarget = null, e) e.hasOwnProperty(o) && (t = e[o], this[o] = t ? t(i) : i[o]);
			return this.isDefaultPrevented = (i.defaultPrevented == null ? !1 === i.returnValue : i.defaultPrevented) ? un : dn, this.isPropagationStopped = dn, this;
		}
		return A(t.prototype, {
			preventDefault: function() {
				this.defaultPrevented = !0;
				var e = this.nativeEvent;
				e && (e.preventDefault ? e.preventDefault() : typeof e.returnValue != "unknown" && (e.returnValue = !1), this.isDefaultPrevented = un);
			},
			stopPropagation: function() {
				var e = this.nativeEvent;
				e && (e.stopPropagation ? e.stopPropagation() : typeof e.cancelBubble != "unknown" && (e.cancelBubble = !0), this.isPropagationStopped = un);
			},
			persist: function() {},
			isPersistent: un
		}), t;
	}
	var pn = {
		eventPhase: 0,
		bubbles: 0,
		cancelable: 0,
		timeStamp: function(e) {
			return e.timeStamp || Date.now();
		},
		defaultPrevented: 0,
		isTrusted: 0
	}, mn = fn(pn), hn = A({}, pn, {
		view: 0,
		detail: 0
	}), gn = fn(hn), _n, vn, yn, bn = A({}, hn, {
		screenX: 0,
		screenY: 0,
		clientX: 0,
		clientY: 0,
		pageX: 0,
		pageY: 0,
		ctrlKey: 0,
		shiftKey: 0,
		altKey: 0,
		metaKey: 0,
		getModifierState: jn,
		button: 0,
		buttons: 0,
		relatedTarget: function(e) {
			return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
		},
		movementX: function(e) {
			return "movementX" in e ? e.movementX : (e !== yn && (yn && e.type === "mousemove" ? (_n = e.screenX - yn.screenX, vn = e.screenY - yn.screenY) : vn = _n = 0, yn = e), _n);
		},
		movementY: function(e) {
			return "movementY" in e ? e.movementY : vn;
		}
	}), xn = fn(bn), Sn = fn(A({}, bn, { dataTransfer: 0 })), Cn = fn(A({}, hn, { relatedTarget: 0 })), wn = fn(A({}, pn, {
		animationName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), Tn = fn(A({}, pn, { clipboardData: function(e) {
		return "clipboardData" in e ? e.clipboardData : window.clipboardData;
	} })), En = fn(A({}, pn, { data: 0 })), Dn = {
		Esc: "Escape",
		Spacebar: " ",
		Left: "ArrowLeft",
		Up: "ArrowUp",
		Right: "ArrowRight",
		Down: "ArrowDown",
		Del: "Delete",
		Win: "OS",
		Menu: "ContextMenu",
		Apps: "ContextMenu",
		Scroll: "ScrollLock",
		MozPrintableKey: "Unidentified"
	}, On = {
		8: "Backspace",
		9: "Tab",
		12: "Clear",
		13: "Enter",
		16: "Shift",
		17: "Control",
		18: "Alt",
		19: "Pause",
		20: "CapsLock",
		27: "Escape",
		32: " ",
		33: "PageUp",
		34: "PageDown",
		35: "End",
		36: "Home",
		37: "ArrowLeft",
		38: "ArrowUp",
		39: "ArrowRight",
		40: "ArrowDown",
		45: "Insert",
		46: "Delete",
		112: "F1",
		113: "F2",
		114: "F3",
		115: "F4",
		116: "F5",
		117: "F6",
		118: "F7",
		119: "F8",
		120: "F9",
		121: "F10",
		122: "F11",
		123: "F12",
		144: "NumLock",
		145: "ScrollLock",
		224: "Meta"
	}, kn = {
		Alt: "altKey",
		Control: "ctrlKey",
		Meta: "metaKey",
		Shift: "shiftKey"
	};
	function An(e) {
		var t = this.nativeEvent;
		return t.getModifierState ? t.getModifierState(e) : (e = kn[e]) ? !!t[e] : !1;
	}
	function jn() {
		return An;
	}
	var Mn = fn(A({}, hn, {
		key: function(e) {
			if (e.key) {
				var t = Dn[e.key] || e.key;
				if (t !== "Unidentified") return t;
			}
			return e.type === "keypress" ? (e = ln(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? On[e.keyCode] || "Unidentified" : "";
		},
		code: 0,
		location: 0,
		ctrlKey: 0,
		shiftKey: 0,
		altKey: 0,
		metaKey: 0,
		repeat: 0,
		locale: 0,
		getModifierState: jn,
		charCode: function(e) {
			return e.type === "keypress" ? ln(e) : 0;
		},
		keyCode: function(e) {
			return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
		},
		which: function(e) {
			return e.type === "keypress" ? ln(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
		}
	})), Nn = fn(A({}, bn, {
		pointerId: 0,
		width: 0,
		height: 0,
		pressure: 0,
		tangentialPressure: 0,
		tiltX: 0,
		tiltY: 0,
		twist: 0,
		pointerType: 0,
		isPrimary: 0
	})), Pn = fn(A({}, hn, {
		touches: 0,
		targetTouches: 0,
		changedTouches: 0,
		altKey: 0,
		metaKey: 0,
		ctrlKey: 0,
		shiftKey: 0,
		getModifierState: jn
	})), Fn = fn(A({}, pn, {
		propertyName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), In = fn(A({}, bn, {
		deltaX: function(e) {
			return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
		},
		deltaY: function(e) {
			return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
		},
		deltaZ: 0,
		deltaMode: 0
	})), Ln = fn(A({}, pn, {
		newState: 0,
		oldState: 0
	})), Rn = [
		9,
		13,
		27,
		32
	], zn = xt && "CompositionEvent" in window, Bn = null;
	xt && "documentMode" in document && (Bn = document.documentMode);
	var Vn = xt && "TextEvent" in window && !Bn, Hn = xt && (!zn || Bn && 8 < Bn && 11 >= Bn), Un = " ", Wn = !1;
	function Gn(e, t) {
		switch (e) {
			case "keyup": return Rn.indexOf(t.keyCode) !== -1;
			case "keydown": return t.keyCode !== 229;
			case "keypress":
			case "mousedown":
			case "focusout": return !0;
			default: return !1;
		}
	}
	function Kn(e) {
		return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
	}
	var qn = !1;
	function Jn(e, t) {
		switch (e) {
			case "compositionend": return Kn(t);
			case "keypress": return t.which === 32 ? (Wn = !0, Un) : null;
			case "textInput": return e = t.data, e === Un && Wn ? null : e;
			default: return null;
		}
	}
	function Yn(e, t) {
		if (qn) return e === "compositionend" || !zn && Gn(e, t) ? (e = cn(), sn = on = an = null, qn = !1, e) : null;
		switch (e) {
			case "paste": return null;
			case "keypress":
				if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
					if (t.char && 1 < t.char.length) return t.char;
					if (t.which) return String.fromCharCode(t.which);
				}
				return null;
			case "compositionend": return Hn && t.locale !== "ko" ? null : t.data;
			default: return null;
		}
	}
	var Xn = {
		color: !0,
		date: !0,
		datetime: !0,
		"datetime-local": !0,
		email: !0,
		month: !0,
		number: !0,
		password: !0,
		range: !0,
		search: !0,
		tel: !0,
		text: !0,
		time: !0,
		url: !0,
		week: !0
	};
	function Zn(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t === "input" ? !!Xn[e.type] : t === "textarea";
	}
	function Qn(e, t, n, r) {
		Xt ? Zt ? Zt.push(r) : Zt = [r] : Xt = r, t = sd(t, "onChange"), 0 < t.length && (n = new mn("onChange", "change", null, n, r), e.push({
			event: n,
			listeners: t
		}));
	}
	var $n = null, er = null;
	function tr(e) {
		ed(e, 0);
	}
	function nr(e) {
		if (Mt(ht(e))) return e;
	}
	function rr(e, t) {
		if (e === "change") return t;
	}
	var ir = !1;
	if (xt) {
		var ar;
		if (xt) {
			var or = "oninput" in document;
			if (!or) {
				var sr = document.createElement("div");
				sr.setAttribute("oninput", "return;"), or = typeof sr.oninput == "function";
			}
			ar = or;
		} else ar = !1;
		ir = ar && (!document.documentMode || 9 < document.documentMode);
	}
	function cr() {
		$n && ($n.detachEvent("onpropertychange", lr), er = $n = null);
	}
	function lr(e) {
		if (e.propertyName === "value" && nr(er)) {
			var t = [];
			Qn(t, er, e, Yt(e)), en(tr, t);
		}
	}
	function ur(e, t, n) {
		e === "focusin" ? (cr(), $n = t, er = n, $n.attachEvent("onpropertychange", lr)) : e === "focusout" && cr();
	}
	function dr(e) {
		if (e === "selectionchange" || e === "keyup" || e === "keydown") return nr(er);
	}
	function fr(e, t) {
		if (e === "click") return nr(t);
	}
	function pr(e, t) {
		if (e === "input" || e === "change") return nr(t);
	}
	function mr(e, t) {
		return e === t && (e !== 0 || 1 / e == 1 / t) || e !== e && t !== t;
	}
	var hr = typeof Object.is == "function" ? Object.is : mr;
	function gr(e, t) {
		if (hr(e, t)) return !0;
		if (typeof e != "object" || !e || typeof t != "object" || !t) return !1;
		var n = Object.keys(e), r = Object.keys(t);
		if (n.length !== r.length) return !1;
		for (r = 0; r < n.length; r++) {
			var i = n[r];
			if (!be.call(t, i) || !hr(e[i], t[i])) return !1;
		}
		return !0;
	}
	function _r(e) {
		for (; e && e.firstChild;) e = e.firstChild;
		return e;
	}
	function vr(e, t) {
		var n = _r(e);
		e = 0;
		for (var r; n;) {
			if (n.nodeType === 3) {
				if (r = e + n.textContent.length, e <= t && r >= t) return {
					node: n,
					offset: t - e
				};
				e = r;
			}
			a: {
				for (; n;) {
					if (n.nextSibling) {
						n = n.nextSibling;
						break a;
					}
					n = n.parentNode;
				}
				n = void 0;
			}
			n = _r(n);
		}
	}
	function yr(e, t) {
		return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? yr(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
	}
	function br(e) {
		e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
		for (var t = Nt(e.document); t instanceof e.HTMLIFrameElement;) {
			try {
				var n = typeof t.contentWindow.location.href == "string";
			} catch {
				n = !1;
			}
			if (n) e = t.contentWindow;
			else break;
			t = Nt(e.document);
		}
		return t;
	}
	function xr(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
	}
	function Sr(e, t) {
		var n = br(t);
		t = e.focusedElem;
		var r = e.selectionRange;
		if (n !== t && t && t.ownerDocument && yr(t.ownerDocument.documentElement, t)) {
			if (r !== null && xr(t)) {
				if (e = r.start, n = r.end, n === void 0 && (n = e), "selectionStart" in t) t.selectionStart = e, t.selectionEnd = Math.min(n, t.value.length);
				else if (n = (e = t.ownerDocument || document) && e.defaultView || window, n.getSelection) {
					n = n.getSelection();
					var i = t.textContent.length, a = Math.min(r.start, i);
					r = r.end === void 0 ? a : Math.min(r.end, i), !n.extend && a > r && (i = r, r = a, a = i), i = vr(t, a);
					var o = vr(t, r);
					i && o && (n.rangeCount !== 1 || n.anchorNode !== i.node || n.anchorOffset !== i.offset || n.focusNode !== o.node || n.focusOffset !== o.offset) && (e = e.createRange(), e.setStart(i.node, i.offset), n.removeAllRanges(), a > r ? (n.addRange(e), n.extend(o.node, o.offset)) : (e.setEnd(o.node, o.offset), n.addRange(e)));
				}
			}
			for (e = [], n = t; n = n.parentNode;) n.nodeType === 1 && e.push({
				element: n,
				left: n.scrollLeft,
				top: n.scrollTop
			});
			for (typeof t.focus == "function" && t.focus(), t = 0; t < e.length; t++) n = e[t], n.element.scrollLeft = n.left, n.element.scrollTop = n.top;
		}
	}
	var Cr = xt && "documentMode" in document && 11 >= document.documentMode, wr = null, Tr = null, Er = null, Dr = !1;
	function Or(e, t, n) {
		var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
		Dr || wr == null || wr !== Nt(r) || (r = wr, "selectionStart" in r && xr(r) ? r = {
			start: r.selectionStart,
			end: r.selectionEnd
		} : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = {
			anchorNode: r.anchorNode,
			anchorOffset: r.anchorOffset,
			focusNode: r.focusNode,
			focusOffset: r.focusOffset
		}), Er && gr(Er, r) || (Er = r, r = sd(Tr, "onSelect"), 0 < r.length && (t = new mn("onSelect", "select", null, t, n), e.push({
			event: t,
			listeners: r
		}), t.target = wr)));
	}
	function kr(e, t) {
		var n = {};
		return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
	}
	var Ar = {
		animationend: kr("Animation", "AnimationEnd"),
		animationiteration: kr("Animation", "AnimationIteration"),
		animationstart: kr("Animation", "AnimationStart"),
		transitionrun: kr("Transition", "TransitionRun"),
		transitionstart: kr("Transition", "TransitionStart"),
		transitioncancel: kr("Transition", "TransitionCancel"),
		transitionend: kr("Transition", "TransitionEnd")
	}, jr = {}, Mr = {};
	xt && (Mr = document.createElement("div").style, "AnimationEvent" in window || (delete Ar.animationend.animation, delete Ar.animationiteration.animation, delete Ar.animationstart.animation), "TransitionEvent" in window || delete Ar.transitionend.transition);
	function Nr(e) {
		if (jr[e]) return jr[e];
		if (!Ar[e]) return e;
		var t = Ar[e], n;
		for (n in t) if (t.hasOwnProperty(n) && n in Mr) return jr[e] = t[n];
		return e;
	}
	var Pr = Nr("animationend"), Fr = Nr("animationiteration"), Ir = Nr("animationstart"), Lr = Nr("transitionrun"), Rr = Nr("transitionstart"), zr = Nr("transitioncancel"), Br = Nr("transitionend"), Vr = /* @__PURE__ */ new Map(), Hr = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll scrollEnd toggle touchMove waiting wheel".split(" ");
	function Ur(e, t) {
		Vr.set(e, t), bt(t, [e]);
	}
	var Wr = [], Gr = 0, Kr = 0;
	function qr() {
		for (var e = Gr, t = Kr = Gr = 0; t < e;) {
			var n = Wr[t];
			Wr[t++] = null;
			var r = Wr[t];
			Wr[t++] = null;
			var i = Wr[t];
			Wr[t++] = null;
			var a = Wr[t];
			if (Wr[t++] = null, r !== null && i !== null) {
				var o = r.pending;
				o === null ? i.next = i : (i.next = o.next, o.next = i), r.pending = i;
			}
			a !== 0 && Zr(n, i, a);
		}
	}
	function Jr(e, t, n, r) {
		Wr[Gr++] = e, Wr[Gr++] = t, Wr[Gr++] = n, Wr[Gr++] = r, Kr |= r, e.lanes |= r, e = e.alternate, e !== null && (e.lanes |= r);
	}
	function Yr(e, t, n, r) {
		return Jr(e, t, n, r), Qr(e);
	}
	function Xr(e, t) {
		return Jr(e, null, null, t), Qr(e);
	}
	function Zr(e, t, n) {
		e.lanes |= n;
		var r = e.alternate;
		r !== null && (r.lanes |= n);
		for (var i = !1, a = e.return; a !== null;) a.childLanes |= n, r = a.alternate, r !== null && (r.childLanes |= n), a.tag === 22 && (e = a.stateNode, e === null || e._visibility & 1 || (i = !0)), e = a, a = a.return;
		i && t !== null && e.tag === 3 && (a = e.stateNode, i = 31 - Re(n), a = a.hiddenUpdates, e = a[i], e === null ? a[i] = [t] : e.push(t), t.lane = n | 536870912);
	}
	function Qr(e) {
		if (50 < Xl) throw Xl = 0, Zl = null, Error(o(185));
		for (var t = e.return; t !== null;) e = t, t = e.return;
		return e.tag === 3 ? e.stateNode : null;
	}
	var $r = {}, ei = /* @__PURE__ */ new WeakMap();
	function ti(e, t) {
		if (typeof e == "object" && e) {
			var n = ei.get(e);
			return n === void 0 ? (t = {
				value: e,
				source: t,
				stack: ee(t)
			}, ei.set(e, t), t) : n;
		}
		return {
			value: e,
			source: t,
			stack: ee(t)
		};
	}
	var ni = [], ri = 0, ii = null, ai = 0, oi = [], si = 0, ci = null, li = 1, ui = "";
	function di(e, t) {
		ni[ri++] = ai, ni[ri++] = ii, ii = e, ai = t;
	}
	function fi(e, t, n) {
		oi[si++] = li, oi[si++] = ui, oi[si++] = ci, ci = e;
		var r = li;
		e = ui;
		var i = 32 - Re(r) - 1;
		r &= ~(1 << i), n += 1;
		var a = 32 - Re(t) + i;
		if (30 < a) {
			var o = i - i % 5;
			a = (r & (1 << o) - 1).toString(32), r >>= o, i -= o, li = 1 << 32 - Re(t) + i | n << i | r, ui = a + e;
		} else li = 1 << a | n << i | r, ui = e;
	}
	function pi(e) {
		e.return !== null && (di(e, 1), fi(e, 1, 0));
	}
	function mi(e) {
		for (; e === ii;) ii = ni[--ri], ni[ri] = null, ai = ni[--ri], ni[ri] = null;
		for (; e === ci;) ci = oi[--si], oi[si] = null, ui = oi[--si], oi[si] = null, li = oi[--si], oi[si] = null;
	}
	var hi = null, gi = null, W = !1, _i = null, vi = !1, yi = Error(o(519));
	function bi(e) {
		throw Ti(ti(Error(o(418, "")), e)), yi;
	}
	function xi(e) {
		var t = e.stateNode, n = e.type, r = e.memoizedProps;
		switch (t[at] = e, t[ot] = r, n) {
			case "dialog":
				Z("cancel", t), Z("close", t);
				break;
			case "iframe":
			case "object":
			case "embed":
				Z("load", t);
				break;
			case "video":
			case "audio":
				for (n = 0; n < Qu.length; n++) Z(Qu[n], t);
				break;
			case "source":
				Z("error", t);
				break;
			case "img":
			case "image":
			case "link":
				Z("error", t), Z("load", t);
				break;
			case "details":
				Z("toggle", t);
				break;
			case "input":
				Z("invalid", t), Lt(t, r.value, r.defaultValue, r.checked, r.defaultChecked, r.type, r.name, !0), jt(t);
				break;
			case "select":
				Z("invalid", t);
				break;
			case "textarea": Z("invalid", t), Vt(t, r.value, r.defaultValue, r.children), jt(t);
		}
		n = r.children, typeof n != "string" && typeof n != "number" && typeof n != "bigint" || t.textContent === "" + n || !0 === r.suppressHydrationWarning || pd(t.textContent, n) ? (r.popover != null && (Z("beforetoggle", t), Z("toggle", t)), r.onScroll != null && Z("scroll", t), r.onScrollEnd != null && Z("scrollend", t), r.onClick != null && (t.onclick = md), t = !0) : t = !1, t || bi(e);
	}
	function Si(e) {
		for (hi = e.return; hi;) switch (hi.tag) {
			case 3:
			case 27:
				vi = !0;
				return;
			case 5:
			case 13:
				vi = !1;
				return;
			default: hi = hi.return;
		}
	}
	function Ci(e) {
		if (e !== hi) return !1;
		if (!W) return Si(e), W = !0, !1;
		var t = !1, n;
		if ((n = e.tag !== 3 && e.tag !== 27) && ((n = e.tag === 5) && (n = e.type, n = !(n !== "form" && n !== "button") || Cd(e.type, e.memoizedProps)), n = !n), n && (t = !0), t && gi && bi(e), Si(e), e.tag === 13) {
			if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(o(317));
			a: {
				for (e = e.nextSibling, t = 0; e;) {
					if (e.nodeType === 8) if (n = e.data, n === "/$") {
						if (t === 0) {
							gi = Fd(e.nextSibling);
							break a;
						}
						t--;
					} else n !== "$" && n !== "$!" && n !== "$?" || t++;
					e = e.nextSibling;
				}
				gi = null;
			}
		} else gi = hi ? Fd(e.stateNode.nextSibling) : null;
		return !0;
	}
	function wi() {
		gi = hi = null, W = !1;
	}
	function Ti(e) {
		_i === null ? _i = [e] : _i.push(e);
	}
	var Ei = Error(o(460)), Di = Error(o(474)), Oi = { then: function() {} };
	function ki(e) {
		return e = e.status, e === "fulfilled" || e === "rejected";
	}
	function Ai() {}
	function ji(e, t, n) {
		switch (n = e[n], n === void 0 ? e.push(t) : n !== t && (t.then(Ai, Ai), t = n), t.status) {
			case "fulfilled": return t.value;
			case "rejected": throw e = t.reason, e === Ei ? Error(o(483)) : e;
			default:
				if (typeof t.status == "string") t.then(Ai, Ai);
				else {
					if (e = El, e !== null && 100 < e.shellSuspendCounter) throw Error(o(482));
					e = t, e.status = "pending", e.then(function(e) {
						if (t.status === "pending") {
							var n = t;
							n.status = "fulfilled", n.value = e;
						}
					}, function(e) {
						if (t.status === "pending") {
							var n = t;
							n.status = "rejected", n.reason = e;
						}
					});
				}
				switch (t.status) {
					case "fulfilled": return t.value;
					case "rejected": throw e = t.reason, e === Ei ? Error(o(483)) : e;
				}
				throw Mi = t, Ei;
		}
	}
	var Mi = null;
	function Ni() {
		if (Mi === null) throw Error(o(459));
		var e = Mi;
		return Mi = null, e;
	}
	var Pi = null, Fi = 0;
	function Ii(e) {
		var t = Fi;
		return Fi += 1, Pi === null && (Pi = []), ji(Pi, e, t);
	}
	function Li(e, t) {
		t = t.props.ref, e.ref = t === void 0 ? null : t;
	}
	function Ri(e, t) {
		throw t.$$typeof === l ? Error(o(525)) : (e = Object.prototype.toString.call(t), Error(o(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e)));
	}
	function zi(e) {
		var t = e._init;
		return t(e._payload);
	}
	function Bi(e) {
		function t(t, n) {
			if (e) {
				var r = t.deletions;
				r === null ? (t.deletions = [n], t.flags |= 16) : r.push(n);
			}
		}
		function n(n, r) {
			if (!e) return null;
			for (; r !== null;) t(n, r), r = r.sibling;
			return null;
		}
		function r(e) {
			for (var t = /* @__PURE__ */ new Map(); e !== null;) e.key === null ? t.set(e.index, e) : t.set(e.key, e), e = e.sibling;
			return t;
		}
		function i(e, t) {
			return e = cl(e, t), e.index = 0, e.sibling = null, e;
		}
		function a(t, n, r) {
			return t.index = r, e ? (r = t.alternate, r === null ? (t.flags |= 33554434, n) : (r = r.index, r < n ? (t.flags |= 33554434, n) : r)) : (t.flags |= 1048576, n);
		}
		function s(t) {
			return e && t.alternate === null && (t.flags |= 33554434), t;
		}
		function c(e, t, n, r) {
			return t === null || t.tag !== 6 ? (t = pl(n, e.mode, r), t.return = e, t) : (t = i(t, n), t.return = e, t);
		}
		function l(e, t, n, r) {
			var a = n.type;
			return a === f ? m(e, t, n.props.children, r, n.key) : t !== null && (t.elementType === a || typeof a == "object" && a && a.$$typeof === S && zi(a) === t.type) ? (t = i(t, n.props), Li(t, n), t.return = e, t) : (t = ul(n.type, n.key, n.props, null, e.mode, r), Li(t, n), t.return = e, t);
		}
		function p(e, t, n, r) {
			return t === null || t.tag !== 4 || t.stateNode.containerInfo !== n.containerInfo || t.stateNode.implementation !== n.implementation ? (t = ml(n, e.mode, r), t.return = e, t) : (t = i(t, n.children || []), t.return = e, t);
		}
		function m(e, t, n, r, a) {
			return t === null || t.tag !== 7 ? (t = dl(n, e.mode, r, a), t.return = e, t) : (t = i(t, n), t.return = e, t);
		}
		function h(e, t, n) {
			if (typeof t == "string" && t !== "" || typeof t == "number" || typeof t == "bigint") return t = pl("" + t, e.mode, n), t.return = e, t;
			if (typeof t == "object" && t) {
				switch (t.$$typeof) {
					case u: return n = ul(t.type, t.key, t.props, null, e.mode, n), Li(n, t), n.return = e, n;
					case d: return t = ml(t, e.mode, n), t.return = e, t;
					case S:
						var r = t._init;
						return t = r(t._payload), h(e, t, n);
				}
				if (L(t) || E(t)) return t = dl(t, e.mode, n, null), t.return = e, t;
				if (typeof t.then == "function") return h(e, Ii(t), n);
				if (t.$$typeof === _) return h(e, Ys(e, t), n);
				Ri(e, t);
			}
			return null;
		}
		function g(e, t, n, r) {
			var i = t === null ? null : t.key;
			if (typeof n == "string" && n !== "" || typeof n == "number" || typeof n == "bigint") return i === null ? c(e, t, "" + n, r) : null;
			if (typeof n == "object" && n) {
				switch (n.$$typeof) {
					case u: return n.key === i ? l(e, t, n, r) : null;
					case d: return n.key === i ? p(e, t, n, r) : null;
					case S: return i = n._init, n = i(n._payload), g(e, t, n, r);
				}
				if (L(n) || E(n)) return i === null ? m(e, t, n, r, null) : null;
				if (typeof n.then == "function") return g(e, t, Ii(n), r);
				if (n.$$typeof === _) return g(e, t, Ys(e, n), r);
				Ri(e, n);
			}
			return null;
		}
		function v(e, t, n, r, i) {
			if (typeof r == "string" && r !== "" || typeof r == "number" || typeof r == "bigint") return e = e.get(n) || null, c(t, e, "" + r, i);
			if (typeof r == "object" && r) {
				switch (r.$$typeof) {
					case u: return e = e.get(r.key === null ? n : r.key) || null, l(t, e, r, i);
					case d: return e = e.get(r.key === null ? n : r.key) || null, p(t, e, r, i);
					case S:
						var a = r._init;
						return r = a(r._payload), v(e, t, n, r, i);
				}
				if (L(r) || E(r)) return e = e.get(n) || null, m(t, e, r, i, null);
				if (typeof r.then == "function") return v(e, t, n, Ii(r), i);
				if (r.$$typeof === _) return v(e, t, n, Ys(t, r), i);
				Ri(t, r);
			}
			return null;
		}
		function y(i, o, s, c) {
			for (var l = null, u = null, d = o, f = o = 0, p = null; d !== null && f < s.length; f++) {
				d.index > f ? (p = d, d = null) : p = d.sibling;
				var m = g(i, d, s[f], c);
				if (m === null) {
					d === null && (d = p);
					break;
				}
				e && d && m.alternate === null && t(i, d), o = a(m, o, f), u === null ? l = m : u.sibling = m, u = m, d = p;
			}
			if (f === s.length) return n(i, d), W && di(i, f), l;
			if (d === null) {
				for (; f < s.length; f++) d = h(i, s[f], c), d !== null && (o = a(d, o, f), u === null ? l = d : u.sibling = d, u = d);
				return W && di(i, f), l;
			}
			for (d = r(d); f < s.length; f++) p = v(d, i, f, s[f], c), p !== null && (e && p.alternate !== null && d.delete(p.key === null ? f : p.key), o = a(p, o, f), u === null ? l = p : u.sibling = p, u = p);
			return e && d.forEach(function(e) {
				return t(i, e);
			}), W && di(i, f), l;
		}
		function b(i, s, c, l) {
			if (c == null) throw Error(o(151));
			for (var u = null, d = null, f = s, p = s = 0, m = null, _ = c.next(); f !== null && !_.done; p++, _ = c.next()) {
				f.index > p ? (m = f, f = null) : m = f.sibling;
				var y = g(i, f, _.value, l);
				if (y === null) {
					f === null && (f = m);
					break;
				}
				e && f && y.alternate === null && t(i, f), s = a(y, s, p), d === null ? u = y : d.sibling = y, d = y, f = m;
			}
			if (_.done) return n(i, f), W && di(i, p), u;
			if (f === null) {
				for (; !_.done; p++, _ = c.next()) _ = h(i, _.value, l), _ !== null && (s = a(_, s, p), d === null ? u = _ : d.sibling = _, d = _);
				return W && di(i, p), u;
			}
			for (f = r(f); !_.done; p++, _ = c.next()) _ = v(f, i, p, _.value, l), _ !== null && (e && _.alternate !== null && f.delete(_.key === null ? p : _.key), s = a(_, s, p), d === null ? u = _ : d.sibling = _, d = _);
			return e && f.forEach(function(e) {
				return t(i, e);
			}), W && di(i, p), u;
		}
		function x(e, r, a, c) {
			if (typeof a == "object" && a && a.type === f && a.key === null && (a = a.props.children), typeof a == "object" && a) {
				switch (a.$$typeof) {
					case u:
						a: {
							for (var l = a.key; r !== null;) {
								if (r.key === l) {
									if (l = a.type, l === f) {
										if (r.tag === 7) {
											n(e, r.sibling), c = i(r, a.props.children), c.return = e, e = c;
											break a;
										}
									} else if (r.elementType === l || typeof l == "object" && l && l.$$typeof === S && zi(l) === r.type) {
										n(e, r.sibling), c = i(r, a.props), Li(c, a), c.return = e, e = c;
										break a;
									}
									n(e, r);
									break;
								} else t(e, r);
								r = r.sibling;
							}
							a.type === f ? (c = dl(a.props.children, e.mode, c, a.key), c.return = e, e = c) : (c = ul(a.type, a.key, a.props, null, e.mode, c), Li(c, a), c.return = e, e = c);
						}
						return s(e);
					case d:
						a: {
							for (l = a.key; r !== null;) {
								if (r.key === l) if (r.tag === 4 && r.stateNode.containerInfo === a.containerInfo && r.stateNode.implementation === a.implementation) {
									n(e, r.sibling), c = i(r, a.children || []), c.return = e, e = c;
									break a;
								} else {
									n(e, r);
									break;
								}
								else t(e, r);
								r = r.sibling;
							}
							c = ml(a, e.mode, c), c.return = e, e = c;
						}
						return s(e);
					case S: return l = a._init, a = l(a._payload), x(e, r, a, c);
				}
				if (L(a)) return y(e, r, a, c);
				if (E(a)) {
					if (l = E(a), typeof l != "function") throw Error(o(150));
					return a = l.call(a), b(e, r, a, c);
				}
				if (typeof a.then == "function") return x(e, r, Ii(a), c);
				if (a.$$typeof === _) return x(e, r, Ys(e, a), c);
				Ri(e, a);
			}
			return typeof a == "string" && a !== "" || typeof a == "number" || typeof a == "bigint" ? (a = "" + a, r !== null && r.tag === 6 ? (n(e, r.sibling), c = i(r, a), c.return = e, e = c) : (n(e, r), c = pl(a, e.mode, c), c.return = e, e = c), s(e)) : n(e, r);
		}
		return function(e, t, n, r) {
			try {
				Fi = 0;
				var i = x(e, t, n, r);
				return Pi = null, i;
			} catch (t) {
				if (t === Ei) throw t;
				var a = ol(29, t, null, e.mode);
				return a.lanes = r, a.return = e, a;
			}
		};
	}
	var Vi = Bi(!0), Hi = Bi(!1), Ui = le(null), Wi = le(0);
	function Gi(e, t) {
		e = jl, de(Wi, e), de(Ui, t), jl = e | t.baseLanes;
	}
	function Ki() {
		de(Wi, jl), de(Ui, Ui.current);
	}
	function qi() {
		jl = Wi.current, ue(Ui), ue(Wi);
	}
	var Ji = le(null), Yi = null;
	function Xi(e) {
		var t = e.alternate;
		de(ea, ea.current & 1), de(Ji, e), Yi === null && (t === null || Ui.current !== null || t.memoizedState !== null) && (Yi = e);
	}
	function Zi(e) {
		if (e.tag === 22) {
			if (de(ea, ea.current), de(Ji, e), Yi === null) {
				var t = e.alternate;
				t !== null && t.memoizedState !== null && (Yi = e);
			}
		} else Qi(e);
	}
	function Qi() {
		de(ea, ea.current), de(Ji, Ji.current);
	}
	function $i(e) {
		ue(Ji), Yi === e && (Yi = null), ue(ea);
	}
	var ea = le(0);
	function ta(e) {
		for (var t = e; t !== null;) {
			if (t.tag === 13) {
				var n = t.memoizedState;
				if (n !== null && (n = n.dehydrated, n === null || n.data === "$?" || n.data === "$!")) return t;
			} else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
				if (t.flags & 128) return t;
			} else if (t.child !== null) {
				t.child.return = t, t = t.child;
				continue;
			}
			if (t === e) break;
			for (; t.sibling === null;) {
				if (t.return === null || t.return === e) return null;
				t = t.return;
			}
			t.sibling.return = t.return, t = t.sibling;
		}
		return null;
	}
	var na = typeof AbortController < "u" ? AbortController : function() {
		var e = [], t = this.signal = {
			aborted: !1,
			addEventListener: function(t, n) {
				e.push(n);
			}
		};
		this.abort = function() {
			t.aborted = !0, e.forEach(function(e) {
				return e();
			});
		};
	}, ra = t.unstable_scheduleCallback, ia = t.unstable_NormalPriority, aa = {
		$$typeof: _,
		Consumer: null,
		Provider: null,
		_currentValue: null,
		_currentValue2: null,
		_threadCount: 0
	};
	function oa() {
		return {
			controller: new na(),
			data: /* @__PURE__ */ new Map(),
			refCount: 0
		};
	}
	function sa(e) {
		e.refCount--, e.refCount === 0 && ra(ia, function() {
			e.controller.abort();
		});
	}
	var ca = null, la = 0, ua = 0, da = null;
	function fa(e, t) {
		if (ca === null) {
			var n = ca = [];
			la = 0, ua = Ku(), da = {
				status: "pending",
				value: void 0,
				then: function(e) {
					n.push(e);
				}
			};
		}
		return la++, t.then(pa, pa), t;
	}
	function pa() {
		if (--la === 0 && ca !== null) {
			da !== null && (da.status = "fulfilled");
			var e = ca;
			ca = null, ua = 0, da = null;
			for (var t = 0; t < e.length; t++) (0, e[t])();
		}
	}
	function ma(e, t) {
		var n = [], r = {
			status: "pending",
			value: null,
			reason: null,
			then: function(e) {
				n.push(e);
			}
		};
		return e.then(function() {
			r.status = "fulfilled", r.value = t;
			for (var e = 0; e < n.length; e++) (0, n[e])(t);
		}, function(e) {
			for (r.status = "rejected", r.reason = e, e = 0; e < n.length; e++) (0, n[e])(void 0);
		}), r;
	}
	var ha = k.S;
	k.S = function(e, t) {
		typeof t == "object" && t && typeof t.then == "function" && fa(e, t), ha !== null && ha(e, t);
	};
	var ga = le(null);
	function _a() {
		var e = ga.current;
		return e === null ? El.pooledCache : e;
	}
	function va(e, t) {
		t === null ? de(ga, ga.current) : de(ga, t.pool);
	}
	function ya() {
		var e = _a();
		return e === null ? null : {
			parent: aa._currentValue,
			pool: e
		};
	}
	var ba = 0, G = null, K = null, xa = null, Sa = !1, Ca = !1, wa = !1, Ta = 0, Ea = 0, Da = null, Oa = 0;
	function ka() {
		throw Error(o(321));
	}
	function Aa(e, t) {
		if (t === null) return !1;
		for (var n = 0; n < t.length && n < e.length; n++) if (!hr(e[n], t[n])) return !1;
		return !0;
	}
	function ja(e, t, n, r, i, a) {
		return ba = a, G = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, k.H = e === null || e.memoizedState === null ? qo : Jo, wa = !1, a = n(r, i), wa = !1, Ca && (a = Na(t, n, r, i)), Ma(e), a;
	}
	function Ma(e) {
		k.H = Ko;
		var t = K !== null && K.next !== null;
		if (ba = 0, xa = K = G = null, Sa = !1, Ea = 0, Da = null, t) throw Error(o(300));
		e === null || fs || (e = e.dependencies, e !== null && Ks(e) && (fs = !0));
	}
	function Na(e, t, n, r) {
		G = e;
		var i = 0;
		do {
			if (Ca && (Da = null), Ea = 0, Ca = !1, 25 <= i) throw Error(o(301));
			if (i += 1, xa = K = null, e.updateQueue != null) {
				var a = e.updateQueue;
				a.lastEffect = null, a.events = null, a.stores = null, a.memoCache != null && (a.memoCache.index = 0);
			}
			k.H = Yo, a = t(n, r);
		} while (Ca);
		return a;
	}
	function Pa() {
		var e = k.H, t = e.useState()[0];
		return t = typeof t.then == "function" ? Va(t) : t, e = e.useState()[0], (K === null ? null : K.memoizedState) !== e && (G.flags |= 1024), t;
	}
	function Fa() {
		var e = Ta !== 0;
		return Ta = 0, e;
	}
	function Ia(e, t, n) {
		t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~n;
	}
	function La(e) {
		if (Sa) {
			for (e = e.memoizedState; e !== null;) {
				var t = e.queue;
				t !== null && (t.pending = null), e = e.next;
			}
			Sa = !1;
		}
		ba = 0, xa = K = G = null, Ca = !1, Ea = Ta = 0, Da = null;
	}
	function Ra() {
		var e = {
			memoizedState: null,
			baseState: null,
			baseQueue: null,
			queue: null,
			next: null
		};
		return xa === null ? G.memoizedState = xa = e : xa = xa.next = e, xa;
	}
	function za() {
		if (K === null) {
			var e = G.alternate;
			e = e === null ? null : e.memoizedState;
		} else e = K.next;
		var t = xa === null ? G.memoizedState : xa.next;
		if (t !== null) xa = t, K = e;
		else {
			if (e === null) throw G.alternate === null ? Error(o(467)) : Error(o(310));
			K = e, e = {
				memoizedState: K.memoizedState,
				baseState: K.baseState,
				baseQueue: K.baseQueue,
				queue: K.queue,
				next: null
			}, xa === null ? G.memoizedState = xa = e : xa = xa.next = e;
		}
		return xa;
	}
	var Ba = function() {
		return {
			lastEffect: null,
			events: null,
			stores: null,
			memoCache: null
		};
	};
	function Va(e) {
		var t = Ea;
		return Ea += 1, Da === null && (Da = []), e = ji(Da, e, t), t = G, (xa === null ? t.memoizedState : xa.next) === null && (t = t.alternate, k.H = t === null || t.memoizedState === null ? qo : Jo), e;
	}
	function Ha(e) {
		if (typeof e == "object" && e) {
			if (typeof e.then == "function") return Va(e);
			if (e.$$typeof === _) return Js(e);
		}
		throw Error(o(438, String(e)));
	}
	function Ua(e) {
		var t = null, n = G.updateQueue;
		if (n !== null && (t = n.memoCache), t == null) {
			var r = G.alternate;
			r !== null && (r = r.updateQueue, r !== null && (r = r.memoCache, r != null && (t = {
				data: r.data.map(function(e) {
					return e.slice();
				}),
				index: 0
			})));
		}
		if (t ??= {
			data: [],
			index: 0
		}, n === null && (n = Ba(), G.updateQueue = n), n.memoCache = t, n = t.data[t.index], n === void 0) for (n = t.data[t.index] = Array(e), r = 0; r < e; r++) n[r] = w;
		return t.index++, n;
	}
	function Wa(e, t) {
		return typeof t == "function" ? t(e) : t;
	}
	function Ga(e) {
		return Ka(za(), K, e);
	}
	function Ka(e, t, n) {
		var r = e.queue;
		if (r === null) throw Error(o(311));
		r.lastRenderedReducer = n;
		var i = e.baseQueue, a = r.pending;
		if (a !== null) {
			if (i !== null) {
				var s = i.next;
				i.next = a.next, a.next = s;
			}
			t.baseQueue = i = a, r.pending = null;
		}
		if (a = e.baseState, i === null) e.memoizedState = a;
		else {
			t = i.next;
			var c = s = null, l = null, u = t, d = !1;
			do {
				var f = u.lane & -536870913;
				if (f === u.lane ? (ba & f) === f : (J & f) === f) {
					var p = u.revertLane;
					if (p === 0) l !== null && (l = l.next = {
						lane: 0,
						revertLane: 0,
						action: u.action,
						hasEagerState: u.hasEagerState,
						eagerState: u.eagerState,
						next: null
					}), f === ua && (d = !0);
					else if ((ba & p) === p) {
						u = u.next, p === ua && (d = !0);
						continue;
					} else f = {
						lane: 0,
						revertLane: u.revertLane,
						action: u.action,
						hasEagerState: u.hasEagerState,
						eagerState: u.eagerState,
						next: null
					}, l === null ? (c = l = f, s = a) : l = l.next = f, G.lanes |= p, Nl |= p;
					f = u.action, wa && n(a, f), a = u.hasEagerState ? u.eagerState : n(a, f);
				} else p = {
					lane: f,
					revertLane: u.revertLane,
					action: u.action,
					hasEagerState: u.hasEagerState,
					eagerState: u.eagerState,
					next: null
				}, l === null ? (c = l = p, s = a) : l = l.next = p, G.lanes |= f, Nl |= f;
				u = u.next;
			} while (u !== null && u !== t);
			if (l === null ? s = a : l.next = c, !hr(a, e.memoizedState) && (fs = !0, d && (n = da, n !== null))) throw n;
			e.memoizedState = a, e.baseState = s, e.baseQueue = l, r.lastRenderedState = a;
		}
		return i === null && (r.lanes = 0), [e.memoizedState, r.dispatch];
	}
	function qa(e) {
		var t = za(), n = t.queue;
		if (n === null) throw Error(o(311));
		n.lastRenderedReducer = e;
		var r = n.dispatch, i = n.pending, a = t.memoizedState;
		if (i !== null) {
			n.pending = null;
			var s = i = i.next;
			do
				a = e(a, s.action), s = s.next;
			while (s !== i);
			hr(a, t.memoizedState) || (fs = !0), t.memoizedState = a, t.baseQueue === null && (t.baseState = a), n.lastRenderedState = a;
		}
		return [a, r];
	}
	function Ja(e, t, n) {
		var r = G, i = za(), a = W;
		if (a) {
			if (n === void 0) throw Error(o(407));
			n = n();
		} else n = t();
		var s = !hr((K || i).memoizedState, n);
		if (s && (i.memoizedState = n, fs = !0), i = i.queue, bo(Za.bind(null, r, i, e), [e]), i.getSnapshot !== t || s || xa !== null && xa.memoizedState.tag & 1) {
			if (r.flags |= 2048, ho(9, Xa.bind(null, r, i, n, t), { destroy: void 0 }, null), El === null) throw Error(o(349));
			a || ba & 60 || Ya(r, t, n);
		}
		return n;
	}
	function Ya(e, t, n) {
		e.flags |= 16384, e = {
			getSnapshot: t,
			value: n
		}, t = G.updateQueue, t === null ? (t = Ba(), G.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
	}
	function Xa(e, t, n, r) {
		t.value = n, t.getSnapshot = r, Qa(t) && $a(e);
	}
	function Za(e, t, n) {
		return n(function() {
			Qa(t) && $a(e);
		});
	}
	function Qa(e) {
		var t = e.getSnapshot;
		e = e.value;
		try {
			var n = t();
			return !hr(e, n);
		} catch {
			return !0;
		}
	}
	function $a(e) {
		var t = Xr(e, 2);
		t !== null && eu(t, e, 2);
	}
	function eo(e) {
		var t = Ra();
		if (typeof e == "function") {
			var n = e;
			if (e = n(), wa) {
				Le(!0);
				try {
					n();
				} finally {
					Le(!1);
				}
			}
		}
		return t.memoizedState = t.baseState = e, t.queue = {
			pending: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: Wa,
			lastRenderedState: e
		}, t;
	}
	function to(e, t, n, r) {
		return e.baseState = n, Ka(e, K, typeof r == "function" ? r : Wa);
	}
	function no(e, t, n, r, i) {
		if (Uo(e)) throw Error(o(485));
		if (e = t.action, e !== null) {
			var a = {
				payload: i,
				action: e,
				next: null,
				isTransition: !0,
				status: "pending",
				value: null,
				reason: null,
				listeners: [],
				then: function(e) {
					a.listeners.push(e);
				}
			};
			k.T === null ? a.isTransition = !1 : n(!0), r(a), n = t.pending, n === null ? (a.next = t.pending = a, ro(t, a)) : (a.next = n.next, t.pending = n.next = a);
		}
	}
	function ro(e, t) {
		var n = t.action, r = t.payload, i = e.state;
		if (t.isTransition) {
			var a = k.T, o = {};
			k.T = o;
			try {
				var s = n(i, r), c = k.S;
				c !== null && c(o, s), io(e, t, s);
			} catch (n) {
				oo(e, t, n);
			} finally {
				k.T = a;
			}
		} else try {
			a = n(i, r), io(e, t, a);
		} catch (n) {
			oo(e, t, n);
		}
	}
	function io(e, t, n) {
		typeof n == "object" && n && typeof n.then == "function" ? n.then(function(n) {
			ao(e, t, n);
		}, function(n) {
			return oo(e, t, n);
		}) : ao(e, t, n);
	}
	function ao(e, t, n) {
		t.status = "fulfilled", t.value = n, so(t), e.state = n, t = e.pending, t !== null && (n = t.next, n === t ? e.pending = null : (n = n.next, t.next = n, ro(e, n)));
	}
	function oo(e, t, n) {
		var r = e.pending;
		if (e.pending = null, r !== null) {
			r = r.next;
			do
				t.status = "rejected", t.reason = n, so(t), t = t.next;
			while (t !== r);
		}
		e.action = null;
	}
	function so(e) {
		e = e.listeners;
		for (var t = 0; t < e.length; t++) (0, e[t])();
	}
	function co(e, t) {
		return t;
	}
	function lo(e, t) {
		if (W) {
			var n = El.formState;
			if (n !== null) {
				a: {
					var r = G;
					if (W) {
						if (gi) {
							b: {
								for (var i = gi, a = vi; i.nodeType !== 8;) {
									if (!a) {
										i = null;
										break b;
									}
									if (i = Fd(i.nextSibling), i === null) {
										i = null;
										break b;
									}
								}
								a = i.data, i = a === "F!" || a === "F" ? i : null;
							}
							if (i) {
								gi = Fd(i.nextSibling), r = i.data === "F!";
								break a;
							}
						}
						bi(r);
					}
					r = !1;
				}
				r && (t = n[0]);
			}
		}
		return n = Ra(), n.memoizedState = n.baseState = t, r = {
			pending: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: co,
			lastRenderedState: t
		}, n.queue = r, n = Bo.bind(null, G, r), r.dispatch = n, r = eo(!1), a = Ho.bind(null, G, !1, r.queue), r = Ra(), i = {
			state: t,
			dispatch: null,
			action: e,
			pending: null
		}, r.queue = i, n = no.bind(null, G, i, a, n), i.dispatch = n, r.memoizedState = e, [
			t,
			n,
			!1
		];
	}
	function uo(e) {
		return fo(za(), K, e);
	}
	function fo(e, t, n) {
		t = Ka(e, t, co)[0], e = Ga(Wa)[0], t = typeof t == "object" && t && typeof t.then == "function" ? Va(t) : t;
		var r = za(), i = r.queue, a = i.dispatch;
		return n !== r.memoizedState && (G.flags |= 2048, ho(9, po.bind(null, i, n), { destroy: void 0 }, null)), [
			t,
			a,
			e
		];
	}
	function po(e, t) {
		e.action = t;
	}
	function mo(e) {
		var t = za(), n = K;
		if (n !== null) return fo(t, n, e);
		za(), t = t.memoizedState, n = za();
		var r = n.queue.dispatch;
		return n.memoizedState = e, [
			t,
			r,
			!1
		];
	}
	function ho(e, t, n, r) {
		return e = {
			tag: e,
			create: t,
			inst: n,
			deps: r,
			next: null
		}, t = G.updateQueue, t === null && (t = Ba(), G.updateQueue = t), n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e), e;
	}
	function go() {
		return za().memoizedState;
	}
	function _o(e, t, n, r) {
		var i = Ra();
		G.flags |= e, i.memoizedState = ho(1 | t, n, { destroy: void 0 }, r === void 0 ? null : r);
	}
	function vo(e, t, n, r) {
		var i = za();
		r = r === void 0 ? null : r;
		var a = i.memoizedState.inst;
		K !== null && r !== null && Aa(r, K.memoizedState.deps) ? i.memoizedState = ho(t, n, a, r) : (G.flags |= e, i.memoizedState = ho(1 | t, n, a, r));
	}
	function yo(e, t) {
		_o(8390656, 8, e, t);
	}
	function bo(e, t) {
		vo(2048, 8, e, t);
	}
	function xo(e, t) {
		return vo(4, 2, e, t);
	}
	function So(e, t) {
		return vo(4, 4, e, t);
	}
	function Co(e, t) {
		if (typeof t == "function") {
			e = e();
			var n = t(e);
			return function() {
				typeof n == "function" ? n() : t(null);
			};
		}
		if (t != null) return e = e(), t.current = e, function() {
			t.current = null;
		};
	}
	function wo(e, t, n) {
		n = n == null ? null : n.concat([e]), vo(4, 4, Co.bind(null, t, e), n);
	}
	function To() {}
	function Eo(e, t) {
		var n = za();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		return t !== null && Aa(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
	}
	function Do(e, t) {
		var n = za();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		if (t !== null && Aa(t, r[1])) return r[0];
		if (r = e(), wa) {
			Le(!0);
			try {
				e();
			} finally {
				Le(!1);
			}
		}
		return n.memoizedState = [r, t], r;
	}
	function Oo(e, t, n) {
		return n === void 0 || ba & 1073741824 ? e.memoizedState = t : (e.memoizedState = n, e = $l(), G.lanes |= e, Nl |= e, n);
	}
	function ko(e, t, n, r) {
		return hr(n, t) ? n : Ui.current === null ? ba & 42 ? (e = $l(), G.lanes |= e, Nl |= e, t) : (fs = !0, e.memoizedState = n) : (e = Oo(e, n, r), hr(e, t) || (fs = !0), e);
	}
	function Ao(e, t, n, r, i) {
		var a = R.p;
		R.p = a !== 0 && 8 > a ? a : 8;
		var o = k.T, s = {};
		k.T = s, Ho(e, !1, t, n);
		try {
			var c = i(), l = k.S;
			l !== null && l(s, c), typeof c == "object" && c && typeof c.then == "function" ? Vo(e, t, ma(c, r), Ql(e)) : Vo(e, t, r, Ql(e));
		} catch (n) {
			Vo(e, t, {
				then: function() {},
				status: "rejected",
				reason: n
			}, Ql());
		} finally {
			R.p = a, k.T = o;
		}
	}
	function jo() {}
	function Mo(e, t, n, r) {
		if (e.tag !== 5) throw Error(o(476));
		var i = No(e).queue;
		Ao(e, i, t, oe, n === null ? jo : function() {
			return Po(e), n(r);
		});
	}
	function No(e) {
		var t = e.memoizedState;
		if (t !== null) return t;
		t = {
			memoizedState: oe,
			baseState: oe,
			baseQueue: null,
			queue: {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: Wa,
				lastRenderedState: oe
			},
			next: null
		};
		var n = {};
		return t.next = {
			memoizedState: n,
			baseState: n,
			baseQueue: null,
			queue: {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: Wa,
				lastRenderedState: n
			},
			next: null
		}, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
	}
	function Po(e) {
		var t = No(e).next.queue;
		Vo(e, t, {}, Ql());
	}
	function Fo() {
		return Js(wf);
	}
	function Io() {
		return za().memoizedState;
	}
	function Lo() {
		return za().memoizedState;
	}
	function Ro(e) {
		for (var t = e.return; t !== null;) {
			switch (t.tag) {
				case 24:
				case 3:
					var n = Ql();
					e = ec(n);
					var r = tc(t, e, n);
					r !== null && (eu(r, t, n), nc(r, t, n)), t = { cache: oa() }, e.payload = t;
					return;
			}
			t = t.return;
		}
	}
	function zo(e, t, n) {
		var r = Ql();
		n = {
			lane: r,
			revertLane: 0,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null
		}, Uo(e) ? Wo(t, n) : (n = Yr(e, t, n, r), n !== null && (eu(n, e, r), Go(n, t, r)));
	}
	function Bo(e, t, n) {
		Vo(e, t, n, Ql());
	}
	function Vo(e, t, n, r) {
		var i = {
			lane: r,
			revertLane: 0,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null
		};
		if (Uo(e)) Wo(t, i);
		else {
			var a = e.alternate;
			if (e.lanes === 0 && (a === null || a.lanes === 0) && (a = t.lastRenderedReducer, a !== null)) try {
				var o = t.lastRenderedState, s = a(o, n);
				if (i.hasEagerState = !0, i.eagerState = s, hr(s, o)) return Jr(e, t, i, 0), El === null && qr(), !1;
			} catch {}
			if (n = Yr(e, t, i, r), n !== null) return eu(n, e, r), Go(n, t, r), !0;
		}
		return !1;
	}
	function Ho(e, t, n, r) {
		if (r = {
			lane: 2,
			revertLane: Ku(),
			action: r,
			hasEagerState: !1,
			eagerState: null,
			next: null
		}, Uo(e)) {
			if (t) throw Error(o(479));
		} else t = Yr(e, n, r, 2), t !== null && eu(t, e, 2);
	}
	function Uo(e) {
		var t = e.alternate;
		return e === G || t !== null && t === G;
	}
	function Wo(e, t) {
		Ca = Sa = !0;
		var n = e.pending;
		n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
	}
	function Go(e, t, n) {
		if (n & 4194176) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, et(e, n);
		}
	}
	var Ko = {
		readContext: Js,
		use: Ha,
		useCallback: ka,
		useContext: ka,
		useEffect: ka,
		useImperativeHandle: ka,
		useLayoutEffect: ka,
		useInsertionEffect: ka,
		useMemo: ka,
		useReducer: ka,
		useRef: ka,
		useState: ka,
		useDebugValue: ka,
		useDeferredValue: ka,
		useTransition: ka,
		useSyncExternalStore: ka,
		useId: ka
	};
	Ko.useCacheRefresh = ka, Ko.useMemoCache = ka, Ko.useHostTransitionStatus = ka, Ko.useFormState = ka, Ko.useActionState = ka, Ko.useOptimistic = ka;
	var qo = {
		readContext: Js,
		use: Ha,
		useCallback: function(e, t) {
			return Ra().memoizedState = [e, t === void 0 ? null : t], e;
		},
		useContext: Js,
		useEffect: yo,
		useImperativeHandle: function(e, t, n) {
			n = n == null ? null : n.concat([e]), _o(4194308, 4, Co.bind(null, t, e), n);
		},
		useLayoutEffect: function(e, t) {
			return _o(4194308, 4, e, t);
		},
		useInsertionEffect: function(e, t) {
			_o(4, 2, e, t);
		},
		useMemo: function(e, t) {
			var n = Ra();
			t = t === void 0 ? null : t;
			var r = e();
			if (wa) {
				Le(!0);
				try {
					e();
				} finally {
					Le(!1);
				}
			}
			return n.memoizedState = [r, t], r;
		},
		useReducer: function(e, t, n) {
			var r = Ra();
			if (n !== void 0) {
				var i = n(t);
				if (wa) {
					Le(!0);
					try {
						n(t);
					} finally {
						Le(!1);
					}
				}
			} else i = t;
			return r.memoizedState = r.baseState = i, e = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: e,
				lastRenderedState: i
			}, r.queue = e, e = e.dispatch = zo.bind(null, G, e), [r.memoizedState, e];
		},
		useRef: function(e) {
			var t = Ra();
			return e = { current: e }, t.memoizedState = e;
		},
		useState: function(e) {
			e = eo(e);
			var t = e.queue, n = Bo.bind(null, G, t);
			return t.dispatch = n, [e.memoizedState, n];
		},
		useDebugValue: To,
		useDeferredValue: function(e, t) {
			return Oo(Ra(), e, t);
		},
		useTransition: function() {
			var e = eo(!1);
			return e = Ao.bind(null, G, e.queue, !0, !1), Ra().memoizedState = e, [!1, e];
		},
		useSyncExternalStore: function(e, t, n) {
			var r = G, i = Ra();
			if (W) {
				if (n === void 0) throw Error(o(407));
				n = n();
			} else {
				if (n = t(), El === null) throw Error(o(349));
				J & 60 || Ya(r, t, n);
			}
			i.memoizedState = n;
			var a = {
				value: n,
				getSnapshot: t
			};
			return i.queue = a, yo(Za.bind(null, r, a, e), [e]), r.flags |= 2048, ho(9, Xa.bind(null, r, a, n, t), { destroy: void 0 }, null), n;
		},
		useId: function() {
			var e = Ra(), t = El.identifierPrefix;
			if (W) {
				var n = ui, r = li;
				n = (r & ~(1 << 32 - Re(r) - 1)).toString(32) + n, t = ":" + t + "R" + n, n = Ta++, 0 < n && (t += "H" + n.toString(32)), t += ":";
			} else n = Oa++, t = ":" + t + "r" + n.toString(32) + ":";
			return e.memoizedState = t;
		},
		useCacheRefresh: function() {
			return Ra().memoizedState = Ro.bind(null, G);
		}
	};
	qo.useMemoCache = Ua, qo.useHostTransitionStatus = Fo, qo.useFormState = lo, qo.useActionState = lo, qo.useOptimistic = function(e) {
		var t = Ra();
		t.memoizedState = t.baseState = e;
		var n = {
			pending: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: null,
			lastRenderedState: null
		};
		return t.queue = n, t = Ho.bind(null, G, !0, n), n.dispatch = t, [e, t];
	};
	var Jo = {
		readContext: Js,
		use: Ha,
		useCallback: Eo,
		useContext: Js,
		useEffect: bo,
		useImperativeHandle: wo,
		useInsertionEffect: xo,
		useLayoutEffect: So,
		useMemo: Do,
		useReducer: Ga,
		useRef: go,
		useState: function() {
			return Ga(Wa);
		},
		useDebugValue: To,
		useDeferredValue: function(e, t) {
			return ko(za(), K.memoizedState, e, t);
		},
		useTransition: function() {
			var e = Ga(Wa)[0], t = za().memoizedState;
			return [typeof e == "boolean" ? e : Va(e), t];
		},
		useSyncExternalStore: Ja,
		useId: Io
	};
	Jo.useCacheRefresh = Lo, Jo.useMemoCache = Ua, Jo.useHostTransitionStatus = Fo, Jo.useFormState = uo, Jo.useActionState = uo, Jo.useOptimistic = function(e, t) {
		return to(za(), K, e, t);
	};
	var Yo = {
		readContext: Js,
		use: Ha,
		useCallback: Eo,
		useContext: Js,
		useEffect: bo,
		useImperativeHandle: wo,
		useInsertionEffect: xo,
		useLayoutEffect: So,
		useMemo: Do,
		useReducer: qa,
		useRef: go,
		useState: function() {
			return qa(Wa);
		},
		useDebugValue: To,
		useDeferredValue: function(e, t) {
			var n = za();
			return K === null ? Oo(n, e, t) : ko(n, K.memoizedState, e, t);
		},
		useTransition: function() {
			var e = qa(Wa)[0], t = za().memoizedState;
			return [typeof e == "boolean" ? e : Va(e), t];
		},
		useSyncExternalStore: Ja,
		useId: Io
	};
	Yo.useCacheRefresh = Lo, Yo.useMemoCache = Ua, Yo.useHostTransitionStatus = Fo, Yo.useFormState = mo, Yo.useActionState = mo, Yo.useOptimistic = function(e, t) {
		var n = za();
		return K === null ? (n.baseState = e, [e, n.queue.dispatch]) : to(n, K, e, t);
	};
	function Xo(e, t, n, r) {
		t = e.memoizedState, n = n(r, t), n = n == null ? t : A({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
	}
	var Zo = {
		isMounted: function(e) {
			return (e = e._reactInternals) ? te(e) === e : !1;
		},
		enqueueSetState: function(e, t, n) {
			e = e._reactInternals;
			var r = Ql(), i = ec(r);
			i.payload = t, n != null && (i.callback = n), t = tc(e, i, r), t !== null && (eu(t, e, r), nc(t, e, r));
		},
		enqueueReplaceState: function(e, t, n) {
			e = e._reactInternals;
			var r = Ql(), i = ec(r);
			i.tag = 1, i.payload = t, n != null && (i.callback = n), t = tc(e, i, r), t !== null && (eu(t, e, r), nc(t, e, r));
		},
		enqueueForceUpdate: function(e, t) {
			e = e._reactInternals;
			var n = Ql(), r = ec(n);
			r.tag = 2, t != null && (r.callback = t), t = tc(e, r, n), t !== null && (eu(t, e, n), nc(t, e, n));
		}
	};
	function Qo(e, t, n, r, i, a, o) {
		return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, a, o) : t.prototype && t.prototype.isPureReactComponent ? !gr(n, r) || !gr(i, a) : !0;
	}
	function $o(e, t, n, r) {
		e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && Zo.enqueueReplaceState(t, t.state, null);
	}
	function es(e, t) {
		var n = t;
		if ("ref" in t) for (var r in n = {}, t) r !== "ref" && (n[r] = t[r]);
		if (e = e.defaultProps) for (var i in n === t && (n = A({}, n)), e) n[i] === void 0 && (n[i] = e[i]);
		return n;
	}
	var ts = typeof reportError == "function" ? reportError : function(e) {
		if (typeof window == "object" && typeof window.ErrorEvent == "function") {
			var t = new window.ErrorEvent("error", {
				bubbles: !0,
				cancelable: !0,
				message: typeof e == "object" && e && typeof e.message == "string" ? String(e.message) : String(e),
				error: e
			});
			if (!window.dispatchEvent(t)) return;
		} else if (typeof process == "object" && typeof process.emit == "function") {
			process.emit("uncaughtException", e);
			return;
		}
		console.error(e);
	};
	function ns(e) {
		ts(e);
	}
	function rs(e) {
		console.error(e);
	}
	function is(e) {
		ts(e);
	}
	function as(e, t) {
		try {
			var n = e.onUncaughtError;
			n(t.value, { componentStack: t.stack });
		} catch (e) {
			setTimeout(function() {
				throw e;
			});
		}
	}
	function os(e, t, n) {
		try {
			var r = e.onCaughtError;
			r(n.value, {
				componentStack: n.stack,
				errorBoundary: t.tag === 1 ? t.stateNode : null
			});
		} catch (e) {
			setTimeout(function() {
				throw e;
			});
		}
	}
	function ss(e, t, n) {
		return n = ec(n), n.tag = 3, n.payload = { element: null }, n.callback = function() {
			as(e, t);
		}, n;
	}
	function cs(e) {
		return e = ec(e), e.tag = 3, e;
	}
	function ls(e, t, n, r) {
		var i = n.type.getDerivedStateFromError;
		if (typeof i == "function") {
			var a = r.value;
			e.payload = function() {
				return i(a);
			}, e.callback = function() {
				os(t, n, r);
			};
		}
		var o = n.stateNode;
		o !== null && typeof o.componentDidCatch == "function" && (e.callback = function() {
			os(t, n, r), typeof i != "function" && (Wl === null ? Wl = new Set([this]) : Wl.add(this));
			var e = r.stack;
			this.componentDidCatch(r.value, { componentStack: e === null ? "" : e });
		});
	}
	function us(e, t, n, r, i) {
		if (n.flags |= 32768, typeof r == "object" && r && typeof r.then == "function") {
			if (t = n.alternate, t !== null && Gs(t, n, i, !0), n = Ji.current, n !== null) {
				switch (n.tag) {
					case 13: return Yi === null ? du() : n.alternate === null && Ml === 0 && (Ml = 3), n.flags &= -257, n.flags |= 65536, n.lanes = i, r === Oi ? n.flags |= 16384 : (t = n.updateQueue, t === null ? n.updateQueue = new Set([r]) : t.add(r), Du(e, r, i)), !1;
					case 22: return n.flags |= 65536, r === Oi ? n.flags |= 16384 : (t = n.updateQueue, t === null ? (t = {
						transitions: null,
						markerInstances: null,
						retryQueue: new Set([r])
					}, n.updateQueue = t) : (n = t.retryQueue, n === null ? t.retryQueue = new Set([r]) : n.add(r)), Du(e, r, i)), !1;
				}
				throw Error(o(435, n.tag));
			}
			return Du(e, r, i), du(), !1;
		}
		if (W) return t = Ji.current, t === null ? (r !== yi && (t = Error(o(423), { cause: r }), Ti(ti(t, n))), e = e.current.alternate, e.flags |= 65536, i &= -i, e.lanes |= i, r = ti(r, n), i = ss(e.stateNode, r, i), rc(e, i), Ml !== 4 && (Ml = 2)) : (!(t.flags & 65536) && (t.flags |= 256), t.flags |= 65536, t.lanes = i, r !== yi && (e = Error(o(422), { cause: r }), Ti(ti(e, n)))), !1;
		var a = Error(o(520), { cause: r });
		if (a = ti(a, n), Rl === null ? Rl = [a] : Rl.push(a), Ml !== 4 && (Ml = 2), t === null) return !0;
		r = ti(r, n), n = t;
		do {
			switch (n.tag) {
				case 3: return n.flags |= 65536, e = i & -i, n.lanes |= e, e = ss(n.stateNode, r, e), rc(n, e), !1;
				case 1: if (t = n.type, a = n.stateNode, !(n.flags & 128) && (typeof t.getDerivedStateFromError == "function" || a !== null && typeof a.componentDidCatch == "function" && (Wl === null || !Wl.has(a)))) return n.flags |= 65536, i &= -i, n.lanes |= i, i = cs(i), ls(i, e, n, r), rc(n, i), !1;
			}
			n = n.return;
		} while (n !== null);
		return !1;
	}
	var ds = Error(o(461)), fs = !1;
	function ps(e, t, n, r) {
		t.child = e === null ? Hi(t, null, n, r) : Vi(t, e.child, n, r);
	}
	function ms(e, t, n, r, i) {
		n = n.render;
		var a = t.ref;
		if ("ref" in r) {
			var o = {};
			for (var s in r) s !== "ref" && (o[s] = r[s]);
		} else o = r;
		return qs(t), r = ja(e, t, n, o, a, i), s = Fa(), e !== null && !fs ? (Ia(e, t, i), Ps(e, t, i)) : (W && s && pi(t), t.flags |= 1, ps(e, t, r, i), t.child);
	}
	function hs(e, t, n, r, i) {
		if (e === null) {
			var a = n.type;
			return typeof a == "function" && !sl(a) && a.defaultProps === void 0 && n.compare === null ? (t.tag = 15, t.type = a, gs(e, t, a, r, i)) : (e = ul(n.type, null, r, t, t.mode, i), e.ref = t.ref, e.return = t, t.child = e);
		}
		if (a = e.child, !Fs(e, i)) {
			var o = a.memoizedProps;
			if (n = n.compare, n = n === null ? gr : n, n(o, r) && e.ref === t.ref) return Ps(e, t, i);
		}
		return t.flags |= 1, e = cl(a, r), e.ref = t.ref, e.return = t, t.child = e;
	}
	function gs(e, t, n, r, i) {
		if (e !== null) {
			var a = e.memoizedProps;
			if (gr(a, r) && e.ref === t.ref) if (fs = !1, t.pendingProps = r = a, Fs(e, i)) e.flags & 131072 && (fs = !0);
			else return t.lanes = e.lanes, Ps(e, t, i);
		}
		return bs(e, t, n, r, i);
	}
	function _s(e, t, n) {
		var r = t.pendingProps, i = r.children, a = (t.stateNode._pendingVisibility & 2) != 0, o = e === null ? null : e.memoizedState;
		if (ys(e, t), r.mode === "hidden" || a) {
			if (t.flags & 128) {
				if (r = o === null ? n : o.baseLanes | n, e !== null) {
					for (i = t.child = e.child, a = 0; i !== null;) a = a | i.lanes | i.childLanes, i = i.sibling;
					t.childLanes = a & ~r;
				} else t.childLanes = 0, t.child = null;
				return vs(e, t, r, n);
			}
			if (n & 536870912) t.memoizedState = {
				baseLanes: 0,
				cachePool: null
			}, e !== null && va(t, o === null ? null : o.cachePool), o === null ? Ki() : Gi(t, o), Zi(t);
			else return t.lanes = t.childLanes = 536870912, vs(e, t, o === null ? n : o.baseLanes | n, n);
		} else o === null ? (e !== null && va(t, null), Ki(), Qi(t)) : (va(t, o.cachePool), Gi(t, o), Qi(t), t.memoizedState = null);
		return ps(e, t, i, n), t.child;
	}
	function vs(e, t, n, r) {
		var i = _a();
		return i = i === null ? null : {
			parent: aa._currentValue,
			pool: i
		}, t.memoizedState = {
			baseLanes: n,
			cachePool: i
		}, e !== null && va(t, null), Ki(), Zi(t), e !== null && Gs(e, t, r, !0), null;
	}
	function ys(e, t) {
		var n = t.ref;
		if (n === null) e !== null && e.ref !== null && (t.flags |= 2097664);
		else {
			if (typeof n != "function" && typeof n != "object") throw Error(o(284));
			(e === null || e.ref !== n) && (t.flags |= 2097664);
		}
	}
	function bs(e, t, n, r, i) {
		return qs(t), n = ja(e, t, n, r, void 0, i), r = Fa(), e !== null && !fs ? (Ia(e, t, i), Ps(e, t, i)) : (W && r && pi(t), t.flags |= 1, ps(e, t, n, i), t.child);
	}
	function xs(e, t, n, r, i, a) {
		return qs(t), t.updateQueue = null, n = Na(t, r, n, i), Ma(e), r = Fa(), e !== null && !fs ? (Ia(e, t, a), Ps(e, t, a)) : (W && r && pi(t), t.flags |= 1, ps(e, t, n, a), t.child);
	}
	function Ss(e, t, n, r, i) {
		if (qs(t), t.stateNode === null) {
			var a = $r, o = n.contextType;
			typeof o == "object" && o && (a = Js(o)), a = new n(r, a), t.memoizedState = a.state !== null && a.state !== void 0 ? a.state : null, a.updater = Zo, t.stateNode = a, a._reactInternals = t, a = t.stateNode, a.props = r, a.state = t.memoizedState, a.refs = {}, Qs(t), o = n.contextType, a.context = typeof o == "object" && o ? Js(o) : $r, a.state = t.memoizedState, o = n.getDerivedStateFromProps, typeof o == "function" && (Xo(t, n, o, r), a.state = t.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof a.getSnapshotBeforeUpdate == "function" || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (o = a.state, typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount(), o !== a.state && Zo.enqueueReplaceState(a, a.state, null), oc(t, r, a, i), ac(), a.state = t.memoizedState), typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !0;
		} else if (e === null) {
			a = t.stateNode;
			var s = t.memoizedProps, c = es(n, s);
			a.props = c;
			var l = a.context, u = n.contextType;
			o = $r, typeof u == "object" && u && (o = Js(u));
			var d = n.getDerivedStateFromProps;
			u = typeof d == "function" || typeof a.getSnapshotBeforeUpdate == "function", s = t.pendingProps !== s, u || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (s || l !== o) && $o(t, a, r, o), Zs = !1;
			var f = t.memoizedState;
			a.state = f, oc(t, r, a, i), ac(), l = t.memoizedState, s || f !== l || Zs ? (typeof d == "function" && (Xo(t, n, d, r), l = t.memoizedState), (c = Zs || Qo(t, n, c, r, f, l, o)) ? (u || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount()), typeof a.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = l), a.props = r, a.state = l, a.context = o, r = c) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
		} else {
			a = t.stateNode, $s(e, t), o = t.memoizedProps, u = es(n, o), a.props = u, d = t.pendingProps, f = a.context, l = n.contextType, c = $r, typeof l == "object" && l && (c = Js(l)), s = n.getDerivedStateFromProps, (l = typeof s == "function" || typeof a.getSnapshotBeforeUpdate == "function") || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (o !== d || f !== c) && $o(t, a, r, c), Zs = !1, f = t.memoizedState, a.state = f, oc(t, r, a, i), ac();
			var p = t.memoizedState;
			o !== d || f !== p || Zs || e !== null && e.dependencies !== null && Ks(e.dependencies) ? (typeof s == "function" && (Xo(t, n, s, r), p = t.memoizedState), (u = Zs || Qo(t, n, u, r, f, p, c) || e !== null && e.dependencies !== null && Ks(e.dependencies)) ? (l || typeof a.UNSAFE_componentWillUpdate != "function" && typeof a.componentWillUpdate != "function" || (typeof a.componentWillUpdate == "function" && a.componentWillUpdate(r, p, c), typeof a.UNSAFE_componentWillUpdate == "function" && a.UNSAFE_componentWillUpdate(r, p, c)), typeof a.componentDidUpdate == "function" && (t.flags |= 4), typeof a.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = p), a.props = r, a.state = p, a.context = c, r = u) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), r = !1);
		}
		return a = r, ys(e, t), r = (t.flags & 128) != 0, a || r ? (a = t.stateNode, n = r && typeof n.getDerivedStateFromError != "function" ? null : a.render(), t.flags |= 1, e !== null && r ? (t.child = Vi(t, e.child, null, i), t.child = Vi(t, null, n, i)) : ps(e, t, n, i), t.memoizedState = a.state, e = t.child) : e = Ps(e, t, i), e;
	}
	function Cs(e, t, n, r) {
		return wi(), t.flags |= 256, ps(e, t, n, r), t.child;
	}
	var ws = {
		dehydrated: null,
		treeContext: null,
		retryLane: 0
	};
	function Ts(e) {
		return {
			baseLanes: e,
			cachePool: ya()
		};
	}
	function Es(e, t, n) {
		return e = e === null ? 0 : e.childLanes & ~n, t && (e |= Il), e;
	}
	function Ds(e, t, n) {
		var r = t.pendingProps, i = !1, a = (t.flags & 128) != 0, s;
		if ((s = a) || (s = e !== null && e.memoizedState === null ? !1 : (ea.current & 2) != 0), s && (i = !0, t.flags &= -129), s = (t.flags & 32) != 0, t.flags &= -33, e === null) {
			if (W) {
				if (i ? Xi(t) : Qi(t), W) {
					var c = gi, l;
					if (l = c) {
						c: {
							for (l = c, c = vi; l.nodeType !== 8;) {
								if (!c) {
									c = null;
									break c;
								}
								if (l = Fd(l.nextSibling), l === null) {
									c = null;
									break c;
								}
							}
							c = l;
						}
						c === null ? l = !1 : (t.memoizedState = {
							dehydrated: c,
							treeContext: ci === null ? null : {
								id: li,
								overflow: ui
							},
							retryLane: 536870912
						}, l = ol(18, null, null, 0), l.stateNode = c, l.return = t, t.child = l, hi = t, gi = null, l = !0);
					}
					l || bi(t);
				}
				if (c = t.memoizedState, c !== null && (c = c.dehydrated, c !== null)) return c.data === "$!" ? t.lanes = 16 : t.lanes = 536870912, null;
				$i(t);
			}
			return c = r.children, r = r.fallback, i ? (Qi(t), i = t.mode, c = ks({
				mode: "hidden",
				children: c
			}, i), r = dl(r, i, n, null), c.return = t, r.return = t, c.sibling = r, t.child = c, i = t.child, i.memoizedState = Ts(n), i.childLanes = Es(e, s, n), t.memoizedState = ws, r) : (Xi(t), Os(t, c));
		}
		if (l = e.memoizedState, l !== null && (c = l.dehydrated, c !== null)) {
			if (a) t.flags & 256 ? (Xi(t), t.flags &= -257, t = As(e, t, n)) : t.memoizedState === null ? (Qi(t), i = r.fallback, c = t.mode, r = ks({
				mode: "visible",
				children: r.children
			}, c), i = dl(i, c, n, null), i.flags |= 2, r.return = t, i.return = t, r.sibling = i, t.child = r, Vi(t, e.child, null, n), r = t.child, r.memoizedState = Ts(n), r.childLanes = Es(e, s, n), t.memoizedState = ws, t = i) : (Qi(t), t.child = e.child, t.flags |= 128, t = null);
			else if (Xi(t), c.data === "$!") {
				if (s = c.nextSibling && c.nextSibling.dataset, s) var u = s.dgst;
				s = u, r = Error(o(419)), r.stack = "", r.digest = s, Ti({
					value: r,
					source: null,
					stack: null
				}), t = As(e, t, n);
			} else if (fs || Gs(e, t, n, !1), s = (n & e.childLanes) !== 0, fs || s) {
				if (s = El, s !== null) {
					if (r = n & -n, r & 42) r = 1;
					else switch (r) {
						case 2:
							r = 1;
							break;
						case 8:
							r = 4;
							break;
						case 32:
							r = 16;
							break;
						case 128:
						case 256:
						case 512:
						case 1024:
						case 2048:
						case 4096:
						case 8192:
						case 16384:
						case 32768:
						case 65536:
						case 131072:
						case 262144:
						case 524288:
						case 1048576:
						case 2097152:
						case 4194304:
						case 8388608:
						case 16777216:
						case 33554432:
							r = 64;
							break;
						case 268435456:
							r = 134217728;
							break;
						default: r = 0;
					}
					if (r = (r & (s.suspendedLanes | n)) === 0 ? r : 0, r !== 0 && r !== l.retryLane) throw l.retryLane = r, Xr(e, r), eu(s, e, r), ds;
				}
				c.data === "$?" || du(), t = As(e, t, n);
			} else c.data === "$?" ? (t.flags |= 128, t.child = e.child, t = Au.bind(null, e), c._reactRetry = t, t = null) : (e = l.treeContext, gi = Fd(c.nextSibling), hi = t, W = !0, _i = null, vi = !1, e !== null && (oi[si++] = li, oi[si++] = ui, oi[si++] = ci, li = e.id, ui = e.overflow, ci = t), t = Os(t, r.children), t.flags |= 4096);
			return t;
		}
		return i ? (Qi(t), i = r.fallback, c = t.mode, l = e.child, u = l.sibling, r = cl(l, {
			mode: "hidden",
			children: r.children
		}), r.subtreeFlags = l.subtreeFlags & 31457280, u === null ? (i = dl(i, c, n, null), i.flags |= 2) : i = cl(u, i), i.return = t, r.return = t, r.sibling = i, t.child = r, r = i, i = t.child, c = e.child.memoizedState, c === null ? c = Ts(n) : (l = c.cachePool, l === null ? l = ya() : (u = aa._currentValue, l = l.parent === u ? l : {
			parent: u,
			pool: u
		}), c = {
			baseLanes: c.baseLanes | n,
			cachePool: l
		}), i.memoizedState = c, i.childLanes = Es(e, s, n), t.memoizedState = ws, r) : (Xi(t), n = e.child, e = n.sibling, n = cl(n, {
			mode: "visible",
			children: r.children
		}), n.return = t, n.sibling = null, e !== null && (s = t.deletions, s === null ? (t.deletions = [e], t.flags |= 16) : s.push(e)), t.child = n, t.memoizedState = null, n);
	}
	function Os(e, t) {
		return t = ks({
			mode: "visible",
			children: t
		}, e.mode), t.return = e, e.child = t;
	}
	function ks(e, t) {
		return fl(e, t, 0, null);
	}
	function As(e, t, n) {
		return Vi(t, e.child, null, n), e = Os(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
	}
	function js(e, t, n) {
		e.lanes |= t;
		var r = e.alternate;
		r !== null && (r.lanes |= t), Us(e.return, t, n);
	}
	function Ms(e, t, n, r, i) {
		var a = e.memoizedState;
		a === null ? e.memoizedState = {
			isBackwards: t,
			rendering: null,
			renderingStartTime: 0,
			last: r,
			tail: n,
			tailMode: i
		} : (a.isBackwards = t, a.rendering = null, a.renderingStartTime = 0, a.last = r, a.tail = n, a.tailMode = i);
	}
	function Ns(e, t, n) {
		var r = t.pendingProps, i = r.revealOrder, a = r.tail;
		if (ps(e, t, r.children, n), r = ea.current, r & 2) r = r & 1 | 2, t.flags |= 128;
		else {
			if (e !== null && e.flags & 128) a: for (e = t.child; e !== null;) {
				if (e.tag === 13) e.memoizedState !== null && js(e, n, t);
				else if (e.tag === 19) js(e, n, t);
				else if (e.child !== null) {
					e.child.return = e, e = e.child;
					continue;
				}
				if (e === t) break a;
				for (; e.sibling === null;) {
					if (e.return === null || e.return === t) break a;
					e = e.return;
				}
				e.sibling.return = e.return, e = e.sibling;
			}
			r &= 1;
		}
		switch (de(ea, r), i) {
			case "forwards":
				for (n = t.child, i = null; n !== null;) e = n.alternate, e !== null && ta(e) === null && (i = n), n = n.sibling;
				n = i, n === null ? (i = t.child, t.child = null) : (i = n.sibling, n.sibling = null), Ms(t, !1, i, n, a);
				break;
			case "backwards":
				for (n = null, i = t.child, t.child = null; i !== null;) {
					if (e = i.alternate, e !== null && ta(e) === null) {
						t.child = i;
						break;
					}
					e = i.sibling, i.sibling = n, n = i, i = e;
				}
				Ms(t, !0, n, null, a);
				break;
			case "together":
				Ms(t, !1, null, null, void 0);
				break;
			default: t.memoizedState = null;
		}
		return t.child;
	}
	function Ps(e, t, n) {
		if (e !== null && (t.dependencies = e.dependencies), Nl |= t.lanes, (n & t.childLanes) === 0) if (e !== null) {
			if (Gs(e, t, n, !1), (n & t.childLanes) === 0) return null;
		} else return null;
		if (e !== null && t.child !== e.child) throw Error(o(153));
		if (t.child !== null) {
			for (e = t.child, n = cl(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null;) e = e.sibling, n = n.sibling = cl(e, e.pendingProps), n.return = t;
			n.sibling = null;
		}
		return t.child;
	}
	function Fs(e, t) {
		return (e.lanes & t) === 0 ? (e = e.dependencies, !!(e !== null && Ks(e))) : !0;
	}
	function Is(e, t, n) {
		switch (t.tag) {
			case 3:
				ge(t, t.stateNode.containerInfo), Vs(t, aa, e.memoizedState.cache), wi();
				break;
			case 27:
			case 5:
				ve(t);
				break;
			case 4:
				ge(t, t.stateNode.containerInfo);
				break;
			case 10:
				Vs(t, t.type, t.memoizedProps.value);
				break;
			case 13:
				var r = t.memoizedState;
				if (r !== null) return r.dehydrated === null ? (n & t.child.childLanes) === 0 ? (Xi(t), e = Ps(e, t, n), e === null ? null : e.sibling) : Ds(e, t, n) : (Xi(t), t.flags |= 128, null);
				Xi(t);
				break;
			case 19:
				var i = (e.flags & 128) != 0;
				if (r = (n & t.childLanes) !== 0, r ||= (Gs(e, t, n, !1), (n & t.childLanes) !== 0), i) {
					if (r) return Ns(e, t, n);
					t.flags |= 128;
				}
				if (i = t.memoizedState, i !== null && (i.rendering = null, i.tail = null, i.lastEffect = null), de(ea, ea.current), r) break;
				return null;
			case 22:
			case 23: return t.lanes = 0, _s(e, t, n);
			case 24: Vs(t, aa, e.memoizedState.cache);
		}
		return Ps(e, t, n);
	}
	function Ls(e, t, n) {
		if (e !== null) if (e.memoizedProps !== t.pendingProps) fs = !0;
		else {
			if (!Fs(e, n) && !(t.flags & 128)) return fs = !1, Is(e, t, n);
			fs = !!(e.flags & 131072);
		}
		else fs = !1, W && t.flags & 1048576 && fi(t, ai, t.index);
		switch (t.lanes = 0, t.tag) {
			case 16:
				a: {
					e = t.pendingProps;
					var r = t.elementType, i = r._init;
					if (r = i(r._payload), t.type = r, typeof r == "function") sl(r) ? (e = es(r, e), t.tag = 1, t = Ss(null, t, r, e, n)) : (t.tag = 0, t = bs(null, t, r, e, n));
					else {
						if (r != null) {
							if (i = r.$$typeof, i === v) {
								t.tag = 11, t = ms(null, t, r, e, n);
								break a;
							} else if (i === x) {
								t.tag = 14, t = hs(null, t, r, e, n);
								break a;
							}
						}
						throw t = O(r) || r, Error(o(306, t, ""));
					}
				}
				return t;
			case 0: return bs(e, t, t.type, t.pendingProps, n);
			case 1: return r = t.type, i = es(r, t.pendingProps), Ss(e, t, r, i, n);
			case 3:
				a: {
					if (ge(t, t.stateNode.containerInfo), e === null) throw Error(o(387));
					var a = t.pendingProps;
					i = t.memoizedState, r = i.element, $s(e, t), oc(t, a, null, n);
					var s = t.memoizedState;
					if (a = s.cache, Vs(t, aa, a), a !== i.cache && Ws(t, [aa], n, !0), ac(), a = s.element, i.isDehydrated) if (i = {
						element: a,
						isDehydrated: !1,
						cache: s.cache
					}, t.updateQueue.baseState = i, t.memoizedState = i, t.flags & 256) {
						t = Cs(e, t, a, n);
						break a;
					} else if (a !== r) {
						r = ti(Error(o(424)), t), Ti(r), t = Cs(e, t, a, n);
						break a;
					} else for (gi = Fd(t.stateNode.containerInfo.firstChild), hi = t, W = !0, _i = null, vi = !0, n = Hi(t, null, a, n), t.child = n; n;) n.flags = n.flags & -3 | 4096, n = n.sibling;
					else {
						if (wi(), a === r) {
							t = Ps(e, t, n);
							break a;
						}
						ps(e, t, a, n);
					}
					t = t.child;
				}
				return t;
			case 26: return ys(e, t), e === null ? (n = $d(t.type, null, t.pendingProps, null)) ? t.memoizedState = n : W || (n = t.type, e = t.pendingProps, r = bd(me.current).createElement(n), r[at] = t, r[ot] = e, gd(r, n, e), _t(r), t.stateNode = r) : t.memoizedState = $d(t.type, e.memoizedProps, t.pendingProps, e.memoizedState), null;
			case 27: return ve(t), e === null && W && (r = t.stateNode = Ld(t.type, t.pendingProps, me.current), hi = t, vi = !0, gi = Fd(r.firstChild)), r = t.pendingProps.children, e !== null || W ? ps(e, t, r, n) : t.child = Vi(t, null, r, n), ys(e, t), t.child;
			case 5: return e === null && W && ((i = r = gi) && (r = Nd(r, t.type, t.pendingProps, vi), r === null ? i = !1 : (t.stateNode = r, hi = t, gi = Fd(r.firstChild), vi = !1, i = !0)), i || bi(t)), ve(t), i = t.type, a = t.pendingProps, s = e === null ? null : e.memoizedProps, r = a.children, Cd(i, a) ? r = null : s !== null && Cd(i, s) && (t.flags |= 32), t.memoizedState !== null && (i = ja(e, t, Pa, null, null, n), wf._currentValue = i), ys(e, t), ps(e, t, r, n), t.child;
			case 6: return e === null && W && ((e = n = gi) && (n = Pd(n, t.pendingProps, vi), n === null ? e = !1 : (t.stateNode = n, hi = t, gi = null, e = !0)), e || bi(t)), null;
			case 13: return Ds(e, t, n);
			case 4: return ge(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = Vi(t, null, r, n) : ps(e, t, r, n), t.child;
			case 11: return ms(e, t, t.type, t.pendingProps, n);
			case 7: return ps(e, t, t.pendingProps, n), t.child;
			case 8: return ps(e, t, t.pendingProps.children, n), t.child;
			case 12: return ps(e, t, t.pendingProps.children, n), t.child;
			case 10: return r = t.pendingProps, Vs(t, t.type, r.value), ps(e, t, r.children, n), t.child;
			case 9: return i = t.type._context, r = t.pendingProps.children, qs(t), i = Js(i), r = r(i), t.flags |= 1, ps(e, t, r, n), t.child;
			case 14: return hs(e, t, t.type, t.pendingProps, n);
			case 15: return gs(e, t, t.type, t.pendingProps, n);
			case 19: return Ns(e, t, n);
			case 22: return _s(e, t, n);
			case 24: return qs(t), r = Js(aa), e === null ? (i = _a(), i === null && (i = El, a = oa(), i.pooledCache = a, a.refCount++, a !== null && (i.pooledCacheLanes |= n), i = a), t.memoizedState = {
				parent: r,
				cache: i
			}, Qs(t), Vs(t, aa, i)) : ((e.lanes & n) !== 0 && ($s(e, t), oc(t, null, null, n), ac()), i = e.memoizedState, a = t.memoizedState, i.parent === r ? (r = a.cache, Vs(t, aa, r), r !== i.cache && Ws(t, [aa], n, !0)) : (i = {
				parent: r,
				cache: r
			}, t.memoizedState = i, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = i), Vs(t, aa, r))), ps(e, t, t.pendingProps.children, n), t.child;
			case 29: throw t.pendingProps;
		}
		throw Error(o(156, t.tag));
	}
	var Rs = le(null), zs = null, Bs = null;
	function Vs(e, t, n) {
		de(Rs, t._currentValue), t._currentValue = n;
	}
	function Hs(e) {
		e._currentValue = Rs.current, ue(Rs);
	}
	function Us(e, t, n) {
		for (; e !== null;) {
			var r = e.alternate;
			if ((e.childLanes & t) === t ? r !== null && (r.childLanes & t) !== t && (r.childLanes |= t) : (e.childLanes |= t, r !== null && (r.childLanes |= t)), e === n) break;
			e = e.return;
		}
	}
	function Ws(e, t, n, r) {
		var i = e.child;
		for (i !== null && (i.return = e); i !== null;) {
			var a = i.dependencies;
			if (a !== null) {
				var s = i.child;
				a = a.firstContext;
				a: for (; a !== null;) {
					var c = a;
					a = i;
					for (var l = 0; l < t.length; l++) if (c.context === t[l]) {
						a.lanes |= n, c = a.alternate, c !== null && (c.lanes |= n), Us(a.return, n, e), r || (s = null);
						break a;
					}
					a = c.next;
				}
			} else if (i.tag === 18) {
				if (s = i.return, s === null) throw Error(o(341));
				s.lanes |= n, a = s.alternate, a !== null && (a.lanes |= n), Us(s, n, e), s = null;
			} else s = i.child;
			if (s !== null) s.return = i;
			else for (s = i; s !== null;) {
				if (s === e) {
					s = null;
					break;
				}
				if (i = s.sibling, i !== null) {
					i.return = s.return, s = i;
					break;
				}
				s = s.return;
			}
			i = s;
		}
	}
	function Gs(e, t, n, r) {
		e = null;
		for (var i = t, a = !1; i !== null;) {
			if (!a) {
				if (i.flags & 524288) a = !0;
				else if (i.flags & 262144) break;
			}
			if (i.tag === 10) {
				var s = i.alternate;
				if (s === null) throw Error(o(387));
				if (s = s.memoizedProps, s !== null) {
					var c = i.type;
					hr(i.pendingProps.value, s.value) || (e === null ? e = [c] : e.push(c));
				}
			} else if (i === he.current) {
				if (s = i.alternate, s === null) throw Error(o(387));
				s.memoizedState.memoizedState !== i.memoizedState.memoizedState && (e === null ? e = [wf] : e.push(wf));
			}
			i = i.return;
		}
		e !== null && Ws(t, e, n, r), t.flags |= 262144;
	}
	function Ks(e) {
		for (e = e.firstContext; e !== null;) {
			if (!hr(e.context._currentValue, e.memoizedValue)) return !0;
			e = e.next;
		}
		return !1;
	}
	function qs(e) {
		zs = e, Bs = null, e = e.dependencies, e !== null && (e.firstContext = null);
	}
	function Js(e) {
		return Xs(zs, e);
	}
	function Ys(e, t) {
		return zs === null && qs(e), Xs(e, t);
	}
	function Xs(e, t) {
		var n = t._currentValue;
		if (t = {
			context: t,
			memoizedValue: n,
			next: null
		}, Bs === null) {
			if (e === null) throw Error(o(308));
			Bs = t, e.dependencies = {
				lanes: 0,
				firstContext: t
			}, e.flags |= 524288;
		} else Bs = Bs.next = t;
		return n;
	}
	var Zs = !1;
	function Qs(e) {
		e.updateQueue = {
			baseState: e.memoizedState,
			firstBaseUpdate: null,
			lastBaseUpdate: null,
			shared: {
				pending: null,
				lanes: 0,
				hiddenCallbacks: null
			},
			callbacks: null
		};
	}
	function $s(e, t) {
		e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
			baseState: e.baseState,
			firstBaseUpdate: e.firstBaseUpdate,
			lastBaseUpdate: e.lastBaseUpdate,
			shared: e.shared,
			callbacks: null
		});
	}
	function ec(e) {
		return {
			lane: e,
			tag: 0,
			payload: null,
			callback: null,
			next: null
		};
	}
	function tc(e, t, n) {
		var r = e.updateQueue;
		if (r === null) return null;
		if (r = r.shared, Tl & 2) {
			var i = r.pending;
			return i === null ? t.next = t : (t.next = i.next, i.next = t), r.pending = t, t = Qr(e), Zr(e, null, n), t;
		}
		return Jr(e, r, t, n), Qr(e);
	}
	function nc(e, t, n) {
		if (t = t.updateQueue, t !== null && (t = t.shared, n & 4194176)) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, et(e, n);
		}
	}
	function rc(e, t) {
		var n = e.updateQueue, r = e.alternate;
		if (r !== null && (r = r.updateQueue, n === r)) {
			var i = null, a = null;
			if (n = n.firstBaseUpdate, n !== null) {
				do {
					var o = {
						lane: n.lane,
						tag: n.tag,
						payload: n.payload,
						callback: null,
						next: null
					};
					a === null ? i = a = o : a = a.next = o, n = n.next;
				} while (n !== null);
				a === null ? i = a = t : a = a.next = t;
			} else i = a = t;
			n = {
				baseState: r.baseState,
				firstBaseUpdate: i,
				lastBaseUpdate: a,
				shared: r.shared,
				callbacks: r.callbacks
			}, e.updateQueue = n;
			return;
		}
		e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t;
	}
	var ic = !1;
	function ac() {
		if (ic) {
			var e = da;
			if (e !== null) throw e;
		}
	}
	function oc(e, t, n, r) {
		ic = !1;
		var i = e.updateQueue;
		Zs = !1;
		var a = i.firstBaseUpdate, o = i.lastBaseUpdate, s = i.shared.pending;
		if (s !== null) {
			i.shared.pending = null;
			var c = s, l = c.next;
			c.next = null, o === null ? a = l : o.next = l, o = c;
			var u = e.alternate;
			u !== null && (u = u.updateQueue, s = u.lastBaseUpdate, s !== o && (s === null ? u.firstBaseUpdate = l : s.next = l, u.lastBaseUpdate = c));
		}
		if (a !== null) {
			var d = i.baseState;
			o = 0, u = l = c = null, s = a;
			do {
				var f = s.lane & -536870913, p = f !== s.lane;
				if (p ? (J & f) === f : (r & f) === f) {
					f !== 0 && f === ua && (ic = !0), u !== null && (u = u.next = {
						lane: 0,
						tag: s.tag,
						payload: s.payload,
						callback: null,
						next: null
					});
					a: {
						var m = e, h = s;
						f = t;
						var g = n;
						switch (h.tag) {
							case 1:
								if (m = h.payload, typeof m == "function") {
									d = m.call(g, d, f);
									break a;
								}
								d = m;
								break a;
							case 3: m.flags = m.flags & -65537 | 128;
							case 0:
								if (m = h.payload, f = typeof m == "function" ? m.call(g, d, f) : m, f == null) break a;
								d = A({}, d, f);
								break a;
							case 2: Zs = !0;
						}
					}
					f = s.callback, f !== null && (e.flags |= 64, p && (e.flags |= 8192), p = i.callbacks, p === null ? i.callbacks = [f] : p.push(f));
				} else p = {
					lane: f,
					tag: s.tag,
					payload: s.payload,
					callback: s.callback,
					next: null
				}, u === null ? (l = u = p, c = d) : u = u.next = p, o |= f;
				if (s = s.next, s === null) {
					if (s = i.shared.pending, s === null) break;
					p = s, s = p.next, p.next = null, i.lastBaseUpdate = p, i.shared.pending = null;
				}
			} while (1);
			u === null && (c = d), i.baseState = c, i.firstBaseUpdate = l, i.lastBaseUpdate = u, a === null && (i.shared.lanes = 0), Nl |= o, e.lanes = o, e.memoizedState = d;
		}
	}
	function sc(e, t) {
		if (typeof e != "function") throw Error(o(191, e));
		e.call(t);
	}
	function cc(e, t) {
		var n = e.callbacks;
		if (n !== null) for (e.callbacks = null, e = 0; e < n.length; e++) sc(n[e], t);
	}
	function lc(e, t) {
		try {
			var n = t.updateQueue, r = n === null ? null : n.lastEffect;
			if (r !== null) {
				var i = r.next;
				n = i;
				do {
					if ((n.tag & e) === e) {
						r = void 0;
						var a = n.create, o = n.inst;
						r = a(), o.destroy = r;
					}
					n = n.next;
				} while (n !== i);
			}
		} catch (e) {
			Eu(t, t.return, e);
		}
	}
	function uc(e, t, n) {
		try {
			var r = t.updateQueue, i = r === null ? null : r.lastEffect;
			if (i !== null) {
				var a = i.next;
				r = a;
				do {
					if ((r.tag & e) === e) {
						var o = r.inst, s = o.destroy;
						if (s !== void 0) {
							o.destroy = void 0, i = t;
							var c = n;
							try {
								s();
							} catch (e) {
								Eu(i, c, e);
							}
						}
					}
					r = r.next;
				} while (r !== a);
			}
		} catch (e) {
			Eu(t, t.return, e);
		}
	}
	function dc(e) {
		var t = e.updateQueue;
		if (t !== null) {
			var n = e.stateNode;
			try {
				cc(t, n);
			} catch (t) {
				Eu(e, e.return, t);
			}
		}
	}
	function fc(e, t, n) {
		n.props = es(e.type, e.memoizedProps), n.state = e.memoizedState;
		try {
			n.componentWillUnmount();
		} catch (n) {
			Eu(e, t, n);
		}
	}
	function pc(e, t) {
		try {
			var n = e.ref;
			if (n !== null) {
				var r = e.stateNode;
				switch (e.tag) {
					case 26:
					case 27:
					case 5:
						var i = r;
						break;
					default: i = r;
				}
				typeof n == "function" ? e.refCleanup = n(i) : n.current = i;
			}
		} catch (n) {
			Eu(e, t, n);
		}
	}
	function mc(e, t) {
		var n = e.ref, r = e.refCleanup;
		if (n !== null) if (typeof r == "function") try {
			r();
		} catch (n) {
			Eu(e, t, n);
		} finally {
			e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
		}
		else if (typeof n == "function") try {
			n(null);
		} catch (n) {
			Eu(e, t, n);
		}
		else n.current = null;
	}
	function hc(e) {
		var t = e.type, n = e.memoizedProps, r = e.stateNode;
		try {
			a: switch (t) {
				case "button":
				case "input":
				case "select":
				case "textarea":
					n.autoFocus && r.focus();
					break a;
				case "img": n.src ? r.src = n.src : n.srcSet && (r.srcset = n.srcSet);
			}
		} catch (t) {
			Eu(e, e.return, t);
		}
	}
	function gc(e, t, n) {
		try {
			var r = e.stateNode;
			_d(r, e.type, n, t), r[ot] = t;
		} catch (t) {
			Eu(e, e.return, t);
		}
	}
	function _c(e) {
		return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 || e.tag === 4;
	}
	function vc(e) {
		a: for (;;) {
			for (; e.sibling === null;) {
				if (e.return === null || _c(e.return)) return null;
				e = e.return;
			}
			for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 27 && e.tag !== 18;) {
				if (e.flags & 2 || e.child === null || e.tag === 4) continue a;
				e.child.return = e, e = e.child;
			}
			if (!(e.flags & 2)) return e.stateNode;
		}
	}
	function yc(e, t, n) {
		var r = e.tag;
		if (r === 5 || r === 6) e = e.stateNode, t ? n.nodeType === 8 ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (n.nodeType === 8 ? (t = n.parentNode, t.insertBefore(e, n)) : (t = n, t.appendChild(e)), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = md));
		else if (r !== 4 && r !== 27 && (e = e.child, e !== null)) for (yc(e, t, n), e = e.sibling; e !== null;) yc(e, t, n), e = e.sibling;
	}
	function bc(e, t, n) {
		var r = e.tag;
		if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
		else if (r !== 4 && r !== 27 && (e = e.child, e !== null)) for (bc(e, t, n), e = e.sibling; e !== null;) bc(e, t, n), e = e.sibling;
	}
	var xc = !1, Sc = !1, Cc = !1, wc = typeof WeakSet == "function" ? WeakSet : Set, Tc = null, Ec = !1;
	function Dc(e, t) {
		if (e = e.containerInfo, vd = Mf, e = br(e), xr(e)) {
			if ("selectionStart" in e) var n = {
				start: e.selectionStart,
				end: e.selectionEnd
			};
			else a: {
				n = (n = e.ownerDocument) && n.defaultView || window;
				var r = n.getSelection && n.getSelection();
				if (r && r.rangeCount !== 0) {
					n = r.anchorNode;
					var i = r.anchorOffset, a = r.focusNode;
					r = r.focusOffset;
					try {
						n.nodeType, a.nodeType;
					} catch {
						n = null;
						break a;
					}
					var s = 0, c = -1, l = -1, u = 0, d = 0, f = e, p = null;
					b: for (;;) {
						for (var m; f !== n || i !== 0 && f.nodeType !== 3 || (c = s + i), f !== a || r !== 0 && f.nodeType !== 3 || (l = s + r), f.nodeType === 3 && (s += f.nodeValue.length), (m = f.firstChild) !== null;) p = f, f = m;
						for (;;) {
							if (f === e) break b;
							if (p === n && ++u === i && (c = s), p === a && ++d === r && (l = s), (m = f.nextSibling) !== null) break;
							f = p, p = f.parentNode;
						}
						f = m;
					}
					n = c === -1 || l === -1 ? null : {
						start: c,
						end: l
					};
				} else n = null;
			}
			n ||= {
				start: 0,
				end: 0
			};
		} else n = null;
		for (yd = {
			focusedElem: e,
			selectionRange: n
		}, Mf = !1, Tc = t; Tc !== null;) if (t = Tc, e = t.child, t.subtreeFlags & 1028 && e !== null) e.return = t, Tc = e;
		else for (; Tc !== null;) {
			switch (t = Tc, a = t.alternate, e = t.flags, t.tag) {
				case 0: break;
				case 11:
				case 15: break;
				case 1:
					if (e & 1024 && a !== null) {
						e = void 0, n = t, i = a.memoizedProps, a = a.memoizedState, r = n.stateNode;
						try {
							var h = es(n.type, i, n.elementType === n.type);
							e = r.getSnapshotBeforeUpdate(h, a), r.__reactInternalSnapshotBeforeUpdate = e;
						} catch (e) {
							Eu(n, n.return, e);
						}
					}
					break;
				case 3:
					if (e & 1024) {
						if (e = t.stateNode.containerInfo, n = e.nodeType, n === 9) Md(e);
						else if (n === 1) switch (e.nodeName) {
							case "HEAD":
							case "HTML":
							case "BODY":
								Md(e);
								break;
							default: e.textContent = "";
						}
					}
					break;
				case 5:
				case 26:
				case 27:
				case 6:
				case 4:
				case 17: break;
				default: if (e & 1024) throw Error(o(163));
			}
			if (e = t.sibling, e !== null) {
				e.return = t.return, Tc = e;
				break;
			}
			Tc = t.return;
		}
		return h = Ec, Ec = !1, h;
	}
	function Oc(e, t, n) {
		var r = n.flags;
		switch (n.tag) {
			case 0:
			case 11:
			case 15:
				Hc(e, n), r & 4 && lc(5, n);
				break;
			case 1:
				if (Hc(e, n), r & 4) if (e = n.stateNode, t === null) try {
					e.componentDidMount();
				} catch (e) {
					Eu(n, n.return, e);
				}
				else {
					var i = es(n.type, t.memoizedProps);
					t = t.memoizedState;
					try {
						e.componentDidUpdate(i, t, e.__reactInternalSnapshotBeforeUpdate);
					} catch (e) {
						Eu(n, n.return, e);
					}
				}
				r & 64 && dc(n), r & 512 && pc(n, n.return);
				break;
			case 3:
				if (Hc(e, n), r & 64 && (r = n.updateQueue, r !== null)) {
					if (e = null, n.child !== null) switch (n.child.tag) {
						case 27:
						case 5:
							e = n.child.stateNode;
							break;
						case 1: e = n.child.stateNode;
					}
					try {
						cc(r, e);
					} catch (e) {
						Eu(n, n.return, e);
					}
				}
				break;
			case 26:
				Hc(e, n), r & 512 && pc(n, n.return);
				break;
			case 27:
			case 5:
				Hc(e, n), t === null && r & 4 && hc(n), r & 512 && pc(n, n.return);
				break;
			case 12:
				Hc(e, n);
				break;
			case 13:
				Hc(e, n), r & 4 && Pc(e, n);
				break;
			case 22:
				if (i = n.memoizedState !== null || xc, !i) {
					t = t !== null && t.memoizedState !== null || Sc;
					var a = xc, o = Sc;
					xc = i, (Sc = t) && !o ? Wc(e, n, (n.subtreeFlags & 8772) != 0) : Hc(e, n), xc = a, Sc = o;
				}
				r & 512 && (n.memoizedProps.mode === "manual" ? pc(n, n.return) : mc(n, n.return));
				break;
			default: Hc(e, n);
		}
	}
	function kc(e) {
		var t = e.alternate;
		t !== null && (e.alternate = null, kc(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && ft(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
	}
	var Ac = null, jc = !1;
	function Mc(e, t, n) {
		for (n = n.child; n !== null;) Nc(e, t, n), n = n.sibling;
	}
	function Nc(e, t, n) {
		if (Fe && typeof Fe.onCommitFiberUnmount == "function") try {
			Fe.onCommitFiberUnmount(Pe, n);
		} catch {}
		switch (n.tag) {
			case 26:
				Sc || mc(n, t), Mc(e, t, n), n.memoizedState ? n.memoizedState.count-- : n.stateNode && (n = n.stateNode, n.parentNode.removeChild(n));
				break;
			case 27:
				Sc || mc(n, t);
				var r = Ac, i = jc;
				for (Ac = n.stateNode, Mc(e, t, n), n = n.stateNode, t = n.attributes; t.length;) n.removeAttributeNode(t[0]);
				ft(n), Ac = r, jc = i;
				break;
			case 5: Sc || mc(n, t);
			case 6:
				i = Ac;
				var a = jc;
				if (Ac = null, Mc(e, t, n), Ac = i, jc = a, Ac !== null) if (jc) try {
					e = Ac, r = n.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(r) : e.removeChild(r);
				} catch (e) {
					Eu(n, t, e);
				}
				else try {
					Ac.removeChild(n.stateNode);
				} catch (e) {
					Eu(n, t, e);
				}
				break;
			case 18:
				Ac !== null && (jc ? (t = Ac, n = n.stateNode, t.nodeType === 8 ? jd(t.parentNode, n) : t.nodeType === 1 && jd(t, n), ip(t)) : jd(Ac, n.stateNode));
				break;
			case 4:
				r = Ac, i = jc, Ac = n.stateNode.containerInfo, jc = !0, Mc(e, t, n), Ac = r, jc = i;
				break;
			case 0:
			case 11:
			case 14:
			case 15:
				Sc || uc(2, n, t), Sc || uc(4, n, t), Mc(e, t, n);
				break;
			case 1:
				Sc || (mc(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function" && fc(n, t, r)), Mc(e, t, n);
				break;
			case 21:
				Mc(e, t, n);
				break;
			case 22:
				Sc || mc(n, t), Sc = (r = Sc) || n.memoizedState !== null, Mc(e, t, n), Sc = r;
				break;
			default: Mc(e, t, n);
		}
	}
	function Pc(e, t) {
		if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null)))) try {
			ip(e);
		} catch (e) {
			Eu(t, t.return, e);
		}
	}
	function Fc(e) {
		switch (e.tag) {
			case 13:
			case 19:
				var t = e.stateNode;
				return t === null && (t = e.stateNode = new wc()), t;
			case 22: return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new wc()), t;
			default: throw Error(o(435, e.tag));
		}
	}
	function Ic(e, t) {
		var n = Fc(e);
		t.forEach(function(t) {
			var r = ju.bind(null, e, t);
			n.has(t) || (n.add(t), t.then(r, r));
		});
	}
	function Lc(e, t) {
		var n = t.deletions;
		if (n !== null) for (var r = 0; r < n.length; r++) {
			var i = n[r], a = e, s = t, c = s;
			a: for (; c !== null;) {
				switch (c.tag) {
					case 27:
					case 5:
						Ac = c.stateNode, jc = !1;
						break a;
					case 3:
						Ac = c.stateNode.containerInfo, jc = !0;
						break a;
					case 4:
						Ac = c.stateNode.containerInfo, jc = !0;
						break a;
				}
				c = c.return;
			}
			if (Ac === null) throw Error(o(160));
			Nc(a, s, i), Ac = null, jc = !1, a = i.alternate, a !== null && (a.return = null), i.return = null;
		}
		if (t.subtreeFlags & 13878) for (t = t.child; t !== null;) zc(t, e), t = t.sibling;
	}
	var Rc = null;
	function zc(e, t) {
		var n = e.alternate, r = e.flags;
		switch (e.tag) {
			case 0:
			case 11:
			case 14:
			case 15:
				Lc(t, e), Bc(e), r & 4 && (uc(3, e, e.return), lc(3, e), uc(5, e, e.return));
				break;
			case 1:
				Lc(t, e), Bc(e), r & 512 && (Sc || n === null || mc(n, n.return)), r & 64 && xc && (e = e.updateQueue, e !== null && (r = e.callbacks, r !== null && (n = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = n === null ? r : n.concat(r))));
				break;
			case 26:
				var i = Rc;
				if (Lc(t, e), Bc(e), r & 512 && (Sc || n === null || mc(n, n.return)), r & 4) {
					var a = n === null ? null : n.memoizedState;
					if (r = e.memoizedState, n === null) if (r === null) if (e.stateNode === null) {
						a: {
							r = e.type, n = e.memoizedProps, i = i.ownerDocument || i;
							b: switch (r) {
								case "title":
									a = i.getElementsByTagName("title")[0], (!a || a[dt] || a[at] || a.namespaceURI === "http://www.w3.org/2000/svg" || a.hasAttribute("itemprop")) && (a = i.createElement(r), i.head.insertBefore(a, i.querySelector("head > title"))), gd(a, r, n), a[at] = e, _t(a), r = a;
									break a;
								case "link":
									var s = ff("link", "href", i).get(r + (n.href || ""));
									if (s) {
										for (var c = 0; c < s.length; c++) if (a = s[c], a.getAttribute("href") === (n.href == null ? null : n.href) && a.getAttribute("rel") === (n.rel == null ? null : n.rel) && a.getAttribute("title") === (n.title == null ? null : n.title) && a.getAttribute("crossorigin") === (n.crossOrigin == null ? null : n.crossOrigin)) {
											s.splice(c, 1);
											break b;
										}
									}
									a = i.createElement(r), gd(a, r, n), i.head.appendChild(a);
									break;
								case "meta":
									if (s = ff("meta", "content", i).get(r + (n.content || ""))) {
										for (c = 0; c < s.length; c++) if (a = s[c], a.getAttribute("content") === (n.content == null ? null : "" + n.content) && a.getAttribute("name") === (n.name == null ? null : n.name) && a.getAttribute("property") === (n.property == null ? null : n.property) && a.getAttribute("http-equiv") === (n.httpEquiv == null ? null : n.httpEquiv) && a.getAttribute("charset") === (n.charSet == null ? null : n.charSet)) {
											s.splice(c, 1);
											break b;
										}
									}
									a = i.createElement(r), gd(a, r, n), i.head.appendChild(a);
									break;
								default: throw Error(o(468, r));
							}
							a[at] = e, _t(a), r = a;
						}
						e.stateNode = r;
					} else pf(i, e.type, e.stateNode);
					else e.stateNode = sf(i, r, e.memoizedProps);
					else a === r ? r === null && e.stateNode !== null && gc(e, e.memoizedProps, n.memoizedProps) : (a === null ? n.stateNode !== null && (n = n.stateNode, n.parentNode.removeChild(n)) : a.count--, r === null ? pf(i, e.type, e.stateNode) : sf(i, r, e.memoizedProps));
				}
				break;
			case 27: if (r & 4 && e.alternate === null) {
				i = e.stateNode, a = e.memoizedProps;
				try {
					for (var l = i.firstChild; l;) {
						var u = l.nextSibling, d = l.nodeName;
						l[dt] || d === "HEAD" || d === "BODY" || d === "SCRIPT" || d === "STYLE" || d === "LINK" && l.rel.toLowerCase() === "stylesheet" || i.removeChild(l), l = u;
					}
					for (var f = e.type, p = i.attributes; p.length;) i.removeAttributeNode(p[0]);
					gd(i, f, a), i[at] = e, i[ot] = a;
				} catch (t) {
					Eu(e, e.return, t);
				}
			}
			case 5:
				if (Lc(t, e), Bc(e), r & 512 && (Sc || n === null || mc(n, n.return)), e.flags & 32) {
					i = e.stateNode;
					try {
						H(i, "");
					} catch (t) {
						Eu(e, e.return, t);
					}
				}
				r & 4 && e.stateNode != null && (i = e.memoizedProps, gc(e, i, n === null ? i : n.memoizedProps)), r & 1024 && (Cc = !0);
				break;
			case 6:
				if (Lc(t, e), Bc(e), r & 4) {
					if (e.stateNode === null) throw Error(o(162));
					r = e.memoizedProps, n = e.stateNode;
					try {
						n.nodeValue = r;
					} catch (t) {
						Eu(e, e.return, t);
					}
				}
				break;
			case 3:
				if (df = null, i = Rc, Rc = Bd(t.containerInfo), Lc(t, e), Rc = i, Bc(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
					ip(t.containerInfo);
				} catch (t) {
					Eu(e, e.return, t);
				}
				Cc && (Cc = !1, Vc(e));
				break;
			case 4:
				r = Rc, Rc = Bd(e.stateNode.containerInfo), Lc(t, e), Bc(e), Rc = r;
				break;
			case 12:
				Lc(t, e), Bc(e);
				break;
			case 13:
				Lc(t, e), Bc(e), e.child.flags & 8192 && e.memoizedState !== null != (n !== null && n.memoizedState !== null) && (Vl = Te()), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, Ic(e, r)));
				break;
			case 22:
				if (r & 512 && (Sc || n === null || mc(n, n.return)), l = e.memoizedState !== null, u = n !== null && n.memoizedState !== null, d = xc, f = Sc, xc = d || l, Sc = f || u, Lc(t, e), Sc = f, xc = d, Bc(e), t = e.stateNode, t._current = e, t._visibility &= -3, t._visibility |= t._pendingVisibility & 2, r & 8192 && (t._visibility = l ? t._visibility & -2 : t._visibility | 1, l && (t = xc || Sc, n === null || u || t || Uc(e)), e.memoizedProps === null || e.memoizedProps.mode !== "manual")) a: for (n = null, t = e;;) {
					if (t.tag === 5 || t.tag === 26 || t.tag === 27) {
						if (n === null) {
							u = n = t;
							try {
								if (i = u.stateNode, l) a = i.style, typeof a.setProperty == "function" ? a.setProperty("display", "none", "important") : a.display = "none";
								else {
									s = u.stateNode, c = u.memoizedProps.style;
									var m = c != null && c.hasOwnProperty("display") ? c.display : null;
									s.style.display = m == null || typeof m == "boolean" ? "" : ("" + m).trim();
								}
							} catch (e) {
								Eu(u, u.return, e);
							}
						}
					} else if (t.tag === 6) {
						if (n === null) {
							u = t;
							try {
								u.stateNode.nodeValue = l ? "" : u.memoizedProps;
							} catch (e) {
								Eu(u, u.return, e);
							}
						}
					} else if ((t.tag !== 22 && t.tag !== 23 || t.memoizedState === null || t === e) && t.child !== null) {
						t.child.return = t, t = t.child;
						continue;
					}
					if (t === e) break a;
					for (; t.sibling === null;) {
						if (t.return === null || t.return === e) break a;
						n === t && (n = null), t = t.return;
					}
					n === t && (n = null), t.sibling.return = t.return, t = t.sibling;
				}
				r & 4 && (r = e.updateQueue, r !== null && (n = r.retryQueue, n !== null && (r.retryQueue = null, Ic(e, n))));
				break;
			case 19:
				Lc(t, e), Bc(e), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, Ic(e, r)));
				break;
			case 21: break;
			default: Lc(t, e), Bc(e);
		}
	}
	function Bc(e) {
		var t = e.flags;
		if (t & 2) {
			try {
				if (e.tag !== 27) {
					a: {
						for (var n = e.return; n !== null;) {
							if (_c(n)) {
								var r = n;
								break a;
							}
							n = n.return;
						}
						throw Error(o(160));
					}
					switch (r.tag) {
						case 27:
							var i = r.stateNode;
							bc(e, vc(e), i);
							break;
						case 5:
							var a = r.stateNode;
							r.flags & 32 && (H(a, ""), r.flags &= -33), bc(e, vc(e), a);
							break;
						case 3:
						case 4:
							var s = r.stateNode.containerInfo;
							yc(e, vc(e), s);
							break;
						default: throw Error(o(161));
					}
				}
			} catch (t) {
				Eu(e, e.return, t);
			}
			e.flags &= -3;
		}
		t & 4096 && (e.flags &= -4097);
	}
	function Vc(e) {
		if (e.subtreeFlags & 1024) for (e = e.child; e !== null;) {
			var t = e;
			Vc(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
		}
	}
	function Hc(e, t) {
		if (t.subtreeFlags & 8772) for (t = t.child; t !== null;) Oc(e, t.alternate, t), t = t.sibling;
	}
	function Uc(e) {
		for (e = e.child; e !== null;) {
			var t = e;
			switch (t.tag) {
				case 0:
				case 11:
				case 14:
				case 15:
					uc(4, t, t.return), Uc(t);
					break;
				case 1:
					mc(t, t.return);
					var n = t.stateNode;
					typeof n.componentWillUnmount == "function" && fc(t, t.return, n), Uc(t);
					break;
				case 26:
				case 27:
				case 5:
					mc(t, t.return), Uc(t);
					break;
				case 22:
					mc(t, t.return), t.memoizedState === null && Uc(t);
					break;
				default: Uc(t);
			}
			e = e.sibling;
		}
	}
	function Wc(e, t, n) {
		for (n &&= (t.subtreeFlags & 8772) != 0, t = t.child; t !== null;) {
			var r = t.alternate, i = e, a = t, o = a.flags;
			switch (a.tag) {
				case 0:
				case 11:
				case 15:
					Wc(i, a, n), lc(4, a);
					break;
				case 1:
					if (Wc(i, a, n), r = a, i = r.stateNode, typeof i.componentDidMount == "function") try {
						i.componentDidMount();
					} catch (e) {
						Eu(r, r.return, e);
					}
					if (r = a, i = r.updateQueue, i !== null) {
						var s = r.stateNode;
						try {
							var c = i.shared.hiddenCallbacks;
							if (c !== null) for (i.shared.hiddenCallbacks = null, i = 0; i < c.length; i++) sc(c[i], s);
						} catch (e) {
							Eu(r, r.return, e);
						}
					}
					n && o & 64 && dc(a), pc(a, a.return);
					break;
				case 26:
				case 27:
				case 5:
					Wc(i, a, n), n && r === null && o & 4 && hc(a), pc(a, a.return);
					break;
				case 12:
					Wc(i, a, n);
					break;
				case 13:
					Wc(i, a, n), n && o & 4 && Pc(i, a);
					break;
				case 22:
					a.memoizedState === null && Wc(i, a, n), pc(a, a.return);
					break;
				default: Wc(i, a, n);
			}
			t = t.sibling;
		}
	}
	function Gc(e, t) {
		var n = null;
		e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== n && (e != null && e.refCount++, n != null && sa(n));
	}
	function Kc(e, t) {
		e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && sa(e));
	}
	function qc(e, t, n, r) {
		if (t.subtreeFlags & 10256) for (t = t.child; t !== null;) Jc(e, t, n, r), t = t.sibling;
	}
	function Jc(e, t, n, r) {
		var i = t.flags;
		switch (t.tag) {
			case 0:
			case 11:
			case 15:
				qc(e, t, n, r), i & 2048 && lc(9, t);
				break;
			case 3:
				qc(e, t, n, r), i & 2048 && (e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && sa(e)));
				break;
			case 12:
				if (i & 2048) {
					qc(e, t, n, r), e = t.stateNode;
					try {
						var a = t.memoizedProps, o = a.id, s = a.onPostCommit;
						typeof s == "function" && s(o, t.alternate === null ? "mount" : "update", e.passiveEffectDuration, -0);
					} catch (e) {
						Eu(t, t.return, e);
					}
				} else qc(e, t, n, r);
				break;
			case 23: break;
			case 22:
				a = t.stateNode, t.memoizedState === null ? a._visibility & 4 ? qc(e, t, n, r) : (a._visibility |= 4, Yc(e, t, n, r, (t.subtreeFlags & 10256) != 0)) : a._visibility & 4 ? qc(e, t, n, r) : Xc(e, t), i & 2048 && Gc(t.alternate, t);
				break;
			case 24:
				qc(e, t, n, r), i & 2048 && Kc(t.alternate, t);
				break;
			default: qc(e, t, n, r);
		}
	}
	function Yc(e, t, n, r, i) {
		for (i &&= (t.subtreeFlags & 10256) != 0, t = t.child; t !== null;) {
			var a = e, o = t, s = n, c = r, l = o.flags;
			switch (o.tag) {
				case 0:
				case 11:
				case 15:
					Yc(a, o, s, c, i), lc(8, o);
					break;
				case 23: break;
				case 22:
					var u = o.stateNode;
					o.memoizedState === null ? (u._visibility |= 4, Yc(a, o, s, c, i)) : u._visibility & 4 ? Yc(a, o, s, c, i) : Xc(a, o), i && l & 2048 && Gc(o.alternate, o);
					break;
				case 24:
					Yc(a, o, s, c, i), i && l & 2048 && Kc(o.alternate, o);
					break;
				default: Yc(a, o, s, c, i);
			}
			t = t.sibling;
		}
	}
	function Xc(e, t) {
		if (t.subtreeFlags & 10256) for (t = t.child; t !== null;) {
			var n = e, r = t, i = r.flags;
			switch (r.tag) {
				case 22:
					Xc(n, r), i & 2048 && Gc(r.alternate, r);
					break;
				case 24:
					Xc(n, r), i & 2048 && Kc(r.alternate, r);
					break;
				default: Xc(n, r);
			}
			t = t.sibling;
		}
	}
	var Zc = 8192;
	function Qc(e) {
		if (e.subtreeFlags & Zc) for (e = e.child; e !== null;) $c(e), e = e.sibling;
	}
	function $c(e) {
		switch (e.tag) {
			case 26:
				Qc(e), e.flags & Zc && e.memoizedState !== null && vf(Rc, e.memoizedState, e.memoizedProps);
				break;
			case 5:
				Qc(e);
				break;
			case 3:
			case 4:
				var t = Rc;
				Rc = Bd(e.stateNode.containerInfo), Qc(e), Rc = t;
				break;
			case 22:
				e.memoizedState === null && (t = e.alternate, t !== null && t.memoizedState !== null ? (t = Zc, Zc = 16777216, Qc(e), Zc = t) : Qc(e));
				break;
			default: Qc(e);
		}
	}
	function el(e) {
		var t = e.alternate;
		if (t !== null && (e = t.child, e !== null)) {
			t.child = null;
			do
				t = e.sibling, e.sibling = null, e = t;
			while (e !== null);
		}
	}
	function tl(e) {
		var t = e.deletions;
		if (e.flags & 16) {
			if (t !== null) for (var n = 0; n < t.length; n++) {
				var r = t[n];
				Tc = r, il(r, e);
			}
			el(e);
		}
		if (e.subtreeFlags & 10256) for (e = e.child; e !== null;) nl(e), e = e.sibling;
	}
	function nl(e) {
		switch (e.tag) {
			case 0:
			case 11:
			case 15:
				tl(e), e.flags & 2048 && uc(9, e, e.return);
				break;
			case 3:
				tl(e);
				break;
			case 12:
				tl(e);
				break;
			case 22:
				var t = e.stateNode;
				e.memoizedState !== null && t._visibility & 4 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -5, rl(e)) : tl(e);
				break;
			default: tl(e);
		}
	}
	function rl(e) {
		var t = e.deletions;
		if (e.flags & 16) {
			if (t !== null) for (var n = 0; n < t.length; n++) {
				var r = t[n];
				Tc = r, il(r, e);
			}
			el(e);
		}
		for (e = e.child; e !== null;) {
			switch (t = e, t.tag) {
				case 0:
				case 11:
				case 15:
					uc(8, t, t.return), rl(t);
					break;
				case 22:
					n = t.stateNode, n._visibility & 4 && (n._visibility &= -5, rl(t));
					break;
				default: rl(t);
			}
			e = e.sibling;
		}
	}
	function il(e, t) {
		for (; Tc !== null;) {
			var n = Tc;
			switch (n.tag) {
				case 0:
				case 11:
				case 15:
					uc(8, n, t);
					break;
				case 23:
				case 22:
					if (n.memoizedState !== null && n.memoizedState.cachePool !== null) {
						var r = n.memoizedState.cachePool.pool;
						r != null && r.refCount++;
					}
					break;
				case 24: sa(n.memoizedState.cache);
			}
			if (r = n.child, r !== null) r.return = n, Tc = r;
			else a: for (n = e; Tc !== null;) {
				r = Tc;
				var i = r.sibling, a = r.return;
				if (kc(r), r === n) {
					Tc = null;
					break a;
				}
				if (i !== null) {
					i.return = a, Tc = i;
					break a;
				}
				Tc = a;
			}
		}
	}
	function al(e, t, n, r) {
		this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
	}
	function ol(e, t, n, r) {
		return new al(e, t, n, r);
	}
	function sl(e) {
		return e = e.prototype, !(!e || !e.isReactComponent);
	}
	function cl(e, t) {
		var n = e.alternate;
		return n === null ? (n = ol(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 31457280, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : {
			lanes: t.lanes,
			firstContext: t.firstContext
		}, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n.refCleanup = e.refCleanup, n;
	}
	function ll(e, t) {
		e.flags &= 31457282;
		var n = e.alternate;
		return n === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = n.childLanes, e.lanes = n.lanes, e.child = n.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = n.memoizedProps, e.memoizedState = n.memoizedState, e.updateQueue = n.updateQueue, e.type = n.type, t = n.dependencies, e.dependencies = t === null ? null : {
			lanes: t.lanes,
			firstContext: t.firstContext
		}), e;
	}
	function ul(e, t, n, r, i, a) {
		var s = 0;
		if (r = e, typeof e == "function") sl(e) && (s = 1);
		else if (typeof e == "string") s = mf(e, n, fe.current) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
		else a: switch (e) {
			case f: return dl(n.children, i, a, t);
			case p:
				s = 8, i |= 24;
				break;
			case m: return e = ol(12, n, t, i | 2), e.elementType = m, e.lanes = a, e;
			case y: return e = ol(13, n, t, i), e.elementType = y, e.lanes = a, e;
			case b: return e = ol(19, n, t, i), e.elementType = b, e.lanes = a, e;
			case C: return fl(n, i, a, t);
			default:
				if (typeof e == "object" && e) switch (e.$$typeof) {
					case h:
					case _:
						s = 10;
						break a;
					case g:
						s = 9;
						break a;
					case v:
						s = 11;
						break a;
					case x:
						s = 14;
						break a;
					case S:
						s = 16, r = null;
						break a;
				}
				s = 29, n = Error(o(130, e === null ? "null" : typeof e, "")), r = null;
		}
		return t = ol(s, n, t, i), t.elementType = e, t.type = r, t.lanes = a, t;
	}
	function dl(e, t, n, r) {
		return e = ol(7, e, r, t), e.lanes = n, e;
	}
	function fl(e, t, n, r) {
		e = ol(22, e, r, t), e.elementType = C, e.lanes = n;
		var i = {
			_visibility: 1,
			_pendingVisibility: 1,
			_pendingMarkers: null,
			_retryCache: null,
			_transitions: null,
			_current: null,
			detach: function() {
				var e = i._current;
				if (e === null) throw Error(o(456));
				if (!(i._pendingVisibility & 2)) {
					var t = Xr(e, 2);
					t !== null && (i._pendingVisibility |= 2, eu(t, e, 2));
				}
			},
			attach: function() {
				var e = i._current;
				if (e === null) throw Error(o(456));
				if (i._pendingVisibility & 2) {
					var t = Xr(e, 2);
					t !== null && (i._pendingVisibility &= -3, eu(t, e, 2));
				}
			}
		};
		return e.stateNode = i, e;
	}
	function pl(e, t, n) {
		return e = ol(6, e, null, t), e.lanes = n, e;
	}
	function ml(e, t, n) {
		return t = ol(4, e.children === null ? [] : e.children, e.key, t), t.lanes = n, t.stateNode = {
			containerInfo: e.containerInfo,
			pendingChildren: null,
			implementation: e.implementation
		}, t;
	}
	function hl(e) {
		e.flags |= 4;
	}
	function gl(e, t) {
		if (t.type !== "stylesheet" || t.state.loading & 4) e.flags &= -16777217;
		else if (e.flags |= 16777216, !hf(t)) {
			if (t = Ji.current, t !== null && ((J & 4194176) === J ? Yi !== null : (J & 62914560) !== J && !(J & 536870912) || t !== Yi)) throw Mi = Oi, Di;
			e.flags |= 8192;
		}
	}
	function _l(e, t) {
		t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag === 22 ? 536870912 : Ye(), e.lanes |= t, Ll |= t);
	}
	function vl(e, t) {
		if (!W) switch (e.tailMode) {
			case "hidden":
				t = e.tail;
				for (var n = null; t !== null;) t.alternate !== null && (n = t), t = t.sibling;
				n === null ? e.tail = null : n.sibling = null;
				break;
			case "collapsed":
				n = e.tail;
				for (var r = null; n !== null;) n.alternate !== null && (r = n), n = n.sibling;
				r === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : r.sibling = null;
		}
	}
	function yl(e) {
		var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
		if (t) for (var i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags & 31457280, r |= i.flags & 31457280, i.return = e, i = i.sibling;
		else for (i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags, r |= i.flags, i.return = e, i = i.sibling;
		return e.subtreeFlags |= r, e.childLanes = n, t;
	}
	function bl(e, t, n) {
		var r = t.pendingProps;
		switch (mi(t), t.tag) {
			case 16:
			case 15:
			case 0:
			case 11:
			case 7:
			case 8:
			case 12:
			case 9:
			case 14: return yl(t), null;
			case 1: return yl(t), null;
			case 3: return n = t.stateNode, r = null, e !== null && (r = e.memoizedState.cache), t.memoizedState.cache !== r && (t.flags |= 2048), Hs(aa), _e(), n.pendingContext && (n.context = n.pendingContext, n.pendingContext = null), (e === null || e.child === null) && (Ci(t) ? hl(t) : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, _i !== null && (tu(_i), _i = null))), yl(t), null;
			case 26: return n = t.memoizedState, e === null ? (hl(t), n === null ? (yl(t), t.flags &= -16777217) : (yl(t), gl(t, n))) : n ? n === e.memoizedState ? (yl(t), t.flags &= -16777217) : (hl(t), yl(t), gl(t, n)) : (e.memoizedProps !== r && hl(t), yl(t), t.flags &= -16777217), null;
			case 27:
				ye(t), n = me.current;
				var i = t.type;
				if (e !== null && t.stateNode != null) e.memoizedProps !== r && hl(t);
				else {
					if (!r) {
						if (t.stateNode === null) throw Error(o(166));
						return yl(t), null;
					}
					e = fe.current, Ci(t) ? xi(t, e) : (e = Ld(i, r, n), t.stateNode = e, hl(t));
				}
				return yl(t), null;
			case 5:
				if (ye(t), n = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && hl(t);
				else {
					if (!r) {
						if (t.stateNode === null) throw Error(o(166));
						return yl(t), null;
					}
					if (e = fe.current, Ci(t)) xi(t, e);
					else {
						switch (i = bd(me.current), e) {
							case 1:
								e = i.createElementNS("http://www.w3.org/2000/svg", n);
								break;
							case 2:
								e = i.createElementNS("http://www.w3.org/1998/Math/MathML", n);
								break;
							default: switch (n) {
								case "svg":
									e = i.createElementNS("http://www.w3.org/2000/svg", n);
									break;
								case "math":
									e = i.createElementNS("http://www.w3.org/1998/Math/MathML", n);
									break;
								case "script":
									e = i.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild);
									break;
								case "select":
									e = typeof r.is == "string" ? i.createElement("select", { is: r.is }) : i.createElement("select"), r.multiple ? e.multiple = !0 : r.size && (e.size = r.size);
									break;
								default: e = typeof r.is == "string" ? i.createElement(n, { is: r.is }) : i.createElement(n);
							}
						}
						e[at] = t, e[ot] = r;
						a: for (i = t.child; i !== null;) {
							if (i.tag === 5 || i.tag === 6) e.appendChild(i.stateNode);
							else if (i.tag !== 4 && i.tag !== 27 && i.child !== null) {
								i.child.return = i, i = i.child;
								continue;
							}
							if (i === t) break a;
							for (; i.sibling === null;) {
								if (i.return === null || i.return === t) break a;
								i = i.return;
							}
							i.sibling.return = i.return, i = i.sibling;
						}
						t.stateNode = e;
						a: switch (gd(e, n, r), n) {
							case "button":
							case "input":
							case "select":
							case "textarea":
								e = !!r.autoFocus;
								break a;
							case "img":
								e = !0;
								break a;
							default: e = !1;
						}
						e && hl(t);
					}
				}
				return yl(t), t.flags &= -16777217, null;
			case 6:
				if (e && t.stateNode != null) e.memoizedProps !== r && hl(t);
				else {
					if (typeof r != "string" && t.stateNode === null) throw Error(o(166));
					if (e = me.current, Ci(t)) {
						if (e = t.stateNode, n = t.memoizedProps, r = null, i = hi, i !== null) switch (i.tag) {
							case 27:
							case 5: r = i.memoizedProps;
						}
						e[at] = t, e = !!(e.nodeValue === n || r !== null && !0 === r.suppressHydrationWarning || pd(e.nodeValue, n)), e || bi(t);
					} else e = bd(e).createTextNode(r), e[at] = t, t.stateNode = e;
				}
				return yl(t), null;
			case 13:
				if (r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
					if (i = Ci(t), r !== null && r.dehydrated !== null) {
						if (e === null) {
							if (!i) throw Error(o(318));
							if (i = t.memoizedState, i = i === null ? null : i.dehydrated, !i) throw Error(o(317));
							i[at] = t;
						} else wi(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
						yl(t), i = !1;
					} else _i !== null && (tu(_i), _i = null), i = !0;
					if (!i) return t.flags & 256 ? ($i(t), t) : ($i(t), null);
				}
				if ($i(t), t.flags & 128) return t.lanes = n, t;
				if (n = r !== null, e = e !== null && e.memoizedState !== null, n) {
					r = t.child, i = null, r.alternate !== null && r.alternate.memoizedState !== null && r.alternate.memoizedState.cachePool !== null && (i = r.alternate.memoizedState.cachePool.pool);
					var a = null;
					r.memoizedState !== null && r.memoizedState.cachePool !== null && (a = r.memoizedState.cachePool.pool), a !== i && (r.flags |= 2048);
				}
				return n !== e && n && (t.child.flags |= 8192), _l(t, t.updateQueue), yl(t), null;
			case 4: return _e(), e === null && rd(t.stateNode.containerInfo), yl(t), null;
			case 10: return Hs(t.type), yl(t), null;
			case 19:
				if (ue(ea), i = t.memoizedState, i === null) return yl(t), null;
				if (r = (t.flags & 128) != 0, a = i.rendering, a === null) if (r) vl(i, !1);
				else {
					if (Ml !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null;) {
						if (a = ta(e), a !== null) {
							for (t.flags |= 128, vl(i, !1), e = a.updateQueue, t.updateQueue = e, _l(t, e), t.subtreeFlags = 0, e = n, n = t.child; n !== null;) ll(n, e), n = n.sibling;
							return de(ea, ea.current & 1 | 2), t.child;
						}
						e = e.sibling;
					}
					i.tail !== null && Te() > Hl && (t.flags |= 128, r = !0, vl(i, !1), t.lanes = 4194304);
				}
				else {
					if (!r) if (e = ta(a), e !== null) {
						if (t.flags |= 128, r = !0, e = e.updateQueue, t.updateQueue = e, _l(t, e), vl(i, !0), i.tail === null && i.tailMode === "hidden" && !a.alternate && !W) return yl(t), null;
					} else 2 * Te() - i.renderingStartTime > Hl && n !== 536870912 && (t.flags |= 128, r = !0, vl(i, !1), t.lanes = 4194304);
					i.isBackwards ? (a.sibling = t.child, t.child = a) : (e = i.last, e === null ? t.child = a : e.sibling = a, i.last = a);
				}
				return i.tail === null ? (yl(t), null) : (t = i.tail, i.rendering = t, i.tail = t.sibling, i.renderingStartTime = Te(), t.sibling = null, e = ea.current, de(ea, r ? e & 1 | 2 : e & 1), t);
			case 22:
			case 23: return $i(t), qi(), r = t.memoizedState !== null, e === null ? r && (t.flags |= 8192) : e.memoizedState !== null !== r && (t.flags |= 8192), r ? n & 536870912 && !(t.flags & 128) && (yl(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : yl(t), n = t.updateQueue, n !== null && _l(t, n.retryQueue), n = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), r = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (r = t.memoizedState.cachePool.pool), r !== n && (t.flags |= 2048), e !== null && ue(ga), null;
			case 24: return n = null, e !== null && (n = e.memoizedState.cache), t.memoizedState.cache !== n && (t.flags |= 2048), Hs(aa), yl(t), null;
			case 25: return null;
		}
		throw Error(o(156, t.tag));
	}
	function xl(e, t) {
		switch (mi(t), t.tag) {
			case 1: return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 3: return Hs(aa), _e(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
			case 26:
			case 27:
			case 5: return ye(t), null;
			case 13:
				if ($i(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
					if (t.alternate === null) throw Error(o(340));
					wi();
				}
				return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 19: return ue(ea), null;
			case 4: return _e(), null;
			case 10: return Hs(t.type), null;
			case 22:
			case 23: return $i(t), qi(), e !== null && ue(ga), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 24: return Hs(aa), null;
			case 25: return null;
			default: return null;
		}
	}
	function Sl(e, t) {
		switch (mi(t), t.tag) {
			case 3:
				Hs(aa), _e();
				break;
			case 26:
			case 27:
			case 5:
				ye(t);
				break;
			case 4:
				_e();
				break;
			case 13:
				$i(t);
				break;
			case 19:
				ue(ea);
				break;
			case 10:
				Hs(t.type);
				break;
			case 22:
			case 23:
				$i(t), qi(), e !== null && ue(ga);
				break;
			case 24: Hs(aa);
		}
	}
	var Cl = { getCacheForType: function(e) {
		var t = Js(aa), n = t.data.get(e);
		return n === void 0 && (n = e(), t.data.set(e, n)), n;
	} }, wl = typeof WeakMap == "function" ? WeakMap : Map, Tl = 0, El = null, q = null, J = 0, Y = 0, Dl = null, Ol = !1, kl = !1, Al = !1, jl = 0, Ml = 0, Nl = 0, Pl = 0, Fl = 0, Il = 0, Ll = 0, Rl = null, zl = null, Bl = !1, Vl = 0, Hl = Infinity, Ul = null, Wl = null, Gl = !1, Kl = null, ql = 0, Jl = 0, Yl = null, Xl = 0, Zl = null;
	function Ql() {
		if (Tl & 2 && J !== 0) return J & -J;
		if (k.T !== null) {
			var e = ua;
			return e === 0 ? Ku() : e;
		}
		return nt();
	}
	function $l() {
		Il === 0 && (Il = !(J & 536870912) || W ? Je() : 536870912);
		var e = Ji.current;
		return e !== null && (e.flags |= 32), Il;
	}
	function eu(e, t, n) {
		(e === El && Y === 2 || e.cancelPendingCommit !== null) && (su(e, 0), iu(e, J, Il, !1)), Ze(e, n), (!(Tl & 2) || e !== El) && (e === El && (!(Tl & 2) && (Pl |= n), Ml === 4 && iu(e, J, Il, !1)), zu(e));
	}
	function X(e, t, n) {
		if (Tl & 6) throw Error(o(327));
		var r = !n && (t & 60) == 0 && (t & e.expiredLanes) === 0 || Ke(e, t), i = r ? mu(e, t) : fu(e, t, !0), a = r;
		do {
			if (i === 0) {
				kl && !r && iu(e, t, 0, !1);
				break;
			} else if (i === 6) iu(e, t, 0, !Ol);
			else {
				if (n = e.current.alternate, a && !ru(n)) {
					i = fu(e, t, !1), a = !1;
					continue;
				}
				if (i === 2) {
					if (a = t, e.errorRecoveryDisabledLanes & a) var s = 0;
					else s = e.pendingLanes & -536870913, s = s === 0 ? s & 536870912 ? 536870912 : 0 : s;
					if (s !== 0) {
						t = s;
						a: {
							var c = e;
							i = Rl;
							var l = c.current.memoizedState.isDehydrated;
							if (l && (su(c, s).flags |= 256), s = fu(c, s, !1), s !== 2) {
								if (Al && !l) {
									c.errorRecoveryDisabledLanes |= a, Pl |= a, i = 4;
									break a;
								}
								a = zl, zl = i, a !== null && tu(a);
							}
							i = s;
						}
						if (a = !1, i !== 2) continue;
					}
				}
				if (i === 1) {
					su(e, 0), iu(e, t, 0, !0);
					break;
				}
				a: {
					switch (r = e, i) {
						case 0:
						case 1: throw Error(o(345));
						case 4:
							if ((t & 4194176) === t) {
								iu(r, t, Il, !Ol);
								break a;
							}
							break;
						case 2:
							zl = null;
							break;
						case 3:
						case 5: break;
						default: throw Error(o(329));
					}
					if (r.finishedWork = n, r.finishedLanes = t, (t & 62914560) === t && (a = Vl + 300 - Te(), 10 < a)) {
						if (iu(r, t, Il, !Ol), Ge(r, 0) !== 0) break a;
						r.timeoutHandle = Ed(nu.bind(null, r, n, zl, Ul, Bl, t, Il, Pl, Ll, Ol, 2, -0, 0), a);
						break a;
					}
					nu(r, n, zl, Ul, Bl, t, Il, Pl, Ll, Ol, 0, -0, 0);
				}
			}
			break;
		} while (1);
		zu(e);
	}
	function tu(e) {
		zl === null ? zl = e : zl.push.apply(zl, e);
	}
	function nu(e, t, n, r, i, a, o, s, c, l, u, d, f) {
		var p = t.subtreeFlags;
		if ((p & 8192 || (p & 16785408) == 16785408) && (gf = {
			stylesheets: null,
			count: 0,
			unsuspend: _f
		}, $c(t), t = yf(), t !== null)) {
			e.cancelPendingCommit = t(xu.bind(null, e, n, r, i, o, s, c, 1, d, f)), iu(e, a, o, !l);
			return;
		}
		xu(e, n, r, i, o, s, c, u, d, f);
	}
	function ru(e) {
		for (var t = e;;) {
			var n = t.tag;
			if ((n === 0 || n === 11 || n === 15) && t.flags & 16384 && (n = t.updateQueue, n !== null && (n = n.stores, n !== null))) for (var r = 0; r < n.length; r++) {
				var i = n[r], a = i.getSnapshot;
				i = i.value;
				try {
					if (!hr(a(), i)) return !1;
				} catch {
					return !1;
				}
			}
			if (n = t.child, t.subtreeFlags & 16384 && n !== null) n.return = t, t = n;
			else {
				if (t === e) break;
				for (; t.sibling === null;) {
					if (t.return === null || t.return === e) return !0;
					t = t.return;
				}
				t.sibling.return = t.return, t = t.sibling;
			}
		}
		return !0;
	}
	function iu(e, t, n, r) {
		t &= ~Fl, t &= ~Pl, e.suspendedLanes |= t, e.pingedLanes &= ~t, r && (e.warmLanes |= t), r = e.expirationTimes;
		for (var i = t; 0 < i;) {
			var a = 31 - Re(i), o = 1 << a;
			r[a] = -1, i &= ~o;
		}
		n !== 0 && $e(e, n, t);
	}
	function au() {
		return Tl & 6 ? !0 : (Bu(0, !1), !1);
	}
	function ou() {
		if (q !== null) {
			if (Y === 0) var e = q.return;
			else e = q, Bs = zs = null, La(e), Pi = null, Fi = 0, e = q;
			for (; e !== null;) Sl(e.alternate, e), e = e.return;
			q = null;
		}
	}
	function su(e, t) {
		e.finishedWork = null, e.finishedLanes = 0;
		var n = e.timeoutHandle;
		n !== -1 && (e.timeoutHandle = -1, Dd(n)), n = e.cancelPendingCommit, n !== null && (e.cancelPendingCommit = null, n()), ou(), El = e, q = n = cl(e.current, null), J = t, Y = 0, Dl = null, Ol = !1, kl = Ke(e, t), Al = !1, Ll = Il = Fl = Pl = Nl = Ml = 0, zl = Rl = null, Bl = !1, t & 8 && (t |= t & 32);
		var r = e.entangledLanes;
		if (r !== 0) for (e = e.entanglements, r &= t; 0 < r;) {
			var i = 31 - Re(r), a = 1 << i;
			t |= e[i], r &= ~a;
		}
		return jl = t, qr(), n;
	}
	function cu(e, t) {
		G = null, k.H = Ko, t === Ei ? (t = Ni(), Y = 3) : t === Di ? (t = Ni(), Y = 4) : Y = t === ds ? 8 : typeof t == "object" && t && typeof t.then == "function" ? 6 : 1, Dl = t, q === null && (Ml = 1, as(e, ti(t, e.current)));
	}
	function lu() {
		var e = k.H;
		return k.H = Ko, e === null ? Ko : e;
	}
	function uu() {
		var e = k.A;
		return k.A = Cl, e;
	}
	function du() {
		Ml = 4, Ol || (J & 4194176) !== J && Ji.current !== null || (kl = !0), !(Nl & 134217727) && !(Pl & 134217727) || El === null || iu(El, J, Il, !1);
	}
	function fu(e, t, n) {
		var r = Tl;
		Tl |= 2;
		var i = lu(), a = uu();
		(El !== e || J !== t) && (Ul = null, su(e, t)), t = !1;
		var o = Ml;
		a: do
			try {
				if (Y !== 0 && q !== null) {
					var s = q, c = Dl;
					switch (Y) {
						case 8:
							ou(), o = 6;
							break a;
						case 3:
						case 2:
						case 6:
							Ji.current === null && (t = !0);
							var l = Y;
							if (Y = 0, Dl = null, vu(e, s, c, l), n && kl) {
								o = 0;
								break a;
							}
							break;
						default: l = Y, Y = 0, Dl = null, vu(e, s, c, l);
					}
				}
				pu(), o = Ml;
				break;
			} catch (t) {
				cu(e, t);
			}
		while (1);
		return t && e.shellSuspendCounter++, Bs = zs = null, Tl = r, k.H = i, k.A = a, q === null && (El = null, J = 0, qr()), o;
	}
	function pu() {
		for (; q !== null;) gu(q);
	}
	function mu(e, t) {
		var n = Tl;
		Tl |= 2;
		var r = lu(), i = uu();
		El !== e || J !== t ? (Ul = null, Hl = Te() + 500, su(e, t)) : kl = Ke(e, t);
		a: do
			try {
				if (Y !== 0 && q !== null) {
					t = q;
					var a = Dl;
					b: switch (Y) {
						case 1:
							Y = 0, Dl = null, vu(e, t, a, 1);
							break;
						case 2:
							if (ki(a)) {
								Y = 0, Dl = null, _u(t);
								break;
							}
							t = function() {
								Y === 2 && El === e && (Y = 7), zu(e);
							}, a.then(t, t);
							break a;
						case 3:
							Y = 7;
							break a;
						case 4:
							Y = 5;
							break a;
						case 7:
							ki(a) ? (Y = 0, Dl = null, _u(t)) : (Y = 0, Dl = null, vu(e, t, a, 7));
							break;
						case 5:
							var s = null;
							switch (q.tag) {
								case 26: s = q.memoizedState;
								case 5:
								case 27:
									var c = q;
									if (!s || hf(s)) {
										Y = 0, Dl = null;
										var l = c.sibling;
										if (l !== null) q = l;
										else {
											var u = c.return;
											u === null ? q = null : (q = u, yu(u));
										}
										break b;
									}
							}
							Y = 0, Dl = null, vu(e, t, a, 5);
							break;
						case 6:
							Y = 0, Dl = null, vu(e, t, a, 6);
							break;
						case 8:
							ou(), Ml = 6;
							break a;
						default: throw Error(o(462));
					}
				}
				hu();
				break;
			} catch (t) {
				cu(e, t);
			}
		while (1);
		return Bs = zs = null, k.H = r, k.A = i, Tl = n, q === null ? (El = null, J = 0, qr(), Ml) : 0;
	}
	function hu() {
		for (; q !== null && !Ce();) gu(q);
	}
	function gu(e) {
		var t = Ls(e.alternate, e, jl);
		e.memoizedProps = e.pendingProps, t === null ? yu(e) : q = t;
	}
	function _u(e) {
		var t = e, n = t.alternate;
		switch (t.tag) {
			case 15:
			case 0:
				t = xs(n, t, t.pendingProps, t.type, void 0, J);
				break;
			case 11:
				t = xs(n, t, t.pendingProps, t.type.render, t.ref, J);
				break;
			case 5: La(t);
			default: Sl(n, t), t = q = ll(t, jl), t = Ls(n, t, jl);
		}
		e.memoizedProps = e.pendingProps, t === null ? yu(e) : q = t;
	}
	function vu(e, t, n, r) {
		Bs = zs = null, La(t), Pi = null, Fi = 0;
		var i = t.return;
		try {
			if (us(e, i, t, n, J)) {
				Ml = 1, as(e, ti(n, e.current)), q = null;
				return;
			}
		} catch (t) {
			if (i !== null) throw q = i, t;
			Ml = 1, as(e, ti(n, e.current)), q = null;
			return;
		}
		t.flags & 32768 ? (W || r === 1 ? e = !0 : kl || J & 536870912 ? e = !1 : (Ol = e = !0, (r === 2 || r === 3 || r === 6) && (r = Ji.current, r !== null && r.tag === 13 && (r.flags |= 16384))), bu(t, e)) : yu(t);
	}
	function yu(e) {
		var t = e;
		do {
			if (t.flags & 32768) {
				bu(t, Ol);
				return;
			}
			e = t.return;
			var n = bl(t.alternate, t, jl);
			if (n !== null) {
				q = n;
				return;
			}
			if (t = t.sibling, t !== null) {
				q = t;
				return;
			}
			q = t = e;
		} while (t !== null);
		Ml === 0 && (Ml = 5);
	}
	function bu(e, t) {
		do {
			var n = xl(e.alternate, e);
			if (n !== null) {
				n.flags &= 32767, q = n;
				return;
			}
			if (n = e.return, n !== null && (n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null), !t && (e = e.sibling, e !== null)) {
				q = e;
				return;
			}
			q = e = n;
		} while (e !== null);
		Ml = 6, q = null;
	}
	function xu(e, t, n, r, i, a, o, s, c, l) {
		var u = k.T, d = R.p;
		try {
			R.p = 2, k.T = null, Su(e, t, n, r, d, i, a, o, s, c, l);
		} finally {
			k.T = u, R.p = d;
		}
	}
	function Su(e, t, n, r, i, a, s, c) {
		do
			wu();
		while (Kl !== null);
		if (Tl & 6) throw Error(o(327));
		var l = e.finishedWork;
		if (r = e.finishedLanes, l === null) return null;
		if (e.finishedWork = null, e.finishedLanes = 0, l === e.current) throw Error(o(177));
		e.callbackNode = null, e.callbackPriority = 0, e.cancelPendingCommit = null;
		var u = l.lanes | l.childLanes;
		if (u |= Kr, Qe(e, r, u, a, s, c), e === El && (q = El = null, J = 0), !(l.subtreeFlags & 10256) && !(l.flags & 10256) || Gl || (Gl = !0, Jl = u, Yl = n, Mu(ke, function() {
			return wu(!0), null;
		})), n = (l.flags & 15990) != 0, l.subtreeFlags & 15990 || n ? (n = k.T, k.T = null, a = R.p, R.p = 2, s = Tl, Tl |= 4, Dc(e, l), zc(l, e), Sr(yd, e.containerInfo), Mf = !!vd, yd = vd = null, e.current = l, Oc(e, l.alternate, l), we(), Tl = s, R.p = a, k.T = n) : e.current = l, Gl ? (Gl = !1, Kl = e, ql = r) : Cu(e, u), u = e.pendingLanes, u === 0 && (Wl = null), Ie(l.stateNode, i), zu(e), t !== null) for (i = e.onRecoverableError, l = 0; l < t.length; l++) u = t[l], i(u.value, { componentStack: u.stack });
		return ql & 3 && wu(), u = e.pendingLanes, r & 4194218 && u & 42 ? e === Zl ? Xl++ : (Xl = 0, Zl = e) : Xl = 0, Bu(0, !1), null;
	}
	function Cu(e, t) {
		(e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, sa(t)));
	}
	function wu() {
		if (Kl !== null) {
			var e = Kl, t = Jl;
			Jl = 0;
			var n = tt(ql), r = k.T, i = R.p;
			try {
				if (R.p = 32 > n ? 32 : n, k.T = null, Kl === null) var a = !1;
				else {
					n = Yl, Yl = null;
					var s = Kl, c = ql;
					if (Kl = null, ql = 0, Tl & 6) throw Error(o(331));
					var l = Tl;
					if (Tl |= 4, nl(s.current), Jc(s, s.current, c, n), Tl = l, Bu(0, !1), Fe && typeof Fe.onPostCommitFiberRoot == "function") try {
						Fe.onPostCommitFiberRoot(Pe, s);
					} catch {}
					a = !0;
				}
				return a;
			} finally {
				R.p = i, k.T = r, Cu(e, t);
			}
		}
		return !1;
	}
	function Tu(e, t, n) {
		t = ti(n, t), t = ss(e.stateNode, t, 2), e = tc(e, t, 2), e !== null && (Ze(e, 2), zu(e));
	}
	function Eu(e, t, n) {
		if (e.tag === 3) Tu(e, e, n);
		else for (; t !== null;) {
			if (t.tag === 3) {
				Tu(t, e, n);
				break;
			} else if (t.tag === 1) {
				var r = t.stateNode;
				if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (Wl === null || !Wl.has(r))) {
					e = ti(n, e), n = cs(2), r = tc(t, n, 2), r !== null && (ls(n, r, t, e), Ze(r, 2), zu(r));
					break;
				}
			}
			t = t.return;
		}
	}
	function Du(e, t, n) {
		var r = e.pingCache;
		if (r === null) {
			r = e.pingCache = new wl();
			var i = /* @__PURE__ */ new Set();
			r.set(t, i);
		} else i = r.get(t), i === void 0 && (i = /* @__PURE__ */ new Set(), r.set(t, i));
		i.has(n) || (Al = !0, i.add(n), e = Ou.bind(null, e, t, n), t.then(e, e));
	}
	function Ou(e, t, n) {
		var r = e.pingCache;
		r !== null && r.delete(t), e.pingedLanes |= e.suspendedLanes & n, e.warmLanes &= ~n, El === e && (J & n) === n && (Ml === 4 || Ml === 3 && (J & 62914560) === J && 300 > Te() - Vl ? !(Tl & 2) && su(e, 0) : Fl |= n, Ll === J && (Ll = 0)), zu(e);
	}
	function ku(e, t) {
		t === 0 && (t = Ye()), e = Xr(e, t), e !== null && (Ze(e, t), zu(e));
	}
	function Au(e) {
		var t = e.memoizedState, n = 0;
		t !== null && (n = t.retryLane), ku(e, n);
	}
	function ju(e, t) {
		var n = 0;
		switch (e.tag) {
			case 13:
				var r = e.stateNode, i = e.memoizedState;
				i !== null && (n = i.retryLane);
				break;
			case 19:
				r = e.stateNode;
				break;
			case 22:
				r = e.stateNode._retryCache;
				break;
			default: throw Error(o(314));
		}
		r !== null && r.delete(t), ku(e, n);
	}
	function Mu(e, t) {
		return xe(e, t);
	}
	var Nu = null, Pu = null, Fu = !1, Iu = !1, Lu = !1, Ru = 0;
	function zu(e) {
		e !== Pu && e.next === null && (Pu === null ? Nu = Pu = e : Pu = Pu.next = e), Iu = !0, Fu || (Fu = !0, Gu(Vu));
	}
	function Bu(e, t) {
		if (!Lu && Iu) {
			Lu = !0;
			do
				for (var n = !1, r = Nu; r !== null;) {
					if (!t) if (e !== 0) {
						var i = r.pendingLanes;
						if (i === 0) var a = 0;
						else {
							var o = r.suspendedLanes, s = r.pingedLanes;
							a = (1 << 31 - Re(42 | e) + 1) - 1, a &= i & ~(o & ~s), a = a & 201326677 ? a & 201326677 | 1 : a ? a | 2 : 0;
						}
						a !== 0 && (n = !0, Wu(r, a));
					} else a = J, a = Ge(r, r === El ? a : 0), !(a & 3) || Ke(r, a) || (n = !0, Wu(r, a));
					r = r.next;
				}
			while (n);
			Lu = !1;
		}
	}
	function Vu() {
		Iu = Fu = !1;
		var e = 0;
		Ru !== 0 && (Td() && (e = Ru), Ru = 0);
		for (var t = Te(), n = null, r = Nu; r !== null;) {
			var i = r.next, a = Hu(r, t);
			a === 0 ? (r.next = null, n === null ? Nu = i : n.next = i, i === null && (Pu = n)) : (n = r, (e !== 0 || a & 3) && (Iu = !0)), r = i;
		}
		Bu(e, !1);
	}
	function Hu(e, t) {
		for (var n = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, a = e.pendingLanes & -62914561; 0 < a;) {
			var o = 31 - Re(a), s = 1 << o, c = i[o];
			c === -1 ? ((s & n) === 0 || (s & r) !== 0) && (i[o] = qe(s, t)) : c <= t && (e.expiredLanes |= s), a &= ~s;
		}
		if (t = El, n = J, n = Ge(e, e === t ? n : 0), r = e.callbackNode, n === 0 || e === t && Y === 2 || e.cancelPendingCommit !== null) return r !== null && r !== null && Se(r), e.callbackNode = null, e.callbackPriority = 0;
		if (!(n & 3) || Ke(e, n)) {
			if (t = n & -n, t === e.callbackPriority) return t;
			switch (r !== null && Se(r), tt(n)) {
				case 2:
				case 8:
					n = Oe;
					break;
				case 32:
					n = ke;
					break;
				case 268435456:
					n = je;
					break;
				default: n = ke;
			}
			return r = Uu.bind(null, e), n = xe(n, r), e.callbackPriority = t, e.callbackNode = n, t;
		}
		return r !== null && r !== null && Se(r), e.callbackPriority = 2, e.callbackNode = null, 2;
	}
	function Uu(e, t) {
		var n = e.callbackNode;
		if (wu() && e.callbackNode !== n) return null;
		var r = J;
		return r = Ge(e, e === El ? r : 0), r === 0 ? null : (X(e, r, t), Hu(e, Te()), e.callbackNode != null && e.callbackNode === n ? Uu.bind(null, e) : null);
	}
	function Wu(e, t) {
		if (wu()) return null;
		X(e, t, !0);
	}
	function Gu(e) {
		kd(function() {
			Tl & 6 ? xe(De, e) : e();
		});
	}
	function Ku() {
		return Ru === 0 && (Ru = Je()), Ru;
	}
	function qu(e) {
		return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : qt("" + e);
	}
	function Ju(e, t) {
		var n = t.ownerDocument.createElement("input");
		return n.name = t.name, n.value = t.value, e.id && n.setAttribute("form", e.id), t.parentNode.insertBefore(n, t), e = new FormData(e), n.parentNode.removeChild(n), e;
	}
	function Yu(e, t, n, r, i) {
		if (t === "submit" && n && n.stateNode === i) {
			var a = qu((i[ot] || null).action), o = r.submitter;
			o && (t = (t = o[ot] || null) ? qu(t.formAction) : o.getAttribute("formAction"), t !== null && (a = t, o = null));
			var s = new mn("action", "action", null, r, i);
			e.push({
				event: s,
				listeners: [{
					instance: null,
					listener: function() {
						if (r.defaultPrevented) {
							if (Ru !== 0) {
								var e = o ? Ju(i, o) : new FormData(i);
								Mo(n, {
									pending: !0,
									data: e,
									method: i.method,
									action: a
								}, null, e);
							}
						} else typeof a == "function" && (s.preventDefault(), e = o ? Ju(i, o) : new FormData(i), Mo(n, {
							pending: !0,
							data: e,
							method: i.method,
							action: a
						}, a, e));
					},
					currentTarget: i
				}]
			});
		}
	}
	for (var Xu = 0; Xu < Hr.length; Xu++) {
		var Zu = Hr[Xu];
		Ur(Zu.toLowerCase(), "on" + (Zu[0].toUpperCase() + Zu.slice(1)));
	}
	Ur(Pr, "onAnimationEnd"), Ur(Fr, "onAnimationIteration"), Ur(Ir, "onAnimationStart"), Ur("dblclick", "onDoubleClick"), Ur("focusin", "onFocus"), Ur("focusout", "onBlur"), Ur(Lr, "onTransitionRun"), Ur(Rr, "onTransitionStart"), Ur(zr, "onTransitionCancel"), Ur(Br, "onTransitionEnd"), B("onMouseEnter", ["mouseout", "mouseover"]), B("onMouseLeave", ["mouseout", "mouseover"]), B("onPointerEnter", ["pointerout", "pointerover"]), B("onPointerLeave", ["pointerout", "pointerover"]), bt("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), bt("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), bt("onBeforeInput", [
		"compositionend",
		"keypress",
		"textInput",
		"paste"
	]), bt("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), bt("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), bt("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
	var Qu = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), $u = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Qu));
	function ed(e, t) {
		t = (t & 4) != 0;
		for (var n = 0; n < e.length; n++) {
			var r = e[n], i = r.event;
			r = r.listeners;
			a: {
				var a = void 0;
				if (t) for (var o = r.length - 1; 0 <= o; o--) {
					var s = r[o], c = s.instance, l = s.currentTarget;
					if (s = s.listener, c !== a && i.isPropagationStopped()) break a;
					a = s, i.currentTarget = l;
					try {
						a(i);
					} catch (e) {
						ts(e);
					}
					i.currentTarget = null, a = c;
				}
				else for (o = 0; o < r.length; o++) {
					if (s = r[o], c = s.instance, l = s.currentTarget, s = s.listener, c !== a && i.isPropagationStopped()) break a;
					a = s, i.currentTarget = l;
					try {
						a(i);
					} catch (e) {
						ts(e);
					}
					i.currentTarget = null, a = c;
				}
			}
		}
	}
	function Z(e, t) {
		var n = t[ct];
		n === void 0 && (n = t[ct] = /* @__PURE__ */ new Set());
		var r = e + "__bubble";
		n.has(r) || (id(t, e, 2, !1), n.add(r));
	}
	function td(e, t, n) {
		var r = 0;
		t && (r |= 4), id(n, e, r, t);
	}
	var nd = "_reactListening" + Math.random().toString(36).slice(2);
	function rd(e) {
		if (!e[nd]) {
			e[nd] = !0, vt.forEach(function(t) {
				t !== "selectionchange" && ($u.has(t) || td(t, !1, e), td(t, !0, e));
			});
			var t = e.nodeType === 9 ? e : e.ownerDocument;
			t === null || t[nd] || (t[nd] = !0, td("selectionchange", !1, t));
		}
	}
	function id(e, t, n, r) {
		switch (zf(t)) {
			case 2:
				var i = Nf;
				break;
			case 8:
				i = Pf;
				break;
			default: i = Ff;
		}
		n = i.bind(null, t, n, e), i = void 0, !nn || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (i = !0), r ? i === void 0 ? e.addEventListener(t, n, !0) : e.addEventListener(t, n, {
			capture: !0,
			passive: i
		}) : i === void 0 ? e.addEventListener(t, n, !1) : e.addEventListener(t, n, { passive: i });
	}
	function ad(e, t, n, r, i) {
		var a = r;
		if (!(t & 1) && !(t & 2) && r !== null) a: for (;;) {
			if (r === null) return;
			var o = r.tag;
			if (o === 3 || o === 4) {
				var s = r.stateNode.containerInfo;
				if (s === i || s.nodeType === 8 && s.parentNode === i) break;
				if (o === 4) for (o = r.return; o !== null;) {
					var c = o.tag;
					if ((c === 3 || c === 4) && (c = o.stateNode.containerInfo, c === i || c.nodeType === 8 && c.parentNode === i)) return;
					o = o.return;
				}
				for (; s !== null;) {
					if (o = pt(s), o === null) return;
					if (c = o.tag, c === 5 || c === 6 || c === 26 || c === 27) {
						r = a = o;
						continue a;
					}
					s = s.parentNode;
				}
			}
			r = r.return;
		}
		en(function() {
			var r = a, i = Yt(n), o = [];
			a: {
				var s = Vr.get(e);
				if (s !== void 0) {
					var c = mn, l = e;
					switch (e) {
						case "keypress": if (ln(n) === 0) break a;
						case "keydown":
						case "keyup":
							c = Mn;
							break;
						case "focusin":
							l = "focus", c = Cn;
							break;
						case "focusout":
							l = "blur", c = Cn;
							break;
						case "beforeblur":
						case "afterblur":
							c = Cn;
							break;
						case "click": if (n.button === 2) break a;
						case "auxclick":
						case "dblclick":
						case "mousedown":
						case "mousemove":
						case "mouseup":
						case "mouseout":
						case "mouseover":
						case "contextmenu":
							c = xn;
							break;
						case "drag":
						case "dragend":
						case "dragenter":
						case "dragexit":
						case "dragleave":
						case "dragover":
						case "dragstart":
						case "drop":
							c = Sn;
							break;
						case "touchcancel":
						case "touchend":
						case "touchmove":
						case "touchstart":
							c = Pn;
							break;
						case Pr:
						case Fr:
						case Ir:
							c = wn;
							break;
						case Br:
							c = Fn;
							break;
						case "scroll":
						case "scrollend":
							c = gn;
							break;
						case "wheel":
							c = In;
							break;
						case "copy":
						case "cut":
						case "paste":
							c = Tn;
							break;
						case "gotpointercapture":
						case "lostpointercapture":
						case "pointercancel":
						case "pointerdown":
						case "pointermove":
						case "pointerout":
						case "pointerover":
						case "pointerup":
							c = Nn;
							break;
						case "toggle":
						case "beforetoggle": c = Ln;
					}
					var u = (t & 4) != 0, d = !u && (e === "scroll" || e === "scrollend"), f = u ? s === null ? null : s + "Capture" : s;
					u = [];
					for (var p = r, m; p !== null;) {
						var h = p;
						if (m = h.stateNode, h = h.tag, h !== 5 && h !== 26 && h !== 27 || m === null || f === null || (h = tn(p, f), h != null && u.push(od(p, h, m))), d) break;
						p = p.return;
					}
					0 < u.length && (s = new c(s, l, null, n, i), o.push({
						event: s,
						listeners: u
					}));
				}
			}
			if (!(t & 7)) {
				a: {
					if (s = e === "mouseover" || e === "pointerover", c = e === "mouseout" || e === "pointerout", s && n !== Jt && (l = n.relatedTarget || n.fromElement) && (pt(l) || l[st])) break a;
					if ((c || s) && (s = i.window === i ? i : (s = i.ownerDocument) ? s.defaultView || s.parentWindow : window, c ? (l = n.relatedTarget || n.toElement, c = r, l = l ? pt(l) : null, l !== null && (d = te(l), u = l.tag, l !== d || u !== 5 && u !== 27 && u !== 6) && (l = null)) : (c = null, l = r), c !== l)) {
						if (u = xn, h = "onMouseLeave", f = "onMouseEnter", p = "mouse", (e === "pointerout" || e === "pointerover") && (u = Nn, h = "onPointerLeave", f = "onPointerEnter", p = "pointer"), d = c == null ? s : ht(c), m = l == null ? s : ht(l), s = new u(h, p + "leave", c, n, i), s.target = d, s.relatedTarget = m, h = null, pt(i) === r && (u = new u(f, p + "enter", l, n, i), u.target = m, u.relatedTarget = d, h = u), d = h, c && l) b: {
							for (u = c, f = l, p = 0, m = u; m; m = cd(m)) p++;
							for (m = 0, h = f; h; h = cd(h)) m++;
							for (; 0 < p - m;) u = cd(u), p--;
							for (; 0 < m - p;) f = cd(f), m--;
							for (; p--;) {
								if (u === f || f !== null && u === f.alternate) break b;
								u = cd(u), f = cd(f);
							}
							u = null;
						}
						else u = null;
						c !== null && ld(o, s, c, u, !1), l !== null && d !== null && ld(o, d, l, u, !0);
					}
				}
				a: {
					if (s = r ? ht(r) : window, c = s.nodeName && s.nodeName.toLowerCase(), c === "select" || c === "input" && s.type === "file") var g = rr;
					else if (Zn(s)) if (ir) g = pr;
					else {
						g = dr;
						var _ = ur;
					}
					else c = s.nodeName, !c || c.toLowerCase() !== "input" || s.type !== "checkbox" && s.type !== "radio" ? r && Wt(r.elementType) && (g = rr) : g = fr;
					if (g &&= g(e, r)) {
						Qn(o, g, n, i);
						break a;
					}
					_ && _(e, s, r), e === "focusout" && r && s.type === "number" && r.memoizedProps.value != null && Rt(s, "number", s.value);
				}
				switch (_ = r ? ht(r) : window, e) {
					case "focusin":
						(Zn(_) || _.contentEditable === "true") && (wr = _, Tr = r, Er = null);
						break;
					case "focusout":
						Er = Tr = wr = null;
						break;
					case "mousedown":
						Dr = !0;
						break;
					case "contextmenu":
					case "mouseup":
					case "dragend":
						Dr = !1, Or(o, n, i);
						break;
					case "selectionchange": if (Cr) break;
					case "keydown":
					case "keyup": Or(o, n, i);
				}
				var v;
				if (zn) b: {
					switch (e) {
						case "compositionstart":
							var y = "onCompositionStart";
							break b;
						case "compositionend":
							y = "onCompositionEnd";
							break b;
						case "compositionupdate":
							y = "onCompositionUpdate";
							break b;
					}
					y = void 0;
				}
				else qn ? Gn(e, n) && (y = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (y = "onCompositionStart");
				y && (Hn && n.locale !== "ko" && (qn || y !== "onCompositionStart" ? y === "onCompositionEnd" && qn && (v = cn()) : (an = i, on = "value" in an ? an.value : an.textContent, qn = !0)), _ = sd(r, y), 0 < _.length && (y = new En(y, e, null, n, i), o.push({
					event: y,
					listeners: _
				}), v ? y.data = v : (v = Kn(n), v !== null && (y.data = v)))), (v = Vn ? Jn(e, n) : Yn(e, n)) && (y = sd(r, "onBeforeInput"), 0 < y.length && (_ = new En("onBeforeInput", "beforeinput", null, n, i), o.push({
					event: _,
					listeners: y
				}), _.data = v)), Yu(o, e, r, n, i);
			}
			ed(o, t);
		});
	}
	function od(e, t, n) {
		return {
			instance: e,
			listener: t,
			currentTarget: n
		};
	}
	function sd(e, t) {
		for (var n = t + "Capture", r = []; e !== null;) {
			var i = e, a = i.stateNode;
			i = i.tag, i !== 5 && i !== 26 && i !== 27 || a === null || (i = tn(e, n), i != null && r.unshift(od(e, i, a)), i = tn(e, t), i != null && r.push(od(e, i, a))), e = e.return;
		}
		return r;
	}
	function cd(e) {
		if (e === null) return null;
		do
			e = e.return;
		while (e && e.tag !== 5 && e.tag !== 27);
		return e || null;
	}
	function ld(e, t, n, r, i) {
		for (var a = t._reactName, o = []; n !== null && n !== r;) {
			var s = n, c = s.alternate, l = s.stateNode;
			if (s = s.tag, c !== null && c === r) break;
			s !== 5 && s !== 26 && s !== 27 || l === null || (c = l, i ? (l = tn(n, a), l != null && o.unshift(od(n, l, c))) : i || (l = tn(n, a), l != null && o.push(od(n, l, c)))), n = n.return;
		}
		o.length !== 0 && e.push({
			event: t,
			listeners: o
		});
	}
	var ud = /\r\n?/g, dd = /\u0000|\uFFFD/g;
	function fd(e) {
		return (typeof e == "string" ? e : "" + e).replace(ud, "\n").replace(dd, "");
	}
	function pd(e, t) {
		return t = fd(t), fd(e) === t;
	}
	function md() {}
	function Q(e, t, n, r, i, a) {
		switch (n) {
			case "children":
				typeof r == "string" ? t === "body" || t === "textarea" && r === "" || H(e, r) : (typeof r == "number" || typeof r == "bigint") && t !== "body" && H(e, "" + r);
				break;
			case "className":
				Et(e, "class", r);
				break;
			case "tabIndex":
				Et(e, "tabindex", r);
				break;
			case "dir":
			case "role":
			case "viewBox":
			case "width":
			case "height":
				Et(e, n, r);
				break;
			case "style":
				Ut(e, r, a);
				break;
			case "data": if (t !== "object") {
				Et(e, "data", r);
				break;
			}
			case "src":
			case "href":
				if (r === "" && (t !== "a" || n !== "href")) {
					e.removeAttribute(n);
					break;
				}
				if (r == null || typeof r == "function" || typeof r == "symbol" || typeof r == "boolean") {
					e.removeAttribute(n);
					break;
				}
				r = qt("" + r), e.setAttribute(n, r);
				break;
			case "action":
			case "formAction":
				if (typeof r == "function") {
					e.setAttribute(n, "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");
					break;
				} else typeof a == "function" && (n === "formAction" ? (t !== "input" && Q(e, t, "name", i.name, i, null), Q(e, t, "formEncType", i.formEncType, i, null), Q(e, t, "formMethod", i.formMethod, i, null), Q(e, t, "formTarget", i.formTarget, i, null)) : (Q(e, t, "encType", i.encType, i, null), Q(e, t, "method", i.method, i, null), Q(e, t, "target", i.target, i, null)));
				if (r == null || typeof r == "symbol" || typeof r == "boolean") {
					e.removeAttribute(n);
					break;
				}
				r = qt("" + r), e.setAttribute(n, r);
				break;
			case "onClick":
				r != null && (e.onclick = md);
				break;
			case "onScroll":
				r != null && Z("scroll", e);
				break;
			case "onScrollEnd":
				r != null && Z("scrollend", e);
				break;
			case "dangerouslySetInnerHTML":
				if (r != null) {
					if (typeof r != "object" || !("__html" in r)) throw Error(o(61));
					if (n = r.__html, n != null) {
						if (i.children != null) throw Error(o(60));
						e.innerHTML = n;
					}
				}
				break;
			case "multiple":
				e.multiple = r && typeof r != "function" && typeof r != "symbol";
				break;
			case "muted":
				e.muted = r && typeof r != "function" && typeof r != "symbol";
				break;
			case "suppressContentEditableWarning":
			case "suppressHydrationWarning":
			case "defaultValue":
			case "defaultChecked":
			case "innerHTML":
			case "ref": break;
			case "autoFocus": break;
			case "xlinkHref":
				if (r == null || typeof r == "function" || typeof r == "boolean" || typeof r == "symbol") {
					e.removeAttribute("xlink:href");
					break;
				}
				n = qt("" + r), e.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", n);
				break;
			case "contentEditable":
			case "spellCheck":
			case "draggable":
			case "value":
			case "autoReverse":
			case "externalResourcesRequired":
			case "focusable":
			case "preserveAlpha":
				r != null && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(n, "" + r) : e.removeAttribute(n);
				break;
			case "inert":
			case "allowFullScreen":
			case "async":
			case "autoPlay":
			case "controls":
			case "default":
			case "defer":
			case "disabled":
			case "disablePictureInPicture":
			case "disableRemotePlayback":
			case "formNoValidate":
			case "hidden":
			case "loop":
			case "noModule":
			case "noValidate":
			case "open":
			case "playsInline":
			case "readOnly":
			case "required":
			case "reversed":
			case "scoped":
			case "seamless":
			case "itemScope":
				r && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(n, "") : e.removeAttribute(n);
				break;
			case "capture":
			case "download":
				!0 === r ? e.setAttribute(n, "") : !1 !== r && r != null && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(n, r) : e.removeAttribute(n);
				break;
			case "cols":
			case "rows":
			case "size":
			case "span":
				r != null && typeof r != "function" && typeof r != "symbol" && !isNaN(r) && 1 <= r ? e.setAttribute(n, r) : e.removeAttribute(n);
				break;
			case "rowSpan":
			case "start":
				r == null || typeof r == "function" || typeof r == "symbol" || isNaN(r) ? e.removeAttribute(n) : e.setAttribute(n, r);
				break;
			case "popover":
				Z("beforetoggle", e), Z("toggle", e), V(e, "popover", r);
				break;
			case "xlinkActuate":
				Dt(e, "http://www.w3.org/1999/xlink", "xlink:actuate", r);
				break;
			case "xlinkArcrole":
				Dt(e, "http://www.w3.org/1999/xlink", "xlink:arcrole", r);
				break;
			case "xlinkRole":
				Dt(e, "http://www.w3.org/1999/xlink", "xlink:role", r);
				break;
			case "xlinkShow":
				Dt(e, "http://www.w3.org/1999/xlink", "xlink:show", r);
				break;
			case "xlinkTitle":
				Dt(e, "http://www.w3.org/1999/xlink", "xlink:title", r);
				break;
			case "xlinkType":
				Dt(e, "http://www.w3.org/1999/xlink", "xlink:type", r);
				break;
			case "xmlBase":
				Dt(e, "http://www.w3.org/XML/1998/namespace", "xml:base", r);
				break;
			case "xmlLang":
				Dt(e, "http://www.w3.org/XML/1998/namespace", "xml:lang", r);
				break;
			case "xmlSpace":
				Dt(e, "http://www.w3.org/XML/1998/namespace", "xml:space", r);
				break;
			case "is":
				V(e, "is", r);
				break;
			case "innerText":
			case "textContent": break;
			default: (!(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N") && (n = Gt.get(n) || n, V(e, n, r));
		}
	}
	function hd(e, t, n, r, i, a) {
		switch (n) {
			case "style":
				Ut(e, r, a);
				break;
			case "dangerouslySetInnerHTML":
				if (r != null) {
					if (typeof r != "object" || !("__html" in r)) throw Error(o(61));
					if (n = r.__html, n != null) {
						if (i.children != null) throw Error(o(60));
						e.innerHTML = n;
					}
				}
				break;
			case "children":
				typeof r == "string" ? H(e, r) : (typeof r == "number" || typeof r == "bigint") && H(e, "" + r);
				break;
			case "onScroll":
				r != null && Z("scroll", e);
				break;
			case "onScrollEnd":
				r != null && Z("scrollend", e);
				break;
			case "onClick":
				r != null && (e.onclick = md);
				break;
			case "suppressContentEditableWarning":
			case "suppressHydrationWarning":
			case "innerHTML":
			case "ref": break;
			case "innerText":
			case "textContent": break;
			default: if (!yt.hasOwnProperty(n)) a: {
				if (n[0] === "o" && n[1] === "n" && (i = n.endsWith("Capture"), t = n.slice(2, i ? n.length - 7 : void 0), a = e[ot] || null, a = a == null ? null : a[n], typeof a == "function" && e.removeEventListener(t, a, i), typeof r == "function")) {
					typeof a != "function" && a !== null && (n in e ? e[n] = null : e.hasAttribute(n) && e.removeAttribute(n)), e.addEventListener(t, r, i);
					break a;
				}
				n in e ? e[n] = r : !0 === r ? e.setAttribute(n, "") : V(e, n, r);
			}
		}
	}
	function gd(e, t, n) {
		switch (t) {
			case "div":
			case "span":
			case "svg":
			case "path":
			case "a":
			case "g":
			case "p":
			case "li": break;
			case "img":
				Z("error", e), Z("load", e);
				var r = !1, i = !1, a;
				for (a in n) if (n.hasOwnProperty(a)) {
					var s = n[a];
					if (s != null) switch (a) {
						case "src":
							r = !0;
							break;
						case "srcSet":
							i = !0;
							break;
						case "children":
						case "dangerouslySetInnerHTML": throw Error(o(137, t));
						default: Q(e, t, a, s, n, null);
					}
				}
				i && Q(e, t, "srcSet", n.srcSet, n, null), r && Q(e, t, "src", n.src, n, null);
				return;
			case "input":
				Z("invalid", e);
				var c = a = s = i = null, l = null, u = null;
				for (r in n) if (n.hasOwnProperty(r)) {
					var d = n[r];
					if (d != null) switch (r) {
						case "name":
							i = d;
							break;
						case "type":
							s = d;
							break;
						case "checked":
							l = d;
							break;
						case "defaultChecked":
							u = d;
							break;
						case "value":
							a = d;
							break;
						case "defaultValue":
							c = d;
							break;
						case "children":
						case "dangerouslySetInnerHTML":
							if (d != null) throw Error(o(137, t));
							break;
						default: Q(e, t, r, d, n, null);
					}
				}
				Lt(e, a, c, l, u, s, i, !1), jt(e);
				return;
			case "select":
				for (i in Z("invalid", e), r = s = a = null, n) if (n.hasOwnProperty(i) && (c = n[i], c != null)) switch (i) {
					case "value":
						a = c;
						break;
					case "defaultValue":
						s = c;
						break;
					case "multiple": r = c;
					default: Q(e, t, i, c, n, null);
				}
				t = a, n = s, e.multiple = !!r, t == null ? n != null && zt(e, !!r, n, !0) : zt(e, !!r, t, !1);
				return;
			case "textarea":
				for (s in Z("invalid", e), a = i = r = null, n) if (n.hasOwnProperty(s) && (c = n[s], c != null)) switch (s) {
					case "value":
						r = c;
						break;
					case "defaultValue":
						i = c;
						break;
					case "children":
						a = c;
						break;
					case "dangerouslySetInnerHTML":
						if (c != null) throw Error(o(91));
						break;
					default: Q(e, t, s, c, n, null);
				}
				Vt(e, r, i, a), jt(e);
				return;
			case "option":
				for (l in n) if (n.hasOwnProperty(l) && (r = n[l], r != null)) switch (l) {
					case "selected":
						e.selected = r && typeof r != "function" && typeof r != "symbol";
						break;
					default: Q(e, t, l, r, n, null);
				}
				return;
			case "dialog":
				Z("cancel", e), Z("close", e);
				break;
			case "iframe":
			case "object":
				Z("load", e);
				break;
			case "video":
			case "audio":
				for (r = 0; r < Qu.length; r++) Z(Qu[r], e);
				break;
			case "image":
				Z("error", e), Z("load", e);
				break;
			case "details":
				Z("toggle", e);
				break;
			case "embed":
			case "source":
			case "link": Z("error", e), Z("load", e);
			case "area":
			case "base":
			case "br":
			case "col":
			case "hr":
			case "keygen":
			case "meta":
			case "param":
			case "track":
			case "wbr":
			case "menuitem":
				for (u in n) if (n.hasOwnProperty(u) && (r = n[u], r != null)) switch (u) {
					case "children":
					case "dangerouslySetInnerHTML": throw Error(o(137, t));
					default: Q(e, t, u, r, n, null);
				}
				return;
			default: if (Wt(t)) {
				for (d in n) n.hasOwnProperty(d) && (r = n[d], r !== void 0 && hd(e, t, d, r, n, void 0));
				return;
			}
		}
		for (c in n) n.hasOwnProperty(c) && (r = n[c], r != null && Q(e, t, c, r, n, null));
	}
	function _d(e, t, n, r) {
		switch (t) {
			case "div":
			case "span":
			case "svg":
			case "path":
			case "a":
			case "g":
			case "p":
			case "li": break;
			case "input":
				var i = null, a = null, s = null, c = null, l = null, u = null, d = null;
				for (m in n) {
					var f = n[m];
					if (n.hasOwnProperty(m) && f != null) switch (m) {
						case "checked": break;
						case "value": break;
						case "defaultValue": l = f;
						default: r.hasOwnProperty(m) || Q(e, t, m, null, r, f);
					}
				}
				for (var p in r) {
					var m = r[p];
					if (f = n[p], r.hasOwnProperty(p) && (m != null || f != null)) switch (p) {
						case "type":
							a = m;
							break;
						case "name":
							i = m;
							break;
						case "checked":
							u = m;
							break;
						case "defaultChecked":
							d = m;
							break;
						case "value":
							s = m;
							break;
						case "defaultValue":
							c = m;
							break;
						case "children":
						case "dangerouslySetInnerHTML":
							if (m != null) throw Error(o(137, t));
							break;
						default: m !== f && Q(e, t, p, m, r, f);
					}
				}
				It(e, s, c, l, u, d, a, i);
				return;
			case "select":
				for (a in m = s = c = p = null, n) if (l = n[a], n.hasOwnProperty(a) && l != null) switch (a) {
					case "value": break;
					case "multiple": m = l;
					default: r.hasOwnProperty(a) || Q(e, t, a, null, r, l);
				}
				for (i in r) if (a = r[i], l = n[i], r.hasOwnProperty(i) && (a != null || l != null)) switch (i) {
					case "value":
						p = a;
						break;
					case "defaultValue":
						c = a;
						break;
					case "multiple": s = a;
					default: a !== l && Q(e, t, i, a, r, l);
				}
				t = c, n = s, r = m, p == null ? !!r != !!n && (t == null ? zt(e, !!n, n ? [] : "", !1) : zt(e, !!n, t, !0)) : zt(e, !!n, p, !1);
				return;
			case "textarea":
				for (c in m = p = null, n) if (i = n[c], n.hasOwnProperty(c) && i != null && !r.hasOwnProperty(c)) switch (c) {
					case "value": break;
					case "children": break;
					default: Q(e, t, c, null, r, i);
				}
				for (s in r) if (i = r[s], a = n[s], r.hasOwnProperty(s) && (i != null || a != null)) switch (s) {
					case "value":
						p = i;
						break;
					case "defaultValue":
						m = i;
						break;
					case "children": break;
					case "dangerouslySetInnerHTML":
						if (i != null) throw Error(o(91));
						break;
					default: i !== a && Q(e, t, s, i, r, a);
				}
				Bt(e, p, m);
				return;
			case "option":
				for (var h in n) if (p = n[h], n.hasOwnProperty(h) && p != null && !r.hasOwnProperty(h)) switch (h) {
					case "selected":
						e.selected = !1;
						break;
					default: Q(e, t, h, null, r, p);
				}
				for (l in r) if (p = r[l], m = n[l], r.hasOwnProperty(l) && p !== m && (p != null || m != null)) switch (l) {
					case "selected":
						e.selected = p && typeof p != "function" && typeof p != "symbol";
						break;
					default: Q(e, t, l, p, r, m);
				}
				return;
			case "img":
			case "link":
			case "area":
			case "base":
			case "br":
			case "col":
			case "embed":
			case "hr":
			case "keygen":
			case "meta":
			case "param":
			case "source":
			case "track":
			case "wbr":
			case "menuitem":
				for (var g in n) p = n[g], n.hasOwnProperty(g) && p != null && !r.hasOwnProperty(g) && Q(e, t, g, null, r, p);
				for (u in r) if (p = r[u], m = n[u], r.hasOwnProperty(u) && p !== m && (p != null || m != null)) switch (u) {
					case "children":
					case "dangerouslySetInnerHTML":
						if (p != null) throw Error(o(137, t));
						break;
					default: Q(e, t, u, p, r, m);
				}
				return;
			default: if (Wt(t)) {
				for (var _ in n) p = n[_], n.hasOwnProperty(_) && p !== void 0 && !r.hasOwnProperty(_) && hd(e, t, _, void 0, r, p);
				for (d in r) p = r[d], m = n[d], !r.hasOwnProperty(d) || p === m || p === void 0 && m === void 0 || hd(e, t, d, p, r, m);
				return;
			}
		}
		for (var v in n) p = n[v], n.hasOwnProperty(v) && p != null && !r.hasOwnProperty(v) && Q(e, t, v, null, r, p);
		for (f in r) p = r[f], m = n[f], !r.hasOwnProperty(f) || p === m || p == null && m == null || Q(e, t, f, p, r, m);
	}
	var vd = null, yd = null;
	function bd(e) {
		return e.nodeType === 9 ? e : e.ownerDocument;
	}
	function xd(e) {
		switch (e) {
			case "http://www.w3.org/2000/svg": return 1;
			case "http://www.w3.org/1998/Math/MathML": return 2;
			default: return 0;
		}
	}
	function Sd(e, t) {
		if (e === 0) switch (t) {
			case "svg": return 1;
			case "math": return 2;
			default: return 0;
		}
		return e === 1 && t === "foreignObject" ? 0 : e;
	}
	function Cd(e, t) {
		return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
	}
	var wd = null;
	function Td() {
		var e = window.event;
		return e && e.type === "popstate" ? e === wd ? !1 : (wd = e, !0) : (wd = null, !1);
	}
	var Ed = typeof setTimeout == "function" ? setTimeout : void 0, Dd = typeof clearTimeout == "function" ? clearTimeout : void 0, Od = typeof Promise == "function" ? Promise : void 0, kd = typeof queueMicrotask == "function" ? queueMicrotask : Od === void 0 ? Ed : function(e) {
		return Od.resolve(null).then(e).catch(Ad);
	};
	function Ad(e) {
		setTimeout(function() {
			throw e;
		});
	}
	function jd(e, t) {
		var n = t, r = 0;
		do {
			var i = n.nextSibling;
			if (e.removeChild(n), i && i.nodeType === 8) if (n = i.data, n === "/$") {
				if (r === 0) {
					e.removeChild(i), ip(t);
					return;
				}
				r--;
			} else n !== "$" && n !== "$?" && n !== "$!" || r++;
			n = i;
		} while (n);
		ip(t);
	}
	function Md(e) {
		var t = e.firstChild;
		for (t && t.nodeType === 10 && (t = t.nextSibling); t;) {
			var n = t;
			switch (t = t.nextSibling, n.nodeName) {
				case "HTML":
				case "HEAD":
				case "BODY":
					Md(n), ft(n);
					continue;
				case "SCRIPT":
				case "STYLE": continue;
				case "LINK": if (n.rel.toLowerCase() === "stylesheet") continue;
			}
			e.removeChild(n);
		}
	}
	function Nd(e, t, n, r) {
		for (; e.nodeType === 1;) {
			var i = n;
			if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
				if (!r && (e.nodeName !== "INPUT" || e.type !== "hidden")) break;
			} else if (!r) if (t === "input" && e.type === "hidden") {
				var a = i.name == null ? null : "" + i.name;
				if (i.type === "hidden" && e.getAttribute("name") === a) return e;
			} else return e;
			else if (!e[dt]) switch (t) {
				case "meta":
					if (!e.hasAttribute("itemprop")) break;
					return e;
				case "link":
					if (a = e.getAttribute("rel"), a === "stylesheet" && e.hasAttribute("data-precedence") || a !== i.rel || e.getAttribute("href") !== (i.href == null ? null : i.href) || e.getAttribute("crossorigin") !== (i.crossOrigin == null ? null : i.crossOrigin) || e.getAttribute("title") !== (i.title == null ? null : i.title)) break;
					return e;
				case "style":
					if (e.hasAttribute("data-precedence")) break;
					return e;
				case "script":
					if (a = e.getAttribute("src"), (a !== (i.src == null ? null : i.src) || e.getAttribute("type") !== (i.type == null ? null : i.type) || e.getAttribute("crossorigin") !== (i.crossOrigin == null ? null : i.crossOrigin)) && a && e.hasAttribute("async") && !e.hasAttribute("itemprop")) break;
					return e;
				default: return e;
			}
			if (e = Fd(e.nextSibling), e === null) break;
		}
		return null;
	}
	function Pd(e, t, n) {
		if (t === "") return null;
		for (; e.nodeType !== 3;) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !n || (e = Fd(e.nextSibling), e === null)) return null;
		return e;
	}
	function Fd(e) {
		for (; e != null; e = e.nextSibling) {
			var t = e.nodeType;
			if (t === 1 || t === 3) break;
			if (t === 8) {
				if (t = e.data, t === "$" || t === "$!" || t === "$?" || t === "F!" || t === "F") break;
				if (t === "/$") return null;
			}
		}
		return e;
	}
	function Id(e) {
		e = e.previousSibling;
		for (var t = 0; e;) {
			if (e.nodeType === 8) {
				var n = e.data;
				if (n === "$" || n === "$!" || n === "$?") {
					if (t === 0) return e;
					t--;
				} else n === "/$" && t++;
			}
			e = e.previousSibling;
		}
		return null;
	}
	function Ld(e, t, n) {
		switch (t = bd(n), e) {
			case "html":
				if (e = t.documentElement, !e) throw Error(o(452));
				return e;
			case "head":
				if (e = t.head, !e) throw Error(o(453));
				return e;
			case "body":
				if (e = t.body, !e) throw Error(o(454));
				return e;
			default: throw Error(o(451));
		}
	}
	var Rd = /* @__PURE__ */ new Map(), zd = /* @__PURE__ */ new Set();
	function Bd(e) {
		return typeof e.getRootNode == "function" ? e.getRootNode() : e.ownerDocument;
	}
	var Vd = R.d;
	R.d = {
		f: Hd,
		r: Ud,
		D: Kd,
		C: qd,
		L: Jd,
		m: Yd,
		X: Zd,
		S: Xd,
		M: Qd
	};
	function Hd() {
		var e = Vd.f(), t = au();
		return e || t;
	}
	function Ud(e) {
		var t = mt(e);
		t !== null && t.tag === 5 && t.type === "form" ? Po(t) : Vd.r(e);
	}
	var Wd = typeof document > "u" ? null : document;
	function Gd(e, t, n) {
		var r = Wd;
		if (r && typeof t == "string" && t) {
			var i = Ft(t);
			i = "link[rel=\"" + e + "\"][href=\"" + i + "\"]", typeof n == "string" && (i += "[crossorigin=\"" + n + "\"]"), zd.has(i) || (zd.add(i), e = {
				rel: e,
				crossOrigin: n,
				href: t
			}, r.querySelector(i) === null && (t = r.createElement("link"), gd(t, "link", e), _t(t), r.head.appendChild(t)));
		}
	}
	function Kd(e) {
		Vd.D(e), Gd("dns-prefetch", e, null);
	}
	function qd(e, t) {
		Vd.C(e, t), Gd("preconnect", e, t);
	}
	function Jd(e, t, n) {
		Vd.L(e, t, n);
		var r = Wd;
		if (r && e && t) {
			var i = "link[rel=\"preload\"][as=\"" + Ft(t) + "\"]";
			t === "image" && n && n.imageSrcSet ? (i += "[imagesrcset=\"" + Ft(n.imageSrcSet) + "\"]", typeof n.imageSizes == "string" && (i += "[imagesizes=\"" + Ft(n.imageSizes) + "\"]")) : i += "[href=\"" + Ft(e) + "\"]";
			var a = i;
			switch (t) {
				case "style":
					a = ef(e);
					break;
				case "script": a = af(e);
			}
			Rd.has(a) || (e = A({
				rel: "preload",
				href: t === "image" && n && n.imageSrcSet ? void 0 : e,
				as: t
			}, n), Rd.set(a, e), r.querySelector(i) !== null || t === "style" && r.querySelector(tf(a)) || t === "script" && r.querySelector(of(a)) || (t = r.createElement("link"), gd(t, "link", e), _t(t), r.head.appendChild(t)));
		}
	}
	function Yd(e, t) {
		Vd.m(e, t);
		var n = Wd;
		if (n && e) {
			var r = t && typeof t.as == "string" ? t.as : "script", i = "link[rel=\"modulepreload\"][as=\"" + Ft(r) + "\"][href=\"" + Ft(e) + "\"]", a = i;
			switch (r) {
				case "audioworklet":
				case "paintworklet":
				case "serviceworker":
				case "sharedworker":
				case "worker":
				case "script": a = af(e);
			}
			if (!Rd.has(a) && (e = A({
				rel: "modulepreload",
				href: e
			}, t), Rd.set(a, e), n.querySelector(i) === null)) {
				switch (r) {
					case "audioworklet":
					case "paintworklet":
					case "serviceworker":
					case "sharedworker":
					case "worker":
					case "script": if (n.querySelector(of(a))) return;
				}
				r = n.createElement("link"), gd(r, "link", e), _t(r), n.head.appendChild(r);
			}
		}
	}
	function Xd(e, t, n) {
		Vd.S(e, t, n);
		var r = Wd;
		if (r && e) {
			var i = gt(r).hoistableStyles, a = ef(e);
			t ||= "default";
			var o = i.get(a);
			if (!o) {
				var s = {
					loading: 0,
					preload: null
				};
				if (o = r.querySelector(tf(a))) s.loading = 5;
				else {
					e = A({
						rel: "stylesheet",
						href: e,
						"data-precedence": t
					}, n), (n = Rd.get(a)) && lf(e, n);
					var c = o = r.createElement("link");
					_t(c), gd(c, "link", e), c._p = new Promise(function(e, t) {
						c.onload = e, c.onerror = t;
					}), c.addEventListener("load", function() {
						s.loading |= 1;
					}), c.addEventListener("error", function() {
						s.loading |= 2;
					}), s.loading |= 4, cf(o, t, r);
				}
				o = {
					type: "stylesheet",
					instance: o,
					count: 1,
					state: s
				}, i.set(a, o);
			}
		}
	}
	function Zd(e, t) {
		Vd.X(e, t);
		var n = Wd;
		if (n && e) {
			var r = gt(n).hoistableScripts, i = af(e), a = r.get(i);
			a || (a = n.querySelector(of(i)), a || (e = A({
				src: e,
				async: !0
			}, t), (t = Rd.get(i)) && uf(e, t), a = n.createElement("script"), _t(a), gd(a, "link", e), n.head.appendChild(a)), a = {
				type: "script",
				instance: a,
				count: 1,
				state: null
			}, r.set(i, a));
		}
	}
	function Qd(e, t) {
		Vd.M(e, t);
		var n = Wd;
		if (n && e) {
			var r = gt(n).hoistableScripts, i = af(e), a = r.get(i);
			a || (a = n.querySelector(of(i)), a || (e = A({
				src: e,
				async: !0,
				type: "module"
			}, t), (t = Rd.get(i)) && uf(e, t), a = n.createElement("script"), _t(a), gd(a, "link", e), n.head.appendChild(a)), a = {
				type: "script",
				instance: a,
				count: 1,
				state: null
			}, r.set(i, a));
		}
	}
	function $d(e, t, n, r) {
		var i = (i = me.current) ? Bd(i) : null;
		if (!i) throw Error(o(446));
		switch (e) {
			case "meta":
			case "title": return null;
			case "style": return typeof n.precedence == "string" && typeof n.href == "string" ? (t = ef(n.href), n = gt(i).hoistableStyles, r = n.get(t), r || (r = {
				type: "style",
				instance: null,
				count: 0,
				state: null
			}, n.set(t, r)), r) : {
				type: "void",
				instance: null,
				count: 0,
				state: null
			};
			case "link":
				if (n.rel === "stylesheet" && typeof n.href == "string" && typeof n.precedence == "string") {
					e = ef(n.href);
					var a = gt(i).hoistableStyles, s = a.get(e);
					if (s || (i = i.ownerDocument || i, s = {
						type: "stylesheet",
						instance: null,
						count: 0,
						state: {
							loading: 0,
							preload: null
						}
					}, a.set(e, s), (a = i.querySelector(tf(e))) && !a._p && (s.instance = a, s.state.loading = 5), Rd.has(e) || (n = {
						rel: "preload",
						as: "style",
						href: n.href,
						crossOrigin: n.crossOrigin,
						integrity: n.integrity,
						media: n.media,
						hrefLang: n.hrefLang,
						referrerPolicy: n.referrerPolicy
					}, Rd.set(e, n), a || rf(i, e, n, s.state))), t && r === null) throw Error(o(528, ""));
					return s;
				}
				if (t && r !== null) throw Error(o(529, ""));
				return null;
			case "script": return t = n.async, n = n.src, typeof n == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = af(n), n = gt(i).hoistableScripts, r = n.get(t), r || (r = {
				type: "script",
				instance: null,
				count: 0,
				state: null
			}, n.set(t, r)), r) : {
				type: "void",
				instance: null,
				count: 0,
				state: null
			};
			default: throw Error(o(444, e));
		}
	}
	function ef(e) {
		return "href=\"" + Ft(e) + "\"";
	}
	function tf(e) {
		return "link[rel=\"stylesheet\"][" + e + "]";
	}
	function nf(e) {
		return A({}, e, {
			"data-precedence": e.precedence,
			precedence: null
		});
	}
	function rf(e, t, n, r) {
		e.querySelector("link[rel=\"preload\"][as=\"style\"][" + t + "]") ? r.loading = 1 : (t = e.createElement("link"), r.preload = t, t.addEventListener("load", function() {
			return r.loading |= 1;
		}), t.addEventListener("error", function() {
			return r.loading |= 2;
		}), gd(t, "link", n), _t(t), e.head.appendChild(t));
	}
	function af(e) {
		return "[src=\"" + Ft(e) + "\"]";
	}
	function of(e) {
		return "script[async]" + e;
	}
	function sf(e, t, n) {
		if (t.count++, t.instance === null) switch (t.type) {
			case "style":
				var r = e.querySelector("style[data-href~=\"" + Ft(n.href) + "\"]");
				if (r) return t.instance = r, _t(r), r;
				var i = A({}, n, {
					"data-href": n.href,
					"data-precedence": n.precedence,
					href: null,
					precedence: null
				});
				return r = (e.ownerDocument || e).createElement("style"), _t(r), gd(r, "style", i), cf(r, n.precedence, e), t.instance = r;
			case "stylesheet":
				i = ef(n.href);
				var a = e.querySelector(tf(i));
				if (a) return t.state.loading |= 4, t.instance = a, _t(a), a;
				r = nf(n), (i = Rd.get(i)) && lf(r, i), a = (e.ownerDocument || e).createElement("link"), _t(a);
				var s = a;
				return s._p = new Promise(function(e, t) {
					s.onload = e, s.onerror = t;
				}), gd(a, "link", r), t.state.loading |= 4, cf(a, n.precedence, e), t.instance = a;
			case "script": return a = af(n.src), (i = e.querySelector(of(a))) ? (t.instance = i, _t(i), i) : (r = n, (i = Rd.get(a)) && (r = A({}, n), uf(r, i)), e = e.ownerDocument || e, i = e.createElement("script"), _t(i), gd(i, "link", r), e.head.appendChild(i), t.instance = i);
			case "void": return null;
			default: throw Error(o(443, t.type));
		}
		else t.type === "stylesheet" && !(t.state.loading & 4) && (r = t.instance, t.state.loading |= 4, cf(r, n.precedence, e));
		return t.instance;
	}
	function cf(e, t, n) {
		for (var r = n.querySelectorAll("link[rel=\"stylesheet\"][data-precedence],style[data-precedence]"), i = r.length ? r[r.length - 1] : null, a = i, o = 0; o < r.length; o++) {
			var s = r[o];
			if (s.dataset.precedence === t) a = s;
			else if (a !== i) break;
		}
		a ? a.parentNode.insertBefore(e, a.nextSibling) : (t = n.nodeType === 9 ? n.head : n, t.insertBefore(e, t.firstChild));
	}
	function lf(e, t) {
		e.crossOrigin ??= t.crossOrigin, e.referrerPolicy ??= t.referrerPolicy, e.title ??= t.title;
	}
	function uf(e, t) {
		e.crossOrigin ??= t.crossOrigin, e.referrerPolicy ??= t.referrerPolicy, e.integrity ??= t.integrity;
	}
	var df = null;
	function ff(e, t, n) {
		if (df === null) {
			var r = /* @__PURE__ */ new Map(), i = df = /* @__PURE__ */ new Map();
			i.set(n, r);
		} else i = df, r = i.get(n), r || (r = /* @__PURE__ */ new Map(), i.set(n, r));
		if (r.has(e)) return r;
		for (r.set(e, null), n = n.getElementsByTagName(e), i = 0; i < n.length; i++) {
			var a = n[i];
			if (!(a[dt] || a[at] || e === "link" && a.getAttribute("rel") === "stylesheet") && a.namespaceURI !== "http://www.w3.org/2000/svg") {
				var o = a.getAttribute(t) || "";
				o = e + o;
				var s = r.get(o);
				s ? s.push(a) : r.set(o, [a]);
			}
		}
		return r;
	}
	function pf(e, t, n) {
		e = e.ownerDocument || e, e.head.insertBefore(n, t === "title" ? e.querySelector("head > title") : null);
	}
	function mf(e, t, n) {
		if (n === 1 || t.itemProp != null) return !1;
		switch (e) {
			case "meta":
			case "title": return !0;
			case "style":
				if (typeof t.precedence != "string" || typeof t.href != "string" || t.href === "") break;
				return !0;
			case "link":
				if (typeof t.rel != "string" || typeof t.href != "string" || t.href === "" || t.onLoad || t.onError) break;
				switch (t.rel) {
					case "stylesheet": return e = t.disabled, typeof t.precedence == "string" && e == null;
					default: return !0;
				}
			case "script": if (t.async && typeof t.async != "function" && typeof t.async != "symbol" && !t.onLoad && !t.onError && t.src && typeof t.src == "string") return !0;
		}
		return !1;
	}
	function hf(e) {
		return !(e.type === "stylesheet" && !(e.state.loading & 3));
	}
	var gf = null;
	function _f() {}
	function vf(e, t, n) {
		if (gf === null) throw Error(o(475));
		var r = gf;
		if (t.type === "stylesheet" && (typeof n.media != "string" || !1 !== matchMedia(n.media).matches) && !(t.state.loading & 4)) {
			if (t.instance === null) {
				var i = ef(n.href), a = e.querySelector(tf(i));
				if (a) {
					e = a._p, typeof e == "object" && e && typeof e.then == "function" && (r.count++, r = bf.bind(r), e.then(r, r)), t.state.loading |= 4, t.instance = a, _t(a);
					return;
				}
				a = e.ownerDocument || e, n = nf(n), (i = Rd.get(i)) && lf(n, i), a = a.createElement("link"), _t(a);
				var s = a;
				s._p = new Promise(function(e, t) {
					s.onload = e, s.onerror = t;
				}), gd(a, "link", n), t.instance = a;
			}
			r.stylesheets === null && (r.stylesheets = /* @__PURE__ */ new Map()), r.stylesheets.set(t, e), (e = t.state.preload) && !(t.state.loading & 3) && (r.count++, t = bf.bind(r), e.addEventListener("load", t), e.addEventListener("error", t));
		}
	}
	function yf() {
		if (gf === null) throw Error(o(475));
		var e = gf;
		return e.stylesheets && e.count === 0 && Sf(e, e.stylesheets), 0 < e.count ? function(t) {
			var n = setTimeout(function() {
				if (e.stylesheets && Sf(e, e.stylesheets), e.unsuspend) {
					var t = e.unsuspend;
					e.unsuspend = null, t();
				}
			}, 6e4);
			return e.unsuspend = t, function() {
				e.unsuspend = null, clearTimeout(n);
			};
		} : null;
	}
	function bf() {
		if (this.count--, this.count === 0) {
			if (this.stylesheets) Sf(this, this.stylesheets);
			else if (this.unsuspend) {
				var e = this.unsuspend;
				this.unsuspend = null, e();
			}
		}
	}
	var xf = null;
	function Sf(e, t) {
		e.stylesheets = null, e.unsuspend !== null && (e.count++, xf = /* @__PURE__ */ new Map(), t.forEach(Cf, e), xf = null, bf.call(e));
	}
	function Cf(e, t) {
		if (!(t.state.loading & 4)) {
			var n = xf.get(e);
			if (n) var r = n.get(null);
			else {
				n = /* @__PURE__ */ new Map(), xf.set(e, n);
				for (var i = e.querySelectorAll("link[data-precedence],style[data-precedence]"), a = 0; a < i.length; a++) {
					var o = i[a];
					(o.nodeName === "LINK" || o.getAttribute("media") !== "not all") && (n.set(o.dataset.precedence, o), r = o);
				}
				r && n.set(null, r);
			}
			i = t.instance, o = i.getAttribute("data-precedence"), a = n.get(o) || r, a === r && n.set(null, i), n.set(o, i), this.count++, r = bf.bind(this), i.addEventListener("load", r), i.addEventListener("error", r), a ? a.parentNode.insertBefore(i, a.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(i, e.firstChild)), t.state.loading |= 4;
		}
	}
	var wf = {
		$$typeof: _,
		Provider: null,
		Consumer: null,
		_currentValue: oe,
		_currentValue2: oe,
		_threadCount: 0
	};
	function Tf(e, t, n, r, i, a, o, s) {
		this.tag = 1, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Xe(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.finishedLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Xe(0), this.hiddenUpdates = Xe(null), this.identifierPrefix = r, this.onUncaughtError = i, this.onCaughtError = a, this.onRecoverableError = o, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = s, this.incompleteTransitions = /* @__PURE__ */ new Map();
	}
	function Ef(e, t, n, r, i, a, o, s, c, l, u, d) {
		return e = new Tf(e, t, n, o, s, c, l, d), t = 1, !0 === a && (t |= 24), a = ol(3, null, null, t), e.current = a, a.stateNode = e, t = oa(), t.refCount++, e.pooledCache = t, t.refCount++, a.memoizedState = {
			element: r,
			isDehydrated: n,
			cache: t
		}, Qs(a), e;
	}
	function Df(e) {
		return e ? (e = $r, e) : $r;
	}
	function Of(e, t, n, r, i, a) {
		i = Df(i), r.context === null ? r.context = i : r.pendingContext = i, r = ec(t), r.payload = { element: n }, a = a === void 0 ? null : a, a !== null && (r.callback = a), n = tc(e, r, t), n !== null && (eu(n, e, t), nc(n, e, t));
	}
	function kf(e, t) {
		if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
			var n = e.retryLane;
			e.retryLane = n !== 0 && n < t ? n : t;
		}
	}
	function Af(e, t) {
		kf(e, t), (e = e.alternate) && kf(e, t);
	}
	function jf(e) {
		if (e.tag === 13) {
			var t = Xr(e, 67108864);
			t !== null && eu(t, e, 67108864), Af(e, 67108864);
		}
	}
	var Mf = !0;
	function Nf(e, t, n, r) {
		var i = k.T;
		k.T = null;
		var a = R.p;
		try {
			R.p = 2, Ff(e, t, n, r);
		} finally {
			R.p = a, k.T = i;
		}
	}
	function Pf(e, t, n, r) {
		var i = k.T;
		k.T = null;
		var a = R.p;
		try {
			R.p = 8, Ff(e, t, n, r);
		} finally {
			R.p = a, k.T = i;
		}
	}
	function Ff(e, t, n, r) {
		if (Mf) {
			var i = If(r);
			if (i === null) ad(e, t, r, Lf, n), Jf(e, r);
			else if (Xf(i, e, t, n, r)) r.stopPropagation();
			else if (Jf(e, r), t & 4 && -1 < qf.indexOf(e)) {
				for (; i !== null;) {
					var a = mt(i);
					if (a !== null) switch (a.tag) {
						case 3:
							if (a = a.stateNode, a.current.memoizedState.isDehydrated) {
								var o = We(a.pendingLanes);
								if (o !== 0) {
									var s = a;
									for (s.pendingLanes |= 2, s.entangledLanes |= 2; o;) {
										var c = 1 << 31 - Re(o);
										s.entanglements[1] |= c, o &= ~c;
									}
									zu(a), !(Tl & 6) && (Hl = Te() + 500, Bu(0, !1));
								}
							}
							break;
						case 13: s = Xr(a, 2), s !== null && eu(s, a, 2), au(), Af(a, 2);
					}
					if (a = If(r), a === null && ad(e, t, r, Lf, n), a === i) break;
					i = a;
				}
				i !== null && r.stopPropagation();
			} else ad(e, t, r, null, n);
		}
	}
	function If(e) {
		return e = Yt(e), Rf(e);
	}
	var Lf = null;
	function Rf(e) {
		if (Lf = null, e = pt(e), e !== null) {
			var t = te(e);
			if (t === null) e = null;
			else {
				var n = t.tag;
				if (n === 13) {
					if (e = ne(t), e !== null) return e;
					e = null;
				} else if (n === 3) {
					if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
					e = null;
				} else t !== e && (e = null);
			}
		}
		return Lf = e, null;
	}
	function zf(e) {
		switch (e) {
			case "beforetoggle":
			case "cancel":
			case "click":
			case "close":
			case "contextmenu":
			case "copy":
			case "cut":
			case "auxclick":
			case "dblclick":
			case "dragend":
			case "dragstart":
			case "drop":
			case "focusin":
			case "focusout":
			case "input":
			case "invalid":
			case "keydown":
			case "keypress":
			case "keyup":
			case "mousedown":
			case "mouseup":
			case "paste":
			case "pause":
			case "play":
			case "pointercancel":
			case "pointerdown":
			case "pointerup":
			case "ratechange":
			case "reset":
			case "resize":
			case "seeked":
			case "submit":
			case "toggle":
			case "touchcancel":
			case "touchend":
			case "touchstart":
			case "volumechange":
			case "change":
			case "selectionchange":
			case "textInput":
			case "compositionstart":
			case "compositionend":
			case "compositionupdate":
			case "beforeblur":
			case "afterblur":
			case "beforeinput":
			case "blur":
			case "fullscreenchange":
			case "focus":
			case "hashchange":
			case "popstate":
			case "select":
			case "selectstart": return 2;
			case "drag":
			case "dragenter":
			case "dragexit":
			case "dragleave":
			case "dragover":
			case "mousemove":
			case "mouseout":
			case "mouseover":
			case "pointermove":
			case "pointerout":
			case "pointerover":
			case "scroll":
			case "touchmove":
			case "wheel":
			case "mouseenter":
			case "mouseleave":
			case "pointerenter":
			case "pointerleave": return 8;
			case "message": switch (Ee()) {
				case De: return 2;
				case Oe: return 8;
				case ke:
				case Ae: return 32;
				case je: return 268435456;
				default: return 32;
			}
			default: return 32;
		}
	}
	var Bf = !1, Vf = null, Hf = null, Uf = null, Wf = /* @__PURE__ */ new Map(), Gf = /* @__PURE__ */ new Map(), Kf = [], qf = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");
	function Jf(e, t) {
		switch (e) {
			case "focusin":
			case "focusout":
				Vf = null;
				break;
			case "dragenter":
			case "dragleave":
				Hf = null;
				break;
			case "mouseover":
			case "mouseout":
				Uf = null;
				break;
			case "pointerover":
			case "pointerout":
				Wf.delete(t.pointerId);
				break;
			case "gotpointercapture":
			case "lostpointercapture": Gf.delete(t.pointerId);
		}
	}
	function Yf(e, t, n, r, i, a) {
		return e === null || e.nativeEvent !== a ? (e = {
			blockedOn: t,
			domEventName: n,
			eventSystemFlags: r,
			nativeEvent: a,
			targetContainers: [i]
		}, t !== null && (t = mt(t), t !== null && jf(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, i !== null && t.indexOf(i) === -1 && t.push(i), e);
	}
	function Xf(e, t, n, r, i) {
		switch (t) {
			case "focusin": return Vf = Yf(Vf, e, t, n, r, i), !0;
			case "dragenter": return Hf = Yf(Hf, e, t, n, r, i), !0;
			case "mouseover": return Uf = Yf(Uf, e, t, n, r, i), !0;
			case "pointerover":
				var a = i.pointerId;
				return Wf.set(a, Yf(Wf.get(a) || null, e, t, n, r, i)), !0;
			case "gotpointercapture": return a = i.pointerId, Gf.set(a, Yf(Gf.get(a) || null, e, t, n, r, i)), !0;
		}
		return !1;
	}
	function Zf(e) {
		var t = pt(e.target);
		if (t !== null) {
			var n = te(t);
			if (n !== null) {
				if (t = n.tag, t === 13) {
					if (t = ne(n), t !== null) {
						e.blockedOn = t, rt(e.priority, function() {
							if (n.tag === 13) {
								var e = Ql(), t = Xr(n, e);
								t !== null && eu(t, n, e), Af(n, e);
							}
						});
						return;
					}
				} else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
					e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
					return;
				}
			}
		}
		e.blockedOn = null;
	}
	function Qf(e) {
		if (e.blockedOn !== null) return !1;
		for (var t = e.targetContainers; 0 < t.length;) {
			var n = If(e.nativeEvent);
			if (n === null) {
				n = e.nativeEvent;
				var r = new n.constructor(n.type, n);
				Jt = r, n.target.dispatchEvent(r), Jt = null;
			} else return t = mt(n), t !== null && jf(t), e.blockedOn = n, !1;
			t.shift();
		}
		return !0;
	}
	function $f(e, t, n) {
		Qf(e) && n.delete(t);
	}
	function ep() {
		Bf = !1, Vf !== null && Qf(Vf) && (Vf = null), Hf !== null && Qf(Hf) && (Hf = null), Uf !== null && Qf(Uf) && (Uf = null), Wf.forEach($f), Gf.forEach($f);
	}
	function tp(e, n) {
		e.blockedOn === n && (e.blockedOn = null, Bf || (Bf = !0, t.unstable_scheduleCallback(t.unstable_NormalPriority, ep)));
	}
	var np = null;
	function rp(e) {
		np !== e && (np = e, t.unstable_scheduleCallback(t.unstable_NormalPriority, function() {
			np === e && (np = null);
			for (var t = 0; t < e.length; t += 3) {
				var n = e[t], r = e[t + 1], i = e[t + 2];
				if (typeof r != "function") {
					if (Rf(r || n) === null) continue;
					break;
				}
				var a = mt(n);
				a !== null && (e.splice(t, 3), t -= 3, Mo(a, {
					pending: !0,
					data: i,
					method: n.method,
					action: r
				}, r, i));
			}
		}));
	}
	function ip(e) {
		function t(t) {
			return tp(t, e);
		}
		Vf !== null && tp(Vf, e), Hf !== null && tp(Hf, e), Uf !== null && tp(Uf, e), Wf.forEach(t), Gf.forEach(t);
		for (var n = 0; n < Kf.length; n++) {
			var r = Kf[n];
			r.blockedOn === e && (r.blockedOn = null);
		}
		for (; 0 < Kf.length && (n = Kf[0], n.blockedOn === null);) Zf(n), n.blockedOn === null && Kf.shift();
		if (n = (e.ownerDocument || e).$$reactFormReplay, n != null) for (r = 0; r < n.length; r += 3) {
			var i = n[r], a = n[r + 1], o = i[ot] || null;
			if (typeof a == "function") o || rp(n);
			else if (o) {
				var s = null;
				if (a && a.hasAttribute("formAction")) {
					if (i = a, o = a[ot] || null) s = o.formAction;
					else if (Rf(i) !== null) continue;
				} else s = o.action;
				typeof s == "function" ? n[r + 1] = s : (n.splice(r, 3), r -= 3), rp(n);
			}
		}
	}
	function ap(e) {
		this._internalRoot = e;
	}
	op.prototype.render = ap.prototype.render = function(e) {
		var t = this._internalRoot;
		if (t === null) throw Error(o(409));
		var n = t.current;
		Of(n, Ql(), e, t, null, null);
	}, op.prototype.unmount = ap.prototype.unmount = function() {
		var e = this._internalRoot;
		if (e !== null) {
			this._internalRoot = null;
			var t = e.containerInfo;
			e.tag === 0 && wu(), Of(e.current, 2, null, e, null, null), au(), t[st] = null;
		}
	};
	function op(e) {
		this._internalRoot = e;
	}
	op.prototype.unstable_scheduleHydration = function(e) {
		if (e) {
			var t = nt();
			e = {
				blockedOn: null,
				target: e,
				priority: t
			};
			for (var n = 0; n < Kf.length && t !== 0 && t < Kf[n].priority; n++);
			Kf.splice(n, 0, e), n === 0 && Zf(e);
		}
	};
	var sp = n.version;
	if (sp !== "19.0.0") throw Error(o(527, sp, "19.0.0"));
	R.findDOMNode = function(e) {
		var t = e._reactInternals;
		if (t === void 0) throw typeof e.render == "function" ? Error(o(188)) : (e = Object.keys(e).join(","), Error(o(268, e)));
		return e = ie(t), e = e === null ? null : ae(e), e = e === null ? null : e.stateNode, e;
	};
	var cp = {
		bundleType: 0,
		version: "19.0.0",
		rendererPackageName: "react-dom",
		currentDispatcherRef: k,
		findFiberByHostInstance: pt,
		reconcilerVersion: "19.0.0"
	};
	if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
		var lp = __REACT_DEVTOOLS_GLOBAL_HOOK__;
		if (!lp.isDisabled && lp.supportsFiber) try {
			Pe = lp.inject(cp), Fe = lp;
		} catch {}
	}
	e.createRoot = function(e, t) {
		if (!c(e)) throw Error(o(299));
		var n = !1, r = "", i = ns, a = rs, s = is, l = null;
		return t != null && (!0 === t.unstable_strictMode && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onUncaughtError !== void 0 && (i = t.onUncaughtError), t.onCaughtError !== void 0 && (a = t.onCaughtError), t.onRecoverableError !== void 0 && (s = t.onRecoverableError), t.unstable_transitionCallbacks !== void 0 && (l = t.unstable_transitionCallbacks)), t = Ef(e, 1, !1, null, null, n, r, i, a, s, l, null), e[st] = t.current, rd(e.nodeType === 8 ? e.parentNode : e), new ap(t);
	};
})), l = /* @__PURE__ */ e((/* @__PURE__ */ t(((e, t) => {
	function n() {
		if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
			__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
		} catch (e) {
			console.error(e);
		}
	}
	n(), t.exports = c();
})))()), u = /* @__PURE__ */ e(r(), 1), d = /* @__PURE__ */ e(s(), 1);
function f(e) {
	if (!e || typeof document > "u") return;
	let t = document.head || document.getElementsByTagName("head")[0], n = document.createElement("style");
	n.type = "text/css", t.appendChild(n), n.styleSheet ? n.styleSheet.cssText = e : n.appendChild(document.createTextNode(e));
}
var p = (e) => {
	switch (e) {
		case "success": return g;
		case "info": return v;
		case "warning": return _;
		case "error": return y;
		default: return null;
	}
}, m = Array(12).fill(0), h = ({ visible: e, className: t }) => /* @__PURE__ */ u.createElement("div", {
	className: ["sonner-loading-wrapper", t].filter(Boolean).join(" "),
	"data-visible": e
}, /* @__PURE__ */ u.createElement("div", { className: "sonner-spinner" }, m.map((e, t) => /* @__PURE__ */ u.createElement("div", {
	className: "sonner-loading-bar",
	key: `spinner-bar-${t}`
})))), g = /* @__PURE__ */ u.createElement("svg", {
	xmlns: "http://www.w3.org/2000/svg",
	viewBox: "0 0 20 20",
	fill: "currentColor",
	height: "20",
	width: "20"
}, /* @__PURE__ */ u.createElement("path", {
	fillRule: "evenodd",
	d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z",
	clipRule: "evenodd"
})), _ = /* @__PURE__ */ u.createElement("svg", {
	xmlns: "http://www.w3.org/2000/svg",
	viewBox: "0 0 24 24",
	fill: "currentColor",
	height: "20",
	width: "20"
}, /* @__PURE__ */ u.createElement("path", {
	fillRule: "evenodd",
	d: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z",
	clipRule: "evenodd"
})), v = /* @__PURE__ */ u.createElement("svg", {
	xmlns: "http://www.w3.org/2000/svg",
	viewBox: "0 0 20 20",
	fill: "currentColor",
	height: "20",
	width: "20"
}, /* @__PURE__ */ u.createElement("path", {
	fillRule: "evenodd",
	d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z",
	clipRule: "evenodd"
})), y = /* @__PURE__ */ u.createElement("svg", {
	xmlns: "http://www.w3.org/2000/svg",
	viewBox: "0 0 20 20",
	fill: "currentColor",
	height: "20",
	width: "20"
}, /* @__PURE__ */ u.createElement("path", {
	fillRule: "evenodd",
	d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z",
	clipRule: "evenodd"
})), b = /* @__PURE__ */ u.createElement("svg", {
	xmlns: "http://www.w3.org/2000/svg",
	width: "12",
	height: "12",
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: "1.5",
	strokeLinecap: "round",
	strokeLinejoin: "round"
}, /* @__PURE__ */ u.createElement("line", {
	x1: "18",
	y1: "6",
	x2: "6",
	y2: "18"
}), /* @__PURE__ */ u.createElement("line", {
	x1: "6",
	y1: "6",
	x2: "18",
	y2: "18"
})), x = () => {
	let [e, t] = u.useState(document.hidden);
	return u.useEffect(() => {
		let e = () => {
			t(document.hidden);
		};
		return document.addEventListener("visibilitychange", e), () => window.removeEventListener("visibilitychange", e);
	}, []), e;
}, S = 1, C = new class {
	constructor() {
		this.subscribe = (e) => (this.subscribers.push(e), () => {
			let t = this.subscribers.indexOf(e);
			this.subscribers.splice(t, 1);
		}), this.publish = (e) => {
			this.subscribers.forEach((t) => t(e));
		}, this.addToast = (e) => {
			this.publish(e), this.toasts = [...this.toasts, e];
		}, this.create = (e) => {
			let { message: t, ...n } = e, r = typeof e?.id == "number" || e.id?.length > 0 ? e.id : S++, i = this.toasts.find((e) => e.id === r), a = e.dismissible === void 0 ? !0 : e.dismissible;
			return this.dismissedToasts.has(r) && this.dismissedToasts.delete(r), i ? this.toasts = this.toasts.map((n) => n.id === r ? (this.publish({
				...n,
				...e,
				id: r,
				title: t
			}), {
				...n,
				...e,
				id: r,
				dismissible: a,
				title: t
			}) : n) : this.addToast({
				title: t,
				...n,
				dismissible: a,
				id: r
			}), r;
		}, this.dismiss = (e) => (e ? (this.dismissedToasts.add(e), requestAnimationFrame(() => this.subscribers.forEach((t) => t({
			id: e,
			dismiss: !0
		})))) : this.toasts.forEach((e) => {
			this.subscribers.forEach((t) => t({
				id: e.id,
				dismiss: !0
			}));
		}), e), this.message = (e, t) => this.create({
			...t,
			message: e
		}), this.error = (e, t) => this.create({
			...t,
			message: e,
			type: "error"
		}), this.success = (e, t) => this.create({
			...t,
			type: "success",
			message: e
		}), this.info = (e, t) => this.create({
			...t,
			type: "info",
			message: e
		}), this.warning = (e, t) => this.create({
			...t,
			type: "warning",
			message: e
		}), this.loading = (e, t) => this.create({
			...t,
			type: "loading",
			message: e
		}), this.promise = (e, t) => {
			if (!t) return;
			let n;
			t.loading !== void 0 && (n = this.create({
				...t,
				promise: e,
				type: "loading",
				message: t.loading,
				description: typeof t.description == "function" ? void 0 : t.description
			}));
			let r = Promise.resolve(e instanceof Function ? e() : e), i = n !== void 0, a, o = r.then(async (e) => {
				if (a = ["resolve", e], u.isValidElement(e)) i = !1, this.create({
					id: n,
					type: "default",
					message: e
				});
				else if (T(e) && !e.ok) {
					i = !1;
					let r = typeof t.error == "function" ? await t.error(`HTTP error! status: ${e.status}`) : t.error, a = typeof t.description == "function" ? await t.description(`HTTP error! status: ${e.status}`) : t.description, o = typeof r == "object" && !u.isValidElement(r) ? r : { message: r };
					this.create({
						id: n,
						type: "error",
						description: a,
						...o
					});
				} else if (e instanceof Error) {
					i = !1;
					let r = typeof t.error == "function" ? await t.error(e) : t.error, a = typeof t.description == "function" ? await t.description(e) : t.description, o = typeof r == "object" && !u.isValidElement(r) ? r : { message: r };
					this.create({
						id: n,
						type: "error",
						description: a,
						...o
					});
				} else if (t.success !== void 0) {
					i = !1;
					let r = typeof t.success == "function" ? await t.success(e) : t.success, a = typeof t.description == "function" ? await t.description(e) : t.description, o = typeof r == "object" && !u.isValidElement(r) ? r : { message: r };
					this.create({
						id: n,
						type: "success",
						description: a,
						...o
					});
				}
			}).catch(async (e) => {
				if (a = ["reject", e], t.error !== void 0) {
					i = !1;
					let r = typeof t.error == "function" ? await t.error(e) : t.error, a = typeof t.description == "function" ? await t.description(e) : t.description, o = typeof r == "object" && !u.isValidElement(r) ? r : { message: r };
					this.create({
						id: n,
						type: "error",
						description: a,
						...o
					});
				}
			}).finally(() => {
				i && (this.dismiss(n), n = void 0), t.finally == null || t.finally.call(t);
			}), s = () => new Promise((e, t) => o.then(() => a[0] === "reject" ? t(a[1]) : e(a[1])).catch(t));
			return typeof n != "string" && typeof n != "number" ? { unwrap: s } : Object.assign(n, { unwrap: s });
		}, this.custom = (e, t) => {
			let n = t?.id || S++;
			return this.create({
				jsx: e(n),
				id: n,
				...t
			}), n;
		}, this.getActiveToasts = () => this.toasts.filter((e) => !this.dismissedToasts.has(e.id)), this.subscribers = [], this.toasts = [], this.dismissedToasts = /* @__PURE__ */ new Set();
	}
}(), w = (e, t) => {
	let n = t?.id || S++;
	return C.addToast({
		title: e,
		...t,
		id: n
	}), n;
}, T = (e) => e && typeof e == "object" && "ok" in e && typeof e.ok == "boolean" && "status" in e && typeof e.status == "number", E = Object.assign(w, {
	success: C.success,
	info: C.info,
	warning: C.warning,
	error: C.error,
	custom: C.custom,
	message: C.message,
	promise: C.promise,
	dismiss: C.dismiss,
	loading: C.loading
}, {
	getHistory: () => C.toasts,
	getToasts: () => C.getActiveToasts()
});
f("[data-sonner-toaster][dir=ltr],html[dir=ltr]{--toast-icon-margin-start:-3px;--toast-icon-margin-end:4px;--toast-svg-margin-start:-1px;--toast-svg-margin-end:0px;--toast-button-margin-start:auto;--toast-button-margin-end:0;--toast-close-button-start:0;--toast-close-button-end:unset;--toast-close-button-transform:translate(-35%, -35%)}[data-sonner-toaster][dir=rtl],html[dir=rtl]{--toast-icon-margin-start:4px;--toast-icon-margin-end:-3px;--toast-svg-margin-start:0px;--toast-svg-margin-end:-1px;--toast-button-margin-start:0;--toast-button-margin-end:auto;--toast-close-button-start:unset;--toast-close-button-end:0;--toast-close-button-transform:translate(35%, -35%)}[data-sonner-toaster]{position:fixed;width:var(--width);font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;--gray1:hsl(0, 0%, 99%);--gray2:hsl(0, 0%, 97.3%);--gray3:hsl(0, 0%, 95.1%);--gray4:hsl(0, 0%, 93%);--gray5:hsl(0, 0%, 90.9%);--gray6:hsl(0, 0%, 88.7%);--gray7:hsl(0, 0%, 85.8%);--gray8:hsl(0, 0%, 78%);--gray9:hsl(0, 0%, 56.1%);--gray10:hsl(0, 0%, 52.3%);--gray11:hsl(0, 0%, 43.5%);--gray12:hsl(0, 0%, 9%);--border-radius:8px;box-sizing:border-box;padding:0;margin:0;list-style:none;outline:0;z-index:999999999;transition:transform .4s ease}@media (hover:none) and (pointer:coarse){[data-sonner-toaster][data-lifted=true]{transform:none}}[data-sonner-toaster][data-x-position=right]{right:var(--offset-right)}[data-sonner-toaster][data-x-position=left]{left:var(--offset-left)}[data-sonner-toaster][data-x-position=center]{left:50%;transform:translateX(-50%)}[data-sonner-toaster][data-y-position=top]{top:var(--offset-top)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--offset-bottom)}[data-sonner-toast]{--y:translateY(100%);--lift-amount:calc(var(--lift) * var(--gap));z-index:var(--z-index);position:absolute;opacity:0;transform:var(--y);touch-action:none;transition:transform .4s,opacity .4s,height .4s,box-shadow .2s;box-sizing:border-box;outline:0;overflow-wrap:anywhere}[data-sonner-toast][data-styled=true]{padding:16px;background:var(--normal-bg);border:1px solid var(--normal-border);color:var(--normal-text);border-radius:var(--border-radius);box-shadow:0 4px 12px rgba(0,0,0,.1);width:var(--width);font-size:13px;display:flex;align-items:center;gap:6px}[data-sonner-toast]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-y-position=top]{top:0;--y:translateY(-100%);--lift:1;--lift-amount:calc(1 * var(--gap))}[data-sonner-toast][data-y-position=bottom]{bottom:0;--y:translateY(100%);--lift:-1;--lift-amount:calc(var(--lift) * var(--gap))}[data-sonner-toast][data-styled=true] [data-description]{font-weight:400;line-height:1.4;color:#3f3f3f}[data-rich-colors=true][data-sonner-toast][data-styled=true] [data-description]{color:inherit}[data-sonner-toaster][data-sonner-theme=dark] [data-description]{color:#e8e8e8}[data-sonner-toast][data-styled=true] [data-title]{font-weight:500;line-height:1.5;color:inherit}[data-sonner-toast][data-styled=true] [data-icon]{display:flex;height:16px;width:16px;position:relative;justify-content:flex-start;align-items:center;flex-shrink:0;margin-left:var(--toast-icon-margin-start);margin-right:var(--toast-icon-margin-end)}[data-sonner-toast][data-promise=true] [data-icon]>svg{opacity:0;transform:scale(.8);transform-origin:center;animation:sonner-fade-in .3s ease forwards}[data-sonner-toast][data-styled=true] [data-icon]>*{flex-shrink:0}[data-sonner-toast][data-styled=true] [data-icon] svg{margin-left:var(--toast-svg-margin-start);margin-right:var(--toast-svg-margin-end)}[data-sonner-toast][data-styled=true] [data-content]{display:flex;flex-direction:column;gap:2px}[data-sonner-toast][data-styled=true] [data-button]{border-radius:4px;padding-left:8px;padding-right:8px;height:24px;font-size:12px;color:var(--normal-bg);background:var(--normal-text);margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end);border:none;font-weight:500;cursor:pointer;outline:0;display:flex;align-items:center;flex-shrink:0;transition:opacity .4s,box-shadow .2s}[data-sonner-toast][data-styled=true] [data-button]:focus-visible{box-shadow:0 0 0 2px rgba(0,0,0,.4)}[data-sonner-toast][data-styled=true] [data-button]:first-of-type{margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end)}[data-sonner-toast][data-styled=true] [data-cancel]{color:var(--normal-text);background:rgba(0,0,0,.08)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-styled=true] [data-cancel]{background:rgba(255,255,255,.3)}[data-sonner-toast][data-styled=true] [data-close-button]{position:absolute;left:var(--toast-close-button-start);right:var(--toast-close-button-end);top:0;height:20px;width:20px;display:flex;justify-content:center;align-items:center;padding:0;color:var(--gray12);background:var(--normal-bg);border:1px solid var(--gray4);transform:var(--toast-close-button-transform);border-radius:50%;cursor:pointer;z-index:1;transition:opacity .1s,background .2s,border-color .2s}[data-sonner-toast][data-styled=true] [data-close-button]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-styled=true] [data-disabled=true]{cursor:not-allowed}[data-sonner-toast][data-styled=true]:hover [data-close-button]:hover{background:var(--gray2);border-color:var(--gray5)}[data-sonner-toast][data-swiping=true]::before{content:'';position:absolute;left:-100%;right:-100%;height:100%;z-index:-1}[data-sonner-toast][data-y-position=top][data-swiping=true]::before{bottom:50%;transform:scaleY(3) translateY(50%)}[data-sonner-toast][data-y-position=bottom][data-swiping=true]::before{top:50%;transform:scaleY(3) translateY(-50%)}[data-sonner-toast][data-swiping=false][data-removed=true]::before{content:'';position:absolute;inset:0;transform:scaleY(2)}[data-sonner-toast][data-expanded=true]::after{content:'';position:absolute;left:0;height:calc(var(--gap) + 1px);bottom:100%;width:100%}[data-sonner-toast][data-mounted=true]{--y:translateY(0);opacity:1}[data-sonner-toast][data-expanded=false][data-front=false]{--scale:var(--toasts-before) * 0.05 + 1;--y:translateY(calc(var(--lift-amount) * var(--toasts-before))) scale(calc(-1 * var(--scale)));height:var(--front-toast-height)}[data-sonner-toast]>*{transition:opacity .4s}[data-sonner-toast][data-x-position=right]{right:0}[data-sonner-toast][data-x-position=left]{left:0}[data-sonner-toast][data-expanded=false][data-front=false][data-styled=true]>*{opacity:0}[data-sonner-toast][data-visible=false]{opacity:0;pointer-events:none}[data-sonner-toast][data-mounted=true][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset)));height:var(--initial-height)}[data-sonner-toast][data-removed=true][data-front=true][data-swipe-out=false]{--y:translateY(calc(var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset) + var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=false]{--y:translateY(40%);opacity:0;transition:transform .5s,opacity .2s}[data-sonner-toast][data-removed=true][data-front=false]::before{height:calc(var(--initial-height) + 20%)}[data-sonner-toast][data-swiping=true]{transform:var(--y) translateY(var(--swipe-amount-y,0)) translateX(var(--swipe-amount-x,0));transition:none}[data-sonner-toast][data-swiped=true]{user-select:none}[data-sonner-toast][data-swipe-out=true][data-y-position=bottom],[data-sonner-toast][data-swipe-out=true][data-y-position=top]{animation-duration:.2s;animation-timing-function:ease-out;animation-fill-mode:forwards}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=left]{animation-name:swipe-out-left}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=right]{animation-name:swipe-out-right}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=up]{animation-name:swipe-out-up}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=down]{animation-name:swipe-out-down}@keyframes swipe-out-left{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) - 100%));opacity:0}}@keyframes swipe-out-right{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) + 100%));opacity:0}}@keyframes swipe-out-up{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) - 100%));opacity:0}}@keyframes swipe-out-down{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) + 100%));opacity:0}}@media (max-width:600px){[data-sonner-toaster]{position:fixed;right:var(--mobile-offset-right);left:var(--mobile-offset-left);width:100%}[data-sonner-toaster][dir=rtl]{left:calc(var(--mobile-offset-left) * -1)}[data-sonner-toaster] [data-sonner-toast]{left:0;right:0;width:calc(100% - var(--mobile-offset-left) * 2)}[data-sonner-toaster][data-x-position=left]{left:var(--mobile-offset-left)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--mobile-offset-bottom)}[data-sonner-toaster][data-y-position=top]{top:var(--mobile-offset-top)}[data-sonner-toaster][data-x-position=center]{left:var(--mobile-offset-left);right:var(--mobile-offset-right);transform:none}}[data-sonner-toaster][data-sonner-theme=light]{--normal-bg:#fff;--normal-border:var(--gray4);--normal-text:var(--gray12);--success-bg:hsl(143, 85%, 96%);--success-border:hsl(145, 92%, 87%);--success-text:hsl(140, 100%, 27%);--info-bg:hsl(208, 100%, 97%);--info-border:hsl(221, 91%, 93%);--info-text:hsl(210, 92%, 45%);--warning-bg:hsl(49, 100%, 97%);--warning-border:hsl(49, 91%, 84%);--warning-text:hsl(31, 92%, 45%);--error-bg:hsl(359, 100%, 97%);--error-border:hsl(359, 100%, 94%);--error-text:hsl(360, 100%, 45%)}[data-sonner-toaster][data-sonner-theme=light] [data-sonner-toast][data-invert=true]{--normal-bg:#000;--normal-border:hsl(0, 0%, 20%);--normal-text:var(--gray1)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-invert=true]{--normal-bg:#fff;--normal-border:var(--gray3);--normal-text:var(--gray12)}[data-sonner-toaster][data-sonner-theme=dark]{--normal-bg:#000;--normal-bg-hover:hsl(0, 0%, 12%);--normal-border:hsl(0, 0%, 20%);--normal-border-hover:hsl(0, 0%, 25%);--normal-text:var(--gray1);--success-bg:hsl(150, 100%, 6%);--success-border:hsl(147, 100%, 12%);--success-text:hsl(150, 86%, 65%);--info-bg:hsl(215, 100%, 6%);--info-border:hsl(223, 43%, 17%);--info-text:hsl(216, 87%, 65%);--warning-bg:hsl(64, 100%, 6%);--warning-border:hsl(60, 100%, 9%);--warning-text:hsl(46, 87%, 65%);--error-bg:hsl(358, 76%, 10%);--error-border:hsl(357, 89%, 16%);--error-text:hsl(358, 100%, 81%)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]{background:var(--normal-bg);border-color:var(--normal-border);color:var(--normal-text)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]:hover{background:var(--normal-bg-hover);border-color:var(--normal-border-hover)}[data-rich-colors=true][data-sonner-toast][data-type=success]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=success] [data-close-button]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=info]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=info] [data-close-button]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning] [data-close-button]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=error]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}[data-rich-colors=true][data-sonner-toast][data-type=error] [data-close-button]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}.sonner-loading-wrapper{--size:16px;height:var(--size);width:var(--size);position:absolute;inset:0;z-index:10}.sonner-loading-wrapper[data-visible=false]{transform-origin:center;animation:sonner-fade-out .2s ease forwards}.sonner-spinner{position:relative;top:50%;left:50%;height:var(--size);width:var(--size)}.sonner-loading-bar{animation:sonner-spin 1.2s linear infinite;background:var(--gray11);border-radius:6px;height:8%;left:-10%;position:absolute;top:-3.9%;width:24%}.sonner-loading-bar:first-child{animation-delay:-1.2s;transform:rotate(.0001deg) translate(146%)}.sonner-loading-bar:nth-child(2){animation-delay:-1.1s;transform:rotate(30deg) translate(146%)}.sonner-loading-bar:nth-child(3){animation-delay:-1s;transform:rotate(60deg) translate(146%)}.sonner-loading-bar:nth-child(4){animation-delay:-.9s;transform:rotate(90deg) translate(146%)}.sonner-loading-bar:nth-child(5){animation-delay:-.8s;transform:rotate(120deg) translate(146%)}.sonner-loading-bar:nth-child(6){animation-delay:-.7s;transform:rotate(150deg) translate(146%)}.sonner-loading-bar:nth-child(7){animation-delay:-.6s;transform:rotate(180deg) translate(146%)}.sonner-loading-bar:nth-child(8){animation-delay:-.5s;transform:rotate(210deg) translate(146%)}.sonner-loading-bar:nth-child(9){animation-delay:-.4s;transform:rotate(240deg) translate(146%)}.sonner-loading-bar:nth-child(10){animation-delay:-.3s;transform:rotate(270deg) translate(146%)}.sonner-loading-bar:nth-child(11){animation-delay:-.2s;transform:rotate(300deg) translate(146%)}.sonner-loading-bar:nth-child(12){animation-delay:-.1s;transform:rotate(330deg) translate(146%)}@keyframes sonner-fade-in{0%{opacity:0;transform:scale(.8)}100%{opacity:1;transform:scale(1)}}@keyframes sonner-fade-out{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.8)}}@keyframes sonner-spin{0%{opacity:1}100%{opacity:.15}}@media (prefers-reduced-motion){.sonner-loading-bar,[data-sonner-toast],[data-sonner-toast]>*{transition:none!important;animation:none!important}}.sonner-loader{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);transform-origin:center;transition:opacity .2s,transform .2s}.sonner-loader[data-visible=false]{opacity:0;transform:scale(.8) translate(-50%,-50%)}");
function D(e) {
	return e.label !== void 0;
}
var O = 3, k = "24px", A = "16px", j = 4e3, M = 356, N = 14, P = 45, F = 200;
function I(...e) {
	return e.filter(Boolean).join(" ");
}
function ee(e) {
	let [t, n] = e.split("-"), r = [];
	return t && r.push(t), n && r.push(n), r;
}
var te = (e) => {
	let { invert: t, toast: n, unstyled: r, interacting: i, setHeights: a, visibleToasts: o, heights: s, index: c, toasts: l, expanded: d, removeToast: f, defaultRichColors: m, closeButton: g, style: _, cancelButtonStyle: v, actionButtonStyle: y, className: S = "", descriptionClassName: C = "", duration: w, position: T, gap: E, expandByDefault: O, classNames: k, icons: A, closeButtonAriaLabel: M = "Close toast" } = e, [N, te] = u.useState(null), [ne, re] = u.useState(null), [ie, ae] = u.useState(!1), [L, R] = u.useState(!1), [oe, se] = u.useState(!1), [ce, le] = u.useState(!1), [ue, de] = u.useState(!1), [fe, pe] = u.useState(0), [me, he] = u.useState(0), ge = u.useRef(n.duration || w || j), _e = u.useRef(null), ve = u.useRef(null), ye = c === 0, be = c + 1 <= o, xe = n.type, Se = n.dismissible !== !1, Ce = n.className || "", we = n.descriptionClassName || "", Te = u.useMemo(() => s.findIndex((e) => e.toastId === n.id) || 0, [s, n.id]), Ee = u.useMemo(() => n.closeButton ?? g, [n.closeButton, g]), De = u.useMemo(() => n.duration || w || j, [n.duration, w]), Oe = u.useRef(0), ke = u.useRef(0), Ae = u.useRef(0), je = u.useRef(null), [Me, Ne] = T.split("-"), Pe = u.useMemo(() => s.reduce((e, t, n) => n >= Te ? e : e + t.height, 0), [s, Te]), Fe = x(), Ie = n.invert || t, Le = xe === "loading";
	ke.current = u.useMemo(() => Te * E + Pe, [Te, Pe]), u.useEffect(() => {
		ge.current = De;
	}, [De]), u.useEffect(() => {
		ae(!0);
	}, []), u.useEffect(() => {
		let e = ve.current;
		if (e) {
			let t = e.getBoundingClientRect().height;
			return he(t), a((e) => [{
				toastId: n.id,
				height: t,
				position: n.position
			}, ...e]), () => a((e) => e.filter((e) => e.toastId !== n.id));
		}
	}, [a, n.id]), u.useLayoutEffect(() => {
		if (!ie) return;
		let e = ve.current, t = e.style.height;
		e.style.height = "auto";
		let r = e.getBoundingClientRect().height;
		e.style.height = t, he(r), a((e) => e.find((e) => e.toastId === n.id) ? e.map((e) => e.toastId === n.id ? {
			...e,
			height: r
		} : e) : [{
			toastId: n.id,
			height: r,
			position: n.position
		}, ...e]);
	}, [
		ie,
		n.title,
		n.description,
		a,
		n.id,
		n.jsx,
		n.action,
		n.cancel
	]);
	let Re = u.useCallback(() => {
		R(!0), pe(ke.current), a((e) => e.filter((e) => e.toastId !== n.id)), setTimeout(() => {
			f(n);
		}, F);
	}, [
		n,
		f,
		a,
		ke
	]);
	u.useEffect(() => {
		if (n.promise && xe === "loading" || n.duration === Infinity || n.type === "loading") return;
		let e;
		return d || i || Fe ? (() => {
			if (Ae.current < Oe.current) {
				let e = (/* @__PURE__ */ new Date()).getTime() - Oe.current;
				ge.current -= e;
			}
			Ae.current = (/* @__PURE__ */ new Date()).getTime();
		})() : ge.current !== Infinity && (Oe.current = (/* @__PURE__ */ new Date()).getTime(), e = setTimeout(() => {
			n.onAutoClose == null || n.onAutoClose.call(n, n), Re();
		}, ge.current)), () => clearTimeout(e);
	}, [
		d,
		i,
		n,
		xe,
		Fe,
		Re
	]), u.useEffect(() => {
		n.delete && (Re(), n.onDismiss == null || n.onDismiss.call(n, n));
	}, [Re, n.delete]);
	function ze() {
		return A?.loading ? /* @__PURE__ */ u.createElement("div", {
			className: I(k?.loader, n?.classNames?.loader, "sonner-loader"),
			"data-visible": xe === "loading"
		}, A.loading) : /* @__PURE__ */ u.createElement(h, {
			className: I(k?.loader, n?.classNames?.loader),
			visible: xe === "loading"
		});
	}
	let Be = n.icon || A?.[xe] || p(xe);
	return /* @__PURE__ */ u.createElement("li", {
		tabIndex: 0,
		ref: ve,
		className: I(S, Ce, k?.toast, n?.classNames?.toast, k?.default, k?.[xe], n?.classNames?.[xe]),
		"data-sonner-toast": "",
		"data-rich-colors": n.richColors ?? m,
		"data-styled": !(n.jsx || n.unstyled || r),
		"data-mounted": ie,
		"data-promise": !!n.promise,
		"data-swiped": ue,
		"data-removed": L,
		"data-visible": be,
		"data-y-position": Me,
		"data-x-position": Ne,
		"data-index": c,
		"data-front": ye,
		"data-swiping": oe,
		"data-dismissible": Se,
		"data-type": xe,
		"data-invert": Ie,
		"data-swipe-out": ce,
		"data-swipe-direction": ne,
		"data-expanded": !!(d || O && ie),
		style: {
			"--index": c,
			"--toasts-before": c,
			"--z-index": l.length - c,
			"--offset": `${L ? fe : ke.current}px`,
			"--initial-height": O ? "auto" : `${me}px`,
			..._,
			...n.style
		},
		onDragEnd: () => {
			se(!1), te(null), je.current = null;
		},
		onPointerDown: (e) => {
			Le || !Se || (_e.current = /* @__PURE__ */ new Date(), pe(ke.current), e.target.setPointerCapture(e.pointerId), e.target.tagName !== "BUTTON" && (se(!0), je.current = {
				x: e.clientX,
				y: e.clientY
			}));
		},
		onPointerUp: () => {
			if (ce || !Se) return;
			je.current = null;
			let e = Number(ve.current?.style.getPropertyValue("--swipe-amount-x").replace("px", "") || 0), t = Number(ve.current?.style.getPropertyValue("--swipe-amount-y").replace("px", "") || 0), r = (/* @__PURE__ */ new Date()).getTime() - _e.current?.getTime(), i = N === "x" ? e : t, a = Math.abs(i) / r;
			if (Math.abs(i) >= P || a > .11) {
				pe(ke.current), n.onDismiss == null || n.onDismiss.call(n, n), re(N === "x" ? e > 0 ? "right" : "left" : t > 0 ? "down" : "up"), Re(), le(!0);
				return;
			} else {
				var o, s;
				(o = ve.current) == null || o.style.setProperty("--swipe-amount-x", "0px"), (s = ve.current) == null || s.style.setProperty("--swipe-amount-y", "0px");
			}
			de(!1), se(!1), te(null);
		},
		onPointerMove: (t) => {
			var n, r;
			if (!je.current || !Se || window.getSelection()?.toString().length > 0) return;
			let i = t.clientY - je.current.y, a = t.clientX - je.current.x, o = e.swipeDirections ?? ee(T);
			!N && (Math.abs(a) > 1 || Math.abs(i) > 1) && te(Math.abs(a) > Math.abs(i) ? "x" : "y");
			let s = {
				x: 0,
				y: 0
			}, c = (e) => 1 / (1.5 + Math.abs(e) / 20);
			if (N === "y") {
				if (o.includes("top") || o.includes("bottom")) if (o.includes("top") && i < 0 || o.includes("bottom") && i > 0) s.y = i;
				else {
					let e = i * c(i);
					s.y = Math.abs(e) < Math.abs(i) ? e : i;
				}
			} else if (N === "x" && (o.includes("left") || o.includes("right"))) if (o.includes("left") && a < 0 || o.includes("right") && a > 0) s.x = a;
			else {
				let e = a * c(a);
				s.x = Math.abs(e) < Math.abs(a) ? e : a;
			}
			(Math.abs(s.x) > 0 || Math.abs(s.y) > 0) && de(!0), (n = ve.current) == null || n.style.setProperty("--swipe-amount-x", `${s.x}px`), (r = ve.current) == null || r.style.setProperty("--swipe-amount-y", `${s.y}px`);
		}
	}, Ee && !n.jsx && xe !== "loading" ? /* @__PURE__ */ u.createElement("button", {
		"aria-label": M,
		"data-disabled": Le,
		"data-close-button": !0,
		onClick: Le || !Se ? () => {} : () => {
			Re(), n.onDismiss == null || n.onDismiss.call(n, n);
		},
		className: I(k?.closeButton, n?.classNames?.closeButton)
	}, A?.close ?? b) : null, (xe || n.icon || n.promise) && n.icon !== null && (A?.[xe] !== null || n.icon) ? /* @__PURE__ */ u.createElement("div", {
		"data-icon": "",
		className: I(k?.icon, n?.classNames?.icon)
	}, n.promise || n.type === "loading" && !n.icon ? n.icon || ze() : null, n.type === "loading" ? null : Be) : null, /* @__PURE__ */ u.createElement("div", {
		"data-content": "",
		className: I(k?.content, n?.classNames?.content)
	}, /* @__PURE__ */ u.createElement("div", {
		"data-title": "",
		className: I(k?.title, n?.classNames?.title)
	}, n.jsx ? n.jsx : typeof n.title == "function" ? n.title() : n.title), n.description ? /* @__PURE__ */ u.createElement("div", {
		"data-description": "",
		className: I(C, we, k?.description, n?.classNames?.description)
	}, typeof n.description == "function" ? n.description() : n.description) : null), /* @__PURE__ */ u.isValidElement(n.cancel) ? n.cancel : n.cancel && D(n.cancel) ? /* @__PURE__ */ u.createElement("button", {
		"data-button": !0,
		"data-cancel": !0,
		style: n.cancelButtonStyle || v,
		onClick: (e) => {
			D(n.cancel) && Se && (n.cancel.onClick == null || n.cancel.onClick.call(n.cancel, e), Re());
		},
		className: I(k?.cancelButton, n?.classNames?.cancelButton)
	}, n.cancel.label) : null, /* @__PURE__ */ u.isValidElement(n.action) ? n.action : n.action && D(n.action) ? /* @__PURE__ */ u.createElement("button", {
		"data-button": !0,
		"data-action": !0,
		style: n.actionButtonStyle || y,
		onClick: (e) => {
			D(n.action) && (n.action.onClick == null || n.action.onClick.call(n.action, e), !e.defaultPrevented && Re());
		},
		className: I(k?.actionButton, n?.classNames?.actionButton)
	}, n.action.label) : null);
};
function ne() {
	if (typeof window > "u" || typeof document > "u") return "ltr";
	let e = document.documentElement.getAttribute("dir");
	return e === "auto" || !e ? window.getComputedStyle(document.documentElement).direction : e;
}
function re(e, t) {
	let n = {};
	return [e, t].forEach((e, t) => {
		let r = t === 1, i = r ? "--mobile-offset" : "--offset", a = r ? A : k;
		function o(e) {
			[
				"top",
				"right",
				"bottom",
				"left"
			].forEach((t) => {
				n[`${i}-${t}`] = typeof e == "number" ? `${e}px` : e;
			});
		}
		typeof e == "number" || typeof e == "string" ? o(e) : typeof e == "object" ? [
			"top",
			"right",
			"bottom",
			"left"
		].forEach((t) => {
			e[t] === void 0 ? n[`${i}-${t}`] = a : n[`${i}-${t}`] = typeof e[t] == "number" ? `${e[t]}px` : e[t];
		}) : o(a);
	}), n;
}
var ie = /* @__PURE__ */ u.forwardRef(function(e, t) {
	let { invert: n, position: r = "bottom-right", hotkey: i = ["altKey", "KeyT"], expand: a, closeButton: o, className: s, offset: c, mobileOffset: l, theme: f = "light", richColors: p, duration: m, style: h, visibleToasts: g = O, toastOptions: _, dir: v = ne(), gap: y = N, icons: b, containerAriaLabel: x = "Notifications" } = e, [S, w] = u.useState([]), T = u.useMemo(() => Array.from(new Set([r].concat(S.filter((e) => e.position).map((e) => e.position)))), [S, r]), [E, D] = u.useState([]), [k, A] = u.useState(!1), [j, P] = u.useState(!1), [F, I] = u.useState(f === "system" ? typeof window < "u" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light" : f), ee = u.useRef(null), ie = i.join("+").replace(/Key/g, "").replace(/Digit/g, ""), ae = u.useRef(null), L = u.useRef(!1), R = u.useCallback((e) => {
		w((t) => (t.find((t) => t.id === e.id)?.delete || C.dismiss(e.id), t.filter(({ id: t }) => t !== e.id)));
	}, []);
	return u.useEffect(() => C.subscribe((e) => {
		if (e.dismiss) {
			requestAnimationFrame(() => {
				w((t) => t.map((t) => t.id === e.id ? {
					...t,
					delete: !0
				} : t));
			});
			return;
		}
		setTimeout(() => {
			d.flushSync(() => {
				w((t) => {
					let n = t.findIndex((t) => t.id === e.id);
					return n === -1 ? [e, ...t] : [
						...t.slice(0, n),
						{
							...t[n],
							...e
						},
						...t.slice(n + 1)
					];
				});
			});
		});
	}), [S]), u.useEffect(() => {
		if (f !== "system") {
			I(f);
			return;
		}
		if (f === "system" && (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? I("dark") : I("light")), typeof window > "u") return;
		let e = window.matchMedia("(prefers-color-scheme: dark)");
		try {
			e.addEventListener("change", ({ matches: e }) => {
				I(e ? "dark" : "light");
			});
		} catch {
			e.addListener(({ matches: e }) => {
				try {
					I(e ? "dark" : "light");
				} catch (e) {
					console.error(e);
				}
			});
		}
	}, [f]), u.useEffect(() => {
		S.length <= 1 && A(!1);
	}, [S]), u.useEffect(() => {
		let e = (e) => {
			if (i.every((t) => e[t] || e.code === t)) {
				var t;
				A(!0), (t = ee.current) == null || t.focus();
			}
			e.code === "Escape" && (document.activeElement === ee.current || ee.current?.contains(document.activeElement)) && A(!1);
		};
		return document.addEventListener("keydown", e), () => document.removeEventListener("keydown", e);
	}, [i]), u.useEffect(() => {
		if (ee.current) return () => {
			ae.current && (ae.current.focus({ preventScroll: !0 }), ae.current = null, L.current = !1);
		};
	}, [ee.current]), /* @__PURE__ */ u.createElement("section", {
		ref: t,
		"aria-label": `${x} ${ie}`,
		tabIndex: -1,
		"aria-live": "polite",
		"aria-relevant": "additions text",
		"aria-atomic": "false",
		suppressHydrationWarning: !0
	}, T.map((t, r) => {
		let [i, d] = t.split("-");
		return S.length ? /* @__PURE__ */ u.createElement("ol", {
			key: t,
			dir: v === "auto" ? ne() : v,
			tabIndex: -1,
			ref: ee,
			className: s,
			"data-sonner-toaster": !0,
			"data-sonner-theme": F,
			"data-y-position": i,
			"data-x-position": d,
			style: {
				"--front-toast-height": `${E[0]?.height || 0}px`,
				"--width": `${M}px`,
				"--gap": `${y}px`,
				...h,
				...re(c, l)
			},
			onBlur: (e) => {
				L.current && !e.currentTarget.contains(e.relatedTarget) && (L.current = !1, ae.current &&= (ae.current.focus({ preventScroll: !0 }), null));
			},
			onFocus: (e) => {
				e.target instanceof HTMLElement && e.target.dataset.dismissible === "false" || L.current || (L.current = !0, ae.current = e.relatedTarget);
			},
			onMouseEnter: () => A(!0),
			onMouseMove: () => A(!0),
			onMouseLeave: () => {
				j || A(!1);
			},
			onDragEnd: () => A(!1),
			onPointerDown: (e) => {
				e.target instanceof HTMLElement && e.target.dataset.dismissible === "false" || P(!0);
			},
			onPointerUp: () => P(!1)
		}, S.filter((e) => !e.position && r === 0 || e.position === t).map((r, i) => /* @__PURE__ */ u.createElement(te, {
			key: r.id,
			icons: b,
			index: i,
			toast: r,
			defaultRichColors: p,
			duration: _?.duration ?? m,
			className: _?.className,
			descriptionClassName: _?.descriptionClassName,
			invert: n,
			visibleToasts: g,
			closeButton: _?.closeButton ?? o,
			interacting: j,
			position: t,
			style: _?.style,
			unstyled: _?.unstyled,
			classNames: _?.classNames,
			cancelButtonStyle: _?.cancelButtonStyle,
			actionButtonStyle: _?.actionButtonStyle,
			closeButtonAriaLabel: _?.closeButtonAriaLabel,
			removeToast: R,
			toasts: S.filter((e) => e.position == r.position),
			heights: E.filter((e) => e.position == r.position),
			setHeights: D,
			expandByDefault: a,
			gap: y,
			expanded: k,
			swipeDirections: e.swipeDirections
		}))) : null;
	}));
}), ae = /* @__PURE__ */ t(((e) => {
	var t = Symbol.for("react.transitional.element"), n = Symbol.for("react.fragment");
	function r(e, n, r) {
		var i = null;
		if (r !== void 0 && (i = "" + r), n.key !== void 0 && (i = "" + n.key), "key" in n) for (var a in r = {}, n) a !== "key" && (r[a] = n[a]);
		else r = n;
		return n = r.ref, {
			$$typeof: t,
			type: e,
			key: i,
			ref: n === void 0 ? null : n,
			props: r
		};
	}
	e.Fragment = n, e.jsx = r, e.jsxs = r;
})), L = (/* @__PURE__ */ t(((e, t) => {
	t.exports = ae();
})))();
function R(e, t) {
	if (typeof e == "function") return e(t);
	e != null && (e.current = t);
}
function oe(...e) {
	return (t) => {
		let n = !1, r = e.map((e) => {
			let r = R(e, t);
			return !n && typeof r == "function" && (n = !0), r;
		});
		if (n) return () => {
			for (let t = 0; t < r.length; t++) {
				let n = r[t];
				typeof n == "function" ? n() : R(e[t], null);
			}
		};
	};
}
//#endregion
//#region node_modules/@radix-ui/react-slot/dist/index.mjs
var se = Symbol.for("react.lazy"), ce = u.use;
function le(e) {
	return typeof e == "object" && !!e && "then" in e;
}
function ue(e) {
	return typeof e == "object" && !!e && "$$typeof" in e && e.$$typeof === se && "_payload" in e && le(e._payload);
}
/* @__NO_SIDE_EFFECTS__ */
function de(e) {
	let t = /* @__PURE__ */ pe(e), n = u.forwardRef((e, n) => {
		let { children: r, ...i } = e;
		ue(r) && typeof ce == "function" && (r = ce(r._payload));
		let a = u.Children.toArray(r), o = a.find(he);
		if (o) {
			let e = o.props.children, r = a.map((t) => t === o ? u.Children.count(e) > 1 ? u.Children.only(null) : u.isValidElement(e) ? e.props.children : null : t);
			return /* @__PURE__ */ (0, L.jsx)(t, {
				...i,
				ref: n,
				children: u.isValidElement(e) ? u.cloneElement(e, void 0, r) : null
			});
		}
		return /* @__PURE__ */ (0, L.jsx)(t, {
			...i,
			ref: n,
			children: r
		});
	});
	return n.displayName = `${e}.Slot`, n;
}
var fe = /* @__PURE__ */ de("Slot");
/* @__NO_SIDE_EFFECTS__ */
function pe(e) {
	let t = u.forwardRef((e, t) => {
		let { children: n, ...r } = e;
		if (ue(n) && typeof ce == "function" && (n = ce(n._payload)), u.isValidElement(n)) {
			let e = _e(n), i = ge(r, n.props);
			return n.type !== u.Fragment && (i.ref = t ? oe(t, e) : e), u.cloneElement(n, i);
		}
		return u.Children.count(n) > 1 ? u.Children.only(null) : null;
	});
	return t.displayName = `${e}.SlotClone`, t;
}
var me = Symbol("radix.slottable");
function he(e) {
	return u.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === me;
}
function ge(e, t) {
	let n = { ...t };
	for (let r in t) {
		let i = e[r], a = t[r];
		/^on[A-Z]/.test(r) ? i && a ? n[r] = (...e) => {
			let t = a(...e);
			return i(...e), t;
		} : i && (n[r] = i) : r === "style" ? n[r] = {
			...i,
			...a
		} : r === "className" && (n[r] = [i, a].filter(Boolean).join(" "));
	}
	return {
		...e,
		...n
	};
}
function _e(e) {
	let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
	return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
//#endregion
//#region node_modules/clsx/dist/clsx.mjs
function ve(e) {
	var t, n, r = "";
	if (typeof e == "string" || typeof e == "number") r += e;
	else if (typeof e == "object") if (Array.isArray(e)) {
		var i = e.length;
		for (t = 0; t < i; t++) e[t] && (n = ve(e[t])) && (r && (r += " "), r += n);
	} else for (n in e) e[n] && (r && (r += " "), r += n);
	return r;
}
function ye() {
	for (var e, t, n = 0, r = "", i = arguments.length; n < i; n++) (e = arguments[n]) && (t = ve(e)) && (r && (r += " "), r += t);
	return r;
}
//#endregion
//#region node_modules/class-variance-authority/dist/index.mjs
var be = (e) => typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e, xe = ye, Se = (e, t) => (n) => {
	if (t?.variants == null) return xe(e, n?.class, n?.className);
	let { variants: r, defaultVariants: i } = t, a = Object.keys(r).map((e) => {
		let t = n?.[e], a = i?.[e];
		if (t === null) return null;
		let o = be(t) || be(a);
		return r[e][o];
	}), o = n && Object.entries(n).reduce((e, t) => {
		let [n, r] = t;
		return r === void 0 || (e[n] = r), e;
	}, {});
	return xe(e, a, t?.compoundVariants?.reduce((e, t) => {
		let { class: n, className: r, ...a } = t;
		return Object.entries(a).every((e) => {
			let [t, n] = e;
			return Array.isArray(n) ? n.includes({
				...i,
				...o
			}[t]) : {
				...i,
				...o
			}[t] === n;
		}) ? [
			...e,
			n,
			r
		] : e;
	}, []), n?.class, n?.className);
}, Ce = (e, t) => {
	let n = Array(e.length + t.length);
	for (let t = 0; t < e.length; t++) n[t] = e[t];
	for (let r = 0; r < t.length; r++) n[e.length + r] = t[r];
	return n;
}, we = (e, t) => ({
	classGroupId: e,
	validator: t
}), Te = (e = /* @__PURE__ */ new Map(), t = null, n) => ({
	nextPart: e,
	validators: t,
	classGroupId: n
}), Ee = "-", De = [], Oe = "arbitrary..", ke = (e) => {
	let t = Me(e), { conflictingClassGroups: n, conflictingClassGroupModifiers: r } = e;
	return {
		getClassGroupId: (e) => {
			if (e.startsWith("[") && e.endsWith("]")) return je(e);
			let n = e.split(Ee);
			return Ae(n, n[0] === "" && n.length > 1 ? 1 : 0, t);
		},
		getConflictingClassGroupIds: (e, t) => {
			if (t) {
				let t = r[e], i = n[e];
				return t ? i ? Ce(i, t) : t : i || De;
			}
			return n[e] || De;
		}
	};
}, Ae = (e, t, n) => {
	if (e.length - t === 0) return n.classGroupId;
	let r = e[t], i = n.nextPart.get(r);
	if (i) {
		let n = Ae(e, t + 1, i);
		if (n) return n;
	}
	let a = n.validators;
	if (a === null) return;
	let o = t === 0 ? e.join(Ee) : e.slice(t).join(Ee), s = a.length;
	for (let e = 0; e < s; e++) {
		let t = a[e];
		if (t.validator(o)) return t.classGroupId;
	}
}, je = (e) => e.slice(1, -1).indexOf(":") === -1 ? void 0 : (() => {
	let t = e.slice(1, -1), n = t.indexOf(":"), r = t.slice(0, n);
	return r ? Oe + r : void 0;
})(), Me = (e) => {
	let { theme: t, classGroups: n } = e;
	return Ne(n, t);
}, Ne = (e, t) => {
	let n = Te();
	for (let r in e) {
		let i = e[r];
		Pe(i, n, r, t);
	}
	return n;
}, Pe = (e, t, n, r) => {
	let i = e.length;
	for (let a = 0; a < i; a++) {
		let i = e[a];
		Fe(i, t, n, r);
	}
}, Fe = (e, t, n, r) => {
	if (typeof e == "string") {
		Ie(e, t, n);
		return;
	}
	if (typeof e == "function") {
		Le(e, t, n, r);
		return;
	}
	Re(e, t, n, r);
}, Ie = (e, t, n) => {
	let r = e === "" ? t : ze(t, e);
	r.classGroupId = n;
}, Le = (e, t, n, r) => {
	if (Be(e)) {
		Pe(e(r), t, n, r);
		return;
	}
	t.validators === null && (t.validators = []), t.validators.push(we(n, e));
}, Re = (e, t, n, r) => {
	let i = Object.entries(e), a = i.length;
	for (let e = 0; e < a; e++) {
		let [a, o] = i[e];
		Pe(o, ze(t, a), n, r);
	}
}, ze = (e, t) => {
	let n = e, r = t.split(Ee), i = r.length;
	for (let e = 0; e < i; e++) {
		let t = r[e], i = n.nextPart.get(t);
		i || (i = Te(), n.nextPart.set(t, i)), n = i;
	}
	return n;
}, Be = (e) => "isThemeGetter" in e && e.isThemeGetter === !0, Ve = (e) => {
	if (e < 1) return {
		get: () => void 0,
		set: () => {}
	};
	let t = 0, n = Object.create(null), r = Object.create(null), i = (i, a) => {
		n[i] = a, t++, t > e && (t = 0, r = n, n = Object.create(null));
	};
	return {
		get(e) {
			let t = n[e];
			if (t !== void 0) return t;
			if ((t = r[e]) !== void 0) return i(e, t), t;
		},
		set(e, t) {
			e in n ? n[e] = t : i(e, t);
		}
	};
}, He = "!", Ue = ":", We = [], Ge = (e, t, n, r, i) => ({
	modifiers: e,
	hasImportantModifier: t,
	baseClassName: n,
	maybePostfixModifierPosition: r,
	isExternal: i
}), Ke = (e) => {
	let { prefix: t, experimentalParseClassName: n } = e, r = (e) => {
		let t = [], n = 0, r = 0, i = 0, a, o = e.length;
		for (let s = 0; s < o; s++) {
			let o = e[s];
			if (n === 0 && r === 0) {
				if (o === Ue) {
					t.push(e.slice(i, s)), i = s + 1;
					continue;
				}
				if (o === "/") {
					a = s;
					continue;
				}
			}
			o === "[" ? n++ : o === "]" ? n-- : o === "(" ? r++ : o === ")" && r--;
		}
		let s = t.length === 0 ? e : e.slice(i), c = s, l = !1;
		s.endsWith(He) ? (c = s.slice(0, -1), l = !0) : s.startsWith(He) && (c = s.slice(1), l = !0);
		let u = a && a > i ? a - i : void 0;
		return Ge(t, l, c, u);
	};
	if (t) {
		let e = t + Ue, n = r;
		r = (t) => t.startsWith(e) ? n(t.slice(e.length)) : Ge(We, !1, t, void 0, !0);
	}
	if (n) {
		let e = r;
		r = (t) => n({
			className: t,
			parseClassName: e
		});
	}
	return r;
}, qe = (e) => {
	let t = /* @__PURE__ */ new Map();
	return e.orderSensitiveModifiers.forEach((e, n) => {
		t.set(e, 1e6 + n);
	}), (e) => {
		let n = [], r = [];
		for (let i = 0; i < e.length; i++) {
			let a = e[i], o = a[0] === "[", s = t.has(a);
			o || s ? (r.length > 0 && (r.sort(), n.push(...r), r = []), n.push(a)) : r.push(a);
		}
		return r.length > 0 && (r.sort(), n.push(...r)), n;
	};
}, Je = (e) => ({
	cache: Ve(e.cacheSize),
	parseClassName: Ke(e),
	sortModifiers: qe(e),
	...ke(e)
}), Ye = /\s+/, Xe = (e, t) => {
	let { parseClassName: n, getClassGroupId: r, getConflictingClassGroupIds: i, sortModifiers: a } = t, o = [], s = e.trim().split(Ye), c = "";
	for (let e = s.length - 1; e >= 0; --e) {
		let t = s[e], { isExternal: l, modifiers: u, hasImportantModifier: d, baseClassName: f, maybePostfixModifierPosition: p } = n(t);
		if (l) {
			c = t + (c.length > 0 ? " " + c : c);
			continue;
		}
		let m = !!p, h = r(m ? f.substring(0, p) : f);
		if (!h) {
			if (!m) {
				c = t + (c.length > 0 ? " " + c : c);
				continue;
			}
			if (h = r(f), !h) {
				c = t + (c.length > 0 ? " " + c : c);
				continue;
			}
			m = !1;
		}
		let g = u.length === 0 ? "" : u.length === 1 ? u[0] : a(u).join(":"), _ = d ? g + He : g, v = _ + h;
		if (o.indexOf(v) > -1) continue;
		o.push(v);
		let y = i(h, m);
		for (let e = 0; e < y.length; ++e) {
			let t = y[e];
			o.push(_ + t);
		}
		c = t + (c.length > 0 ? " " + c : c);
	}
	return c;
}, Ze = (...e) => {
	let t = 0, n, r, i = "";
	for (; t < e.length;) (n = e[t++]) && (r = Qe(n)) && (i && (i += " "), i += r);
	return i;
}, Qe = (e) => {
	if (typeof e == "string") return e;
	let t, n = "";
	for (let r = 0; r < e.length; r++) e[r] && (t = Qe(e[r])) && (n && (n += " "), n += t);
	return n;
}, $e = (e, ...t) => {
	let n, r, i, a, o = (o) => (n = Je(t.reduce((e, t) => t(e), e())), r = n.cache.get, i = n.cache.set, a = s, s(o)), s = (e) => {
		let t = r(e);
		if (t) return t;
		let a = Xe(e, n);
		return i(e, a), a;
	};
	return a = o, (...e) => a(Ze(...e));
}, et = [], tt = (e) => {
	let t = (t) => t[e] || et;
	return t.isThemeGetter = !0, t;
}, nt = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, rt = /^\((?:(\w[\w-]*):)?(.+)\)$/i, it = /^\d+\/\d+$/, at = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, ot = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, st = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, ct = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, lt = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, ut = (e) => it.test(e), z = (e) => !!e && !Number.isNaN(Number(e)), dt = (e) => !!e && Number.isInteger(Number(e)), ft = (e) => e.endsWith("%") && z(e.slice(0, -1)), pt = (e) => at.test(e), mt = () => !0, ht = (e) => ot.test(e) && !st.test(e), gt = () => !1, _t = (e) => ct.test(e), vt = (e) => lt.test(e), yt = (e) => !B(e) && !V(e), bt = (e) => Mt(e, It, gt), B = (e) => nt.test(e), xt = (e) => Mt(e, Lt, ht), St = (e) => Mt(e, Rt, z), Ct = (e) => Mt(e, Pt, gt), wt = (e) => Mt(e, Ft, vt), Tt = (e) => Mt(e, Bt, _t), V = (e) => rt.test(e), Et = (e) => Nt(e, Lt), Dt = (e) => Nt(e, zt), Ot = (e) => Nt(e, Pt), kt = (e) => Nt(e, It), At = (e) => Nt(e, Ft), jt = (e) => Nt(e, Bt, !0), Mt = (e, t, n) => {
	let r = nt.exec(e);
	return r ? r[1] ? t(r[1]) : n(r[2]) : !1;
}, Nt = (e, t, n = !1) => {
	let r = rt.exec(e);
	return r ? r[1] ? t(r[1]) : n : !1;
}, Pt = (e) => e === "position" || e === "percentage", Ft = (e) => e === "image" || e === "url", It = (e) => e === "length" || e === "size" || e === "bg-size", Lt = (e) => e === "length", Rt = (e) => e === "number", zt = (e) => e === "family-name", Bt = (e) => e === "shadow", Vt = /* @__PURE__ */ $e(() => {
	let e = tt("color"), t = tt("font"), n = tt("text"), r = tt("font-weight"), i = tt("tracking"), a = tt("leading"), o = tt("breakpoint"), s = tt("container"), c = tt("spacing"), l = tt("radius"), u = tt("shadow"), d = tt("inset-shadow"), f = tt("text-shadow"), p = tt("drop-shadow"), m = tt("blur"), h = tt("perspective"), g = tt("aspect"), _ = tt("ease"), v = tt("animate"), y = () => [
		"auto",
		"avoid",
		"all",
		"avoid-page",
		"page",
		"left",
		"right",
		"column"
	], b = () => [
		"center",
		"top",
		"bottom",
		"left",
		"right",
		"top-left",
		"left-top",
		"top-right",
		"right-top",
		"bottom-right",
		"right-bottom",
		"bottom-left",
		"left-bottom"
	], x = () => [
		...b(),
		V,
		B
	], S = () => [
		"auto",
		"hidden",
		"clip",
		"visible",
		"scroll"
	], C = () => [
		"auto",
		"contain",
		"none"
	], w = () => [
		V,
		B,
		c
	], T = () => [
		ut,
		"full",
		"auto",
		...w()
	], E = () => [
		dt,
		"none",
		"subgrid",
		V,
		B
	], D = () => [
		"auto",
		{ span: [
			"full",
			dt,
			V,
			B
		] },
		dt,
		V,
		B
	], O = () => [
		dt,
		"auto",
		V,
		B
	], k = () => [
		"auto",
		"min",
		"max",
		"fr",
		V,
		B
	], A = () => [
		"start",
		"end",
		"center",
		"between",
		"around",
		"evenly",
		"stretch",
		"baseline",
		"center-safe",
		"end-safe"
	], j = () => [
		"start",
		"end",
		"center",
		"stretch",
		"center-safe",
		"end-safe"
	], M = () => ["auto", ...w()], N = () => [
		ut,
		"auto",
		"full",
		"dvw",
		"dvh",
		"lvw",
		"lvh",
		"svw",
		"svh",
		"min",
		"max",
		"fit",
		...w()
	], P = () => [
		e,
		V,
		B
	], F = () => [
		...b(),
		Ot,
		Ct,
		{ position: [V, B] }
	], I = () => ["no-repeat", { repeat: [
		"",
		"x",
		"y",
		"space",
		"round"
	] }], ee = () => [
		"auto",
		"cover",
		"contain",
		kt,
		bt,
		{ size: [V, B] }
	], te = () => [
		ft,
		Et,
		xt
	], ne = () => [
		"",
		"none",
		"full",
		l,
		V,
		B
	], re = () => [
		"",
		z,
		Et,
		xt
	], ie = () => [
		"solid",
		"dashed",
		"dotted",
		"double"
	], ae = () => [
		"normal",
		"multiply",
		"screen",
		"overlay",
		"darken",
		"lighten",
		"color-dodge",
		"color-burn",
		"hard-light",
		"soft-light",
		"difference",
		"exclusion",
		"hue",
		"saturation",
		"color",
		"luminosity"
	], L = () => [
		z,
		ft,
		Ot,
		Ct
	], R = () => [
		"",
		"none",
		m,
		V,
		B
	], oe = () => [
		"none",
		z,
		V,
		B
	], se = () => [
		"none",
		z,
		V,
		B
	], ce = () => [
		z,
		V,
		B
	], le = () => [
		ut,
		"full",
		...w()
	];
	return {
		cacheSize: 500,
		theme: {
			animate: [
				"spin",
				"ping",
				"pulse",
				"bounce"
			],
			aspect: ["video"],
			blur: [pt],
			breakpoint: [pt],
			color: [mt],
			container: [pt],
			"drop-shadow": [pt],
			ease: [
				"in",
				"out",
				"in-out"
			],
			font: [yt],
			"font-weight": [
				"thin",
				"extralight",
				"light",
				"normal",
				"medium",
				"semibold",
				"bold",
				"extrabold",
				"black"
			],
			"inset-shadow": [pt],
			leading: [
				"none",
				"tight",
				"snug",
				"normal",
				"relaxed",
				"loose"
			],
			perspective: [
				"dramatic",
				"near",
				"normal",
				"midrange",
				"distant",
				"none"
			],
			radius: [pt],
			shadow: [pt],
			spacing: ["px", z],
			text: [pt],
			"text-shadow": [pt],
			tracking: [
				"tighter",
				"tight",
				"normal",
				"wide",
				"wider",
				"widest"
			]
		},
		classGroups: {
			aspect: [{ aspect: [
				"auto",
				"square",
				ut,
				B,
				V,
				g
			] }],
			container: ["container"],
			columns: [{ columns: [
				z,
				B,
				V,
				s
			] }],
			"break-after": [{ "break-after": y() }],
			"break-before": [{ "break-before": y() }],
			"break-inside": [{ "break-inside": [
				"auto",
				"avoid",
				"avoid-page",
				"avoid-column"
			] }],
			"box-decoration": [{ "box-decoration": ["slice", "clone"] }],
			box: [{ box: ["border", "content"] }],
			display: [
				"block",
				"inline-block",
				"inline",
				"flex",
				"inline-flex",
				"table",
				"inline-table",
				"table-caption",
				"table-cell",
				"table-column",
				"table-column-group",
				"table-footer-group",
				"table-header-group",
				"table-row-group",
				"table-row",
				"flow-root",
				"grid",
				"inline-grid",
				"contents",
				"list-item",
				"hidden"
			],
			sr: ["sr-only", "not-sr-only"],
			float: [{ float: [
				"right",
				"left",
				"none",
				"start",
				"end"
			] }],
			clear: [{ clear: [
				"left",
				"right",
				"both",
				"none",
				"start",
				"end"
			] }],
			isolation: ["isolate", "isolation-auto"],
			"object-fit": [{ object: [
				"contain",
				"cover",
				"fill",
				"none",
				"scale-down"
			] }],
			"object-position": [{ object: x() }],
			overflow: [{ overflow: S() }],
			"overflow-x": [{ "overflow-x": S() }],
			"overflow-y": [{ "overflow-y": S() }],
			overscroll: [{ overscroll: C() }],
			"overscroll-x": [{ "overscroll-x": C() }],
			"overscroll-y": [{ "overscroll-y": C() }],
			position: [
				"static",
				"fixed",
				"absolute",
				"relative",
				"sticky"
			],
			inset: [{ inset: T() }],
			"inset-x": [{ "inset-x": T() }],
			"inset-y": [{ "inset-y": T() }],
			start: [{ start: T() }],
			end: [{ end: T() }],
			top: [{ top: T() }],
			right: [{ right: T() }],
			bottom: [{ bottom: T() }],
			left: [{ left: T() }],
			visibility: [
				"visible",
				"invisible",
				"collapse"
			],
			z: [{ z: [
				dt,
				"auto",
				V,
				B
			] }],
			basis: [{ basis: [
				ut,
				"full",
				"auto",
				s,
				...w()
			] }],
			"flex-direction": [{ flex: [
				"row",
				"row-reverse",
				"col",
				"col-reverse"
			] }],
			"flex-wrap": [{ flex: [
				"nowrap",
				"wrap",
				"wrap-reverse"
			] }],
			flex: [{ flex: [
				z,
				ut,
				"auto",
				"initial",
				"none",
				B
			] }],
			grow: [{ grow: [
				"",
				z,
				V,
				B
			] }],
			shrink: [{ shrink: [
				"",
				z,
				V,
				B
			] }],
			order: [{ order: [
				dt,
				"first",
				"last",
				"none",
				V,
				B
			] }],
			"grid-cols": [{ "grid-cols": E() }],
			"col-start-end": [{ col: D() }],
			"col-start": [{ "col-start": O() }],
			"col-end": [{ "col-end": O() }],
			"grid-rows": [{ "grid-rows": E() }],
			"row-start-end": [{ row: D() }],
			"row-start": [{ "row-start": O() }],
			"row-end": [{ "row-end": O() }],
			"grid-flow": [{ "grid-flow": [
				"row",
				"col",
				"dense",
				"row-dense",
				"col-dense"
			] }],
			"auto-cols": [{ "auto-cols": k() }],
			"auto-rows": [{ "auto-rows": k() }],
			gap: [{ gap: w() }],
			"gap-x": [{ "gap-x": w() }],
			"gap-y": [{ "gap-y": w() }],
			"justify-content": [{ justify: [...A(), "normal"] }],
			"justify-items": [{ "justify-items": [...j(), "normal"] }],
			"justify-self": [{ "justify-self": ["auto", ...j()] }],
			"align-content": [{ content: ["normal", ...A()] }],
			"align-items": [{ items: [...j(), { baseline: ["", "last"] }] }],
			"align-self": [{ self: [
				"auto",
				...j(),
				{ baseline: ["", "last"] }
			] }],
			"place-content": [{ "place-content": A() }],
			"place-items": [{ "place-items": [...j(), "baseline"] }],
			"place-self": [{ "place-self": ["auto", ...j()] }],
			p: [{ p: w() }],
			px: [{ px: w() }],
			py: [{ py: w() }],
			ps: [{ ps: w() }],
			pe: [{ pe: w() }],
			pt: [{ pt: w() }],
			pr: [{ pr: w() }],
			pb: [{ pb: w() }],
			pl: [{ pl: w() }],
			m: [{ m: M() }],
			mx: [{ mx: M() }],
			my: [{ my: M() }],
			ms: [{ ms: M() }],
			me: [{ me: M() }],
			mt: [{ mt: M() }],
			mr: [{ mr: M() }],
			mb: [{ mb: M() }],
			ml: [{ ml: M() }],
			"space-x": [{ "space-x": w() }],
			"space-x-reverse": ["space-x-reverse"],
			"space-y": [{ "space-y": w() }],
			"space-y-reverse": ["space-y-reverse"],
			size: [{ size: N() }],
			w: [{ w: [
				s,
				"screen",
				...N()
			] }],
			"min-w": [{ "min-w": [
				s,
				"screen",
				"none",
				...N()
			] }],
			"max-w": [{ "max-w": [
				s,
				"screen",
				"none",
				"prose",
				{ screen: [o] },
				...N()
			] }],
			h: [{ h: [
				"screen",
				"lh",
				...N()
			] }],
			"min-h": [{ "min-h": [
				"screen",
				"lh",
				"none",
				...N()
			] }],
			"max-h": [{ "max-h": [
				"screen",
				"lh",
				...N()
			] }],
			"font-size": [{ text: [
				"base",
				n,
				Et,
				xt
			] }],
			"font-smoothing": ["antialiased", "subpixel-antialiased"],
			"font-style": ["italic", "not-italic"],
			"font-weight": [{ font: [
				r,
				V,
				St
			] }],
			"font-stretch": [{ "font-stretch": [
				"ultra-condensed",
				"extra-condensed",
				"condensed",
				"semi-condensed",
				"normal",
				"semi-expanded",
				"expanded",
				"extra-expanded",
				"ultra-expanded",
				ft,
				B
			] }],
			"font-family": [{ font: [
				Dt,
				B,
				t
			] }],
			"fvn-normal": ["normal-nums"],
			"fvn-ordinal": ["ordinal"],
			"fvn-slashed-zero": ["slashed-zero"],
			"fvn-figure": ["lining-nums", "oldstyle-nums"],
			"fvn-spacing": ["proportional-nums", "tabular-nums"],
			"fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
			tracking: [{ tracking: [
				i,
				V,
				B
			] }],
			"line-clamp": [{ "line-clamp": [
				z,
				"none",
				V,
				St
			] }],
			leading: [{ leading: [a, ...w()] }],
			"list-image": [{ "list-image": [
				"none",
				V,
				B
			] }],
			"list-style-position": [{ list: ["inside", "outside"] }],
			"list-style-type": [{ list: [
				"disc",
				"decimal",
				"none",
				V,
				B
			] }],
			"text-alignment": [{ text: [
				"left",
				"center",
				"right",
				"justify",
				"start",
				"end"
			] }],
			"placeholder-color": [{ placeholder: P() }],
			"text-color": [{ text: P() }],
			"text-decoration": [
				"underline",
				"overline",
				"line-through",
				"no-underline"
			],
			"text-decoration-style": [{ decoration: [...ie(), "wavy"] }],
			"text-decoration-thickness": [{ decoration: [
				z,
				"from-font",
				"auto",
				V,
				xt
			] }],
			"text-decoration-color": [{ decoration: P() }],
			"underline-offset": [{ "underline-offset": [
				z,
				"auto",
				V,
				B
			] }],
			"text-transform": [
				"uppercase",
				"lowercase",
				"capitalize",
				"normal-case"
			],
			"text-overflow": [
				"truncate",
				"text-ellipsis",
				"text-clip"
			],
			"text-wrap": [{ text: [
				"wrap",
				"nowrap",
				"balance",
				"pretty"
			] }],
			indent: [{ indent: w() }],
			"vertical-align": [{ align: [
				"baseline",
				"top",
				"middle",
				"bottom",
				"text-top",
				"text-bottom",
				"sub",
				"super",
				V,
				B
			] }],
			whitespace: [{ whitespace: [
				"normal",
				"nowrap",
				"pre",
				"pre-line",
				"pre-wrap",
				"break-spaces"
			] }],
			break: [{ break: [
				"normal",
				"words",
				"all",
				"keep"
			] }],
			wrap: [{ wrap: [
				"break-word",
				"anywhere",
				"normal"
			] }],
			hyphens: [{ hyphens: [
				"none",
				"manual",
				"auto"
			] }],
			content: [{ content: [
				"none",
				V,
				B
			] }],
			"bg-attachment": [{ bg: [
				"fixed",
				"local",
				"scroll"
			] }],
			"bg-clip": [{ "bg-clip": [
				"border",
				"padding",
				"content",
				"text"
			] }],
			"bg-origin": [{ "bg-origin": [
				"border",
				"padding",
				"content"
			] }],
			"bg-position": [{ bg: F() }],
			"bg-repeat": [{ bg: I() }],
			"bg-size": [{ bg: ee() }],
			"bg-image": [{ bg: [
				"none",
				{
					linear: [
						{ to: [
							"t",
							"tr",
							"r",
							"br",
							"b",
							"bl",
							"l",
							"tl"
						] },
						dt,
						V,
						B
					],
					radial: [
						"",
						V,
						B
					],
					conic: [
						dt,
						V,
						B
					]
				},
				At,
				wt
			] }],
			"bg-color": [{ bg: P() }],
			"gradient-from-pos": [{ from: te() }],
			"gradient-via-pos": [{ via: te() }],
			"gradient-to-pos": [{ to: te() }],
			"gradient-from": [{ from: P() }],
			"gradient-via": [{ via: P() }],
			"gradient-to": [{ to: P() }],
			rounded: [{ rounded: ne() }],
			"rounded-s": [{ "rounded-s": ne() }],
			"rounded-e": [{ "rounded-e": ne() }],
			"rounded-t": [{ "rounded-t": ne() }],
			"rounded-r": [{ "rounded-r": ne() }],
			"rounded-b": [{ "rounded-b": ne() }],
			"rounded-l": [{ "rounded-l": ne() }],
			"rounded-ss": [{ "rounded-ss": ne() }],
			"rounded-se": [{ "rounded-se": ne() }],
			"rounded-ee": [{ "rounded-ee": ne() }],
			"rounded-es": [{ "rounded-es": ne() }],
			"rounded-tl": [{ "rounded-tl": ne() }],
			"rounded-tr": [{ "rounded-tr": ne() }],
			"rounded-br": [{ "rounded-br": ne() }],
			"rounded-bl": [{ "rounded-bl": ne() }],
			"border-w": [{ border: re() }],
			"border-w-x": [{ "border-x": re() }],
			"border-w-y": [{ "border-y": re() }],
			"border-w-s": [{ "border-s": re() }],
			"border-w-e": [{ "border-e": re() }],
			"border-w-t": [{ "border-t": re() }],
			"border-w-r": [{ "border-r": re() }],
			"border-w-b": [{ "border-b": re() }],
			"border-w-l": [{ "border-l": re() }],
			"divide-x": [{ "divide-x": re() }],
			"divide-x-reverse": ["divide-x-reverse"],
			"divide-y": [{ "divide-y": re() }],
			"divide-y-reverse": ["divide-y-reverse"],
			"border-style": [{ border: [
				...ie(),
				"hidden",
				"none"
			] }],
			"divide-style": [{ divide: [
				...ie(),
				"hidden",
				"none"
			] }],
			"border-color": [{ border: P() }],
			"border-color-x": [{ "border-x": P() }],
			"border-color-y": [{ "border-y": P() }],
			"border-color-s": [{ "border-s": P() }],
			"border-color-e": [{ "border-e": P() }],
			"border-color-t": [{ "border-t": P() }],
			"border-color-r": [{ "border-r": P() }],
			"border-color-b": [{ "border-b": P() }],
			"border-color-l": [{ "border-l": P() }],
			"divide-color": [{ divide: P() }],
			"outline-style": [{ outline: [
				...ie(),
				"none",
				"hidden"
			] }],
			"outline-offset": [{ "outline-offset": [
				z,
				V,
				B
			] }],
			"outline-w": [{ outline: [
				"",
				z,
				Et,
				xt
			] }],
			"outline-color": [{ outline: P() }],
			shadow: [{ shadow: [
				"",
				"none",
				u,
				jt,
				Tt
			] }],
			"shadow-color": [{ shadow: P() }],
			"inset-shadow": [{ "inset-shadow": [
				"none",
				d,
				jt,
				Tt
			] }],
			"inset-shadow-color": [{ "inset-shadow": P() }],
			"ring-w": [{ ring: re() }],
			"ring-w-inset": ["ring-inset"],
			"ring-color": [{ ring: P() }],
			"ring-offset-w": [{ "ring-offset": [z, xt] }],
			"ring-offset-color": [{ "ring-offset": P() }],
			"inset-ring-w": [{ "inset-ring": re() }],
			"inset-ring-color": [{ "inset-ring": P() }],
			"text-shadow": [{ "text-shadow": [
				"none",
				f,
				jt,
				Tt
			] }],
			"text-shadow-color": [{ "text-shadow": P() }],
			opacity: [{ opacity: [
				z,
				V,
				B
			] }],
			"mix-blend": [{ "mix-blend": [
				...ae(),
				"plus-darker",
				"plus-lighter"
			] }],
			"bg-blend": [{ "bg-blend": ae() }],
			"mask-clip": [{ "mask-clip": [
				"border",
				"padding",
				"content",
				"fill",
				"stroke",
				"view"
			] }, "mask-no-clip"],
			"mask-composite": [{ mask: [
				"add",
				"subtract",
				"intersect",
				"exclude"
			] }],
			"mask-image-linear-pos": [{ "mask-linear": [z] }],
			"mask-image-linear-from-pos": [{ "mask-linear-from": L() }],
			"mask-image-linear-to-pos": [{ "mask-linear-to": L() }],
			"mask-image-linear-from-color": [{ "mask-linear-from": P() }],
			"mask-image-linear-to-color": [{ "mask-linear-to": P() }],
			"mask-image-t-from-pos": [{ "mask-t-from": L() }],
			"mask-image-t-to-pos": [{ "mask-t-to": L() }],
			"mask-image-t-from-color": [{ "mask-t-from": P() }],
			"mask-image-t-to-color": [{ "mask-t-to": P() }],
			"mask-image-r-from-pos": [{ "mask-r-from": L() }],
			"mask-image-r-to-pos": [{ "mask-r-to": L() }],
			"mask-image-r-from-color": [{ "mask-r-from": P() }],
			"mask-image-r-to-color": [{ "mask-r-to": P() }],
			"mask-image-b-from-pos": [{ "mask-b-from": L() }],
			"mask-image-b-to-pos": [{ "mask-b-to": L() }],
			"mask-image-b-from-color": [{ "mask-b-from": P() }],
			"mask-image-b-to-color": [{ "mask-b-to": P() }],
			"mask-image-l-from-pos": [{ "mask-l-from": L() }],
			"mask-image-l-to-pos": [{ "mask-l-to": L() }],
			"mask-image-l-from-color": [{ "mask-l-from": P() }],
			"mask-image-l-to-color": [{ "mask-l-to": P() }],
			"mask-image-x-from-pos": [{ "mask-x-from": L() }],
			"mask-image-x-to-pos": [{ "mask-x-to": L() }],
			"mask-image-x-from-color": [{ "mask-x-from": P() }],
			"mask-image-x-to-color": [{ "mask-x-to": P() }],
			"mask-image-y-from-pos": [{ "mask-y-from": L() }],
			"mask-image-y-to-pos": [{ "mask-y-to": L() }],
			"mask-image-y-from-color": [{ "mask-y-from": P() }],
			"mask-image-y-to-color": [{ "mask-y-to": P() }],
			"mask-image-radial": [{ "mask-radial": [V, B] }],
			"mask-image-radial-from-pos": [{ "mask-radial-from": L() }],
			"mask-image-radial-to-pos": [{ "mask-radial-to": L() }],
			"mask-image-radial-from-color": [{ "mask-radial-from": P() }],
			"mask-image-radial-to-color": [{ "mask-radial-to": P() }],
			"mask-image-radial-shape": [{ "mask-radial": ["circle", "ellipse"] }],
			"mask-image-radial-size": [{ "mask-radial": [{
				closest: ["side", "corner"],
				farthest: ["side", "corner"]
			}] }],
			"mask-image-radial-pos": [{ "mask-radial-at": b() }],
			"mask-image-conic-pos": [{ "mask-conic": [z] }],
			"mask-image-conic-from-pos": [{ "mask-conic-from": L() }],
			"mask-image-conic-to-pos": [{ "mask-conic-to": L() }],
			"mask-image-conic-from-color": [{ "mask-conic-from": P() }],
			"mask-image-conic-to-color": [{ "mask-conic-to": P() }],
			"mask-mode": [{ mask: [
				"alpha",
				"luminance",
				"match"
			] }],
			"mask-origin": [{ "mask-origin": [
				"border",
				"padding",
				"content",
				"fill",
				"stroke",
				"view"
			] }],
			"mask-position": [{ mask: F() }],
			"mask-repeat": [{ mask: I() }],
			"mask-size": [{ mask: ee() }],
			"mask-type": [{ "mask-type": ["alpha", "luminance"] }],
			"mask-image": [{ mask: [
				"none",
				V,
				B
			] }],
			filter: [{ filter: [
				"",
				"none",
				V,
				B
			] }],
			blur: [{ blur: R() }],
			brightness: [{ brightness: [
				z,
				V,
				B
			] }],
			contrast: [{ contrast: [
				z,
				V,
				B
			] }],
			"drop-shadow": [{ "drop-shadow": [
				"",
				"none",
				p,
				jt,
				Tt
			] }],
			"drop-shadow-color": [{ "drop-shadow": P() }],
			grayscale: [{ grayscale: [
				"",
				z,
				V,
				B
			] }],
			"hue-rotate": [{ "hue-rotate": [
				z,
				V,
				B
			] }],
			invert: [{ invert: [
				"",
				z,
				V,
				B
			] }],
			saturate: [{ saturate: [
				z,
				V,
				B
			] }],
			sepia: [{ sepia: [
				"",
				z,
				V,
				B
			] }],
			"backdrop-filter": [{ "backdrop-filter": [
				"",
				"none",
				V,
				B
			] }],
			"backdrop-blur": [{ "backdrop-blur": R() }],
			"backdrop-brightness": [{ "backdrop-brightness": [
				z,
				V,
				B
			] }],
			"backdrop-contrast": [{ "backdrop-contrast": [
				z,
				V,
				B
			] }],
			"backdrop-grayscale": [{ "backdrop-grayscale": [
				"",
				z,
				V,
				B
			] }],
			"backdrop-hue-rotate": [{ "backdrop-hue-rotate": [
				z,
				V,
				B
			] }],
			"backdrop-invert": [{ "backdrop-invert": [
				"",
				z,
				V,
				B
			] }],
			"backdrop-opacity": [{ "backdrop-opacity": [
				z,
				V,
				B
			] }],
			"backdrop-saturate": [{ "backdrop-saturate": [
				z,
				V,
				B
			] }],
			"backdrop-sepia": [{ "backdrop-sepia": [
				"",
				z,
				V,
				B
			] }],
			"border-collapse": [{ border: ["collapse", "separate"] }],
			"border-spacing": [{ "border-spacing": w() }],
			"border-spacing-x": [{ "border-spacing-x": w() }],
			"border-spacing-y": [{ "border-spacing-y": w() }],
			"table-layout": [{ table: ["auto", "fixed"] }],
			caption: [{ caption: ["top", "bottom"] }],
			transition: [{ transition: [
				"",
				"all",
				"colors",
				"opacity",
				"shadow",
				"transform",
				"none",
				V,
				B
			] }],
			"transition-behavior": [{ transition: ["normal", "discrete"] }],
			duration: [{ duration: [
				z,
				"initial",
				V,
				B
			] }],
			ease: [{ ease: [
				"linear",
				"initial",
				_,
				V,
				B
			] }],
			delay: [{ delay: [
				z,
				V,
				B
			] }],
			animate: [{ animate: [
				"none",
				v,
				V,
				B
			] }],
			backface: [{ backface: ["hidden", "visible"] }],
			perspective: [{ perspective: [
				h,
				V,
				B
			] }],
			"perspective-origin": [{ "perspective-origin": x() }],
			rotate: [{ rotate: oe() }],
			"rotate-x": [{ "rotate-x": oe() }],
			"rotate-y": [{ "rotate-y": oe() }],
			"rotate-z": [{ "rotate-z": oe() }],
			scale: [{ scale: se() }],
			"scale-x": [{ "scale-x": se() }],
			"scale-y": [{ "scale-y": se() }],
			"scale-z": [{ "scale-z": se() }],
			"scale-3d": ["scale-3d"],
			skew: [{ skew: ce() }],
			"skew-x": [{ "skew-x": ce() }],
			"skew-y": [{ "skew-y": ce() }],
			transform: [{ transform: [
				V,
				B,
				"",
				"none",
				"gpu",
				"cpu"
			] }],
			"transform-origin": [{ origin: x() }],
			"transform-style": [{ transform: ["3d", "flat"] }],
			translate: [{ translate: le() }],
			"translate-x": [{ "translate-x": le() }],
			"translate-y": [{ "translate-y": le() }],
			"translate-z": [{ "translate-z": le() }],
			"translate-none": ["translate-none"],
			accent: [{ accent: P() }],
			appearance: [{ appearance: ["none", "auto"] }],
			"caret-color": [{ caret: P() }],
			"color-scheme": [{ scheme: [
				"normal",
				"dark",
				"light",
				"light-dark",
				"only-dark",
				"only-light"
			] }],
			cursor: [{ cursor: [
				"auto",
				"default",
				"pointer",
				"wait",
				"text",
				"move",
				"help",
				"not-allowed",
				"none",
				"context-menu",
				"progress",
				"cell",
				"crosshair",
				"vertical-text",
				"alias",
				"copy",
				"no-drop",
				"grab",
				"grabbing",
				"all-scroll",
				"col-resize",
				"row-resize",
				"n-resize",
				"e-resize",
				"s-resize",
				"w-resize",
				"ne-resize",
				"nw-resize",
				"se-resize",
				"sw-resize",
				"ew-resize",
				"ns-resize",
				"nesw-resize",
				"nwse-resize",
				"zoom-in",
				"zoom-out",
				V,
				B
			] }],
			"field-sizing": [{ "field-sizing": ["fixed", "content"] }],
			"pointer-events": [{ "pointer-events": ["auto", "none"] }],
			resize: [{ resize: [
				"none",
				"",
				"y",
				"x"
			] }],
			"scroll-behavior": [{ scroll: ["auto", "smooth"] }],
			"scroll-m": [{ "scroll-m": w() }],
			"scroll-mx": [{ "scroll-mx": w() }],
			"scroll-my": [{ "scroll-my": w() }],
			"scroll-ms": [{ "scroll-ms": w() }],
			"scroll-me": [{ "scroll-me": w() }],
			"scroll-mt": [{ "scroll-mt": w() }],
			"scroll-mr": [{ "scroll-mr": w() }],
			"scroll-mb": [{ "scroll-mb": w() }],
			"scroll-ml": [{ "scroll-ml": w() }],
			"scroll-p": [{ "scroll-p": w() }],
			"scroll-px": [{ "scroll-px": w() }],
			"scroll-py": [{ "scroll-py": w() }],
			"scroll-ps": [{ "scroll-ps": w() }],
			"scroll-pe": [{ "scroll-pe": w() }],
			"scroll-pt": [{ "scroll-pt": w() }],
			"scroll-pr": [{ "scroll-pr": w() }],
			"scroll-pb": [{ "scroll-pb": w() }],
			"scroll-pl": [{ "scroll-pl": w() }],
			"snap-align": [{ snap: [
				"start",
				"end",
				"center",
				"align-none"
			] }],
			"snap-stop": [{ snap: ["normal", "always"] }],
			"snap-type": [{ snap: [
				"none",
				"x",
				"y",
				"both"
			] }],
			"snap-strictness": [{ snap: ["mandatory", "proximity"] }],
			touch: [{ touch: [
				"auto",
				"none",
				"manipulation"
			] }],
			"touch-x": [{ "touch-pan": [
				"x",
				"left",
				"right"
			] }],
			"touch-y": [{ "touch-pan": [
				"y",
				"up",
				"down"
			] }],
			"touch-pz": ["touch-pinch-zoom"],
			select: [{ select: [
				"none",
				"text",
				"all",
				"auto"
			] }],
			"will-change": [{ "will-change": [
				"auto",
				"scroll",
				"contents",
				"transform",
				V,
				B
			] }],
			fill: [{ fill: ["none", ...P()] }],
			"stroke-w": [{ stroke: [
				z,
				Et,
				xt,
				St
			] }],
			stroke: [{ stroke: ["none", ...P()] }],
			"forced-color-adjust": [{ "forced-color-adjust": ["auto", "none"] }]
		},
		conflictingClassGroups: {
			overflow: ["overflow-x", "overflow-y"],
			overscroll: ["overscroll-x", "overscroll-y"],
			inset: [
				"inset-x",
				"inset-y",
				"start",
				"end",
				"top",
				"right",
				"bottom",
				"left"
			],
			"inset-x": ["right", "left"],
			"inset-y": ["top", "bottom"],
			flex: [
				"basis",
				"grow",
				"shrink"
			],
			gap: ["gap-x", "gap-y"],
			p: [
				"px",
				"py",
				"ps",
				"pe",
				"pt",
				"pr",
				"pb",
				"pl"
			],
			px: ["pr", "pl"],
			py: ["pt", "pb"],
			m: [
				"mx",
				"my",
				"ms",
				"me",
				"mt",
				"mr",
				"mb",
				"ml"
			],
			mx: ["mr", "ml"],
			my: ["mt", "mb"],
			size: ["w", "h"],
			"font-size": ["leading"],
			"fvn-normal": [
				"fvn-ordinal",
				"fvn-slashed-zero",
				"fvn-figure",
				"fvn-spacing",
				"fvn-fraction"
			],
			"fvn-ordinal": ["fvn-normal"],
			"fvn-slashed-zero": ["fvn-normal"],
			"fvn-figure": ["fvn-normal"],
			"fvn-spacing": ["fvn-normal"],
			"fvn-fraction": ["fvn-normal"],
			"line-clamp": ["display", "overflow"],
			rounded: [
				"rounded-s",
				"rounded-e",
				"rounded-t",
				"rounded-r",
				"rounded-b",
				"rounded-l",
				"rounded-ss",
				"rounded-se",
				"rounded-ee",
				"rounded-es",
				"rounded-tl",
				"rounded-tr",
				"rounded-br",
				"rounded-bl"
			],
			"rounded-s": ["rounded-ss", "rounded-es"],
			"rounded-e": ["rounded-se", "rounded-ee"],
			"rounded-t": ["rounded-tl", "rounded-tr"],
			"rounded-r": ["rounded-tr", "rounded-br"],
			"rounded-b": ["rounded-br", "rounded-bl"],
			"rounded-l": ["rounded-tl", "rounded-bl"],
			"border-spacing": ["border-spacing-x", "border-spacing-y"],
			"border-w": [
				"border-w-x",
				"border-w-y",
				"border-w-s",
				"border-w-e",
				"border-w-t",
				"border-w-r",
				"border-w-b",
				"border-w-l"
			],
			"border-w-x": ["border-w-r", "border-w-l"],
			"border-w-y": ["border-w-t", "border-w-b"],
			"border-color": [
				"border-color-x",
				"border-color-y",
				"border-color-s",
				"border-color-e",
				"border-color-t",
				"border-color-r",
				"border-color-b",
				"border-color-l"
			],
			"border-color-x": ["border-color-r", "border-color-l"],
			"border-color-y": ["border-color-t", "border-color-b"],
			translate: [
				"translate-x",
				"translate-y",
				"translate-none"
			],
			"translate-none": [
				"translate",
				"translate-x",
				"translate-y",
				"translate-z"
			],
			"scroll-m": [
				"scroll-mx",
				"scroll-my",
				"scroll-ms",
				"scroll-me",
				"scroll-mt",
				"scroll-mr",
				"scroll-mb",
				"scroll-ml"
			],
			"scroll-mx": ["scroll-mr", "scroll-ml"],
			"scroll-my": ["scroll-mt", "scroll-mb"],
			"scroll-p": [
				"scroll-px",
				"scroll-py",
				"scroll-ps",
				"scroll-pe",
				"scroll-pt",
				"scroll-pr",
				"scroll-pb",
				"scroll-pl"
			],
			"scroll-px": ["scroll-pr", "scroll-pl"],
			"scroll-py": ["scroll-pt", "scroll-pb"],
			touch: [
				"touch-x",
				"touch-y",
				"touch-pz"
			],
			"touch-x": ["touch"],
			"touch-y": ["touch"],
			"touch-pz": ["touch"]
		},
		conflictingClassGroupModifiers: { "font-size": ["leading"] },
		orderSensitiveModifiers: [
			"*",
			"**",
			"after",
			"backdrop",
			"before",
			"details-content",
			"file",
			"first-letter",
			"first-line",
			"marker",
			"placeholder",
			"selection"
		]
	};
});
//#endregion
//#region lib/utils.ts
function H(...e) {
	return Vt(ye(e));
}
//#endregion
//#region components/ui/button.tsx
var Ht = Se("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground hover:bg-primary/90",
			destructive: "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
			outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
			secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
			ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-9 px-4 py-2 has-[>svg]:px-3",
			sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
			lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
			icon: "size-9",
			"icon-sm": "size-8",
			"icon-lg": "size-10"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function U({ className: e, variant: t, size: n, asChild: r = !1, ...i }) {
	return /* @__PURE__ */ (0, L.jsx)(r ? fe : "button", {
		"data-slot": "button",
		className: H(Ht({
			variant: t,
			size: n,
			className: e
		})),
		...i
	});
}
//#endregion
//#region app/(protected)/certificates/create/data.ts
var Ut = (e) => e.type === "text" || e.type === void 0, Wt = (e) => e.type === "image", Gt = (e) => e.type === "table", Kt = (e) => e.type === "hyperlink", qt = [
	{
		value: "sans-serif",
		label: "Sans Serif"
	},
	{
		value: "serif",
		label: "Serif"
	},
	{
		value: "monospace",
		label: "Monospace"
	},
	{
		value: "cursive",
		label: "Cursive"
	},
	{
		value: "fantasy",
		label: "Fantasy"
	}
], Jt = [
	{
		id: "name",
		label: "Имя участника"
	},
	{
		id: "event",
		label: "Название мероприятия"
	},
	{
		id: "date",
		label: "Дата"
	},
	{
		id: "signature",
		label: "Подпись"
	},
	{
		id: "role",
		label: "Роль"
	},
	{
		id: "team",
		label: "Команда"
	}
], Yt = [
	{
		value: "all",
		label: "Все"
	},
	{
		value: "certificate",
		label: "Сертификаты"
	},
	{
		value: "diploma",
		label: "Дипломы"
	},
	{
		value: "document",
		label: "Документы"
	},
	{
		value: "modern",
		label: "Современные"
	}
], Xt = [
	{
		name: "Классический сертификат",
		description: "Стандартный шаблон сертификата об участии",
		category: "certificate",
		previewIcon: "📜",
		layers: [
			{
				id: "1",
				type: "text",
				text: "Сертификат об участии",
				x: 105,
				y: 50,
				fontSize: 48,
				fontFamily: "serif",
				color: "#1a1a1a",
				alignment: "center",
				width: 180,
				fontWeight: "bold"
			},
			{
				id: "2",
				type: "text",
				text: "Награждается",
				x: 105,
				y: 120,
				fontSize: 24,
				fontFamily: "serif",
				color: "#333333",
				alignment: "center",
				width: 140
			},
			{
				id: "3",
				type: "text",
				text: "Имя участника",
				x: 105,
				y: 150,
				fontSize: 36,
				fontFamily: "cursive",
				color: "#0066cc",
				alignment: "center",
				width: 180
			},
			{
				id: "4",
				type: "text",
				text: "за успешное участие в мероприятии",
				x: 105,
				y: 180,
				fontSize: 18,
				fontFamily: "sans-serif",
				color: "#555555",
				alignment: "center",
				width: 160
			},
			{
				id: "5",
				type: "text",
				text: "Название мероприятия",
				x: 105,
				y: 200,
				fontSize: 28,
				fontFamily: "sans-serif",
				color: "#1a1a1a",
				alignment: "center",
				width: 180,
				fontWeight: "bold"
			},
			{
				id: "6",
				type: "text",
				text: "Дата",
				x: 50,
				y: 250,
				fontSize: 16,
				fontFamily: "sans-serif",
				color: "#333333",
				alignment: "left",
				width: 60
			},
			{
				id: "7",
				type: "text",
				text: "Подпись организатора",
				x: 160,
				y: 250,
				fontSize: 16,
				fontFamily: "cursive",
				color: "#333333",
				alignment: "right",
				width: 60
			}
		]
	},
	{
		name: "Современный диплом",
		description: "Стильный диплом в минималистичном стиле",
		category: "modern",
		previewIcon: "🎓",
		layers: [
			{
				id: "1",
				type: "text",
				text: "ДИПЛОМ",
				x: 105,
				y: 40,
				fontSize: 60,
				fontFamily: "sans-serif",
				color: "#000000",
				alignment: "center",
				width: 180,
				fontWeight: "bold",
				letterSpacing: 5
			},
			{
				id: "2",
				type: "text",
				text: "ВРУЧАЕТСЯ",
				x: 105,
				y: 70,
				fontSize: 14,
				fontFamily: "sans-serif",
				color: "#666666",
				alignment: "center",
				width: 100,
				letterSpacing: 2
			},
			{
				id: "3",
				type: "text",
				text: "Имя Фамилия",
				x: 105,
				y: 110,
				fontSize: 42,
				fontFamily: "sans-serif",
				color: "#2563eb",
				alignment: "center",
				width: 190,
				fontWeight: "bold"
			},
			{
				id: "4",
				type: "text",
				text: "За занятое 1 место в хакатоне",
				x: 105,
				y: 140,
				fontSize: 20,
				fontFamily: "sans-serif",
				color: "#333333",
				alignment: "center",
				width: 160
			},
			{
				id: "5",
				type: "text",
				text: "Tech Event 2024",
				x: 105,
				y: 160,
				fontSize: 24,
				fontFamily: "sans-serif",
				color: "#000000",
				alignment: "center",
				width: 160,
				fontWeight: "bold"
			}
		]
	},
	{
		name: "Официальный документ",
		description: "Шаблон для служебных записок и приказов",
		category: "document",
		previewIcon: "📄",
		layers: [
			{
				id: "1",
				type: "text",
				text: "ШАПКА ОРГАНИЗАЦИИ",
				x: 105,
				y: 20,
				fontSize: 16,
				fontFamily: "serif",
				color: "#000000",
				alignment: "center",
				width: 180,
				fontWeight: "bold"
			},
			{
				id: "2",
				type: "text",
				text: "ПРИКАЗ",
				x: 105,
				y: 50,
				fontSize: 24,
				fontFamily: "serif",
				color: "#000000",
				alignment: "center",
				width: 100,
				fontWeight: "bold"
			},
			{
				id: "3",
				type: "text",
				text: "№ ____ от «__» _______ 20__ г.",
				x: 105,
				y: 60,
				fontSize: 14,
				fontFamily: "serif",
				color: "#000000",
				alignment: "center",
				width: 100
			},
			{
				id: "4",
				type: "text",
				text: "О проведении мероприятия",
				x: 105,
				y: 80,
				fontSize: 16,
				fontFamily: "serif",
				color: "#000000",
				alignment: "center",
				width: 160
			},
			{
				id: "5",
				type: "text",
				text: "В связи с необходимостью организации...",
				x: 20,
				y: 100,
				fontSize: 14,
				fontFamily: "serif",
				color: "#000000",
				alignment: "left",
				width: 170
			}
		]
	},
	{
		name: "Похвальная грамота",
		description: "Яркая грамота для награждения",
		category: "diploma",
		previewIcon: "🏆",
		layers: [
			{
				id: "1",
				type: "text",
				text: "ГРАМОТА",
				x: 105,
				y: 40,
				fontSize: 56,
				fontFamily: "serif",
				color: "#dc2626",
				alignment: "center",
				width: 180,
				fontWeight: "bold"
			},
			{
				id: "2",
				type: "text",
				text: "За отличные успехи",
				x: 105,
				y: 80,
				fontSize: 28,
				fontFamily: "serif",
				color: "#b91c1c",
				alignment: "center",
				width: 160
			},
			{
				id: "3",
				type: "text",
				text: "Награждается",
				x: 105,
				y: 110,
				fontSize: 20,
				fontFamily: "serif",
				color: "#333333",
				alignment: "center",
				width: 140
			},
			{
				id: "4",
				type: "text",
				text: "Имя Участника",
				x: 105,
				y: 140,
				fontSize: 40,
				fontFamily: "cursive",
				color: "#000000",
				alignment: "center",
				width: 180
			}
		]
	}
];
//#endregion
//#region components/ui/input.tsx
function Zt({ className: e, type: t, ...n }) {
	return /* @__PURE__ */ (0, L.jsx)("input", {
		type: t,
		"data-slot": "input",
		className: H("file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]", "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive", e),
		...n
	});
}
//#endregion
//#region node_modules/@radix-ui/react-label/node_modules/@radix-ui/react-compose-refs/dist/index.mjs
function Qt(e, t) {
	if (typeof e == "function") return e(t);
	e != null && (e.current = t);
}
function $t(...e) {
	return (t) => {
		let n = !1, r = e.map((e) => {
			let r = Qt(e, t);
			return !n && typeof r == "function" && (n = !0), r;
		});
		if (n) return () => {
			for (let t = 0; t < r.length; t++) {
				let n = r[t];
				typeof n == "function" ? n() : Qt(e[t], null);
			}
		};
	};
}
//#endregion
//#region node_modules/@radix-ui/react-label/node_modules/@radix-ui/react-slot/dist/index.mjs
/* @__NO_SIDE_EFFECTS__ */
function en(e) {
	let t = /* @__PURE__ */ tn(e), n = u.forwardRef((e, n) => {
		let { children: r, ...i } = e, a = u.Children.toArray(r), o = a.find(rn);
		if (o) {
			let e = o.props.children, r = a.map((t) => t === o ? u.Children.count(e) > 1 ? u.Children.only(null) : u.isValidElement(e) ? e.props.children : null : t);
			return /* @__PURE__ */ (0, L.jsx)(t, {
				...i,
				ref: n,
				children: u.isValidElement(e) ? u.cloneElement(e, void 0, r) : null
			});
		}
		return /* @__PURE__ */ (0, L.jsx)(t, {
			...i,
			ref: n,
			children: r
		});
	});
	return n.displayName = `${e}.Slot`, n;
}
/* @__NO_SIDE_EFFECTS__ */
function tn(e) {
	let t = u.forwardRef((e, t) => {
		let { children: n, ...r } = e;
		if (u.isValidElement(n)) {
			let e = on(n), i = an(r, n.props);
			return n.type !== u.Fragment && (i.ref = t ? $t(t, e) : e), u.cloneElement(n, i);
		}
		return u.Children.count(n) > 1 ? u.Children.only(null) : null;
	});
	return t.displayName = `${e}.SlotClone`, t;
}
var nn = Symbol("radix.slottable");
function rn(e) {
	return u.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === nn;
}
function an(e, t) {
	let n = { ...t };
	for (let r in t) {
		let i = e[r], a = t[r];
		/^on[A-Z]/.test(r) ? i && a ? n[r] = (...e) => {
			let t = a(...e);
			return i(...e), t;
		} : i && (n[r] = i) : r === "style" ? n[r] = {
			...i,
			...a
		} : r === "className" && (n[r] = [i, a].filter(Boolean).join(" "));
	}
	return {
		...e,
		...n
	};
}
function on(e) {
	let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
	return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
//#endregion
//#region node_modules/@radix-ui/react-label/node_modules/@radix-ui/react-primitive/dist/index.mjs
var sn = [
	"a",
	"button",
	"div",
	"form",
	"h2",
	"h3",
	"img",
	"input",
	"label",
	"li",
	"nav",
	"ol",
	"p",
	"select",
	"span",
	"svg",
	"ul"
].reduce((e, t) => {
	let n = /* @__PURE__ */ en(`Primitive.${t}`), r = u.forwardRef((e, r) => {
		let { asChild: i, ...a } = e, o = i ? n : t;
		return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ (0, L.jsx)(o, {
			...a,
			ref: r
		});
	});
	return r.displayName = `Primitive.${t}`, {
		...e,
		[t]: r
	};
}, {}), cn = "Label", ln = u.forwardRef((e, t) => /* @__PURE__ */ (0, L.jsx)(sn.label, {
	...e,
	ref: t,
	onMouseDown: (t) => {
		t.target.closest("button, input, select, textarea") || (e.onMouseDown?.(t), !t.defaultPrevented && t.detail > 1 && t.preventDefault());
	}
}));
ln.displayName = cn;
var un = ln;
//#endregion
//#region components/ui/label.tsx
function dn({ className: e, ...t }) {
	return /* @__PURE__ */ (0, L.jsx)(un, {
		"data-slot": "label",
		className: H("flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50", e),
		...t
	});
}
//#endregion
//#region node_modules/@radix-ui/number/dist/index.mjs
function fn(e, [t, n]) {
	return Math.min(n, Math.max(t, e));
}
//#endregion
//#region node_modules/@radix-ui/react-select/node_modules/@radix-ui/primitive/dist/index.mjs
function pn(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
	return function(r) {
		if (e?.(r), n === !1 || !r.defaultPrevented) return t?.(r);
	};
}
//#endregion
//#region node_modules/@radix-ui/react-select/node_modules/@radix-ui/react-context/dist/index.mjs
function mn(e, t = []) {
	let n = [];
	function r(t, r) {
		let i = u.createContext(r), a = n.length;
		n = [...n, r];
		let o = (t) => {
			let { scope: n, children: r, ...o } = t, s = n?.[e]?.[a] || i, c = u.useMemo(() => o, Object.values(o));
			return /* @__PURE__ */ (0, L.jsx)(s.Provider, {
				value: c,
				children: r
			});
		};
		o.displayName = t + "Provider";
		function s(n, o) {
			let s = o?.[e]?.[a] || i, c = u.useContext(s);
			if (c) return c;
			if (r !== void 0) return r;
			throw Error(`\`${n}\` must be used within \`${t}\``);
		}
		return [o, s];
	}
	let i = () => {
		let t = n.map((e) => u.createContext(e));
		return function(n) {
			let r = n?.[e] || t;
			return u.useMemo(() => ({ [`__scope${e}`]: {
				...n,
				[e]: r
			} }), [n, r]);
		};
	};
	return i.scopeName = e, [r, hn(i, ...t)];
}
function hn(...e) {
	let t = e[0];
	if (e.length === 1) return t;
	let n = () => {
		let n = e.map((e) => ({
			useScope: e(),
			scopeName: e.scopeName
		}));
		return function(e) {
			let r = n.reduce((t, { useScope: n, scopeName: r }) => {
				let i = n(e)[`__scope${r}`];
				return {
					...t,
					...i
				};
			}, {});
			return u.useMemo(() => ({ [`__scope${t.scopeName}`]: r }), [r]);
		};
	};
	return n.scopeName = t.scopeName, n;
}
//#endregion
//#region node_modules/@radix-ui/react-select/node_modules/@radix-ui/react-compose-refs/dist/index.mjs
function gn(e, t) {
	if (typeof e == "function") return e(t);
	e != null && (e.current = t);
}
function _n(...e) {
	return (t) => {
		let n = !1, r = e.map((e) => {
			let r = gn(e, t);
			return !n && typeof r == "function" && (n = !0), r;
		});
		if (n) return () => {
			for (let t = 0; t < r.length; t++) {
				let n = r[t];
				typeof n == "function" ? n() : gn(e[t], null);
			}
		};
	};
}
function vn(...e) {
	return u.useCallback(_n(...e), e);
}
//#endregion
//#region node_modules/@radix-ui/react-select/node_modules/@radix-ui/react-slot/dist/index.mjs
/* @__NO_SIDE_EFFECTS__ */
function yn(e) {
	let t = /* @__PURE__ */ bn(e), n = u.forwardRef((e, n) => {
		let { children: r, ...i } = e, a = u.Children.toArray(r), o = a.find(Sn);
		if (o) {
			let e = o.props.children, r = a.map((t) => t === o ? u.Children.count(e) > 1 ? u.Children.only(null) : u.isValidElement(e) ? e.props.children : null : t);
			return /* @__PURE__ */ (0, L.jsx)(t, {
				...i,
				ref: n,
				children: u.isValidElement(e) ? u.cloneElement(e, void 0, r) : null
			});
		}
		return /* @__PURE__ */ (0, L.jsx)(t, {
			...i,
			ref: n,
			children: r
		});
	});
	return n.displayName = `${e}.Slot`, n;
}
/* @__NO_SIDE_EFFECTS__ */
function bn(e) {
	let t = u.forwardRef((e, t) => {
		let { children: n, ...r } = e;
		if (u.isValidElement(n)) {
			let e = wn(n), i = Cn(r, n.props);
			return n.type !== u.Fragment && (i.ref = t ? _n(t, e) : e), u.cloneElement(n, i);
		}
		return u.Children.count(n) > 1 ? u.Children.only(null) : null;
	});
	return t.displayName = `${e}.SlotClone`, t;
}
var xn = Symbol("radix.slottable");
function Sn(e) {
	return u.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === xn;
}
function Cn(e, t) {
	let n = { ...t };
	for (let r in t) {
		let i = e[r], a = t[r];
		/^on[A-Z]/.test(r) ? i && a ? n[r] = (...e) => {
			let t = a(...e);
			return i(...e), t;
		} : i && (n[r] = i) : r === "style" ? n[r] = {
			...i,
			...a
		} : r === "className" && (n[r] = [i, a].filter(Boolean).join(" "));
	}
	return {
		...e,
		...n
	};
}
function wn(e) {
	let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
	return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
//#endregion
//#region node_modules/@radix-ui/react-select/node_modules/@radix-ui/react-collection/dist/index.mjs
function Tn(e) {
	let t = e + "CollectionProvider", [n, r] = mn(t), [i, a] = n(t, {
		collectionRef: { current: null },
		itemMap: /* @__PURE__ */ new Map()
	}), o = (e) => {
		let { scope: t, children: n } = e, r = u.useRef(null), a = u.useRef(/* @__PURE__ */ new Map()).current;
		return /* @__PURE__ */ (0, L.jsx)(i, {
			scope: t,
			itemMap: a,
			collectionRef: r,
			children: n
		});
	};
	o.displayName = t;
	let s = e + "CollectionSlot", c = /* @__PURE__ */ yn(s), l = u.forwardRef((e, t) => {
		let { scope: n, children: r } = e;
		return /* @__PURE__ */ (0, L.jsx)(c, {
			ref: vn(t, a(s, n).collectionRef),
			children: r
		});
	});
	l.displayName = s;
	let d = e + "CollectionItemSlot", f = "data-radix-collection-item", p = /* @__PURE__ */ yn(d), m = u.forwardRef((e, t) => {
		let { scope: n, children: r, ...i } = e, o = u.useRef(null), s = vn(t, o), c = a(d, n);
		return u.useEffect(() => (c.itemMap.set(o, {
			ref: o,
			...i
		}), () => void c.itemMap.delete(o))), /* @__PURE__ */ (0, L.jsx)(p, {
			[f]: "",
			ref: s,
			children: r
		});
	});
	m.displayName = d;
	function h(t) {
		let n = a(e + "CollectionConsumer", t);
		return u.useCallback(() => {
			let e = n.collectionRef.current;
			if (!e) return [];
			let t = Array.from(e.querySelectorAll(`[${f}]`));
			return Array.from(n.itemMap.values()).sort((e, n) => t.indexOf(e.ref.current) - t.indexOf(n.ref.current));
		}, [n.collectionRef, n.itemMap]);
	}
	return [
		{
			Provider: o,
			Slot: l,
			ItemSlot: m
		},
		h,
		r
	];
}
//#endregion
//#region node_modules/@radix-ui/react-select/node_modules/@radix-ui/react-direction/dist/index.mjs
var En = u.createContext(void 0);
function Dn(e) {
	let t = u.useContext(En);
	return e || t || "ltr";
}
//#endregion
//#region node_modules/@radix-ui/react-dismissable-layer/node_modules/@radix-ui/primitive/dist/index.mjs
function On(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
	return function(r) {
		if (e?.(r), n === !1 || !r.defaultPrevented) return t?.(r);
	};
}
//#endregion
//#region node_modules/@radix-ui/react-dismissable-layer/node_modules/@radix-ui/react-compose-refs/dist/index.mjs
function kn(e, t) {
	if (typeof e == "function") return e(t);
	e != null && (e.current = t);
}
function An(...e) {
	return (t) => {
		let n = !1, r = e.map((e) => {
			let r = kn(e, t);
			return !n && typeof r == "function" && (n = !0), r;
		});
		if (n) return () => {
			for (let t = 0; t < r.length; t++) {
				let n = r[t];
				typeof n == "function" ? n() : kn(e[t], null);
			}
		};
	};
}
function jn(...e) {
	return u.useCallback(An(...e), e);
}
//#endregion
//#region node_modules/@radix-ui/react-dismissable-layer/node_modules/@radix-ui/react-slot/dist/index.mjs
/* @__NO_SIDE_EFFECTS__ */
function Mn(e) {
	let t = /* @__PURE__ */ Nn(e), n = u.forwardRef((e, n) => {
		let { children: r, ...i } = e, a = u.Children.toArray(r), o = a.find(Fn);
		if (o) {
			let e = o.props.children, r = a.map((t) => t === o ? u.Children.count(e) > 1 ? u.Children.only(null) : u.isValidElement(e) ? e.props.children : null : t);
			return /* @__PURE__ */ (0, L.jsx)(t, {
				...i,
				ref: n,
				children: u.isValidElement(e) ? u.cloneElement(e, void 0, r) : null
			});
		}
		return /* @__PURE__ */ (0, L.jsx)(t, {
			...i,
			ref: n,
			children: r
		});
	});
	return n.displayName = `${e}.Slot`, n;
}
/* @__NO_SIDE_EFFECTS__ */
function Nn(e) {
	let t = u.forwardRef((e, t) => {
		let { children: n, ...r } = e;
		if (u.isValidElement(n)) {
			let e = Ln(n), i = In(r, n.props);
			return n.type !== u.Fragment && (i.ref = t ? An(t, e) : e), u.cloneElement(n, i);
		}
		return u.Children.count(n) > 1 ? u.Children.only(null) : null;
	});
	return t.displayName = `${e}.SlotClone`, t;
}
var Pn = Symbol("radix.slottable");
function Fn(e) {
	return u.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === Pn;
}
function In(e, t) {
	let n = { ...t };
	for (let r in t) {
		let i = e[r], a = t[r];
		/^on[A-Z]/.test(r) ? i && a ? n[r] = (...e) => {
			let t = a(...e);
			return i(...e), t;
		} : i && (n[r] = i) : r === "style" ? n[r] = {
			...i,
			...a
		} : r === "className" && (n[r] = [i, a].filter(Boolean).join(" "));
	}
	return {
		...e,
		...n
	};
}
function Ln(e) {
	let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
	return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
//#endregion
//#region node_modules/@radix-ui/react-dismissable-layer/node_modules/@radix-ui/react-primitive/dist/index.mjs
var Rn = [
	"a",
	"button",
	"div",
	"form",
	"h2",
	"h3",
	"img",
	"input",
	"label",
	"li",
	"nav",
	"ol",
	"p",
	"select",
	"span",
	"svg",
	"ul"
].reduce((e, t) => {
	let n = /* @__PURE__ */ Mn(`Primitive.${t}`), r = u.forwardRef((e, r) => {
		let { asChild: i, ...a } = e, o = i ? n : t;
		return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ (0, L.jsx)(o, {
			...a,
			ref: r
		});
	});
	return r.displayName = `Primitive.${t}`, {
		...e,
		[t]: r
	};
}, {});
function zn(e, t) {
	e && d.flushSync(() => e.dispatchEvent(t));
}
//#endregion
//#region node_modules/@radix-ui/react-dismissable-layer/node_modules/@radix-ui/react-use-callback-ref/dist/index.mjs
function Bn(e) {
	let t = u.useRef(e);
	return u.useEffect(() => {
		t.current = e;
	}), u.useMemo(() => (...e) => t.current?.(...e), []);
}
//#endregion
//#region node_modules/@radix-ui/react-use-escape-keydown/node_modules/@radix-ui/react-use-callback-ref/dist/index.mjs
function Vn(e) {
	let t = u.useRef(e);
	return u.useEffect(() => {
		t.current = e;
	}), u.useMemo(() => (...e) => t.current?.(...e), []);
}
//#endregion
//#region node_modules/@radix-ui/react-use-escape-keydown/dist/index.mjs
function Hn(e, t = globalThis?.document) {
	let n = Vn(e);
	u.useEffect(() => {
		let e = (e) => {
			e.key === "Escape" && n(e);
		};
		return t.addEventListener("keydown", e, { capture: !0 }), () => t.removeEventListener("keydown", e, { capture: !0 });
	}, [n, t]);
}
//#endregion
//#region node_modules/@radix-ui/react-dismissable-layer/dist/index.mjs
var Un = "DismissableLayer", Wn = "dismissableLayer.update", Gn = "dismissableLayer.pointerDownOutside", Kn = "dismissableLayer.focusOutside", qn, Jn = u.createContext({
	layers: /* @__PURE__ */ new Set(),
	layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
	branches: /* @__PURE__ */ new Set()
}), Yn = u.forwardRef((e, t) => {
	let { disableOutsidePointerEvents: n = !1, onEscapeKeyDown: r, onPointerDownOutside: i, onFocusOutside: a, onInteractOutside: o, onDismiss: s, ...c } = e, l = u.useContext(Jn), [d, f] = u.useState(null), p = d?.ownerDocument ?? globalThis?.document, [, m] = u.useState({}), h = jn(t, (e) => f(e)), g = Array.from(l.layers), [_] = [...l.layersWithOutsidePointerEventsDisabled].slice(-1), v = g.indexOf(_), y = d ? g.indexOf(d) : -1, b = l.layersWithOutsidePointerEventsDisabled.size > 0, x = y >= v, S = Qn((e) => {
		let t = e.target, n = [...l.branches].some((e) => e.contains(t));
		!x || n || (i?.(e), o?.(e), e.defaultPrevented || s?.());
	}, p), C = $n((e) => {
		let t = e.target;
		[...l.branches].some((e) => e.contains(t)) || (a?.(e), o?.(e), e.defaultPrevented || s?.());
	}, p);
	return Hn((e) => {
		y === l.layers.size - 1 && (r?.(e), !e.defaultPrevented && s && (e.preventDefault(), s()));
	}, p), u.useEffect(() => {
		if (d) return n && (l.layersWithOutsidePointerEventsDisabled.size === 0 && (qn = p.body.style.pointerEvents, p.body.style.pointerEvents = "none"), l.layersWithOutsidePointerEventsDisabled.add(d)), l.layers.add(d), er(), () => {
			n && l.layersWithOutsidePointerEventsDisabled.size === 1 && (p.body.style.pointerEvents = qn);
		};
	}, [
		d,
		p,
		n,
		l
	]), u.useEffect(() => () => {
		d && (l.layers.delete(d), l.layersWithOutsidePointerEventsDisabled.delete(d), er());
	}, [d, l]), u.useEffect(() => {
		let e = () => m({});
		return document.addEventListener(Wn, e), () => document.removeEventListener(Wn, e);
	}, []), /* @__PURE__ */ (0, L.jsx)(Rn.div, {
		...c,
		ref: h,
		style: {
			pointerEvents: b ? x ? "auto" : "none" : void 0,
			...e.style
		},
		onFocusCapture: On(e.onFocusCapture, C.onFocusCapture),
		onBlurCapture: On(e.onBlurCapture, C.onBlurCapture),
		onPointerDownCapture: On(e.onPointerDownCapture, S.onPointerDownCapture)
	});
});
Yn.displayName = Un;
var Xn = "DismissableLayerBranch", Zn = u.forwardRef((e, t) => {
	let n = u.useContext(Jn), r = u.useRef(null), i = jn(t, r);
	return u.useEffect(() => {
		let e = r.current;
		if (e) return n.branches.add(e), () => {
			n.branches.delete(e);
		};
	}, [n.branches]), /* @__PURE__ */ (0, L.jsx)(Rn.div, {
		...e,
		ref: i
	});
});
Zn.displayName = Xn;
function Qn(e, t = globalThis?.document) {
	let n = Bn(e), r = u.useRef(!1), i = u.useRef(() => {});
	return u.useEffect(() => {
		let e = (e) => {
			if (e.target && !r.current) {
				let r = function() {
					tr(Gn, n, a, { discrete: !0 });
				}, a = { originalEvent: e };
				e.pointerType === "touch" ? (t.removeEventListener("click", i.current), i.current = r, t.addEventListener("click", i.current, { once: !0 })) : r();
			} else t.removeEventListener("click", i.current);
			r.current = !1;
		}, a = window.setTimeout(() => {
			t.addEventListener("pointerdown", e);
		}, 0);
		return () => {
			window.clearTimeout(a), t.removeEventListener("pointerdown", e), t.removeEventListener("click", i.current);
		};
	}, [t, n]), { onPointerDownCapture: () => r.current = !0 };
}
function $n(e, t = globalThis?.document) {
	let n = Bn(e), r = u.useRef(!1);
	return u.useEffect(() => {
		let e = (e) => {
			e.target && !r.current && tr(Kn, n, { originalEvent: e }, { discrete: !1 });
		};
		return t.addEventListener("focusin", e), () => t.removeEventListener("focusin", e);
	}, [t, n]), {
		onFocusCapture: () => r.current = !0,
		onBlurCapture: () => r.current = !1
	};
}
function er() {
	let e = new CustomEvent(Wn);
	document.dispatchEvent(e);
}
function tr(e, t, n, { discrete: r }) {
	let i = n.originalEvent.target, a = new CustomEvent(e, {
		bubbles: !1,
		cancelable: !0,
		detail: n
	});
	t && i.addEventListener(e, t, { once: !0 }), r ? zn(i, a) : i.dispatchEvent(a);
}
//#endregion
//#region node_modules/@radix-ui/react-focus-guards/dist/index.mjs
var nr = 0;
function rr() {
	u.useEffect(() => {
		let e = document.querySelectorAll("[data-radix-focus-guard]");
		return document.body.insertAdjacentElement("afterbegin", e[0] ?? ir()), document.body.insertAdjacentElement("beforeend", e[1] ?? ir()), nr++, () => {
			nr === 1 && document.querySelectorAll("[data-radix-focus-guard]").forEach((e) => e.remove()), nr--;
		};
	}, []);
}
function ir() {
	let e = document.createElement("span");
	return e.setAttribute("data-radix-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.pointerEvents = "none", e;
}
//#endregion
//#region node_modules/@radix-ui/react-focus-scope/node_modules/@radix-ui/react-compose-refs/dist/index.mjs
function ar(e, t) {
	if (typeof e == "function") return e(t);
	e != null && (e.current = t);
}
function or(...e) {
	return (t) => {
		let n = !1, r = e.map((e) => {
			let r = ar(e, t);
			return !n && typeof r == "function" && (n = !0), r;
		});
		if (n) return () => {
			for (let t = 0; t < r.length; t++) {
				let n = r[t];
				typeof n == "function" ? n() : ar(e[t], null);
			}
		};
	};
}
function sr(...e) {
	return u.useCallback(or(...e), e);
}
//#endregion
//#region node_modules/@radix-ui/react-focus-scope/node_modules/@radix-ui/react-slot/dist/index.mjs
/* @__NO_SIDE_EFFECTS__ */
function cr(e) {
	let t = /* @__PURE__ */ lr(e), n = u.forwardRef((e, n) => {
		let { children: r, ...i } = e, a = u.Children.toArray(r), o = a.find(dr);
		if (o) {
			let e = o.props.children, r = a.map((t) => t === o ? u.Children.count(e) > 1 ? u.Children.only(null) : u.isValidElement(e) ? e.props.children : null : t);
			return /* @__PURE__ */ (0, L.jsx)(t, {
				...i,
				ref: n,
				children: u.isValidElement(e) ? u.cloneElement(e, void 0, r) : null
			});
		}
		return /* @__PURE__ */ (0, L.jsx)(t, {
			...i,
			ref: n,
			children: r
		});
	});
	return n.displayName = `${e}.Slot`, n;
}
/* @__NO_SIDE_EFFECTS__ */
function lr(e) {
	let t = u.forwardRef((e, t) => {
		let { children: n, ...r } = e;
		if (u.isValidElement(n)) {
			let e = pr(n), i = fr(r, n.props);
			return n.type !== u.Fragment && (i.ref = t ? or(t, e) : e), u.cloneElement(n, i);
		}
		return u.Children.count(n) > 1 ? u.Children.only(null) : null;
	});
	return t.displayName = `${e}.SlotClone`, t;
}
var ur = Symbol("radix.slottable");
function dr(e) {
	return u.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === ur;
}
function fr(e, t) {
	let n = { ...t };
	for (let r in t) {
		let i = e[r], a = t[r];
		/^on[A-Z]/.test(r) ? i && a ? n[r] = (...e) => {
			let t = a(...e);
			return i(...e), t;
		} : i && (n[r] = i) : r === "style" ? n[r] = {
			...i,
			...a
		} : r === "className" && (n[r] = [i, a].filter(Boolean).join(" "));
	}
	return {
		...e,
		...n
	};
}
function pr(e) {
	let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
	return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
//#endregion
//#region node_modules/@radix-ui/react-focus-scope/node_modules/@radix-ui/react-primitive/dist/index.mjs
var mr = [
	"a",
	"button",
	"div",
	"form",
	"h2",
	"h3",
	"img",
	"input",
	"label",
	"li",
	"nav",
	"ol",
	"p",
	"select",
	"span",
	"svg",
	"ul"
].reduce((e, t) => {
	let n = /* @__PURE__ */ cr(`Primitive.${t}`), r = u.forwardRef((e, r) => {
		let { asChild: i, ...a } = e, o = i ? n : t;
		return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ (0, L.jsx)(o, {
			...a,
			ref: r
		});
	});
	return r.displayName = `Primitive.${t}`, {
		...e,
		[t]: r
	};
}, {});
//#endregion
//#region node_modules/@radix-ui/react-focus-scope/node_modules/@radix-ui/react-use-callback-ref/dist/index.mjs
function hr(e) {
	let t = u.useRef(e);
	return u.useEffect(() => {
		t.current = e;
	}), u.useMemo(() => (...e) => t.current?.(...e), []);
}
//#endregion
//#region node_modules/@radix-ui/react-focus-scope/dist/index.mjs
var gr = "focusScope.autoFocusOnMount", _r = "focusScope.autoFocusOnUnmount", vr = {
	bubbles: !1,
	cancelable: !0
}, yr = "FocusScope", br = u.forwardRef((e, t) => {
	let { loop: n = !1, trapped: r = !1, onMountAutoFocus: i, onUnmountAutoFocus: a, ...o } = e, [s, c] = u.useState(null), l = hr(i), d = hr(a), f = u.useRef(null), p = sr(t, (e) => c(e)), m = u.useRef({
		paused: !1,
		pause() {
			this.paused = !0;
		},
		resume() {
			this.paused = !1;
		}
	}).current;
	u.useEffect(() => {
		if (r) {
			let e = function(e) {
				if (m.paused || !s) return;
				let t = e.target;
				s.contains(t) ? f.current = t : Dr(f.current, { select: !0 });
			}, t = function(e) {
				if (m.paused || !s) return;
				let t = e.relatedTarget;
				t !== null && (s.contains(t) || Dr(f.current, { select: !0 }));
			}, n = function(e) {
				if (document.activeElement === document.body) for (let t of e) t.removedNodes.length > 0 && Dr(s);
			};
			document.addEventListener("focusin", e), document.addEventListener("focusout", t);
			let r = new MutationObserver(n);
			return s && r.observe(s, {
				childList: !0,
				subtree: !0
			}), () => {
				document.removeEventListener("focusin", e), document.removeEventListener("focusout", t), r.disconnect();
			};
		}
	}, [
		r,
		s,
		m.paused
	]), u.useEffect(() => {
		if (s) {
			Or.add(m);
			let e = document.activeElement;
			if (!s.contains(e)) {
				let t = new CustomEvent(gr, vr);
				s.addEventListener(gr, l), s.dispatchEvent(t), t.defaultPrevented || (xr(jr(Cr(s)), { select: !0 }), document.activeElement === e && Dr(s));
			}
			return () => {
				s.removeEventListener(gr, l), setTimeout(() => {
					let t = new CustomEvent(_r, vr);
					s.addEventListener(_r, d), s.dispatchEvent(t), t.defaultPrevented || Dr(e ?? document.body, { select: !0 }), s.removeEventListener(_r, d), Or.remove(m);
				}, 0);
			};
		}
	}, [
		s,
		l,
		d,
		m
	]);
	let h = u.useCallback((e) => {
		if (!n && !r || m.paused) return;
		let t = e.key === "Tab" && !e.altKey && !e.ctrlKey && !e.metaKey, i = document.activeElement;
		if (t && i) {
			let t = e.currentTarget, [r, a] = Sr(t);
			r && a ? !e.shiftKey && i === a ? (e.preventDefault(), n && Dr(r, { select: !0 })) : e.shiftKey && i === r && (e.preventDefault(), n && Dr(a, { select: !0 })) : i === t && e.preventDefault();
		}
	}, [
		n,
		r,
		m.paused
	]);
	return /* @__PURE__ */ (0, L.jsx)(mr.div, {
		tabIndex: -1,
		...o,
		ref: p,
		onKeyDown: h
	});
});
br.displayName = yr;
function xr(e, { select: t = !1 } = {}) {
	let n = document.activeElement;
	for (let r of e) if (Dr(r, { select: t }), document.activeElement !== n) return;
}
function Sr(e) {
	let t = Cr(e);
	return [wr(t, e), wr(t.reverse(), e)];
}
function Cr(e) {
	let t = [], n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, { acceptNode: (e) => {
		let t = e.tagName === "INPUT" && e.type === "hidden";
		return e.disabled || e.hidden || t ? NodeFilter.FILTER_SKIP : e.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
	} });
	for (; n.nextNode();) t.push(n.currentNode);
	return t;
}
function wr(e, t) {
	for (let n of e) if (!Tr(n, { upTo: t })) return n;
}
function Tr(e, { upTo: t }) {
	if (getComputedStyle(e).visibility === "hidden") return !0;
	for (; e;) {
		if (t !== void 0 && e === t) return !1;
		if (getComputedStyle(e).display === "none") return !0;
		e = e.parentElement;
	}
	return !1;
}
function Er(e) {
	return e instanceof HTMLInputElement && "select" in e;
}
function Dr(e, { select: t = !1 } = {}) {
	if (e && e.focus) {
		let n = document.activeElement;
		e.focus({ preventScroll: !0 }), e !== n && Er(e) && t && e.select();
	}
}
var Or = kr();
function kr() {
	let e = [];
	return {
		add(t) {
			let n = e[0];
			t !== n && n?.pause(), e = Ar(e, t), e.unshift(t);
		},
		remove(t) {
			e = Ar(e, t), e[0]?.resume();
		}
	};
}
function Ar(e, t) {
	let n = [...e], r = n.indexOf(t);
	return r !== -1 && n.splice(r, 1), n;
}
function jr(e) {
	return e.filter((e) => e.tagName !== "A");
}
//#endregion
//#region node_modules/@radix-ui/react-select/node_modules/@radix-ui/react-use-layout-effect/dist/index.mjs
var Mr = globalThis?.document ? u.useLayoutEffect : () => {}, Nr = u.useId || (() => void 0), Pr = 0;
function Fr(e) {
	let [t, n] = u.useState(Nr());
	return Mr(() => {
		e || n((e) => e ?? String(Pr++));
	}, [e]), e || (t ? `radix-${t}` : "");
}
//#endregion
//#region node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs
var Ir = [
	"top",
	"right",
	"bottom",
	"left"
], Lr = Math.min, Rr = Math.max, zr = Math.round, Br = Math.floor, Vr = (e) => ({
	x: e,
	y: e
}), Hr = {
	left: "right",
	right: "left",
	bottom: "top",
	top: "bottom"
}, Ur = {
	start: "end",
	end: "start"
};
function Wr(e, t, n) {
	return Rr(e, Lr(t, n));
}
function Gr(e, t) {
	return typeof e == "function" ? e(t) : e;
}
function Kr(e) {
	return e.split("-")[0];
}
function qr(e) {
	return e.split("-")[1];
}
function Jr(e) {
	return e === "x" ? "y" : "x";
}
function Yr(e) {
	return e === "y" ? "height" : "width";
}
function Xr(e) {
	return ["top", "bottom"].includes(Kr(e)) ? "y" : "x";
}
function Zr(e) {
	return Jr(Xr(e));
}
function Qr(e, t, n) {
	n === void 0 && (n = !1);
	let r = qr(e), i = Zr(e), a = Yr(i), o = i === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
	return t.reference[a] > t.floating[a] && (o = ri(o)), [o, ri(o)];
}
function $r(e) {
	let t = ri(e);
	return [
		ei(e),
		t,
		ei(t)
	];
}
function ei(e) {
	return e.replace(/start|end/g, (e) => Ur[e]);
}
function ti(e, t, n) {
	let r = ["left", "right"], i = ["right", "left"], a = ["top", "bottom"], o = ["bottom", "top"];
	switch (e) {
		case "top":
		case "bottom": return n ? t ? i : r : t ? r : i;
		case "left":
		case "right": return t ? a : o;
		default: return [];
	}
}
function ni(e, t, n, r) {
	let i = qr(e), a = ti(Kr(e), n === "start", r);
	return i && (a = a.map((e) => e + "-" + i), t && (a = a.concat(a.map(ei)))), a;
}
function ri(e) {
	return e.replace(/left|right|bottom|top/g, (e) => Hr[e]);
}
function ii(e) {
	return {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		...e
	};
}
function ai(e) {
	return typeof e == "number" ? {
		top: e,
		right: e,
		bottom: e,
		left: e
	} : ii(e);
}
function oi(e) {
	let { x: t, y: n, width: r, height: i } = e;
	return {
		width: r,
		height: i,
		top: n,
		left: t,
		right: t + r,
		bottom: n + i,
		x: t,
		y: n
	};
}
//#endregion
//#region node_modules/@floating-ui/core/dist/floating-ui.core.mjs
function si(e, t, n) {
	let { reference: r, floating: i } = e, a = Xr(t), o = Zr(t), s = Yr(o), c = Kr(t), l = a === "y", u = r.x + r.width / 2 - i.width / 2, d = r.y + r.height / 2 - i.height / 2, f = r[s] / 2 - i[s] / 2, p;
	switch (c) {
		case "top":
			p = {
				x: u,
				y: r.y - i.height
			};
			break;
		case "bottom":
			p = {
				x: u,
				y: r.y + r.height
			};
			break;
		case "right":
			p = {
				x: r.x + r.width,
				y: d
			};
			break;
		case "left":
			p = {
				x: r.x - i.width,
				y: d
			};
			break;
		default: p = {
			x: r.x,
			y: r.y
		};
	}
	switch (qr(t)) {
		case "start":
			p[o] -= f * (n && l ? -1 : 1);
			break;
		case "end":
			p[o] += f * (n && l ? -1 : 1);
			break;
	}
	return p;
}
var ci = async (e, t, n) => {
	let { placement: r = "bottom", strategy: i = "absolute", middleware: a = [], platform: o } = n, s = a.filter(Boolean), c = await (o.isRTL == null ? void 0 : o.isRTL(t)), l = await o.getElementRects({
		reference: e,
		floating: t,
		strategy: i
	}), { x: u, y: d } = si(l, r, c), f = r, p = {}, m = 0;
	for (let n = 0; n < s.length; n++) {
		let { name: a, fn: h } = s[n], { x: g, y: _, data: v, reset: y } = await h({
			x: u,
			y: d,
			initialPlacement: r,
			placement: f,
			strategy: i,
			middlewareData: p,
			rects: l,
			platform: o,
			elements: {
				reference: e,
				floating: t
			}
		});
		u = g ?? u, d = _ ?? d, p = {
			...p,
			[a]: {
				...p[a],
				...v
			}
		}, y && m <= 50 && (m++, typeof y == "object" && (y.placement && (f = y.placement), y.rects && (l = y.rects === !0 ? await o.getElementRects({
			reference: e,
			floating: t,
			strategy: i
		}) : y.rects), {x: u, y: d} = si(l, f, c)), n = -1);
	}
	return {
		x: u,
		y: d,
		placement: f,
		strategy: i,
		middlewareData: p
	};
};
async function li(e, t) {
	t === void 0 && (t = {});
	let { x: n, y: r, platform: i, rects: a, elements: o, strategy: s } = e, { boundary: c = "clippingAncestors", rootBoundary: l = "viewport", elementContext: u = "floating", altBoundary: d = !1, padding: f = 0 } = Gr(t, e), p = ai(f), m = o[d ? u === "floating" ? "reference" : "floating" : u], h = oi(await i.getClippingRect({
		element: await (i.isElement == null ? void 0 : i.isElement(m)) ?? !0 ? m : m.contextElement || await (i.getDocumentElement == null ? void 0 : i.getDocumentElement(o.floating)),
		boundary: c,
		rootBoundary: l,
		strategy: s
	})), g = u === "floating" ? {
		x: n,
		y: r,
		width: a.floating.width,
		height: a.floating.height
	} : a.reference, _ = await (i.getOffsetParent == null ? void 0 : i.getOffsetParent(o.floating)), v = await (i.isElement == null ? void 0 : i.isElement(_)) && await (i.getScale == null ? void 0 : i.getScale(_)) || {
		x: 1,
		y: 1
	}, y = oi(i.convertOffsetParentRelativeRectToViewportRelativeRect ? await i.convertOffsetParentRelativeRectToViewportRelativeRect({
		elements: o,
		rect: g,
		offsetParent: _,
		strategy: s
	}) : g);
	return {
		top: (h.top - y.top + p.top) / v.y,
		bottom: (y.bottom - h.bottom + p.bottom) / v.y,
		left: (h.left - y.left + p.left) / v.x,
		right: (y.right - h.right + p.right) / v.x
	};
}
var ui = (e) => ({
	name: "arrow",
	options: e,
	async fn(t) {
		let { x: n, y: r, placement: i, rects: a, platform: o, elements: s, middlewareData: c } = t, { element: l, padding: u = 0 } = Gr(e, t) || {};
		if (l == null) return {};
		let d = ai(u), f = {
			x: n,
			y: r
		}, p = Zr(i), m = Yr(p), h = await o.getDimensions(l), g = p === "y", _ = g ? "top" : "left", v = g ? "bottom" : "right", y = g ? "clientHeight" : "clientWidth", b = a.reference[m] + a.reference[p] - f[p] - a.floating[m], x = f[p] - a.reference[p], S = await (o.getOffsetParent == null ? void 0 : o.getOffsetParent(l)), C = S ? S[y] : 0;
		(!C || !await (o.isElement == null ? void 0 : o.isElement(S))) && (C = s.floating[y] || a.floating[m]);
		let w = b / 2 - x / 2, T = C / 2 - h[m] / 2 - 1, E = Lr(d[_], T), D = Lr(d[v], T), O = E, k = C - h[m] - D, A = C / 2 - h[m] / 2 + w, j = Wr(O, A, k), M = !c.arrow && qr(i) != null && A !== j && a.reference[m] / 2 - (A < O ? E : D) - h[m] / 2 < 0, N = M ? A < O ? A - O : A - k : 0;
		return {
			[p]: f[p] + N,
			data: {
				[p]: j,
				centerOffset: A - j - N,
				...M && { alignmentOffset: N }
			},
			reset: M
		};
	}
}), di = function(e) {
	return e === void 0 && (e = {}), {
		name: "flip",
		options: e,
		async fn(t) {
			var n;
			let { placement: r, middlewareData: i, rects: a, initialPlacement: o, platform: s, elements: c } = t, { mainAxis: l = !0, crossAxis: u = !0, fallbackPlacements: d, fallbackStrategy: f = "bestFit", fallbackAxisSideDirection: p = "none", flipAlignment: m = !0, ...h } = Gr(e, t);
			if ((n = i.arrow) != null && n.alignmentOffset) return {};
			let g = Kr(r), _ = Xr(o), v = Kr(o) === o, y = await (s.isRTL == null ? void 0 : s.isRTL(c.floating)), b = d || (v || !m ? [ri(o)] : $r(o)), x = p !== "none";
			!d && x && b.push(...ni(o, m, p, y));
			let S = [o, ...b], C = await li(t, h), w = [], T = i.flip?.overflows || [];
			if (l && w.push(C[g]), u) {
				let e = Qr(r, a, y);
				w.push(C[e[0]], C[e[1]]);
			}
			if (T = [...T, {
				placement: r,
				overflows: w
			}], !w.every((e) => e <= 0)) {
				let e = (i.flip?.index || 0) + 1, t = S[e];
				if (t) {
					let n = u === "alignment" ? _ !== Xr(t) : !1, r = T[0]?.overflows[0] > 0;
					if (!n || r) return {
						data: {
							index: e,
							overflows: T
						},
						reset: { placement: t }
					};
				}
				let n = T.filter((e) => e.overflows[0] <= 0).sort((e, t) => e.overflows[1] - t.overflows[1])[0]?.placement;
				if (!n) switch (f) {
					case "bestFit": {
						let e = T.filter((e) => {
							if (x) {
								let t = Xr(e.placement);
								return t === _ || t === "y";
							}
							return !0;
						}).map((e) => [e.placement, e.overflows.filter((e) => e > 0).reduce((e, t) => e + t, 0)]).sort((e, t) => e[1] - t[1])[0]?.[0];
						e && (n = e);
						break;
					}
					case "initialPlacement":
						n = o;
						break;
				}
				if (r !== n) return { reset: { placement: n } };
			}
			return {};
		}
	};
};
function fi(e, t) {
	return {
		top: e.top - t.height,
		right: e.right - t.width,
		bottom: e.bottom - t.height,
		left: e.left - t.width
	};
}
function pi(e) {
	return Ir.some((t) => e[t] >= 0);
}
var mi = function(e) {
	return e === void 0 && (e = {}), {
		name: "hide",
		options: e,
		async fn(t) {
			let { rects: n } = t, { strategy: r = "referenceHidden", ...i } = Gr(e, t);
			switch (r) {
				case "referenceHidden": {
					let e = fi(await li(t, {
						...i,
						elementContext: "reference"
					}), n.reference);
					return { data: {
						referenceHiddenOffsets: e,
						referenceHidden: pi(e)
					} };
				}
				case "escaped": {
					let e = fi(await li(t, {
						...i,
						altBoundary: !0
					}), n.floating);
					return { data: {
						escapedOffsets: e,
						escaped: pi(e)
					} };
				}
				default: return {};
			}
		}
	};
};
async function hi(e, t) {
	let { placement: n, platform: r, elements: i } = e, a = await (r.isRTL == null ? void 0 : r.isRTL(i.floating)), o = Kr(n), s = qr(n), c = Xr(n) === "y", l = ["left", "top"].includes(o) ? -1 : 1, u = a && c ? -1 : 1, d = Gr(t, e), { mainAxis: f, crossAxis: p, alignmentAxis: m } = typeof d == "number" ? {
		mainAxis: d,
		crossAxis: 0,
		alignmentAxis: null
	} : {
		mainAxis: d.mainAxis || 0,
		crossAxis: d.crossAxis || 0,
		alignmentAxis: d.alignmentAxis
	};
	return s && typeof m == "number" && (p = s === "end" ? m * -1 : m), c ? {
		x: p * u,
		y: f * l
	} : {
		x: f * l,
		y: p * u
	};
}
var gi = function(e) {
	return e === void 0 && (e = 0), {
		name: "offset",
		options: e,
		async fn(t) {
			var n;
			let { x: r, y: i, placement: a, middlewareData: o } = t, s = await hi(t, e);
			return a === o.offset?.placement && (n = o.arrow) != null && n.alignmentOffset ? {} : {
				x: r + s.x,
				y: i + s.y,
				data: {
					...s,
					placement: a
				}
			};
		}
	};
}, W = function(e) {
	return e === void 0 && (e = {}), {
		name: "shift",
		options: e,
		async fn(t) {
			let { x: n, y: r, placement: i } = t, { mainAxis: a = !0, crossAxis: o = !1, limiter: s = { fn: (e) => {
				let { x: t, y: n } = e;
				return {
					x: t,
					y: n
				};
			} }, ...c } = Gr(e, t), l = {
				x: n,
				y: r
			}, u = await li(t, c), d = Xr(Kr(i)), f = Jr(d), p = l[f], m = l[d];
			if (a) {
				let e = f === "y" ? "top" : "left", t = f === "y" ? "bottom" : "right", n = p + u[e], r = p - u[t];
				p = Wr(n, p, r);
			}
			if (o) {
				let e = d === "y" ? "top" : "left", t = d === "y" ? "bottom" : "right", n = m + u[e], r = m - u[t];
				m = Wr(n, m, r);
			}
			let h = s.fn({
				...t,
				[f]: p,
				[d]: m
			});
			return {
				...h,
				data: {
					x: h.x - n,
					y: h.y - r,
					enabled: {
						[f]: a,
						[d]: o
					}
				}
			};
		}
	};
}, _i = function(e) {
	return e === void 0 && (e = {}), {
		options: e,
		fn(t) {
			let { x: n, y: r, placement: i, rects: a, middlewareData: o } = t, { offset: s = 0, mainAxis: c = !0, crossAxis: l = !0 } = Gr(e, t), u = {
				x: n,
				y: r
			}, d = Xr(i), f = Jr(d), p = u[f], m = u[d], h = Gr(s, t), g = typeof h == "number" ? {
				mainAxis: h,
				crossAxis: 0
			} : {
				mainAxis: 0,
				crossAxis: 0,
				...h
			};
			if (c) {
				let e = f === "y" ? "height" : "width", t = a.reference[f] - a.floating[e] + g.mainAxis, n = a.reference[f] + a.reference[e] - g.mainAxis;
				p < t ? p = t : p > n && (p = n);
			}
			if (l) {
				let e = f === "y" ? "width" : "height", t = ["top", "left"].includes(Kr(i)), n = a.reference[d] - a.floating[e] + (t && o.offset?.[d] || 0) + (t ? 0 : g.crossAxis), r = a.reference[d] + a.reference[e] + (t ? 0 : o.offset?.[d] || 0) - (t ? g.crossAxis : 0);
				m < n ? m = n : m > r && (m = r);
			}
			return {
				[f]: p,
				[d]: m
			};
		}
	};
}, vi = function(e) {
	return e === void 0 && (e = {}), {
		name: "size",
		options: e,
		async fn(t) {
			var n, r;
			let { placement: i, rects: a, platform: o, elements: s } = t, { apply: c = () => {}, ...l } = Gr(e, t), u = await li(t, l), d = Kr(i), f = qr(i), p = Xr(i) === "y", { width: m, height: h } = a.floating, g, _;
			d === "top" || d === "bottom" ? (g = d, _ = f === (await (o.isRTL == null ? void 0 : o.isRTL(s.floating)) ? "start" : "end") ? "left" : "right") : (_ = d, g = f === "end" ? "top" : "bottom");
			let v = h - u.top - u.bottom, y = m - u.left - u.right, b = Lr(h - u[g], v), x = Lr(m - u[_], y), S = !t.middlewareData.shift, C = b, w = x;
			if ((n = t.middlewareData.shift) != null && n.enabled.x && (w = y), (r = t.middlewareData.shift) != null && r.enabled.y && (C = v), S && !f) {
				let e = Rr(u.left, 0), t = Rr(u.right, 0), n = Rr(u.top, 0), r = Rr(u.bottom, 0);
				p ? w = m - 2 * (e !== 0 || t !== 0 ? e + t : Rr(u.left, u.right)) : C = h - 2 * (n !== 0 || r !== 0 ? n + r : Rr(u.top, u.bottom));
			}
			await c({
				...t,
				availableWidth: w,
				availableHeight: C
			});
			let T = await o.getDimensions(s.floating);
			return m !== T.width || h !== T.height ? { reset: { rects: !0 } } : {};
		}
	};
};
//#endregion
//#region node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs
function yi() {
	return typeof window < "u";
}
function bi(e) {
	return Ci(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function xi(e) {
	var t;
	return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function Si(e) {
	return ((Ci(e) ? e.ownerDocument : e.document) || window.document)?.documentElement;
}
function Ci(e) {
	return yi() ? e instanceof Node || e instanceof xi(e).Node : !1;
}
function wi(e) {
	return yi() ? e instanceof Element || e instanceof xi(e).Element : !1;
}
function Ti(e) {
	return yi() ? e instanceof HTMLElement || e instanceof xi(e).HTMLElement : !1;
}
function Ei(e) {
	return !yi() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof xi(e).ShadowRoot;
}
function Di(e) {
	let { overflow: t, overflowX: n, overflowY: r, display: i } = Pi(e);
	return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && !["inline", "contents"].includes(i);
}
function Oi(e) {
	return [
		"table",
		"td",
		"th"
	].includes(bi(e));
}
function ki(e) {
	return [":popover-open", ":modal"].some((t) => {
		try {
			return e.matches(t);
		} catch {
			return !1;
		}
	});
}
function Ai(e) {
	let t = Mi(), n = wi(e) ? Pi(e) : e;
	return [
		"transform",
		"translate",
		"scale",
		"rotate",
		"perspective"
	].some((e) => n[e] ? n[e] !== "none" : !1) || (n.containerType ? n.containerType !== "normal" : !1) || !t && (n.backdropFilter ? n.backdropFilter !== "none" : !1) || !t && (n.filter ? n.filter !== "none" : !1) || [
		"transform",
		"translate",
		"scale",
		"rotate",
		"perspective",
		"filter"
	].some((e) => (n.willChange || "").includes(e)) || [
		"paint",
		"layout",
		"strict",
		"content"
	].some((e) => (n.contain || "").includes(e));
}
function ji(e) {
	let t = Ii(e);
	for (; Ti(t) && !Ni(t);) {
		if (Ai(t)) return t;
		if (ki(t)) return null;
		t = Ii(t);
	}
	return null;
}
function Mi() {
	return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
function Ni(e) {
	return [
		"html",
		"body",
		"#document"
	].includes(bi(e));
}
function Pi(e) {
	return xi(e).getComputedStyle(e);
}
function Fi(e) {
	return wi(e) ? {
		scrollLeft: e.scrollLeft,
		scrollTop: e.scrollTop
	} : {
		scrollLeft: e.scrollX,
		scrollTop: e.scrollY
	};
}
function Ii(e) {
	if (bi(e) === "html") return e;
	let t = e.assignedSlot || e.parentNode || Ei(e) && e.host || Si(e);
	return Ei(t) ? t.host : t;
}
function Li(e) {
	let t = Ii(e);
	return Ni(t) ? e.ownerDocument ? e.ownerDocument.body : e.body : Ti(t) && Di(t) ? t : Li(t);
}
function Ri(e, t, n) {
	t === void 0 && (t = []), n === void 0 && (n = !0);
	let r = Li(e), i = r === e.ownerDocument?.body, a = xi(r);
	if (i) {
		let e = zi(a);
		return t.concat(a, a.visualViewport || [], Di(r) ? r : [], e && n ? Ri(e) : []);
	}
	return t.concat(r, Ri(r, [], n));
}
function zi(e) {
	return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
//#endregion
//#region node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs
function Bi(e) {
	let t = Pi(e), n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0, i = Ti(e), a = i ? e.offsetWidth : n, o = i ? e.offsetHeight : r, s = zr(n) !== a || zr(r) !== o;
	return s && (n = a, r = o), {
		width: n,
		height: r,
		$: s
	};
}
function Vi(e) {
	return wi(e) ? e : e.contextElement;
}
function Hi(e) {
	let t = Vi(e);
	if (!Ti(t)) return Vr(1);
	let n = t.getBoundingClientRect(), { width: r, height: i, $: a } = Bi(t), o = (a ? zr(n.width) : n.width) / r, s = (a ? zr(n.height) : n.height) / i;
	return (!o || !Number.isFinite(o)) && (o = 1), (!s || !Number.isFinite(s)) && (s = 1), {
		x: o,
		y: s
	};
}
var Ui = /* @__PURE__ */ Vr(0);
function Wi(e) {
	let t = xi(e);
	return !Mi() || !t.visualViewport ? Ui : {
		x: t.visualViewport.offsetLeft,
		y: t.visualViewport.offsetTop
	};
}
function Gi(e, t, n) {
	return t === void 0 && (t = !1), !n || t && n !== xi(e) ? !1 : t;
}
function Ki(e, t, n, r) {
	t === void 0 && (t = !1), n === void 0 && (n = !1);
	let i = e.getBoundingClientRect(), a = Vi(e), o = Vr(1);
	t && (r ? wi(r) && (o = Hi(r)) : o = Hi(e));
	let s = Gi(a, n, r) ? Wi(a) : Vr(0), c = (i.left + s.x) / o.x, l = (i.top + s.y) / o.y, u = i.width / o.x, d = i.height / o.y;
	if (a) {
		let e = xi(a), t = r && wi(r) ? xi(r) : r, n = e, i = zi(n);
		for (; i && r && t !== n;) {
			let e = Hi(i), t = i.getBoundingClientRect(), r = Pi(i), a = t.left + (i.clientLeft + parseFloat(r.paddingLeft)) * e.x, o = t.top + (i.clientTop + parseFloat(r.paddingTop)) * e.y;
			c *= e.x, l *= e.y, u *= e.x, d *= e.y, c += a, l += o, n = xi(i), i = zi(n);
		}
	}
	return oi({
		width: u,
		height: d,
		x: c,
		y: l
	});
}
function qi(e, t) {
	let n = Fi(e).scrollLeft;
	return t ? t.left + n : Ki(Si(e)).left + n;
}
function Ji(e, t, n) {
	n === void 0 && (n = !1);
	let r = e.getBoundingClientRect();
	return {
		x: r.left + t.scrollLeft - (n ? 0 : qi(e, r)),
		y: r.top + t.scrollTop
	};
}
function Yi(e) {
	let { elements: t, rect: n, offsetParent: r, strategy: i } = e, a = i === "fixed", o = Si(r), s = t ? ki(t.floating) : !1;
	if (r === o || s && a) return n;
	let c = {
		scrollLeft: 0,
		scrollTop: 0
	}, l = Vr(1), u = Vr(0), d = Ti(r);
	if ((d || !d && !a) && ((bi(r) !== "body" || Di(o)) && (c = Fi(r)), Ti(r))) {
		let e = Ki(r);
		l = Hi(r), u.x = e.x + r.clientLeft, u.y = e.y + r.clientTop;
	}
	let f = o && !d && !a ? Ji(o, c, !0) : Vr(0);
	return {
		width: n.width * l.x,
		height: n.height * l.y,
		x: n.x * l.x - c.scrollLeft * l.x + u.x + f.x,
		y: n.y * l.y - c.scrollTop * l.y + u.y + f.y
	};
}
function Xi(e) {
	return Array.from(e.getClientRects());
}
function Zi(e) {
	let t = Si(e), n = Fi(e), r = e.ownerDocument.body, i = Rr(t.scrollWidth, t.clientWidth, r.scrollWidth, r.clientWidth), a = Rr(t.scrollHeight, t.clientHeight, r.scrollHeight, r.clientHeight), o = -n.scrollLeft + qi(e), s = -n.scrollTop;
	return Pi(r).direction === "rtl" && (o += Rr(t.clientWidth, r.clientWidth) - i), {
		width: i,
		height: a,
		x: o,
		y: s
	};
}
function Qi(e, t) {
	let n = xi(e), r = Si(e), i = n.visualViewport, a = r.clientWidth, o = r.clientHeight, s = 0, c = 0;
	if (i) {
		a = i.width, o = i.height;
		let e = Mi();
		(!e || e && t === "fixed") && (s = i.offsetLeft, c = i.offsetTop);
	}
	return {
		width: a,
		height: o,
		x: s,
		y: c
	};
}
function $i(e, t) {
	let n = Ki(e, !0, t === "fixed"), r = n.top + e.clientTop, i = n.left + e.clientLeft, a = Ti(e) ? Hi(e) : Vr(1);
	return {
		width: e.clientWidth * a.x,
		height: e.clientHeight * a.y,
		x: i * a.x,
		y: r * a.y
	};
}
function ea(e, t, n) {
	let r;
	if (t === "viewport") r = Qi(e, n);
	else if (t === "document") r = Zi(Si(e));
	else if (wi(t)) r = $i(t, n);
	else {
		let n = Wi(e);
		r = {
			x: t.x - n.x,
			y: t.y - n.y,
			width: t.width,
			height: t.height
		};
	}
	return oi(r);
}
function ta(e, t) {
	let n = Ii(e);
	return n === t || !wi(n) || Ni(n) ? !1 : Pi(n).position === "fixed" || ta(n, t);
}
function na(e, t) {
	let n = t.get(e);
	if (n) return n;
	let r = Ri(e, [], !1).filter((e) => wi(e) && bi(e) !== "body"), i = null, a = Pi(e).position === "fixed", o = a ? Ii(e) : e;
	for (; wi(o) && !Ni(o);) {
		let t = Pi(o), n = Ai(o);
		!n && t.position === "fixed" && (i = null), (a ? !n && !i : !n && t.position === "static" && i && ["absolute", "fixed"].includes(i.position) || Di(o) && !n && ta(e, o)) ? r = r.filter((e) => e !== o) : i = t, o = Ii(o);
	}
	return t.set(e, r), r;
}
function ra(e) {
	let { element: t, boundary: n, rootBoundary: r, strategy: i } = e, a = [...n === "clippingAncestors" ? ki(t) ? [] : na(t, this._c) : [].concat(n), r], o = a[0], s = a.reduce((e, n) => {
		let r = ea(t, n, i);
		return e.top = Rr(r.top, e.top), e.right = Lr(r.right, e.right), e.bottom = Lr(r.bottom, e.bottom), e.left = Rr(r.left, e.left), e;
	}, ea(t, o, i));
	return {
		width: s.right - s.left,
		height: s.bottom - s.top,
		x: s.left,
		y: s.top
	};
}
function ia(e) {
	let { width: t, height: n } = Bi(e);
	return {
		width: t,
		height: n
	};
}
function aa(e, t, n) {
	let r = Ti(t), i = Si(t), a = n === "fixed", o = Ki(e, !0, a, t), s = {
		scrollLeft: 0,
		scrollTop: 0
	}, c = Vr(0);
	function l() {
		c.x = qi(i);
	}
	if (r || !r && !a) if ((bi(t) !== "body" || Di(i)) && (s = Fi(t)), r) {
		let e = Ki(t, !0, a, t);
		c.x = e.x + t.clientLeft, c.y = e.y + t.clientTop;
	} else i && l();
	a && !r && i && l();
	let u = i && !r && !a ? Ji(i, s) : Vr(0);
	return {
		x: o.left + s.scrollLeft - c.x - u.x,
		y: o.top + s.scrollTop - c.y - u.y,
		width: o.width,
		height: o.height
	};
}
function oa(e) {
	return Pi(e).position === "static";
}
function sa(e, t) {
	if (!Ti(e) || Pi(e).position === "fixed") return null;
	if (t) return t(e);
	let n = e.offsetParent;
	return Si(e) === n && (n = n.ownerDocument.body), n;
}
function ca(e, t) {
	let n = xi(e);
	if (ki(e)) return n;
	if (!Ti(e)) {
		let t = Ii(e);
		for (; t && !Ni(t);) {
			if (wi(t) && !oa(t)) return t;
			t = Ii(t);
		}
		return n;
	}
	let r = sa(e, t);
	for (; r && Oi(r) && oa(r);) r = sa(r, t);
	return r && Ni(r) && oa(r) && !Ai(r) ? n : r || ji(e) || n;
}
var la = async function(e) {
	let t = this.getOffsetParent || ca, n = this.getDimensions, r = await n(e.floating);
	return {
		reference: aa(e.reference, await t(e.floating), e.strategy),
		floating: {
			x: 0,
			y: 0,
			width: r.width,
			height: r.height
		}
	};
};
function ua(e) {
	return Pi(e).direction === "rtl";
}
var da = {
	convertOffsetParentRelativeRectToViewportRelativeRect: Yi,
	getDocumentElement: Si,
	getClippingRect: ra,
	getOffsetParent: ca,
	getElementRects: la,
	getClientRects: Xi,
	getDimensions: ia,
	getScale: Hi,
	isElement: wi,
	isRTL: ua
};
function fa(e, t) {
	return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function pa(e, t) {
	let n = null, r, i = Si(e);
	function a() {
		var e;
		clearTimeout(r), (e = n) == null || e.disconnect(), n = null;
	}
	function o(s, c) {
		s === void 0 && (s = !1), c === void 0 && (c = 1), a();
		let l = e.getBoundingClientRect(), { left: u, top: d, width: f, height: p } = l;
		if (s || t(), !f || !p) return;
		let m = Br(d), h = Br(i.clientWidth - (u + f)), g = Br(i.clientHeight - (d + p)), _ = Br(u), v = {
			rootMargin: -m + "px " + -h + "px " + -g + "px " + -_ + "px",
			threshold: Rr(0, Lr(1, c)) || 1
		}, y = !0;
		function b(t) {
			let n = t[0].intersectionRatio;
			if (n !== c) {
				if (!y) return o();
				n ? o(!1, n) : r = setTimeout(() => {
					o(!1, 1e-7);
				}, 1e3);
			}
			n === 1 && !fa(l, e.getBoundingClientRect()) && o(), y = !1;
		}
		try {
			n = new IntersectionObserver(b, {
				...v,
				root: i.ownerDocument
			});
		} catch {
			n = new IntersectionObserver(b, v);
		}
		n.observe(e);
	}
	return o(!0), a;
}
function ma(e, t, n, r) {
	r === void 0 && (r = {});
	let { ancestorScroll: i = !0, ancestorResize: a = !0, elementResize: o = typeof ResizeObserver == "function", layoutShift: s = typeof IntersectionObserver == "function", animationFrame: c = !1 } = r, l = Vi(e), u = i || a ? [...l ? Ri(l) : [], ...Ri(t)] : [];
	u.forEach((e) => {
		i && e.addEventListener("scroll", n, { passive: !0 }), a && e.addEventListener("resize", n);
	});
	let d = l && s ? pa(l, n) : null, f = -1, p = null;
	o && (p = new ResizeObserver((e) => {
		let [r] = e;
		r && r.target === l && p && (p.unobserve(t), cancelAnimationFrame(f), f = requestAnimationFrame(() => {
			var e;
			(e = p) == null || e.observe(t);
		})), n();
	}), l && !c && p.observe(l), p.observe(t));
	let m, h = c ? Ki(e) : null;
	c && g();
	function g() {
		let t = Ki(e);
		h && !fa(h, t) && n(), h = t, m = requestAnimationFrame(g);
	}
	return n(), () => {
		var e;
		u.forEach((e) => {
			i && e.removeEventListener("scroll", n), a && e.removeEventListener("resize", n);
		}), d?.(), (e = p) == null || e.disconnect(), p = null, c && cancelAnimationFrame(m);
	};
}
var ha = gi, ga = W, _a = di, va = vi, ya = mi, ba = ui, G = _i, K = (e, t, n) => {
	let r = /* @__PURE__ */ new Map(), i = {
		platform: da,
		...n
	}, a = {
		...i.platform,
		_c: r
	};
	return ci(e, t, {
		...i,
		platform: a
	});
}, xa = typeof document < "u" ? u.useLayoutEffect : u.useEffect;
function Sa(e, t) {
	if (e === t) return !0;
	if (typeof e != typeof t) return !1;
	if (typeof e == "function" && e.toString() === t.toString()) return !0;
	let n, r, i;
	if (e && t && typeof e == "object") {
		if (Array.isArray(e)) {
			if (n = e.length, n !== t.length) return !1;
			for (r = n; r-- !== 0;) if (!Sa(e[r], t[r])) return !1;
			return !0;
		}
		if (i = Object.keys(e), n = i.length, n !== Object.keys(t).length) return !1;
		for (r = n; r-- !== 0;) if (!{}.hasOwnProperty.call(t, i[r])) return !1;
		for (r = n; r-- !== 0;) {
			let n = i[r];
			if (!(n === "_owner" && e.$$typeof) && !Sa(e[n], t[n])) return !1;
		}
		return !0;
	}
	return e !== e && t !== t;
}
function Ca(e) {
	return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function wa(e, t) {
	let n = Ca(e);
	return Math.round(t * n) / n;
}
function Ta(e) {
	let t = u.useRef(e);
	return xa(() => {
		t.current = e;
	}), t;
}
function Ea(e) {
	e === void 0 && (e = {});
	let { placement: t = "bottom", strategy: n = "absolute", middleware: r = [], platform: i, elements: { reference: a, floating: o } = {}, transform: s = !0, whileElementsMounted: c, open: l } = e, [f, p] = u.useState({
		x: 0,
		y: 0,
		strategy: n,
		placement: t,
		middlewareData: {},
		isPositioned: !1
	}), [m, h] = u.useState(r);
	Sa(m, r) || h(r);
	let [g, _] = u.useState(null), [v, y] = u.useState(null), b = u.useCallback((e) => {
		e !== w.current && (w.current = e, _(e));
	}, []), x = u.useCallback((e) => {
		e !== T.current && (T.current = e, y(e));
	}, []), S = a || g, C = o || v, w = u.useRef(null), T = u.useRef(null), E = u.useRef(f), D = c != null, O = Ta(c), k = Ta(i), A = Ta(l), j = u.useCallback(() => {
		if (!w.current || !T.current) return;
		let e = {
			placement: t,
			strategy: n,
			middleware: m
		};
		k.current && (e.platform = k.current), K(w.current, T.current, e).then((e) => {
			let t = {
				...e,
				isPositioned: A.current !== !1
			};
			M.current && !Sa(E.current, t) && (E.current = t, d.flushSync(() => {
				p(t);
			}));
		});
	}, [
		m,
		t,
		n,
		k,
		A
	]);
	xa(() => {
		l === !1 && E.current.isPositioned && (E.current.isPositioned = !1, p((e) => ({
			...e,
			isPositioned: !1
		})));
	}, [l]);
	let M = u.useRef(!1);
	xa(() => (M.current = !0, () => {
		M.current = !1;
	}), []), xa(() => {
		if (S && (w.current = S), C && (T.current = C), S && C) {
			if (O.current) return O.current(S, C, j);
			j();
		}
	}, [
		S,
		C,
		j,
		O,
		D
	]);
	let N = u.useMemo(() => ({
		reference: w,
		floating: T,
		setReference: b,
		setFloating: x
	}), [b, x]), P = u.useMemo(() => ({
		reference: S,
		floating: C
	}), [S, C]), F = u.useMemo(() => {
		let e = {
			position: n,
			left: 0,
			top: 0
		};
		if (!P.floating) return e;
		let t = wa(P.floating, f.x), r = wa(P.floating, f.y);
		return s ? {
			...e,
			transform: "translate(" + t + "px, " + r + "px)",
			...Ca(P.floating) >= 1.5 && { willChange: "transform" }
		} : {
			position: n,
			left: t,
			top: r
		};
	}, [
		n,
		s,
		P.floating,
		f.x,
		f.y
	]);
	return u.useMemo(() => ({
		...f,
		update: j,
		refs: N,
		elements: P,
		floatingStyles: F
	}), [
		f,
		j,
		N,
		P,
		F
	]);
}
var Da = (e) => {
	function t(e) {
		return {}.hasOwnProperty.call(e, "current");
	}
	return {
		name: "arrow",
		options: e,
		fn(n) {
			let { element: r, padding: i } = typeof e == "function" ? e(n) : e;
			return r && t(r) ? r.current == null ? {} : ba({
				element: r.current,
				padding: i
			}).fn(n) : r ? ba({
				element: r,
				padding: i
			}).fn(n) : {};
		}
	};
}, Oa = (e, t) => ({
	...ha(e),
	options: [e, t]
}), ka = (e, t) => ({
	...ga(e),
	options: [e, t]
}), Aa = (e, t) => ({
	...G(e),
	options: [e, t]
}), ja = (e, t) => ({
	..._a(e),
	options: [e, t]
}), Ma = (e, t) => ({
	...va(e),
	options: [e, t]
}), Na = (e, t) => ({
	...ya(e),
	options: [e, t]
}), Pa = (e, t) => ({
	...Da(e),
	options: [e, t]
});
//#endregion
//#region node_modules/@radix-ui/react-arrow/node_modules/@radix-ui/react-compose-refs/dist/index.mjs
function Fa(e, t) {
	if (typeof e == "function") return e(t);
	e != null && (e.current = t);
}
function Ia(...e) {
	return (t) => {
		let n = !1, r = e.map((e) => {
			let r = Fa(e, t);
			return !n && typeof r == "function" && (n = !0), r;
		});
		if (n) return () => {
			for (let t = 0; t < r.length; t++) {
				let n = r[t];
				typeof n == "function" ? n() : Fa(e[t], null);
			}
		};
	};
}
//#endregion
//#region node_modules/@radix-ui/react-arrow/node_modules/@radix-ui/react-slot/dist/index.mjs
/* @__NO_SIDE_EFFECTS__ */
function La(e) {
	let t = /* @__PURE__ */ Ra(e), n = u.forwardRef((e, n) => {
		let { children: r, ...i } = e, a = u.Children.toArray(r), o = a.find(Ba);
		if (o) {
			let e = o.props.children, r = a.map((t) => t === o ? u.Children.count(e) > 1 ? u.Children.only(null) : u.isValidElement(e) ? e.props.children : null : t);
			return /* @__PURE__ */ (0, L.jsx)(t, {
				...i,
				ref: n,
				children: u.isValidElement(e) ? u.cloneElement(e, void 0, r) : null
			});
		}
		return /* @__PURE__ */ (0, L.jsx)(t, {
			...i,
			ref: n,
			children: r
		});
	});
	return n.displayName = `${e}.Slot`, n;
}
/* @__NO_SIDE_EFFECTS__ */
function Ra(e) {
	let t = u.forwardRef((e, t) => {
		let { children: n, ...r } = e;
		if (u.isValidElement(n)) {
			let e = Ha(n), i = Va(r, n.props);
			return n.type !== u.Fragment && (i.ref = t ? Ia(t, e) : e), u.cloneElement(n, i);
		}
		return u.Children.count(n) > 1 ? u.Children.only(null) : null;
	});
	return t.displayName = `${e}.SlotClone`, t;
}
var za = Symbol("radix.slottable");
function Ba(e) {
	return u.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === za;
}
function Va(e, t) {
	let n = { ...t };
	for (let r in t) {
		let i = e[r], a = t[r];
		/^on[A-Z]/.test(r) ? i && a ? n[r] = (...e) => {
			let t = a(...e);
			return i(...e), t;
		} : i && (n[r] = i) : r === "style" ? n[r] = {
			...i,
			...a
		} : r === "className" && (n[r] = [i, a].filter(Boolean).join(" "));
	}
	return {
		...e,
		...n
	};
}
function Ha(e) {
	let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
	return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
//#endregion
//#region node_modules/@radix-ui/react-arrow/node_modules/@radix-ui/react-primitive/dist/index.mjs
var Ua = [
	"a",
	"button",
	"div",
	"form",
	"h2",
	"h3",
	"img",
	"input",
	"label",
	"li",
	"nav",
	"ol",
	"p",
	"select",
	"span",
	"svg",
	"ul"
].reduce((e, t) => {
	let n = /* @__PURE__ */ La(`Primitive.${t}`), r = u.forwardRef((e, r) => {
		let { asChild: i, ...a } = e, o = i ? n : t;
		return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ (0, L.jsx)(o, {
			...a,
			ref: r
		});
	});
	return r.displayName = `Primitive.${t}`, {
		...e,
		[t]: r
	};
}, {}), Wa = "Arrow", Ga = u.forwardRef((e, t) => {
	let { children: n, width: r = 10, height: i = 5, ...a } = e;
	return /* @__PURE__ */ (0, L.jsx)(Ua.svg, {
		...a,
		ref: t,
		width: r,
		height: i,
		viewBox: "0 0 30 10",
		preserveAspectRatio: "none",
		children: e.asChild ? n : /* @__PURE__ */ (0, L.jsx)("polygon", { points: "0,0 30,0 15,10" })
	});
});
Ga.displayName = Wa;
var Ka = Ga;
//#endregion
//#region node_modules/@radix-ui/react-popper/node_modules/@radix-ui/react-compose-refs/dist/index.mjs
function qa(e, t) {
	if (typeof e == "function") return e(t);
	e != null && (e.current = t);
}
function Ja(...e) {
	return (t) => {
		let n = !1, r = e.map((e) => {
			let r = qa(e, t);
			return !n && typeof r == "function" && (n = !0), r;
		});
		if (n) return () => {
			for (let t = 0; t < r.length; t++) {
				let n = r[t];
				typeof n == "function" ? n() : qa(e[t], null);
			}
		};
	};
}
function Ya(...e) {
	return u.useCallback(Ja(...e), e);
}
//#endregion
//#region node_modules/@radix-ui/react-popper/node_modules/@radix-ui/react-context/dist/index.mjs
function Xa(e, t = []) {
	let n = [];
	function r(t, r) {
		let i = u.createContext(r), a = n.length;
		n = [...n, r];
		let o = (t) => {
			let { scope: n, children: r, ...o } = t, s = n?.[e]?.[a] || i, c = u.useMemo(() => o, Object.values(o));
			return /* @__PURE__ */ (0, L.jsx)(s.Provider, {
				value: c,
				children: r
			});
		};
		o.displayName = t + "Provider";
		function s(n, o) {
			let s = o?.[e]?.[a] || i, c = u.useContext(s);
			if (c) return c;
			if (r !== void 0) return r;
			throw Error(`\`${n}\` must be used within \`${t}\``);
		}
		return [o, s];
	}
	let i = () => {
		let t = n.map((e) => u.createContext(e));
		return function(n) {
			let r = n?.[e] || t;
			return u.useMemo(() => ({ [`__scope${e}`]: {
				...n,
				[e]: r
			} }), [n, r]);
		};
	};
	return i.scopeName = e, [r, Za(i, ...t)];
}
function Za(...e) {
	let t = e[0];
	if (e.length === 1) return t;
	let n = () => {
		let n = e.map((e) => ({
			useScope: e(),
			scopeName: e.scopeName
		}));
		return function(e) {
			let r = n.reduce((t, { useScope: n, scopeName: r }) => {
				let i = n(e)[`__scope${r}`];
				return {
					...t,
					...i
				};
			}, {});
			return u.useMemo(() => ({ [`__scope${t.scopeName}`]: r }), [r]);
		};
	};
	return n.scopeName = t.scopeName, n;
}
//#endregion
//#region node_modules/@radix-ui/react-popper/node_modules/@radix-ui/react-slot/dist/index.mjs
/* @__NO_SIDE_EFFECTS__ */
function Qa(e) {
	let t = /* @__PURE__ */ $a(e), n = u.forwardRef((e, n) => {
		let { children: r, ...i } = e, a = u.Children.toArray(r), o = a.find(to);
		if (o) {
			let e = o.props.children, r = a.map((t) => t === o ? u.Children.count(e) > 1 ? u.Children.only(null) : u.isValidElement(e) ? e.props.children : null : t);
			return /* @__PURE__ */ (0, L.jsx)(t, {
				...i,
				ref: n,
				children: u.isValidElement(e) ? u.cloneElement(e, void 0, r) : null
			});
		}
		return /* @__PURE__ */ (0, L.jsx)(t, {
			...i,
			ref: n,
			children: r
		});
	});
	return n.displayName = `${e}.Slot`, n;
}
/* @__NO_SIDE_EFFECTS__ */
function $a(e) {
	let t = u.forwardRef((e, t) => {
		let { children: n, ...r } = e;
		if (u.isValidElement(n)) {
			let e = ro(n), i = no(r, n.props);
			return n.type !== u.Fragment && (i.ref = t ? Ja(t, e) : e), u.cloneElement(n, i);
		}
		return u.Children.count(n) > 1 ? u.Children.only(null) : null;
	});
	return t.displayName = `${e}.SlotClone`, t;
}
var eo = Symbol("radix.slottable");
function to(e) {
	return u.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === eo;
}
function no(e, t) {
	let n = { ...t };
	for (let r in t) {
		let i = e[r], a = t[r];
		/^on[A-Z]/.test(r) ? i && a ? n[r] = (...e) => {
			let t = a(...e);
			return i(...e), t;
		} : i && (n[r] = i) : r === "style" ? n[r] = {
			...i,
			...a
		} : r === "className" && (n[r] = [i, a].filter(Boolean).join(" "));
	}
	return {
		...e,
		...n
	};
}
function ro(e) {
	let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
	return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
//#endregion
//#region node_modules/@radix-ui/react-popper/node_modules/@radix-ui/react-primitive/dist/index.mjs
var io = [
	"a",
	"button",
	"div",
	"form",
	"h2",
	"h3",
	"img",
	"input",
	"label",
	"li",
	"nav",
	"ol",
	"p",
	"select",
	"span",
	"svg",
	"ul"
].reduce((e, t) => {
	let n = /* @__PURE__ */ Qa(`Primitive.${t}`), r = u.forwardRef((e, r) => {
		let { asChild: i, ...a } = e, o = i ? n : t;
		return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ (0, L.jsx)(o, {
			...a,
			ref: r
		});
	});
	return r.displayName = `Primitive.${t}`, {
		...e,
		[t]: r
	};
}, {});
//#endregion
//#region node_modules/@radix-ui/react-popper/node_modules/@radix-ui/react-use-callback-ref/dist/index.mjs
function ao(e) {
	let t = u.useRef(e);
	return u.useEffect(() => {
		t.current = e;
	}), u.useMemo(() => (...e) => t.current?.(...e), []);
}
//#endregion
//#region node_modules/@radix-ui/react-popper/node_modules/@radix-ui/react-use-layout-effect/dist/index.mjs
var oo = globalThis?.document ? u.useLayoutEffect : () => {}, so = globalThis?.document ? u.useLayoutEffect : () => {};
//#endregion
//#region node_modules/@radix-ui/react-use-size/dist/index.mjs
function co(e) {
	let [t, n] = u.useState(void 0);
	return so(() => {
		if (e) {
			n({
				width: e.offsetWidth,
				height: e.offsetHeight
			});
			let t = new ResizeObserver((t) => {
				if (!Array.isArray(t) || !t.length) return;
				let r = t[0], i, a;
				if ("borderBoxSize" in r) {
					let e = r.borderBoxSize, t = Array.isArray(e) ? e[0] : e;
					i = t.inlineSize, a = t.blockSize;
				} else i = e.offsetWidth, a = e.offsetHeight;
				n({
					width: i,
					height: a
				});
			});
			return t.observe(e, { box: "border-box" }), () => t.unobserve(e);
		} else n(void 0);
	}, [e]), t;
}
//#endregion
//#region node_modules/@radix-ui/react-popper/dist/index.mjs
var lo = "Popper", [uo, fo] = Xa(lo), [po, mo] = uo(lo), ho = (e) => {
	let { __scopePopper: t, children: n } = e, [r, i] = u.useState(null);
	return /* @__PURE__ */ (0, L.jsx)(po, {
		scope: t,
		anchor: r,
		onAnchorChange: i,
		children: n
	});
};
ho.displayName = lo;
var go = "PopperAnchor", _o = u.forwardRef((e, t) => {
	let { __scopePopper: n, virtualRef: r, ...i } = e, a = mo(go, n), o = u.useRef(null), s = Ya(t, o);
	return u.useEffect(() => {
		a.onAnchorChange(r?.current || o.current);
	}), r ? null : /* @__PURE__ */ (0, L.jsx)(io.div, {
		...i,
		ref: s
	});
});
_o.displayName = go;
var vo = "PopperContent", [yo, bo] = uo(vo), xo = u.forwardRef((e, t) => {
	let { __scopePopper: n, side: r = "bottom", sideOffset: i = 0, align: a = "center", alignOffset: o = 0, arrowPadding: s = 0, avoidCollisions: c = !0, collisionBoundary: l = [], collisionPadding: d = 0, sticky: f = "partial", hideWhenDetached: p = !1, updatePositionStrategy: m = "optimized", onPlaced: h, ...g } = e, _ = mo(vo, n), [v, y] = u.useState(null), b = Ya(t, (e) => y(e)), [x, S] = u.useState(null), C = co(x), w = C?.width ?? 0, T = C?.height ?? 0, E = r + (a === "center" ? "" : "-" + a), D = typeof d == "number" ? d : {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		...d
	}, O = Array.isArray(l) ? l : [l], k = O.length > 0, A = {
		padding: D,
		boundary: O.filter(To),
		altBoundary: k
	}, { refs: j, floatingStyles: M, placement: N, isPositioned: P, middlewareData: F } = Ea({
		strategy: "fixed",
		placement: E,
		whileElementsMounted: (...e) => ma(...e, { animationFrame: m === "always" }),
		elements: { reference: _.anchor },
		middleware: [
			Oa({
				mainAxis: i + T,
				alignmentAxis: o
			}),
			c && ka({
				mainAxis: !0,
				crossAxis: !1,
				limiter: f === "partial" ? Aa() : void 0,
				...A
			}),
			c && ja({ ...A }),
			Ma({
				...A,
				apply: ({ elements: e, rects: t, availableWidth: n, availableHeight: r }) => {
					let { width: i, height: a } = t.reference, o = e.floating.style;
					o.setProperty("--radix-popper-available-width", `${n}px`), o.setProperty("--radix-popper-available-height", `${r}px`), o.setProperty("--radix-popper-anchor-width", `${i}px`), o.setProperty("--radix-popper-anchor-height", `${a}px`);
				}
			}),
			x && Pa({
				element: x,
				padding: s
			}),
			Eo({
				arrowWidth: w,
				arrowHeight: T
			}),
			p && Na({
				strategy: "referenceHidden",
				...A
			})
		]
	}), [I, ee] = Do(N), te = ao(h);
	oo(() => {
		P && te?.();
	}, [P, te]);
	let ne = F.arrow?.x, re = F.arrow?.y, ie = F.arrow?.centerOffset !== 0, [ae, R] = u.useState();
	return oo(() => {
		v && R(window.getComputedStyle(v).zIndex);
	}, [v]), /* @__PURE__ */ (0, L.jsx)("div", {
		ref: j.setFloating,
		"data-radix-popper-content-wrapper": "",
		style: {
			...M,
			transform: P ? M.transform : "translate(0, -200%)",
			minWidth: "max-content",
			zIndex: ae,
			"--radix-popper-transform-origin": [F.transformOrigin?.x, F.transformOrigin?.y].join(" "),
			...F.hide?.referenceHidden && {
				visibility: "hidden",
				pointerEvents: "none"
			}
		},
		dir: e.dir,
		children: /* @__PURE__ */ (0, L.jsx)(yo, {
			scope: n,
			placedSide: I,
			onArrowChange: S,
			arrowX: ne,
			arrowY: re,
			shouldHideArrow: ie,
			children: /* @__PURE__ */ (0, L.jsx)(io.div, {
				"data-side": I,
				"data-align": ee,
				...g,
				ref: b,
				style: {
					...g.style,
					animation: P ? void 0 : "none"
				}
			})
		})
	});
});
xo.displayName = vo;
var So = "PopperArrow", Co = {
	top: "bottom",
	right: "left",
	bottom: "top",
	left: "right"
}, wo = u.forwardRef(function(e, t) {
	let { __scopePopper: n, ...r } = e, i = bo(So, n), a = Co[i.placedSide];
	return /* @__PURE__ */ (0, L.jsx)("span", {
		ref: i.onArrowChange,
		style: {
			position: "absolute",
			left: i.arrowX,
			top: i.arrowY,
			[a]: 0,
			transformOrigin: {
				top: "",
				right: "0 0",
				bottom: "center 0",
				left: "100% 0"
			}[i.placedSide],
			transform: {
				top: "translateY(100%)",
				right: "translateY(50%) rotate(90deg) translateX(-50%)",
				bottom: "rotate(180deg)",
				left: "translateY(50%) rotate(-90deg) translateX(50%)"
			}[i.placedSide],
			visibility: i.shouldHideArrow ? "hidden" : void 0
		},
		children: /* @__PURE__ */ (0, L.jsx)(Ka, {
			...r,
			ref: t,
			style: {
				...r.style,
				display: "block"
			}
		})
	});
});
wo.displayName = So;
function To(e) {
	return e !== null;
}
var Eo = (e) => ({
	name: "transformOrigin",
	options: e,
	fn(t) {
		let { placement: n, rects: r, middlewareData: i } = t, a = i.arrow?.centerOffset !== 0, o = a ? 0 : e.arrowWidth, s = a ? 0 : e.arrowHeight, [c, l] = Do(n), u = {
			start: "0%",
			center: "50%",
			end: "100%"
		}[l], d = (i.arrow?.x ?? 0) + o / 2, f = (i.arrow?.y ?? 0) + s / 2, p = "", m = "";
		return c === "bottom" ? (p = a ? u : `${d}px`, m = `${-s}px`) : c === "top" ? (p = a ? u : `${d}px`, m = `${r.floating.height + s}px`) : c === "right" ? (p = `${-s}px`, m = a ? u : `${f}px`) : c === "left" && (p = `${r.floating.width + s}px`, m = a ? u : `${f}px`), { data: {
			x: p,
			y: m
		} };
	}
});
function Do(e) {
	let [t, n = "center"] = e.split("-");
	return [t, n];
}
var Oo = ho, ko = _o, Ao = xo, jo = wo;
//#endregion
//#region node_modules/@radix-ui/react-portal/node_modules/@radix-ui/react-compose-refs/dist/index.mjs
function Mo(e, t) {
	if (typeof e == "function") return e(t);
	e != null && (e.current = t);
}
function No(...e) {
	return (t) => {
		let n = !1, r = e.map((e) => {
			let r = Mo(e, t);
			return !n && typeof r == "function" && (n = !0), r;
		});
		if (n) return () => {
			for (let t = 0; t < r.length; t++) {
				let n = r[t];
				typeof n == "function" ? n() : Mo(e[t], null);
			}
		};
	};
}
//#endregion
//#region node_modules/@radix-ui/react-portal/node_modules/@radix-ui/react-slot/dist/index.mjs
/* @__NO_SIDE_EFFECTS__ */
function Po(e) {
	let t = /* @__PURE__ */ Fo(e), n = u.forwardRef((e, n) => {
		let { children: r, ...i } = e, a = u.Children.toArray(r), o = a.find(Lo);
		if (o) {
			let e = o.props.children, r = a.map((t) => t === o ? u.Children.count(e) > 1 ? u.Children.only(null) : u.isValidElement(e) ? e.props.children : null : t);
			return /* @__PURE__ */ (0, L.jsx)(t, {
				...i,
				ref: n,
				children: u.isValidElement(e) ? u.cloneElement(e, void 0, r) : null
			});
		}
		return /* @__PURE__ */ (0, L.jsx)(t, {
			...i,
			ref: n,
			children: r
		});
	});
	return n.displayName = `${e}.Slot`, n;
}
/* @__NO_SIDE_EFFECTS__ */
function Fo(e) {
	let t = u.forwardRef((e, t) => {
		let { children: n, ...r } = e;
		if (u.isValidElement(n)) {
			let e = zo(n), i = Ro(r, n.props);
			return n.type !== u.Fragment && (i.ref = t ? No(t, e) : e), u.cloneElement(n, i);
		}
		return u.Children.count(n) > 1 ? u.Children.only(null) : null;
	});
	return t.displayName = `${e}.SlotClone`, t;
}
var Io = Symbol("radix.slottable");
function Lo(e) {
	return u.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === Io;
}
function Ro(e, t) {
	let n = { ...t };
	for (let r in t) {
		let i = e[r], a = t[r];
		/^on[A-Z]/.test(r) ? i && a ? n[r] = (...e) => {
			let t = a(...e);
			return i(...e), t;
		} : i && (n[r] = i) : r === "style" ? n[r] = {
			...i,
			...a
		} : r === "className" && (n[r] = [i, a].filter(Boolean).join(" "));
	}
	return {
		...e,
		...n
	};
}
function zo(e) {
	let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
	return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
//#endregion
//#region node_modules/@radix-ui/react-portal/node_modules/@radix-ui/react-primitive/dist/index.mjs
var Bo = [
	"a",
	"button",
	"div",
	"form",
	"h2",
	"h3",
	"img",
	"input",
	"label",
	"li",
	"nav",
	"ol",
	"p",
	"select",
	"span",
	"svg",
	"ul"
].reduce((e, t) => {
	let n = /* @__PURE__ */ Po(`Primitive.${t}`), r = u.forwardRef((e, r) => {
		let { asChild: i, ...a } = e, o = i ? n : t;
		return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ (0, L.jsx)(o, {
			...a,
			ref: r
		});
	});
	return r.displayName = `Primitive.${t}`, {
		...e,
		[t]: r
	};
}, {}), Vo = globalThis?.document ? u.useLayoutEffect : () => {}, Ho = "Portal", Uo = u.forwardRef((e, t) => {
	let { container: n, ...r } = e, [i, a] = u.useState(!1);
	Vo(() => a(!0), []);
	let o = n || i && globalThis?.document?.body;
	return o ? d.createPortal(/* @__PURE__ */ (0, L.jsx)(Bo.div, {
		...r,
		ref: t
	}), o) : null;
});
Uo.displayName = Ho;
//#endregion
//#region node_modules/@radix-ui/react-select/node_modules/@radix-ui/react-primitive/dist/index.mjs
var Wo = [
	"a",
	"button",
	"div",
	"form",
	"h2",
	"h3",
	"img",
	"input",
	"label",
	"li",
	"nav",
	"ol",
	"p",
	"select",
	"span",
	"svg",
	"ul"
].reduce((e, t) => {
	let n = /* @__PURE__ */ yn(`Primitive.${t}`), r = u.forwardRef((e, r) => {
		let { asChild: i, ...a } = e, o = i ? n : t;
		return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ (0, L.jsx)(o, {
			...a,
			ref: r
		});
	});
	return r.displayName = `Primitive.${t}`, {
		...e,
		[t]: r
	};
}, {});
//#endregion
//#region node_modules/@radix-ui/react-select/node_modules/@radix-ui/react-use-callback-ref/dist/index.mjs
function Go(e) {
	let t = u.useRef(e);
	return u.useEffect(() => {
		t.current = e;
	}), u.useMemo(() => (...e) => t.current?.(...e), []);
}
//#endregion
//#region node_modules/@radix-ui/react-select/node_modules/@radix-ui/react-use-controllable-state/dist/index.mjs
var Ko = u.useInsertionEffect || Mr;
function qo({ prop: e, defaultProp: t, onChange: n = () => {}, caller: r }) {
	let [i, a, o] = Jo({
		defaultProp: t,
		onChange: n
	}), s = e !== void 0, c = s ? e : i;
	{
		let t = u.useRef(e !== void 0);
		u.useEffect(() => {
			let e = t.current;
			e !== s && console.warn(`${r} is changing from ${e ? "controlled" : "uncontrolled"} to ${s ? "controlled" : "uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`), t.current = s;
		}, [s, r]);
	}
	return [c, u.useCallback((t) => {
		if (s) {
			let n = Yo(t) ? t(e) : t;
			n !== e && o.current?.(n);
		} else a(t);
	}, [
		s,
		e,
		a,
		o
	])];
}
function Jo({ defaultProp: e, onChange: t }) {
	let [n, r] = u.useState(e), i = u.useRef(n), a = u.useRef(t);
	return Ko(() => {
		a.current = t;
	}, [t]), u.useEffect(() => {
		i.current !== n && (a.current?.(n), i.current = n);
	}, [n, i]), [
		n,
		r,
		a
	];
}
function Yo(e) {
	return typeof e == "function";
}
//#endregion
//#region node_modules/@radix-ui/react-use-previous/dist/index.mjs
function Xo(e) {
	let t = u.useRef({
		value: e,
		previous: e
	});
	return u.useMemo(() => (t.current.value !== e && (t.current.previous = t.current.value, t.current.value = e), t.current.previous), [e]);
}
//#endregion
//#region node_modules/@radix-ui/react-visually-hidden/node_modules/@radix-ui/react-compose-refs/dist/index.mjs
function Zo(e, t) {
	if (typeof e == "function") return e(t);
	e != null && (e.current = t);
}
function Qo(...e) {
	return (t) => {
		let n = !1, r = e.map((e) => {
			let r = Zo(e, t);
			return !n && typeof r == "function" && (n = !0), r;
		});
		if (n) return () => {
			for (let t = 0; t < r.length; t++) {
				let n = r[t];
				typeof n == "function" ? n() : Zo(e[t], null);
			}
		};
	};
}
//#endregion
//#region node_modules/@radix-ui/react-visually-hidden/node_modules/@radix-ui/react-slot/dist/index.mjs
/* @__NO_SIDE_EFFECTS__ */
function $o(e) {
	let t = /* @__PURE__ */ es(e), n = u.forwardRef((e, n) => {
		let { children: r, ...i } = e, a = u.Children.toArray(r), o = a.find(ns);
		if (o) {
			let e = o.props.children, r = a.map((t) => t === o ? u.Children.count(e) > 1 ? u.Children.only(null) : u.isValidElement(e) ? e.props.children : null : t);
			return /* @__PURE__ */ (0, L.jsx)(t, {
				...i,
				ref: n,
				children: u.isValidElement(e) ? u.cloneElement(e, void 0, r) : null
			});
		}
		return /* @__PURE__ */ (0, L.jsx)(t, {
			...i,
			ref: n,
			children: r
		});
	});
	return n.displayName = `${e}.Slot`, n;
}
/* @__NO_SIDE_EFFECTS__ */
function es(e) {
	let t = u.forwardRef((e, t) => {
		let { children: n, ...r } = e;
		if (u.isValidElement(n)) {
			let e = is(n), i = rs(r, n.props);
			return n.type !== u.Fragment && (i.ref = t ? Qo(t, e) : e), u.cloneElement(n, i);
		}
		return u.Children.count(n) > 1 ? u.Children.only(null) : null;
	});
	return t.displayName = `${e}.SlotClone`, t;
}
var ts = Symbol("radix.slottable");
function ns(e) {
	return u.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === ts;
}
function rs(e, t) {
	let n = { ...t };
	for (let r in t) {
		let i = e[r], a = t[r];
		/^on[A-Z]/.test(r) ? i && a ? n[r] = (...e) => {
			let t = a(...e);
			return i(...e), t;
		} : i && (n[r] = i) : r === "style" ? n[r] = {
			...i,
			...a
		} : r === "className" && (n[r] = [i, a].filter(Boolean).join(" "));
	}
	return {
		...e,
		...n
	};
}
function is(e) {
	let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
	return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
//#endregion
//#region node_modules/@radix-ui/react-visually-hidden/node_modules/@radix-ui/react-primitive/dist/index.mjs
var as = [
	"a",
	"button",
	"div",
	"form",
	"h2",
	"h3",
	"img",
	"input",
	"label",
	"li",
	"nav",
	"ol",
	"p",
	"select",
	"span",
	"svg",
	"ul"
].reduce((e, t) => {
	let n = /* @__PURE__ */ $o(`Primitive.${t}`), r = u.forwardRef((e, r) => {
		let { asChild: i, ...a } = e, o = i ? n : t;
		return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ (0, L.jsx)(o, {
			...a,
			ref: r
		});
	});
	return r.displayName = `Primitive.${t}`, {
		...e,
		[t]: r
	};
}, {}), os = Object.freeze({
	position: "absolute",
	border: 0,
	width: 1,
	height: 1,
	padding: 0,
	margin: -1,
	overflow: "hidden",
	clip: "rect(0, 0, 0, 0)",
	whiteSpace: "nowrap",
	wordWrap: "normal"
}), ss = "VisuallyHidden", cs = u.forwardRef((e, t) => /* @__PURE__ */ (0, L.jsx)(as.span, {
	...e,
	ref: t,
	style: {
		...os,
		...e.style
	}
}));
cs.displayName = ss;
//#endregion
//#region node_modules/aria-hidden/dist/es2015/index.js
var ls = function(e) {
	return typeof document > "u" ? null : (Array.isArray(e) ? e[0] : e).ownerDocument.body;
}, us = /* @__PURE__ */ new WeakMap(), ds = /* @__PURE__ */ new WeakMap(), fs = {}, ps = 0, ms = function(e) {
	return e && (e.host || ms(e.parentNode));
}, hs = function(e, t) {
	return t.map(function(t) {
		if (e.contains(t)) return t;
		var n = ms(t);
		return n && e.contains(n) ? n : (console.error("aria-hidden", t, "in not contained inside", e, ". Doing nothing"), null);
	}).filter(function(e) {
		return !!e;
	});
}, gs = function(e, t, n, r) {
	var i = hs(t, Array.isArray(e) ? e : [e]);
	fs[n] || (fs[n] = /* @__PURE__ */ new WeakMap());
	var a = fs[n], o = [], s = /* @__PURE__ */ new Set(), c = new Set(i), l = function(e) {
		!e || s.has(e) || (s.add(e), l(e.parentNode));
	};
	i.forEach(l);
	var u = function(e) {
		!e || c.has(e) || Array.prototype.forEach.call(e.children, function(e) {
			if (s.has(e)) u(e);
			else try {
				var t = e.getAttribute(r), i = t !== null && t !== "false", c = (us.get(e) || 0) + 1, l = (a.get(e) || 0) + 1;
				us.set(e, c), a.set(e, l), o.push(e), c === 1 && i && ds.set(e, !0), l === 1 && e.setAttribute(n, "true"), i || e.setAttribute(r, "true");
			} catch (t) {
				console.error("aria-hidden: cannot operate on ", e, t);
			}
		});
	};
	return u(t), s.clear(), ps++, function() {
		o.forEach(function(e) {
			var t = us.get(e) - 1, i = a.get(e) - 1;
			us.set(e, t), a.set(e, i), t || (ds.has(e) || e.removeAttribute(r), ds.delete(e)), i || e.removeAttribute(n);
		}), ps--, ps || (us = /* @__PURE__ */ new WeakMap(), us = /* @__PURE__ */ new WeakMap(), ds = /* @__PURE__ */ new WeakMap(), fs = {});
	};
}, _s = function(e, t, n) {
	n === void 0 && (n = "data-aria-hidden");
	var r = Array.from(Array.isArray(e) ? e : [e]), i = t || ls(e);
	return i ? (r.push.apply(r, Array.from(i.querySelectorAll("[aria-live], script"))), gs(r, i, n, "aria-hidden")) : function() {
		return null;
	};
}, vs = function() {
	return vs = Object.assign || function(e) {
		for (var t, n = 1, r = arguments.length; n < r; n++) for (var i in t = arguments[n], t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
		return e;
	}, vs.apply(this, arguments);
};
function ys(e, t) {
	var n = {};
	for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
	if (e != null && typeof Object.getOwnPropertySymbols == "function") for (var i = 0, r = Object.getOwnPropertySymbols(e); i < r.length; i++) t.indexOf(r[i]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[i]) && (n[r[i]] = e[r[i]]);
	return n;
}
function bs(e, t, n) {
	if (n || arguments.length === 2) for (var r = 0, i = t.length, a; r < i; r++) (a || !(r in t)) && (a ||= Array.prototype.slice.call(t, 0, r), a[r] = t[r]);
	return e.concat(a || Array.prototype.slice.call(t));
}
//#endregion
//#region node_modules/react-remove-scroll-bar/dist/es2015/constants.js
var xs = "right-scroll-bar-position", Ss = "width-before-scroll-bar", Cs = "with-scroll-bars-hidden", ws = "--removed-body-scroll-bar-size";
//#endregion
//#region node_modules/use-callback-ref/dist/es2015/assignRef.js
function Ts(e, t) {
	return typeof e == "function" ? e(t) : e && (e.current = t), e;
}
//#endregion
//#region node_modules/use-callback-ref/dist/es2015/useRef.js
function Es(e, t) {
	var n = (0, u.useState)(function() {
		return {
			value: e,
			callback: t,
			facade: {
				get current() {
					return n.value;
				},
				set current(e) {
					var t = n.value;
					t !== e && (n.value = e, n.callback(e, t));
				}
			}
		};
	})[0];
	return n.callback = t, n.facade;
}
//#endregion
//#region node_modules/use-callback-ref/dist/es2015/useMergeRef.js
var Ds = typeof window < "u" ? u.useLayoutEffect : u.useEffect, Os = /* @__PURE__ */ new WeakMap();
function ks(e, t) {
	var n = Es(t || null, function(t) {
		return e.forEach(function(e) {
			return Ts(e, t);
		});
	});
	return Ds(function() {
		var t = Os.get(n);
		if (t) {
			var r = new Set(t), i = new Set(e), a = n.current;
			r.forEach(function(e) {
				i.has(e) || Ts(e, null);
			}), i.forEach(function(e) {
				r.has(e) || Ts(e, a);
			});
		}
		Os.set(n, e);
	}, [e]), n;
}
//#endregion
//#region node_modules/use-sidecar/dist/es2015/medium.js
function As(e) {
	return e;
}
function js(e, t) {
	t === void 0 && (t = As);
	var n = [], r = !1;
	return {
		read: function() {
			if (r) throw Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");
			return n.length ? n[n.length - 1] : e;
		},
		useMedium: function(e) {
			var i = t(e, r);
			return n.push(i), function() {
				n = n.filter(function(e) {
					return e !== i;
				});
			};
		},
		assignSyncMedium: function(e) {
			for (r = !0; n.length;) {
				var t = n;
				n = [], t.forEach(e);
			}
			n = {
				push: function(t) {
					return e(t);
				},
				filter: function() {
					return n;
				}
			};
		},
		assignMedium: function(e) {
			r = !0;
			var t = [];
			if (n.length) {
				var i = n;
				n = [], i.forEach(e), t = n;
			}
			var a = function() {
				var n = t;
				t = [], n.forEach(e);
			}, o = function() {
				return Promise.resolve().then(a);
			};
			o(), n = {
				push: function(e) {
					t.push(e), o();
				},
				filter: function(e) {
					return t = t.filter(e), n;
				}
			};
		}
	};
}
function Ms(e) {
	e === void 0 && (e = {});
	var t = js(null);
	return t.options = vs({
		async: !0,
		ssr: !1
	}, e), t;
}
//#endregion
//#region node_modules/use-sidecar/dist/es2015/exports.js
var Ns = function(e) {
	var t = e.sideCar, n = ys(e, ["sideCar"]);
	if (!t) throw Error("Sidecar: please provide `sideCar` property to import the right car");
	var r = t.read();
	if (!r) throw Error("Sidecar medium not found");
	return u.createElement(r, vs({}, n));
};
Ns.isSideCarExport = !0;
function Ps(e, t) {
	return e.useMedium(t), Ns;
}
//#endregion
//#region node_modules/react-remove-scroll/dist/es2015/medium.js
var Fs = Ms(), Is = function() {}, Ls = u.forwardRef(function(e, t) {
	var n = u.useRef(null), r = u.useState({
		onScrollCapture: Is,
		onWheelCapture: Is,
		onTouchMoveCapture: Is
	}), i = r[0], a = r[1], o = e.forwardProps, s = e.children, c = e.className, l = e.removeScrollBar, d = e.enabled, f = e.shards, p = e.sideCar, m = e.noRelative, h = e.noIsolation, g = e.inert, _ = e.allowPinchZoom, v = e.as, y = v === void 0 ? "div" : v, b = e.gapMode, x = ys(e, [
		"forwardProps",
		"children",
		"className",
		"removeScrollBar",
		"enabled",
		"shards",
		"sideCar",
		"noRelative",
		"noIsolation",
		"inert",
		"allowPinchZoom",
		"as",
		"gapMode"
	]), S = p, C = ks([n, t]), w = vs(vs({}, x), i);
	return u.createElement(u.Fragment, null, d && u.createElement(S, {
		sideCar: Fs,
		removeScrollBar: l,
		shards: f,
		noRelative: m,
		noIsolation: h,
		inert: g,
		setCallbacks: a,
		allowPinchZoom: !!_,
		lockRef: n,
		gapMode: b
	}), o ? u.cloneElement(u.Children.only(s), vs(vs({}, w), { ref: C })) : u.createElement(y, vs({}, w, {
		className: c,
		ref: C
	}), s));
});
Ls.defaultProps = {
	enabled: !0,
	removeScrollBar: !0,
	inert: !1
}, Ls.classNames = {
	fullWidth: Ss,
	zeroRight: xs
};
//#endregion
//#region node_modules/get-nonce/dist/es2015/index.js
var Rs, zs = function() {
	if (Rs) return Rs;
	if (typeof __webpack_nonce__ < "u") return __webpack_nonce__;
};
//#endregion
//#region node_modules/react-style-singleton/dist/es2015/singleton.js
function Bs() {
	if (!document) return null;
	var e = document.createElement("style");
	e.type = "text/css";
	var t = zs();
	return t && e.setAttribute("nonce", t), e;
}
function Vs(e, t) {
	e.styleSheet ? e.styleSheet.cssText = t : e.appendChild(document.createTextNode(t));
}
function Hs(e) {
	(document.head || document.getElementsByTagName("head")[0]).appendChild(e);
}
var Us = function() {
	var e = 0, t = null;
	return {
		add: function(n) {
			e == 0 && (t = Bs()) && (Vs(t, n), Hs(t)), e++;
		},
		remove: function() {
			e--, !e && t && (t.parentNode && t.parentNode.removeChild(t), t = null);
		}
	};
}, Ws = function() {
	var e = Us();
	return function(t, n) {
		u.useEffect(function() {
			return e.add(t), function() {
				e.remove();
			};
		}, [t && n]);
	};
}, Gs = function() {
	var e = Ws();
	return function(t) {
		var n = t.styles, r = t.dynamic;
		return e(n, r), null;
	};
}, Ks = {
	left: 0,
	top: 0,
	right: 0,
	gap: 0
}, qs = function(e) {
	return parseInt(e || "", 10) || 0;
}, Js = function(e) {
	var t = window.getComputedStyle(document.body), n = t[e === "padding" ? "paddingLeft" : "marginLeft"], r = t[e === "padding" ? "paddingTop" : "marginTop"], i = t[e === "padding" ? "paddingRight" : "marginRight"];
	return [
		qs(n),
		qs(r),
		qs(i)
	];
}, Ys = function(e) {
	if (e === void 0 && (e = "margin"), typeof window > "u") return Ks;
	var t = Js(e), n = document.documentElement.clientWidth, r = window.innerWidth;
	return {
		left: t[0],
		top: t[1],
		right: t[2],
		gap: Math.max(0, r - n + t[2] - t[0])
	};
}, Xs = Gs(), Zs = "data-scroll-locked", Qs = function(e, t, n, r) {
	var i = e.left, a = e.top, o = e.right, s = e.gap;
	return n === void 0 && (n = "margin"), `
  .${Cs} {
   overflow: hidden ${r};
   padding-right: ${s}px ${r};
  }
  body[${Zs}] {
    overflow: hidden ${r};
    overscroll-behavior: contain;
    ${[
		t && `position: relative ${r};`,
		n === "margin" && `
    padding-left: ${i}px;
    padding-top: ${a}px;
    padding-right: ${o}px;
    margin-left:0;
    margin-top:0;
    margin-right: ${s}px ${r};
    `,
		n === "padding" && `padding-right: ${s}px ${r};`
	].filter(Boolean).join("")}
  }
  
  .${xs} {
    right: ${s}px ${r};
  }
  
  .${Ss} {
    margin-right: ${s}px ${r};
  }
  
  .${xs} .${xs} {
    right: 0 ${r};
  }
  
  .${Ss} .${Ss} {
    margin-right: 0 ${r};
  }
  
  body[${Zs}] {
    ${ws}: ${s}px;
  }
`;
}, $s = function() {
	var e = parseInt(document.body.getAttribute("data-scroll-locked") || "0", 10);
	return isFinite(e) ? e : 0;
}, ec = function() {
	u.useEffect(function() {
		return document.body.setAttribute(Zs, ($s() + 1).toString()), function() {
			var e = $s() - 1;
			e <= 0 ? document.body.removeAttribute(Zs) : document.body.setAttribute(Zs, e.toString());
		};
	}, []);
}, tc = function(e) {
	var t = e.noRelative, n = e.noImportant, r = e.gapMode, i = r === void 0 ? "margin" : r;
	ec();
	var a = u.useMemo(function() {
		return Ys(i);
	}, [i]);
	return u.createElement(Xs, { styles: Qs(a, !t, i, n ? "" : "!important") });
}, nc = !1;
if (typeof window < "u") try {
	var rc = Object.defineProperty({}, "passive", { get: function() {
		return nc = !0, !0;
	} });
	window.addEventListener("test", rc, rc), window.removeEventListener("test", rc, rc);
} catch {
	nc = !1;
}
var ic = nc ? { passive: !1 } : !1, ac = function(e) {
	return e.tagName === "TEXTAREA";
}, oc = function(e, t) {
	if (!(e instanceof Element)) return !1;
	var n = window.getComputedStyle(e);
	return n[t] !== "hidden" && !(n.overflowY === n.overflowX && !ac(e) && n[t] === "visible");
}, sc = function(e) {
	return oc(e, "overflowY");
}, cc = function(e) {
	return oc(e, "overflowX");
}, lc = function(e, t) {
	var n = t.ownerDocument, r = t;
	do {
		if (typeof ShadowRoot < "u" && r instanceof ShadowRoot && (r = r.host), fc(e, r)) {
			var i = pc(e, r);
			if (i[1] > i[2]) return !0;
		}
		r = r.parentNode;
	} while (r && r !== n.body);
	return !1;
}, uc = function(e) {
	return [
		e.scrollTop,
		e.scrollHeight,
		e.clientHeight
	];
}, dc = function(e) {
	return [
		e.scrollLeft,
		e.scrollWidth,
		e.clientWidth
	];
}, fc = function(e, t) {
	return e === "v" ? sc(t) : cc(t);
}, pc = function(e, t) {
	return e === "v" ? uc(t) : dc(t);
}, mc = function(e, t) {
	return e === "h" && t === "rtl" ? -1 : 1;
}, hc = function(e, t, n, r, i) {
	var a = mc(e, window.getComputedStyle(t).direction), o = a * r, s = n.target, c = t.contains(s), l = !1, u = o > 0, d = 0, f = 0;
	do {
		if (!s) break;
		var p = pc(e, s), m = p[0], h = p[1] - p[2] - a * m;
		(m || h) && fc(e, s) && (d += h, f += m);
		var g = s.parentNode;
		s = g && g.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? g.host : g;
	} while (!c && s !== document.body || c && (t.contains(s) || t === s));
	return (u && (i && Math.abs(d) < 1 || !i && o > d) || !u && (i && Math.abs(f) < 1 || !i && -o > f)) && (l = !0), l;
}, gc = function(e) {
	return "changedTouches" in e ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY] : [0, 0];
}, _c = function(e) {
	return [e.deltaX, e.deltaY];
}, vc = function(e) {
	return e && "current" in e ? e.current : e;
}, yc = function(e, t) {
	return e[0] === t[0] && e[1] === t[1];
}, bc = function(e) {
	return `
  .block-interactivity-${e} {pointer-events: none;}
  .allow-interactivity-${e} {pointer-events: all;}
`;
}, xc = 0, Sc = [];
function Cc(e) {
	var t = u.useRef([]), n = u.useRef([0, 0]), r = u.useRef(), i = u.useState(xc++)[0], a = u.useState(Gs)[0], o = u.useRef(e);
	u.useEffect(function() {
		o.current = e;
	}, [e]), u.useEffect(function() {
		if (e.inert) {
			document.body.classList.add(`block-interactivity-${i}`);
			var t = bs([e.lockRef.current], (e.shards || []).map(vc), !0).filter(Boolean);
			return t.forEach(function(e) {
				return e.classList.add(`allow-interactivity-${i}`);
			}), function() {
				document.body.classList.remove(`block-interactivity-${i}`), t.forEach(function(e) {
					return e.classList.remove(`allow-interactivity-${i}`);
				});
			};
		}
	}, [
		e.inert,
		e.lockRef.current,
		e.shards
	]);
	var s = u.useCallback(function(e, t) {
		if ("touches" in e && e.touches.length === 2 || e.type === "wheel" && e.ctrlKey) return !o.current.allowPinchZoom;
		var i = gc(e), a = n.current, s = "deltaX" in e ? e.deltaX : a[0] - i[0], c = "deltaY" in e ? e.deltaY : a[1] - i[1], l, u = e.target, d = Math.abs(s) > Math.abs(c) ? "h" : "v";
		if ("touches" in e && d === "h" && u.type === "range") return !1;
		var f = lc(d, u);
		if (!f) return !0;
		if (f ? l = d : (l = d === "v" ? "h" : "v", f = lc(d, u)), !f) return !1;
		if (!r.current && "changedTouches" in e && (s || c) && (r.current = l), !l) return !0;
		var p = r.current || l;
		return hc(p, t, e, p === "h" ? s : c, !0);
	}, []), c = u.useCallback(function(e) {
		var n = e;
		if (!(!Sc.length || Sc[Sc.length - 1] !== a)) {
			var r = "deltaY" in n ? _c(n) : gc(n), i = t.current.filter(function(e) {
				return e.name === n.type && (e.target === n.target || n.target === e.shadowParent) && yc(e.delta, r);
			})[0];
			if (i && i.should) {
				n.cancelable && n.preventDefault();
				return;
			}
			if (!i) {
				var c = (o.current.shards || []).map(vc).filter(Boolean).filter(function(e) {
					return e.contains(n.target);
				});
				(c.length > 0 ? s(n, c[0]) : !o.current.noIsolation) && n.cancelable && n.preventDefault();
			}
		}
	}, []), l = u.useCallback(function(e, n, r, i) {
		var a = {
			name: e,
			delta: n,
			target: r,
			should: i,
			shadowParent: wc(r)
		};
		t.current.push(a), setTimeout(function() {
			t.current = t.current.filter(function(e) {
				return e !== a;
			});
		}, 1);
	}, []), d = u.useCallback(function(e) {
		n.current = gc(e), r.current = void 0;
	}, []), f = u.useCallback(function(t) {
		l(t.type, _c(t), t.target, s(t, e.lockRef.current));
	}, []), p = u.useCallback(function(t) {
		l(t.type, gc(t), t.target, s(t, e.lockRef.current));
	}, []);
	u.useEffect(function() {
		return Sc.push(a), e.setCallbacks({
			onScrollCapture: f,
			onWheelCapture: f,
			onTouchMoveCapture: p
		}), document.addEventListener("wheel", c, ic), document.addEventListener("touchmove", c, ic), document.addEventListener("touchstart", d, ic), function() {
			Sc = Sc.filter(function(e) {
				return e !== a;
			}), document.removeEventListener("wheel", c, ic), document.removeEventListener("touchmove", c, ic), document.removeEventListener("touchstart", d, ic);
		};
	}, []);
	var m = e.removeScrollBar, h = e.inert;
	return u.createElement(u.Fragment, null, h ? u.createElement(a, { styles: bc(i) }) : null, m ? u.createElement(tc, {
		noRelative: e.noRelative,
		gapMode: e.gapMode
	}) : null);
}
function wc(e) {
	for (var t = null; e !== null;) e instanceof ShadowRoot && (t = e.host, e = e.host), e = e.parentNode;
	return t;
}
//#endregion
//#region node_modules/react-remove-scroll/dist/es2015/sidecar.js
var Tc = Ps(Fs, Cc), Ec = u.forwardRef(function(e, t) {
	return u.createElement(Ls, vs({}, e, {
		ref: t,
		sideCar: Tc
	}));
});
Ec.classNames = Ls.classNames;
//#endregion
//#region node_modules/@radix-ui/react-select/dist/index.mjs
var Dc = [
	" ",
	"Enter",
	"ArrowUp",
	"ArrowDown"
], Oc = [" ", "Enter"], kc = "Select", [Ac, jc, Mc] = Tn(kc), [Nc, Pc] = mn(kc, [Mc, fo]), Fc = fo(), [Ic, Lc] = Nc(kc), [Rc, zc] = Nc(kc), Bc = (e) => {
	let { __scopeSelect: t, children: n, open: r, defaultOpen: i, onOpenChange: a, value: o, defaultValue: s, onValueChange: c, dir: l, name: d, autoComplete: f, disabled: p, required: m, form: h } = e, g = Fc(t), [_, v] = u.useState(null), [y, b] = u.useState(null), [x, S] = u.useState(!1), C = Dn(l), [w, T] = qo({
		prop: r,
		defaultProp: i ?? !1,
		onChange: a,
		caller: kc
	}), [E, D] = qo({
		prop: o,
		defaultProp: s,
		onChange: c,
		caller: kc
	}), O = u.useRef(null), k = _ ? h || !!_.closest("form") : !0, [A, j] = u.useState(/* @__PURE__ */ new Set()), M = Array.from(A).map((e) => e.props.value).join(";");
	return /* @__PURE__ */ (0, L.jsx)(Oo, {
		...g,
		children: /* @__PURE__ */ (0, L.jsxs)(Ic, {
			required: m,
			scope: t,
			trigger: _,
			onTriggerChange: v,
			valueNode: y,
			onValueNodeChange: b,
			valueNodeHasChildren: x,
			onValueNodeHasChildrenChange: S,
			contentId: Fr(),
			value: E,
			onValueChange: D,
			open: w,
			onOpenChange: T,
			dir: C,
			triggerPointerDownPosRef: O,
			disabled: p,
			children: [/* @__PURE__ */ (0, L.jsx)(Ac.Provider, {
				scope: t,
				children: /* @__PURE__ */ (0, L.jsx)(Rc, {
					scope: e.__scopeSelect,
					onNativeOptionAdd: u.useCallback((e) => {
						j((t) => new Set(t).add(e));
					}, []),
					onNativeOptionRemove: u.useCallback((e) => {
						j((t) => {
							let n = new Set(t);
							return n.delete(e), n;
						});
					}, []),
					children: n
				})
			}), k ? /* @__PURE__ */ (0, L.jsxs)(Ml, {
				"aria-hidden": !0,
				required: m,
				tabIndex: -1,
				name: d,
				autoComplete: f,
				value: E,
				onChange: (e) => D(e.target.value),
				disabled: p,
				form: h,
				children: [E === void 0 ? /* @__PURE__ */ (0, L.jsx)("option", { value: "" }) : null, Array.from(A)]
			}, M) : null]
		})
	});
};
Bc.displayName = kc;
var Vc = "SelectTrigger", Hc = u.forwardRef((e, t) => {
	let { __scopeSelect: n, disabled: r = !1, ...i } = e, a = Fc(n), o = Lc(Vc, n), s = o.disabled || r, c = vn(t, o.onTriggerChange), l = jc(n), d = u.useRef("touch"), [f, p, m] = Pl((e) => {
		let t = l().filter((e) => !e.disabled), n = Fl(t, e, t.find((e) => e.value === o.value));
		n !== void 0 && o.onValueChange(n.value);
	}), h = (e) => {
		s || (o.onOpenChange(!0), m()), e && (o.triggerPointerDownPosRef.current = {
			x: Math.round(e.pageX),
			y: Math.round(e.pageY)
		});
	};
	return /* @__PURE__ */ (0, L.jsx)(ko, {
		asChild: !0,
		...a,
		children: /* @__PURE__ */ (0, L.jsx)(Wo.button, {
			type: "button",
			role: "combobox",
			"aria-controls": o.contentId,
			"aria-expanded": o.open,
			"aria-required": o.required,
			"aria-autocomplete": "none",
			dir: o.dir,
			"data-state": o.open ? "open" : "closed",
			disabled: s,
			"data-disabled": s ? "" : void 0,
			"data-placeholder": Nl(o.value) ? "" : void 0,
			...i,
			ref: c,
			onClick: pn(i.onClick, (e) => {
				e.currentTarget.focus(), d.current !== "mouse" && h(e);
			}),
			onPointerDown: pn(i.onPointerDown, (e) => {
				d.current = e.pointerType;
				let t = e.target;
				t.hasPointerCapture(e.pointerId) && t.releasePointerCapture(e.pointerId), e.button === 0 && e.ctrlKey === !1 && e.pointerType === "mouse" && (h(e), e.preventDefault());
			}),
			onKeyDown: pn(i.onKeyDown, (e) => {
				let t = f.current !== "";
				!(e.ctrlKey || e.altKey || e.metaKey) && e.key.length === 1 && p(e.key), !(t && e.key === " ") && Dc.includes(e.key) && (h(), e.preventDefault());
			})
		})
	});
});
Hc.displayName = Vc;
var Uc = "SelectValue", Wc = u.forwardRef((e, t) => {
	let { __scopeSelect: n, className: r, style: i, children: a, placeholder: o = "", ...s } = e, c = Lc(Uc, n), { onValueNodeHasChildrenChange: l } = c, u = a !== void 0, d = vn(t, c.onValueNodeChange);
	return Mr(() => {
		l(u);
	}, [l, u]), /* @__PURE__ */ (0, L.jsx)(Wo.span, {
		...s,
		ref: d,
		style: { pointerEvents: "none" },
		children: Nl(c.value) ? /* @__PURE__ */ (0, L.jsx)(L.Fragment, { children: o }) : a
	});
});
Wc.displayName = Uc;
var Gc = "SelectIcon", Kc = u.forwardRef((e, t) => {
	let { __scopeSelect: n, children: r, ...i } = e;
	return /* @__PURE__ */ (0, L.jsx)(Wo.span, {
		"aria-hidden": !0,
		...i,
		ref: t,
		children: r || "▼"
	});
});
Kc.displayName = Gc;
var qc = "SelectPortal", Jc = (e) => /* @__PURE__ */ (0, L.jsx)(Uo, {
	asChild: !0,
	...e
});
Jc.displayName = qc;
var Yc = "SelectContent", Xc = u.forwardRef((e, t) => {
	let n = Lc(Yc, e.__scopeSelect), [r, i] = u.useState();
	if (Mr(() => {
		i(new DocumentFragment());
	}, []), !n.open) {
		let t = r;
		return t ? d.createPortal(/* @__PURE__ */ (0, L.jsx)(Qc, {
			scope: e.__scopeSelect,
			children: /* @__PURE__ */ (0, L.jsx)(Ac.Slot, {
				scope: e.__scopeSelect,
				children: /* @__PURE__ */ (0, L.jsx)("div", { children: e.children })
			})
		}), t) : null;
	}
	return /* @__PURE__ */ (0, L.jsx)(nl, {
		...e,
		ref: t
	});
});
Xc.displayName = Yc;
var Zc = 10, [Qc, $c] = Nc(Yc), el = "SelectContentImpl", tl = /* @__PURE__ */ yn("SelectContent.RemoveScroll"), nl = u.forwardRef((e, t) => {
	let { __scopeSelect: n, position: r = "item-aligned", onCloseAutoFocus: i, onEscapeKeyDown: a, onPointerDownOutside: o, side: s, sideOffset: c, align: l, alignOffset: d, arrowPadding: f, collisionBoundary: p, collisionPadding: m, sticky: h, hideWhenDetached: g, avoidCollisions: _, ...v } = e, y = Lc(Yc, n), [b, x] = u.useState(null), [S, C] = u.useState(null), w = vn(t, (e) => x(e)), [T, E] = u.useState(null), [D, O] = u.useState(null), k = jc(n), [A, j] = u.useState(!1), M = u.useRef(!1);
	u.useEffect(() => {
		if (b) return _s(b);
	}, [b]), rr();
	let N = u.useCallback((e) => {
		let [t, ...n] = k().map((e) => e.ref.current), [r] = n.slice(-1), i = document.activeElement;
		for (let n of e) if (n === i || (n?.scrollIntoView({ block: "nearest" }), n === t && S && (S.scrollTop = 0), n === r && S && (S.scrollTop = S.scrollHeight), n?.focus(), document.activeElement !== i)) return;
	}, [k, S]), P = u.useCallback(() => N([T, b]), [
		N,
		T,
		b
	]);
	u.useEffect(() => {
		A && P();
	}, [A, P]);
	let { onOpenChange: F, triggerPointerDownPosRef: I } = y;
	u.useEffect(() => {
		if (b) {
			let e = {
				x: 0,
				y: 0
			}, t = (t) => {
				e = {
					x: Math.abs(Math.round(t.pageX) - (I.current?.x ?? 0)),
					y: Math.abs(Math.round(t.pageY) - (I.current?.y ?? 0))
				};
			}, n = (n) => {
				e.x <= 10 && e.y <= 10 ? n.preventDefault() : b.contains(n.target) || F(!1), document.removeEventListener("pointermove", t), I.current = null;
			};
			return I.current !== null && (document.addEventListener("pointermove", t), document.addEventListener("pointerup", n, {
				capture: !0,
				once: !0
			})), () => {
				document.removeEventListener("pointermove", t), document.removeEventListener("pointerup", n, { capture: !0 });
			};
		}
	}, [
		b,
		F,
		I
	]), u.useEffect(() => {
		let e = () => F(!1);
		return window.addEventListener("blur", e), window.addEventListener("resize", e), () => {
			window.removeEventListener("blur", e), window.removeEventListener("resize", e);
		};
	}, [F]);
	let [ee, te] = Pl((e) => {
		let t = k().filter((e) => !e.disabled), n = Fl(t, e, t.find((e) => e.ref.current === document.activeElement));
		n && setTimeout(() => n.ref.current.focus());
	}), ne = u.useCallback((e, t, n) => {
		let r = !M.current && !n;
		(y.value !== void 0 && y.value === t || r) && (E(e), r && (M.current = !0));
	}, [y.value]), re = u.useCallback(() => b?.focus(), [b]), ie = u.useCallback((e, t, n) => {
		let r = !M.current && !n;
		(y.value !== void 0 && y.value === t || r) && O(e);
	}, [y.value]), ae = r === "popper" ? ol : il, R = ae === ol ? {
		side: s,
		sideOffset: c,
		align: l,
		alignOffset: d,
		arrowPadding: f,
		collisionBoundary: p,
		collisionPadding: m,
		sticky: h,
		hideWhenDetached: g,
		avoidCollisions: _
	} : {};
	return /* @__PURE__ */ (0, L.jsx)(Qc, {
		scope: n,
		content: b,
		viewport: S,
		onViewportChange: C,
		itemRefCallback: ne,
		selectedItem: T,
		onItemLeave: re,
		itemTextRefCallback: ie,
		focusSelectedItem: P,
		selectedItemText: D,
		position: r,
		isPositioned: A,
		searchRef: ee,
		children: /* @__PURE__ */ (0, L.jsx)(Ec, {
			as: tl,
			allowPinchZoom: !0,
			children: /* @__PURE__ */ (0, L.jsx)(br, {
				asChild: !0,
				trapped: y.open,
				onMountAutoFocus: (e) => {
					e.preventDefault();
				},
				onUnmountAutoFocus: pn(i, (e) => {
					y.trigger?.focus({ preventScroll: !0 }), e.preventDefault();
				}),
				children: /* @__PURE__ */ (0, L.jsx)(Yn, {
					asChild: !0,
					disableOutsidePointerEvents: !0,
					onEscapeKeyDown: a,
					onPointerDownOutside: o,
					onFocusOutside: (e) => e.preventDefault(),
					onDismiss: () => y.onOpenChange(!1),
					children: /* @__PURE__ */ (0, L.jsx)(ae, {
						role: "listbox",
						id: y.contentId,
						"data-state": y.open ? "open" : "closed",
						dir: y.dir,
						onContextMenu: (e) => e.preventDefault(),
						...v,
						...R,
						onPlaced: () => j(!0),
						ref: w,
						style: {
							display: "flex",
							flexDirection: "column",
							outline: "none",
							...v.style
						},
						onKeyDown: pn(v.onKeyDown, (e) => {
							let t = e.ctrlKey || e.altKey || e.metaKey;
							if (e.key === "Tab" && e.preventDefault(), !t && e.key.length === 1 && te(e.key), [
								"ArrowUp",
								"ArrowDown",
								"Home",
								"End"
							].includes(e.key)) {
								let t = k().filter((e) => !e.disabled).map((e) => e.ref.current);
								if (["ArrowUp", "End"].includes(e.key) && (t = t.slice().reverse()), ["ArrowUp", "ArrowDown"].includes(e.key)) {
									let n = e.target, r = t.indexOf(n);
									t = t.slice(r + 1);
								}
								setTimeout(() => N(t)), e.preventDefault();
							}
						})
					})
				})
			})
		})
	});
});
nl.displayName = el;
var rl = "SelectItemAlignedPosition", il = u.forwardRef((e, t) => {
	let { __scopeSelect: n, onPlaced: r, ...i } = e, a = Lc(Yc, n), o = $c(Yc, n), [s, c] = u.useState(null), [l, d] = u.useState(null), f = vn(t, (e) => d(e)), p = jc(n), m = u.useRef(!1), h = u.useRef(!0), { viewport: g, selectedItem: _, selectedItemText: v, focusSelectedItem: y } = o, b = u.useCallback(() => {
		if (a.trigger && a.valueNode && s && l && g && _ && v) {
			let e = a.trigger.getBoundingClientRect(), t = l.getBoundingClientRect(), n = a.valueNode.getBoundingClientRect(), i = v.getBoundingClientRect();
			if (a.dir !== "rtl") {
				let r = i.left - t.left, a = n.left - r, o = e.left - a, c = e.width + o, l = Math.max(c, t.width), u = window.innerWidth - Zc, d = fn(a, [Zc, Math.max(Zc, u - l)]);
				s.style.minWidth = c + "px", s.style.left = d + "px";
			} else {
				let r = t.right - i.right, a = window.innerWidth - n.right - r, o = window.innerWidth - e.right - a, c = e.width + o, l = Math.max(c, t.width), u = window.innerWidth - Zc, d = fn(a, [Zc, Math.max(Zc, u - l)]);
				s.style.minWidth = c + "px", s.style.right = d + "px";
			}
			let o = p(), c = window.innerHeight - Zc * 2, u = g.scrollHeight, d = window.getComputedStyle(l), f = parseInt(d.borderTopWidth, 10), h = parseInt(d.paddingTop, 10), y = parseInt(d.borderBottomWidth, 10), b = parseInt(d.paddingBottom, 10), x = f + h + u + b + y, S = Math.min(_.offsetHeight * 5, x), C = window.getComputedStyle(g), w = parseInt(C.paddingTop, 10), T = parseInt(C.paddingBottom, 10), E = e.top + e.height / 2 - Zc, D = c - E, O = _.offsetHeight / 2, k = _.offsetTop + O, A = f + h + k, j = x - A;
			if (A <= E) {
				let e = o.length > 0 && _ === o[o.length - 1].ref.current;
				s.style.bottom = "0px";
				let t = l.clientHeight - g.offsetTop - g.offsetHeight, n = A + Math.max(D, O + (e ? T : 0) + t + y);
				s.style.height = n + "px";
			} else {
				let e = o.length > 0 && _ === o[0].ref.current;
				s.style.top = "0px";
				let t = Math.max(E, f + g.offsetTop + (e ? w : 0) + O) + j;
				s.style.height = t + "px", g.scrollTop = A - E + g.offsetTop;
			}
			s.style.margin = `${Zc}px 0`, s.style.minHeight = S + "px", s.style.maxHeight = c + "px", r?.(), requestAnimationFrame(() => m.current = !0);
		}
	}, [
		p,
		a.trigger,
		a.valueNode,
		s,
		l,
		g,
		_,
		v,
		a.dir,
		r
	]);
	Mr(() => b(), [b]);
	let [x, S] = u.useState();
	return Mr(() => {
		l && S(window.getComputedStyle(l).zIndex);
	}, [l]), /* @__PURE__ */ (0, L.jsx)(sl, {
		scope: n,
		contentWrapper: s,
		shouldExpandOnScrollRef: m,
		onScrollButtonChange: u.useCallback((e) => {
			e && h.current === !0 && (b(), y?.(), h.current = !1);
		}, [b, y]),
		children: /* @__PURE__ */ (0, L.jsx)("div", {
			ref: c,
			style: {
				display: "flex",
				flexDirection: "column",
				position: "fixed",
				zIndex: x
			},
			children: /* @__PURE__ */ (0, L.jsx)(Wo.div, {
				...i,
				ref: f,
				style: {
					boxSizing: "border-box",
					maxHeight: "100%",
					...i.style
				}
			})
		})
	});
});
il.displayName = rl;
var al = "SelectPopperPosition", ol = u.forwardRef((e, t) => {
	let { __scopeSelect: n, align: r = "start", collisionPadding: i = Zc, ...a } = e, o = Fc(n);
	return /* @__PURE__ */ (0, L.jsx)(Ao, {
		...o,
		...a,
		ref: t,
		align: r,
		collisionPadding: i,
		style: {
			boxSizing: "border-box",
			...a.style,
			"--radix-select-content-transform-origin": "var(--radix-popper-transform-origin)",
			"--radix-select-content-available-width": "var(--radix-popper-available-width)",
			"--radix-select-content-available-height": "var(--radix-popper-available-height)",
			"--radix-select-trigger-width": "var(--radix-popper-anchor-width)",
			"--radix-select-trigger-height": "var(--radix-popper-anchor-height)"
		}
	});
});
ol.displayName = al;
var [sl, cl] = Nc(Yc, {}), ll = "SelectViewport", ul = u.forwardRef((e, t) => {
	let { __scopeSelect: n, nonce: r, ...i } = e, a = $c(ll, n), o = cl(ll, n), s = vn(t, a.onViewportChange), c = u.useRef(0);
	return /* @__PURE__ */ (0, L.jsxs)(L.Fragment, { children: [/* @__PURE__ */ (0, L.jsx)("style", {
		dangerouslySetInnerHTML: { __html: "[data-radix-select-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-select-viewport]::-webkit-scrollbar{display:none}" },
		nonce: r
	}), /* @__PURE__ */ (0, L.jsx)(Ac.Slot, {
		scope: n,
		children: /* @__PURE__ */ (0, L.jsx)(Wo.div, {
			"data-radix-select-viewport": "",
			role: "presentation",
			...i,
			ref: s,
			style: {
				position: "relative",
				flex: 1,
				overflow: "hidden auto",
				...i.style
			},
			onScroll: pn(i.onScroll, (e) => {
				let t = e.currentTarget, { contentWrapper: n, shouldExpandOnScrollRef: r } = o;
				if (r?.current && n) {
					let e = Math.abs(c.current - t.scrollTop);
					if (e > 0) {
						let r = window.innerHeight - Zc * 2, i = parseFloat(n.style.minHeight), a = parseFloat(n.style.height), o = Math.max(i, a);
						if (o < r) {
							let i = o + e, a = Math.min(r, i), s = i - a;
							n.style.height = a + "px", n.style.bottom === "0px" && (t.scrollTop = s > 0 ? s : 0, n.style.justifyContent = "flex-end");
						}
					}
				}
				c.current = t.scrollTop;
			})
		})
	})] });
});
ul.displayName = ll;
var dl = "SelectGroup", [fl, pl] = Nc(dl), ml = u.forwardRef((e, t) => {
	let { __scopeSelect: n, ...r } = e, i = Fr();
	return /* @__PURE__ */ (0, L.jsx)(fl, {
		scope: n,
		id: i,
		children: /* @__PURE__ */ (0, L.jsx)(Wo.div, {
			role: "group",
			"aria-labelledby": i,
			...r,
			ref: t
		})
	});
});
ml.displayName = dl;
var hl = "SelectLabel", gl = u.forwardRef((e, t) => {
	let { __scopeSelect: n, ...r } = e, i = pl(hl, n);
	return /* @__PURE__ */ (0, L.jsx)(Wo.div, {
		id: i.id,
		...r,
		ref: t
	});
});
gl.displayName = hl;
var _l = "SelectItem", [vl, yl] = Nc(_l), bl = u.forwardRef((e, t) => {
	let { __scopeSelect: n, value: r, disabled: i = !1, textValue: a, ...o } = e, s = Lc(_l, n), c = $c(_l, n), l = s.value === r, [d, f] = u.useState(a ?? ""), [p, m] = u.useState(!1), h = vn(t, (e) => c.itemRefCallback?.(e, r, i)), g = Fr(), _ = u.useRef("touch"), v = () => {
		i || (s.onValueChange(r), s.onOpenChange(!1));
	};
	if (r === "") throw Error("A <Select.Item /> must have a value prop that is not an empty string. This is because the Select value can be set to an empty string to clear the selection and show the placeholder.");
	return /* @__PURE__ */ (0, L.jsx)(vl, {
		scope: n,
		value: r,
		disabled: i,
		textId: g,
		isSelected: l,
		onItemTextChange: u.useCallback((e) => {
			f((t) => t || (e?.textContent ?? "").trim());
		}, []),
		children: /* @__PURE__ */ (0, L.jsx)(Ac.ItemSlot, {
			scope: n,
			value: r,
			disabled: i,
			textValue: d,
			children: /* @__PURE__ */ (0, L.jsx)(Wo.div, {
				role: "option",
				"aria-labelledby": g,
				"data-highlighted": p ? "" : void 0,
				"aria-selected": l && p,
				"data-state": l ? "checked" : "unchecked",
				"aria-disabled": i || void 0,
				"data-disabled": i ? "" : void 0,
				tabIndex: i ? void 0 : -1,
				...o,
				ref: h,
				onFocus: pn(o.onFocus, () => m(!0)),
				onBlur: pn(o.onBlur, () => m(!1)),
				onClick: pn(o.onClick, () => {
					_.current !== "mouse" && v();
				}),
				onPointerUp: pn(o.onPointerUp, () => {
					_.current === "mouse" && v();
				}),
				onPointerDown: pn(o.onPointerDown, (e) => {
					_.current = e.pointerType;
				}),
				onPointerMove: pn(o.onPointerMove, (e) => {
					_.current = e.pointerType, i ? c.onItemLeave?.() : _.current === "mouse" && e.currentTarget.focus({ preventScroll: !0 });
				}),
				onPointerLeave: pn(o.onPointerLeave, (e) => {
					e.currentTarget === document.activeElement && c.onItemLeave?.();
				}),
				onKeyDown: pn(o.onKeyDown, (e) => {
					c.searchRef?.current !== "" && e.key === " " || (Oc.includes(e.key) && v(), e.key === " " && e.preventDefault());
				})
			})
		})
	});
});
bl.displayName = _l;
var xl = "SelectItemText", Sl = u.forwardRef((e, t) => {
	let { __scopeSelect: n, className: r, style: i, ...a } = e, o = Lc(xl, n), s = $c(xl, n), c = yl(xl, n), l = zc(xl, n), [f, p] = u.useState(null), m = vn(t, (e) => p(e), c.onItemTextChange, (e) => s.itemTextRefCallback?.(e, c.value, c.disabled)), h = f?.textContent, g = u.useMemo(() => /* @__PURE__ */ (0, L.jsx)("option", {
		value: c.value,
		disabled: c.disabled,
		children: h
	}, c.value), [
		c.disabled,
		c.value,
		h
	]), { onNativeOptionAdd: _, onNativeOptionRemove: v } = l;
	return Mr(() => (_(g), () => v(g)), [
		_,
		v,
		g
	]), /* @__PURE__ */ (0, L.jsxs)(L.Fragment, { children: [/* @__PURE__ */ (0, L.jsx)(Wo.span, {
		id: c.textId,
		...a,
		ref: m
	}), c.isSelected && o.valueNode && !o.valueNodeHasChildren ? d.createPortal(a.children, o.valueNode) : null] });
});
Sl.displayName = xl;
var Cl = "SelectItemIndicator", wl = u.forwardRef((e, t) => {
	let { __scopeSelect: n, ...r } = e;
	return yl(Cl, n).isSelected ? /* @__PURE__ */ (0, L.jsx)(Wo.span, {
		"aria-hidden": !0,
		...r,
		ref: t
	}) : null;
});
wl.displayName = Cl;
var Tl = "SelectScrollUpButton", El = u.forwardRef((e, t) => {
	let n = $c(Tl, e.__scopeSelect), r = cl(Tl, e.__scopeSelect), [i, a] = u.useState(!1), o = vn(t, r.onScrollButtonChange);
	return Mr(() => {
		if (n.viewport && n.isPositioned) {
			let e = function() {
				a(t.scrollTop > 0);
			}, t = n.viewport;
			return e(), t.addEventListener("scroll", e), () => t.removeEventListener("scroll", e);
		}
	}, [n.viewport, n.isPositioned]), i ? /* @__PURE__ */ (0, L.jsx)(Y, {
		...e,
		ref: o,
		onAutoScroll: () => {
			let { viewport: e, selectedItem: t } = n;
			e && t && (e.scrollTop -= t.offsetHeight);
		}
	}) : null;
});
El.displayName = Tl;
var q = "SelectScrollDownButton", J = u.forwardRef((e, t) => {
	let n = $c(q, e.__scopeSelect), r = cl(q, e.__scopeSelect), [i, a] = u.useState(!1), o = vn(t, r.onScrollButtonChange);
	return Mr(() => {
		if (n.viewport && n.isPositioned) {
			let e = function() {
				let e = t.scrollHeight - t.clientHeight;
				a(Math.ceil(t.scrollTop) < e);
			}, t = n.viewport;
			return e(), t.addEventListener("scroll", e), () => t.removeEventListener("scroll", e);
		}
	}, [n.viewport, n.isPositioned]), i ? /* @__PURE__ */ (0, L.jsx)(Y, {
		...e,
		ref: o,
		onAutoScroll: () => {
			let { viewport: e, selectedItem: t } = n;
			e && t && (e.scrollTop += t.offsetHeight);
		}
	}) : null;
});
J.displayName = q;
var Y = u.forwardRef((e, t) => {
	let { __scopeSelect: n, onAutoScroll: r, ...i } = e, a = $c("SelectScrollButton", n), o = u.useRef(null), s = jc(n), c = u.useCallback(() => {
		o.current !== null && (window.clearInterval(o.current), o.current = null);
	}, []);
	return u.useEffect(() => () => c(), [c]), Mr(() => {
		s().find((e) => e.ref.current === document.activeElement)?.ref.current?.scrollIntoView({ block: "nearest" });
	}, [s]), /* @__PURE__ */ (0, L.jsx)(Wo.div, {
		"aria-hidden": !0,
		...i,
		ref: t,
		style: {
			flexShrink: 0,
			...i.style
		},
		onPointerDown: pn(i.onPointerDown, () => {
			o.current === null && (o.current = window.setInterval(r, 50));
		}),
		onPointerMove: pn(i.onPointerMove, () => {
			a.onItemLeave?.(), o.current === null && (o.current = window.setInterval(r, 50));
		}),
		onPointerLeave: pn(i.onPointerLeave, () => {
			c();
		})
	});
}), Dl = "SelectSeparator", Ol = u.forwardRef((e, t) => {
	let { __scopeSelect: n, ...r } = e;
	return /* @__PURE__ */ (0, L.jsx)(Wo.div, {
		"aria-hidden": !0,
		...r,
		ref: t
	});
});
Ol.displayName = Dl;
var kl = "SelectArrow", Al = u.forwardRef((e, t) => {
	let { __scopeSelect: n, ...r } = e, i = Fc(n), a = Lc(kl, n), o = $c(kl, n);
	return a.open && o.position === "popper" ? /* @__PURE__ */ (0, L.jsx)(jo, {
		...i,
		...r,
		ref: t
	}) : null;
});
Al.displayName = kl;
var jl = "SelectBubbleInput", Ml = u.forwardRef(({ __scopeSelect: e, value: t, ...n }, r) => {
	let i = u.useRef(null), a = vn(r, i), o = Xo(t);
	return u.useEffect(() => {
		let e = i.current;
		if (!e) return;
		let n = window.HTMLSelectElement.prototype, r = Object.getOwnPropertyDescriptor(n, "value").set;
		if (o !== t && r) {
			let n = new Event("change", { bubbles: !0 });
			r.call(e, t), e.dispatchEvent(n);
		}
	}, [o, t]), /* @__PURE__ */ (0, L.jsx)(Wo.select, {
		...n,
		style: {
			...os,
			...n.style
		},
		ref: a,
		defaultValue: t
	});
});
Ml.displayName = jl;
function Nl(e) {
	return e === "" || e === void 0;
}
function Pl(e) {
	let t = Go(e), n = u.useRef(""), r = u.useRef(0), i = u.useCallback((e) => {
		let i = n.current + e;
		t(i), (function e(t) {
			n.current = t, window.clearTimeout(r.current), t !== "" && (r.current = window.setTimeout(() => e(""), 1e3));
		})(i);
	}, [t]), a = u.useCallback(() => {
		n.current = "", window.clearTimeout(r.current);
	}, []);
	return u.useEffect(() => () => window.clearTimeout(r.current), []), [
		n,
		i,
		a
	];
}
function Fl(e, t, n) {
	let r = t.length > 1 && Array.from(t).every((e) => e === t[0]) ? t[0] : t, i = n ? e.indexOf(n) : -1, a = Il(e, Math.max(i, 0));
	r.length === 1 && (a = a.filter((e) => e !== n));
	let o = a.find((e) => e.textValue.toLowerCase().startsWith(r.toLowerCase()));
	return o === n ? void 0 : o;
}
function Il(e, t) {
	return e.map((n, r) => e[(t + r) % e.length]);
}
var Ll = Bc, Rl = Hc, zl = Wc, Bl = Kc, Vl = Jc, Hl = Xc, Ul = ul, Wl = bl, Gl = Sl, Kl = wl, ql = El, Jl = J, Yl = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), Xl = (e) => e.replace(/^([A-Z])|[\s-_]+(\w)/g, (e, t, n) => n ? n.toUpperCase() : t.toLowerCase()), Zl = (e) => {
	let t = Xl(e);
	return t.charAt(0).toUpperCase() + t.slice(1);
}, Ql = (...e) => e.filter((e, t, n) => !!e && e.trim() !== "" && n.indexOf(e) === t).join(" ").trim(), $l = {
	xmlns: "http://www.w3.org/2000/svg",
	width: 24,
	height: 24,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: 2,
	strokeLinecap: "round",
	strokeLinejoin: "round"
}, eu = (0, u.forwardRef)(({ color: e = "currentColor", size: t = 24, strokeWidth: n = 2, absoluteStrokeWidth: r, className: i = "", children: a, iconNode: o, ...s }, c) => (0, u.createElement)("svg", {
	ref: c,
	...$l,
	width: t,
	height: t,
	stroke: e,
	strokeWidth: r ? Number(n) * 24 / Number(t) : n,
	className: Ql("lucide", i),
	...s
}, [...o.map(([e, t]) => (0, u.createElement)(e, t)), ...Array.isArray(a) ? a : [a]])), X = (e, t) => {
	let n = (0, u.forwardRef)(({ className: n, ...r }, i) => (0, u.createElement)(eu, {
		ref: i,
		iconNode: t,
		className: Ql(`lucide-${Yl(Zl(e))}`, `lucide-${e}`, n),
		...r
	}));
	return n.displayName = Zl(e), n;
}, tu = X("align-center", [
	["path", {
		d: "M17 12H7",
		key: "16if0g"
	}],
	["path", {
		d: "M19 18H5",
		key: "18s9l3"
	}],
	["path", {
		d: "M21 6H3",
		key: "1jwq7v"
	}]
]), nu = X("align-left", [
	["path", {
		d: "M15 12H3",
		key: "6jk70r"
	}],
	["path", {
		d: "M17 18H3",
		key: "1amg6g"
	}],
	["path", {
		d: "M21 6H3",
		key: "1jwq7v"
	}]
]), ru = X("align-right", [
	["path", {
		d: "M21 12H9",
		key: "dn1m92"
	}],
	["path", {
		d: "M21 18H7",
		key: "1ygte8"
	}],
	["path", {
		d: "M21 6H3",
		key: "1jwq7v"
	}]
]), iu = X("bold", [["path", {
	d: "M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8",
	key: "mg9rjx"
}]]), au = X("check", [["path", {
	d: "M20 6 9 17l-5-5",
	key: "1gmf2c"
}]]), ou = X("chevron-down", [["path", {
	d: "m6 9 6 6 6-6",
	key: "qrunsl"
}]]), su = X("chevron-up", [["path", {
	d: "m18 15-6-6-6 6",
	key: "153udz"
}]]), cu = X("download", [
	["path", {
		d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",
		key: "ih7n3h"
	}],
	["polyline", {
		points: "7 10 12 15 17 10",
		key: "2ggqvy"
	}],
	["line", {
		x1: "12",
		x2: "12",
		y1: "15",
		y2: "3",
		key: "1vk2je"
	}]
]), lu = X("eye", [["path", {
	d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
	key: "1nclc0"
}], ["circle", {
	cx: "12",
	cy: "12",
	r: "3",
	key: "1v7zrd"
}]]), uu = X("file-down", [
	["path", {
		d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",
		key: "1rqfz7"
	}],
	["path", {
		d: "M14 2v4a2 2 0 0 0 2 2h4",
		key: "tnqrlb"
	}],
	["path", {
		d: "M12 18v-6",
		key: "17g6i2"
	}],
	["path", {
		d: "m9 15 3 3 3-3",
		key: "1npd3o"
	}]
]), du = X("file-text", [
	["path", {
		d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",
		key: "1rqfz7"
	}],
	["path", {
		d: "M14 2v4a2 2 0 0 0 2 2h4",
		key: "tnqrlb"
	}],
	["path", {
		d: "M10 9H8",
		key: "b1mrlr"
	}],
	["path", {
		d: "M16 13H8",
		key: "t4e002"
	}],
	["path", {
		d: "M16 17H8",
		key: "z1uh3a"
	}]
]), fu = X("file", [["path", {
	d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",
	key: "1rqfz7"
}], ["path", {
	d: "M14 2v4a2 2 0 0 0 2 2h4",
	key: "tnqrlb"
}]]), pu = X("heading-1", [
	["path", {
		d: "M4 12h8",
		key: "17cfdx"
	}],
	["path", {
		d: "M4 18V6",
		key: "1rz3zl"
	}],
	["path", {
		d: "M12 18V6",
		key: "zqpxq5"
	}],
	["path", {
		d: "m17 12 3-2v8",
		key: "1hhhft"
	}]
]), mu = X("heading-2", [
	["path", {
		d: "M4 12h8",
		key: "17cfdx"
	}],
	["path", {
		d: "M4 18V6",
		key: "1rz3zl"
	}],
	["path", {
		d: "M12 18V6",
		key: "zqpxq5"
	}],
	["path", {
		d: "M21 18h-4c0-4 4-3 4-6 0-1.5-2-2.5-4-1",
		key: "9jr5yi"
	}]
]), hu = X("image-plus", [
	["path", {
		d: "M16 5h6",
		key: "1vod17"
	}],
	["path", {
		d: "M19 2v6",
		key: "4bpg5p"
	}],
	["path", {
		d: "M21 11.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7.5",
		key: "1ue2ih"
	}],
	["path", {
		d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21",
		key: "1xmnt7"
	}],
	["circle", {
		cx: "9",
		cy: "9",
		r: "2",
		key: "af1f0g"
	}]
]), gu = X("image", [
	["rect", {
		width: "18",
		height: "18",
		x: "3",
		y: "3",
		rx: "2",
		ry: "2",
		key: "1m3agn"
	}],
	["circle", {
		cx: "9",
		cy: "9",
		r: "2",
		key: "af1f0g"
	}],
	["path", {
		d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21",
		key: "1xmnt7"
	}]
]), _u = X("italic", [
	["line", {
		x1: "19",
		x2: "10",
		y1: "4",
		y2: "4",
		key: "15jd3p"
	}],
	["line", {
		x1: "14",
		x2: "5",
		y1: "20",
		y2: "20",
		key: "bu0au3"
	}],
	["line", {
		x1: "15",
		x2: "9",
		y1: "4",
		y2: "20",
		key: "uljnxc"
	}]
]), vu = X("layout-template", [
	["rect", {
		width: "18",
		height: "7",
		x: "3",
		y: "3",
		rx: "1",
		key: "f1a2em"
	}],
	["rect", {
		width: "9",
		height: "7",
		x: "3",
		y: "14",
		rx: "1",
		key: "jqznyg"
	}],
	["rect", {
		width: "5",
		height: "7",
		x: "16",
		y: "14",
		rx: "1",
		key: "q5h2i8"
	}]
]), yu = X("list-ordered", [
	["path", {
		d: "M10 12h11",
		key: "6m4ad9"
	}],
	["path", {
		d: "M10 18h11",
		key: "11hvi2"
	}],
	["path", {
		d: "M10 6h11",
		key: "c7qv1k"
	}],
	["path", {
		d: "M4 10h2",
		key: "16xx2s"
	}],
	["path", {
		d: "M4 6h1v4",
		key: "cnovpq"
	}],
	["path", {
		d: "M6 18H4c0-1 2-2 2-3s-1-1.5-2-1",
		key: "m9a95d"
	}]
]), bu = X("list", [
	["path", {
		d: "M3 12h.01",
		key: "nlz23k"
	}],
	["path", {
		d: "M3 18h.01",
		key: "1tta3j"
	}],
	["path", {
		d: "M3 6h.01",
		key: "1rqtza"
	}],
	["path", {
		d: "M8 12h13",
		key: "1za7za"
	}],
	["path", {
		d: "M8 18h13",
		key: "1lx6n3"
	}],
	["path", {
		d: "M8 6h13",
		key: "ik3vkj"
	}]
]), xu = X("minus", [["path", {
	d: "M5 12h14",
	key: "1ays0h"
}]]), Su = X("mouse-pointer-2", [["path", {
	d: "M4.037 4.688a.495.495 0 0 1 .651-.651l16 6.5a.5.5 0 0 1-.063.947l-6.124 1.58a2 2 0 0 0-1.438 1.435l-1.579 6.126a.5.5 0 0 1-.947.063z",
	key: "edeuup"
}]]), Cu = X("pilcrow", [
	["path", {
		d: "M13 4v16",
		key: "8vvj80"
	}],
	["path", {
		d: "M17 4v16",
		key: "7dpous"
	}],
	["path", {
		d: "M19 4H9.5a4.5 4.5 0 0 0 0 9H13",
		key: "sh4n9v"
	}]
]), wu = X("plus", [["path", {
	d: "M5 12h14",
	key: "1ays0h"
}], ["path", {
	d: "M12 5v14",
	key: "s699le"
}]]), Tu = X("redo", [["path", {
	d: "M21 7v6h-6",
	key: "3ptur4"
}], ["path", {
	d: "M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7",
	key: "1kgawr"
}]]), Eu = X("save", [
	["path", {
		d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
		key: "1c8476"
	}],
	["path", {
		d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7",
		key: "1ydtos"
	}],
	["path", {
		d: "M7 3v4a1 1 0 0 0 1 1h7",
		key: "t51u73"
	}]
]), Du = X("settings", [["path", {
	d: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",
	key: "1qme2f"
}], ["circle", {
	cx: "12",
	cy: "12",
	r: "3",
	key: "1v7zrd"
}]]), Ou = X("trash-2", [
	["path", {
		d: "M3 6h18",
		key: "d0wm0j"
	}],
	["path", {
		d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",
		key: "4alrt4"
	}],
	["path", {
		d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",
		key: "v07s0e"
	}],
	["line", {
		x1: "10",
		x2: "10",
		y1: "11",
		y2: "17",
		key: "1uufr5"
	}],
	["line", {
		x1: "14",
		x2: "14",
		y1: "11",
		y2: "17",
		key: "xtxkd"
	}]
]), ku = X("type", [
	["polyline", {
		points: "4 7 4 4 20 4 20 7",
		key: "1nosan"
	}],
	["line", {
		x1: "9",
		x2: "15",
		y1: "20",
		y2: "20",
		key: "swin9y"
	}],
	["line", {
		x1: "12",
		x2: "12",
		y1: "4",
		y2: "20",
		key: "1tx1rr"
	}]
]), Au = X("underline", [["path", {
	d: "M6 4v6a6 6 0 0 0 12 0V4",
	key: "9kb039"
}], ["line", {
	x1: "4",
	x2: "20",
	y1: "20",
	y2: "20",
	key: "nun2al"
}]]), ju = X("undo", [["path", {
	d: "M3 7v6h6",
	key: "1v2h90"
}], ["path", {
	d: "M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13",
	key: "1r6uu6"
}]]), Mu = X("x", [["path", {
	d: "M18 6 6 18",
	key: "1bl5f8"
}], ["path", {
	d: "m6 6 12 12",
	key: "d8bk6v"
}]]);
//#endregion
//#region components/ui/select.tsx
function Nu({ ...e }) {
	return /* @__PURE__ */ (0, L.jsx)(Ll, {
		"data-slot": "select",
		...e
	});
}
function Pu({ ...e }) {
	return /* @__PURE__ */ (0, L.jsx)(zl, {
		"data-slot": "select-value",
		...e
	});
}
function Fu({ className: e, size: t = "default", children: n, ...r }) {
	return /* @__PURE__ */ (0, L.jsxs)(Rl, {
		"data-slot": "select-trigger",
		"data-size": t,
		className: H("border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", e),
		...r,
		children: [n, /* @__PURE__ */ (0, L.jsx)(Bl, {
			asChild: !0,
			children: /* @__PURE__ */ (0, L.jsx)(ou, { className: "size-4 opacity-50" })
		})]
	});
}
function Iu({ className: e, children: t, position: n = "popper", ...r }) {
	return /* @__PURE__ */ (0, L.jsx)(Vl, { children: /* @__PURE__ */ (0, L.jsxs)(Hl, {
		"data-slot": "select-content",
		className: H("bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border shadow-md", n === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1", e),
		position: n,
		...r,
		children: [
			/* @__PURE__ */ (0, L.jsx)(Ru, {}),
			/* @__PURE__ */ (0, L.jsx)(Ul, {
				className: H("p-1", n === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1"),
				children: t
			}),
			/* @__PURE__ */ (0, L.jsx)(zu, {})
		]
	}) });
}
function Lu({ className: e, children: t, ...n }) {
	return /* @__PURE__ */ (0, L.jsxs)(Wl, {
		"data-slot": "select-item",
		className: H("focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2", e),
		...n,
		children: [/* @__PURE__ */ (0, L.jsx)("span", {
			className: "absolute right-2 flex size-3.5 items-center justify-center",
			children: /* @__PURE__ */ (0, L.jsx)(Kl, { children: /* @__PURE__ */ (0, L.jsx)(au, { className: "size-4" }) })
		}), /* @__PURE__ */ (0, L.jsx)(Gl, { children: t })]
	});
}
function Ru({ className: e, ...t }) {
	return /* @__PURE__ */ (0, L.jsx)(ql, {
		"data-slot": "select-scroll-up-button",
		className: H("flex cursor-default items-center justify-center py-1", e),
		...t,
		children: /* @__PURE__ */ (0, L.jsx)(su, { className: "size-4" })
	});
}
function zu({ className: e, ...t }) {
	return /* @__PURE__ */ (0, L.jsx)(Jl, {
		"data-slot": "select-scroll-down-button",
		className: H("flex cursor-default items-center justify-center py-1", e),
		...t,
		children: /* @__PURE__ */ (0, L.jsx)(ou, { className: "size-4" })
	});
}
//#endregion
//#region app/(protected)/certificates/create/components/FloatingPropertiesPanel.tsx
var Bu = [
	8,
	10,
	12,
	14,
	16,
	18,
	20,
	24,
	28,
	32,
	36,
	48,
	72
], Vu = [
	100,
	150,
	200,
	250,
	300,
	400,
	500
], Hu = [
	0,
	1,
	2,
	3,
	4,
	5
], Uu = [
	-10,
	-5,
	0,
	5,
	10,
	15,
	20
], Wu = [
	{
		value: "1",
		label: "Одинарный"
	},
	{
		value: "1.2",
		label: "1.2"
	},
	{
		value: "1.5",
		label: "1.5"
	},
	{
		value: "2",
		label: "Двойной"
	}
], Gu = [
	{
		label: "Обычный текст",
		value: "normal",
		fontSize: 16,
		fontWeight: "normal"
	},
	{
		label: "Заголовок 1",
		value: "h1",
		fontSize: 32,
		fontWeight: "bold"
	},
	{
		label: "Заголовок 2",
		value: "h2",
		fontSize: 24,
		fontWeight: "bold"
	},
	{
		label: "Заголовок 3",
		value: "h3",
		fontSize: 18,
		fontWeight: "bold"
	}
];
function Ku({ selectedLayer: e, onUpdateLayer: t, onDeleteLayer: n, onClose: r, position: i, onPositionChange: a, isSidebar: o = !1, onSetEditingText: s }) {
	let [c, l] = (0, u.useState)({
		x: 0,
		y: 0
	}), [d, f] = (0, u.useState)(!1), [p, m] = (0, u.useState)({
		fontSize: String(e.fontSize || 16),
		width: String(e.width || 300),
		borderWidth: String(e.borderWidth || 0),
		letterSpacing: String(e.letterSpacing || 0),
		x: String(Math.round(e.x)),
		y: String(Math.round(e.y))
	}), h = (0, u.useRef)(null), g = (0, u.useRef)({
		fontSize: e.fontSize || 16,
		width: e.width || 300,
		borderWidth: e.borderWidth || 0,
		letterSpacing: e.letterSpacing || 0,
		x: Math.round(e.x),
		y: Math.round(e.y)
	}), [_, v] = (0, u.useState)({
		bold: !1,
		italic: !1,
		underline: !1
	});
	(0, u.useEffect)(() => {
		let e = () => {
			typeof document < "u" && v({
				bold: document.queryCommandState("bold"),
				italic: document.queryCommandState("italic"),
				underline: document.queryCommandState("underline")
			});
		};
		return document.addEventListener("selectionchange", e), () => document.removeEventListener("selectionchange", e);
	}, []);
	let y = (e, t = void 0) => {
		document.execCommand(e, !1, t);
		let n = document.activeElement;
		n && n.getAttribute("contenteditable") === "true" && s?.(n.innerHTML);
	}, b = (e, t) => {
		let n = window.getSelection();
		if (!n || n.rangeCount === 0) return;
		let r = n.getRangeAt(0);
		if (r.collapsed) return;
		let i = document.createElement("span");
		i.style.setProperty(e, t);
		try {
			let e = r.extractContents();
			i.appendChild(e), r.insertNode(i);
			let t = document.createRange();
			t.selectNodeContents(i), n.removeAllRanges(), n.addRange(t);
			let a = document.activeElement;
			a && a.getAttribute("contenteditable") === "true" && s?.(a.innerHTML);
		} catch (n) {
			console.error("Failed to apply inline style", n), e === "color" && y("foreColor", t);
		}
	};
	(0, u.useEffect)(() => {
		m({
			fontSize: String(e.fontSize || 16),
			width: String(e.width || 300),
			borderWidth: String(e.borderWidth || 0),
			letterSpacing: String(e.letterSpacing || 0),
			x: String(Math.round(e.x)),
			y: String(Math.round(e.y))
		}), g.current = {
			fontSize: e.fontSize || 16,
			width: e.width || 300,
			borderWidth: e.borderWidth || 0,
			letterSpacing: e.letterSpacing || 0,
			x: Math.round(e.x),
			y: Math.round(e.y)
		};
	}, [e.id]);
	let x = (e) => {
		h.current && (e.target === h.current || h.current.contains(e.target)) && (f(!0), l({
			x: e.clientX - i.x,
			y: e.clientY - i.y
		}));
	}, S = (e) => {
		d && a({
			x: e.clientX - c.x,
			y: e.clientY - c.y
		});
	}, C = () => {
		f(!1);
	}, w = (e, t, n, r) => {
		if (e === "" || e === "-") return g.current[r];
		let i = Number(e);
		return isNaN(i) ? g.current[r] : Math.max(t, Math.min(n, i));
	}, T = (e, t) => {
		m((n) => ({
			...n,
			[e]: t
		}));
	}, E = (n) => {
		let r = p[n], i;
		switch (n) {
			case "fontSize":
				i = w(r, 8, 72, "fontSize");
				break;
			case "width":
				i = w(r, 50, 2e3, "width");
				break;
			case "borderWidth":
				i = w(r, 0, 5, "borderWidth");
				break;
			case "letterSpacing":
				i = w(r, -20, 20, "letterSpacing");
				break;
			case "x":
				i = w(r, 0, 1e4, "x");
				break;
			case "y":
				i = w(r, 0, 1e4, "y");
				break;
			default: return;
		}
		m((e) => ({
			...e,
			[n]: String(i)
		}));
		let a = {};
		switch (n) {
			case "fontSize":
				a.fontSize = i;
				break;
			case "width":
				a.width = i;
				break;
			case "borderWidth":
				a.borderWidth = i;
				break;
			case "letterSpacing":
				a.letterSpacing = i;
				break;
			case "x":
				a.x = i;
				break;
			case "y":
				a.y = i;
				break;
		}
		t(e.id, a);
	}, D = (e, t) => {
		e.key === "Enter" && e.target.blur();
	}, O = (e) => {
		e.target.select();
	};
	return (0, u.useEffect)(() => (d && (window.addEventListener("mousemove", S), window.addEventListener("mouseup", C)), () => {
		window.removeEventListener("mousemove", S), window.removeEventListener("mouseup", C);
	}), [
		d,
		c,
		a
	]), /* @__PURE__ */ (0, L.jsxs)("div", {
		className: o ? "h-full flex flex-col" : "fixed z-50 bg-card border border-border rounded-lg shadow-lg overflow-hidden flex flex-col max-h-[90vh]",
		style: o ? void 0 : {
			left: `${i.x}px`,
			top: `${i.y}px`,
			width: "320px"
		},
		onMouseDown: o ? void 0 : x,
		children: [
			/* @__PURE__ */ (0, L.jsxs)("div", {
				ref: h,
				className: `flex justify-between items-center p-3 border-b border-border transition-colors flex-shrink-0 ${o ? "bg-transparent" : "cursor-move bg-muted hover:bg-muted/80"}`,
				children: [/* @__PURE__ */ (0, L.jsx)("h3", {
					className: "text-sm font-semibold text-foreground",
					children: "Свойства элемента"
				}), !o && /* @__PURE__ */ (0, L.jsx)("button", {
					onClick: r,
					className: "text-muted-foreground hover:text-foreground text-lg",
					children: "✕"
				})]
			}),
			/* @__PURE__ */ (0, L.jsxs)("div", {
				className: "overflow-y-auto flex-1 p-4 space-y-4",
				children: [
					/* @__PURE__ */ (0, L.jsxs)("div", { children: [/* @__PURE__ */ (0, L.jsx)(dn, {
						className: "text-xs font-medium text-foreground",
						children: "Стиль абзаца"
					}), /* @__PURE__ */ (0, L.jsxs)(Nu, {
						value: "custom",
						onValueChange: (n) => {
							let r = Gu.find((e) => e.value === n);
							r && t(e.id, {
								fontSize: r.fontSize,
								fontWeight: r.fontWeight
							});
						},
						children: [/* @__PURE__ */ (0, L.jsx)(Fu, {
							className: "mt-1 text-sm",
							children: /* @__PURE__ */ (0, L.jsx)(Pu, { placeholder: "Выберите стиль" })
						}), /* @__PURE__ */ (0, L.jsxs)(Iu, { children: [/* @__PURE__ */ (0, L.jsx)(Lu, {
							value: "custom",
							disabled: !0,
							children: "-- Выберите стиль --"
						}), Gu.map((e) => /* @__PURE__ */ (0, L.jsx)(Lu, {
							value: e.value,
							children: e.label
						}, e.value))] })]
					})] }),
					/* @__PURE__ */ (0, L.jsxs)("div", { children: [/* @__PURE__ */ (0, L.jsx)(dn, {
						className: "text-xs font-medium text-foreground",
						children: "Списки"
					}), /* @__PURE__ */ (0, L.jsxs)("div", {
						className: "mt-2 flex gap-1",
						children: [/* @__PURE__ */ (0, L.jsxs)(U, {
							variant: e.listType === "bullet" ? "default" : "outline",
							size: "sm",
							onClick: () => t(e.id, { listType: e.listType === "bullet" ? "none" : "bullet" }),
							className: "flex-1 h-8 text-xs gap-2",
							children: [/* @__PURE__ */ (0, L.jsx)(bu, { className: "w-3 h-3" }), "Маркеры"]
						}), /* @__PURE__ */ (0, L.jsxs)(U, {
							variant: e.listType === "number" ? "default" : "outline",
							size: "sm",
							onClick: () => t(e.id, { listType: e.listType === "number" ? "none" : "number" }),
							className: "flex-1 h-8 text-xs gap-2",
							children: [/* @__PURE__ */ (0, L.jsx)(yu, { className: "w-3 h-3" }), "Нумерация"]
						})]
					})] }),
					/* @__PURE__ */ (0, L.jsxs)("div", { children: [/* @__PURE__ */ (0, L.jsx)(dn, {
						className: "text-xs font-medium text-foreground",
						children: "Межстрочный интервал"
					}), /* @__PURE__ */ (0, L.jsxs)(Nu, {
						value: e.lineHeight || "normal",
						onValueChange: (n) => t(e.id, { lineHeight: n }),
						children: [/* @__PURE__ */ (0, L.jsx)(Fu, {
							className: "mt-1 text-sm",
							children: /* @__PURE__ */ (0, L.jsx)(Pu, { placeholder: "Нормальный" })
						}), /* @__PURE__ */ (0, L.jsxs)(Iu, { children: [/* @__PURE__ */ (0, L.jsx)(Lu, {
							value: "normal",
							children: "Нормальный"
						}), Wu.map((e) => /* @__PURE__ */ (0, L.jsx)(Lu, {
							value: e.value,
							children: e.label
						}, e.value))] })]
					})] }),
					/* @__PURE__ */ (0, L.jsx)("div", { className: "h-px bg-border my-2" }),
					/* @__PURE__ */ (0, L.jsxs)("div", { children: [/* @__PURE__ */ (0, L.jsx)(dn, {
						className: "text-xs font-medium text-foreground",
						children: "Шрифт"
					}), /* @__PURE__ */ (0, L.jsxs)(Nu, {
						value: e.fontFamily,
						onValueChange: (n) => {
							let r = window.getSelection();
							r && !r.isCollapsed ? y("fontName", n) : t(e.id, { fontFamily: n });
						},
						children: [/* @__PURE__ */ (0, L.jsx)(Fu, {
							className: "mt-1 text-sm",
							children: /* @__PURE__ */ (0, L.jsx)(Pu, {})
						}), /* @__PURE__ */ (0, L.jsx)(Iu, { children: qt.map((e) => /* @__PURE__ */ (0, L.jsx)(Lu, {
							value: e.value,
							children: e.label
						}, e.value)) })]
					})] }),
					/* @__PURE__ */ (0, L.jsxs)("div", { children: [/* @__PURE__ */ (0, L.jsx)(dn, {
						className: "text-xs font-medium text-foreground",
						children: "Жирность"
					}), /* @__PURE__ */ (0, L.jsxs)(Nu, {
						value: _.bold ? "bold" : e.fontWeight || "normal",
						onValueChange: (n) => {
							let r = window.getSelection();
							r && !r.isCollapsed ? y("bold") : t(e.id, { fontWeight: n });
						},
						children: [/* @__PURE__ */ (0, L.jsx)(Fu, {
							className: "mt-1 text-sm",
							children: /* @__PURE__ */ (0, L.jsx)(Pu, {})
						}), /* @__PURE__ */ (0, L.jsxs)(Iu, { children: [
							/* @__PURE__ */ (0, L.jsx)(Lu, {
								value: "normal",
								children: "Обычный"
							}),
							/* @__PURE__ */ (0, L.jsx)(Lu, {
								value: "bold",
								children: "Жирный"
							}),
							/* @__PURE__ */ (0, L.jsx)(Lu, {
								value: "lighter",
								children: "Тонкий"
							})
						] })]
					})] }),
					/* @__PURE__ */ (0, L.jsxs)("div", { children: [/* @__PURE__ */ (0, L.jsx)(dn, {
						className: "text-xs font-medium text-foreground",
						children: "Размер шрифта"
					}), /* @__PURE__ */ (0, L.jsxs)(Nu, {
						value: String(e.fontSize),
						onValueChange: (n) => {
							let r = window.getSelection();
							r && !r.isCollapsed ? b("font-size", `${n}px`) : t(e.id, { fontSize: Number(n) });
						},
						children: [/* @__PURE__ */ (0, L.jsx)(Fu, {
							className: "mt-1 text-sm",
							children: /* @__PURE__ */ (0, L.jsx)(Pu, {})
						}), /* @__PURE__ */ (0, L.jsx)(Iu, { children: Bu.map((e) => /* @__PURE__ */ (0, L.jsxs)(Lu, {
							value: String(e),
							children: [e, " px"]
						}, e)) })]
					})] }),
					/* @__PURE__ */ (0, L.jsxs)("div", { children: [/* @__PURE__ */ (0, L.jsx)(dn, {
						className: "text-xs font-medium text-foreground",
						children: "Цвет текста"
					}), /* @__PURE__ */ (0, L.jsxs)("div", {
						className: "mt-1 flex items-center gap-2",
						children: [/* @__PURE__ */ (0, L.jsx)("input", {
							type: "color",
							value: e.color,
							onChange: (n) => {
								let r = window.getSelection();
								r && !r.isCollapsed ? b("color", n.target.value) : t(e.id, { color: n.target.value });
							},
							className: "h-9 w-12 rounded border border-border cursor-pointer"
						}), /* @__PURE__ */ (0, L.jsx)(Zt, {
							value: e.color,
							onChange: (n) => {
								let r = window.getSelection();
								r && !r.isCollapsed ? b("color", n.target.value) : t(e.id, { color: n.target.value });
							},
							className: "text-xs flex-1"
						})]
					})] }),
					/* @__PURE__ */ (0, L.jsxs)("div", { children: [/* @__PURE__ */ (0, L.jsx)(dn, {
						className: "text-xs font-medium text-foreground",
						children: "Стиль текста"
					}), /* @__PURE__ */ (0, L.jsxs)("div", {
						className: "mt-2 flex gap-1",
						children: [
							/* @__PURE__ */ (0, L.jsx)(U, {
								variant: _.italic || e.fontStyle === "italic" ? "default" : "outline",
								size: "sm",
								onClick: () => {
									let n = window.getSelection();
									n && !n.isCollapsed ? y("italic") : t(e.id, { fontStyle: e.fontStyle === "italic" ? "normal" : "italic" });
								},
								className: "flex-1 h-8 text-xs",
								children: /* @__PURE__ */ (0, L.jsx)("span", {
									className: "italic",
									children: "I"
								})
							}),
							/* @__PURE__ */ (0, L.jsx)(U, {
								variant: _.underline || e.textDecoration?.includes("underline") ? "default" : "outline",
								size: "sm",
								onClick: () => {
									let n = window.getSelection();
									n && !n.isCollapsed ? y("underline") : t(e.id, { textDecoration: e.textDecoration === "underline" ? "none" : "underline" });
								},
								className: "flex-1 h-8 text-xs",
								children: /* @__PURE__ */ (0, L.jsx)("span", {
									className: "underline",
									children: "U"
								})
							}),
							/* @__PURE__ */ (0, L.jsx)(U, {
								variant: e.textDecoration?.includes("line-through") ? "default" : "outline",
								size: "sm",
								onClick: () => {
									let n = window.getSelection();
									n && !n.isCollapsed ? y("strikeThrough") : t(e.id, { textDecoration: e.textDecoration === "line-through" ? "none" : "line-through" });
								},
								className: "flex-1 h-8 text-xs",
								children: /* @__PURE__ */ (0, L.jsx)("span", {
									className: "line-through",
									children: "S"
								})
							})
						]
					})] }),
					/* @__PURE__ */ (0, L.jsxs)("div", { children: [/* @__PURE__ */ (0, L.jsx)(dn, {
						className: "text-xs font-medium text-foreground",
						children: "Выравнивание"
					}), /* @__PURE__ */ (0, L.jsxs)("div", {
						className: "mt-2 grid grid-cols-3 gap-1",
						children: [
							/* @__PURE__ */ (0, L.jsx)(U, {
								variant: e.alignment === "left" ? "default" : "outline",
								size: "sm",
								onClick: () => t(e.id, { alignment: "left" }),
								className: "h-8 text-xs",
								children: "⬅"
							}),
							/* @__PURE__ */ (0, L.jsx)(U, {
								variant: e.alignment === "center" ? "default" : "outline",
								size: "sm",
								onClick: () => t(e.id, { alignment: "center" }),
								className: "h-8 text-xs",
								children: "↔"
							}),
							/* @__PURE__ */ (0, L.jsx)(U, {
								variant: e.alignment === "right" ? "default" : "outline",
								size: "sm",
								onClick: () => t(e.id, { alignment: "right" }),
								className: "h-8 text-xs",
								children: "➡"
							})
						]
					})] }),
					/* @__PURE__ */ (0, L.jsxs)("div", {
						className: "grid grid-cols-2 gap-2",
						children: [/* @__PURE__ */ (0, L.jsxs)("div", { children: [/* @__PURE__ */ (0, L.jsx)(dn, {
							className: "text-xs font-medium text-foreground",
							children: "X"
						}), /* @__PURE__ */ (0, L.jsx)(Zt, {
							type: "text",
							value: p.x,
							onChange: (e) => T("x", e.target.value),
							onBlur: () => E("x"),
							onKeyDown: (e) => D(e, "x"),
							onFocus: O,
							className: "mt-1 text-sm",
							placeholder: "0"
						})] }), /* @__PURE__ */ (0, L.jsxs)("div", { children: [/* @__PURE__ */ (0, L.jsx)(dn, {
							className: "text-xs font-medium text-foreground",
							children: "Y"
						}), /* @__PURE__ */ (0, L.jsx)(Zt, {
							type: "text",
							value: p.y,
							onChange: (e) => T("y", e.target.value),
							onBlur: () => E("y"),
							onKeyDown: (e) => D(e, "y"),
							onFocus: O,
							className: "mt-1 text-sm",
							placeholder: "0"
						})] })]
					}),
					/* @__PURE__ */ (0, L.jsxs)("div", { children: [/* @__PURE__ */ (0, L.jsx)(dn, {
						className: "text-xs font-medium text-foreground",
						children: "Ширина"
					}), /* @__PURE__ */ (0, L.jsxs)(Nu, {
						value: String(e.width),
						onValueChange: (n) => t(e.id, { width: Number(n) }),
						children: [/* @__PURE__ */ (0, L.jsx)(Fu, {
							className: "mt-1 text-sm",
							children: /* @__PURE__ */ (0, L.jsx)(Pu, {})
						}), /* @__PURE__ */ (0, L.jsx)(Iu, { children: Vu.map((e) => /* @__PURE__ */ (0, L.jsxs)(Lu, {
							value: String(e),
							children: [e, " px"]
						}, e)) })]
					})] }),
					/* @__PURE__ */ (0, L.jsxs)("div", { children: [/* @__PURE__ */ (0, L.jsx)(dn, {
						className: "text-xs font-medium text-foreground",
						children: "Прозрачность"
					}), /* @__PURE__ */ (0, L.jsxs)("div", {
						className: "mt-1 flex items-center gap-2",
						children: [/* @__PURE__ */ (0, L.jsx)(Zt, {
							type: "range",
							min: "0",
							max: "1",
							step: "0.1",
							value: e.opacity === void 0 ? 1 : e.opacity,
							onChange: (n) => t(e.id, { opacity: Number(n.target.value) }),
							className: "flex-1"
						}), /* @__PURE__ */ (0, L.jsxs)("span", {
							className: "text-xs text-muted-foreground w-8 text-right",
							children: [Math.round((e.opacity === void 0 ? 1 : e.opacity) * 100), "%"]
						})]
					})] }),
					/* @__PURE__ */ (0, L.jsxs)("div", { children: [/* @__PURE__ */ (0, L.jsx)(dn, {
						className: "text-xs font-medium text-foreground",
						children: "Обводка"
					}), /* @__PURE__ */ (0, L.jsx)("div", {
						className: "mt-2 space-y-2",
						children: /* @__PURE__ */ (0, L.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, L.jsxs)(Nu, {
								value: String(e.borderWidth || 0),
								onValueChange: (n) => t(e.id, { borderWidth: Number(n) }),
								children: [/* @__PURE__ */ (0, L.jsx)(Fu, {
									className: "text-sm flex-1",
									children: /* @__PURE__ */ (0, L.jsx)(Pu, {})
								}), /* @__PURE__ */ (0, L.jsx)(Iu, { children: Hu.map((e) => /* @__PURE__ */ (0, L.jsxs)(Lu, {
									value: String(e),
									children: [e, " px"]
								}, e)) })]
							}), /* @__PURE__ */ (0, L.jsx)("input", {
								type: "color",
								value: e.borderColor || "#000000",
								onChange: (n) => t(e.id, { borderColor: n.target.value }),
								className: "h-8 w-10 rounded border border-border cursor-pointer"
							})]
						})
					})] }),
					/* @__PURE__ */ (0, L.jsxs)("div", { children: [/* @__PURE__ */ (0, L.jsx)(dn, {
						className: "text-xs font-medium text-foreground",
						children: "Интервал букв"
					}), /* @__PURE__ */ (0, L.jsxs)(Nu, {
						value: String(e.letterSpacing || 0),
						onValueChange: (n) => t(e.id, { letterSpacing: Number(n) }),
						children: [/* @__PURE__ */ (0, L.jsx)(Fu, {
							className: "mt-1 text-sm",
							children: /* @__PURE__ */ (0, L.jsx)(Pu, {})
						}), /* @__PURE__ */ (0, L.jsx)(Iu, { children: Uu.map((e) => /* @__PURE__ */ (0, L.jsxs)(Lu, {
							value: String(e),
							children: [e, " px"]
						}, e)) })]
					})] })
				]
			}),
			/* @__PURE__ */ (0, L.jsxs)("div", {
				className: "flex gap-2 p-4 border-t border-border bg-muted/50 flex-shrink-0",
				children: [/* @__PURE__ */ (0, L.jsx)(U, {
					variant: "destructive",
					size: "sm",
					onClick: () => n(e.id),
					className: "flex-1 h-8 text-xs",
					children: "🗑 Удалить"
				}), /* @__PURE__ */ (0, L.jsx)(U, {
					variant: "outline",
					size: "sm",
					onClick: r,
					className: "flex-1 h-8 text-xs bg-transparent",
					children: "Закрыть"
				})]
			})
		]
	});
}
//#endregion
//#region app/(protected)/certificates/create/components/ZoomableCanvas.tsx
function qu({ layer: e, isSelected: t, isEditing: n, showFormattingSymbols: r, onDoubleClick: i, editingText: a, setEditingText: o, editingSelectionStart: s, editingSelectionEnd: c, setEditingSelectionStart: l, setEditingSelectionEnd: d, allLayers: f }) {
	let p = (0, u.useRef)(null);
	return (0, u.useRef)({
		start: 0,
		end: 0
	}), (0, u.useEffect)(() => {
		p.current && n && p.current.innerHTML !== a && (p.current.innerHTML = a);
	}, [a, n]), (0, u.useEffect)(() => {
		if (n && p.current) {
			let e = p.current;
			document.activeElement !== e && e.focus();
		}
	}, [n]), /* @__PURE__ */ (0, L.jsx)("div", {
		"data-layer-id": e.id,
		onMouseDown: (e) => {
			n && e.stopPropagation();
		},
		onClick: (t) => {
			if (!n) {
				t.stopPropagation();
				let n = window.getSelection();
				if (n && n.toString().length > 0) return;
				i(e.id);
			}
		},
		className: "relative w-full mb-0 min-h-[1.5em]",
		style: {
			width: "100%",
			height: "auto",
			opacity: e.opacity === void 0 ? 1 : e.opacity,
			cursor: "text",
			...Ut(e) ? {
				fontFamily: e.fontFamily,
				fontSize: `${e.fontSize}px`,
				color: e.color,
				fontWeight: e.fontWeight || "normal",
				fontStyle: e.fontStyle || "normal",
				textDecoration: e.textDecoration || "none",
				lineHeight: e.lineHeight || "normal",
				letterSpacing: e.letterSpacing ? `${e.letterSpacing}px` : "normal",
				textAlign: e.alignment,
				boxSizing: "border-box",
				padding: "0",
				whiteSpace: "pre-wrap",
				display: "flex",
				flexDirection: "column",
				alignItems: e.alignment === "center" ? "center" : e.alignment === "right" ? "flex-end" : "flex-start"
			} : {}
		},
		children: Ut(e) ? /* @__PURE__ */ (0, L.jsxs)("div", {
			className: "flex w-full",
			children: [
				e.listType === "bullet" && /* @__PURE__ */ (0, L.jsx)("span", {
					className: "mr-2 flex-shrink-0 select-none",
					children: "•"
				}),
				e.listType === "number" && /* @__PURE__ */ (0, L.jsxs)("span", {
					className: "mr-2 flex-shrink-0 select-none",
					children: [f.filter((e) => Ut(e) && e.listType === "number").indexOf(e) + 1, "."]
				}),
				/* @__PURE__ */ (0, L.jsx)("div", {
					ref: p,
					contentEditable: n,
					suppressContentEditableWarning: !0,
					onInput: (e) => {
						let t = e.target;
						o(t.innerHTML);
					},
					onBlur: (t) => {
						t.relatedTarget?.closest(".border-b.border-border.bg-background") || i(e.id, p.current?.innerHTML);
					},
					onKeyDown: (t) => {
						t.key === "Enter" && t.ctrlKey ? i(e.id, p.current?.innerHTML) : t.key === "Escape" && i(e.id, e.text);
					},
					className: "w-full bg-transparent border-none focus:outline-none cursor-text min-h-[1.5em] outline-none",
					style: { textAlign: e.alignment },
					dangerouslySetInnerHTML: n ? void 0 : { __html: e.text || "\xA0" }
				}),
				r && !n && /* @__PURE__ */ (0, L.jsx)("span", {
					className: "text-blue-400/50 ml-0.5 select-none inline-block",
					children: "¶"
				})
			]
		}) : null
	});
}
function Ju({ layers: e, backgroundImage: t, selectedLayerId: n, onSelectLayer: r, onLayerDoubleClick: i, onCanvasDragOver: a, onCanvasDrop: o, width: s, height: c, zoomLevel: l, rotation: d, pageWidth: f = 210, pageHeight: p = 297, showFormattingSymbols: m = !1, onSplitLayer: h, onMergeLayers: g, editingLayerId: _, setEditingLayerId: v, editingText: y, setEditingText: b, editingSelectionStart: x, editingSelectionEnd: S, setEditingSelectionStart: C, setEditingSelectionEnd: w }) {
	let T = (0, u.useRef)(null), E = s && c ? `${s} / ${c}` : "210 / 297";
	return /* @__PURE__ */ (0, L.jsx)("div", {
		className: "relative rounded-lg border-2 border-border bg-white shadow-2xl overflow-hidden",
		style: {
			backgroundImage: t ? `url(${t})` : void 0,
			backgroundSize: "cover",
			backgroundPosition: "center",
			aspectRatio: E,
			width: s ? `${(s * 3.78).toFixed(2)}px` : "auto",
			height: s && c ? `${(c * 3.78).toFixed(2)}px` : "auto",
			maxWidth: "100%",
			transform: `scale(${l}) rotate(${d}deg)`,
			transformOrigin: "center",
			transition: "transform 0.2s ease"
		},
		onDragOver: a,
		onDrop: o,
		onClick: (t) => {
			let n = e.find(Ut);
			n && (r(n.id), v(n.id), b(n.text));
		},
		ref: T,
		children: /* @__PURE__ */ (0, L.jsx)("div", {
			className: "w-full h-full overflow-y-auto relative z-10 bg-white",
			children: /* @__PURE__ */ (0, L.jsx)("div", {
				className: "flex flex-col p-[20mm] gap-0 items-start w-full min-h-full document-container",
				children: e.map((t) => /* @__PURE__ */ (0, L.jsx)(qu, {
					layer: t,
					isSelected: n === t.id,
					isEditing: _ === t.id,
					showFormattingSymbols: m,
					onDoubleClick: (t, n) => {
						n === void 0 ? (v(t), b(e.find((e) => e.id === t)?.text || "")) : (i(t, n), v(null));
					},
					onSplit: h || (() => {}),
					onMerge: g || (() => {}),
					editingText: y,
					setEditingText: b,
					editingSelectionStart: x,
					editingSelectionEnd: S,
					setEditingSelectionStart: C,
					setEditingSelectionEnd: w,
					allLayers: e
				}, t.id))
			})
		})
	});
}
//#endregion
//#region node_modules/@radix-ui/react-dialog/node_modules/@radix-ui/primitive/dist/index.mjs
function Yu(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
	return function(r) {
		if (e?.(r), n === !1 || !r.defaultPrevented) return t?.(r);
	};
}
//#endregion
//#region node_modules/@radix-ui/react-dialog/node_modules/@radix-ui/react-compose-refs/dist/index.mjs
function Xu(e, t) {
	if (typeof e == "function") return e(t);
	e != null && (e.current = t);
}
function Zu(...e) {
	return (t) => {
		let n = !1, r = e.map((e) => {
			let r = Xu(e, t);
			return !n && typeof r == "function" && (n = !0), r;
		});
		if (n) return () => {
			for (let t = 0; t < r.length; t++) {
				let n = r[t];
				typeof n == "function" ? n() : Xu(e[t], null);
			}
		};
	};
}
function Qu(...e) {
	return u.useCallback(Zu(...e), e);
}
//#endregion
//#region node_modules/@radix-ui/react-dialog/node_modules/@radix-ui/react-context/dist/index.mjs
function $u(e, t) {
	let n = u.createContext(t), r = (e) => {
		let { children: t, ...r } = e, i = u.useMemo(() => r, Object.values(r));
		return /* @__PURE__ */ (0, L.jsx)(n.Provider, {
			value: i,
			children: t
		});
	};
	r.displayName = e + "Provider";
	function i(r) {
		let i = u.useContext(n);
		if (i) return i;
		if (t !== void 0) return t;
		throw Error(`\`${r}\` must be used within \`${e}\``);
	}
	return [r, i];
}
function ed(e, t = []) {
	let n = [];
	function r(t, r) {
		let i = u.createContext(r), a = n.length;
		n = [...n, r];
		let o = (t) => {
			let { scope: n, children: r, ...o } = t, s = n?.[e]?.[a] || i, c = u.useMemo(() => o, Object.values(o));
			return /* @__PURE__ */ (0, L.jsx)(s.Provider, {
				value: c,
				children: r
			});
		};
		o.displayName = t + "Provider";
		function s(n, o) {
			let s = o?.[e]?.[a] || i, c = u.useContext(s);
			if (c) return c;
			if (r !== void 0) return r;
			throw Error(`\`${n}\` must be used within \`${t}\``);
		}
		return [o, s];
	}
	let i = () => {
		let t = n.map((e) => u.createContext(e));
		return function(n) {
			let r = n?.[e] || t;
			return u.useMemo(() => ({ [`__scope${e}`]: {
				...n,
				[e]: r
			} }), [n, r]);
		};
	};
	return i.scopeName = e, [r, Z(i, ...t)];
}
function Z(...e) {
	let t = e[0];
	if (e.length === 1) return t;
	let n = () => {
		let n = e.map((e) => ({
			useScope: e(),
			scopeName: e.scopeName
		}));
		return function(e) {
			let r = n.reduce((t, { useScope: n, scopeName: r }) => {
				let i = n(e)[`__scope${r}`];
				return {
					...t,
					...i
				};
			}, {});
			return u.useMemo(() => ({ [`__scope${t.scopeName}`]: r }), [r]);
		};
	};
	return n.scopeName = t.scopeName, n;
}
//#endregion
//#region node_modules/@radix-ui/react-dialog/node_modules/@radix-ui/react-use-layout-effect/dist/index.mjs
var td = globalThis?.document ? u.useLayoutEffect : () => {}, nd = u.useId || (() => void 0), rd = 0;
function id(e) {
	let [t, n] = u.useState(nd());
	return td(() => {
		e || n((e) => e ?? String(rd++));
	}, [e]), e || (t ? `radix-${t}` : "");
}
//#endregion
//#region node_modules/@radix-ui/react-dialog/node_modules/@radix-ui/react-use-controllable-state/dist/index.mjs
var ad = u.useInsertionEffect || td;
function od({ prop: e, defaultProp: t, onChange: n = () => {}, caller: r }) {
	let [i, a, o] = sd({
		defaultProp: t,
		onChange: n
	}), s = e !== void 0, c = s ? e : i;
	{
		let t = u.useRef(e !== void 0);
		u.useEffect(() => {
			let e = t.current;
			e !== s && console.warn(`${r} is changing from ${e ? "controlled" : "uncontrolled"} to ${s ? "controlled" : "uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`), t.current = s;
		}, [s, r]);
	}
	return [c, u.useCallback((t) => {
		if (s) {
			let n = cd(t) ? t(e) : t;
			n !== e && o.current?.(n);
		} else a(t);
	}, [
		s,
		e,
		a,
		o
	])];
}
function sd({ defaultProp: e, onChange: t }) {
	let [n, r] = u.useState(e), i = u.useRef(n), a = u.useRef(t);
	return ad(() => {
		a.current = t;
	}, [t]), u.useEffect(() => {
		i.current !== n && (a.current?.(n), i.current = n);
	}, [n, i]), [
		n,
		r,
		a
	];
}
function cd(e) {
	return typeof e == "function";
}
//#endregion
//#region node_modules/@radix-ui/react-dialog/node_modules/@radix-ui/react-presence/dist/index.mjs
function ld(e, t) {
	return u.useReducer((e, n) => t[e][n] ?? e, e);
}
var ud = (e) => {
	let { present: t, children: n } = e, r = dd(t), i = typeof n == "function" ? n({ present: r.isPresent }) : u.Children.only(n), a = Qu(r.ref, pd(i));
	return typeof n == "function" || r.isPresent ? u.cloneElement(i, { ref: a }) : null;
};
ud.displayName = "Presence";
function dd(e) {
	let [t, n] = u.useState(), r = u.useRef(null), i = u.useRef(e), a = u.useRef("none"), [o, s] = ld(e ? "mounted" : "unmounted", {
		mounted: {
			UNMOUNT: "unmounted",
			ANIMATION_OUT: "unmountSuspended"
		},
		unmountSuspended: {
			MOUNT: "mounted",
			ANIMATION_END: "unmounted"
		},
		unmounted: { MOUNT: "mounted" }
	});
	return u.useEffect(() => {
		let e = fd(r.current);
		a.current = o === "mounted" ? e : "none";
	}, [o]), td(() => {
		let t = r.current, n = i.current;
		if (n !== e) {
			let r = a.current, o = fd(t);
			e ? s("MOUNT") : o === "none" || t?.display === "none" ? s("UNMOUNT") : s(n && r !== o ? "ANIMATION_OUT" : "UNMOUNT"), i.current = e;
		}
	}, [e, s]), td(() => {
		if (t) {
			let e, n = t.ownerDocument.defaultView ?? window, o = (a) => {
				let o = fd(r.current).includes(a.animationName);
				if (a.target === t && o && (s("ANIMATION_END"), !i.current)) {
					let r = t.style.animationFillMode;
					t.style.animationFillMode = "forwards", e = n.setTimeout(() => {
						t.style.animationFillMode === "forwards" && (t.style.animationFillMode = r);
					});
				}
			}, c = (e) => {
				e.target === t && (a.current = fd(r.current));
			};
			return t.addEventListener("animationstart", c), t.addEventListener("animationcancel", o), t.addEventListener("animationend", o), () => {
				n.clearTimeout(e), t.removeEventListener("animationstart", c), t.removeEventListener("animationcancel", o), t.removeEventListener("animationend", o);
			};
		} else s("ANIMATION_END");
	}, [t, s]), {
		isPresent: ["mounted", "unmountSuspended"].includes(o),
		ref: u.useCallback((e) => {
			r.current = e ? getComputedStyle(e) : null, n(e);
		}, [])
	};
}
function fd(e) {
	return e?.animationName || "none";
}
function pd(e) {
	let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
	return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
//#endregion
//#region node_modules/@radix-ui/react-dialog/node_modules/@radix-ui/react-slot/dist/index.mjs
/* @__NO_SIDE_EFFECTS__ */
function md(e) {
	let t = /* @__PURE__ */ Q(e), n = u.forwardRef((e, n) => {
		let { children: r, ...i } = e, a = u.Children.toArray(r), o = a.find(gd);
		if (o) {
			let e = o.props.children, r = a.map((t) => t === o ? u.Children.count(e) > 1 ? u.Children.only(null) : u.isValidElement(e) ? e.props.children : null : t);
			return /* @__PURE__ */ (0, L.jsx)(t, {
				...i,
				ref: n,
				children: u.isValidElement(e) ? u.cloneElement(e, void 0, r) : null
			});
		}
		return /* @__PURE__ */ (0, L.jsx)(t, {
			...i,
			ref: n,
			children: r
		});
	});
	return n.displayName = `${e}.Slot`, n;
}
/* @__NO_SIDE_EFFECTS__ */
function Q(e) {
	let t = u.forwardRef((e, t) => {
		let { children: n, ...r } = e;
		if (u.isValidElement(n)) {
			let e = vd(n), i = _d(r, n.props);
			return n.type !== u.Fragment && (i.ref = t ? Zu(t, e) : e), u.cloneElement(n, i);
		}
		return u.Children.count(n) > 1 ? u.Children.only(null) : null;
	});
	return t.displayName = `${e}.SlotClone`, t;
}
var hd = Symbol("radix.slottable");
function gd(e) {
	return u.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === hd;
}
function _d(e, t) {
	let n = { ...t };
	for (let r in t) {
		let i = e[r], a = t[r];
		/^on[A-Z]/.test(r) ? i && a ? n[r] = (...e) => {
			let t = a(...e);
			return i(...e), t;
		} : i && (n[r] = i) : r === "style" ? n[r] = {
			...i,
			...a
		} : r === "className" && (n[r] = [i, a].filter(Boolean).join(" "));
	}
	return {
		...e,
		...n
	};
}
function vd(e) {
	let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
	return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
//#endregion
//#region node_modules/@radix-ui/react-dialog/node_modules/@radix-ui/react-primitive/dist/index.mjs
var yd = [
	"a",
	"button",
	"div",
	"form",
	"h2",
	"h3",
	"img",
	"input",
	"label",
	"li",
	"nav",
	"ol",
	"p",
	"select",
	"span",
	"svg",
	"ul"
].reduce((e, t) => {
	let n = /* @__PURE__ */ md(`Primitive.${t}`), r = u.forwardRef((e, r) => {
		let { asChild: i, ...a } = e, o = i ? n : t;
		return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ (0, L.jsx)(o, {
			...a,
			ref: r
		});
	});
	return r.displayName = `Primitive.${t}`, {
		...e,
		[t]: r
	};
}, {}), bd = "Dialog", [xd, Sd] = ed(bd), [Cd, wd] = xd(bd), Td = (e) => {
	let { __scopeDialog: t, children: n, open: r, defaultOpen: i, onOpenChange: a, modal: o = !0 } = e, s = u.useRef(null), c = u.useRef(null), [l, d] = od({
		prop: r,
		defaultProp: i ?? !1,
		onChange: a,
		caller: bd
	});
	return /* @__PURE__ */ (0, L.jsx)(Cd, {
		scope: t,
		triggerRef: s,
		contentRef: c,
		contentId: id(),
		titleId: id(),
		descriptionId: id(),
		open: l,
		onOpenChange: d,
		onOpenToggle: u.useCallback(() => d((e) => !e), [d]),
		modal: o,
		children: n
	});
};
Td.displayName = bd;
var Ed = "DialogTrigger", Dd = u.forwardRef((e, t) => {
	let { __scopeDialog: n, ...r } = e, i = wd(Ed, n), a = Qu(t, i.triggerRef);
	return /* @__PURE__ */ (0, L.jsx)(yd.button, {
		type: "button",
		"aria-haspopup": "dialog",
		"aria-expanded": i.open,
		"aria-controls": i.contentId,
		"data-state": qd(i.open),
		...r,
		ref: a,
		onClick: Yu(e.onClick, i.onOpenToggle)
	});
});
Dd.displayName = Ed;
var Od = "DialogPortal", [kd, Ad] = xd(Od, { forceMount: void 0 }), jd = (e) => {
	let { __scopeDialog: t, forceMount: n, children: r, container: i } = e, a = wd(Od, t);
	return /* @__PURE__ */ (0, L.jsx)(kd, {
		scope: t,
		forceMount: n,
		children: u.Children.map(r, (e) => /* @__PURE__ */ (0, L.jsx)(ud, {
			present: n || a.open,
			children: /* @__PURE__ */ (0, L.jsx)(Uo, {
				asChild: !0,
				container: i,
				children: e
			})
		}))
	});
};
jd.displayName = Od;
var Md = "DialogOverlay", Nd = u.forwardRef((e, t) => {
	let n = Ad(Md, e.__scopeDialog), { forceMount: r = n.forceMount, ...i } = e, a = wd(Md, e.__scopeDialog);
	return a.modal ? /* @__PURE__ */ (0, L.jsx)(ud, {
		present: r || a.open,
		children: /* @__PURE__ */ (0, L.jsx)(Fd, {
			...i,
			ref: t
		})
	}) : null;
});
Nd.displayName = Md;
var Pd = /* @__PURE__ */ md("DialogOverlay.RemoveScroll"), Fd = u.forwardRef((e, t) => {
	let { __scopeDialog: n, ...r } = e, i = wd(Md, n);
	return /* @__PURE__ */ (0, L.jsx)(Ec, {
		as: Pd,
		allowPinchZoom: !0,
		shards: [i.contentRef],
		children: /* @__PURE__ */ (0, L.jsx)(yd.div, {
			"data-state": qd(i.open),
			...r,
			ref: t,
			style: {
				pointerEvents: "auto",
				...r.style
			}
		})
	});
}), Id = "DialogContent", Ld = u.forwardRef((e, t) => {
	let n = Ad(Id, e.__scopeDialog), { forceMount: r = n.forceMount, ...i } = e, a = wd(Id, e.__scopeDialog);
	return /* @__PURE__ */ (0, L.jsx)(ud, {
		present: r || a.open,
		children: a.modal ? /* @__PURE__ */ (0, L.jsx)(Rd, {
			...i,
			ref: t
		}) : /* @__PURE__ */ (0, L.jsx)(zd, {
			...i,
			ref: t
		})
	});
});
Ld.displayName = Id;
var Rd = u.forwardRef((e, t) => {
	let n = wd(Id, e.__scopeDialog), r = u.useRef(null), i = Qu(t, n.contentRef, r);
	return u.useEffect(() => {
		let e = r.current;
		if (e) return _s(e);
	}, []), /* @__PURE__ */ (0, L.jsx)(Bd, {
		...e,
		ref: i,
		trapFocus: n.open,
		disableOutsidePointerEvents: !0,
		onCloseAutoFocus: Yu(e.onCloseAutoFocus, (e) => {
			e.preventDefault(), n.triggerRef.current?.focus();
		}),
		onPointerDownOutside: Yu(e.onPointerDownOutside, (e) => {
			let t = e.detail.originalEvent, n = t.button === 0 && t.ctrlKey === !0;
			(t.button === 2 || n) && e.preventDefault();
		}),
		onFocusOutside: Yu(e.onFocusOutside, (e) => e.preventDefault())
	});
}), zd = u.forwardRef((e, t) => {
	let n = wd(Id, e.__scopeDialog), r = u.useRef(!1), i = u.useRef(!1);
	return /* @__PURE__ */ (0, L.jsx)(Bd, {
		...e,
		ref: t,
		trapFocus: !1,
		disableOutsidePointerEvents: !1,
		onCloseAutoFocus: (t) => {
			e.onCloseAutoFocus?.(t), t.defaultPrevented || (r.current || n.triggerRef.current?.focus(), t.preventDefault()), r.current = !1, i.current = !1;
		},
		onInteractOutside: (t) => {
			e.onInteractOutside?.(t), t.defaultPrevented || (r.current = !0, t.detail.originalEvent.type === "pointerdown" && (i.current = !0));
			let a = t.target;
			n.triggerRef.current?.contains(a) && t.preventDefault(), t.detail.originalEvent.type === "focusin" && i.current && t.preventDefault();
		}
	});
}), Bd = u.forwardRef((e, t) => {
	let { __scopeDialog: n, trapFocus: r, onOpenAutoFocus: i, onCloseAutoFocus: a, ...o } = e, s = wd(Id, n), c = u.useRef(null), l = Qu(t, c);
	return rr(), /* @__PURE__ */ (0, L.jsxs)(L.Fragment, { children: [/* @__PURE__ */ (0, L.jsx)(br, {
		asChild: !0,
		loop: !0,
		trapped: r,
		onMountAutoFocus: i,
		onUnmountAutoFocus: a,
		children: /* @__PURE__ */ (0, L.jsx)(Yn, {
			role: "dialog",
			id: s.contentId,
			"aria-describedby": s.descriptionId,
			"aria-labelledby": s.titleId,
			"data-state": qd(s.open),
			...o,
			ref: l,
			onDismiss: () => s.onOpenChange(!1)
		})
	}), /* @__PURE__ */ (0, L.jsxs)(L.Fragment, { children: [/* @__PURE__ */ (0, L.jsx)(Zd, { titleId: s.titleId }), /* @__PURE__ */ (0, L.jsx)($d, {
		contentRef: c,
		descriptionId: s.descriptionId
	})] })] });
}), Vd = "DialogTitle", Hd = u.forwardRef((e, t) => {
	let { __scopeDialog: n, ...r } = e, i = wd(Vd, n);
	return /* @__PURE__ */ (0, L.jsx)(yd.h2, {
		id: i.titleId,
		...r,
		ref: t
	});
});
Hd.displayName = Vd;
var Ud = "DialogDescription", Wd = u.forwardRef((e, t) => {
	let { __scopeDialog: n, ...r } = e, i = wd(Ud, n);
	return /* @__PURE__ */ (0, L.jsx)(yd.p, {
		id: i.descriptionId,
		...r,
		ref: t
	});
});
Wd.displayName = Ud;
var Gd = "DialogClose", Kd = u.forwardRef((e, t) => {
	let { __scopeDialog: n, ...r } = e, i = wd(Gd, n);
	return /* @__PURE__ */ (0, L.jsx)(yd.button, {
		type: "button",
		...r,
		ref: t,
		onClick: Yu(e.onClick, () => i.onOpenChange(!1))
	});
});
Kd.displayName = Gd;
function qd(e) {
	return e ? "open" : "closed";
}
var Jd = "DialogTitleWarning", [Yd, Xd] = $u(Jd, {
	contentName: Id,
	titleName: Vd,
	docsSlug: "dialog"
}), Zd = ({ titleId: e }) => {
	let t = Xd(Jd), n = `\`${t.contentName}\` requires a \`${t.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${t.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${t.docsSlug}`;
	return u.useEffect(() => {
		e && (document.getElementById(e) || console.error(n));
	}, [n, e]), null;
}, Qd = "DialogDescriptionWarning", $d = ({ contentRef: e, descriptionId: t }) => {
	let n = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${Xd(Qd).contentName}}.`;
	return u.useEffect(() => {
		let r = e.current?.getAttribute("aria-describedby");
		t && r && (document.getElementById(t) || console.warn(n));
	}, [
		n,
		e,
		t
	]), null;
}, ef = Td, tf = jd, nf = Nd, rf = Ld, af = Hd, of = Kd;
//#endregion
//#region components/ui/dialog.tsx
function sf({ ...e }) {
	return /* @__PURE__ */ (0, L.jsx)(ef, {
		"data-slot": "dialog",
		...e
	});
}
function cf({ ...e }) {
	return /* @__PURE__ */ (0, L.jsx)(tf, {
		"data-slot": "dialog-portal",
		...e
	});
}
function lf({ className: e, ...t }) {
	return /* @__PURE__ */ (0, L.jsx)(nf, {
		"data-slot": "dialog-overlay",
		className: H("data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50", e),
		...t
	});
}
function uf({ className: e, children: t, showCloseButton: n = !0, ...r }) {
	return /* @__PURE__ */ (0, L.jsxs)(cf, {
		"data-slot": "dialog-portal",
		children: [/* @__PURE__ */ (0, L.jsx)(lf, {}), /* @__PURE__ */ (0, L.jsxs)(rf, {
			"data-slot": "dialog-content",
			className: H("bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg", e),
			...r,
			children: [t, n && /* @__PURE__ */ (0, L.jsxs)(of, {
				"data-slot": "dialog-close",
				className: "ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
				children: [/* @__PURE__ */ (0, L.jsx)(Mu, {}), /* @__PURE__ */ (0, L.jsx)("span", {
					className: "sr-only",
					children: "Close"
				})]
			})]
		})]
	});
}
function df({ className: e, ...t }) {
	return /* @__PURE__ */ (0, L.jsx)("div", {
		"data-slot": "dialog-header",
		className: H("flex flex-col gap-2 text-center sm:text-left", e),
		...t
	});
}
function ff({ className: e, ...t }) {
	return /* @__PURE__ */ (0, L.jsx)("div", {
		"data-slot": "dialog-footer",
		className: H("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", e),
		...t
	});
}
function pf({ className: e, ...t }) {
	return /* @__PURE__ */ (0, L.jsx)(af, {
		"data-slot": "dialog-title",
		className: H("text-lg leading-none font-semibold", e),
		...t
	});
}
//#endregion
//#region app/(protected)/certificates/create/components/PageSizeModal.tsx
var mf = [
	{
		id: "A4",
		width: 210,
		height: 297
	},
	{
		id: "A3",
		width: 297,
		height: 420
	},
	{
		id: "A5",
		width: 148,
		height: 210
	},
	{
		id: "letter",
		width: 216,
		height: 279
	},
	{
		id: "legal",
		width: 216,
		height: 356
	},
	{
		id: "tabloid",
		width: 279,
		height: 432
	}
];
function hf({ open: e, onOpenChange: t, onSave: n, initialSettings: r }) {
	let [i, a] = (0, u.useState)(r?.format || "A4"), [o, s] = (0, u.useState)(r?.width || 210), [c, l] = (0, u.useState)(r?.height || 297), [d, f] = (0, u.useState)(r?.orientation || "portrait"), [p, m] = (0, u.useState)(!1);
	(0, u.useEffect)(() => {
		if (!p) {
			let e = mf.find((e) => e.id === i);
			e && (d === "portrait" ? (s(e.width), l(e.height)) : (s(e.height), l(e.width)));
		}
	}, [
		i,
		d,
		p
	]);
	let h = () => {
		n({
			format: i,
			width: o,
			height: c,
			orientation: d
		}), t(!1);
	}, g = (e) => {
		f(e), s(c), l(o);
	};
	return /* @__PURE__ */ (0, L.jsx)(sf, {
		open: e,
		onOpenChange: t,
		children: /* @__PURE__ */ (0, L.jsxs)(uf, {
			className: "sm:max-w-md",
			children: [
				/* @__PURE__ */ (0, L.jsx)(df, { children: /* @__PURE__ */ (0, L.jsx)(pf, { children: "Изменить размер страницы" }) }),
				/* @__PURE__ */ (0, L.jsx)("div", {
					className: "grid gap-4 py-4",
					children: /* @__PURE__ */ (0, L.jsxs)("div", {
						className: "grid grid-cols-4 items-center gap-4",
						children: [/* @__PURE__ */ (0, L.jsx)(dn, {
							htmlFor: "format",
							className: "text-right",
							children: "Формат"
						}), /* @__PURE__ */ (0, L.jsxs)(Nu, {
							value: i,
							onValueChange: (e) => {
								a(e), m(!1);
							},
							children: [/* @__PURE__ */ (0, L.jsx)(Fu, {
								className: "col-span-3",
								children: /* @__PURE__ */ (0, L.jsx)(Pu, { placeholder: "Выберите формат" })
							}), /* @__PURE__ */ (0, L.jsx)(Iu, { children: mf.map((e) => /* @__PURE__ */ (0, L.jsxs)(Lu, {
								value: e.id,
								children: ["Лист ", e.id]
							}, e.id)) })]
						})]
					})
				}),
				/* @__PURE__ */ (0, L.jsxs)("div", {
					className: "grid grid-cols-4 items-center gap-4",
					children: [/* @__PURE__ */ (0, L.jsx)(dn, {
						className: "text-right",
						children: "Ширина"
					}), /* @__PURE__ */ (0, L.jsxs)("div", {
						className: "col-span-3 flex items-center gap-2",
						children: [/* @__PURE__ */ (0, L.jsx)(Zt, {
							id: "width",
							type: "number",
							value: o,
							onChange: (e) => {
								s(Number(e.target.value)), m(!0);
							},
							className: "w-full"
						}), /* @__PURE__ */ (0, L.jsx)("span", {
							className: "text-sm text-muted-foreground",
							children: "мм"
						})]
					})]
				}),
				/* @__PURE__ */ (0, L.jsxs)("div", {
					className: "grid grid-cols-4 items-center gap-4",
					children: [/* @__PURE__ */ (0, L.jsx)(dn, {
						className: "text-right",
						children: "Высота"
					}), /* @__PURE__ */ (0, L.jsxs)("div", {
						className: "col-span-3 flex items-center gap-2",
						children: [/* @__PURE__ */ (0, L.jsx)(Zt, {
							id: "height",
							type: "number",
							value: c,
							onChange: (e) => {
								l(Number(e.target.value)), m(!0);
							},
							className: "w-full"
						}), /* @__PURE__ */ (0, L.jsx)("span", {
							className: "text-sm text-muted-foreground",
							children: "мм"
						})]
					})]
				}),
				/* @__PURE__ */ (0, L.jsxs)("div", {
					className: "grid grid-cols-4 items-center gap-4",
					children: [/* @__PURE__ */ (0, L.jsx)(dn, {
						className: "text-right",
						children: "Ориентация"
					}), /* @__PURE__ */ (0, L.jsxs)("div", {
						className: "col-span-3 flex gap-4",
						children: [/* @__PURE__ */ (0, L.jsxs)("div", {
							className: "flex items-center space-x-2",
							children: [/* @__PURE__ */ (0, L.jsx)("input", {
								type: "radio",
								id: "portrait",
								name: "orientation",
								checked: d === "portrait",
								onChange: () => {
									g("portrait");
								},
								className: "h-4 w-4"
							}), /* @__PURE__ */ (0, L.jsx)(dn, {
								htmlFor: "portrait",
								children: "Портретная"
							})]
						}), /* @__PURE__ */ (0, L.jsxs)("div", {
							className: "flex items-center space-x-2",
							children: [/* @__PURE__ */ (0, L.jsx)("input", {
								type: "radio",
								id: "landscape",
								name: "orientation",
								checked: d === "landscape",
								onChange: () => {
									g("landscape");
								},
								className: "h-4 w-4"
							}), /* @__PURE__ */ (0, L.jsx)(dn, {
								htmlFor: "landscape",
								children: "Альбомная"
							})]
						})]
					})]
				}),
				/* @__PURE__ */ (0, L.jsx)(ff, { children: /* @__PURE__ */ (0, L.jsx)(U, {
					type: "button",
					onClick: h,
					children: "Сохранить"
				}) })
			]
		})
	});
}
//#endregion
//#region components/ui/badge.tsx
var gf = Se("inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden", {
	variants: { variant: {
		default: "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
		secondary: "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
		destructive: "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
		outline: "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground"
	} },
	defaultVariants: { variant: "default" }
});
function _f({ className: e, variant: t, asChild: n = !1, ...r }) {
	return /* @__PURE__ */ (0, L.jsx)(n ? fe : "span", {
		"data-slot": "badge",
		className: H(gf({ variant: t }), e),
		...r
	});
}
//#endregion
//#region node_modules/@radix-ui/react-scroll-area/node_modules/@radix-ui/react-compose-refs/dist/index.mjs
function vf(e, t) {
	if (typeof e == "function") return e(t);
	e != null && (e.current = t);
}
function yf(...e) {
	return (t) => {
		let n = !1, r = e.map((e) => {
			let r = vf(e, t);
			return !n && typeof r == "function" && (n = !0), r;
		});
		if (n) return () => {
			for (let t = 0; t < r.length; t++) {
				let n = r[t];
				typeof n == "function" ? n() : vf(e[t], null);
			}
		};
	};
}
function bf(...e) {
	return u.useCallback(yf(...e), e);
}
//#endregion
//#region node_modules/@radix-ui/react-scroll-area/node_modules/@radix-ui/react-slot/dist/index.mjs
/* @__NO_SIDE_EFFECTS__ */
function xf(e) {
	let t = /* @__PURE__ */ Sf(e), n = u.forwardRef((e, n) => {
		let { children: r, ...i } = e, a = u.Children.toArray(r), o = a.find(wf);
		if (o) {
			let e = o.props.children, r = a.map((t) => t === o ? u.Children.count(e) > 1 ? u.Children.only(null) : u.isValidElement(e) ? e.props.children : null : t);
			return /* @__PURE__ */ (0, L.jsx)(t, {
				...i,
				ref: n,
				children: u.isValidElement(e) ? u.cloneElement(e, void 0, r) : null
			});
		}
		return /* @__PURE__ */ (0, L.jsx)(t, {
			...i,
			ref: n,
			children: r
		});
	});
	return n.displayName = `${e}.Slot`, n;
}
/* @__NO_SIDE_EFFECTS__ */
function Sf(e) {
	let t = u.forwardRef((e, t) => {
		let { children: n, ...r } = e;
		if (u.isValidElement(n)) {
			let e = Ef(n), i = Tf(r, n.props);
			return n.type !== u.Fragment && (i.ref = t ? yf(t, e) : e), u.cloneElement(n, i);
		}
		return u.Children.count(n) > 1 ? u.Children.only(null) : null;
	});
	return t.displayName = `${e}.SlotClone`, t;
}
var Cf = Symbol("radix.slottable");
function wf(e) {
	return u.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === Cf;
}
function Tf(e, t) {
	let n = { ...t };
	for (let r in t) {
		let i = e[r], a = t[r];
		/^on[A-Z]/.test(r) ? i && a ? n[r] = (...e) => {
			let t = a(...e);
			return i(...e), t;
		} : i && (n[r] = i) : r === "style" ? n[r] = {
			...i,
			...a
		} : r === "className" && (n[r] = [i, a].filter(Boolean).join(" "));
	}
	return {
		...e,
		...n
	};
}
function Ef(e) {
	let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
	return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
//#endregion
//#region node_modules/@radix-ui/react-scroll-area/node_modules/@radix-ui/react-primitive/dist/index.mjs
var Df = [
	"a",
	"button",
	"div",
	"form",
	"h2",
	"h3",
	"img",
	"input",
	"label",
	"li",
	"nav",
	"ol",
	"p",
	"select",
	"span",
	"svg",
	"ul"
].reduce((e, t) => {
	let n = /* @__PURE__ */ xf(`Primitive.${t}`), r = u.forwardRef((e, r) => {
		let { asChild: i, ...a } = e, o = i ? n : t;
		return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ (0, L.jsx)(o, {
			...a,
			ref: r
		});
	});
	return r.displayName = `Primitive.${t}`, {
		...e,
		[t]: r
	};
}, {}), Of = globalThis?.document ? u.useLayoutEffect : () => {};
//#endregion
//#region node_modules/@radix-ui/react-scroll-area/node_modules/@radix-ui/react-presence/dist/index.mjs
function kf(e, t) {
	return u.useReducer((e, n) => t[e][n] ?? e, e);
}
var Af = (e) => {
	let { present: t, children: n } = e, r = jf(t), i = typeof n == "function" ? n({ present: r.isPresent }) : u.Children.only(n), a = bf(r.ref, Nf(i));
	return typeof n == "function" || r.isPresent ? u.cloneElement(i, { ref: a }) : null;
};
Af.displayName = "Presence";
function jf(e) {
	let [t, n] = u.useState(), r = u.useRef(null), i = u.useRef(e), a = u.useRef("none"), [o, s] = kf(e ? "mounted" : "unmounted", {
		mounted: {
			UNMOUNT: "unmounted",
			ANIMATION_OUT: "unmountSuspended"
		},
		unmountSuspended: {
			MOUNT: "mounted",
			ANIMATION_END: "unmounted"
		},
		unmounted: { MOUNT: "mounted" }
	});
	return u.useEffect(() => {
		let e = Mf(r.current);
		a.current = o === "mounted" ? e : "none";
	}, [o]), Of(() => {
		let t = r.current, n = i.current;
		if (n !== e) {
			let r = a.current, o = Mf(t);
			e ? s("MOUNT") : o === "none" || t?.display === "none" ? s("UNMOUNT") : s(n && r !== o ? "ANIMATION_OUT" : "UNMOUNT"), i.current = e;
		}
	}, [e, s]), Of(() => {
		if (t) {
			let e, n = t.ownerDocument.defaultView ?? window, o = (a) => {
				let o = Mf(r.current).includes(CSS.escape(a.animationName));
				if (a.target === t && o && (s("ANIMATION_END"), !i.current)) {
					let r = t.style.animationFillMode;
					t.style.animationFillMode = "forwards", e = n.setTimeout(() => {
						t.style.animationFillMode === "forwards" && (t.style.animationFillMode = r);
					});
				}
			}, c = (e) => {
				e.target === t && (a.current = Mf(r.current));
			};
			return t.addEventListener("animationstart", c), t.addEventListener("animationcancel", o), t.addEventListener("animationend", o), () => {
				n.clearTimeout(e), t.removeEventListener("animationstart", c), t.removeEventListener("animationcancel", o), t.removeEventListener("animationend", o);
			};
		} else s("ANIMATION_END");
	}, [t, s]), {
		isPresent: ["mounted", "unmountSuspended"].includes(o),
		ref: u.useCallback((e) => {
			r.current = e ? getComputedStyle(e) : null, n(e);
		}, [])
	};
}
function Mf(e) {
	return e?.animationName || "none";
}
function Nf(e) {
	let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
	return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
//#endregion
//#region node_modules/@radix-ui/react-scroll-area/node_modules/@radix-ui/react-context/dist/index.mjs
function Pf(e, t = []) {
	let n = [];
	function r(t, r) {
		let i = u.createContext(r), a = n.length;
		n = [...n, r];
		let o = (t) => {
			let { scope: n, children: r, ...o } = t, s = n?.[e]?.[a] || i, c = u.useMemo(() => o, Object.values(o));
			return /* @__PURE__ */ (0, L.jsx)(s.Provider, {
				value: c,
				children: r
			});
		};
		o.displayName = t + "Provider";
		function s(n, o) {
			let s = o?.[e]?.[a] || i, c = u.useContext(s);
			if (c) return c;
			if (r !== void 0) return r;
			throw Error(`\`${n}\` must be used within \`${t}\``);
		}
		return [o, s];
	}
	let i = () => {
		let t = n.map((e) => u.createContext(e));
		return function(n) {
			let r = n?.[e] || t;
			return u.useMemo(() => ({ [`__scope${e}`]: {
				...n,
				[e]: r
			} }), [n, r]);
		};
	};
	return i.scopeName = e, [r, Ff(i, ...t)];
}
function Ff(...e) {
	let t = e[0];
	if (e.length === 1) return t;
	let n = () => {
		let n = e.map((e) => ({
			useScope: e(),
			scopeName: e.scopeName
		}));
		return function(e) {
			let r = n.reduce((t, { useScope: n, scopeName: r }) => {
				let i = n(e)[`__scope${r}`];
				return {
					...t,
					...i
				};
			}, {});
			return u.useMemo(() => ({ [`__scope${t.scopeName}`]: r }), [r]);
		};
	};
	return n.scopeName = t.scopeName, n;
}
//#endregion
//#region node_modules/@radix-ui/react-scroll-area/node_modules/@radix-ui/react-use-callback-ref/dist/index.mjs
function If(e) {
	let t = u.useRef(e);
	return u.useEffect(() => {
		t.current = e;
	}), u.useMemo(() => (...e) => t.current?.(...e), []);
}
//#endregion
//#region node_modules/@radix-ui/react-scroll-area/node_modules/@radix-ui/react-direction/dist/index.mjs
var Lf = u.createContext(void 0);
function Rf(e) {
	let t = u.useContext(Lf);
	return e || t || "ltr";
}
typeof window < "u" && window.document && window.document.createElement;
function zf(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
	return function(r) {
		if (e?.(r), n === !1 || !r.defaultPrevented) return t?.(r);
	};
}
//#endregion
//#region node_modules/@radix-ui/react-scroll-area/dist/index.mjs
function Bf(e, t) {
	return u.useReducer((e, n) => t[e][n] ?? e, e);
}
var Vf = "ScrollArea", [Hf, Uf] = Pf(Vf), [Wf, Gf] = Hf(Vf), Kf = u.forwardRef((e, t) => {
	let { __scopeScrollArea: n, type: r = "hover", dir: i, scrollHideDelay: a = 600, ...o } = e, [s, c] = u.useState(null), [l, d] = u.useState(null), [f, p] = u.useState(null), [m, h] = u.useState(null), [g, _] = u.useState(null), [v, y] = u.useState(0), [b, x] = u.useState(0), [S, C] = u.useState(!1), [w, T] = u.useState(!1), E = bf(t, (e) => c(e)), D = Rf(i);
	return /* @__PURE__ */ (0, L.jsx)(Wf, {
		scope: n,
		type: r,
		dir: D,
		scrollHideDelay: a,
		scrollArea: s,
		viewport: l,
		onViewportChange: d,
		content: f,
		onContentChange: p,
		scrollbarX: m,
		onScrollbarXChange: h,
		scrollbarXEnabled: S,
		onScrollbarXEnabledChange: C,
		scrollbarY: g,
		onScrollbarYChange: _,
		scrollbarYEnabled: w,
		onScrollbarYEnabledChange: T,
		onCornerWidthChange: y,
		onCornerHeightChange: x,
		children: /* @__PURE__ */ (0, L.jsx)(Df.div, {
			dir: D,
			...o,
			ref: E,
			style: {
				position: "relative",
				"--radix-scroll-area-corner-width": v + "px",
				"--radix-scroll-area-corner-height": b + "px",
				...e.style
			}
		})
	});
});
Kf.displayName = Vf;
var qf = "ScrollAreaViewport", Jf = u.forwardRef((e, t) => {
	let { __scopeScrollArea: n, children: r, nonce: i, ...a } = e, o = Gf(qf, n), s = bf(t, u.useRef(null), o.onViewportChange);
	return /* @__PURE__ */ (0, L.jsxs)(L.Fragment, { children: [/* @__PURE__ */ (0, L.jsx)("style", {
		dangerouslySetInnerHTML: { __html: "[data-radix-scroll-area-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-scroll-area-viewport]::-webkit-scrollbar{display:none}" },
		nonce: i
	}), /* @__PURE__ */ (0, L.jsx)(Df.div, {
		"data-radix-scroll-area-viewport": "",
		...a,
		ref: s,
		style: {
			overflowX: o.scrollbarXEnabled ? "scroll" : "hidden",
			overflowY: o.scrollbarYEnabled ? "scroll" : "hidden",
			...e.style
		},
		children: /* @__PURE__ */ (0, L.jsx)("div", {
			ref: o.onContentChange,
			style: {
				minWidth: "100%",
				display: "table"
			},
			children: r
		})
	})] });
});
Jf.displayName = qf;
var Yf = "ScrollAreaScrollbar", Xf = u.forwardRef((e, t) => {
	let { forceMount: n, ...r } = e, i = Gf(Yf, e.__scopeScrollArea), { onScrollbarXEnabledChange: a, onScrollbarYEnabledChange: o } = i, s = e.orientation === "horizontal";
	return u.useEffect(() => (s ? a(!0) : o(!0), () => {
		s ? a(!1) : o(!1);
	}), [
		s,
		a,
		o
	]), i.type === "hover" ? /* @__PURE__ */ (0, L.jsx)(Zf, {
		...r,
		ref: t,
		forceMount: n
	}) : i.type === "scroll" ? /* @__PURE__ */ (0, L.jsx)(Qf, {
		...r,
		ref: t,
		forceMount: n
	}) : i.type === "auto" ? /* @__PURE__ */ (0, L.jsx)($f, {
		...r,
		ref: t,
		forceMount: n
	}) : i.type === "always" ? /* @__PURE__ */ (0, L.jsx)(ep, {
		...r,
		ref: t
	}) : null;
});
Xf.displayName = Yf;
var Zf = u.forwardRef((e, t) => {
	let { forceMount: n, ...r } = e, i = Gf(Yf, e.__scopeScrollArea), [a, o] = u.useState(!1);
	return u.useEffect(() => {
		let e = i.scrollArea, t = 0;
		if (e) {
			let n = () => {
				window.clearTimeout(t), o(!0);
			}, r = () => {
				t = window.setTimeout(() => o(!1), i.scrollHideDelay);
			};
			return e.addEventListener("pointerenter", n), e.addEventListener("pointerleave", r), () => {
				window.clearTimeout(t), e.removeEventListener("pointerenter", n), e.removeEventListener("pointerleave", r);
			};
		}
	}, [i.scrollArea, i.scrollHideDelay]), /* @__PURE__ */ (0, L.jsx)(Af, {
		present: n || a,
		children: /* @__PURE__ */ (0, L.jsx)($f, {
			"data-state": a ? "visible" : "hidden",
			...r,
			ref: t
		})
	});
}), Qf = u.forwardRef((e, t) => {
	let { forceMount: n, ...r } = e, i = Gf(Yf, e.__scopeScrollArea), a = e.orientation === "horizontal", o = bp(() => c("SCROLL_END"), 100), [s, c] = Bf("hidden", {
		hidden: { SCROLL: "scrolling" },
		scrolling: {
			SCROLL_END: "idle",
			POINTER_ENTER: "interacting"
		},
		interacting: {
			SCROLL: "interacting",
			POINTER_LEAVE: "idle"
		},
		idle: {
			HIDE: "hidden",
			SCROLL: "scrolling",
			POINTER_ENTER: "interacting"
		}
	});
	return u.useEffect(() => {
		if (s === "idle") {
			let e = window.setTimeout(() => c("HIDE"), i.scrollHideDelay);
			return () => window.clearTimeout(e);
		}
	}, [
		s,
		i.scrollHideDelay,
		c
	]), u.useEffect(() => {
		let e = i.viewport, t = a ? "scrollLeft" : "scrollTop";
		if (e) {
			let n = e[t], r = () => {
				let r = e[t];
				n !== r && (c("SCROLL"), o()), n = r;
			};
			return e.addEventListener("scroll", r), () => e.removeEventListener("scroll", r);
		}
	}, [
		i.viewport,
		a,
		c,
		o
	]), /* @__PURE__ */ (0, L.jsx)(Af, {
		present: n || s !== "hidden",
		children: /* @__PURE__ */ (0, L.jsx)(ep, {
			"data-state": s === "hidden" ? "hidden" : "visible",
			...r,
			ref: t,
			onPointerEnter: zf(e.onPointerEnter, () => c("POINTER_ENTER")),
			onPointerLeave: zf(e.onPointerLeave, () => c("POINTER_LEAVE"))
		})
	});
}), $f = u.forwardRef((e, t) => {
	let n = Gf(Yf, e.__scopeScrollArea), { forceMount: r, ...i } = e, [a, o] = u.useState(!1), s = e.orientation === "horizontal", c = bp(() => {
		if (n.viewport) {
			let e = n.viewport.offsetWidth < n.viewport.scrollWidth, t = n.viewport.offsetHeight < n.viewport.scrollHeight;
			o(s ? e : t);
		}
	}, 10);
	return xp(n.viewport, c), xp(n.content, c), /* @__PURE__ */ (0, L.jsx)(Af, {
		present: r || a,
		children: /* @__PURE__ */ (0, L.jsx)(ep, {
			"data-state": a ? "visible" : "hidden",
			...i,
			ref: t
		})
	});
}), ep = u.forwardRef((e, t) => {
	let { orientation: n = "vertical", ...r } = e, i = Gf(Yf, e.__scopeScrollArea), a = u.useRef(null), o = u.useRef(0), [s, c] = u.useState({
		content: 0,
		viewport: 0,
		scrollbar: {
			size: 0,
			paddingStart: 0,
			paddingEnd: 0
		}
	}), l = pp(s.viewport, s.content), d = {
		...r,
		sizes: s,
		onSizesChange: c,
		hasThumb: l > 0 && l < 1,
		onThumbChange: (e) => a.current = e,
		onThumbPointerUp: () => o.current = 0,
		onThumbPointerDown: (e) => o.current = e
	};
	function f(e, t) {
		return hp(e, o.current, s, t);
	}
	return n === "horizontal" ? /* @__PURE__ */ (0, L.jsx)(tp, {
		...d,
		ref: t,
		onThumbPositionChange: () => {
			if (i.viewport && a.current) {
				let e = i.viewport.scrollLeft, t = gp(e, s, i.dir);
				a.current.style.transform = `translate3d(${t}px, 0, 0)`;
			}
		},
		onWheelScroll: (e) => {
			i.viewport && (i.viewport.scrollLeft = e);
		},
		onDragScroll: (e) => {
			i.viewport && (i.viewport.scrollLeft = f(e, i.dir));
		}
	}) : n === "vertical" ? /* @__PURE__ */ (0, L.jsx)(np, {
		...d,
		ref: t,
		onThumbPositionChange: () => {
			if (i.viewport && a.current) {
				let e = i.viewport.scrollTop, t = gp(e, s);
				a.current.style.transform = `translate3d(0, ${t}px, 0)`;
			}
		},
		onWheelScroll: (e) => {
			i.viewport && (i.viewport.scrollTop = e);
		},
		onDragScroll: (e) => {
			i.viewport && (i.viewport.scrollTop = f(e));
		}
	}) : null;
}), tp = u.forwardRef((e, t) => {
	let { sizes: n, onSizesChange: r, ...i } = e, a = Gf(Yf, e.__scopeScrollArea), [o, s] = u.useState(), c = u.useRef(null), l = bf(t, c, a.onScrollbarXChange);
	return u.useEffect(() => {
		c.current && s(getComputedStyle(c.current));
	}, [c]), /* @__PURE__ */ (0, L.jsx)(ap, {
		"data-orientation": "horizontal",
		...i,
		ref: l,
		sizes: n,
		style: {
			bottom: 0,
			left: a.dir === "rtl" ? "var(--radix-scroll-area-corner-width)" : 0,
			right: a.dir === "ltr" ? "var(--radix-scroll-area-corner-width)" : 0,
			"--radix-scroll-area-thumb-width": mp(n) + "px",
			...e.style
		},
		onThumbPointerDown: (t) => e.onThumbPointerDown(t.x),
		onDragScroll: (t) => e.onDragScroll(t.x),
		onWheelScroll: (t, n) => {
			if (a.viewport) {
				let r = a.viewport.scrollLeft + t.deltaX;
				e.onWheelScroll(r), vp(r, n) && t.preventDefault();
			}
		},
		onResize: () => {
			c.current && a.viewport && o && r({
				content: a.viewport.scrollWidth,
				viewport: a.viewport.offsetWidth,
				scrollbar: {
					size: c.current.clientWidth,
					paddingStart: fp(o.paddingLeft),
					paddingEnd: fp(o.paddingRight)
				}
			});
		}
	});
}), np = u.forwardRef((e, t) => {
	let { sizes: n, onSizesChange: r, ...i } = e, a = Gf(Yf, e.__scopeScrollArea), [o, s] = u.useState(), c = u.useRef(null), l = bf(t, c, a.onScrollbarYChange);
	return u.useEffect(() => {
		c.current && s(getComputedStyle(c.current));
	}, [c]), /* @__PURE__ */ (0, L.jsx)(ap, {
		"data-orientation": "vertical",
		...i,
		ref: l,
		sizes: n,
		style: {
			top: 0,
			right: a.dir === "ltr" ? 0 : void 0,
			left: a.dir === "rtl" ? 0 : void 0,
			bottom: "var(--radix-scroll-area-corner-height)",
			"--radix-scroll-area-thumb-height": mp(n) + "px",
			...e.style
		},
		onThumbPointerDown: (t) => e.onThumbPointerDown(t.y),
		onDragScroll: (t) => e.onDragScroll(t.y),
		onWheelScroll: (t, n) => {
			if (a.viewport) {
				let r = a.viewport.scrollTop + t.deltaY;
				e.onWheelScroll(r), vp(r, n) && t.preventDefault();
			}
		},
		onResize: () => {
			c.current && a.viewport && o && r({
				content: a.viewport.scrollHeight,
				viewport: a.viewport.offsetHeight,
				scrollbar: {
					size: c.current.clientHeight,
					paddingStart: fp(o.paddingTop),
					paddingEnd: fp(o.paddingBottom)
				}
			});
		}
	});
}), [rp, ip] = Hf(Yf), ap = u.forwardRef((e, t) => {
	let { __scopeScrollArea: n, sizes: r, hasThumb: i, onThumbChange: a, onThumbPointerUp: o, onThumbPointerDown: s, onThumbPositionChange: c, onDragScroll: l, onWheelScroll: d, onResize: f, ...p } = e, m = Gf(Yf, n), [h, g] = u.useState(null), _ = bf(t, (e) => g(e)), v = u.useRef(null), y = u.useRef(""), b = m.viewport, x = r.content - r.viewport, S = If(d), C = If(c), w = bp(f, 10);
	function T(e) {
		v.current && l({
			x: e.clientX - v.current.left,
			y: e.clientY - v.current.top
		});
	}
	return u.useEffect(() => {
		let e = (e) => {
			let t = e.target;
			h?.contains(t) && S(e, x);
		};
		return document.addEventListener("wheel", e, { passive: !1 }), () => document.removeEventListener("wheel", e, { passive: !1 });
	}, [
		b,
		h,
		x,
		S
	]), u.useEffect(C, [r, C]), xp(h, w), xp(m.content, w), /* @__PURE__ */ (0, L.jsx)(rp, {
		scope: n,
		scrollbar: h,
		hasThumb: i,
		onThumbChange: If(a),
		onThumbPointerUp: If(o),
		onThumbPositionChange: C,
		onThumbPointerDown: If(s),
		children: /* @__PURE__ */ (0, L.jsx)(Df.div, {
			...p,
			ref: _,
			style: {
				position: "absolute",
				...p.style
			},
			onPointerDown: zf(e.onPointerDown, (e) => {
				e.button === 0 && (e.target.setPointerCapture(e.pointerId), v.current = h.getBoundingClientRect(), y.current = document.body.style.webkitUserSelect, document.body.style.webkitUserSelect = "none", m.viewport && (m.viewport.style.scrollBehavior = "auto"), T(e));
			}),
			onPointerMove: zf(e.onPointerMove, T),
			onPointerUp: zf(e.onPointerUp, (e) => {
				let t = e.target;
				t.hasPointerCapture(e.pointerId) && t.releasePointerCapture(e.pointerId), document.body.style.webkitUserSelect = y.current, m.viewport && (m.viewport.style.scrollBehavior = ""), v.current = null;
			})
		})
	});
}), op = "ScrollAreaThumb", sp = u.forwardRef((e, t) => {
	let { forceMount: n, ...r } = e, i = ip(op, e.__scopeScrollArea);
	return /* @__PURE__ */ (0, L.jsx)(Af, {
		present: n || i.hasThumb,
		children: /* @__PURE__ */ (0, L.jsx)(cp, {
			ref: t,
			...r
		})
	});
}), cp = u.forwardRef((e, t) => {
	let { __scopeScrollArea: n, style: r, ...i } = e, a = Gf(op, n), o = ip(op, n), { onThumbPositionChange: s } = o, c = bf(t, (e) => o.onThumbChange(e)), l = u.useRef(void 0), d = bp(() => {
		l.current &&= (l.current(), void 0);
	}, 100);
	return u.useEffect(() => {
		let e = a.viewport;
		if (e) {
			let t = () => {
				d(), l.current || (l.current = yp(e, s), s());
			};
			return s(), e.addEventListener("scroll", t), () => e.removeEventListener("scroll", t);
		}
	}, [
		a.viewport,
		d,
		s
	]), /* @__PURE__ */ (0, L.jsx)(Df.div, {
		"data-state": o.hasThumb ? "visible" : "hidden",
		...i,
		ref: c,
		style: {
			width: "var(--radix-scroll-area-thumb-width)",
			height: "var(--radix-scroll-area-thumb-height)",
			...r
		},
		onPointerDownCapture: zf(e.onPointerDownCapture, (e) => {
			let t = e.target.getBoundingClientRect(), n = e.clientX - t.left, r = e.clientY - t.top;
			o.onThumbPointerDown({
				x: n,
				y: r
			});
		}),
		onPointerUp: zf(e.onPointerUp, o.onThumbPointerUp)
	});
});
sp.displayName = op;
var lp = "ScrollAreaCorner", up = u.forwardRef((e, t) => {
	let n = Gf(lp, e.__scopeScrollArea), r = !!(n.scrollbarX && n.scrollbarY);
	return n.type !== "scroll" && r ? /* @__PURE__ */ (0, L.jsx)(dp, {
		...e,
		ref: t
	}) : null;
});
up.displayName = lp;
var dp = u.forwardRef((e, t) => {
	let { __scopeScrollArea: n, ...r } = e, i = Gf(lp, n), [a, o] = u.useState(0), [s, c] = u.useState(0), l = !!(a && s);
	return xp(i.scrollbarX, () => {
		let e = i.scrollbarX?.offsetHeight || 0;
		i.onCornerHeightChange(e), c(e);
	}), xp(i.scrollbarY, () => {
		let e = i.scrollbarY?.offsetWidth || 0;
		i.onCornerWidthChange(e), o(e);
	}), l ? /* @__PURE__ */ (0, L.jsx)(Df.div, {
		...r,
		ref: t,
		style: {
			width: a,
			height: s,
			position: "absolute",
			right: i.dir === "ltr" ? 0 : void 0,
			left: i.dir === "rtl" ? 0 : void 0,
			bottom: 0,
			...e.style
		}
	}) : null;
});
function fp(e) {
	return e ? parseInt(e, 10) : 0;
}
function pp(e, t) {
	let n = e / t;
	return isNaN(n) ? 0 : n;
}
function mp(e) {
	let t = pp(e.viewport, e.content), n = e.scrollbar.paddingStart + e.scrollbar.paddingEnd, r = (e.scrollbar.size - n) * t;
	return Math.max(r, 18);
}
function hp(e, t, n, r = "ltr") {
	let i = mp(n), a = i / 2, o = t || a, s = i - o, c = n.scrollbar.paddingStart + o, l = n.scrollbar.size - n.scrollbar.paddingEnd - s, u = n.content - n.viewport, d = r === "ltr" ? [0, u] : [u * -1, 0];
	return _p([c, l], d)(e);
}
function gp(e, t, n = "ltr") {
	let r = mp(t), i = t.scrollbar.paddingStart + t.scrollbar.paddingEnd, a = t.scrollbar.size - i, o = t.content - t.viewport, s = a - r, c = fn(e, n === "ltr" ? [0, o] : [o * -1, 0]);
	return _p([0, o], [0, s])(c);
}
function _p(e, t) {
	return (n) => {
		if (e[0] === e[1] || t[0] === t[1]) return t[0];
		let r = (t[1] - t[0]) / (e[1] - e[0]);
		return t[0] + r * (n - e[0]);
	};
}
function vp(e, t) {
	return e > 0 && e < t;
}
var yp = (e, t = () => {}) => {
	let n = {
		left: e.scrollLeft,
		top: e.scrollTop
	}, r = 0;
	return (function i() {
		let a = {
			left: e.scrollLeft,
			top: e.scrollTop
		}, o = n.left !== a.left, s = n.top !== a.top;
		(o || s) && t(), n = a, r = window.requestAnimationFrame(i);
	})(), () => window.cancelAnimationFrame(r);
};
function bp(e, t) {
	let n = If(e), r = u.useRef(0);
	return u.useEffect(() => () => window.clearTimeout(r.current), []), u.useCallback(() => {
		window.clearTimeout(r.current), r.current = window.setTimeout(n, t);
	}, [n, t]);
}
function xp(e, t) {
	let n = If(t);
	Of(() => {
		let t = 0;
		if (e) {
			let r = new ResizeObserver(() => {
				cancelAnimationFrame(t), t = window.requestAnimationFrame(n);
			});
			return r.observe(e), () => {
				window.cancelAnimationFrame(t), r.unobserve(e);
			};
		}
	}, [e, n]);
}
var Sp = Kf, Cp = Jf, wp = up, Tp = u.forwardRef(({ className: e, children: t, ...n }, r) => /* @__PURE__ */ (0, L.jsxs)(Sp, {
	ref: r,
	className: H("relative overflow-hidden", e),
	...n,
	children: [
		/* @__PURE__ */ (0, L.jsx)(Cp, {
			className: "h-full w-full rounded-[inherit]",
			children: t
		}),
		/* @__PURE__ */ (0, L.jsx)(Ep, {}),
		/* @__PURE__ */ (0, L.jsx)(wp, {})
	]
}));
Tp.displayName = Sp.displayName;
var Ep = u.forwardRef(({ className: e, orientation: t = "vertical", ...n }, r) => /* @__PURE__ */ (0, L.jsx)(Xf, {
	ref: r,
	orientation: t,
	className: H("flex touch-none select-none transition-colors", t === "vertical" && "h-full w-2.5 border-l border-l-transparent p-[1px]", t === "horizontal" && "h-2.5 flex-col border-t border-transparent p-[1px]", e),
	...n,
	children: /* @__PURE__ */ (0, L.jsx)(sp, { className: "relative flex-1 rounded-full bg-border" })
}));
Ep.displayName = Xf.displayName;
//#endregion
//#region components/ui/card.tsx
function Dp({ className: e, ...t }) {
	return /* @__PURE__ */ (0, L.jsx)("div", {
		"data-slot": "card",
		className: H("bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm", e),
		...t
	});
}
function Op({ className: e, ...t }) {
	return /* @__PURE__ */ (0, L.jsx)("div", {
		"data-slot": "card-header",
		className: H("@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6", e),
		...t
	});
}
function kp({ className: e, ...t }) {
	return /* @__PURE__ */ (0, L.jsx)("div", {
		"data-slot": "card-title",
		className: H("leading-none font-semibold", e),
		...t
	});
}
function Ap({ className: e, ...t }) {
	return /* @__PURE__ */ (0, L.jsx)("div", {
		"data-slot": "card-description",
		className: H("text-muted-foreground text-sm", e),
		...t
	});
}
function jp({ className: e, ...t }) {
	return /* @__PURE__ */ (0, L.jsx)("div", {
		"data-slot": "card-content",
		className: H("px-6", e),
		...t
	});
}
//#endregion
//#region node_modules/@radix-ui/primitive/dist/index.mjs
function Mp(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
	return function(r) {
		if (e?.(r), n === !1 || !r.defaultPrevented) return t?.(r);
	};
}
//#endregion
//#region node_modules/@radix-ui/react-context/dist/index.mjs
function Np(e, t = []) {
	let n = [];
	function r(t, r) {
		let i = u.createContext(r), a = n.length;
		n = [...n, r];
		let o = (t) => {
			let { scope: n, children: r, ...o } = t, s = n?.[e]?.[a] || i, c = u.useMemo(() => o, Object.values(o));
			return /* @__PURE__ */ (0, L.jsx)(s.Provider, {
				value: c,
				children: r
			});
		};
		o.displayName = t + "Provider";
		function s(n, o) {
			let s = o?.[e]?.[a] || i, c = u.useContext(s);
			if (c) return c;
			if (r !== void 0) return r;
			throw Error(`\`${n}\` must be used within \`${t}\``);
		}
		return [o, s];
	}
	let i = () => {
		let t = n.map((e) => u.createContext(e));
		return function(n) {
			let r = n?.[e] || t;
			return u.useMemo(() => ({ [`__scope${e}`]: {
				...n,
				[e]: r
			} }), [n, r]);
		};
	};
	return i.scopeName = e, [r, Pp(i, ...t)];
}
function Pp(...e) {
	let t = e[0];
	if (e.length === 1) return t;
	let n = () => {
		let n = e.map((e) => ({
			useScope: e(),
			scopeName: e.scopeName
		}));
		return function(e) {
			let r = n.reduce((t, { useScope: n, scopeName: r }) => {
				let i = n(e)[`__scope${r}`];
				return {
					...t,
					...i
				};
			}, {});
			return u.useMemo(() => ({ [`__scope${t.scopeName}`]: r }), [r]);
		};
	};
	return n.scopeName = t.scopeName, n;
}
//#endregion
//#region node_modules/@radix-ui/react-compose-refs/dist/index.mjs
function Fp(e, t) {
	if (typeof e == "function") return e(t);
	e != null && (e.current = t);
}
function Ip(...e) {
	return (t) => {
		let n = !1, r = e.map((e) => {
			let r = Fp(e, t);
			return !n && typeof r == "function" && (n = !0), r;
		});
		if (n) return () => {
			for (let t = 0; t < r.length; t++) {
				let n = r[t];
				typeof n == "function" ? n() : Fp(e[t], null);
			}
		};
	};
}
function Lp(...e) {
	return u.useCallback(Ip(...e), e);
}
//#endregion
//#region node_modules/@radix-ui/react-collection/node_modules/@radix-ui/react-slot/dist/index.mjs
var Rp = u.forwardRef((e, t) => {
	let { children: n, ...r } = e, i = u.Children.toArray(n), a = i.find(Vp);
	if (a) {
		let e = a.props.children, n = i.map((t) => t === a ? u.Children.count(e) > 1 ? u.Children.only(null) : u.isValidElement(e) ? e.props.children : null : t);
		return /* @__PURE__ */ (0, L.jsx)(zp, {
			...r,
			ref: t,
			children: u.isValidElement(e) ? u.cloneElement(e, void 0, n) : null
		});
	}
	return /* @__PURE__ */ (0, L.jsx)(zp, {
		...r,
		ref: t,
		children: n
	});
});
Rp.displayName = "Slot";
var zp = u.forwardRef((e, t) => {
	let { children: n, ...r } = e;
	if (u.isValidElement(n)) {
		let e = Up(n), i = Hp(r, n.props);
		return n.type !== u.Fragment && (i.ref = t ? Ip(t, e) : e), u.cloneElement(n, i);
	}
	return u.Children.count(n) > 1 ? u.Children.only(null) : null;
});
zp.displayName = "SlotClone";
var Bp = ({ children: e }) => /* @__PURE__ */ (0, L.jsx)(L.Fragment, { children: e });
function Vp(e) {
	return u.isValidElement(e) && e.type === Bp;
}
function Hp(e, t) {
	let n = { ...t };
	for (let r in t) {
		let i = e[r], a = t[r];
		/^on[A-Z]/.test(r) ? i && a ? n[r] = (...e) => {
			a(...e), i(...e);
		} : i && (n[r] = i) : r === "style" ? n[r] = {
			...i,
			...a
		} : r === "className" && (n[r] = [i, a].filter(Boolean).join(" "));
	}
	return {
		...e,
		...n
	};
}
function Up(e) {
	let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
	return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
//#endregion
//#region node_modules/@radix-ui/react-collection/dist/index.mjs
function Wp(e) {
	let t = e + "CollectionProvider", [n, r] = Np(t), [i, a] = n(t, {
		collectionRef: { current: null },
		itemMap: /* @__PURE__ */ new Map()
	}), o = (e) => {
		let { scope: t, children: n } = e, r = u.useRef(null), a = u.useRef(/* @__PURE__ */ new Map()).current;
		return /* @__PURE__ */ (0, L.jsx)(i, {
			scope: t,
			itemMap: a,
			collectionRef: r,
			children: n
		});
	};
	o.displayName = t;
	let s = e + "CollectionSlot", c = u.forwardRef((e, t) => {
		let { scope: n, children: r } = e;
		return /* @__PURE__ */ (0, L.jsx)(Rp, {
			ref: Lp(t, a(s, n).collectionRef),
			children: r
		});
	});
	c.displayName = s;
	let l = e + "CollectionItemSlot", d = "data-radix-collection-item", f = u.forwardRef((e, t) => {
		let { scope: n, children: r, ...i } = e, o = u.useRef(null), s = Lp(t, o), c = a(l, n);
		return u.useEffect(() => (c.itemMap.set(o, {
			ref: o,
			...i
		}), () => void c.itemMap.delete(o))), /* @__PURE__ */ (0, L.jsx)(Rp, {
			[d]: "",
			ref: s,
			children: r
		});
	});
	f.displayName = l;
	function p(t) {
		let n = a(e + "CollectionConsumer", t);
		return u.useCallback(() => {
			let e = n.collectionRef.current;
			if (!e) return [];
			let t = Array.from(e.querySelectorAll(`[${d}]`));
			return Array.from(n.itemMap.values()).sort((e, n) => t.indexOf(e.ref.current) - t.indexOf(n.ref.current));
		}, [n.collectionRef, n.itemMap]);
	}
	return [
		{
			Provider: o,
			Slot: c,
			ItemSlot: f
		},
		p,
		r
	];
}
//#endregion
//#region node_modules/@radix-ui/react-use-layout-effect/dist/index.mjs
var Gp = globalThis?.document ? u.useLayoutEffect : () => {}, Kp = u.useId || (() => void 0), qp = 0;
function Jp(e) {
	let [t, n] = u.useState(Kp());
	return Gp(() => {
		e || n((e) => e ?? String(qp++));
	}, [e]), e || (t ? `radix-${t}` : "");
}
//#endregion
//#region node_modules/@radix-ui/react-primitive/node_modules/@radix-ui/react-slot/dist/index.mjs
var Yp = u.forwardRef((e, t) => {
	let { children: n, ...r } = e, i = u.Children.toArray(n), a = i.find(Qp);
	if (a) {
		let e = a.props.children, n = i.map((t) => t === a ? u.Children.count(e) > 1 ? u.Children.only(null) : u.isValidElement(e) ? e.props.children : null : t);
		return /* @__PURE__ */ (0, L.jsx)(Xp, {
			...r,
			ref: t,
			children: u.isValidElement(e) ? u.cloneElement(e, void 0, n) : null
		});
	}
	return /* @__PURE__ */ (0, L.jsx)(Xp, {
		...r,
		ref: t,
		children: n
	});
});
Yp.displayName = "Slot";
var Xp = u.forwardRef((e, t) => {
	let { children: n, ...r } = e;
	if (u.isValidElement(n)) {
		let e = em(n), i = $p(r, n.props);
		return n.type !== u.Fragment && (i.ref = t ? Ip(t, e) : e), u.cloneElement(n, i);
	}
	return u.Children.count(n) > 1 ? u.Children.only(null) : null;
});
Xp.displayName = "SlotClone";
var Zp = ({ children: e }) => /* @__PURE__ */ (0, L.jsx)(L.Fragment, { children: e });
function Qp(e) {
	return u.isValidElement(e) && e.type === Zp;
}
function $p(e, t) {
	let n = { ...t };
	for (let r in t) {
		let i = e[r], a = t[r];
		/^on[A-Z]/.test(r) ? i && a ? n[r] = (...e) => {
			a(...e), i(...e);
		} : i && (n[r] = i) : r === "style" ? n[r] = {
			...i,
			...a
		} : r === "className" && (n[r] = [i, a].filter(Boolean).join(" "));
	}
	return {
		...e,
		...n
	};
}
function em(e) {
	let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
	return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
//#endregion
//#region node_modules/@radix-ui/react-primitive/dist/index.mjs
var tm = [
	"a",
	"button",
	"div",
	"form",
	"h2",
	"h3",
	"img",
	"input",
	"label",
	"li",
	"nav",
	"ol",
	"p",
	"span",
	"svg",
	"ul"
].reduce((e, t) => {
	let n = u.forwardRef((e, n) => {
		let { asChild: r, ...i } = e, a = r ? Yp : t;
		return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ (0, L.jsx)(a, {
			...i,
			ref: n
		});
	});
	return n.displayName = `Primitive.${t}`, {
		...e,
		[t]: n
	};
}, {});
//#endregion
//#region node_modules/@radix-ui/react-use-callback-ref/dist/index.mjs
function nm(e) {
	let t = u.useRef(e);
	return u.useEffect(() => {
		t.current = e;
	}), u.useMemo(() => (...e) => t.current?.(...e), []);
}
//#endregion
//#region node_modules/@radix-ui/react-use-controllable-state/dist/index.mjs
function rm({ prop: e, defaultProp: t, onChange: n = () => {} }) {
	let [r, i] = im({
		defaultProp: t,
		onChange: n
	}), a = e !== void 0, o = a ? e : r, s = nm(n);
	return [o, u.useCallback((t) => {
		if (a) {
			let n = typeof t == "function" ? t(e) : t;
			n !== e && s(n);
		} else i(t);
	}, [
		a,
		e,
		i,
		s
	])];
}
function im({ defaultProp: e, onChange: t }) {
	let n = u.useState(e), [r] = n, i = u.useRef(r), a = nm(t);
	return u.useEffect(() => {
		i.current !== r && (a(r), i.current = r);
	}, [
		r,
		i,
		a
	]), n;
}
//#endregion
//#region node_modules/@radix-ui/react-direction/dist/index.mjs
var am = u.createContext(void 0);
function om(e) {
	let t = u.useContext(am);
	return e || t || "ltr";
}
//#endregion
//#region node_modules/@radix-ui/react-roving-focus/dist/index.mjs
var sm = "rovingFocusGroup.onEntryFocus", cm = {
	bubbles: !1,
	cancelable: !0
}, lm = "RovingFocusGroup", [um, dm, fm] = Wp(lm), [pm, mm] = Np(lm, [fm]), [hm, gm] = pm(lm), _m = u.forwardRef((e, t) => /* @__PURE__ */ (0, L.jsx)(um.Provider, {
	scope: e.__scopeRovingFocusGroup,
	children: /* @__PURE__ */ (0, L.jsx)(um.Slot, {
		scope: e.__scopeRovingFocusGroup,
		children: /* @__PURE__ */ (0, L.jsx)(vm, {
			...e,
			ref: t
		})
	})
}));
_m.displayName = lm;
var vm = u.forwardRef((e, t) => {
	let { __scopeRovingFocusGroup: n, orientation: r, loop: i = !1, dir: a, currentTabStopId: o, defaultCurrentTabStopId: s, onCurrentTabStopIdChange: c, onEntryFocus: l, preventScrollOnEntryFocus: d = !1, ...f } = e, p = u.useRef(null), m = Lp(t, p), h = om(a), [g = null, _] = rm({
		prop: o,
		defaultProp: s,
		onChange: c
	}), [v, y] = u.useState(!1), b = nm(l), x = dm(n), S = u.useRef(!1), [C, w] = u.useState(0);
	return u.useEffect(() => {
		let e = p.current;
		if (e) return e.addEventListener(sm, b), () => e.removeEventListener(sm, b);
	}, [b]), /* @__PURE__ */ (0, L.jsx)(hm, {
		scope: n,
		orientation: r,
		dir: h,
		loop: i,
		currentTabStopId: g,
		onItemFocus: u.useCallback((e) => _(e), [_]),
		onItemShiftTab: u.useCallback(() => y(!0), []),
		onFocusableItemAdd: u.useCallback(() => w((e) => e + 1), []),
		onFocusableItemRemove: u.useCallback(() => w((e) => e - 1), []),
		children: /* @__PURE__ */ (0, L.jsx)(tm.div, {
			tabIndex: v || C === 0 ? -1 : 0,
			"data-orientation": r,
			...f,
			ref: m,
			style: {
				outline: "none",
				...e.style
			},
			onMouseDown: Mp(e.onMouseDown, () => {
				S.current = !0;
			}),
			onFocus: Mp(e.onFocus, (e) => {
				let t = !S.current;
				if (e.target === e.currentTarget && t && !v) {
					let t = new CustomEvent(sm, cm);
					if (e.currentTarget.dispatchEvent(t), !t.defaultPrevented) {
						let e = x().filter((e) => e.focusable);
						wm([
							e.find((e) => e.active),
							e.find((e) => e.id === g),
							...e
						].filter(Boolean).map((e) => e.ref.current), d);
					}
				}
				S.current = !1;
			}),
			onBlur: Mp(e.onBlur, () => y(!1))
		})
	});
}), ym = "RovingFocusGroupItem", bm = u.forwardRef((e, t) => {
	let { __scopeRovingFocusGroup: n, focusable: r = !0, active: i = !1, tabStopId: a, ...o } = e, s = Jp(), c = a || s, l = gm(ym, n), d = l.currentTabStopId === c, f = dm(n), { onFocusableItemAdd: p, onFocusableItemRemove: m } = l;
	return u.useEffect(() => {
		if (r) return p(), () => m();
	}, [
		r,
		p,
		m
	]), /* @__PURE__ */ (0, L.jsx)(um.ItemSlot, {
		scope: n,
		id: c,
		focusable: r,
		active: i,
		children: /* @__PURE__ */ (0, L.jsx)(tm.span, {
			tabIndex: d ? 0 : -1,
			"data-orientation": l.orientation,
			...o,
			ref: t,
			onMouseDown: Mp(e.onMouseDown, (e) => {
				r ? l.onItemFocus(c) : e.preventDefault();
			}),
			onFocus: Mp(e.onFocus, () => l.onItemFocus(c)),
			onKeyDown: Mp(e.onKeyDown, (e) => {
				if (e.key === "Tab" && e.shiftKey) {
					l.onItemShiftTab();
					return;
				}
				if (e.target !== e.currentTarget) return;
				let t = Cm(e, l.orientation, l.dir);
				if (t !== void 0) {
					if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) return;
					e.preventDefault();
					let n = f().filter((e) => e.focusable).map((e) => e.ref.current);
					if (t === "last") n.reverse();
					else if (t === "prev" || t === "next") {
						t === "prev" && n.reverse();
						let r = n.indexOf(e.currentTarget);
						n = l.loop ? Tm(n, r + 1) : n.slice(r + 1);
					}
					setTimeout(() => wm(n));
				}
			})
		})
	});
});
bm.displayName = ym;
var xm = {
	ArrowLeft: "prev",
	ArrowUp: "prev",
	ArrowRight: "next",
	ArrowDown: "next",
	PageUp: "first",
	Home: "first",
	PageDown: "last",
	End: "last"
};
function Sm(e, t) {
	return t === "rtl" ? e === "ArrowLeft" ? "ArrowRight" : e === "ArrowRight" ? "ArrowLeft" : e : e;
}
function Cm(e, t, n) {
	let r = Sm(e.key, n);
	if (!(t === "vertical" && ["ArrowLeft", "ArrowRight"].includes(r)) && !(t === "horizontal" && ["ArrowUp", "ArrowDown"].includes(r))) return xm[r];
}
function wm(e, t = !1) {
	let n = document.activeElement;
	for (let r of e) if (r === n || (r.focus({ preventScroll: t }), document.activeElement !== n)) return;
}
function Tm(e, t) {
	return e.map((n, r) => e[(t + r) % e.length]);
}
var Em = _m, Dm = bm;
//#endregion
//#region node_modules/@radix-ui/react-presence/dist/index.mjs
function Om(e, t) {
	return u.useReducer((e, n) => t[e][n] ?? e, e);
}
var km = (e) => {
	let { present: t, children: n } = e, r = Am(t), i = typeof n == "function" ? n({ present: r.isPresent }) : u.Children.only(n), a = Lp(r.ref, Mm(i));
	return typeof n == "function" || r.isPresent ? u.cloneElement(i, { ref: a }) : null;
};
km.displayName = "Presence";
function Am(e) {
	let [t, n] = u.useState(), r = u.useRef({}), i = u.useRef(e), a = u.useRef("none"), [o, s] = Om(e ? "mounted" : "unmounted", {
		mounted: {
			UNMOUNT: "unmounted",
			ANIMATION_OUT: "unmountSuspended"
		},
		unmountSuspended: {
			MOUNT: "mounted",
			ANIMATION_END: "unmounted"
		},
		unmounted: { MOUNT: "mounted" }
	});
	return u.useEffect(() => {
		let e = jm(r.current);
		a.current = o === "mounted" ? e : "none";
	}, [o]), Gp(() => {
		let t = r.current, n = i.current;
		if (n !== e) {
			let r = a.current, o = jm(t);
			e ? s("MOUNT") : o === "none" || t?.display === "none" ? s("UNMOUNT") : s(n && r !== o ? "ANIMATION_OUT" : "UNMOUNT"), i.current = e;
		}
	}, [e, s]), Gp(() => {
		if (t) {
			let e, n = t.ownerDocument.defaultView ?? window, o = (a) => {
				let o = jm(r.current).includes(a.animationName);
				if (a.target === t && o && (s("ANIMATION_END"), !i.current)) {
					let r = t.style.animationFillMode;
					t.style.animationFillMode = "forwards", e = n.setTimeout(() => {
						t.style.animationFillMode === "forwards" && (t.style.animationFillMode = r);
					});
				}
			}, c = (e) => {
				e.target === t && (a.current = jm(r.current));
			};
			return t.addEventListener("animationstart", c), t.addEventListener("animationcancel", o), t.addEventListener("animationend", o), () => {
				n.clearTimeout(e), t.removeEventListener("animationstart", c), t.removeEventListener("animationcancel", o), t.removeEventListener("animationend", o);
			};
		} else s("ANIMATION_END");
	}, [t, s]), {
		isPresent: ["mounted", "unmountSuspended"].includes(o),
		ref: u.useCallback((e) => {
			e && (r.current = getComputedStyle(e)), n(e);
		}, [])
	};
}
function jm(e) {
	return e?.animationName || "none";
}
function Mm(e) {
	let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
	return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
//#endregion
//#region node_modules/@radix-ui/react-tabs/dist/index.mjs
var Nm = "Tabs", [Pm, Fm] = Np(Nm, [mm]), Im = mm(), [Lm, Rm] = Pm(Nm), zm = u.forwardRef((e, t) => {
	let { __scopeTabs: n, value: r, onValueChange: i, defaultValue: a, orientation: o = "horizontal", dir: s, activationMode: c = "automatic", ...l } = e, u = om(s), [d, f] = rm({
		prop: r,
		onChange: i,
		defaultProp: a
	});
	return /* @__PURE__ */ (0, L.jsx)(Lm, {
		scope: n,
		baseId: Jp(),
		value: d,
		onValueChange: f,
		orientation: o,
		dir: u,
		activationMode: c,
		children: /* @__PURE__ */ (0, L.jsx)(tm.div, {
			dir: u,
			"data-orientation": o,
			...l,
			ref: t
		})
	});
});
zm.displayName = Nm;
var Bm = "TabsList", Vm = u.forwardRef((e, t) => {
	let { __scopeTabs: n, loop: r = !0, ...i } = e, a = Rm(Bm, n), o = Im(n);
	return /* @__PURE__ */ (0, L.jsx)(Em, {
		asChild: !0,
		...o,
		orientation: a.orientation,
		dir: a.dir,
		loop: r,
		children: /* @__PURE__ */ (0, L.jsx)(tm.div, {
			role: "tablist",
			"aria-orientation": a.orientation,
			...i,
			ref: t
		})
	});
});
Vm.displayName = Bm;
var Hm = "TabsTrigger", Um = u.forwardRef((e, t) => {
	let { __scopeTabs: n, value: r, disabled: i = !1, ...a } = e, o = Rm(Hm, n), s = Im(n), c = Km(o.baseId, r), l = qm(o.baseId, r), u = r === o.value;
	return /* @__PURE__ */ (0, L.jsx)(Dm, {
		asChild: !0,
		...s,
		focusable: !i,
		active: u,
		children: /* @__PURE__ */ (0, L.jsx)(tm.button, {
			type: "button",
			role: "tab",
			"aria-selected": u,
			"aria-controls": l,
			"data-state": u ? "active" : "inactive",
			"data-disabled": i ? "" : void 0,
			disabled: i,
			id: c,
			...a,
			ref: t,
			onMouseDown: Mp(e.onMouseDown, (e) => {
				!i && e.button === 0 && e.ctrlKey === !1 ? o.onValueChange(r) : e.preventDefault();
			}),
			onKeyDown: Mp(e.onKeyDown, (e) => {
				[" ", "Enter"].includes(e.key) && o.onValueChange(r);
			}),
			onFocus: Mp(e.onFocus, () => {
				let e = o.activationMode !== "manual";
				!u && !i && e && o.onValueChange(r);
			})
		})
	});
});
Um.displayName = Hm;
var Wm = "TabsContent", Gm = u.forwardRef((e, t) => {
	let { __scopeTabs: n, value: r, forceMount: i, children: a, ...o } = e, s = Rm(Wm, n), c = Km(s.baseId, r), l = qm(s.baseId, r), d = r === s.value, f = u.useRef(d);
	return u.useEffect(() => {
		let e = requestAnimationFrame(() => f.current = !1);
		return () => cancelAnimationFrame(e);
	}, []), /* @__PURE__ */ (0, L.jsx)(km, {
		present: i || d,
		children: ({ present: n }) => /* @__PURE__ */ (0, L.jsx)(tm.div, {
			"data-state": d ? "active" : "inactive",
			"data-orientation": s.orientation,
			role: "tabpanel",
			"aria-labelledby": c,
			hidden: !n,
			id: l,
			tabIndex: 0,
			...o,
			ref: t,
			style: {
				...e.style,
				animationDuration: f.current ? "0s" : void 0
			},
			children: n && a
		})
	});
});
Gm.displayName = Wm;
function Km(e, t) {
	return `${e}-trigger-${t}`;
}
function qm(e, t) {
	return `${e}-content-${t}`;
}
var Jm = zm, Ym = Vm, Xm = Um, Zm = Gm;
//#endregion
//#region components/ui/tabs.tsx
function Qm({ className: e, ...t }) {
	return /* @__PURE__ */ (0, L.jsx)(Jm, {
		"data-slot": "tabs",
		className: H("flex flex-col gap-2", e),
		...t
	});
}
function $m({ className: e, ...t }) {
	return /* @__PURE__ */ (0, L.jsx)(Ym, {
		"data-slot": "tabs-list",
		className: H("bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]", e),
		...t
	});
}
function eh({ className: e, ...t }) {
	return /* @__PURE__ */ (0, L.jsx)(Xm, {
		"data-slot": "tabs-trigger",
		className: H("data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", e),
		...t
	});
}
function th({ className: e, ...t }) {
	return /* @__PURE__ */ (0, L.jsx)(Zm, {
		"data-slot": "tabs-content",
		className: H("flex-1 outline-none", e),
		...t
	});
}
//#endregion
//#region app/(protected)/certificates/create/components/TemplateSelector.tsx
function nh({ onSelectTemplate: e, onClose: t }) {
	let [n, r] = u.useState("all"), i = u.useMemo(() => n === "all" ? Xt.map((e, t) => ({
		template: e,
		index: t
	})) : Xt.map((e, t) => ({
		template: e,
		index: t
	})).filter(({ template: e }) => e.category === n), [n]), a = (n) => {
		e(n), t();
	};
	return /* @__PURE__ */ (0, L.jsx)("div", {
		className: "fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-hidden",
		children: /* @__PURE__ */ (0, L.jsxs)(Dp, {
			className: "w-full max-w-4xl max-h-[85vh] flex flex-col",
			children: [
				/* @__PURE__ */ (0, L.jsx)(Op, {
					className: "border-b",
					children: /* @__PURE__ */ (0, L.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, L.jsxs)("div", { children: [/* @__PURE__ */ (0, L.jsx)(kp, {
							className: "text-xl",
							children: "Выбор шаблона документа"
						}), /* @__PURE__ */ (0, L.jsx)(Ap, {
							className: "mt-1",
							children: "Выберите готовый шаблон для быстрого создания документа"
						})] }), /* @__PURE__ */ (0, L.jsx)(U, {
							variant: "ghost",
							size: "icon",
							onClick: t,
							children: "✕"
						})]
					})
				}),
				/* @__PURE__ */ (0, L.jsx)("div", {
					className: "p-6 flex-1 overflow-hidden flex flex-col",
					children: /* @__PURE__ */ (0, L.jsxs)(Qm, {
						value: n,
						onValueChange: r,
						className: "flex-1 flex flex-col",
						children: [/* @__PURE__ */ (0, L.jsx)($m, {
							className: "grid w-full grid-cols-5 mb-4",
							children: Yt.map((e) => /* @__PURE__ */ (0, L.jsx)(eh, {
								value: e.value,
								children: e.label
							}, e.value))
						}), /* @__PURE__ */ (0, L.jsxs)(Tp, {
							className: "flex-1",
							children: [/* @__PURE__ */ (0, L.jsx)("div", {
								className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-1",
								children: i.map(({ template: e, index: t }) => /* @__PURE__ */ (0, L.jsxs)(Dp, {
									className: "cursor-pointer hover:border-primary transition-all hover:shadow-md",
									onClick: () => a(t),
									children: [/* @__PURE__ */ (0, L.jsx)(Op, {
										className: "pb-3",
										children: /* @__PURE__ */ (0, L.jsxs)("div", {
											className: "flex items-start justify-between gap-2",
											children: [/* @__PURE__ */ (0, L.jsxs)("div", {
												className: "flex items-center gap-2",
												children: [/* @__PURE__ */ (0, L.jsx)("span", {
													className: "text-2xl",
													children: e.previewIcon || "📄"
												}), /* @__PURE__ */ (0, L.jsx)(kp, {
													className: "text-base",
													children: e.name
												})]
											}), /* @__PURE__ */ (0, L.jsx)(_f, {
												variant: "secondary",
												className: "text-xs",
												children: Yt.find((t) => t.value === e.category)?.label
											})]
										})
									}), /* @__PURE__ */ (0, L.jsxs)(jp, {
										className: "pt-0",
										children: [/* @__PURE__ */ (0, L.jsx)(Ap, {
											className: "text-xs line-clamp-2",
											children: e.description || "Шаблон документа"
										}), /* @__PURE__ */ (0, L.jsx)("div", {
											className: "mt-3 pt-3 border-t",
											children: /* @__PURE__ */ (0, L.jsxs)("p", {
												className: "text-xs text-muted-foreground",
												children: ["Элементов: ", e.layers.length]
											})
										})]
									})]
								}, t))
							}), i.length === 0 && /* @__PURE__ */ (0, L.jsx)("div", {
								className: "flex flex-col items-center justify-center py-12 text-center",
								children: /* @__PURE__ */ (0, L.jsx)("p", {
									className: "text-muted-foreground",
									children: "Шаблоны не найдены в этой категории"
								})
							})]
						})]
					})
				}),
				/* @__PURE__ */ (0, L.jsx)("div", {
					className: "border-t p-4 flex justify-end gap-2",
					children: /* @__PURE__ */ (0, L.jsx)(U, {
						variant: "outline",
						onClick: t,
						children: "Отмена"
					})
				})
			]
		})
	});
}
//#endregion
//#region app/(protected)/certificates/create/hooks/useCertificatePersistence.ts
var rh = "eventer_certificate_draft_v2", ih = 1e4;
function ah({ layers: e, backgroundImage: t, pageSizeSettings: n, setLayers: r, setBackgroundImage: i, setPageSizeSettings: a, enabled: o = !0 }) {
	let [s, c] = (0, u.useState)(null), [l, d] = (0, u.useState)(!1), f = (0, u.useRef)({
		layers: e,
		backgroundImage: t,
		pageSizeSettings: n
	}), p = (0, u.useRef)(!1);
	(0, u.useEffect)(() => {
		f.current = {
			layers: e,
			backgroundImage: t,
			pageSizeSettings: n
		}, l && (p.current = !0);
	}, [
		e,
		t,
		n,
		l
	]), (0, u.useEffect)(() => {
		if (!o) {
			d(!0);
			return;
		}
		let e = localStorage.getItem(rh);
		if (e) try {
			let t = JSON.parse(e);
			t.layers && r(t.layers), t.backgroundImage !== void 0 && i(t.backgroundImage), t.pageSizeSettings && a(t.pageSizeSettings), t.updatedAt && c(new Date(t.updatedAt)), E.info("Черновик восстановлен из локального хранилища");
		} catch (e) {
			console.error("Failed to load draft", e), E.error("Не удалось восстановить черновик");
		}
		d(!0);
	}, [o]);
	let m = (0, u.useCallback)((e = !0) => {
		if (!o) {
			c(/* @__PURE__ */ new Date());
			return;
		}
		try {
			let t = {
				layers: f.current.layers,
				backgroundImage: f.current.backgroundImage,
				pageSizeSettings: f.current.pageSizeSettings,
				updatedAt: Date.now()
			};
			localStorage.setItem(rh, JSON.stringify(t)), c(/* @__PURE__ */ new Date()), p.current = !1, e && E.success("Сертификат успешно сохранен");
		} catch (t) {
			console.error("Failed to save draft", t), e && E.error("Ошибка при сохранении");
		}
	}, [o]);
	return (0, u.useEffect)(() => {
		if (!o || !l) return;
		let e = setInterval(() => {
			p.current && m(!1);
		}, ih);
		return () => clearInterval(e);
	}, [
		o,
		l,
		m
	]), {
		save: m,
		lastSaved: s
	};
}
//#endregion
//#region node_modules/@radix-ui/react-dropdown-menu/node_modules/@radix-ui/primitive/dist/index.mjs
function oh(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
	return function(r) {
		if (e?.(r), n === !1 || !r.defaultPrevented) return t?.(r);
	};
}
//#endregion
//#region node_modules/@radix-ui/react-dropdown-menu/node_modules/@radix-ui/react-compose-refs/dist/index.mjs
function sh(e, t) {
	if (typeof e == "function") return e(t);
	e != null && (e.current = t);
}
function ch(...e) {
	return (t) => {
		let n = !1, r = e.map((e) => {
			let r = sh(e, t);
			return !n && typeof r == "function" && (n = !0), r;
		});
		if (n) return () => {
			for (let t = 0; t < r.length; t++) {
				let n = r[t];
				typeof n == "function" ? n() : sh(e[t], null);
			}
		};
	};
}
//#endregion
//#region node_modules/@radix-ui/react-dropdown-menu/node_modules/@radix-ui/react-context/dist/index.mjs
function lh(e, t = []) {
	let n = [];
	function r(t, r) {
		let i = u.createContext(r), a = n.length;
		n = [...n, r];
		let o = (t) => {
			let { scope: n, children: r, ...o } = t, s = n?.[e]?.[a] || i, c = u.useMemo(() => o, Object.values(o));
			return /* @__PURE__ */ (0, L.jsx)(s.Provider, {
				value: c,
				children: r
			});
		};
		o.displayName = t + "Provider";
		function s(n, o) {
			let s = o?.[e]?.[a] || i, c = u.useContext(s);
			if (c) return c;
			if (r !== void 0) return r;
			throw Error(`\`${n}\` must be used within \`${t}\``);
		}
		return [o, s];
	}
	let i = () => {
		let t = n.map((e) => u.createContext(e));
		return function(n) {
			let r = n?.[e] || t;
			return u.useMemo(() => ({ [`__scope${e}`]: {
				...n,
				[e]: r
			} }), [n, r]);
		};
	};
	return i.scopeName = e, [r, uh(i, ...t)];
}
function uh(...e) {
	let t = e[0];
	if (e.length === 1) return t;
	let n = () => {
		let n = e.map((e) => ({
			useScope: e(),
			scopeName: e.scopeName
		}));
		return function(e) {
			let r = n.reduce((t, { useScope: n, scopeName: r }) => {
				let i = n(e)[`__scope${r}`];
				return {
					...t,
					...i
				};
			}, {});
			return u.useMemo(() => ({ [`__scope${t.scopeName}`]: r }), [r]);
		};
	};
	return n.scopeName = t.scopeName, n;
}
//#endregion
//#region node_modules/@radix-ui/react-dropdown-menu/node_modules/@radix-ui/react-use-layout-effect/dist/index.mjs
var dh = globalThis?.document ? u.useLayoutEffect : () => {}, fh = u.useInsertionEffect || dh;
function ph({ prop: e, defaultProp: t, onChange: n = () => {}, caller: r }) {
	let [i, a, o] = mh({
		defaultProp: t,
		onChange: n
	}), s = e !== void 0, c = s ? e : i;
	{
		let t = u.useRef(e !== void 0);
		u.useEffect(() => {
			let e = t.current;
			e !== s && console.warn(`${r} is changing from ${e ? "controlled" : "uncontrolled"} to ${s ? "controlled" : "uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`), t.current = s;
		}, [s, r]);
	}
	return [c, u.useCallback((t) => {
		if (s) {
			let n = hh(t) ? t(e) : t;
			n !== e && o.current?.(n);
		} else a(t);
	}, [
		s,
		e,
		a,
		o
	])];
}
function mh({ defaultProp: e, onChange: t }) {
	let [n, r] = u.useState(e), i = u.useRef(n), a = u.useRef(t);
	return fh(() => {
		a.current = t;
	}, [t]), u.useEffect(() => {
		i.current !== n && (a.current?.(n), i.current = n);
	}, [n, i]), [
		n,
		r,
		a
	];
}
function hh(e) {
	return typeof e == "function";
}
//#endregion
//#region node_modules/@radix-ui/react-dropdown-menu/node_modules/@radix-ui/react-slot/dist/index.mjs
/* @__NO_SIDE_EFFECTS__ */
function gh(e) {
	let t = /* @__PURE__ */ _h(e), n = u.forwardRef((e, n) => {
		let { children: r, ...i } = e, a = u.Children.toArray(r), o = a.find(yh);
		if (o) {
			let e = o.props.children, r = a.map((t) => t === o ? u.Children.count(e) > 1 ? u.Children.only(null) : u.isValidElement(e) ? e.props.children : null : t);
			return /* @__PURE__ */ (0, L.jsx)(t, {
				...i,
				ref: n,
				children: u.isValidElement(e) ? u.cloneElement(e, void 0, r) : null
			});
		}
		return /* @__PURE__ */ (0, L.jsx)(t, {
			...i,
			ref: n,
			children: r
		});
	});
	return n.displayName = `${e}.Slot`, n;
}
/* @__NO_SIDE_EFFECTS__ */
function _h(e) {
	let t = u.forwardRef((e, t) => {
		let { children: n, ...r } = e;
		if (u.isValidElement(n)) {
			let e = xh(n), i = bh(r, n.props);
			return n.type !== u.Fragment && (i.ref = t ? ch(t, e) : e), u.cloneElement(n, i);
		}
		return u.Children.count(n) > 1 ? u.Children.only(null) : null;
	});
	return t.displayName = `${e}.SlotClone`, t;
}
var vh = Symbol("radix.slottable");
function yh(e) {
	return u.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === vh;
}
function bh(e, t) {
	let n = { ...t };
	for (let r in t) {
		let i = e[r], a = t[r];
		/^on[A-Z]/.test(r) ? i && a ? n[r] = (...e) => {
			let t = a(...e);
			return i(...e), t;
		} : i && (n[r] = i) : r === "style" ? n[r] = {
			...i,
			...a
		} : r === "className" && (n[r] = [i, a].filter(Boolean).join(" "));
	}
	return {
		...e,
		...n
	};
}
function xh(e) {
	let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
	return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
//#endregion
//#region node_modules/@radix-ui/react-dropdown-menu/node_modules/@radix-ui/react-primitive/dist/index.mjs
var Sh = [
	"a",
	"button",
	"div",
	"form",
	"h2",
	"h3",
	"img",
	"input",
	"label",
	"li",
	"nav",
	"ol",
	"p",
	"select",
	"span",
	"svg",
	"ul"
].reduce((e, t) => {
	let n = /* @__PURE__ */ gh(`Primitive.${t}`), r = u.forwardRef((e, r) => {
		let { asChild: i, ...a } = e, o = i ? n : t;
		return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ (0, L.jsx)(o, {
			...a,
			ref: r
		});
	});
	return r.displayName = `Primitive.${t}`, {
		...e,
		[t]: r
	};
}, {});
//#endregion
//#region node_modules/@radix-ui/react-menu/node_modules/@radix-ui/primitive/dist/index.mjs
function Ch(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
	return function(r) {
		if (e?.(r), n === !1 || !r.defaultPrevented) return t?.(r);
	};
}
//#endregion
//#region node_modules/@radix-ui/react-menu/node_modules/@radix-ui/react-context/dist/index.mjs
function wh(e, t = []) {
	let n = [];
	function r(t, r) {
		let i = u.createContext(r), a = n.length;
		n = [...n, r];
		let o = (t) => {
			let { scope: n, children: r, ...o } = t, s = n?.[e]?.[a] || i, c = u.useMemo(() => o, Object.values(o));
			return /* @__PURE__ */ (0, L.jsx)(s.Provider, {
				value: c,
				children: r
			});
		};
		o.displayName = t + "Provider";
		function s(n, o) {
			let s = o?.[e]?.[a] || i, c = u.useContext(s);
			if (c) return c;
			if (r !== void 0) return r;
			throw Error(`\`${n}\` must be used within \`${t}\``);
		}
		return [o, s];
	}
	let i = () => {
		let t = n.map((e) => u.createContext(e));
		return function(n) {
			let r = n?.[e] || t;
			return u.useMemo(() => ({ [`__scope${e}`]: {
				...n,
				[e]: r
			} }), [n, r]);
		};
	};
	return i.scopeName = e, [r, Th(i, ...t)];
}
function Th(...e) {
	let t = e[0];
	if (e.length === 1) return t;
	let n = () => {
		let n = e.map((e) => ({
			useScope: e(),
			scopeName: e.scopeName
		}));
		return function(e) {
			let r = n.reduce((t, { useScope: n, scopeName: r }) => {
				let i = n(e)[`__scope${r}`];
				return {
					...t,
					...i
				};
			}, {});
			return u.useMemo(() => ({ [`__scope${t.scopeName}`]: r }), [r]);
		};
	};
	return n.scopeName = t.scopeName, n;
}
//#endregion
//#region node_modules/@radix-ui/react-menu/node_modules/@radix-ui/react-compose-refs/dist/index.mjs
function Eh(e, t) {
	if (typeof e == "function") return e(t);
	e != null && (e.current = t);
}
function Dh(...e) {
	return (t) => {
		let n = !1, r = e.map((e) => {
			let r = Eh(e, t);
			return !n && typeof r == "function" && (n = !0), r;
		});
		if (n) return () => {
			for (let t = 0; t < r.length; t++) {
				let n = r[t];
				typeof n == "function" ? n() : Eh(e[t], null);
			}
		};
	};
}
function Oh(...e) {
	return u.useCallback(Dh(...e), e);
}
//#endregion
//#region node_modules/@radix-ui/react-menu/node_modules/@radix-ui/react-slot/dist/index.mjs
/* @__NO_SIDE_EFFECTS__ */
function kh(e) {
	let t = /* @__PURE__ */ Ah(e), n = u.forwardRef((e, n) => {
		let { children: r, ...i } = e, a = u.Children.toArray(r), o = a.find(Mh);
		if (o) {
			let e = o.props.children, r = a.map((t) => t === o ? u.Children.count(e) > 1 ? u.Children.only(null) : u.isValidElement(e) ? e.props.children : null : t);
			return /* @__PURE__ */ (0, L.jsx)(t, {
				...i,
				ref: n,
				children: u.isValidElement(e) ? u.cloneElement(e, void 0, r) : null
			});
		}
		return /* @__PURE__ */ (0, L.jsx)(t, {
			...i,
			ref: n,
			children: r
		});
	});
	return n.displayName = `${e}.Slot`, n;
}
/* @__NO_SIDE_EFFECTS__ */
function Ah(e) {
	let t = u.forwardRef((e, t) => {
		let { children: n, ...r } = e;
		if (u.isValidElement(n)) {
			let e = Ph(n), i = Nh(r, n.props);
			return n.type !== u.Fragment && (i.ref = t ? Dh(t, e) : e), u.cloneElement(n, i);
		}
		return u.Children.count(n) > 1 ? u.Children.only(null) : null;
	});
	return t.displayName = `${e}.SlotClone`, t;
}
var jh = Symbol("radix.slottable");
function Mh(e) {
	return u.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === jh;
}
function Nh(e, t) {
	let n = { ...t };
	for (let r in t) {
		let i = e[r], a = t[r];
		/^on[A-Z]/.test(r) ? i && a ? n[r] = (...e) => {
			let t = a(...e);
			return i(...e), t;
		} : i && (n[r] = i) : r === "style" ? n[r] = {
			...i,
			...a
		} : r === "className" && (n[r] = [i, a].filter(Boolean).join(" "));
	}
	return {
		...e,
		...n
	};
}
function Ph(e) {
	let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
	return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
//#endregion
//#region node_modules/@radix-ui/react-menu/node_modules/@radix-ui/react-collection/dist/index.mjs
function Fh(e) {
	let t = e + "CollectionProvider", [n, r] = wh(t), [i, a] = n(t, {
		collectionRef: { current: null },
		itemMap: /* @__PURE__ */ new Map()
	}), o = (e) => {
		let { scope: t, children: n } = e, r = u.useRef(null), a = u.useRef(/* @__PURE__ */ new Map()).current;
		return /* @__PURE__ */ (0, L.jsx)(i, {
			scope: t,
			itemMap: a,
			collectionRef: r,
			children: n
		});
	};
	o.displayName = t;
	let s = e + "CollectionSlot", c = /* @__PURE__ */ kh(s), l = u.forwardRef((e, t) => {
		let { scope: n, children: r } = e;
		return /* @__PURE__ */ (0, L.jsx)(c, {
			ref: Oh(t, a(s, n).collectionRef),
			children: r
		});
	});
	l.displayName = s;
	let d = e + "CollectionItemSlot", f = "data-radix-collection-item", p = /* @__PURE__ */ kh(d), m = u.forwardRef((e, t) => {
		let { scope: n, children: r, ...i } = e, o = u.useRef(null), s = Oh(t, o), c = a(d, n);
		return u.useEffect(() => (c.itemMap.set(o, {
			ref: o,
			...i
		}), () => void c.itemMap.delete(o))), /* @__PURE__ */ (0, L.jsx)(p, {
			[f]: "",
			ref: s,
			children: r
		});
	});
	m.displayName = d;
	function h(t) {
		let n = a(e + "CollectionConsumer", t);
		return u.useCallback(() => {
			let e = n.collectionRef.current;
			if (!e) return [];
			let t = Array.from(e.querySelectorAll(`[${f}]`));
			return Array.from(n.itemMap.values()).sort((e, n) => t.indexOf(e.ref.current) - t.indexOf(n.ref.current));
		}, [n.collectionRef, n.itemMap]);
	}
	return [
		{
			Provider: o,
			Slot: l,
			ItemSlot: m
		},
		h,
		r
	];
}
//#endregion
//#region node_modules/@radix-ui/react-menu/node_modules/@radix-ui/react-direction/dist/index.mjs
var Ih = u.createContext(void 0);
function Lh(e) {
	let t = u.useContext(Ih);
	return e || t || "ltr";
}
//#endregion
//#region node_modules/@radix-ui/react-menu/node_modules/@radix-ui/react-use-layout-effect/dist/index.mjs
var Rh = globalThis?.document ? u.useLayoutEffect : () => {}, zh = u.useId || (() => void 0), Bh = 0;
function Vh(e) {
	let [t, n] = u.useState(zh());
	return Rh(() => {
		e || n((e) => e ?? String(Bh++));
	}, [e]), e || (t ? `radix-${t}` : "");
}
//#endregion
//#region node_modules/@radix-ui/react-menu/node_modules/@radix-ui/react-presence/dist/index.mjs
function Hh(e, t) {
	return u.useReducer((e, n) => t[e][n] ?? e, e);
}
var Uh = (e) => {
	let { present: t, children: n } = e, r = Wh(t), i = typeof n == "function" ? n({ present: r.isPresent }) : u.Children.only(n), a = Oh(r.ref, Kh(i));
	return typeof n == "function" || r.isPresent ? u.cloneElement(i, { ref: a }) : null;
};
Uh.displayName = "Presence";
function Wh(e) {
	let [t, n] = u.useState(), r = u.useRef(null), i = u.useRef(e), a = u.useRef("none"), [o, s] = Hh(e ? "mounted" : "unmounted", {
		mounted: {
			UNMOUNT: "unmounted",
			ANIMATION_OUT: "unmountSuspended"
		},
		unmountSuspended: {
			MOUNT: "mounted",
			ANIMATION_END: "unmounted"
		},
		unmounted: { MOUNT: "mounted" }
	});
	return u.useEffect(() => {
		let e = Gh(r.current);
		a.current = o === "mounted" ? e : "none";
	}, [o]), Rh(() => {
		let t = r.current, n = i.current;
		if (n !== e) {
			let r = a.current, o = Gh(t);
			e ? s("MOUNT") : o === "none" || t?.display === "none" ? s("UNMOUNT") : s(n && r !== o ? "ANIMATION_OUT" : "UNMOUNT"), i.current = e;
		}
	}, [e, s]), Rh(() => {
		if (t) {
			let e, n = t.ownerDocument.defaultView ?? window, o = (a) => {
				let o = Gh(r.current).includes(a.animationName);
				if (a.target === t && o && (s("ANIMATION_END"), !i.current)) {
					let r = t.style.animationFillMode;
					t.style.animationFillMode = "forwards", e = n.setTimeout(() => {
						t.style.animationFillMode === "forwards" && (t.style.animationFillMode = r);
					});
				}
			}, c = (e) => {
				e.target === t && (a.current = Gh(r.current));
			};
			return t.addEventListener("animationstart", c), t.addEventListener("animationcancel", o), t.addEventListener("animationend", o), () => {
				n.clearTimeout(e), t.removeEventListener("animationstart", c), t.removeEventListener("animationcancel", o), t.removeEventListener("animationend", o);
			};
		} else s("ANIMATION_END");
	}, [t, s]), {
		isPresent: ["mounted", "unmountSuspended"].includes(o),
		ref: u.useCallback((e) => {
			r.current = e ? getComputedStyle(e) : null, n(e);
		}, [])
	};
}
function Gh(e) {
	return e?.animationName || "none";
}
function Kh(e) {
	let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
	return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
//#endregion
//#region node_modules/@radix-ui/react-menu/node_modules/@radix-ui/react-primitive/dist/index.mjs
var qh = [
	"a",
	"button",
	"div",
	"form",
	"h2",
	"h3",
	"img",
	"input",
	"label",
	"li",
	"nav",
	"ol",
	"p",
	"select",
	"span",
	"svg",
	"ul"
].reduce((e, t) => {
	let n = /* @__PURE__ */ kh(`Primitive.${t}`), r = u.forwardRef((e, r) => {
		let { asChild: i, ...a } = e, o = i ? n : t;
		return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ (0, L.jsx)(o, {
			...a,
			ref: r
		});
	});
	return r.displayName = `Primitive.${t}`, {
		...e,
		[t]: r
	};
}, {});
function Jh(e, t) {
	e && d.flushSync(() => e.dispatchEvent(t));
}
//#endregion
//#region node_modules/@radix-ui/react-menu/node_modules/@radix-ui/react-use-callback-ref/dist/index.mjs
function Yh(e) {
	let t = u.useRef(e);
	return u.useEffect(() => {
		t.current = e;
	}), u.useMemo(() => (...e) => t.current?.(...e), []);
}
//#endregion
//#region node_modules/@radix-ui/react-menu/node_modules/@radix-ui/react-use-controllable-state/dist/index.mjs
var Xh = u.useInsertionEffect || Rh;
function Zh({ prop: e, defaultProp: t, onChange: n = () => {}, caller: r }) {
	let [i, a, o] = Qh({
		defaultProp: t,
		onChange: n
	}), s = e !== void 0, c = s ? e : i;
	{
		let t = u.useRef(e !== void 0);
		u.useEffect(() => {
			let e = t.current;
			e !== s && console.warn(`${r} is changing from ${e ? "controlled" : "uncontrolled"} to ${s ? "controlled" : "uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`), t.current = s;
		}, [s, r]);
	}
	return [c, u.useCallback((t) => {
		if (s) {
			let n = $h(t) ? t(e) : t;
			n !== e && o.current?.(n);
		} else a(t);
	}, [
		s,
		e,
		a,
		o
	])];
}
function Qh({ defaultProp: e, onChange: t }) {
	let [n, r] = u.useState(e), i = u.useRef(n), a = u.useRef(t);
	return Xh(() => {
		a.current = t;
	}, [t]), u.useEffect(() => {
		i.current !== n && (a.current?.(n), i.current = n);
	}, [n, i]), [
		n,
		r,
		a
	];
}
function $h(e) {
	return typeof e == "function";
}
//#endregion
//#region node_modules/@radix-ui/react-menu/node_modules/@radix-ui/react-roving-focus/dist/index.mjs
var eg = "rovingFocusGroup.onEntryFocus", tg = {
	bubbles: !1,
	cancelable: !0
}, ng = "RovingFocusGroup", [rg, ig, ag] = Fh(ng), [og, sg] = wh(ng, [ag]), [cg, lg] = og(ng), ug = u.forwardRef((e, t) => /* @__PURE__ */ (0, L.jsx)(rg.Provider, {
	scope: e.__scopeRovingFocusGroup,
	children: /* @__PURE__ */ (0, L.jsx)(rg.Slot, {
		scope: e.__scopeRovingFocusGroup,
		children: /* @__PURE__ */ (0, L.jsx)(dg, {
			...e,
			ref: t
		})
	})
}));
ug.displayName = ng;
var dg = u.forwardRef((e, t) => {
	let { __scopeRovingFocusGroup: n, orientation: r, loop: i = !1, dir: a, currentTabStopId: o, defaultCurrentTabStopId: s, onCurrentTabStopIdChange: c, onEntryFocus: l, preventScrollOnEntryFocus: d = !1, ...f } = e, p = u.useRef(null), m = Oh(t, p), h = Lh(a), [g, _] = Zh({
		prop: o,
		defaultProp: s ?? null,
		onChange: c,
		caller: ng
	}), [v, y] = u.useState(!1), b = Yh(l), x = ig(n), S = u.useRef(!1), [C, w] = u.useState(0);
	return u.useEffect(() => {
		let e = p.current;
		if (e) return e.addEventListener(eg, b), () => e.removeEventListener(eg, b);
	}, [b]), /* @__PURE__ */ (0, L.jsx)(cg, {
		scope: n,
		orientation: r,
		dir: h,
		loop: i,
		currentTabStopId: g,
		onItemFocus: u.useCallback((e) => _(e), [_]),
		onItemShiftTab: u.useCallback(() => y(!0), []),
		onFocusableItemAdd: u.useCallback(() => w((e) => e + 1), []),
		onFocusableItemRemove: u.useCallback(() => w((e) => e - 1), []),
		children: /* @__PURE__ */ (0, L.jsx)(qh.div, {
			tabIndex: v || C === 0 ? -1 : 0,
			"data-orientation": r,
			...f,
			ref: m,
			style: {
				outline: "none",
				...e.style
			},
			onMouseDown: Ch(e.onMouseDown, () => {
				S.current = !0;
			}),
			onFocus: Ch(e.onFocus, (e) => {
				let t = !S.current;
				if (e.target === e.currentTarget && t && !v) {
					let t = new CustomEvent(eg, tg);
					if (e.currentTarget.dispatchEvent(t), !t.defaultPrevented) {
						let e = x().filter((e) => e.focusable);
						_g([
							e.find((e) => e.active),
							e.find((e) => e.id === g),
							...e
						].filter(Boolean).map((e) => e.ref.current), d);
					}
				}
				S.current = !1;
			}),
			onBlur: Ch(e.onBlur, () => y(!1))
		})
	});
}), fg = "RovingFocusGroupItem", pg = u.forwardRef((e, t) => {
	let { __scopeRovingFocusGroup: n, focusable: r = !0, active: i = !1, tabStopId: a, children: o, ...s } = e, c = Vh(), l = a || c, d = lg(fg, n), f = d.currentTabStopId === l, p = ig(n), { onFocusableItemAdd: m, onFocusableItemRemove: h, currentTabStopId: g } = d;
	return u.useEffect(() => {
		if (r) return m(), () => h();
	}, [
		r,
		m,
		h
	]), /* @__PURE__ */ (0, L.jsx)(rg.ItemSlot, {
		scope: n,
		id: l,
		focusable: r,
		active: i,
		children: /* @__PURE__ */ (0, L.jsx)(qh.span, {
			tabIndex: f ? 0 : -1,
			"data-orientation": d.orientation,
			...s,
			ref: t,
			onMouseDown: Ch(e.onMouseDown, (e) => {
				r ? d.onItemFocus(l) : e.preventDefault();
			}),
			onFocus: Ch(e.onFocus, () => d.onItemFocus(l)),
			onKeyDown: Ch(e.onKeyDown, (e) => {
				if (e.key === "Tab" && e.shiftKey) {
					d.onItemShiftTab();
					return;
				}
				if (e.target !== e.currentTarget) return;
				let t = gg(e, d.orientation, d.dir);
				if (t !== void 0) {
					if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) return;
					e.preventDefault();
					let n = p().filter((e) => e.focusable).map((e) => e.ref.current);
					if (t === "last") n.reverse();
					else if (t === "prev" || t === "next") {
						t === "prev" && n.reverse();
						let r = n.indexOf(e.currentTarget);
						n = d.loop ? vg(n, r + 1) : n.slice(r + 1);
					}
					setTimeout(() => _g(n));
				}
			}),
			children: typeof o == "function" ? o({
				isCurrentTabStop: f,
				hasTabStop: g != null
			}) : o
		})
	});
});
pg.displayName = fg;
var mg = {
	ArrowLeft: "prev",
	ArrowUp: "prev",
	ArrowRight: "next",
	ArrowDown: "next",
	PageUp: "first",
	Home: "first",
	PageDown: "last",
	End: "last"
};
function hg(e, t) {
	return t === "rtl" ? e === "ArrowLeft" ? "ArrowRight" : e === "ArrowRight" ? "ArrowLeft" : e : e;
}
function gg(e, t, n) {
	let r = hg(e.key, n);
	if (!(t === "vertical" && ["ArrowLeft", "ArrowRight"].includes(r)) && !(t === "horizontal" && ["ArrowUp", "ArrowDown"].includes(r))) return mg[r];
}
function _g(e, t = !1) {
	let n = document.activeElement;
	for (let r of e) if (r === n || (r.focus({ preventScroll: t }), document.activeElement !== n)) return;
}
function vg(e, t) {
	return e.map((n, r) => e[(t + r) % e.length]);
}
var yg = ug, bg = pg, xg = ["Enter", " "], Sg = [
	"ArrowDown",
	"PageUp",
	"Home"
], Cg = [
	"ArrowUp",
	"PageDown",
	"End"
], wg = [...Sg, ...Cg], Tg = {
	ltr: [...xg, "ArrowRight"],
	rtl: [...xg, "ArrowLeft"]
}, Eg = {
	ltr: ["ArrowLeft"],
	rtl: ["ArrowRight"]
}, Dg = "Menu", [Og, kg, Ag] = Fh(Dg), [jg, Mg] = wh(Dg, [
	Ag,
	fo,
	sg
]), Ng = fo(), Pg = sg(), [Fg, Ig] = jg(Dg), [Lg, Rg] = jg(Dg), zg = (e) => {
	let { __scopeMenu: t, open: n = !1, children: r, dir: i, onOpenChange: a, modal: o = !0 } = e, s = Ng(t), [c, l] = u.useState(null), d = u.useRef(!1), f = Yh(a), p = Lh(i);
	return u.useEffect(() => {
		let e = () => {
			d.current = !0, document.addEventListener("pointerdown", t, {
				capture: !0,
				once: !0
			}), document.addEventListener("pointermove", t, {
				capture: !0,
				once: !0
			});
		}, t = () => d.current = !1;
		return document.addEventListener("keydown", e, { capture: !0 }), () => {
			document.removeEventListener("keydown", e, { capture: !0 }), document.removeEventListener("pointerdown", t, { capture: !0 }), document.removeEventListener("pointermove", t, { capture: !0 });
		};
	}, []), /* @__PURE__ */ (0, L.jsx)(Oo, {
		...s,
		children: /* @__PURE__ */ (0, L.jsx)(Fg, {
			scope: t,
			open: n,
			onOpenChange: f,
			content: c,
			onContentChange: l,
			children: /* @__PURE__ */ (0, L.jsx)(Lg, {
				scope: t,
				onClose: u.useCallback(() => f(!1), [f]),
				isUsingKeyboardRef: d,
				dir: p,
				modal: o,
				children: r
			})
		})
	});
};
zg.displayName = Dg;
var Bg = "MenuAnchor", Vg = u.forwardRef((e, t) => {
	let { __scopeMenu: n, ...r } = e, i = Ng(n);
	return /* @__PURE__ */ (0, L.jsx)(ko, {
		...i,
		...r,
		ref: t
	});
});
Vg.displayName = Bg;
var Hg = "MenuPortal", [Ug, Wg] = jg(Hg, { forceMount: void 0 }), Gg = (e) => {
	let { __scopeMenu: t, forceMount: n, children: r, container: i } = e, a = Ig(Hg, t);
	return /* @__PURE__ */ (0, L.jsx)(Ug, {
		scope: t,
		forceMount: n,
		children: /* @__PURE__ */ (0, L.jsx)(Uh, {
			present: n || a.open,
			children: /* @__PURE__ */ (0, L.jsx)(Uo, {
				asChild: !0,
				container: i,
				children: r
			})
		})
	});
};
Gg.displayName = Hg;
var Kg = "MenuContent", [qg, Jg] = jg(Kg), Yg = u.forwardRef((e, t) => {
	let n = Wg(Kg, e.__scopeMenu), { forceMount: r = n.forceMount, ...i } = e, a = Ig(Kg, e.__scopeMenu), o = Rg(Kg, e.__scopeMenu);
	return /* @__PURE__ */ (0, L.jsx)(Og.Provider, {
		scope: e.__scopeMenu,
		children: /* @__PURE__ */ (0, L.jsx)(Uh, {
			present: r || a.open,
			children: /* @__PURE__ */ (0, L.jsx)(Og.Slot, {
				scope: e.__scopeMenu,
				children: o.modal ? /* @__PURE__ */ (0, L.jsx)(Xg, {
					...i,
					ref: t
				}) : /* @__PURE__ */ (0, L.jsx)(Zg, {
					...i,
					ref: t
				})
			})
		})
	});
}), Xg = u.forwardRef((e, t) => {
	let n = Ig(Kg, e.__scopeMenu), r = u.useRef(null), i = Oh(t, r);
	return u.useEffect(() => {
		let e = r.current;
		if (e) return _s(e);
	}, []), /* @__PURE__ */ (0, L.jsx)($g, {
		...e,
		ref: i,
		trapFocus: n.open,
		disableOutsidePointerEvents: n.open,
		disableOutsideScroll: !0,
		onFocusOutside: Ch(e.onFocusOutside, (e) => e.preventDefault(), { checkForDefaultPrevented: !1 }),
		onDismiss: () => n.onOpenChange(!1)
	});
}), Zg = u.forwardRef((e, t) => {
	let n = Ig(Kg, e.__scopeMenu);
	return /* @__PURE__ */ (0, L.jsx)($g, {
		...e,
		ref: t,
		trapFocus: !1,
		disableOutsidePointerEvents: !1,
		disableOutsideScroll: !1,
		onDismiss: () => n.onOpenChange(!1)
	});
}), Qg = /* @__PURE__ */ kh("MenuContent.ScrollLock"), $g = u.forwardRef((e, t) => {
	let { __scopeMenu: n, loop: r = !1, trapFocus: i, onOpenAutoFocus: a, onCloseAutoFocus: o, disableOutsidePointerEvents: s, onEntryFocus: c, onEscapeKeyDown: l, onPointerDownOutside: d, onFocusOutside: f, onInteractOutside: p, onDismiss: m, disableOutsideScroll: h, ...g } = e, _ = Ig(Kg, n), v = Rg(Kg, n), y = Ng(n), b = Pg(n), x = kg(n), [S, C] = u.useState(null), w = u.useRef(null), T = Oh(t, w, _.onContentChange), E = u.useRef(0), D = u.useRef(""), O = u.useRef(0), k = u.useRef(null), A = u.useRef("right"), j = u.useRef(0), M = h ? Ec : u.Fragment, N = h ? {
		as: Qg,
		allowPinchZoom: !0
	} : void 0, P = (e) => {
		let t = D.current + e, n = x().filter((e) => !e.disabled), r = document.activeElement, i = n.find((e) => e.ref.current === r)?.textValue, a = L_(n.map((e) => e.textValue), t, i), o = n.find((e) => e.textValue === a)?.ref.current;
		(function e(t) {
			D.current = t, window.clearTimeout(E.current), t !== "" && (E.current = window.setTimeout(() => e(""), 1e3));
		})(t), o && setTimeout(() => o.focus());
	};
	u.useEffect(() => () => window.clearTimeout(E.current), []), rr();
	let F = u.useCallback((e) => A.current === k.current?.side && z_(e, k.current?.area), []);
	return /* @__PURE__ */ (0, L.jsx)(qg, {
		scope: n,
		searchRef: D,
		onItemEnter: u.useCallback((e) => {
			F(e) && e.preventDefault();
		}, [F]),
		onItemLeave: u.useCallback((e) => {
			F(e) || (w.current?.focus(), C(null));
		}, [F]),
		onTriggerLeave: u.useCallback((e) => {
			F(e) && e.preventDefault();
		}, [F]),
		pointerGraceTimerRef: O,
		onPointerGraceIntentChange: u.useCallback((e) => {
			k.current = e;
		}, []),
		children: /* @__PURE__ */ (0, L.jsx)(M, {
			...N,
			children: /* @__PURE__ */ (0, L.jsx)(br, {
				asChild: !0,
				trapped: i,
				onMountAutoFocus: Ch(a, (e) => {
					e.preventDefault(), w.current?.focus({ preventScroll: !0 });
				}),
				onUnmountAutoFocus: o,
				children: /* @__PURE__ */ (0, L.jsx)(Yn, {
					asChild: !0,
					disableOutsidePointerEvents: s,
					onEscapeKeyDown: l,
					onPointerDownOutside: d,
					onFocusOutside: f,
					onInteractOutside: p,
					onDismiss: m,
					children: /* @__PURE__ */ (0, L.jsx)(yg, {
						asChild: !0,
						...b,
						dir: v.dir,
						orientation: "vertical",
						loop: r,
						currentTabStopId: S,
						onCurrentTabStopIdChange: C,
						onEntryFocus: Ch(c, (e) => {
							v.isUsingKeyboardRef.current || e.preventDefault();
						}),
						preventScrollOnEntryFocus: !0,
						children: /* @__PURE__ */ (0, L.jsx)(Ao, {
							role: "menu",
							"aria-orientation": "vertical",
							"data-state": M_(_.open),
							"data-radix-menu-content": "",
							dir: v.dir,
							...y,
							...g,
							ref: T,
							style: {
								outline: "none",
								...g.style
							},
							onKeyDown: Ch(g.onKeyDown, (e) => {
								let t = e.target.closest("[data-radix-menu-content]") === e.currentTarget, n = e.ctrlKey || e.altKey || e.metaKey, r = e.key.length === 1;
								t && (e.key === "Tab" && e.preventDefault(), !n && r && P(e.key));
								let i = w.current;
								if (e.target !== i || !wg.includes(e.key)) return;
								e.preventDefault();
								let a = x().filter((e) => !e.disabled).map((e) => e.ref.current);
								Cg.includes(e.key) && a.reverse(), F_(a);
							}),
							onBlur: Ch(e.onBlur, (e) => {
								e.currentTarget.contains(e.target) || (window.clearTimeout(E.current), D.current = "");
							}),
							onPointerMove: Ch(e.onPointerMove, B_((e) => {
								let t = e.target, n = j.current !== e.clientX;
								e.currentTarget.contains(t) && n && (A.current = e.clientX > j.current ? "right" : "left", j.current = e.clientX);
							}))
						})
					})
				})
			})
		})
	});
});
Yg.displayName = Kg;
var e_ = "MenuGroup", t_ = u.forwardRef((e, t) => {
	let { __scopeMenu: n, ...r } = e;
	return /* @__PURE__ */ (0, L.jsx)(qh.div, {
		role: "group",
		...r,
		ref: t
	});
});
t_.displayName = e_;
var n_ = "MenuLabel", r_ = u.forwardRef((e, t) => {
	let { __scopeMenu: n, ...r } = e;
	return /* @__PURE__ */ (0, L.jsx)(qh.div, {
		...r,
		ref: t
	});
});
r_.displayName = n_;
var i_ = "MenuItem", a_ = "menu.itemSelect", o_ = u.forwardRef((e, t) => {
	let { disabled: n = !1, onSelect: r, ...i } = e, a = u.useRef(null), o = Rg(i_, e.__scopeMenu), s = Jg(i_, e.__scopeMenu), c = Oh(t, a), l = u.useRef(!1), d = () => {
		let e = a.current;
		if (!n && e) {
			let t = new CustomEvent(a_, {
				bubbles: !0,
				cancelable: !0
			});
			e.addEventListener(a_, (e) => r?.(e), { once: !0 }), Jh(e, t), t.defaultPrevented ? l.current = !1 : o.onClose();
		}
	};
	return /* @__PURE__ */ (0, L.jsx)(s_, {
		...i,
		ref: c,
		disabled: n,
		onClick: Ch(e.onClick, d),
		onPointerDown: (t) => {
			e.onPointerDown?.(t), l.current = !0;
		},
		onPointerUp: Ch(e.onPointerUp, (e) => {
			l.current || e.currentTarget?.click();
		}),
		onKeyDown: Ch(e.onKeyDown, (e) => {
			let t = s.searchRef.current !== "";
			n || t && e.key === " " || xg.includes(e.key) && (e.currentTarget.click(), e.preventDefault());
		})
	});
});
o_.displayName = i_;
var s_ = u.forwardRef((e, t) => {
	let { __scopeMenu: n, disabled: r = !1, textValue: i, ...a } = e, o = Jg(i_, n), s = Pg(n), c = u.useRef(null), l = Oh(t, c), [d, f] = u.useState(!1), [p, m] = u.useState("");
	return u.useEffect(() => {
		let e = c.current;
		e && m((e.textContent ?? "").trim());
	}, [a.children]), /* @__PURE__ */ (0, L.jsx)(Og.ItemSlot, {
		scope: n,
		disabled: r,
		textValue: i ?? p,
		children: /* @__PURE__ */ (0, L.jsx)(bg, {
			asChild: !0,
			...s,
			focusable: !r,
			children: /* @__PURE__ */ (0, L.jsx)(qh.div, {
				role: "menuitem",
				"data-highlighted": d ? "" : void 0,
				"aria-disabled": r || void 0,
				"data-disabled": r ? "" : void 0,
				...a,
				ref: l,
				onPointerMove: Ch(e.onPointerMove, B_((e) => {
					r ? o.onItemLeave(e) : (o.onItemEnter(e), e.defaultPrevented || e.currentTarget.focus({ preventScroll: !0 }));
				})),
				onPointerLeave: Ch(e.onPointerLeave, B_((e) => o.onItemLeave(e))),
				onFocus: Ch(e.onFocus, () => f(!0)),
				onBlur: Ch(e.onBlur, () => f(!1))
			})
		})
	});
}), c_ = "MenuCheckboxItem", l_ = u.forwardRef((e, t) => {
	let { checked: n = !1, onCheckedChange: r, ...i } = e;
	return /* @__PURE__ */ (0, L.jsx)(__, {
		scope: e.__scopeMenu,
		checked: n,
		children: /* @__PURE__ */ (0, L.jsx)(o_, {
			role: "menuitemcheckbox",
			"aria-checked": N_(n) ? "mixed" : n,
			...i,
			ref: t,
			"data-state": P_(n),
			onSelect: Ch(i.onSelect, () => r?.(N_(n) ? !0 : !n), { checkForDefaultPrevented: !1 })
		})
	});
});
l_.displayName = c_;
var u_ = "MenuRadioGroup", [d_, f_] = jg(u_, {
	value: void 0,
	onValueChange: () => {}
}), p_ = u.forwardRef((e, t) => {
	let { value: n, onValueChange: r, ...i } = e, a = Yh(r);
	return /* @__PURE__ */ (0, L.jsx)(d_, {
		scope: e.__scopeMenu,
		value: n,
		onValueChange: a,
		children: /* @__PURE__ */ (0, L.jsx)(t_, {
			...i,
			ref: t
		})
	});
});
p_.displayName = u_;
var m_ = "MenuRadioItem", h_ = u.forwardRef((e, t) => {
	let { value: n, ...r } = e, i = f_(m_, e.__scopeMenu), a = n === i.value;
	return /* @__PURE__ */ (0, L.jsx)(__, {
		scope: e.__scopeMenu,
		checked: a,
		children: /* @__PURE__ */ (0, L.jsx)(o_, {
			role: "menuitemradio",
			"aria-checked": a,
			...r,
			ref: t,
			"data-state": P_(a),
			onSelect: Ch(r.onSelect, () => i.onValueChange?.(n), { checkForDefaultPrevented: !1 })
		})
	});
});
h_.displayName = m_;
var g_ = "MenuItemIndicator", [__, v_] = jg(g_, { checked: !1 }), y_ = u.forwardRef((e, t) => {
	let { __scopeMenu: n, forceMount: r, ...i } = e, a = v_(g_, n);
	return /* @__PURE__ */ (0, L.jsx)(Uh, {
		present: r || N_(a.checked) || a.checked === !0,
		children: /* @__PURE__ */ (0, L.jsx)(qh.span, {
			...i,
			ref: t,
			"data-state": P_(a.checked)
		})
	});
});
y_.displayName = g_;
var b_ = "MenuSeparator", x_ = u.forwardRef((e, t) => {
	let { __scopeMenu: n, ...r } = e;
	return /* @__PURE__ */ (0, L.jsx)(qh.div, {
		role: "separator",
		"aria-orientation": "horizontal",
		...r,
		ref: t
	});
});
x_.displayName = b_;
var S_ = "MenuArrow", C_ = u.forwardRef((e, t) => {
	let { __scopeMenu: n, ...r } = e, i = Ng(n);
	return /* @__PURE__ */ (0, L.jsx)(jo, {
		...i,
		...r,
		ref: t
	});
});
C_.displayName = S_;
var w_ = "MenuSub", [T_, E_] = jg(w_), D_ = (e) => {
	let { __scopeMenu: t, children: n, open: r = !1, onOpenChange: i } = e, a = Ig(w_, t), o = Ng(t), [s, c] = u.useState(null), [l, d] = u.useState(null), f = Yh(i);
	return u.useEffect(() => (a.open === !1 && f(!1), () => f(!1)), [a.open, f]), /* @__PURE__ */ (0, L.jsx)(Oo, {
		...o,
		children: /* @__PURE__ */ (0, L.jsx)(Fg, {
			scope: t,
			open: r,
			onOpenChange: f,
			content: l,
			onContentChange: d,
			children: /* @__PURE__ */ (0, L.jsx)(T_, {
				scope: t,
				contentId: Vh(),
				triggerId: Vh(),
				trigger: s,
				onTriggerChange: c,
				children: n
			})
		})
	});
};
D_.displayName = w_;
var O_ = "MenuSubTrigger", k_ = u.forwardRef((e, t) => {
	let n = Ig(O_, e.__scopeMenu), r = Rg(O_, e.__scopeMenu), i = E_(O_, e.__scopeMenu), a = Jg(O_, e.__scopeMenu), o = u.useRef(null), { pointerGraceTimerRef: s, onPointerGraceIntentChange: c } = a, l = { __scopeMenu: e.__scopeMenu }, d = u.useCallback(() => {
		o.current && window.clearTimeout(o.current), o.current = null;
	}, []);
	return u.useEffect(() => d, [d]), u.useEffect(() => {
		let e = s.current;
		return () => {
			window.clearTimeout(e), c(null);
		};
	}, [s, c]), /* @__PURE__ */ (0, L.jsx)(Vg, {
		asChild: !0,
		...l,
		children: /* @__PURE__ */ (0, L.jsx)(s_, {
			id: i.triggerId,
			"aria-haspopup": "menu",
			"aria-expanded": n.open,
			"aria-controls": i.contentId,
			"data-state": M_(n.open),
			...e,
			ref: Dh(t, i.onTriggerChange),
			onClick: (t) => {
				e.onClick?.(t), !(e.disabled || t.defaultPrevented) && (t.currentTarget.focus(), n.open || n.onOpenChange(!0));
			},
			onPointerMove: Ch(e.onPointerMove, B_((t) => {
				a.onItemEnter(t), !t.defaultPrevented && !e.disabled && !n.open && !o.current && (a.onPointerGraceIntentChange(null), o.current = window.setTimeout(() => {
					n.onOpenChange(!0), d();
				}, 100));
			})),
			onPointerLeave: Ch(e.onPointerLeave, B_((e) => {
				d();
				let t = n.content?.getBoundingClientRect();
				if (t) {
					let r = n.content?.dataset.side, i = r === "right", o = i ? -5 : 5, c = t[i ? "left" : "right"], l = t[i ? "right" : "left"];
					a.onPointerGraceIntentChange({
						area: [
							{
								x: e.clientX + o,
								y: e.clientY
							},
							{
								x: c,
								y: t.top
							},
							{
								x: l,
								y: t.top
							},
							{
								x: l,
								y: t.bottom
							},
							{
								x: c,
								y: t.bottom
							}
						],
						side: r
					}), window.clearTimeout(s.current), s.current = window.setTimeout(() => a.onPointerGraceIntentChange(null), 300);
				} else {
					if (a.onTriggerLeave(e), e.defaultPrevented) return;
					a.onPointerGraceIntentChange(null);
				}
			})),
			onKeyDown: Ch(e.onKeyDown, (t) => {
				let i = a.searchRef.current !== "";
				e.disabled || i && t.key === " " || Tg[r.dir].includes(t.key) && (n.onOpenChange(!0), n.content?.focus(), t.preventDefault());
			})
		})
	});
});
k_.displayName = O_;
var A_ = "MenuSubContent", j_ = u.forwardRef((e, t) => {
	let n = Wg(Kg, e.__scopeMenu), { forceMount: r = n.forceMount, ...i } = e, a = Ig(Kg, e.__scopeMenu), o = Rg(Kg, e.__scopeMenu), s = E_(A_, e.__scopeMenu), c = u.useRef(null), l = Oh(t, c);
	return /* @__PURE__ */ (0, L.jsx)(Og.Provider, {
		scope: e.__scopeMenu,
		children: /* @__PURE__ */ (0, L.jsx)(Uh, {
			present: r || a.open,
			children: /* @__PURE__ */ (0, L.jsx)(Og.Slot, {
				scope: e.__scopeMenu,
				children: /* @__PURE__ */ (0, L.jsx)($g, {
					id: s.contentId,
					"aria-labelledby": s.triggerId,
					...i,
					ref: l,
					align: "start",
					side: o.dir === "rtl" ? "left" : "right",
					disableOutsidePointerEvents: !1,
					disableOutsideScroll: !1,
					trapFocus: !1,
					onOpenAutoFocus: (e) => {
						o.isUsingKeyboardRef.current && c.current?.focus(), e.preventDefault();
					},
					onCloseAutoFocus: (e) => e.preventDefault(),
					onFocusOutside: Ch(e.onFocusOutside, (e) => {
						e.target !== s.trigger && a.onOpenChange(!1);
					}),
					onEscapeKeyDown: Ch(e.onEscapeKeyDown, (e) => {
						o.onClose(), e.preventDefault();
					}),
					onKeyDown: Ch(e.onKeyDown, (e) => {
						let t = e.currentTarget.contains(e.target), n = Eg[o.dir].includes(e.key);
						t && n && (a.onOpenChange(!1), s.trigger?.focus(), e.preventDefault());
					})
				})
			})
		})
	});
});
j_.displayName = A_;
function M_(e) {
	return e ? "open" : "closed";
}
function N_(e) {
	return e === "indeterminate";
}
function P_(e) {
	return N_(e) ? "indeterminate" : e ? "checked" : "unchecked";
}
function F_(e) {
	let t = document.activeElement;
	for (let n of e) if (n === t || (n.focus(), document.activeElement !== t)) return;
}
function I_(e, t) {
	return e.map((n, r) => e[(t + r) % e.length]);
}
function L_(e, t, n) {
	let r = t.length > 1 && Array.from(t).every((e) => e === t[0]) ? t[0] : t, i = n ? e.indexOf(n) : -1, a = I_(e, Math.max(i, 0));
	r.length === 1 && (a = a.filter((e) => e !== n));
	let o = a.find((e) => e.toLowerCase().startsWith(r.toLowerCase()));
	return o === n ? void 0 : o;
}
function R_(e, t) {
	let { x: n, y: r } = e, i = !1;
	for (let e = 0, a = t.length - 1; e < t.length; a = e++) {
		let o = t[e], s = t[a], c = o.x, l = o.y, u = s.x, d = s.y;
		l > r != d > r && n < (u - c) * (r - l) / (d - l) + c && (i = !i);
	}
	return i;
}
function z_(e, t) {
	return t ? R_({
		x: e.clientX,
		y: e.clientY
	}, t) : !1;
}
function B_(e) {
	return (t) => t.pointerType === "mouse" ? e(t) : void 0;
}
var V_ = zg, H_ = Vg, U_ = Gg, W_ = Yg, G_ = t_, K_ = r_, q_ = o_, J_ = l_, Y_ = p_, X_ = h_, Z_ = y_, Q_ = x_, $_ = C_, ev = k_, tv = j_, nv = u.useId || (() => void 0), rv = 0;
function iv(e) {
	let [t, n] = u.useState(nv());
	return dh(() => {
		e || n((e) => e ?? String(rv++));
	}, [e]), e || (t ? `radix-${t}` : "");
}
//#endregion
//#region node_modules/@radix-ui/react-dropdown-menu/dist/index.mjs
var av = "DropdownMenu", [ov, sv] = lh(av, [Mg]), cv = Mg(), [lv, uv] = ov(av), dv = (e) => {
	let { __scopeDropdownMenu: t, children: n, dir: r, open: i, defaultOpen: a, onOpenChange: o, modal: s = !0 } = e, c = cv(t), l = u.useRef(null), [d, f] = ph({
		prop: i,
		defaultProp: a ?? !1,
		onChange: o,
		caller: av
	});
	return /* @__PURE__ */ (0, L.jsx)(lv, {
		scope: t,
		triggerId: iv(),
		triggerRef: l,
		contentId: iv(),
		open: d,
		onOpenChange: f,
		onOpenToggle: u.useCallback(() => f((e) => !e), [f]),
		modal: s,
		children: /* @__PURE__ */ (0, L.jsx)(V_, {
			...c,
			open: d,
			onOpenChange: f,
			dir: r,
			modal: s,
			children: n
		})
	});
};
dv.displayName = av;
var fv = "DropdownMenuTrigger", pv = u.forwardRef((e, t) => {
	let { __scopeDropdownMenu: n, disabled: r = !1, ...i } = e, a = uv(fv, n), o = cv(n);
	return /* @__PURE__ */ (0, L.jsx)(H_, {
		asChild: !0,
		...o,
		children: /* @__PURE__ */ (0, L.jsx)(Sh.button, {
			type: "button",
			id: a.triggerId,
			"aria-haspopup": "menu",
			"aria-expanded": a.open,
			"aria-controls": a.open ? a.contentId : void 0,
			"data-state": a.open ? "open" : "closed",
			"data-disabled": r ? "" : void 0,
			disabled: r,
			...i,
			ref: ch(t, a.triggerRef),
			onPointerDown: oh(e.onPointerDown, (e) => {
				!r && e.button === 0 && e.ctrlKey === !1 && (a.onOpenToggle(), a.open || e.preventDefault());
			}),
			onKeyDown: oh(e.onKeyDown, (e) => {
				r || (["Enter", " "].includes(e.key) && a.onOpenToggle(), e.key === "ArrowDown" && a.onOpenChange(!0), [
					"Enter",
					" ",
					"ArrowDown"
				].includes(e.key) && e.preventDefault());
			})
		})
	});
});
pv.displayName = fv;
var mv = "DropdownMenuPortal", hv = (e) => {
	let { __scopeDropdownMenu: t, ...n } = e, r = cv(t);
	return /* @__PURE__ */ (0, L.jsx)(U_, {
		...r,
		...n
	});
};
hv.displayName = mv;
var gv = "DropdownMenuContent", _v = u.forwardRef((e, t) => {
	let { __scopeDropdownMenu: n, ...r } = e, i = uv(gv, n), a = cv(n), o = u.useRef(!1);
	return /* @__PURE__ */ (0, L.jsx)(W_, {
		id: i.contentId,
		"aria-labelledby": i.triggerId,
		...a,
		...r,
		ref: t,
		onCloseAutoFocus: oh(e.onCloseAutoFocus, (e) => {
			o.current || i.triggerRef.current?.focus(), o.current = !1, e.preventDefault();
		}),
		onInteractOutside: oh(e.onInteractOutside, (e) => {
			let t = e.detail.originalEvent, n = t.button === 0 && t.ctrlKey === !0, r = t.button === 2 || n;
			(!i.modal || r) && (o.current = !0);
		}),
		style: {
			...e.style,
			"--radix-dropdown-menu-content-transform-origin": "var(--radix-popper-transform-origin)",
			"--radix-dropdown-menu-content-available-width": "var(--radix-popper-available-width)",
			"--radix-dropdown-menu-content-available-height": "var(--radix-popper-available-height)",
			"--radix-dropdown-menu-trigger-width": "var(--radix-popper-anchor-width)",
			"--radix-dropdown-menu-trigger-height": "var(--radix-popper-anchor-height)"
		}
	});
});
_v.displayName = gv;
var vv = "DropdownMenuGroup", yv = u.forwardRef((e, t) => {
	let { __scopeDropdownMenu: n, ...r } = e, i = cv(n);
	return /* @__PURE__ */ (0, L.jsx)(G_, {
		...i,
		...r,
		ref: t
	});
});
yv.displayName = vv;
var bv = "DropdownMenuLabel", xv = u.forwardRef((e, t) => {
	let { __scopeDropdownMenu: n, ...r } = e, i = cv(n);
	return /* @__PURE__ */ (0, L.jsx)(K_, {
		...i,
		...r,
		ref: t
	});
});
xv.displayName = bv;
var Sv = "DropdownMenuItem", Cv = u.forwardRef((e, t) => {
	let { __scopeDropdownMenu: n, ...r } = e, i = cv(n);
	return /* @__PURE__ */ (0, L.jsx)(q_, {
		...i,
		...r,
		ref: t
	});
});
Cv.displayName = Sv;
var wv = "DropdownMenuCheckboxItem", Tv = u.forwardRef((e, t) => {
	let { __scopeDropdownMenu: n, ...r } = e, i = cv(n);
	return /* @__PURE__ */ (0, L.jsx)(J_, {
		...i,
		...r,
		ref: t
	});
});
Tv.displayName = wv;
var Ev = "DropdownMenuRadioGroup", Dv = u.forwardRef((e, t) => {
	let { __scopeDropdownMenu: n, ...r } = e, i = cv(n);
	return /* @__PURE__ */ (0, L.jsx)(Y_, {
		...i,
		...r,
		ref: t
	});
});
Dv.displayName = Ev;
var Ov = "DropdownMenuRadioItem", kv = u.forwardRef((e, t) => {
	let { __scopeDropdownMenu: n, ...r } = e, i = cv(n);
	return /* @__PURE__ */ (0, L.jsx)(X_, {
		...i,
		...r,
		ref: t
	});
});
kv.displayName = Ov;
var Av = "DropdownMenuItemIndicator", jv = u.forwardRef((e, t) => {
	let { __scopeDropdownMenu: n, ...r } = e, i = cv(n);
	return /* @__PURE__ */ (0, L.jsx)(Z_, {
		...i,
		...r,
		ref: t
	});
});
jv.displayName = Av;
var Mv = "DropdownMenuSeparator", Nv = u.forwardRef((e, t) => {
	let { __scopeDropdownMenu: n, ...r } = e, i = cv(n);
	return /* @__PURE__ */ (0, L.jsx)(Q_, {
		...i,
		...r,
		ref: t
	});
});
Nv.displayName = Mv;
var Pv = "DropdownMenuArrow", Fv = u.forwardRef((e, t) => {
	let { __scopeDropdownMenu: n, ...r } = e, i = cv(n);
	return /* @__PURE__ */ (0, L.jsx)($_, {
		...i,
		...r,
		ref: t
	});
});
Fv.displayName = Pv;
var Iv = "DropdownMenuSubTrigger", Lv = u.forwardRef((e, t) => {
	let { __scopeDropdownMenu: n, ...r } = e, i = cv(n);
	return /* @__PURE__ */ (0, L.jsx)(ev, {
		...i,
		...r,
		ref: t
	});
});
Lv.displayName = Iv;
var Rv = "DropdownMenuSubContent", zv = u.forwardRef((e, t) => {
	let { __scopeDropdownMenu: n, ...r } = e, i = cv(n);
	return /* @__PURE__ */ (0, L.jsx)(tv, {
		...i,
		...r,
		ref: t,
		style: {
			...e.style,
			"--radix-dropdown-menu-content-transform-origin": "var(--radix-popper-transform-origin)",
			"--radix-dropdown-menu-content-available-width": "var(--radix-popper-available-width)",
			"--radix-dropdown-menu-content-available-height": "var(--radix-popper-available-height)",
			"--radix-dropdown-menu-trigger-width": "var(--radix-popper-anchor-width)",
			"--radix-dropdown-menu-trigger-height": "var(--radix-popper-anchor-height)"
		}
	});
});
zv.displayName = Rv;
var Bv = dv, Vv = pv, Hv = hv, Uv = _v, Wv = xv, Gv = Cv, Kv = Nv;
//#endregion
//#region components/ui/dropdown-menu.tsx
function qv({ ...e }) {
	return /* @__PURE__ */ (0, L.jsx)(Bv, {
		"data-slot": "dropdown-menu",
		...e
	});
}
function Jv({ ...e }) {
	return /* @__PURE__ */ (0, L.jsx)(Vv, {
		"data-slot": "dropdown-menu-trigger",
		...e
	});
}
function Yv({ className: e, sideOffset: t = 4, ...n }) {
	return /* @__PURE__ */ (0, L.jsx)(Hv, { children: /* @__PURE__ */ (0, L.jsx)(Uv, {
		"data-slot": "dropdown-menu-content",
		sideOffset: t,
		className: H("bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md", e),
		...n
	}) });
}
function Xv({ className: e, inset: t, variant: n = "default", ...r }) {
	return /* @__PURE__ */ (0, L.jsx)(Gv, {
		"data-slot": "dropdown-menu-item",
		"data-inset": t,
		"data-variant": n,
		className: H("focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", e),
		...r
	});
}
function Zv({ className: e, inset: t, ...n }) {
	return /* @__PURE__ */ (0, L.jsx)(Wv, {
		"data-slot": "dropdown-menu-label",
		"data-inset": t,
		className: H("px-2 py-1.5 text-sm font-medium data-[inset]:pl-8", e),
		...n
	});
}
function Qv({ className: e, ...t }) {
	return /* @__PURE__ */ (0, L.jsx)(Kv, {
		"data-slot": "dropdown-menu-separator",
		className: H("bg-border -mx-1 my-1 h-px", e),
		...t
	});
}
//#endregion
//#region node_modules/@radix-ui/react-separator/node_modules/@radix-ui/react-compose-refs/dist/index.mjs
function $v(e, t) {
	if (typeof e == "function") return e(t);
	e != null && (e.current = t);
}
function ey(...e) {
	return (t) => {
		let n = !1, r = e.map((e) => {
			let r = $v(e, t);
			return !n && typeof r == "function" && (n = !0), r;
		});
		if (n) return () => {
			for (let t = 0; t < r.length; t++) {
				let n = r[t];
				typeof n == "function" ? n() : $v(e[t], null);
			}
		};
	};
}
//#endregion
//#region node_modules/@radix-ui/react-separator/node_modules/@radix-ui/react-slot/dist/index.mjs
/* @__NO_SIDE_EFFECTS__ */
function ty(e) {
	let t = /* @__PURE__ */ ny(e), n = u.forwardRef((e, n) => {
		let { children: r, ...i } = e, a = u.Children.toArray(r), o = a.find(iy);
		if (o) {
			let e = o.props.children, r = a.map((t) => t === o ? u.Children.count(e) > 1 ? u.Children.only(null) : u.isValidElement(e) ? e.props.children : null : t);
			return /* @__PURE__ */ (0, L.jsx)(t, {
				...i,
				ref: n,
				children: u.isValidElement(e) ? u.cloneElement(e, void 0, r) : null
			});
		}
		return /* @__PURE__ */ (0, L.jsx)(t, {
			...i,
			ref: n,
			children: r
		});
	});
	return n.displayName = `${e}.Slot`, n;
}
/* @__NO_SIDE_EFFECTS__ */
function ny(e) {
	let t = u.forwardRef((e, t) => {
		let { children: n, ...r } = e;
		if (u.isValidElement(n)) {
			let e = oy(n), i = ay(r, n.props);
			return n.type !== u.Fragment && (i.ref = t ? ey(t, e) : e), u.cloneElement(n, i);
		}
		return u.Children.count(n) > 1 ? u.Children.only(null) : null;
	});
	return t.displayName = `${e}.SlotClone`, t;
}
var ry = Symbol("radix.slottable");
function iy(e) {
	return u.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === ry;
}
function ay(e, t) {
	let n = { ...t };
	for (let r in t) {
		let i = e[r], a = t[r];
		/^on[A-Z]/.test(r) ? i && a ? n[r] = (...e) => {
			let t = a(...e);
			return i(...e), t;
		} : i && (n[r] = i) : r === "style" ? n[r] = {
			...i,
			...a
		} : r === "className" && (n[r] = [i, a].filter(Boolean).join(" "));
	}
	return {
		...e,
		...n
	};
}
function oy(e) {
	let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning;
	return n ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
//#endregion
//#region node_modules/@radix-ui/react-separator/node_modules/@radix-ui/react-primitive/dist/index.mjs
var sy = [
	"a",
	"button",
	"div",
	"form",
	"h2",
	"h3",
	"img",
	"input",
	"label",
	"li",
	"nav",
	"ol",
	"p",
	"select",
	"span",
	"svg",
	"ul"
].reduce((e, t) => {
	let n = /* @__PURE__ */ ty(`Primitive.${t}`), r = u.forwardRef((e, r) => {
		let { asChild: i, ...a } = e, o = i ? n : t;
		return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ (0, L.jsx)(o, {
			...a,
			ref: r
		});
	});
	return r.displayName = `Primitive.${t}`, {
		...e,
		[t]: r
	};
}, {}), cy = "Separator", ly = "horizontal", uy = ["horizontal", "vertical"], dy = u.forwardRef((e, t) => {
	let { decorative: n, orientation: r = ly, ...i } = e, a = fy(r) ? r : ly, o = a === "vertical" ? a : void 0, s = n ? { role: "none" } : {
		"aria-orientation": o,
		role: "separator"
	};
	return /* @__PURE__ */ (0, L.jsx)(sy.div, {
		"data-orientation": a,
		...s,
		...i,
		ref: t
	});
});
dy.displayName = cy;
function fy(e) {
	return uy.includes(e);
}
var py = dy;
//#endregion
//#region components/ui/separator.tsx
function my({ className: e, orientation: t = "horizontal", decorative: n = !0, ...r }) {
	return /* @__PURE__ */ (0, L.jsx)(py, {
		"data-slot": "separator",
		decorative: n,
		orientation: t,
		className: H("bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px", e),
		...r
	});
}
//#endregion
//#region node_modules/date-fns/constants.js
var hy = 365.2425, gy = 6048e5, _y = 864e5, vy = 3600 * 24;
vy * 7, vy * hy / 12 * 3;
var yy = Symbol.for("constructDateFrom");
//#endregion
//#region node_modules/date-fns/constructFrom.js
function by(e, t) {
	return typeof e == "function" ? e(t) : e && typeof e == "object" && yy in e ? e[yy](t) : e instanceof Date ? new e.constructor(t) : new Date(t);
}
//#endregion
//#region node_modules/date-fns/toDate.js
function xy(e, t) {
	return by(t || e, e);
}
//#endregion
//#region node_modules/date-fns/_lib/defaultOptions.js
var Sy = {};
function Cy() {
	return Sy;
}
//#endregion
//#region node_modules/date-fns/startOfWeek.js
function wy(e, t) {
	let n = Cy(), r = t?.weekStartsOn ?? t?.locale?.options?.weekStartsOn ?? n.weekStartsOn ?? n.locale?.options?.weekStartsOn ?? 0, i = xy(e, t?.in), a = i.getDay(), o = (a < r ? 7 : 0) + a - r;
	return i.setDate(i.getDate() - o), i.setHours(0, 0, 0, 0), i;
}
//#endregion
//#region node_modules/date-fns/startOfISOWeek.js
function Ty(e, t) {
	return wy(e, {
		...t,
		weekStartsOn: 1
	});
}
//#endregion
//#region node_modules/date-fns/getISOWeekYear.js
function Ey(e, t) {
	let n = xy(e, t?.in), r = n.getFullYear(), i = by(n, 0);
	i.setFullYear(r + 1, 0, 4), i.setHours(0, 0, 0, 0);
	let a = Ty(i), o = by(n, 0);
	o.setFullYear(r, 0, 4), o.setHours(0, 0, 0, 0);
	let s = Ty(o);
	return n.getTime() >= a.getTime() ? r + 1 : n.getTime() >= s.getTime() ? r : r - 1;
}
//#endregion
//#region node_modules/date-fns/_lib/getTimezoneOffsetInMilliseconds.js
function Dy(e) {
	let t = xy(e), n = new Date(Date.UTC(t.getFullYear(), t.getMonth(), t.getDate(), t.getHours(), t.getMinutes(), t.getSeconds(), t.getMilliseconds()));
	return n.setUTCFullYear(t.getFullYear()), e - +n;
}
//#endregion
//#region node_modules/date-fns/_lib/normalizeDates.js
function Oy(e, ...t) {
	let n = by.bind(null, e || t.find((e) => typeof e == "object"));
	return t.map(n);
}
//#endregion
//#region node_modules/date-fns/startOfDay.js
function ky(e, t) {
	let n = xy(e, t?.in);
	return n.setHours(0, 0, 0, 0), n;
}
//#endregion
//#region node_modules/date-fns/differenceInCalendarDays.js
function Ay(e, t, n) {
	let [r, i] = Oy(n?.in, e, t), a = ky(r), o = ky(i), s = +a - Dy(a), c = +o - Dy(o);
	return Math.round((s - c) / _y);
}
//#endregion
//#region node_modules/date-fns/startOfISOWeekYear.js
function jy(e, t) {
	let n = Ey(e, t), r = by(t?.in || e, 0);
	return r.setFullYear(n, 0, 4), r.setHours(0, 0, 0, 0), Ty(r);
}
//#endregion
//#region node_modules/date-fns/isDate.js
function My(e) {
	return e instanceof Date || typeof e == "object" && Object.prototype.toString.call(e) === "[object Date]";
}
//#endregion
//#region node_modules/date-fns/isValid.js
function Ny(e) {
	return !(!My(e) && typeof e != "number" || isNaN(+xy(e)));
}
//#endregion
//#region node_modules/date-fns/startOfYear.js
function Py(e, t) {
	let n = xy(e, t?.in);
	return n.setFullYear(n.getFullYear(), 0, 1), n.setHours(0, 0, 0, 0), n;
}
//#endregion
//#region node_modules/date-fns/locale/en-US/_lib/formatDistance.js
var Fy = {
	lessThanXSeconds: {
		one: "less than a second",
		other: "less than {{count}} seconds"
	},
	xSeconds: {
		one: "1 second",
		other: "{{count}} seconds"
	},
	halfAMinute: "half a minute",
	lessThanXMinutes: {
		one: "less than a minute",
		other: "less than {{count}} minutes"
	},
	xMinutes: {
		one: "1 minute",
		other: "{{count}} minutes"
	},
	aboutXHours: {
		one: "about 1 hour",
		other: "about {{count}} hours"
	},
	xHours: {
		one: "1 hour",
		other: "{{count}} hours"
	},
	xDays: {
		one: "1 day",
		other: "{{count}} days"
	},
	aboutXWeeks: {
		one: "about 1 week",
		other: "about {{count}} weeks"
	},
	xWeeks: {
		one: "1 week",
		other: "{{count}} weeks"
	},
	aboutXMonths: {
		one: "about 1 month",
		other: "about {{count}} months"
	},
	xMonths: {
		one: "1 month",
		other: "{{count}} months"
	},
	aboutXYears: {
		one: "about 1 year",
		other: "about {{count}} years"
	},
	xYears: {
		one: "1 year",
		other: "{{count}} years"
	},
	overXYears: {
		one: "over 1 year",
		other: "over {{count}} years"
	},
	almostXYears: {
		one: "almost 1 year",
		other: "almost {{count}} years"
	}
}, Iy = (e, t, n) => {
	let r, i = Fy[e];
	return r = typeof i == "string" ? i : t === 1 ? i.one : i.other.replace("{{count}}", t.toString()), n?.addSuffix ? n.comparison && n.comparison > 0 ? "in " + r : r + " ago" : r;
};
//#endregion
//#region node_modules/date-fns/locale/_lib/buildFormatLongFn.js
function Ly(e) {
	return (t = {}) => {
		let n = t.width ? String(t.width) : e.defaultWidth;
		return e.formats[n] || e.formats[e.defaultWidth];
	};
}
var Ry = {
	date: Ly({
		formats: {
			full: "EEEE, MMMM do, y",
			long: "MMMM do, y",
			medium: "MMM d, y",
			short: "MM/dd/yyyy"
		},
		defaultWidth: "full"
	}),
	time: Ly({
		formats: {
			full: "h:mm:ss a zzzz",
			long: "h:mm:ss a z",
			medium: "h:mm:ss a",
			short: "h:mm a"
		},
		defaultWidth: "full"
	}),
	dateTime: Ly({
		formats: {
			full: "{{date}} 'at' {{time}}",
			long: "{{date}} 'at' {{time}}",
			medium: "{{date}}, {{time}}",
			short: "{{date}}, {{time}}"
		},
		defaultWidth: "full"
	})
}, zy = {
	lastWeek: "'last' eeee 'at' p",
	yesterday: "'yesterday at' p",
	today: "'today at' p",
	tomorrow: "'tomorrow at' p",
	nextWeek: "eeee 'at' p",
	other: "P"
}, By = (e, t, n, r) => zy[e];
//#endregion
//#region node_modules/date-fns/locale/_lib/buildLocalizeFn.js
function Vy(e) {
	return (t, n) => {
		let r = n?.context ? String(n.context) : "standalone", i;
		if (r === "formatting" && e.formattingValues) {
			let t = e.defaultFormattingWidth || e.defaultWidth, r = n?.width ? String(n.width) : t;
			i = e.formattingValues[r] || e.formattingValues[t];
		} else {
			let t = e.defaultWidth, r = n?.width ? String(n.width) : e.defaultWidth;
			i = e.values[r] || e.values[t];
		}
		let a = e.argumentCallback ? e.argumentCallback(t) : t;
		return i[a];
	};
}
var Hy = {
	ordinalNumber: (e, t) => {
		let n = Number(e), r = n % 100;
		if (r > 20 || r < 10) switch (r % 10) {
			case 1: return n + "st";
			case 2: return n + "nd";
			case 3: return n + "rd";
		}
		return n + "th";
	},
	era: Vy({
		values: {
			narrow: ["B", "A"],
			abbreviated: ["BC", "AD"],
			wide: ["Before Christ", "Anno Domini"]
		},
		defaultWidth: "wide"
	}),
	quarter: Vy({
		values: {
			narrow: [
				"1",
				"2",
				"3",
				"4"
			],
			abbreviated: [
				"Q1",
				"Q2",
				"Q3",
				"Q4"
			],
			wide: [
				"1st quarter",
				"2nd quarter",
				"3rd quarter",
				"4th quarter"
			]
		},
		defaultWidth: "wide",
		argumentCallback: (e) => e - 1
	}),
	month: Vy({
		values: {
			narrow: [
				"J",
				"F",
				"M",
				"A",
				"M",
				"J",
				"J",
				"A",
				"S",
				"O",
				"N",
				"D"
			],
			abbreviated: [
				"Jan",
				"Feb",
				"Mar",
				"Apr",
				"May",
				"Jun",
				"Jul",
				"Aug",
				"Sep",
				"Oct",
				"Nov",
				"Dec"
			],
			wide: [
				"January",
				"February",
				"March",
				"April",
				"May",
				"June",
				"July",
				"August",
				"September",
				"October",
				"November",
				"December"
			]
		},
		defaultWidth: "wide"
	}),
	day: Vy({
		values: {
			narrow: [
				"S",
				"M",
				"T",
				"W",
				"T",
				"F",
				"S"
			],
			short: [
				"Su",
				"Mo",
				"Tu",
				"We",
				"Th",
				"Fr",
				"Sa"
			],
			abbreviated: [
				"Sun",
				"Mon",
				"Tue",
				"Wed",
				"Thu",
				"Fri",
				"Sat"
			],
			wide: [
				"Sunday",
				"Monday",
				"Tuesday",
				"Wednesday",
				"Thursday",
				"Friday",
				"Saturday"
			]
		},
		defaultWidth: "wide"
	}),
	dayPeriod: Vy({
		values: {
			narrow: {
				am: "a",
				pm: "p",
				midnight: "mi",
				noon: "n",
				morning: "morning",
				afternoon: "afternoon",
				evening: "evening",
				night: "night"
			},
			abbreviated: {
				am: "AM",
				pm: "PM",
				midnight: "midnight",
				noon: "noon",
				morning: "morning",
				afternoon: "afternoon",
				evening: "evening",
				night: "night"
			},
			wide: {
				am: "a.m.",
				pm: "p.m.",
				midnight: "midnight",
				noon: "noon",
				morning: "morning",
				afternoon: "afternoon",
				evening: "evening",
				night: "night"
			}
		},
		defaultWidth: "wide",
		formattingValues: {
			narrow: {
				am: "a",
				pm: "p",
				midnight: "mi",
				noon: "n",
				morning: "in the morning",
				afternoon: "in the afternoon",
				evening: "in the evening",
				night: "at night"
			},
			abbreviated: {
				am: "AM",
				pm: "PM",
				midnight: "midnight",
				noon: "noon",
				morning: "in the morning",
				afternoon: "in the afternoon",
				evening: "in the evening",
				night: "at night"
			},
			wide: {
				am: "a.m.",
				pm: "p.m.",
				midnight: "midnight",
				noon: "noon",
				morning: "in the morning",
				afternoon: "in the afternoon",
				evening: "in the evening",
				night: "at night"
			}
		},
		defaultFormattingWidth: "wide"
	})
};
//#endregion
//#region node_modules/date-fns/locale/_lib/buildMatchFn.js
function Uy(e) {
	return (t, n = {}) => {
		let r = n.width, i = r && e.matchPatterns[r] || e.matchPatterns[e.defaultMatchWidth], a = t.match(i);
		if (!a) return null;
		let o = a[0], s = r && e.parsePatterns[r] || e.parsePatterns[e.defaultParseWidth], c = Array.isArray(s) ? Gy(s, (e) => e.test(o)) : Wy(s, (e) => e.test(o)), l;
		l = e.valueCallback ? e.valueCallback(c) : c, l = n.valueCallback ? n.valueCallback(l) : l;
		let u = t.slice(o.length);
		return {
			value: l,
			rest: u
		};
	};
}
function Wy(e, t) {
	for (let n in e) if (Object.prototype.hasOwnProperty.call(e, n) && t(e[n])) return n;
}
function Gy(e, t) {
	for (let n = 0; n < e.length; n++) if (t(e[n])) return n;
}
//#endregion
//#region node_modules/date-fns/locale/_lib/buildMatchPatternFn.js
function Ky(e) {
	return (t, n = {}) => {
		let r = t.match(e.matchPattern);
		if (!r) return null;
		let i = r[0], a = t.match(e.parsePattern);
		if (!a) return null;
		let o = e.valueCallback ? e.valueCallback(a[0]) : a[0];
		o = n.valueCallback ? n.valueCallback(o) : o;
		let s = t.slice(i.length);
		return {
			value: o,
			rest: s
		};
	};
}
//#endregion
//#region node_modules/date-fns/locale/en-US.js
var qy = {
	code: "en-US",
	formatDistance: Iy,
	formatLong: Ry,
	formatRelative: By,
	localize: Hy,
	match: {
		ordinalNumber: Ky({
			matchPattern: /^(\d+)(th|st|nd|rd)?/i,
			parsePattern: /\d+/i,
			valueCallback: (e) => parseInt(e, 10)
		}),
		era: Uy({
			matchPatterns: {
				narrow: /^(b|a)/i,
				abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
				wide: /^(before christ|before common era|anno domini|common era)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: { any: [/^b/i, /^(a|c)/i] },
			defaultParseWidth: "any"
		}),
		quarter: Uy({
			matchPatterns: {
				narrow: /^[1234]/i,
				abbreviated: /^q[1234]/i,
				wide: /^[1234](th|st|nd|rd)? quarter/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: { any: [
				/1/i,
				/2/i,
				/3/i,
				/4/i
			] },
			defaultParseWidth: "any",
			valueCallback: (e) => e + 1
		}),
		month: Uy({
			matchPatterns: {
				narrow: /^[jfmasond]/i,
				abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
				wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: {
				narrow: [
					/^j/i,
					/^f/i,
					/^m/i,
					/^a/i,
					/^m/i,
					/^j/i,
					/^j/i,
					/^a/i,
					/^s/i,
					/^o/i,
					/^n/i,
					/^d/i
				],
				any: [
					/^ja/i,
					/^f/i,
					/^mar/i,
					/^ap/i,
					/^may/i,
					/^jun/i,
					/^jul/i,
					/^au/i,
					/^s/i,
					/^o/i,
					/^n/i,
					/^d/i
				]
			},
			defaultParseWidth: "any"
		}),
		day: Uy({
			matchPatterns: {
				narrow: /^[smtwf]/i,
				short: /^(su|mo|tu|we|th|fr|sa)/i,
				abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
				wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: {
				narrow: [
					/^s/i,
					/^m/i,
					/^t/i,
					/^w/i,
					/^t/i,
					/^f/i,
					/^s/i
				],
				any: [
					/^su/i,
					/^m/i,
					/^tu/i,
					/^w/i,
					/^th/i,
					/^f/i,
					/^sa/i
				]
			},
			defaultParseWidth: "any"
		}),
		dayPeriod: Uy({
			matchPatterns: {
				narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
				any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
			},
			defaultMatchWidth: "any",
			parsePatterns: { any: {
				am: /^a/i,
				pm: /^p/i,
				midnight: /^mi/i,
				noon: /^no/i,
				morning: /morning/i,
				afternoon: /afternoon/i,
				evening: /evening/i,
				night: /night/i
			} },
			defaultParseWidth: "any"
		})
	},
	options: {
		weekStartsOn: 0,
		firstWeekContainsDate: 1
	}
};
//#endregion
//#region node_modules/date-fns/getDayOfYear.js
function Jy(e, t) {
	let n = xy(e, t?.in);
	return Ay(n, Py(n)) + 1;
}
//#endregion
//#region node_modules/date-fns/getISOWeek.js
function Yy(e, t) {
	let n = xy(e, t?.in), r = Ty(n) - +jy(n);
	return Math.round(r / gy) + 1;
}
//#endregion
//#region node_modules/date-fns/getWeekYear.js
function Xy(e, t) {
	let n = xy(e, t?.in), r = n.getFullYear(), i = Cy(), a = t?.firstWeekContainsDate ?? t?.locale?.options?.firstWeekContainsDate ?? i.firstWeekContainsDate ?? i.locale?.options?.firstWeekContainsDate ?? 1, o = by(t?.in || e, 0);
	o.setFullYear(r + 1, 0, a), o.setHours(0, 0, 0, 0);
	let s = wy(o, t), c = by(t?.in || e, 0);
	c.setFullYear(r, 0, a), c.setHours(0, 0, 0, 0);
	let l = wy(c, t);
	return +n >= +s ? r + 1 : +n >= +l ? r : r - 1;
}
//#endregion
//#region node_modules/date-fns/startOfWeekYear.js
function Zy(e, t) {
	let n = Cy(), r = t?.firstWeekContainsDate ?? t?.locale?.options?.firstWeekContainsDate ?? n.firstWeekContainsDate ?? n.locale?.options?.firstWeekContainsDate ?? 1, i = Xy(e, t), a = by(t?.in || e, 0);
	return a.setFullYear(i, 0, r), a.setHours(0, 0, 0, 0), wy(a, t);
}
//#endregion
//#region node_modules/date-fns/getWeek.js
function Qy(e, t) {
	let n = xy(e, t?.in), r = wy(n, t) - +Zy(n, t);
	return Math.round(r / gy) + 1;
}
//#endregion
//#region node_modules/date-fns/_lib/addLeadingZeros.js
function $(e, t) {
	return (e < 0 ? "-" : "") + Math.abs(e).toString().padStart(t, "0");
}
//#endregion
//#region node_modules/date-fns/_lib/format/lightFormatters.js
var $y = {
	y(e, t) {
		let n = e.getFullYear(), r = n > 0 ? n : 1 - n;
		return $(t === "yy" ? r % 100 : r, t.length);
	},
	M(e, t) {
		let n = e.getMonth();
		return t === "M" ? String(n + 1) : $(n + 1, 2);
	},
	d(e, t) {
		return $(e.getDate(), t.length);
	},
	a(e, t) {
		let n = e.getHours() / 12 >= 1 ? "pm" : "am";
		switch (t) {
			case "a":
			case "aa": return n.toUpperCase();
			case "aaa": return n;
			case "aaaaa": return n[0];
			default: return n === "am" ? "a.m." : "p.m.";
		}
	},
	h(e, t) {
		return $(e.getHours() % 12 || 12, t.length);
	},
	H(e, t) {
		return $(e.getHours(), t.length);
	},
	m(e, t) {
		return $(e.getMinutes(), t.length);
	},
	s(e, t) {
		return $(e.getSeconds(), t.length);
	},
	S(e, t) {
		let n = t.length, r = e.getMilliseconds();
		return $(Math.trunc(r * 10 ** (n - 3)), t.length);
	}
}, eb = {
	am: "am",
	pm: "pm",
	midnight: "midnight",
	noon: "noon",
	morning: "morning",
	afternoon: "afternoon",
	evening: "evening",
	night: "night"
}, tb = {
	G: function(e, t, n) {
		let r = e.getFullYear() > 0 ? 1 : 0;
		switch (t) {
			case "G":
			case "GG":
			case "GGG": return n.era(r, { width: "abbreviated" });
			case "GGGGG": return n.era(r, { width: "narrow" });
			default: return n.era(r, { width: "wide" });
		}
	},
	y: function(e, t, n) {
		if (t === "yo") {
			let t = e.getFullYear(), r = t > 0 ? t : 1 - t;
			return n.ordinalNumber(r, { unit: "year" });
		}
		return $y.y(e, t);
	},
	Y: function(e, t, n, r) {
		let i = Xy(e, r), a = i > 0 ? i : 1 - i;
		return t === "YY" ? $(a % 100, 2) : t === "Yo" ? n.ordinalNumber(a, { unit: "year" }) : $(a, t.length);
	},
	R: function(e, t) {
		return $(Ey(e), t.length);
	},
	u: function(e, t) {
		return $(e.getFullYear(), t.length);
	},
	Q: function(e, t, n) {
		let r = Math.ceil((e.getMonth() + 1) / 3);
		switch (t) {
			case "Q": return String(r);
			case "QQ": return $(r, 2);
			case "Qo": return n.ordinalNumber(r, { unit: "quarter" });
			case "QQQ": return n.quarter(r, {
				width: "abbreviated",
				context: "formatting"
			});
			case "QQQQQ": return n.quarter(r, {
				width: "narrow",
				context: "formatting"
			});
			default: return n.quarter(r, {
				width: "wide",
				context: "formatting"
			});
		}
	},
	q: function(e, t, n) {
		let r = Math.ceil((e.getMonth() + 1) / 3);
		switch (t) {
			case "q": return String(r);
			case "qq": return $(r, 2);
			case "qo": return n.ordinalNumber(r, { unit: "quarter" });
			case "qqq": return n.quarter(r, {
				width: "abbreviated",
				context: "standalone"
			});
			case "qqqqq": return n.quarter(r, {
				width: "narrow",
				context: "standalone"
			});
			default: return n.quarter(r, {
				width: "wide",
				context: "standalone"
			});
		}
	},
	M: function(e, t, n) {
		let r = e.getMonth();
		switch (t) {
			case "M":
			case "MM": return $y.M(e, t);
			case "Mo": return n.ordinalNumber(r + 1, { unit: "month" });
			case "MMM": return n.month(r, {
				width: "abbreviated",
				context: "formatting"
			});
			case "MMMMM": return n.month(r, {
				width: "narrow",
				context: "formatting"
			});
			default: return n.month(r, {
				width: "wide",
				context: "formatting"
			});
		}
	},
	L: function(e, t, n) {
		let r = e.getMonth();
		switch (t) {
			case "L": return String(r + 1);
			case "LL": return $(r + 1, 2);
			case "Lo": return n.ordinalNumber(r + 1, { unit: "month" });
			case "LLL": return n.month(r, {
				width: "abbreviated",
				context: "standalone"
			});
			case "LLLLL": return n.month(r, {
				width: "narrow",
				context: "standalone"
			});
			default: return n.month(r, {
				width: "wide",
				context: "standalone"
			});
		}
	},
	w: function(e, t, n, r) {
		let i = Qy(e, r);
		return t === "wo" ? n.ordinalNumber(i, { unit: "week" }) : $(i, t.length);
	},
	I: function(e, t, n) {
		let r = Yy(e);
		return t === "Io" ? n.ordinalNumber(r, { unit: "week" }) : $(r, t.length);
	},
	d: function(e, t, n) {
		return t === "do" ? n.ordinalNumber(e.getDate(), { unit: "date" }) : $y.d(e, t);
	},
	D: function(e, t, n) {
		let r = Jy(e);
		return t === "Do" ? n.ordinalNumber(r, { unit: "dayOfYear" }) : $(r, t.length);
	},
	E: function(e, t, n) {
		let r = e.getDay();
		switch (t) {
			case "E":
			case "EE":
			case "EEE": return n.day(r, {
				width: "abbreviated",
				context: "formatting"
			});
			case "EEEEE": return n.day(r, {
				width: "narrow",
				context: "formatting"
			});
			case "EEEEEE": return n.day(r, {
				width: "short",
				context: "formatting"
			});
			default: return n.day(r, {
				width: "wide",
				context: "formatting"
			});
		}
	},
	e: function(e, t, n, r) {
		let i = e.getDay(), a = (i - r.weekStartsOn + 8) % 7 || 7;
		switch (t) {
			case "e": return String(a);
			case "ee": return $(a, 2);
			case "eo": return n.ordinalNumber(a, { unit: "day" });
			case "eee": return n.day(i, {
				width: "abbreviated",
				context: "formatting"
			});
			case "eeeee": return n.day(i, {
				width: "narrow",
				context: "formatting"
			});
			case "eeeeee": return n.day(i, {
				width: "short",
				context: "formatting"
			});
			default: return n.day(i, {
				width: "wide",
				context: "formatting"
			});
		}
	},
	c: function(e, t, n, r) {
		let i = e.getDay(), a = (i - r.weekStartsOn + 8) % 7 || 7;
		switch (t) {
			case "c": return String(a);
			case "cc": return $(a, t.length);
			case "co": return n.ordinalNumber(a, { unit: "day" });
			case "ccc": return n.day(i, {
				width: "abbreviated",
				context: "standalone"
			});
			case "ccccc": return n.day(i, {
				width: "narrow",
				context: "standalone"
			});
			case "cccccc": return n.day(i, {
				width: "short",
				context: "standalone"
			});
			default: return n.day(i, {
				width: "wide",
				context: "standalone"
			});
		}
	},
	i: function(e, t, n) {
		let r = e.getDay(), i = r === 0 ? 7 : r;
		switch (t) {
			case "i": return String(i);
			case "ii": return $(i, t.length);
			case "io": return n.ordinalNumber(i, { unit: "day" });
			case "iii": return n.day(r, {
				width: "abbreviated",
				context: "formatting"
			});
			case "iiiii": return n.day(r, {
				width: "narrow",
				context: "formatting"
			});
			case "iiiiii": return n.day(r, {
				width: "short",
				context: "formatting"
			});
			default: return n.day(r, {
				width: "wide",
				context: "formatting"
			});
		}
	},
	a: function(e, t, n) {
		let r = e.getHours() / 12 >= 1 ? "pm" : "am";
		switch (t) {
			case "a":
			case "aa": return n.dayPeriod(r, {
				width: "abbreviated",
				context: "formatting"
			});
			case "aaa": return n.dayPeriod(r, {
				width: "abbreviated",
				context: "formatting"
			}).toLowerCase();
			case "aaaaa": return n.dayPeriod(r, {
				width: "narrow",
				context: "formatting"
			});
			default: return n.dayPeriod(r, {
				width: "wide",
				context: "formatting"
			});
		}
	},
	b: function(e, t, n) {
		let r = e.getHours(), i;
		switch (i = r === 12 ? eb.noon : r === 0 ? eb.midnight : r / 12 >= 1 ? "pm" : "am", t) {
			case "b":
			case "bb": return n.dayPeriod(i, {
				width: "abbreviated",
				context: "formatting"
			});
			case "bbb": return n.dayPeriod(i, {
				width: "abbreviated",
				context: "formatting"
			}).toLowerCase();
			case "bbbbb": return n.dayPeriod(i, {
				width: "narrow",
				context: "formatting"
			});
			default: return n.dayPeriod(i, {
				width: "wide",
				context: "formatting"
			});
		}
	},
	B: function(e, t, n) {
		let r = e.getHours(), i;
		switch (i = r >= 17 ? eb.evening : r >= 12 ? eb.afternoon : r >= 4 ? eb.morning : eb.night, t) {
			case "B":
			case "BB":
			case "BBB": return n.dayPeriod(i, {
				width: "abbreviated",
				context: "formatting"
			});
			case "BBBBB": return n.dayPeriod(i, {
				width: "narrow",
				context: "formatting"
			});
			default: return n.dayPeriod(i, {
				width: "wide",
				context: "formatting"
			});
		}
	},
	h: function(e, t, n) {
		if (t === "ho") {
			let t = e.getHours() % 12;
			return t === 0 && (t = 12), n.ordinalNumber(t, { unit: "hour" });
		}
		return $y.h(e, t);
	},
	H: function(e, t, n) {
		return t === "Ho" ? n.ordinalNumber(e.getHours(), { unit: "hour" }) : $y.H(e, t);
	},
	K: function(e, t, n) {
		let r = e.getHours() % 12;
		return t === "Ko" ? n.ordinalNumber(r, { unit: "hour" }) : $(r, t.length);
	},
	k: function(e, t, n) {
		let r = e.getHours();
		return r === 0 && (r = 24), t === "ko" ? n.ordinalNumber(r, { unit: "hour" }) : $(r, t.length);
	},
	m: function(e, t, n) {
		return t === "mo" ? n.ordinalNumber(e.getMinutes(), { unit: "minute" }) : $y.m(e, t);
	},
	s: function(e, t, n) {
		return t === "so" ? n.ordinalNumber(e.getSeconds(), { unit: "second" }) : $y.s(e, t);
	},
	S: function(e, t) {
		return $y.S(e, t);
	},
	X: function(e, t, n) {
		let r = e.getTimezoneOffset();
		if (r === 0) return "Z";
		switch (t) {
			case "X": return rb(r);
			case "XXXX":
			case "XX": return ib(r);
			default: return ib(r, ":");
		}
	},
	x: function(e, t, n) {
		let r = e.getTimezoneOffset();
		switch (t) {
			case "x": return rb(r);
			case "xxxx":
			case "xx": return ib(r);
			default: return ib(r, ":");
		}
	},
	O: function(e, t, n) {
		let r = e.getTimezoneOffset();
		switch (t) {
			case "O":
			case "OO":
			case "OOO": return "GMT" + nb(r, ":");
			default: return "GMT" + ib(r, ":");
		}
	},
	z: function(e, t, n) {
		let r = e.getTimezoneOffset();
		switch (t) {
			case "z":
			case "zz":
			case "zzz": return "GMT" + nb(r, ":");
			default: return "GMT" + ib(r, ":");
		}
	},
	t: function(e, t, n) {
		return $(Math.trunc(e / 1e3), t.length);
	},
	T: function(e, t, n) {
		return $(+e, t.length);
	}
};
function nb(e, t = "") {
	let n = e > 0 ? "-" : "+", r = Math.abs(e), i = Math.trunc(r / 60), a = r % 60;
	return a === 0 ? n + String(i) : n + String(i) + t + $(a, 2);
}
function rb(e, t) {
	return e % 60 == 0 ? (e > 0 ? "-" : "+") + $(Math.abs(e) / 60, 2) : ib(e, t);
}
function ib(e, t = "") {
	let n = e > 0 ? "-" : "+", r = Math.abs(e), i = $(Math.trunc(r / 60), 2), a = $(r % 60, 2);
	return n + i + t + a;
}
//#endregion
//#region node_modules/date-fns/_lib/format/longFormatters.js
var ab = (e, t) => {
	switch (e) {
		case "P": return t.date({ width: "short" });
		case "PP": return t.date({ width: "medium" });
		case "PPP": return t.date({ width: "long" });
		default: return t.date({ width: "full" });
	}
}, ob = (e, t) => {
	switch (e) {
		case "p": return t.time({ width: "short" });
		case "pp": return t.time({ width: "medium" });
		case "ppp": return t.time({ width: "long" });
		default: return t.time({ width: "full" });
	}
}, sb = {
	p: ob,
	P: (e, t) => {
		let n = e.match(/(P+)(p+)?/) || [], r = n[1], i = n[2];
		if (!i) return ab(e, t);
		let a;
		switch (r) {
			case "P":
				a = t.dateTime({ width: "short" });
				break;
			case "PP":
				a = t.dateTime({ width: "medium" });
				break;
			case "PPP":
				a = t.dateTime({ width: "long" });
				break;
			default:
				a = t.dateTime({ width: "full" });
				break;
		}
		return a.replace("{{date}}", ab(r, t)).replace("{{time}}", ob(i, t));
	}
}, cb = /^D+$/, lb = /^Y+$/, ub = [
	"D",
	"DD",
	"YY",
	"YYYY"
];
function db(e) {
	return cb.test(e);
}
function fb(e) {
	return lb.test(e);
}
function pb(e, t, n) {
	let r = mb(e, t, n);
	if (console.warn(r), ub.includes(e)) throw RangeError(r);
}
function mb(e, t, n) {
	let r = e[0] === "Y" ? "years" : "days of the month";
	return `Use \`${e.toLowerCase()}\` instead of \`${e}\` (in \`${t}\`) for formatting ${r} to the input \`${n}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
//#endregion
//#region node_modules/date-fns/format.js
var hb = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, gb = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, _b = /^'([^]*?)'?$/, vb = /''/g, yb = /[a-zA-Z]/;
function bb(e, t, n) {
	let r = Cy(), i = n?.locale ?? r.locale ?? qy, a = n?.firstWeekContainsDate ?? n?.locale?.options?.firstWeekContainsDate ?? r.firstWeekContainsDate ?? r.locale?.options?.firstWeekContainsDate ?? 1, o = n?.weekStartsOn ?? n?.locale?.options?.weekStartsOn ?? r.weekStartsOn ?? r.locale?.options?.weekStartsOn ?? 0, s = xy(e, n?.in);
	if (!Ny(s)) throw RangeError("Invalid time value");
	let c = t.match(gb).map((e) => {
		let t = e[0];
		if (t === "p" || t === "P") {
			let n = sb[t];
			return n(e, i.formatLong);
		}
		return e;
	}).join("").match(hb).map((e) => {
		if (e === "''") return {
			isToken: !1,
			value: "'"
		};
		let t = e[0];
		if (t === "'") return {
			isToken: !1,
			value: xb(e)
		};
		if (tb[t]) return {
			isToken: !0,
			value: e
		};
		if (t.match(yb)) throw RangeError("Format string contains an unescaped latin alphabet character `" + t + "`");
		return {
			isToken: !1,
			value: e
		};
	});
	i.localize.preprocessor && (c = i.localize.preprocessor(s, c));
	let l = {
		firstWeekContainsDate: a,
		weekStartsOn: o,
		locale: i
	};
	return c.map((r) => {
		if (!r.isToken) return r.value;
		let a = r.value;
		(!n?.useAdditionalWeekYearTokens && fb(a) || !n?.useAdditionalDayOfYearTokens && db(a)) && pb(a, t, String(e));
		let o = tb[a[0]];
		return o(s, a, i.localize, l);
	}).join("");
}
function xb(e) {
	let t = e.match(_b);
	return t ? t[1].replace(vb, "'") : e;
}
//#endregion
//#region node_modules/date-fns/isSameWeek.js
function Sb(e, t, n) {
	let [r, i] = Oy(n?.in, e, t);
	return +wy(r, n) == +wy(i, n);
}
//#endregion
//#region node_modules/date-fns/locale/ru/_lib/formatDistance.js
function Cb(e, t) {
	if (e.one !== void 0 && t === 1) return e.one;
	let n = t % 10, r = t % 100;
	return n === 1 && r !== 11 ? e.singularNominative.replace("{{count}}", String(t)) : n >= 2 && n <= 4 && (r < 10 || r > 20) ? e.singularGenitive.replace("{{count}}", String(t)) : e.pluralGenitive.replace("{{count}}", String(t));
}
function wb(e) {
	return (t, n) => n?.addSuffix ? n.comparison && n.comparison > 0 ? e.future ? Cb(e.future, t) : "через " + Cb(e.regular, t) : e.past ? Cb(e.past, t) : Cb(e.regular, t) + " назад" : Cb(e.regular, t);
}
var Tb = {
	lessThanXSeconds: wb({
		regular: {
			one: "меньше секунды",
			singularNominative: "меньше {{count}} секунды",
			singularGenitive: "меньше {{count}} секунд",
			pluralGenitive: "меньше {{count}} секунд"
		},
		future: {
			one: "меньше, чем через секунду",
			singularNominative: "меньше, чем через {{count}} секунду",
			singularGenitive: "меньше, чем через {{count}} секунды",
			pluralGenitive: "меньше, чем через {{count}} секунд"
		}
	}),
	xSeconds: wb({
		regular: {
			singularNominative: "{{count}} секунда",
			singularGenitive: "{{count}} секунды",
			pluralGenitive: "{{count}} секунд"
		},
		past: {
			singularNominative: "{{count}} секунду назад",
			singularGenitive: "{{count}} секунды назад",
			pluralGenitive: "{{count}} секунд назад"
		},
		future: {
			singularNominative: "через {{count}} секунду",
			singularGenitive: "через {{count}} секунды",
			pluralGenitive: "через {{count}} секунд"
		}
	}),
	halfAMinute: (e, t) => t?.addSuffix ? t.comparison && t.comparison > 0 ? "через полминуты" : "полминуты назад" : "полминуты",
	lessThanXMinutes: wb({
		regular: {
			one: "меньше минуты",
			singularNominative: "меньше {{count}} минуты",
			singularGenitive: "меньше {{count}} минут",
			pluralGenitive: "меньше {{count}} минут"
		},
		future: {
			one: "меньше, чем через минуту",
			singularNominative: "меньше, чем через {{count}} минуту",
			singularGenitive: "меньше, чем через {{count}} минуты",
			pluralGenitive: "меньше, чем через {{count}} минут"
		}
	}),
	xMinutes: wb({
		regular: {
			singularNominative: "{{count}} минута",
			singularGenitive: "{{count}} минуты",
			pluralGenitive: "{{count}} минут"
		},
		past: {
			singularNominative: "{{count}} минуту назад",
			singularGenitive: "{{count}} минуты назад",
			pluralGenitive: "{{count}} минут назад"
		},
		future: {
			singularNominative: "через {{count}} минуту",
			singularGenitive: "через {{count}} минуты",
			pluralGenitive: "через {{count}} минут"
		}
	}),
	aboutXHours: wb({
		regular: {
			singularNominative: "около {{count}} часа",
			singularGenitive: "около {{count}} часов",
			pluralGenitive: "около {{count}} часов"
		},
		future: {
			singularNominative: "приблизительно через {{count}} час",
			singularGenitive: "приблизительно через {{count}} часа",
			pluralGenitive: "приблизительно через {{count}} часов"
		}
	}),
	xHours: wb({ regular: {
		singularNominative: "{{count}} час",
		singularGenitive: "{{count}} часа",
		pluralGenitive: "{{count}} часов"
	} }),
	xDays: wb({ regular: {
		singularNominative: "{{count}} день",
		singularGenitive: "{{count}} дня",
		pluralGenitive: "{{count}} дней"
	} }),
	aboutXWeeks: wb({
		regular: {
			singularNominative: "около {{count}} недели",
			singularGenitive: "около {{count}} недель",
			pluralGenitive: "около {{count}} недель"
		},
		future: {
			singularNominative: "приблизительно через {{count}} неделю",
			singularGenitive: "приблизительно через {{count}} недели",
			pluralGenitive: "приблизительно через {{count}} недель"
		}
	}),
	xWeeks: wb({ regular: {
		singularNominative: "{{count}} неделя",
		singularGenitive: "{{count}} недели",
		pluralGenitive: "{{count}} недель"
	} }),
	aboutXMonths: wb({
		regular: {
			singularNominative: "около {{count}} месяца",
			singularGenitive: "около {{count}} месяцев",
			pluralGenitive: "около {{count}} месяцев"
		},
		future: {
			singularNominative: "приблизительно через {{count}} месяц",
			singularGenitive: "приблизительно через {{count}} месяца",
			pluralGenitive: "приблизительно через {{count}} месяцев"
		}
	}),
	xMonths: wb({ regular: {
		singularNominative: "{{count}} месяц",
		singularGenitive: "{{count}} месяца",
		pluralGenitive: "{{count}} месяцев"
	} }),
	aboutXYears: wb({
		regular: {
			singularNominative: "около {{count}} года",
			singularGenitive: "около {{count}} лет",
			pluralGenitive: "около {{count}} лет"
		},
		future: {
			singularNominative: "приблизительно через {{count}} год",
			singularGenitive: "приблизительно через {{count}} года",
			pluralGenitive: "приблизительно через {{count}} лет"
		}
	}),
	xYears: wb({ regular: {
		singularNominative: "{{count}} год",
		singularGenitive: "{{count}} года",
		pluralGenitive: "{{count}} лет"
	} }),
	overXYears: wb({
		regular: {
			singularNominative: "больше {{count}} года",
			singularGenitive: "больше {{count}} лет",
			pluralGenitive: "больше {{count}} лет"
		},
		future: {
			singularNominative: "больше, чем через {{count}} год",
			singularGenitive: "больше, чем через {{count}} года",
			pluralGenitive: "больше, чем через {{count}} лет"
		}
	}),
	almostXYears: wb({
		regular: {
			singularNominative: "почти {{count}} год",
			singularGenitive: "почти {{count}} года",
			pluralGenitive: "почти {{count}} лет"
		},
		future: {
			singularNominative: "почти через {{count}} год",
			singularGenitive: "почти через {{count}} года",
			pluralGenitive: "почти через {{count}} лет"
		}
	})
}, Eb = (e, t, n) => Tb[e](t, n), Db = {
	date: Ly({
		formats: {
			full: "EEEE, d MMMM y 'г.'",
			long: "d MMMM y 'г.'",
			medium: "d MMM y 'г.'",
			short: "dd.MM.y"
		},
		defaultWidth: "full"
	}),
	time: Ly({
		formats: {
			full: "H:mm:ss zzzz",
			long: "H:mm:ss z",
			medium: "H:mm:ss",
			short: "H:mm"
		},
		defaultWidth: "full"
	}),
	dateTime: Ly({
		formats: { any: "{{date}}, {{time}}" },
		defaultWidth: "any"
	})
}, Ob = [
	"воскресенье",
	"понедельник",
	"вторник",
	"среду",
	"четверг",
	"пятницу",
	"субботу"
];
function kb(e) {
	let t = Ob[e];
	switch (e) {
		case 0: return "'в прошлое " + t + " в' p";
		case 1:
		case 2:
		case 4: return "'в прошлый " + t + " в' p";
		case 3:
		case 5:
		case 6: return "'в прошлую " + t + " в' p";
	}
}
function Ab(e) {
	let t = Ob[e];
	return e === 2 ? "'во " + t + " в' p" : "'в " + t + " в' p";
}
function jb(e) {
	let t = Ob[e];
	switch (e) {
		case 0: return "'в следующее " + t + " в' p";
		case 1:
		case 2:
		case 4: return "'в следующий " + t + " в' p";
		case 3:
		case 5:
		case 6: return "'в следующую " + t + " в' p";
	}
}
var Mb = {
	lastWeek: (e, t, n) => {
		let r = e.getDay();
		return Sb(e, t, n) ? Ab(r) : kb(r);
	},
	yesterday: "'вчера в' p",
	today: "'сегодня в' p",
	tomorrow: "'завтра в' p",
	nextWeek: (e, t, n) => {
		let r = e.getDay();
		return Sb(e, t, n) ? Ab(r) : jb(r);
	},
	other: "P"
}, Nb = {
	code: "ru",
	formatDistance: Eb,
	formatLong: Db,
	formatRelative: (e, t, n, r) => {
		let i = Mb[e];
		return typeof i == "function" ? i(t, n, r) : i;
	},
	localize: {
		ordinalNumber: (e, t) => {
			let n = Number(e), r = t?.unit, i;
			return i = r === "date" ? "-е" : r === "week" || r === "minute" || r === "second" ? "-я" : "-й", n + i;
		},
		era: Vy({
			values: {
				narrow: ["до н.э.", "н.э."],
				abbreviated: ["до н. э.", "н. э."],
				wide: ["до нашей эры", "нашей эры"]
			},
			defaultWidth: "wide"
		}),
		quarter: Vy({
			values: {
				narrow: [
					"1",
					"2",
					"3",
					"4"
				],
				abbreviated: [
					"1-й кв.",
					"2-й кв.",
					"3-й кв.",
					"4-й кв."
				],
				wide: [
					"1-й квартал",
					"2-й квартал",
					"3-й квартал",
					"4-й квартал"
				]
			},
			defaultWidth: "wide",
			argumentCallback: (e) => e - 1
		}),
		month: Vy({
			values: {
				narrow: [
					"Я",
					"Ф",
					"М",
					"А",
					"М",
					"И",
					"И",
					"А",
					"С",
					"О",
					"Н",
					"Д"
				],
				abbreviated: [
					"янв.",
					"фев.",
					"март",
					"апр.",
					"май",
					"июнь",
					"июль",
					"авг.",
					"сент.",
					"окт.",
					"нояб.",
					"дек."
				],
				wide: [
					"январь",
					"февраль",
					"март",
					"апрель",
					"май",
					"июнь",
					"июль",
					"август",
					"сентябрь",
					"октябрь",
					"ноябрь",
					"декабрь"
				]
			},
			defaultWidth: "wide",
			formattingValues: {
				narrow: [
					"Я",
					"Ф",
					"М",
					"А",
					"М",
					"И",
					"И",
					"А",
					"С",
					"О",
					"Н",
					"Д"
				],
				abbreviated: [
					"янв.",
					"фев.",
					"мар.",
					"апр.",
					"мая",
					"июн.",
					"июл.",
					"авг.",
					"сент.",
					"окт.",
					"нояб.",
					"дек."
				],
				wide: [
					"января",
					"февраля",
					"марта",
					"апреля",
					"мая",
					"июня",
					"июля",
					"августа",
					"сентября",
					"октября",
					"ноября",
					"декабря"
				]
			},
			defaultFormattingWidth: "wide"
		}),
		day: Vy({
			values: {
				narrow: [
					"В",
					"П",
					"В",
					"С",
					"Ч",
					"П",
					"С"
				],
				short: [
					"вс",
					"пн",
					"вт",
					"ср",
					"чт",
					"пт",
					"сб"
				],
				abbreviated: [
					"вск",
					"пнд",
					"втр",
					"срд",
					"чтв",
					"птн",
					"суб"
				],
				wide: [
					"воскресенье",
					"понедельник",
					"вторник",
					"среда",
					"четверг",
					"пятница",
					"суббота"
				]
			},
			defaultWidth: "wide"
		}),
		dayPeriod: Vy({
			values: {
				narrow: {
					am: "ДП",
					pm: "ПП",
					midnight: "полн.",
					noon: "полд.",
					morning: "утро",
					afternoon: "день",
					evening: "веч.",
					night: "ночь"
				},
				abbreviated: {
					am: "ДП",
					pm: "ПП",
					midnight: "полн.",
					noon: "полд.",
					morning: "утро",
					afternoon: "день",
					evening: "веч.",
					night: "ночь"
				},
				wide: {
					am: "ДП",
					pm: "ПП",
					midnight: "полночь",
					noon: "полдень",
					morning: "утро",
					afternoon: "день",
					evening: "вечер",
					night: "ночь"
				}
			},
			defaultWidth: "any",
			formattingValues: {
				narrow: {
					am: "ДП",
					pm: "ПП",
					midnight: "полн.",
					noon: "полд.",
					morning: "утра",
					afternoon: "дня",
					evening: "веч.",
					night: "ночи"
				},
				abbreviated: {
					am: "ДП",
					pm: "ПП",
					midnight: "полн.",
					noon: "полд.",
					morning: "утра",
					afternoon: "дня",
					evening: "веч.",
					night: "ночи"
				},
				wide: {
					am: "ДП",
					pm: "ПП",
					midnight: "полночь",
					noon: "полдень",
					morning: "утра",
					afternoon: "дня",
					evening: "вечера",
					night: "ночи"
				}
			},
			defaultFormattingWidth: "wide"
		})
	},
	match: {
		ordinalNumber: Ky({
			matchPattern: /^(\d+)(-?(е|я|й|ое|ье|ая|ья|ый|ой|ий|ый))?/i,
			parsePattern: /\d+/i,
			valueCallback: (e) => parseInt(e, 10)
		}),
		era: Uy({
			matchPatterns: {
				narrow: /^((до )?н\.?\s?э\.?)/i,
				abbreviated: /^((до )?н\.?\s?э\.?)/i,
				wide: /^(до нашей эры|нашей эры|наша эра)/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: { any: [/^д/i, /^н/i] },
			defaultParseWidth: "any"
		}),
		quarter: Uy({
			matchPatterns: {
				narrow: /^[1234]/i,
				abbreviated: /^[1234](-?[ыои]?й?)? кв.?/i,
				wide: /^[1234](-?[ыои]?й?)? квартал/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: { any: [
				/1/i,
				/2/i,
				/3/i,
				/4/i
			] },
			defaultParseWidth: "any",
			valueCallback: (e) => e + 1
		}),
		month: Uy({
			matchPatterns: {
				narrow: /^[яфмаисонд]/i,
				abbreviated: /^(янв|фев|март?|апр|ма[йя]|июн[ья]?|июл[ья]?|авг|сент?|окт|нояб?|дек)\.?/i,
				wide: /^(январ[ья]|феврал[ья]|марта?|апрел[ья]|ма[йя]|июн[ья]|июл[ья]|августа?|сентябр[ья]|октябр[ья]|октябр[ья]|ноябр[ья]|декабр[ья])/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: {
				narrow: [
					/^я/i,
					/^ф/i,
					/^м/i,
					/^а/i,
					/^м/i,
					/^и/i,
					/^и/i,
					/^а/i,
					/^с/i,
					/^о/i,
					/^н/i,
					/^я/i
				],
				any: [
					/^я/i,
					/^ф/i,
					/^мар/i,
					/^ап/i,
					/^ма[йя]/i,
					/^июн/i,
					/^июл/i,
					/^ав/i,
					/^с/i,
					/^о/i,
					/^н/i,
					/^д/i
				]
			},
			defaultParseWidth: "any"
		}),
		day: Uy({
			matchPatterns: {
				narrow: /^[впсч]/i,
				short: /^(вс|во|пн|по|вт|ср|чт|че|пт|пя|сб|су)\.?/i,
				abbreviated: /^(вск|вос|пнд|пон|втр|вто|срд|сре|чтв|чет|птн|пят|суб).?/i,
				wide: /^(воскресень[ея]|понедельника?|вторника?|сред[аы]|четверга?|пятниц[аы]|суббот[аы])/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: {
				narrow: [
					/^в/i,
					/^п/i,
					/^в/i,
					/^с/i,
					/^ч/i,
					/^п/i,
					/^с/i
				],
				any: [
					/^в[ос]/i,
					/^п[он]/i,
					/^в/i,
					/^ср/i,
					/^ч/i,
					/^п[ят]/i,
					/^с[уб]/i
				]
			},
			defaultParseWidth: "any"
		}),
		dayPeriod: Uy({
			matchPatterns: {
				narrow: /^([дп]п|полн\.?|полд\.?|утр[оа]|день|дня|веч\.?|ноч[ьи])/i,
				abbreviated: /^([дп]п|полн\.?|полд\.?|утр[оа]|день|дня|веч\.?|ноч[ьи])/i,
				wide: /^([дп]п|полночь|полдень|утр[оа]|день|дня|вечера?|ноч[ьи])/i
			},
			defaultMatchWidth: "wide",
			parsePatterns: { any: {
				am: /^дп/i,
				pm: /^пп/i,
				midnight: /^полн/i,
				noon: /^полд/i,
				morning: /^у/i,
				afternoon: /^д[ен]/i,
				evening: /^в/i,
				night: /^н/i
			} },
			defaultParseWidth: "any"
		})
	},
	options: {
		weekStartsOn: 1,
		firstWeekContainsDate: 1
	}
};
//#endregion
//#region app/(protected)/certificates/create/components/ExportButton.tsx
function Pb({ layers: e, backgroundImage: t, pageWidth: n, pageHeight: r }) {
	let [i, a] = (0, u.useState)(!1);
	return /* @__PURE__ */ (0, L.jsxs)(qv, { children: [/* @__PURE__ */ (0, L.jsx)(Jv, {
		asChild: !0,
		children: /* @__PURE__ */ (0, L.jsxs)(U, {
			variant: "default",
			size: "sm",
			disabled: i,
			children: [/* @__PURE__ */ (0, L.jsx)(cu, { className: "w-4 h-4 mr-2" }), i ? "Экспорт..." : "Экспорт"]
		})
	}), /* @__PURE__ */ (0, L.jsxs)(Yv, { children: [/* @__PURE__ */ (0, L.jsxs)(Xv, {
		onClick: async () => {
			a(!0);
			try {
				if (!e || e.length === 0) {
					E.error("Нет данных для экспорта. Добавьте хотя бы один элемент.");
					return;
				}
				if (n <= 0 || r <= 0) {
					E.error("Некорректный размер страницы");
					return;
				}
				let { jsPDF: i } = await import("./jspdf.es.min-CV1kUVjV.js"), a = new i({
					orientation: n > r ? "landscape" : "portrait",
					unit: "mm",
					format: [n, r]
				});
				if (t) try {
					a.addImage(t, "JPEG", 0, 0, n, r);
				} catch (e) {
					console.warn("Не удалось добавить фоновое изображение:", e);
				}
				let o = 0;
				for (let t of e) try {
					if (Ut(t)) {
						if (!t.text || t.text.trim() === "") continue;
						a.setFontSize(Math.max(1, Math.min(72, t.fontSize || 12))), a.setTextColor(t.color || "#000000"), a.text(t.text, Math.max(0, t.x), Math.max(0, t.y), {
							align: t.alignment,
							maxWidth: Math.max(1, t.width)
						});
					} else if (Wt(t)) {
						if (!t.src) {
							o++;
							continue;
						}
						try {
							let e = "JPEG";
							t.src.startsWith("data:image/png") && (e = "PNG"), a.addImage(t.src, e, Math.max(0, t.x), Math.max(0, t.y), Math.max(1, t.width), Math.max(1, t.height));
						} catch (e) {
							console.warn(`Не удалось добавить изображение слоя ${t.id}:`, e), o++;
						}
					} else if (Gt(t)) {
						if (!t.rows || t.rows.length === 0) continue;
						let e = t.width / Math.max(1, t.rows[0]?.length || 1);
						t.rows.forEach((n, r) => {
							!n || n.length === 0 || n.forEach((n, i) => {
								let o = t.x + i * e, s = t.y + r * 10;
								a.rect(o, s, e, 10), a.setFontSize(Math.max(1, Math.min(72, t.fontSize || 10))), a.text(n?.text || "", o + 2, s + 10 / 2 + 2, { maxWidth: e - 4 });
							});
						});
					} else if (Kt(t)) {
						if (!t.text || !t.url) continue;
						try {
							a.setTextColor(t.color || "#0066cc"), a.textWithLink(t.text, Math.max(0, t.x), Math.max(0, t.y), { url: t.url });
						} catch {
							a.setTextColor(t.color || "#0066cc"), a.text(t.text, Math.max(0, t.x), Math.max(0, t.y));
						}
					}
				} catch (e) {
					console.warn(`Ошибка при обработке слоя ${t.id}:`, e), o++;
				}
				o > 0 ? E.warning(`Экспорт завершен с предупреждениями. ${o} элементов не удалось добавить.`) : E.success("Документ успешно экспортирован в PDF"), a.save("document.pdf");
			} catch (e) {
				console.error("Error exporting to PDF:", e);
				let t = e instanceof Error ? e.message : "Неизвестная ошибка";
				E.error(`Ошибка при экспорте в PDF: ${t}`);
			} finally {
				a(!1);
			}
		},
		children: [/* @__PURE__ */ (0, L.jsx)(fu, { className: "w-4 h-4 mr-2" }), "Экспорт в PDF"]
	}), /* @__PURE__ */ (0, L.jsxs)(Xv, {
		onClick: async () => {
			a(!0);
			try {
				if (!e || e.length === 0) {
					E.error("Нет данных для экспорта. Добавьте хотя бы один элемент.");
					return;
				}
				let { Document: t, Packer: n, Paragraph: r, TextRun: i, Table: a, TableCell: o, TableRow: s, ExternalHyperlink: c } = await import("./dist-BZJcAQpb.js"), l = [], u = 0;
				for (let t of e) try {
					if (Ut(t)) {
						if (!t.text || t.text.trim() === "") continue;
						l.push(new r({
							text: t.text || "",
							alignment: t.alignment === "center" ? "center" : t.alignment === "right" ? "right" : "left",
							style: t.headingLevel && t.headingLevel !== "normal" ? t.headingLevel.toUpperCase() : void 0
						}));
					} else if (Gt(t)) {
						if (!t.rows || t.rows.length === 0) continue;
						try {
							let e = t.rows.map((e) => new s({ children: (e || []).map((e) => new o({ children: [new r(e?.text || "")] })) }));
							e.length > 0 && l.push(new a({ rows: e }));
						} catch (e) {
							console.warn(`Ошибка при обработке таблицы ${t.id}:`, e), u++;
						}
					} else if (Kt(t)) {
						if (!t.text || !t.url) continue;
						try {
							new URL(t.url), l.push(new r({ children: [new c({
								children: [new i({
									text: t.text,
									style: "Hyperlink",
									color: t.color?.replace("#", "") || "0066cc",
									underline: {}
								})],
								link: t.url
							})] }));
						} catch (e) {
							console.warn(`Ошибка при обработке гиперссылки ${t.id}:`, e), l.push(new r({ text: t.text })), u++;
						}
					}
				} catch (e) {
					console.warn(`Ошибка при обработке слоя ${t.id}:`, e), u++;
				}
				if (l.length === 0) {
					E.error("Нет данных для экспорта. Все элементы содержат ошибки.");
					return;
				}
				let d = new t({ sections: [{ children: l }] }), f = await n.toBlob(d), p = window.URL.createObjectURL(f), m = document.createElement("a");
				m.href = p, m.download = "document.docx", m.click(), window.URL.revokeObjectURL(p), u > 0 ? E.warning(`Экспорт завершен с предупреждениями. ${u} элементов не удалось добавить.`) : E.success("Документ успешно экспортирован в DOCX");
			} catch (e) {
				console.error("Error exporting to DOCX:", e);
				let t = e instanceof Error ? e.message : "Неизвестная ошибка";
				E.error(`Ошибка при экспорте в DOCX: ${t}`);
			} finally {
				a(!1);
			}
		},
		children: [/* @__PURE__ */ (0, L.jsx)(du, { className: "w-4 h-4 mr-2" }), "Экспорт в DOCX"]
	})] })] });
}
//#endregion
//#region app/(protected)/certificates/create/components/EditorToolbar.tsx
var Fb = [
	8,
	10,
	12,
	14,
	16,
	18,
	20,
	24,
	28,
	32,
	36,
	48,
	72
];
function Ib({ onOpenTemplateSelector: e, onAddVariable: t, onAddTextLayer: n, onAddImageLayer: r, onBackgroundUpload: i, onRemoveBackground: a, backgroundImage: o, onOpenPageSize: s, onZoomIn: c, onZoomOut: l, onRotate: d, zoomLevel: f, rotation: p, onSave: m, lastSaved: h, onPreview: g, selectedLayer: _, onUpdateLayer: v, onDeleteLayer: y, undo: b, redo: x, canUndo: S, canRedo: C, layers: w, pageSizeSettings: T, showFormattingSymbols: E, onToggleFormattingSymbols: D, onSelectAll: O, onSetEditingText: k }) {
	let A = (0, u.useRef)(null), j = (0, u.useRef)(null), [M, N] = (0, u.useState)({
		bold: !1,
		italic: !1,
		underline: !1
	});
	(0, u.useEffect)(() => {
		let e = () => {
			typeof document < "u" && N({
				bold: document.queryCommandState("bold"),
				italic: document.queryCommandState("italic"),
				underline: document.queryCommandState("underline")
			});
		};
		return document.addEventListener("selectionchange", e), () => document.removeEventListener("selectionchange", e);
	}, []);
	let P = (e) => {
		_ && v(_.id, e);
	}, F = (e, t = void 0) => {
		document.execCommand(e, !1, t);
		let n = document.activeElement;
		n && n.getAttribute("contenteditable") === "true" && k?.(n.innerHTML);
	}, I = (e, t) => {
		let n = window.getSelection();
		if (!n || n.rangeCount === 0) return;
		let r = n.getRangeAt(0);
		if (r.collapsed) return;
		let i = document.createElement("span");
		i.style.setProperty(e, t);
		try {
			let e = r.extractContents();
			i.appendChild(e), r.insertNode(i);
			let t = document.createRange();
			t.selectNodeContents(i), n.removeAllRanges(), n.addRange(t);
			let a = document.activeElement;
			a && a.getAttribute("contenteditable") === "true" && k?.(a.innerHTML);
		} catch (n) {
			console.error("Failed to apply inline style", n), e === "color" && F("foreColor", t);
		}
	};
	return /* @__PURE__ */ (0, L.jsxs)("div", {
		className: "border-b border-border bg-background flex flex-col",
		children: [/* @__PURE__ */ (0, L.jsxs)("div", {
			className: "flex items-center justify-between px-4 py-1 border-b border-border/50 text-xs bg-muted/20",
			children: [/* @__PURE__ */ (0, L.jsxs)("div", {
				className: "flex items-center gap-4",
				children: [
					/* @__PURE__ */ (0, L.jsx)("span", {
						className: "font-medium text-foreground/80",
						children: "Конструктор сертификатов"
					}),
					/* @__PURE__ */ (0, L.jsxs)("div", {
						className: "flex items-center gap-1 border-l border-border/50 pl-4",
						children: [/* @__PURE__ */ (0, L.jsx)(U, {
							variant: "ghost",
							size: "icon",
							className: "h-6 w-6",
							onClick: b,
							disabled: !S,
							title: "Отменить (Ctrl+Z)",
							children: /* @__PURE__ */ (0, L.jsx)(ju, { className: "w-3.5 h-3.5" })
						}), /* @__PURE__ */ (0, L.jsx)(U, {
							variant: "ghost",
							size: "icon",
							className: "h-6 w-6",
							onClick: x,
							disabled: !C,
							title: "Повторить (Ctrl+Y)",
							children: /* @__PURE__ */ (0, L.jsx)(Tu, { className: "w-3.5 h-3.5" })
						})]
					}),
					h && /* @__PURE__ */ (0, L.jsxs)("span", {
						className: "text-muted-foreground border-l border-border/50 pl-4",
						children: ["Сохранено: ", bb(h, "HH:mm:ss", { locale: Nb })]
					})
				]
			}), /* @__PURE__ */ (0, L.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, L.jsx)(Pb, {
					layers: w,
					backgroundImage: o,
					pageWidth: T.width,
					pageHeight: T.height
				}), /* @__PURE__ */ (0, L.jsx)(U, {
					variant: "ghost",
					size: "icon",
					className: "h-6 w-6",
					onClick: m,
					title: "Сохранить",
					children: /* @__PURE__ */ (0, L.jsx)(Eu, { className: "w-3.5 h-3.5" })
				})]
			})]
		}), /* @__PURE__ */ (0, L.jsxs)(Qm, {
			defaultValue: "home",
			className: "w-full",
			children: [/* @__PURE__ */ (0, L.jsx)("div", {
				className: "px-4 pt-1 border-b border-border/50",
				children: /* @__PURE__ */ (0, L.jsxs)($m, {
					className: "bg-transparent h-8 p-0 gap-1",
					children: [
						/* @__PURE__ */ (0, L.jsx)(eh, {
							value: "home",
							className: "rounded-t-md rounded-b-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-background px-3 py-1 h-8 text-xs",
							children: "Главная"
						}),
						/* @__PURE__ */ (0, L.jsx)(eh, {
							value: "insert",
							className: "rounded-t-md rounded-b-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-background px-3 py-1 h-8 text-xs",
							children: "Вставка"
						}),
						/* @__PURE__ */ (0, L.jsx)(eh, {
							value: "layout",
							className: "rounded-t-md rounded-b-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-background px-3 py-1 h-8 text-xs",
							children: "Макет"
						}),
						/* @__PURE__ */ (0, L.jsx)(eh, {
							value: "view",
							className: "rounded-t-md rounded-b-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-background px-3 py-1 h-8 text-xs",
							children: "Вид"
						})
					]
				})
			}), /* @__PURE__ */ (0, L.jsxs)("div", {
				className: "p-2 h-28 bg-muted/10 flex items-center overflow-x-auto",
				children: [
					/* @__PURE__ */ (0, L.jsxs)(th, {
						value: "home",
						className: "flex items-center gap-4 m-0 h-full w-full",
						children: [
							/* @__PURE__ */ (0, L.jsx)("div", {
								className: "flex flex-col gap-1 px-2 border-r border-border h-full justify-center",
								children: /* @__PURE__ */ (0, L.jsxs)("div", {
									className: "flex items-center gap-1",
									children: [/* @__PURE__ */ (0, L.jsxs)(U, {
										variant: "ghost",
										className: "h-20 flex flex-col gap-2 px-4 hover:bg-destructive/10 hover:text-destructive",
										onClick: () => _ && y(_.id),
										disabled: !_,
										title: "Удалить выделенный элемент",
										children: [/* @__PURE__ */ (0, L.jsx)(Ou, { className: "w-6 h-6" }), /* @__PURE__ */ (0, L.jsx)("span", {
											className: "text-xs",
											children: "Удалить"
										})]
									}), /* @__PURE__ */ (0, L.jsxs)(U, {
										variant: "ghost",
										className: "h-20 flex flex-col gap-2 px-4 hover:bg-muted",
										onClick: O,
										title: "Выделить весь текст (Ctrl+A)",
										children: [/* @__PURE__ */ (0, L.jsx)(Su, { className: "w-6 h-6" }), /* @__PURE__ */ (0, L.jsx)("span", {
											className: "text-xs",
											children: "Выделить всё"
										})]
									})]
								})
							}),
							/* @__PURE__ */ (0, L.jsxs)("div", {
								className: "flex flex-col gap-2 px-2 border-r border-border h-full justify-center min-w-[320px]",
								children: [
									/* @__PURE__ */ (0, L.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [
											/* @__PURE__ */ (0, L.jsxs)(Nu, {
												value: _?.fontFamily || "sans-serif",
												onValueChange: (e) => {
													let t = window.getSelection();
													t && !t.isCollapsed ? F("fontName", e) : P({ fontFamily: e });
												},
												disabled: !_,
												children: [/* @__PURE__ */ (0, L.jsx)(Fu, {
													className: "h-9 w-[160px] text-sm",
													children: /* @__PURE__ */ (0, L.jsx)(Pu, { placeholder: "Шрифт" })
												}), /* @__PURE__ */ (0, L.jsx)(Iu, { children: qt.map((e) => /* @__PURE__ */ (0, L.jsx)(Lu, {
													value: e.value,
													children: e.label
												}, e.value)) })]
											}),
											/* @__PURE__ */ (0, L.jsxs)(Nu, {
												value: String(_?.fontSize || 16),
												onValueChange: (e) => {
													let t = window.getSelection();
													t && !t.isCollapsed ? I("font-size", `${e}px`) : P({ fontSize: Number(e) });
												},
												disabled: !_,
												children: [/* @__PURE__ */ (0, L.jsx)(Fu, {
													className: "h-9 w-[80px] text-sm",
													children: /* @__PURE__ */ (0, L.jsx)(Pu, { placeholder: "Размер" })
												}), /* @__PURE__ */ (0, L.jsx)(Iu, { children: Fb.map((e) => /* @__PURE__ */ (0, L.jsx)(Lu, {
													value: String(e),
													children: e
												}, e)) })]
											}),
											/* @__PURE__ */ (0, L.jsxs)("div", {
												className: "flex items-center border border-input rounded-md h-9 overflow-hidden",
												children: [
													/* @__PURE__ */ (0, L.jsxs)(U, {
														variant: "ghost",
														size: "icon",
														className: "h-9 w-9 rounded-none",
														onMouseDown: (e) => e.preventDefault(),
														onClick: () => {
															let e = (_?.fontSize || 16) + 2;
															P({ fontSize: e }), I("font-size", `${e}px`);
														},
														disabled: !_,
														children: [/* @__PURE__ */ (0, L.jsx)("span", {
															className: "text-sm font-bold",
															children: "A"
														}), /* @__PURE__ */ (0, L.jsx)("span", {
															className: "text-[10px] align-top",
															children: "+"
														})]
													}),
													/* @__PURE__ */ (0, L.jsx)(my, {
														orientation: "vertical",
														className: "h-6"
													}),
													/* @__PURE__ */ (0, L.jsxs)(U, {
														variant: "ghost",
														size: "icon",
														className: "h-9 w-9 rounded-none",
														onMouseDown: (e) => e.preventDefault(),
														onClick: () => {
															let e = Math.max(8, (_?.fontSize || 16) - 2);
															P({ fontSize: e }), I("font-size", `${e}px`);
														},
														disabled: !_,
														children: [/* @__PURE__ */ (0, L.jsx)("span", {
															className: "text-sm",
															children: "A"
														}), /* @__PURE__ */ (0, L.jsx)("span", {
															className: "text-[10px] align-top",
															children: "-"
														})]
													})
												]
											})
										]
									}),
									/* @__PURE__ */ (0, L.jsxs)("div", {
										className: "flex items-center gap-1",
										children: [
											/* @__PURE__ */ (0, L.jsxs)("div", {
												className: "flex items-center bg-background border border-input rounded-md p-1",
												children: [
													/* @__PURE__ */ (0, L.jsx)(U, {
														variant: M.bold || _?.fontWeight === "bold" ? "secondary" : "ghost",
														size: "icon",
														className: "h-8 w-8",
														onMouseDown: (e) => e.preventDefault(),
														onClick: () => {
															F("bold"), window.getSelection()?.toString().length === 0 && P({ fontWeight: _?.fontWeight === "bold" ? "normal" : "bold" });
														},
														disabled: !_,
														children: /* @__PURE__ */ (0, L.jsx)(iu, { className: "w-4 h-4" })
													}),
													/* @__PURE__ */ (0, L.jsx)(U, {
														variant: M.italic || _?.fontStyle === "italic" ? "secondary" : "ghost",
														size: "icon",
														className: "h-8 w-8",
														onMouseDown: (e) => e.preventDefault(),
														onClick: () => {
															F("italic"), window.getSelection()?.toString().length === 0 && P({ fontStyle: _?.fontStyle === "italic" ? "normal" : "italic" });
														},
														disabled: !_,
														children: /* @__PURE__ */ (0, L.jsx)(_u, { className: "w-4 h-4" })
													}),
													/* @__PURE__ */ (0, L.jsx)(U, {
														variant: M.underline || _?.textDecoration?.includes("underline") ? "secondary" : "ghost",
														size: "icon",
														className: "h-8 w-8",
														onMouseDown: (e) => e.preventDefault(),
														onClick: () => {
															F("underline"), window.getSelection()?.toString().length === 0 && P({ textDecoration: _?.textDecoration === "underline" ? "none" : "underline" });
														},
														disabled: !_,
														children: /* @__PURE__ */ (0, L.jsx)(Au, { className: "w-4 h-4" })
													})
												]
											}),
											/* @__PURE__ */ (0, L.jsx)(my, {
												orientation: "vertical",
												className: "h-8 mx-2"
											}),
											/* @__PURE__ */ (0, L.jsx)("div", {
												className: "flex items-center gap-2",
												children: /* @__PURE__ */ (0, L.jsxs)("div", {
													className: "flex flex-col items-center cursor-pointer p-1 rounded hover:bg-muted",
													title: "Цвет текста",
													onClick: () => {
														let e = document.getElementById("color-picker-input");
														e && e.click();
													},
													children: [
														/* @__PURE__ */ (0, L.jsx)("span", {
															className: "font-bold text-sm",
															children: "A"
														}),
														/* @__PURE__ */ (0, L.jsx)("div", {
															className: "h-1 w-6",
															style: { backgroundColor: _?.color || "#000000" }
														}),
														/* @__PURE__ */ (0, L.jsx)("input", {
															id: "color-picker-input",
															type: "color",
															value: _?.color || "#000000",
															onChange: (e) => {
																let t = window.getSelection();
																t && !t.isCollapsed ? I("color", e.target.value) : P({ color: e.target.value });
															},
															disabled: !_,
															className: "hidden"
														})
													]
												})
											})
										]
									}),
									/* @__PURE__ */ (0, L.jsx)("span", {
										className: "text-xs text-muted-foreground text-center mt-[-4px]",
										children: "Шрифт"
									})
								]
							}),
							/* @__PURE__ */ (0, L.jsxs)("div", {
								className: "flex flex-col gap-2 px-2 border-r border-border h-full justify-center",
								children: [
									/* @__PURE__ */ (0, L.jsxs)("div", {
										className: "flex items-center gap-1",
										children: [
											/* @__PURE__ */ (0, L.jsx)(U, {
												variant: _?.listType === "bullet" ? "secondary" : "ghost",
												size: "icon",
												className: "h-8 w-8",
												onMouseDown: (e) => e.preventDefault(),
												onClick: () => P({ listType: _?.listType === "bullet" ? "none" : "bullet" }),
												disabled: !_,
												children: /* @__PURE__ */ (0, L.jsx)(bu, { className: "w-4 h-4" })
											}),
											/* @__PURE__ */ (0, L.jsx)(U, {
												variant: _?.listType === "number" ? "secondary" : "ghost",
												size: "icon",
												className: "h-8 w-8",
												onMouseDown: (e) => e.preventDefault(),
												onClick: () => P({ listType: _?.listType === "number" ? "none" : "number" }),
												disabled: !_,
												children: /* @__PURE__ */ (0, L.jsx)(yu, { className: "w-4 h-4" })
											}),
											/* @__PURE__ */ (0, L.jsx)("div", { className: "w-px h-6 bg-border mx-1" }),
											/* @__PURE__ */ (0, L.jsx)(U, {
												variant: E ? "secondary" : "ghost",
												size: "icon",
												className: "h-8 w-8",
												onMouseDown: (e) => e.preventDefault(),
												onClick: D,
												title: "Отобразить все знаки (Ctrl+*)",
												children: /* @__PURE__ */ (0, L.jsx)(Cu, { className: "w-4 h-4" })
											})
										]
									}),
									/* @__PURE__ */ (0, L.jsxs)("div", {
										className: "flex items-center gap-1",
										children: [
											/* @__PURE__ */ (0, L.jsx)(U, {
												variant: _?.alignment === "left" ? "secondary" : "ghost",
												size: "icon",
												className: "h-8 w-8",
												onMouseDown: (e) => e.preventDefault(),
												onClick: () => P({ alignment: "left" }),
												disabled: !_,
												children: /* @__PURE__ */ (0, L.jsx)(nu, { className: "w-4 h-4" })
											}),
											/* @__PURE__ */ (0, L.jsx)(U, {
												variant: _?.alignment === "center" ? "secondary" : "ghost",
												size: "icon",
												className: "h-8 w-8",
												onMouseDown: (e) => e.preventDefault(),
												onClick: () => P({ alignment: "center" }),
												disabled: !_,
												children: /* @__PURE__ */ (0, L.jsx)(tu, { className: "w-4 h-4" })
											}),
											/* @__PURE__ */ (0, L.jsx)(U, {
												variant: _?.alignment === "right" ? "secondary" : "ghost",
												size: "icon",
												className: "h-8 w-8",
												onMouseDown: (e) => e.preventDefault(),
												onClick: () => P({ alignment: "right" }),
												disabled: !_,
												children: /* @__PURE__ */ (0, L.jsx)(ru, { className: "w-4 h-4" })
											})
										]
									}),
									/* @__PURE__ */ (0, L.jsx)("span", {
										className: "text-xs text-muted-foreground text-center mt-[-4px]",
										children: "Абзац"
									})
								]
							}),
							/* @__PURE__ */ (0, L.jsxs)("div", {
								className: "flex flex-col gap-1 px-2 h-full justify-center",
								children: [/* @__PURE__ */ (0, L.jsxs)("div", {
									className: "flex items-center gap-1 bg-background border border-input rounded-md p-1",
									children: [
										/* @__PURE__ */ (0, L.jsxs)(U, {
											variant: "ghost",
											className: "h-20 flex flex-col gap-2 px-3 hover:bg-muted min-w-[60px]",
											onMouseDown: (e) => e.preventDefault(),
											onClick: () => P({
												fontSize: 16,
												fontWeight: "normal"
											}),
											disabled: !_,
											children: [/* @__PURE__ */ (0, L.jsx)(Cu, { className: "w-6 h-6" }), /* @__PURE__ */ (0, L.jsx)("span", {
												className: "text-xs",
												children: "Обычный"
											})]
										}),
										/* @__PURE__ */ (0, L.jsxs)(U, {
											variant: "ghost",
											className: "h-20 flex flex-col gap-2 px-3 hover:bg-muted min-w-[60px]",
											onMouseDown: (e) => e.preventDefault(),
											onClick: () => P({
												fontSize: 24,
												fontWeight: "bold"
											}),
											disabled: !_,
											children: [/* @__PURE__ */ (0, L.jsx)(mu, { className: "w-6 h-6" }), /* @__PURE__ */ (0, L.jsx)("span", {
												className: "text-xs",
												children: "Заголовок"
											})]
										}),
										/* @__PURE__ */ (0, L.jsxs)(U, {
											variant: "ghost",
											className: "h-20 flex flex-col gap-2 px-3 hover:bg-muted min-w-[60px]",
											onMouseDown: (e) => e.preventDefault(),
											onClick: () => P({
												fontSize: 32,
												fontWeight: "bold"
											}),
											disabled: !_,
											children: [/* @__PURE__ */ (0, L.jsx)(pu, { className: "w-6 h-6" }), /* @__PURE__ */ (0, L.jsx)("span", {
												className: "text-xs",
												children: "Название"
											})]
										})
									]
								}), /* @__PURE__ */ (0, L.jsx)("span", {
									className: "text-xs text-muted-foreground text-center mt-[-4px]",
									children: "Стили"
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, L.jsxs)(th, {
						value: "insert",
						className: "flex items-center gap-4 m-0 h-full w-full",
						children: [
							/* @__PURE__ */ (0, L.jsx)("div", {
								className: "flex flex-col gap-1 px-2 border-r border-border h-full justify-center",
								children: /* @__PURE__ */ (0, L.jsxs)(U, {
									variant: "ghost",
									className: "h-20 flex flex-col gap-2 px-4",
									onClick: n,
									children: [/* @__PURE__ */ (0, L.jsx)(ku, { className: "w-6 h-6" }), /* @__PURE__ */ (0, L.jsx)("span", {
										className: "text-sm",
										children: "Текстовое поле"
									})]
								})
							}),
							/* @__PURE__ */ (0, L.jsxs)("div", {
								className: "flex flex-col gap-1 px-2 border-r border-border h-full justify-center",
								children: [/* @__PURE__ */ (0, L.jsxs)(U, {
									variant: "ghost",
									className: "h-20 flex flex-col gap-2 px-4",
									onClick: () => j.current?.click(),
									children: [/* @__PURE__ */ (0, L.jsx)(gu, { className: "w-6 h-6" }), /* @__PURE__ */ (0, L.jsx)("span", {
										className: "text-sm",
										children: "Изображение"
									})]
								}), /* @__PURE__ */ (0, L.jsx)("input", {
									type: "file",
									ref: j,
									className: "hidden",
									accept: "image/*",
									onChange: r
								})]
							}),
							/* @__PURE__ */ (0, L.jsxs)("div", {
								className: "flex flex-col gap-1 px-2 border-r border-border h-full justify-center",
								children: [
									/* @__PURE__ */ (0, L.jsxs)(U, {
										variant: "ghost",
										className: "h-20 flex flex-col gap-2 px-4",
										onClick: () => A.current?.click(),
										children: [/* @__PURE__ */ (0, L.jsx)(hu, { className: "w-6 h-6" }), /* @__PURE__ */ (0, L.jsx)("span", {
											className: "text-sm",
											children: "Фон"
										})]
									}),
									/* @__PURE__ */ (0, L.jsx)("input", {
										type: "file",
										ref: A,
										className: "hidden",
										accept: "image/*",
										onChange: i
									}),
									o && /* @__PURE__ */ (0, L.jsx)(U, {
										variant: "ghost",
										size: "sm",
										onClick: a,
										className: "h-6 text-xs text-destructive",
										children: "Удалить"
									})
								]
							}),
							/* @__PURE__ */ (0, L.jsx)("div", {
								className: "flex flex-col gap-1 px-2 border-r border-border h-full justify-center",
								children: /* @__PURE__ */ (0, L.jsxs)(qv, { children: [/* @__PURE__ */ (0, L.jsx)(Jv, {
									asChild: !0,
									children: /* @__PURE__ */ (0, L.jsxs)(U, {
										variant: "ghost",
										className: "h-20 flex flex-col gap-2 px-4",
										children: [/* @__PURE__ */ (0, L.jsxs)("div", {
											className: "flex relative",
											children: [/* @__PURE__ */ (0, L.jsx)(uu, { className: "w-6 h-6" }), /* @__PURE__ */ (0, L.jsx)("span", {
												className: "absolute -bottom-1 -right-1 text-[10px] font-bold",
												children: "{ }"
											})]
										}), /* @__PURE__ */ (0, L.jsx)("span", {
											className: "text-sm",
											children: "Переменная"
										})]
									})
								}), /* @__PURE__ */ (0, L.jsxs)(Yv, {
									align: "start",
									className: "w-56",
									children: [
										/* @__PURE__ */ (0, L.jsx)(Zv, { children: "Вставить переменную" }),
										/* @__PURE__ */ (0, L.jsx)(Qv, {}),
										Jt.map((e) => /* @__PURE__ */ (0, L.jsx)(Xv, {
											onClick: () => t(e.label),
											className: "cursor-pointer",
											children: e.label
										}, e.id))
									]
								})] })
							})
						]
					}),
					/* @__PURE__ */ (0, L.jsxs)(th, {
						value: "layout",
						className: "flex items-center gap-4 m-0 h-full w-full",
						children: [/* @__PURE__ */ (0, L.jsx)("div", {
							className: "flex flex-col gap-1 px-2 border-r border-border h-full justify-center",
							children: /* @__PURE__ */ (0, L.jsxs)(U, {
								variant: "ghost",
								className: "h-20 flex flex-col gap-2 px-4",
								onClick: s,
								children: [/* @__PURE__ */ (0, L.jsx)(Du, { className: "w-6 h-6" }), /* @__PURE__ */ (0, L.jsx)("span", {
									className: "text-sm",
									children: "Размер"
								})]
							})
						}), /* @__PURE__ */ (0, L.jsx)("div", {
							className: "flex flex-col gap-1 px-2 border-r border-border h-full justify-center",
							children: /* @__PURE__ */ (0, L.jsxs)(U, {
								variant: "ghost",
								className: "h-20 flex flex-col gap-2 px-4",
								onClick: e,
								children: [/* @__PURE__ */ (0, L.jsx)(vu, { className: "w-6 h-6" }), /* @__PURE__ */ (0, L.jsx)("span", {
									className: "text-sm",
									children: "Шаблоны"
								})]
							})
						})]
					}),
					/* @__PURE__ */ (0, L.jsxs)(th, {
						value: "view",
						className: "flex items-center gap-4 m-0 h-full w-full",
						children: [/* @__PURE__ */ (0, L.jsxs)("div", {
							className: "flex flex-col gap-1 px-2 border-r border-border h-full justify-center",
							children: [/* @__PURE__ */ (0, L.jsxs)("div", {
								className: "flex items-center bg-background border border-input rounded-md px-2 h-10 gap-2",
								children: [
									/* @__PURE__ */ (0, L.jsx)(U, {
										variant: "ghost",
										size: "icon",
										className: "h-8 w-8",
										onClick: l,
										children: /* @__PURE__ */ (0, L.jsx)(xu, { className: "w-4 h-4" })
									}),
									/* @__PURE__ */ (0, L.jsxs)("span", {
										className: "text-sm w-12 text-center select-none",
										children: [Math.round(f * 100), "%"]
									}),
									/* @__PURE__ */ (0, L.jsx)(U, {
										variant: "ghost",
										size: "icon",
										className: "h-8 w-8",
										onClick: c,
										children: /* @__PURE__ */ (0, L.jsx)(wu, { className: "w-4 h-4" })
									})
								]
							}), /* @__PURE__ */ (0, L.jsx)("span", {
								className: "text-xs text-muted-foreground text-center mt-[-4px]",
								children: "Масштаб"
							})]
						}), /* @__PURE__ */ (0, L.jsx)("div", {
							className: "flex flex-col gap-1 px-2 border-r border-border h-full justify-center",
							children: /* @__PURE__ */ (0, L.jsxs)(U, {
								variant: "ghost",
								className: "h-20 flex flex-col gap-2 px-4",
								onClick: g,
								children: [/* @__PURE__ */ (0, L.jsx)(lu, { className: "w-6 h-6" }), /* @__PURE__ */ (0, L.jsx)("span", {
									className: "text-sm",
									children: "Просмотр"
								})]
							})
						})]
					})
				]
			})]
		})]
	});
}
//#endregion
//#region app/(protected)/certificates/create/hooks/useHistory.ts
function Lb(e) {
	let [t, n] = (0, u.useState)({
		past: [],
		present: e,
		future: []
	}), r = t.past.length > 0, i = t.future.length > 0, a = (0, u.useCallback)((e, t = !0) => {
		n((n) => {
			let r = e instanceof Function ? e(n.present) : e;
			return r === n.present ? n : t ? {
				past: [...n.past, n.present],
				present: r,
				future: []
			} : {
				...n,
				present: r
			};
		});
	}, []), o = (0, u.useCallback)(() => {
		n((e) => {
			if (e.past.length === 0) return e;
			let t = e.past[e.past.length - 1];
			return {
				past: e.past.slice(0, e.past.length - 1),
				present: t,
				future: [e.present, ...e.future]
			};
		});
	}, []), s = (0, u.useCallback)(() => {
		n((e) => {
			if (e.future.length === 0) return e;
			let t = e.future[0], n = e.future.slice(1);
			return {
				past: [...e.past, e.present],
				present: t,
				future: n
			};
		});
	}, []), c = (0, u.useCallback)((e) => {
		n({
			past: [],
			present: e,
			future: []
		});
	}, []);
	return {
		state: t.present,
		set: a,
		undo: o,
		redo: s,
		canUndo: r,
		canRedo: i,
		reset: c
	};
}
//#endregion
//#region app/(protected)/certificates/create/page.tsx
function Rb({ initialState: e, persistence: t, onSave: n } = {}) {
	let r = !!e, { state: i, set: a, undo: o, redo: s, canUndo: c, canRedo: l } = Lb([{
		id: "main-text-layer",
		type: "text",
		text: "<div>Введите текст...</div>",
		x: 0,
		y: 0,
		fontSize: 16,
		fontFamily: "sans-serif",
		color: "#000000",
		alignment: "left",
		width: 100,
		xPercent: 0,
		yPercent: 0,
		widthPercent: 100,
		isBackground: !0
	}]), [d, f] = (0, u.useState)("main-text-layer"), [p, m] = (0, u.useState)(null), h = (0, u.useRef)(i);
	(0, u.useEffect)(() => {
		h.current = i;
	}, [i]);
	let [g, _] = (0, u.useState)(!1), [v, y] = (0, u.useState)(!1), [b, x] = (0, u.useState)(!1), [S, C] = (0, u.useState)({
		format: "A4",
		width: 210,
		height: 297,
		orientation: "portrait"
	}), [w, T] = (0, u.useState)({
		x: 0,
		y: 0
	}), [E, D] = (0, u.useState)(!1), [O, k] = (0, u.useState)(1), [A, j] = (0, u.useState)(0), [M, N] = (0, u.useState)("main-text-layer"), [P, F] = (0, u.useState)(""), [I, ee] = (0, u.useState)(null), [te, ne] = (0, u.useState)(null), [re, ie] = (0, u.useState)(!1), [ae, R] = (0, u.useState)(!1), oe = (0, u.useCallback)(() => {
		N(null);
		let e = document.querySelector(".document-container");
		if (e) {
			let t = window.getSelection(), n = document.createRange();
			n.selectNodeContents(e), t?.removeAllRanges(), t?.addRange(n);
		}
	}, []), se = (0, u.useCallback)(() => {
		let e = window.getSelection();
		if (!e || e.rangeCount === 0 || e.isCollapsed) return;
		let t = e.getRangeAt(0), n = document.querySelector(".document-container");
		if (!n || !n.contains(t.commonAncestorContainer)) return;
		let r = Array.from(n.querySelectorAll("[data-layer-id]")), o = [];
		if (r.forEach((t) => {
			if (e.containsNode(t, !0)) {
				let e = t.getAttribute("data-layer-id");
				e && o.push(e);
			}
		}), o.length === 0) return;
		let s = [...i], c = s.filter((e) => !o.includes(e.id));
		c.length !== s.length && (a(c), e.removeAllRanges());
	}, [i, a]), ce = (0, u.useRef)(oe), le = (0, u.useRef)(se);
	(0, u.useEffect)(() => {
		ce.current = oe, le.current = se;
	}, [oe, se]), (0, u.useEffect)(() => {
		let e = (e) => {
			if (e.ctrlKey && (e.key === "*" || e.key === "8" && e.shiftKey) && (e.preventDefault(), ie((e) => !e)), e.key === "Backspace" || e.key === "Delete") {
				let t = document.activeElement;
				if (!(t?.tagName === "INPUT" || t?.tagName === "TEXTAREA")) {
					let t = window.getSelection();
					t && !t.isCollapsed && (e.preventDefault(), le.current());
				}
			}
			if (e.ctrlKey && e.key === "a") {
				let t = document.activeElement;
				t?.tagName === "INPUT" || t?.tagName, t?.closest(".border-b.border-border.bg-background") || (e.preventDefault(), ce.current());
			}
		};
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, []);
	let { save: ue, lastSaved: de } = ah({
		layers: i,
		backgroundImage: p,
		pageSizeSettings: S,
		setLayers: a,
		setBackgroundImage: m,
		setPageSizeSettings: C,
		enabled: t?.enabled ?? !r
	}), fe = (0, u.useRef)(!1);
	(0, u.useEffect)(() => {
		!e || fe.current || (e.layers && e.layers.length > 0 && (a(e.layers, !1), f(null), N(null), F("")), m(e.backgroundImage), C(e.pageSizeSettings), fe.current = !0);
	}, [e, a]);
	let pe = i.find((e) => e.id === d), me = (0, u.useCallback)((e, t) => {
		a((n) => n.map((n) => n.id === e ? {
			...n,
			...t
		} : n));
	}, [a]), he = (0, u.useCallback)((e, t, n, r) => {
		a((i) => i.map((i) => {
			let a = i.xPercent === void 0 ? i.x / e * 100 : i.xPercent, o = i.yPercent === void 0 ? i.y / t * 100 : i.yPercent, s = i.widthPercent === void 0 ? i.width / e * 100 : i.widthPercent, c = a * n / 100, l = o * r / 100, u = s * n / 100, d = Math.max(0, Math.min(100, a)), f = Math.max(0, Math.min(100, o)), p = Math.max(5, Math.min(100 - d, s));
			return {
				...i,
				x: Math.max(0, Math.min(n, c)),
				y: Math.max(0, Math.min(r, l)),
				width: Math.max(5, Math.min(n, u)),
				xPercent: d,
				yPercent: f,
				widthPercent: p
			};
		}));
	}, []);
	(0, u.useCallback)(() => {
		he(210, 297, S.width, S.height);
	}, [
		S.width,
		S.height,
		he
	]);
	let ge = (e, t) => {
		t !== void 0 && me(e, { text: t });
	}, _e = () => {
		let e = Date.now().toString(), t = {
			id: e,
			text: "Новый текст",
			x: 105,
			y: 148,
			fontSize: 24,
			fontFamily: "sans-serif",
			color: "#000000",
			alignment: "center",
			width: 80,
			xPercent: 105 / S.width * 100,
			yPercent: 148 / S.height * 100,
			widthPercent: 80 / S.width * 100,
			isBackground: !1
		};
		a([...i, t]), f(e);
	}, ve = (e) => {
		let t = Date.now().toString(), n = {
			id: t,
			text: e,
			x: 105,
			y: 20,
			fontSize: 28,
			fontFamily: "sans-serif",
			color: "#000000",
			alignment: "center",
			width: 80,
			xPercent: 105 / S.width * 100,
			yPercent: 20 / S.height * 100,
			widthPercent: 80 / S.width * 100
		};
		a([...i, n]), f(t);
	}, ye = (e) => {
		let t = e.target.files?.[0];
		if (t) {
			let e = new FileReader();
			e.onload = (e) => {
				let t = new Image();
				t.onload = () => {
					let n = Date.now().toString(), r = 50 / (t.width / t.height), o = (S.width - 50) / 2, s = (S.height - r) / 2, c = {
						id: n,
						type: "image",
						src: e.target?.result,
						x: o,
						y: s,
						width: 50,
						height: r,
						opacity: 1,
						rotation: 0
					};
					a([...i, c]), f(n);
				}, t.src = e.target?.result;
			}, e.readAsDataURL(t);
		}
	}, be = (e) => {
		a(i.filter((t) => t.id !== e)), d === e && f(null);
	}, xe = (e) => {
		let t = e.target.files?.[0];
		if (t) {
			let e = new FileReader();
			e.onload = (e) => {
				m(e.target?.result);
				let t = new Image();
				t.onload = () => {
					let e = Math.round(t.width / 3.78), n = Math.round(t.height / 3.78), r = S.width, i = S.height;
					C({
						format: "Custom",
						width: e,
						height: n,
						orientation: e >= n ? "landscape" : "portrait"
					}), he(r, i, e, n);
				}, t.src = e.target?.result;
			}, e.readAsDataURL(t);
		}
	}, Se = (e) => {
		if (e.preventDefault(), e.dataTransfer.files.length > 0) {
			let t = e.dataTransfer.files[0];
			if (t.type.startsWith("image/")) {
				let e = new FileReader();
				e.onload = (e) => {
					m(e.target?.result);
					let t = new Image();
					t.onload = () => {
						let e = Math.round(t.width / 3.78), n = Math.round(t.height / 3.78), r = S.width, i = S.height;
						C({
							format: "Custom",
							width: e,
							height: n,
							orientation: e >= n ? "landscape" : "portrait"
						}), he(r, i, e, n);
					}, t.src = e.target?.result;
				}, e.readAsDataURL(t);
			}
		} else {
			let t = e.dataTransfer.getData("text/plain");
			if (t) {
				let n = e.currentTarget;
				if (!n) return;
				let r = n.getBoundingClientRect(), o = e.clientX - r.left, s = e.clientY - r.top, c = Math.max(0, o / 3.78), l = Math.max(0, s / 3.78), u = c / S.width * 100, d = l / S.height * 100, p = 80 / S.width * 100, m = Date.now().toString(), h = {
					id: m,
					text: t,
					x: c,
					y: l,
					fontSize: 28,
					fontFamily: "sans-serif",
					color: "#000000",
					alignment: "center",
					width: 80,
					xPercent: u,
					yPercent: d,
					widthPercent: p
				};
				a([...i, h]), f(m);
			}
		}
	}, Ce = (e) => {
		a(Xt[e].layers.map((e) => {
			let t = e.x / 210 * 100, n = e.y / 297 * 100, r = e.width / 210 * 100, i = t * S.width / 100, a = n * S.height / 100, o = r * S.width / 100;
			return {
				...e,
				x: i,
				y: a,
				width: o,
				xPercent: t,
				yPercent: n,
				widthPercent: r
			};
		})), f(null);
	}, we = () => {
		k((e) => Math.min(e + .1, 2));
	}, Te = () => {
		k((e) => Math.max(e - .1, .5));
	}, Ee = () => {
		j((e) => (e + 90) % 360);
	}, De = (e) => {
		C(e);
	}, Oe = (e) => {
		e.preventDefault();
	}, ke = (0, u.useCallback)(() => {
		ue(!0), n?.({
			layers: i,
			backgroundImage: p,
			pageSizeSettings: S
		});
	}, [
		p,
		i,
		n,
		S,
		ue
	]);
	return /* @__PURE__ */ (0, L.jsxs)(L.Fragment, { children: [
		/* @__PURE__ */ (0, L.jsxs)("div", {
			className: "flex flex-col min-h-screen bg-background",
			children: [/* @__PURE__ */ (0, L.jsxs)("div", {
				className: "border-b border-border",
				children: [/* @__PURE__ */ (0, L.jsx)("div", {
					className: "mx-auto flex items-center justify-between px-6 py-4",
					children: /* @__PURE__ */ (0, L.jsx)("h1", {
						className: "text-2xl font-semibold text-foreground",
						children: "Конструктор сертификатов"
					})
				}), /* @__PURE__ */ (0, L.jsx)(Ib, {
					onOpenTemplateSelector: () => x(!0),
					onAddVariable: ve,
					onAddTextLayer: _e,
					onAddImageLayer: ye,
					onBackgroundUpload: xe,
					onRemoveBackground: () => {
						m(null);
					},
					backgroundImage: p,
					onOpenPageSize: () => y(!0),
					onZoomIn: we,
					onZoomOut: Te,
					onRotate: Ee,
					zoomLevel: O,
					rotation: A,
					onSave: ke,
					lastSaved: de,
					onPreview: () => _(!0),
					selectedLayer: pe,
					onUpdateLayer: me,
					onDeleteLayer: be,
					undo: o,
					redo: s,
					canUndo: c,
					canRedo: l,
					layers: i,
					pageSizeSettings: S,
					showFormattingSymbols: re,
					onToggleFormattingSymbols: () => ie(!re),
					onSelectAll: oe,
					onSetEditingText: F
				})]
			}), /* @__PURE__ */ (0, L.jsxs)("div", {
				className: "flex flex-1 min-w-0 overflow-hidden relative",
				children: [/* @__PURE__ */ (0, L.jsx)("div", {
					className: "flex-1 flex flex-col items-center justify-center bg-slate-100 p-4 overflow-auto",
					onClick: (e) => {
						e.target === e.currentTarget && (f(null), R(!1));
					},
					children: /* @__PURE__ */ (0, L.jsx)(Ju, {
						layers: i,
						backgroundImage: p,
						selectedLayerId: d,
						onSelectLayer: f,
						onLayerDoubleClick: ge,
						onCanvasDragOver: Oe,
						onCanvasDrop: Se,
						width: S.width,
						height: S.height,
						zoomLevel: O,
						rotation: A,
						showFormattingSymbols: re,
						editingLayerId: M,
						setEditingLayerId: N,
						editingText: P,
						setEditingText: F,
						editingSelectionStart: I,
						editingSelectionEnd: te,
						setEditingSelectionStart: ee,
						setEditingSelectionEnd: ne
					})
				}), pe && ae && /* @__PURE__ */ (0, L.jsx)(Ku, {
					selectedLayer: pe,
					onUpdateLayer: me,
					onDeleteLayer: be,
					onClose: () => R(!1),
					position: w,
					onPositionChange: T,
					isSidebar: !1,
					onSetEditingText: F
				})]
			})]
		}),
		g && /* @__PURE__ */ (0, L.jsxs)("div", {
			className: "fixed inset-0 z-50 bg-background flex flex-col",
			children: [/* @__PURE__ */ (0, L.jsxs)("div", {
				className: "border-b border-border px-6 py-4 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, L.jsx)("h2", {
					className: "text-xl font-semibold text-foreground",
					children: "Предварительный просмотр сертификата"
				}), /* @__PURE__ */ (0, L.jsx)(U, {
					variant: "outline",
					size: "sm",
					onClick: () => _(!1),
					children: "Закрыть"
				})]
			}), /* @__PURE__ */ (0, L.jsx)("div", {
				className: "flex-1 flex items-start justify-center bg-slate-100 p-4 overflow-auto pt-8",
				children: /* @__PURE__ */ (0, L.jsx)("div", {
					className: "relative bg-white rounded-lg overflow-hidden border-2 border-border",
					style: {
						backgroundImage: p ? `url(${p})` : void 0,
						backgroundSize: "cover",
						backgroundPosition: "center",
						aspectRatio: `${S.width} / ${S.height}`,
						width: `${(S.width * 3.78).toFixed(2)}px`,
						height: "auto",
						maxWidth: "100%"
					},
					children: i.map((e) => {
						let t = {
							x: e.xPercent === void 0 ? e.x / S.width * 100 : e.xPercent,
							y: e.yPercent === void 0 ? e.y / S.height * 100 : e.yPercent,
							width: e.widthPercent === void 0 ? e.width / S.width * 100 : e.widthPercent
						}, n = `${t.x}%`, r = "none";
						return e.alignment === "center" ? (n = `${t.x}%`, r = "translateX(-50%)") : e.alignment === "right" && (n = "auto"), /* @__PURE__ */ (0, L.jsx)("div", {
							className: "absolute",
							style: {
								top: `${t.y}%`,
								left: e.alignment === "right" ? "auto" : n,
								right: e.alignment === "right" ? `${t.x}%` : void 0,
								transform: r,
								width: `${t.width}%`,
								height: "auto",
								fontFamily: e.fontFamily,
								fontSize: `${e.fontSize}px`,
								color: e.color,
								fontWeight: e.fontWeight || "normal",
								fontStyle: e.fontStyle || "normal",
								textDecoration: e.textDecoration || "none",
								lineHeight: e.lineHeight || "normal",
								letterSpacing: e.letterSpacing ? `${e.letterSpacing}px` : "normal",
								WebkitTextStroke: e.borderWidth ? `${e.borderWidth}px ${e.borderColor || "#000000"}` : void 0,
								opacity: e.opacity === void 0 ? 1 : e.opacity,
								textAlign: e.alignment,
								boxSizing: "border-box",
								padding: "2px 4px",
								whiteSpace: "pre-wrap"
							},
							children: /* @__PURE__ */ (0, L.jsx)("span", {
								className: "block whitespace-normal break-words",
								style: { textAlign: e.alignment },
								dangerouslySetInnerHTML: { __html: e.text || "\xA0" }
							})
						}, e.id);
					})
				})
			})]
		}),
		/* @__PURE__ */ (0, L.jsx)(hf, {
			open: v,
			onOpenChange: y,
			onSave: De,
			initialSettings: S
		}),
		b && /* @__PURE__ */ (0, L.jsx)(nh, {
			onSelectTemplate: Ce,
			onClose: () => x(!1)
		})
	] });
}
//#endregion
//#region web-component/document-constructor/entry.tsx
console.log("[document-constructor] entry loaded");
var zb = class extends HTMLElement {
	constructor(...e) {
		super(...e), this.root = null, this._initialState = null, this.didReadyDispatched = !1;
	}
	static get observedAttributes() {
		return ["doc-id"];
	}
	get initialState() {
		return this._initialState;
	}
	set initialState(e) {
		console.log("[document-constructor] setter initialState called", e), this._initialState = e, this.render();
	}
	connectedCallback() {
		console.log("[document-constructor] connectedCallback()"), this._upgradeProperty("initialState"), this.style.display || (this.style.display = "block"), this.render();
	}
	_upgradeProperty(e) {
		if (Object.prototype.hasOwnProperty.call(this, e)) {
			let t = this[e];
			delete this[e], this[e] = t;
		}
	}
	disconnectedCallback() {
		this.root?.unmount(), this.root = null;
	}
	render() {
		if (!this._initialState) return;
		console.log("[document-constructor] render()", this._initialState), this.root ||= l.createRoot(this);
		let e = this._initialState;
		this.didReadyDispatched || (this.didReadyDispatched = !0, this.dispatchEvent(new CustomEvent("constructor-ready", { detail: { docId: this.getAttribute("doc-id") ?? void 0 } })));
		try {
			this.root.render(/* @__PURE__ */ (0, L.jsxs)(L.Fragment, { children: [/* @__PURE__ */ (0, L.jsx)(ie, {}), /* @__PURE__ */ (0, L.jsx)(Rb, {
				initialState: e,
				onSave: (e) => {
					this.dispatchEvent(new CustomEvent("constructor-save", { detail: {
						docId: this.getAttribute("doc-id") ?? void 0,
						state: e
					} }));
				}
			})] }));
		} catch (e) {
			console.error("[document-constructor] error during render:", e), this.dispatchEvent(new CustomEvent("constructor-error", { detail: { message: e instanceof Error ? e.message : String(e) } }));
		}
	}
};
//#endregion
export { zb as DocumentConstructorElement };
