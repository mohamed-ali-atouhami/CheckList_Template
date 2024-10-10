import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Separator } from "../ui/separator";
import Admin_UserList from "./data_table_users/Admin_UserList";
import UserUPSERT_Form from "../Forms/UserUPSERT_Form";
import { AdminUsersApi } from "@/Service/Api/admin_api/AdminUsersApi";

export default function Manage_Users(params) {
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
                          Users
                        </TabsTrigger>
                        <TabsTrigger value="add">Add Users</TabsTrigger>
                      </TabsList>
                    </div>
                    <TabsContent
                      value="list"
                      className="border-none p-0 outline-none"
                    >
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h2 className="text-2xl font-semibold tracking-tight mb-3">
                            All Users
                          </h2>
                        </div>
                      </div>

                      <Admin_UserList/>

                      <Separator className="my-4" />
                    </TabsContent>
                    <TabsContent
                      value="add"
                      className="h-full flex-col border-none p-0 data-[state=active]:flex"
                    >
                      <div className="space-y-1">
                        <UserUPSERT_Form handleSubmit={(values) => AdminUsersApi.createUsers(values)} />
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
