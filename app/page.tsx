"use client"; 
import Sidebar from "@/components/ui/sidebar";
import Map from "@/components/map";
import { useState } from "react";

export default function Page() {
  const [selectedLayer, setSelectedLayer] = useState("country");

  return (
    <div className="relative w-full h-screen">
      <Sidebar setSelectedLayer={setSelectedLayer} />
      <Map selectedLayer={selectedLayer} />
    </div>
  );
}
