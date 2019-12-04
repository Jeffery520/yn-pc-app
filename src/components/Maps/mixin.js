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

	mounted() {
		console.log('map beforeMount');
		// 获取窗口宽高
		this.clientWidth = document.getElementById('g-maps').offsetWidth + 'px';
		this.clientHeight = document.body.offsetHeight - 230 + 'px';
		window.onresize = () => {
			document.getElementById('g-maps')
				? (this.clientWidth =
						document.getElementById('g-maps').offsetWidth + 'px')
				: 'auto';
		};

		document
			.querySelector('.el-main')
			.addEventListener('scroll', this.handleFun);
	},

	destroyed() {
		console.log('map beforeDestroy');
		// 清除定时器，markers等数据
		this._clearnMarks;
		// 删除已经存在的 api和样式
		// this._removeGmapCdn();
	},

	methods: {
		handleFun: _debounce(function(ev) {
			if (this.map) {
				document
					.querySelector('.el-main')
					.removeEventListener('scroll', this.handleFun);
			} else {
				if (ev.target.scrollTop > 600) {
					console.log('_createGmap');
					this._createGmap();
				}
			}
		}, 1000),

		/*
		 * ----------------------创建地图实例相关方法------------------
		 * */
		// 引入google maps API
		_createGmap() {
			let gmapjs = document.getElementById('gmapjs') || '';
			// 国内cdn||国外cdn
			let url =
				this.mapCdn == 'zh'
					? `https://ditu.google.cn/maps/api/js?language=${this.language}&key=AIzaSyAXbvg_zM0zEBKJDrt-ovbh2tVTT2johtc&callback=onLoad`
					: `https://maps.googleapis.com/maps/api/js?&language=${this.language}&key=AIzaSyAXbvg_zM0zEBKJDrt-ovbh2tVTT2johtc&callback=onLoad`;

			if (gmapjs) {
				console.log('_createGmap');
				this._initMap();
			} else {
				console.log('_createGmapScript');
				let jsapi = document.createElement('script');
				jsapi.charset = 'utf-8';
				jsapi.src = url;
				jsapi.id = 'gmapjs';
				document.head.appendChild(jsapi);
				// cdn回调方法，开始执行地图初始化
				window.onLoad = () => {
					this._initMap();
				};
			}
			// 监听静态资源加载异常情况
			window.addEventListener(
				'error',
				(error) => {
					// 判断异常信息
					if (error.target && error.target.src == url) {
						this.mapCdn == 'zh' ? (this.mapCdn = 'en') : (this.mapCdn = 'zh');
						this._removeGmapCdn();
						this._createGmap();
					}
				},
				true
			);
		},
		// 初始化地图
		_initMap() {
			// 初始化一个坐标
			let myLatLng = new google.maps.LatLng(this.geoFence.latLng);
			// 地图实例, centered at Uluru
			this.map = new google.maps.Map(document.getElementById('googleMap'), {
				zoom: 15,
				center: myLatLng,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			});
			this.hasMap = true;
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
