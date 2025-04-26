"use client";
import Sidebar from "@/components/ui/sidebar";
import Map from "@/components/map";
import RightSidebar from "@/components/ui/RightSidebar";
import { useState } from "react";
import SearchBar from "@/components/ui/searchbar";

export default function Page() {
  const [selectedLayer, setSelectedLayer] = useState("country");
  const [clickedTileData, setClickedTileData] = useState<any>(null);

  return (
    <div className="relative w-full h-screen">
  
      <div className="absolute top-5 left-1/2 transform -translate-x-1/2 z-10 w-1/2">
        <SearchBar />
      </div>
      <Sidebar setSelectedLayer={setSelectedLayer} />
      <Map
        selectedLayer={selectedLayer}
        onTileClick={(data) => setClickedTileData(data)}
      />
      
      {clickedTileData && (
        <div style={{ right: "2rem" }} className="absolute top-5">
        <RightSidebar
          onClose={() => setClickedTileData(null)} />
          </div>
      )} 
    </div>
  );
}