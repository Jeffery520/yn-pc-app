<template>
  <div id="g-maps">
    <div id="googleMap" :style="{ width: clientWidth, height: '500px' }"></div>
  </div>
</template>

<script>
import { _debounce } from "@/utils/validate";
export default {
  name: "Maps",
  data() {
    return {
      clientWidth: "",
      language: this.$store.getters.language
    };
  },
  components: {},
  beforeMount() {
    // 引入google maps API
    this._createGmapScript();

    // 在onLoad回调里面执行地图绘制
    window.onLoad = function() {
      // 地图中心坐标
      let myCenter = {
        lat: "30.65735",
        lng: "104.0658"
      };
      let myLatLng = new google.maps.LatLng(myCenter.lat, myCenter.lng);
      let myOptions = {
        zoom: 5,
        center: myLatLng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      let map = new google.maps.Map(
        document.getElementById("googleMap"),
        myOptions
      );
    };
  },
  mounted() {
    window.onresize = _debounce(function() {
      this.clientWidth = document.getElementById("g-maps").offsetWidth + "px";
    }, 1000);
  },
  destroyed() {
    console.log("destroyed");
    this._removeGmapScript();
  },
  methods: {
    _createGmapScript() {
      // 先删除已经存在的api
      this._removeGmapScript();
      // 国内cdn
      let url = `http://ditu.google.cn/maps/api/js?language=${this.language}&key=AIzaSyAXbvg_zM0zEBKJDrt-ovbh2tVTT2johtc&callback=onLoad`;
      // // 国外cdn
      // let url = `https://maps.googleapis.com/maps/api/js?&language=${this.currentLanguage}&key=AIzaSyAXbvg_zM0zEBKJDrt-ovbh2tVTT2johtc&callback=onLoad`;

      let jsapi = document.createElement("script");
      jsapi.charset = "utf-8";
      jsapi.src = url;
      jsapi.id = "gmapjs";
      document.body.appendChild(jsapi);
    },
    _removeGmapScript() {
      if (document.getElementById("gmapjs")) {
        document.body.removeChild(document.getElementById("gmapjs"));
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
