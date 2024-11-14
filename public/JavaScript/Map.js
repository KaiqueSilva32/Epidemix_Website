//MapType - interface do google que permite a criação de mapas próprios
// MaxZoom* - Obrigatório ter
// titleSize* - Obrigatório ter
// name
//minZoom
//alt

// MÉTODOS
//getTitle(coord, zoom, docu)
// releaseTitle
// -24.4881  -47.8348
const centerMap = { lat: -24.4881, lng: -47.8348 };

function initMap() {
  var map;
  var mapOptions = {
    center: centerMap,
    zoom: 6,
  };

  map = new google.maps.Map(document.getElementById("map"), mapOptions);


  //HeatMap
  /* Data points defined as an array of LatLng objects */
var heatmapData = [
    new google.maps.LatLng(-24.48454, -47.8336),
    new google.maps.LatLng(-24.4856, -47.8357),
    new google.maps.LatLng(-24.48575, -47.8345),
    new google.maps.LatLng(-24.47680, -47.8398),
    new google.maps.LatLng(-24.48565, -47.8378),
    new google.maps.LatLng(-24.48245, -47.8375),
    new google.maps.LatLng(-24.4843, -47.8325),
    new google.maps.LatLng(-24.4835, -47.8323),
    new google.maps.LatLng(-24.4831, -47.8346),
    new google.maps.LatLng(-24.4875, -47.8379),
    new google.maps.LatLng(-24.4821, -47.8326),
    new google.maps.LatLng(-24.4523, -47.8386),
    new google.maps.LatLng(-24.4853, -47.8312),
  ];
  
  var registro = new google.maps.LatLng(-24.4881, -47.8348);
  
  map = new google.maps.Map(document.getElementById('map'), {
    center: registro,
    zoom: 13,
    mapTypeId: 'satellite'
  });
  
  var heatmap = new google.maps.visualization.HeatmapLayer({
    data: heatmapData
  });
  heatmap.setMap(map);




// ADD MARKER
  var marker = new google.maps.Marker({
    position: { lat: -24.4881, lng: -47.8348 },
    map: map,
    title: 'Centro de Registro',
    icon: "/imgs/Mosquito2.png",
    animation: google.maps.Animation.DROP,
    draggable: true
  });

  map.addListener('click', function(e) {
    console.log(e)
  })

  map.addListener('click', function(e) {
    var clickPosition = e.latLng;
    new google.maps.Marker({
        position: clickPosition,
        map:map,
        title: 'Centro de Registro',
        icon: "/imgs/Mosquito2.png",
        animation: google.maps.Animation.DROP,
        draggable: true
    })
  })

  map.addListener('dblclick', function() {
    console.log('Clique duplo')
  })

}
