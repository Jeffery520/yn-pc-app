<template>
  <div id="g-maps">
    <div class="g-map-tools">
      <div class="swich-tab" @click="showTableList = !showTableList">
        <i class="el-icon-arrow-left"></i><span> List</span>
      </div>
    </div>

    <map-table v-show="showTableList"></map-table>
    <!--  显示地图-->
    <div
      v-show="!showTableList"
      id="googleMap"
      :style="{ width: clientWidth, height: '500px' }"
    ></div>
  </div>
</template>

<script>
import { _debounce } from "@/utils/validate";
import mapTable from "@/components/Statistics/mapTable";
export default {
  name: "marksMap",
  components: { mapTable },
  data() {
    return {
      showTableList: false,
      clientWidth: "",
      language: this.$store.getters.language
    };
  },
  beforeMount() {
    console.log("map beforeMount");
    // 引入google maps API
    this._createGmapScript();
  },
  mounted() {
    console.log("map mounted");
    window.onresize = _debounce(function() {
      this.clientWidth = document.getElementById("g-maps").offsetWidth + "px";
    }, 1000);
  },
  beforeDestroy() {
    console.log("map beforeDestroy");
    // 删除已经存在的 api和样式
    let GapiArr = document.head.querySelectorAll("script") || [];
    let linkArr = document.head.querySelectorAll("link") || [];
    for (let i = 0; i < GapiArr.length; i++) {
      if (GapiArr[i].src.indexOf("google") > -1) {
        document.head.removeChild(GapiArr[i]);
      }
    }
    for (let i = 0; i < linkArr.length; i++) {
      if (linkArr[i].href.indexOf("google") > -1) {
        document.head.removeChild(linkArr[i]);
      }
    }
  },
  methods: {
    _createGmapScript() {
      // 国内cdn
      let url = `http://ditu.google.cn/maps/api/js?language=${this.language}&key=AIzaSyAXbvg_zM0zEBKJDrt-ovbh2tVTT2johtc&callback=onLoad`;
      // // 国外cdn
      // let url =`https://maps.googleapis.com/maps/api/js?&language=${this.currentLanguage}&key=AIzaSyAXbvg_zM0zEBKJDrt-ovbh2tVTT2johtc&callback=onLoad`;

      let jsapi = document.createElement("script");
      jsapi.charset = "utf-8";
      jsapi.src = url;
      jsapi.id = "gmapjs";
      document.head.appendChild(jsapi);
      window.onLoad = () => {
        this._initMap();
      };
    },
    _initMap() {
      // 初始化一个坐标
      let myLatLng = new google.maps.LatLng({
        lat: 30.65735,
        lng: 104.0658
      });
      // 地图实例, centered at Uluru
      this.map = new google.maps.Map(document.getElementById("googleMap"), {
        zoom: 15,
        center: myLatLng,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        gestureHandling: "cooperative"
      });
      // 获取用户当前定位
      this._watchPosition();
    },
    // 调用HTML5 geolocation获取定位:fn
    _watchPosition() {
      // let infoWindow = new google.maps.InfoWindow();
      // Try HTML5 geolocation.
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            // infoWindow.setPosition(pos);
            // infoWindow.setContent("<h1>your location found.</h1>");
            // infoWindow.open(this.map);
            this.marker = new google.maps.Marker({
              position: pos,
              map: this.map
            });
            this.map.setCenter(pos);
          },
          err => {
            console.log(err);
            handleLocationError(true, infoWindow, this.map.getCenter());
          }
        );
      } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, this.map.getCenter());
      }

      // 定位失败处理
      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        // infoWindow.setPosition(pos);
        // infoWindow.setContent(
        //   browserHasGeolocation
        //     ? "Error: The Geolocation service failed."
        //     : "Error: Your browser doesn't support geolocation."
        // );
        // infoWindow.open(this.map);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/style/mixin.scss";
.g-map-tools {
  @include flex-e-c;
  .swich-tab {
    font-size: 22px;
    cursor: pointer;
    padding: 20px 0 20px 20px;
  }
}
</style>
