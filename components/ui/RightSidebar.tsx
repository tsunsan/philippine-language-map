"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FaInfoCircle, FaChartBar, FaLightbulb, FaLanguage } from "react-icons/fa";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

const COLORS = ["#2563eb", "#60a5fa", "#34d399"];

export default function RightSidebar({ onClose }: { onClose: () => void }) {
  const [selectedTab, setSelectedTab] = useState("about");
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    // Fetch data from the API
    async function fetchData() {
      try {
        const response = await fetch("/api/test");
        const result = await response.json();
        setData(result[0]); // Assuming the first item is the Philippines
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    }
    fetchData();
  }, []);

  if (!data) return <p>Loading...</p>;

  const pieChartData = [
    { name: "Male Population", value: data.population.male },
    { name: "Female Population", value: data.population.female },
  ];

  const literacyData = [
    { name: "Literate", value: Math.round(data.literacy.all * 100) },
    { name: "Illiterate", value: 100 - Math.round(data.literacy.all * 100) },
  ];

  return (
    <div className="h-full bg-gradient-to-b from-black/50 to-black/90 backdrop-blur-md shadow-lg z-10 p-4 relative border border-white/10 rounded-lg">
      <button
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        onClick={onClose}
      >
        ✕
      </button>
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
          variant={selectedTab === "phrases" ? "default" : "outline"}
          onClick={() => setSelectedTab("phrases")}
          className="flex items-center space-x-1"
        >
          <FaLanguage />
          <span>Phrases</span>
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>
            {selectedTab === "about"
              ? data.name
              : selectedTab === "stats"
              ? "Stats"
              : "Phrases"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {selectedTab === "about" && (
            <div>
              <img
                src={data.photo || "/placeholder.png"}
                className="w-full h-48 object-cover rounded mb-4"
                alt={data.name}
              />
              <p className="text-sm text-gray-700 leading-relaxed max-w-prose break-words">
                {data.description}
              </p>
            </div>
          )}
          {selectedTab === "stats" && (
            <div className="flex flex-col items-center space-y-6">
              <div>
                <h3 className="text-sm font-semibold mb-2">Population Distribution</h3>
                <PieChart width={300} height={300}>
                  <Pie
                    data={pieChartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    label
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </div>
              <div>
                <h3 className="text-sm font-semibold mb-2">Literacy Rate</h3>
                <PieChart width={300} height={300}>
                  <Pie
                    data={literacyData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#82ca9d"
                    label
                  >
                    {literacyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </div>
            </div>
          )}
          {selectedTab === "phrases" && (
            <ul className="text-sm text-gray-700 leading-relaxed max-w-prose break-words">
              {data.phrases.map((phrase: any, index: number) => (
                <li key={index}>
                  <strong>{phrase.phil}</strong> - {phrase.eng}
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}