import { useEffect, useState } from "react";
import { DataTable } from "./Data_Tble";

import { Button } from "@/components/ui/button";
import { DataTableColumnHeader } from "@/components/Admins/data_table/Data_Table_Columns_Header";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MoreHorizontal, PenIcon, Trash } from "lucide-react";
import TButton from "@/Layout/core/TButton";
import { toast } from "sonner";
import StationsUPSERT_Form from '@/components/Forms/StationsUPSERT_Form'
import { StationsApi } from "@/Service/Api/admin_api/StationsApi";

export default function Admin_StationList(params) {
  const [data, setData] = useState([]);

  const Admin_Stations_Columns = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "name",
      header: ({ column }) => {
        return <DataTableColumnHeader column={column} title={"Name"} />;
      },
    },
    {
      accessorKey: "line_id",
      header: ({ column }) => {
        return <DataTableColumnHeader column={column} title={"Line"} />;
      },
      cell:({row}) => {
        const line = row.original.line.name
        return line;
      }
    },
    {
      accessorKey: "updated_at",
      header: "Updated_at",
    },
    {
      accessorKey: "actions",
      cell: ({ row }) => {
        const [OpenSheet, setOpenSheet] = useState(false);
        const [OpenDropdown, setOpenDropDown] = useState(false);
        const { id, name } = row.original;

        return (
          <DropdownMenu open={OpenDropdown} onOpenChange={setOpenDropDown}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel className={"grid justify-items-center"}>
                Actions
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <div className="grid justify-items-center">
                    <TButton circle link color="red">
                      <Trash className="w-5 h-5" />
                    </TButton>
                  </div>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you sure you want to delete <strong>{name}</strong> ?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={async () => {
                        const isLoading = toast.loading("Deleting in Progress");
                        const response = await StationsApi.deleteStations(id);
                        toast.dismiss(isLoading);
                        console.log(response);
                        if (response.status === 200) {
                          setData(data.filter((station) => station.id !== id));
                          setOpenDropDown(false);
                          toast.success(
                            ` ${response.data.station.name} ${response.data.message} `
                          );
                        }
                      }}
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <DropdownMenuSeparator />
              <Sheet open={OpenSheet} onOpenChange={setOpenSheet}>
                <SheetTrigger asChild>
                  <div className="grid justify-items-center">
                    <TButton circle link>
                      <PenIcon className="w-5 h-5" />
                    </TButton>
                  </div>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>
                      Update Station <strong>{name}</strong>
                    </SheetTitle>
                    <SheetDescription>
                      Make changes to your Station here.
                    </SheetDescription>
                  </SheetHeader>
                  
                  <StationsUPSERT_Form
                    values={row.original}
                    handleSubmit={(values) => {
                      const promise = StationsApi.updateStations(id, values);
                      promise.then((response) => {
                        console.log("API response:", response.data);
                        const {station} = response.data
                        const elements = data.map((item) => {
                            if (item.id === id) {
                                return station
                              }
                              return item;
                            });
                        setData(elements)
                        setOpenSheet(false);
                        setOpenDropDown(false);
                      });
                      return promise;
                    }}
                  />
                </SheetContent>
              </Sheet>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  useEffect(() => {
    StationsApi.getStations().then(({ data }) => setData(data.data));
  }, []);
  return (
    <>
      <DataTable columns={Admin_Stations_Columns} data={data} />
    </>
  );
}
