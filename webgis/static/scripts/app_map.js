import { getObjects, createObject, moveObject, deleteObject, updateObject } from "./api.js";
import { icons } from "./utils.js";

var vm = new Vue({
  el: '#app',
  components: {
    'l-map': window.Vue2Leaflet.LMap,
    'l-tile-layer': window.Vue2Leaflet.LTileLayer,
    'l-geo-json': window.Vue2Leaflet.LGeoJson,
  },
  data() {
    return {
      // map parameters
      zoom: 7,
      center: [55.527612, 51.387796],
      loading: false,
      showMarkers: true,
      geojson: null,
      tile: 'osm',
      osm: true,
      google: false,
      types: [],
      filterValues: [],

      createState: false,
      moveState: false,
      readyToMove: "",
      deleteState: false,
      helpText: "",

      createForm: false,
      clickLatLng: "",
      pointSelected: false,
      form: {
        name: "",
        district: "",
        type: "",
        av_order: "",
        notes: "",
        X: "",
        Y: ""
      },
      errors: [],
      serviceError: "",
      deleteMenu: false,
      objectToDelete: null,
      objectToUpdate: null,
      detailMenu: false
    }
  },
  methods: {

    // mems data
    async reloadObjects(){
      this.loading = true;
      const memsData = await getObjects();
      if(memsData){
        localStorage.setItem("points", JSON.stringify(memsData));
        this.geojson = JSON.parse(localStorage.getItem("points"));
        this.types = this.getTypes(this.geojson);
      }else{
        this.serviceError = "This application is temporarily unavailable"
      }
      this.loading = false;
    },
    onEachFeatureFunction(feature, layer) {
      layer.setIcon(icons.iconStable);
      layer.bindTooltip(
        "<div class='font'>" +
          feature.properties.name +
          "</div>",
        { permanent: false, sticky: true }
      );
      layer.on({
        click: this.objectClickHandler
      });
      layer.on("mouseover", function(e){
        layer.setIcon(icons.iconSelected);
      });
      layer.on("mouseout", function(e){
        layer.setIcon(icons.iconStable);
      });
    },

    // filters
    getTypes(points){
      const result = []
      points.features.forEach(element => {
        if (!result.includes(element.properties.type)){
          result.push(element.properties.type)
        }
      });
      return result;
    },
    pushToFilterValues(value){
      if(!this.filterValues.includes(value)){
        this.filterValues.push(value);
      }
    },

    // map and objects click
    objectClickHandler(e){
      const fid = e.target.feature.id
      if(this.moveState){
        this.readyToMove = fid;
        this.helpText = "And now click where to move";
        this.$refs.map.$el.classList.add("leaflet-crosshair");
      }else if(this.deleteState){
        this.deleteState = false;
        this.deleteMenu = true;
        this.objectToDelete = fid;
      }else{
        this.detailMenuHandler(fid)

      }
    },
    clickHandler(event){
      if(this.createState){
        if (!this.pointSelected){
          this.clickLatLng = event.latlng
        }
        this.createForm = true;
        this.pointSelected = true;
      }else if(this.readyToMove){
        this.move(this.readyToMove, event.latlng.lat, event.latlng.lng)
      }
    },

    // create-move-delete
    async create(){
      this.createForm = false;
      const isCreated = await createObject(this.form);
      if(isCreated){
        await this.reloadObjects();
        this.pointSelected = false;
      }else{
        this.serviceError = "Move service is temporarily unavailable"
      }
    },
    async move(fid, x, y){
      this.loading =true;
      const isMoved = await moveObject(fid, x, y);
      if(isMoved){
        await this.reloadObjects();
      }else{
        this.serviceError = "Move service is temporarily unavailable"
      }
      this.$refs.map.$el.classList.remove("leaflet-crosshair");
      this.readyToMove = "";
      this.helpText = "Click on the object";
      this.loading = false; 
    },
    async delete(){
      this.loading = true;
      const isDeleted = await deleteObject(this.objectToDelete);
      if(isDeleted){
        await this.reloadObjects();
      }else{
        this.serviceError = "Delete service is temporarily unavailable"
      }
      this.loading = false;
    },
    // delete confirm 
    deleteMenuSelection(solution){
      if(solution == "yes"){
        this.delete();
      }
      this.deleteMenu = false;
      this.objectToDelete = null;
    },

    // detail menu
    detailMenuHandler(fid){
      this.detailMenu = true;
      const features = JSON.parse(localStorage.getItem("points")).features;
      const feature = features.filter(element => (fid == element.id));
      this.fillForm(feature[0])
      this.objectToUpdate = fid;
    },

    // forms
    async submit() {
      if(this.validate){
        this.loading = true;
        this.errors = [];
        await this.create().then(this.loading = false);
      }
    },
    async submitUpdates(){
      this.detailMenu = false;
      this.loading = true;
      const isUpdated = await updateObject(this.objectToUpdate, this.form);
      if(isUpdated){
        this.clearForm;
        this.detailMenu = false;
        await this.reloadObjects()
      }else{
        this.detailMenu = false;
        this.serviceError = "Update service is temporarily unavailable"
      }
      this.loading = false;
    },
    fillForm(feature){
      this.form.name = feature.properties.name
      this.form.district = feature.properties.district
      this.form.type = feature.properties.type
      this.form.av_order = feature.properties.av_order
      this.form.notes = feature.properties.notes
    },

    
  },
  computed: {
    options() {
      return {
        onEachFeature: this.onEachFeatureFunction,
      };
    },
    validate(){
      if(this.clickLatLng){
        this.form.X = this.clickLatLng.lat;
        this.form.Y = this.clickLatLng.lng;
      }
      console.log()
      this.errors = [];
      if(!this.form.name){
        this.errors.push("Enter a name")
      }
      if(!this.form.type){
        this.errors.push("Select a type")
      }
      if(!this.form.X || !this.form.Y){
        this.errors = [];
        this.errors.push("Create service is temporarily unavailable")
      }
      return !this.errors.length

    },
    clearForm(){
        Object.keys(this.form).forEach(key => {
        this.form[key] = "";
      });
    }
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
        this.readyToMove = ""
        this.helpText = "Click on the map"
        console.log(this.$refs.map)
        this.$refs.map.$el.classList.add("leaflet-crosshair");
      }else{
        this.$refs.map.$el.classList.remove("leaflet-crosshair");
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
        this.readyToMove = ""
        this.helpText = "Click on the object"
      }
      
    },
    
  },
  async created() {
    await this.reloadObjects();
  }
})