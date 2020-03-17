import { _debounce } from '@/utils/validate';
import Cookies from 'js-cookie';
export default {
	name: 'TrackingMode',
	props: {
		data: Object, // 设备
		isOnelyShowTrackingTools: Boolean //只显示追踪控件
	},
	data() {
		return {
			map: '',
			loading: '',
			getMapTimes: 0,
			hasMapReady: false,
			loadingInstance: false,
			geoFence: {
				// 围栏数据
				switch: 0,
				radius: 100, // 米，m的复数形式
				fenceid: 0,
				id: 0,
				latLng: {
					lat: `${Number(
						this.$store.getters.userInfo.fLat || 40.703223217760105
					)}`,
					lng: `${Number(
						this.$store.getters.userInfo.fLng || -74.01470912473707
					)}`
				}
			},
			clientWidth: '', // 设备宽高
			clientHeight: '',
			language: this.$store.getters.language, // 语言
			mapCdn: this.$store.getters.language // 地图语言控制
		};
	},
	watch: {
		hasMapReady() {
			if (this.hasMapReady) {
				// 以服务的方式调用的 Loading 需要异步关闭
				this.loadingInstance = false;
			}
		},
		getMapTimes() {
			console.log(this.getMapTimes);
			if (this.getMapTimes >= 2 && !this.hasMapReady) {
				this.hasMapReady = false;
				this.loadingInstance = false;
				if (this.getMapTimes == 2) {
					this.$alert(
						this.$store.getters.language == 'en'
							? 'The map failed to load. Please click the refresh button at the top or try again later!'
							: '地图加载失败，请点击上方刷新按钮或稍后再试！'
					);
				}
			}
		}
	},
	mounted() {
		let latLng = JSON.parse(Cookies.get('latlng'));
		if (latLng) {
			this.geoFence.latLng = {
				lat: Number(latLng.lat),
				lng: Number(latLng.lng)
			};
		}
		console.log(this.geoFence.latLng);

		const that = this;
		// 获取窗口宽高
		this.clientWidth = document.getElementById('g-maps').offsetWidth + 'px';
		this.clientHeight = document.body.offsetHeight - 230 + 'px';

		window.onresize = _debounce(function() {
			document.getElementById('g-maps')
				? (that.clientWidth =
						document.getElementById('g-maps').offsetWidth + 'px')
				: (that.clientWidth = '100%');
		});
		console.log('_createGmap');
		this.getMapTimes = 0;
		this.hasMapReady = false;
		this._createGmap();
		// document
		// 	.querySelector('.el-main')
		// 	.addEventListener('scroll', this.handleFun);
	},

	destroyed() {
		console.log('map beforeDestroy');
		// 清除定时器，markers等数据
		this._clearnMarks();
		// 删除已经存在的 api和样式
		// this._removeGmapCdn();
		this.hasMapReady = false;
	},

	methods: {
		// handleFun(ev) {
		// 	if (this.map) {
		// 		document
		// 			.querySelector('.el-main')
		// 			.removeEventListener('scroll', this.handleFun);
		// 	} else {
		// 		if (ev.target.scrollTop > 300) {
		// 			console.log('_createGmap');
		// 			this._createGmap();
		// 		}
		// 	}
		// },
		/*
		 * ----------------------创建地图实例相关方法------------------
		 * */
		// 引入google maps API
		_createGmap() {
			this.loadingInstance = true;
			let gMapScript = document.getElementById('g_map_script') || '';

			if (gMapScript && window.google) {
				this._initMap();
			} else {
				/*------------------------正常加载----------------------*/
				this.getMapTimes++;
				// // 国内cdn||国外cdn
				// let url =
				// 	this.mapCdn == 'zh'
				// 		? `//google.cn/maps/api/js?language=${
				// 				this.language
				// 		  }&key=AIzaSyAXbvg_zM0zEBKJDrt-ovbh2tVTT2johtc&callback=onLoad&_=${new Date().getTime()}`
				// 		: `//maps.googleapis.com/maps/api/js?&language=${
				// 				this.language
				// 		  }&key=AIzaSyAXbvg_zM0zEBKJDrt-ovbh2tVTT2johtc&callback=onLoad&_=${new Date().getTime()}`;

				let url = `https://maps.googleapis.com/maps/api/js?&language=${this.language}&key=AIzaSyAXbvg_zM0zEBKJDrt-ovbh2tVTT2johtc&callback=onLoad`;

				console.log('_createGmapScript');
				if (this.getMapTimes >= 2) {
					return;
				} else {
					reload_js(url);
				}

				// cdn回调方法，开始执行地图初始化
				window.onLoad = () => {
					setTimeout(() => {
						this._initMap();
					}, 100);
				};

				// 监听静态资源加载异常情况
				window.addEventListener(
					'error',
					(error) => {
						console.log(error);
						// 判断异常信息
						if (error.target && error.target.src.indexOf('google')) {
							if (this.getMapTimes < 2) {
								setTimeout(() => {
									this._createGmap();
								}, 100);
							}
						}
					},
					true
				);

				// /*------------------------其他形式加载----------------------*/
				// reload_js('http://www.ugucci.com/js/google.js');
				// reload_js('http://www.ugucci.com/maps/common.js');
				// reload_js('http://www.ugucci.com/maps/util.js');
				// reload_js('http://www.ugucci.com/maps/geocoder.js');
				// reload_js('http://www.ugucci.com/maps/map.js');
				// reload_js('http://www.ugucci.com/maps/marker.js');
				// reload_js('http://www.ugucci.com/maps/onion.js');
				// reload_js('http://www.ugucci.com/maps/controls.js');
				// // 监听静态资源加载异常情况
				// setTimeout(() => {
				// 	this._initMap();
				// }, 100);
			}
			// a = a.replace(
			// 	'maps.google.cn/maps/api/js/ViewportInfoService.GetViewportInfo',
			// 	'www.ugucci.com/ViewportInfoService.asp'
			// );

			// --------------------------------------

			// const language = this.$store.getters.language;

			// let commonJS = document.getElementById('g_commonJS');
			// let utilJS = document.getElementById('g_utilJS');
			// let mapJS = document.getElementById('g_mapJS');
			// let markerJS = document.getElementById('g_markerJS');
			// let onionJS = document.getElementById('g_onionJS');
			// let controlsJS = document.getElementById('g_controlsJS');
			// let geometryJS = document.getElementById('g_geometryJS');
			// let polyJS = document.getElementById('g_polyJS');
			//
			// const googleMap =
			// 	language == 'zh'
			// 		? require('@/googleMap/googleMap_ZH.js')
			// 		: require('@/googleMap/googleMap_EN.js');
			// const common =
			// 	language == 'zh'
			// 		? require('@/googleMap/common_zh.js')
			// 		: require('@/googleMap/common.js');
			// const util =
			// 	language == 'zh'
			// 		? require('@/googleMap/util_zh.js')
			// 		: require('@/googleMap/util.js');
			//
			// const map =
			// 	language == 'zh'
			// 		? require('@/googleMap/map_zh.js')
			// 		: require('@/googleMap/map.js');
			// const marker =
			// 	language == 'zh'
			// 		? require('@/googleMap/marker_zh.js')
			// 		: require('@/googleMap/marker.js');
			// const onion =
			// 	language == 'zh'
			// 		? require('@/googleMap/onion_zh.js')
			// 		: require('@/googleMap/onion.js');
			// const controls =
			// 	language == 'zh'
			// 		? require('@/googleMap/controls_zh.js')
			// 		: require('@/googleMap/controls.js');
			// const geometry =
			// 	language == 'zh'
			// 		? require('@/googleMap/geometry_zh.js')
			// 		: require('@/googleMap/geometry.js');
			// const poly =
			// 	language == 'zh'
			// 		? require('@/googleMap/poly_zh.js')
			// 		: require('@/googleMap/poly.js');
			//
			// gMapScript.src = googleMap;
			// commonJS.src = common;
			// utilJS.src = util;
			// mapJS.src = map;
			// markerJS.src = marker;
			// onionJS.src = onion;
			// controlsJS.src = controls;
			// geometryJS.src = geometry;
			// polyJS.src = poly;
			//
			// this._initMap();

			// if (gmapjs && google) {
			//   console.log('_createGmap');
			//   this._initMap();
			// } else {
			//   if (this.getMapTimes >= 2) {
			//     return;
			//   }
			//   console.log('_createGmapScript');
			//   let jsapi = document.createElement('script');
			//   jsapi.charset = 'utf-8';
			//   jsapi.src = url;
			//   jsapi.id = 'gmapjs';
			//   document.head.appendChild(jsapi);
			//   // cdn回调方法，开始执行地图初始化
			//   window.onLoad = () => {
			//     this._initMap();
			//   };
			// }
			//

			function reload_js(src) {
				let jsapi = document.createElement('script');
				jsapi.charset = 'utf-8';
				jsapi.src = src;
				jsapi.id = 'g_map_script';
				document.head.appendChild(jsapi);
			}
		},
		// 初始化地图
		_initMap() {
			console.log('_initMap');
			// 初始化一个坐标
			let myLatLng = new google.maps.LatLng(this.geoFence.latLng);
			// 地图实例, centered at Uluru
			this.map = new google.maps.Map(document.getElementById('googleMap'), {
				zoom: 15,
				center: myLatLng,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			});
			this.getMapTimes = 0;

			this.hasMapReady = true;
			// 获取用户当前定位
			// this._watchPosition();
		},
		// 调用HTML5 geolocation获取定位:fn
		_watchPosition() {
			const that = this;
			let infoWindow = new google.maps.InfoWindow();
			// Try HTML5 geolocation.
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(
					(position) => {
						var pos = {
							lat: position.coords.latitude,
							lng: position.coords.longitude
						};

						that.map.setCenter(pos);
					},
					(err) => {
						console.log(err);
						handleLocationError(true, infoWindow, that.map.getCenter());
					}
				);
			} else {
				// Browser doesn't support Geolocation
				handleLocationError(false, infoWindow, that.map.getCenter());
			}

			// 定位失败处理
			function handleLocationError(browserHasGeolocation, infoWindow, pos) {
				infoWindow.setPosition(pos);
				infoWindow.setContent(
					browserHasGeolocation
						? that.language == 'zh'
							? '错误：获取地理位置失败。'
							: 'Error:Get geolocation failed.'
						: that.language == 'zh'
						? '错误：您的浏览器不支持定位。'
						: "Error: Your browser doesn't support geolocation."
				);
				infoWindow.open(that.map);
			}
		},
		// 删除已经存在的 cdn和样式
		_removeGmapCdn() {
			let GapiArr = document.head.querySelectorAll('script') || [];
			let linkArr = document.head.querySelectorAll('link') || [];
			for (let i = 0; i < GapiArr.length; i++) {
				if (GapiArr[i].src.indexOf('google') > -1) {
					document.head.removeChild(GapiArr[i]);
				}
			}
			for (let i = 0; i < linkArr.length; i++) {
				if (linkArr[i].href.indexOf('google') > -1) {
					document.head.removeChild(linkArr[i]);
				}
			}
		},
		// 添加用户定位标记点{latLng, title, label,icon}
		_drawingNavigation(obj) {
			this.$nextTick(() => {
				this.markers.push(
					new google.maps.Marker({
						position: obj.latLng,
						icon: obj.icon,
						title: obj.title,
						animation: google.maps.Animation.DROP,
						map: this.map
					})
				);
			});
		}
	}
};
