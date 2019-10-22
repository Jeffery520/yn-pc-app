<template>
  <div id="g-maps">
    <div class="g-map-tools">
      <el-form :inline="true" :model="formSearch" class="form-inline">
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
        <el-button class="geo-fence-icon" type="primary" round>
          <svg-icon icon-class="geo-fence"></svg-icon>
          <span>Geo-fence</span>
        </el-button>

        <svg-icon class-name="list-icon" icon-class="list-icon"></svg-icon>

        <i class="el-icon-back"></i>
        <i class="el-icon-right"></i>

        <svg-icon class-name="play-icon" icon-class="play-icon"></svg-icon>
        <svg-icon
          v-if="false"
          class-name="stop-icon"
          icon-class="stop-icon"
        ></svg-icon>
      </div>
    </div>
    <div id="googleMap" :style="{ width: clientWidth, height: '500px' }"></div>
  </div>
</template>

<script>
import { _debounce } from "@/utils/validate";
export default {
  name: "TrackingMode",
  data() {
    return {
      trackingSwitch: false,
      formSearch: { fromTime: "", toTime: "" },
      clientWidth: "",
      language: this.$store.getters.language
    };
  },
  components: {},
  beforeMount() {
    // 引入google maps API
    this._createGmapScript();
  },
  mounted() {
    window.onresize = _debounce(function() {
      this.clientWidth = document.getElementById("g-maps").offsetWidth + "px";
    }, 1000);
    this._initMap();
  },
  beforeUpdate() {},
  destroyed() {
    console.log("destroyed");
  },
  methods: {
    // 搜索日期范围
    _fromTimeChange(v) {
      console.log(v);
    },
    _createGmapScript() {
      // 是否已经存在的api
      if (!document.getElementById("gmapjs")) {
        // 国内cdn
        let url = `http://ditu.google.cn/maps/api/js?language=${this.language}&key=AIzaSyAXbvg_zM0zEBKJDrt-ovbh2tVTT2johtc&callback=onLoad`;
        // // 国外cdn
        // let url = `https://maps.googleapis.com/maps/api/js?&language=${this.currentLanguage}&key=AIzaSyAXbvg_zM0zEBKJDrt-ovbh2tVTT2johtc&callback=onLoad`;

        let jsapi = document.createElement("script");
        jsapi.charset = "utf-8";
        jsapi.src = url;
        jsapi.id = "gmapjs";
        document.head.appendChild(jsapi);
      }
    },
    _initMap() {
      const that = this;
      // onLoad创建地图
      var map, infoWindow;
      window.onLoad = function() {
        // 初始化一个坐标
        let myLatLng = new google.maps.LatLng({
          lat: 30.65735,
          lng: 104.0658
        });
        // 地图实例, centered at Uluru
        map = new google.maps.Map(document.getElementById("googleMap"), {
          zoom: 15,
          center: myLatLng,
          mapTypeId: google.maps.MapTypeId.ROADMAP
          // gestureHandling: "cooperative"
        });
        var cityCircle = new google.maps.Circle({
          strokeColor: "#FF0000",
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: "#666",
          fillOpacity: 0.35,
          draggable: true,
          editable: true,
          map: map,
          center: myLatLng,
          radius: Math.sqrt(100) * 100
        });
        var marker = new google.maps.Marker({
          position: myLatLng,
          draggable: true,
          map: map
        });
        that._watchPosition(map);

        map.addListener("click", function(e) {
          // 3 seconds after the center of the map has changed, pan back to the
          // marker.
          window.setTimeout(function() {
            placeMarkerAndPanTo(e.latLng, map);
          }, 300);
        });
        cityCircle.addListener("click", function(e) {
          // 3 seconds after the center of the map has changed, pan back to the
          // marker.
          window.setTimeout(function() {
            placeMarkerAndPanTo(e.latLng, map);
          }, 300);
        });
        marker.addListener("drag", function(e) {
          // 3 seconds after the center of the map has changed, pan back to the
          // marker.
          that.$nextTick(() => {
            placeMarkerAndPanTo(e.latLng, map);
          });
        });
        cityCircle.addListener("drag", function(e) {
          // 3 seconds after the center of the map has changed, pan back to the
          // marker.
          that.$nextTick(() => {
            placeMarkerAndPanTo(e.latLng, map);
          });
        });
        marker.addListener("dragend", () => {
          // 获取圆的坐标
          console.log(cityCircle.getCenter());
          // 获取圆的半径
          console.log(cityCircle.getBounds());
          // 获取圆的边界点
          console.log(cityCircle.getBounds());
        });
        cityCircle.addListener("dragend", () => {
          // 获取圆的坐标
          console.log(cityCircle.getCenter());
          // 获取圆的半径
          console.log(cityCircle.getBounds());
          // 获取圆的边界点
          console.log(cityCircle.getBounds());
        });

        function placeMarkerAndPanTo(latLng, map) {
          cityCircle.setCenter(latLng);
          marker.setPosition(latLng);
        }
      };
    },
    _watchPosition(map) {
      let infoWindow = new google.maps.InfoWindow();
      // Try HTML5 geolocation.
      if (navigator.geolocation) {
        navigator.geolocation.watchPosition(
          function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent("your location found.");
            infoWindow.open(map);
            map.setCenter(pos);
          },
          function(err) {
            handleLocationError(true, infoWindow, map.getCenter());
          },
          {
            enableHighAccuracy: true, //是否获取高精度经纬度，默认值为false
            timeout: 5000, //获取位置信息的超时时间。单位为毫秒（ms），默认值为不超时
            maximumAge: 0, //获取位置信息的缓存时间。单位为毫秒（ms），默认值为0（立即更新获取）。如果设备缓存的位置信息超过指定的缓存时间，将重新更新位置信息后再返回。
            provider: "system"
          }
        );
      } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
      }

      // 定位失败处理
      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        // infoWindow.setPosition(pos);
        // infoWindow.setContent(
        //   browserHasGeolocation
        //     ? "Error: The Geolocation service failed."
        //     : "Error: Your browser doesn't support geolocation."
        // );
        // infoWindow.open(map);
        browserHasGeolocation
          ? alert("Error: The Geolocation service failed.")
          : alert("Error: Your browser doesn't support geolocation.");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/style/mixin.scss";
.g-map-tools {
  padding: 20px 0;
  @include flex-b-c;
  .form-inline {
    flex-shrink: 0;
    .el-input__inner {
      width: 480px;
    }
  }
  .g-map-tools-right {
    @include flex-b-c;
    font-size: 30px;
    color: $themeColor;
    .list-icon {
      cursor: pointer;
      margin-left: 20px;
      font-size: 40px;
    }
    .play-icon,
    .stop-icon {
      cursor: pointer;
      margin-left: 20px;
      font-size: 34px;
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
</style>
