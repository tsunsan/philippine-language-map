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
              "fill-color":
                selectedLayer === "country"
                  ? "#007bff"
                  : selectedLayer === "regions"
                  ? [
                      "match",
                      ["get", "adm1_en"],
                      "Region VI (Western Visayas)", "#FF5733",
                      "Region XII (SOCCSKSARGEN)", "#FF5733",
                      "Negros Island Region (NIR)", "#FF5733",
                      "Region I (Ilocos Region)", "#33FF57",
                      "Region II (Cagayan Valley)", "#33FF57",
                      "Cordillera Administrative Region (CAR)", "#33FF57",
                      "Region III (Central Luzon)", "#007bff",
                      "Region IV-A (CALABARZON)", "#007bff",
                      "National Capital Region (NCR)", "#007bff",
                      "MIMAROPA Region", "#007bff",
                      "Region V (Bicol Region)", "#FF33A1",
                      "Region VII (Central Visayas)", "#FFC300",
                      "Region VIII (Eastern Visayas)", "#FF8C00",
                      "Region IX (Zamboanga Peninsula)", "#8E44AD",
                      "Region X (Northern Mindanao)", "#8E44AD",
                      "Region XI (Davao Region)", "#8E44AD",
                      "Region XIII (Caraga)", "#8E44AD",
                      "Bangsamoro Autonomous Region In Muslim Mindanao (BARMM)", "#20B2AA",
                      "#CCCCCC",
                    ]
                  : "#CCCCCC",
              "fill-opacity": 0.5,
            },
          });

         
          map.addLayer({
            id: "geojson-layer-borders",
            type: "line",
            source: "geojson-layer",
            paint: {
              "line-color": "#000000", 
              "line-width": 1.5,
              "line-opacity": 0.8, 
            },
            layout: {
              "line-join": "round",
              "line-cap": "round", 
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
      }
      if (map.getLayer("geojson-layer-borders")) {
        map.removeLayer("geojson-layer-borders");
      }
      if (map.getSource("geojson-layer")) {
        map.removeSource("geojson-layer");
      }
    };
  }, [selectedLayer]);

  return <div ref={mapContainer} className="w-full h-screen" />;
}
