import esriConfig from "esri/config";
import Basemap from "esri/dijit/Basemap";
import BasemapGallery from "esri/dijit/BasemapGallery";
import BasemapLayer from "esri/dijit/BasemapLayer";
import Extent from "esri/geometry/Extent";
import LOD from "esri/layers/LOD";
import EsriMap from "esri/map";

// Inform the API that data.wsdot.wa.gov supports CORS and HTTPS.
for (const url of ["data.wsdot.wa.gov"]) {
  esriConfig.defaults.io.corsEnabledServers.push(url);
  esriConfig.defaults.io.httpsDomains.push(url);
}

/**
 * Extent of WA.
 * @see https://epsg.io/1416-area
 */
const extent = new Extent({
  xmax: -116.91,
  ymin: 45.54,
  xmin: -124.79,
  ymax: 49.05,
  spatialReference: { wkid: 4326 }
});

// Define LODs from Esri service.
const lods = [
  {
    level: 0,
    resolution: 156543.03392800014,
    scale: 5.91657527591555e8
  },
  {
    level: 1,
    resolution: 78271.51696399994,
    scale: 2.95828763795777e8
  },
  {
    level: 2,
    resolution: 39135.75848200009,
    scale: 1.47914381897889e8
  },
  {
    level: 3,
    resolution: 19567.87924099992,
    scale: 7.3957190948944e7
  },
  {
    level: 4,
    resolution: 9783.93962049996,
    scale: 3.6978595474472e7
  },
  {
    level: 5,
    resolution: 4891.96981024998,
    scale: 1.8489297737236e7
  },
  {
    level: 6,
    resolution: 2445.98490512499,
    scale: 9244648.868618
  },
  {
    level: 7,
    resolution: 1222.992452562495,
    scale: 4622324.434309
  },
  {
    level: 8,
    resolution: 611.4962262813797,
    scale: 2311162.217155
  },
  {
    level: 9,
    resolution: 305.74811314055756,
    scale: 1155581.108577
  },
  {
    level: 10,
    resolution: 152.87405657041106,
    scale: 577790.554289
  },
  {
    level: 11,
    resolution: 76.43702828507324,
    scale: 288895.277144
  },
  {
    level: 12,
    resolution: 38.21851414253662,
    scale: 144447.638572
  },
  {
    level: 13,
    resolution: 19.10925707126831,
    scale: 72223.819286
  },
  {
    level: 14,
    resolution: 9.554628535634155,
    scale: 36111.909643
  },
  {
    level: 15,
    resolution: 4.77731426794937,
    scale: 18055.954822
  },
  {
    level: 16,
    resolution: 2.388657133974685,
    scale: 9027.977411
  },
  {
    level: 17,
    resolution: 1.1943285668550503,
    scale: 4513.988705
  },
  {
    level: 18,
    resolution: 0.5971642835598172,
    scale: 2256.994353
  },
  {
    level: 19,
    resolution: 0.29858214164761665,
    scale: 1128.497176
  },
  {
    level: 20,
    resolution: 0.14929107082380833,
    scale: 564.248588
  },
  {
    level: 21,
    resolution: 0.07464553541190416,
    scale: 282.124294
  },
  {
    level: 22,
    resolution: 0.03732276770595208,
    scale: 141.062147
  },
  {
    level: 23,
    resolution: 0.01866138385297604,
    scale: 70.5310735
  }
].map(lod => {
  // Convert generic objects to LOD objects.
  const output = new LOD();
  const { level, resolution, scale } = lod;
  output.level = level;
  output.resolution = resolution;
  output.scale = scale;
  return output;
});

const basemapUrl =
  "https://data.wsdot.wa.gov/arcgis/rest/services/Shared/WebBaseMapWebMercator/MapServer";

// Create the basemap object.
const wsdotBasemap = new Basemap({
  id: "wsdot",
  thumbnailUrl: "images/WSDOTBaseMap_map.png",
  layers: [
    new BasemapLayer({
      url: basemapUrl
    })
  ],
  title: "WSDOT"
});

const map = new EsriMap("map", {
  extent,
  lods,
  maxZoom: 12,
  basemap: wsdotBasemap as any
});

const basemapGallery = new BasemapGallery(
  {
    map,
    basemaps: [wsdotBasemap]
  },
  "basemaps"
);
basemapGallery.on("error", event => {
  console.error("basemap gallery error", event);
});
basemapGallery.startup();
