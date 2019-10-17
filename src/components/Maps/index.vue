<template>
  <div>
    <div id="googleMap" style="width:1000px;height:400px;"></div>
  </div>
</template>

<script>

  export default {
    name: "Maps",
    data() {
      return {
        msg: ""
      };
    },
    components: {},
    beforeMount() {
      let $self = this;
      window.onLoad = function () {
        // 地图中心坐标
        let myCenter = {
          lat: '30.65735',
          lng: '104.0658'
        };
        let myLatLng = new google.maps.LatLng(myCenter.lat, myCenter.lng);
        let myOptions = {
          zoom: 15,
          center: myLatLng,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        let map=new google.maps.Map(document.getElementById("googleMap"), myOptions);
      }

      // 国内
      let url = 'http://ditu.google.cn/maps/api/js?key=AIzaSyAXbvg_zM0zEBKJDrt-ovbh2tVTT2johtc&callback=onLoad';
      // 国外
      // let url = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAXbvg_zM0zEBKJDrt-ovbh2tVTT2johtc&callback=onLoad';
      let jsapi = document.createElement('script');
      jsapi.charset = 'utf-8';
      jsapi.src = url;
      jsapi.id = "gmapjs";
      document.head.appendChild(jsapi);
    },
    destroyed() {
      document.getElementsByTagName("head")[0].removeChild(
        document.getElementById("gmapjs"));
      console.log("destroyed");
    }
  };
</script>

<style lang="scss" scoped>

</style>
