import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Separator } from "../ui/separator";
import Admin_StationList from "./data_table_stations/Admin_StationList";
import { StationsApi } from "@/Service/Api/admin_api/StationsApi";
import StaionsUPSERT_Form from '@/components/Forms/StationsUPSERT_Form'

export default function Manage_Stations(params) {
  return (
    <>
      <div className="hidden md:block">
        <div className="">
          <div className="bg-background">
            <div className="grid lg:grid-cols-5">
              <div className="col-span-5 lg:col-span-5 ">
                <div className="h-full px-4 py-6 lg:px-8">
                  <Tabs defaultValue="list" className="h-full space-y-6">
                    <div className=" flex items-center">
                      <TabsList>
                        <TabsTrigger value="list" className="relative">
                          Stations
                        </TabsTrigger>
                        <TabsTrigger value="add">Add Station</TabsTrigger>
                      </TabsList>
                    </div>
                    <TabsContent
                      value="list"
                      className="border-none p-0 outline-none"
                    >
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h2 className="text-2xl font-semibold tracking-tight mb-3">
                            All Stations
                          </h2>
                        </div>
                      </div>

                      <Admin_StationList/>

                      <Separator className="my-4" />
                    </TabsContent>
                    <TabsContent
                      value="add"
                      className="h-full flex-col border-none p-0 data-[state=active]:flex"
                    >
                      <div className="space-y-1">
                        
                        <StaionsUPSERT_Form handleSubmit={(values) => StationsApi.createStations(values)} />
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
