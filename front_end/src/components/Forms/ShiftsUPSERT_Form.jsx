import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader } from "lucide-react";
import { toast } from "sonner";

const formSchema = z.object({
  type: z.string(),
});

export default function ShiftsUPSERT_Form({ handleSubmit, values }) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: values || { type: "" },
  });
  const {
    setError,
    formState: { isSubmitting },
    reset,
  } = form;
  const isUpdate = values !== undefined;
  const onSubmit = async (values) => {
    const loaderMessage = isUpdate ? "Updating in Progress" : "Adding Shift";
    const loder = toast.loading(loaderMessage);
    await handleSubmit(values)
      .then((req) => {
        if (req.status === 200) {
          toast.success(req.data.message);
          reset();
          console.log(req);
        }
      })
      .catch(({ response }) => {
        console.log(response.data.errors);
        Object.entries(response.data.errors).forEach((error) => {
          const [fieldname, errMsg] = error;
          setError(fieldname, {
            message: errMsg.join(),
          });
        });
      })
      .finally(() => {
        toast.dismiss(loder);
      });
  };
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  //defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Shift Type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {["Matin", "Nuit", "Soir"].map((shift, key) => (
                      <SelectItem key={key} value={shift}>
                        {shift}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isSubmitting} type="submit">
            {isSubmitting && <Loader className="mx-2 my-2 animate-spin" />}{" "}
            {isUpdate ? "Update" : "Create"}
          </Button>
        </form>
      </Form>
    </>
  );
}
