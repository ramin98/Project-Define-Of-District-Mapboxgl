import React, { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchIstanbulNufus } from "../store/fetchs";

const Map = () => {
  const mapContainer = React.createRef();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIstanbulNufus());
  }, [dispatch]);

  const istanbulNufus = useSelector((state) => state.objects.istanbulNufus);

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoicmFtaW4xOTk4IiwiYSI6ImNsbm40MDRhZTAyZmkydnBmZzgxemF5M24ifQ.VckiGApreDKNT57OObzp8g";

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v10",
    });

    map.on("load", function () {
      map.addSource("geojson", {
        type: "geojson",
        data: istanbulNufus,
      });

      map.addLayer({
        id: "geojson-layer",
        type: "fill",
        source: "geojson",
        layout: {},
        paint: {
          "fill-color": ["get", "color"],
          "fill-opacity": 0.6,
        },
      });

      const bounds = new mapboxgl.LngLatBounds();

      istanbulNufus.features.forEach((feature) => {
        bounds.extend(feature.geometry.coordinates[0]);
      });

      map.fitBounds(bounds, { padding: 20 });
    });

    return () => map.remove();
  }, [istanbulNufus, mapContainer]);
  return (
    <div
      ref={mapContainer}
      style={{
        width: "100%",
        height: "calc(100vh - 163.33px)",
        borderRadius: "10px",
      }}
    />
  );
};

export default React.memo(Map);
