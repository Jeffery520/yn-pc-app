<template>
	<div id="g-maps">
		<div class="g-map-tools">
			<!--占位符-->
			<span> </span>
			<el-form
				:inline="true"
				class="form-inline"
				v-if="!isOnelyShowTrackingTools"
			>
				<el-form-item label="Date" style="margin-bottom:0;">
					<el-date-picker
						ref="datePicker"
						v-model="formSearchDate"
						type="date"
						format="yyyy-MM-dd"
						value-format="timestamp"
						:picker-options="pickerOptions"
						style="width: 140px"
						@change="changeDate"
					>
					</el-date-picker>
				</el-form-item>
				<el-form-item label="Time" style="margin-bottom:0;">
					<el-time-picker
						is-range
						format="HH:mm"
						v-model="formSearchTime"
						range-separator="To"
						value-format="timestamp"
						style="width: 240px"
					>
					</el-time-picker>
				</el-form-item>

				<el-form-item style="margin-bottom:0;">
					<el-button @click="searchPos" type="primary" icon="el-icon-search"
						>Search</el-button
					>
				</el-form-item>
			</el-form>

			<div class="g-map-tools-right">
				<div class="tracking-switch-out">
					<span>Tracking mode:</span>
					<el-switch
						name="Tracking mode"
						v-model="trackingSwitch"
						active-text="on"
					>
					</el-switch>
				</div>
				<el-button
					v-if="!showTableList"
					@click="geoFenceSetting"
					class="geo-fence-icon"
					type="primary"
					round
				>
					<svg-icon icon-class="geo-fence"></svg-icon>
					<span>Geo-fence</span>
				</el-button>
				<svg-icon
					v-if="!isOnelyShowTrackingTools"
					@click.native="changeTableList"
					class-name="list-icon"
					:icon-class="showTableList ? 'location-icon' : 'list-icon'"
				></svg-icon>
				<template v-if="!isOnelyShowTrackingTools && !showTableList">
					<i @click="lastMark" class="el-icon-back"></i>
					<i @click="nextMark" class="el-icon-right"></i>
					<svg-icon
						@click="autoPlayMark"
						v-if="!isAutoPlayMark"
						class-name="play-icon"
						icon-class="play-icon"
					></svg-icon>
					<svg-icon
						@click="stopPlayMark"
						v-if="isAutoPlayMark"
						class-name="stop-icon"
						icon-class="stop-icon"
					></svg-icon>
				</template>
			</div>
		</div>
		<!--    geo-fence-settings-->
		<div v-if="showGeoFenceSetting" class="geo-fence-content">
			<div class="geo-fence-top">
				<span>Geo-fence</span>
				<el-switch
					@change="setGeoFenceSwitch"
					v-model="geoFence.switch"
					active-color="#13ce66"
					active-text="ON"
					inactive-text="OFF"
				></el-switch>
			</div>
			<div class="geo-fence-middle">
				<div class="text-wap" style="font-size: 24px;text-align: left;">
					<div>Click map for fence central point.</div>
					<div style="margin-top: 10px;">
						Drag to change the position and size of the fence circle.
					</div>
				</div>
				<div class="geo-fence-form">
					<span>Fence Radius: </span>
					<el-input
						@change="setGeoFenceRadius"
						style="width: 130px;margin:0 20px"
						type="number"
						step="0.01"
						v-model="geoFence.radius"
					></el-input>
					<span>Miles</span>
				</div>
			</div>
			<div class="geo-fence-foot">
				<el-button
					@click="showGeoFenceSetting = false"
					style="width: 160px;"
					type="info"
					round
					>Cancel</el-button
				>
				<el-button
					@click="showGeoFenceSetting = false"
					style="width: 160px;"
					type="success"
					round
					>Confirm</el-button
				>
			</div>
		</div>
		<!-- geo-fence-settings-->
		<map-table v-show="showTableList"></map-table>
		<!--    显示地图-->
		<div
			v-show="!showTableList"
			id="googleMap"
			:style="{ width: clientWidth, height: clientHeight }"
		></div>
	</div>
</template>

<script>
import { _debounce, formatDate } from '@/utils/validate';
import mapTable from '@/components/Maps/mapTable';
import { devicePosOfChart } from '@/api/devices';

export default {
	name: 'TrackingMode',
	components: { mapTable },
	props: {
		data: Object, // 设备
		isOnelyShowTrackingTools: Boolean //只显示追踪控件
	},
	data() {
		return {
			MARKS_TIMER: null, // 自动播放marks定时器
			isAutoPlayMark: false,
			showTableList: false, // 显示表格模式
			trackingSwitch: false, // 开启追踪模式
			showGeoFenceSetting: false, // 显示地图围栏设置
			formSearchDate: new Date(),
			formSearchTime: [new Date().setHours(0, 0), new Date().setHours(23, 59)],
			pickerOptions: {
				disabledDate: (time) => {
					return time.getTime() > Date.now();
				}
			},
			locationList: [], //当天定位数据
			geoFence: {
				switch: false,
				radius: 0.5, // 1英里约合1609米，mile的复数形式
				latLng: {
					lat: Number(this.$store.getters.userInfo.fLat) || 40.703223217760105,
					lng: Number(this.$store.getters.userInfo.fLng) || -74.01470912473707
				}
			},
			clientWidth: '',
			clientHeight: '',
			language: this.$store.getters.language,
			mapCdn: this.$store.getters.language,
			markers: [], // 用户标记点
			markIndex: 0 // 当前播放的定位index
		};
	},

	created() {
		console.log('map beforeMount');
		// 引入google maps API
		this._createGmapScript();
	},
	mounted() {
		// 获取窗口宽高
		this.clientWidth = document.getElementById('g-maps').offsetWidth + 'px';
		this.clientHeight = document.body.offsetHeight - 260 + 'px';
		window.onresize = _debounce(() => {
			this.clientWidth = document.getElementById('g-maps').offsetWidth + 'px';
		}, 1000);
	},
	destroyed() {
		console.log('map beforeDestroy');
		// 删除已经存在的 api和样式
		this._removeGmapCdn();
	},
	watch: {
		showGeoFenceSetting() {
			// GeoFence设置弹窗关闭后清空追踪范围
			this._deleteFenceCentralPoint();
		}
	},
	methods: {
		// 选择日期范围
		changeDate(v) {
			this.formSearchTime = [
				new Date(v).setHours(0, 0),
				new Date(v).setHours(23, 59)
			];
		},
		// 显示列表
		changeTableList() {
			this.showTableList = !this.showTableList;
		},
		// 显示卓总范围面板
		geoFenceSetting() {
			this._clearnMarks();
			this.showGeoFenceSetting = true;
		},
		/*
		 * -----------------定位Marker模块方法------------------
		 * */
		// 1.搜索定位数据
		searchPos() {
			// loading动画
			this.loading = this.$loading({
				target: document.querySelector('.g-maps'),
				background: 'rgba(225, 225, 225, 0)'
			});

			devicePosOfChart({
				// todo
				// did: this.$route.params.id,
				did: 73143,
				start: this.formSearchTime[0] / 1000, // 单位（秒）
				end: this.formSearchTime[0] / 1000,
				viewType: 1
			})
				.then((data) => {
					this._markersInit(data);
					this.loading.close();
				})
				.catch(() => {
					this.loading.close();
				});
		},
		// 2.播放marks(上一个)
		lastMark() {
			this._palyMark('last');
		},
		// 2.播放marks(下一个)
		nextMark() {
			this._palyMark('next');
		},
		// 3.自动播放marks
		autoPlayMark() {
			clearInterval(this.MARKS_TIMER);
			this.markIndex = 0;
			this.MARKS_TIMER = setInterval(() => {
				this._palyMark('auto');
			}, 1000);
		},
		// 4.停止自动播放marks
		stopPlayMark() {
			clearInterval(this.MARKS_TIMER);
			this.isAutoPlayMark = false;
			this.markIndex = 0;
		},
		// 5.坐标数据初始化
		_markersInit(data) {
			// 坐标数组去重
			this.locationList = Object.values(
				data.reduce((data, item) => {
					let key = item.latitude + '' + item.longitude;
					if (!data[key]) {
						data[key] = item;
					}
					return data;
				}, {})
			);
			// 清除地图数据
			this._clearnMarks();
			// 设置地图中心坐标
			this.map.setCenter({
				lat: this.locationList[0].latitude,
				lng: this.locationList[0].longitude
			});
			// 绘制坐标Markers
			const locationListLength = data.length;
			for (let i = 0; i < locationListLength; i++) {
				const date = formatDate(this.locationList[i].measuredate * 1000);
				this._drawingNavigation({
					latLng: {
						lat: this.locationList[i].latitude,
						lng: this.locationList[i].longitude
					},
					title: `${this.locationList[i].location}   ${
						date.hour < 10 ? '0' + date.hour : date.hour
					}:${date.minute < 10 ? '0' + date.minute : date.minute}/${
						date.year
					}/${date.month}/${date.day}`,
					label: `${(i + 1).toString()}`,
					timeout: 200 * i
				});
			}
		},
		// 6.播放Mark公共函数
		_palyMark(event = 'next') {
			// 设置地图中心点
			if (this.markers.length > 0) {
				this.map.setCenter({
					lat: this.locationList[0].latitude,
					lng: this.locationList[0].longitude
				});
			} else {
				this.$alert(
					this.language == 'zh'
						? '还没有追踪数据，请点击搜索按钮获取数据'
						: 'No tracking data yet, please click the search button to get the data.',
					this.language == 'zh' ? '提示' : 'Prompt',
					{
						callback: () => {
							this.searchPos();
						}
					}
				);
				this.stopPlayMark();
				return false;
			}

			// 播放用户活动路径
			if (this.marker) {
				if (event == 'next') {
					this.markIndex += 1;
					if (this.markIndex >= this.locationList.length) {
						this.markIndex = 0;
					}
				} else if (event == 'auto') {
					if (this.markIndex >= this.locationList.length - 1) {
						this.stopPlayMark();
						this.marker.setPosition({
							lat: this.locationList[0].latitude,
							lng: this.locationList[0].longitude
						});
						return false;
					} else {
						this.isAutoPlayMark = true;
						this.markIndex += 1;
					}
				} else {
					this.markIndex -= 1;
					if (this.markIndex < 0) {
						this.markIndex = this.locationList.length - 1;
					}
				}
				const location = this.locationList[this.markIndex];
				this.marker.setPosition({
					lat: location.latitude,
					lng: location.longitude
				});
			} else {
				const location = this.locationList[0];
				this.marker = new google.maps.Marker({
					position: {
						lat: location.latitude,
						lng: location.longitude
					},
					animation: google.maps.Animation.DROP,
					map: this.map
				});
			}
		},
		// 7.删除Mark公共函数
		_clearnMarks() {
			this.stopPlayMark();
			this._deleteFenceCentralPoint();
			const markers = this.markers;
			const length = markers.length;
			for (var i = 0; i < length; i++) {
				this.markers[i].setMap();
			}
			if (this.marker) {
				this.marker.setMap();
			}
		},

		/*
		 * ----------------------设置追踪范围开启关闭------------------
		 * */
		setGeoFenceSwitch() {
			if (this.geoFence.switch) {
				this._setFenceCentralPoint(
					this.map.getCenter(),
					parseInt(this.geoFence.radius * 1609)
				);
			} else {
				this._deleteFenceCentralPoint();
			}
			this._clearnMarks();
		},
		/*
		 * 设置追踪范围半径
		 * */
		setGeoFenceRadius() {
			this.cityCircle.setRadius(parseInt(this.geoFence.radius * 1609));
		},
		/*
		 * 引入google maps API
		 * */
		_createGmapScript() {
			// 国内cdn||国外cdn
			let url =
				this.mapCdn == 'zh'
					? `http://ditu.google.cn/maps/api/js?language=${this.language}&key=AIzaSyAXbvg_zM0zEBKJDrt-ovbh2tVTT2johtc&callback=onLoad`
					: `https://maps.googleapis.com/maps/api/js?&language=${this.language}&key=AIzaSyAXbvg_zM0zEBKJDrt-ovbh2tVTT2johtc&callback=onLoad`;
			let jsapi = document.createElement('script');
			jsapi.charset = 'utf-8';
			jsapi.src = url;
			jsapi.id = 'gmapjs';
			document.head.appendChild(jsapi);
			// cdn回调方法，开始执行地图初始化
			window.onLoad = () => {
				this._initMap();
			};
			// 监听静态资源加载异常情况
			window.addEventListener(
				'error',
				(error) => {
					// 判断异常信息
					if (error.target && error.target.src == url) {
						this.mapCdn == 'zh' ? (this.mapCdn = 'en') : (this.mapCdn = 'zh');
						this._removeGmapCdn();
						this._createGmapScript();
					}
				},
				true
			);
		},
		/*
		 * 初始化地图
		 * */
		_initMap() {
			// 初始化一个坐标
			let myLatLng = new google.maps.LatLng({
				lat: Number(this.$store.getters.userInfo.fLat) || 40.703223217760105,
				lng: Number(this.$store.getters.userInfo.fLng) || -74.01470912473707
			});
			// 地图实例, centered at Uluru
			this.map = new google.maps.Map(document.getElementById('googleMap'), {
				zoom: 15,
				center: myLatLng,
				mapTypeId: google.maps.MapTypeId.ROADMAP
				// gestureHandling: "cooperative"
			});
			// 获取用户当前定位
			this._watchPosition();
		},
		/*
		 * 添加用户定位标记点{latLng, title, label,timeout}
		 * */
		_drawingNavigation(obj) {
			this.$nextTick(() => {
				this.markers.push(
					new google.maps.Marker({
						position: obj.latLng,
						label: obj.label,
						title: obj.title,
						animation: google.maps.Animation.DROP,
						opacity: 0.4,
						map: this.map
					})
				);
			});
		},
		/*
		 * 删除追踪范围:fn
		 * */
		_deleteFenceCentralPoint() {
			if (this.cityCircle && this.marker) {
				this.cityCircle.setMap();
				this.marker.setMap();
			}
		},
		/*
		 * 点击地图创建一个栅栏覆盖物:fn radius 单位：米
		 * */
		_setFenceCentralPoint(latLng, radius = 1000) {
			// 先清空之前的栅栏覆盖物
			this._deleteFenceCentralPoint();
			const placeMarkerAndPanTo = (latLng) => {
				this.cityCircle.setCenter(latLng);
				this.marker.setPosition(latLng);
			};
			this.map.addListener('click', (e) => {
				window.setTimeout(() => {
					placeMarkerAndPanTo(e.latLng, this.map);
				}, 300);
			});
			this.cityCircle = new google.maps.Circle({
				strokeColor: '#FF0000',
				strokeOpacity: 0.8,
				strokeWeight: 2,
				fillColor: '#666',
				fillOpacity: 0.35,
				draggable: true,
				editable: true,
				map: this.map,
				center: latLng,
				radius: radius // 半径（以米为单位）
			});
			this.marker = new google.maps.Marker({
				position: latLng,
				draggable: true,
				map: this.map
			});

			this.marker.addListener('drag', (e) => {
				this.$nextTick(() => {
					placeMarkerAndPanTo(e.latLng, this.map);
				});
			});
			this.cityCircle.addListener('drag', (e) => {
				this.$nextTick(() => {
					placeMarkerAndPanTo(e.latLng, this.map);
				});
			});
			this.marker.addListener('dragend', () => {
				// 获取圆的坐标
				this.geoFence.latLng = this.cityCircle.getCenter();
				// 获取圆的半径
				this.geoFence.radius =
					Math.floor((this.cityCircle.getRadius() / 1609) * 100) / 100;
			});

			this.cityCircle.addListener('dragend', () => {
				// 获取圆的坐标
				this.geoFence.latLng = this.cityCircle.getCenter();
				// 获取圆的半径
				this.geoFence.radius =
					Math.floor((this.cityCircle.getRadius() / 1609) * 100) / 100;
			});
			this.cityCircle.addListener('radius_changed', () => {
				// 获取圆的坐标
				this.geoFence.latLng = this.cityCircle.getCenter();
				// 获取圆的半径
				this.geoFence.radius =
					Math.floor((this.cityCircle.getRadius() / 1609) * 100) / 100;
			});
		},
		/*
		 * 调用HTML5 geolocation获取定位:fn
		 * */
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

						infoWindow.setPosition(pos);
						infoWindow.setContent('<h1>your location found.</h1>');
						infoWindow.open(that.map);
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
						? 'Error: The Geolocation service failed.'
						: "Error: Your browser doesn't support geolocation."
				);
				infoWindow.open(that.map);
			}
		},
		/*
		 * 删除已经存在的 cdn和样式
		 * */
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
		}
	}
};
</script>

<style lang="scss" scoped>
@import '~@/style/mixin.scss';
.g-map-tools {
	.el-button {
		width: auto !important;
	}
	@include flex-b-c;
	flex-wrap: wrap;
	.form-inline {
		flex-shrink: 0;
		.el-input__inner {
			width: 480px;
		}
	}
	.g-map-tools-right {
		@include flex-b-c;
		padding: 20px 0;
		font-size: 30px;
		color: $themeColor;
		.list-icon,
		.location-icon {
			cursor: pointer;
			margin-left: 20px;
			font-size: 40px;
			flex-shrink: 0;
		}
		.play-icon,
		.stop-icon {
			cursor: pointer;
			margin-left: 20px;
			font-size: 34px;
			flex-shrink: 0;
		}
		.geo-fence-icon {
			font-size: 20px;
		}
		i {
			width: 36px;
			height: 36px;
			font-weight: 600;
			cursor: pointer;
			border-radius: 100%;
			border: 2px solid $themeColor;
			margin-left: 20px;
			@include flex-c-c;
		}
	}
	.tracking-switch-out {
		@include flex-c-c;
		height: 42px;
		padding: 0 20px;
		border: 1px solid $baseBorderColor;
		font-size: 18px;
		color: #000;
		border-radius: 100px;
		margin-right: 20px;
		background-color: #eee;
		flex-shrink: 0;
		span {
			margin-right: 10px;
		}
	}
}
#g-maps {
	position: relative;
	.geo-fence-content {
		@include table-bg;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
		width: 410px;
		box-sizing: border-box;
		background-color: #fff;
		position: absolute;
		right: 10px;
		top: 90px;
		padding: 40px 30px;
		z-index: 1000;
		font-size: 20px;
		.geo-fence-top {
			@include flex-b-c;
		}
		.geo-fence-middle {
			margin-top: 40px;
			.geo-fence-form {
				@include flex-s-c;
				margin: 40px 0;
			}
		}
		.geo-fence-foot {
			@include flex-c-c;
		}
	}
}
</style>
<style lang="scss">
.g-map-tools {
	.el-range-separator {
		width: 50px !important;
	}
}
</style>
