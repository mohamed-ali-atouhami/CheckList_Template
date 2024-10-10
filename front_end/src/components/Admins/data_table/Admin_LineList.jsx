import { useEffect, useState } from "react";
import { DataTable } from "./Data_Tble";
import { LinesApi } from "@/Service/Api/admin_api/LinesApi";

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
import LinesUPSERT_Form from "@/components/Forms/LinesUPSERT_Form";

export default function Admin_LineList(params) {
  const [data, setData] = useState([]);
  
  const Admin_Line_Columns = [
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
                        const response = await LinesApi.deleteLines(id);
                        toast.dismiss(isLoading);
                        console.log(response);
                        if (response.status === 200) {
                          setData(data.filter((lines) => lines.id !== id));
                          setOpenDropDown(false)
                          toast.success(
                            ` ${response.data.line.name} ${response.data.message} `
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
                      Update Line <strong>{name}</strong>
                    </SheetTitle>
                    <SheetDescription>
                      Make changes to your Line here.
                    </SheetDescription>
                  </SheetHeader>
                  <LinesUPSERT_Form
                    values={row.original}
                    handleSubmit={(values) => {
                      const promise = LinesApi.updateLines(id, values);
                      promise.then((response) =>{
                        const {line} = response.data
                        const elements = data.map((item) => {
                          if(item.id === id) {
                            return line
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
    LinesApi.getLines().then(({ data }) => setData(data.data));
  }, []);
  return (
    <>
      <DataTable columns={Admin_Line_Columns} data={data} />
    </>
  );
}
