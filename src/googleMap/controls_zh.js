google.maps.__gjsload__('controls', function(_) {
	var QK,
		RK,
		SK,
		TK,
		UK,
		VK,
		WK,
		XK,
		ZK,
		$K,
		aL,
		bL,
		cL,
		dL,
		fL,
		gL,
		hL,
		iL,
		jL,
		kL,
		lL,
		nL,
		mL,
		oL,
		pL,
		sL,
		rL,
		qL,
		tL,
		uL,
		vL,
		yL,
		zL,
		AL,
		BL,
		xL,
		CL,
		FL,
		HL,
		GL,
		JL,
		KL,
		LL,
		IL,
		ML,
		NL,
		OL,
		RL,
		SL,
		PL,
		QL,
		TL,
		VL,
		UL,
		XL,
		YL,
		dM,
		ZL,
		eM,
		fM,
		gM,
		hM,
		iM,
		kM,
		jM,
		lM,
		mM,
		oM,
		nM,
		sM,
		rM,
		qM,
		tM,
		uM,
		wM,
		vM,
		xM,
		yM,
		BM,
		AM,
		zM,
		CM,
		DM,
		EM,
		FM,
		GM,
		HM,
		IM,
		KM,
		JM,
		LM,
		MM,
		QM,
		NM,
		OM,
		RM,
		SM,
		TM,
		UM,
		XM,
		WM,
		YM,
		VM,
		cN,
		ZM,
		$M,
		aN,
		bN,
		dN,
		eN,
		fN,
		gN,
		kN,
		hN,
		iN,
		jN,
		lN,
		oN,
		pN,
		mN,
		nN,
		tN,
		qN,
		vN,
		wN,
		uN,
		xN,
		yN,
		zN,
		AN,
		BN,
		LN,
		KN,
		SN,
		TN,
		QN,
		UN,
		HN,
		JN,
		EN,
		GN,
		FN,
		IN,
		MN,
		DN,
		WN,
		XN,
		YN,
		ZN,
		$N,
		aO,
		CN,
		ON,
		RN,
		PN,
		NN,
		bO,
		cO,
		VN,
		dO,
		eO,
		hO,
		iO,
		jO,
		kO,
		fO,
		gO,
		lO,
		nO,
		oO,
		pO,
		qO,
		rO,
		sO;
	QK = function(a, b) {
		b instanceof _.jx ||
			b instanceof _.jx ||
			((b = 'object' == typeof b && b.Uc ? b.Eb() : String(b)),
			_.lx.test(b) || (b = 'about:invalid#zClosurez'),
			(b = new _.jx(_.hx, b)));
		a.href = _.kx(b);
	};
	RK = function(a, b, c, d) {
		b = a.H.listeners[String(b)];
		if (!b) return !0;
		b = b.concat();
		for (var e = !0, f = 0; f < b.length; ++f) {
			var g = b[f];
			if (g && !g.Yc && g.capture == c) {
				var h = g.listener,
					k = g.Cd || g.src;
				g.Af && _.xh(a.H, g);
				e = !1 !== h.call(k, d) && e;
			}
		}
		return e && !d.defaultPrevented;
	};
	SK = function(a, b) {
		var c = a.ka;
		if (c) {
			var d = [];
			for (var e = 1; c; c = c.ka) d.push(c), ++e;
		}
		a = a.La;
		c = b.type || b;
		'string' === typeof b
			? (b = new _.lh(b, a))
			: b instanceof _.lh
			? (b.target = b.target || a)
			: ((e = b), (b = new _.lh(c, a)), _.Xl(b, e));
		e = !0;
		if (d)
			for (var f = d.length - 1; !b.i && 0 <= f; f--) {
				var g = (b.currentTarget = d[f]);
				e = RK(g, c, !0, b) && e;
			}
		b.i ||
			((g = b.currentTarget = a),
			(e = RK(g, c, !0, b) && e),
			b.i || (e = RK(g, c, !1, b) && e));
		if (d)
			for (f = 0; !b.i && f < d.length; f++)
				(g = b.currentTarget = d[f]), (e = RK(g, c, !1, b) && e);
	};
	TK = function(a) {
		a.style.textAlign = _.cu.i ? 'right' : 'left';
	};
	UK = function(a, b, c) {
		var d = a.length,
			e = 'string' === typeof a ? a.split('') : a;
		for (--d; 0 <= d; --d) d in e && b.call(c, e[d], d, a);
	};
	VK = function(a) {
		return String(a).replace(/\-([a-z])/g, function(b, c) {
			return c.toUpperCase();
		});
	};
	WK = function(a) {
		return a.replace(/(^|[\s]+)([a-z])/g, function(b, c, d) {
			return c + d.toUpperCase();
		});
	};
	XK = function(a) {
		a.style.visibility = '';
	};
	_.YK = function(a, b) {
		1 == _.cj.type ? (a.style.styleFloat = b) : (a.style.cssFloat = b);
	};
	ZK = function(a, b) {
		a.style.WebkitBorderRadius = b;
		a.style.borderRadius = b;
		a.style.MozBorderRadius = b;
	};
	$K = function(a, b) {
		a.style.WebkitBorderTopLeftRadius = b;
		a.style.WebkitBorderTopRightRadius = b;
		a.style.borderTopLeftRadius = b;
		a.style.borderTopRightRadius = b;
		a.style.MozBorderTopLeftRadius = b;
		a.style.MozBorderTopRightRadius = b;
	};
	aL = function(a, b) {
		a.style.WebkitBorderBottomLeftRadius = b;
		a.style.WebkitBorderBottomRightRadius = b;
		a.style.borderBottomLeftRadius = b;
		a.style.borderBottomRightRadius = b;
		a.style.MozBorderBottomLeftRadius = b;
		a.style.MozBorderBottomRightRadius = b;
	};
	bL = function(a) {
		var b = _.Q(2);
		a.style.WebkitBorderBottomLeftRadius = b;
		a.style.WebkitBorderTopLeftRadius = b;
		a.style.borderBottomLeftRadius = b;
		a.style.borderTopLeftRadius = b;
		a.style.MozBorderBottomLeftRadius = b;
		a.style.MozBorderTopLeftRadius = b;
	};
	cL = function(a) {
		var b = _.Q(2);
		a.style.WebkitBorderBottomRightRadius = b;
		a.style.WebkitBorderTopRightRadius = b;
		a.style.borderBottomRightRadius = b;
		a.style.borderTopRightRadius = b;
		a.style.MozBorderBottomRightRadius = b;
		a.style.MozBorderTopRightRadius = b;
	};
	dL = function(a, b) {
		b = b || {};
		var c = a.style;
		c.color = 'black';
		c.fontFamily = 'Roboto,Arial,sans-serif';
		_.qo(a);
		_.po(a);
		b.title && a.setAttribute('title', b.title);
		c = _.go() ? 1.38 : 1;
		a = a.style;
		a.fontSize = _.Q(b.fontSize || 11);
		a.backgroundColor = '#fff';
		for (var d = [], e = 0, f = _.Xc(b.padding); e < f; ++e)
			d.push(_.Q(c * b.padding[e]));
		a.padding = d.join(' ');
		b.width && (a.width = _.Q(c * b.width));
	};
	fL = function(a, b) {
		var c = eL[b];
		if (!c) {
			var d = VK(b);
			c = d;
			void 0 === a.style[d] &&
				((d =
					(_.nh ? 'Webkit' : _.mh ? 'Moz' : _.hc ? 'ms' : _.Jj ? 'O' : null) +
					WK(d)),
				void 0 !== a.style[d] && (c = d));
			eL[b] = c;
		}
		return c;
	};
	gL = function(a, b, c) {
		if ('string' === typeof b) (b = fL(a, b)) && (a.style[b] = c);
		else
			for (var d in b) {
				c = a;
				var e = b[d],
					f = fL(c, d);
				f && (c.style[f] = e);
			}
	};
	hL = function(a, b, c) {
		if (b instanceof _.Um) {
			var d = b.x;
			b = b.y;
		} else (d = b), (b = c);
		a.style.left = _.fz(d, !1);
		a.style.top = _.fz(b, !1);
	};
	iL = _.oa('i');
	jL = function(a) {
		return 40 < a ? a / 2 - 2 : 28 > a ? a - 10 : 18;
	};
	kL = function(a, b) {
		a.items = a.items || [];
		var c = (a.items[b] = a.items[b] || {}),
			d = _.lK(a, b);
		if (!c.sc) {
			a.j = a.j || new _.I(0, 0);
			var e = (a.items[0] && a.items[0].sc) || new _.I(0, 0);
			c.sc = new _.I(e.x + a.j.x * b, e.y + a.j.y * b);
		}
		return {
			url: d,
			size: c.Qb || a.Qb,
			scaledSize: a.i.size,
			origin: c.sc,
			anchor: c.anchor || a.anchor
		};
	};
	lL = function(a) {
		_.kh.call(this);
		this.j = a;
		this.i = {};
	};
	nL = function(a, b, c) {
		mL(a, b, 'finish', c, void 0);
	};
	mL = function(a, b, c, d, e, f) {
		if (Array.isArray(c))
			for (var g = 0; g < c.length; g++) mL(a, b, c[g], d, e, f);
		else
			(b = _.zh(b, c, d || a.handleEvent, e, f || a.j || a)) &&
				(a.i[b.key] = b);
	};
	oL = function(a) {
		_.Ul(
			a.i,
			function(b, c) {
				this.i.hasOwnProperty(c) && _.Nh(b);
			},
			a
		);
		a.i = {};
	};
	pL = function(a, b, c, d, e, f, g) {
		this.label = a || '';
		this.alt = b || '';
		this.H = f || null;
		this.Ic = c;
		this.i = d;
		this.o = e;
		this.j = g || null;
	};
	sL = function(a, b) {
		var c = this;
		this.W = a;
		b = b || ['roadmap', 'satellite', 'hybrid', 'terrain'];
		var d = _.Il(b, 'terrain') && _.Il(b, 'roadmap'),
			e = _.Il(b, 'hybrid') && _.Il(b, 'satellite');
		this.o = {};
		this.H = [];
		this.j = this.T = this.i = null;
		_.N.addListener(this, 'maptypeid_changed', function() {
			var k = c.get('mapTypeId');
			c.j && c.j.set('display', 'satellite' == k);
			c.i && c.i.set('display', 'roadmap' == k);
		});
		_.N.addListener(this, 'zoom_changed', function() {
			if (c.i) {
				var k = c.get('zoom');
				c.i.set('enabled', k <= c.T);
			}
		});
		b = _.Da(b);
		for (var f = b.next(); !f.done; f = b.next())
			if (((f = f.value), 'hybrid' != f || !e))
				if ('terrain' != f || !d) {
					var g = a.get(f);
					if (g) {
						var h = null;
						'roadmap' == f
							? d &&
							  ((this.i = qL(
									this,
									'terrain',
									'roadmap',
									'terrain',
									void 0,
									'\u7f29\u5c0f\u4ee5\u663e\u793a\u542b\u5730\u5f62\u7684\u8857\u9053\u5730\u56fe'
							  )),
							  (h = [[this.i]]),
							  (this.T = a.get('terrain').maxZoom))
							: ('satellite' != f && 'hybrid' != f) ||
							  !e ||
							  ((this.j = rL(this)), (h = [[this.j]]));
						this.H.push(new pL(g.name, g.alt, 'mapTypeId', f, null, null, h));
					}
				}
	};
	rL = function(a) {
		a = qL(a, 'hybrid', 'satellite', 'labels', '\u5730\u540d');
		a.set('enabled', !0);
		return a;
	};
	qL = function(a, b, c, d, e, f) {
		var g = a.W.get(b);
		e = new pL(e || g.name, g.alt, d, !0, !1, f);
		a.o[b] = { mapTypeId: c, mf: d, value: !0 };
		a.o[c] = { mapTypeId: c, mf: d, value: !1 };
		return e;
	};
	tL = _.oa('j');
	uL = function(a, b, c) {
		if (!a || !b || 'number' !== typeof c) return null;
		c = Math.pow(2, -c);
		var d = a.fromLatLngToPoint(b);
		return _.yx(a.fromPointToLatLng(new _.I(d.x + c, d.y)), b);
	};
	vL = _.p(
		'.gm-control-active>img{box-sizing:content-box;display:none;left:50%;pointer-events:none;position:absolute;top:50%;transform:translate(-50%,-50%)}.gm-control-active>img:nth-child(1){display:block}.gm-control-active:hover>img:nth-child(1),.gm-control-active:active>img:nth-child(1){display:none}.gm-control-active:hover>img:nth-child(2),.gm-control-active:active>img:nth-child(3){display:block}\n'
	);
	yL = function(a) {
		_.ID.call(this, a, wL);
		_.HC(a, wL) ||
			_.GC(
				a,
				wL,
				{ options: 0 },
				[
					'div',
					,
					1,
					0,
					[
						' ',
						['img', 8, 1, 1],
						' ',
						[
							'button',
							,
							1,
							2,
							[
								' ',
								['img', 8, 1, 3],
								' ',
								['img', 8, 1, 4],
								' ',
								['img', 8, 1, 5],
								' '
							]
						],
						' ',
						[
							'button',
							,
							,
							12,
							[
								' ',
								['img', 8, 1, 6],
								' ',
								['img', 8, 1, 7],
								' ',
								['img', 8, 1, 8],
								' '
							]
						],
						' ',
						[
							'button',
							,
							,
							13,
							[
								' ',
								['img', 8, 1, 9],
								' ',
								['img', 8, 1, 10],
								' ',
								['img', 8, 1, 11],
								' '
							]
						],
						' <div> ',
						['div', , , 14, ['\u65cb\u8f6c\u89c6\u56fe']],
						' ',
						['div', , , 15],
						' ',
						['div', , , 16],
						' </div> '
					]
				],
				[],
				xL()
			);
	};
	zL = function(a) {
		return _.W(a.options, '', -7, -3);
	};
	AL = function(a) {
		return _.W(a.options, '', -8, -3);
	};
	BL = function(a) {
		return _.W(a.options, '', -9, -3);
	};
	xL = function() {
		return [
			['$t', 't-avKK8hDgg9Q', '$a', [7, , , , , 'gm-compass']],
			[
				'$a',
				[
					8,
					,
					,
					,
					function(a) {
						return _.W(a.options, '', -3, -3);
					},
					'src',
					,
					,
					1
				],
				'$a',
				[0, , , , '48', 'height', , 1],
				'$a',
				[0, , , , '48', 'width', , 1]
			],
			[
				'$a',
				[7, , , , , 'gm-control-active', , 1],
				'$a',
				[7, , , , , 'gm-compass-needle', , 1],
				'$a',
				[
					5,
					5,
					,
					,
					function(a) {
						return a.hb
							? _.uA(
									'-webkit-transform',
									'rotate(' + String(_.W(a.options, 0, -1)) + 'deg)'
							  )
							: 'rotate(' + String(_.W(a.options, 0, -1)) + 'deg)';
					},
					'-webkit-transform',
					,
					,
					1
				],
				'$a',
				[
					5,
					5,
					,
					,
					function(a) {
						return a.hb
							? _.uA(
									'-ms-transform',
									'rotate(' + String(_.W(a.options, 0, -1)) + 'deg)'
							  )
							: 'rotate(' + String(_.W(a.options, 0, -1)) + 'deg)';
					},
					'-ms-transform',
					,
					,
					1
				],
				'$a',
				[
					5,
					5,
					,
					,
					function(a) {
						return a.hb
							? _.uA(
									'-moz-transform',
									'rotate(' + String(_.W(a.options, 0, -1)) + 'deg)'
							  )
							: 'rotate(' + String(_.W(a.options, 0, -1)) + 'deg)';
					},
					'-moz-transform',
					,
					,
					1
				],
				'$a',
				[
					5,
					5,
					,
					,
					function(a) {
						return a.hb
							? _.uA(
									'transform',
									'rotate(' + String(_.W(a.options, 0, -1)) + 'deg)'
							  )
							: 'rotate(' + String(_.W(a.options, 0, -1)) + 'deg)';
					},
					'transform',
					,
					,
					1
				],
				'$a',
				[0, , , , 'button', 'type', , 1],
				'$a',
				[22, , , , 'compass.north', 'jsaction', , 1]
			],
			[
				'$a',
				[
					8,
					,
					,
					,
					function(a) {
						return _.W(a.options, '', -4, -3);
					},
					'src',
					,
					,
					1
				],
				'$a',
				[0, , , , 'false', 'draggable', , 1],
				'$a',
				[0, , , , '48', 'height', , 1],
				'$a',
				[0, , , , '20', 'width', , 1]
			],
			[
				'$a',
				[
					8,
					,
					,
					,
					function(a) {
						return _.W(a.options, '', -5, -3);
					},
					'src',
					,
					,
					1
				],
				'$a',
				[0, , , , 'false', 'draggable', , 1],
				'$a',
				[0, , , , '48', 'height', , 1],
				'$a',
				[0, , , , '20', 'width', , 1]
			],
			[
				'$a',
				[
					8,
					,
					,
					,
					function(a) {
						return _.W(a.options, '', -6, -3);
					},
					'src',
					,
					,
					1
				],
				'$a',
				[0, , , , 'false', 'draggable', , 1],
				'$a',
				[0, , , , '48', 'height', , 1],
				'$a',
				[0, , , , '20', 'width', , 1]
			],
			[
				'$a',
				[8, , , , zL, 'src', , , 1],
				'$a',
				[0, , , , 'false', 'draggable', , 1],
				'$a',
				[0, , , , '48', 'height', , 1],
				'$a',
				[0, , , , '14', 'width', , 1]
			],
			[
				'$a',
				[8, , , , AL, 'src', , , 1],
				'$a',
				[0, , , , 'false', 'draggable', , 1],
				'$a',
				[0, , , , '48', 'height', , 1],
				'$a',
				[0, , , , '14', 'width', , 1]
			],
			[
				'$a',
				[8, , , , BL, 'src', , , 1],
				'$a',
				[0, , , , 'false', 'draggable', , 1],
				'$a',
				[0, , , , '48', 'height', , 1],
				'$a',
				[0, , , , '14', 'width', , 1]
			],
			[
				'$a',
				[8, , , , zL, 'src', , , 1],
				'$a',
				[0, , , , 'false', 'draggable', , 1],
				'$a',
				[0, , , , '48', 'height', , 1],
				'$a',
				[0, , , , '14', 'width', , 1]
			],
			[
				'$a',
				[8, , , , AL, 'src', , , 1],
				'$a',
				[0, , , , 'false', 'draggable', , 1],
				'$a',
				[0, , , , '48', 'height', , 1],
				'$a',
				[0, , , , '14', 'width', , 1]
			],
			[
				'$a',
				[8, , , , BL, 'src', , , 1],
				'$a',
				[0, , , , 'false', 'draggable', , 1],
				'$a',
				[0, , , , '48', 'height', , 1],
				'$a',
				[0, , , , '14', 'width', , 1]
			],
			[
				'$a',
				[7, , , , , 'gm-control-active', , 1],
				'$a',
				[7, , , , , 'gm-compass-turn', , 1],
				'$a',
				[0, , , , 'button', 'type', , 1],
				'$a',
				[22, , , , 'compass.counterclockwise', 'jsaction', , 1]
			],
			[
				'$a',
				[7, , , , , 'gm-control-active', , 1],
				'$a',
				[7, , , , , 'gm-compass-turn', , 1],
				'$a',
				[7, , , , , 'gm-compass-turn-opposite', , 1],
				'$a',
				[0, , , , 'button', 'type', , 1],
				'$a',
				[22, , , , 'compass.clockwise', 'jsaction', , 1]
			],
			['$a', [7, , , , , 'gm-compass-tooltip-text', , 1]],
			[
				'$a',
				[7, , , , , 'gm-compass-arrow-right', , 1],
				'$a',
				[7, , , , , 'gm-compass-arrow-right-outer', , 1]
			],
			[
				'$a',
				[7, , , , , 'gm-compass-arrow-right', , 1],
				'$a',
				[7, , , , , 'gm-compass-arrow-right-inner', , 1]
			]
		];
	};
	CL = function(a) {
		_.E(this, a, 9);
	};
	FL = function(a) {
		a = _.Va(a);
		delete DL[a];
		_.sb(DL) && EL && EL.stop();
	};
	HL = function() {
		EL ||
			(EL = new _.ji(function() {
				GL();
			}, 20));
		var a = EL;
		0 != a.Bd || a.start();
	};
	GL = function() {
		var a = _.Ya();
		_.Ul(DL, function(b) {
			IL(b, a);
		});
		_.sb(DL) || HL();
	};
	JL = function() {
		_.Sh.call(this);
		this.o = 0;
		this.endTime = this.j = null;
	};
	KL = function(a, b, c, d) {
		JL.call(this);
		if (!Array.isArray(a) || !Array.isArray(b))
			throw Error('Start and end parameters must be arrays');
		if (a.length != b.length)
			throw Error('Start and end points must be the same length');
		this.T = a;
		this.ya = b;
		this.duration = c;
		this.ta = d;
		this.coords = [];
		this.progress = 0;
		this.ua = null;
	};
	LL = function(a) {
		if (0 == a.o) (a.progress = 0), (a.coords = a.T);
		else if (1 == a.o) return;
		FL(a);
		var b = _.Ya();
		a.j = b;
		-1 == a.o && (a.j -= a.duration * a.progress);
		a.endTime = a.j + a.duration;
		a.ua = a.j;
		a.progress || a.i('begin');
		a.i('play');
		-1 == a.o && a.i('resume');
		a.o = 1;
		var c = _.Va(a);
		c in DL || (DL[c] = a);
		HL();
		IL(a, b);
	};
	IL = function(a, b) {
		b < a.j && ((a.endTime = b + a.endTime - a.j), (a.j = b));
		a.progress = (b - a.j) / (a.endTime - a.j);
		1 < a.progress && (a.progress = 1);
		a.ua = b;
		ML(a, a.progress);
		1 == a.progress
			? ((a.o = 0), FL(a), a.i('finish'), a.i('end'))
			: 1 == a.o && a.i('animate');
	};
	ML = function(a, b) {
		_.Ra(a.ta) && (b = a.ta(b));
		a.coords = Array(a.T.length);
		for (var c = 0; c < a.T.length; c++)
			a.coords[c] = (a.ya[c] - a.T[c]) * b + a.T[c];
	};
	NL = function(a, b) {
		_.lh.call(this, a);
		this.coords = b.coords;
		this.x = b.coords[0];
		this.y = b.coords[1];
		this.z = b.coords[2];
		this.duration = b.duration;
		this.progress = b.progress;
		this.state = b.o;
	};
	OL = function(a) {
		return 3 * a * a - 2 * a * a * a;
	};
	RL = function(a, b, c) {
		var d = this;
		this.j = a;
		b /= 40;
		a.Na.style.transform = 'scale(' + b + ')';
		a.Na.style.transformOrigin = 'left';
		a.Na.setAttribute('controlWidth', Math.round(48 * b));
		a.Na.setAttribute('controlHeight', Math.round(48 * b));
		a.addListener('compass.clockwise', 'click', function() {
			return PL(d, !0);
		});
		a.addListener('compass.counterclockwise', 'click', function() {
			return PL(d, !1);
		});
		a.addListener('compass.north', 'click', function() {
			var e = d.get('pov');
			if (e) {
				var f = _.jy(e.heading);
				QL(d, f, 180 > f ? 0 : 360, e.pitch, 0);
			}
		});
		this.i = null;
		this.o = !1;
		_.ym(vL, c);
	};
	SL = function(a) {
		var b = a.get('mapSize'),
			c = a.get('panControl'),
			d = !!a.get('disableDefaultUI');
		_.Qy(
			a.j.Na,
			!!(c || (void 0 === c && !d && b && 200 <= b.width && 200 <= b.height))
		);
		_.N.trigger(a.j.Na, 'resize');
	};
	PL = function(a, b) {
		var c = a.get('pov');
		if (c) {
			var d = _.jy(c.heading);
			QL(
				a,
				d,
				b ? 90 * Math.floor((d + 100) / 90) : 90 * Math.ceil((d - 100) / 90),
				c.pitch,
				c.pitch
			);
		}
	};
	QL = function(a, b, c, d, e) {
		var f = new lL();
		a.i && a.i.stop();
		b = a.i = new KL([b, d], [c, e], 1200, OL);
		f.listen(b, 'animate', function(g) {
			return TL(a, !1, g);
		});
		nL(f, b, function(g) {
			return TL(a, !0, g);
		});
		LL(b);
	};
	TL = function(a, b, c) {
		a.o = !0;
		var d = a.get('pov');
		d &&
			(a.set('pov', { heading: c.coords[0], pitch: c.coords[1], zoom: d.zoom }),
			(a.o = !1),
			b && (a.i = null));
	};
	VL = function(a) {
		var b = void 0 === b ? document : b;
		return UL(a, b);
	};
	UL = function(a, b) {
		return (b =
			b &&
			(b.fullscreenElement ||
				b.webkitFullscreenElement ||
				b.mozFullScreenElement ||
				b.msFullscreenElement))
			? b === a
				? !0
				: UL(a, b.shadowRoot)
			: !1;
	};
	XL = function() {
		return WL.some(function(a) {
			return !!document[a];
		});
	};
	YL = function(a, b, c, d) {
		a.innerText = '';
		b = _.Da(
			b
				? 1 == c
					? [
							'<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">\n  <path fill="#666" d="M4,4H0v2h6V0H4V4z M14,4V0h-2v6h6V4H14z M12,18h2v-4h4v-2h-6V18z M0,14h4v4h2v-6H0V14z"/>\n</svg>\n',
							'<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">\n  <path fill="#B1B1B1" d="M4,4H0v2h6V0H4V4z M14,4V0h-2v6h6V4H14z M12,18h2v-4h4v-2h-6V18z M0,14h4v4h2v-6H0V14z"/>\n</svg>\n',
							'<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">\n  <path fill="#E4E4E4" d="M4,4H0v2h6V0H4V4z M14,4V0h-2v6h6V4H14z M12,18h2v-4h4v-2h-6V18z M0,14h4v4h2v-6H0V14z"/>\n</svg>\n'
					  ]
					: [
							'<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">\n  <path fill="#666" d="M4,4H0v2h6V0H4V4z M14,4V0h-2v6h6V4H14z M12,18h2v-4h4v-2h-6V18z M0,14h4v4h2v-6H0V14z"/>\n</svg>\n',
							'<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">\n  <path fill="#333" d="M4,4H0v2h6V0H4V4z M14,4V0h-2v6h6V4H14z M12,18h2v-4h4v-2h-6V18z M0,14h4v4h2v-6H0V14z"/>\n</svg>\n',
							'<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">\n  <path fill="#111" d="M4,4H0v2h6V0H4V4z M14,4V0h-2v6h6V4H14z M12,18h2v-4h4v-2h-6V18z M0,14h4v4h2v-6H0V14z"/>\n</svg>\n'
					  ]
				: 1 == c
				? [
						'<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 018 18">\n  <path fill="#666" d="M0,0v2v4h2V2h4V0H2H0z M16,0h-4v2h4v4h2V2V0H16z M16,16h-4v2h4h2v-2v-4h-2V16z M2,12H0v4v2h2h4v-2H2V12z"/>\n</svg>\n',
						'<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">\n  <path fill="#B1B1B1" d="M0,0v2v4h2V2h4V0H2H0z M16,0h-4v2h4v4h2V2V0H16z M16,16h-4v2h4h2v-2v-4h-2V16z M2,12H0v4v2h2h4v-2H2V12z"/>\n</svg>\n',
						'<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">\n  <path fill="#E4E4E4" d="M0,0v2v4h2V2h4V0H2H0z M16,0h-4v2h4v4h2V2V0H16z M16,16h-4v2h4h2v-2v-4h-2V16z M2,12H0v4v2h2h4v-2H2V12z"/>\n</svg>\n'
				  ]
				: [
						'<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 018 18">\n  <path fill="#666" d="M0,0v2v4h2V2h4V0H2H0z M16,0h-4v2h4v4h2V2V0H16z M16,16h-4v2h4h2v-2v-4h-2V16z M2,12H0v4v2h2h4v-2H2V12z"/>\n</svg>\n',
						'<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">\n  <path fill="#333" d="M0,0v2v4h2V2h4V0H2H0z M16,0h-4v2h4v4h2V2V0H16z M16,16h-4v2h4h2v-2v-4h-2V16z M2,12H0v4v2h2h4v-2H2V12z"/>\n</svg>\n',
						'<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">\n  <path fill="#111" d="M0,0v2v4h2V2h4V0H2H0z M16,0h-4v2h4v4h2V2V0H16z M16,16h-4v2h4h2v-2v-4h-2V16z M2,12H0v4v2h2h4v-2H2V12z"/>\n</svg>\n'
				  ]
		);
		for (c = b.next(); !c.done; c = b.next()) {
			c = c.value;
			var e = document.createElement('img');
			e.style.width = e.style.height = _.Q(jL(d));
			e.src = _.MD(c);
			a.appendChild(e);
		}
	};
	dM = function(a, b, c, d) {
		var e = this;
		this.H = a;
		this.$ = d;
		this.j = b;
		b.style.cursor = 'pointer';
		this.ka = c;
		this.i = VL(this.H);
		this.ka.set(this.i);
		this.o = XL();
		this.W = [];
		this.ta = function() {
			_.N.trigger(e.H, 'resize');
			e.i = VL(e.H);
			e.i || ZL(e);
			e.ka.set(e.i);
			var f = e.get('controlStyle') || 0;
			e.o && YL(e.j, e.i, f, e.$);
		};
		this.T = function() {
			var f = e.get('display'),
				g = !!e.get('disableDefaultUI');
			_.My(e.j, ((void 0 === f && !g) || !!f) && e.o);
			_.N.trigger(e.j, 'resize');
		};
		this.o &&
			(_.ym(vL, a),
			b.setAttribute('class', 'gm-control-active gm-fullscreen-control'),
			ZK(b, _.Q(_.iK(d))),
			(b.style.width = b.style.height = _.Q(d)),
			_.ez(b, '0 1px 4px -1px rgba(0,0,0,0.3)'),
			(a = this.get('controlStyle') || 0),
			YL(b, this.i, a, d),
			(b.style.overflow = 'hidden'),
			_.N.addDomListener(b, 'click', function() {
				if (e.i)
					for (var f = _.Da($L), g = f.next(); !g.done; g = f.next()) {
						if (((g = g.value), g in document)) {
							document[g]();
							break;
						}
					}
				else {
					f = _.Da(aM);
					for (g = f.next(); !g.done; g = f.next())
						e.W.push(_.N.addDomListener(document, g.value, e.ta));
					f = e.H;
					g = _.Da(bM);
					for (var h = g.next(); !h.done; h = g.next())
						if (((h = h.value), h in f)) {
							f[h]();
							break;
						}
				}
			}));
		_.N.addListener(this, 'disabledefaultui_changed', this.T);
		_.N.addListener(this, 'display_changed', this.T);
		_.N.addListener(this, 'maptypeid_changed', function() {
			var f = 'streetview' == e.get('mapTypeId') ? 1 : 0;
			e.set('controlStyle', f);
			e.j.style.margin = _.Q(e.$ >> 2);
			e.T();
		});
		_.N.addListener(this, 'controlstyle_changed', function() {
			var f = e.get('controlStyle');
			null != f &&
				((e.j.style.backgroundColor = cM[f].backgroundColor),
				e.o && YL(e.j, e.i, f, e.$));
		});
		this.T();
	};
	ZL = function(a) {
		for (var b = _.Da(a.W), c = b.next(); !c.done; c = b.next())
			_.N.removeListener(c.value);
		a.W.length = 0;
	};
	eM = function(a, b, c) {
		this.i = a;
		this.j = [];
		this.T = c || 0;
		this.H = (0, _.y)(
			3 == b || 12 == b || 6 == b || 9 == b ? UK : _.B,
			this,
			this.j
		);
		a.setAttribute('controlWidth', 0);
		a.setAttribute('controlHeight', 0);
	};
	fM = function(a, b) {
		var c = document.createElement('div');
		c.className = 'infomsg';
		a.appendChild(c);
		var d = c.style;
		d.background = '#F9EDBE';
		d.border = '1px solid #F0C36D';
		d.borderRadius = '2px';
		d.boxSizing = 'border-box';
		d.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
		d.fontFamily = 'Roboto,Arial,sans-serif';
		d.fontSize = '12px';
		d.fontWeight = '400';
		d.left = '10%';
		d.i = '2px';
		d.padding = '5px 14px';
		d.position = 'absolute';
		d.textAlign = 'center';
		d.top = '10px';
		d.webkitBorderRadius = '2px';
		d.width = '80%';
		d.zIndex = 24601;
		c.innerText =
			'\u60a8\u4f7f\u7528\u7684\u6d4f\u89c8\u5668\u4e0d\u53d7 Google \u5730\u56fe JavaScript API \u652f\u6301\u3002\u8bf7\u8003\u8651\u66f4\u6362\u6d4f\u89c8\u5668\u3002';
		d = document.createElement('a');
		b &&
			(c.appendChild(d),
			(d.innerText = '\u4e86\u89e3\u8be6\u60c5'),
			(d.href = b),
			(d.target = '_blank'));
		b = document.createElement('a');
		c.appendChild(b);
		b.innerText = '\u5173\u95ed';
		b.target = '_blank';
		d.style.paddingLeft = b.style.paddingLeft = '0.8em';
		d.style.boxSizing = b.style.boxSizing = 'border-box';
		d.style.color = b.style.color = 'black';
		d.style.cursor = b.style.cursor = 'pointer';
		d.style.textDecoration = b.style.textDecoration = 'underline';
		b.onmouseup = function() {
			a.removeChild(c);
		};
	};
	gM = function(a) {
		this.i = a.replace('www.google', 'maps.google');
	};
	hM = function(a) {
		a.style.marginLeft = _.Q(5);
		a.style.marginRight = _.Q(5);
		_.oo(a, 1e6);
		this.o = a;
		a = this.j = _.no('a', a);
		var b = a.style;
		b.position = 'static';
		b.overflow = 'visible';
		_.YK(a, 'none');
		a.style.display = 'inline';
		a.setAttribute('target', '_blank');
		a.setAttribute('rel', 'noopener');
		b = _.no('div');
		var c = new _.K(66, 26);
		_.Wg(b, c);
		a.appendChild(b);
		this.i = _.jE(null, b, _.pk, c);
		_.qo(b);
		_.Ry(b, 'pointer');
	};
	iM = function(a, b) {
		a = a.i;
		_.hE(
			a,
			b
				? _.Oo('api-3/images/google_white5', !0)
				: _.Oo('api-3/images/google4', !0),
			a.o
		);
	};
	kM = function(a, b, c) {
		function d() {
			var g = f.get('hasCustomStyles'),
				h = a.getMapTypeId();
			iM(e, g || 'satellite' == h || 'hybrid' == h);
		}
		var e = jM(a, b, c),
			f = a.__gm;
		_.N.addListener(f, 'hascustomstyles_changed', d);
		_.N.addListener(a, 'maptypeid_changed', d);
		d();
		return e;
	};
	jM = function(a, b, c) {
		function d() {
			var g = c && a.get('passiveLogo');
			f.setUrl(g ? null : b.get('url'));
		}
		var e = _.no('div'),
			f = new hM(e);
		_.N.addListener(a, 'passivelogo_changed', d);
		_.N.addListener(b, 'url_changed', d);
		d();
		return f;
	};
	lM = function(a, b, c, d) {
		function e() {
			0 != f.get('enabled') &&
				(null != d && f.get('active') ? f.set('value', d) : f.set('value', c));
		}
		var f = this;
		_.N.addListener(this, 'value_changed', function() {
			f.set('active', f.get('value') == c);
		});
		new _.kp(a, b, e);
		'click' == b &&
			'button' != a.tagName.toLowerCase() &&
			new _.kp(a, 'keydown', function(g) {
				'Enter' == g.key && e();
			});
		_.N.addListener(this, 'display_changed', function() {
			_.My(a, 0 != f.get('display'));
		});
	};
	mM = function(a, b, c, d) {
		return new lM(a, b, c, d);
	};
	oM = function(a, b, c, d, e) {
		var f = this;
		this.i = document.createElement('div');
		a.appendChild(this.i);
		this.i.setAttribute('role', 'button');
		this.i.setAttribute('tabindex', 0);
		this.i.setAttribute('title', d.title);
		this.i.setAttribute('aria-label', d.title);
		this.i.setAttribute('aria-pressed', !1);
		_.BE(this.i);
		_.Dx(this.i);
		this.j = this.i.style;
		this.j.overflow = 'hidden';
		d.fh ? TK(this.i) : (this.j.textAlign = 'center');
		d.height &&
			((this.j.height = _.Q(d.height)),
			(this.j.display = 'table-cell'),
			(this.j.verticalAlign = 'middle'));
		this.j.position = 'relative';
		dL(this.i, d);
		d.lg && bL(this.i);
		d.Lh && cL(this.i);
		this.i.style.webkitBackgroundClip = 'padding-box';
		this.i.style.backgroundClip = 'padding-box';
		this.i.style.MozBackgroundClip = 'padding';
		this.H = d.zi || !1;
		this.T = d.lg || !1;
		_.ez(this.i, '0 1px 4px -1px rgba(0,0,0,0.3)');
		this.i.appendChild(b);
		d.jm
			? ((a = _.jE(_.Oo('arrow-down'), this.i)),
			  _.mo(a, new _.I(6, 0), !_.cu.i),
			  (a.style.top = '50%'),
			  (a.style.marginTop = _.Q(-2)),
			  this.set('active', !1))
			: ((a = e(this.i, 'click', c)),
			  a.bindTo('value', this),
			  this.bindTo('active', a),
			  a.bindTo('enabled', this));
		d.zi && (this.j.fontWeight = '500');
		this.o = _.dy(this.j.paddingLeft) || 0;
		d.fh ||
			((this.j.fontWeight = '500'),
			(d = this.i.offsetWidth - this.o - (_.dy(this.j.paddingRight) || 0)),
			(this.j.fontWeight = ''),
			_.fd(d) && 0 <= d && (this.j.minWidth = _.Q(d)));
		new _.kp(this.i, 'mousedown', function(g) {
			0 != f.get('enabled') && _.N.trigger(f, 'mousedown', g);
		});
		new _.kp(this.i, 'mouseover', function() {
			return nM(f, !0);
		});
		new _.kp(this.i, 'mouseout', function() {
			return nM(f, !1);
		});
		_.N.addListener(this, 'enabled_changed', function() {
			return nM(f, !1);
		});
		_.N.addListener(this, 'active_changed', function() {
			return nM(f, !1);
		});
	};
	nM = function(a, b) {
		var c = !!a.get('active') || a.H;
		0 == a.get('enabled')
			? ((a.j.color = 'gray'), (b = c = !1))
			: ((a.j.color = c || b ? '#000' : '#565656'),
			  a.i.setAttribute('aria-pressed', c));
		a.T || (a.j.borderLeft = '0');
		_.fd(a.o) && (a.j.paddingLeft = _.Q(a.o));
		a.j.fontWeight = c ? '500' : '';
		a.j.backgroundColor = b ? '#ebebeb' : '#fff';
	};
	_.pM = function(a, b, c, d) {
		return new oM(a, b, c, d, mM);
	};
	sM = function(a, b, c, d, e) {
		a = this.H = _.no('div', a);
		dL(a, e);
		e = _.cu.i;
		_.Dx(a);
		TK(a);
		var f = (this.i = _.no('span', a));
		f.setAttribute('role', 'checkbox');
		this.j = new Image();
		this.o = new Image();
		var g = this.j,
			h = this.o;
		g.src = _.MD(
			'<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="#000000">\n    <path d="M0 0h24v24H0z" fill="none"/>\n    <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>\n</svg>\n'
		);
		f.appendChild(g);
		h.src = _.MD(
			'<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="#000000">\n    <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>\n    <path d="M0 0h24v24H0z" fill="none"/>\n</svg>\n'
		);
		f.appendChild(h);
		h.style.height = g.style.height = '1em';
		h.style.width = g.style.width = '1em';
		h.style.transform = g.style.transform = 'translateY(0.15em)';
		g = _.no('label', a);
		g.innerHTML = b;
		f.style.verticalAlign = g.style.verticalAlign = 'middle';
		_.Ry(g, 'pointer');
		a.style.backgroundColor = '#fff';
		a.style.whiteSpace = 'nowrap';
		a.style[e ? 'paddingLeft' : 'paddingRight'] = _.Q(8);
		var k = this;
		_.N.kb(k, 'active_changed', function() {
			f.checked = !!k.get('active');
			qM(k);
		});
		_.N.addDomListener(a, 'mouseover', function() {
			rM(k, !0);
		});
		_.N.addDomListener(a, 'mouseout', function() {
			rM(k, !1);
		});
		b = mM(a, 'click', c, d);
		b.bindTo('value', this);
		b.bindTo('display', this);
		this.bindTo('active', b);
	};
	rM = function(a, b) {
		a.H.style.backgroundColor = b ? '#ebebeb' : '#fff';
		qM(a);
	};
	qM = function(a) {
		var b = a.i.checked;
		_.My(a.j, b);
		_.My(a.o, !b);
	};
	tM = function(a, b, c, d) {
		var e = _.no('div', a);
		dL(e, d);
		_.io(b, e);
		e.style.backgroundColor = '#fff';
		_.N.bind(this, 'active_changed', this, function() {
			e.style.fontWeight = this.get('active') ? '500' : '';
		});
		_.N.bind(this, 'enabled_changed', this, function() {
			var f = 0 != this.get('enabled');
			e.style.color = f ? 'black' : 'gray';
			(f = f ? d.title : d.yl) && e.setAttribute('title', f);
		});
		a = mM(e, 'mouseup', c);
		a.bindTo('value', this);
		a.bindTo('display', this);
		a.bindTo('enabled', this);
		this.bindTo('active', a);
		_.N.mb(e, 'mouseover', this, function() {
			0 != this.get('enabled') &&
				((e.style.backgroundColor = '#ebebeb'), (e.style.color = '#000'));
		});
		_.N.addDomListener(e, 'mouseout', function() {
			e.style.backgroundColor = '#fff';
			e.style.color = '#565656';
		});
	};
	uM = function(a) {
		var b = _.no('div', a);
		b.style.margin = '1px 0';
		b.style.borderTop = '1px solid #ebebeb';
		_.N.bind(this, 'display_changed', this, function() {
			_.My(b, 0 != this.get('display'));
		});
	};
	wM = function(a, b, c, d, e) {
		this.o = b;
		e = e || {};
		b = this.i = _.no('div', b);
		b.style.backgroundColor = 'white';
		_.oo(b, -1);
		b.style.padding = _.Q(2);
		aL(b, _.Q(_.iK(d)));
		_.ez(b, '0 1px 4px -1px rgba(0,0,0,0.3)');
		e.position
			? _.mo(b, e.position, e.i)
			: ((b.style.position = 'absolute'),
			  (b.style.top = '100%'),
			  (b.style.left = '0'),
			  (b.style.right = '0'));
		TK(b);
		for (_.Ny(b); _.Xc(c); ) {
			e = c.shift();
			for (var f = 0; f < _.Xc(e); ++f) {
				var g = e[f],
					h,
					k = {
						title: g.alt,
						yl: g.H || void 0,
						fontSize: jL(d),
						padding: [(1 + d) >> 3]
					};
				null != g.o
					? (h = new sM(b, g.label, g.i, g.o, k))
					: (h = new tM(b, g.label, g.i, k));
				h.bindTo('value', a, g.Ic);
				h.bindTo('display', g);
				h.bindTo('enabled', g);
			}
			var l = [];
			_.B(c, function(m) {
				l = l.concat(m);
			});
			l.length && ((f = new uM(b)), vM(f, e, l));
		}
	};
	vM = function(a, b, c) {
		function d() {
			function e(f) {
				for (var g = 0; g < _.Xc(f); ++g)
					if (0 != f[g].get('display')) return !0;
				return !1;
			}
			a.set('display', e(b) && e(c));
		}
		_.B(b.concat(c), function(e) {
			_.N.addListener(e, 'display_changed', d);
		});
	};
	xM = function(a) {
		var b = a.i;
		if (!b.listeners) {
			var c = a.o;
			b.listeners = [
				_.N.addDomListener(c, 'mouseout', function() {
					b.timeout = window.setTimeout(function() {
						a.set('active', !1);
					}, 1e3);
				}),
				_.N.mb(c, 'mouseover', a, a.j),
				_.N.addDomListener(document.body, 'mouseup', function(d) {
					for (d = d.target; d; ) {
						if (d == c) return;
						d = d.parentNode;
					}
					a.set('active', !1);
				})
			];
		}
		_.Oy(b);
	};
	yM = _.p(
		'.gm-style .gm-style-mtc label,.gm-style .gm-style-mtc div{font-weight:400}\n'
	);
	BM = function(a, b, c, d) {
		var e = this;
		this.j = a;
		this.o = d;
		this.i = [];
		_.N.addListener(this, 'fontloaded_changed', function() {
			if (e.get('fontLoaded')) {
				for (var h = e.i.length, k = 0, l = 0; l < h; ++l) {
					var m = _.Xg(e.i[l].parentNode),
						q = l == h - 1;
					e.i[l].Qi && _.mo(e.i[l].Qi.i, new _.I(q ? 0 : k, m.height), q);
					k += m.width;
				}
				e.i.length = 0;
			}
		});
		_.N.addListener(this, 'mapsize_changed', function() {
			return zM(e);
		});
		_.N.addListener(this, 'display_changed', function() {
			return zM(e);
		});
		d = b.length;
		for (var f = 0, g = 0; g < d; ++g)
			f = AM(this, c, b[g], f, 0 == g, g == d - 1);
		_.dz();
		_.Ry(a, 'pointer');
	};
	AM = function(a, b, c, d, e, f) {
		var g = document.createElement('div');
		a.j.appendChild(g);
		_.YK(g, 'left');
		_.ym(yM, a.j);
		_.Im(g, 'gm-style-mtc');
		var h = _.io(c.label, a.j, !0);
		b = b(g, h, c.i, {
			title: c.alt,
			padding: [0, 17],
			height: a.o,
			fontSize: jL(a.o),
			lg: e,
			Lh: f
		});
		g.style.position = 'relative';
		e = b.Hb();
		new _.kp(e, 'focusin', function() {
			g.style.zIndex = 1;
		});
		new _.kp(e, 'focusout', function() {
			g.style.zIndex = 0;
		});
		c.Ic && b.bindTo('value', a, c.Ic);
		e = null;
		h = _.Xg(g);
		c.j &&
			((e = new wM(a, g, c.j, a.o, {
				position: new _.I(f ? 0 : d, h.height),
				i: f
			})),
			CM(g, b, e));
		a.i.push({ parentNode: g, Qi: e });
		return (d += h.width);
	};
	zM = function(a) {
		var b = a.get('mapSize');
		b = !!(a.get('display') || (b && 200 <= b.width && 200 <= b.height));
		_.My(a.j, b);
		_.N.trigger(a.j, 'resize');
	};
	CM = function(a, b, c) {
		new _.kp(a, 'mousedown', function() {
			return c.set('active', !0);
		});
		new _.kp(a, 'mouseover', function() {
			b.get('active') && c.set('active', !0);
		});
		_.N.addDomListener(b, 'active_changed', function() {
			b.get('active') || c.set('active', !1);
		});
	};
	DM = function(a, b, c) {
		var d = this;
		_.dz();
		_.Ry(a, 'pointer');
		TK(a);
		a.style.width = _.Q(120);
		_.Ip(yM);
		_.Im(a, 'gm-style-mtc');
		var e = _.io('', a, !0),
			f = _.pM(a, e, null, {
				title: '\u66f4\u6539\u5730\u56fe\u6837\u5f0f',
				jm: !0,
				fh: !0,
				zi: !0,
				padding: [8, 17],
				fontSize: 18,
				lg: !0,
				Lh: !0
			}),
			g = {},
			h = [b];
		b = _.Da(b);
		for (var k = b.next(); !k.done; k = b.next())
			(k = k.value),
				'mapTypeId' == k.Ic && (g[k.i] = k.label),
				k.j && h.push.apply(h, _.Ea(k.j));
		this.addListener('maptypeid_changed', function() {
			_.Ly(e, g[d.get('mapTypeId')] || '');
		});
		var l = new wM(this, a, h, c);
		f.addListener('mousedown', function() {
			l.set('active', !l.get('active'));
		});
		this.i = a;
	};
	EM = function(a) {
		var b = a.get('mapSize');
		b = !!(a.get('display') || (b && 200 <= b.width && 200 <= b.height));
		_.My(a.i, b);
		_.N.trigger(a.i, 'resize');
	};
	FM = function(a) {
		this.j = a;
		this.i = !1;
	};
	GM = function(a, b, c) {
		a.get(b) !== c && ((a.i = !0), a.set(b, c), (a.i = !1));
	};
	HM = function(a) {
		var b = a.get('internalMapTypeId');
		_.Yc(a.j, function(c, d) {
			d.mapTypeId == b && d.mf && a.get(d.mf) == d.value && (b = c);
		});
		GM(a, 'mapTypeId', b);
	};
	IM = function(a, b, c) {
		a.innerText = '';
		b = _.Da(
			b
				? [
						'<svg xmlns="http://www.w3.org/2000/svg" width="22px" height="13px" viewBox="0 0 22 13">\n  <path fill="#666" d="M2.75,5H10V0H4.4L2.75,5z M0,13h10V7H2L0,13z M20,7h-8v6h10L20,7z M17.6,0H12v5h7.25L17.6,0z"/>\n</svg>\n',
						'<svg xmlns="http://www.w3.org/2000/svg" width="22px" height="13px" viewBox="0 0 22 13">\n  <path fill="#333" d="M2.75,5H10V0H4.4L2.75,5z M0,13h10V7H2L0,13z M20,7h-8v6h10L20,7z M17.6,0H12v5h7.25L17.6,0z"/>\n</svg>\n',
						'<svg xmlns="http://www.w3.org/2000/svg" width="22px" height="13px" viewBox="0 0 22 13">\n  <path fill="#111" d="M2.75,5H10V0H4.4L2.75,5z M0,13h10V7H2L0,13z M20,7h-8v6h10L20,7z M17.6,0H12v5h7.25L17.6,0z"/>\n</svg>\n'
				  ]
				: [
						'<svg xmlns="http://www.w3.org/2000/svg" width="18px" height="16px" viewBox="0 0 18 16">\n  <path fill="#666" d="M0,16h8V9H0V16z M10,16h8V9h-8V16z M0,7h8V0H0V7z M10,0v7h8V0H10z"/>\n</svg>\n',
						'<svg xmlns="http://www.w3.org/2000/svg" width="18px" height="16px" viewBox="0 0 18 16">\n  <path fill="#333" d="M0,16h8V9H0V16z M10,16h8V9h-8V16z M0,7h8V0H0V7z M10,0v7h8V0H10z"/>\n</svg>\n',
						'<svg xmlns="http://www.w3.org/2000/svg" width="18px" height="16px" viewBox="0 0 18 16">\n  <path fill="#111" d="M0,16h8V9H0V16z M10,16h8V9h-8V16z M0,7h8V0H0V7z M10,0v7h8V0H10z"/>\n</svg>\n'
				  ]
		);
		for (var d = b.next(); !d.done; d = b.next()) {
			d = d.value;
			var e = document.createElement('img');
			e.style.width = _.Q(jL(c));
			e.src = _.MD(d);
			a.appendChild(e);
		}
	};
	KM = function(a, b, c, d) {
		var e = this;
		c = _.Pg[43] ? 'rgb(34, 34, 34)' : 'rgb(255, 255, 255)';
		this.T = b;
		this.i = _.CE('\u5c06\u5730\u56fe\u65cb\u8f6c 90 \u5ea6');
		this.j = _.CE('\u503e\u659c\u5730\u56fe');
		this.$ = a;
		this.H = _.no('div', a);
		this.o = !0;
		_.ym(vL, d);
		_.Wg(this.i, new _.K(b, b));
		_.Wg(this.j, new _.K(b, b));
		this.i.style.left = this.i.style.top = '0';
		this.j.style.left = this.j.style.top = '0';
		this.i.style.backgroundColor = this.j.style.backgroundColor = c;
		this.H.appendChild(this.i);
		this.H.appendChild(this.j);
		a = _.Da([
			'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="22" viewBox="0 0 24 22">\n  <path fill="#666" fill-rule="evenodd" d="M20 10c0-5.52-4.48-10-10-10s-10 4.48-10 10v5h5v-5c0-2.76 2.24-5 5-5s5 2.24 5 5v5h-4l6.5 7 6.5-7h-4v-5z" clip-rule="evenodd"/>\n</svg>\n',
			'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="22" viewBox="0 0 24 22">\n  <path fill="#333" fill-rule="evenodd" d="M20 10c0-5.52-4.48-10-10-10s-10 4.48-10 10v5h5v-5c0-2.76 2.24-5 5-5s5 2.24 5 5v5h-4l6.5 7 6.5-7h-4v-5z" clip-rule="evenodd"/>\n</svg>\n',
			'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="22" viewBox="0 0 24 22">\n  <path fill="#111" fill-rule="evenodd" d="M20 10c0-5.52-4.48-10-10-10s-10 4.48-10 10v5h5v-5c0-2.76 2.24-5 5-5s5 2.24 5 5v5h-4l6.5 7 6.5-7h-4v-5z" clip-rule="evenodd"/>\n</svg>\n'
		]);
		for (d = a.next(); !d.done; d = a.next())
			(d = d.value),
				(c = document.createElement('img')),
				(c.style.width = c.style.height = _.Q(jL(b))),
				(c.src = _.MD(d)),
				this.i.appendChild(c);
		this.i.style.overflow = 'hidden';
		this.i.setAttribute('class', 'gm-control-active');
		this.i.style.marginBottom = _.Q(12 + (b >> 1));
		IM(this.j, !1, b);
		this.j.style.overflow = 'hidden';
		this.j.setAttribute('class', 'gm-tilt gm-control-active');
		_.ez(this.i, '0 1px 4px -1px rgba(0,0,0,0.3)');
		_.ez(this.j, '0 1px 4px -1px rgba(0,0,0,0.3)');
		ZK(this.i, _.Q(_.iK(b)));
		ZK(this.j, _.Q(_.iK(b)));
		_.qo(this.i);
		_.qo(this.j);
		_.Ry(this.i, 'pointer');
		_.Ry(this.j, 'pointer');
		_.N.mb(this.i, 'click', this, this.W);
		_.N.mb(this.j, 'click', this, this.ka);
		_.N.addListener(this, 'aerialavailableatzoom_changed', function() {
			return JM(e);
		});
		_.N.addListener(this, 'tilt_changed', function() {
			e.o = 0 != e.get('tilt');
			JM(e);
		});
		_.N.addListener(this, 'mapsize_changed', function() {
			JM(e);
		});
		_.N.addListener(this, 'rotatecontrol_changed', function() {
			JM(e);
		});
	};
	JM = function(a) {
		var b = a.get('mapSize'),
			c = !!a.get('aerialAvailableAtZoom');
		b = !!a.get('rotateControl') || (b && 200 <= b.width && 200 <= b.height);
		c = c && b;
		b = a.$;
		IM(a.j, a.o, a.T);
		a.i.style.display = a.o ? 'block' : 'none';
		var d = a.T,
			e = a.o ? 12 + Math.floor(2.25 * a.T) : a.T;
		a.H.style.width = _.Q(d);
		a.H.style.height = _.Q(e);
		b.setAttribute('controlWidth', d);
		b.setAttribute('controlHeight', e);
		_.My(b, c);
		_.N.trigger(b, 'resize');
	};
	LM = function(a, b, c) {
		a = new KM(a, b, { cache: !0 }, c);
		a.bindTo('mapSize', this);
		a.bindTo('rotateControl', this);
		a.bindTo('aerialAvailableAtZoom', this);
		a.bindTo('heading', this);
		a.bindTo('tilt', this);
	};
	MM = function(a, b, c, d) {
		a.innerText = '';
		b = _.Da(
			0 == b
				? 1 == c
					? [
							'<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">\n  <polygon fill="#666" points="18,7 11,7 11,0 7,0 7,7 0,7 0,11 7,11 7,18 11,18 11,11 18,11"/>\n</svg>\n',
							'<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">\n  <polygon fill="#B1B1B1" points="18,7 11,7 11,0 7,0 7,7 0,7 0,11 7,11 7,18 11,18 11,11 18,11"/>\n</svg>\n',
							'<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">\n  <polygon fill="#E4E4E4" points="18,7 11,7 11,0 7,0 7,7 0,7 0,11 7,11 7,18 11,18 11,11 18,11"/>\n</svg>\n'
					  ]
					: [
							'<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">\n  <polygon fill="#666" points="18,7 11,7 11,0 7,0 7,7 0,7 0,11 7,11 7,18 11,18 11,11 18,11"/>\n</svg>\n',
							'<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">\n  <polygon fill="#333" points="18,7 11,7 11,0 7,0 7,7 0,7 0,11 7,11 7,18 11,18 11,11 18,11"/>\n</svg>\n',
							'<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">\n  <polygon fill="#111" points="18,7 11,7 11,0 7,0 7,7 0,7 0,11 7,11 7,18 11,18 11,11 18,11"/>\n</svg>\n'
					  ]
				: 1 == c
				? [
						'<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">\n  <path fill="#666" d="M0,7h18v4H0V7z"/>\n</svg>\n',
						'<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">\n  <path fill="#B1B1B1" d="M0,7h18v4H0V7z"/>\n</svg>\n',
						'<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">\n  <path fill="#E4E4E4" d="M0,7h18v4H0V7z"/>\n</svg>\n'
				  ]
				: [
						'<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">\n  <path fill="#666" d="M0,7h18v4H0V7z"/>\n</svg>\n',
						'<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">\n  <path fill="#333" d="M0,7h18v4H0V7z"/>\n</svg>\n',
						'<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">\n  <path fill="#111" d="M0,7h18v4H0V7z"/>\n</svg>\n'
				  ]
		);
		for (c = b.next(); !c.done; c = b.next()) {
			c = c.value;
			var e = document.createElement('img');
			e.style.width = e.style.height = _.Q(jL(d));
			e.src = _.MD(c);
			a.appendChild(e);
		}
	};
	QM = function(a, b, c, d) {
		var e = this;
		this.H = a;
		this.j = b;
		this.i = _.no('div', a);
		_.qo(this.i);
		_.po(this.i);
		_.ez(this.i, '0 1px 4px -1px rgba(0,0,0,0.3)');
		ZK(this.i, _.Q(_.iK(b)));
		this.i.style.cursor = 'pointer';
		_.ym(vL, d);
		_.N.addDomListener(this.i, 'mouseover', function() {
			e.set('mouseover', !0);
		});
		_.N.addDomListener(this.i, 'mouseout', function() {
			e.set('mouseover', !1);
		});
		this.T = NM(this, this.i, 0);
		this.o = _.no('div', this.i);
		this.o.style.position = 'relative';
		this.o.style.overflow = 'hidden';
		this.o.style.width = _.Q((3 * b) / 4);
		this.o.style.height = _.Q(1);
		this.o.style.margin = '0 5px';
		this.W = NM(this, this.i, 1);
		_.N.addListener(this, 'display_changed', function() {
			return OM(e);
		});
		_.N.addListener(this, 'mapsize_changed', function() {
			return OM(e);
		});
		_.N.addListener(this, 'maptypeid_changed', function() {
			var f = e.get('mapTypeId');
			e.set(
				'controlStyle',
				(('satellite' == f || 'hybrid' == f) && _.Pg[43]) || 'streetview' == f
					? 1
					: 0
			);
		});
		_.N.addListener(this, 'controlstyle_changed', function() {
			var f = e.get('controlStyle');
			if (null != f) {
				var g = PM[f];
				MM(e.T, 0, f, e.j);
				MM(e.W, 1, f, e.j);
				e.i.style.backgroundColor = g.backgroundColor;
				e.o.style.backgroundColor = g.Ni;
			}
		});
	};
	NM = function(a, b, c) {
		var d = _.CE(0 == c ? '\u653e\u5927' : '\u7f29\u5c0f');
		b.appendChild(d);
		_.N.addDomListener(d, 'click', function() {
			var e = 0 == c ? 1 : -1;
			a.set('zoom', a.get('zoom') + e);
		});
		d.setAttribute('class', 'gm-control-active');
		d.style.overflow = 'hidden';
		b = a.get('controlStyle');
		MM(d, c, b, a.j);
		return d;
	};
	OM = function(a) {
		var b = a.get('mapSize');
		if ((b && 200 <= b.width && 200 <= b.height) || a.get('display')) {
			_.Oy(a.H);
			b = a.j;
			var c = 2 * a.j + 1;
			a.i.style.width = _.Q(b);
			a.i.style.height = _.Q(c);
			a.H.setAttribute('controlWidth', b);
			a.H.setAttribute('controlHeight', c);
			_.N.trigger(a.H, 'resize');
			b = a.T.style;
			b.width = _.Q(a.j);
			b.height = _.Q(a.j);
			b.left = b.top = '0';
			a.o.style.top = '0';
			b = a.W.style;
			b.width = _.Q(a.j);
			b.height = _.Q(a.j);
			b.left = b.top = '0';
		} else _.Ny(a.H);
	};
	RM = function(a, b, c, d) {
		a = this.i = _.no('div');
		_.Uy(a);
		b = new QM(a, b, c, d);
		b.bindTo('mapSize', this);
		b.bindTo('display', this, 'display');
		b.bindTo('mapTypeId', this);
		b.bindTo('zoom', this);
		this.wf = b;
	};
	SM = function(a) {
		a.wf && (a.wf.unbindAll(), (a.wf = null));
	};
	TM = function(a, b) {
		_.Uy(a);
		_.oo(a, 1000001);
		this.i = a;
		this.j = _.dK(a, b);
		this.o = a = _.no('a', this.j);
		a.style.textDecoration = 'none';
		_.Ry(a, 'pointer');
		_.jo(a, '\u4f7f\u7528\u6761\u6b3e');
		QK(a, _.hu);
		a.target = '_blank';
		a.setAttribute('rel', 'noopener');
		a.style.color = '#444';
		this.uh();
	};
	UM = function(a, b) {
		var c = a.$;
		if (c) b(c);
		else {
			var d = d ? Math.min(d, screen.width) : screen.width;
			var e = _.no(
				'div',
				document.body,
				new _.I(-screen.width, -screen.height),
				new _.K(d, screen.height)
			);
			e.style.visibility = 'hidden';
			a.T ? a.T++ : ((a.T = 1), _.no('div', e, _.pk).appendChild(a));
			window.setTimeout(function() {
				c = a.$;
				if (!c) {
					var f = a.parentNode,
						g = a.offsetWidth,
						h = a.offsetHeight;
					if ((1 == _.cj.type && 9 == document.documentMode) || 4 == _.cj.i)
						++g, ++h;
					c = new _.K(Math.min(d, g), Math.min(screen.height, h));
					for (a.$ = c; f.firstChild; ) f.removeChild(f.firstChild);
					_.Vn(f);
				}
				a.T--;
				a.T || (a.$ = null);
				_.Vn(e);
				e = null;
				b(c);
			}, 0);
		}
	};
	XM = function(a, b) {
		_.Uy(a);
		_.oo(a, 1000001);
		this.i = a;
		var c = _.no('div', a);
		a = _.dK(c, b);
		this.W = c;
		this.T = _.dK(_.no('div'), b);
		b = _.no('a', a);
		_.jo(b, '\u5730\u56fe\u6570\u636e');
		b.style.textDecoration = 'none';
		_.Ry(b, 'pointer');
		_.N.ve(b, 'click', this);
		this.o = b;
		this.j = _.no('span', a);
		this.H = VM(this);
		WM(this);
	};
	WM = function(a) {
		var b = a.get('size');
		b &&
			UM(
				a.T,
				(0, _.y)(function(c) {
					var d = YM(this);
					_.Fy(this.j, d);
					c = c.width > b.width - this.H;
					var e = !this.get('hide');
					_.My(this.i, e && !!d);
					_.My(this.o, !(!d || !c));
					_.My(this.j, !(!d || c));
					this.i.style.width = _.Q(
						12 + _.Xg(this.j).width + _.Xg(this.o).width
					);
					_.N.trigger(this.i, 'resize');
				}, a)
			);
	};
	YM = function(a) {
		return (
			a.get('attributionText') ||
			'\u56fe\u7247\u53ef\u80fd\u53d7\u7248\u6743\u4fdd\u62a4'
		);
	};
	VM = function(a) {
		var b = a.get('rmiWidth') || 0,
			c = a.get('tosWidth') || 0;
		a = a.get('scaleWidth') || 0;
		return b + c + a;
	};
	cN = function(a) {
		var b = this;
		this.i = ZM(a);
		$M(this.i);
		this.j = aN(this.i);
		_.NE(this.i, function() {
			_.Ny(b.i);
		});
		bN(this);
	};
	ZM = function(a) {
		a = _.no('div', a);
		a.style.backgroundColor = 'white';
		a.style.padding = _.Q(15) + ' ' + _.Q(21);
		a.style.border = _.Q(1) + ' solid #ababab';
		a.style.fontFamily = 'Roboto,Arial,sans-serif';
		a.style.color = '#222';
		a.style.boxSizing = 'border-box';
		_.ez(a, '0 4px 16px rgba(0,0,0,0.2)');
		_.oo(a, 10000002);
		return a;
	};
	$M = function(a) {
		a = _.no('div', a);
		a.style.padding = '0 0 10px 0';
		a.style.fontSize = '16px';
		a.style.boxSizing = 'border-box';
		_.io('\u5730\u56fe\u6570\u636e', a);
	};
	aN = function(a) {
		a = _.no('div', a);
		a.style.fontSize = '13px';
		return _.io('', a);
	};
	bN = function(a) {
		var b;
		if (
			(b = (b = a.get('size'))
				? new _.K(Math.min(300, b.width - 10), Math.min(180, b.height - 10))
				: null)
		) {
			_.Wg(a.i, new _.K(Math.max(0, b.width), Math.max(0, b.height)));
			var c = a.get('size');
			_.mo(a.i, new _.I((c.width - b.width) / 2, (c.height - b.height) / 2));
		}
	};
	dN = function(a) {
		_.Cx(a, 'gmnoprint');
		_.Im(a, 'gmnoscreen');
		this.i = a;
		a = this.j = _.no('div', a);
		a.style.fontFamily = 'Roboto,Arial,sans-serif';
		a.style.fontSize = _.Q(11);
		a.style.color = '#444';
		a.style.direction = 'ltr';
		a.style.textAlign = 'right';
		a.style.backgroundColor = '#f5f5f5';
	};
	eN = function(a, b) {
		var c = new XM(document.createElement('div'), a);
		c.bindTo('size', this);
		c.bindTo('rmiWidth', this);
		c.bindTo('attributionText', this);
		c.bindTo('fontLoaded', this);
		c.bindTo('isCustomPanorama', this);
		var d = new cN(a);
		d.bindTo('size', this);
		d.bindTo('attributionText', this);
		_.N.addListener(c, 'click', (0, _.y)(d.set, d, 'visible', !0));
		d = new dN(document.createElement('div'));
		d.bindTo('attributionText', this);
		a = new TM(document.createElement('div'), a);
		a.bindTo('fontLoaded', this);
		a.bindTo('mapTypeId', this);
		c.bindTo('tosWidth', a, 'width');
		c.bindTo('mapTypeId', this);
		c.bindTo('scaleWidth', this);
		b && _.Pg[28]
			? (c.bindTo('hide', b, 'hideLegalNotices'),
			  d.bindTo('hide', b, 'hideLegalNotices'),
			  a.bindTo('hide', b, 'hideLegalNotices'))
			: (c.bindTo('isCustomPanorama', this),
			  d.bindTo('hide', this, 'isCustomPanorama'));
		this.i = c;
		this.j = d;
		this.o = a;
	};
	fN = function(a, b) {
		_.qo(a);
		_.po(a);
		a.style.fontFamily = 'Roboto,Arial,sans-serif';
		a.style.fontSize = _.Q(Math.round((11 * b) / 40));
		a.style.textAlign = 'center';
		_.ez(a, 'rgba(0, 0, 0, 0.3) 0px 1px 4px -1px');
		a.setAttribute('controlWidth', _.Q(25));
		_.Ry(a, 'pointer');
		this.i = [];
		this.j = b;
		this.o = a;
	};
	gN = function(a, b, c) {
		_.N.addDomListener(b, 'mouseover', function() {
			b.style.color = '#bbb';
			b.style.fontWeight = 'bold';
		});
		_.N.addDomListener(b, 'mouseout', function() {
			b.style.color = '#999';
			b.style.fontWeight = '400';
		});
		_.N.mb(b, 'click', a, function() {
			this.set('pano', c);
		});
	};
	kN = function(a, b) {
		var c = this;
		this.T = a;
		_.Im(a, 'gm-svpc');
		a.setAttribute('dir', 'ltr');
		a.setAttribute(
			'title',
			'\u5c06\u8857\u666f\u5c0f\u4eba\u62d6\u5230\u5730\u56fe\u4e0a\u4ee5\u6253\u5f00\u8857\u666f'
		);
		a.style.backgroundColor = '#fff';
		this.i = { Pf: null, active: null, Mf: null };
		this.j = b;
		this.o = !0;
		hN(this);
		this.set('position', _.PK.tj.offset);
		_.N.mb(a, 'mouseover', this, this.W);
		_.N.mb(a, 'mouseout', this, this.$);
		a = this.H = new _.$E(a);
		a.bindTo('position', this);
		_.N.forward(a, 'dragstart', this);
		_.N.forward(a, 'drag', this);
		_.N.forward(a, 'dragend', this);
		var d = this;
		_.N.addListener(a, 'dragend', function() {
			d.set('position', _.PK.tj.offset);
		});
		_.N.addListener(this, 'mode_changed', function() {
			var e = c.get('mode');
			c.H.get('enabled') || c.H.set('enabled', !0);
			iN(c, e);
		});
		_.N.addListener(this, 'display_changed', function() {
			return jN(c);
		});
		_.N.addListener(this, 'mapsize_changed', function() {
			return jN(c);
		});
		this.set('mode', 1);
	};
	hN = function(a) {
		for (var b in a.i) {
			var c = a.i[b];
			c && c.parentNode && _.xe(c);
			a.i[b] = null;
		}
		b = a.T;
		if (a.o) {
			_.Oy(b);
			c = new _.K(a.j, a.j);
			_.ez(b, '0 1px 4px -1px rgba(0,0,0,0.3)');
			ZK(b, _.Q(40 < a.j ? Math.round(a.j / 20) : 2));
			b.style.width = _.Q(c.width);
			b.style.height = _.Q(c.height);
			var d = 32 > a.j ? a.j - 2 : 40 > a.j ? 30 : 10 + a.j / 2,
				e = _.no('div', b);
			e.style.position = 'absolute';
			e.style.left = '50%';
			e.style.top = '50%';
			var f = _.ve('IMG');
			a.i.Pf = f;
			f.src = _.MD(
				'<svg xmlns="http://www.w3.org/2000/svg" width="23" height="38" viewBox="0 0 23 38">\n<path d="M16.6,38.1h-5.5l-0.2-2.9-0.2,2.9h-5.5L5,25.3l-0.8,2a1.53,1.53,0,0,1-1.9.9l-1.2-.4a1.58,1.58,0,0,1-1-1.9v-0.1c0.3-.9,3.1-11.2,3.1-11.2a2.66,2.66,0,0,1,2.3-2l0.6-.5a6.93,6.93,0,0,1,4.7-12,6.8,6.8,0,0,1,4.9,2,7,7,0,0,1,2,4.9,6.65,6.65,0,0,1-2.2,5l0.7,0.5a2.78,2.78,0,0,1,2.4,2s2.9,11.2,2.9,11.3a1.53,1.53,0,0,1-.9,1.9l-1.3.4a1.63,1.63,0,0,1-1.9-.9l-0.7-1.8-0.1,12.7h0Zm-3.6-2h1.7L14.9,20.3l1.9-.3,2.4,6.3,0.3-.1c-0.2-.8-0.8-3.2-2.8-10.9a0.63,0.63,0,0,0-.6-0.5h-0.6l-1.1-.9h-1.9l-0.3-2a4.83,4.83,0,0,0,3.5-4.7A4.78,4.78 0 0,0 11 2.3H10.8a4.9,4.9,0,0,0-1.4,9.6l-0.3,2h-1.9l-1,.9h-0.6a0.74,0.74,0,0,0-.6.5c-2,7.5-2.7,10-3,10.9l0.3,0.1,2.5-6.3,1.9,0.3,0.2,15.8h1.6l0.6-8.4a1.52,1.52,0,0,1,1.5-1.4,1.5,1.5,0,0,1,1.5,1.4l0.9,8.4h0Zm-10.9-9.6h0Zm17.5-.1h0Z" style="fill:#333;opacity:0.7;isolation:isolate"/>\n<path d="M5.9,13.6l1.1-.9h7.8l1.2,0.9" style="fill:#ce592c"/>\n<ellipse cx="10.9" cy="13.1" rx="2.7" ry="0.3" style="fill:#ce592c;opacity:0.5;isolation:isolate"/>\n<path d="M20.6,26.1l-2.9-11.3a1.71,1.71,0,0,0-1.6-1.2H5.7a1.69,1.69,0,0,0-1.5,1.3l-3.1,11.3a0.61,0.61,0,0,0,.3.7l1.1,0.4a0.61,0.61,0,0,0,.7-0.3l2.7-6.7,0.2,16.8h3.6l0.6-9.3a0.47,0.47,0,0,1,.44-0.5h0.06c0.4,0,.4.2,0.5,0.5l0.6,9.3h3.6L15.7,20.3l2.5,6.6a0.52,0.52,0,0,0,.66.31h0l1.2-.4a0.57,0.57,0,0,0,.5-0.7h0Z" style="fill:#fdbf2d"/>\n<path d="M7,13.6l3.9,6.7,3.9-6.7" style="fill:#cf572e;opacity:0.6;isolation:isolate"/>\n<circle cx="10.9" cy="7" r="5.9" style="fill:#fdbf2d"/>\n</svg>\n'
			);
			f.style.width = f.style.height = _.Q(d);
			f.style.position = 'absolute';
			f.style.transform = 'translate(-50%, -50%)';
			f.style.pointerEvents = 'none';
			e.appendChild(f);
			f = _.ve('IMG');
			a.i.active = f;
			f.src = _.MD(
				'<svg width="24px" height="38px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 38">\n<path d="M22,26.6l-2.9-11.3a2.78,2.78,0,0,0-2.4-2l-0.7-.5a6.82,6.82,0,0,0,2.2-5,6.9,6.9,0,0,0-13.8,0,7,7,0,0,0,2.2,5.1l-0.6.5a2.55,2.55,0,0,0-2.3,2s-3,11.1-3,11.2v0.1a1.58,1.58,0,0,0,1,1.9l1.2,0.4a1.63,1.63,0,0,0,1.9-.9l0.8-2,0.2,12.8h11.3l0.2-12.6,0.7,1.8a1.54,1.54,0,0,0,1.5,1,1.09,1.09,0,0,0,.5-0.1l1.3-.4a1.85,1.85,0,0,0,.7-2h0Zm-1.2.9-1.2.4a0.61,0.61,0,0,1-.7-0.3l-2.5-6.6-0.2,16.8h-9.4L6.6,21l-2.7,6.7a0.52,0.52,0,0,1-.66.31h0l-1.1-.4a0.52,0.52,0,0,1-.31-0.66v0l3.1-11.3a1.69,1.69,0,0,1,1.5-1.3h0.2l1-.9h2.3a5.9,5.9,0,1,1,3.2,0h2.3l1.1,0.9h0.2a1.71,1.71,0,0,1,1.6,1.2l2.9,11.3a0.84,0.84,0,0,1-.4.7h0Z" style="fill:#333;fill-opacity:0.2"/>"\n</svg>\n\n'
			);
			f.style.display = 'none';
			f.style.width = f.style.height = _.Q(d);
			f.style.position = 'absolute';
			f.style.transform = 'translate(-50%, -50%)';
			f.style.pointerEvents = 'none';
			e.appendChild(f);
			f = _.ve('IMG');
			a.i.Mf = f;
			f.style.display = 'none';
			f.style.width = f.style.height = _.Q((4 * d) / 3);
			f.style.position = 'absolute';
			f.style.transform = 'translate(-60%, -45%)';
			f.style.pointerEvents = 'none';
			e.appendChild(f);
			f.src = _.MD(
				'<svg width="40px" height="50px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 40 50">\n<path d="M34.00,-30.40l-2.9-11.3a2.78,2.78,0,0,0-2.4-2l-0.7-.5a6.82,6.82,0,0,0,2.2-5,6.9,6.9,0,0,0-13.8,0,7,7,0,0,0,2.2,5.1l-0.6.5a2.55,2.55,0,0,0-2.3,2s-3,11.1-3,11.2v0.1a1.58,1.58,0,0,0,1,1.9l1.2,0.4a1.63,1.63,0,0,0,1.9-.9l0.8-2,0.2,12.8h11.3l0.2-12.6,0.7,1.8a1.54,1.54,0,0,0,1.5,1,1.09,1.09,0,0,0,.5-0.1l1.3-.4a1.85,1.85,0,0,0,.7-2h0Zm-1.2.9-1.2.4a0.61,0.61,0,0,1-.7-0.3l-2.5-6.6-0.2,16.8h-9.4L18.60,-36.00l-2.7,6.7a0.52,0.52,0,0,1-.66.31h0l-1.1-.4a0.52,0.52,0,0,1-.31-0.66v0l3.1-11.3a1.69,1.69,0,0,1,1.5-1.3h0.2l1-.9h2.3a5.9,5.9,0,1,1,3.2,0h2.3l1.1,0.9h0.2a1.71,1.71,0,0,1,1.6,1.2l2.9,11.3a0.84,0.84,0,0,1-.4.7h0Zm1.2,59.1-2.9-11.3a2.78,2.78,0,0,0-2.4-2l-0.7-.5a6.82,6.82,0,0,0,2.2-5,6.9,6.9,0,0,0-13.8,0,7,7,0,0,0,2.2,5.1l-0.6.5a2.55,2.55,0,0,0-2.3,2s-3,11.1-3,11.2v0.1a1.58,1.58,0,0,0,1,1.9l1.2,0.4a1.63,1.63,0,0,0,1.9-.9l0.8-2,0.2,12.8h11.3l0.2-12.6,0.7,1.8a1.54,1.54,0,0,0,1.5,1,1.09,1.09,0,0,0,.5-0.1l1.3-.4a1.85,1.85,0,0,0,.7-2h0Zm-1.2.9-1.2.4a0.61,0.61,0,0,1-.7-0.3l-2.5-6.6-0.2,16.8h-9.4L18.60,24.00l-2.7,6.7a0.52,0.52,0,0,1-.66.31h0l-1.1-.4a0.52,0.52,0,0,1-.31-0.66v0l3.1-11.3a1.69,1.69,0,0,1,1.5-1.3h0.2l1-.9h2.3a5.9,5.9,0,1,1,3.2,0h2.3l1.1,0.9h0.2a1.71,1.71,0,0,1,1.6,1.2l2.9,11.3a0.84,0.84,0,0,1-.4.7h0Z" style="fill:#333;fill-opacity:0.2"></path>\n<path d="M15.40,38.80h-4a1.64,1.64,0,0,1-1.4-1.1l-3.1-8a0.9,0.9,0,0,1-.5.1l-1.4.1a1.62,1.62,0,0,1-1.6-1.4l-1.1-13.1,1.6-1.3a6.87,6.87,0,0,1-3-4.6A7.14,7.14 0 0,1 2 4a7.6,7.6,0,0,1,4.7-3.1,7.14,7.14,0,0,1,5.5,1.1,7.28,7.28,0,0,1,2.3,9.6l2.1-.1,0.1,1c0,0.2.1,0.5,0.1,0.8a2.41,2.41,0,0,1,1,1s1.9,3.2,2.8,4.9c0.7,1.2,2.1,4.2,2.8,5.9a2.1,2.1,0,0,1-.8,2.6l-0.6.4a1.63,1.63,0,0,1-1.5.2l-0.6-.3a8.93,8.93,0,0,0,.5,1.3,7.91,7.91,0,0,0,1.8,2.6l0.6,0.3v4.6l-4.5-.1a7.32,7.32,0,0,1-2.5-1.5l-0.4,3.6h0Zm-10-19.2,3.5,9.8,2.9,7.5h1.6V35l-1.9-9.4,3.1,5.4a8.24,8.24,0,0,0,3.8,3.8h2.1v-1.4a14,14,0,0,1-2.2-3.1,44.55,44.55,0,0,1-2.2-8l-1.3-6.3,3.2,5.6c0.6,1.1,2.1,3.6,2.8,4.9l0.6-.4c-0.8-1.6-2.1-4.6-2.8-5.8-0.9-1.7-2.8-4.9-2.8-4.9a0.54,0.54,0,0,0-.4-0.3l-0.7-.1-0.1-.7a4.33,4.33,0,0,0-.1-0.5l-5.3.3,2.2-1.9a4.3,4.3,0,0,0,.9-1,5.17,5.17,0,0,0,.8-4,5.67,5.67,0,0,0-2.2-3.4,5.09,5.09,0,0,0-4-.8,5.67,5.67,0,0,0-3.4,2.2,5.17,5.17,0,0,0-.8,4,5.67,5.67,0,0,0,2.2,3.4,3.13,3.13,0,0,0,1,.5l1.6,0.6-3.2,2.6,1,11.5h0.4l-0.3-8.2h0Z" style="fill:#333"></path>\n<path d="M3.35,15.90l1.1,12.5a0.39,0.39,0,0,0,.36.42l0.14,0,1.4-.1a0.66,0.66,0,0,0,.5-0.4l-0.2-3.8-3.3-8.6h0Z" style="fill:#fdbf2d"></path>\n<path d="M5.20,28.80l1.1-.1a0.66,0.66,0,0,0,.5-0.4l-0.2-3.8-1.2-3.1Z" style="fill:#ce592b;fill-opacity:0.25"></path>\n<path d="M21.40,35.70l-3.8-1.2-2.7-7.8L12.00,15.5l3.4-2.9c0.2,2.4,2.2,14.1,3.7,17.1,0,0,1.3,2.6,2.3,3.1v2.9m-8.4-8.1-2-.3,2.5,10.1,0.9,0.4v-2.9" style="fill:#e5892b"></path>\n<path d="M17.80,25.40c-0.4-1.5-.7-3.1-1.1-4.8-0.1-.4-0.1-0.7-0.2-1.1l-1.1-2-1.7-1.6s0.9,5,2.4,7.1a19.12,19.12,0,0,0,1.7,2.4h0Z" style="fill:#cf572e;opacity:0.6;isolation:isolate"></path>\n<path d="M14.40,37.80h-3a0.43,0.43,0,0,1-.4-0.4l-3-7.8-1.7-4.8-3-9,8.9-.4s2.9,11.3,4.3,14.4c1.9,4.1,3.1,4.7,5,5.8h-3.2s-4.1-1.2-5.9-7.7a0.59,0.59,0,0,0-.6-0.4,0.62,0.62,0,0,0-.3.7s0.5,2.4.9,3.6a34.87,34.87,0,0,0,2,6h0Z" style="fill:#fdbf2d"></path>\n<path d="M15.40,12.70l-3.3,2.9-8.9.4,3.3-2.7" style="fill:#ce592b"></path>\n<path d="M9.10,21.10l1.4-6.2-5.9.5" style="fill:#cf572e;opacity:0.6;isolation:isolate"></path>\n<path d="M12.00,13.5a4.75,4.75,0,0,1-2.6,1.1c-1.5.3-2.9,0.2-2.9,0s1.1-.6,2.7-1" style="fill:#bb3d19"></path>\n<circle cx="7.92" cy="8.19" r="6.3" style="fill:#fdbf2d"></circle>\n<path d="M4.70,13.60a6.21,6.21,0,0,0,8.4-1.9v-0.1a8.89,8.89,0,0,1-8.4,2h0Z" style="fill:#ce592b;fill-opacity:0.25"></path>\n<path d="M21.20,27.20l0.6-.4a1.09,1.09,0,0,0,.4-1.3c-0.7-1.5-2.1-4.6-2.8-5.8-0.9-1.7-2.8-4.9-2.8-4.9a1.6,1.6,0,0,0-2.17-.65l-0.23.15a1.68,1.68,0,0,0-.4,2.1s2.3,3.9,3.1,5.3c0.6,1,2.1,3.7,2.9,5.1a0.94,0.94,0,0,0,1.24.49l0.16-.09h0Z" style="fill:#fdbf2d"></path>\n<path d="M19.40,19.80c-0.9-1.7-2.8-4.9-2.8-4.9a1.6,1.6,0,0,0-2.17-.65l-0.23.15-0.3.3c1.1,1.5,2.9,3.8,3.9,5.4,1.1,1.8,2.9,5,3.8,6.7l0.1-.1a1.09,1.09,0,0,0,.4-1.3,57.67,57.67,0,0,0-2.7-5.6h0Z" style="fill:#ce592b;fill-opacity:0.25"></path>\n</svg>\n'
			);
			a.i.Pf.setAttribute('aria-label', '\u8857\u666f\u5c0f\u4eba\u63a7\u4ef6');
			a.i.active.setAttribute(
				'aria-label',
				'\u8857\u666f\u5c0f\u4eba\u4f4d\u4e8e\u5730\u56fe\u4e0a\u9762'
			);
			a.i.Mf.setAttribute('aria-label', '\u8857\u666f\u5c0f\u4eba\u63a7\u4ef6');
			b.setAttribute('controlWidth', c.width);
			b.setAttribute('controlHeight', c.height);
			_.N.trigger(b, 'resize');
			iN(a, a.get('mode'));
		} else _.Ny(b), _.N.trigger(b, 'resize');
	};
	iN = function(a, b) {
		a.o &&
			((a = a.i),
			(a.Pf.style.display = a.Mf.style.display = a.active.style.display =
				'none'),
			1 == b
				? (a.Pf.style.display = '')
				: 2 == b
				? (a.Mf.style.display = '')
				: (a.active.style.display = ''));
	};
	jN = function(a) {
		var b = a.get('mapSize');
		b = !!a.get('display') || !!(b && 200 <= b.width && b && 200 <= b.height);
		a.o != b && ((a.o = b), hN(a));
	};
	lN = function(a) {
		a = {
			clickable: !1,
			crossOnDrag: !1,
			draggable: !0,
			map: a,
			mapOnly: !0,
			pegmanMarker: !0,
			zIndex: 1e6
		};
		this.ya = _.PK.Pd;
		this.Ta = _.PK.Sn;
		this.H = 0;
		this.ka = this.W = -1;
		this.o = 0;
		this.T = this.$ = null;
		this.j = _.Te('mode');
		this.i = _.Ue('mode');
		var b = (this.Qa = new _.kg(a));
		b.setDraggable(!0);
		var c = (this.ta = new _.kg(a)),
			d = (this.ua = new _.kg(a));
		this.i(1);
		this.set('heading', 0);
		b.bindTo('icon', this, 'pegmanIcon');
		b.bindTo('position', this, 'dragPosition');
		b.bindTo('dragging', this);
		var e = this;
		c.bindTo('icon', this, 'lilypadIcon');
		_.N.addListener(this, 'position_changed', function() {
			c.set('position', e.get('position'));
		});
		c.bindTo('dragging', this);
		d.set('cursor', _.Ps);
		d.set('icon', kL(this.Ta, 0));
		_.N.addListener(this, 'dragposition_changed', function() {
			d.set('position', e.get('dragPosition'));
		});
		d.bindTo('dragging', this);
		_.N.addListener(this, 'dragstart', this.Hm);
		_.N.addListener(this, 'drag', this.Im);
		_.N.addListener(this, 'dragend', this.Gm);
		_.N.forward(b, 'dragstart', this);
		_.N.forward(b, 'drag', this);
		_.N.forward(b, 'dragend', this);
	};
	oN = function(a) {
		var b = a.j(),
			c = _.mK(b);
		a.Qa.setVisible(c || 7 == b);
		a.set('pegmanIcon', c ? mN(a) : 7 == b ? nN(a) : void 0);
	};
	pN = function(a) {
		a.ta.setVisible(!1);
		a.ua.setVisible(_.mK(a.j()));
	};
	mN = function(a) {
		var b = a.j() - 3;
		return kL(a.ya, b);
	};
	nN = function(a) {
		var b = qN(a);
		a.ka != b &&
			((a.ka = b),
			(a.$ = {
				url: _.MD(rN[b]),
				scaledSize: new _.K(49, 52),
				anchor: new _.I(25, 35)
			}));
		return a.$;
	};
	tN = function(a) {
		var b = qN(a);
		a.W != b &&
			((a.W = b),
			(a.T = {
				url: _.MD(sN[b]),
				scaledSize: new _.K(49, 52),
				anchor: new _.I(25, 35)
			}));
		return a.T;
	};
	qN = function(a) {
		(a = _.dy(a.get('heading')) % 360) || (a = 0);
		0 > a && (a += 360);
		return Math.round((a / 360) * 16) % 16;
	};
	vN = function(a, b, c, d, e, f, g, h, k) {
		this.i = a;
		this.ua = f;
		this.$ = e;
		this.W = g;
		this.ya = h;
		this.Qa = k || null;
		this.Ta = d;
		this.T = this.o = !1;
		this.ka = null;
		this.Hg(1);
		uN(this, c, b);
		this.lb = new _.kK();
		this.lb.bindTo('mapHeading', this);
		this.lb.bindTo('tilt', this);
		this.lb.bindTo('client', this);
		this.lb.bindTo('client', a, 'svClient');
		this.j = this.ta = null;
		this.H = _.az(c, d);
	};
	wN = function(a, b) {
		return _.ad(b - (a || 0), 0, 360);
	};
	uN = function(a, b, c) {
		var d = a.i.__gm,
			e = new kN(b, a.ya);
		e.bindTo('mode', a);
		e.bindTo('mapSize', a);
		e.bindTo('display', a);
		var f = new lN(a.i);
		f.bindTo('mode', a);
		f.bindTo('dragPosition', a);
		f.bindTo('position', a);
		var g = new _.mz(['mapHeading', 'streetviewHeading'], 'heading', wN);
		g.bindTo('streetviewHeading', a, 'heading');
		g.bindTo('mapHeading', a.i, 'heading');
		f.bindTo('heading', g);
		a.bindTo('pegmanDragging', f, 'dragging');
		d.bindTo('pegmanDragging', a);
		_.N.bind(e, 'dragstart', a, function() {
			var h = this;
			this.H = _.az(b, this.Ta);
			_.P('streetview').then(function(k) {
				if (!h.ta) {
					var l = (0, _.y)(h.$.getUrl, h.$),
						m = d.get('panes');
					k = h.ta = new k.Ik(m.floatPane, l, h.ua);
					k.bindTo('description', h);
					k.bindTo('mode', h);
					k.bindTo('thumbnailPanoId', h, 'panoId');
					k.bindTo('pixelBounds', d);
					l = new _.DE(function(q) {
						q = new _.Po(h.i, h.W, q);
						h.W.yc(q);
						return q;
					});
					l.bindTo('latLngPosition', f, 'dragPosition');
					k.bindTo('pixelPosition', l);
				}
			});
		});
		_.B(['dragstart', 'drag', 'dragend'], function(h) {
			_.N.addListener(e, h, function() {
				_.N.trigger(f, h, {
					latLng: f.get('position'),
					pixel: e.get('position')
				});
			});
		});
		_.N.addListener(e, 'position_changed', function() {
			var h = e.get('position');
			(h = c({ clientX: h.x + a.H.x, clientY: h.y + a.H.y })) &&
				f.set('dragPosition', h);
		});
		_.N.addListener(f, 'dragend', (0, _.y)(a.rj, a, !1));
		_.N.addListener(f, 'hover', (0, _.y)(a.rj, a, !0));
	};
	xN = function(a) {
		var b = a.i.overlayMapTypes,
			c = a.lb;
		b.forEach(function(d, e) {
			d == c && b.removeAt(e);
		});
		a.o = !1;
	};
	yN = function(a) {
		var b = a.get('projection');
		b && b.j && (a.i.overlayMapTypes.push(a.lb), (a.o = !0));
	};
	zN = _.p(
		'@media print {  .gm-style .gmnoprint, .gmnoprint {    display:none  }}@media screen {  .gm-style .gmnoscreen, .gmnoscreen {    display:none  }}'
	);
	AN = function(a, b, c) {
		this.T = a;
		this.W = c;
		this.j = _.ef(0);
		c = new _.ny(_.Wm(b));
		this.$ = _.oy(c, 'span');
		c.appendChild(b, this.$);
		this.i = _.oy(c, 'div');
		c.appendChild(b, this.i);
		gL(this.i, 'position', 'relative');
		gL(this.i, 'display', 'inline-block');
		this.i.style.height = _.fz(8, !0);
		gL(this.i, 'bottom', '-1px');
		b = _.oy(c, 'div');
		c.appendChild(this.i, b);
		_.gz(b, '100%', 4);
		gL(b, 'position', 'absolute');
		hL(b, 0, 0);
		b = _.oy(c, 'div');
		c.appendChild(this.i, b);
		_.gz(b, 4, 8);
		hL(b, 0, 0);
		gL(b, 'backgroundColor', '#fff');
		b = _.oy(c, 'div');
		c.appendChild(this.i, b);
		_.gz(b, 4, 8);
		gL(b, 'position', 'absolute');
		gL(b, 'backgroundColor', '#fff');
		gL(b, 'right', '0px');
		gL(b, 'bottom', '0px');
		b = _.oy(c, 'div');
		c.appendChild(this.i, b);
		gL(b, 'position', 'absolute');
		gL(b, 'backgroundColor', '#666');
		b.style.height = _.fz(2, !0);
		gL(b, 'left', '1px');
		gL(b, 'bottom', '1px');
		gL(b, 'right', '1px');
		b = _.oy(c, 'div');
		c.appendChild(this.i, b);
		gL(b, 'position', 'absolute');
		_.gz(b, 2, 6);
		hL(b, 1, 1);
		gL(b, 'backgroundColor', '#666');
		b = _.oy(c, 'div');
		c.appendChild(this.i, b);
		_.gz(b, 2, 6);
		gL(b, 'position', 'absolute');
		gL(b, 'backgroundColor', '#666');
		gL(b, 'bottom', '1px');
		gL(b, 'right', '1px');
		this.o = !0;
		this.H = 0;
		_.Ah(a, 'click', (0, _.y)(this.ta, this));
		this.W.kb((0, _.y)(this.ka, this));
	};
	BN = function(a, b, c, d) {
		var e = a;
		1 > a && ((e = c), (b = d));
		for (a = 1; e >= 10 * a; ) a *= 10;
		e >= 5 * a && (a *= 5);
		e >= 2 * a && (a *= 2);
		return { Bn: Math.round((80 * a) / e), zl: a + ' ' + b };
	};
	LN = function(a) {
		var b = this;
		this.Ja = new _.ji(function() {
			b.o[1] && CN(b);
			b.o[0] && DN(b);
			if (b.o[2]) {
				if (b.yb) {
					var e = b.yb;
					gL(e.T, 'display', 'none');
					e.j.set(0);
					b.yb = null;
				}
				b.$ && (b.j.Xc(b.$), (b.$ = null));
				e = b.get('scaleControl');
				void 0 !== e && _.ij(b.i, e ? 'Csy' : 'Csn');
				e &&
					((b.$ = _.no('div')),
					b.j.addElement(b.$, 12, !0, -1001),
					_.po(b.$),
					_.qo(b.$),
					(b.yb = new AN(
						b.$,
						_.dK(b.$, b.ta),
						new _.mq(
							[_.tq(b, 'projection'), _.tq(b, 'bottomRight'), _.tq(b, 'zoom')],
							uL
						)
					)),
					_.N.trigger(b.$, 'resize'),
					b.Lc && _.pq(b.Lc, 'scaleWidth', b.yb.j));
			}
			b.o[3] && EN(b);
			b.o = {};
			b.get('disableDefaultUI') && !b.W && _.ij(b.i, 'Cdn');
		}, 0);
		this.j = a.ij || null;
		this.Mk = a.lf;
		this.Nc = a.Dm || null;
		this.H = a.controlSize;
		this.hd = a.ql || null;
		this.i = a.map || null;
		this.W = a.lo || null;
		this.Ok = a.no || null;
		this.Lk = a.ko || null;
		this.Kk = a.nb || null;
		this.ki = this.xd = this.ji = !1;
		this.T = this.li = null;
		this.ta = a.Ui;
		this.wd = _.CE('\u5207\u6362\u5168\u5c4f\u89c6\u56fe');
		this.ya = null;
		this.Fk = a.Rf;
		this.ka = null;
		this.Pc = !1;
		this.Lc = this.$ = this.yb = null;
		this.Bc = [];
		this.Ta = null;
		this.Ek = {};
		this.o = {};
		this.Qa = this.uc = this.kc = this.Ac = null;
		this.Oc = _.no('div');
		this.ua = null;
		this.Mc = !1;
		_.qo(this.Oc);
		_.ym(zN, this.ta);
		var c = (this.Qc = new gM(_.F(_.Lc(_.H), 14)));
		c.bindTo('center', this);
		c.bindTo('zoom', this);
		c.bindTo('mapTypeId', this);
		c.bindTo('pano', this);
		c.bindTo('position', this);
		c.bindTo('pov', this);
		c.bindTo('heading', this);
		c.bindTo('tilt', this);
		a.map &&
			_.N.addListener(c, 'url_changed', function() {
				a.map.set('mapUrl', c.get('url'));
			});
		var d = new iL(_.Lc(_.H));
		d.bindTo('center', this);
		d.bindTo('zoom', this);
		d.bindTo('mapTypeId', this);
		d.bindTo('pano', this);
		d.bindTo('heading', this);
		this.Nk = d;
		FN(this);
		GN(this);
		EN(this);
		HN(this, a.Ii);
		a.Jj && IN(this);
		_.Pg[35] && JN(this);
		KN(this);
	};
	KN = function(a) {
		_.P('util').then(function(b) {
			b.i.i(function() {
				a.Mc = !0;
				MN(a);
				a.ua && (a.ua.set('display', !1), a.ua.unbindAll(), (a.ua = null));
			});
		});
	};
	SN = function(a) {
		if (
			NN(a) != a.li ||
			ON(a) != a.ji ||
			PN(a) != a.ki ||
			QN(a) != a.Pc ||
			RN(a) != a.xd
		)
			a.o[1] = !0;
		a.o[0] = !0;
		_.ki(a.Ja);
	};
	TN = function(a) {
		return a.get('disableDefaultUI');
	};
	QN = function(a) {
		var b = a.get('streetViewControl'),
			c = a.get('disableDefaultUI'),
			d = !!a.get('size');
		(void 0 !== b || c) && _.ij(a.i, b ? 'Cvy' : 'Cvn');
		null == b && (b = !c);
		a = d && !a.W;
		return b && a;
	};
	UN = function(a) {
		return !a.get('disableDefaultUI') && !!a.W;
	};
	HN = function(a, b) {
		var c = a.j;
		_.B(b, function(d, e) {
			if (d) {
				var f = function(g) {
					if (g) {
						var h = g.index;
						_.fd(h) || (h = 1e3);
						h = Math.max(h, -999);
						_.oo(g, Math.min(999999, g.style.zIndex || 0));
						c.addElement(g, e, !1, h);
					}
				};
				d.forEach(f);
				_.N.addListener(d, 'insert_at', function(g) {
					f(d.getAt(g));
				});
				_.N.addListener(d, 'remove_at', function(g, h) {
					c.Xc(h);
				});
			}
		});
	};
	JN = function(a) {
		if (a.i) {
			var b = new tL(document.createElement('div'));
			b.bindTo('card', a.i.__gm);
			b = b.getDiv();
			a.j.addElement(b, 1, !0, 0.1);
		}
	};
	EN = function(a) {
		a.ya && (a.ya.unbindAll(), ZL(a.ya), (a.ya = null), a.j.Xc(a.wd));
		var b = _.CE('\u5207\u6362\u5168\u5c4f\u89c6\u56fe'),
			c = new dM(a.ta, b, a.Fk, a.H);
		c.bindTo('display', a, 'fullscreenControl');
		c.bindTo('disableDefaultUI', a);
		c.bindTo('mapTypeId', a);
		var d = a.get('fullscreenControlOptions') || {};
		a.j.addElement(b, (d && d.position) || 7, !0, -1007);
		a.ya = c;
		a.wd = b;
	};
	GN = function(a) {
		var b = new eN(a.Mk, a.i || a.W);
		b.bindTo('size', a);
		b.bindTo('rmiWidth', a);
		b.bindTo('attributionText', a);
		b.bindTo('fontLoaded', a);
		b.bindTo('mapTypeId', a);
		b.bindTo('isCustomPanorama', a);
		var c = b.i.getDiv();
		a.j.addElement(c, 12, !0, -1e3);
		c = b.j.getDiv();
		a.j.addElement(c, 12, !0, -1005);
		c = b.o.getDiv();
		a.j.addElement(c, 12, !0, -1002);
		a.Lc = b;
	};
	FN = function(a) {
		if (!_.Pg[2]) {
			var b = !!_.Pg[21];
			a.i ? (b = kM(a.i, a.Qc, b)) : ((b = jM(a.W, a.Qc, b)), iM(b, !0));
			b = b.getDiv();
			a.j.addElement(b, 10, !0, -1e3);
		}
	};
	IN = function(a) {
		var b = _.Lc(_.H);
		if (!_.go()) {
			var c = document.createElement('div'),
				d = new _.gK(c, a.i, _.F(b, 14));
			a.j.addElement(c, 12, !0, -1003);
			d.bindTo('available', a, 'rmiAvailable');
			d.bindTo('bounds', a);
			_.Pg[17]
				? (d.bindTo('enabled', a, 'reportErrorControl'),
				  a.i.bindTo('rmiLinkData', d))
				: d.set('enabled', !0);
			d.bindTo('mapSize', a, 'size');
			d.bindTo('mapTypeId', a);
			d.bindTo('sessionState', a.Nk);
			a.bindTo('rmiWidth', d, 'width');
			_.N.addListener(d, 'rmilinkdata_changed', function() {
				var e = d.get('rmiLinkData');
				a.i.set('rmiUrl', e && e.url);
			});
		}
	};
	MN = function(a) {
		a.vc && (a.vc.unbindAll && a.vc.unbindAll(), (a.vc = null));
		a.Ac && (a.Ac.unbindAll(), (a.Ac = null));
		a.kc && (a.kc.unbindAll(), (a.kc = null));
		a.Ta && (VN(a, a.Ta), _.wi(a.Ta.Na), (a.Ta = null));
	};
	DN = function(a) {
		MN(a);
		if (a.Nc && !a.Mc) {
			var b = WN(a);
			if (b) {
				var c = _.no('div');
				_.Uy(c);
				c.style.margin = _.Q(a.H >> 2);
				_.N.addDomListener(c, 'mouseover', function() {
					_.oo(c, 1e6);
				});
				_.N.addDomListener(c, 'mouseout', function() {
					_.oo(c, 0);
				});
				_.oo(c, 0);
				var d = a.get('mapTypeControlOptions') || {},
					e = (a.kc = new sL(a.Nc, d.mapTypeIds));
				e.bindTo('aerialAvailableAtZoom', a);
				e.bindTo('zoom', a);
				var f = e.H;
				a.j.addElement(c, d.position || 1, !1, 0.2);
				d = null;
				2 == b
					? ((d = new DM(c, f, a.H)), e.bindTo('mapTypeId', d))
					: (d = new BM(c, f, _.pM, a.H));
				b = a.Ac = new FM(e.o);
				b.set('labels', !0);
				d.bindTo('mapTypeId', b, 'internalMapTypeId');
				d.bindTo('labels', b);
				d.bindTo('terrain', b);
				d.bindTo('tilt', a, 'desiredTilt');
				d.bindTo('fontLoaded', a);
				d.bindTo('mapSize', a, 'size');
				d.bindTo('display', a, 'mapTypeControl');
				b.bindTo('mapTypeId', a);
				_.N.trigger(c, 'resize');
				a.Ta = { Na: c, Uf: null };
				a.vc = d;
			}
		}
	};
	WN = function(a) {
		if (!a.Nc) return null;
		var b = (a.get('mapTypeControlOptions') || {}).style || 0,
			c = a.get('mapTypeControl'),
			d = TN(a);
		if ((void 0 === c && d) || (void 0 !== c && !c))
			return _.ij(a.i, 'Cmn'), null;
		1 == b ? _.ij(a.i, 'Cmh') : 2 == b && _.ij(a.i, 'Cmd');
		return 2 == b || 1 == b ? b : 1;
	};
	XN = function(a, b) {
		b = a.ka = new RM(b, a.H, _.cu.i, a.ta);
		b.bindTo('zoomRange', a);
		b.bindTo('display', a, 'zoomControl');
		b.bindTo('disableDefaultUI', a);
		b.bindTo('mapSize', a, 'size');
		b.bindTo('mapTypeId', a);
		b.bindTo('zoom', a);
		return b.getDiv();
	};
	YN = function(a) {
		var b = new _.qE(yL, { rtl: _.cu.i }),
			c = new RL(b, a.H, a.ta);
		c.bindTo('pov', a);
		c.bindTo('disableDefaultUI', a);
		c.bindTo('panControl', a);
		c.bindTo('mapSize', a, 'size');
		return b.Na;
	};
	ZN = function(a) {
		var b = _.no('div');
		_.Uy(b);
		a.T = new LM(b, a.H, a.ta);
		a.T.bindTo('mapSize', a, 'size');
		a.T.bindTo('rotateControl', a);
		a.T.bindTo('heading', a);
		a.T.bindTo('tilt', a);
		a.T.bindTo('aerialAvailableAtZoom', a);
		return b;
	};
	$N = function(a) {
		var b = _.no('div'),
			c = (a.uc = new fN(b, a.H));
		c.bindTo('pano', a);
		c.bindTo('floors', a);
		c.bindTo('floorId', a);
		return b;
	};
	aO = function(a) {
		a.o[1] = !0;
		_.ki(a.Ja);
	};
	CN = function(a) {
		function b(m, q) {
			if (!l[m]) {
				var t = a.H >> 2,
					u = 12 + (a.H >> 1),
					v = document.createElement('div');
				_.Uy(v);
				_.Im(v, 'gm-bundled-control');
				10 == m || 11 == m || 12 == m || 6 == m || 9 == m
					? _.Im(v, 'gm-bundled-control-on-bottom')
					: _.Cx(v, 'gm-bundled-control-on-bottom');
				v.style.margin = _.Q(t);
				_.po(v);
				l[m] = new eM(v, m, u);
				a.j.addElement(v, m, !1, 0.1);
			}
			m = l[m];
			m.add(q);
			a.Bc.push({ Na: q, Uf: m });
		}
		function c(m) {
			return (a.get(m) || {}).position;
		}
		a.ka && (SM(a.ka), a.ka.unbindAll(), (a.ka = null));
		a.T && (a.T.unbindAll(), (a.T = null));
		a.uc && (a.uc.unbindAll(), (a.uc = null));
		for (var d = _.Da(a.Bc), e = d.next(); !e.done; e = d.next())
			VN(a, e.value);
		a.Bc = [];
		d = a.ji = ON(a);
		var f = (a.li = NN(a)),
			g = (a.Pc = QN(a)),
			h = (a.ki = PN(a));
		a.xd = RN(a);
		e = d && (c('panControlOptions') || 9);
		d = f && (c('zoomControlOptions') || (3 == f && 6) || 9);
		var k = 3 == f || _.go();
		g = g && (c('streetViewControlOptions') || 9);
		h = h && (c('rotateControlOptions') || (k && 6) || 9);
		var l = a.Ek;
		d && ((f = XN(a, f)), b(d, f));
		g && (bO(a), b(g, a.Oc));
		e && a.W && _.rl.j && ((f = YN(a)), b(e, f));
		h && ((e = ZN(a)), b(h, e));
		a.Qa && (a.Qa.remove(), (a.Qa = null));
		if ((e = UN(a) && 9)) (f = $N(a)), b(e, f);
		a.T && a.ka && a.ka.wf && h == d && a.T.bindTo('mouseover', a.ka.wf);
		d = _.Da(a.Bc);
		for (e = d.next(); !e.done; e = d.next()) _.N.trigger(e.value.Na, 'resize');
	};
	ON = function(a) {
		var b = a.get('panControl'),
			c = TN(a);
		if (void 0 !== b || c) return a.W || _.ij(a.i, b ? 'Cpy' : 'Cpn'), !!b;
		b = a.get('size');
		return _.go() || !b ? !1 : (400 <= b.width && 370 <= b.height) || !!a.W;
	};
	RN = function(a) {
		return a.W
			? !1
			: TN(a)
			? 1 == a.get('myLocationControl')
			: 0 != a.get('myLocationControl');
	};
	PN = function(a) {
		var b = a.get('rotateControl'),
			c = TN(a);
		(void 0 !== b || c) && _.ij(a.i, b ? 'Cry' : 'Crn');
		return !a.get('size') || a.W ? !1 : c ? 1 == b : 0 != b;
	};
	NN = function(a) {
		var b = a.get('zoomControl'),
			c = TN(a);
		return 0 == b || (c && void 0 === b)
			? (a.W || _.ij(a.i, 'Czn'), null)
			: a.get('size')
			? 1
			: null;
	};
	bO = function(a) {
		if (!a.ua && !a.Mc && a.hd && a.i) {
			var b = (a.ua = new vN(
				a.i,
				a.hd,
				a.Oc,
				a.ta,
				a.Ok,
				_.H,
				a.Kk,
				a.H,
				a.Lk || void 0
			));
			b.bindTo('mapHeading', a, 'heading');
			b.bindTo('tilt', a);
			b.bindTo('projection', a.i);
			b.bindTo('mapTypeId', a);
			a.bindTo('panoramaVisible', b);
			b.bindTo('mapSize', a, 'size');
			b.bindTo('display', a, 'streetViewControl');
			b.bindTo('disableDefaultUI', a);
			cO(a);
		}
	};
	cO = function(a) {
		var b = a.ua;
		if (b) {
			var c = b.ka,
				d = a.get('streetView');
			if (d != c) {
				if (c) {
					var e = c.__gm;
					e.unbind('result');
					e.unbind('heading');
					c.unbind('passiveLogo');
					c.i.removeListener(a.Nj, a);
					c.i.set(!1);
				}
				d &&
					((c = d.__gm),
					null != c.get('result') && b.set('result', c.get('result')),
					c.bindTo('result', b),
					null != c.get('heading') && b.set('heading', c.get('heading')),
					c.bindTo('heading', b),
					d.bindTo('passiveLogo', a),
					d.i.addListener(a.Nj, a),
					a.set('panoramaVisible', d.get('visible')),
					b.bindTo('client', d));
				b.ka = d;
			}
		}
	};
	VN = function(a, b) {
		b.Uf ? (b.Uf.remove(b.Na), delete b.Uf) : a.j.Xc(b.Na);
	};
	dO = function(a) {
		var b = this;
		this.j = a;
		this.Ja = new _.ji(function() {
			return b.o();
		}, 0);
		_.N.mb(a, 'resize', this, this.o);
		var c = (this.i = {});
		_.B([1, 2, 3, 5, 4, 6, 7, 8, 9, 10, 11, 12, 13], function(d) {
			c[d] = [];
		});
	};
	eO = function(a) {
		for (var b = 0, c = 0, d = a.length; c < d; ++c)
			b = Math.max(a[c].height, b);
		var e = (d = 0);
		for (c = a.length; 0 < c; --c) {
			var f = a[c - 1];
			if (b == f.height) {
				f.width > e && f.width > f.height ? (e = f.height) : (d = f.width);
				break;
			} else e = Math.max(f.height, e);
		}
		return new _.K(d, e);
	};
	hO = function(a, b, c, d) {
		for (var e = 0, f = 0, g, h = [], k = 0, l = a.length; k < l; ++k) {
			var m = a[k].element;
			g = fO(m);
			var q = fO(m, !0),
				t = gO(m),
				u = gO(m, !0),
				v = m.style;
			v[b] = _.Q('left' == b ? e : e + (g - q));
			v[c] = _.Q('top' == c ? 0 : t - u);
			g = e + g;
			t > f && ((f = t), d.push({ minWidth: e, height: f }));
			e = g;
			a[k].border || h.push(new _.K(e, t));
			XK(m);
		}
		return eO(h);
	};
	iO = function(a, b, c, d) {
		for (var e = 0, f = [], g = 0, h = a.length; g < h; ++g) {
			for (
				var k = a[g].element,
					l = fO(k),
					m = gO(k),
					q = fO(k, !0),
					t = gO(k, !0),
					u = 0,
					v = 0,
					w = d.length;
				v < w && d[v].minWidth <= l;
				++v
			)
				u = d[v].height;
			e = Math.max(u, e);
			u = k.style;
			u[c] = _.Q('top' == c ? e : e + m - t);
			u[b] = _.Q('left' == b ? 0 : l - q);
			e += m;
			a[g].border || f.push(new _.K(l, e));
			XK(k);
		}
		return eO(f);
	};
	jO = function(a, b, c, d) {
		for (var e = 0, f = 0, g = 0, h = a.length; g < h; ++g) {
			var k = a[g].element,
				l = fO(k),
				m = gO(k),
				q = fO(k, !0);
			'left' == b
				? (k.style.left = 0)
				: 'right' == b
				? (k.style.right = _.Q(l - q))
				: (k.style.left = _.Q((c - q) / 2));
			e += m;
			a[g].border || (f = Math.max(l, f));
		}
		b = (d - e) / 2;
		g = 0;
		for (h = a.length; g < h; ++g)
			(k = a[g].element), (k.style.top = _.Q(b)), (b += gO(k)), XK(k);
		return f;
	};
	kO = function(a, b, c) {
		for (var d = 0, e = 0, f = 0, g = a.length; f < g; ++f) {
			var h = a[f].element,
				k = fO(h),
				l = gO(h),
				m = gO(h, !0);
			h.style[b] = _.Q('top' == b ? 0 : l - m);
			d += k;
			a[f].border || (e = Math.max(l, e));
		}
		b = (c - d) / 2;
		f = 0;
		for (g = a.length; f < g; ++f)
			(h = a[f].element), (h.style.left = _.Q(b)), (b += fO(h)), XK(h);
		return e;
	};
	fO = function(a, b) {
		if (!_.Py(a)) return 0;
		b = !b && _.dy(a.getAttribute('controlWidth'));
		if (!_.fd(b) || isNaN(b)) b = a.offsetWidth;
		a = _.Vy(a);
		b += _.dy(a.marginLeft) || 0;
		return (b += _.dy(a.marginRight) || 0);
	};
	gO = function(a, b) {
		if (!_.Py(a)) return 0;
		b = !b && _.dy(a.getAttribute('controlHeight'));
		if (!_.fd(b) || isNaN(b)) b = a.offsetHeight;
		a = _.Vy(a);
		b += _.dy(a.marginTop) || 0;
		return (b += _.dy(a.marginBottom) || 0);
	};
	lO = _.p(
		'.dismissButton{background-color:#fff;border:1px solid #dadce0;color:#1a73e8;border-radius:4px;font-family:Roboto,sans-serif;font-size:14px;height:36px;cursor:pointer;padding:0 24px}.dismissButton:hover{background-color:rgba(66,133,244,0.04);border:1px solid #d2e3fc}.dismissButton:focus{background-color:rgba(66,133,244,0.12);border:1px solid #d2e3fc;outline:0}.dismissButton:hover:focus{background-color:rgba(66,133,244,0.16);border:1px solid #d2e2fd}.dismissButton:active{background-color:rgba(66,133,244,0.16);border:1px solid #d2e2fd;box-shadow:0 1px 2px 0 rgba(60,64,67,0.3),0 1px 3px 1px rgba(60,64,67,0.15)}.dismissButton:disabled{background-color:#fff;border:1px solid #f1f3f4;color:#3c4043}\n'
	);
	_.mO = function(a, b) {
		var c = document.createElement('div'),
			d = c.style;
		d.backgroundColor = 'white';
		d.fontWeight = '500';
		d.fontFamily = 'Roboto, sans-serif';
		d.padding = '15px 25px';
		d.boxSizing = 'border-box';
		d.top = '5px';
		d = document.createElement('div');
		var e = document.createElement('img');
		e.alt = '';
		e.src = _.No + 'api-3/images/google_gray.svg';
		e.style.border = e.style.margin = e.style.padding = 0;
		e.style.height = '17px';
		e.style.verticalAlign = 'middle';
		e.style.width = '52px';
		_.po(e);
		d.appendChild(e);
		c.appendChild(d);
		d = document.createElement('div');
		d.style.lineHeight = '20px';
		d.style.margin = '15px 0';
		e = document.createElement('span');
		e.style.color = 'rgba(0,0,0,0.87)';
		e.style.fontSize = '14px';
		e.innerText =
			'\u6b64\u9875\u9762\u65e0\u6cd5\u6b63\u786e\u52a0\u8f7d Google \u5730\u56fe\u3002';
		d.appendChild(e);
		c.appendChild(d);
		d = document.createElement('table');
		d.style.width = '100%';
		e = document.createElement('tr');
		var f = document.createElement('td');
		f.style.lineHeight = '16px';
		f.style.verticalAlign = 'middle';
		var g = document.createElement('a');
		QK(g, b);
		g.innerText = '\u60a8\u662f\u5426\u62e5\u6709\u6b64\u7f51\u7ad9\uff1f';
		g.target = '_blank';
		g.setAttribute('rel', 'noopener');
		g.style.color = 'rgba(0, 0, 0, 0.54)';
		g.style.fontSize = '12px';
		g.onclick = function() {
			_.ij(a, 'Dl');
		};
		f.appendChild(g);
		e.appendChild(f);
		_.Ip(lO);
		b = document.createElement('td');
		b.style.textAlign = 'right';
		f = document.createElement('button');
		f.className = 'dismissButton';
		f.innerText = '\u786e\u5b9a';
		f.onclick = function() {
			a.removeChild(c);
			_.N.trigger(a, 'dmd');
			_.ij(a, 'Dd');
		};
		b.appendChild(f);
		e.appendChild(b);
		d.appendChild(e);
		c.appendChild(d);
		a.appendChild(c);
		_.ij(a, 'D0');
		return c;
	};
	nO = function(a) {
		this.ka = a;
		this.i = 0;
		this.j = null;
		_.N.mb(a, 'keydown', this, this.W);
		_.N.mb(a, 'keypress', this, this.T);
		_.N.mb(a, 'keyup', this, this.$);
		this.o = {};
	};
	oO = function(a) {
		var b = a.get('zoom');
		_.fd(b) && a.set('zoom', b + 1);
	};
	pO = function(a) {
		var b = a.get('zoom');
		_.fd(b) && a.set('zoom', b - 1);
	};
	qO = function(a, b, c) {
		_.N.trigger(a, 'panbyfraction', b, c);
	};
	rO = function(a, b) {
		return !!(
			b.target != a.ka ||
			b.ctrlKey ||
			b.altKey ||
			b.metaKey ||
			0 == a.get('enabled') ||
			a.get('streetViewDisable')
		);
	};
	sO = _.n();
	_.Gb.prototype.i = _.ul(8, _.p(1));
	_.Rb.prototype.i = _.ul(7, _.pa('o'));
	_.jx.prototype.i = _.ul(6, _.p(1));
	var eL = {};
	_.A(iL, _.O);
	iL.prototype.changed = function(a) {
		if ('sessionState' != a) {
			a = new _.nJ();
			var b = this.get('zoom'),
				c = this.get('center'),
				d = this.get('pano');
			if ((null != b && null != c) || null != d) {
				var e = this.i;
				new _.KG(_.G(a, 1)).V[0] = _.Kc(e);
				new _.KG(_.G(a, 1)).V[1] = _.F(e, 1);
				e = _.LJ(a);
				var f = this.get('mapTypeId');
				'hybrid' == f || 'satellite' == f
					? (e.V[0] = 3)
					: ((e.V[0] = 0),
					  'terrain' == f && ((f = new _.IG(_.G(a, 4))), _.Dc(f, 0, 4)));
				f = new _.UF(_.G(e, 1));
				f.V[0] = 2;
				if (c) {
					var g = c.lng();
					f.V[1] = g;
					c = c.lat();
					f.V[2] = c;
				}
				'number' === typeof b && (f.V[5] = b);
				f.setHeading(this.get('heading') || 0);
				d && (new _.$G(_.G(e, 2)).V[0] = d);
				this.set('sessionState', a);
			} else this.set('sessionState', null);
		}
	};
	var tO = [37, 38, 39, 40],
		uO = { 38: [0, -1], 40: [0, 1], 37: [-1, 0], 39: [1, 0] },
		vO = [];
	_.A(lL, _.kh);
	lL.prototype.listen = function(a, b, c, d) {
		Array.isArray(b) || (b && (vO[0] = b.toString()), (b = vO));
		for (var e = 0; e < b.length; e++) {
			var f = _.Ah(a, b[e], c || this.handleEvent, d || !1, this.j || this);
			if (!f) break;
			this.i[f.key] = f;
		}
		return this;
	};
	lL.prototype.xc = function() {
		lL.Zc.xc.call(this);
		oL(this);
	};
	lL.prototype.handleEvent = function() {
		throw Error('EventHandler.handleEvent not implemented');
	};
	_.A(pL, _.O);
	_.Ha(sL, _.O);
	_.A(tL, _.O);
	tL.prototype.card_changed = function() {
		var a = this.get('card');
		this.i && this.j.removeChild(this.i);
		if (a) {
			var b = (this.i = _.no('div'));
			b.style.backgroundColor = 'white';
			b.appendChild(a);
			b.style.margin = _.Q(10);
			b.style.padding = _.Q(1);
			_.ez(b, '0 1px 4px -1px rgba(0,0,0,0.3)');
			ZK(b, _.Q(2));
			this.j.appendChild(b);
			this.i = b;
		} else this.i = null;
	};
	tL.prototype.getDiv = _.pa('j');
	_.A(yL, _.LD);
	yL.prototype.fill = function(a) {
		_.JD(this, 0, _.yB(a));
	};
	var wL = 't-avKK8hDgg9Q';
	_.A(CL, _.D);
	CL.prototype.getHeading = function() {
		return _.Bc(this, 0);
	};
	CL.prototype.setHeading = function(a) {
		this.V[0] = a;
	}; /*

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
	var DL = {},
		EL = null;
	_.A(JL, _.Sh);
	JL.prototype.i = function(a) {
		SK(this, a);
	};
	_.A(KL, JL);
	KL.prototype.stop = function(a) {
		FL(this);
		this.o = 0;
		a && (this.progress = 1);
		ML(this, this.progress);
		this.i('stop');
		this.i('end');
	};
	KL.prototype.xc = function() {
		0 == this.o || this.stop(!1);
		this.i('destroy');
		KL.Zc.xc.call(this);
	};
	KL.prototype.i = function(a) {
		SK(this, new NL(a, this));
	};
	_.A(NL, _.lh);
	_.Ha(RL, _.O);
	RL.prototype.changed = function() {
		function a(d) {
			return _.Gz(_.sy(_.MD(d)));
		}
		!this.o && this.i && (this.i.stop(), (this.i = null));
		var b = this.get('pov');
		if (b) {
			var c = new CL();
			c.setHeading(_.ad(-b.heading, 0, 360));
			_.dm(
				new _.Fz(_.G(c, 2)),
				a(
					'<svg xmlns="http://www.w3.org/2000/svg" width="100px" height="100px" viewBox="0 0 100 100" >\n  <circle fill="#222222" cx="50" cy="50" r="50"/>\n  <circle fill="#595959" cx="50" cy="50" r="22"/>\n</svg>\n'
				)
			);
			_.dm(
				new _.Fz(_.G(c, 3)),
				a(
					'<svg xmlns="http://www.w3.org/2000/svg" width="40px" height="100px" viewBox="0 0 40 100">\n  <polygon fill="#C1272D" points="10,50 20,18 30,50"/>\n  <polygon fill="#D1D1D1" points="30,50 20,82 10,50"/>\n</svg>\n'
				)
			);
			_.dm(
				new _.Fz(_.G(c, 4)),
				a(
					'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="40px" height="100px" viewBox="0 0 40 100">\n  <image overflow="visible" opacity="0.75" width="65" height="109" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEEAAABtCAYAAAD+mQwIAAAACXBIWXMAAAsSAAALEgHS3X78AAAA\nGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAB4dJREFUeNrsnItu4zoMRPVK//97\n17Z0b4B4wXI5JPWwi11YgJG2SZPoaDikJNshPO1pT3va0572NKHFuz6otdbzeS3G+G9A6Oz4jwGJ\nP9B56zPb3TDiTZ33/K05gSyHES8GEJXPsiA07bmVIOJFAKSfRyEgGMtAxAsBRAVCdPhBMx6XgYg3\nAIiGIoKhAPp4CYiyECICEAEMDwRklpE8F/8fjCkQZVIFwRj595GcikAj34BffAOhpNZLleAZeQ2E\nBEECUBXF/O78e1BG1VAmVWABSAKEaECQFIBgUBDDaigLvSAIAJIAIgkq4p3lKqif/6taRhlVQ1mg\nggAUgI7zeQ1CJaMbAIjGPn9YDWWBCiwA+XMk9jwKh0oO/poKjPU3gBE1lAUqCMroZwYhC/4gGeH7\nOJR0WpXs0q2GslgFEQAoDAQNCdqx9un82clDMUPY2V41lEUqsAAUQRVRiPkz7g/heZ41JBBD3lAu\n9oLCDgohAQg7eL4pIKy1iHkIrDoMDhhZgPAif9MgpA+IaNQPDYx6t0GWThXEzoxAAbzI7wjCITxH\nDTORNIkKr26DnC2bLRVkAoCCyEJHTwi70KnKlCKBuG7uoBhiECZKWVHCF4OQAQQJTgUgkEl2hURZ\nYIjREQpf5JGHRCCp0QuhGmHRFRJlQShofkDD4ItByGwED5IZpFA4Pv9zgILr8vWE2OEFUlagEF4C\nhLOjmamDAjgEEJo3uEOidC6cRKNUzooSaFi8BE/goUABlI9KsjAZi7MhUToU0FMuF0ENXywksuAJ\nmXxpWjwVBkJSw23La976QDNGbo68RpBSJgdhqaErJIozNUZlzpCMKvElKOEFlKBB2IX5RwJq6AqJ\nckEoaMbI6wWuhMh+f3d8AxMwzRMunUpbKvAYowWBq+BFQPTAmDNGEAre5TMtJF6saNIg7KzzXgBi\nSGi+UAZ2pnpDoTA/+FIgBEEF0nQcDUBVQgIqokxkBs/skYKQJlKJFEs7M8ldmHQhY4wzFeRMikyG\nL1ggzo7xNcMqpEVpUSYrALp8oQz4wUidUJQpNYVwquA0wxfwgwyW8od8oXT6AYKTwcJqUYyShwM3\nxQLeayZVioooC/0ggUWVAo4XM8bA5goFAEjK7tbtnqCtJXhAZBYOHEJ2KCCBlet4FYSoFEvRqBlQ\nMZWYTK2lek8IdBdNZXD0PaGRjYoyCxD4TDE5j2jMcVRzLI6Oj9YLCaw78jQXWGbIYB+zp/PRWBNt\nEIKyv+DZfUL1QzKUcjbP6HtU6aoSNSVYK8qhIywieER5vQKviWBHG50CdHl2QBsyHpUk8LfgHN2o\nbAZNtRSuadqXj05lhYmR7oKTLgLQW4X2Km2JAq6EYJ2E2Rx/Q+8ThPdE36Hd4QnWlwxKRy0Qnue7\nO+tVQnOQ9X75Ch6l10in6/CfLUjDUL5BcGxeSpKUOlCNfcTZQwPiGVRXODTF1JoxonTniP9Mt9Ok\ncxMO8P8SgDoYJkNT6eY8pC98KAc9v0h7LQKiwYAm6V1U6Q0FS7oWBLquSDdbDkEdkmJQZkHZZjo7\nWGFwKJ2hO0mJzBf4uuIuvA8CUp3esCRFWmFwgC++gwOtKEmvlYAuBVFAh6MDiCV/BGIjoUD3Hs/n\n6ONuAPCYZD+Et3F8ptTNmRW02Kcd39jiahP2HTgsKTwOpy8Eb8qc8YTKwqGC+N/YlloylLApijgM\nRahFVe82XA+IqvjCJuwpShDO///1OTYjNKwCaokxtuC/MoWDkGRNt9fpIoqmhM0Iid7qsQ+C4QvB\noQQJBD9FB0H4JQCQVIDCAs0kl9UJSBGH4gcoFKoQDpsAYhv0hG+dHzpdxxESVnWIVGBB+OUMh2O2\nSDIhkJAIbAMDwdAAoDNY+e8bMUcJxuGYWHXPJr0TKM9p91XIDOXzmBmE+nmOn8e4KwBQ0TScGq9I\nkdUAwU/UpFe38BO1aFggAEtCwQOBq8AbEjvZUtvYfgHfaeJK2O4MBRMCS5VRmUkiJWRBBfwCDg5h\nV9Lk8lCYWWhFfpAYhMQ6S0NBut5hB75gFUvhynDwhEQN389UlwCga52kiz42wxS1+mDpGmNvSHA1\npCBf1WZd4XKAWaRUKC0JhRX7Dh4Q0vVMKeDLf3iW8FaKl4YDCgk+hzg3WKWRlkJBuy4SrSl41hW7\nQsENAYQEMkia98MghKNjVal7rjC72uxRQwz4Ym9uihIEtFi7bGF1GIJTDRxEEPyAhg4H1NgqlZYa\nrc2XS5TgUYN1D5Qa/rxwKwBzraOGeOn9Exxq0ACgq9coUDQX8W7MhnDTnTSQGqz7njTFD7gvWDtb\nSwxxGIJSPPERDaA+qAYEa4dbG/lb767DASBl8NdLoeBZ0vfsQt97nyVBDWgEKplrWDebsla0PSdo\nhDuVwAFYILw3ovOcASOmwpl7r83ehc86t9BzWl4wUq4E5o/X/8gN6BRvaMbreiBI6lgKYFoJHzXw\n97nzppTvMJgum3/q9qQ9EDTz+/k7cxogPGC8EJaHwCUQFBAWnODs+CUAlkNwwPB85t998+pOGO63\n+StvY74AyK03tH/a0572tKc97WlPQ+0/AQYALf6OfNkZY7AAAAAASUVORK5CYII=" transform="matrix(0.9846 0 0 0.9908 -11.6 -3.6)"/>\n  <polygon fill="#FFFFFF" points="20,18 10,50 20,82 30,50"/>\n  <polygon fill="#C1272D" points="10,50 20,18 30,50"/>\n  <polygon fill="#D1D1D1" points="30,50 20,82 10,50"/>\n</svg>\n'
				)
			);
			_.dm(
				new _.Fz(_.G(c, 5)),
				a(
					'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="40px" height="100px" viewBox="0 0 40 100">\n  <image overflow="visible" opacity="0.75" width="65" height="109" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEEAAABtCAYAAAD+mQwIAAAACXBIWXMAAAsSAAALEgHS3X78AAAA\nGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAB4dJREFUeNrsnItu4zoMRPVK//97\n17Z0b4B4wXI5JPWwi11YgJG2SZPoaDikJNshPO1pT3va0572NKHFuz6otdbzeS3G+G9A6Oz4jwGJ\nP9B56zPb3TDiTZ33/K05gSyHES8GEJXPsiA07bmVIOJFAKSfRyEgGMtAxAsBRAVCdPhBMx6XgYg3\nAIiGIoKhAPp4CYiyECICEAEMDwRklpE8F/8fjCkQZVIFwRj595GcikAj34BffAOhpNZLleAZeQ2E\nBEECUBXF/O78e1BG1VAmVWABSAKEaECQFIBgUBDDaigLvSAIAJIAIgkq4p3lKqif/6taRhlVQ1mg\nggAUgI7zeQ1CJaMbAIjGPn9YDWWBCiwA+XMk9jwKh0oO/poKjPU3gBE1lAUqCMroZwYhC/4gGeH7\nOJR0WpXs0q2GslgFEQAoDAQNCdqx9un82clDMUPY2V41lEUqsAAUQRVRiPkz7g/heZ41JBBD3lAu\n9oLCDgohAQg7eL4pIKy1iHkIrDoMDhhZgPAif9MgpA+IaNQPDYx6t0GWThXEzoxAAbzI7wjCITxH\nDTORNIkKr26DnC2bLRVkAoCCyEJHTwi70KnKlCKBuG7uoBhiECZKWVHCF4OQAQQJTgUgkEl2hURZ\nYIjREQpf5JGHRCCp0QuhGmHRFRJlQShofkDD4ItByGwED5IZpFA4Pv9zgILr8vWE2OEFUlagEF4C\nhLOjmamDAjgEEJo3uEOidC6cRKNUzooSaFi8BE/goUABlI9KsjAZi7MhUToU0FMuF0ENXywksuAJ\nmXxpWjwVBkJSw23La976QDNGbo68RpBSJgdhqaErJIozNUZlzpCMKvElKOEFlKBB2IX5RwJq6AqJ\nckEoaMbI6wWuhMh+f3d8AxMwzRMunUpbKvAYowWBq+BFQPTAmDNGEAre5TMtJF6saNIg7KzzXgBi\nSGi+UAZ2pnpDoTA/+FIgBEEF0nQcDUBVQgIqokxkBs/skYKQJlKJFEs7M8ldmHQhY4wzFeRMikyG\nL1ggzo7xNcMqpEVpUSYrALp8oQz4wUidUJQpNYVwquA0wxfwgwyW8od8oXT6AYKTwcJqUYyShwM3\nxQLeayZVioooC/0ggUWVAo4XM8bA5goFAEjK7tbtnqCtJXhAZBYOHEJ2KCCBlet4FYSoFEvRqBlQ\nMZWYTK2lek8IdBdNZXD0PaGRjYoyCxD4TDE5j2jMcVRzLI6Oj9YLCaw78jQXWGbIYB+zp/PRWBNt\nEIKyv+DZfUL1QzKUcjbP6HtU6aoSNSVYK8qhIywieER5vQKviWBHG50CdHl2QBsyHpUk8LfgHN2o\nbAZNtRSuadqXj05lhYmR7oKTLgLQW4X2Km2JAq6EYJ2E2Rx/Q+8ThPdE36Hd4QnWlwxKRy0Qnue7\nO+tVQnOQ9X75Ch6l10in6/CfLUjDUL5BcGxeSpKUOlCNfcTZQwPiGVRXODTF1JoxonTniP9Mt9Ok\ncxMO8P8SgDoYJkNT6eY8pC98KAc9v0h7LQKiwYAm6V1U6Q0FS7oWBLquSDdbDkEdkmJQZkHZZjo7\nWGFwKJ2hO0mJzBf4uuIuvA8CUp3esCRFWmFwgC++gwOtKEmvlYAuBVFAh6MDiCV/BGIjoUD3Hs/n\n6ONuAPCYZD+Et3F8ptTNmRW02Kcd39jiahP2HTgsKTwOpy8Eb8qc8YTKwqGC+N/YlloylLApijgM\nRahFVe82XA+IqvjCJuwpShDO///1OTYjNKwCaokxtuC/MoWDkGRNt9fpIoqmhM0Iid7qsQ+C4QvB\noQQJBD9FB0H4JQCQVIDCAs0kl9UJSBGH4gcoFKoQDpsAYhv0hG+dHzpdxxESVnWIVGBB+OUMh2O2\nSDIhkJAIbAMDwdAAoDNY+e8bMUcJxuGYWHXPJr0TKM9p91XIDOXzmBmE+nmOn8e4KwBQ0TScGq9I\nkdUAwU/UpFe38BO1aFggAEtCwQOBq8AbEjvZUtvYfgHfaeJK2O4MBRMCS5VRmUkiJWRBBfwCDg5h\nV9Lk8lCYWWhFfpAYhMQ6S0NBut5hB75gFUvhynDwhEQN389UlwCga52kiz42wxS1+mDpGmNvSHA1\npCBf1WZd4XKAWaRUKC0JhRX7Dh4Q0vVMKeDLf3iW8FaKl4YDCgk+hzg3WKWRlkJBuy4SrSl41hW7\nQsENAYQEMkia98MghKNjVal7rjC72uxRQwz4Ym9uihIEtFi7bGF1GIJTDRxEEPyAhg4H1NgqlZYa\nrc2XS5TgUYN1D5Qa/rxwKwBzraOGeOn9Exxq0ACgq9coUDQX8W7MhnDTnTSQGqz7njTFD7gvWDtb\nSwxxGIJSPPERDaA+qAYEa4dbG/lb767DASBl8NdLoeBZ0vfsQt97nyVBDWgEKplrWDebsla0PSdo\nhDuVwAFYILw3ovOcASOmwpl7r83ehc86t9BzWl4wUq4E5o/X/8gN6BRvaMbreiBI6lgKYFoJHzXw\n97nzppTvMJgum3/q9qQ9EDTz+/k7cxogPGC8EJaHwCUQFBAWnODs+CUAlkNwwPB85t998+pOGO63\n+StvY74AyK03tH/a0572tKc97WlPQ+0/AQYALf6OfNkZY7AAAAAASUVORK5CYII=" transform="matrix(0.9846 0 0 0.9908 -11.6 -3.6)"/>\n  <polygon fill="#FFFFFF" points="20,18 10,50 20,82 30,50"/>\n  <polygon fill="#E53935" points="10,50 20,18 30,50"/>\n  <polygon fill="#D1D1D1" points="30,50 20,82 10,50"/>\n</svg>\n'
				)
			);
			_.dm(
				new _.Fz(_.G(c, 6)),
				a(
					'<svg xmlns="http://www.w3.org/2000/svg" width="30px" height="100px" viewBox="0 0 30 100">\n  <path fill="#666" d="M24.84,69.76L24,58l-4.28,2.34C18.61,57.09,18,53.62,18,50c0-6.17,1.75-11.93,4.78-16.82l-2.5-1.66C16.94,36.88,15,43.21,15,50c0,4.14,0.72,8.11,2.04,11.79L13,64l7.7,5.13L25,72L24.84,69.76z"/>\n</svg>\n'
				)
			);
			_.dm(
				new _.Fz(_.G(c, 7)),
				a(
					'<svg xmlns="http://www.w3.org/2000/svg" width="30px" height="100px" viewBox="0 0 30 100">\n  <path fill="#B1B1B1" d="M24.84,69.76L24,58l-4.28,2.34C18.61,57.09,18,53.62,18,50c0-6.17,1.75-11.93,4.78-16.82l-2.5-1.66C16.94,36.88,15,43.21,15,50c0,4.14,0.72,8.11,2.04,11.79L13,64l7.7,5.13L25,72L24.84,69.76z"/>\n</svg>\n'
				)
			);
			_.dm(
				new _.Fz(_.G(c, 8)),
				a(
					'<svg xmlns="http://www.w3.org/2000/svg" width="30px" height="100px" viewBox="0 0 30 100">\n  <path fill="#E4E4E4" d="M24.84,69.76L24,58l-4.28,2.34C18.61,57.09,18,53.62,18,50c0-6.17,1.75-11.93,4.78-16.82l-2.5-1.66C16.94,36.88,15,43.21,15,50c0,4.14,0.72,8.11,2.04,11.79L13,64l7.7,5.13L25,72L24.84,69.76z"/>\n</svg>\n'
				)
			);
			_.rE(this.j, [c]);
		}
	};
	RL.prototype.mapSize_changed = function() {
		SL(this);
	};
	RL.prototype.disableDefaultUI_changed = function() {
		SL(this);
	};
	RL.prototype.panControl_changed = function() {
		SL(this);
	};
	var $L = Object.freeze([
			'exitFullscreen',
			'webkitExitFullscreen',
			'mozCancelFullScreen',
			'msExitFullscreen'
		]),
		aM = Object.freeze([
			'fullscreenchange',
			'webkitfullscreenchange',
			'mozfullscreenchange',
			'MSFullscreenChange'
		]),
		WL = Object.freeze([
			'fullscreenEnabled',
			'webkitFullscreenEnabled',
			'mozFullScreenEnabled',
			'msFullscreenEnabled'
		]),
		bM = Object.freeze([
			'requestFullscreen',
			'webkitRequestFullscreen',
			'mozRequestFullScreen',
			'msRequestFullscreen'
		]);
	_.Ha(dM, _.O);
	var cM = [
		{ Kl: -52, close: -78, top: -86, backgroundColor: '#fff' },
		{ Kl: 0, close: -26, top: -86, backgroundColor: '#222' }
	];
	eM.prototype.add = function(a) {
		this.i.appendChild(a);
		a.style.position = 'absolute';
		a = { element: a };
		this.j.push(a);
		a.Kh = _.N.addListener(a.element, 'resize', (0, _.y)(this.o, this, a));
		this.o(a);
	};
	eM.prototype.remove = function(a) {
		this.i.removeChild(a);
		UK(
			this.j,
			(0, _.y)(function(b, c) {
				b.element == a &&
					(this.j.splice(c, 1),
					b && (this.o(b), b.Kh && (_.N.removeListener(b.Kh), delete b.Kh)));
			}, this)
		);
	};
	eM.prototype.o = function(a) {
		a.width = _.dy(a.element.getAttribute('controlWidth'));
		a.height = _.dy(a.element.getAttribute('controlHeight'));
		a.width || (a.width = a.element.offsetWidth);
		a.height || (a.height = a.element.offsetHeight);
		var b = 0;
		_.B(this.j, function(h) {
			var k = h.element;
			_.Py(k) && 'hidden' != k.style.visibility && (b = Math.max(b, h.width));
		});
		var c = 0,
			d = this.T,
			e = !1;
		this.H(function(h) {
			var k = h.element;
			_.Py(k) &&
				'hidden' != k.style.visibility &&
				(e ? (c += d) : (e = !0),
				(k = k.style),
				(k.left = _.Q((b - h.width) / 2)),
				(k.top = _.Q(c)),
				(c += h.height));
		});
		a = this.i;
		var f = b,
			g = c;
		a.setAttribute('controlWidth', f);
		a.setAttribute('controlHeight', g);
		_.My(this.i, f || g);
		_.N.trigger(this.i, 'resize');
	};
	_.MD(
		'<svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22"><style>.st0{filter:url(#Adobe_OpacityMaskFilter);} .st1{fill:#FFFFFF;} .st2{mask:url(#b);fill:#666666;}</style><title>My Location 4</title><g transform="translate(1 1)"><defs><filter id="Adobe_OpacityMaskFilter" filterUnits="userSpaceOnUse" x="-1" y="-1" width="22" height="22"><feColorMatrix values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"/></filter></defs><mask maskUnits="userSpaceOnUse" x="-1" y="-1" width="22" height="22" id="b"><g class="st0"><path id="a" class="st1" d="M21 21H-1V-1h22v22z"/></g></mask><path class="st2" d="M10 17c-3.9 0-7-3.1-7-7s3.1-7 7-7 7 3.1 7 7-3.1 7-7 7zm8.9-8c-.5-4.2-3.7-7.4-7.9-7.9V-1H9v2.1C4.8 1.6 1.6 4.8 1.1 9H-1v2h2.1c.5 4.2 3.7 7.4 7.9 7.9V21h2v-2.1c4.2-.5 7.4-3.7 7.9-7.9H21V9h-2.1zM10 6c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4z"/></g></svg>\n'
	);
	_.MD(
		'<svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22"><style>.st0{filter:url(#Adobe_OpacityMaskFilter);} .st1{fill:#FFFFFF;} .st2{mask:url(#b);fill:#333333;}</style><title>My Location 5</title><g transform="translate(1 1)"><defs><filter id="Adobe_OpacityMaskFilter" filterUnits="userSpaceOnUse" x="-1" y="-1" width="22" height="22"><feColorMatrix values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"/></filter></defs><mask maskUnits="userSpaceOnUse" x="-1" y="-1" width="22" height="22" id="b"><g class="st0"><path id="a" class="st1" d="M21 21H-1V-1h22v22z"/></g></mask><path class="st2" d="M10 17c-3.9 0-7-3.1-7-7s3.1-7 7-7 7 3.1 7 7-3.1 7-7 7zm8.9-8c-.5-4.2-3.7-7.4-7.9-7.9V-1H9v2.1C4.8 1.6 1.6 4.8 1.1 9H-1v2h2.1c.5 4.2 3.7 7.4 7.9 7.9V21h2v-2.1c4.2-.5 7.4-3.7 7.9-7.9H21V9h-2.1zM10 6c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4z"/></g></svg>\n'
	);
	_.MD(
		'<svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22"><style>.st0{filter:url(#Adobe_OpacityMaskFilter);} .st1{fill:#FFFFFF;} .st2{mask:url(#b);fill:#111111;}</style><title>My Location 6</title><g transform="translate(1 1)"><defs><filter id="Adobe_OpacityMaskFilter" filterUnits="userSpaceOnUse" x="-1" y="-1" width="22" height="22"><feColorMatrix values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"/></filter></defs><mask maskUnits="userSpaceOnUse" x="-1" y="-1" width="22" height="22" id="b"><g class="st0"><path id="a" class="st1" d="M21 21H-1V-1h22v22z"/></g></mask><path class="st2" d="M10 17c-3.9 0-7-3.1-7-7s3.1-7 7-7 7 3.1 7 7-3.1 7-7 7zm8.9-8c-.5-4.2-3.7-7.4-7.9-7.9V-1H9v2.1C4.8 1.6 1.6 4.8 1.1 9H-1v2h2.1c.5 4.2 3.7 7.4 7.9 7.9V21h2v-2.1c4.2-.5 7.4-3.7 7.9-7.9H21V9h-2.1zM10 6c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4z"/></g></svg>\n'
	);
	_.MD(
		'<svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22"><style>.st0{filter:url(#Adobe_OpacityMaskFilter);} .st1{fill:#FFFFFF;} .st2{mask:url(#b);fill:#B3B3B3;}</style><title>My Location 3</title><g transform="translate(1 1)"><defs><filter id="Adobe_OpacityMaskFilter" filterUnits="userSpaceOnUse" x="-1" y="-1" width="22" height="22"><feColorMatrix values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"/></filter></defs><mask maskUnits="userSpaceOnUse" x="-1" y="-1" width="22" height="22" id="b"><g class="st0"><path id="a" class="st1" d="M21 10v11H-1V-1h22v11z"/></g></mask><path class="st2" d="M10 17c-3.9 0-7-3.1-7-7s3.1-7 7-7 7 3.1 7 7-3.1 7-7 7zm8.9-8c-.5-4.2-3.7-7.4-7.9-7.9V-1H9v2.1C4.8 1.6 1.6 4.8 1.1 9H-1v2h2.1c.5 4.2 3.7 7.4 7.9 7.9V21h2v-2.1c4.2-.5 7.4-3.7 7.9-7.9H21V9h-2.1zM10 6c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4z"/></g></svg>\n'
	);
	_.MD(
		'<svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22"><style>.st0{fill:#E6E6E6;}</style><title>My Location 2</title><path class="st0" d="M10 3h2V0h-2v3zm9 9h3v-2h-3v2zM0 12h3v-2H0v2zm10 10h2v-3h-2v3z"/><path class="st0" d="M11 18c-3.9 0-7-3.1-7-7s3.1-7 7-7 7 3.1 7 7-3.1 7-7 7m0-16c-5 0-9 4-9 9s4 9 9 9 9-4 9-9-4-9-9-9"/><path class="st0" d="M11 7c2.2 0 4 1.8 4 4s-1.8 4-4 4-4-1.8-4-4 1.8-4 4-4"/></svg>\n'
	);
	_.MD(
		'<svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22"><style>.st0{filter:url(#Adobe_OpacityMaskFilter);} .st1{fill:#FFFFFF;} .st2{mask:url(#b);fill:#FFFFFF;}</style><title>My Location 1</title><g transform="translate(1 1)"><defs><filter id="Adobe_OpacityMaskFilter" filterUnits="userSpaceOnUse" x="-1" y="-1" width="22" height="22"><feColorMatrix values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"/></filter></defs><mask maskUnits="userSpaceOnUse" x="-1" y="-1" width="22" height="22" id="b"><g class="st0"><path id="a" class="st1" d="M21 21H-1V-1h22v22z"/></g></mask><path class="st2" d="M10 17c-3.9 0-7-3.1-7-7s3.1-7 7-7 7 3.1 7 7-3.1 7-7 7zm8.9-8c-.5-4.2-3.7-7.4-7.9-7.9V-1H9v2.1C4.8 1.6 1.6 4.8 1.1 9H-1v2h2.1c.5 4.2 3.7 7.4 7.9 7.9V21h2v-2.1c4.2-.5 7.4-3.7 7.9-7.9H21V9h-2.1zM10 6c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4z"/></g></svg>\n'
	);
	_.MD(
		'<svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22"><style>.st0{filter:url(#Adobe_OpacityMaskFilter);} .st1{fill:#FFFFFF;} .st2{mask:url(#b);fill:#4285F4;}</style><title>My Location Blue 1</title><g transform="translate(1 1)"><defs><filter id="Adobe_OpacityMaskFilter" filterUnits="userSpaceOnUse" x="-1" y="-1" width="22" height="22"><feColorMatrix values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"/></filter></defs><mask maskUnits="userSpaceOnUse" x="-1" y="-1" width="22" height="22" id="b"><g class="st0"><path id="a" class="st1" d="M21 21H-1V-1h22v22z"/></g></mask><path class="st2" d="M10 17c-3.9 0-7-3.1-7-7s3.1-7 7-7 7 3.1 7 7-3.1 7-7 7zm8.9-8c-.5-4.2-3.7-7.4-7.9-7.9V-1H9v2.1C4.8 1.6 1.6 4.8 1.1 9H-1v2h2.1c.5 4.2 3.7 7.4 7.9 7.9V21h2v-2.1c4.2-.5 7.4-3.7 7.9-7.9H21V9h-2.1zM10 6c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4z"/></g></svg>\n'
	);
	_.MD(
		'<svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22"><style>.st0{filter:url(#Adobe_OpacityMaskFilter);} .st1{fill:#FFFFFF;} .st2{mask:url(#b);fill:#3367D6;}</style><title>My Location Blue 2</title><g transform="translate(1 1)"><defs><filter id="Adobe_OpacityMaskFilter" filterUnits="userSpaceOnUse" x="-1" y="-1" width="22" height="22"><feColorMatrix values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"/></filter></defs><mask maskUnits="userSpaceOnUse" x="-1" y="-1" width="22" height="22" id="b"><g class="st0"><path id="a" class="st1" d="M21 21H-1V-1h22v22z"/></g></mask><path class="st2" d="M10 17c-3.9 0-7-3.1-7-7s3.1-7 7-7 7 3.1 7 7-3.1 7-7 7zm8.9-8c-.5-4.2-3.7-7.4-7.9-7.9V-1H9v2.1C4.8 1.6 1.6 4.8 1.1 9H-1v2h2.1c.5 4.2 3.7 7.4 7.9 7.9V21h2v-2.1c4.2-.5 7.4-3.7 7.9-7.9H21V9h-2.1zM10 6c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4z"/></g></svg>\n'
	);
	_.MD(
		'<svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22"><style>.st0{filter:url(#Adobe_OpacityMaskFilter);} .st1{fill:#FFFFFF;} .st2{mask:url(#b);fill:#2A56C6;}</style><title>My Location Blue 3</title><g transform="translate(1 1)"><defs><filter id="Adobe_OpacityMaskFilter" filterUnits="userSpaceOnUse" x="-1" y="-1" width="22" height="22"><feColorMatrix values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"/></filter></defs><mask maskUnits="userSpaceOnUse" x="-1" y="-1" width="22" height="22" id="b"><g class="st0"><path id="a" class="st1" d="M21 21H-1V-1h22v22z"/></g></mask><path class="st2" d="M10 17c-3.9 0-7-3.1-7-7s3.1-7 7-7 7 3.1 7 7-3.1 7-7 7zm8.9-8c-.5-4.2-3.7-7.4-7.9-7.9V-1H9v2.1C4.8 1.6 1.6 4.8 1.1 9H-1v2h2.1c.5 4.2 3.7 7.4 7.9 7.9V21h2v-2.1c4.2-.5 7.4-3.7 7.9-7.9H21V9h-2.1zM10 6c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4z"/></g></svg>\n'
	);
	_.A(gM, _.O);
	gM.prototype.changed = function(a) {
		if ('url' != a)
			if (this.get('pano'))
				(c = this.get('pov')),
					(b = this.get('position')),
					c &&
						b &&
						((a = _.bK(c, b, this.get('pano'), this.i)), this.set('url', a));
			else {
				a = {};
				if ((c = this.get('center')))
					(c = new _.L(c.lat(), c.lng())), (a.ll = c.toUrlValue());
				c = this.get('zoom');
				_.fd(c) && (a.z = c);
				c = this.get('mapTypeId');
				'terrain' == c ? (b = 'p') : 'hybrid' == c ? (b = 'h') : (b = _.Rt[c]);
				b && (a.t = b);
				if ((c = this.get('pano'))) {
					a.z = 17;
					a.layer = 'c';
					var b = this.get('position');
					b && (a.cbll = b.toUrlValue());
					a.panoid = c;
					var c = this.get('pov');
					c &&
						(a.cbp =
							'12,' + c.heading + ',,' + Math.max(c.zoom - 3) + ',' + -c.pitch);
				}
				a.hl = _.Kc(_.Lc(_.H));
				a.gl = _.F(_.Lc(_.H), 1);
				45 == this.get('tilt') && (a.deg = this.get('heading') || 0);
				a.mapclient = _.Pg[35] ? 'embed' : 'apiv3';
				var d = [];
				_.Yc(a, function(e, f) {
					d.push(e + '=' + f);
				});
				this.set('url', this.i + '?' + d.join('&'));
			}
	};
	hM.prototype.getDiv = _.pa('o');
	hM.prototype.setUrl = function(a) {
		a
			? (this.j.setAttribute('href', a),
			  this.j.setAttribute(
					'title',
					'\u5728 Google \u5730\u56fe\u4e2d\u6253\u5f00\u6b64\u533a\u57df\uff08\u4f1a\u6253\u5f00\u4e00\u4e2a\u65b0\u7a97\u53e3\uff09'
			  ))
			: (this.j.removeAttribute('title'), this.j.removeAttribute('href'));
	};
	_.Ha(lM, _.O);
	_.Ha(oM, _.O);
	oM.prototype.Hb = _.pa('i');
	_.A(sM, _.O);
	_.A(tM, _.O);
	_.A(uM, _.O);
	_.A(wM, _.O);
	wM.prototype.j = function() {
		var a = this.i;
		a.timeout && (window.clearTimeout(a.timeout), (a.timeout = null));
	};
	wM.prototype.active_changed = function() {
		this.j();
		if (this.get('active')) xM(this);
		else {
			var a = this.i;
			a.listeners &&
				(_.B(a.listeners, _.N.removeListener), (a.listeners = null));
			_.Ny(a);
		}
	};
	_.Ha(BM, _.O);
	_.Ha(DM, _.O);
	DM.prototype.mapSize_changed = function() {
		EM(this);
	};
	DM.prototype.display_changed = function() {
		EM(this);
	};
	_.A(FM, _.O);
	FM.prototype.changed = function(a) {
		if (!this.i)
			if ('mapTypeId' == a) {
				a = this.get('mapTypeId');
				var b = this.j[a];
				b && b.mapTypeId && (a = b.mapTypeId);
				GM(this, 'internalMapTypeId', a);
				b && b.mf && GM(this, b.mf, b.value);
			} else HM(this);
	};
	_.Ha(KM, _.O);
	KM.prototype.W = function() {
		var a = +this.get('heading') || 0;
		this.set('heading', (a + 270) % 360);
	};
	KM.prototype.ka = function() {
		this.o = !this.o;
		this.set('tilt', this.o ? 45 : 0);
	};
	_.A(LM, _.O);
	var PM = {},
		EO = (PM[0] = {});
	EO.backgroundColor = '#fff';
	EO.Ni = '#e6e6e6';
	var FO = (PM[1] = {});
	FO.backgroundColor = '#222';
	FO.Ni = '#1a1a1a';
	_.Ha(QM, _.O);
	_.A(RM, _.O);
	RM.prototype.getDiv = _.pa('i');
	_.A(TM, _.O);
	_.r = TM.prototype;
	_.r.hide_changed = function() {
		var a = !this.get('hide');
		_.My(this.i, a);
		this.uh();
		a && _.dz();
	};
	_.r.uh = function() {
		this.set('width', _.Xg(this.j).width);
	};
	_.r.mapTypeId_changed = function() {
		'streetview' == this.get('mapTypeId') &&
			(_.eK(this.i), (this.o.style.color = '#fff'));
	};
	_.r.fontLoaded_changed = TM.prototype.uh;
	_.r.getDiv = _.pa('i');
	_.A(XM, _.O);
	_.r = XM.prototype;
	_.r.fontLoaded_changed = XM.prototype.size_changed = function() {
		WM(this);
	};
	_.r.attributionText_changed = function() {
		_.Fy(this.T, YM(this));
		WM(this);
	};
	_.r.Fh = function() {
		this.H = VM(this);
		WM(this);
	};
	_.r.rmiWidth_changed = XM.prototype.Fh;
	_.r.tosWidth_changed = XM.prototype.Fh;
	_.r.scaleWidth_changed = XM.prototype.Fh;
	_.r.hide_changed = function() {
		var a = !this.get('hide');
		_.My(this.i, a);
		a && _.dz();
	};
	_.r.mapTypeId_changed = function() {
		'streetview' == this.get('mapTypeId') && _.eK(this.W);
	};
	_.r.getDiv = _.pa('i');
	_.A(cN, _.O);
	cN.prototype.visible_changed = function() {
		this.get('visible') ? (_.dz(), _.Oy(this.i)) : _.Ny(this.i);
	};
	cN.prototype.attributionText_changed = function() {
		var a = this.get('attributionText') || '';
		_.Ly(this.j, a);
		a || _.Ny(this.i);
	};
	cN.prototype.size_changed = function() {
		bN(this);
	};
	_.A(dN, _.O);
	dN.prototype.attributionText_changed = function() {
		var a = this.get('attributionText') || '';
		_.jo(this.j, a);
	};
	dN.prototype.hide_changed = function() {
		var a = !this.get('hide');
		_.My(this.i, a);
		a && _.dz();
	};
	dN.prototype.getDiv = _.pa('i');
	_.A(eN, _.O);
	_.A(fN, _.O);
	fN.prototype.floors_changed = function() {
		var a = this.get('floorId'),
			b = this.get('floors'),
			c = this.o;
		if (1 < _.Xc(b)) {
			_.Oy(c);
			_.B(this.i, function(g) {
				_.Vn(g);
			});
			this.i = [];
			for (var d = b.length, e = d - 1; 0 <= e; --e) {
				var f = _.no('div', c);
				b[e].Qg == a
					? ((f.style.color = '#aaa'),
					  (f.style.fontWeight = 'bold'),
					  (f.style.backgroundColor = '#333'))
					: (gN(this, f, b[e].An),
					  (f.style.color = '#999'),
					  (f.style.fontWeight = '400'),
					  (f.style.backgroundColor = '#222'));
				f.style.padding = '5px';
				e == d - 1
					? $K(f, _.Q(_.iK(this.j)))
					: 0 == e && aL(f, _.Q(_.iK(this.j)));
				_.io(b[e].Yk, f);
				f.setAttribute('title', b[e].description);
				this.i.push(f);
			}
			setTimeout(function() {
				_.N.trigger(c, 'resize');
			});
		} else _.Ny(c);
	};
	_.Ha(kN, _.O);
	kN.prototype.W = function() {
		1 == this.get('mode') && this.set('mode', 2);
	};
	kN.prototype.$ = function() {
		2 == this.get('mode') && this.set('mode', 1);
	};
	var sN = '<svg xmlns="http://www.w3.org/2000/svg" width="60px" height="60px" viewBox="0 0 60 60">\n  <path opacity="0.3" fill="#111111" enable-background="new    " d="M30.6,27.19c-11.24,0-20.35,6.46-20.35,14.42\n    s9.11,14.42,20.35,14.42s20.35-6.46,20.35-14.42S41.84,27.19,30.6,27.19z M30.48,55.03c-10.75,0-19.47-6.06-19.47-13.53\n    s8.72-13.53,19.47-13.53s19.47,6.06,19.47,13.53S41.23,55.03,30.48,55.03z"/>\n  <ellipse opacity="0.1" fill="#111111" enable-background="new    " cx="30.48" cy="41.5" rx="19.47" ry="13.53"/>\n  <path fill="#FFFFFF" d="M35.16,40.25c-0.04,0-0.09-0.01-0.13-0.02c-1.06-0.28-4.04-1.01-5.03-1.01c-0.88,0-3.66,0.64-4.66,0.89\n    c-0.19,0.05-0.38-0.02-0.51-0.17c-0.12-0.15-0.15-0.35-0.07-0.53l4.78-10.24c0.08-0.17,0.25-0.29,0.45-0.29\n    c0.14,0,0.37,0.11,0.45,0.28l5.16,10.37c0.09,0.18,0.06,0.39-0.06,0.54C35.45,40.19,35.3,40.25,35.16,40.25z M30,38.22\n    c0.9,0,2.96,0.47,4.22,0.78l-4.21-8.46l-3.9,8.36C27.3,38.62,29.2,38.22,30,38.22z"/>\n  <path fill="#3F3F3F" d="M25.22,39.62c0,0,3.64-0.9,4.78-0.9c1.16,0,5.16,1.03,5.16,1.03L30,29.39L25.22,39.62z"/>\n</svg>\n;<svg xmlns="http://www.w3.org/2000/svg" width="60px" height="60px" viewBox="0 0 60 60">\n  <path opacity="0.3" fill="#111111" enable-background="new    " d="M30.6,27.19c-11.24,0-20.35,6.46-20.35,14.42\n    s9.11,14.42,20.35,14.42s20.35-6.46,20.35-14.42S41.84,27.19,30.6,27.19z M30.48,55.03c-10.75,0-19.47-6.06-19.47-13.53\n    s8.72-13.53,19.47-13.53s19.47,6.06,19.47,13.53S41.23,55.03,30.48,55.03z"/>\n  <ellipse opacity="0.1" fill="#111111" enable-background="new    " cx="30.48" cy="41.5" rx="19.47" ry="13.53"/>\n  <path fill="#FFFFFF" d="M34.82,41.4c-0.21,0-0.39-0.13-0.47-0.32c-0.58-1.56-1.42-3.02-1.79-3.13c-0.42-0.13-2.39,0.7-4.22,1.77\n    c-0.21,0.12-0.48,0.08-0.63-0.11c-0.16-0.18-0.16-0.45-0.01-0.64L35.9,29c0.14-0.17,0.38-0.23,0.58-0.14\n    c0.2,0.09,0.33,0.3,0.3,0.52l-1.46,11.59c-0.03,0.23-0.21,0.41-0.44,0.43C34.85,41.39,34.83,41.4,34.82,41.4z M32.51,36.94\n    c0.13,0,0.24,0.01,0.34,0.04c0.62,0.19,1.24,1.13,1.7,2.05l1.02-8.07l-5.54,6.74C30.93,37.29,31.87,36.94,32.51,36.94z"/>\n  <path fill="#3F3F3F" d="M34.82,40.9c0,0-1.09-3.12-2.11-3.43c-1.02-0.31-4.62,1.82-4.62,1.82l8.2-9.97\n    C36.29,29.32,34.82,40.9,34.82,40.9z"/>\n</svg>\n;<svg xmlns="http://www.w3.org/2000/svg" width="60px" height="60px" viewBox="0 0 60 60">\n  <path opacity="0.3" fill="#111111" enable-background="new    " d="M30.6,27.19c-11.24,0-20.35,6.46-20.35,14.42\n    s9.11,14.42,20.35,14.42s20.35-6.46,20.35-14.42C50.95,33.64,41.84,27.19,30.6,27.19z M30.48,55.03\n    c-10.75,0-19.47-6.06-19.47-13.53s8.72-13.53,19.47-13.53s19.47,6.06,19.47,13.53S41.23,55.03,30.48,55.03z"/>\n  <ellipse opacity="0.1" fill="#111111" enable-background="new    " cx="30.48" cy="41.5" rx="19.47" ry="13.53"/>\n  <path fill="#FFFFFF" d="M35.45,41.88c-0.04,0-0.08,0-0.12-0.01c-0.18-0.04-0.32-0.18-0.36-0.36c-0.12-0.44-0.52-1.68-1-2.16\n    c-0.31-0.31-2.4-0.5-4.56-0.42c-0.25,0.02-0.46-0.16-0.51-0.4c-0.05-0.24,0.08-0.48,0.3-0.57l13.95-5.63\n    c0.22-0.09,0.47-0.01,0.6,0.18s0.12,0.45-0.04,0.62l-7.88,8.59C35.73,41.82,35.59,41.88,35.45,41.88L35.45,41.88z M31.9,37.94\n    c1.16,0.07,2.34,0.26,2.77,0.69c0.44,0.44,0.78,1.19,1,1.77l5.81-6.33C41.48,34.07,31.9,37.94,31.9,37.94z"/>\n  <path fill="#3F3F3F" d="M35.45,41.38c0,0-0.38-1.63-1.13-2.39c-0.75-0.75-4.93-0.57-4.93-0.57l13.95-5.63L35.45,41.38L35.45,41.38z\n    "/>\n</svg>\n;<svg xmlns="http://www.w3.org/2000/svg" width="60px" height="60px" viewBox="0 0 60 60">\n  <path opacity="0.3" fill="#111111" enable-background="new    " d="M30.6,27.19c-11.24,0-20.35,6.46-20.35,14.42\n    s9.11,14.42,20.35,14.42s20.35-6.46,20.35-14.42S41.84,27.19,30.6,27.19z M30.48,55.03c-10.75,0-19.47-6.06-19.47-13.53\n    s8.72-13.53,19.47-13.53s19.47,6.06,19.47,13.53S41.23,55.03,30.48,55.03z"/>\n  <ellipse opacity="0.1" fill="#111111" enable-background="new    " cx="30.48" cy="41.5" rx="19.47" ry="13.53"/>\n  <path fill="#FFFFFF" d="M34.92,42.6c-0.11,0-0.22-0.04-0.32-0.11c-0.15-0.12-0.21-0.31-0.17-0.49c0-0.01,0.17-0.84-0.01-1.83\n    c-0.08-0.43-1.23-1.06-2.26-1.39c-0.23-0.07-0.37-0.29-0.35-0.53c0.02-0.24,0.21-0.42,0.44-0.45l15.03-1.64\n    c0.24-0.03,0.47,0.13,0.54,0.37c0.06,0.24-0.06,0.49-0.28,0.59l-12.42,5.44C35.06,42.59,34.99,42.6,34.92,42.6L34.92,42.6z\n     M34.19,38.6c0.58,0.36,1.1,0.82,1.21,1.39c0.09,0.49,0.11,0.95,0.1,1.32l8.65-3.79L34.19,38.6L34.19,38.6z"/>\n  <path fill="#3F3F3F" d="M34.92,42.1c0,0,0.22-0.92-0.01-2.03c-0.22-1.04-2.6-1.78-2.6-1.78l15.03-1.64L34.92,42.1z"/>\n</svg>\n;<svg xmlns="http://www.w3.org/2000/svg" width="60px" height="60px" viewBox="0 0 60 60">\n  <path opacity="0.3" fill="#111111" enable-background="new    " d="M30.6,27.19c-11.24,0-20.35,6.46-20.35,14.42\n    s9.11,14.42,20.35,14.42s20.35-6.46,20.35-14.42S41.84,27.19,30.6,27.19z M30.48,55.03c-10.75,0-19.47-6.06-19.47-13.53\n    s8.72-13.53,19.47-13.53s19.47,6.06,19.47,13.53S41.23,55.03,30.48,55.03z"/>\n  <ellipse opacity="0.1" fill="#111111" enable-background="new    " cx="30.48" cy="41.5" rx="19.47" ry="13.53"/>\n  <path fill="#FFFFFF" d="M33.69,43.9c-0.19,0-0.36-0.1-0.45-0.27c-0.1-0.19-0.06-0.42,0.08-0.57c0.01-0.01,0.76-0.81,1.19-1.75\n    c0.29-0.63-0.76-1.38-0.77-1.39c-0.19-0.13-0.26-0.38-0.18-0.59s0.3-0.34,0.53-0.32l14.81,1.91c0.25,0.03,0.44,0.24,0.44,0.5\n    c0,0.25-0.19,0.46-0.44,0.5l-15.16,1.99C33.73,43.89,33.71,43.9,33.69,43.9L33.69,43.9z M35.32,40.17c0.25,0.46,0.36,1,0.11,1.55\n    c-0.17,0.37-0.38,0.73-0.59,1.03l10.13-1.33L35.32,40.17z"/>\n  <path fill="#3F3F3F" d="M33.69,43.4c0,0,0.81-0.86,1.28-1.89c0.47-1.03-0.94-2.01-0.94-2.01l14.81,1.91L33.69,43.4L33.69,43.4z"/>\n</svg>\n;<svg xmlns="http://www.w3.org/2000/svg" width="60px" height="60px" viewBox="0 0 60 60">\n  <path opacity="0.3" fill="#111111" enable-background="new    " d="M30.6,27.19c-11.24,0-20.35,6.46-20.35,14.42\n    s9.11,14.42,20.35,14.42s20.35-6.46,20.35-14.42S41.84,27.19,30.6,27.19z M30.48,55.03c-10.75,0-19.47-6.06-19.47-13.53\n    s8.72-13.53,19.47-13.53s19.47,6.06,19.47,13.53S41.23,55.03,30.48,55.03z"/>\n  <ellipse opacity="0.1" fill="#111111" enable-background="new    " cx="30.48" cy="41.5" rx="19.47" ry="13.53"/>\n  <path fill="#FFFFFF" d="M47.73,45.15l-15.9-0.08c-0.22,0-0.42-0.15-0.48-0.37s0.03-0.45,0.23-0.56c0.66-0.39,2.48-1.56,2.96-2.25\n    c0.57-0.8,0.71-2.24,0.71-2.26c0.01-0.16,0.1-0.3,0.24-0.38c0.14-0.08,0.3-0.09,0.45-0.03l11.98,4.97c0.22,0.09,0.35,0.33,0.3,0.56\n    C48.18,44.99,47.97,45.15,47.73,45.15z M33.51,44.09l11.68,0.06l-9.04-3.75c-0.11,0.59-0.34,1.45-0.79,2.08\n    C35,42.98,34.22,43.59,33.51,44.09L33.51,44.09z"/>\n  <path fill="#3F3F3F" d="M31.84,44.58c0,0,2.46-1.47,3.12-2.39c0.66-0.93,0.8-2.5,0.8-2.5l11.98,4.97\n    C47.74,44.66,31.84,44.58,31.84,44.58z"/>\n</svg>\n;<svg xmlns="http://www.w3.org/2000/svg" width="60px" height="60px" viewBox="0 0 60 60">\n  <path opacity="0.3" fill="#111111" enable-background="new    " d="M30.6,27.19c-11.24,0-20.35,6.46-20.35,14.42\n    s9.11,14.42,20.35,14.42s20.35-6.46,20.35-14.42C50.95,33.64,41.84,27.19,30.6,27.19z M30.48,55.03\n    c-10.75,0-19.47-6.06-19.47-13.53s8.72-13.53,19.47-13.53s19.47,6.06,19.47,13.53S41.23,55.03,30.48,55.03z"/>\n  <ellipse opacity="0.1" fill="#111111" enable-background="new    " cx="30.48" cy="41.5" rx="19.47" ry="13.53"/>\n  <path fill="#FFFFFF" d="M45.08,48.74c-0.04,0-0.08,0-0.11-0.01l-14.45-3.4c-0.22-0.05-0.38-0.25-0.39-0.48\n    c0-0.23,0.15-0.43,0.37-0.49c0.86-0.24,3.23-0.97,3.87-1.51c0.63-0.53,1.11-1.63,1.25-2.01c0.05-0.15,0.18-0.27,0.33-0.31\n    c0.16-0.04,0.32-0.01,0.45,0.09l8.99,7.24c0.18,0.15,0.24,0.4,0.14,0.61C45.45,48.63,45.27,48.74,45.08,48.74L45.08,48.74z\n     M32.53,44.77l10.53,2.48l-6.76-5.44c-0.26,0.54-0.7,1.31-1.28,1.8C34.53,44.01,33.47,44.44,32.53,44.77z"/>\n  <path fill="#3F3F3F" d="M30.63,44.83c0,0,3.19-0.88,4.06-1.61c0.87-0.73,1.4-2.22,1.4-2.22l8.99,7.24L30.63,44.83z"/>\n</svg>\n;<svg xmlns="http://www.w3.org/2000/svg" width="60px" height="60px" viewBox="0 0 60 60">\n  <path opacity="0.3" fill="#111111" enable-background="new    " d="M30.6,27.19c-11.24,0-20.35,6.46-20.35,14.42\n    s9.11,14.42,20.35,14.42s20.35-6.46,20.35-14.42S41.84,27.19,30.6,27.19z M30.48,55.03c-10.75,0-19.47-6.06-19.47-13.53\n    s8.72-13.53,19.47-13.53s19.47,6.06,19.47,13.53S41.23,55.03,30.48,55.03z"/>\n  <ellipse opacity="0.1" fill="#111111" enable-background="new    " cx="30.48" cy="41.5" rx="19.47" ry="13.53"/>\n  <path fill="#FFFFFF" d="M40.4,52.96c-0.09,0-0.18-0.02-0.26-0.07l-12.27-7.33c-0.19-0.12-0.29-0.35-0.22-0.56\n    c0.06-0.22,0.26-0.37,0.48-0.37c1.18,0.01,4.24-0.05,5.06-0.32c0.68-0.22,1.74-1.35,2.26-2.02c0.11-0.14,0.28-0.21,0.45-0.19\n    s0.32,0.13,0.4,0.29l4.55,9.86c0.09,0.2,0.04,0.43-0.12,0.58C40.64,52.92,40.52,52.96,40.4,52.96z M29.9,45.6l9.36,5.6l-3.54-7.68\n    c-0.55,0.61-1.42,1.47-2.21,1.73C32.83,45.48,31.2,45.57,29.9,45.6L29.9,45.6z"/>\n  <path fill="#3F3F3F" d="M28.13,45.13c0,0,4.14,0.01,5.22-0.35c1.08-0.35,2.5-2.18,2.5-2.18l4.55,9.86L28.13,45.13z"/>\n</svg>\n;<svg xmlns="http://www.w3.org/2000/svg" width="60px" height="60px" viewBox="0 0 60 60">\n  <path opacity="0.3" fill="#111111" enable-background="new    " d="M30.6,27.19c-11.24,0-20.35,6.46-20.35,14.42\n    s9.11,14.42,20.35,14.42s20.35-6.46,20.35-14.42C50.95,33.64,41.84,27.19,30.6,27.19L30.6,27.19z M30.48,55.03\n    c-10.75,0-19.47-6.06-19.47-13.53s8.72-13.53,19.47-13.53s19.47,6.06,19.47,13.53S41.23,55.03,30.48,55.03z"/>\n  <ellipse opacity="0.1" fill="#111111" enable-background="new    " cx="30.48" cy="41.5" rx="19.47" ry="13.53"/>\n  <path fill="#FFFFFF" d="M31.05,54.8c-0.18,0-0.35-0.1-0.43-0.25l-5.83-10.24c-0.1-0.17-0.08-0.38,0.03-0.54\n    c0.12-0.16,0.31-0.23,0.51-0.19c1.16,0.25,4.37,0.89,5.26,0.89c0.98,0,3.52-0.73,4.42-1.01c0.18-0.05,0.39,0,0.52,0.14\n    s0.17,0.34,0.1,0.52l-4.11,10.37c-0.07,0.18-0.24,0.3-0.43,0.31L31.05,54.8L31.05,54.8z M26.2,44.77l4.76,8.37l3.34-8.44\n    c-1.1,0.31-2.84,0.76-3.73,0.76C29.77,45.46,27.55,45.04,26.2,44.77z"/>\n  <path fill="#3F3F3F" d="M25.22,44.06c0,0,4.29,0.9,5.43,0.9c1.16,0,4.5-1.03,4.5-1.03L31.04,54.3L25.22,44.06z"/>\n</svg>\n;<svg xmlns="http://www.w3.org/2000/svg" width="60px" height="60px" viewBox="0 0 60 60">\n  <path opacity="0.3" fill="#111111" enable-background="new    " d="M30.6,27.19c-11.24,0-20.35,6.46-20.35,14.42\n    s9.11,14.42,20.35,14.42s20.35-6.46,20.35-14.42S41.84,27.19,30.6,27.19z M30.48,55.03c-10.75,0-19.47-6.06-19.47-13.53\n    s8.72-13.53,19.47-13.53s19.47,6.06,19.47,13.53S41.23,55.03,30.48,55.03z"/>\n  <ellipse opacity="0.1" fill="#111111" enable-background="new    " cx="30.48" cy="41.5" rx="19.47" ry="13.53"/>\n  <path fill="#FFFFFF" d="M20.55,52.96c-0.12,0-0.24-0.04-0.33-0.13c-0.16-0.15-0.21-0.38-0.12-0.58l4.55-9.86\n    c0.07-0.16,0.22-0.27,0.4-0.29c0.17-0.02,0.35,0.05,0.45,0.19c0.37,0.48,1.49,1.76,2.26,2.02c0.82,0.27,3.93,0.32,5.06,0.32\n    c0.22,0,0.42,0.15,0.48,0.37s-0.03,0.45-0.22,0.56l-12.27,7.33C20.73,52.94,20.64,52.96,20.55,52.96L20.55,52.96z M25.23,43.52\n    l-3.54,7.68l9.36-5.6c-1.3-0.04-2.93-0.12-3.6-0.35C26.65,45,25.77,44.13,25.23,43.52L25.23,43.52z"/>\n  <path fill="#3F3F3F" d="M32.81,45.13c0,0-4.14,0.01-5.22-0.35c-1.08-0.35-2.5-2.18-2.5-2.18l-4.55,9.86L32.81,45.13z"/>\n</svg>\n;<svg xmlns="http://www.w3.org/2000/svg" width="60px" height="60px" viewBox="0 0 60 60">\n  <path opacity="0.3" fill="#111111" enable-background="new    " d="M30.6,27.19c-11.24,0-20.35,6.46-20.35,14.42\n    s9.11,14.42,20.35,14.42s20.35-6.46,20.35-14.42S41.84,27.19,30.6,27.19z M30.48,55.03c-10.75,0-19.47-6.06-19.47-13.53\n    s8.72-13.53,19.47-13.53s19.47,6.06,19.47,13.53S41.23,55.03,30.48,55.03z"/>\n  <ellipse opacity="0.1" fill="#111111" enable-background="new    " cx="30.48" cy="41.5" rx="19.47" ry="13.53"/>\n  <path fill="#FFFFFF" d="M15.86,48.74c-0.19,0-0.36-0.11-0.45-0.28c-0.1-0.21-0.05-0.46,0.14-0.61l9-7.24\n    c0.12-0.1,0.29-0.14,0.45-0.09c0.16,0.04,0.28,0.16,0.33,0.31c0,0.01,0.5,1.37,1.25,2.01c0.64,0.54,3.01,1.28,3.87,1.51\n    c0.22,0.06,0.37,0.26,0.37,0.49s-0.16,0.42-0.39,0.48l-14.45,3.4C15.93,48.73,15.9,48.74,15.86,48.74z M24.65,41.8l-6.76,5.44\n    l10.53-2.48c-0.94-0.33-2-0.75-2.49-1.16C25.35,43.11,24.91,42.34,24.65,41.8L24.65,41.8z"/>\n  <path fill="#3F3F3F" d="M30.31,44.83c0,0-3.19-0.88-4.06-1.61c-0.87-0.73-1.4-2.22-1.4-2.22l-8.99,7.24L30.31,44.83L30.31,44.83z"/>\n</svg>\n;<svg xmlns="http://www.w3.org/2000/svg" width="60px" height="60px" viewBox="0 0 60 60">\n  <path opacity="0.3" fill="#111111" enable-background="new    " d="M30.6,27.19c-11.24,0-20.35,6.46-20.35,14.42\n    s9.11,14.42,20.35,14.42s20.35-6.46,20.35-14.42C50.95,33.64,41.84,27.19,30.6,27.19z M30.48,55.03\n    c-10.75,0-19.47-6.06-19.47-13.53s8.72-13.53,19.47-13.53s19.47,6.06,19.47,13.53S41.23,55.03,30.48,55.03z"/>\n  <ellipse opacity="0.1" fill="#111111" enable-background="new    " cx="30.48" cy="41.5" rx="19.47" ry="13.53"/>\n  <path fill="#FFFFFF" d="M13.21,45.15c-0.24,0-0.44-0.17-0.49-0.4c-0.05-0.23,0.08-0.47,0.3-0.56L25,39.22\n    c0.15-0.06,0.31-0.05,0.45,0.03s0.23,0.22,0.24,0.38c0,0.01,0.14,1.46,0.71,2.26c0.49,0.69,2.31,1.86,2.96,2.25\n    c0.19,0.12,0.29,0.34,0.23,0.56s-0.26,0.37-0.48,0.37C29.11,45.07,13.21,45.15,13.21,45.15z M24.79,40.39l-9.04,3.75l11.68-0.06\n    c-0.71-0.5-1.49-1.11-1.85-1.61C25.14,41.85,24.91,40.98,24.79,40.39z"/>\n  <path fill="#3F3F3F" d="M29.11,44.58c0,0-2.46-1.47-3.12-2.39c-0.66-0.93-0.8-2.5-0.8-2.5l-11.98,4.97L29.11,44.58L29.11,44.58z"/>\n</svg>\n;<svg xmlns="http://www.w3.org/2000/svg" width="60px" height="60px" viewBox="0 0 60 60">\n  <path opacity="0.3" fill="#111111" enable-background="new    " d="M30.6,27.19c-11.24,0-20.35,6.46-20.35,14.42\n    s9.11,14.42,20.35,14.42s20.35-6.46,20.35-14.42S41.84,27.19,30.6,27.19z M30.48,55.03c-10.75,0-19.47-6.06-19.47-13.53\n    s8.72-13.53,19.47-13.53s19.47,6.06,19.47,13.53S41.23,55.03,30.48,55.03z"/>\n  <ellipse opacity="0.1" fill="#111111" enable-background="new    " cx="30.48" cy="41.5" rx="19.47" ry="13.53"/>\n  <path fill="#FFFFFF" d="M27.25,43.9h-0.06l-15.16-1.99c-0.25-0.03-0.44-0.25-0.44-0.5s0.19-0.46,0.44-0.5L26.84,39\n    c0.21-0.03,0.45,0.1,0.53,0.32s0.01,0.46-0.18,0.59c-0.01,0.01-1.05,0.76-0.77,1.39c0.43,0.94,1.18,1.75,1.19,1.75\n    c0.14,0.15,0.18,0.38,0.08,0.57C27.61,43.79,27.44,43.9,27.25,43.9L27.25,43.9z M15.97,41.41l10.13,1.33\n    c-0.2-0.3-0.42-0.65-0.59-1.02c-0.25-0.55-0.14-1.09,0.11-1.55L15.97,41.41z"/>\n  <path fill="#3F3F3F" d="M27.25,43.4c0,0-0.81-0.86-1.28-1.89s0.94-2.01,0.94-2.01L12.1,41.41L27.25,43.4L27.25,43.4z"/>\n</svg>\n;<svg xmlns="http://www.w3.org/2000/svg" width="60px" height="60px" viewBox="0 0 60 60">\n  <path opacity="0.3" fill="#111111" enable-background="new    " d="M30.6,27.2c-11.24,0-20.35,6.46-20.35,14.42\n    s9.11,14.42,20.35,14.42s20.35-6.46,20.35-14.42C50.95,33.65,41.84,27.2,30.6,27.2z M30.48,55.04c-10.75,0-19.47-6.06-19.47-13.53\n    s8.72-13.53,19.47-13.53s19.47,6.06,19.47,13.53S41.23,55.04,30.48,55.04z"/>\n  <ellipse opacity="0.1" fill="#111111" enable-background="new    " cx="30.48" cy="41.51" rx="19.47" ry="13.53"/>\n  <path fill="#FFFFFF" d="M26.02,42.6c-0.07,0-0.14-0.01-0.2-0.04L13.4,37.12c-0.23-0.1-0.35-0.35-0.28-0.59\n    c0.06-0.24,0.3-0.4,0.54-0.37l15.03,1.64c0.24,0.03,0.42,0.21,0.44,0.45s-0.12,0.45-0.35,0.53c-1.03,0.33-2.18,0.96-2.26,1.39\n    c-0.19,1.01-0.02,1.82-0.01,1.83c0.04,0.18-0.03,0.37-0.17,0.49C26.25,42.57,26.13,42.6,26.02,42.6L26.02,42.6z M16.79,37.52\n    l8.65,3.79c-0.01-0.37,0.01-0.82,0.1-1.32c0.1-0.56,0.63-1.03,1.21-1.39L16.79,37.52L16.79,37.52z"/>\n  <path fill="#3F3F3F" d="M26.02,42.1c0,0-0.22-0.92,0.01-2.03c0.22-1.04,2.6-1.78,2.6-1.78L13.6,36.65L26.02,42.1L26.02,42.1z"/>\n</svg>\n;<svg xmlns="http://www.w3.org/2000/svg" width="60px" height="60px" viewBox="0 0 60 60">\n  <path opacity="0.3" fill="#111111" enable-background="new    " d="M30.6,27.2c-11.24,0-20.35,6.46-20.35,14.42\n    s9.11,14.42,20.35,14.42s20.35-6.46,20.35-14.42C50.95,33.65,41.84,27.2,30.6,27.2z M30.48,55.04c-10.75,0-19.47-6.06-19.47-13.53\n    s8.72-13.53,19.47-13.53s19.47,6.06,19.47,13.53S41.23,55.04,30.48,55.04z"/>\n  <ellipse opacity="0.1" fill="#111111" enable-background="new    " cx="30.48" cy="41.51" rx="19.47" ry="13.53"/>\n  <path fill="#FFFFFF" d="M25.49,41.88c-0.14,0-0.27-0.06-0.37-0.16l-7.88-8.59c-0.16-0.17-0.18-0.43-0.04-0.62\n    c0.13-0.19,0.38-0.26,0.6-0.18l13.95,5.63c0.22,0.09,0.35,0.33,0.3,0.57s-0.25,0.41-0.51,0.4c-2.16-0.08-4.25,0.11-4.56,0.42\n    c-0.49,0.49-0.89,1.73-1,2.16c-0.05,0.18-0.19,0.31-0.36,0.36C25.57,41.88,25.53,41.88,25.49,41.88z M19.47,34.08l5.81,6.33\n    c0.21-0.58,0.55-1.33,1-1.77c0.43-0.43,1.61-0.62,2.77-0.69C29.05,37.95,19.47,34.08,19.47,34.08z"/>\n  <path fill="#3F3F3F" d="M25.49,41.38c0,0,0.38-1.63,1.13-2.39c0.75-0.75,4.93-0.57,4.93-0.57L17.6,32.79L25.49,41.38z"/>\n</svg>\n;<svg xmlns="http://www.w3.org/2000/svg" width="60px" height="60px" viewBox="0 0 60 60">\n  <path opacity="0.3" fill="#111111" enable-background="new    " d="M30.6,27.2c-11.24,0-20.35,6.46-20.35,14.42\n    s9.11,14.42,20.35,14.42s20.35-6.46,20.35-14.42C50.95,33.65,41.84,27.2,30.6,27.2z M30.48,55.04c-10.75,0-19.47-6.06-19.47-13.53\n    s8.72-13.53,19.47-13.53s19.47,6.06,19.47,13.53S41.23,55.04,30.48,55.04z"/>\n  <ellipse opacity="0.1" fill="#111111" enable-background="new    " cx="30.48" cy="41.51" rx="19.47" ry="13.53"/>\n  <path fill="#FFFFFF" d="M25.49,41.88c-0.21,0-0.4-0.13-0.47-0.33l-4.3-11.67c-0.08-0.21,0-0.45,0.18-0.58s0.44-0.12,0.61,0.03\n    l10.37,8.71c0.16,0.14,0.22,0.36,0.15,0.56c-0.08,0.2-0.26,0.31-0.49,0.32c-2.16-0.08-4.25,0.11-4.56,0.42\n    c-0.49,0.49-0.89,1.73-1,2.16c-0.05,0.21-0.24,0.36-0.46,0.37C25.51,41.88,25.5,41.88,25.49,41.88z M22.31,31.3l3.17,8.6\n    c0.2-0.46,0.47-0.94,0.79-1.27c0.58-0.58,2.47-0.71,3.89-0.73L22.31,31.3z"/>\n  <path fill="#3F3F3F" d="M25.49,41.38c0,0,0.38-1.63,1.13-2.39c0.75-0.75,4.93-0.57,4.93-0.57l-10.37-8.71L25.49,41.38L25.49,41.38z"/>\n</svg>\n'.split(
			';'
		),
		rN = '<svg xmlns="http://www.w3.org/2000/svg" width="60px" height="60px" viewBox="0 0 60 60">\n  <path opacity="0.3" fill="#111111" enable-background="new    " d="M30.33,27.19c-11.24,0-20.35,6.46-20.35,14.42\n    s9.11,14.42,20.35,14.42s20.35-6.46,20.35-14.42S41.57,27.19,30.33,27.19z M30.21,55.03c-10.75,0-19.47-6.06-19.47-13.53\n    s8.72-13.53,19.47-13.53s19.47,6.06,19.47,13.53S40.96,55.03,30.21,55.03z"/>\n  <ellipse opacity="0.1" fill="#111111" enable-background="new    " cx="30.21" cy="41.5" rx="19.47" ry="13.53"/>\n  <path fill="#333333" d="M34.25,23.78h-8.51c-0.42,0-0.8-0.26-0.94-0.66s-0.02-0.84,0.3-1.11l0.64-0.53\n    c-1.12-1.12-1.77-2.65-1.77-4.25c0-3.3,2.69-5.99,5.98-5.99c1.6,0,3.1,0.63,4.23,1.76s1.75,2.64,1.75,4.24\n    c0,1.45-0.53,2.84-1.49,3.94c-0.03,0.05-0.06,0.09-0.1,0.14l-0.13,0.13l-0.03,0.03L34.86,22c0.34,0.26,0.48,0.71,0.34,1.12\n    C35.06,23.51,34.68,23.78,34.25,23.78z M29.49,21.78h0.93c0.08-0.33,0.33-0.6,0.68-0.71c0.09-0.03,0.17-0.06,0.25-0.1l0.12-0.05\n    c0.25-0.11,0.45-0.21,0.64-0.34c0.01-0.01,0.08-0.05,0.09-0.06c0.16-0.11,0.31-0.24,0.45-0.37c0.01-0.01,0.09-0.08,0.1-0.09\n    l0.05-0.05c0.02-0.02,0.03-0.04,0.05-0.06c0.71-0.75,1.1-1.72,1.1-2.74c0-1.07-0.41-2.07-1.16-2.83c-0.75-0.75-1.75-1.17-2.81-1.17\n    C27.79,13.21,26,15,26,17.2c0,1.3,0.64,2.52,1.71,3.27c0.05,0.03,0.09,0.07,0.13,0.11c0.3,0.19,0.64,0.35,1,0.46\n    C29.16,21.18,29.41,21.45,29.49,21.78z"/>\n  <path fill="#333333" d="M33.97,43.59h-3.04c-0.45,0-0.84-0.3-0.96-0.72c-0.12,0.42-0.51,0.72-0.96,0.72h-3\n    c-0.55,0-0.99-0.44-1-0.99l-0.13-9.18l-0.38,0.97c-0.3,0.71-1.04,1.08-1.79,0.89l-1.01-0.33c-0.74-0.27-1.13-1.03-0.94-1.78\n    c0-0.01,0-0.02,0.01-0.02c0.06-0.22,2.59-9.54,2.59-9.54c0.23-0.93,1.04-1.66,1.95-1.79c0.08-0.02,0.17-0.03,0.26-0.03h8.84\n    c0.06,0,0.15,0.01,0.22,0.02c0.96,0.11,1.8,0.83,2.04,1.79c2.15,8.31,2.42,9.38,2.46,9.53c0.2,0.78-0.14,1.5-0.83,1.75l-1.08,0.35\n    c-0.8,0.21-1.55-0.16-1.84-0.85l-0.28-0.73l-0.13,8.96C34.97,43.15,34.52,43.59,33.97,43.59z M31.87,41.59h1.12l0.19-13.22\n    c0.01-0.48,0.35-0.88,0.82-0.97c0.47-0.08,0.93,0.17,1.11,0.62l0.09,0.23l1.86,4.92h0.01c-0.48-1.88-2.34-9.09-2.34-9.09\n    c-0.04-0.16-0.21-0.29-0.33-0.29c-0.03,0-0.06,0-0.09-0.01h-8.6c-0.03,0-0.07,0.01-0.1,0.01c-0.09,0-0.26,0.13-0.31,0.32\n    c-1.6,5.91-2.22,8.19-2.47,9.08l2.06-5.18c0.18-0.44,0.64-0.7,1.11-0.61c0.47,0.09,0.81,0.49,0.82,0.97L27,41.59h1.08l0.48-6.92\n    c0.06-0.79,0.65-1.34,1.43-1.34c0.6,0,1.32,0.36,1.4,1.34L31.87,41.59z M22.7,33.66c0.01-0.01,0.01-0.02,0.01-0.04\n    C22.71,33.64,22.7,33.65,22.7,33.66z"/>\n  <path fill="#CE592C" d="M25.74,22.78l0.9-0.75h6.62l0.99,0.75"/>\n  <ellipse opacity="0.5" fill="#CE592C" enable-background="new    " cx="29.95" cy="22.37" rx="2.25" ry="0.3"/>\n  <path fill="#FDBF2D" d="M38.15,33.37c0-0.01-2.46-9.53-2.46-9.53c-0.15-0.6-0.72-1.05-1.31-1.05H25.6c-0.59,0-1.13,0.49-1.28,1.08\n    c0,0-2.59,9.54-2.59,9.55c-0.06,0.24,0.04,0.49,0.29,0.58l0.94,0.31c0.25,0.06,0.51-0.05,0.61-0.29l2.24-5.65l0.2,14.21h3\n    l0.55-7.85c0.02-0.21,0.13-0.41,0.44-0.41s0.38,0.2,0.39,0.41l0.54,7.85h3.04l0.2-14.21l2.12,5.61c0.1,0.23,0.36,0.35,0.61,0.29\n    l1.04-0.34C38.18,33.85,38.21,33.6,38.15,33.37z"/>\n  <path opacity="0.25" fill="#CF572E" enable-background="new    " d="M34.17,28.38l0.08-5.6h0.17l0.48,5.44l0.45,3.13 M25.81,28.38\n    l-0.08-5.59h-0.17c0,0-0.31,4.2-0.48,5.43c-0.17,1.24-0.45,3.13-0.45,3.13L25.81,28.38z"/>\n  <ellipse fill="#FDBF2D" cx="29.95" cy="17.23" rx="4.98" ry="5"/>\n  <path opacity="0.25" fill="#CE592C" enable-background="new    " d="M30.35,21.74c-1.18,0.11-2.31-0.06-3.3-0.44\n    c0.94,0.68,2.12,1.04,3.36,0.92c1.27-0.12,2.38-0.71,3.19-1.59C32.69,21.23,31.57,21.63,30.35,21.74z"/>\n</svg>\n;<svg xmlns="http://www.w3.org/2000/svg" width="60px" height="60px" viewBox="0 0 60 60">\n  <path opacity="0.3" fill="#111111" enable-background="new    " d="M30.33,27.19c-11.24,0-20.35,6.46-20.35,14.42\n    s9.11,14.42,20.35,14.42s20.35-6.46,20.35-14.42S41.57,27.19,30.33,27.19z M30.21,55.03c-10.75,0-19.47-6.06-19.47-13.53\n    s8.72-13.53,19.47-13.53s19.47,6.06,19.47,13.53S40.96,55.03,30.21,55.03z"/>\n  <ellipse opacity="0.1" fill="#111111" enable-background="new    " cx="30.21" cy="41.5" rx="19.47" ry="13.53"/>\n  <path fill="#FFFFFF" d="M34.56,41.4c-0.21,0-0.39-0.13-0.47-0.32c-0.58-1.56-1.42-3.02-1.79-3.13c-0.41-0.13-2.39,0.7-4.22,1.77\n    c-0.21,0.12-0.48,0.08-0.63-0.11c-0.16-0.18-0.16-0.45-0.01-0.64l8.2-9.97c0.14-0.17,0.38-0.23,0.58-0.14\n    c0.2,0.09,0.33,0.3,0.3,0.52l-1.46,11.59c-0.03,0.23-0.21,0.41-0.44,0.43C34.59,41.39,34.57,41.4,34.56,41.4z M32.25,36.94\n    c0.13,0,0.24,0.01,0.34,0.04c0.62,0.19,1.23,1.13,1.7,2.05l1.02-8.07l-5.53,6.74C30.67,37.29,31.61,36.94,32.25,36.94z"/>\n  <path fill="#3F3F3F" d="M34.56,40.9c0,0-1.09-3.12-2.11-3.43s-4.62,1.82-4.62,1.82l8.2-9.97L34.56,40.9z"/>\n  <path fill="#333333" d="M33.37,43.7c-0.18,0-0.35-0.03-0.5-0.09c-0.22-0.06-1.1-0.23-1.82-0.37l-0.22-0.07\n    c-0.28-0.12-0.59-0.39-0.77-0.8c-0.34,0.29-0.41,0.31-0.51,0.36c-0.28,0.12-0.55,0.11-0.69,0.09l-0.29-0.06\n    c-0.38-0.09-2.08-0.44-2.08-0.44l-0.3-0.11c-0.31-0.18-0.65-0.58-0.7-1.17c-0.01-0.12-0.19-3.18-0.42-6.75\n    c-0.14,0.27-0.36,0.54-0.7,0.72c-0.42,0.22-0.91,0.24-1.45,0.06c-1.69-0.54-1.41-1.97-1.3-2.51c0.02-0.09,0.04-0.18,0.05-0.27\n    c0.02-0.12,0.46-2.45,0.68-3.37c0.14-0.58,0.68-3.38,0.89-4.48c0.03-0.36,0.23-1.64,1.31-2.31c0.35-0.22,0.78-0.47,1.15-0.68\n    c-1.08-1.1-1.72-2.6-1.71-4.22c0-1.6,0.62-3.11,1.75-4.24c1.12-1.13,2.62-1.75,4.21-1.75h0.01c1.59,0,3.09,0.63,4.21,1.76\n    s1.74,2.64,1.74,4.24c0,1.43-0.5,2.77-1.37,3.82l0.47,0.01c0.33,0.01,0.65,0.15,0.88,0.39s0.35,0.56,0.34,0.89l-0.02,0.46\n    c0.28,0.37,0.48,0.82,0.55,1.27c0.01,0.01,0.49,2.04,0.89,4.51c0.3,1.87,0.67,4.54,0.75,5.23c0.13,0.8-0.27,1.48-0.98,1.67\n    c-0.28,0.11-0.97,0.31-1.5,0.23c-0.04-0.01-0.08-0.01-0.13-0.02l-0.17,5.13c0.03,0.22,0.01,0.45-0.01,0.65\n    c-0.05,0.52-0.42,1.1-1.09,1.72l-0.13,0.29l-0.45,0.12C33.74,43.67,33.54,43.7,33.37,43.7z M28.51,42.73l0.05,0.02L28.51,42.73z\n     M31.9,41.37c0.71,0.13,1.11,0.22,1.36,0.28c0.16-0.16,0.29-0.31,0.35-0.41l0.3-9.24l1.97-0.19l0.44,1.92\n    c0.01,0,0.03-0.01,0.04-0.01c-0.11-0.83-0.39-2.88-0.7-4.81c-0.39-2.39-0.87-4.42-0.87-4.44c-0.04-0.24-0.15-0.44-0.27-0.55\n    l-0.35-0.31l0.02-0.57l-2.71-0.08l-0.29-1.95c1.62-0.54,2.71-2.07,2.71-3.79c0-1.07-0.41-2.07-1.16-2.83\n    c-0.75-0.75-1.74-1.17-2.79-1.17c-1.06,0-2.05,0.41-2.79,1.16C26.41,15.13,26,16.14,26,17.21c0,1.65,0.98,3.11,2.5,3.72l-0.4,1.93\n    l-0.81-0.02c-0.38,0.21-1.12,0.64-1.68,0.98c-0.25,0.15-0.36,0.61-0.37,0.8l-0.02,0.12c-0.03,0.16-0.73,3.88-0.92,4.64\n    c-0.16,0.65-0.45,2.15-0.58,2.86c0.27-0.72,0.71-1.94,1.1-3.21l1.95,0.23c0.28,4.41,0.6,9.68,0.69,11.21\n    c0.73,0.15,1.15,0.24,1.4,0.3c0.09-0.07,0.18-0.16,0.27-0.23l0.11-4.79l1.99-0.1C31.7,39.55,31.85,40.88,31.9,41.37L31.9,41.37z\n     M36.83,33.58c-0.02,0.01-0.04,0.01-0.06,0.02C36.79,33.6,36.81,33.59,36.83,33.58z"/>\n  <path fill="#FABD2C" d="M22.66,32.44c-0.12,0.73-0.42,1.35,0.57,1.67c0.97,0.31,1.03-0.53,1.15-0.79c0,0,0.79-2.02,1.44-4.14\n    c0,0,0.9-3.69,0.98-4.14c0.26-1.66-0.41-2.27-1.17-2.21c-0.56,0.04-1.2,0.38-1.38,1.75c0,0-0.72,3.85-0.91,4.58\n    C23.11,30.06,22.66,32.44,22.66,32.44z"/>\n  <path opacity="0.25" fill="#CF572E" enable-background="new    " d="M25.67,29.87l-0.2-7.11l-0.41,0.31c0,0,0.06,5.4-0.11,6.64\n    s-0.45,3.13-0.45,3.13L25.67,29.87z"/>\n  <path fill="none" d="M27.03,22.08h8.2v20.56h-8.2C27.03,42.64,27.03,22.08,27.03,22.08z"/>\n  <path fill="#E58A2C" d="M35.23,22.08l-6.16,0.37l-2.04,0.32l0.51,18.03l1.43,1.03l0.19-0.02L30.1,41l0.19-8.22l0.24-0.77\n    l1.25,10.05l1.87,0.57c0,0,0.9-0.77,0.95-1.24c0.04-0.44,0-0.47,0-0.47L35.23,22.08"/>\n  <path fill="none" d="M25.39,22.74h8.31V42.7h-8.31V22.74z"/>\n  <path fill="#FABD2C" d="M25.39,22.74l1.1,18.22c0.02,0.27,0.2,0.37,0.2,0.37s2.11,0.44,2.2,0.48h0.28c0,0-0.13-0.04-0.14-0.23\n    c-0.02-0.19,0.27-7.59,0.27-7.59c0.02-0.37,0.12-0.52,0.36-0.53c0.24,0.01,0.35,0.11,0.4,0.76c0,0,0.85,7.05,0.87,7.48\n    s0.31,0.57,0.31,0.57s1.86,0.34,1.99,0.41c0.03,0.02,0.08,0.02,0.13,0.02c0.14,0,0.32-0.05,0.32-0.05s0.03-0.04,0.02-0.32\n    c-0.1-3.46,0.46-4.14-0.04-19.32L25.39,22.74"/>\n  <path fill="none" d="M25.42,21.84h9.81v1.19h-9.81C25.42,23.03,25.42,21.84,25.42,21.84z"/>\n  <path fill="#CE592C" d="M27.03,21.84l-1.61,0.9l8.25,0.29l1.56-0.95L27.03,21.84"/>\n  <ellipse opacity="0.5" fill="#CE592C" enable-background="new    " cx="29.92" cy="22.37" rx="2.25" ry="0.3"/>\n  <ellipse fill="#FABD2C" cx="29.95" cy="17.23" rx="4.96" ry="5"/>\n  <path opacity="0.25" fill="#CE592C" enable-background="new    " d="M29.93,21.74c-1.19,0-2.3-0.27-3.24-0.75\n    c0.87,0.77,2.01,1.24,3.26,1.24c1.28,0,2.44-0.49,3.32-1.28C32.31,21.45,31.16,21.74,29.93,21.74z"/>\n  <path fill="#FABD2C" d="M33.99,26.06c0.1,1.59,0.92,5.97,0.92,5.97l0.54,2.33c0.08,0.24,0.27,0.33,0.62,0.38\n    c0.35,0.05,1.09-0.21,1.09-0.21c0.23-0.06,0.29-0.3,0.25-0.55c0,0-0.35-2.72-0.75-5.23c-0.4-2.46-0.89-4.51-0.89-4.51\n    c-0.1-0.61-0.59-1.29-1.17-1.34c0,0-0.69,0-0.71,1.06C33.86,25.08,33.99,26.06,33.99,26.06z"/>\n  <path opacity="0.25" fill="#CF572E" enable-background="new    " d="M34.41,22.95c-0.2,0.08-0.5,0.32-0.52,1.01\n    c-0.03,1.12,0.1,2.1,0.1,2.1c0.09,1.36,0.7,4.73,0.87,5.7l0.01,0.05C34.88,31.81,34.3,26.32,34.41,22.95z"/>\n</svg>\n;<svg xmlns="http://www.w3.org/2000/svg" width="60px" height="60px" viewBox="0 0 60 60">\n  <path opacity="0.3" fill="#111111" enable-background="new    " d="M30.33,27.19c-11.24,0-20.35,6.46-20.35,14.42\n    s9.11,14.42,20.35,14.42s20.35-6.46,20.35-14.42C50.68,33.64,41.57,27.19,30.33,27.19z M30.21,55.03\n    c-10.75,0-19.47-6.06-19.47-13.53s8.72-13.53,19.47-13.53s19.47,6.06,19.47,13.53S40.96,55.03,30.21,55.03z"/>\n  <ellipse opacity="0.1" fill="#111111" enable-background="new    " cx="30.21" cy="41.5" rx="19.47" ry="13.53"/>\n  <path fill="#FFFFFF" d="M35.19,41.88c-0.04,0-0.08,0-0.12-0.01c-0.18-0.04-0.32-0.18-0.36-0.36c-0.12-0.44-0.52-1.68-1-2.16\n    c-0.31-0.31-2.39-0.5-4.56-0.42c-0.22,0.02-0.46-0.16-0.51-0.4c-0.05-0.24,0.08-0.48,0.3-0.57l13.95-5.63\n    c0.22-0.09,0.47-0.01,0.6,0.18s0.12,0.45-0.04,0.62l-7.88,8.59C35.47,41.82,35.33,41.88,35.19,41.88L35.19,41.88z M31.64,37.94\n    c1.16,0.07,2.34,0.26,2.77,0.69c0.44,0.44,0.78,1.19,1,1.77l5.81-6.33L31.64,37.94z"/>\n  <path fill="#3F3F3F" d="M35.19,41.38c0,0-0.38-1.63-1.13-2.39c-0.75-0.75-4.93-0.57-4.93-0.57l13.95-5.63L35.19,41.38L35.19,41.38z\n    "/>\n  <path fill="#333333" d="M32.56,44.49c-0.09,0-0.17-0.01-0.26-0.03c-0.21-0.02-0.37-0.08-0.48-0.14c-0.12-0.06-1.39-0.8-1.6-0.93\n    c-0.39-0.2-0.81-0.67-0.84-1.41c0-0.03-0.01-0.08-0.02-0.16c-0.12,0.04-0.25,0.09-0.37,0.14c-0.11,0.09-0.25,0.16-0.4,0.18\n    c-0.04,0.01-0.14,0.02-0.26,0.03c-0.09,0.01-0.19,0.01-0.28-0.01c-0.11-0.01-0.21-0.04-0.31-0.08s-0.18-0.07-1.57-1.03\n    c-0.24-0.13-0.59-0.54-0.63-1.13c-0.01-0.12-0.2-3.22-0.42-6.77c-0.2-0.32-0.25-0.65-0.28-0.83c-0.04-0.17-0.47-2.07-0.78-4.08\n    c-0.06-0.64-0.34-3.56-0.34-3.99c-0.02-1.62,0.64-2.32,1.14-2.61c0.14-0.12,0.32-0.19,0.5-0.21l0.28-0.08\n    c-1.06-1.11-1.65-2.58-1.65-4.11c0-1.6,0.62-3.11,1.74-4.24c1.12-1.13,2.62-1.76,4.22-1.76h0.01c1.59,0,3.09,0.62,4.21,1.75\n    c1.13,1.13,1.75,2.64,1.75,4.24c0,1.59-0.64,3.12-1.78,4.25l0.9,0.19c0.44,0.09,0.77,0.47,0.8,0.92c0.01,0.14-0.01,0.28-0.06,0.41\n    l-0.06,0.99c0.16,0.45,0.21,0.98,0.14,1.59c0,0-0.07,3.73-0.07,4.47c0.01,0.92,0.11,3.37,0.11,3.37l0.01,0.13\n    c0.02,0.41,0.08,1.51-0.88,2.08l-0.36,6.17c0,0.22-0.04,0.79-0.41,1.3c-0.25,0.34-0.87,0.97-0.99,1.1\n    C33.08,44.39,32.82,44.49,32.56,44.49L32.56,44.49z M31.36,41.75c0.23,0.13,0.63,0.37,0.95,0.55c0.15-0.16,0.28-0.31,0.33-0.38\n    c0.01-0.02,0.03-0.08,0.03-0.11l0.4-6.94c0.03-0.46,0.36-0.84,0.81-0.92c0.01,0,0.02,0,0.04-0.01c0-0.08,0-0.19-0.01-0.27\n    l-0.01-0.16c0,0-0.1-2.5-0.11-3.44c-0.01-0.76,0.07-4.6,0.07-4.6c0.05-0.53-0.01-0.76-0.06-0.88c-0.07-0.15-0.11-0.32-0.1-0.49\n    l0.04-0.65l-2.43-0.5c-0.44-0.09-0.77-0.47-0.8-0.92c-0.03-0.45,0.25-0.86,0.68-1.01l0.11-0.04c0.04-0.01,0.08-0.03,0.12-0.04\n    c0.06-0.02,0.11-0.05,0.17-0.08l0.11-0.06c0.13-0.06,0.26-0.13,0.37-0.2c0.06-0.04,0.13-0.09,0.19-0.14\n    c0.07-0.05,0.12-0.09,0.16-0.12c0.02-0.03,0.05-0.05,0.08-0.07c0.9-0.77,1.41-1.87,1.41-3.03c0-1.07-0.41-2.07-1.16-2.83\n    c-0.75-0.75-1.74-1.16-2.79-1.16c-1.06,0-2.05,0.42-2.8,1.17C26.41,15.18,26,16.18,26,17.25c0,1.15,0.49,2.21,1.37,2.99\n    c0.03,0.02,0.05,0.05,0.08,0.07l0.12,0.09c0,0,0.08,0.06,0.09,0.07c0.06,0.05,0.11,0.09,0.17,0.13c0.11,0.07,0.22,0.12,0.33,0.18\n    l0.14,0.08c0.35,0.2,0.58,0.61,0.53,1.01c-0.02,0.16-0.07,0.31-0.15,0.45c0.13,0.17,0.21,0.39,0.21,0.62c0,0.3-0.14,0.59-0.37,0.78\n    s-0.54,0.27-0.83,0.21l-1.31-0.27c-0.14-0.03-0.27-0.09-0.38-0.17c-0.02-0.01-0.04-0.03-0.05-0.04c-0.02-0.02-0.04-0.03-0.06-0.05\n    c0,0-0.01,0-0.02,0.01c-0.02,0.03-0.15,0.27-0.14,0.85c0,0.24,0.17,2.1,0.33,3.77c0.29,1.87,0.72,3.76,0.73,3.78\n    s0.02,0.11,0.04,0.2c0,0.03,0.01,0.06,0.01,0.09c0.16,0.17,0.26,0.39,0.27,0.63c0.2,3.16,0.37,6.03,0.42,6.86\n    c0.22,0.15,0.53,0.36,0.77,0.52c0.04-0.02,0.09-0.03,0.14-0.05l0.28-3.18c0.04-0.51,0.46-0.9,0.97-0.91\n    c0.56-0.02,0.95,0.36,1.02,0.86C31.19,40.33,31.33,41.39,31.36,41.75L31.36,41.75z M27.24,39.36c0.01,0.01,0.04,0.03,0.1,0.07\n    C27.3,39.41,27.27,39.38,27.24,39.36z"/>\n  <path fill="#E58A2C" d="M34.79,22.64l-4.46-0.83c0,0-2.42,0.35-2.43,0.35l-0.46,17.98l0.78,1.03c0,0,1.02-0.38,1.1-0.41\n    s0.07-0.18,0.07-0.18l0.66-7.54l1.46,9.74l1.04,0.7c0,0,0.68-0.69,0.89-0.98c0.24-0.33,0.22-0.73,0.22-0.73L34.79,22.64\n    L34.79,22.64z"/>\n  <path fill="#FABD2C" d="M34.9,33.46c0.02,0.57,0.16,1.3-0.85,1.48c-0.74,0.13-0.75-0.11-1.02-1.13c0,0-0.47-2.5-0.61-4.71\n    c0,0-0.18-3.31-0.14-3.76c0.12-1.66,0.91-2.11,1.64-1.87c0.53,0.17,1.08,0.65,0.94,2.01c0,0-0.08,3.82-0.07,4.58\n    C34.8,30.98,34.9,33.46,34.9,33.46L34.9,33.46z"/>\n  <path opacity="0.25" fill="#CF572E" enable-background="new    " d="M34.9,33.46c0.04,1.16-0.68,1.07-0.93,0.87\n    c-0.63-0.5-0.71-5.21-0.82-6.64c-0.07-0.97,0.09-3.4,0.4-4.17c0.55-0.21,1.04,0.42,1.09,0.51c0.19,0.31,0.29,0.77,0.22,1.45\n    c0,0-0.08,3.82-0.07,4.58C34.8,30.98,34.9,33.46,34.9,33.46L34.9,33.46z"/>\n  <path fill="#E58A2C" d="M27.47,31.45c0.01,0.67,0.2,1.27-0.73,1.43c-0.91,0.15-0.86-0.61-0.93-0.87c0,0-0.45-1.92-0.75-3.91\n    c0,0-0.33-3.44-0.33-3.85c-0.02-1.52,0.66-1.99,1.35-1.84c0.5,0.11,1.03,0.5,1.01,1.75c0,0,0.15,3.56,0.21,4.24\n    C27.38,29.24,27.47,31.45,27.47,31.45z"/>\n  <path fill="#FABD2C" d="M31.67,23.71l-6.17-1.29c0,0-0.05,0.01-0.04,0.09c0.13,1.5,1.07,17.08,1.09,17.34\n    c0.02,0.27,0.19,0.37,0.19,0.37s1.3,0.89,1.39,0.93s0.27,0,0.27,0s-0.13-0.04-0.14-0.23c-0.02-0.19,0.3-7.46,0.3-7.46\n    c0.01-0.37,0.11-0.52,0.36-0.53c0.24,0,0.29,0.15,0.31,0.53c0,0,1.14,8.05,1.15,8.48s0.31,0.56,0.31,0.56s1.47,0.86,1.59,0.92\n    s0.3,0.01,0.3,0.01s-0.22-0.01-0.22-0.3C32.36,42.94,31.67,23.71,31.67,23.71L31.67,23.71z"/>\n  <path fill="#FABD2C" d="M31.67,23.71l-6.17-1.29c0,0-0.05,0.01-0.04,0.09c0.13,1.5,1.07,17.08,1.09,17.34\n    c0.02,0.27,0.19,0.37,0.19,0.37s1.3,0.89,1.39,0.93s0.27,0,0.27,0s-0.13-0.04-0.14-0.23c-0.02-0.19,0.3-7.46,0.3-7.46\n    c0.01-0.37,0.11-0.52,0.36-0.53c0.24,0,0.29,0.15,0.31,0.53c0,0,1.14,8.05,1.15,8.48s0.31,0.56,0.31,0.56s1.47,0.86,1.59,0.92\n    s0.3,0.01,0.3,0.01s-0.22-0.01-0.22-0.3C32.36,42.94,31.67,23.71,31.67,23.71L31.67,23.71z"/>\n  <path fill="#CE592C" d="M25.54,22.42l6.13,1.29l3.16-1.07l-5.88-1.2"/>\n  <ellipse opacity="0.5" fill="#CE592C" enable-background="new    " cx="30" cy="22.41" rx="2.25" ry="0.43"/>\n  <ellipse fill="#FABD2C" cx="29.95" cy="17.23" rx="4.96" ry="5"/>\n  <path opacity="0.25" fill="#CE592C" enable-background="new    " d="M29.98,21.74c1.19,0,2.3-0.27,3.24-0.75\n    c-0.87,0.77-2.01,1.24-3.26,1.24c-1.28,0-2.44-0.49-3.32-1.28C27.6,21.45,28.75,21.74,29.98,21.74z"/>\n</svg>\n;<svg xmlns="http://www.w3.org/2000/svg" width="60px" height="60px" viewBox="0 0 60 60">\n  <path opacity="0.3" fill="#111111" enable-background="new    " d="M30.33,27.19c-11.24,0-20.35,6.46-20.35,14.42\n    s9.11,14.42,20.35,14.42s20.35-6.46,20.35-14.42S41.57,27.19,30.33,27.19z M30.21,55.03c-10.75,0-19.47-6.06-19.47-13.53\n    s8.72-13.53,19.47-13.53s19.47,6.06,19.47,13.53S40.96,55.03,30.21,55.03z"/>\n  <ellipse opacity="0.1" fill="#111111" enable-background="new    " cx="30.21" cy="41.5" rx="19.47" ry="13.53"/>\n  <path fill="#FFFFFF" d="M34.67,42.6c-0.11,0-0.22-0.04-0.32-0.11c-0.15-0.12-0.21-0.31-0.17-0.49c0-0.01,0.17-0.84-0.01-1.83\n    c-0.08-0.43-1.23-1.06-2.26-1.39c-0.23-0.07-0.37-0.29-0.35-0.53s0.21-0.42,0.44-0.45l15.03-1.64c0.25-0.03,0.47,0.13,0.54,0.37\n    c0.06,0.24-0.06,0.49-0.28,0.59l-12.42,5.44C34.8,42.59,34.73,42.6,34.67,42.6L34.67,42.6z M33.94,38.6\n    c0.58,0.36,1.1,0.82,1.21,1.39c0.09,0.49,0.11,0.95,0.1,1.32l8.65-3.79L33.94,38.6L33.94,38.6z"/>\n  <path fill="#3F3F3F" d="M34.66,42.1c0,0,0.22-0.92-0.01-2.03c-0.22-1.04-2.6-1.78-2.6-1.78l15.03-1.64\n    C47.08,36.65,34.66,42.1,34.66,42.1z"/>\n  <path fill="#333333" d="M30.91,44.46c-0.27,0-0.53-0.09-0.73-0.26c-0.04-0.03-0.12-0.1-0.95-0.95c-0.19-0.18-0.48-0.57-0.5-1.26\n    c0-0.03,0-0.1-0.01-0.25c-0.05,0.01-0.08,0.02-0.08,0.02c-0.48,0.12-0.79-0.01-0.98-0.13c-0.11-0.07-0.16-0.1-1.07-1.09\n    c-0.06-0.05-0.36-0.38-0.38-1.01c-0.01-0.18-0.22-4.03-0.44-8.03c-0.21-0.74-0.57-2.07-0.78-3.42c-0.06-0.64-0.34-3.56-0.34-3.99\n    c-0.01-1.1,0.27-1.91,0.85-2.41c0.09-0.08,0.19-0.15,0.29-0.2C24.65,20.35,24,18.82,24,17.23c0-1.6,0.62-3.11,1.74-4.24\n    c1.12-1.13,2.62-1.76,4.22-1.76h0.01c1.59,0,3.09,0.62,4.21,1.75c1.13,1.13,1.75,2.64,1.75,4.24c0,1.64-0.68,3.21-1.88,4.35\n    c0,0,0,0.01-0.01,0.01l0.33,0.09c0.46,0.13,0.76,0.56,0.73,1.04l-0.31,4.05c-0.1,2.32-0.12,3.1-0.12,3.34\n    c0.01,0.92,0.11,3.37,0.11,3.37l0.01,0.2c0.03,0.4,0.12,1.47-0.7,2.06l-0.51,6.67c0,0.4-0.26,1.09-0.99,1.46\n    c-0.49,0.25-0.98,0.42-1.2,0.49C31.22,44.43,31.07,44.46,30.91,44.46L30.91,44.46z M30.72,41.93c0.1,0.1,0.25,0.26,0.4,0.41\n    c0.14-0.05,0.29-0.12,0.45-0.2l0.55-7.13c0.03-0.4,0.3-0.74,0.67-0.87c0-0.09-0.01-0.21-0.02-0.29c-0.01-0.1-0.02-0.2-0.02-0.29\n    c0,0-0.1-2.5-0.11-3.44c0-0.38,0.04-1.52,0.12-3.48l0.25-3.26l-1.72-0.48c-0.42-0.12-0.72-0.5-0.73-0.93\n    c-0.01-0.44,0.26-0.83,0.67-0.98l0.19-0.06c0.05-0.02,0.11-0.05,0.17-0.08l0.11-0.06c0.13-0.06,0.26-0.13,0.37-0.2\n    c0.06-0.04,0.13-0.09,0.2-0.15c0.07-0.05,0.11-0.09,0.15-0.11c0.02-0.03,0.05-0.05,0.08-0.07c0.9-0.77,1.41-1.87,1.41-3.03\n    c0-1.07-0.41-2.07-1.16-2.83c-0.75-0.75-1.74-1.16-2.79-1.16c-1.06,0-2.05,0.42-2.8,1.17C26.41,15.17,26,16.17,26,17.24\n    c0,1.15,0.49,2.21,1.37,2.99c0.03,0.02,0.05,0.05,0.08,0.07l0.22,0.16c0.05,0.04,0.11,0.09,0.16,0.12\n    c0.11,0.07,0.22,0.12,0.33,0.18l0.18,0.09c0.05,0.02,0.09,0.05,0.14,0.07l0.14,0.07c0.39,0.16,0.61,0.54,0.58,0.96\n    c-0.02,0.43-0.35,0.77-0.76,0.89l-1.23,0.36c-0.14,0.04-0.28,0.05-0.43,0.03c0,0.03-0.13,0.24-0.12,0.84c0,0.24,0.17,2.1,0.33,3.77\n    c0.19,1.25,0.55,2.55,0.74,3.21c0.02,0.07,0.04,0.15,0.04,0.23c0.33,6.01,0.42,7.66,0.44,8.06c0.07,0.08,0.16,0.17,0.25,0.27\n    l0.07-0.82c0.05-0.52,0.48-0.91,1-0.91h0.01c0.52,0,0.95,0.41,0.99,0.93C30.68,41.19,30.72,41.76,30.72,41.93L30.72,41.93z\n     M27.99,39.13l0.1,0.1L27.99,39.13z"/>\n  <path fill="#E58A2C" d="M28.59,31.34c0.06,0.52,0.36,1.3-0.56,1.51c-0.92,0.21-1.03-0.7-1.1-0.95c0,0-0.65-1.97-0.95-3.96\n    c0,0-0.33-3.44-0.33-3.85c-0.02-1.52,0.66-1.99,1.35-1.84c0.5,0.11,1.03,0.5,1.01,1.75c0,0,0.15,3.56,0.21,4.24\n    C28.3,29.09,28.59,31.34,28.59,31.34z"/>\n  <path fill="#E58A2C" d="M34.08,22.64l-4.31-1.2c0,0-3.41,1.02-3.43,1.02l0.98,17.31l1.04,1.03c0,0,0.81-0.22,0.91-0.26\n    c0.1-0.03,0.1-0.18,0.1-0.18l0.15-1.68l0.7,4.1l0.72,0.66c0,0,0.6-0.18,1.16-0.47c0.45-0.23,0.45-0.65,0.45-0.65L34.08,22.64\n    L34.08,22.64z"/>\n  <path fill="#FABD2C" d="M30.19,23.71l-3.89-1.29c0,0-0.03,0.01-0.03,0.09c0.08,1.5,0.91,16.72,0.92,16.99s0.12,0.37,0.12,0.37\n    s0.82,0.89,0.88,0.93s0.17,0,0.17,0s-0.08-0.04-0.09-0.23s0.38-7.48,0.38-7.48c0.01-0.37,0.07-0.52,0.23-0.53\n    c0.15,0,0.19,0.15,0.19,0.53c0,0,0.63,8.45,0.64,8.88c0.01,0.43,0.2,0.56,0.2,0.56s0.82,0.83,0.89,0.89\n    c0.08,0.06,0.19,0.01,0.19,0.01s-0.14-0.01-0.14-0.3C30.87,42.94,30.19,23.71,30.19,23.71z"/>\n  <path fill="#FABD2C" d="M30.19,23.71l-3.89-1.29c0,0-0.03,0.01-0.03,0.09c0.08,1.5,0.91,16.72,0.92,16.99s0.12,0.37,0.12,0.37\n    s0.82,0.89,0.88,0.93s0.17,0,0.17,0s-0.08-0.04-0.09-0.23s0.38-7.48,0.38-7.48c0.01-0.37,0.07-0.52,0.23-0.53\n    c0.15,0,0.19,0.15,0.19,0.53c0,0,0.63,8.45,0.64,8.88c0.01,0.43,0.2,0.56,0.2,0.56s0.82,0.83,0.89,0.89\n    c0.08,0.06,0.19,0.01,0.19,0.01s-0.14-0.01-0.14-0.3C30.87,42.94,30.19,23.71,30.19,23.71z"/>\n  <path fill="#CE592C" d="M26.3,22.42l3.89,1.29l3.89-1.07l-4.37-1.2"/>\n  <ellipse opacity="0.5" fill="#CE592C" enable-background="new    " cx="29.93" cy="22.4" rx="2.13" ry="0.52"/>\n  <path fill="#FABD2C" d="M33.76,33.53c0.02,0.57,0.27,1.45-0.76,1.59c-1.02,0.14-1.05-0.86-1.11-1.14c0,0-0.52-2.21-0.66-4.41\n    c0,0-0.03-3.78,0.01-4.23c0.12-1.66,0.91-2.11,1.64-1.87c0.53,0.17,1.08,0.65,0.94,2.01c0,0-0.18,3.89-0.18,4.64\n    C33.65,31.05,33.76,33.53,33.76,33.53z"/>\n  <ellipse fill="#FABD2C" cx="29.95" cy="17.23" rx="4.96" ry="5"/>\n  <path opacity="0.25" fill="#CE592C" enable-background="new    " d="M29.98,21.74c1.19,0,2.3-0.27,3.24-0.75\n    c-0.87,0.77-2.01,1.24-3.26,1.24c-1.28,0-2.44-0.49-3.32-1.28C27.6,21.45,28.75,21.74,29.98,21.74z"/>\n  <path opacity="0.25" fill="#CF572E" enable-background="new    " d="M33.74,33.53c0.04,1.16-0.54,0.95-0.82,0.81\n    c-0.99-0.52-1.09-5.12-1.2-6.56c-0.07-0.97-0.16-3.58,0.78-4.26c0.55-0.21,1.04,0.42,1.09,0.51c0.19,0.31,0.29,0.77,0.22,1.45\n    c0,0-0.18,3.89-0.18,4.64C33.63,31.05,33.74,33.53,33.74,33.53z"/>\n</svg>\n;<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="60px" height="60px" viewBox="0 0 60 60">\n  <path opacity="0.3" fill="#111111" enable-background="new    " d="M30.33,27.19c-11.24,0-20.35,6.46-20.35,14.42\n    s9.11,14.42,20.35,14.42s20.35-6.46,20.35-14.42S41.57,27.19,30.33,27.19z M30.21,55.03c-10.75,0-19.47-6.06-19.47-13.53\n    s8.72-13.53,19.47-13.53s19.47,6.06,19.47,13.53S40.96,55.03,30.21,55.03z"/>\n  <ellipse opacity="0.1" fill="#111111" enable-background="new    " cx="30.21" cy="41.5" rx="19.47" ry="13.53"/>\n  <path fill="#FFFFFF" d="M33.43,43.9c-0.19,0-0.36-0.1-0.45-0.27c-0.1-0.19-0.06-0.42,0.08-0.57c0.01-0.01,0.76-0.81,1.19-1.75\n    c0.29-0.63-0.76-1.38-0.77-1.39c-0.19-0.13-0.26-0.38-0.18-0.59c0.08-0.21,0.3-0.34,0.53-0.32l14.81,1.91\n    c0.25,0.03,0.44,0.24,0.44,0.5c0,0.25-0.19,0.46-0.44,0.5l-15.16,1.99C33.47,43.89,33.45,43.9,33.43,43.9L33.43,43.9z M35.06,40.17\n    c0.25,0.46,0.36,1,0.11,1.55c-0.17,0.37-0.38,0.73-0.59,1.03l10.13-1.33C44.71,41.42,35.06,40.17,35.06,40.17z"/>\n  <path fill="#3F3F3F" d="M33.43,43.4c0,0,0.81-0.86,1.28-1.89c0.47-1.03-0.94-2.01-0.94-2.01l14.81,1.91L33.43,43.4L33.43,43.4z"/>\n  <path fill="#333333" d="M30.22,43.83c-0.55,0-1.15-0.05-1.58-0.22c-0.39-0.15-1.17-0.46-1.21-1.2l-1.97-19.66\n    c-0.03-0.33,0.1-0.66,0.36-0.88L26,21.73c-0.01-0.01-0.03-0.02-0.04-0.03c-0.05-0.05-0.1-0.1-0.14-0.16\n    c-1.16-1.13-1.83-2.68-1.83-4.29c0-1.6,0.62-3.11,1.74-4.24c1.12-1.13,2.62-1.76,4.22-1.76h0.01c1.59,0,3.09,0.62,4.21,1.75\n    s1.75,2.64,1.75,4.24c0,1.55-0.61,3.04-1.69,4.16c0.05,0.14,0.07,0.28,0.06,0.42c-0.1,1.48-1.1,20.03-1.11,20.22\n    c-0.01,0.18-0.07,0.36-0.17,0.51c-0.59,0.87-0.73,0.96-0.87,1.05c-0.16,0.1-0.39,0.21-0.72,0.18\n    C31.12,43.79,30.68,43.83,30.22,43.83L30.22,43.83z M29.42,42.22v0.02c0,0.04,0.01,0.08,0,0.12\n    C29.43,42.31,29.42,42.26,29.42,42.22L29.42,42.22z M29.37,41.74c0.24,0.09,0.98,0.11,1.71,0.04c0.04-0.05,0.07-0.1,0.11-0.15\n    c0.12-2.19,0.83-15.48,1.05-19.13c-0.39-0.09-0.69-0.42-0.75-0.81c-0.06-0.41,0.13-0.81,0.48-1.02l0.12-0.08\n    c0.06-0.04,0.12-0.09,0.19-0.14c0.07-0.05,0.12-0.09,0.15-0.12c0.02-0.03,0.05-0.05,0.08-0.07c0.9-0.77,1.41-1.87,1.41-3.03\n    c0-1.07-0.41-2.07-1.16-2.83c-0.75-0.75-1.74-1.16-2.79-1.16c-1.06,0-2.05,0.42-2.8,1.17c-0.75,0.76-1.16,1.76-1.16,2.83\n    c0,1.15,0.49,2.21,1.36,2.99c0.03,0.02,0.05,0.05,0.07,0.07l0.21,0.16c0.06,0.04,0.11,0.09,0.17,0.13\n    c0.09,0.06,0.19,0.11,0.29,0.16c0.41,0.21,0.66,0.69,0.55,1.14c-0.07,0.31-0.27,0.56-0.53,0.69l-0.62,0.5L29.37,41.74L29.37,41.74z\n    "/>\n  <path fill="#FABD2C" d="M26.45,22.64l5.6-1.2c0,0,1.12,0.24,1.14,0.24l-1.43,20.54l-0.35,0.53c0,0-1.68,0.21-2.41-0.08\n    c-0.58-0.23-0.58-0.34-0.58-0.34L26.45,22.64z"/>\n  <path fill="#FABD2C" d="M32.52,22.7l0.73-1.06c0,0,0.04,0.01,0.03,0.09c-0.1,1.5-1.11,20.23-1.11,20.23s-0.47,0.7-0.58,0.76\n    c-0.1,0.06-0.25,0.01-0.25,0.01s0.18-0.01,0.18-0.3C31.53,42.24,32.52,22.7,32.52,22.7L32.52,22.7z"/>\n  <path opacity="0.5" fill="#CE592C" enable-background="new    " d="M32.52,22.7l0.73-1.06c0,0,0.04,0.01,0.03,0.09\n    c-0.1,1.5-1.11,20.23-1.11,20.23s-0.47,0.7-0.58,0.76c-0.1,0.06-0.25,0.01-0.25,0.01s0.18-0.01,0.18-0.3\n    C31.53,42.24,32.52,22.7,32.52,22.7L32.52,22.7z"/>\n  <path fill="#CE592C" d="M33.25,21.65l-0.73,1.05l-6.07-0.06l1.2-0.97"/>\n  <ellipse opacity="0.5" fill="#CE592C" enable-background="new    " cx="30" cy="22.01" rx="2.13" ry="0.52"/>\n  <path fill="#CE592C" d="M31.24,33.25c-0.13,0.72,0.11,1.68-1.06,1.87c-0.83,0.13-0.88-0.7-0.94-0.99c0,0-0.47-3.98-0.63-6.18\n    c0,0-0.23-3.69-0.01-4c0.37-0.52,0.92-0.63,1.45-0.49c0.61,0.17,1.52,0.64,1.36,2c0,0-0.01,3.9,0,4.66\n    C31.41,31.06,31.24,33.25,31.24,33.25L31.24,33.25z"/>\n  <path fill="#E58A2C" d="M30.64,33.53c0.02,0.57,0.31,1.45-0.87,1.59c-1.17,0.14-1.21-0.86-1.27-1.14c0,0-0.42-2.16-0.58-4.36\n    c0,0-0.21-3.83-0.17-4.28c0.14-1.66,1.05-2.11,1.88-1.87c0.61,0.17,1.24,0.65,1.08,2.01c0,0-0.03,3.94-0.02,4.69\n    C30.71,31.1,30.64,33.53,30.64,33.53z"/>\n  <path fill="#FABD2C" d="M30.64,33.53c0.02,0.57,0.3,1.41-0.87,1.59c-0.83,0.13-0.88-0.7-0.94-0.99c0,0-0.47-3.98-0.63-6.18\n    c0,0-0.23-3.69,0-4c0.37-0.52,0.92-0.63,1.45-0.49c0.61,0.17,1.24,0.65,1.08,2.01c0,0-0.03,3.94-0.02,4.69\n    C30.71,31.1,30.64,33.53,30.64,33.53L30.64,33.53z"/>\n  <ellipse fill="#FABD2C" cx="29.95" cy="17.23" rx="4.96" ry="5"/>\n  <path opacity="0.25" fill="#CE592C" enable-background="new    " d="M29.97,21.74c1.19,0,2.3-0.27,3.24-0.75\n    c-0.87,0.77-2.01,1.24-3.26,1.24c-1.28,0-2.44-0.49-3.32-1.28C27.59,21.45,28.74,21.74,29.97,21.74z"/>\n</svg>\n;<svg xmlns="http://www.w3.org/2000/svg" width="60px" height="60px" viewBox="0 0 60 60">\n  <path opacity="0.3" fill="#111111" enable-background="new    " d="M30.33,27.19c-11.24,0-20.35,6.46-20.35,14.42\n    s9.11,14.42,20.35,14.42s20.35-6.46,20.35-14.42S41.57,27.19,30.33,27.19z M30.21,55.03c-10.75,0-19.47-6.06-19.47-13.53\n    s8.72-13.53,19.47-13.53s19.47,6.06,19.47,13.53S40.96,55.03,30.21,55.03z"/>\n  <ellipse opacity="0.1" fill="#111111" enable-background="new    " cx="30.21" cy="41.5" rx="19.47" ry="13.53"/>\n  <path opacity="0.3" enable-background="new    " d="M29.65,44.14l8.24-3.85l-4.47-2.69"/>\n  <path fill="#333333" d="M29.21,44.46c-0.16,0-0.31-0.03-0.46-0.09c-0.21-0.07-0.7-0.24-1.2-0.49c-0.74-0.37-1-1.07-1-1.54\n    l-0.51-6.63c-0.37-0.32-0.61-0.82-0.71-1.49c-0.02-0.11-0.54-2.33-0.68-4.59c-0.01-0.69-0.03-3.9,0.01-4.37\n    c0.05-0.67,0.2-1.24,0.45-1.69l-0.07-0.85c-0.04-0.48,0.27-0.91,0.73-1.04l0.14-0.04c-0.04-0.04-0.07-0.08-0.1-0.12\n    c-1.16-1.13-1.83-2.68-1.83-4.29c0-1.6,0.62-3.11,1.74-4.24c1.13-1.14,2.61-1.76,4.22-1.76c1.59,0,3.09,0.62,4.21,1.75\n    s1.74,2.64,1.75,4.24c0,1.59-0.64,3.11-1.77,4.24c0.05,0.02,0.09,0.03,0.14,0.06c0.36,0.18,0.6,0.64,0.58,1.04l-0.06,1.09\n    c0.01,0.12,0.01,0.24,0.01,0.37c0.04,0.92,0.16,3.59,0.21,4.13c0.08,0.84,0.37,3.06,0.37,3.06l0.03,0.19\n    c0.27,1.54-0.44,2.15-1.17,2.37c-0.17,3.07-0.31,5.61-0.31,5.76c-0.03,0.63-0.32,0.96-0.45,1.08c-0.85,0.93-0.9,0.96-1.02,1.04\n    c-0.26,0.17-0.61,0.22-0.96,0.12c-0.03-0.01-0.06-0.01-0.09-0.02C31.4,41.92,31.4,41.98,31.4,42c-0.01,0.69-0.31,1.08-0.5,1.26\n    c-0.83,0.85-0.91,0.91-0.95,0.95C29.73,44.38,29.47,44.46,29.21,44.46z M28.54,42.14c0.16,0.08,0.32,0.14,0.45,0.2\n    c0.15-0.15,0.3-0.31,0.4-0.41c0.01-0.17,0.04-0.69,0.22-3.12c0.04-0.52,0.47-0.92,0.99-0.93h0.01c0.52,0,0.95,0.39,1,0.91\n    l0.07,0.82c0.09-0.1,0.18-0.19,0.25-0.27c0.04-0.81,0.3-5.56,0.36-6.57c0.02-0.32,0.19-0.62,0.46-0.79\n    c0.21-0.13,0.46-0.18,0.7-0.14c-0.01-0.04-0.01-0.07-0.02-0.1c-0.02-0.1-0.03-0.19-0.04-0.28c0,0-0.29-2.27-0.38-3.12\n    c-0.07-0.7-0.21-4.15-0.21-4.3s-0.01-0.22-0.01-0.3V23.6l0.02-0.44l-1.25-0.36c-0.41-0.12-0.7-0.48-0.72-0.9s0.22-0.82,0.61-0.98\n    c0.04-0.02,0.07-0.04,0.11-0.06l0.15-0.08c0.13-0.06,0.25-0.13,0.37-0.2l0.21-0.15l0.14-0.1l0.08-0.08\n    c0.9-0.77,1.41-1.87,1.41-3.03c0-1.07-0.41-2.07-1.16-2.83c-0.75-0.75-1.74-1.16-2.79-1.16c-1.06,0-2.05,0.42-2.8,1.17\n    c-0.75,0.76-1.16,1.76-1.16,2.83c0,1.15,0.49,2.21,1.36,2.99c0.03,0.02,0.05,0.05,0.07,0.07l0.22,0.16\n    c0.05,0.04,0.11,0.09,0.16,0.12c0.1,0.07,0.21,0.12,0.32,0.17l0.2,0.1c0.04,0.02,0.09,0.05,0.13,0.07c0.05,0.02,0.1,0.03,0.15,0.05\n    L28.76,21c0.42,0.14,0.7,0.53,0.69,0.97s-0.31,0.82-0.73,0.94l-1.6,0.45l0.03,0.37c0.02,0.25-0.06,0.5-0.21,0.7\n    c-0.06,0.08-0.22,0.34-0.27,0.96c-0.02,0.26-0.02,2.31,0,4.15c0.13,2.03,0.63,4.16,0.63,4.19c0.01,0.03,0.03,0.15,0.03,0.18\n    c0.01,0.05,0.02,0.16,0.04,0.24c0.36,0.14,0.61,0.47,0.64,0.86L28.54,42.14L28.54,42.14z M29.63,41.72\n    C29.62,41.72,29.62,41.72,29.63,41.72C29.62,41.72,29.62,41.72,29.63,41.72z M32.06,39.2c-0.03,0.02-0.05,0.04-0.06,0.07\n    C32.04,39.22,32.06,39.2,32.06,39.2z"/>\n  <path fill="#FABD2C" d="M34.38,31.34c0.06,0.52,0.36,1.3-0.56,1.51c-0.92,0.21-1.03-0.7-1.1-0.95c0,0-0.65-1.97-0.95-3.96\n    c0,0-0.33-3.44-0.33-3.85c-0.02-1.52,0.66-1.99,1.35-1.84c0.5,0.11,1.03,0.5,1.01,1.75c0,0,0.15,3.56,0.21,4.24\n    C34.09,29.09,34.38,31.34,34.38,31.34z"/>\n  <path fill="#CE592C" d="M34.38,31.34c0.06,0.52,0.36,1.3-0.56,1.51c-0.92,0.21-1.03-0.7-1.1-0.95c0,0-0.65-1.97-0.95-3.96\n    c0,0-0.33-3.44-0.33-3.85c-0.02-1.52,0.66-1.99,1.35-1.84c0.5,0.11,1.03,0.5,1.01,1.75c0,0,0.15,3.56,0.21,4.24\n    C34.09,29.09,34.38,31.34,34.38,31.34z"/>\n  <path fill="#FABD2C" d="M26.04,22.64l4.31-1.2c0,0,3.41,1.02,3.43,1.02L32.8,39.77l-1.04,1.03c0,0-0.81-0.22-0.91-0.26\n    c-0.1-0.03-0.1-0.18-0.1-0.18l-0.15-1.68l-0.7,4.1l-0.72,0.66c0,0-0.6-0.18-1.16-0.47c-0.45-0.23-0.45-0.65-0.45-0.65L26.04,22.64z\n    "/>\n  <path fill="#FABD2C" d="M29.92,23.71l3.89-1.29c0,0,0.03,0.01,0.03,0.09c-0.08,1.5-0.91,16.72-0.92,16.99s-0.12,0.37-0.12,0.37\n    s-0.82,0.89-0.88,0.93c-0.06,0.04-0.17,0-0.17,0s0.08-0.04,0.09-0.23s-0.38-7.48-0.38-7.48c-0.01-0.37-0.07-0.52-0.23-0.52\n    c-0.15,0-0.19,0.15-0.19,0.53c0,0-0.63,8.45-0.64,8.88s-0.2,0.56-0.2,0.56s-0.82,0.83-0.89,0.89c-0.08,0.06-0.19,0.01-0.19,0.01\n    s0.14-0.01,0.14-0.3C29.25,42.94,29.92,23.71,29.92,23.71z"/>\n  <path opacity="0.3" fill="#CE592C" enable-background="new    " d="M29.92,23.71l3.89-1.29c0,0,0.03,0.01,0.03,0.09\n    c-0.08,1.5-0.91,16.72-0.92,16.99s-0.12,0.37-0.12,0.37s-0.82,0.89-0.88,0.93c-0.06,0.04-0.17,0-0.17,0s0.08-0.04,0.09-0.23\n    s-0.38-7.48-0.38-7.48c-0.01-0.37-0.07-0.52-0.23-0.52c-0.15,0-0.19,0.15-0.19,0.53c0,0-0.63,8.45-0.64,8.88s-0.2,0.56-0.2,0.56\n    s-0.82,0.83-0.89,0.89c-0.08,0.06-0.19,0.01-0.19,0.01s0.14-0.01,0.14-0.3C29.25,42.94,29.92,23.71,29.92,23.71z"/>\n  <path fill="#CE592C" d="M33.82,22.42l-3.9,1.29l-3.88-1.07l4.36-1.2"/>\n  <ellipse opacity="0.5" fill="#CE592C" enable-background="new    " cx="30.19" cy="22.4" rx="2.13" ry="0.52"/>\n  <path fill="#CE592C" d="M25.92,25.66c0.04-1.67,0.72-2.46,1.44-2.22c0.81,0.27,1.29,1.03,1.21,2.4c0,0-0.07,3.73-0.03,4.48\n    c0.05,0.93,0.27,3.4,0.27,3.4c0.05,0.57,0.33,1.44-0.68,1.63c-0.22,0.04-0.39-0.01-0.53-0.12l-0.28-0.43c0,0-0.97-2.72-1.21-4.91\n    C26.11,29.87,25.91,26.11,25.92,25.66z"/>\n  <path fill="#FABD2C" d="M28.16,33.53c0.02,0.57,0.27,1.45-0.76,1.59c-1.02,0.14-1.05-0.86-1.11-1.14c0,0-0.52-2.21-0.66-4.41\n    c0,0-0.03-3.78,0.01-4.23c0.12-1.66,0.91-2.11,1.64-1.87c0.53,0.17,1.08,0.65,0.94,2.01c0,0-0.18,3.89-0.18,4.64\n    C28.06,31.05,28.16,33.53,28.16,33.53z"/>\n  <ellipse fill="#FABD2C" cx="29.94" cy="17.23" rx="4.96" ry="5"/>\n  <path opacity="0.25" fill="#CE592C" enable-background="new    " d="M29.96,21.74c1.19,0,2.3-0.27,3.24-0.75\n    c-0.87,0.77-2.01,1.24-3.26,1.24c-1.28,0-2.44-0.49-3.32-1.28C27.59,21.45,28.73,21.74,29.96,21.74z"/>\n  <path opacity="0.8" fill="#CE592C" enable-background="new    " d="M32.76,22.77l-0.94,4.66l-0.76-4.1"/>\n  <path opacity="0.25" fill="#CF572E" enable-background="new    " d="M28.14,33.53c0.04,1.16-0.54,0.95-0.82,0.81\n    c-0.99-0.52-1.09-5.12-1.2-6.56c-0.07-0.97-0.16-3.58,0.78-4.26c0.55-0.21,1.04,0.42,1.09,0.51c0.19,0.31,0.29,0.77,0.22,1.45\n    c0,0-0.18,3.89-0.18,4.64C28.04,31.05,28.14,33.53,28.14,33.53L28.14,33.53z"/>\n  <path fill="#FFFFFF" d="M47.48,45.15C47.47,45.15,47.47,45.15,47.48,45.15l-15.9-0.08c-0.22,0-0.42-0.15-0.48-0.37\n    s0.03-0.45,0.23-0.56c0.66-0.39,2.48-1.56,2.96-2.25c0.57-0.8,0.71-2.24,0.71-2.26c0.01-0.16,0.1-0.3,0.24-0.38\n    c0.14-0.08,0.3-0.09,0.45-0.03l11.98,4.97c0.22,0.09,0.35,0.33,0.3,0.56C47.92,44.99,47.71,45.15,47.48,45.15z M33.25,44.09\n    l11.68,0.06l-9.04-3.75c-0.11,0.59-0.34,1.45-0.79,2.08C34.75,42.98,33.97,43.59,33.25,44.09L33.25,44.09z"/>\n  <path fill="#3F3F3F" d="M31.58,44.58c0,0,2.46-1.47,3.12-2.39c0.66-0.93,0.8-2.5,0.8-2.5l11.98,4.97L31.58,44.58z"/>\n</svg>\n;<svg xmlns="http://www.w3.org/2000/svg" width="60px" height="60px" viewBox="0 0 60 60">\n  <path opacity="0.3" fill="#111111" enable-background="new    " d="M30.33,27.19c-11.24,0-20.35,6.46-20.35,14.42\n    s9.11,14.42,20.35,14.42s20.35-6.46,20.35-14.42C50.68,33.64,41.57,27.19,30.33,27.19z M30.21,55.03\n    c-10.75,0-19.47-6.06-19.47-13.53s8.72-13.53,19.47-13.53s19.47,6.06,19.47,13.53S40.96,55.03,30.21,55.03z"/>\n  <ellipse opacity="0.1" fill="#111111" enable-background="new    " cx="30.21" cy="41.5" rx="19.47" ry="13.53"/>\n  <path fill="#333333" d="M27.43,44.47c-0.26,0-0.52-0.09-0.7-0.28c-0.12-0.12-0.75-0.76-0.99-1.1c-0.37-0.51-0.41-1.07-0.41-1.3\n    l-0.38-6.47c-0.2-0.3-0.3-0.68-0.41-1.09l-0.05-0.17c-0.04-0.18-0.5-2.67-0.64-4.9c-0.04-0.8-0.18-3.42-0.14-3.9\n    c0.06-0.75,0.24-1.37,0.54-1.84l-0.03-0.52c-0.03-0.1-0.04-0.2-0.03-0.31c0.03-0.45,0.33-0.84,0.78-0.93l0.81-0.17\n    c-1.15-1.13-1.8-2.66-1.8-4.26c0-1.61,0.62-3.12,1.75-4.25c1.12-1.13,2.62-1.75,4.2-1.75h0.01c1.59,0,3.09,0.62,4.21,1.75\n    s1.74,2.64,1.75,4.24c0,1.52-0.59,2.98-1.63,4.09l0.37,0.11c0.06,0.01,0.11,0.02,0.16,0.04c0.47,0.15,0.77,0.59,0.74,1.09\n    c0.23,0.44,0.34,0.98,0.33,1.62c0.04,0.93,0.16,3.59,0.21,4.13c0.08,0.86,0.17,3.01,0.17,3.1v0.02c0,0.08,0.01,0.17,0.01,0.25\n    c0.03,0.51,0.1,1.83-1.44,2.16c-0.2,3.24-0.36,5.94-0.37,6.07c-0.04,0.61-0.39,1.02-0.7,1.19c-1.32,0.91-1.41,0.95-1.52,0.99\n    c-0.01,0.01-0.03,0.01-0.05,0.02c-0.19,0.09-0.39,0.11-0.61,0.06c-0.08-0.01-0.14-0.02-0.17-0.02c-0.16-0.03-0.31-0.1-0.43-0.19\n    c-0.11-0.04-0.23-0.09-0.34-0.13c-0.01,0.1-0.02,0.15-0.02,0.18c-0.02,0.72-0.45,1.19-0.84,1.4c-0.21,0.12-1.48,0.86-1.6,0.92\n    c-0.18,0.1-0.39,0.14-0.61,0.14h-0.01C27.52,44.47,27.47,44.47,27.43,44.47z M26.6,34.17c0.19,0.17,0.31,0.42,0.33,0.68l0.4,6.87\n    v0.12c0,0.01,0.01,0.07,0.03,0.09c0.05,0.07,0.18,0.22,0.33,0.38c0.32-0.18,0.72-0.42,0.95-0.55c0.03-0.33,0.16-1.33,0.66-4.95\n    c0.07-0.5,0.49-0.86,0.99-0.86h0.03c0.51,0.01,0.93,0.41,0.97,0.91l0.28,3.18c0.05,0.02,0.1,0.04,0.14,0.05\n    c0.22-0.15,0.55-0.38,0.76-0.52c0.05-0.82,0.22-3.69,0.42-6.86c0.02-0.37,0.25-0.7,0.6-0.85c0.25-0.11,0.53-0.11,0.78-0.01V31.8\n    c-0.01-0.1-0.01-0.21-0.01-0.31c-0.01-0.17-0.09-2.2-0.16-2.98c-0.07-0.7-0.21-4.15-0.22-4.29c0.01-0.55-0.1-0.72-0.13-0.76\n    l-0.02-0.02c-0.02-0.01-0.03-0.02-0.05-0.02c-0.13-0.06-0.24-0.15-0.32-0.25l-1.56-0.45c-0.4-0.11-0.68-0.46-0.72-0.87\n    c-0.04-0.41,0.18-0.8,0.55-0.99c0.2-0.1,0.33-0.17,0.44-0.24c0.07-0.04,0.13-0.1,0.2-0.15l0.14-0.1c0.03-0.03,0.05-0.06,0.08-0.08\n    c0.9-0.77,1.41-1.87,1.41-3.03c0-1.07-0.41-2.07-1.16-2.83c-0.75-0.75-1.74-1.16-2.79-1.16s-2.04,0.41-2.79,1.16\n    c-0.75,0.76-1.17,1.76-1.17,2.84c0,1.15,0.49,2.21,1.36,2.99c0.03,0.02,0.05,0.05,0.08,0.07l0.12,0.09c0,0,0.08,0.06,0.08,0.07\n    c0.06,0.05,0.11,0.09,0.17,0.13c0.1,0.07,0.21,0.12,0.32,0.17l0.2,0.1c0.04,0.02,0.09,0.05,0.13,0.07c0.05,0.02,0.1,0.03,0.15,0.05\n    l0.14,0.04c0.43,0.14,0.71,0.55,0.69,1.01c-0.03,0.45-0.35,0.83-0.8,0.92l-2.37,0.49l0.01,0.24c0.02,0.28-0.08,0.55-0.28,0.75\n    c-0.05,0.06-0.23,0.29-0.28,0.99c-0.02,0.27,0.06,2.06,0.14,3.63c0.13,2.1,0.59,4.55,0.59,4.57l0.03,0.1\n    C26.52,33.88,26.57,34.06,26.6,34.17L26.6,34.17z M32.69,39.41c-0.03,0.02-0.05,0.03-0.07,0.05\n    C32.67,39.43,32.69,39.41,32.69,39.41z"/>\n  <path fill="#FABD2C" d="M25.21,22.64l4.46-0.83c0,0,2.42,0.35,2.43,0.35l0.46,17.98l-0.78,1.03c0,0-1.02-0.38-1.1-0.41\n    s-0.07-0.18-0.07-0.18l-0.66-7.54l-1.46,9.74l-1.04,0.7c0,0-0.68-0.69-0.89-0.98c-0.24-0.33-0.22-0.73-0.22-0.73L25.21,22.64z"/>\n  <path fill="#CE592C" d="M24.75,25.66c0.04-1.67,0.72-2.46,1.44-2.22c0.81,0.27,1.29,1.03,1.21,2.4c0,0-0.07,3.73-0.03,4.48\n    c0.05,0.93,0.27,3.4,0.27,3.4c0.05,0.57,0.33,1.44-0.68,1.63c-0.22,0.04-0.39-0.01-0.53-0.12l-0.28-0.43c0,0-0.97-2.72-1.21-4.91\n    C24.95,29.87,24.74,26.11,24.75,25.66z"/>\n  <path fill="#FABD2C" d="M27.23,33.53c0.02,0.57,0.27,1.23-0.75,1.41c-0.74,0.13-0.75-0.11-1.02-1.13c0,0-0.47-2.5-0.61-4.71\n    c0,0-0.18-3.31-0.14-3.76c0.12-1.66,0.91-2.11,1.64-1.87c0.53,0.17,1.08,0.65,0.94,2.01c0,0-0.18,3.89-0.18,4.64\n    C27.12,31.05,27.23,33.53,27.23,33.53L27.23,33.53z"/>\n  <path opacity="0.25" fill="#CF572E" enable-background="new    " d="M27.23,33.53c0.04,1.16-0.58,1-0.82,0.81\n    c-0.63-0.5-0.71-5.21-0.82-6.64c-0.07-0.97,0.09-3.4,0.4-4.17c0.55-0.21,1.04,0.42,1.09,0.51c0.19,0.31,0.29,0.77,0.22,1.45\n    c0,0-0.18,3.89-0.18,4.64C27.12,31.05,27.23,33.53,27.23,33.53z"/>\n  <path fill="#FABD2C" d="M35.25,31.45c0.01,0.67,0.2,1.27-0.73,1.43c-0.91,0.15-0.86-0.61-0.93-0.87c0,0-0.45-1.92-0.75-3.91\n    c0,0-0.33-3.44-0.33-3.85c-0.02-1.52,0.66-1.99,1.35-1.84c0.5,0.11,1.03,0.5,1.01,1.75c0,0,0.15,3.56,0.21,4.24\n    C35.16,29.24,35.25,31.45,35.25,31.45L35.25,31.45z"/>\n  <path fill="#CE592C" d="M35.25,31.45c0.01,0.67,0.2,1.27-0.73,1.43c-0.91,0.15-0.86-0.61-0.93-0.87c0,0-0.45-1.92-0.75-3.91\n    c0,0-0.33-3.44-0.33-3.85c-0.02-1.52,0.66-1.99,1.35-1.84c0.5,0.11,1.03,0.5,1.01,1.75c0,0,0.15,3.56,0.21,4.24\n    C35.16,29.24,35.25,31.45,35.25,31.45L35.25,31.45z"/>\n  <path fill="#FABD2C" d="M28.33,23.71l6.17-1.29c0,0,0.05,0.01,0.04,0.09c-0.13,1.5-1.07,17.08-1.09,17.34\n    c-0.02,0.27-0.19,0.37-0.19,0.37s-1.3,0.89-1.39,0.93c-0.09,0.04-0.27,0-0.27,0s0.13-0.04,0.14-0.23c0.02-0.19-0.3-7.46-0.3-7.46\n    c-0.01-0.37-0.11-0.52-0.36-0.52s-0.29,0.15-0.31,0.53c0,0-1.14,8.05-1.15,8.48c-0.01,0.43-0.31,0.56-0.31,0.56\n    s-1.47,0.86-1.59,0.92c-0.12,0.06-0.3,0.01-0.3,0.01s0.22-0.01,0.22-0.3C27.64,42.94,28.33,23.71,28.33,23.71L28.33,23.71z"/>\n  <path opacity="0.3" fill="#CE592C" enable-background="new    " d="M28.33,23.71l6.17-1.29c0,0,0.05,0.01,0.04,0.09\n    c-0.13,1.5-1.07,17.08-1.09,17.34c-0.02,0.27-0.19,0.37-0.19,0.37s-1.3,0.89-1.39,0.93c-0.09,0.04-0.27,0-0.27,0\n    s0.13-0.04,0.14-0.23c0.02-0.19-0.3-7.46-0.3-7.46c-0.01-0.37-0.11-0.52-0.36-0.52s-0.29,0.15-0.31,0.53c0,0-1.14,8.05-1.15,8.48\n    c-0.01,0.43-0.31,0.56-0.31,0.56s-1.47,0.86-1.59,0.92c-0.12,0.06-0.3,0.01-0.3,0.01s0.22-0.01,0.22-0.3\n    C27.64,42.94,28.33,23.71,28.33,23.71L28.33,23.71z"/>\n  <path opacity="0.5" fill="#CE592C" enable-background="new    " d="M33.15,22.67l-2.02,4.98l-1.23-4.26"/>\n  <path opacity="0.8" fill="#CE592C" enable-background="new    " d="M33.15,22.67l-2.02,4.98l-1.23-4.26"/>\n  <path fill="#CE592C" d="M34.46,22.42l-6.14,1.29l-3.15-1.07l5.88-1.2"/>\n  <ellipse opacity="0.5" fill="#CE592C" enable-background="new    " cx="30" cy="22.4" rx="2.25" ry="0.43"/>\n  <ellipse fill="#FABD2C" cx="29.94" cy="17.23" rx="4.96" ry="5"/>\n  <path opacity="0.25" fill="#CE592C" enable-background="new    " d="M29.96,21.74c1.19,0,2.3-0.27,3.24-0.75\n    c-0.87,0.77-2.01,1.24-3.26,1.24c-1.28,0-2.44-0.49-3.32-1.28C27.58,21.45,28.73,21.74,29.96,21.74z"/>\n  <path fill="#FFFFFF" d="M44.83,48.74c-0.04,0-0.08,0-0.11-0.01l-14.45-3.4c-0.22-0.05-0.38-0.25-0.39-0.48\n    c0-0.23,0.15-0.43,0.37-0.49c0.86-0.24,3.23-0.97,3.87-1.51c0.62-0.53,1.11-1.63,1.25-2.01c0.05-0.15,0.18-0.27,0.33-0.31\n    c0.16-0.04,0.32-0.01,0.45,0.09l8.99,7.24c0.18,0.15,0.24,0.4,0.14,0.61C45.19,48.63,45.01,48.74,44.83,48.74L44.83,48.74z\n     M32.27,44.77l10.53,2.48l-6.76-5.44c-0.26,0.54-0.7,1.31-1.28,1.8C34.27,44.01,33.21,44.44,32.27,44.77z"/>\n  <path fill="#3F3F3F" d="M30.37,44.83c0,0,3.19-0.88,4.06-1.61c0.87-0.73,1.4-2.22,1.4-2.22l8.99,7.24L30.37,44.83z"/>\n</svg>\n;<svg xmlns="http://www.w3.org/2000/svg" width="60px" height="60px" viewBox="0 0 60 60">\n  <path opacity="0.3" fill="#111111" enable-background="new    " d="M30.33,27.19c-11.24,0-20.35,6.46-20.35,14.42\n    s9.11,14.42,20.35,14.42s20.35-6.46,20.35-14.42S41.57,27.19,30.33,27.19z M30.21,55.03c-10.75,0-19.47-6.06-19.47-13.53\n    s8.72-13.53,19.47-13.53s19.47,6.06,19.47,13.53S40.96,55.03,30.21,55.03z"/>\n  <ellipse opacity="0.1" fill="#111111" enable-background="new    " cx="30.21" cy="41.5" rx="19.47" ry="13.53"/>\n  <g>\n    <path fill="#FFFFFF" d="M40.14,52.96c-0.09,0-0.18-0.02-0.26-0.07l-12.27-7.33c-0.19-0.12-0.29-0.35-0.22-0.56\n      c0.06-0.22,0.26-0.37,0.48-0.37c1.16,0.01,4.24-0.05,5.06-0.32c0.68-0.22,1.75-1.35,2.26-2.02c0.11-0.14,0.28-0.21,0.45-0.19\n      c0.17,0.02,0.32,0.13,0.4,0.29l4.55,9.86c0.09,0.2,0.04,0.43-0.12,0.58C40.38,52.92,40.26,52.96,40.14,52.96z M29.64,45.6L39,51.2\n      l-3.54-7.68c-0.55,0.61-1.42,1.47-2.22,1.73C32.57,45.48,30.94,45.57,29.64,45.6L29.64,45.6z"/>\n    <path fill="#3F3F3F" d="M27.87,45.13c0,0,4.14,0.01,5.22-0.35c1.08-0.35,2.5-2.18,2.5-2.18l4.55,9.86L27.87,45.13z"/>\n    <path fill="#333333" d="M26.53,43.7c-0.18,0-0.37-0.03-0.58-0.08l-0.5-0.14l-0.11-0.3c-0.65-0.61-1.01-1.18-1.06-1.69\n      c-0.02-0.2-0.04-0.42-0.01-0.65l-0.17-5.13c-0.05,0.01-0.09,0.02-0.13,0.02c-0.53,0.08-1.22-0.13-1.58-0.26\n      c-0.62-0.16-1.02-0.85-0.9-1.64c0.08-0.68,0.45-3.36,0.75-5.23c0.4-2.47,0.88-4.5,0.9-4.58c0.06-0.39,0.25-0.83,0.53-1.2\n      l-0.01-0.46c-0.01-0.33,0.11-0.65,0.34-0.9s0.54-0.38,0.88-0.39l0.47-0.01c-0.86-1.05-1.37-2.39-1.37-3.82\n      c0-1.6,0.62-3.11,1.74-4.24c1.12-1.13,2.62-1.76,4.22-1.76h0.01c1.59,0,3.09,0.62,4.21,1.75s1.74,2.64,1.75,4.24\n      c0,1.62-0.63,3.12-1.71,4.22c0.37,0.21,0.8,0.46,1.15,0.68c1.08,0.67,1.28,1.95,1.31,2.31c0.21,1.1,0.74,3.9,0.88,4.48\n      c0.23,0.93,0.66,3.25,0.68,3.35c0.02,0.12,0.04,0.21,0.06,0.3c0.11,0.54,0.4,1.96-1.3,2.51c-0.54,0.17-1.03,0.15-1.45-0.06\n      c-0.35-0.18-0.57-0.46-0.71-0.72c-0.22,3.57-0.41,6.62-0.42,6.74c-0.04,0.61-0.39,1.01-0.7,1.19l-0.29,0.11\n      c0,0-1.71,0.35-2.08,0.44l-0.04,0.03l-0.25,0.04c-0.14,0.02-0.42,0.03-0.7-0.09c-0.1-0.04-0.17-0.07-0.51-0.36\n      c-0.18,0.41-0.49,0.68-0.77,0.8l-0.22,0.07c-0.72,0.13-1.59,0.31-1.82,0.37C26.88,43.67,26.71,43.7,26.53,43.7L26.53,43.7z\n       M26.21,41.78c0,0-0.01,0-0.01,0.01C26.2,41.79,26.21,41.79,26.21,41.78z M26.28,41.24c0.06,0.1,0.19,0.25,0.35,0.41\n      c0.25-0.06,0.66-0.14,1.36-0.28c0.07-0.72,0.3-2.64,0.67-5.71l1.99,0.1l0.11,4.79c0.09,0.08,0.18,0.16,0.27,0.23\n      c0.25-0.06,0.67-0.15,1.4-0.3c0.09-1.51,0.42-6.79,0.69-11.21l1.95-0.23c0.39,1.26,0.83,2.48,1.1,3.21\n      c-0.13-0.69-0.42-2.2-0.58-2.86c-0.19-0.75-0.89-4.48-0.92-4.63l-0.02-0.13c-0.01-0.19-0.12-0.64-0.37-0.8\n      c-0.55-0.34-1.3-0.77-1.68-0.98l-0.81,0.02l-0.4-1.93c1.52-0.61,2.5-2.07,2.5-3.71c0-1.07-0.41-2.07-1.16-2.83\n      c-0.75-0.75-1.74-1.16-2.79-1.16c-1.06,0-2.05,0.42-2.8,1.17c-0.75,0.76-1.16,1.76-1.16,2.83c0,1.72,1.09,3.24,2.71,3.79\n      l-0.29,1.95l-2.71,0.08l0.02,0.57l-0.35,0.31c-0.12,0.11-0.23,0.31-0.25,0.47c-0.02,0.1-0.5,2.12-0.89,4.51\n      c-0.31,1.92-0.59,3.97-0.7,4.8c0.02,0,0.03,0.01,0.04,0.01L24,31.81L25.97,32L26.28,41.24L26.28,41.24z M22.99,33.56\n      c0.03,0.01,0.05,0.02,0.08,0.03C23.04,33.58,23.02,33.57,22.99,33.56z"/>\n    <path fill="#FABD2C" d="M37.24,32.44c0.12,0.73,0.42,1.35-0.57,1.67c-0.97,0.31-1.03-0.53-1.15-0.79c0,0-0.79-2.02-1.44-4.14\n      c0,0-0.9-3.69-0.98-4.14c-0.26-1.66,0.41-2.27,1.17-2.21c0.56,0.04,1.2,0.38,1.38,1.75c0,0,0.72,3.85,0.91,4.58\n      C36.79,30.06,37.24,32.44,37.24,32.44L37.24,32.44z"/>\n    <path opacity="0.25" fill="#CF572E" enable-background="new    " d="M34.23,29.87l0.2-7.11l0.41,0.31c0,0-0.06,5.4,0.11,6.64\n      c0.17,1.24,0.45,3.13,0.45,3.13L34.23,29.87L34.23,29.87z"/>\n    <path fill="#E58A2C" d="M24.66,22.08l0.61,18.85c0,0-0.04,0.03,0.01,0.47c0.05,0.48,0.95,1.24,0.95,1.24l1.86-0.57l1.26-10.05\n      l0.23,0.77l0.19,8.22l0.95,0.81l0.18,0.02l1.44-1.03l0.51-18.03l-2.05-0.32L24.66,22.08"/>\n    <path fill="#FABD2C" d="M34.51,22.74L26.24,23c-0.49,15.18,0.06,15.86-0.04,19.32c-0.01,0.29,0.02,0.32,0.02,0.32\n      s0.18,0.05,0.33,0.05c0.05,0,0.09-0.01,0.12-0.02c0.13-0.07,2-0.41,2-0.41s0.3-0.14,0.31-0.57c0.02-0.43,0.88-7.48,0.88-7.48\n      c0.05-0.65,0.14-0.75,0.39-0.76c0.25,0.01,0.35,0.16,0.36,0.53c0,0,0.3,7.4,0.28,7.59c-0.02,0.2-0.14,0.23-0.14,0.23H31\n      c0.09-0.04,2.21-0.48,2.21-0.48s0.18-0.1,0.2-0.37L34.51,22.74"/>\n    <path opacity="0.1" fill="#CE592C" enable-background="new    " d="M34.51,22.74L26.24,23c-0.49,15.18,0.06,15.86-0.04,19.32\n      c-0.01,0.29,0.02,0.32,0.02,0.32s0.18,0.05,0.33,0.05c0.05,0,0.09-0.01,0.12-0.02c0.13-0.07,2-0.41,2-0.41s0.3-0.14,0.31-0.57\n      c0.02-0.43,0.88-7.48,0.88-7.48c0.05-0.65,0.14-0.75,0.39-0.76c0.25,0.01,0.35,0.16,0.36,0.53c0,0,0.3,7.4,0.28,7.59\n      c-0.02,0.2-0.14,0.23-0.14,0.23H31c0.09-0.04,2.21-0.48,2.21-0.48s0.18-0.1,0.2-0.37L34.51,22.74"/>\n    <path fill="#CE592C" d="M32.87,21.84l-8.21,0.24l1.56,0.95l8.25-0.29L32.87,21.84"/>\n    <ellipse opacity="0.5" fill="#CE592C" enable-background="new    " cx="29.98" cy="22.37" rx="2.25" ry="0.3"/>\n    <ellipse fill="#FABD2C" cx="29.94" cy="17.23" rx="4.96" ry="5"/>\n    <path opacity="0.8" fill="#CE592C" enable-background="new    " d="M33.29,22.77l-3.09,5.36l-2.77-5.3"/>\n    <path opacity="0.25" fill="#CE592C" enable-background="new    " d="M29.97,21.74c1.19,0,2.3-0.27,3.24-0.75\n      c-0.87,0.77-2.01,1.24-3.26,1.24c-1.28,0-2.44-0.49-3.32-1.28C27.59,21.45,28.74,21.74,29.97,21.74z"/>\n    <path fill="#FABD2C" d="M25.91,26.06c-0.1,1.59-0.92,5.97-0.92,5.97l-0.54,2.33c-0.08,0.24-0.27,0.33-0.62,0.38\n      c-0.35,0.05-1.09-0.21-1.09-0.21c-0.23-0.06-0.29-0.3-0.25-0.55c0,0,0.35-2.72,0.75-5.23c0.4-2.46,0.89-4.51,0.89-4.51\n      c0.1-0.61,0.59-1.29,1.17-1.34c0,0,0.69,0,0.71,1.06C26.03,25.08,25.91,26.06,25.91,26.06z"/>\n    <path opacity="0.25" fill="#CF572E" enable-background="new    " d="M25.49,22.95c0.2,0.08,0.5,0.32,0.52,1.01\n      c0.03,1.12-0.1,2.1-0.1,2.1c-0.09,1.36-0.7,4.73-0.87,5.7l-0.01,0.05C25.02,31.81,25.6,26.32,25.49,22.95L25.49,22.95z"/>\n  </g>\n</svg>\n;<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="60px" height="60px" viewBox="0 0 60 60">\n  <path opacity="0.3" fill="#111111" enable-background="new    " d="M30.33,27.19c-11.24,0-20.35,6.46-20.35,14.42\n    s9.11,14.42,20.35,14.42s20.35-6.46,20.35-14.42C50.68,33.64,41.57,27.19,30.33,27.19L30.33,27.19z M30.21,55.03\n    c-10.75,0-19.47-6.06-19.47-13.53s8.72-13.53,19.47-13.53s19.47,6.06,19.47,13.53S40.96,55.03,30.21,55.03z"/>\n  <ellipse opacity="0.1" fill="#111111" enable-background="new    " cx="30.21" cy="41.5" rx="19.47" ry="13.53"/>\n  <g>\n    <path fill="#FFFFFF" d="M30.79,54.8c-0.18,0-0.35-0.1-0.43-0.25l-5.83-10.24c-0.1-0.17-0.08-0.38,0.03-0.54\n      c0.12-0.16,0.31-0.23,0.51-0.19c1.16,0.25,4.37,0.89,5.26,0.89c0.98,0,3.52-0.73,4.42-1.01c0.18-0.05,0.38,0,0.52,0.14\n      s0.17,0.34,0.1,0.52l-4.11,10.37c-0.07,0.18-0.24,0.3-0.43,0.31L30.79,54.8L30.79,54.8z M25.95,44.77l4.76,8.37l3.34-8.44\n      c-1.1,0.31-2.84,0.76-3.73,0.76C29.51,45.46,27.29,45.04,25.95,44.77z"/>\n    <path fill="#3F3F3F" d="M24.96,44.06c0,0,4.29,0.9,5.43,0.9c1.16,0,4.5-1.03,4.5-1.03L30.78,54.3L24.96,44.06z"/>\n    <path fill="#333333" d="M34.25,23.78h-8.51c-0.42,0-0.8-0.26-0.94-0.66c-0.14-0.4-0.02-0.84,0.3-1.11l0.64-0.53\n      c-1.12-1.12-1.77-2.65-1.77-4.25c0-3.3,2.69-5.99,5.98-5.99c1.6,0,3.1,0.63,4.23,1.76s1.75,2.64,1.75,4.24\n      c0,1.45-0.53,2.83-1.49,3.93c-0.03,0.05-0.07,0.1-0.11,0.14l-0.13,0.13l-0.03,0.03l0.68,0.52c0.34,0.26,0.48,0.71,0.34,1.12\n      C35.06,23.51,34.68,23.78,34.25,23.78L34.25,23.78z M29.49,21.78h0.93c0.08-0.33,0.33-0.6,0.68-0.71c0.08-0.03,0.17-0.06,0.25-0.1\n      l0.12-0.05c0.25-0.11,0.45-0.21,0.63-0.34l0.11-0.07c0.14-0.1,0.28-0.22,0.42-0.35c0.01-0.01,0.08-0.07,0.09-0.08l0.05-0.05\n      c0.02-0.02,0.04-0.04,0.05-0.06c0.71-0.75,1.1-1.72,1.1-2.74c0-1.07-0.41-2.07-1.16-2.83c-0.75-0.75-1.75-1.17-2.81-1.17\n      c-2.19,0-3.98,1.79-3.98,3.99c0,1.3,0.64,2.52,1.71,3.27c0.05,0.03,0.09,0.07,0.13,0.11c0.3,0.19,0.64,0.35,1,0.46\n      C29.16,21.18,29.41,21.45,29.49,21.78z"/>\n    <path fill="#333333" d="M33.98,43.59h-3.04c-0.45,0-0.84-0.3-0.96-0.72c-0.12,0.42-0.51,0.72-0.96,0.72h-3\n      c-0.55,0-0.99-0.44-1-0.99l-0.13-9.18l-0.38,0.97c-0.3,0.71-1.04,1.08-1.78,0.89l-1.02-0.33c-0.74-0.27-1.13-1.03-0.94-1.78\n      c0.01-0.04,0.02-0.07,0.03-0.1c0.02-0.08,2.56-9.46,2.56-9.46c0.23-0.93,1.04-1.66,1.96-1.79c0.08-0.02,0.17-0.03,0.26-0.03h8.84\n      c0.07,0,0.14,0.01,0.21,0.02c0.96,0.1,1.8,0.83,2.04,1.79c2.08,8.08,2.4,9.32,2.46,9.53c0.2,0.78-0.14,1.5-0.83,1.75l-1.08,0.35\n      c-0.8,0.21-1.55-0.16-1.84-0.85l-0.28-0.73l-0.13,8.96C34.97,43.15,34.52,43.59,33.98,43.59z M31.87,41.59h1.12l0.19-13.22\n      c0.01-0.48,0.35-0.88,0.82-0.97c0.46-0.09,0.93,0.17,1.11,0.62l0.09,0.23l1.86,4.92h0.01c-0.48-1.88-2.34-9.09-2.34-9.09\n      c-0.04-0.16-0.21-0.29-0.33-0.29c-0.03,0-0.06,0-0.08-0.01H25.7c-0.03,0-0.07,0.01-0.1,0.01c-0.09,0-0.26,0.13-0.31,0.32\n      c-1.61,5.92-2.22,8.19-2.46,9.08l2.06-5.18c0.18-0.44,0.64-0.71,1.11-0.61c0.47,0.09,0.81,0.49,0.82,0.97L27,41.59h1.08l0.48-6.92\n      c0.07-0.79,0.65-1.34,1.43-1.34c0.65,0,1.33,0.42,1.4,1.34L31.87,41.59L31.87,41.59z M22.7,33.66c0-0.01,0.01-0.02,0.01-0.03\n      C22.71,33.64,22.7,33.65,22.7,33.66z M37.18,33.61l0.04-0.01L37.18,33.61z M37.23,33.6l0.93-0.23L37.23,33.6z"/>\n    <path fill="#CE592C" d="M25.74,22.78l0.9-0.75h6.62l0.99,0.75"/>\n    <ellipse opacity="0.5" fill="#CE592C" enable-background="new    " cx="29.95" cy="22.37" rx="2.25" ry="0.3"/>\n    <path fill="#FDBF2D" d="M38.15,33.36c0-0.01-2.46-9.53-2.46-9.53c-0.15-0.6-0.72-1.05-1.31-1.05H25.6c-0.59,0-1.13,0.49-1.28,1.08\n      c0,0-2.59,9.54-2.59,9.55c-0.06,0.24,0.04,0.49,0.29,0.58l0.94,0.31c0.25,0.06,0.51-0.05,0.61-0.29l2.24-5.65l0.2,14.21h3\n      l0.55-7.85c0.02-0.21,0.13-0.41,0.44-0.41s0.38,0.2,0.39,0.41l0.54,7.85h3.04l0.2-14.21l2.12,5.61c0.1,0.23,0.36,0.35,0.61,0.29\n      l1.04-0.34C38.18,33.85,38.21,33.6,38.15,33.36z"/>\n    <path opacity="0.6" fill="#CF572E" enable-background="new    " d="M26.68,22.78L30,28.46l3.32-5.68"/>\n    <path opacity="0.25" fill="#CF572E" enable-background="new    " d="M34.17,28.38l0.08-5.6h0.17l0.48,5.44l0.45,3.13 M25.81,28.38\n      l-0.08-5.59h-0.17c0,0-0.31,4.2-0.48,5.43c-0.17,1.24-0.45,3.13-0.45,3.13L25.81,28.38z"/>\n    <ellipse fill="#FDBF2D" cx="29.95" cy="17.23" rx="4.98" ry="5"/>\n    <path opacity="0.25" fill="#CE592C" enable-background="new    " d="M30.35,21.74c-1.18,0.11-2.31-0.06-3.3-0.44\n      c0.94,0.68,2.12,1.04,3.36,0.92c1.27-0.12,2.38-0.71,3.19-1.59C32.69,21.23,31.57,21.63,30.35,21.74z"/>\n  </g>\n</svg>\n;<svg xmlns="http://www.w3.org/2000/svg" width="60px" height="60px" viewBox="0 0 60 60">\n  <g>\n    <path opacity="0.3" fill="#111111" enable-background="new    " d="M30.33,27.19c-11.24,0-20.35,6.46-20.35,14.42\n      s9.11,14.42,20.35,14.42s20.35-6.46,20.35-14.42S41.57,27.19,30.33,27.19z M30.21,55.03c-10.75,0-19.47-6.06-19.47-13.53\n      s8.72-13.53,19.47-13.53s19.47,6.06,19.47,13.53S40.96,55.03,30.21,55.03z"/>\n    <ellipse opacity="0.1" fill="#111111" enable-background="new    " cx="30.21" cy="41.5" rx="19.47" ry="13.53"/>\n  </g>\n  <g>\n    <path fill="#FFFFFF" d="M20.29,52.96c-0.12,0-0.24-0.04-0.33-0.13c-0.16-0.15-0.21-0.38-0.12-0.58l4.55-9.86\n      c0.07-0.16,0.22-0.27,0.4-0.29c0.17-0.02,0.35,0.05,0.45,0.19c0.37,0.48,1.49,1.76,2.26,2.02c0.82,0.27,3.92,0.32,5.06,0.32\n      c0.22,0,0.42,0.15,0.48,0.37s-0.03,0.45-0.22,0.56l-12.27,7.33C20.47,52.94,20.38,52.96,20.29,52.96L20.29,52.96z M24.97,43.52\n      l-3.54,7.68l9.36-5.6c-1.3-0.04-2.93-0.12-3.6-0.35C26.39,45,25.51,44.13,24.97,43.52L24.97,43.52z"/>\n    <path fill="#3F3F3F" d="M32.56,45.13c0,0-4.14,0.01-5.22-0.35c-1.08-0.35-2.5-2.18-2.5-2.18l-4.55,9.86L32.56,45.13z"/>\n    <path fill="#333333" d="M33.37,43.7c-0.18,0-0.35-0.03-0.49-0.09c-0.22-0.06-1.1-0.23-1.82-0.37l-0.22-0.07\n      c-0.28-0.12-0.59-0.39-0.77-0.8c-0.34,0.29-0.41,0.31-0.51,0.36c-0.28,0.12-0.54,0.11-0.69,0.09l-0.33-0.07\n      c-0.43-0.1-2.05-0.43-2.05-0.43l-0.3-0.11c-0.31-0.18-0.65-0.58-0.7-1.17c-0.01-0.12-0.19-3.18-0.42-6.75\n      c-0.14,0.27-0.36,0.54-0.7,0.72c-0.42,0.22-0.91,0.24-1.45,0.06c-1.69-0.54-1.41-1.97-1.3-2.5c0.02-0.09,0.04-0.18,0.05-0.27\n      c0.02-0.13,0.46-2.45,0.68-3.37c0.14-0.58,0.68-3.38,0.89-4.48c0.03-0.36,0.23-1.64,1.31-2.31c0.35-0.22,0.78-0.47,1.15-0.68\n      c-1.08-1.1-1.72-2.6-1.71-4.22c0-1.6,0.62-3.11,1.75-4.24c1.12-1.13,2.62-1.75,4.21-1.75h0.01c1.59,0,3.09,0.63,4.21,1.76\n      s1.74,2.64,1.74,4.24c0,1.43-0.5,2.77-1.37,3.82l0.47,0.01c0.33,0.01,0.65,0.15,0.88,0.39s0.35,0.56,0.34,0.89l-0.02,0.46\n      c0.28,0.37,0.48,0.82,0.55,1.27c0.01,0.01,0.49,2.04,0.89,4.51c0.3,1.87,0.67,4.54,0.75,5.23c0.13,0.8-0.27,1.48-0.98,1.67\n      c-0.28,0.11-0.98,0.31-1.5,0.23c-0.03,0-0.08-0.01-0.13-0.02l-0.17,5.13c0.03,0.22,0.01,0.45-0.01,0.65\n      c-0.05,0.52-0.42,1.09-1.09,1.72l-0.13,0.29l-0.45,0.12C33.74,43.67,33.54,43.7,33.37,43.7L33.37,43.7z M33.68,41.78\n      c0,0,0.01,0,0.01,0.01C33.69,41.78,33.68,41.78,33.68,41.78z M31.9,41.37c0.71,0.13,1.11,0.22,1.36,0.28\n      c0.17-0.17,0.29-0.32,0.36-0.41l0.3-9.24l1.97-0.19l0.44,1.92c0.01,0,0.03-0.01,0.04-0.01c-0.11-0.83-0.38-2.87-0.7-4.81\n      c-0.39-2.4-0.87-4.42-0.87-4.44c-0.04-0.24-0.15-0.44-0.27-0.55l-0.35-0.31l0.02-0.57l-2.71-0.08l-0.29-1.95\n      c1.62-0.54,2.71-2.07,2.71-3.79c0-1.07-0.41-2.07-1.16-2.83c-0.75-0.75-1.74-1.17-2.79-1.17c-1.06,0-2.05,0.41-2.8,1.17\n      C26.41,15.14,26,16.15,26,17.22c0,1.65,0.98,3.11,2.5,3.72l-0.4,1.93l-0.82-0.02c-0.38,0.21-1.12,0.64-1.68,0.98\n      c-0.25,0.15-0.36,0.61-0.37,0.8l-0.02,0.12c-0.03,0.16-0.73,3.88-0.92,4.64c-0.16,0.66-0.45,2.16-0.58,2.86\n      c0.27-0.72,0.71-1.95,1.1-3.22l1.95,0.23c0.28,4.42,0.6,9.68,0.69,11.21c0.73,0.15,1.15,0.24,1.4,0.3\n      c0.09-0.07,0.18-0.16,0.27-0.23l0.11-4.79l1.99-0.1C31.7,39.55,31.85,40.88,31.9,41.37z M36.82,33.59c-0.02,0-0.04,0.01-0.06,0.02\n      C36.78,33.6,36.8,33.59,36.82,33.59z"/>\n    <path fill="#FABD2C" d="M22.66,32.44c-0.12,0.73-0.42,1.35,0.57,1.67c0.97,0.31,1.03-0.53,1.15-0.79c0,0,0.79-2.02,1.44-4.14\n      c0,0,0.9-3.69,0.98-4.14c0.26-1.66-0.41-2.27-1.17-2.21c-0.56,0.04-1.2,0.38-1.38,1.75c0,0-0.72,3.85-0.91,4.58\n      C23.11,30.06,22.66,32.44,22.66,32.44z"/>\n    <path opacity="0.25" fill="#CF572E" enable-background="new    " d="M25.67,29.87l-0.2-7.11l-0.41,0.31c0,0,0.06,5.4-0.11,6.64\n      s-0.45,3.13-0.45,3.13L25.67,29.87L25.67,29.87z"/>\n    <path fill="none" d="M27.03,22.07h8.2v20.56h-8.2C27.03,42.63,27.03,22.07,27.03,22.07z"/>\n    <path fill="#E58A2C" d="M35.23,22.07l-6.16,0.37l-2.04,0.32l0.51,18.03l1.43,1.03l0.19-0.02l0.94-0.81l0.19-8.22L30.53,32\n      l1.25,10.04l1.87,0.57c0,0,0.9-0.77,0.95-1.24c0.04-0.43,0-0.47,0-0.47L35.23,22.07"/>\n    <path fill="none" d="M25.39,22.74h8.31V42.7h-8.31V22.74z"/>\n    <path fill="#FABD2C" d="M25.39,22.74l1.1,18.22c0.02,0.28,0.2,0.38,0.2,0.38s2.11,0.43,2.2,0.47h0.28c0,0-0.13-0.04-0.14-0.22\n      c-0.02-0.19,0.27-7.6,0.27-7.6c0.02-0.37,0.12-0.52,0.36-0.52s0.35,0.1,0.4,0.75c0,0,0.85,7.06,0.87,7.49s0.31,0.56,0.31,0.56\n      s1.86,0.35,1.99,0.41c0.03,0.02,0.08,0.02,0.13,0.02c0.14,0,0.32-0.05,0.32-0.05s0.03-0.03,0.02-0.32\n      c-0.1-3.46,0.46-4.13-0.04-19.32L25.39,22.74"/>\n    <path fill="none" d="M25.42,21.84h9.81v1.19h-9.81C25.42,23.03,25.42,21.84,25.42,21.84z"/>\n    <path fill="#CE592C" d="M27.03,21.84l-1.61,0.9l8.25,0.29l1.56-0.96L27.03,21.84"/>\n    <ellipse opacity="0.5" fill="#CE592C" enable-background="new    " cx="29.92" cy="22.37" rx="2.25" ry="0.3"/>\n    <ellipse fill="#FABD2C" cx="29.95" cy="17.23" rx="4.96" ry="5"/>\n    <path opacity="0.6" fill="#CE592C" enable-background="new    " d="M26.61,22.77l3.09,5.36l2.76-5.3"/>\n    <path opacity="0.25" fill="#CE592C" enable-background="new    " d="M29.93,21.74c-1.19,0-2.3-0.27-3.24-0.75\n      c0.87,0.77,2.01,1.24,3.26,1.24c1.28,0,2.44-0.49,3.32-1.28C32.31,21.45,31.16,21.74,29.93,21.74L29.93,21.74z"/>\n    <path fill="#FABD2C" d="M33.99,26.06c0.1,1.59,0.92,5.97,0.92,5.97l0.54,2.33c0.08,0.24,0.27,0.33,0.62,0.38s1.09-0.21,1.09-0.21\n      c0.23-0.06,0.29-0.3,0.25-0.55c0,0-0.35-2.72-0.75-5.23c-0.4-2.46-0.89-4.51-0.89-4.51c-0.1-0.61-0.59-1.29-1.17-1.34\n      c0,0-0.69,0-0.71,1.06C33.86,25.08,33.99,26.06,33.99,26.06L33.99,26.06z"/>\n    <path opacity="0.25" fill="#CF572E" enable-background="new    " d="M34.41,22.95c-0.2,0.08-0.5,0.32-0.52,1.01\n      c-0.03,1.12,0.1,2.1,0.1,2.1c0.09,1.36,0.7,4.73,0.87,5.7l0.01,0.05C34.88,31.81,34.3,26.32,34.41,22.95z"/>\n  </g>\n</svg>\n;<svg xmlns="http://www.w3.org/2000/svg" width="60px" height="60px" viewBox="0 0 60 60">\n  <path opacity="0.3" fill="#111111" enable-background="new    " d="M30.33,27.19c-11.24,0-20.35,6.46-20.35,14.42\n    s9.11,14.42,20.35,14.42s20.35-6.46,20.35-14.42S41.57,27.19,30.33,27.19z M30.21,55.03c-10.75,0-19.47-6.06-19.47-13.53\n    s8.72-13.53,19.47-13.53s19.47,6.06,19.47,13.53S40.96,55.03,30.21,55.03z"/>\n  <ellipse opacity="0.1" fill="#111111" enable-background="new    " cx="30.21" cy="41.5" rx="19.47" ry="13.53"/>\n  <path fill="#FFFFFF" d="M15.6,48.74c-0.19,0-0.36-0.11-0.45-0.28c-0.1-0.21-0.05-0.46,0.14-0.61l8.99-7.24\n    c0.12-0.1,0.29-0.14,0.45-0.09c0.16,0.04,0.28,0.16,0.34,0.31c0,0.01,0.5,1.37,1.25,2.01c0.64,0.54,3.01,1.28,3.87,1.51\n    c0.22,0.06,0.37,0.26,0.37,0.49s-0.16,0.42-0.39,0.48l-14.45,3.4C15.68,48.73,15.64,48.74,15.6,48.74z M24.39,41.8l-6.76,5.44\n    l10.53-2.48c-0.94-0.33-2-0.75-2.49-1.16C25.09,43.11,24.65,42.34,24.39,41.8L24.39,41.8z"/>\n  <path fill="#3F3F3F" d="M30.05,44.83c0,0-3.19-0.88-4.06-1.61c-0.87-0.73-1.4-2.22-1.4-2.22l-8.99,7.24L30.05,44.83L30.05,44.83z"/>\n  <path fill="#333333" d="M32.45,44.49c-0.09,0-0.17-0.01-0.26-0.03c-0.17-0.01-0.34-0.06-0.49-0.14c-0.12-0.07-1.39-0.81-1.6-0.93\n    c-0.39-0.2-0.81-0.67-0.84-1.41c0-0.02-0.01-0.07-0.02-0.16c-0.12,0.04-0.25,0.09-0.37,0.14c-0.12,0.09-0.25,0.16-0.41,0.19\n    c0,0-0.12,0.02-0.26,0.03c-0.1,0.01-0.19,0.01-0.29-0.01c-0.1-0.01-0.2-0.04-0.28-0.07c-0.11-0.05-0.2-0.08-1.59-1.03\n    c-0.24-0.13-0.58-0.54-0.63-1.13c-0.01-0.15-0.17-2.85-0.37-6.09c-1.54-0.33-1.47-1.65-1.44-2.15c0-0.08,0.01-0.16,0.01-0.25\n    c0-0.12,0.09-2.27,0.17-3.13c0.05-0.54,0.17-3.21,0.21-4.19c-0.01-0.59,0.1-1.13,0.33-1.56c-0.02-0.5,0.27-0.93,0.72-1.08\n    c0.06-0.02,0.12-0.04,0.18-0.04l0.37-0.11c-1.04-1.11-1.63-2.57-1.63-4.09c0-1.6,0.62-3.11,1.75-4.24\n    c1.12-1.13,2.62-1.75,4.21-1.75h0.01c1.59,0,3.09,0.63,4.21,1.76s1.74,2.64,1.74,4.24c0,1.59-0.65,3.13-1.8,4.26l0.81,0.17\n    c0.44,0.09,0.77,0.47,0.8,0.92c0.01,0.14-0.01,0.28-0.06,0.41l-0.03,0.43c0.3,0.47,0.48,1.09,0.54,1.84\n    c0.04,0.48-0.1,3.1-0.14,3.89c-0.14,2.25-0.6,4.73-0.62,4.84l-0.06,0.25c-0.11,0.41-0.21,0.79-0.41,1.09l-0.38,6.47\n    c0,0.22-0.04,0.79-0.41,1.3c-0.25,0.34-0.87,0.97-0.99,1.1C32.97,44.39,32.71,44.49,32.45,44.49L32.45,44.49z M31.25,41.75\n    c0.23,0.13,0.63,0.37,0.95,0.55c0.15-0.16,0.28-0.31,0.33-0.38c0-0.04,0.02-0.16,0.03-0.2l0.4-6.87c0.02-0.26,0.13-0.51,0.33-0.68\n    c0.04-0.11,0.08-0.29,0.13-0.45l0.05-0.18c0,0,0.44-2.42,0.58-4.51c0.08-1.56,0.16-3.35,0.14-3.62c-0.04-0.55-0.17-0.87-0.28-0.98\n    c-0.19-0.2-0.3-0.47-0.28-0.75l0.01-0.24l-2.37-0.49c-0.44-0.09-0.77-0.47-0.8-0.92c-0.03-0.45,0.26-0.87,0.69-1.01l0.15-0.04\n    c0.05-0.01,0.1-0.03,0.14-0.05c0.05-0.02,0.1-0.05,0.15-0.08l0.13-0.07c0.17-0.08,0.28-0.14,0.38-0.2\n    c0.07-0.04,0.12-0.08,0.17-0.12l0.22-0.17c0.02-0.03,0.05-0.05,0.07-0.07c0.88-0.78,1.36-1.84,1.37-2.99\n    c0-1.07-0.41-2.07-1.16-2.83c-0.75-0.75-1.77-1.18-2.8-1.17c-1.06,0-2.05,0.41-2.79,1.17c-0.75,0.75-1.16,1.76-1.16,2.83\n    c0,1.16,0.51,2.26,1.41,3.03c0.03,0.02,0.06,0.05,0.08,0.08l0.08,0.06c0.13,0.1,0.2,0.15,0.27,0.2c0.1,0.06,0.21,0.12,0.32,0.17\n    c0.02,0.01,0.12,0.06,0.13,0.07c0.35,0.2,0.56,0.6,0.51,1s-0.31,0.74-0.7,0.85l-1.56,0.45c-0.09,0.1-0.2,0.19-0.32,0.25\n    c-0.02,0.01-0.03,0.02-0.05,0.02c0,0.01-0.01,0.01-0.02,0.02c-0.03,0.04-0.14,0.21-0.13,0.71c-0.01,0.2-0.15,3.65-0.22,4.35\n    c-0.08,0.81-0.16,2.97-0.16,2.99c0,0.09-0.01,0.2-0.01,0.3v0.04c0.25-0.1,0.53-0.1,0.78,0.01c0.34,0.15,0.57,0.48,0.59,0.85\n    c0.19,3.16,0.37,6.02,0.42,6.86c0.22,0.15,0.53,0.36,0.77,0.52c0.04-0.02,0.09-0.03,0.14-0.05l0.28-3.18\n    c0.04-0.51,0.46-0.9,0.97-0.91h0.03c0.5,0,0.92,0.37,0.99,0.86C31.09,40.41,31.22,41.42,31.25,41.75L31.25,41.75z M27.13,39.36\n    c0.01,0.01,0.04,0.03,0.1,0.07C27.19,39.41,27.16,39.38,27.13,39.36z"/>\n  <path fill="#E58A2C" d="M34.68,22.64l-4.46-0.83c0,0-2.42,0.35-2.43,0.35l-0.46,17.98l0.78,1.03c0,0,1.02-0.38,1.1-0.41\n    c0.08-0.03,0.07-0.18,0.07-0.18l0.66-7.54l1.46,9.74l1.04,0.7c0,0,0.68-0.69,0.89-0.98c0.24-0.33,0.22-0.73,0.22-0.73L34.68,22.64\n    L34.68,22.64z"/>\n  <path fill="#FABD2C" d="M32.66,33.53c-0.02,0.57-0.27,1.23,0.75,1.41c0.74,0.13,0.75-0.11,1.02-1.13c0,0,0.47-2.5,0.61-4.71\n    c0,0,0.18-3.31,0.14-3.76c-0.12-1.66-0.91-2.11-1.64-1.87c-0.53,0.17-1.08,0.65-0.94,2.01c0,0,0.18,3.89,0.18,4.64\n    C32.76,31.05,32.66,33.53,32.66,33.53L32.66,33.53z"/>\n  <path opacity="0.25" fill="#CF572E" enable-background="new    " d="M32.66,33.53c-0.02,0.4,0.19-1.86,0.42-4.94\n    c0.1-1.35-0.08-4.87-0.27-4.56s-0.29,0.77-0.22,1.45c0,0,0.18,3.89,0.18,4.64C32.76,31.05,32.66,33.53,32.66,33.53z"/>\n  <path fill="#FABD2C" d="M24.64,31.45c-0.01,0.67-0.2,1.27,0.73,1.43c0.91,0.15,0.86-0.61,0.93-0.87c0,0,0.45-1.92,0.75-3.91\n    c0,0,0.33-3.44,0.33-3.85c0.02-1.52-0.66-1.99-1.35-1.84c-0.5,0.11-1.03,0.5-1.01,1.75c0,0-0.15,3.56-0.21,4.24\n    C24.72,29.24,24.64,31.45,24.64,31.45z"/>\n  <path opacity="0.25" fill="#CE592C" enable-background="new    " d="M24.64,31.45c-0.01,0.67-0.2,1.27,0.73,1.43\n    c0.91,0.15,0.86-0.61,0.93-0.87c0,0,0.45-1.92,0.75-3.91c0,0,0.33-3.44,0.33-3.85c0.02-1.52-0.66-1.99-1.35-1.84\n    c-0.5,0.11-1.03,0.5-1.01,1.75c0,0-0.15,3.56-0.21,4.24C24.72,29.24,24.64,31.45,24.64,31.45z"/>\n  <path fill="#FABD2C" d="M31.56,23.71l-6.17-1.29c0,0-0.05,0.01-0.04,0.09c0.13,1.5,1.07,17.08,1.09,17.34\n    c0.02,0.27,0.19,0.37,0.19,0.37s1.3,0.89,1.39,0.93s0.27,0,0.27,0s-0.13-0.04-0.14-0.23c-0.02-0.19,0.3-7.46,0.3-7.46\n    c0.01-0.37,0.11-0.52,0.36-0.53c0.24,0,0.29,0.15,0.31,0.53c0,0,1.14,8.05,1.15,8.48s0.31,0.56,0.31,0.56s1.47,0.86,1.59,0.92\n    s0.3,0.01,0.3,0.01s-0.22-0.01-0.22-0.3C32.25,42.94,31.56,23.71,31.56,23.71L31.56,23.71z"/>\n  <path opacity="0.6" fill="#CE592C" enable-background="new    " d="M26.74,22.67l2.02,4.98l1.23-4.26"/>\n  <path fill="#CE592C" d="M25.43,22.42l6.13,1.29l3.16-1.07l-5.88-1.2"/>\n  <ellipse opacity="0.5" fill="#CE592C" enable-background="new    " cx="29.89" cy="22.41" rx="2.25" ry="0.43"/>\n  <ellipse fill="#FABD2C" cx="29.95" cy="17.23" rx="4.96" ry="5"/>\n  <path opacity="0.25" fill="#CE592C" enable-background="new    " d="M29.93,21.74c-1.19,0-2.3-0.27-3.24-0.75\n    c0.87,0.77,2.01,1.24,3.26,1.24c1.28,0,2.44-0.49,3.32-1.28C32.31,21.45,31.16,21.74,29.93,21.74L29.93,21.74z"/>\n</svg>\n;<svg xmlns="http://www.w3.org/2000/svg" width="60px" height="60px" viewBox="0 0 60 60">\n  <g>\n    <path opacity="0.3" fill="#111111" enable-background="new    " d="M30.33,27.19c-11.24,0-20.35,6.46-20.35,14.42\n      s9.11,14.42,20.35,14.42s20.35-6.46,20.35-14.42C50.68,33.64,41.57,27.19,30.33,27.19z M30.21,55.03\n      c-10.75,0-19.47-6.06-19.47-13.53s8.72-13.53,19.47-13.53s19.47,6.06,19.47,13.53S40.96,55.03,30.21,55.03z"/>\n    <ellipse opacity="0.1" fill="#111111" enable-background="new    " cx="30.21" cy="41.5" rx="19.47" ry="13.53"/>\n  </g>\n  <g>\n    <path fill="#FFFFFF" d="M12.95,45.15c-0.24,0-0.44-0.17-0.49-0.4c-0.05-0.23,0.08-0.47,0.3-0.56l11.98-4.97\n      c0.15-0.06,0.31-0.05,0.45,0.03s0.23,0.22,0.24,0.38c0,0.01,0.14,1.46,0.71,2.26c0.49,0.69,2.3,1.86,2.96,2.25\n      c0.19,0.12,0.29,0.34,0.23,0.56c-0.06,0.22-0.26,0.37-0.48,0.37L12.95,45.15L12.95,45.15z M24.54,40.39l-9.04,3.75l11.68-0.06\n      c-0.71-0.5-1.49-1.11-1.85-1.61C24.88,41.85,24.65,40.98,24.54,40.39z"/>\n    <path fill="#3F3F3F" d="M28.85,44.58c0,0-2.46-1.47-3.12-2.39c-0.66-0.93-0.8-2.5-0.8-2.5l-11.98,4.97L28.85,44.58L28.85,44.58z"\n      />\n    <path fill="#333333" d="M30.68,44.46c-0.26,0-0.52-0.09-0.73-0.26c-0.08-0.07-0.83-0.82-0.95-0.95c-0.19-0.18-0.49-0.57-0.5-1.26\n      c0-0.04-0.01-0.12-0.01-0.25c-0.05,0.01-0.08,0.02-0.08,0.02c-0.46,0.12-0.78,0-0.97-0.12c-0.12-0.08-0.17-0.11-1.08-1.1\n      c-0.06-0.05-0.36-0.38-0.38-1.01c-0.01-0.16-0.15-2.69-0.31-5.77c-0.72-0.23-1.44-0.83-1.17-2.37l0.03-0.18\n      c0-0.01,0.29-2.23,0.37-3.07c0.05-0.54,0.17-3.21,0.21-4.19c0-0.08,0-0.19,0.01-0.31l-0.06-1.09c-0.02-0.39,0.21-0.84,0.55-1.03\n      c0.05-0.03,0.11-0.05,0.16-0.07c-1.13-1.13-1.78-2.65-1.77-4.24c0-1.6,0.62-3.11,1.75-4.24c1.12-1.13,2.62-1.75,4.21-1.75h0.01\n      c1.59,0,3.09,0.63,4.21,1.76s1.74,2.64,1.74,4.24c0,1.61-0.66,3.15-1.83,4.29c-0.03,0.04-0.06,0.08-0.1,0.12l0.14,0.04\n      c0.46,0.13,0.76,0.56,0.73,1.04l-0.07,0.85c0.25,0.45,0.4,1.02,0.45,1.69c0.03,0.47,0.01,3.67,0.01,4.31\n      c-0.14,2.31-0.66,4.54-0.69,4.63c-0.1,0.68-0.34,1.18-0.71,1.5l-0.52,6.71c0,0.4-0.26,1.09-0.99,1.46\n      c-0.5,0.25-0.99,0.42-1.19,0.49C31,44.43,30.84,44.46,30.68,44.46L30.68,44.46z M30.5,41.93c0.1,0.1,0.25,0.26,0.4,0.41\n      c0.14-0.05,0.29-0.12,0.45-0.2l0.55-7.12c0.03-0.39,0.28-0.72,0.64-0.86c0.02-0.08,0.04-0.19,0.05-0.24\n      c0-0.01,0.02-0.12,0.02-0.13c0.01-0.07,0.51-2.2,0.64-4.28c0.01-1.78,0.01-3.84,0-4.09c-0.04-0.6-0.19-0.86-0.27-0.96\n      c-0.16-0.2-0.23-0.45-0.21-0.7l0.03-0.37l-1.61-0.45c-0.42-0.12-0.72-0.5-0.73-0.94s0.27-0.84,0.69-0.97l0.15-0.04\n      c0.05-0.01,0.1-0.03,0.14-0.05c0.05-0.02,0.1-0.05,0.15-0.08l0.13-0.07c0.17-0.08,0.28-0.14,0.38-0.2\n      c0.07-0.04,0.12-0.08,0.17-0.12l0.22-0.17c0.02-0.03,0.05-0.05,0.07-0.07c0.88-0.78,1.36-1.84,1.37-2.99\n      c0-1.07-0.41-2.07-1.16-2.83c-0.75-0.75-1.74-1.17-2.79-1.17c-1.06,0-2.05,0.41-2.79,1.17c-0.75,0.75-1.16,1.76-1.16,2.83\n      c0,1.16,0.51,2.26,1.41,3.03c0.03,0.02,0.06,0.05,0.08,0.08l0.08,0.06c0.13,0.1,0.2,0.15,0.27,0.2c0.1,0.06,0.21,0.12,0.32,0.17\n      l0.19,0.1c0.03,0.02,0.07,0.04,0.1,0.05c0.39,0.16,0.64,0.55,0.62,0.98c-0.02,0.42-0.31,0.79-0.72,0.91l-1.25,0.36l0.02,0.44v0.13\n      c-0.01,0.08-0.01,0.16-0.01,0.25c-0.01,0.2-0.15,3.65-0.22,4.35c-0.08,0.85-0.38,3.12-0.38,3.12c-0.01,0.08-0.03,0.18-0.04,0.28\n      c0,0.02-0.01,0.04-0.01,0.06c0.24-0.03,0.49,0.02,0.71,0.16c0.27,0.17,0.44,0.49,0.45,0.81c0.23,4.28,0.33,6.11,0.36,6.57\n      c0.07,0.08,0.16,0.17,0.25,0.27l0.07-0.82c0.05-0.52,0.48-0.91,1-0.91h0.01c0.52,0,0.95,0.41,0.99,0.93\n      C30.43,40.79,30.49,41.69,30.5,41.93L30.5,41.93z M27.77,39.13l0.1,0.1L27.77,39.13z"/>\n    <path fill="#FABD2C" d="M25.51,31.34c-0.06,0.52-0.36,1.3,0.56,1.51s1.03-0.7,1.1-0.95c0,0,0.65-1.97,0.95-3.96\n      c0,0,0.33-3.44,0.33-3.85c0.02-1.52-0.66-1.99-1.35-1.84c-0.5,0.11-1.03,0.5-1.01,1.75c0,0-0.15,3.56-0.21,4.24\n      C25.81,29.09,25.51,31.34,25.51,31.34L25.51,31.34z"/>\n    <path opacity="0.25" fill="#CE592C" enable-background="new    " d="M25.51,31.34c-0.06,0.52-0.36,1.3,0.56,1.51\n      s1.03-0.7,1.1-0.95c0,0,0.65-1.97,0.95-3.96c0,0,0.33-3.44,0.33-3.85c0.02-1.52-0.66-1.99-1.35-1.84c-0.5,0.11-1.03,0.5-1.01,1.75\n      c0,0-0.15,3.56-0.21,4.24C25.81,29.09,25.51,31.34,25.51,31.34L25.51,31.34z"/>\n    <path fill="#E58A2C" d="M33.86,22.64l-4.31-1.2c0,0-3.41,1.02-3.43,1.02l0.98,17.31l1.04,1.03c0,0,0.81-0.22,0.91-0.26\n      c0.1-0.03,0.1-0.18,0.1-0.18l0.15-1.68l0.7,4.1l0.72,0.66c0,0,0.6-0.18,1.16-0.47c0.45-0.23,0.45-0.65,0.45-0.65L33.86,22.64z"/>\n    <path fill="#FABD2C" d="M29.97,23.71l-3.89-1.29c0,0-0.03,0.01-0.03,0.09c0.08,1.5,0.91,16.72,0.92,16.99s0.12,0.37,0.12,0.37\n      s0.82,0.89,0.88,0.93s0.17,0,0.17,0s-0.08-0.04-0.09-0.23s0.38-7.48,0.38-7.48c0.01-0.37,0.07-0.52,0.23-0.53\n      c0.15,0,0.19,0.15,0.19,0.53c0,0,0.63,8.45,0.64,8.88s0.2,0.56,0.2,0.56s0.82,0.83,0.89,0.89c0.08,0.06,0.19,0.01,0.19,0.01\n      s-0.14-0.01-0.14-0.3C30.64,42.94,29.97,23.71,29.97,23.71L29.97,23.71z"/>\n    <path fill="#CE592C" d="M26.08,22.42l3.89,1.29l3.89-1.07l-4.37-1.2"/>\n    <ellipse opacity="0.5" fill="#CE592C" enable-background="new    " cx="29.7" cy="22.4" rx="2.13" ry="0.52"/>\n    <path opacity="0.25" fill="#CE592C" enable-background="new    " d="M33.97,25.66c-0.04-1.67-0.72-2.46-1.44-2.22\n      c-0.81,0.27-1.29,1.03-1.21,2.4c0,0,0.07,3.73,0.03,4.48c-0.05,0.93-0.27,3.4-0.27,3.4c-0.05,0.57-0.33,1.44,0.68,1.63\n      c0.22,0.04,0.39-0.01,0.53-0.12l0.28-0.43c0,0,0.97-2.72,1.21-4.91C33.78,29.87,33.98,26.11,33.97,25.66L33.97,25.66z"/>\n    <path fill="#FABD2C" d="M31.73,33.53c-0.02,0.57-0.27,1.45,0.76,1.59c1.02,0.14,1.05-0.86,1.11-1.14c0,0,0.52-2.21,0.66-4.41\n      c0,0,0.03-3.78-0.01-4.23c-0.12-1.66-0.91-2.11-1.64-1.87c-0.53,0.17-1.08,0.65-0.94,2.01c0,0,0.18,3.89,0.18,4.64\n      C31.83,31.05,31.73,33.53,31.73,33.53L31.73,33.53z"/>\n    <path opacity="0.3" fill="#CE592C" enable-background="new    " d="M32.08,33.84c0,0,0.08-2.81,0.08-3.77\n      c0.01-0.79-0.3-4.73-0.3-4.73c-0.08-0.79,0.06-1.31,0.29-1.63c-0.34,0.28-0.59,0.82-0.49,1.79c0,0,0.18,3.89,0.18,4.64\n      c-0.01,0.93-0.11,3.41-0.11,3.41c-0.02,0.45-0.17,1.1,0.28,1.42C32.03,34.69,32.07,34.22,32.08,33.84L32.08,33.84z"/>\n    <ellipse fill="#FABD2C" cx="29.95" cy="17.23" rx="4.96" ry="5"/>\n    <path opacity="0.25" fill="#CE592C" enable-background="new    " d="M29.93,21.74c-1.19,0-2.3-0.27-3.24-0.75\n      c0.87,0.77,2.01,1.24,3.26,1.24c1.28,0,2.44-0.49,3.32-1.28C32.31,21.45,31.16,21.74,29.93,21.74L29.93,21.74z"/>\n    <path opacity="0.6" fill="#CE592C" enable-background="new    " d="M27.13,22.77l0.94,4.66l0.76-4.1"/>\n  </g>\n</svg>\n;<svg xmlns="http://www.w3.org/2000/svg" width="60px" height="60px" viewBox="0 0 60 60">\n  <g>\n    <path opacity="0.3" fill="#111111" enable-background="new    " d="M30.33,27.19c-11.24,0-20.35,6.46-20.35,14.42\n      s9.11,14.42,20.35,14.42s20.35-6.46,20.35-14.42S41.57,27.19,30.33,27.19z M30.21,55.03c-10.75,0-19.47-6.06-19.47-13.53\n      s8.72-13.53,19.47-13.53s19.47,6.06,19.47,13.53S40.96,55.03,30.21,55.03z"/>\n    <ellipse opacity="0.1" fill="#111111" enable-background="new    " cx="30.21" cy="41.5" rx="19.47" ry="13.53"/>\n  </g>\n  <g>\n    <path fill="#333333" d="M29.67,43.83c-0.5,0-0.95-0.04-1.17-0.07c-0.33,0.02-0.56-0.08-0.71-0.18s-0.29-0.18-0.88-1.05\n      c-0.1-0.15-0.16-0.33-0.17-0.51c-0.01-0.19-1.01-18.74-1.11-20.21c-0.01-0.14,0.01-0.28,0.06-0.42c-1.07-1.11-1.69-2.6-1.69-4.16\n      c0-1.6,0.62-3.11,1.75-4.24c1.12-1.13,2.62-1.75,4.21-1.75h0.01c1.59,0,3.09,0.63,4.21,1.76s1.74,2.64,1.74,4.24\n      c0,1.74-0.75,3.35-2.02,4.47l0.19,0.15c0.26,0.21,0.4,0.54,0.36,0.88L32.48,42.4c-0.04,0.75-0.83,1.05-1.22,1.2\n      C30.82,43.78,30.21,43.83,29.67,43.83z M30.48,42.22c0,0.05-0.01,0.09-0.01,0.14v-0.12L30.48,42.22z M28.82,41.78\n      c0.63,0.06,1.44,0.06,1.71-0.04l1.87-18.66l-0.69-0.56c-0.23-0.14-0.4-0.36-0.46-0.62c-0.1-0.45,0.08-0.91,0.49-1.12\n      c1.35-0.69,2.18-2.05,2.18-3.54c0-1.07-0.41-2.07-1.16-2.83c-0.75-0.75-1.77-1.14-2.8-1.17c-1.06,0-2.05,0.41-2.79,1.17\n      c-0.75,0.75-1.16,1.76-1.16,2.83c0,1.42,0.73,2.7,1.97,3.44c0.35,0.21,0.54,0.61,0.48,1.02c-0.07,0.41-0.37,0.73-0.77,0.82\n      c0.21,3.64,0.93,16.94,1.05,19.13C28.75,41.68,28.78,41.73,28.82,41.78L28.82,41.78z"/>\n    <path fill="#FFFFFF" d="M26.99,43.9h-0.06l-15.16-1.99c-0.25-0.03-0.44-0.25-0.44-0.5s0.19-0.46,0.44-0.5L26.58,39\n      c0.23-0.03,0.45,0.1,0.53,0.32s0.01,0.46-0.18,0.59c-0.01,0.01-1.05,0.76-0.77,1.39c0.43,0.94,1.18,1.75,1.19,1.75\n      c0.14,0.15,0.18,0.38,0.08,0.57C27.35,43.79,27.18,43.9,26.99,43.9L26.99,43.9z M15.71,41.41l10.13,1.33\n      c-0.2-0.3-0.42-0.65-0.59-1.02c-0.25-0.55-0.14-1.09,0.11-1.55L15.71,41.41z"/>\n    <path fill="#3F3F3F" d="M26.99,43.4c0,0-0.81-0.86-1.28-1.89c-0.47-1.03,0.94-2.01,0.94-2.01l-14.81,1.91L26.99,43.4L26.99,43.4z"\n      />\n    <path fill="#E58A2C" d="M33.45,22.64l-5.6-1.2c0,0-1.12,0.24-1.14,0.24l1.43,20.54l0.35,0.53c0,0,1.68,0.21,2.41-0.08\n      c0.58-0.23,0.58-0.34,0.58-0.34L33.45,22.64L33.45,22.64z"/>\n    <path fill="#FABD2C" d="M27.38,22.7l-0.73-1.06c0,0-0.04,0.01-0.03,0.09c0.1,1.5,1.11,20.23,1.11,20.23s0.47,0.7,0.58,0.76\n      c0.1,0.06,0.25,0.01,0.25,0.01s-0.18-0.01-0.18-0.3C28.37,42.24,27.38,22.7,27.38,22.7L27.38,22.7z"/>\n    <path fill="#CE592C" d="M26.65,21.65l0.73,1.05l6.07-0.06l-1.2-0.97"/>\n    <ellipse opacity="0.5" fill="#CE592C" enable-background="new    " cx="29.9" cy="22.01" rx="2.13" ry="0.52"/>\n    <path fill="#FABD2C" d="M29.26,33.53c-0.02,0.57-0.31,1.45,0.87,1.59c1.17,0.14,1.21-0.86,1.27-1.14c0,0,0.42-2.16,0.58-4.36\n      c0,0,0.21-3.83,0.17-4.28c-0.14-1.66-1.05-2.11-1.88-1.87c-0.61,0.17-1.24,0.65-1.08,2.01c0,0,0.03,3.94,0.02,4.69\n      C29.19,31.1,29.26,33.53,29.26,33.53z"/>\n    <path opacity="0.3" fill="#CE592C" enable-background="new    " d="M29.66,33.84c0,0-0.09-2.76-0.09-3.72\n      c0.01-0.79-0.16-4.78-0.16-4.78c-0.09-0.79,0.06-1.31,0.33-1.63c-0.39,0.28-0.68,0.82-0.56,1.79c0,0,0.03,3.94,0.02,4.69\n      c-0.01,0.93,0.05,3.36,0.05,3.36c-0.02,0.45-0.2,1.1,0.32,1.42C29.6,34.69,29.65,34.22,29.66,33.84L29.66,33.84z"/>\n    <ellipse fill="#FABD2C" cx="29.95" cy="17.23" rx="4.96" ry="5"/>\n    <path opacity="0.25" fill="#CE592C" enable-background="new    " d="M29.93,21.74c-1.19,0-2.3-0.27-3.24-0.75\n      c0.87,0.77,2.01,1.24,3.26,1.24c1.28,0,2.44-0.49,3.32-1.28C32.31,21.45,31.16,21.74,29.93,21.74L29.93,21.74z"/>\n  </g>\n</svg>\n;<svg xmlns="http://www.w3.org/2000/svg" width="60px" height="60px" viewBox="0 0 60 60">\n  <g>\n    <path opacity="0.3" fill="#111111" enable-background="new    " d="M30.33,27.2c-11.24,0-20.35,6.46-20.35,14.42\n      s9.11,14.42,20.35,14.42s20.35-6.46,20.35-14.42C50.68,33.65,41.57,27.2,30.33,27.2z M30.21,55.04\n      c-10.75,0-19.47-6.06-19.47-13.53s8.72-13.53,19.47-13.53s19.47,6.06,19.47,13.53S40.96,55.04,30.21,55.04z"/>\n    <ellipse opacity="0.1" fill="#111111" enable-background="new    " cx="30.21" cy="41.51" rx="19.47" ry="13.53"/>\n  </g>\n  <g>\n    <path fill="#FFFFFF" d="M25.76,42.6c-0.07,0-0.14-0.01-0.2-0.04l-12.42-5.44c-0.23-0.1-0.35-0.35-0.28-0.59\n      c0.06-0.24,0.29-0.4,0.54-0.37l15.03,1.64c0.24,0.03,0.42,0.21,0.44,0.45s-0.12,0.45-0.35,0.53c-1.03,0.33-2.18,0.96-2.26,1.39\n      c-0.18,1-0.02,1.82-0.01,1.83c0.04,0.18-0.03,0.37-0.17,0.49C25.99,42.57,25.87,42.6,25.76,42.6L25.76,42.6z M16.53,37.52\n      l8.65,3.79c-0.01-0.37,0.01-0.82,0.1-1.32c0.1-0.56,0.63-1.03,1.21-1.39L16.53,37.52L16.53,37.52z"/>\n    <path fill="#3F3F3F" d="M25.76,42.1c0,0-0.22-0.92,0.01-2.03c0.22-1.04,2.6-1.78,2.6-1.78l-15.03-1.64L25.76,42.1L25.76,42.1z"/>\n    <path fill="#333333" d="M28.81,44.46c-0.16,0-0.31-0.03-0.46-0.09c-0.2-0.07-0.69-0.24-1.19-0.49c-0.74-0.37-1-1.07-1-1.54\n      l-0.51-6.59c-0.82-0.58-0.73-1.65-0.7-2.06l0.01-0.2c0-0.01,0.1-2.46,0.11-3.38c0-0.24-0.02-1.02-0.12-3.38l-0.31-4.02\n      c-0.04-0.48,0.27-0.91,0.73-1.04l0.46-0.13c-0.01-0.01-0.01-0.02-0.02-0.03c-1.16-1.13-1.82-2.68-1.83-4.28\n      c0-1.6,0.62-3.11,1.74-4.24c1.12-1.13,2.62-1.76,4.22-1.76h0.01c1.59,0,3.09,0.62,4.21,1.75c1.13,1.13,1.75,2.64,1.75,4.24\n      c0,1.63-0.67,3.19-1.86,4.33c0.06,0.04,0.12,0.09,0.18,0.14c0.58,0.5,0.86,1.31,0.85,2.41c0,0.43-0.28,3.35-0.34,3.93\n      c-0.2,1.33-0.53,2.6-0.78,3.47c-0.22,4-0.43,7.85-0.44,8.03c-0.03,0.63-0.32,0.96-0.45,1.07c-0.84,0.92-0.89,0.96-1.01,1.03\n      c-0.4,0.25-0.81,0.17-0.99,0.12c-0.02,0-0.04-0.01-0.06-0.01C31,41.87,31,41.95,31,41.99c-0.01,0.69-0.31,1.08-0.5,1.26\n      c-0.13,0.13-0.87,0.88-0.95,0.94C29.34,44.37,29.08,44.46,28.81,44.46L28.81,44.46z M28.15,42.14c0.16,0.08,0.32,0.14,0.45,0.2\n      c0.14-0.15,0.3-0.31,0.4-0.4c0.02-0.46,0.16-2.31,0.22-3.12c0.04-0.52,0.47-0.92,0.99-0.93h0.01c0.52,0,0.95,0.39,1,0.91\n      l0.07,0.82c0.09-0.1,0.18-0.19,0.25-0.27c0.02-0.4,0.11-2.03,0.44-8.06c0-0.08,0.02-0.15,0.04-0.23c0.24-0.81,0.56-2.04,0.75-3.26\n      c0.15-1.61,0.32-3.47,0.32-3.71c0.01-0.69-0.16-0.87-0.16-0.87c-0.15,0.02-0.25,0.04-0.39,0l-1.14-0.33\n      c-0.41-0.12-0.7-0.48-0.72-0.91c-0.02-0.43,0.23-0.82,0.63-0.98l0.12-0.05c0.06-0.03,0.12-0.06,0.17-0.08l0.11-0.06\n      c0.13-0.06,0.25-0.12,0.37-0.2c0.07-0.04,0.13-0.1,0.2-0.15c0.06-0.05,0.11-0.08,0.15-0.11c0.02-0.03,0.05-0.05,0.08-0.07\n      c0.9-0.77,1.41-1.88,1.41-3.03c0-1.07-0.41-2.07-1.16-2.83c-0.75-0.75-1.74-1.17-2.79-1.17c-1.06,0-2.05,0.42-2.8,1.17\n      c-0.75,0.76-1.16,1.76-1.16,2.83c0,1.15,0.49,2.21,1.37,2.99c0.03,0.02,0.05,0.05,0.08,0.08l0.22,0.17l0.15,0.12\n      c0.11,0.07,0.22,0.13,0.34,0.18l0.17,0.09c0.05,0.03,0.1,0.05,0.15,0.08c0,0,0.12,0.05,0.13,0.05c0.41,0.15,0.67,0.55,0.65,0.98\n      s-0.31,0.81-0.73,0.92l-1.81,0.51l0.25,3.23c0.09,1.99,0.13,3.13,0.12,3.51c-0.01,0.94-0.11,3.44-0.11,3.44\n      c0,0.08-0.01,0.18-0.02,0.28c-0.01,0.08-0.02,0.2-0.02,0.29c0.36,0.14,0.64,0.48,0.67,0.87L28.15,42.14L28.15,42.14z M31.67,39.2\n      c-0.03,0.02-0.05,0.04-0.06,0.07C31.64,39.22,31.67,39.2,31.67,39.2z"/>\n    <path fill="#CE592C" d="M31.14,31.34c-0.06,0.52-0.36,1.3,0.56,1.51s1.03-0.7,1.1-0.95c0,0,0.65-1.97,0.95-3.96\n      c0,0,0.33-3.44,0.33-3.85c0.02-1.52-0.66-1.99-1.35-1.84c-0.5,0.11-1.03,0.5-1.01,1.75c0,0-0.15,3.56-0.21,4.24\n      C31.43,29.09,31.14,31.34,31.14,31.34L31.14,31.34z"/>\n    <path fill="#FDBF2D" d="M25.64,22.64l4.31-1.2c0,0,3.41,1.02,3.43,1.02L32.4,39.77l-1.04,1.03c0,0-0.81-0.22-0.91-0.26\n      c-0.1-0.03-0.1-0.18-0.1-0.18l-0.15-1.68l-0.7,4.1l-0.72,0.66c0,0-0.6-0.18-1.16-0.47c-0.45-0.23-0.45-0.65-0.45-0.65L25.64,22.64\n      z"/>\n    <path fill="#CE592C" d="M26.43,33.85c-0.01,0.58-0.14,1.33,0.9,1.51c0.76,0.13,0.77-0.13,1.03-1.17c0,0,0.44-2.57,0.55-4.83\n      c0,0,0.13-3.4,0.08-3.86c-0.16-1.71-0.98-2.15-1.72-1.91c-0.55,0.18-1.1,0.67-0.93,2.07c0,0,0.14,3.92,0.15,4.7\n      C26.5,31.3,26.43,33.85,26.43,33.85L26.43,33.85z"/>\n    <path fill="#FABD2C" d="M29.53,23.71l3.89-1.29c0,0,0.03,0.01,0.03,0.09c-0.08,1.5-0.91,16.72-0.92,16.99s-0.12,0.37-0.12,0.37\n      s-0.82,0.89-0.88,0.93s-0.17,0-0.17,0s0.08-0.04,0.09-0.23s-0.38-7.48-0.38-7.48c-0.01-0.37-0.07-0.52-0.23-0.53\n      c-0.15,0-0.19,0.15-0.19,0.53c0,0-0.63,8.45-0.64,8.88s-0.2,0.56-0.2,0.56s-0.82,0.83-0.89,0.89c-0.08,0.06-0.19,0.01-0.19,0.01\n      s0.14-0.01,0.14-0.3C28.86,42.94,29.53,23.71,29.53,23.71L29.53,23.71z"/>\n    <path opacity="0.3" fill="#CE592C" enable-background="new    " d="M29.53,23.71l3.89-1.29c0,0,0.03,0.01,0.03,0.09\n      c-0.08,1.5-0.91,16.72-0.92,16.99s-0.12,0.37-0.12,0.37s-0.82,0.89-0.88,0.93s-0.17,0-0.17,0s0.08-0.04,0.09-0.23\n      s-0.38-7.48-0.38-7.48c-0.01-0.37-0.07-0.52-0.23-0.53c-0.15,0-0.19,0.15-0.19,0.53c0,0-0.63,8.45-0.64,8.88s-0.2,0.56-0.2,0.56\n      s-0.82,0.83-0.89,0.89c-0.08,0.06-0.19,0.01-0.19,0.01s0.14-0.01,0.14-0.3C28.86,42.94,29.53,23.71,29.53,23.71L29.53,23.71z"/>\n    <path fill="#CE592C" d="M33.42,22.42l-3.89,1.29l-3.89-1.07l4.37-1.2"/>\n    <ellipse opacity="0.5" fill="#CE592C" enable-background="new    " cx="29.8" cy="22.4" rx="2.13" ry="0.52"/>\n    <path fill="#FABD2C" d="M25.97,33.53c-0.02,0.57-0.27,1.45,0.76,1.59c1.02,0.14,1.05-0.86,1.11-1.14c0,0,0.52-2.21,0.66-4.41\n      c0,0,0.03-3.78-0.01-4.23c-0.12-1.66-0.91-2.11-1.64-1.87c-0.53,0.17-1.08,0.65-0.94,2.01c0,0,0.18,3.89,0.18,4.64\n      C26.07,31.05,25.97,33.53,25.97,33.53L25.97,33.53z"/>\n    <path opacity="0.25" fill="#CF572E" enable-background="new    " d="M25.97,33.53c-0.02,0.57-0.27,1.45,0.76,1.59\n      c1.02,0.14,1.05-0.86,1.11-1.14c0,0,0.52-2.21,0.66-4.41c0,0,0.03-3.78-0.01-4.23c-0.12-1.66-0.91-2.11-1.64-1.87\n      c-0.53,0.17-1.08,0.65-0.94,2.01c0,0,0.18,3.89,0.18,4.64C26.07,31.05,25.97,33.53,25.97,33.53L25.97,33.53z"/>\n    <ellipse fill="#FABD2C" cx="29.95" cy="17.23" rx="4.96" ry="5"/>\n    <path opacity="0.25" fill="#CE592C" enable-background="new    " d="M29.98,21.74c1.19,0,2.3-0.27,3.24-0.75\n      c-0.87,0.77-2.01,1.24-3.26,1.24c-1.28,0-2.44-0.49-3.32-1.28C27.6,21.45,28.75,21.74,29.98,21.74L29.98,21.74z"/>\n    <path fill="#FDBF2D" d="M25.99,33.53c-0.04,1.16,0.54,0.95,0.82,0.81c0.99-0.52,1.09-5.12,1.2-6.56c0.07-0.97,0.16-3.58-0.78-4.26\n      c-0.55-0.21-1.04,0.42-1.09,0.51c-0.19,0.31-0.29,0.77-0.22,1.45c0,0,0.18,3.89,0.18,4.64C26.09,31.05,25.99,33.53,25.99,33.53z"\n      />\n  </g>\n</svg>\n;<svg xmlns="http://www.w3.org/2000/svg" width="60px" height="60px" viewBox="0 0 60 60">\n  <g>\n    <path opacity="0.3" fill="#111111" enable-background="new    " d="M30.33,27.2c-11.24,0-20.35,6.46-20.35,14.42\n      s9.11,14.42,20.35,14.42s20.35-6.46,20.35-14.42C50.68,33.65,41.57,27.2,30.33,27.2z M30.21,55.04\n      c-10.75,0-19.47-6.06-19.47-13.53s8.72-13.53,19.47-13.53s19.47,6.06,19.47,13.53S40.96,55.04,30.21,55.04z"/>\n    <ellipse opacity="0.1" fill="#111111" enable-background="new    " cx="30.21" cy="41.51" rx="19.47" ry="13.53"/>\n  </g>\n  <g>\n    <path fill="#FFFFFF" d="M25.23,41.88c-0.14,0-0.27-0.06-0.37-0.16l-7.88-8.59c-0.16-0.17-0.18-0.43-0.04-0.62\n      c0.13-0.19,0.38-0.26,0.6-0.18l13.95,5.63c0.22,0.09,0.35,0.33,0.3,0.57s-0.25,0.41-0.51,0.4c-2.16-0.08-4.25,0.11-4.56,0.42\n      c-0.49,0.49-0.89,1.73-1,2.16c-0.05,0.18-0.19,0.32-0.36,0.36C25.31,41.88,25.27,41.88,25.23,41.88z M19.21,34.08l5.81,6.33\n      c0.21-0.58,0.55-1.33,0.99-1.77c0.43-0.43,1.61-0.62,2.77-0.69L19.21,34.08z"/>\n    <path fill="#3F3F3F" d="M25.23,41.38c0,0,0.38-1.63,1.13-2.39c0.75-0.75,4.93-0.57,4.93-0.57l-13.95-5.63L25.23,41.38z"/>\n    <path fill="#333333" d="M27.48,44.47c-0.26,0-0.52-0.09-0.7-0.28c-0.12-0.12-0.75-0.76-0.99-1.1c-0.37-0.51-0.41-1.07-0.41-1.3\n      l-0.36-6.17c-0.96-0.56-0.9-1.66-0.88-2.07l0.01-0.14c0-0.01,0.1-2.46,0.11-3.38c0.01-0.75-0.07-4.55-0.07-4.55\n      c-0.06-0.55-0.01-1.06,0.15-1.51l-0.06-1.08c-0.03-0.1-0.04-0.2-0.03-0.31c0.03-0.45,0.33-0.84,0.78-0.93l0.79-0.16\n      c-1.15-1.13-1.8-2.67-1.81-4.26c0-1.6,0.62-3.11,1.74-4.24c1.12-1.13,2.62-1.76,4.22-1.76h0.01c1.59,0,3.09,0.62,4.21,1.75\n      c1.13,1.13,1.75,2.64,1.75,4.24c0,1.52-0.58,2.97-1.62,4.09l0.46,0.13c0.16,0.03,0.31,0.1,0.43,0.19c0.51,0.3,1.17,0.99,1.14,2.61\n      c0,0.43-0.28,3.35-0.34,3.93c-0.31,2.06-0.75,3.97-0.77,4.05c-0.04,0.25-0.1,0.6-0.3,0.92c-0.22,3.53-0.41,6.62-0.41,6.76\n      c-0.04,0.61-0.39,1.01-0.7,1.19c-1.32,0.91-1.4,0.94-1.52,0.99c-0.06,0.02-0.14,0.04-0.23,0.06c-0.11,0.03-0.22,0.03-0.33,0.02\n      c-0.14-0.01-0.27-0.03-0.27-0.03c-0.16-0.03-0.31-0.1-0.43-0.19c-0.11-0.04-0.23-0.09-0.34-0.13c-0.01,0.09-0.02,0.15-0.02,0.18\n      c-0.02,0.72-0.45,1.19-0.83,1.39c-0.21,0.12-1.48,0.86-1.6,0.92c-0.19,0.1-0.41,0.13-0.63,0.15\n      C27.57,44.47,27.52,44.47,27.48,44.47z M26.13,33.94c0.01,0,0.02,0,0.04,0.01c0.45,0.09,0.79,0.47,0.81,0.92l0.4,6.85v0.12\n      c0,0.01,0.01,0.07,0.03,0.09c0.05,0.07,0.18,0.22,0.33,0.38c0.32-0.18,0.72-0.42,0.95-0.55c0.04-0.36,0.17-1.41,0.66-4.95\n      c0.07-0.5,0.49-0.86,0.99-0.86h0.03c0.51,0.01,0.93,0.41,0.97,0.91l0.28,3.18c0.05,0.02,0.09,0.03,0.14,0.05\n      c0.24-0.16,0.56-0.38,0.77-0.52c0.05-0.82,0.23-3.69,0.42-6.86c0.01-0.24,0.11-0.46,0.27-0.63c0.01-0.03,0.01-0.06,0.01-0.09\n      c0.02-0.1,0.03-0.18,0.05-0.25c0,0,0.43-1.88,0.72-3.79c0.15-1.61,0.32-3.47,0.32-3.71c0.01-0.55-0.11-0.8-0.15-0.86\n      c-0.05,0.04-0.1,0.08-0.15,0.11c-0.1,0.07-0.22,0.12-0.34,0.14l-1.31,0.27c-0.29,0.06-0.6-0.01-0.83-0.2s-0.37-0.48-0.37-0.78\n      c0-0.2,0.06-0.39,0.17-0.55c-0.13-0.15-0.21-0.35-0.23-0.55c-0.04-0.41,0.18-0.8,0.55-0.99c0.19-0.1,0.31-0.16,0.43-0.23\n      c0.07-0.05,0.14-0.1,0.21-0.16c0.06-0.04,0.1-0.08,0.14-0.1c0.02-0.03,0.05-0.05,0.08-0.07c0.9-0.77,1.41-1.88,1.41-3.03\n      c0-1.07-0.41-2.07-1.16-2.83c-0.75-0.75-1.74-1.17-2.79-1.17c-1.06,0-2.05,0.42-2.8,1.17c-0.75,0.76-1.16,1.76-1.16,2.83\n      c0,1.15,0.49,2.21,1.37,2.99c0.03,0.02,0.05,0.05,0.08,0.08l0.21,0.16c0.05,0.04,0.11,0.09,0.16,0.12\n      c0.11,0.07,0.22,0.13,0.34,0.18l0.17,0.09c0.05,0.03,0.1,0.05,0.15,0.08c0.06,0.02,0.11,0.04,0.17,0.05l0.13,0.04\n      c0.43,0.14,0.72,0.55,0.7,1.01c-0.02,0.45-0.35,0.84-0.8,0.93l-2.36,0.48l0.04,0.65c0.01,0.17-0.02,0.33-0.09,0.49\n      c-0.06,0.12-0.11,0.35-0.07,0.8c0,0.08,0.08,3.93,0.08,4.68c-0.01,0.94-0.11,3.44-0.11,3.44l-0.01,0.16\n      C26.13,33.75,26.13,33.85,26.13,33.94L26.13,33.94z M32.74,39.41c-0.03,0.01-0.05,0.03-0.07,0.05\n      C32.72,39.43,32.74,39.41,32.74,39.41z"/>\n    <path fill="#FDBF2D" d="M25.26,22.64l4.46-0.83c0,0,2.42,0.35,2.43,0.35l0.46,17.98l-0.78,1.03c0,0-1.02-0.38-1.1-0.41\n      c-0.08-0.03-0.07-0.18-0.07-0.18L30,33.05l-1.46,9.74l-1.04,0.7c0,0-0.68-0.69-0.89-0.98c-0.24-0.33-0.22-0.73-0.22-0.73\n      L25.26,22.64z"/>\n    <path fill="#CE592C" d="M25.55,33.57c-0.01,0.57-0.14,1.3,0.87,1.46c0.74,0.12,0.75-0.12,1-1.14c0,0,0.44-2.51,0.55-4.71\n      c0,0,0.13-3.31,0.09-3.76c-0.15-1.66-0.94-2.09-1.67-1.85c-0.53,0.18-1.07,0.66-0.91,2.02c0,0,0.13,3.82,0.13,4.57\n      C25.63,31.09,25.55,33.57,25.55,33.57z"/>\n    <path fill="#FABD2C" d="M25.15,33.46c-0.02,0.57-0.16,1.3,0.85,1.48c0.74,0.13,0.75-0.11,1.02-1.13c0,0,0.47-2.5,0.61-4.71\n      c0,0,0.18-3.31,0.14-3.76c-0.12-1.66-0.91-2.11-1.64-1.87c-0.53,0.17-1.08,0.65-0.94,2.01c0,0,0.08,3.82,0.07,4.58\n      C25.25,30.98,25.15,33.46,25.15,33.46z"/>\n    <path opacity="0.3" fill="#CE592C" enable-background="new    " d="M25.15,33.46c-0.02,0.57-0.16,1.3,0.85,1.48\n      c0.74,0.13,0.75-0.11,1.02-1.13c0,0,0.47-2.5,0.61-4.71c0,0,0.18-3.31,0.14-3.76c-0.12-1.66-0.91-2.11-1.64-1.87\n      c-0.53,0.17-1.08,0.65-0.94,2.01c0,0,0.08,3.82,0.07,4.58C25.25,30.98,25.15,33.46,25.15,33.46z"/>\n    <path fill="#FDBF2D" d="M25.15,33.46c-0.04,1.16,0.68,1.07,0.93,0.87c0.63-0.5,0.71-5.21,0.82-6.64c0.07-0.97-0.09-3.4-0.4-4.17\n      c-0.55-0.21-1.04,0.42-1.09,0.51c-0.19,0.31-0.29,0.77-0.22,1.45c0,0,0.08,3.82,0.07,4.58C25.25,30.98,25.15,33.46,25.15,33.46\n      L25.15,33.46z"/>\n    <path fill="#E58A2C" d="M32.58,31.45c-0.01,0.67-0.2,1.27,0.73,1.43c0.91,0.15,0.86-0.61,0.93-0.87c0,0,0.45-1.92,0.75-3.91\n      c0,0,0.33-3.44,0.33-3.85c0.02-1.52-0.66-1.99-1.35-1.84c-0.5,0.11-1.03,0.5-1.01,1.75c0,0-0.15,3.56-0.21,4.24\n      C32.67,29.24,32.58,31.45,32.58,31.45z"/>\n    <path fill="#FABD2C" d="M28.38,23.71l6.17-1.29c0,0,0.05,0.01,0.04,0.09c-0.13,1.5-1.07,17.08-1.09,17.34\n      c-0.02,0.27-0.19,0.37-0.19,0.37s-1.3,0.89-1.39,0.93s-0.27,0-0.27,0s0.13-0.04,0.14-0.23c0.02-0.19-0.3-7.46-0.3-7.46\n      c-0.01-0.37-0.11-0.52-0.36-0.53c-0.24,0-0.29,0.15-0.31,0.53c0,0-1.14,8.05-1.15,8.48s-0.31,0.56-0.31,0.56s-1.47,0.86-1.59,0.92\n      s-0.3,0.01-0.3,0.01s0.22-0.01,0.22-0.3C27.69,42.94,28.38,23.71,28.38,23.71L28.38,23.71z"/>\n    <path opacity="0.3" fill="#CE592C" enable-background="new    " d="M28.38,23.71l6.17-1.29c0,0,0.05,0.01,0.04,0.09\n      c-0.13,1.5-1.07,17.08-1.09,17.34c-0.02,0.27-0.19,0.37-0.19,0.37s-1.3,0.89-1.39,0.93s-0.27,0-0.27,0s0.13-0.04,0.14-0.23\n      c0.02-0.19-0.3-7.46-0.3-7.46c-0.01-0.37-0.11-0.52-0.36-0.53c-0.24,0-0.29,0.15-0.31,0.53c0,0-1.14,8.05-1.15,8.48\n      s-0.31,0.56-0.31,0.56s-1.47,0.86-1.59,0.92s-0.3,0.01-0.3,0.01s0.22-0.01,0.22-0.3C27.69,42.94,28.38,23.71,28.38,23.71\n      L28.38,23.71z"/>\n    <path fill="#CE592C" d="M34.51,22.42l-6.14,1.29l-3.15-1.07l5.88-1.2"/>\n    <ellipse opacity="0.5" fill="#CE592C" enable-background="new    " cx="30.05" cy="22.41" rx="2.25" ry="0.43"/>\n    <ellipse fill="#FABD2C" cx="29.95" cy="17.23" rx="4.96" ry="5"/>\n    <path opacity="0.25" fill="#CE592C" enable-background="new    " d="M29.98,21.74c1.19,0,2.3-0.27,3.24-0.75\n      c-0.87,0.77-2.01,1.24-3.26,1.24c-1.28,0-2.44-0.49-3.32-1.28C27.6,21.45,28.75,21.74,29.98,21.74L29.98,21.74z"/>\n  </g>\n</svg>\n;<svg xmlns="http://www.w3.org/2000/svg" width="60px" height="60px" viewBox="0 0 60 60">\n  <g>\n    <path opacity="0.3" fill="#111111" enable-background="new    " d="M30.33,27.2c-11.24,0-20.35,6.46-20.35,14.42\n      s9.11,14.42,20.35,14.42s20.35-6.46,20.35-14.42C50.68,33.65,41.57,27.2,30.33,27.2z M30.21,55.04\n      c-10.75,0-19.47-6.06-19.47-13.53s8.72-13.53,19.47-13.53s19.47,6.06,19.47,13.53S40.96,55.04,30.21,55.04z"/>\n    <ellipse opacity="0.1" fill="#111111" enable-background="new    " cx="30.21" cy="41.51" rx="19.47" ry="13.53"/>\n  </g>\n  <path fill="#FFFFFF" d="M25.23,41.88c-0.21,0-0.4-0.13-0.47-0.33l-4.3-11.67c-0.08-0.21,0-0.45,0.18-0.58s0.44-0.12,0.61,0.03\n    l10.37,8.71c0.16,0.14,0.22,0.36,0.15,0.56c-0.08,0.2-0.29,0.31-0.49,0.32c-2.16-0.08-4.25,0.11-4.56,0.42\n    c-0.49,0.49-0.89,1.73-1,2.16c-0.05,0.21-0.24,0.36-0.46,0.37C25.25,41.88,25.24,41.88,25.23,41.88z M22.05,31.3l3.17,8.6\n    c0.2-0.46,0.47-0.94,0.79-1.27c0.58-0.58,2.47-0.71,3.89-0.73L22.05,31.3z"/>\n  <path fill="#3F3F3F" d="M25.23,41.38c0,0,0.38-1.63,1.13-2.39c0.75-0.75,4.93-0.57,4.93-0.57l-10.37-8.71L25.23,41.38L25.23,41.38z\n    "/>\n  <path fill="#333333" d="M26.56,43.7c-0.18,0-0.37-0.03-0.58-0.08l-0.5-0.14l-0.11-0.3c-0.65-0.61-1.01-1.18-1.06-1.69\n    c-0.02-0.21-0.04-0.44-0.01-0.65l-0.17-5.13c-0.05,0.01-0.09,0.02-0.13,0.02c-0.53,0.08-1.21-0.13-1.58-0.26\n    c-0.62-0.16-1.02-0.85-0.9-1.64c0.08-0.68,0.45-3.36,0.75-5.23c0.4-2.47,0.88-4.5,0.9-4.58c0.06-0.39,0.25-0.83,0.53-1.2\n    l-0.01-0.46c-0.01-0.33,0.11-0.65,0.34-0.9c0.23-0.24,0.54-0.38,0.88-0.39l0.47-0.01c-0.86-1.05-1.37-2.39-1.37-3.82\n    c0-1.6,0.62-3.11,1.74-4.24c1.12-1.13,2.62-1.76,4.22-1.76h0.01c1.59,0,3.09,0.62,4.21,1.75s1.74,2.64,1.75,4.24\n    c0,1.62-0.63,3.12-1.71,4.22c0.37,0.21,0.8,0.46,1.15,0.68c1.08,0.67,1.28,1.95,1.31,2.31c0.21,1.1,0.74,3.9,0.88,4.48\n    c0.23,0.93,0.66,3.25,0.68,3.34c0.02,0.12,0.04,0.21,0.06,0.3c0.11,0.54,0.4,1.96-1.3,2.51c-0.54,0.18-1.03,0.16-1.45-0.06\n    c-0.35-0.18-0.57-0.46-0.7-0.71c-0.22,3.57-0.41,6.62-0.42,6.74c-0.04,0.61-0.39,1.01-0.7,1.19l-0.3,0.11c0,0-1.5,0.31-1.99,0.42\n    l-0.04,0.04l-0.24,0.03c-0.01,0-0.03,0-0.05,0.01l-0.05,0.01c-0.14,0.02-0.41,0.03-0.69-0.08c-0.11-0.04-0.18-0.07-0.52-0.36\n    c-0.18,0.41-0.49,0.68-0.77,0.8l-0.22,0.07c-0.72,0.13-1.59,0.31-1.82,0.37C26.91,43.67,26.75,43.7,26.56,43.7L26.56,43.7z\n     M26.25,41.78c-0.01,0-0.01,0.01-0.02,0.01C26.23,41.79,26.24,41.78,26.25,41.78z M26.31,41.24c0.06,0.09,0.19,0.24,0.36,0.41\n    c0.25-0.06,0.66-0.14,1.36-0.28c0.07-0.72,0.3-2.64,0.67-5.71l1.99,0.1l0.11,4.79c0.09,0.08,0.18,0.16,0.27,0.23\n    c0.25-0.06,0.67-0.15,1.4-0.3c0.09-1.51,0.42-6.79,0.69-11.21l1.95-0.23c0.39,1.26,0.83,2.48,1.1,3.21\n    c-0.13-0.69-0.42-2.2-0.58-2.86c-0.19-0.75-0.89-4.48-0.92-4.63l-0.02-0.13c-0.01-0.19-0.12-0.64-0.37-0.79\n    c-0.55-0.34-1.3-0.77-1.68-0.98l-0.81,0.02l-0.4-1.93c1.52-0.61,2.5-2.07,2.5-3.71c0-1.07-0.41-2.07-1.16-2.83\n    c-0.75-0.75-1.74-1.17-2.79-1.17c-1.06,0-2.05,0.42-2.8,1.17c-0.75,0.76-1.16,1.76-1.16,2.83c0,1.72,1.09,3.24,2.71,3.79\n    l-0.29,1.95l-2.71,0.08l0.02,0.57l-0.35,0.31c-0.12,0.11-0.23,0.31-0.25,0.47c-0.02,0.09-0.5,2.12-0.89,4.51\n    c-0.31,1.94-0.59,3.97-0.7,4.8c0.02,0,0.03,0.01,0.04,0.01l0.44-1.92L26.01,32L26.31,41.24L26.31,41.24z M23.02,33.56\n    c0.03,0.01,0.05,0.02,0.08,0.03C23.08,33.58,23.05,33.57,23.02,33.56z"/>\n  <path fill="#FABD2C" d="M37.27,32.44c0.12,0.73,0.42,1.35-0.57,1.67c-0.97,0.31-1.03-0.53-1.15-0.79c0,0-0.79-2.02-1.44-4.14\n    c0,0-0.9-3.69-0.98-4.14c-0.26-1.66,0.41-2.27,1.17-2.21c0.56,0.04,1.2,0.38,1.38,1.75c0,0,0.72,3.85,0.91,4.58\n    C36.82,30.06,37.27,32.44,37.27,32.44z"/>\n  <path fill="#E58A2C" d="M37.29,32.44c0.12,0.73,0.42,1.35-0.57,1.67c-0.97,0.31-1.03-0.53-1.15-0.79c0,0-0.79-2.02-1.44-4.14\n    c0,0-0.9-3.69-0.98-4.14c-0.26-1.66,0.41-2.27,1.17-2.21c0.56,0.04,1.2,0.38,1.38,1.75c0,0,0.72,3.85,0.91,4.58\n    C36.84,30.06,37.29,32.44,37.29,32.44z"/>\n  <path opacity="0.25" fill="#CF572E" enable-background="new    " d="M34.26,29.87l0.2-7.11l0.41,0.31c0,0-0.06,5.4,0.11,6.64\n    c0.17,1.24,0.45,3.13,0.45,3.13L34.26,29.87L34.26,29.87z"/>\n  <path fill="none" d="M24.69,22.07h8.2v20.56h-8.2C24.69,42.63,24.69,22.07,24.69,22.07z"/>\n  <path fill="#FDBF2D" d="M24.69,22.07l0.6,18.85c0,0-0.04,0.04,0.01,0.47c0.04,0.48,0.95,1.24,0.95,1.24l1.87-0.57l1.25-10.04\n    l0.24,0.77l0.18,8.22l0.95,0.81l0.18,0.02l1.44-1.03l0.51-18.03l-2.05-0.32L24.69,22.07"/>\n  <path fill="#FABD2C" d="M34.54,22.74L26.27,23c-0.5,15.19,0.06,15.86-0.04,19.32c-0.01,0.3,0.01,0.32,0.01,0.32\n    s0.18,0.05,0.33,0.05c0.05,0,0.1-0.01,0.13-0.02c0.12-0.06,1.99-0.41,1.99-0.41s0.3-0.13,0.32-0.56c0.01-0.43,0.87-7.49,0.87-7.49\n    c0.05-0.65,0.14-0.75,0.4-0.75c0.24,0,0.34,0.15,0.35,0.52c0,0,0.3,7.41,0.28,7.6c-0.02,0.19-0.14,0.22-0.14,0.22h0.27\n    c0.1-0.04,2.21-0.47,2.21-0.47s0.17-0.1,0.19-0.38L34.54,22.74"/>\n  <path opacity="0.3" fill="#CE592C" enable-background="new    " d="M34.57,22.74L26.3,23c-0.5,15.19,0.06,15.86-0.05,19.32\n    c-0.01,0.3,0.02,0.32,0.02,0.32s0.18,0.05,0.32,0.05c0.05,0,0.09-0.01,0.12-0.02c0.13-0.06,2-0.41,2-0.41s0.3-0.13,0.31-0.56\n    c0.02-0.43,0.88-7.49,0.88-7.49c0.04-0.65,0.14-0.75,0.39-0.75s0.35,0.15,0.36,0.52c0,0,0.3,7.41,0.27,7.6\n    c-0.01,0.19-0.14,0.22-0.14,0.22h0.27c0.09-0.04,2.2-0.47,2.2-0.47s0.18-0.1,0.2-0.38c0.02-0.26,1.02-16.63,1.14-18.14L34.57,22.74\n    "/>\n  <path fill="#CE592C" d="M32.89,21.84l-8.2,0.23l1.57,0.96l8.25-0.29L32.89,21.84"/>\n  <ellipse opacity="0.5" fill="#CE592C" enable-background="new    " cx="30.01" cy="22.37" rx="2.25" ry="0.3"/>\n  <ellipse fill="#FABD2C" cx="29.98" cy="17.23" rx="4.96" ry="5"/>\n  <path opacity="0.25" fill="#CE592C" enable-background="new    " d="M30,21.74c1.19,0,2.3-0.27,3.24-0.75\n    c-0.87,0.77-2.01,1.24-3.26,1.24c-1.28,0-2.44-0.49-3.32-1.28C27.62,21.45,28.77,21.74,30,21.74L30,21.74z"/>\n  <path fill="#FABD2C" d="M25.94,26.06c-0.1,1.59-0.92,5.97-0.92,5.97l-0.54,2.33c-0.08,0.24-0.27,0.33-0.62,0.38\n    s-1.09-0.21-1.09-0.21c-0.23-0.06-0.29-0.3-0.25-0.55c0,0,0.35-2.72,0.75-5.23c0.4-2.46,0.89-4.51,0.89-4.51\n    c0.1-0.61,0.59-1.29,1.17-1.34c0,0,0.69,0,0.71,1.06C26.06,25.08,25.94,26.06,25.94,26.06L25.94,26.06z"/>\n  <path opacity="0.25" fill="#CF572E" enable-background="new    " d="M25.52,22.95c0.2,0.08,0.5,0.32,0.52,1.01\n    c0.03,1.12-0.1,2.1-0.1,2.1c-0.09,1.36-0.7,4.73-0.87,5.7l-0.01,0.05C25.05,31.81,25.63,26.32,25.52,22.95z"/>\n</svg>\n'.split(
			';'
		);
	_.Ha(lN, _.O);
	_.r = lN.prototype;
	_.r.mode_changed = function() {
		oN(this);
		pN(this);
	};
	_.r.heading_changed = function() {
		7 == this.j() && oN(this);
	};
	_.r.position_changed = function() {
		var a = this.j();
		if (5 == a || 6 == a || 3 == a || 4 == a)
			this.get('position')
				? (this.ta.setVisible(!0),
				  this.ua.setVisible(!1),
				  this.set('lilypadIcon', tN(this)))
				: ((a = this.j()), 5 == a ? this.i(6) : 3 == a && this.i(4));
		else {
			var b = this.get('position');
			b && 1 == a && this.i(7);
			this.set('dragPosition', b);
		}
	};
	_.r.Hm = function(a) {
		this.set('dragging', !0);
		this.i(5);
		this.H = a.pixel.x;
	};
	_.r.Im = function(a) {
		var b = this;
		a = a.pixel.x;
		a > b.H + 5
			? (this.i(5), (b.H = a))
			: a < b.H - 5 && (this.i(3), (b.H = a));
		pN(this);
		window.clearTimeout(b.o);
		b.o = window.setTimeout(function() {
			_.N.trigger(b, 'hover');
			b.o = 0;
		}, 300);
	};
	_.r.Gm = function() {
		this.set('dragging', !1);
		this.i(1);
		window.clearTimeout(this.o);
		this.o = 0;
	};
	_.A(vN, _.O);
	_.r = vN.prototype;
	_.r.mode_changed = function() {
		var a = _.mK(this.ri());
		a != this.o && (a ? yN(this) : xN(this));
	};
	_.r.tilt_changed = vN.prototype.heading_changed = function() {
		this.o && (xN(this), yN(this));
	};
	_.r.rj = function(a) {
		var b = this,
			c = this.get('dragPosition'),
			d = this.i.getZoom(),
			e = Math.max(50, 35 * Math.pow(2, 16 - d));
		this.set('hover', a);
		this.T = !1;
		_.P('streetview').then(function(f) {
			var g = b.Qa || void 0;
			b.j || ((b.j = new f.Hk(g)), b.j.bindTo('result', b, null, !0));
			b.j.getPanoramaByLocation(
				c,
				e,
				g ? void 0 : 100 > e ? 'nearest' : 'best'
			);
		});
	};
	_.r.result_changed = function() {
		var a = this.get('result'),
			b = a && a.location;
		this.set('position', b && b.latLng);
		this.set('description', b && b.shortDescription);
		this.set('panoId', b && b.pano);
		this.T ? this.Hg(1) : this.get('hover') || this.set('panoramaVisible', !!a);
	};
	_.r.panoramaVisible_changed = function() {
		this.T = 0 == this.get('panoramaVisible');
		this.ri();
		var a = this.get('panoramaVisible'),
			b = this.get('hover');
		a || b || this.Hg(1);
		a && this.notify('position');
	};
	_.r.ri = _.Te('mode');
	_.r.Hg = _.Ue('mode');
	AN.prototype.ta = function() {
		this.o = !this.o;
		this.ka();
	};
	AN.prototype.ka = function() {
		var a = this.W.get();
		if (a) {
			a *= 80;
			a = this.o
				? BN(a / 1e3, '\u516c\u91cc', a, '\u7c73')
				: BN(a / 1609.344, '\u82f1\u91cc', 3.28084 * a, '\u82f1\u5c3a');
			var b = this.$;
			var c = a.zl + '\u00a0';
			if (c instanceof _.Rb) var d = c;
			else {
				var e = 'object' == typeof c;
				d = null;
				e && c.dh && (d = c.i());
				c = _.Tl(e && c.Uc ? c.Eb() : String(c));
				d = _.Tb(c, d);
			}
			_.ox(b, d);
			this.i.style.width = _.fz(a.Bn + 4, !0);
			this.H || (this.H = _.z.setTimeout((0, _.y)(this.ua, this), 50));
		}
	};
	AN.prototype.ua = function() {
		this.H = 0;
		var a = this.T;
		this.j.set(new _.dx(a.offsetWidth, a.offsetHeight).width);
	};
	_.Ha(LN, _.O);
	_.r = LN.prototype;
	_.r.disableDefaultUI_changed = function() {
		SN(this);
	};
	_.r.size_changed = function() {
		SN(this);
	};
	_.r.mapTypeId_changed = function() {
		QN(this) != this.Pc && ((this.o[1] = !0), _.ki(this.Ja));
		this.Qa && this.Qa.setMapTypeId(this.get('mapTypeId'));
	};
	_.r.mapTypeControl_changed = function() {
		this.o[0] = !0;
		_.ki(this.Ja);
	};
	_.r.mapTypeControlOptions_changed = function() {
		this.o[0] = !0;
		_.ki(this.Ja);
	};
	_.r.fullscreenControlOptions_changed = function() {
		this.o[3] = !0;
		_.ki(this.Ja);
	};
	_.r.scaleControl_changed = function() {
		this.o[2] = !0;
		_.ki(this.Ja);
	};
	_.r.scaleControlOptions_changed = function() {
		this.o[2] = !0;
		_.ki(this.Ja);
	};
	_.r.panControl_changed = function() {
		aO(this);
	};
	_.r.panControlOptions_changed = function() {
		aO(this);
	};
	_.r.rotateControl_changed = function() {
		aO(this);
	};
	_.r.rotateControlOptions_changed = function() {
		aO(this);
	};
	_.r.streetViewControl_changed = function() {
		aO(this);
	};
	_.r.streetViewControlOptions_changed = function() {
		aO(this);
	};
	_.r.zoomControl_changed = function() {
		aO(this);
	};
	_.r.zoomControlOptions_changed = function() {
		aO(this);
	};
	_.r.myLocationControl_changed = function() {
		aO(this);
	};
	_.r.myLocationControlOptions_changed = function() {
		aO(this);
	};
	_.r.streetView_changed = function() {
		cO(this);
	};
	_.r.Nj = function(a) {
		this.get('panoramaVisible') != a && this.set('panoramaVisible', a);
	};
	_.r.panoramaVisible_changed = function() {
		var a = this.get('streetView');
		a && a.i.set(!!this.get('panoramaVisible'));
	};
	_.A(dO, _.O);
	dO.prototype.Ya = function() {
		return _.Xg(this.j);
	};
	dO.prototype.addElement = function(a, b, c, d) {
		var e = this;
		if ((b = this.i[b])) {
			d = _.fd(d) ? d : b.length;
			var f;
			for (f = 0; f < b.length && !(b[f].index > d); ++f);
			b.splice(f, 0, {
				element: a,
				border: c,
				index: d,
				listener: _.N.addListener(a, 'resize', function() {
					return _.ki(e.Ja);
				})
			});
			_.lo(a);
			a.style.visibility = 'hidden';
			this.j.appendChild(a);
			_.ki(this.Ja);
		}
	};
	dO.prototype.Xc = function(a) {
		a.parentNode && a.parentNode.removeChild(a);
		_.Yc(this.i, function(b, c) {
			for (b = 0; b < c.length; ++b)
				if (c[b].element == a) {
					var d = a;
					d.style.top = 'auto';
					d.style.bottom = 'auto';
					d.style.left = 'auto';
					d.style.right = 'auto';
					_.N.removeListener(c[b].listener);
					c.splice(b, 1);
				}
		});
		_.ki(this.Ja);
	};
	dO.prototype.o = function() {
		var a = this.Ya(),
			b = a.width;
		a = a.height;
		var c = this.i,
			d = [],
			e = hO(c[1], 'left', 'top', d),
			f = iO(c[5], 'left', 'top', d);
		d = [];
		var g = hO(c[10], 'left', 'bottom', d),
			h = iO(c[6], 'left', 'bottom', d);
		d = [];
		var k = hO(c[3], 'right', 'top', d),
			l = iO(c[7], 'right', 'top', d);
		d = [];
		var m = hO(c[12], 'right', 'bottom', d);
		d = iO(c[9], 'right', 'bottom', d);
		var q = kO(c[11], 'bottom', b),
			t = kO(c[2], 'top', b),
			u = jO(c[4], 'left', b, a);
		jO(c[13], 'center', b, a);
		c = jO(c[8], 'right', b, a);
		this.set(
			'bounds',
			new _.Id([
				new _.I(
					Math.max(u, e.width, g.width, f.width, h.width) || 0,
					Math.max(t, e.height, f.height, k.height, l.height) || 0
				),
				new _.I(
					b - (Math.max(c, k.width, m.width, l.width, d.width) || 0),
					a - (Math.max(q, g.height, m.height, h.height, d.height) || 0)
				)
			])
		);
	};
	_.A(nO, _.O);
	nO.prototype.W = function(a) {
		if (rO(this, a)) return !0;
		var b = !1;
		switch (a.keyCode) {
			case 38:
			case 40:
			case 37:
			case 39:
				this.o[a.keyCode] = 1;
				this.i || ((this.j = new _.OE(100)), this.H());
				b = !0;
				break;
			case 34:
				qO(this, 0, 0.75);
				b = !0;
				break;
			case 33:
				qO(this, 0, -0.75);
				b = !0;
				break;
			case 36:
				qO(this, -0.75, 0);
				b = !0;
				break;
			case 35:
				qO(this, 0.75, 0);
				b = !0;
				break;
			case 187:
			case 107:
				oO(this);
				b = !0;
				break;
			case 189:
			case 109:
				pO(this), (b = !0);
		}
		switch (a.which) {
			case 61:
			case 43:
				oO(this);
				b = !0;
				break;
			case 45:
			case 95:
			case 173:
				pO(this), (b = !0);
		}
		b && (_.fe(a), _.ge(a));
		return !b;
	};
	nO.prototype.T = function(a) {
		if (rO(this, a)) return !0;
		switch (a.keyCode) {
			case 38:
			case 40:
			case 37:
			case 39:
			case 34:
			case 33:
			case 36:
			case 35:
			case 187:
			case 107:
			case 189:
			case 109:
				return _.fe(a), _.ge(a), !1;
		}
		switch (a.which) {
			case 61:
			case 43:
			case 45:
			case 95:
			case 173:
				return _.fe(a), _.ge(a), !1;
		}
		return !0;
	};
	nO.prototype.$ = function(a) {
		var b = !1;
		switch (a.keyCode) {
			case 38:
			case 40:
			case 37:
			case 39:
				(this.o[a.keyCode] = null), (b = !0);
		}
		return !b;
	};
	nO.prototype.H = function() {
		for (var a = 0, b = 0, c = !1, d = 0; d < _.Xc(tO); d++)
			this.o[tO[d]] && ((c = uO[tO[d]]), (a += c[0]), (b += c[1]), (c = !0));
		c
			? ((c = 1),
			  _.PE(this.j) && (c = this.j.next()),
			  (d = Math.round(35 * c * a)),
			  (c = Math.round(35 * c * b)),
			  0 == d && (d = a),
			  0 == c && (c = b),
			  _.N.trigger(this, 'panbynow', d, c, 1),
			  (this.i = _.gy(this, this.H, 10)))
			: (this.i = 0);
	};
	_.r = sO.prototype;
	_.r.ii = dO;
	_.r.zm = function(a, b, c, d, e, f, g, h, k, l, m, q) {
		var t = b.get('streetView'),
			u = b.__gm;
		if (t && u) {
			var v = new _.MF(new _.Pc(_.H.V[1]).getStreetView(), t.get('client'));
			t = _.Ng[t.get('client')];
			var w = new LN({
					ql: function(M) {
						return m.fromContainerPixelToLatLng(new _.I(M.clientX, M.clientY));
					},
					Ii: b.controls,
					Ui: k,
					Rf: l,
					ij: a,
					map: b,
					Dm: b.mapTypes,
					lf: d,
					Jj: !0,
					nb: q,
					controlSize: b.get('controlSize') || 40,
					ko: t,
					no: v
				}),
				x = new _.mz(['bounds'], 'bottomRight', function(M) {
					return M && _.nm(M);
				}),
				C,
				J;
			_.N.kb(b, 'idle', function() {
				var M = b.get('bounds');
				M != C && (w.set('bounds', M), x.set('bounds', M), (C = M));
				M = b.get('center');
				M != J && (w.set('center', M), (J = M));
			});
			w.bindTo('bottomRight', x);
			w.bindTo('disableDefaultUI', b);
			w.bindTo('heading', b);
			w.bindTo('projection', b);
			w.bindTo('reportErrorControl', b);
			w.bindTo('passiveLogo', b);
			w.bindTo('zoom', u);
			w.bindTo('mapTypeId', c);
			w.bindTo('attributionText', e);
			w.bindTo('zoomRange', g);
			w.bindTo('aerialAvailableAtZoom', h);
			w.bindTo('tilt', h);
			w.bindTo('desiredTilt', h);
			w.bindTo('mapTypeControlOptions', b, null, !0);
			w.bindTo('panControlOptions', b, null, !0);
			w.bindTo('rotateControlOptions', b, null, !0);
			w.bindTo('scaleControlOptions', b, null, !0);
			w.bindTo('streetViewControlOptions', b, null, !0);
			w.bindTo('zoomControlOptions', b, null, !0);
			w.bindTo('mapTypeControl', b);
			w.bindTo('myLocationControlOptions', b);
			w.bindTo('fullscreenControlOptions', b, null, !0);
			b.get('fullscreenControlOptions') && w.notify('fullscreenControlOptions');
			w.bindTo('panControl', b);
			w.bindTo('rotateControl', b);
			w.bindTo('motionTrackingControl', b);
			w.bindTo('motionTrackingControlOptions', b, null, !0);
			w.bindTo('scaleControl', b);
			w.bindTo('streetViewControl', b);
			w.bindTo('fullscreenControl', b);
			w.bindTo('zoomControl', b);
			w.bindTo('myLocationControl', b);
			w.bindTo('rmiAvailable', f, 'available');
			w.bindTo('streetView', b);
			w.bindTo('fontLoaded', u);
			w.bindTo('size', u);
			u.bindTo('renderHeading', w);
			_.N.forward(w, 'panbyfraction', u);
		}
	};
	_.r.Cm = function(a, b, c, d, e, f, g) {
		var h = new LN({
			Ii: f,
			Ui: d,
			Rf: _.ef(!1),
			ij: e,
			lf: c,
			controlSize: g.get('controlSize') || 40,
			Jj: !1,
			lo: g
		});
		h.set('streetViewControl', !1);
		h.bindTo('attributionText', b, 'copyright');
		h.set('mapTypeId', 'streetview');
		h.set('tilt', !0);
		h.bindTo('heading', b);
		h.bindTo('zoom', b, 'zoomFinal');
		h.bindTo('zoomRange', b);
		h.bindTo('pov', b, 'pov');
		h.bindTo('position', g);
		h.bindTo('pano', g);
		h.bindTo('passiveLogo', g);
		h.bindTo('floors', b);
		h.bindTo('floorId', b);
		h.bindTo('rmiWidth', g);
		h.bindTo('fullscreenControlOptions', g, null, !0);
		h.bindTo('panControlOptions', g, null, !0);
		h.bindTo('zoomControlOptions', g, null, !0);
		h.bindTo('fullscreenControl', g);
		h.bindTo('panControl', g);
		h.bindTo('zoomControl', g);
		h.bindTo('disableDefaultUI', g);
		h.bindTo('fontLoaded', g.__gm);
		h.bindTo('size', b);
		a.view &&
			a.view.addListener('scene_changed', function() {
				var k = a.view.get('scene');
				h.set('isCustomPanorama', 'c' == k);
			});
		h.Ja.Nb();
		_.N.forward(h, 'panbyfraction', a);
	};
	_.r.Am = function(a, b) {
		a.get('disableDefaultUI') &&
			!a.get('keyboardShortcuts') &&
			a.set('keyboardShortcuts', !1);
		var c = new nO(b);
		c.bindTo('zoom', a);
		c.bindTo('enabled', a, 'keyboardShortcuts');
		_.N.forward(c, 'panbyfraction', a.__gm);
		_.N.forward(c, 'panbynow', a.__gm);
		_.N.forward(c, 'panby', a.__gm);
		var d;
		_.N.kb(a, 'streetview_changed', function() {
			var e = a.get('streetView'),
				f = d;
			f && _.N.removeListener(f);
			d = null;
			e &&
				(d = _.N.kb(e, 'visible_changed', function() {
					e.getVisible()
						? ((b.tabIndex = -1), b.blur(), c.set('streetViewDisable', !0))
						: ((b.tabIndex = 0), c.set('streetViewDisable', !1));
				}));
		});
	};
	_.r.Ij = function(a, b) {
		a = _.mO(a, b).style;
		a.border = '1px solid rgba(0,0,0,0.12)';
		a.borderRadius = '5px';
		a.left = '50%';
		a.maxWidth = '375px';
		a.msTransform = 'translateX(-50%)';
		a.position = 'absolute';
		a.transform = 'translateX(-50%)';
		a.width = 'calc(100% - 10px)';
		a.zIndex = '1';
	};
	_.r.Th = function(a) {
		if (!(window.devicePixelRatio || _.Pg[43] || a.__gm_bbsp)) {
			a.__gm_bbsp = !0;
			var b = new _.Go(
				(_.bm(_.Lc(_.H), 15) ? 'http://' : 'https://') +
					'developers.google.com/maps/documentation/javascript/error-messages#unsupported-browsers'
			);
			new fM(a, b);
		}
	};
	_.If('controls', new sO());
});
