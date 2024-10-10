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
import { ShiftsApi } from "@/Service/Api/admin_api/ShiftsApi";
import ShiftsUPSERT_Form from "@/components/Forms/ShiftsUPSERT_Form";


export default function Admin_ShiftList(params) {
  const [data, setData] = useState([]);
  
  const Admin_Shift_Columns = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "type",
      header: ({ column }) => {
        return <DataTableColumnHeader column={column} title={"Type"} />;
      },
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
        const { id, type } = row.original;

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
                      Are you sure you want to delete <strong>{type}</strong> ?
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
                        const response = await ShiftsApi.deleteShift(id);
                        toast.dismiss(isLoading);
                        console.log(response);
                        if (response.status === 200) {
                          setData(data.filter((shifts) => shifts.id !== id));
                          setOpenDropDown(false)
                          toast.success(
                            ` ${response.data.type.name} ${response.data.message} `
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
                      Update Shift <strong>{type}</strong>
                    </SheetTitle>
                    <SheetDescription>
                      Make changes to your Shift here.
                    </SheetDescription>
                  </SheetHeader>
                  <ShiftsUPSERT_Form
                    values={row.original}
                    handleSubmit={(values) => {
                      const promise = ShiftsApi.updateShift(id, values);
                      promise.then((response) =>{
                        const {shift} = response.data
                        const elements = data.map((item) => {
                          if(item.id === id) {
                            return shift
                          }
                          return item
                        })
                        setData(elements)
                        setOpenSheet(false);
                        setOpenDropDown(false)
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
    ShiftsApi.getShift().then(({ data }) => setData(data.data));
  }, []);
  return (
    <>
      <DataTable columns={Admin_Shift_Columns} data={data} />
    </>
  );
}
