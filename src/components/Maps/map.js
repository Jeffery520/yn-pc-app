export class YnMap {
  constructor(mapID) {
    this.mapID = mapID; // DOM ID
    this.map = "";
    this.circle = ""; // 圆形覆盖物
    this.marker = ""; // marker标记点
  }
  /*
   * 创建地图对象
   * @param
   * [latLng={
        lat: 30.65735,
        lng: 104.0658
      }] (Object)  地图中心位置
   * @returns {无}
   * */
  creatMap(latLng) {
    // 初始化一个坐标
    let myLatLng = new google.maps.LatLng(latLng);
    // 地图实例
    this.map = new google.maps.Map(document.getElementById(this.mapID), {
      zoom: 15,
      center: myLatLng,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    this.getCurrentPosition();
    this.getCenter();
  }

  getCenter() {
    this.map.getCenter(v => {
      console.log(v);
    });
  }

  /*
   * 创建一个圆环
   * @param
   * [center={
        lat: 30.65735,
        lng: 104.0658
      }] (Object)  圆心
   * [radius=1000] (Number) 半径（以米为单位）
   * */
  addCircle(center, radius) {
    return new google.maps.Circle({
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#666",
      fillOpacity: 0.35,
      draggable: true,
      editable: true,
      map: this.map,
      center: center,
      radius: radius // 半径（以米为单位）
    });
  }
  /*
   * 创建一个marker标记点
   * @param
   * [latLng={
        lat: 30.65735,
        lng: 104.0658
      }] (Object)  圆心
   * */
  addMarker(latLng) {
    return new google.maps.Marker({
      position: latLng,
      draggable: true,
      map: this.map
    });
  }
  /*
   * 使用HTML5 geolocation获取当前位置坐标
   * */
  getCurrentPosition() {
    let infoWindow = new google.maps.InfoWindow();
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          infoWindow.setPosition(pos);
          infoWindow.setContent("<h1>your location found.</h1>");
          infoWindow.open(this.map);
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

    // 处理函数-定位失败
    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
      infoWindow.setPosition(pos);
      infoWindow.setContent(
        browserHasGeolocation
          ? "Error: The Geolocation service failed."
          : "Error: Your browser doesn't support geolocation."
      );
      infoWindow.open(this.map);
    }
  }
}
