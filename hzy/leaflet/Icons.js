var LeafIcon = L.Icon.extend({
  options: {
    shadowUrl: './imgs/leaf-shadow.png',
    iconSize:     [38, 95],
    shadowSize:   [50, 64],
    iconAnchor:   [22, 94],
    shadowAnchor: [4, 62],
    popupAnchor:  [-3, -76]
  }
});
var greenIcon = new LeafIcon({iconUrl: './imgs/leaf-green.png'}),
    redIcon = new LeafIcon({iconUrl: './imgs/leaf-red.png'}),
    orangeIcon = new LeafIcon({iconUrl: './imgs/leaf-orange.png'});

var locations = [
  {lat: 22.653037, lng: 120.278196, text: "大榮街", icon: greenIcon},
  {lat: 22.675067, lng: 120.285095, text: "海青工商", icon: redIcon},
  {lat: 22.656501, lng: 120.310882, text: "新上國小", icon: orangeIcon}
];


// 按照上面三個地點的經緯度，算出中心點的經緯度
var center=[
  locations.reduce(function(current_sum, current_element){
                      return current_sum + current_element.lat;
                   }, 
                   0)
                   / locations.length ,
  locations.reduce(function(current_sum, current_element){
                      return current_sum + current_element.lng;
                   }, 
                   0)
                   / locations.length 
];
var zoom_level = 14;  // 縮放層級

// OpenStreetMap 的 api 網址樣板
var url_template = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';

// 設定地圖的視圖。經緯度及縮放層級
var map = L.map('map').setView(center, zoom_level);

// 加入地圖的貼圖
L.tileLayer(
  url_template 
).addTo(map);

// 加入地點標示
L.marker(center)
  .addTo(map)
  .bindPopup("<b>大家好!</b><br />拎北在這啦.")
  .openPopup();

locations.forEach(function(loc){
  L.marker([loc.lat, loc.lng], {icon: loc.icon})
    .bindPopup(loc.text)
    .addTo(map);
});
