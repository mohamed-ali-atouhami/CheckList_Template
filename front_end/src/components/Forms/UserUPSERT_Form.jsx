import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader } from "lucide-react";
import { toast } from "sonner";

const formSchema = z.object({
    name: z.string().min(3).max(30),
    email: z.string().email().min(3).max(30),
    password: z.string().min(8).max(30)
})

export default function UserUPSERT_Form({handleSubmit,values}) {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: values || {
            name:'',
            email:'',
            password:''
        },
    })
    const { setError, formState: { isSubmitting },reset} = form
    const isUpdate = values !== undefined
    const onSubmit = async values => {
        const loaderMessage = isUpdate ? 'Updating in Progress' : 'Adding User'
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
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="exemple@exp.com" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type={'password'} placeholder="password" {...field} />
                                </FormControl>

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
