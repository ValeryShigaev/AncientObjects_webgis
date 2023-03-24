const osm_url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const goo_url = 'http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}';
const osm_subd = null
const goo_subd = ['mt0','mt1','mt2','mt3']
const icon = window.L.icon

var vm = new Vue({
  el: '#app',
  components: {
    'l-map': window.Vue2Leaflet.LMap,
    'l-tile-layer': window.Vue2Leaflet.LTileLayer,
    'l-geo-json': window.Vue2Leaflet.LGeoJson,
  },
  data() {
    return {
      loading: false,
      showMarkers: true,
      geojson: null,
      tile: 'osm',
      osm: true,
      google: false,
      icon: icon({
        iconSize: [20, 20],
        iconAnchor: [13, 27],
        popupAnchor:  [1, -24],
        iconUrl: '../static/images/marker-icon.png',
      }),
      zoom: 7,
      center: [53.164677, 50.407340],
    }
  },
  methods: {
    onEachFeatureFunction(feature, layer) {
      layer.setIcon(this.icon);
      layer.bindTooltip(
        "<div>name:" +
          feature.properties.name +
          "</div>",
        { permanent: false, sticky: true }
      );
    },

  },
  computed: {
    options() {
      return {
        onEachFeature: this.onEachFeatureFunction,
      };
    },
  },
  watch: {
    tile() {
      if (this.tile == 'osm'){
        this.osm = true;
        this.google = false;
      }else{
        this.osm = false;
        this.google = true;
      }
    }
  },
  async created() {
    this.loading = true;
    const response = await fetch("/api/objects/");
    const data = await response.json();
    this.geojson = data;
    this.loading = false;
  }
})