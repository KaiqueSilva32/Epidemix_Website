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
  ];

  var registro = new google.maps.LatLng(-24.4881, -47.8348);

  map = new google.maps.Map(document.getElementById("map"), {
    center: registro,
    zoom: 13,
  });

  var heatmap = new google.maps.visualization.HeatmapLayer({
    data: heatmapData,
  });
  heatmap.setMap(map);

  // BUTTONS

  // ADD MARKER
  var marker = new google.maps.Marker({
    position: { lat: -24.4881, lng: -47.8348 },

    map: map,
    title: "Nivel 1",
    icon: "/imgs/Mosquito2.png",
    animation: google.maps.Animation.DROP,
    draggable: true,
  },
);

  map.addListener("click", function (e) {
    console.log(e);
  });

  map.addListener("click", function (e) {
    var clickPosition = e.latLng;
    new google.maps.Marker({
      position: clickPosition,
      map: map,
      title: "Centro de Registro",
      icon: "/imgs/Mosquito2.png",
      animation: google.maps.Animation.DROP,
      draggable: true,
    });
  });


   // Array de locais e ícones para os marcadores
   const locations = [
    { position: { lat: -24.4690, lng: -47.8348 }, icon: '/imgs/Mosquito2.png', title: "Nivel 1" },
    { position: { lat: -24.4588, lng: -47.8450 }, icon: '/imgs/Mosquito2.png', title: "Nivel 1" },
    { position: { lat: -24.4789, lng: -46.6550 }, icon: '/imgs/Mosquito2.png', title: "Nivel 1" },
  ];

  // Loop pelos locais para criar os marcadores
  locations.forEach((location) => {
    new google.maps.Marker({
      position: location.position,
      map: map,
      icon: location.icon,
      title: location.title,
    });
  });

}
