<template>
	<div id="g-maps">
		<div class="g-map-tools">
			<!--占位符-->
			<span v-if="isOnelyShowTrackingTools"></span>
			<el-form
				:inline="true"
				class="form-inline"
				v-if="!isOnelyShowTrackingTools"
			>
				<!-- 地图坐标时间范围选择-->
				<el-form-item
					v-if="!showTableList"
					:label="$t('tableTitle.date')"
					style="margin-bottom:0;"
				>
					<el-date-picker
						ref="datePicker"
						v-model="formSearchDate"
						type="date"
						format="yyyy-MM-dd"
						value-format="timestamp"
						:picker-options="pickerOptions"
						style="width: 140px"
						@change="changeDate"
					></el-date-picker>
				</el-form-item>

				<el-form-item
					v-if="!showTableList"
					:label="$t('tableTitle.time')"
					style="margin-bottom:0;"
				>
					<el-time-picker
						is-range
						format="HH:mm"
						v-model="formSearchTime"
						:range-separator="$t('others.to')"
						value-format="timestamp"
						style="width: 240px"
					></el-time-picker>
				</el-form-item>
				<el-form-item v-if="!showTableList" style="margin-bottom:0;">
					<el-button @click="searchPos" type="primary" icon="el-icon-search">
						{{ $t('action.search') }}
					</el-button>
				</el-form-item>
				<!-- 地图坐标时间范围选择-->
				<!-- 定位列表时间范围选择-->
				<el-form-item v-if="showTableList" style="margin-bottom:0;">
					<el-date-picker
						v-model="searchListTime"
						format="yyyy-MM-dd HH:mm"
						type="datetimerange"
						:range-separator="$t('others.to')"
						value-format="timestamp"
					>
					</el-date-picker>
				</el-form-item>
				<el-form-item v-if="showTableList" style="margin-bottom:0;">
					<el-button
						@click="searchPosList"
						type="primary"
						icon="el-icon-search"
					>
						{{ $t('action.search') }}
					</el-button>
				</el-form-item>
				<!-- 定位列表时间范围选择-->
			</el-form>

			<div class="g-map-tools-right">
				<div class="tracking-switch-out">
					<span>{{ $t('others.trackingMode') }}:</span>
					<el-switch
						name="Tracking mode"
						v-model="trackingSwitch"
						:active-value="1"
						:inactive-value="0"
						active-text="on"
						@change="switchTracking"
					></el-switch>
				</div>
				<el-button
					v-if="!showTableList"
					@click="geoFenceSetting"
					class="geo-fence-icon"
					type="primary"
					round
				>
					<svg-icon icon-class="geo-fence"></svg-icon>
					<span>{{ $t('others.geoFence') }}</span>
				</el-button>
				<svg-icon
					v-if="!isOnelyShowTrackingTools"
					@click="changeTableList"
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
				<span>{{ $t('others.geoFence') }}</span>
				<el-switch
					@change="setGeoFenceSwitch"
					v-model="geoFence.switch"
					active-color="#13ce66"
					:active-value="1"
					:inactive-value="0"
					active-text="ON"
					inactive-text="OFF"
				></el-switch>
			</div>
			<div class="geo-fence-middle">
				<div class="text-wap" style="font-size: 24px;text-align: left;">
					<div>
						{{
							language == 'zh'
								? '单击地图以获取围栅中心点。'
								: 'Click map for fence central point.'
						}}
					</div>
					<div style="margin-top: 10px;">
						{{
							language == 'zh'
								? '拖动以更改围栏圆的位置和大小。'
								: 'Drag to change the position and size of the fence circle.'
						}}
					</div>
				</div>
				<div class="geo-fence-form">
					<span>{{ language == 'zh' ? '围栏半径' : 'Fence Radius' }}:</span>
					<el-input
						@change="setGeoFenceRadius"
						style="width: 130px;margin:0 20px"
						type="number"
						step="1"
						:min="0"
						v-model="geoFence.radius"
					></el-input>
					<span>{{ language == 'zh' ? '米' : 'm' }}</span>
				</div>
			</div>
			<div class="geo-fence-foot">
				<el-button
					@click="showGeoFenceSetting = false"
					style="width: 160px;"
					type="info"
					round
					>{{ $t('action.cancel') }}</el-button
				>
				<el-button
					@click="submitGeoFence"
					style="width: 160px;"
					type="success"
					round
					>{{ $t('action.confirm') }}</el-button
				>
			</div>
		</div>
		<!-- geo-fence-settings-->
		<map-table
			ref="mapTable"
			:devicesID="parseInt($route.params.id)"
			:date="searchListTime"
			v-if="showTableList"
		></map-table>
		<!--    显示地图-->

		<div
			v-else
			v-show="!showTableList"
			id="googleMap"
			:style="{ width: clientWidth, height: clientHeight }"
		>
			<img
				src="@/assets/images/static_map.png"
				alt="static map"
				height="100%"
				style="display: block"
			/>
		</div>
	</div>
</template>

<script>
import mixin from '@/components/Maps/mixin';
import markerIcon from '@/assets/images/marker.png';
import { formatDate, uniqueObjArr, compressArr } from '@/utils/validate';
import mapTable from '@/components/Maps/mapTable';
import {
	submitSettings,
	devicePosOfChart,
	getDevicesTraceFence
} from '@/api/devices';
import { sortBy } from 'lodash/collection';

export default {
	name: 'TrackingMode',
	mixins: [mixin],
	components: { mapTable },
	props: {
		data: Object, // 设备
		isOnelyShowTrackingTools: Boolean //只显示追踪控件
	},
	data() {
		return {
			MARKS_TIMER: null, // 自动播放marks定时器
			isAutoPlayMark: false, // 自动播放控制
			showTableList: false, // 显示表格模式
			trackingSwitch: 0, // 开启追踪模式
			showGeoFenceSetting: false, // 显示地图围栏设置面板
			formSearchDate: new Date(), // 选择日期
			formSearchTime: [new Date().setHours(0, 0), new Date().setHours(23, 59)], // 选择时间
			searchListTime: [
				new Date().setHours(0, 0, 0),
				new Date().setHours(23, 59, 59)
			],
			pickerOptions: {
				// 日期选择器配置
				disabledDate: (time) => {
					// 只允许选择一天内的时间
					return time.getTime() > Date.now();
				}
			},
			locationList: [], // 当天定位数据
			markers: [], // 用户标记点
			markIndex: 0 // 当前播放的定位index
		};
	},
	watch: {
		showGeoFenceSetting(v) {
			// GeoFence设置弹窗关闭后清空追踪范围
			if (!v) {
				this._deleteFenceCentralPoint();
			}
		}
	},
	mounted() {
		this._getDevicesTraceFence();
	},
	methods: {
		// 选择日期后对时间选择器进行重置
		changeDate(v) {
			this.formSearchTime = [
				new Date(v).setHours(0, 0),
				new Date(v).setHours(23, 59)
			];
		},
		// 追踪模式开关
		switchTracking() {
			// 提交设置
			let data = {
				cmd: 302,
				did: parseInt(this.$route.params.id),
				locateTrace: this.trackingSwitch
			};
			this.loading = this.$loading({
				target: document.querySelector('#g-maps'),
				background: 'rgba(225, 225, 225, 0)'
			});
			submitSettings(data)
				.then(() => {
					this.loading.close();
					this.$message({
						message: 'Submit Success',
						type: 'success'
					});
				})
				.catch(() => {
					this.loading.close();
				});
		},
		// 显示定位列表数据
		changeTableList() {
			this.showTableList = !this.showTableList;
			this.showGeoFenceSetting = false;
		},
		// 获取地图围栏数据
		submitGeoFence() {
			const geoFence = this.geoFence;
			// if (geoFence.fenceid) {
			// 	this.$alert(
			// 		this.language == 'zh'
			// 			? '请打开围栏开关或取消保存'
			// 			: 'please open the Geo-fence switch or cancel !'
			// 	);
			// 	return false;
			// }

			// 提交设置
			let data = {
				cmd: 301,
				did: parseInt(this.$route.params.id),
				fence: {
					fenceid: geoFence.fenceid || 0,
					id: geoFence.id || 0,
					lat: geoFence.latLng.lat,
					lng: geoFence.latLng.lng,
					radius: geoFence.radius,
					status: geoFence.switch
				}
			};
			this.loading = this.$loading({
				target: document.querySelector('#g-maps'),
				background: 'rgba(225, 225, 225, 0)'
			});
			submitSettings(data)
				.then(() => {
					this.loading.close();
					this.showGeoFenceSetting = false;
					this.$message({
						message: 'Submit Success',
						type: 'success'
					});
				})
				.catch(() => {
					this.loading.close();
				});
		},
		// 获取地图追踪数据
		_getDevicesTraceFence() {
			this.loading = this.$loading({
				target: document.querySelector('#g-maps'),
				background: 'rgba(225, 225, 225, .6)'
			});
			getDevicesTraceFence({ did: this.$route.params.id })
				.then((data) => {
					this.trackingSwitch = data.locateTrace;
					this.geoFence.radius = data.fences[0].radius || 100;
					this.geoFence.switch = data.fences[0].status;
					this.geoFence.fenceid = data.fences[0].fenceid;
					this.geoFence.id = data.fences[0].id;
					this.geoFence.latLng = {
						lat:
							data.fences[0].lat ||
							Number(this.$store.getters.userInfo.fLat) ||
							40.703223217760105,
						lng:
							data.fences[0].lng ||
							Number(this.$store.getters.userInfo.fLng) ||
							-74.01470912473707
					};
					this.loading.close();
				})
				.catch(() => {
					this.loading.close();
				});
		},
		/*
		 * -----------------定位Marker模块方法------------------
		 * */
		// 1.搜索定位数据
		searchPos() {
			// 引入地图
			if (!this.map) {
				this._createGmapScript();
			}
			setTimeout(() => {
				// 清除地图数据
				this._clearnMarks();
				this.showGeoFenceSetting = false;
				// loading动画
				this.loading = this.$loading({
					target: document.querySelector('#g-maps'),
					background: 'rgba(255, 255, 255, .5)'
				});

				devicePosOfChart({
					did: this.$route.params.id,
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
			}, 1000);
		},
		// 1.1.搜索定位列表
		searchPosList() {
			this.$refs.mapTable._devicePosOfList();
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
			if (data.length == 0) {
				this.$message({
					message:
						this.language == 'zh'
							? `未查询到定位数据`
							: `No Locator Data Was Queried`,
					type: 'warning'
				});
			}
			// 1.坐标数组去重
			this.locationList = uniqueObjArr(data, ['latitude', 'longitude']);
			// 2.临界点抽稀通过循环删除临近值数据arr：Array,dMax:Number 临界值
			this.locationList = compressArr(this.locationList, 0.0001);
			// 3.以时间序
			this.locationList = sortBy(this.locationList, ['measuredate']);
			// 4.设置地图中心坐标
			this.map.setCenter({
				lat: this.locationList[0].latitude,
				lng: this.locationList[0].longitude
			});

			// 5.绘制坐标Markers
			const locationListLength = data.length;

			for (let i = 0; i < locationListLength; i++) {
				const date = formatDate(this.locationList[i].measuredate * 1000);
				this._drawingNavigation({
					latLng: {
						// 坐标
						lat: this.locationList[i].latitude,
						lng: this.locationList[i].longitude
					},
					icon: markerIcon, // 图标
					title: `${this.locationList[i].location}   ${
						date.hour < 10 ? '0' + date.hour : date.hour
					}:${date.minute < 10 ? '0' + date.minute : date.minute}/${
						date.year
					}/${date.month}/${date.day}` // hover时显示内容
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
						type: 'warning',
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
					zIndex: 9999999,
					animation: google.maps.Animation.DROP,
					map: this.map
				});
			}
		},
		// 7.删除Mark公共函数
		_clearnMarks() {
			const markers = this.markers;
			const length = markers.length;
			for (var i = 0; i < length; i++) {
				this.markers[i].setMap();
			}
			if (this.marker) {
				this.marker.setMap();
			}
			// 停止播放mark
			this.stopPlayMark();
			// 删除围栏
			this._deleteFenceCentralPoint();
		},

		/*
		 * ----------------------设置追踪范围开启关闭------------------
		 * */
		// 显示总范围面板
		geoFenceSetting() {
			this.showGeoFenceSetting = true;
			// 引入地图
			if (!this.map) {
				this._createGmapScript();
			}
			setTimeout(() => {
				this._clearnMarks();
				this.setGeoFenceSwitch();
				this.map.setCenter(this.geoFence.latLng);
			}, 1000);
		},
		// 设置追踪范围开启关闭
		setGeoFenceSwitch() {
			if (this.geoFence.switch) {
				this._setFenceCentralPoint(
					this.geoFence.latLng.lat
						? this.geoFence.latLng
						: this.map.getCenter(),
					parseInt(this.geoFence.radius)
				);
			} else {
				this._deleteFenceCentralPoint();
			}
		},
		/*
		 * 设置追踪范围半径
		 * */
		setGeoFenceRadius() {
			this.cityCircle.setRadius(parseInt(this.geoFence.radius));
		},
		// 删除追踪范围:fn
		_deleteFenceCentralPoint() {
			if (this.cityCircle && this.marker) {
				this.cityCircle.setMap();
				this.marker.setMap();
			}
			this.cityCircle = null;
			this.marker = null;
		},
		// 点击地图创建一个栅栏覆盖物:fn radius 单位：米
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
				this.geoFence.latLng.lat = this.cityCircle.getCenter().lat();
				this.geoFence.latLng.lng = this.cityCircle.getCenter().lng();
				// 获取圆的半径
				this.geoFence.radius = parseInt(this.cityCircle.getRadius());
			});

			this.cityCircle.addListener('dragend', () => {
				// 获取圆的坐标
				this.geoFence.latLng.lat = this.cityCircle.getCenter().lat();
				this.geoFence.latLng.lng = this.cityCircle.getCenter().lng();
				// 获取圆的半径
				this.geoFence.radius = parseInt(this.cityCircle.getRadius());
			});
			this.cityCircle.addListener('radius_changed', () => {
				// 获取圆的坐标
				this.geoFence.latLng.lat = this.cityCircle.getCenter().lat();
				this.geoFence.latLng.lng = this.cityCircle.getCenter().lng();
				// 获取圆的半径
				this.geoFence.radius = parseInt(this.cityCircle.getRadius());
			});
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
		width: 420px;
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
	#googleMap {
		height: 100%;
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
