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
                    ] : selectedLayer === "provinces" ? 
                      [
                        "match",
                        ["get", "PROVINCE"],
                        "Ilocos Norte", "#3F51B5",
                        "Ilocos Sur", "#FF33A1",
                        "La Union", "#FF33A1",
                        "Pangasinan", "#FF33A1",
                        "Batanes", "#FF33A1",
                        "Cagayan", "#8E44AD",
                        "Isabela", "#8E44AD",
                        "Nueva Vizcaya", "#8E44AD",
                        "Quirino", "#8E44AD",
                        "Bataan", "#8E44AD",
                        "Bulacan", "#8E44AD",
                        "Nueva Ecija", "#8E44AD",
                        "Pampanga", "#8E44AD",
                        "Tarlac", "#8E44AD",
                        "Zambales", "#8E44AD",
                        "Aurora", "#8E44AD",
                        "Batangas", "#8E44AD",
                        "Cavite", "#8E44AD",
                        "Laguna", "#8E44AD",
                        "Quezon", "#8E44AD",
                        "Rizal", "#8E44AD",
                        "Albay", "#8E44AD",
                        "Camarines Norte", "#8E44AD",
                        "Camarines Sur", "#8E44AD",
                        "Catanduanes", "#8E44AD",
                        "Masbate", "#8E44AD",
                        "Sorsogon", "#2196F3",
                        "Aklan", "#FFC300",
                        "Antique", "#FFC300",
                        "Capiz", "#FFC300",
                        "Iloilo", "#FF5733",
                        "Guimaras", "#FF5733",
                        "Bohol", "#FF5733",
                        "Cebu", "#FF5733",
                        "Siquijor", "#FF5733",
                        "Eastern Samar", "#FF5733",
                        "Leyte", "#33FF57",
                        "Northern Samar", "#33FF57",
                        "Samar", "#33FF57",
                        "Southern Leyte", "#33FF57",
                        "Biliran", "#33FF57",
                        "Zamboanga del Norte", "#33FF57",
                        "Zamboanga del Sur", "#33FF57",
                        "Zamboanga Sibugay", "#33FF57",
                        "City of Isabela", "#33FF57",
                        "Bukidnon", "#33FF57",
                        "Camiguin", "#009688",
                        "Lanao del Norte", "#607D8B",
                        "Misamis Occidental", "#D4AF37",
                        "Misamis Oriental", "#4CAF50",
                        "Davao del Norte", "#4CAF50",
                        "Davao del Sur", "#9C27B0",
                        "Davao Oriental", "#A0522D",
                        "Compostela Valley", "#A0522D",
                        "Davao Occidental", "#4682B4",
                        "Cotabato", "#FF6F61",
                        "South Cotabato", "#B0BEC5",
                        "Sultan Kudarat", "#66CC99",
                        "Sarangani", "#00CED1",
                        "Cotabato City", "#007bff",
                        "NCR, City of Manila, First District", "#007bff",
                        "NCR, Second District", "#007bff",
                        "NCR, Third District", "#007bff",
                        "NCR, Fourth District", "#007bff",
                        "Abra", "#007bff",
                        "Benguet", "#007bff",
                        "Ifugao", "#007bff",
                        "Kalinga", "#007bff",
                        "Mountain Province", "#007bff",
                        "Apayao", "#007bff",
                        "Basilan", "#007bff",
                        "Lanao del Sur", "#007bff",
                        "Maguindanao", "#007bff",
                        "Sulu", "#007bff",
                        "Tawi-Tawi", "#007bff",
                        "Agusan del Norte", "#007bff",
                        "Agusan del Sur", "#007bff",
                        "Surigao del Norte", "#007bff",
                        "Surigao del Sur", "#20B2AA",
                        "Dinagat Islands", "#20B2AA",
                        "Marinduque", "#8BC34A",
                        "Occidental Mindoro", "#DAA520",
                        "Oriental Mindoro", "#FF8C00",
                        "Palawan", "#FF8C00",
                        "Romblon", "#FF8C00",
                        "Negros Occidental", "#FF8C00",
                        "Negros Oriental", "#C71585",
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