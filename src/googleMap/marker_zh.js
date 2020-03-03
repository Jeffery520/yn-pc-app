google.maps.__gjsload__('marker', function(_) {
	var CT,
		DT,
		ET,
		FT,
		GT,
		HT,
		JT,
		MT,
		KT,
		NT,
		LT,
		RT,
		ST,
		PT,
		TT,
		VT,
		YT,
		WT,
		ZT,
		aU,
		$T,
		bU,
		cU,
		dU,
		eU,
		pU,
		fU,
		mU,
		kU,
		nU,
		gU,
		rU,
		lU,
		qU,
		hU,
		oU,
		iU,
		jU,
		DU,
		vU,
		wU,
		xU,
		yU,
		zU,
		AU,
		BU,
		CU,
		FU,
		GU,
		uU,
		IU,
		HU,
		JU,
		LU,
		KU,
		MU,
		OU,
		NU,
		PU,
		SU,
		RU,
		QU,
		TU,
		UU,
		VU,
		XU,
		WU,
		ZU,
		YU,
		bV,
		cV,
		dV,
		aV,
		$U,
		gV,
		fV,
		eV,
		hV,
		iV;
	CT = function(a) {
		var b = 1;
		return function() {
			--b || a();
		};
	};
	DT = function(a, b) {
		_.fy().vb.load(new _.QD(a), function(c) {
			b(c && c.size);
		});
	};
	ET = function(a) {
		this.j = a;
		this.i = !1;
	};
	FT = function(a, b) {
		if (!b) return null;
		var c = a.get('snappingCallback');
		c && (b = c(b));
		c = b.x;
		b = b.y;
		var d = a.get('referencePosition');
		d && (2 == a.j ? (c = d.x) : 1 == a.j && (b = d.y));
		return new _.I(c, b);
	};
	Animation = function(a) {
		this.i = a;
		this.j = '';
	};
	GT = function(a, b) {
		var c = [];
		c.push('@-webkit-keyframes ', b, ' {\n');
		_.B(a.i, function(d) {
			c.push(100 * d.time + '% { ');
			c.push(
				'-webkit-transform: translate3d(' + d.translate[0] + 'px,',
				d.translate[1] + 'px,0); '
			);
			c.push('-webkit-animation-timing-function: ', d.tc, '; ');
			c.push('}\n');
		});
		c.push('}\n');
		return c.join('');
	};
	HT = function(a, b) {
		for (var c = 0; c < a.i.length - 1; c++) {
			var d = a.i[c + 1];
			if (b >= a.i[c].time && b < d.time) return c;
		}
		return a.i.length - 1;
	};
	JT = function(a) {
		if (a.j) return a.j;
		a.j = '_gm' + Math.round(1e4 * Math.random());
		var b = GT(a, a.j);
		if (!IT) {
			IT = _.ve('style');
			IT.type = 'text/css';
			var c = document;
			c =
				c.querySelectorAll && c.querySelector
					? c.querySelectorAll('HEAD')
					: c.getElementsByTagName('HEAD');
			c[0].appendChild(IT);
		}
		IT.textContent += b;
		return a.j;
	};
	MT = function(a, b, c) {
		var d, e;
		if ((e = 0 != c.Uj))
			e =
				5 == _.rl.i.i ||
				6 == _.rl.i.i ||
				(3 == _.rl.i.type && _.Dm(_.rl.i.version, 7));
		e ? (d = new KT(a, b, c)) : (d = new LT(a, b, c));
		d.start();
		return d;
	};
	KT = function(a, b, c) {
		this.Db = a;
		this.o = b;
		this.i = c;
		this.j = !1;
	};
	NT = function(a, b, c) {
		_.Qm(function() {
			a.style.WebkitAnimationDuration = c.duration ? c.duration + 'ms' : null;
			a.style.WebkitAnimationIterationCount = c.Dd;
			a.style.WebkitAnimationName = b;
		});
	};
	LT = function(a, b, c) {
		this.Db = a;
		this.H = b;
		this.j = -1;
		'infinity' != c.Dd && (this.j = c.Dd || 1);
		this.T = c.duration || 1e3;
		this.i = !1;
		this.o = 0;
	};
	RT = function() {
		for (var a = [], b = 0; b < OT.length; b++) {
			var c = OT[b];
			PT(c);
			c.i || a.push(c);
		}
		OT = a;
		0 == OT.length && (window.clearInterval(QT), (QT = null));
	};
	ST = function(a) {
		return a ? a.__gm_at || _.pk : null;
	};
	PT = function(a) {
		if (!a.i) {
			var b = _.Om();
			TT(a, (b - a.o) / a.T);
			b >= a.o + a.T &&
				((a.o = _.Om()), 'infinite' != a.j && (a.j--, a.j || a.cancel()));
		}
	};
	TT = function(a, b) {
		var c = 1,
			d = a.H;
		var e = d.i[HT(d, b)];
		var f;
		d = a.H;
		(f = d.i[HT(d, b) + 1]) && (c = (b - e.time) / (f.time - e.time));
		b = ST(a.Db);
		d = a.Db;
		f
			? ((c = (0, UT[e.tc || 'linear'])(c)),
			  (e = e.translate),
			  (f = f.translate),
			  (c = new _.I(
					Math.round(c * f[0] - c * e[0] + e[0]),
					Math.round(c * f[1] - c * e[1] + e[1])
			  )))
			: (c = new _.I(e.translate[0], e.translate[1]));
		c = d.__gm_at = c;
		d = c.x - b.x;
		b = c.y - b.y;
		if (0 != d || 0 != b)
			(c = a.Db),
				(e = new _.I(_.dy(c.style.left) || 0, _.dy(c.style.top) || 0)),
				(e.x = e.x + d),
				(e.y += b),
				_.mo(c, e);
		_.N.trigger(a, 'tick');
	};
	VT = function() {
		this.icon = {
			url: _.Oo('api-3/images/spotlight-poi2', !0),
			scaledSize: new _.K(27, 43),
			origin: new _.I(0, 0),
			anchor: new _.I(14, 43),
			labelOrigin: new _.I(14, 15)
		};
		this.j = {
			url: _.Oo('api-3/images/spotlight-poi-dotless2', !0),
			scaledSize: new _.K(27, 43),
			origin: new _.I(0, 0),
			anchor: new _.I(14, 43),
			labelOrigin: new _.I(14, 15)
		};
		this.i = {
			url: _.Oo('api-3/images/drag-cross', !0),
			scaledSize: new _.K(13, 11),
			origin: new _.I(0, 0),
			anchor: new _.I(7, 6)
		};
		this.shape = {
			coords: [13.5, 0, 4, 3.75, 0, 13.5, 13.5, 43, 27, 13.5, 23, 3.75],
			type: 'poly'
		};
	};
	YT = function(a, b) {
		var c = this;
		this.j = a;
		this.i = b;
		this.Ja = new _.ji(function() {
			var d = c.get('modelIcon'),
				e = c.get('modelLabel');
			WT(c, 'viewIcon', d || (e && XT.j) || XT.icon);
			WT(c, 'viewCross', XT.i);
			e = c.get('useDefaults');
			var f = c.get('modelShape');
			f || (d && !e) || (f = XT.shape);
			c.get('viewShape') != f && c.set('viewShape', f);
		}, 0);
		XT || (XT = new VT());
	};
	WT = function(a, b, c) {
		ZT(a, c, function(d) {
			a.set(b, d);
			'viewIcon' === b &&
				d &&
				d.size &&
				a.i &&
				a.i(d.size, d.anchor, d.labelOrigin);
			d = a.get('modelLabel');
			a.set(
				'viewLabel',
				d
					? {
							text: d.text || d,
							color: _.dd(d.color, '#000000'),
							fontWeight: _.dd(d.fontWeight, ''),
							fontSize: _.dd(d.fontSize, '14px'),
							fontFamily: _.dd(d.fontFamily, 'Roboto,Arial,sans-serif')
					  }
					: null
			);
		});
	};
	ZT = function(a, b, c) {
		b
			? b instanceof _.ig
				? c(b)
				: null != b.path
				? c(a.j(b))
				: (_.hd(b) || (b.size = b.size || b.scaledSize),
				  b.size
						? c(b)
						: (b.url || (b = { url: b }),
						  DT(b.url, function(d) {
								b.size = d || new _.K(24, 24);
								c(b);
						  })))
			: c(null);
	};
	aU = function() {
		this.i = $T(this);
		this.set('shouldRender', this.i);
		this.j = !1;
	};
	$T = function(a) {
		var b = a.get('mapPixelBoundsQ'),
			c = a.get('icon'),
			d = a.get('position');
		if (!b || !c || !d) return 0 != a.get('visible');
		var e = c.anchor || _.pk,
			f = c.size.width + Math.abs(e.x);
		c = c.size.height + Math.abs(e.y);
		return d.x > b.Ka - f && d.y > b.Ia - c && d.x < b.Pa + f && d.y < b.Oa + c
			? 0 != a.get('visible')
			: !1;
	};
	bU = function(a) {
		this.j = a;
		this.i = !1;
	};
	cU = function(a, b, c, d, e) {
		this.W = c;
		this.o = a;
		this.H = b;
		this.ka = d;
		this.La = 0;
		this.j = null;
		this.i = new _.ji(this.vk, 0, this);
		this.T = e;
		this.ta = this.ua = null;
	};
	dU = function(a, b) {
		a.$ = b;
		_.ki(a.i);
	};
	eU = function(a) {
		a.j && (_.Vn(a.j), (a.j = null));
	};
	pU = function(a, b, c) {
		var d = this;
		this.Ja = new _.ji(function() {
			var e = d.get('panes'),
				f = d.get('scale');
			if (
				!e ||
				!d.getPosition() ||
				0 == d.wk() ||
				(_.fd(f) && 0.1 > f && !d.get('dragging'))
			)
				fU(d);
			else {
				var g = e.markerLayer;
				if ((f = d.Ug())) {
					var h = null != f.url;
					d.i && d.Mc == h && (_.Vn(d.i), (d.i = null));
					d.Mc = !h;
					d.i = gU(d, g, d.i, f);
					g = hU(d);
					h = iU(f);
					d.uc.width = g * h.width;
					d.uc.height = g * h.height;
					d.set('size', d.uc);
					var k = d.get('anchorPoint');
					if (!k || k.i)
						(f = jU(f)),
							(d.Qa.x = g * (f ? h.width / 2 - f.x : 0)),
							(d.Qa.y = -g * (f ? f.y : h.height)),
							(d.Qa.i = !0),
							d.set('anchorPoint', d.Qa);
				}
				if (!d.ya) {
					var l = d.Ug();
					if (
						l &&
						((f = 0 != d.get('clickable')), (g = d.getDraggable()), f || g)
					) {
						k = l.url || _.$t;
						h = {};
						if (_.go()) {
							var m = iU(l);
							l = jU(l);
							var q = m.width;
							m = m.height;
							var t = new _.K(q + 16, m + 16);
							l = {
								url: k,
								size: t,
								anchor: l
									? new _.I(l.x + 8, l.y + 8)
									: new _.I(Math.round(q / 2) + 8, m + 8),
								scaledSize: t
							};
						} else if (_.cj.j || _.cj.o)
							if (((h.shape = d.get('shape')), h.shape || null != l.fg))
								(q = l.scaledSize || l.size),
									(l = { url: k, size: q, anchor: l.anchor, scaledSize: q });
						k = null != l.url;
						d.Oc == k && kU(d);
						d.Oc = !k;
						h = d.W = gU(d, d.getPanes().overlayMouseTarget, d.W, l, h);
						_.Sy(h, 0);
						k = h;
						if (
							(l =
								k.getAttribute('usemap') ||
								(k.firstChild && k.firstChild.getAttribute('usemap'))) &&
							l.length &&
							(k = _.ho(k).getElementById(l.substr(1)))
						)
							var u = k.firstChild;
						h = u || h;
						h.title = d.get('title') || '';
						g &&
							!d.T &&
							((u = d.T = new _.$E(h, d.kc, d.W)),
							d.kc
								? (u.bindTo('deltaClientPosition', d), u.bindTo('position', d))
								: u.bindTo('position', d.yb, 'rawPosition'),
							u.bindTo('containerPixelBounds', d, 'mapPixelBounds'),
							u.bindTo('anchorPoint', d),
							u.bindTo('size', d),
							u.bindTo('panningEnabled', d),
							u &&
								!d.Ta &&
								(d.Ta = [
									_.N.forward(u, 'dragstart', d),
									_.N.forward(u, 'drag', d),
									_.N.forward(u, 'dragend', d),
									_.N.forward(u, 'panbynow', d)
								]));
						u = d.get('cursor') || 'pointer';
						g ? d.T.set('draggableCursor', u) : _.Ry(h, f ? u : '');
						lU(d, h);
					}
				}
				e = e.overlayLayer;
				if ((f = u = d.get('cross')))
					(f = d.get('crossOnDrag')),
						void 0 === f && (f = d.get('raiseOnDrag')),
						(f = 0 != f && d.getDraggable() && d.get('dragging'));
				f ? (d.o = gU(d, e, d.o, u)) : (d.o && _.Vn(d.o), (d.o = null));
				d.$ = [d.i, d.o, d.W];
				mU(d);
				for (e = 0; e < d.$.length; ++e)
					if ((f = d.$[e]))
						(u = f),
							(g = f.i),
							(h = ST(f) || _.pk),
							(f = hU(d)),
							(g = nU(d, g, f, h)),
							_.mo(u, g),
							(g = _.rl.j) && (u.style[g] = 1 != f ? 'scale(' + f + ') ' : ''),
							(f = d.get('zIndex')),
							d.get('dragging') && (f = 1e6),
							_.fd(f) || (f = Math.min(d.getPosition().y, 999999)),
							_.oo(u, f),
							d.H && d.H.setZIndex(f);
				oU(d);
				for (e = 0; e < d.$.length; ++e) (u = d.$[e]) && _.Oy(u);
			}
		}, 0);
		this.xd = a;
		this.wd = c;
		this.kc = b || !1;
		this.yb = new ET(0);
		this.yb.bindTo('position', this);
		this.H = this.i = null;
		this.Pc = [];
		this.Mc = !1;
		this.W = null;
		this.Oc = !1;
		this.o = null;
		this.$ = [];
		this.Bc = new _.I(0, 0);
		this.uc = new _.K(0, 0);
		this.Qa = new _.I(0, 0);
		this.vc = !0;
		this.ya = 0;
		this.j = this.Nc = this.hd = this.Qc = null;
		this.Ac = !1;
		this.Lc = [
			_.N.addListener(this, 'dragstart', this.yk),
			_.N.addListener(this, 'dragend', this.xk),
			_.N.addListener(this, 'panbynow', function() {
				return d.Ja.Nb();
			})
		];
		this.Db = this.ta = this.ka = this.T = this.ua = this.Ta = null;
	};
	fU = function(a) {
		a.H && (qU(a.Pc), a.H.release(), (a.H = null));
		a.i && _.Vn(a.i);
		a.i = null;
		a.o && _.Vn(a.o);
		a.o = null;
		kU(a);
		a.$ = [];
	};
	mU = function(a) {
		var b = a.Ml();
		if (b) {
			if (!a.H) {
				var c = (a.H = new cU(
					a.getPanes(),
					b,
					a.get('opacity'),
					a.get('visible'),
					a.wd
				));
				a.Pc = [
					_.N.addListener(a, 'label_changed', function() {
						c.setLabel(this.get('label'));
					}),
					_.N.addListener(a, 'opacity_changed', function() {
						c.setOpacity(this.get('opacity'));
					}),
					_.N.addListener(a, 'panes_changed', function() {
						var f = this.get('panes');
						c.o = f;
						eU(c);
						_.ki(c.i);
					}),
					_.N.addListener(a, 'visible_changed', function() {
						c.setVisible(this.get('visible'));
					})
				];
			}
			b = a.Ug();
			a.getPosition();
			if (b) {
				var d = a.i,
					e = hU(a);
				d = nU(a, b, e, ST(d) || _.pk);
				e = iU(b);
				b = b.labelOrigin || new _.I(e.width / 2, e.height / 2);
				dU(a.H, new _.I(d.x + b.x, d.y + b.y));
				a.H.i.Nb();
			}
		}
	};
	kU = function(a) {
		a.ya
			? (a.Ac = !0)
			: (a.W && _.Vn(a.W),
			  (a.W = null),
			  a.T &&
					(a.T.unbindAll(),
					a.T.release(),
					(a.T = null),
					qU(a.Ta),
					(a.Ta = null)),
			  a.ka && a.ka.remove(),
			  a.ta && a.ta.remove());
	};
	nU = function(a, b, c, d) {
		var e = a.getPosition(),
			f = iU(b),
			g = (b = jU(b)) ? b.x : f.width / 2;
		a.Bc.x = e.x + d.x - Math.round(g - (g - f.width / 2) * (1 - c));
		b = b ? b.y : f.height;
		a.Bc.y = e.y + d.y - Math.round(b - (b - f.height / 2) * (1 - c));
		return a.Bc;
	};
	gU = function(a, b, c, d, e) {
		if (d instanceof _.ig) a = rU(a, b, c, d);
		else if (null != d.url) {
			var f = e;
			e = d.origin || _.pk;
			var g = a.get('opacity');
			a = _.dd(g, 1);
			c
				? (c.firstChild.__src__ != d.url &&
						((b = c.firstChild), _.hE(b, d.url, b.o)),
				  _.lE(c, d.size, e, d.scaledSize),
				  (c.firstChild.style.opacity = a))
				: ((f = f || {}),
				  (f.j = 1 != _.cj.type),
				  (f.alpha = !0),
				  (f.opacity = g),
				  (c = _.kE(d.url, null, e, d.size, null, d.scaledSize, f)),
				  _.Ny(c),
				  b.appendChild(c));
			a = c;
		} else
			(b = c || _.no('div', b)),
				sU(b, d),
				(c = b),
				(a = a.get('opacity')),
				_.Sy(c, _.dd(a, 1)),
				(a = b);
		c = a;
		c.i = d;
		return c;
	};
	rU = function(a, b, c, d) {
		c = c || _.no('div', b);
		_.xi(c);
		c.appendChild(
			b === a.getPanes().overlayMouseTarget
				? d.element.cloneNode(!0)
				: d.element
		);
		b = d.Ya();
		c.style.width = b.width + (b.j || 'px');
		c.style.height = b.height + (b.i || 'px');
		c.style.pointerEvents = 'none';
		c.style.userSelect = 'none';
		_.N.addListenerOnce(d, 'changed', function() {
			a.Cc();
		});
		return c;
	};
	lU = function(a, b) {
		(a.ka && a.ta && a.Db == b) ||
			((a.Db = b),
			a.ka && a.ka.remove(),
			a.ta && a.ta.remove(),
			(a.ka = _.Ep(b, {
				Ib: function(c) {
					a.ya++;
					_.Uo(c);
					_.N.trigger(a, 'mousedown', c.Sa);
				},
				Mb: function(c) {
					a.ya--;
					!a.ya &&
						a.Ac &&
						_.gy(
							this,
							function() {
								a.Ac = !1;
								kU(a);
								a.Ja.Nb();
							},
							0
						);
					_.Wo(c);
					_.N.trigger(a, 'mouseup', c.Sa);
				},
				onClick: function(c) {
					var d = c.event;
					c = c.Ud;
					_.Xo(d);
					3 == d.button
						? c || _.N.trigger(a, 'rightclick', d.Sa)
						: c
						? _.N.trigger(a, 'dblclick', d.Sa)
						: _.N.trigger(a, 'click', d.Sa);
				}
			})),
			(a.ta = new _.kt(b, b, {
				jf: function(c) {
					_.N.trigger(a, 'mouseout', c);
				},
				kf: function(c) {
					_.N.trigger(a, 'mouseover', c);
				}
			})));
	};
	qU = function(a) {
		if (a) for (var b = 0, c = a.length; b < c; b++) _.N.removeListener(a[b]);
	};
	hU = function(a) {
		return _.rl.j ? Math.min(1, a.get('scale') || 1) : 1;
	};
	oU = function(a) {
		if (!a.vc) {
			a.j && (a.ua && _.N.removeListener(a.ua), a.j.cancel(), (a.j = null));
			var b = a.get('animation');
			if ((b = tU[b])) {
				var c = b.options;
				a.i &&
					((a.vc = !0),
					a.set('animating', !0),
					(b = MT(a.i, b.icon, c)),
					(a.j = b),
					(a.ua = _.N.addListenerOnce(b, 'done', function() {
						a.set('animating', !1);
						a.j = null;
						a.set('animation', null);
					})));
			}
		}
	};
	iU = function(a) {
		return a instanceof _.ig ? a.Ya() : a.size;
	};
	jU = function(a) {
		return a instanceof _.ig ? a.getAnchor() : a.anchor;
	};
	DU = function(a, b, c, d, e) {
		var f = this;
		this.Kb = b;
		this.i = a;
		this.ya = e;
		this.ka = b instanceof _.kf;
		a = uU(this);
		b = this.ka && a ? _.rn(a, b.getProjection()) : null;
		this.j = new pU(d, !!this.ka, void 0);
		this.ta = !0;
		this.ua = this.La = null;
		(this.o = this.ka
			? new _.By(e.j, this.j, b, e, function() {
					if (f.j.get('dragging') && !f.i.get('place')) {
						var g = f.o.getPosition();
						g &&
							((g = _.sn(g, f.Kb.get('projection'))),
							(f.ta = !1),
							f.i.set('position', g),
							(f.ta = !0));
					}
			  })
			: null) && e.yc(this.o);
		this.H = new YT(c, void 0);
		this.Ra = this.ka ? null : new _.DE();
		this.W = this.ka ? null : new aU();
		this.$ = new _.O();
		this.$.bindTo('position', this.i);
		this.$.bindTo('place', this.i);
		this.$.bindTo('draggable', this.i);
		this.$.bindTo('dragging', this.i);
		this.H.bindTo('modelIcon', this.i, 'icon');
		this.H.bindTo('modelLabel', this.i, 'label');
		this.H.bindTo('modelCross', this.i, 'cross');
		this.H.bindTo('modelShape', this.i, 'shape');
		this.H.bindTo('useDefaults', this.i, 'useDefaults');
		this.j.bindTo('icon', this.H, 'viewIcon');
		this.j.bindTo('label', this.H, 'viewLabel');
		this.j.bindTo('cross', this.H, 'viewCross');
		this.j.bindTo('shape', this.H, 'viewShape');
		this.j.bindTo('title', this.i);
		this.j.bindTo('cursor', this.i);
		this.j.bindTo('dragging', this.i);
		this.j.bindTo('clickable', this.i);
		this.j.bindTo('zIndex', this.i);
		this.j.bindTo('opacity', this.i);
		this.j.bindTo('anchorPoint', this.i);
		this.j.bindTo('animation', this.i);
		this.j.bindTo('crossOnDrag', this.i);
		this.j.bindTo('raiseOnDrag', this.i);
		this.j.bindTo('animating', this.i);
		this.W || this.j.bindTo('visible', this.i);
		vU(this);
		wU(this);
		this.T = [];
		xU(this);
		this.ka
			? (yU(this), zU(this), AU(this))
			: (BU(this),
			  this.Ra &&
					(this.W.bindTo('visible', this.i),
					this.W.bindTo('cursor', this.i),
					this.W.bindTo('icon', this.i),
					this.W.bindTo('icon', this.H, 'viewIcon'),
					this.W.bindTo('mapPixelBoundsQ', this.Kb.__gm, 'pixelBoundsQ'),
					this.W.bindTo('position', this.Ra, 'pixelPosition'),
					this.j.bindTo('visible', this.W, 'shouldRender')),
			  CU(this));
	};
	vU = function(a) {
		var b = a.Kb.__gm;
		a.j.bindTo('mapPixelBounds', b, 'pixelBounds');
		a.j.bindTo('panningEnabled', a.Kb, 'draggable');
		a.j.bindTo('panes', b);
	};
	wU = function(a) {
		var b = a.Kb.__gm;
		_.N.addListener(a.$, 'dragging_changed', function() {
			b.set('markerDragging', a.i.get('dragging'));
		});
		b.set('markerDragging', b.get('markerDragging') || a.i.get('dragging'));
	};
	xU = function(a) {
		a.T.push(_.N.forward(a.j, 'panbynow', a.Kb.__gm));
		_.B(EU, function(b) {
			a.T.push(
				_.N.addListener(a.j, b, function(c) {
					var d = a.ka ? uU(a) : a.i.get('internalPosition');
					c = new _.Xm(d, c, a.j.get('position'));
					_.N.trigger(a.i, b, c);
				})
			);
		});
	};
	yU = function(a) {
		function b() {
			a.i.get('place')
				? a.j.set('draggable', !1)
				: a.j.set('draggable', !!a.i.get('draggable'));
		}
		a.T.push(_.N.addListener(a.$, 'draggable_changed', b));
		a.T.push(_.N.addListener(a.$, 'place_changed', b));
		b();
	};
	zU = function(a) {
		a.T.push(
			_.N.addListener(a.Kb, 'projection_changed', function() {
				return FU(a);
			})
		);
		a.T.push(
			_.N.addListener(a.$, 'position_changed', function() {
				return FU(a);
			})
		);
		a.T.push(
			_.N.addListener(a.$, 'place_changed', function() {
				return FU(a);
			})
		);
	};
	AU = function(a) {
		a.T.push(
			_.N.addListener(a.j, 'dragging_changed', function() {
				if (a.j.get('dragging')) (a.La = _.Cy(a.o)), a.La && _.Dy(a.o, a.La);
				else {
					a.La = null;
					a.ua = null;
					var b = a.o.getPosition();
					if (b && ((b = _.sn(b, a.Kb.get('projection'))), (b = GU(a, b)))) {
						var c = _.rn(b, a.Kb.get('projection'));
						a.i.get('place') ||
							((a.ta = !1), a.i.set('position', b), (a.ta = !0));
						a.o.setPosition(c);
					}
				}
			})
		);
		a.T.push(
			_.N.addListener(a.j, 'deltaclientposition_changed', function() {
				var b = a.j.get('deltaClientPosition');
				if (b && (a.La || a.ua)) {
					var c = a.ua || a.La;
					a.ua = {
						clientX: c.clientX + b.clientX,
						clientY: c.clientY + b.clientY
					};
					b = a.ya.Wc(a.ua);
					b = _.sn(b, a.Kb.get('projection'));
					c = a.ua;
					var d = GU(a, b);
					d &&
						(a.i.get('place') ||
							((a.ta = !1), a.i.set('position', d), (a.ta = !0)),
						d.equals(b) ||
							((b = _.rn(d, a.Kb.get('projection'))), (c = _.Cy(a.o, b))));
					c && _.Dy(a.o, c);
				}
			})
		);
	};
	BU = function(a) {
		if (a.Ra) {
			a.j.bindTo('scale', a.Ra);
			a.j.bindTo('position', a.Ra, 'pixelPosition');
			var b = a.Kb.__gm;
			a.Ra.bindTo('latLngPosition', a.i, 'internalPosition');
			a.Ra.bindTo('focus', a.Kb, 'position');
			a.Ra.bindTo('zoom', b);
			a.Ra.bindTo('offset', b);
			a.Ra.bindTo('center', b, 'projectionCenterQ');
			a.Ra.bindTo('projection', a.Kb);
		}
	};
	CU = function(a) {
		if (a.Ra) {
			var b = new bU(a.Kb instanceof _.ff);
			b.bindTo('internalPosition', a.Ra, 'latLngPosition');
			b.bindTo('place', a.i);
			b.bindTo('position', a.i);
			b.bindTo('draggable', a.i);
			a.j.bindTo('draggable', b, 'actuallyDraggable');
		}
	};
	FU = function(a) {
		if (a.ta) {
			var b = uU(a);
			b && a.o.setPosition(_.rn(b, a.Kb.get('projection')));
		}
	};
	GU = function(a, b) {
		var c = a.Kb.__gm.get('snappingCallback');
		return c && (a = c({ latLng: b, overlay: a.i })) ? a : b;
	};
	uU = function(a) {
		var b = a.i.get('place');
		a = a.i.get('position');
		return (b && b.location) || a;
	};
	IU = function(a, b, c) {
		if (b instanceof _.kf) {
			var d = b.__gm;
			Promise.all([d.i, d.ua]).then(function(e) {
				e = _.Da(e);
				var f = e.next().value.nb;
				e.next();
				HU(a, b, c, f);
			});
		} else HU(a, b, c, null);
	};
	HU = function(a, b, c, d) {
		function e(f) {
			var g = b instanceof _.kf,
				h = g ? f.__gm.Jd.map : f.__gm.Jd.streetView,
				k = h && h.Kb == b,
				l = k != a.contains(f);
			h &&
				l &&
				(g
					? (f.__gm.Jd.map.dispose(), (f.__gm.Jd.map = null))
					: (f.__gm.Jd.streetView.dispose(), (f.__gm.Jd.streetView = null)));
			!a.contains(f) ||
				(!g && f.get('mapOnly')) ||
				k ||
				(b instanceof _.kf
					? (f.__gm.Jd.map = new DU(f, b, c, _.iF(b.__gm, f), d))
					: (f.__gm.Jd.streetView = new DU(f, b, c, _.kb, null)));
		}
		_.N.addListener(a, 'insert', e);
		_.N.addListener(a, 'remove', e);
		a.forEach(e);
	};
	JU = function(a, b, c, d) {
		this.o = a;
		this.H = b;
		this.W = c;
		this.j = d;
	};
	LU = function(a) {
		if (!a.i) {
			var b = a.o,
				c = b.ownerDocument.createElement('canvas');
			_.po(c);
			c.style.position = 'absolute';
			c.style.top = c.style.left = '0';
			var d = c.getContext('2d'),
				e = KU(d),
				f = a.j.size;
			c.width = Math.ceil(f.wa * e);
			c.height = Math.ceil(f.Ca * e);
			c.style.width = _.Q(f.wa);
			c.style.height = _.Q(f.Ca);
			b.appendChild(c);
			a.i = c.context = d;
		}
		return a.i;
	};
	KU = function(a) {
		return (
			_.Un() /
			(a.webkitBackingStorePixelRatio ||
				a.mozBackingStorePixelRatio ||
				a.msBackingStorePixelRatio ||
				a.oBackingStorePixelRatio ||
				a.backingStorePixelRatio ||
				1)
		);
	};
	MU = function(a, b, c) {
		a = a.W;
		a.width = b;
		a.height = c;
		return a;
	};
	OU = function(a) {
		var b = NU(a),
			c = LU(a),
			d = KU(c);
		a = a.j.size;
		c.clearRect(0, 0, Math.ceil(a.wa * d), Math.ceil(a.Ca * d));
		b.forEach(function(e) {
			c.globalAlpha = _.dd(e.opacity, 1);
			c.drawImage(
				e.image,
				e.Ne,
				e.Oe,
				e.tf,
				e.sf,
				Math.round(e.dx * d),
				Math.round(e.dy * d),
				e.od * d,
				e.nd * d
			);
		});
	};
	NU = function(a) {
		var b = [];
		a.H.forEach(function(c) {
			b.push(c);
		});
		b.sort(function(c, d) {
			return c.zIndex - d.zIndex;
		});
		return b;
	};
	PU = function() {
		this.i = _.fy().vb;
	};
	SU = function(a, b, c) {
		var d = this;
		this.T = b;
		this.i = c;
		this.Fa = {};
		this.j = {};
		this.H = 0;
		this.o = !0;
		var e = {
			animating: 1,
			animation: 1,
			attribution: 1,
			clickable: 1,
			cursor: 1,
			draggable: 1,
			flat: 1,
			icon: 1,
			label: 1,
			opacity: 1,
			optimized: 1,
			place: 1,
			position: 1,
			shape: 1,
			__gmHiddenByCollision: 1,
			title: 1,
			visible: 1,
			zIndex: 1
		};
		this.W = function(g) {
			g in e && (delete this.changed, (d.j[_.oe(this)] = this), QU(d));
		};
		a.i = function(g) {
			RU(d, g);
		};
		a.onRemove = function(g) {
			delete g.changed;
			delete d.j[_.oe(g)];
			d.T.remove(g);
			d.i.remove(g);
			_.vo('Om', '-p', g);
			_.vo('Om', '-v', g);
			_.vo('Smp', '-p', g);
			_.N.removeListener(d.Fa[_.oe(g)]);
			delete d.Fa[_.oe(g)];
		};
		a = a.j;
		for (var f in a) RU(this, a[f]);
	};
	RU = function(a, b) {
		a.j[_.oe(b)] = b;
		QU(a);
	};
	QU = function(a) {
		a.H ||
			(a.H = _.Qm(function() {
				a.H = 0;
				var b = a.j;
				a.j = {};
				var c = a.o,
					d;
				for (d in b) TU(a, b[d]);
				c &&
					!a.o &&
					a.i.forEach(function(e) {
						TU(a, e);
					});
			}));
	};
	TU = function(a, b) {
		var c = UU(b);
		b.changed = a.W;
		if (!b.get('animating'))
			if ((a.T.remove(b), !c || 0 == b.get('visible') || (b.__gm && b.__gm.Wl)))
				a.i.remove(b);
			else {
				a.o && 256 <= a.i.Ya() && (a.o = !1);
				var d = b.get('optimized'),
					e = b.get('draggable'),
					f = !!b.get('animation'),
					g = b.get('icon');
				g = !!g && null != g.path;
				var h = null != b.get('label');
				0 == d || e || f || g || h || (!d && a.o)
					? _.Ze(a.i, b)
					: (a.i.remove(b), _.Ze(a.T, b));
				!b.get('pegmanMarker') &&
					((d = b.get('map')),
					_.ij(d, 'Om'),
					_.uo('Om', '-p', b),
					d.getBounds() && d.getBounds().contains(c) && _.uo('Om', '-v', b),
					(a.Fa[_.oe(b)] =
						a.Fa[_.oe(b)] ||
						_.N.addListener(b, 'click', function(k) {
							_.uo('Om', '-i', k);
						})),
					(a = b.get('place'))) &&
					(a.placeId ? _.ij(d, 'Smpi') : _.ij(d, 'Smpq'),
					_.uo('Smp', '-p', b),
					b.get('attribution') && _.ij(d, 'Sma'));
			}
	};
	UU = function(a) {
		var b = a.get('place');
		b = b ? b.location : a.get('position');
		a.set('internalPosition', b);
		return b;
	};
	VU = function(a, b, c, d) {
		this.H = c;
		this.T = new _.fF(a, d, c);
		this.i = b;
	};
	XU = function(a, b, c, d) {
		var e = b.ab,
			f = a.H.get();
		if (!f) return null;
		f = f.Wa.size;
		c = _.gF(a.T, e, new _.I(c, d));
		if (!c) return null;
		a = new _.I(c.se.Aa * f.wa, c.se.Ba * f.Ca);
		var g = [];
		c.wb.rb.forEach(function(h) {
			g.push(h);
		});
		g.sort(function(h, k) {
			return k.zIndex - h.zIndex;
		});
		c = null;
		for (e = 0; (d = g[e]); ++e)
			if (((f = d.ff), 0 != f.clickable && ((f = f.yd), WU(a.x, a.y, d)))) {
				c = f;
				break;
			}
		c && (b.i = d);
		return c;
	};
	WU = function(a, b, c) {
		if (c.dx > a || c.dy > b || c.dx + c.od < a || c.dy + c.nd < b) a = !1;
		else
			a: {
				var d = c.ff.shape;
				a -= c.dx;
				b -= c.dy;
				c = d.coords;
				switch (d.type.toLowerCase()) {
					case 'rect':
						a = c[0] <= a && a <= c[2] && c[1] <= b && b <= c[3];
						break a;
					case 'circle':
						d = c[2];
						a -= c[0];
						b -= c[1];
						a = a * a + b * b <= d * d;
						break a;
					default:
						(d = c.length),
							(c[0] == c[d - 2] && c[1] == c[d - 1]) || c.push(c[0], c[1]),
							(a = 0 != _.nF(a, b, c));
				}
			}
		return a;
	};
	ZU = function(a, b, c) {
		this.o = b;
		var d = this;
		a.i = function(e) {
			YU(d, e, !0);
		};
		a.onRemove = function(e) {
			YU(d, e, !1);
		};
		this.j = null;
		this.i = !1;
		this.T = 0;
		this.W = c;
		a.Ya() ? ((this.i = !0), this.H()) : _.Je(_.Gl(_.N.trigger, c, 'load'));
	};
	YU = function(a, b, c) {
		4 > a.T++ ? (c ? a.o.T(b) : a.o.$(b)) : (a.i = !0);
		a.j || (a.j = _.Qm((0, _.y)(a.H, a)));
	};
	bV = function(a, b, c, d, e, f, g) {
		var h = this;
		this.T = a;
		this.W = d;
		this.o = c;
		this.j = e;
		this.H = f;
		this.i = g || _.jl;
		b.i = function(k) {
			var l = _.qn(h.get('projection')),
				m = k.i;
			-64 > m.dx || -64 > m.dy || 64 < m.dx + m.od || 64 < m.dy + m.nd
				? (_.Ze(h.o, k), (m = h.j.search(_.sk)))
				: ((m = k.latLng),
				  (m = new _.I(m.lat(), m.lng())),
				  (k.ab = m),
				  _.wK(h.H, { ab: m, Xf: k }),
				  (m = _.mF(h.j, m)));
			for (var q = 0, t = m.length; q < t; ++q) {
				var u = m[q],
					v = u.wb || null;
				if ((u = $U(h, v, u.Qj || null, k, l)))
					(k.rb[_.oe(u)] = u), _.Ze(v.rb, u);
			}
		};
		b.onRemove = function(k) {
			aV(h, k);
		};
	};
	cV = function(a, b) {
		a.T[_.oe(b)] = b;
		var c = { Aa: b.Xa.x, Ba: b.Xa.y, Ma: b.zoom },
			d = _.qn(a.get('projection')),
			e = _.Am(a.i, c);
		e = new _.I(e.Da, e.Ha);
		var f = _.Ax(a.i, c, 64 / a.i.size.wa);
		c = f.min;
		f = f.max;
		c = _.Jd(c.Da, c.Ha, f.Da, f.Ha);
		_.yK(c, d, e, function(g, h) {
			g.Qj = h;
			g.wb = b;
			b.ad[_.oe(g)] = g;
			_.kF(a.j, g);
			h = _.cd(a.H.search(g), function(t) {
				return t.Xf;
			});
			a.o.forEach((0, _.y)(h.push, h));
			for (var k = 0, l = h.length; k < l; ++k) {
				var m = h[k],
					q = $U(a, b, g.Qj, m, d);
				q && ((m.rb[_.oe(q)] = q), _.Ze(b.rb, q));
			}
		});
		b.Na && b.rb && a.W(b.Na, b.rb);
	};
	dV = function(a, b) {
		b &&
			(delete a.T[_.oe(b)],
			b.rb.forEach(function(c) {
				b.rb.remove(c);
				delete c.ff.rb[_.oe(c)];
			}),
			_.Yc(b.ad, function(c, d) {
				a.j.remove(d);
			}));
	};
	aV = function(a, b) {
		a.o.contains(b) ? a.o.remove(b) : a.H.remove({ ab: b.ab, Xf: b });
		_.Yc(b.rb, function(c, d) {
			delete b.rb[c];
			d.wb.rb.remove(d);
		});
	};
	$U = function(a, b, c, d, e) {
		if (!e || !c || !d.latLng) return null;
		var f = e.fromLatLngToPoint(c);
		c = e.fromLatLngToPoint(d.latLng);
		e = a.i.size;
		a = _.Bx(a.i, new _.Cd(c.x, c.y), new _.Cd(f.x, f.y), b.zoom);
		c.x = a.Aa * e.wa;
		c.y = a.Ba * e.Ca;
		a = d.zIndex;
		_.fd(a) || (a = c.y);
		a = Math.round(1e3 * a) + (_.oe(d) % 1e3);
		f = d.i;
		b = {
			image: f.image,
			Ne: f.Ne,
			Oe: f.Oe,
			tf: f.tf,
			sf: f.sf,
			dx: f.dx + c.x,
			dy: f.dy + c.y,
			od: f.od,
			nd: f.nd,
			zIndex: a,
			opacity: d.opacity,
			wb: b,
			ff: d
		};
		return b.dx > e.wa || b.dy > e.Ca || 0 > b.dx + b.od || 0 > b.dy + b.nd
			? null
			: b;
	};
	gV = function(a, b, c) {
		var d = new PU(),
			e = new VT(),
			f = eV,
			g = this;
		a.i = function(h) {
			fV(g, h);
		};
		a.onRemove = function(h) {
			g.j.remove(h.__gm.Of);
			delete h.__gm.Of;
		};
		this.j = b;
		this.i = e;
		this.T = f;
		this.H = d;
		this.o = c;
	};
	fV = function(a, b) {
		var c = b.get('internalPosition'),
			d = b.get('zIndex'),
			e = b.get('opacity'),
			f = (b.__gm.Of = { yd: b, latLng: c, zIndex: d, opacity: e, rb: {} });
		c = b.get('useDefaults');
		d = b.get('icon');
		var g = b.get('shape');
		g || (d && !c) || (g = a.i.shape);
		var h = d ? a.T(d) : a.i.icon,
			k = CT(function() {
				if (f == b.__gm.Of && (f.i || f.j)) {
					var l = g;
					if (f.i) {
						var m = h.size;
						var q = b.get('anchorPoint');
						if (!q || q.i)
							(q = new _.I(f.i.dx + m.width / 2, f.i.dy)),
								(q.i = !0),
								b.set('anchorPoint', q);
					} else m = f.j.size;
					l
						? (l.coords = l.coords || l.coord)
						: (l = { type: 'rect', coords: [0, 0, m.width, m.height] });
					f.shape = l;
					f.clickable = b.get('clickable');
					f.title = b.get('title') || null;
					f.cursor = b.get('cursor') || 'pointer';
					_.Ze(a.j, f);
				}
			});
		h.url
			? a.H.load(h, function(l) {
					f.i = l;
					k();
			  })
			: ((f.j = a.o(h)), k());
	};
	eV = function(a) {
		if (_.hd(a)) {
			var b = eV.i;
			return (b[a] = b[a] || { url: a });
		}
		return a;
	};
	hV = function(a, b, c) {
		var d = new _.Ye(),
			e = new _.Ye();
		new gV(a, d, c);
		var f = _.ho(b.getDiv()).createElement('canvas'),
			g = {};
		a = _.Jd(-100, -300, 100, 300);
		var h = new _.jF(a, void 0);
		a = _.Jd(-90, -180, 90, 180);
		var k = _.xK(a, function(u, v) {
				return u.Xf == v.Xf;
			}),
			l = null,
			m = null,
			q = new _.df(null, void 0),
			t = b.__gm;
		t.i.then(function(u) {
			t.o.register(new VU(g, t, q, u.nb.j));
			u.ke.kb(function(v) {
				if (v && l != v.Wa) {
					m && m.unbindAll();
					var w = (l = v.Wa);
					m = new bV(
						g,
						d,
						e,
						function(x, C) {
							return new ZU(C, new JU(x, C, f, w), x);
						},
						h,
						k,
						l
					);
					m.bindTo('projection', b);
					q.set(m.Ob());
				}
			});
		});
		_.hF(b, q, 'markerLayer', -1);
	};
	iV = _.n();
	_.I.prototype.Vf = _.ul(15, function() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	});
	_.A(ET, _.O);
	ET.prototype.position_changed = function() {
		this.i ||
			((this.i = !0),
			this.set('rawPosition', this.get('position')),
			(this.i = !1));
	};
	ET.prototype.rawPosition_changed = function() {
		this.i ||
			((this.i = !0),
			this.set('position', FT(this, this.get('rawPosition'))),
			(this.i = !1));
	};
	var UT = {
			linear: _.na(),
			'ease-out': function(a) {
				return 1 - Math.pow(a - 1, 2);
			},
			'ease-in': function(a) {
				return Math.pow(a, 2);
			}
		},
		IT;
	KT.prototype.start = function() {
		this.i.Dd = this.i.Dd || 1;
		this.i.duration = this.i.duration || 1;
		_.N.addDomListenerOnce(
			this.Db,
			'webkitAnimationEnd',
			(0, _.y)(function() {
				this.j = !0;
				_.N.trigger(this, 'done');
			}, this)
		);
		NT(this.Db, JT(this.o), this.i);
	};
	KT.prototype.cancel = function() {
		NT(this.Db, null, {});
		_.N.trigger(this, 'done');
	};
	KT.prototype.stop = function() {
		this.j ||
			_.N.addDomListenerOnce(
				this.Db,
				'webkitAnimationIteration',
				(0, _.y)(this.cancel, this)
			);
	};
	var QT = null,
		OT = [];
	LT.prototype.start = function() {
		OT.push(this);
		QT || (QT = window.setInterval(RT, 10));
		this.o = _.Om();
		PT(this);
	};
	LT.prototype.cancel = function() {
		this.i || ((this.i = !0), TT(this, 1), _.N.trigger(this, 'done'));
	};
	LT.prototype.stop = function() {
		this.i || (this.j = 1);
	};
	var tU = {};
	tU[1] = {
		options: { duration: 700, Dd: 'infinite' },
		icon: new Animation([
			{ time: 0, translate: [0, 0], tc: 'ease-out' },
			{ time: 0.5, translate: [0, -20], tc: 'ease-in' },
			{ time: 1, translate: [0, 0], tc: 'ease-out' }
		])
	};
	tU[2] = {
		options: { duration: 500, Dd: 1 },
		icon: new Animation([
			{ time: 0, translate: [0, -500], tc: 'ease-in' },
			{ time: 0.5, translate: [0, 0], tc: 'ease-out' },
			{ time: 0.75, translate: [0, -20], tc: 'ease-in' },
			{ time: 1, translate: [0, 0], tc: 'ease-out' }
		])
	};
	tU[3] = {
		options: { duration: 200, Vf: 20, Dd: 1, Uj: !1 },
		icon: new Animation([
			{ time: 0, translate: [0, 0], tc: 'ease-in' },
			{ time: 1, translate: [0, -20], tc: 'ease-out' }
		])
	};
	tU[4] = {
		options: { duration: 500, Vf: 20, Dd: 1, Uj: !1 },
		icon: new Animation([
			{ time: 0, translate: [0, -20], tc: 'ease-in' },
			{ time: 0.5, translate: [0, 0], tc: 'ease-out' },
			{ time: 0.75, translate: [0, -10], tc: 'ease-in' },
			{ time: 1, translate: [0, 0], tc: 'ease-out' }
		])
	};
	var XT;
	_.A(YT, _.O);
	YT.prototype.changed = function(a) {
		('modelIcon' != a &&
			'modelShape' != a &&
			'modelCross' != a &&
			'modelLabel' != a) ||
			_.ki(this.Ja);
	};
	_.A(aU, _.O);
	aU.prototype.changed = function() {
		if (!this.j) {
			var a = $T(this);
			this.i != a &&
				((this.i = a),
				(this.j = !0),
				this.set('shouldRender', this.i),
				(this.j = !1));
		}
	};
	_.A(bU, _.O);
	bU.prototype.internalPosition_changed = function() {
		if (!this.i) {
			this.i = !0;
			var a = this.get('position'),
				b = this.get('internalPosition');
			a &&
				b &&
				!a.equals(b) &&
				this.set('position', this.get('internalPosition'));
			this.i = !1;
		}
	};
	bU.prototype.place_changed = bU.prototype.position_changed = bU.prototype.draggable_changed = function() {
		if (!this.i) {
			this.i = !0;
			if (this.j) {
				var a = this.get('place');
				a
					? this.set('internalPosition', a.location)
					: this.set('internalPosition', this.get('position'));
			}
			this.get('place')
				? this.set('actuallyDraggable', !1)
				: this.set('actuallyDraggable', this.get('draggable'));
			this.i = !1;
		}
	};
	_.r = cU.prototype;
	_.r.setOpacity = function(a) {
		this.W = a;
		_.ki(this.i);
	};
	_.r.setLabel = function(a) {
		this.H = a;
		_.ki(this.i);
	};
	_.r.setVisible = function(a) {
		this.ka = a;
		_.ki(this.i);
	};
	_.r.setZIndex = function(a) {
		this.La = a;
		_.ki(this.i);
	};
	_.r.release = function() {
		this.o = null;
		eU(this);
	};
	_.r.vk = function() {
		if (this.o && this.H && 0 != this.ka) {
			var a = this.o.markerLayer,
				b = this.H;
			this.j ? a.appendChild(this.j) : (this.j = _.no('div', a));
			a = this.j;
			this.$ && _.mo(a, this.$);
			var c = a.firstChild;
			c ||
				((c = _.no('div', a)),
				(c.style.height = '100px'),
				(c.style.marginTop = '-50px'),
				(c.style.marginLeft = '-50%'),
				(c.style.display = 'table'),
				(c.style.borderSpacing = '0'));
			var d = c.firstChild;
			d ||
				((d = _.no('div', c)),
				(d.style.display = 'table-cell'),
				(d.style.verticalAlign = 'middle'),
				(d.style.whiteSpace = 'nowrap'),
				(d.style.textAlign = 'center'));
			c = d.firstChild || _.no('div', d);
			_.jo(c, b.text);
			c.style.color = b.color;
			c.style.fontSize = b.fontSize;
			c.style.fontWeight = b.fontWeight;
			c.style.fontFamily = b.fontFamily;
			this.T &&
				b !== this.ta &&
				((this.ta = b),
				(b = c.getBoundingClientRect()),
				(b = new _.K(b.width, b.height)),
				b.equals(this.ua) || ((this.ua = b), this.T(b)));
			_.Sy(c, _.dd(this.W, 1));
			_.oo(a, this.La);
		} else eU(this);
	};
	var sU = (0, _.y)(
		function(a, b, c) {
			_.jo(b, '');
			var d = _.Un(),
				e = _.ho(b).createElement('canvas');
			e.width = c.size.width * d;
			e.height = c.size.height * d;
			e.style.width = _.Q(c.size.width);
			e.style.height = _.Q(c.size.height);
			_.Wg(b, c.size);
			b.appendChild(e);
			_.mo(e, _.pk);
			_.po(e);
			b = e.getContext('2d');
			b.lineCap = b.lineJoin = 'round';
			b.scale(d, d);
			a = a(b);
			b.beginPath();
			a.Pb(c.fg, c.anchor.x, c.anchor.y, c.rotation || 0, c.scale);
			c.fillOpacity &&
				((b.fillStyle = c.fillColor),
				(b.globalAlpha = c.fillOpacity),
				b.fill());
			c.strokeWeight &&
				((b.lineWidth = c.strokeWeight),
				(b.strokeStyle = c.strokeColor),
				(b.globalAlpha = c.strokeOpacity),
				b.stroke());
		},
		null,
		function(a) {
			return new _.wF(a);
		}
	);
	_.A(pU, _.O);
	_.r = pU.prototype;
	_.r.panes_changed = function() {
		fU(this);
		_.ki(this.Ja);
	};
	_.r.Ke = function(a) {
		this.set('position', a && new _.I(a.wa, a.Ca));
	};
	_.r.He = function() {
		this.unbindAll();
		this.set('panes', null);
		this.j && this.j.stop();
		this.ua && (_.N.removeListener(this.ua), (this.ua = null));
		this.j = null;
		qU(this.Lc);
		this.Lc = [];
		fU(this);
		kU(this);
	};
	_.r.Jh = function() {
		var a;
		if (
			!(a =
				this.Qc != (0 != this.get('clickable')) ||
				this.hd != this.getDraggable())
		) {
			a = this.Nc;
			var b = this.get('shape');
			if (null == a || null == b) a = a == b;
			else {
				var c;
				if ((c = a.type == b.type))
					a: if (
						((a = a.coords),
						(b = b.coords),
						_.Qa(a) && _.Qa(b) && a.length == b.length)
					) {
						c = a.length;
						for (var d = 0; d < c; d++)
							if (a[d] !== b[d]) {
								c = !1;
								break a;
							}
						c = !0;
					} else c = !1;
				a = c;
			}
			a = !a;
		}
		a &&
			((this.Qc = 0 != this.get('clickable')),
			(this.hd = this.getDraggable()),
			(this.Nc = this.get('shape')),
			kU(this),
			_.ki(this.Ja));
	};
	_.r.shape_changed = pU.prototype.Jh;
	_.r.clickable_changed = pU.prototype.Jh;
	_.r.draggable_changed = pU.prototype.Jh;
	_.r.Cc = function() {
		_.ki(this.Ja);
	};
	_.r.cursor_changed = pU.prototype.Cc;
	_.r.scale_changed = pU.prototype.Cc;
	_.r.raiseOnDrag_changed = pU.prototype.Cc;
	_.r.crossOnDrag_changed = pU.prototype.Cc;
	_.r.zIndex_changed = pU.prototype.Cc;
	_.r.opacity_changed = pU.prototype.Cc;
	_.r.title_changed = pU.prototype.Cc;
	_.r.cross_changed = pU.prototype.Cc;
	_.r.icon_changed = pU.prototype.Cc;
	_.r.visible_changed = pU.prototype.Cc;
	_.r.dragging_changed = pU.prototype.Cc;
	_.r.position_changed = function() {
		this.kc ? this.Ja.Nb() : _.ki(this.Ja);
	};
	_.r.getPosition = _.Te('position');
	_.r.getPanes = _.Te('panes');
	_.r.wk = _.Te('visible');
	_.r.getDraggable = function() {
		return !!this.get('draggable');
	};
	_.r.yk = function() {
		this.set('dragging', !0);
		this.yb.set('snappingCallback', this.xd);
	};
	_.r.xk = function() {
		this.yb.set('snappingCallback', null);
		this.set('dragging', !1);
	};
	_.r.animation_changed = function() {
		this.vc = !1;
		this.get('animation')
			? oU(this)
			: (this.set('animating', !1), this.j && this.j.stop());
	};
	_.r.Ug = _.Te('icon');
	_.r.Ml = _.Te('label');
	var EU = 'click dblclick mouseup mousedown mouseover mouseout rightclick dragstart drag dragend'.split(
		' '
	);
	DU.prototype.dispose = function() {
		this.j.set('animation', null);
		this.j.He();
		this.ya && this.o ? this.ya.ye(this.o) : this.j.He();
		this.W && this.W.unbindAll();
		this.Ra && this.Ra.unbindAll();
		this.H.unbindAll();
		this.$.unbindAll();
		_.B(this.T, _.N.removeListener);
		this.T.length = 0;
	};
	JU.prototype.T = JU.prototype.$ = function(a) {
		var b = NU(this),
			c = LU(this),
			d = KU(c),
			e = Math.round(a.dx * d),
			f = Math.round(a.dy * d),
			g = Math.ceil(a.od * d);
		a = Math.ceil(a.nd * d);
		var h = MU(this, g, a),
			k = h.getContext('2d');
		k.translate(-e, -f);
		b.forEach(function(l) {
			k.globalAlpha = _.dd(l.opacity, 1);
			k.drawImage(
				l.image,
				l.Ne,
				l.Oe,
				l.tf,
				l.sf,
				Math.round(l.dx * d),
				Math.round(l.dy * d),
				l.od * d,
				l.nd * d
			);
		});
		c.clearRect(e, f, g, a);
		c.globalAlpha = 1;
		c.drawImage(h, e, f);
	};
	PU.prototype.load = function(a, b) {
		return this.i.load(new _.QD(a.url), function(c) {
			if (c) {
				var d = c.size,
					e = a.size || a.scaledSize || d;
				a.size = e;
				var f = a.anchor || new _.I(e.width / 2, e.height),
					g = {};
				g.image = c;
				c = a.scaledSize || d;
				var h = c.width / d.width,
					k = c.height / d.height;
				g.Ne = a.origin ? a.origin.x / h : 0;
				g.Oe = a.origin ? a.origin.y / k : 0;
				g.dx = -f.x;
				g.dy = -f.y;
				g.Ne * h + e.width > c.width
					? ((g.tf = d.width - g.Ne * h), (g.od = c.width))
					: ((g.tf = e.width / h), (g.od = e.width));
				g.Oe * k + e.height > c.height
					? ((g.sf = d.height - g.Oe * k), (g.nd = c.height))
					: ((g.sf = e.height / k), (g.nd = e.height));
				b(g);
			} else b(null);
		});
	};
	PU.prototype.cancel = function(a) {
		this.i.cancel(a);
	};
	VU.prototype.j = function(a) {
		return 'dragstart' != a && 'drag' != a && 'dragend' != a;
	};
	VU.prototype.o = function(a, b) {
		return b
			? XU(this, a, -8, 0) ||
					XU(this, a, 0, -8) ||
					XU(this, a, 8, 0) ||
					XU(this, a, 0, 8)
			: XU(this, a, 0, 0);
	};
	VU.prototype.handleEvent = function(a, b, c) {
		var d = b.i;
		if ('mouseout' == a) this.i.set('cursor', ''), this.i.set('title', null);
		else if ('mouseover' == a) {
			var e = d.ff;
			this.i.set('cursor', e.cursor);
			(e = e.title) && this.i.set('title', e);
		}
		var f;
		d && 'mouseout' != a ? (f = d.ff.latLng) : (f = b.latLng);
		'dblclick' == a && _.ge(b.tb);
		_.N.trigger(c, a, new _.Xm(f));
	};
	VU.prototype.zIndex = 40;
	ZU.prototype.H = function() {
		this.i && OU(this.o);
		this.i = !1;
		this.j = null;
		this.T = 0;
		_.Je(_.Gl(_.N.trigger, this.W, 'load'));
	};
	_.Ha(bV, _.Wi);
	bV.prototype.Ob = function() {
		return { Wa: this.i, Vb: 2, Yb: this.$.bind(this) };
	};
	bV.prototype.$ = function(a, b) {
		var c = this;
		b = void 0 === b ? {} : b;
		var d = document.createElement('div'),
			e = this.i.size;
		d.style.width = e.wa + 'px';
		d.style.height = e.Ca + 'px';
		d.style.overflow = 'hidden';
		a = { Na: d, zoom: a.Ma, Xa: new _.I(a.Aa, a.Ba), ad: {}, rb: new _.Ye() };
		d.wb = a;
		cV(this, a);
		var f = !1;
		return {
			Hb: function() {
				return d;
			},
			nc: function() {
				return f;
			},
			loaded: new Promise(function(g) {
				_.N.addListenerOnce(d, 'load', function() {
					f = !0;
					g();
				});
			}),
			release: function() {
				var g = d.wb;
				d.wb = null;
				dV(c, g);
				_.jo(d, '');
				b.Lb && b.Lb();
			}
		};
	};
	eV.i = {};
	iV.prototype.i = function(a, b) {
		var c = _.HF();
		if (b instanceof _.ff) IU(a, b, c);
		else {
			var d = new _.Ye();
			IU(d, b, c);
			var e = new _.Ye();
			hV(e, b, c);
			new SU(a, e, d);
		}
		_.N.addListener(b, 'idle', function() {
			a.forEach(function(f) {
				var g = f.get('internalPosition'),
					h = b.getBounds();
				g && !f.pegmanMarker && h && h.contains(g)
					? _.uo('Om', '-v', f)
					: _.vo('Om', '-v', f);
			});
		});
	};
	_.If('marker', new iV());
});
