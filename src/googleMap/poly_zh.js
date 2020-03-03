google.maps.__gjsload__('poly', function(_) {
	var WW = function(a) {
			for (a = a.toString(16); 2 > a.length; ) a = '0' + a;
			return a;
		},
		haa = function(a) {
			var b = a.length;
			!b ||
				(a[0] == a[b - 2] && a[1] == a[b - 1]) ||
				(a.push(a[0]), a.push(a[1]));
		},
		XW = function(a, b) {
			for (var c = 0, d = a.length; c < d; c += 2) {
				var e = new _.L(a[c], a[c + 1], !0);
				e = _.rn(e, b);
				a[c] = e.Da;
				a[c + 1] = e.Ha;
			}
		},
		YW = function(a, b, c) {
			var d = a.path;
			a = a.i;
			for (
				var e = [],
					f = a ? [] : null,
					g = d[0] == d[d.length - 2] && d[1] == d[d.length - 1],
					h = 0,
					k = d.length - 2;
				h < k;
				h += 2
			) {
				var l = d[h],
					m = d[h + 1],
					q = d[h + 2],
					t = d[h + 3];
				if (a) {
					var u = a[h / 2];
					var v = a[h / 2 + 1];
				}
				switch (b) {
					case 0:
						var w = l >= c;
						var x = q >= c;
						break;
					case 1:
						w = l <= c;
						x = q <= c;
						break;
					case 2:
						w = m >= c;
						x = t >= c;
						break;
					case 3:
						(w = m <= c), (x = t <= c);
				}
				!h && w && (e.push(l, m), a && f.push(u));
				if (w != x) {
					switch (b) {
						case 0:
						case 1:
							var C = (c - l) / (q - l);
							e.push(c, m + C * (t - m));
							break;
						case 2:
						case 3:
							(C = (c - m) / (t - m)), e.push(l + C * (q - l), c);
					}
					a && f.push(u + C * (v - u));
				}
				x && (e.push(q, t), a && f.push(v));
			}
			g &&
				e.length &&
				(e[0] != e[e.length - 2] || e[1] != e[e.length - 1]) &&
				(e.push(e[0], e[1]), a && f.push(a[a.length - 1]));
			return { path: e, i: f };
		},
		iaa = function(a, b) {
			a = YW(a, 0, b.Ka);
			a = YW(a, 1, b.Pa);
			a = YW(a, 2, b.Ia);
			return YW(a, 3, b.Oa);
		},
		jaa = function(a, b, c) {
			for (var d = 0, e = 0, f = c.length; e < f; ++e) d += _.nF(a, b, c[e]);
			return !!(d & 1);
		},
		kaa = function(a, b, c, d) {
			for (var e = null, f = c * c, g = 0, h = d.length; g < h; ++g) {
				var k = a,
					l = b,
					m = c,
					q = d[g],
					t = q.length;
				if (!t || 0 >= m) var u = null;
				else {
					var v = 0,
						w = m * m * 1.01,
						x = [0, 0];
					var C = q[v++] - k;
					var J = q[v++] - l;
					u =
						(C < -m ? 1 : 0) |
						(C > m ? 2 : 0) |
						(J < -m ? 4 : 0) |
						(J > m ? 8 : 0);
					var M = C * C + J * J;
					!u && M <= w && ((w = M), (x[0] = C), (x[1] = J));
					for (; v < t; ) {
						var U = C;
						var wa = J;
						var qa = u;
						C = q[v++] - k;
						J = q[v++] - l;
						u =
							(C < -m ? 1 : 0) |
							(C > m ? 2 : 0) |
							(J < -m ? 4 : 0) |
							(J > m ? 8 : 0);
						if (!(qa & u)) {
							M = C * C + J * J;
							!u && M <= w && ((w = M), (x[0] = C), (x[1] = J));
							qa = C - U;
							var bb = J - wa,
								ic = qa * qa + bb * bb;
							if (!(1e-12 > ic)) {
								var Yd = C * qa + J * bb;
								0 > Yd ||
									Yd > ic ||
									((M -= (Yd * Yd) / ic),
									M <= w &&
										((w = M),
										(ic = 1 - Yd / ic),
										(x[0] = U + qa * ic),
										(x[1] = wa + bb * ic)));
							}
						}
					}
					x[0] += k;
					x[1] += l;
					x[2] = w;
					u = w <= m * m ? x : null;
				}
				u && u[2] <= f && ((f = u[2]), (e = u));
			}
			return e;
		},
		laa = function(a) {
			var b = new _.pK(['mousemove', 'mouseup', 'mousewheel']);
			_.py(b, ['panes', 'pixelBounds'], a);
			return b;
		},
		ZW = function(a) {
			var b = laa(a);
			_.N.addListener(b, 'mousemove', _.de);
			_.N.addListener(b, 'mouseup', _.de);
			_.N.addListener(b, 'mousewheel', function(c) {
				var d = a.get('mouseEventTarget');
				d &&
					((d = [d, 'mousewheel'].concat(_.fx(arguments, 0))),
					_.N.trigger.apply(null, d));
			});
			return b;
		},
		$W = _.n(),
		bX = function(a) {
			var b = ['px', '%'];
			if (!a || !_.Xc(b)) return null;
			if ('0' == a) return { value: 0, i: b[0] };
			for (var c = 0, d = b.length; c < d; ++c) {
				var e = b[c],
					f = (aX[e] =
						aX[e] || new RegExp('^(\\d+(?:\\.\\d+)?)' + e + '$')).exec(a);
				if (f) return { value: parseFloat(f[1]), i: e };
			}
			return null;
		},
		cX = function(a, b, c) {
			var d = _.sn(new _.Cd(c.x, c.y), a);
			a = _.sn(new _.Cd(c.x + b, c.y + b), a);
			return Math.min(Math.abs(d.lat() - a.lat()), Math.abs(d.lng() - a.lng()));
		},
		dX = function(a) {
			this.y = this.x = 0;
			this.z = a;
		},
		fX = function(a) {
			var b = Math.sqrt(eX(a, a));
			1e-12 > b || ((a.x /= b), (a.y /= b), (a.z /= b));
		},
		eX = function(a, b) {
			return a.x * b.x + a.y * b.y + a.z * b.z;
		},
		gX = function(a, b, c) {
			c.x = a.y * b.z - a.z * b.y;
			c.y = a.z * b.x - a.x * b.z;
			c.z = a.x * b.y - a.y * b.x;
		},
		hX = function(a, b) {
			var c = _.Kd(a[0]);
			a = _.Kd(a[1]);
			var d = Math.cos(c);
			b.x = Math.cos(a) * d;
			b.y = Math.sin(a) * d;
			b.z = Math.sin(c);
		},
		iX = function(a, b) {
			var c = Math.atan2(a.y, a.x);
			b[0] = _.Ld(Math.atan2(a.z, Math.sqrt(a.x * a.x + a.y * a.y)));
			b[1] = _.Ld(c);
		},
		maa = function(a, b, c) {
			c.x = a.x + b.x;
			c.y = a.y + b.y;
			c.z = a.z + b.z;
			fX(c);
		},
		jX = function() {
			var a = new _.Ni({ clickable: !1, fillOpacity: 0 });
			a.bindTo('map', this);
			a.bindTo('strokeColor', this);
			a.bindTo('strokeOpacity', this);
			a.bindTo('strokeWeight', this);
			var b = ['center', 'freeVertexPosition', 'freeVertexIsCenter'],
				c = new _.mz(b, 'return', naa);
			_.py(c, b, this);
			a.bindTo('center', c, 'return');
			b = [
				'center',
				'radius',
				'planetRadius',
				'freeVertexPosition',
				'freeVertexIsCenter'
			];
			c = new _.mz(b, 'return', (0, _.y)(this.j, this));
			_.py(c, b, this);
			a.bindTo('radius', c, 'return');
			this.i = _.qK();
			this.i.bindTo('zIndex', this);
			a.bindTo('zIndex', this.i, 'ghostZIndex');
		},
		naa = function(a, b, c) {
			return (c && b) || a;
		},
		lX = function(a, b, c, d, e, f, g) {
			var h = this;
			a = _.no('div', a);
			a.style.display = 'none';
			var k = 9 + 2 * (1 + c);
			_.Wg(a, new _.K(k, k));
			f.construct(a, c, 9, 1, g ? 0.5 : 1);
			f = new _.$E(a, !0);
			f.bindTo('containerPixelBounds', h, 'mapPixelBounds');
			f.bindTo('panningEnabled', h);
			f.set('draggableCursor', d);
			f.bindTo('position', this);
			f.bindTo('deltaClientPosition', this);
			this.i = a;
			this.H = b;
			this.$ = c;
			this.ka = e;
			this.o = f;
			this.j = !1;
			var l;
			this.Fa = [
				_.N.addListener(f, 'dragstart', function() {
					b.set('draggableCursor', d);
					b.set('active', !0);
				}),
				_.N.addListener(f, 'dragend', function() {
					b.set('active', !1);
					l && (_.B(l, _.N.removeListener), (l = null));
				}),
				_.N.forward(f, 'panbynow', h),
				_.N.forward(f, 'dragstart', h),
				_.N.forward(f, 'dragend', h)
			];
			this.T = _.Ep(a, {
				Ib: function(m) {
					_.Uo(m);
					_.N.trigger(h, 'mousedown', m.Sa);
				},
				Fd: function(m) {
					_.Vo(m);
					_.N.trigger(h, 'mousemove', m.Sa);
				},
				Wb: function(m) {
					_.Vo(m);
					_.N.trigger(h, 'mousemove', m.Sa);
				},
				Mb: function(m) {
					_.Wo(m);
					_.N.trigger(h, 'mouseup', m.Sa);
				},
				onClick: function(m) {
					var q = m.event;
					m = m.Ud;
					_.Xo(q);
					3 == q.button
						? m || _.N.trigger(h, 'rightclick', q.Sa)
						: m
						? _.N.trigger(h, 'dblclick', q.Sa)
						: _.N.trigger(h, 'click', q.Sa);
				}
			});
			this.W = new _.kt(a, a, {
				jf: function(m) {
					h.j = !1;
					kX(h);
					_.fe(m);
					_.ge(m);
					_.N.trigger(h, 'mouseout', m);
				},
				kf: function(m) {
					h.j = !0;
					kX(h);
					_.fe(m);
					_.ge(m);
					_.N.trigger(h, 'mouseover', m);
				}
			});
		},
		kX = function(a) {
			if (a.j) {
				var b = _.CK(a.get('color'));
				if (b) {
					b.o = Math.floor((b.o + 255) / 2);
					b.j = Math.floor((b.j + 255) / 2);
					b.i = Math.floor((b.i + 255) / 2);
					var c = ['#', WW(b.o), WW(b.j), WW(b.i)].join('');
				}
			}
			a.i.firstChild.style.backgroundColor = c || 'white';
		},
		nX = function(a, b, c, d, e, f, g, h) {
			function k() {
				l.W || _.N.trigger(l, 'toolbar', { i: !1 });
			}
			this.Ta = a;
			this.ta = b;
			this.ka = c;
			this.H = _.no('div', e, _.pk);
			this.W = d;
			this.Qa = f;
			this.i = g;
			this.o = h;
			this.j = [];
			a.forEach((0, _.y)(this.$, this));
			var l = this;
			this.ua = [
				_.N.addListener(a, 'insert_at', function(m) {
					l.$(a.getAt(m), m);
					mX(l, m + 1);
					k();
				}),
				_.N.addListener(a, 'remove_at', function(m) {
					var q = l.j[m];
					l.j.splice(m, 1);
					l.ya(q);
					mX(l, m);
					k();
				}),
				_.N.addListener(a, 'set_at', function(m) {
					l.j[m].j.set('latLngPosition', a.getAt(m));
					k();
				})
			];
		},
		oX = function(a, b, c) {
			if ((b = b.j.ka) && a.i) {
				a = a.i.__gm.get('projectionController');
				var d = a.fromLatLngToDivPixel(c);
				b = b(d);
				if ((b = a.fromDivPixelToLatLng(b))) return b;
			}
			return c;
		},
		pX = function(a, b) {
			if (b && a.o) {
				if (2 == a.W) return { clientX: a.o.clientX, clientY: b.clientY };
				if (1 == a.W) return { clientX: b.clientX, clientY: a.o.clientY };
			}
			return b;
		},
		qX = function(a, b, c) {
			var d = b.index,
				e = b.j.get('position');
			b =
				(b = b.j.get('latLngPosition')) && a.i
					? _.rn(b, a.i.get('projection'))
					: null;
			_.N.trigger(a, c, d, e, b);
		},
		mX = function(a, b) {
			for (var c = a.j.length; b < c; ++b) a.j[b].index = b;
		},
		rX = function(a, b, c) {
			this.T = a;
			this.W = b;
			this.H = null;
			this.j = !1;
			this.i = new _.Xe();
			this.o = !1;
			this.$ = c;
			_.N.bind(this.i, 'set_at', this, this.Jo);
		},
		qaa = function(a) {
			var b = a.get('panes');
			if (!b) return null;
			b = new nX(
				a.i,
				oaa,
				paa,
				!1,
				b.overlayMouseTarget,
				a.W,
				a.get('map'),
				a.$
			);
			b.bindTo('projection', a);
			b.bindTo('zoom', a);
			b.bindTo('projectionCenterQ', a);
			b.bindTo('panningEnabled', a);
			b.bindTo('mapPixelBounds', a);
			b.bindTo('color', a);
			b.bindTo('zIndex', a);
			b.bindTo('offset', a);
			var c = a.T;
			c.bindTo('freeVertexPosition', b);
			var d, e;
			_.N.addListener(b, 'dragstart', function(f) {
				d = a.get('center');
				e = a.get('radius');
				c.set('freeVertexIsCenter', 0 == f);
				c.set('map', a.get('map'));
			});
			_.N.addListener(b, 'dragend', function(f, g, h) {
				c.set('map', null);
				_.N.trigger(a, 'toolbar', {
					i: !0,
					j: h,
					action: function() {
						a.set('center', d);
						a.set('radius', e);
					}
				});
			});
			_.N.forward(b, 'dragstart', a);
			_.N.forward(b, 'dragend', a);
			_.N.forward(b, 'panbynow', a);
			return b;
		},
		sX = function(a) {
			var b = a.H;
			b &&
				(b.unbindAll(),
				b.release(),
				_.N.clearInstanceListeners(b),
				(a.H = null));
		},
		tX = _.n(),
		saa = function(a, b, c, d) {
			function e() {
				a.get('editable')
					? raa(a, b, c, d)
					: (uX(a), _.N.trigger(a, 'toolbar', { i: !1 }));
			}
			a.editable_changed = e;
			e();
		},
		raa = function(a, b, c, d) {
			if (!a.o) {
				var e = new _.uK(a, !0);
				a.H = e;
				var f = new jX();
				f.bindTo('strokeColor', e);
				f.bindTo('strokeOpacity', e, 'ghostStrokeOpacity');
				f.bindTo('strokeWeight', e);
				f.bindTo('center', a);
				f.bindTo('radius', a);
				f.bindTo('planetRadius', c);
				f.bindTo('zIndex', a);
				a.T = f;
				var g = b.__gm;
				a.i = ZW(g);
				var h = _.iF(g, a),
					k = _.go() ? 9 : 0,
					l = new tX();
				d = new rX(
					f,
					function(m, q, t) {
						return new lX(m, a.i, k, q, h, l, t);
					},
					d
				);
				d.set('map', b);
				d.bindTo('center', a);
				d.bindTo('radius', a);
				d.bindTo('planetRadius', c);
				d.bindTo('panes', g);
				d.bindTo('projection', b);
				d.bindTo('zoom', g);
				d.bindTo('projectionCenterQ', g);
				d.bindTo('panningEnabled', b, 'draggable');
				d.bindTo('mapPixelBounds', g, 'pixelBounds');
				d.bindTo('offset', g);
				d.bindTo('color', e, 'strokeColor');
				d.bindTo('zIndex', a);
				a.o = d;
				_.N.forward(d, 'panbynow', g);
				_.N.forward(d, 'toolbar', a);
			}
		},
		uX = function(a) {
			var b = a.o;
			b &&
				(b.unbindAll(),
				b.set('map', null),
				_.N.clearInstanceListeners(b),
				delete a.o,
				a.i.unbindAll(),
				a.i.release(),
				delete a.i,
				a.T.unbindAll(),
				delete a.T,
				a.H.release(),
				delete a.H);
		},
		vX = function(a, b, c, d, e) {
			this.o = a;
			this.Ra = c;
			a = a.get('center');
			b = c.fromDivPixelToLatLng(b);
			this.T = d(a, b);
			this.j = _.yx(b, a);
			this.H = e;
		},
		taa = function(a, b) {
			-180 == a && 180 != b && (a = 180);
			-180 == b && 180 != a && (b = 180);
			this.i = a;
			this.j = b;
		},
		wX = function(a) {
			return a.isEmpty() ? 0 : a.i > a.j ? 360 - (a.i - a.j) : a.j - a.i;
		},
		xX = function(a, b) {
			var c = b - a;
			return 0 <= c ? c : b + 180 - (a - 180);
		},
		uaa = function(a, b, c) {
			var d = 250;
			d = void 0 === d ? 250 : d;
			var e = Array(d),
				f = _.Kd(a.lat()),
				g = _.Kd(a.lng()),
				h = Math.cos(b),
				k = Math.sin(b),
				l = Math.cos(f);
			f = Math.sin(f);
			if (1e-6 < l)
				for (a = 0; a < d; ++a) {
					b = (a / d) * Math.PI * 4;
					b += Math.sin(b + Math.PI);
					var m = b / 2,
						q = f * h + l * k * Math.cos(m);
					b = Math.asin(q);
					m = g + Math.atan2(Math.sin(m) * k * l, h - f * q);
					q = -Math.PI;
					var t = Math.PI - q;
					m = ((((m - q) % t) + t) % t) + q;
					e[a] = c(_.Ld(b), _.Ld(m));
				}
			else
				for (
					g = _.Ld(b), g = 0 < a.lat() ? a.lat() - g : a.lat() + g, h = 0;
					h < d;
					++h
				)
					e[h] = c(g, (360 * h) / d);
			return e;
		},
		zX = function(a) {
			var b = this,
				c = this,
				d = new _.Pi();
			this.j = d;
			d.Te = a;
			d.Df = !0;
			d.bindTo('capturing', c);
			d.bindTo('cursor', c);
			d.bindTo('map', c);
			d.bindTo('strokeColor', c);
			d.bindTo('strokeOpacity', c);
			d.bindTo('strokeWeight', c);
			d.bindTo('strokePosition', c);
			d.bindTo('fillColor', c);
			d.bindTo('fillOpacity', c);
			d.bindTo('clickable', c);
			d.bindTo('zIndex', c);
			d.bindTo('suppressUndo', c);
			var e = (this.i = []);
			_.B(yX, function(f) {
				e.push(_.N.forward(d, f, c));
			});
			e.push(_.N.forward(c, 'toolbar', d));
			this.Ja = new _.ji(function() {
				var f = b.j;
				if (f) {
					var g = b.get('radius'),
						h = b.get('center');
					_.fd(g) && h
						? ((g /= b.get('planetRadius')), f.setPaths(vaa(h, g)))
						: f.setPaths([]);
				}
			}, 0);
		},
		vaa = function(a, b) {
			var c = [
				uaa(a, b, function(d, e) {
					return new _.L(d, e);
				})
			];
			_.Kd(a.lat()) - b < -Math.PI / 2 &&
				((a = [
					new _.L(-90, -200, !0),
					new _.L(90, -200, !0),
					new _.L(90, -100, !0),
					new _.L(90, 0, !0),
					new _.L(90, 100, !0),
					new _.L(90, 200, !0),
					new _.L(-90, 200, !0),
					new _.L(-90, 100, !0),
					new _.L(-90, 0, !0),
					new _.L(-90, -100, !0),
					new _.L(-90, -200, !0)
				]),
				c.push(a));
			return c;
		},
		AX = function(a, b, c, d, e, f) {
			this.j = a;
			this.Ra = c;
			this.$ = e;
			this.W = f;
			var g = waa(this);
			b = c.fromDivPixelToLatLng(b);
			this.ka = _.yx(g, b);
			this.ta = d(g, b);
			var h = (this.T = []);
			a.get('latLngs').forEach(function(k) {
				var l = [];
				k.forEach(function(m) {
					l.push({ heading: d(g, m), distance: _.yx(m, g) });
				});
				h.push(l);
			});
			this.o = g;
			this.H = b.lng() - g.lng();
		},
		waa = function(a) {
			a = a.j.get('latLngs');
			var b = new dX(0),
				c = new dX(0);
			a.forEach(function(d) {
				d.forEach(function(e) {
					hX([e.lat(), e.lng()], c);
					b.x += c.x;
					b.y += c.y;
					b.z += c.z;
				});
			});
			fX(b);
			a = [0, 0];
			iX(b, a);
			a[0] = _.$c(a[0], -89, 89);
			return new _.L(a[0], a[1]);
		},
		BX = function(a, b, c) {
			this.o = a;
			this.Ra = c;
			this.j = c.fromDivPixelToLatLng(b);
			var d = (this.H = []);
			a.get('latLngs').forEach(function(e) {
				d.push(_.fx(e.getArray(), 0));
			});
		},
		CX = function(a, b, c) {
			this.i = null;
			this.$ = a;
			this.H = b;
			var d = this;
			this.j = new _.By(
				c.j,
				{
					Ke: function(e) {
						e && d.set('position', new _.I(e.wa, e.Ca));
					},
					He: _.n()
				},
				null,
				c
			);
			c.yc(this.j);
			this.Fa = null;
			this.o = new _.QE(function(e, f) {
				_.N.trigger(d, 'panbynow', e, f);
			});
			a = new _.mz(['waitingForQuiver', 'dragging'], 'active', function(e, f) {
				return e || f;
			});
			a.bindTo('dragging', this, null, !0);
			a.bindTo('waitingForQuiver', this, null, !0);
			this.bindTo('active', a, null, !0);
		},
		DX = function(a, b) {
			var c = a.get('position');
			c = a.Ra.fromDivPixelToLatLng(c);
			c = new _.Xm(c);
			a.i && _.N.trigger(a.i, b, c);
		},
		EX = function(a, b) {
			function c() {
				var e = a.get('gestureHandling');
				null != e
					? b.set('panningEnabled', 'none' != e)
					: b.set('panningEnabled', a.get('draggable'));
			}
			var d = a.__gm;
			_.N.addListener(a, 'gesturehandling_changed', c);
			_.N.addListener(a, 'draggable_changed', c);
			b.bindTo('panes', d);
			b.bindTo('projectionController', d);
			b.bindTo('containerPixelBounds', d, 'pixelBounds');
			d.kc = _.N.forward(b, 'panbynow', d);
		},
		FX = function(a, b) {
			function c() {
				var d = a.getMap();
				a.getDraggable() && (_.ij(d, 'Od'), _.uo('Od', '-p', a));
			}
			a.draggable_changed = c;
			c();
			a.Pi = [
				_.N.addListener(a, 'mouseover', function(d) {
					null == d.vertex && null == d.edge && b.set('poly', a);
				}),
				_.N.addListener(a, 'click', function(d) {
					null == d.vertex &&
						null == d.edge &&
						a.getDraggable() &&
						_.uo('Od', '-i', a);
				}),
				_.N.addListener(a, 'mouseout', function(d) {
					null != d.vertex ||
						null != d.edge ||
						(d.tb && _.qm(d.tb)) ||
						b.set('poly', null);
				})
			];
		},
		yaa = function(a) {
			var b = this;
			this.j = a;
			this.i = a.__gm;
			this.H = this.o = null;
			this.i.i.then(function(c) {
				c = c.nb;
				b.H = c;
				xaa(b, c);
			});
			this.i.T.i = function(c) {
				return GX(b, c);
			};
			this.i.T.onRemove = function(c) {
				if (b.H) {
					var d = c.Ei;
					d.unbindAll();
					d.set('map', null);
					d.release();
					delete c.Ei;
					c.listeners && _.B(c.listeners, _.N.removeListener);
					delete c.listeners;
					delete c.editable_changed;
					uX(c);
					_.vo('Oc', '-p', c);
				}
			};
		},
		xaa = function(a, b) {
			_.P('geometry').then(function(c) {
				a.o = new CX(
					function(d, e, f) {
						return new vX(d, e, f, c.computeHeading, c.computeOffsetOrigin);
					},
					a.j,
					b
				);
				EX(a.j, a.o);
				a.i.T.forEach(function(d) {
					return GX(a, d);
				});
			});
		},
		GX = function(a, b) {
			if (a.o && a.H) {
				var c = (b.W = new _.mz(['baseMapType'], 'planetRadius', _.Hi));
				c.bindTo('baseMapType', a.i);
				var d = (b.Ei = new zX(b));
				d.set('map', a.j);
				d.bindTo('radius', b);
				d.bindTo('center', b);
				d.bindTo('capturing', b);
				d.bindTo('clickable', b);
				d.bindTo('cursor', b);
				d.bindTo('fillColor', b);
				d.bindTo('fillOpacity', b);
				d.bindTo('strokeColor', b);
				d.bindTo('strokeOpacity', b);
				d.bindTo('strokeWeight', b);
				d.bindTo('strokePosition', b);
				d.bindTo('zIndex', b);
				d.bindTo('suppressUndo', b);
				d.bindTo('planetRadius', c);
				b.listeners = [];
				_.B(yX, function(e) {
					b.listeners.push(_.N.forward(d, e, b));
				});
				b.listeners.push(_.N.forward(b, 'toolbar', d));
				FX(b, a.o);
				saa(b, a.j, c, a.H);
				_.ij(a.j, 'Oc');
				_.uo('Oc', '-p', b);
				_.N.addListener(b, 'click', function() {
					_.uo('Oc', '-i', b);
				});
			}
		},
		zaa = function(a, b, c, d) {
			a.capturing_changed = function() {
				if (a.get('capturing'))
					if (0 == a.get('clickable')) {
						var e = (a.j = new $W());
						e.bindTo('draggableCursor', a, 'cursor');
						e.set('active', !0);
						b.bindTo('cursor', e);
						d.register(e);
					} else (d.i = c), (d.o = a);
				else
					a.j
						? (_.tx(d.H, a.j),
						  a.j.unbindAll(),
						  b.unbind('cursor'),
						  b.set('cursor', ''),
						  delete a.j)
						: d.i == c && d.o == a && ((d.i = null), (d.o = null));
			};
		},
		MX = function(a, b, c) {
			var d = this;
			this.$ = a;
			this.H = b;
			this.T = c;
			this.j = {};
			this.i = {};
			this.o = 0;
			this.W = function(e) {
				HX(d, this, e);
			};
			a.i = function(e) {
				var f = d.get('projection');
				f = e.dg = { style: IX(d.T, e), geometry: JX(e, f) };
				KX(d, e);
				e.changed = d.W;
				_.Ze(d.H, f);
			};
			a.onRemove = function(e) {
				var f = e.dg;
				delete e.dg;
				d.H.remove(f);
				delete e.changed;
				LX(e);
				e = _.oe(e);
				delete d.j[e];
				delete d.i[e];
			};
		},
		HX = function(a, b, c) {
			var d = _.oe(b);
			c in Aaa && ((a.i[d] = b), LX(b));
			c in Baa && (a.j[d] = b);
			NX(a);
		},
		NX = function(a) {
			a.o ||
				(a.o = _.Qm(function() {
					a.o = 0;
					var b = a.j;
					a.j = {};
					var c = a.i;
					a.i = {};
					for (var d in b) {
						var e = b[d],
							f = e.dg;
						f.style = IX(a.T, e);
						f.Ah && !c[d] && f.Ah();
					}
					b = a.H;
					var g = a.get('projection');
					for (d in c)
						(e = c[d]),
							(f = e.dg),
							b.remove(f),
							(f.geometry = JX(e, g)),
							_.Ze(b, f),
							KX(a, e);
				}));
		},
		KX = function(a, b) {
			function c() {
				HX(e, b, 'latLngs');
			}
			var d = b.get('latLngs');
			if (d) {
				var e = a,
					f = _.oe(b);
				a = d.getArray();
				for (var g = 0, h = a.length; g < h; ++g) {
					var k = a[g];
					OX(k);
					k.j.lc[f] = k.H.lc[f] = k.o.lc[f] = c;
				}
				OX(d);
				d.H.lc[f] = d.o.lc[f] = function(l, m) {
					PX(m, f);
					c();
				};
				d.j.lc[f] = c;
			}
		},
		LX = function(a) {
			var b = a.get('latLngs');
			if (b) {
				a = _.oe(a);
				PX(b, a);
				b = b.getArray();
				for (var c = 0, d = b.length; c < d; ++c) PX(b[c], a);
			}
		},
		OX = function(a) {
			a.j ||
				((a.j = function(b) {
					_.Yc(a.j.lc, function(c, d) {
						d(b);
					});
				}),
				(a.j.lc = {}));
			a.H ||
				((a.H = function(b, c) {
					_.Yc(a.H.lc, function(d, e) {
						e(b, c);
					});
				}),
				(a.H.lc = {}));
			a.o ||
				((a.o = function(b, c) {
					_.Yc(a.o.lc, function(d, e) {
						e(b, c);
					});
				}),
				(a.o.lc = {}));
		},
		PX = function(a, b) {
			a.j && delete a.j.lc[b];
			a.H && delete a.H.lc[b];
			a.o && delete a.o.lc[b];
		},
		SX = function(a) {
			var b = (this.j = _.no('div'));
			_.oo(b, -202);
			_.Ry(b, 'pointer');
			_.Ny(b);
			this.i = _.kE(Caa, b, _.pk, QX);
			_.N.bind(this, 'toolbar', this, this.Dk);
			var c = this;
			this.H = new _.By(
				a.j,
				{
					Ke: function(d) {
						d &&
							((d = new _.I(d.wa, d.Ca)),
							_.mo(c.j, new _.I(d.x + RX.x, d.y + RX.y)));
					},
					He: _.n()
				},
				null,
				a
			);
			a.yc(this.H);
			_.Ep(b, {
				Ib: function(d) {
					_.Uo(d);
					c.ig(Daa);
				},
				Fd: function(d) {
					_.Vo(d);
				},
				Wb: function(d) {
					_.Vo(d);
				},
				Mb: function(d) {
					_.Wo(d);
				},
				onClick: function(d) {
					d = d.event;
					_.Xo(d);
					d = d.Sa;
					_.fe(d);
					_.ge(d);
					c.T();
					c.he();
				},
				Pd: {
					Ed: function(d, e) {
						e.Sa.noDrag = !0;
					},
					Be: _.n(),
					Xd: _.n()
				}
			});
			new _.kt(b, b, {
				jf: (0, _.y)(this.ig, this, _.pk),
				kf: (0, _.y)(this.ig, this, Eaa)
			});
		},
		TX = function(a) {
			a.o && _.N.clearListeners(a.o, 'suppressundo_changed');
		},
		Faa = function(a, b, c) {
			a.ig(_.pk);
			a.T = b;
			TX(a);
			a.o = c;
			_.Oy(a.j);
			_.N.addListener(c, 'suppressundo_changed', function() {
				c.get('suppressUndo') && a.he();
			});
		},
		UX = function(a) {
			var b = this;
			this.i = a;
			_.N.addListener(a, 'set_at', function(c) {
				_.N.trigger(b, 'set_at', c);
				var d = a.getLength();
				0 == c && 1 < d && _.N.trigger(b, 'set_at', d);
			});
			_.N.addListener(a, 'insert_at', function(c) {
				_.N.trigger(b, 'insert_at', c);
				var d = a.getLength();
				2 == d
					? _.N.trigger(b, 'insert_at', 2)
					: 0 == c && 1 < d && _.N.trigger(b, 'set_at', d);
			});
			_.N.addListener(a, 'remove_at', function(c) {
				_.N.trigger(b, 'remove_at', c);
				var d = a.getLength();
				1 == d
					? _.N.trigger(b, 'remove_at', 1)
					: 0 == c && 1 < d && _.N.trigger(b, 'set_at', d);
			});
		},
		VX = function(a, b, c) {
			this.j = a;
			this.o = b;
			this.i = c;
			this.Fa = [
				_.N.bind(a, 'set_at', this, this.un),
				_.N.bind(a, 'insert_at', this, this.oj),
				_.N.bind(a, 'remove_at', this, this.nn)
			];
			b = 0;
			for (a = a.getLength(); b < a; ++b) this.oj(b);
		},
		XX = function(a, b, c) {
			var d = a.get('projection');
			if (d) {
				var e = a.j,
					f = e.getAt(c),
					g = a.o,
					h = a.get('geodesic');
				0 < c && g.setAt(c - 1, WX(e.getAt(c - 1), f, h, d, a.i));
				c < e.getLength() - 1 &&
					((a = WX(f, e.getAt(c + 1), h, d, a.i)),
					b ? g.insertAt(c, a) : g.setAt(c, a));
			}
		},
		WX = function(a, b, c, d, e) {
			c
				? (d = e(a, b, 0.5))
				: (180 < Math.abs(a.lng() - b.lng()) &&
						(a = new _.L(
							a.lat(),
							_.ad(a.lng(), b.lng() - 180, b.lng() + 180),
							!0
						)),
				  (a = d.fromLatLngToPoint(a)),
				  (b = d.fromLatLngToPoint(b)),
				  (d = d.fromPointToLatLng(new _.I((a.x + b.x) / 2, (a.y + b.y) / 2))));
			return d;
		},
		YX = function(a, b, c, d, e) {
			_.Xm.call(this, a, b);
			void 0 !== c && (this.path = c);
			void 0 !== d && (this.vertex = d);
			void 0 !== e && (this.edge = e);
		},
		ZX = function(a, b, c, d, e) {
			this.T = a;
			this.H = b;
			this.ka = c;
			this.$ = d;
			this.j = [];
			this.i = [];
			this.W = [];
			this.ta = e;
		},
		aY = function(a, b, c) {
			var d = $X(a, b, c, !1),
				e = a.T,
				f;
			_.N.addListener(d, 'dragstart', function(g) {
				f = b.getAt(g);
				var h = b.getArray(),
					k = a.H,
					l = h.length;
				if (2 > l) e.set('anchors', []);
				else {
					var m = h[k && 0 == g ? l - 1 : g - 1];
					g = h[k && g == l - 1 ? 0 : g + 1];
					h = [];
					m && h.push(m);
					g && h.push(g);
					e.set('anchors', h);
				}
				e.bindTo('freeVertexPosition', d);
				e.set('map', a.get('map'));
			});
			_.N.addListener(d, 'dragend', function(g, h, k) {
				e.set('map', null);
				_.N.trigger(a, 'toolbar', {
					i: !0,
					j: k,
					action: function() {
						b.setAt(g, f);
					}
				});
			});
			return d;
		},
		bY = function(a, b, c) {
			var d = new _.Xe(),
				e = a.H ? new UX(b) : b,
				f = new VX(e, d, a.$);
			f.bindTo('geodesic', a);
			f.bindTo('projection', a);
			var g = $X(a, d, c, !0);
			g.T = f;
			var h = a.T;
			_.N.addListener(g, 'dragstart', function(k) {
				k = [e.getAt(k), e.getAt(k + 1)];
				h.set('anchors', k);
				h.bindTo('freeVertexPosition', g);
				h.set('map', a.get('map'));
			});
			_.N.addListener(g, 'dragend', function(k, l, m) {
				b.insertAt(k + 1, d.getAt(k));
				h.set('map', null);
				_.N.trigger(a, 'toolbar', {
					i: !0,
					j: m,
					action: function() {
						b.removeAt(k + 1);
					}
				});
			});
			return g;
		},
		$X = function(a, b, c, d) {
			var e = new nX(b, ['pointer'], [0], d, c, a.ka, a.get('map'), a.ta);
			e.bindTo('projection', a);
			e.bindTo('zoom', a);
			e.bindTo('projectionCenterQ', a);
			e.bindTo('panningEnabled', a);
			e.bindTo('mapPixelBounds', a);
			e.bindTo('color', a);
			e.bindTo('zIndex', a);
			e.bindTo('offset', a);
			_.N.forward(e, 'dragstart', a);
			_.N.forward(e, 'dragend', a);
			_.N.forward(e, 'panbynow', a);
			_.N.forward(e, 'toolbar', a);
			_.B(yX, function(f) {
				_.N.addListener(e, f, function(g) {
					var h = b.getAt(g);
					if (a.H)
						for (var k = d ? a.i : a.j, l = 0; l < k.length; ++l)
							if (k[l] == e) {
								var m = l;
								break;
							}
					_.N.trigger(
						a,
						f,
						new YX(h, void 0, m, d ? void 0 : g, d ? g : void 0)
					);
				});
			});
			return e;
		},
		cY = function(a) {
			var b = (0, _.y)(a.o, a);
			_.B(a.j, b);
			_.B(a.i, b);
			a.j.length = 0;
			a.i.length = 0;
			_.B(a.W, _.N.removeListener);
			a.W.length = 0;
		},
		eY = function(a, b, c) {
			function d() {
				g[u++] = v.latLng[0];
				g[u++] = v.latLng[1];
				f && (h[m++] = v.distance);
				k = v;
			}
			var e = a.path,
				f = a.i;
			if (!e.length) return a;
			var g = Array(e.length),
				h = f ? Array(f.length) : null;
			a = [];
			var k = dY();
			g[0] = k.latLng[0] = e[0];
			g[1] = k.latLng[1] = e[1];
			f && (h[0] = k.distance = f[0]);
			k.depth = 0;
			hX(k.latLng, k.Ge);
			for (var l = 1, m = 1, q = [], t = 2, u = 2; t < e.length || q.length; ) {
				if (q.length) var v = q.pop();
				else
					(v = dY()),
						(v.depth = 0),
						(v.latLng[0] = e[t++]),
						(v.latLng[1] = e[t++]),
						f && (v.distance = f[l++]),
						hX(v.latLng, v.Ge);
				if (12 <= Math.max(k.depth, v.depth)) d();
				else {
					var w = new _.Id();
					w.Ka = Math.min(k.latLng[0], v.latLng[0]);
					w.Pa = Math.max(k.latLng[0], v.latLng[0]);
					w.Ia = Math.min(k.latLng[1], v.latLng[1]);
					w.Oa = Math.max(k.latLng[1], v.latLng[1]);
					if (_.iy(b, w)) {
						var x = dY();
						maa(k.Ge, v.Ge, x.Ge);
						iX(x.Ge, x.latLng);
						x.depth = Math.max(k.depth, v.depth) + 1;
						f && (x.distance = (k.distance + v.distance) / 2);
						var C = w.Ia - 1e-6,
							J = w.Oa + 1e-6;
						w = x.latLng;
						w[1] = Gaa(C, J, w[1]);
						Haa(k.latLng, v.latLng, a);
						Math.max(
							Math.abs(x.latLng[0] - a[0]),
							Math.abs(x.latLng[1] - a[1])
						) <= c
							? d()
							: (q.push(v), q.push(x));
					} else d();
				}
			}
			return { path: g, i: h };
		},
		Haa = function(a, b, c) {
			c[0] = (a[0] + b[0]) / 2;
			c[1] = (a[1] + b[1]) / 2;
		},
		Gaa = function(a, b, c) {
			for (; c < a; ) c += 360;
			for (; c > b; ) c -= 360;
			return c;
		},
		dY = function() {
			return { latLng: [0, 0], Ge: new dX(0) };
		},
		Iaa = function(a) {
			return function(b, c) {
				if ('px' == b.i) b = b.value / a;
				else {
					var d = _.Xc(c);
					b = d ? (b.value / 100) * c[d - 1] : 0;
				}
				return b;
			};
		},
		Jaa = function(a, b, c, d) {
			--b;
			if (!(0 > b)) {
				var e = a.length,
					f = 0;
				for (d(0); f < b; ) {
					var g = 1 << e,
						h = e ? a[e - 1][f / g] : 0,
						k = f + g;
					k >= b && (k = b);
					e && c(f, k, h) ? --e : (d(k), (f = k), f & g || ++e);
				}
			}
		},
		Kaa = function(a, b) {
			return function(c, d) {
				if (0 == c) return !0;
				c = a[c];
				d = a[d];
				for (var e = 0, f; (f = b[e]); ++e) {
					var g = f.offset;
					if ((f = f.repeat)) {
						if (Math.floor((c - g) / f) != Math.floor((d - g) / f)) return !0;
					} else if (c < g && g <= d) return !0;
				}
				return !1;
			};
		},
		Laa = function(a, b, c, d) {
			var e = a.Ka,
				f = a.Ia,
				g = a.Pa,
				h = a.Oa;
			return function(k, l, m) {
				var q = d[2 * k],
					t = d[2 * k + 1];
				k = d[2 * l];
				l = d[2 * l + 1];
				var u = Math.min(t, l) - m,
					v = Math.max(q, k) + m,
					w = Math.max(t, l) + m;
				Math.min(q, k) - m <= g && e <= v && u <= h && f <= w
					? m > b
						? (m = !0)
						: ((u = c.fromLatLngToPoint(new _.L(q, t, !0))),
						  (v = c.fromLatLngToPoint(new _.L(k, l, !0))),
						  (u = c.fromPointToLatLng(
								new _.I((u.x + v.x) / 2, (u.y + v.y) / 2),
								!0
						  )),
						  (t = (t + l) / 2),
						  (q = (q + k) / 2 - u.lat()),
						  (k = t - u.lng()),
						  (m = Math.sqrt(q * q + k * k) + m > b))
					: (m = !1);
				return m;
			};
		},
		Maa = function(a, b, c) {
			return function(d, e, f) {
				var g = d.path,
					h = d.i,
					k = Laa(a, b, c, g);
				d = k;
				if (h) {
					var l = Kaa(h, f);
					d = function(t, u, v) {
						return k(t, u, v) || l(t, u);
					};
				}
				var m = [],
					q = h ? [] : null;
				Jaa(e, g.length / 2, d, function(t) {
					m.push(g[2 * t], g[2 * t + 1]);
					h && q.push(h[t]);
				});
				return { path: m, i: q };
			};
		},
		Naa = function(a, b, c, d) {
			var e = a.i;
			if (!e) return null;
			a = a.path;
			for (var f = [], g = 0, h = a.length - 2; g < h; ) {
				var k = a[g],
					l = a[g + 1],
					m = e[g / 2],
					q = m - b;
				g += 2;
				var t = a[g],
					u = a[g + 1];
				if (!(fY(k, l, d) & fY(t, u, d))) {
					for (; _.bd(k, t) && _.bd(l, u) && g < h; )
						(g += 2), (t = a[g]), (u = a[g + 1]);
					var v = e[g / 2] - b,
						w = Math.atan2(t - k, l - u);
					0 == m && (q -= 1e-9);
					if (c)
						for (m = Math.floor(v / c) * c; m > q; ) {
							var x = (m - q) / (v - q);
							f.push(k + (t - k) * x, l + (u - l) * x, w);
							m -= c;
						}
					else
						0 > q &&
							0 <= v &&
							((q = (0 - q) / (v - q)),
							f.push(k + (t - k) * q, l + (u - l) * q, w));
				}
			}
			return f;
		},
		fY = function(a, b, c) {
			var d = 0;
			_.bd(a, -16, 0.001) && (d |= 1);
			_.bd(a, c.wa + 16, 0.001) && (d |= 2);
			_.bd(b, -16, 0.001) && (d |= 4);
			_.bd(b, c.Ca + 16, 0.001) && (d |= 8);
			return d;
		},
		gY = function(a, b, c, d) {
			this.i = d;
			this.ka = b;
			var e = (this.ta = 1 << b);
			b = _.Ax(this.i, { Aa: a.x, Ba: a.y, Ma: b }, 16 / d.size.wa);
			b = _.Jd(b.min.Da, b.min.Ha, b.max.Da, b.max.Ha);
			this.$ = c;
			var f = b;
			d = new _.Cd(f.Ka, f.Ia);
			f = new _.Cd(f.Pa, f.Oa);
			b = _.sn(d, c, !0);
			var g = _.sn(f, c, !0);
			f = Math.min(b.lat(), g.lat());
			d = Math.max(b.lat(), g.lat());
			var h = Math.min(b.lng(), g.lng());
			g = Math.max(b.lng(), g.lng());
			b = (h + g) / 2;
			var k = _.ad(b, -180, 180);
			h += k - b;
			g += k - b;
			b = _.Jd(f, h, d, g);
			f = new _.L(f, h, !0);
			h = new _.L(d, g, !0);
			d = _.rn(f, c);
			d = new _.I(d.Da, d.Ha);
			f = _.rn(h, c);
			f = new _.Id([d, new _.I(f.Da, f.Ha)]);
			this.j = b;
			this.H = f;
			this.T = a;
			a = 0.5 / e;
			b = this.H;
			this.W = Math.min(
				cX(c, a, new _.I(b.Ka, b.Ia)),
				cX(c, a, new _.I(b.Pa, b.Oa))
			);
			this.ua = Maa(this.j, this.W, c);
			this.o = Iaa(e);
		},
		Paa = function(a, b, c, d) {
			for (var e = [], f = [], g = 0, h = d.length; g < h; ++g) f.push([]);
			g = 0;
			for (h = b.length; g < h; ++g) {
				var k = b[g],
					l = k.j,
					m = Oaa(a, d, l.i);
				l = k.i ? a.ua(l, k.i, m) : { path: _.fx(l.path, 0), i: l.i };
				if (l.path.length) {
					c && (l = eY(l, a.j, a.W));
					XW(l.path, a.$);
					l = iaa(l, a.H);
					var q = l.path;
					k = a.i.size;
					if (q.length) {
						e.push(q);
						for (var t = 0; t < q.length; t += 2) {
							var u = _.Bm(a.i, new _.Cd(q[t], q[t + 1]), a.ka, _.na());
							q[t] = (u.Aa - a.T.x) * k.wa;
							q[t + 1] = (u.Ba - a.T.y) * k.Ca;
						}
						for (t = 0; (q = m[t]); ++t)
							(q = Naa(l, q.offset, q.repeat, k)) && (f[t] = f[t].concat(q));
					}
				}
			}
			return { paths: e, sg: f };
		},
		Oaa = function(a, b, c) {
			var d = [];
			if (c)
				for (var e = 0, f; (f = b[e]); ++e)
					d.push({ offset: a.o(f.offset, c), repeat: a.o(f.repeat, c) });
			return d;
		},
		hY = function(a, b, c, d, e) {
			this.H = b;
			this.$ = c;
			this.W = new _.fF(a.j, d, e);
			this.T = e;
			this.i = null;
			this.Vc = !1;
		},
		Qaa = function(a) {
			return _.cd(a, function(b) {
				return _.cd(b, function(c) {
					return Math.round(c);
				});
			});
		},
		Saa = function(a, b, c, d, e) {
			function f() {
				a.get('editable')
					? (Raa(a, b, d, e), _.ij(b, 'Oe'), _.uo('Oe', '-p', a))
					: (_.N.trigger(c, 'toolbar', { i: !1, poly: a }), iY(a));
			}
			a.editable_changed = f;
			f();
			a.Vh = _.N.addListener(a, 'toolbar', function(g) {
				g.poly = a;
				_.N.trigger(c, 'toolbar', g);
			});
		},
		Raa = function(a, b, c, d) {
			if (!a.H) {
				var e = new _.uK(a, a.ac);
				a.T = e;
				var f = new _.rK();
				f.bindTo('strokeColor', e);
				f.bindTo('strokeOpacity', e, 'ghostStrokeOpacity');
				f.bindTo('strokeWeight', e);
				f.bindTo('geodesic', a);
				f.bindTo('zIndex', a);
				a.rd = f;
				var g = b.__gm;
				a.i = ZW(g);
				var h = _.iF(g, a),
					k = _.go() ? 9 : 0,
					l = new tX(),
					m = new ZX(
						f,
						a.ac,
						function(q, t, u) {
							return new lX(q, a.i, k, t, h, l, u);
						},
						c,
						d
					);
				m.set('map', b);
				m.bindTo('paths', a, 'latLngs');
				m.bindTo('panes', g);
				m.bindTo('projection', b);
				m.bindTo('zoom', g);
				m.bindTo('projectionCenterQ', g);
				m.bindTo('panningEnabled', b, 'draggable');
				m.bindTo('mapPixelBounds', g, 'pixelBounds');
				m.bindTo('offset', g);
				m.bindTo('color', e, 'strokeColor');
				m.bindTo('zIndex', a);
				m.bindTo('geodesic', a);
				m.bindTo('suppressGhostControlPoints', a);
				a.H = m;
				_.N.addListener(a, 'click', function() {
					a.get('editable') && _.uo('Oe', '-i', a);
				});
				_.N.forward(m, 'panbynow', g);
				_.N.forward(m, 'toolbar', a);
				_.B(yX, function(q) {
					_.N.forward(m, q, a);
				});
			}
		},
		iY = function(a) {
			var b = a.H;
			b &&
				(b.unbindAll(),
				b.set('map', null),
				_.N.clearInstanceListeners(b),
				delete a.H,
				a.i.unbindAll(),
				a.i.release(),
				delete a.i,
				a.rd.unbindAll(),
				delete a.rd,
				a.T.release(),
				delete a.T);
		},
		jY = function(a, b, c) {
			this.o = Math.min(2, _.Un());
			this.T = b;
			this.j = a;
			this.i = c || _.jl;
		},
		Taa = function(a, b, c, d, e) {
			this.i = c.size;
			this.$ = d;
			this.T = b;
			this.j = kY(a, this.i, e);
			_.mo(this.j, _.pk);
			this.W = lY(this.j, e);
			this.ka = kY(a, this.i, e);
			this.ta = lY(this.ka, e);
			this.La = new _.wF(this.W);
			this.ua = new _.wF(this.ta);
			this.o = {};
			this.H = 0;
		},
		kY = function(a, b, c) {
			a = a.createElement('canvas');
			a.width = b.wa * c;
			a.height = b.Ca * c;
			a.style.width = _.Q(b.wa);
			a.style.height = _.Q(b.Ca);
			_.po(a);
			return a;
		},
		lY = function(a, b) {
			a = a.context = a.getContext('2d');
			a.scale(b, b);
			a.lineCap = a.lineJoin = 'round';
			return a;
		},
		nY = function(a) {
			a.H ||
				(a.H = _.Qm(function() {
					a.H = 0;
					var b = Uaa(a);
					if (b.length) {
						a.j.parentNode || a.T.appendChild(a.j);
						var c = a.W,
							d = a.ta;
						c.clearRect(0, 0, a.i.wa, a.i.Ca);
						for (var e = null, f = 0; f < b.length; ++f) {
							var g = b[f],
								h = g.i,
								k = h.j;
							_.bd(1, k)
								? (a.$(
										c,
										g.paths,
										h.strokeColor,
										h.strokeOpacity,
										h.strokeWeight,
										h.strokePosition,
										h.fillColor,
										h.fillOpacity
								  ),
								  mY(g.sg, h.i, c, a.La, 1))
								: (d.clearRect(0, 0, a.i.wa, a.i.Ca),
								  a.$(
										d,
										g.paths,
										h.strokeColor,
										h.strokeOpacity / k,
										h.strokeWeight,
										h.strokePosition
								  ),
								  mY(g.sg, h.i, d, a.ua, k),
								  (c.globalAlpha = k),
								  c.drawImage(a.ka, 0, 0, a.i.wa, a.i.Ca));
							!e && g.wb && g.wb.Gd && (e = g.wb.Gd);
						}
						e && e();
					} else a.j.parentNode && a.T.removeChild(a.j);
				}));
		},
		mY = function(a, b, c, d, e) {
			for (var f = 0, g = a.length; f < g; ++f) {
				var h = b[f],
					k = c,
					l = d,
					m = a[f],
					q = h.fg,
					t = h.scale,
					u = h.rotation,
					v = h.Jn,
					w = h.strokeColor,
					x = h.strokeOpacity / e,
					C = h.strokeWeight,
					J = h.fillColor;
				h = h.fillOpacity / e;
				k.beginPath();
				for (var M = 0, U = m.length; M < U; M += 3)
					l.Pb(q, m[M], m[M + 1], u + (v ? m[M + 2] : 0), t);
				h && ((k.fillStyle = J), (k.globalAlpha = h), k.fill());
				C &&
					((k.lineWidth = C),
					(k.strokeStyle = w),
					(k.globalAlpha = x),
					k.stroke());
			}
		},
		Uaa = function(a) {
			var b = [];
			a = a.o;
			for (var c in a) b.push(a[c]);
			b.sort(function(d, e) {
				return d.zIndex - e.zIndex;
			});
			return b;
		},
		Vaa = function(a, b, c) {
			function d(k, l) {
				k.beginPath();
				for (var m = 0, q; (q = l[m]); ++m)
					if (q.length) {
						k.moveTo(Math.round(q[0]), Math.round(q[1]));
						for (var t = 2, u = q.length; t < u; )
							k.lineTo(Math.round(q[t++]), Math.round(q[t++]));
					}
			}
			var e = c.size,
				f = a.createElement('canvas');
			f.width = b * e.wa;
			f.height = b * e.Ca;
			var g = f.getContext('2d');
			g.lineCap = g.lineJoin = 'round';
			g.scale(b, b);
			var h = [
				function(k, l, m, q, t) {
					k.lineWidth = t;
					k.strokeStyle = m;
					k.globalAlpha = q;
					k.stroke();
				},
				function(k, l, m, q, t) {
					k.lineWidth = 2 * t;
					k.strokeStyle = m;
					k.globalAlpha = q;
					k.save();
					k.clip();
					k.stroke();
					k.restore();
				},
				function(k, l, m, q, t) {
					g.lineWidth = 2 * t;
					g.strokeStyle = m;
					g.globalCompositeOperation = 'source-over';
					g.clearRect(0, 0, e.wa, e.Ca);
					d(g, l);
					g.stroke();
					g.globalCompositeOperation = 'destination-out';
					g.fill();
					k.globalAlpha = q;
					k.drawImage(f, 0, 0, e.wa, e.Ca);
				}
			];
			return function(k, l, m, q, t, u, v, w) {
				d(k, l);
				w && ((k.fillStyle = v), (k.globalAlpha = w), k.fill());
				if (t) h[u](k, l, m, q, t);
			};
		},
		oY = function(a, b) {
			this.o = a;
			this.j = b;
			this.i = null;
		},
		Waa = function(a, b, c, d) {
			var e = this;
			this.j = b;
			this.i = d;
			a.i = function(g) {
				pY(e, g);
			};
			a.onRemove = function(g) {
				delete g.Ah;
				e.j.remove(g.bounds);
				g = g.geometry;
				var h = g.rb;
				for (q in h) {
					var k = h[q],
						l = k.wb,
						m = l.Dh;
					delete m.o[_.oe(k)];
					nY(m);
					delete l.rb[_.oe(k)];
				}
				g.rb = {};
				var q = g.yd;
				_.vo(q.ac ? 'Op' : 'Ol', '-v', q);
			};
			c.i = function(g) {
				qY(e, g);
			};
			c.onRemove = function(g) {
				e.i.remove(g.bounds);
				var h = g.rb,
					k;
				for (k in h) {
					var l = h[k],
						m = l.j;
					delete m.rb[_.oe(l)];
					l = m.yd;
					_.vo(l.ac ? 'Op' : 'Ol', '-v', l);
				}
				g.rb = {};
			};
			a = a.j;
			for (var f in a) pY(e, a[f]);
			c = c.j;
			for (f in c) qY(e, c[f]);
		},
		pY = function(a, b) {
			b.Ah = function() {
				var f = b.geometry.rb,
					g;
				for (g in f) {
					var h = f[g];
					h.i = b.style;
					h.zIndex = b.style.zIndex;
					nY(h.wb.Dh);
				}
			};
			var c = b.geometry,
				d = c.bounds;
			d.poly = b;
			b.bounds = d;
			_.kF(a.j, d);
			a = a.i.search(d);
			d = 0;
			for (var e = a.length; d < e; ++d) rY(b, a[d].Pe || null);
			0 < a.length && ((c = c.yd), _.uo(c.ac ? 'Op' : 'Ol', '-v', c));
		},
		qY = function(a, b) {
			var c = b.bounds;
			c.Pe = b;
			_.kF(a.i, c);
			a = a.j.search(b.bounds);
			if (0 == a.length) b.Gd && _.Je((0, _.y)(b.Gd, b));
			else {
				c = 0;
				for (var d = a.length; c < d; ++c)
					rY(a[c].poly || null, b),
						_.uo(
							a[c].poly.geometry.yd.ac ? 'Op' : 'Ol',
							'-v',
							a[c].poly.geometry.yd
						);
			}
		},
		rY = function(a, b) {
			var c = a.geometry,
				d = Paa(b.to, c.j, c.geodesic, c.i);
			if (d.paths.length) {
				var e = {};
				e.paths = d.paths;
				e.sg = d.sg;
				e.i = a.style;
				e.zIndex = a.style.zIndex;
				e.wb = b;
				e.j = c;
				a = _.oe(e);
				c.rb[a] = e;
				b.rb[a] = e;
				b = b.Dh;
				b.o[_.oe(e)] = e;
				nY(b);
			} else b.Gd && _.Je((0, _.y)(b.Gd, b));
		},
		Xaa = function(a) {
			return _.cd(a, function(b) {
				var c = {},
					d = b.path;
				if (50 <= d.length) {
					for (var e = [], f = d.length - 2, g, h = 2; h < f; h <<= 1) {
						for (
							var k = d[0],
								l = d[1],
								m = Math.ceil(f / (2 * h)),
								q = Array(m),
								t = 0,
								u = 0,
								v = d.length - 1 - h;
							t < v;

						) {
							t += h;
							var w = d[t],
								x = d[t + 1];
							t += h;
							t > d.length - 2 && (t = d.length - 2);
							var C = d[t],
								J = d[t + 1],
								M = w - k,
								U = x - l;
							k = C - k;
							var wa = J - l,
								qa = M * k + U * wa;
							l = k * k + wa * wa;
							qa >= l
								? ((w = C - w), (x = J - x), (x = w * w + x * x))
								: 0 >= qa
								? (x = M * M + U * U)
								: ((x = M * wa - U * k), (x *= x), (x /= l + 1e-16));
							x = Math.sqrt(x);
							g && (x += Math.max(g[2 * u], g[2 * u + 1] || 0));
							q[u++] = x;
							k = C;
							l = J;
						}
						u < m && (q[u] = g ? g[2 * u] : 0);
						g = q;
						e.push(q);
					}
					c.i = e;
				}
				c.j = b;
				b = f = Infinity;
				e = g = -Infinity;
				h = 0;
				for (m = d.length; h < m; )
					(q = d[h++]),
						(b = Math.min(b, q)),
						(e = Math.max(e, q)),
						(q = d[h++]),
						(f = Math.min(f, q)),
						(g = Math.max(g, q));
				d = new _.Id();
				d.Ka = b;
				d.Pa = e;
				d.Ia = f;
				d.Oa = g;
				c.bounds = d;
				return c;
			});
		},
		$aa = function(a, b, c, d) {
			return _.cd(a, function(e) {
				var f = e.path;
				e = e.i;
				var g = null;
				if (b) {
					g = c ? Yaa(f) : Zaa(f, d);
					for (
						var h = { 0: 0 }, k = 0, l = [0], m = 1, q = e.length;
						m < q;
						++m
					) {
						var t = e[m];
						t in h ? (k = h[t]) : ((k += g(m - 1)), (h[t] = k));
						l.push(k);
					}
					g = l;
				}
				return { path: f, i: g };
			});
		},
		Zaa = function(a, b) {
			var c = _.fx(a, 0);
			XW(c, b);
			return function(d) {
				d *= 2;
				var e = c[d] - c[d + 2];
				d = c[d + 1] - c[d + 3];
				return Math.sqrt(e * e + d * d);
			};
		},
		Yaa = function(a) {
			return function(b) {
				b *= 2;
				var c = new _.L(a[b], a[b + 1]);
				b = new _.L(a[b + 2], a[b + 3]);
				return _.yx(c, b, 1);
			};
		},
		cba = function(a) {
			a.length && ((a = sY(a, aba)), (a = sY(a, bba)));
			return a;
		},
		sY = function(a, b) {
			var c = [],
				d = new dX(0),
				e = new dX(0),
				f = new dX(0),
				g = Array(a.length);
			g[0] = a[0];
			g[1] = a[1];
			hX(a, d);
			for (var h = 2, k = 2; h < a.length; ) {
				c[0] = a[h];
				c[1] = a[h + 1];
				hX(c, f);
				b(d, f, e) && (iX(e, c), (g[k++] = c[0]), (g[k++] = c[1]));
				g[k++] = a[h++];
				g[k++] = a[h++];
				var l = d;
				d = f;
				f = l;
			}
			return g;
		},
		aba = function(a, b, c) {
			if (0 < a.z == 0 < b.z) return !1;
			gX(a, b, tY);
			gX(tY, uY, c);
			c.z = 0;
			if (1e-12 > eX(c, c)) return !1;
			0 > eX(c, a) + eX(c, b) && ((c.x = -c.x), (c.y = -c.y));
			return !0;
		},
		bba = function(a, b, c) {
			gX(a, b, tY);
			gX(uY, tY, vY);
			gX(tY, vY, c);
			if (1e-12 > eX(c, c) || 0 < eX(a, vY) == 0 < eX(b, vY)) return !1;
			0 > eX(c, a) + eX(c, b) && ((c.x = -c.x), (c.y = -c.y), (c.z = -c.z));
			return !0;
		},
		eba = function(a, b, c) {
			if (!b) return null;
			var d = [];
			b.forEach(function(e) {
				d.push(dba(e));
			});
			a && _.B(d, haa);
			if (c) for (a = 0, b = d.length; a < b; ++a) d[a] = cba(d[a]);
			return d;
		},
		fba = function(a) {
			return _.cd(a, function(b) {
				if (b.length) {
					var c = b[1];
					for (var d = [0], e = 1, f = 1; e < b.length / 2; ++e, ++f) {
						var g = b[2 * e + 1];
						if (180 < Math.abs(c - g)) {
							var h = g < c ? 1 : -1,
								k = b[2 * e - 2],
								l = b[2 * e];
							b.splice(
								2 * e,
								0,
								l,
								g + 360 * h,
								l,
								g + 450 * h,
								90,
								g + 450 * h,
								90,
								c - 450 * h,
								k,
								c - 450 * h,
								k,
								c - 360 * h
							);
							d.push(f, f, f, f, f, f - 1);
							e += 6;
						}
						d.push(f);
						c = g;
					}
					c = d;
				} else c = [];
				return { path: b, i: c };
			});
		},
		dba = function(a) {
			a = a.i;
			for (var b = a.length, c = Array(2 * b), d = 0, e = 0; d < b; ++d) {
				var f = a[d];
				c[e++] = f.lat();
				c[e++] = f.lng();
			}
			return c;
		},
		gba = _.n(),
		JX = function(a, b) {
			var c = {},
				d = a.get('icons'),
				e = !a.ac && !!_.Xc(d),
				f = !0;
			c.i = [];
			e &&
				_.B(d, function(k) {
					var l = bX(k.offset) || hba;
					k = bX(k.repeat) || iba;
					c.i.push({ offset: l, repeat: k });
					f = f && (0 == l.value || '%' == l.i) && (0 == k.value || '%' == k.i);
				});
			d = c.geodesic = a.get('geodesic');
			var g = eba(a.ac, a.get('latLngs'), d);
			g = fba(g);
			var h = d && f;
			d && e && !h && (g = jba(g));
			g = $aa(g, e, h, b);
			b = c.j = Xaa(g);
			if (1 == b.length) e = b[0].bounds;
			else
				for (e = new _.Id(), d = 0, g = b.length; d < g; ++d)
					_.ux(e, b[d].bounds);
			c.bounds = e;
			c.yd = a;
			c.rb = {};
			return c;
		},
		jba = function(a) {
			return _.cd(a, function(b) {
				return eY(b, _.sk, 0.1);
			});
		},
		kba = function() {
			var a = _.HF();
			this.o = _.tK;
			this.i = _.sK;
			this.j = a;
		},
		IX = function(a, b) {
			function c(l) {
				return _.dd(b.get(l), f[l]);
			}
			var d = {},
				e = (d.ac = b.ac),
				f = e ? a.i : a.o;
			d.strokeColor = c('strokeColor');
			d.strokeOpacity = c('strokeOpacity');
			d.strokeWeight = c('strokeWeight');
			d.clickable = c('clickable');
			e
				? ((d.strokePosition = c('strokePosition')),
				  (d.fillColor = c('fillColor')),
				  (d.fillOpacity = c('fillOpacity')))
				: (d.strokePosition = a.i.strokePosition);
			var g = b.get('zIndex') || 0;
			d.zIndex = 1e3 * g + (_.oe(b) % 1e3);
			d.strokeWeight = Math.min(
				d.strokeWeight,
				0 == d.strokePosition ? 32 : 16
			);
			d.o = b.get('hitStrokeWeight') || lba(d.strokeWeight, d.strokePosition);
			d.i = [];
			d.j = 1;
			if (!e) {
				e = b.get('icons') || [];
				var h = a.j,
					k = 0;
				_.B(e, function(l) {
					var m = h(
						l.icon || {},
						d.strokeColor,
						d.strokeOpacity,
						d.strokeWeight
					);
					m.Jn = !l.fixedRotation;
					d.i.push(m);
					k = Math.max(k, m.strokeOpacity);
					k = Math.max(k, m.fillOpacity);
				});
				_.bd(0, k) ||
					((_.bd(0, d.strokeOpacity) || _.bd(0, d.strokeWeight)) &&
						1 == d.i.length) ||
					(d.j = Math.max(k, d.strokeOpacity));
				_.Xc(e) && ((a = b.get('map')), _.ij(a, 'Os'), _.uo('Os', '-p', b));
			}
			return d;
		},
		lba = function(a, b) {
			switch (b) {
				case 1:
					return 0;
				case 2:
					return 2 * a;
				default:
					return a;
			}
		},
		nba = function(a) {
			var b = this;
			this.j = a;
			this.i = a.__gm;
			var c = new _.Ye();
			new MX(this.i.H, c, new kba(), new gba()).bindTo('projection', a);
			var d = _.Jd(-100, -200, 100, 200),
				e = new _.jF(d);
			d = new _.jF(d);
			this.ta = new _.Ye();
			new Waa(c, e, this.ta, d);
			var f = _.ho(a.getDiv()),
				g = void 0,
				h = null;
			this.ka = new _.df(null, void 0);
			_.hF(a, this.ka, 'overlayLayer', 30);
			this.W = this.T = this.H = this.$ = this.o = null;
			this.i.i.then(function(k) {
				b.W = k.nb;
				mba(b, k.nb);
				k.ke.kb(function(l) {
					if (l && g != l.Wa) {
						h && h.unbindAll();
						g = l.Wa;
						var m = new oY(g, f);
						h = new jY(
							b.ta,
							function(q) {
								for (var t = [], u = 0; u < arguments.length; ++u)
									t[u - 0] = arguments[u];
								return m.H.apply(m, _.Ea(t));
							},
							g
						);
						h.bindTo('projection', a);
						b.ka.set(h.Ob());
					}
				});
			});
			_.N.addListener(this.i.H, 'insert', function(k) {
				return wY(b, k);
			});
			_.N.addListener(this.i.H, 'remove', function(k) {
				if (b.H && b.W) {
					_.B(k.Pi || [], _.N.removeListener);
					delete k.draggable_changed;
					delete k.Pi;
					_.vo('Od', '-p', k);
					var l = b.H;
					delete k.editable_changed;
					iY(k);
					_.N.trigger(l, 'toolbar', { i: !1, poly: k });
					k.Vh && (_.N.removeListener(k.Vh), delete k.Vh);
					_.vo('Oe', '-p', k);
					k.set('capturing', !1);
					delete k.capturing_changed;
					k.Df ||
						(k.ac
							? _.vo('Op', '-p', k)
							: (_.vo('Ol', '-p', k),
							  (l = k.get('icons')),
							  _.Xc(l) && _.vo('Os', '-p', k)));
				}
			});
		},
		mba = function(a, b) {
			a.T = new hY(
				a.ta,
				a.i,
				function(c) {
					return a.j.getProjection().fromPointToLatLng(c);
				},
				b.j,
				a.ka
			);
			a.i.o.register(a.T);
			a.H = oba(a, b);
			_.P('geometry').then(function(c) {
				a.o = c;
				a.$ = new CX(
					function(d, e, f) {
						return d.get('geodesic')
							? new AX(
									d,
									e,
									f,
									a.o.computeHeading,
									a.o.computeOffset,
									a.o.computeOffsetOrigin
							  )
							: new BX(d, e, f);
					},
					a.j,
					b
				);
				EX(a.j, a.$);
				a.i.H.forEach(function(d) {
					return wY(a, d);
				});
			});
		},
		oba = function(a, b) {
			b = new SX(b);
			b.bindTo('panes', a.i);
			b.bindTo('projection', a.j);
			b.bindTo('zoom', a.i);
			b.bindTo('projectionCenterQ', a.i);
			b.bindTo('offset', a.i);
			_.N.bind(a.j, 'click', b, b.he);
			return b;
		},
		wY = function(a, b) {
			if (a.$ && a.H && a.T && a.o && a.W) {
				FX(b, a.$);
				Saa(b, a.j, a.H, a.o.interpolate, a.W);
				zaa(b, a.i, a.T, a.i.o);
				if (!b.Df) {
					var c = b.ac ? 'Op' : 'Ol';
					_.ij(a.j, c);
					_.uo(c, '-p', b);
				}
				_.N.addListener(b, 'click', function() {
					b.ac ? b.Df || _.uo('Op', '-i', b) : _.uo('Ol', '-i', b);
				});
			}
		},
		xY = function(a, b, c) {
			if (!a || !b || !c) return null;
			var d = c.lat(),
				e = c.lng();
			c = b & 1 ? d : a.Za.i;
			var f = b & 2 ? e : a.Ua.i;
			d = b & 4 ? d : a.Za.j;
			var g = b & 8 ? e : a.Ua.j;
			if (c > d) {
				var h = c;
				c = d;
				d = h;
			}
			b & 10 &&
				!a.Ua.contains(e) &&
				((h = _.Wd(e, a.Ua.i)), (a = _.Wd(a.Ua.j, e)), b & 2 ? h > a : a > h) &&
				((h = f), (f = g), (g = h));
			return _.ae(c, f, d, g);
		},
		yY = function() {
			var a = new _.Ri({ clickable: !1, fillOpacity: 0 });
			a.bindTo('map', this);
			a.bindTo('strokeColor', this);
			a.bindTo('strokeOpacity', this);
			a.bindTo('strokeWeight', this);
			var b = new _.mz(
				['bounds', 'freeControlPoint', 'freeVertexPosition'],
				'return',
				xY
			);
			b.bindTo('bounds', this);
			b.bindTo('freeControlPoint', this);
			b.bindTo('freeVertexPosition', this);
			a.bindTo('bounds', b, 'return');
			this.i = _.qK();
			this.i.bindTo('zIndex', this);
			a.bindTo('zIndex', this.i, 'ghostZIndex');
		},
		zY = function(a, b, c) {
			this.ka = a;
			this.W = b;
			this.o = this.T = null;
			this.j = new _.Xe();
			_.N.bind(this.j, 'set_at', this, this.Ho);
			this.H = new _.Xe();
			_.N.bind(this.H, 'set_at', this, this.Io);
			this.i = !1;
			this.$ = c;
		},
		CY = function(a, b, c) {
			var d = c
				? new nX(
						a.j,
						pba,
						qba,
						!1,
						b.overlayMouseTarget,
						a.W,
						a.get('map'),
						a.$
				  )
				: new nX(
						a.H,
						rba,
						sba,
						!0,
						b.overlayMouseTarget,
						a.W,
						a.get('map'),
						a.$
				  );
			d.bindTo('projection', a);
			d.bindTo('zoom', a);
			d.bindTo('projectionCenterQ', a);
			d.bindTo('panningEnabled', a);
			d.bindTo('mapPixelBounds', a);
			d.bindTo('color', a);
			d.bindTo('zIndex', a);
			d.bindTo('offset', a);
			var e = a.ka,
				f = c ? AY : BY,
				g;
			_.N.addListener(d, 'dragstart', function(h) {
				g = a.get('bounds');
				e.bindTo('freeVertexPosition', d);
				e.set('freeControlPoint', f[h]);
				e.set('map', a.get('map'));
			});
			_.N.addListener(d, 'dragend', function(h, k, l) {
				e.set('map', null);
				_.N.trigger(a, 'toolbar', {
					i: !0,
					j: l,
					action: function() {
						a.set('bounds', g);
					}
				});
			});
			_.N.forward(d, 'dragstart', a);
			_.N.forward(d, 'dragend', a);
			_.N.forward(d, 'panbynow', a);
			return d;
		},
		DY = function(a) {
			a && (a.unbindAll(), a.release(), _.N.clearInstanceListeners(a));
		},
		EY = function(a, b, c) {
			a.i ||
				((a.i = !0),
				(b = xY(a.get('bounds'), b, c)),
				a.set('bounds', b),
				(a.i = !1));
		},
		uba = function(a, b, c) {
			function d() {
				a.get('editable')
					? tba(a, b, c)
					: (FY(a), _.N.trigger(a, 'toolbar', { i: !1 }));
			}
			a.editable_changed = d;
			d();
		},
		tba = function(a, b, c) {
			if (!a.o) {
				var d = new _.uK(a, !0);
				a.H = d;
				var e = new yY();
				e.bindTo('strokeColor', d);
				e.bindTo('strokeOpacity', d, 'ghostStrokeOpacity');
				e.bindTo('strokeWeight', d);
				e.bindTo('bounds', a);
				e.bindTo('zIndex', a);
				a.T = e;
				var f = b.__gm;
				a.i = ZW(f);
				var g = _.iF(f, a),
					h = _.go() ? 9 : 0,
					k = new tX();
				c = new zY(
					e,
					function(l, m, q) {
						return new lX(l, a.i, h, m, g, k, q);
					},
					c
				);
				c.set('map', b);
				c.bindTo('bounds', a);
				c.bindTo('panes', f);
				c.bindTo('projection', b);
				c.bindTo('zoom', f);
				c.bindTo('projectionCenterQ', f);
				c.bindTo('panningEnabled', b, 'draggable');
				c.bindTo('mapPixelBounds', f, 'pixelBounds');
				c.bindTo('offset', f);
				c.bindTo('color', d, 'strokeColor');
				c.bindTo('zIndex', a);
				c.bindTo('suppressGhostControlPoints', a);
				a.o = c;
				_.N.forward(c, 'panbynow', f);
				_.N.forward(c, 'toolbar', a);
			}
		},
		FY = function(a) {
			var b = a.o;
			b &&
				(b.unbindAll(),
				b.set('map', null),
				_.N.clearInstanceListeners(b),
				delete a.o,
				a.i.unbindAll(),
				a.i.release(),
				delete a.i,
				a.T.unbindAll(),
				delete a.T,
				a.H.release(),
				delete a.H);
		},
		GY = function(a, b, c) {
			this.o = a;
			this.Ra = c;
			a = a.get('bounds');
			this.T = a.getSouthWest();
			this.H = a.getNorthEast();
			this.j = c.fromDivPixelToLatLng(b);
		},
		HY = function(a) {
			var b = this,
				c = (this.i = new _.Pi());
			c.Te = a;
			c.Df = !0;
			c.bindTo('capturing', b);
			c.bindTo('cursor', b);
			c.bindTo('map', b);
			c.bindTo('strokeColor', b);
			c.bindTo('strokeOpacity', b);
			c.bindTo('strokeWeight', b);
			c.bindTo('strokePosition', b);
			c.bindTo('fillColor', b);
			c.bindTo('fillOpacity', b);
			c.bindTo('clickable', b);
			c.bindTo('zIndex', b);
			c.bindTo('suppressUndo', b);
			var d = (this.j = []);
			_.B(yX, function(e) {
				d.push(_.N.forward(c, e, b));
			});
			d.push(_.N.forward(b, 'toolbar', c));
		},
		wba = function(a) {
			var b = this;
			this.i = a;
			this.j = a.__gm;
			this.o = this.H = null;
			this.j.i.then(function(c) {
				c = c.nb;
				b.o = c;
				vba(b, c);
			});
			this.j.W.i = function(c) {
				return IY(b, c);
			};
			this.j.W.onRemove = function(c) {
				if (b.o) {
					var d = c.yj;
					d.unbindAll();
					d.set('map', null);
					d.release();
					delete c.yj;
					c.listeners && _.B(c.listeners, _.N.removeListener);
					delete c.listeners;
					delete c.editable_changed;
					FY(c);
					_.vo('Or', '-p', c);
				}
			};
		},
		vba = function(a, b) {
			a.H = new CX(
				function(c, d, e) {
					return new GY(c, d, e);
				},
				a.i,
				b
			);
			EX(a.i, a.H);
			a.j.W.forEach(function(c) {
				return IY(a, c);
			});
		},
		IY = function(a, b) {
			if (a.H && a.o) {
				var c = (b.yj = new HY(b));
				c.set('map', a.i);
				c.bindTo('bounds', b);
				c.bindTo('capturing', b);
				c.bindTo('cursor', b);
				c.bindTo('clickable', b);
				c.bindTo('fillColor', b);
				c.bindTo('fillOpacity', b);
				c.bindTo('strokeColor', b);
				c.bindTo('strokeOpacity', b);
				c.bindTo('strokeWeight', b);
				c.bindTo('strokePosition', b);
				c.bindTo('suppressUndo', b);
				c.bindTo('zIndex', b);
				var d = (b.listeners = []);
				_.B(yX, function(e) {
					d.push(_.N.forward(c, e, b));
				});
				d.push(_.N.forward(b, 'toolbar', c));
				FX(b, a.H);
				uba(b, a.i, a.o);
				_.ij(a.i, 'Or');
				_.uo('Or', '-p', b);
				_.N.addListener(b, 'click', function() {
					_.uo('Or', '-i', b);
				});
			}
		},
		JY = _.n(),
		yX = 'click dblclick mousedown mousemove mouseout mouseover mouseup rightclick'.split(
			' '
		);
	_.A($W, _.O);
	$W.prototype.j = function(a) {
		return 'dragstart' != a && 'drag' != a && 'dragend' != a;
	};
	$W.prototype.o = function() {
		return this.get('active') ? this : null;
	};
	$W.prototype.handleEvent = function(a, b, c) {
		if ('mouseout' == a) this.set('cursor', '');
		else if ('mouseover' == a) {
			var d = this.get('draggableCursor');
			d && this.set('cursor', d);
		}
		_.N.trigger(c, a, new _.Xm(b.latLng, b.tb));
	};
	$W.prototype.zIndex = Infinity;
	var aX = {};
	dX.prototype.equals = function(a) {
		return this.x == a.x && this.y == a.y && this.z == a.z;
	};
	_.A(jX, _.O);
	jX.prototype.j = function(a, b, c, d, e) {
		return !e && d && a ? _.yx(d, a, c) : b;
	};
	_.A(lX, _.O);
	lX.prototype.release = function() {
		_.xe(this.i);
		_.B(this.Fa, _.N.removeListener);
		this.Fa.length = 0;
		this.T.remove();
		this.W.remove();
		this.o.unbindAll();
		this.o.release();
		this.H.set('active', !1);
	};
	lX.prototype.position_changed = function() {
		var a = this.get('position');
		if (a) {
			this.i.style.display = 'block';
			var b = 5 + this.$;
			_.mo(this.i, new _.I(a.x - b, a.y - b));
		} else this.i.style.display = 'none';
	};
	lX.prototype.color_changed = function() {
		var a = this.get('color');
		this.i.firstChild.style.borderColor = a;
		kX(this);
	};
	_.A(nX, _.O);
	nX.prototype.release = function() {
		_.B(this.ua, _.N.removeListener);
		this.ua.length = 0;
		_.B(this.j, (0, _.y)(this.ya, this));
		this.j.length = 0;
		_.N.clearInstanceListeners(this.H);
		_.xe(this.H);
	};
	nX.prototype.zIndex_changed = function() {
		var a = this.get('zIndex') || 0;
		this.W && --a;
		_.oo(this.H, a);
	};
	nX.prototype.$ = function(a, b) {
		var c = this,
			d = {};
		d.index = b;
		c.j.splice(b, 0, d);
		d.W = c.ka[b % c.ka.length];
		var e = this.Qa(c.H, c.ta[b % c.ta.length], c.W);
		e.bindTo('color', c);
		e.bindTo('panningEnabled', c);
		e.bindTo('mapPixelBounds', c);
		d.j = e;
		var f = [_.N.forward(e, 'panbynow', c)];
		b = a && this.i ? _.rn(a, this.i.getProjection()) : null;
		e.set('latLngPosition', a);
		d.T = !0;
		d.o = null;
		d.H = null;
		a = new _.By(
			this.o.j,
			{
				Ke: function(g) {
					g ? e.set('position', new _.I(g.wa, g.Ca)) : e.set('position', null);
				},
				He: _.n()
			},
			b,
			this.o,
			function() {
				if (c.i) {
					var g = d.i.getPosition();
					g &&
						((g = _.sn(g, c.i.getProjection())),
						(d.T = !1),
						d.j.set('latLngPosition', g),
						(d.T = !0));
				}
			}
		);
		this.o.yc(a);
		d.i = a;
		f.push(
			_.N.addListener(e, 'latlngposition_changed', function() {
				if (d.T && c.i) {
					var g = d.j.get('latLngPosition');
					g
						? d.i.setPosition(_.rn(g, c.i.get('projection')))
						: d.i.setPosition(null);
				}
			})
		);
		f.push(
			_.N.addListener(e, 'dragstart', function() {
				d.o = _.Cy(d.i);
				d.o && _.Dy(d.i, d.o);
			})
		);
		f.push(
			_.N.addListener(e, 'dragend', function() {
				var g = d.i.getPosition();
				if (
					g &&
					c.i &&
					((g = _.sn(g, c.i.get('projection'))), (g = oX(c, d, g))) &&
					((g = _.rn(g, c.i.get('projection'))),
					(g = _.Cy(d.i, g)),
					(g = pX(d, g))) &&
					(g = d.i.getPosition(g))
				) {
					var h = _.sn(g, c.i.get('projection'));
					d.T = !1;
					d.j.set('latLngPosition', h);
					d.T = !0;
					d.i.setPosition(g);
				}
				d.o = null;
				d.H = null;
			})
		);
		f.push(
			_.N.addListener(e, 'deltaclientposition_changed', function() {
				var g = d.j.get('deltaClientPosition');
				if (g && (d.o || d.H) && c.i) {
					var h = d.H || d.o;
					d.H = {
						clientX: h.clientX + g.clientX,
						clientY: h.clientY + g.clientY
					};
					g = c.o.Wc(d.H);
					g = _.sn(g, c.i.get('projection'));
					h = d.H;
					var k = oX(c, d, g);
					k &&
						!k.equals(g) &&
						((g = _.rn(k, c.i.get('projection'))), (h = _.Cy(d.i, g)));
					(h = pX(d, h)) && _.Dy(d.i, h);
				}
			})
		);
		f.push(
			_.N.addListener(e, 'dragstart', function() {
				c.bindTo('freeVertexPosition', e, 'latLngPosition');
				qX(c, d, 'dragstart');
			})
		);
		f.push(
			_.N.addListener(e, 'dragend', function() {
				c.Ta.setAt(d.index, e.get('latLngPosition'));
				qX(c, d, 'dragend');
			})
		);
		_.B(yX, function(g) {
			f.push(
				_.N.addListener(e, g, function() {
					qX(c, d, g);
				})
			);
		});
		d.listeners = f;
	};
	nX.prototype.ya = function(a) {
		a.j.unbindAll();
		a.j.release();
		a.i && this.o.ye(a.i);
		_.B(a.listeners, _.N.removeListener);
		a.listeners.length = 0;
	};
	_.A(rX, _.O);
	var oaa = ['pointer', 'row-resize', 'row-resize', 'col-resize', 'col-resize'],
		paa = [0, 2, 2, 1, 1];
	_.r = rX.prototype;
	_.r.map_changed = function() {
		this.get('map') ||
			(this.T.set('map', null), sX(this), _.N.clearInstanceListeners(this.i));
	};
	_.r.panes_changed = function() {
		sX(this);
		this.H = qaa(this);
	};
	_.r.Hh = function() {
		var a = this.i,
			b = this.get('center'),
			c = this.get('radius');
		if (b && _.fd(c)) {
			this.o = !0;
			var d = this.get('planetRadius'),
				e = _.Ld(c / d);
			var f = _.Kd(b.lat());
			if ((d = c / d)) {
				c = Math.cos(d);
				d = Math.sin(d);
				var g = Math.sin(f);
				f = Math.atan2(
					Math.sin(Math.acos(((1 - c) / d) * Math.tan(f))) * d * Math.cos(f),
					c - g * g
				);
			} else f = 0;
			f = _.Ld(f);
			a.setAt(0, b);
			c = b.lat() + e;
			90 > c ? a.setAt(1, new _.L(c, b.lng())) : a.setAt(1, null);
			e = b.lat() - e;
			-90 < e ? a.setAt(2, new _.L(e, b.lng())) : a.setAt(2, null);
			180 >= f
				? ((e = b.lng() + f),
				  (f = b.lng() - f),
				  a.setAt(3, new _.L(b.lat(), e)),
				  a.setAt(4, new _.L(b.lat(), f)))
				: (a.setAt(3, null), a.setAt(4, null));
			this.o = !1;
			this.j || _.N.trigger(this, 'toolbar', { i: !1 });
		} else a.clear();
	};
	_.r.center_changed = rX.prototype.Hh;
	_.r.radius_changed = rX.prototype.Hh;
	_.r.planetRadius_changed = rX.prototype.Hh;
	_.r.Jo = function(a) {
		if (!this.o) {
			var b = this.i.getAt(a);
			if (0 == a)
				_.gy(
					this,
					function() {
						this.j = !0;
						this.set('center', b);
						this.j = !1;
					},
					0
				);
			else {
				var c = _.yx(this.get('center'), b, this.get('planetRadius'));
				_.gy(
					this,
					function() {
						this.j = !0;
						this.set('radius', c);
						this.j = !1;
					},
					0
				);
			}
		}
	};
	tX.prototype.construct = function(a, b, c, d, e) {
		a = _.no('div', a, new _.I(b, b), new _.K(c, c));
		a.style.borderWidth = _.Q(d);
		a.style.borderStyle = 'solid';
		a.style.borderRadius = _.Q(Math.ceil(c / 2 + d));
		_.Sy(a, e);
	};
	var KY = new _.L(90, 0),
		LY = new _.L(-90, 0);
	vX.prototype.i = function(a) {
		a = this.Ra.fromDivPixelToLatLng(a);
		var b = this.H(a, this.j, this.T);
		b ||
			(b =
				Math.abs(_.yx(a, KY) - this.j) < Math.abs(_.yx(a, LY) - this.j)
					? KY
					: LY);
		this.o.set('center', b);
	};
	_.r = taa.prototype;
	_.r.isEmpty = function() {
		return 360 == this.i - this.j;
	};
	_.r.intersects = function(a) {
		var b = this.i,
			c = this.j;
		return this.isEmpty() || a.isEmpty()
			? !1
			: this.i > this.j
			? a.i > a.j || a.i <= this.j || a.j >= b
			: a.i > a.j
			? a.i <= c || a.j >= b
			: a.i <= c && a.j >= b;
	};
	_.r.contains = function(a) {
		-180 == a && (a = 180);
		var b = this.i,
			c = this.j;
		return this.i > this.j
			? (a >= b || a <= c) && !this.isEmpty()
			: a >= b && a <= c;
	};
	_.r.extend = function(a) {
		this.contains(a) ||
			(this.isEmpty()
				? (this.i = this.j = a)
				: xX(a, this.i) < xX(this.j, a)
				? (this.i = a)
				: (this.j = a));
	};
	_.r.scale = function(a) {
		if (this.isEmpty()) return this;
		var b = wX(this);
		a *= b;
		360 < a
			? ((this.i = -180), (this.j = 180))
			: ((b = 0.5 * (a - b)),
			  (this.i -= b),
			  (this.j += b),
			  (this.i = ((((this.i - -180) % 360) + 360) % 360) + -180),
			  (this.j = ((((this.j - -180) % 360) + 360) % 360) + -180));
		return this;
	};
	_.r.equals = function(a) {
		return 1e-9 >= (Math.abs(a.i - this.i) % 360) + Math.abs(wX(a) - wX(this));
	};
	_.r.center = function() {
		var a = (this.i + this.j) / 2;
		this.i > this.j && (a = ((((a + 180 - -180) % 360) + 360) % 360) + -180);
		return a;
	};
	_.A(zX, _.O);
	zX.prototype.center_changed = function() {
		_.ki(this.Ja);
	};
	zX.prototype.radius_changed = function() {
		_.ki(this.Ja);
	};
	zX.prototype.planetRadius_changed = function() {
		_.ki(this.Ja);
	};
	zX.prototype.release = function() {
		for (var a = this.i, b = 0, c = a.length; b < c; ++b)
			_.N.removeListener(a[b]);
		this.i = null;
		this.j.unbindAll();
		this.j = null;
	};
	AX.prototype.i = function(a) {
		var b = this;
		a = b.Ra.fromDivPixelToLatLng(a);
		var c = this.W(a, this.ka, this.ta);
		c
			? 89 < Math.abs(c.lat()) && (c = new _.L(_.$c(c.lat(), -89, 89), c.lng()))
			: (c = new _.L(this.o.lat(), a.lng() - this.H));
		b.j.get('latLngs').forEach(function(d, e) {
			for (var f = 0, g = d.getLength(); f < g; ++f) {
				var h = b.$(c, b.T[e][f].distance, b.T[e][f].heading);
				d.setAt(f, h);
			}
		});
		this.o = c;
		this.H = a.lng() - c.lng();
	};
	BX.prototype.i = function(a) {
		var b = this.o.get('latLngs'),
			c = this.Ra,
			d = c.fromLatLngToDivPixel(this.j),
			e = new _.I(d.x - a.x, d.y - a.y);
		_.B(this.H, function(f, g) {
			var h = b.getAt(g);
			_.B(f, function(k, l) {
				k = c.fromLatLngToDivPixel(k);
				k.x -= e.x;
				k.y -= e.y;
				h.setAt(l, c.fromDivPixelToLatLng(k));
			});
		});
	};
	_.A(CX, _.O);
	CX.prototype.release = function() {
		this.o.release();
		this.Fa && _.B(this.Fa, _.N.removeListener);
		this.Fa = null;
	};
	var MY = new _.K(30, 30),
		xba = new _.I(MY.width / 2, MY.height / 2);
	_.r = CX.prototype;
	_.r.jg = function() {
		if (!this.get('active')) {
			var a = this.get('panes'),
				b = this.get('projectionController'),
				c = this.get('poly');
			if (a != this.T || b != this.Ra || c != this.i)
				if (
					((this.T = a),
					(this.Ra = b),
					(this.i = c),
					this.Fa && _.B(this.Fa, _.N.removeListener),
					(this.Fa = null),
					this.T && this.Ra && this.i)
				) {
					this.Fa = [
						_.N.bind(this.i, 'mousedown', this, this.ln),
						_.N.bind(this.i, 'mouseup', this, this.mn),
						_.N.bind(this.i, 'movestart', this, this.Bk),
						_.N.bind(this.i, 'move', this, this.Ck),
						_.N.bind(this.i, 'moveend', this, this.Ak)
					];
					var d = this;
					this.Fa.push(
						_.N.addListener(this.i, 'editable_changed', function() {
							if (d.get('storeEditable')) {
								var e = d.i.get('editable');
								d.W = e;
								d.set('storeEditable', !1);
								d.i.set('editable', !1);
								d.set('storeEditable', !0);
							}
						})
					);
					this.bindTo('draggable', this.i);
				} else this.unbind('draggable'), this.set('draggable', !1);
		}
	};
	_.r.active_changed = CX.prototype.jg;
	_.r.panes_changed = CX.prototype.jg;
	_.r.poly_changed = CX.prototype.jg;
	_.r.projectionController_changed = CX.prototype.jg;
	_.r.Bk = function(a) {
		!this.get('draggable') ||
			!this.i ||
			(a.tb && _.qm(a.tb)) ||
			(a.stop(),
			!this.get('dragging') &&
				a.latLng &&
				(this.set('position', this.Ra.fromLatLngToDivPixel(a.latLng)),
				(a = _.rn(a.latLng, this.H.getProjection())),
				(a = _.Cy(this.j, a)) && _.Dy(this.j, a),
				(a = this.get('position')),
				this.set('dragging', !0),
				this.set('waitingForQuiver', !1),
				(this.ka = this.$(this.i, a, this.Ra)),
				DX(this, 'dragstart'),
				(this.W = this.i.get('editable')),
				this.i.set('editable', !1),
				this.set('storeEditable', !0)));
	};
	_.r.Ck = function(a) {
		this.get('dragging') &&
			a.latLng &&
			((a = _.rn(a.latLng, this.H.getProjection())),
			(a = _.Cy(this.j, a)) && _.Dy(this.j, a));
	};
	_.r.Ak = function() {
		if (this.get('dragging')) {
			var a = this.j.getPosition();
			if (a) {
				var b = _.sn(a, this.H.getProjection());
				b = this.Ra.fromLatLngToDivPixel(b);
				this.set('position', b);
				this.j.setPosition(a);
			}
			this.set('storeEditable', !1);
			this.i.set('editable', this.W);
			DX(this, 'dragend');
			this.set('dragging', !1);
		}
	};
	_.r.position_changed = function() {
		var a = this.get('position');
		a ? _.SE(this.o, _.ZE(a, MY, xba)) : _.SE(this.o, null);
		this.get('dragging') && (this.ka.i(a), DX(this, 'drag'));
	};
	_.r.Tj = function() {
		_.VE(this.o, 0 != this.get('panningEnabled') && this.get('dragging'));
	};
	_.r.dragging_changed = CX.prototype.Tj;
	_.r.panningEnabled_changed = CX.prototype.Tj;
	_.r.containerPixelBounds_changed = function() {
		_.UE(this.o, this.get('containerPixelBounds'));
	};
	_.r.ln = function() {
		this.get('dragging') || this.set('waitingForQuiver', !0);
	};
	_.r.mn = function() {
		this.set('waitingForQuiver', !1);
	};
	_.A(MX, _.O);
	MX.prototype.projection_changed = function() {
		var a = this;
		a.$.forEach(function(b) {
			if (b.get('icons')) {
				var c = _.oe(b);
				a.i[c] = b;
				LX(b);
			}
		});
		NX(a);
	};
	var Aaa = { latLngs: 1, geodesic: 1, icons: 1 },
		Baa = {
			strokeColor: 1,
			strokeOpacity: 1,
			strokePosition: 1,
			strokeWeight: 1,
			fillColor: 1,
			fillOpacity: 1,
			hitStrokeWeight: 1,
			zIndex: 1,
			clickable: 1,
			icons: 1
		};
	_.A(SX, _.O);
	_.r = SX.prototype;
	_.r.panes_changed = function() {
		var a = this.j,
			b = this.get('panes');
		b ? b.floatPane.appendChild(a) : a.parentNode && _.xe(a);
	};
	_.r.he = function() {
		_.Ny(this.j);
		this.T = null;
		TX(this);
		this.o = null;
	};
	_.r.changed = SX.prototype.he;
	_.r.Dk = function(a) {
		a.i && a.poly
			? a.poly.get('suppressUndo')
				? this.he()
				: (a.j && this.H.setPosition(a.j), Faa(this, a.action, a.poly))
			: a.poly == this.o && this.he();
	};
	_.r.ig = function(a) {
		_.lE(this.i, QX, a);
	};
	var Caa = _.Oo('undo_poly'),
		QX = new _.K(30, 27),
		Eaa = new _.I(30, 0),
		Daa = new _.I(60, 0),
		RX = new _.I(10, -11);
	UX.prototype.getLength = function() {
		var a = this.i.getLength();
		1 < a && ++a;
		return a;
	};
	UX.prototype.getAt = function(a) {
		this.i.getLength() == a && 1 < a && (a = 0);
		return this.i.getAt(a);
	};
	_.A(VX, _.O);
	_.r = VX.prototype;
	_.r.release = function() {
		_.B(this.Fa, _.N.removeListener);
	};
	_.r.In = function() {
		var a = this.get('projection'),
			b = this.o;
		if (a)
			for (
				var c = this.j, d = c.getLength(), e = this.get('geodesic'), f = 0;
				f < d - 1;
				++f
			)
				b.setAt(f, WX(c.getAt(f), c.getAt(f + 1), e, a, this.i));
		else b.clear();
	};
	_.r.geodesic_changed = VX.prototype.projection_changed = VX.prototype.In;
	_.r.un = function(a) {
		XX(this, !1, a);
	};
	_.r.oj = function(a) {
		XX(this, !0, a);
	};
	_.r.nn = function(a) {
		var b = this.get('projection');
		if (b) {
			var c = this.j,
				d = this.o,
				e = this.get('geodesic');
			a < c.getLength()
				? (0 < a &&
						d.setAt(a - 1, WX(c.getAt(a - 1), c.getAt(a), e, b, this.i)),
				  d.removeAt(a))
				: 0 < a && d.removeAt(a - 1);
		}
	};
	_.A(YX, _.Xm);
	_.A(ZX, _.O);
	ZX.prototype.map_changed = function() {
		this.get('map') || (this.T.set('map', null), cY(this));
	};
	ZX.prototype.panes_changed = ZX.prototype.paths_changed = ZX.prototype.suppressGhostControlPoints_changed = function() {
		var a = this;
		cY(a);
		var b = a.get('paths'),
			c = a.get('panes');
		if (b && c) {
			var d = c.overlayMouseTarget;
			b.forEach(function(f) {
				a.j.push(aY(a, f, d));
				a.get('suppressGhostControlPoints') || a.i.push(bY(a, f, d));
			});
			var e = function() {
				_.N.trigger(a, 'toolbar', { i: !1 });
			};
			e();
			c = a.W;
			c.push(
				_.N.addListener(b, 'insert_at', function(f) {
					var g = a.get('suppressGhostControlPoints'),
						h = b.getAt(f);
					a.j.splice(f, 0, aY(a, h, d));
					g || a.i.splice(f, 0, bY(a, h, d));
					e();
				})
			);
			c.push(
				_.N.addListener(b, 'remove_at', function(f) {
					var g = a.get('suppressGhostControlPoints');
					a.o(a.j[f]);
					a.j.splice(f, 1);
					g || (a.o(a.i[f]), a.i.splice(f, 1));
					e();
				})
			);
			c.push(
				_.N.addListener(b, 'set_at', function(f) {
					var g = a.get('suppressGhostControlPoints');
					a.o(a.j[f]);
					var h = b.getAt(f);
					a.j[f] = aY(a, h, d);
					g || (a.o(a.i[f]), (a.i[f] = bY(a, h, d)));
					e();
				})
			);
		}
	};
	ZX.prototype.o = function(a) {
		a.unbindAll();
		a.release();
		_.N.clearInstanceListeners(a);
		a.T && (a.T.release(), a.T.unbindAll());
	};
	gY.prototype.getBounds = _.pa('j');
	hY.prototype.j = function(a, b) {
		if ('dragstart' != a && 'drag' != a && 'dragend' != a) return !0;
		a =
			(a = (b.Te || b).get('map')) &&
			0 != a.get('draggable') &&
			'none' != a.get('gestureHandling');
		return !!this.i || !a;
	};
	var yba = new _.I(0.5, 0.5);
	hY.prototype.o = function(a, b) {
		var c = this.T.get();
		if (!c) return null;
		c = c.Wa.size;
		var d = _.gF(this.W, a.ab, yba);
		if (!d) return null;
		var e = new _.I(d.se.Aa * c.wa, d.se.Ba * c.Ca),
			f = new _.I(d.Qe.Aa * c.wa, d.Qe.Ba * c.Ca),
			g = [],
			h = d.wb.rb;
		for (k in h) g.push(h[k]);
		g.reverse();
		g.sort(function(w, x) {
			return x.zIndex - w.zIndex || 0;
		});
		var k = null;
		h = b ? 15 : 0;
		for (var l = 0, m = g.length; l < m; ++l) {
			var q = g[l],
				t = q.i;
			if (t.clickable) {
				var u = q.j.yd,
					v = t.o / 2 + h;
				q = Qaa(q.paths);
				if ((v = kaa(e.x, e.y, v, q))) {
					k = u;
					b = this.T.get();
					b = _.Am(b && b.Wa, {
						Aa: (v[0] + f.x) / c.wa,
						Ba: (v[1] + f.y) / c.Ca,
						Ma: d.Qe.Ma
					});
					a.ab = new _.I(b.Da, b.Ha);
					a.latLng = this.$(a.ab);
					break;
				}
				if (t.ac && !b && jaa(e.x, e.y, q)) {
					k = u;
					break;
				}
			}
		}
		return k;
	};
	hY.prototype.handleEvent = function(a, b, c) {
		!this.i ||
			('mousedown' != a && 'dragstart' != a && 'drag' != a) ||
			(this.Vc = !0);
		this.i && !this.Vc && ((b.ab = this.i.ab), (b.latLng = this.i.latLng));
		var d = c.Te || c;
		!this.i &&
			'mousedown' == a &&
			d.get('draggable') &&
			((this.i = b), c.set('capturing', !0));
		d = c;
		if (this.i) {
			if ((this.Vc && 'dragend' == a) || (!this.Vc && 'mouseup' == a))
				(this.Vc = !1), (this.i = null), c.set('capturing', !1);
			('dragstart' != a && 'drag' != a && 'dragend' != a) ||
				!c.Te ||
				(d = c.Te);
			'dragstart' == a && (a = 'movestart');
			'drag' == a && (a = 'move');
			'dragend' == a && (a = 'moveend');
		} else {
			if ('dragstart' == a || 'dragend' == a) return;
			'drag' == a && (a = 'mousemove');
		}
		'mouseout' == a
			? this.H.set('cursor', '')
			: 'mousemove' == a &&
			  ((c = c.get && c.get('cursor')),
			  void 0 === c && (c = 'pointer'),
			  this.H.set('cursor', c));
		_.N.trigger(d, a, new YX(b.latLng, b.tb));
	};
	hY.prototype.zIndex = 30;
	_.Ha(jY, _.Wi);
	jY.prototype.Ob = function() {
		return { Wa: this.i, Vb: 2, Yb: this.H.bind(this) };
	};
	jY.prototype.H = function(a, b) {
		var c = this;
		b = void 0 === b ? {} : b;
		var d = document.createElement('div'),
			e = this.i.size;
		d.style.width = e.wa + 'px';
		d.style.height = e.Ca + 'px';
		var f = new _.I(a.Aa, a.Ba);
		e = this.get('projection');
		var g = new gY(f, a.Ma, e, this.i),
			h = g.getBounds(),
			k = this.T(this.o, d),
			l = !1,
			m;
		return {
			Hb: function() {
				return d;
			},
			nc: function() {
				return l;
			},
			loaded: new Promise(function(q) {
				m = {
					bounds: h,
					Xa: f,
					Na: d,
					Dh: k,
					rb: {},
					Gd: function() {
						l = !0;
						q();
					},
					to: g,
					zoom: a.Ma
				};
				_.Ze(c.j, m);
			}),
			release: function() {
				_.jo(d, '');
				c.j.remove(m);
				b.Lb && b.Lb();
			}
		};
	};
	oY.prototype.H = function(a, b) {
		this.i = this.i || Vaa(this.j, a, this.o);
		return new Taa(this.j, b, this.o, this.i, a);
	};
	var uY = new dX(1),
		tY = new dX(0),
		vY = new dX(0);
	var hba = { value: 100, i: '%' },
		iba = { value: 0, i: 'px' };
	_.A(yY, _.O);
	_.A(zY, _.O);
	var AY = [12, 6, 9, 3],
		BY = [1, 2, 4, 8],
		pba = ['ne-resize', 'nw-resize', 'se-resize', 'sw-resize'],
		rba = ['row-resize', 'col-resize'],
		qba = [0],
		sba = [2, 1];
	_.r = zY.prototype;
	_.r.map_changed = function() {
		this.get('map') ||
			(this.ka.set('map', null),
			DY(this.T),
			this.get('suppressGhostControlPoints') || DY(this.o),
			_.N.clearInstanceListeners(this.j));
	};
	_.r.panes_changed = zY.prototype.suppressGhostControlPoints_changed = function() {
		DY(this.T);
		DY(this.o);
		this.o = null;
		var a = this.get('panes');
		a &&
			((this.T = CY(this, a, !0)),
			this.get('suppressGhostControlPoints') || (this.o = CY(this, a, !1)));
	};
	_.r.bounds_changed = function() {
		var a = this.j,
			b = this.H,
			c = this.get('bounds');
		if (c) {
			this.i = !0;
			a.setAt(0, c.getNorthEast());
			a.setAt(1, _.om(c));
			a.setAt(2, _.nm(c));
			a.setAt(3, c.getSouthWest());
			a = c.Za.center();
			var d = c.Ua.center();
			b.setAt(0, new _.L(c.Za.i, d));
			b.setAt(1, new _.L(a, c.Ua.i));
			b.setAt(2, new _.L(c.Za.j, d));
			b.setAt(3, new _.L(a, c.Ua.j));
			this.i = !1;
			_.N.trigger(this, 'toolbar', { i: !1 });
		} else a.clear(), b.clear();
	};
	_.r.Ho = function(a) {
		EY(this, AY[a], this.j.getAt(a));
	};
	_.r.Io = function(a) {
		EY(this, BY[a], this.H.getAt(a));
	};
	GY.prototype.i = function(a) {
		var b = this.Ra,
			c = b.fromLatLngToDivPixel(this.j),
			d = b.fromLatLngToDivPixel(this.T);
		b = b.fromLatLngToDivPixel(this.H);
		b = new _.I(b.x - c.x + a.x, b.y - c.y + a.y);
		a = new _.$d(
			this.Ra.fromDivPixelToLatLng(new _.I(d.x - c.x + a.x, d.y - c.y + a.y)),
			this.Ra.fromDivPixelToLatLng(b)
		);
		this.o.set('bounds', a);
	};
	_.A(HY, _.O);
	HY.prototype.bounds_changed = function() {
		var a = this.i;
		if (a) {
			var b = this.get('bounds');
			if (b) {
				var c = b.getSouthWest(),
					d = b.getNorthEast();
				b = b.getCenter();
				a.setPaths([
					new _.L(d.lat(), d.lng()),
					new _.L(d.lat(), b.lng()),
					new _.L(d.lat(), c.lng()),
					new _.L(c.lat(), c.lng()),
					new _.L(c.lat(), b.lng()),
					new _.L(c.lat(), d.lng())
				]);
			} else a.setPaths([]);
		}
	};
	HY.prototype.release = function() {
		for (var a = this.j, b = 0, c = a.length; b < c; ++b)
			_.N.removeListener(a[b]);
		delete this.j;
		this.i.unbindAll();
		delete this.i;
	};
	JY.prototype.i = function(a) {
		var b = 0 != a.getVisible() ? a.getMap() : null;
		a.j != b &&
			(a.j && a.j.__gm.T.remove(a),
			b && (b.__gm.T.i || new yaa(b), _.Ze(b.__gm.T, a)),
			(a.j = b));
	};
	JY.prototype.j = function(a) {
		var b = 0 != a.getVisible() ? a.getMap() : null;
		a.o != b &&
			(a.o && a.o.__gm.H.remove(a),
			b && (b.__gm.H.i || new nba(b), _.Ze(b.__gm.H, a)),
			(a.o = b));
	};
	JY.prototype.o = function(a) {
		var b = 0 != a.getVisible() ? a.getMap() : null;
		a.j != b &&
			(a.j && a.j.__gm.W.remove(a),
			b && (b.__gm.W.i || new wba(b), _.Ze(b.__gm.W, a)),
			(a.j = b));
	};
	_.If('poly', new JY());
});
