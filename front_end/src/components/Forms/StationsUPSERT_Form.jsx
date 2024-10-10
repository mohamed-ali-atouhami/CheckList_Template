import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { LinesApi } from "@/Service/Api/admin_api/LinesApi";

const formSchema = z.object({
    name: z.string().min(3).max(30),
    line_id: z.string(),
})

export default function StationsUPSERT_Form({handleSubmit,values}) {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: values || {
            name:'',
            line_id:''

        },
    })
    const { setError, formState: { isSubmitting },reset} = form
    const isUpdate = values !== undefined
    const [lines,setLines] = useState([]);
    useEffect(()=>{
        LinesApi.getLines().then(({data})=>{
            console.log(data)
            setLines(data.data)
        })
    },[])
    const onSubmit = async values => {
        const loaderMessage = isUpdate ? 'Updating in Progress' : 'Adding Station'
        const loder = toast.loading(loaderMessage)
        await handleSubmit(values).then((req) => {
            if (req.status === 200) {
                toast.success(req.data.message)
                  reset();
                console.log(req)
            }
        }
        ).catch(({ response }) => {
            console.log(response.data.errors)
            Object.entries(response.data.errors).forEach((error)=>{
                const [fieldname,errMsg]=error
                setError(fieldname,{
                    message:errMsg.join()
                })
            })
        }).finally(()=>{
            toast.dismiss(loder);
        })
    }
    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Name" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="line_id"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Lines</FormLabel>
                                <Select onValueChange={field.onChange} 
                                //defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Line"  />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {lines.map((line, key) =>
                                            <SelectItem key={key} value={line.id.toString()}>{line.name}</SelectItem>)
                                        }
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button disabled={isSubmitting} type="submit">
                        {isSubmitting && <Loader className="mx-2 my-2 animate-spin" />} {isUpdate ? 'Update' : 'Create'}
                    </Button>
                </form>
            </Form>

        </>
    )
};
