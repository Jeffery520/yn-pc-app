import { _debounce } from '@/utils/validate';

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
			geoFence: {
				// 围栏数据
				switch: 0,
				radius: 100, // 米，m的复数形式
				fenceid: 0,
				id: 0,
				latLng: {
					lat: Number(this.$store.getters.userInfo.fLat) || 40.703223217760105,
					lng: Number(this.$store.getters.userInfo.fLng) || -74.01470912473707
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
				this.$nextTick(() => {
					// 以服务的方式调用的 Loading 需要异步关闭
					if (this.loadingInstance) {
						this.loadingInstance.close();
					}
				});
			}
		},
		getMapTimes() {
			console.log(this.getMapTimes);
			if (this.getMapTimes >= 0 && !this.hasMapReady) {
				this.loadingInstance = this.$loading({
					target: document.querySelector('#googleMap'),
					background: 'rgba(225, 225, 225, 0)',
					text: 'Map is loading ...'
				});
			}
			if (this.getMapTimes >= 2 || this.hasMapReady) {
				this.$nextTick(() => {
					// 以服务的方式调用的 Loading 需要异步关闭
					this.loadingInstance.close();
				});
			}
		}
	},
	mounted() {
		console.log('map beforeMount');
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
			this.getMapTimes++;
			let gMapScript = document.getElementById('g_map_script') || '';

			// // 国内cdn||国外cdn
			// let url =
			// 	this.mapCdn == 'zh'
			// 		? `//google.cn/maps/api/js?language=${this.language}&key=AIzaSyAXbvg_zM0zEBKJDrt-ovbh2tVTT2johtc&callback=onLoad`
			// 		: `//maps.googleapis.com/maps/api/js?&language=${this.language}&key=AIzaSyAXbvg_zM0zEBKJDrt-ovbh2tVTT2johtc&callback=onLoad`;

			// if (!!google) {
			// 	console.log('_createGmap');
			// 	this._initMap();
			// } else {
			console.log('_createGmapScript');
			const language = this.$store.getters.language;
			let commonJS = document.getElementById('g_commonJS');
			let utilJS = document.getElementById('g_utilJS');
			let mapJS = document.getElementById('g_mapJS');
			let markerJS = document.getElementById('g_markerJS');
			let onionJS = document.getElementById('g_onionJS');
			let controlsJS = document.getElementById('g_controlsJS');
			let geometryJS = document.getElementById('g_geometryJS');
			let polyJS = document.getElementById('g_polyJS');

			const googleMap =
				language == 'zh'
					? require('@/googleMap/googleMap_ZH.js')
					: require('@/googleMap/googleMap_EN.js');
			const common =
				language == 'zh'
					? require('@/googleMap/common_zh.js')
					: require('@/googleMap/common.js');
			const util =
				language == 'zh'
					? require('@/googleMap/util_zh.js')
					: require('@/googleMap/util.js');

			const map =
				language == 'zh'
					? require('@/googleMap/map_zh.js')
					: require('@/googleMap/map.js');
			const marker =
				language == 'zh'
					? require('@/googleMap/marker_zh.js')
					: require('@/googleMap/marker.js');
			const onion =
				language == 'zh'
					? require('@/googleMap/onion_zh.js')
					: require('@/googleMap/onion.js');
			const controls =
				language == 'zh'
					? require('@/googleMap/controls_zh.js')
					: require('@/googleMap/controls.js');
			const geometry =
				language == 'zh'
					? require('@/googleMap/geometry_zh.js')
					: require('@/googleMap/geometry.js');
			const poly =
				language == 'zh'
					? require('@/googleMap/poly_zh.js')
					: require('@/googleMap/poly.js');

			gMapScript.src = googleMap;
			commonJS.src = common;
			utilJS.src = util;
			mapJS.src = map;
			markerJS.src = marker;
			onionJS.src = onion;
			controlsJS.src = controls;
			geometryJS.src = geometry;
			polyJS.src = poly;

			this._initMap();
			// import { googleMap_ZH } from '@/googleMap/googleMap_ZH.js';
			// import { googleMap_EN } from '@/googleMap/googleMap_EN.js';
			//
			// import { common } from '@/googleMap/common.js';
			// import { util } from '@/googleMap/util.js';
			// import { map } from '@/googleMap/map.js';
			// import { marker } from '@/googleMap/marker.js';
			// import { onion } from '@/googleMap/onion.js';
			// import { controls } from '@/googleMap/controls.js';
			// import { geometry } from '@/googleMap/geometry.js';
			// import { poly } from '@/googleMap/poly.js';

			// let googleMapJs = document.createElement('script');
			// googleMapJs.charset = 'utf-8';
			// googleMapJs.src = googleMap;
			// googleMapJs.id = 'g_map_script';
			// document.head.appendChild(googleMapJs);
			//
			// let commonJs = document.createElement('script');
			// commonJs.charset = 'utf-8';
			// commonJs.src = common;
			// document.head.appendChild(commonJs);
			//
			// let utilJs = document.createElement('script');
			// utilJs.charset = 'utf-8';
			// utilJs.src = util;
			// document.head.appendChild(utilJs);
			//
			// let mapJs = document.createElement('script');
			// mapJs.charset = 'utf-8';
			// mapJs.src = map;
			// document.head.appendChild(mapJs);
			//
			// let markerJs = document.createElement('script');
			// markerJs.charset = 'utf-8';
			// markerJs.src = marker;
			// document.head.appendChild(markerJs);
			//
			// let onionJs = document.createElement('script');
			// onionJs.charset = 'utf-8';
			// onionJs.src = onion;
			// document.head.appendChild(onionJs);
			//
			// let controlsJs = document.createElement('script');
			// controlsJs.charset = 'utf-8';
			// controlsJs.src = controls;
			// document.head.appendChild(controlsJs);
			//
			// let geometryJs = document.createElement('script');
			// geometryJs.charset = 'utf-8';
			// geometryJs.src = geometry;
			// document.head.appendChild(geometryJs);
			//
			// let polyJs = document.createElement('script');
			// polyJs.charset = 'utf-8';
			// polyJs.src = poly;
			// document.head.appendChild(polyJs);

			// // cdn回调方法，开始执行地图初始化
			// window.onLoad = () => {
			// 	this._initMap();
			// };
			// }

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

			// // 监听静态资源加载异常情况
			// window.addEventListener(
			// 	'error',
			// 	(error) => {
			// 		console.log(error);
			// 		// 判断异常信息
			// 		if (error.target && error.target.src.indexOf()) {
			// 			if (this.getMapTimes >= 2) {
			// 				console.log(this.getMapTimes);
			// 				this.$alert(
			// 					this.$store.getters.language == 'en'
			// 						? 'Map loading failed, please try again later!'
			// 						: '地图加载失败，请稍后再试！'
			// 				);
			// 				return;
			// 			} else {
			// 				this.mapCdn == 'zh' ? (this.mapCdn = 'en') : (this.mapCdn = 'zh');
			// 				this._removeGmapCdn();
			// 				this._createGmap();
			// 			}
			// 		}
			// 	},
			// 	true
			// );
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
			if (google) {
				this.getMapTimes = 0;
				this.hasMapReady = true;
			}
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
