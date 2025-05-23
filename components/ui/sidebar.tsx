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
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center space-x-2">
                <Checkbox color="akeanon" defaultChecked />
                <Label className="text-white text-sm font-semibold">Akeanon</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox color="bikol" defaultChecked />
                <Label className="text-white text-sm font-semibold">Bikol</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox color="bisaya" defaultChecked />
                <Label className="text-white text-sm font-semibold">Bisaya/Binisaya</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox color="capizeno" defaultChecked />
                <Label className="text-white text-sm font-semibold">Capizeño</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox color="cebuano" defaultChecked />
                <Label className="text-white text-sm font-semibold">Cebuano</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox color="hiligaynon" defaultChecked />
                <Label className="text-white text-sm font-semibold">Hiligaynon Ilonggo</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox color="ilocano" defaultChecked />
                <Label className="text-white text-sm font-semibold">Ilocano</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox color="ivatan" defaultChecked />
                <Label className="text-white text-sm font-semibold">Ivatan</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox color="kalinga" defaultChecked />
                <Label className="text-white text-sm font-semibold">Kalinga</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox color="kankanaey" defaultChecked />
                <Label className="text-white text-sm font-semibold">Kankanaey</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox color="kapampangan" defaultChecked />
                <Label className="text-white text-sm font-semibold">Kapampangan</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox color="karay_a" defaultChecked />
                <Label className="text-white text-sm font-semibold">Karay-a</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox color="maguindanao" defaultChecked />
                <Label className="text-white text-sm font-semibold">Maguindanao</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox color="maranao" defaultChecked />
                <Label className="text-white text-sm font-semibold">Maranao</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox color="masbateno" defaultChecked />
                <Label className="text-white text-sm font-semibold">Masbateño</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox color="pangasinan" defaultChecked />
                <Label className="text-white text-sm font-semibold">Pangasinan</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox color="surigaonon" defaultChecked />
                <Label className="text-white text-sm font-semibold">Surigaonon</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox color="tagalog" defaultChecked />
                <Label className="text-white text-sm font-semibold">Tagalog</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox color="tausug" defaultChecked />
                <Label className="text-white text-sm font-semibold">Tausug</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox color="tuwali" defaultChecked />
                <Label className="text-white text-sm font-semibold">Tuwali</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox color="waray" defaultChecked />
                <Label className="text-white text-sm font-semibold">Waray</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox color="yakan" defaultChecked />
                <Label className="text-white text-sm font-semibold">Yakan</Label>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
