"use client";

import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export default function Sidebar({ setSelectedLayer }: { setSelectedLayer: (layer: string) => void }) {
  return (
    <div className="absolute top-5 left-5 z-50">
      <Card className="w-64 bg-gradient-to-b from-black/50 to-black/90 backdrop-blur-md shadow-lg p-4 rounded-lg border border-white/10">
        <Tabs defaultValue="country" onValueChange={setSelectedLayer} className="w-full">
          <TabsList className="bg-gray-800 p-1 rounded-lg mb-2">
            <TabsTrigger value="country" className="text-white">Country</TabsTrigger>
            <TabsTrigger value="regions" className="text-white">Regions</TabsTrigger>
            <TabsTrigger value="provinces" className="text-white">Provinces</TabsTrigger>
          </TabsList>
          <TabsContent value="country">
            <div className="flex items-center space-x-2">
              <Checkbox color="tagalog" defaultChecked />
                  <Label className="text-white text-sm font-semibold">Tagalog</Label> 
            </div>
          </TabsContent>
          <TabsContent value="regions">
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center space-x-2">
                <Checkbox color="tagalog" defaultChecked />
                <Label className="text-white text-sm font-semibold">Tagalog</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox color="hiligaynon" defaultChecked />
                <Label className="text-white text-sm font-semibold">Hiligaynon</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox color="ilocano" defaultChecked />
                <Label className="text-white text-sm font-semibold">Ilocano</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox color="bikol" defaultChecked />
                <Label className="text-white text-sm font-semibold">Bikol</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox color="cebuano" defaultChecked />
                <Label className="text-white text-sm font-semibold">Cebuano</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox color="bisaya" defaultChecked />
                <Label className="text-white text-sm font-semibold">Bisaya</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox color="waray" defaultChecked />
                <Label className="text-white text-sm font-semibold">Waray</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox color="tausug" defaultChecked />
                <Label className="text-white text-sm font-semibold">Tausug</Label>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="provinces">
            <p className="text-sm text-gray-300">Content for Tab 3</p>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
