"use client";

import { useEffect, useRef } from "react";
import maplibregl, { Map as MapLibre } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

export default function Map({ selectedLayer }: { selectedLayer: string }) {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<MapLibre | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    mapInstance.current = new maplibregl.Map({
      container: mapContainer.current,
      style: "/map-style.json",
      center: [121.774, 12.8797],
      zoom: 5,
    });

    return () => mapInstance.current?.remove();
  }, []);

  useEffect(() => {
    if (!mapInstance.current) return;
    const map = mapInstance.current;
  
    async function loadGeoJSON() {
      try {
        const response = await fetch(`/${selectedLayer}.json`);
        const data = await response.json();
  
        if (map.getSource("geojson-layer")) {
          (map.getSource("geojson-layer") as maplibregl.GeoJSONSource).setData(data);
        } else {
          map.addSource("geojson-layer", {
            type: "geojson",
            data,
          });
  
          map.addLayer({
            id: "geojson-layer",
            type: "fill",
            source: "geojson-layer",
            paint: {
              "fill-color": selectedLayer === "country"  ?  "#007bff" : selectedLayer === "regions" ? [
                "match",
                ["get", "adm1_en"],
                "Bangsamoro Autonomous Region In Muslim Mindanao (BARMM)", "#FF5733",
                "Region I (Ilocos Region)", "#33FF57",
                "Region II (Cagayan Valley)", "#5733FF",
                "Region III (Central Luzon)", "#FFC300",
                "#CCCCCC",
              ] : "#CCCCCC",
              "fill-opacity": 0.5,
            },
          });
        }
      } catch (error) {
        console.error("Error loading GeoJSON:", error);
      }
    }

    map.on("mouseenter", `geojson-layer`, () => {
      map.getCanvas().style.cursor = "pointer";
    });

    map.on("mouseleave", `geojson-layer`, () => {
      map.getCanvas().style.cursor = "";
    });

  
    if (map.isStyleLoaded()) {
      loadGeoJSON(); 
    } else {
      map.once("style.load", loadGeoJSON); 
    }
  
    return () => {
      if (map.getLayer("geojson-layer")) {
        map.removeLayer("geojson-layer");
        map.removeSource("geojson-layer");
      }
    };
  }, [selectedLayer]); 
  
  return <div ref={mapContainer} className="w-full h-screen" />;
}
