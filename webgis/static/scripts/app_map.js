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
      zoom: 7,
      center: [55.527612, 51.387796],
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
      types: [],
      filterValues: [],

      createState: false,
      moveState: false,
      deleteState: false,
      helpText: "",
      createForm: false,

    }
  },
  methods: {
    pushToFilterValues(value){
      if(!this.filterValues.includes(value)){
        this.filterValues.push(value);
        console.log(this.filterValues);
      }
    },
    onEachFeatureFunction(feature, layer) {
      layer.setIcon(this.icon);
      layer.bindTooltip(
        "<div>" +
          feature.properties.name +
          "</div>",
        { permanent: false, sticky: true }
      );
    },
    getTypes(points){
      const result = []
      points.features.forEach(element => {
        if (!result.includes(element.properties.type)){
          result.push(element.properties.type)
        }
      });
      return result;
    },
    clickHandler(event){
      if(this.createState){
        this.createForm = true;
      }
    }
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
    },
    filterValues() {
      if (!this.filterValues.length){
        this.geojson = JSON.parse(localStorage.getItem("points"));
      }else{
        this.loading = true;
        const features = JSON.parse(localStorage.getItem("points")).features;
        const filteredFeatures = features.filter(element => this.filterValues.includes(element.properties.type));
        this.geojson.features = filteredFeatures;
        this.loading = false;
      }
      
    },
    createState() {
      if (this.createState){
        this.moveState = false
        this.deleteState = false
        this.helpText = "Click on the map"
      }
    },
    moveState(){
      if (this.moveState){
        this.createState = false
        this.deleteState = false
        this.helpText = "Click on the object"
      }
      
    },
    deleteState(){
      if (this.deleteState){
        this.createState = false
        this.moveState = false
        this.helpText = "Click on the object"
      }
      
    },
  },
  async created() {
    this.loading = true;
    const response = await fetch("/api/objects/");
    const data = await response.json();
    localStorage.setItem("points", JSON.stringify(data));
    this.geojson = JSON.parse(localStorage.getItem("points"));
    this.types = this.getTypes(this.geojson);
    this.loading = false;
  }
})