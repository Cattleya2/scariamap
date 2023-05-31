import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Tooltip,
  LayersControl,
  FeatureGroup,
  ZoomControl,
  AttributionControl,
  ScaleControl,
} from "react-leaflet";
import { Icon, divIcon, point } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import "leaflet/dist/leaflet.css";
import "./style.css";

const MapPlaceholder = () => {
  return (
    <p className="text-3xl">
      Carte Scaria{" "}
      <noscript>Vous devez activer JavaScript pour voir cette carte.</noscript>
    </p>
  );
};

const customIcon = new Icon({ iconUrl: "", iconSize: [50, 50] });
const createClusterCustomIcon = (cluster) => {
  return new divIcon({
    html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
    className: "custom-marker-cluster",
    iconSize: point(33, 33, true),
  });
};

const MyMap = ({ data }) => {
  const mapCenter = [6.3669, 2.4247];
  const zoomLevel = 12;
  //console.log(data);
  return (
    <>
      <div className="leaflet-container rounded-lg">
        <MapContainer
          center={mapCenter}
          zoom={zoomLevel}
          scrollWheelZoom={true}
          zoomControl={false}
          attributionControl={false}
          placeholder={<MapPlaceholder />}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LayersControl position="topright" collapsed={false}>
            <LayersControl.Overlay checked name="Données Collectées">
              <FeatureGroup>
                <MarkerClusterGroup chunkedLoading>
                  {data.map((elmt) => (
                    <Marker
                      key={elmt._id}
                      position={[
                        elmt._localisation_latitude,
                        elmt._localisation_longitude,
                      ]}
                    >
                      <Popup></Popup>
                      <Tooltip>{elmt._index}</Tooltip>
                    </Marker>
                    //console.log(elmt)
                  ))}
                </MarkerClusterGroup>
              </FeatureGroup>
            </LayersControl.Overlay>
            <LayersControl.BaseLayer checked name="OSM Light">
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
            </LayersControl.BaseLayer>

            <LayersControl.BaseLayer name="Carto CDN">
              <TileLayer
                attribution="cartocdn"
                url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
              />
            </LayersControl.BaseLayer>

            <LayersControl.BaseLayer name="Imagerie ESRI">
              <TileLayer
                attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              />
            </LayersControl.BaseLayer>
          </LayersControl>

          <ZoomControl position="topleft" zoomInText="+" zoomOutText="-" />
          <AttributionControl position="bottomright"></AttributionControl>
          <ScaleControl
            position="bottomleft"
            maxWidth={100}
            metric={true}
            imperial={true}
            updateWhenIdle={true}
          />
        </MapContainer>
      </div>
    </>
  );
};

export default MyMap;
