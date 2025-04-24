"use client";

import { useEffect, useRef, useState } from "react";
import maplibregl, { Map as MapLibre } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

/**
 * Map Component
 * Displays an interactive map using MapLibre GL with GeoJSON layers.
 *
 * Props:
 * - selectedLayer: The name of the GeoJSON layer to load.
 * - onTileClick: Callback function triggered when a map tile is clicked.
 */
export default function Map({
  selectedLayer,
  onTileClick,
}: {
  selectedLayer: string;
  onTileClick: (data: any) => void;
}) {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<MapLibre | null>(null);
  const [focusedRegion, setFocusedRegion] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Track loading state

  // Initializing the map using the dark theme json
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

  // Load GeoJSON data and add it to the map
  useEffect(() => {
    if (!mapInstance.current) return;
    const map = mapInstance.current;

    async function loadGeoJSON() {
      try {
        setLoading(true); 
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
      } finally {
        setLoading(false); 
      }
    }

    if (map.isStyleLoaded()) {
      loadGeoJSON();
    } else {
      map.once("style.load", loadGeoJSON);
    }

    map.on("click", "geojson-layer", (e) => {
      if (e.features && e.features.length > 0) {
        const properties = e.features[0].properties;

        if (properties.adm1_en) {
          const clickedRegion = properties.adm1_en;
          setFocusedRegion(clickedRegion);
          onTileClick(properties);

          if (map.getLayer("focused-region-layer")) {
            map.removeLayer("focused-region-layer");
          }
          if (map.getSource("focused-region-source")) {
            map.removeSource("focused-region-source");
          }

          const fullRegionFeatures = map.querySourceFeatures("geojson-layer", {
            sourceLayer: "geojson-layer",
            filter: ["==", "adm1_en", clickedRegion],
          });

          if (fullRegionFeatures.length > 0) {
            map.flyTo({
              center: e.lngLat,
              zoom: 7,
              speed: 1.2,
            });

            map.addSource("focused-region-source", {
              type: "geojson",
              data: {
                type: "FeatureCollection",
                features: fullRegionFeatures.map((f) => f.toJSON()),
              },
            });

            map.addLayer({
              id: "focused-region-layer",
              type: "fill",
              source: "focused-region-source",
              paint: {
                "fill-color": "#FF5733",
                "fill-opacity": 0.7,
              },
            });
          }
        } else if (properties.NAME_ENGLI) {
          const clickedCountry = properties.NAME_ENGLI;
          setFocusedRegion(clickedCountry); 
          onTileClick(properties);

          if (map.getLayer("focused-country-layer")) {
            map.removeLayer("focused-country-layer");
          }
          if (map.getSource("focused-country-source")) {
            map.removeSource("focused-country-source");
          }

          const fullCountryFeatures = map.querySourceFeatures("geojson-layer", {
            sourceLayer: "geojson-layer",
            filter: ["==", "NAME_ENGLI", clickedCountry],
          });

          if (fullCountryFeatures.length > 0) {
            map.flyTo({
              center: e.lngLat,
              zoom: 5, 
              speed: 1.2,
            });

            map.addSource("focused-country-source", {
              type: "geojson",
              data: {
                type: "FeatureCollection",
                features: fullCountryFeatures.map((f) => f.toJSON()),
              },
            });

            map.addLayer({
              id: "focused-country-layer",
              type: "fill",
              source: "focused-country-source",
              paint: {
                "fill-color": "#FF5733", 
                "fill-opacity": 0.7,
              },
            });
          }
        }
      }
    });

    map.on("click", (e) => {
      const features = map.queryRenderedFeatures(e.point, {
        layers: ["geojson-layer"],
      });
      if (features.length === 0) {
        setFocusedRegion(null);
        onTileClick(null);
        if (map.getLayer("focused-region-layer")) {
          map.removeLayer("focused-region-layer");
        }
        if (map.getSource("focused-region-source")) {
          map.removeSource("focused-region-source");
        }
        if (map.getLayer("focused-country-layer")) {
          map.removeLayer("focused-country-layer");
        }
        if (map.getSource("focused-country-source")) {
          map.removeSource("focused-country-source");
        }
      }
    });

    map.on("mouseenter", "geojson-layer", () => {
      map.getCanvas().style.cursor = "pointer";
    });

    map.on("mouseleave", "geojson-layer", () => {
      map.getCanvas().style.cursor = "";
    });

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
      if (map.getLayer("focused-region-layer")) {
        map.removeLayer("focused-region-layer");
      }
      if (map.getSource("focused-region-source")) {
        map.removeSource("focused-region-source");
      }
      if (map.getLayer("focused-country-layer")) {
        map.removeLayer("focused-country-layer");
      }
      if (map.getSource("focused-country-source")) {
        map.removeSource("focused-country-source");
      }
    };
  }, [selectedLayer]);

  return (
    <div className="relative w-full h-screen">
      {/* Skeleton UI */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
          <div className="animate-pulse text-gray-500">Loading map...</div>
        </div>
      )}
      {/* Map Container */}
      <div ref={mapContainer} className="w-full h-full" />
    </div>
  );
}