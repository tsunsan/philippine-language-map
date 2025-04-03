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
              <Checkbox  
                  className="peer border-input bg-blue-500 border-blue-600 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-600 focus-visible:ring-blue-400 size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50" defaultChecked />
              <Label className="text-white text-sm font-semibold">Filipino</Label> 
            </div>
          </TabsContent>
          <TabsContent value="regions">
            <p className="text-sm text-gray-300">Content for Tab 2</p>
          </TabsContent>
          <TabsContent value="provinces">
            <p className="text-sm text-gray-300">Content for Tab 3</p>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
