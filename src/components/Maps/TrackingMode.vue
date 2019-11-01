<template>
	<div id="g-maps">
		<div class="g-map-tools">
			<!--占位符-->
			<span> </span>
			<el-form
				:inline="true"
				:model="formSearch"
				class="form-inline"
				v-if="!isOnelyShowTrackingTools"
			>
				<el-form-item label="From" style="margin-bottom:0;">
					<el-date-picker
						v-model="formSearch.fromTime"
						type="datetimerange"
						range-separator="To"
						start-placeholder="Start Time"
						end-placeholder="End Time"
						format="HH:mm A yyyy-MM-dd"
						value-format="timestamp"
						unlink-panels
						@change="_fromTimeChange"
					>
					</el-date-picker>
				</el-form-item>

				<el-form-item style="margin-bottom:0;">
					<el-button type="primary" icon="el-icon-search">Search</el-button>
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
					@click="showGeoFenceSetting = true"
					class="geo-fence-icon"
					type="primary"
					round
				>
					<svg-icon icon-class="geo-fence"></svg-icon>
					<span>Geo-fence</span>
				</el-button>
				<svg-icon
					v-if="!isOnelyShowTrackingTools"
					@click.native="showTableList = !showTableList"
					class-name="list-icon"
					:icon-class="showTableList ? 'location-icon' : 'list-icon'"
				></svg-icon>
				<template v-if="!isOnelyShowTrackingTools && !showTableList">
					<i class="el-icon-back"></i>
					<i class="el-icon-right"></i>

					<svg-icon class-name="play-icon" icon-class="play-icon"></svg-icon>
					<svg-icon
						v-if="false"
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
import { _debounce } from '@/utils/validate';
import mapTable from '@/components/Maps/mapTable';

export default {
	name: 'TrackingMode',
	components: { mapTable },
	props: {
		data: Object,
		isOnelyShowTrackingTools: false //只显示追踪控件
	},
	data() {
		return {
			showTableList: false, // 显示表格模式
			trackingSwitch: false, // 开启追踪模式
			showGeoFenceSetting: false, // 显示地图围栏设置
			formSearch: { fromTime: '', toTime: '' },
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
			mapCdn: this.$store.getters.language
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
		this.clientHeight = document.body.offsetHeight - 220 + 'px';
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
		/*
		 * 设置追踪范围开启关闭
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
		},
		/*
		 * 设置追踪范围半径
		 * */
		setGeoFenceRadius() {
			this.cityCircle.setRadius(parseInt(this.geoFence.radius * 1609));
		},
		/*
		 * 搜索日期范围
		 * */
		_fromTimeChange(v) {
			console.log(v);
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
