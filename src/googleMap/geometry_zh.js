google.maps.__gjsload__('geometry', function(_) {
	var mu = function(a, b) {
			return Math.abs(_.ad(b - a, -180, 180));
		},
		nu = function(a, b, c, d, e) {
			if (!d) {
				c = mu(a.lng(), c) / mu(a.lng(), b.lng());
				if (!e)
					return (
						(e = Math.sin(_.Kd(a.lat()))),
						(e = Math.log((1 + e) / (1 - e)) / 2),
						(b = Math.sin(_.Kd(b.lat()))),
						_.Ld(
							2 *
								Math.atan(
									Math.exp(e + c * (Math.log((1 + b) / (1 - b)) / 2 - e))
								) -
								Math.PI / 2
						)
					);
				a = e.fromLatLngToPoint(a);
				b = e.fromLatLngToPoint(b);
				return e
					.fromPointToLatLng(
						new _.I(a.x + c * (b.x - a.x), a.y + c * (b.y - a.y))
					)
					.lat();
			}
			e = _.Kd(a.lat());
			a = _.Kd(a.lng());
			d = _.Kd(b.lat());
			b = _.Kd(b.lng());
			c = _.Kd(c);
			return _.ad(
				_.Ld(
					Math.atan2(
						Math.sin(e) * Math.cos(d) * Math.sin(c - b) -
							Math.sin(d) * Math.cos(e) * Math.sin(c - a),
						Math.cos(e) * Math.cos(d) * Math.sin(a - b)
					)
				),
				-90,
				90
			);
		},
		ou = _.n(),
		pu = {
			containsLocation: function(a, b) {
				var c = _.ad(a.lng(), -180, 180),
					d = !!b.get('geodesic'),
					e = b.get('latLngs'),
					f = b.get('map');
				f = !d && f ? f.getProjection() : null;
				for (var g = !1, h = 0, k = e.getLength(); h < k; ++h)
					for (var l = e.getAt(h), m = 0, q = l.getLength(); m < q; ++m) {
						var t = l.getAt(m),
							u = l.getAt((m + 1) % q),
							v = _.ad(t.lng(), -180, 180),
							w = _.ad(u.lng(), -180, 180),
							x = Math.max(v, w);
						v = Math.min(v, w);
						(180 < x - v ? c >= x || c < v : c < x && c >= v) &&
							nu(t, u, c, d, f) < a.lat() &&
							(g = !g);
					}
				return g || pu.isLocationOnEdge(a, b);
			}
		};
	_.Za('PolyGeometry.containsLocation', pu.containsLocation);
	pu.isLocationOnEdge = function(a, b, c) {
		c = c || 1e-9;
		var d = _.ad(a.lng(), -180, 180),
			e = b instanceof _.Pi,
			f = !!b.get('geodesic'),
			g = b.get('latLngs');
		b = b.get('map');
		b = !f && b ? b.getProjection() : null;
		for (var h = 0, k = g.getLength(); h < k; ++h)
			for (
				var l = g.getAt(h), m = l.getLength(), q = e ? m : m - 1, t = 0;
				t < q;
				++t
			) {
				var u = l.getAt(t),
					v = l.getAt((t + 1) % m),
					w = _.ad(u.lng(), -180, 180),
					x = _.ad(v.lng(), -180, 180),
					C = Math.max(w, x),
					J = Math.min(w, x);
				if (
					(w =
						1e-9 >= Math.abs(_.ad(w - x, -180, 180)) &&
						(Math.abs(_.ad(w - d, -180, 180)) <= c ||
							Math.abs(_.ad(x - d, -180, 180)) <= c))
				) {
					w = a.lat();
					x = Math.min(u.lat(), v.lat()) - c;
					var M = Math.max(u.lat(), v.lat()) + c;
					w = w >= x && w <= M;
				}
				if (w) return !0;
				if (180 < C - J ? d + c >= C || d - c <= J : d + c >= J && d - c <= C)
					if (((u = nu(u, v, d, f, b)), Math.abs(u - a.lat()) < c)) return !0;
			}
		return !1;
	};
	_.Za('PolyGeometry.isLocationOnEdge', pu.isLocationOnEdge);
	var qu = {
		computeHeading: function(a, b) {
			var c = _.Nd(a),
				d = _.Od(a);
			a = _.Nd(b);
			b = _.Od(b) - d;
			return _.ad(
				_.Ld(
					Math.atan2(
						Math.sin(b) * Math.cos(a),
						Math.cos(c) * Math.sin(a) - Math.sin(c) * Math.cos(a) * Math.cos(b)
					)
				),
				-180,
				180
			);
		}
	};
	_.Za('Spherical.computeHeading', qu.computeHeading);
	qu.computeOffset = function(a, b, c, d) {
		b /= d || 6378137;
		c = _.Kd(c);
		var e = _.Nd(a);
		a = _.Od(a);
		d = Math.cos(b);
		b = Math.sin(b);
		var f = Math.sin(e);
		e = Math.cos(e);
		var g = d * f + b * e * Math.cos(c);
		return new _.L(
			_.Ld(Math.asin(g)),
			_.Ld(a + Math.atan2(b * e * Math.sin(c), d - f * g))
		);
	};
	_.Za('Spherical.computeOffset', qu.computeOffset);
	qu.computeOffsetOrigin = function(a, b, c, d) {
		c = _.Kd(c);
		b /= d || 6378137;
		d = Math.cos(b);
		var e = Math.sin(b) * Math.cos(c);
		b = Math.sin(b) * Math.sin(c);
		c = Math.sin(_.Nd(a));
		var f = e * e * d * d + d * d * d * d - d * d * c * c;
		if (0 > f) return null;
		var g = e * c + Math.sqrt(f);
		g /= d * d + e * e;
		var h = (c - e * g) / d;
		g = Math.atan2(h, g);
		if (g < -Math.PI / 2 || g > Math.PI / 2)
			(g = e * c - Math.sqrt(f)), (g = Math.atan2(h, g / (d * d + e * e)));
		if (g < -Math.PI / 2 || g > Math.PI / 2) return null;
		a = _.Od(a) - Math.atan2(b, d * Math.cos(g) - e * Math.sin(g));
		return new _.L(_.Ld(g), _.Ld(a));
	};
	_.Za('Spherical.computeOffsetOrigin', qu.computeOffsetOrigin);
	qu.interpolate = function(a, b, c) {
		var d = _.Nd(a),
			e = _.Od(a),
			f = _.Nd(b),
			g = _.Od(b),
			h = Math.cos(d),
			k = Math.cos(f);
		b = qu.Mg(a, b);
		var l = Math.sin(b);
		if (1e-6 > l) return new _.L(a.lat(), a.lng());
		a = Math.sin((1 - c) * b) / l;
		c = Math.sin(c * b) / l;
		b = a * h * Math.cos(e) + c * k * Math.cos(g);
		e = a * h * Math.sin(e) + c * k * Math.sin(g);
		return new _.L(
			_.Ld(
				Math.atan2(a * Math.sin(d) + c * Math.sin(f), Math.sqrt(b * b + e * e))
			),
			_.Ld(Math.atan2(e, b))
		);
	};
	_.Za('Spherical.interpolate', qu.interpolate);
	qu.Mg = function(a, b) {
		var c = _.Nd(a);
		a = _.Od(a);
		var d = _.Nd(b);
		b = _.Od(b);
		return (
			2 *
			Math.asin(
				Math.sqrt(
					Math.pow(Math.sin((c - d) / 2), 2) +
						Math.cos(c) * Math.cos(d) * Math.pow(Math.sin((a - b) / 2), 2)
				)
			)
		);
	};
	qu.computeDistanceBetween = function(a, b, c) {
		c = c || 6378137;
		return qu.Mg(a, b) * c;
	};
	_.Za('Spherical.computeDistanceBetween', qu.computeDistanceBetween);
	qu.computeLength = function(a, b) {
		b = b || 6378137;
		var c = 0;
		a instanceof _.Xe && (a = a.getArray());
		for (var d = 0, e = a.length - 1; d < e; ++d)
			c += qu.computeDistanceBetween(a[d], a[d + 1], b);
		return c;
	};
	_.Za('Spherical.computeLength', qu.computeLength);
	qu.computeArea = function(a, b) {
		return Math.abs(qu.computeSignedArea(a, b));
	};
	_.Za('Spherical.computeArea', qu.computeArea);
	qu.computeSignedArea = function(a, b) {
		b = b || 6378137;
		a instanceof _.Xe && (a = a.getArray());
		for (var c = a[0], d = 0, e = 1, f = a.length - 1; e < f; ++e)
			d += qu.tl(c, a[e], a[e + 1]);
		return d * b * b;
	};
	_.Za('Spherical.computeSignedArea', qu.computeSignedArea);
	qu.tl = function(a, b, c) {
		return qu.ul(a, b, c) * qu.im(a, b, c);
	};
	qu.ul = function(a, b, c) {
		var d = [a, b, c, a];
		a = [];
		for (c = b = 0; 3 > c; ++c) (a[c] = qu.Mg(d[c], d[c + 1])), (b += a[c]);
		b /= 2;
		d = Math.tan(b / 2);
		for (c = 0; 3 > c; ++c) d *= Math.tan((b - a[c]) / 2);
		return 4 * Math.atan(Math.sqrt(Math.abs(d)));
	};
	qu.im = function(a, b, c) {
		a = [a, b, c];
		b = [];
		for (c = 0; 3 > c; ++c) {
			var d = a[c],
				e = _.Nd(d);
			d = _.Od(d);
			var f = (b[c] = []);
			f[0] = Math.cos(e) * Math.cos(d);
			f[1] = Math.cos(e) * Math.sin(d);
			f[2] = Math.sin(e);
		}
		return 0 <
			b[0][0] * b[1][1] * b[2][2] +
				b[1][0] * b[2][1] * b[0][2] +
				b[2][0] * b[0][1] * b[1][2] -
				b[0][0] * b[2][1] * b[1][2] -
				b[1][0] * b[0][1] * b[2][2] -
				b[2][0] * b[1][1] * b[0][2]
			? 1
			: -1;
	};
	var ru = {
		decodePath: function(a) {
			for (
				var b = _.Xc(a),
					c = Array(Math.floor(a.length / 2)),
					d = 0,
					e = 0,
					f = 0,
					g = 0;
				d < b;
				++g
			) {
				var h = 1,
					k = 0;
				do {
					var l = a.charCodeAt(d++) - 63 - 1;
					h += l << k;
					k += 5;
				} while (31 <= l);
				e += h & 1 ? ~(h >> 1) : h >> 1;
				h = 1;
				k = 0;
				do (l = a.charCodeAt(d++) - 63 - 1), (h += l << k), (k += 5);
				while (31 <= l);
				f += h & 1 ? ~(h >> 1) : h >> 1;
				c[g] = new _.L(1e-5 * e, 1e-5 * f, !0);
			}
			c.length = g;
			return c;
		}
	};
	_.Za('PolylineCodec.decodePath', ru.decodePath);
	ru.encodePath = function(a) {
		a instanceof _.Xe && (a = a.getArray());
		return ru.Dn(a, function(b) {
			return [Math.round(1e5 * b.lat()), Math.round(1e5 * b.lng())];
		});
	};
	_.Za('PolylineCodec.encodePath', ru.encodePath);
	ru.Dn = function(a, b) {
		for (var c = [], d = [0, 0], e, f = 0, g = _.Xc(a); f < g; ++f)
			(e = b ? b(a[f]) : a[f]),
				ru.vj(e[0] - d[0], c),
				ru.vj(e[1] - d[1], c),
				(d = e);
		return c.join('');
	};
	ru.vj = function(a, b) {
		ru.En(0 > a ? ~(a << 1) : a << 1, b);
	};
	ru.En = function(a, b) {
		for (; 32 <= a; )
			b.push(String.fromCharCode((32 | (a & 31)) + 63)), (a >>= 5);
		b.push(String.fromCharCode(a + 63));
	};
	_.z.google.maps.geometry = { encoding: ru, spherical: qu, poly: pu };
	_.r = ou.prototype;
	_.r.decodePath = ru.decodePath;
	_.r.encodePath = ru.encodePath;
	_.r.computeDistanceBetween = qu.computeDistanceBetween;
	_.r.interpolate = qu.interpolate;
	_.r.computeHeading = qu.computeHeading;
	_.r.computeOffset = qu.computeOffset;
	_.r.computeOffsetOrigin = qu.computeOffsetOrigin;
	_.If('geometry', new ou());
});
