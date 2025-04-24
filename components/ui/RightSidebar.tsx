"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FaInfoCircle, FaChartBar, FaLightbulb } from "react-icons/fa";
import { Bar, BarChart } from "recharts"
import { ChartConfig, ChartContainer } from "@/components/ui/chart"


const chartData = [
  { year: "2018", urban: 50000000, rural: 30000000 },
  { year: "2019", urban: 52000000, rural: 31000000 },
  { year: "2020", urban: 54000000, rural: 32000000 },
  { year: "2021", urban: 56000000, rural: 33000000 },
  { year: "2022", urban: 58000000, rural: 34000000 },
];

const chartConfig = {
  urban: {
    label: "Urban Population",
    color: "#2563eb",
  },
  rural: {
    label: "Rural Population",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

export default function RightSidebar({ data, onClose }: { data: any; onClose: () => void }) {
  const [selectedTab, setSelectedTab] = useState("about");

  if (!data) return null;

  return (
    <div className="h-full bg-gradient-to-b from-black/50 to-black/90 backdrop-blur-md shadow-lg z-10 p-4 relative border border-white/10 rounded-lg">
      <button
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        onClick={onClose}
      >
        ✕
      </button>
       {/* <h2 className="text-lg font-bold mb-4">Tile Information</h2>
      <pre className="text-sm text-gray-700">{JSON.stringify(data, null, 2)}</pre> */}
    {/* <h2 className="text-lg font-bold mb-4">Philippines</h2> */}
      <div className="flex space-x-2 mb-4">
        <Button
          size="sm"
          variant={selectedTab === "about" ? "default" : "outline"}
          onClick={() => setSelectedTab("about")}
          className="flex items-center space-x-1"
        >
          <FaInfoCircle />
          <span>About</span>
        </Button>
        <Button
          size="sm"
          variant={selectedTab === "stats" ? "default" : "outline"}
          onClick={() => setSelectedTab("stats")}
          className="flex items-center space-x-1"
        >
          <FaChartBar />
          <span>Stats</span>
        </Button>
        <Button
          size="sm"
          variant={selectedTab === "trivias" ? "default" : "outline"}
          onClick={() => setSelectedTab("trivias")}
          className="flex items-center space-x-1"
        >
          <FaLightbulb />
          <span>Trivias</span>
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>{selectedTab === "about" ? "Philippines" : selectedTab === "stats" ? "Stats" : "Trivias"}</CardTitle>
        </CardHeader>
        <CardContent>
          {selectedTab === "about" && (
            <div>
              <img
                src={data.image || "/placeholder.png"}
                className="w-full h-48 object-cover rounded mb-4"
              />
              <p className="text-sm text-gray-700 leading-relaxed max-w-prose break words">
  The Philippines, officially the Republic of the Philippines, is an archipelagic country in Southeast Asia. In the western Pacific Ocean, it consists of 7,641 islands, with a total area of roughly 300,000 square kilometers, which are broadly categorized in three main geographical divisions from north to south: Luzon, Visayas, and Mindanao. With a population of over 110 million, it is the world's twelfth-most-populous country.
</p>
            </div>
          )}
         {selectedTab === "stats" && (
            <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
              <BarChart accessibilityLayer data={chartData}>
                <Bar dataKey="urban" fill="var(--color-urban)" radius={4} />
                <Bar dataKey="rural" fill="var(--color-rural)" radius={4} />
              </BarChart>
            </ChartContainer>
          )}
          {selectedTab === "trivias" && <p className="text-sm text-gray-700">{data.trivias}</p>}
        </CardContent>
      </Card>
    </div>
  );
}