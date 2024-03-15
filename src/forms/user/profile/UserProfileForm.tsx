import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import LoadingButton from "@/components/LoadingButton";
import { User } from "@/types";
import { useEffect } from "react";

const formSchema = z.object({
    email: z.string().optional(),
    name: z.string().min(1,"Name is required"),
    addressLine: z.string().min(1,"Address Line is required"),
    city: z.string().min(1,"City is required"),
    zipCode: z.string().regex(/^\d{5}-\d{3}$/).min(1,"Zip Code is required").max(9),
    country: z.string().min(1,"Country is required"),

});

// Use Zod to determine form input type using properties specified in formSchema
type UserProfileFormData = z.infer<typeof formSchema>;

type Props = {
  onSave: (userProfileData: UserProfileFormData) => void;
  currentUser: User;
  isLoading: boolean;
}

const UserProfileForm = ({isLoading, onSave, currentUser}: Props) => {
  const form = useForm<UserProfileFormData>({
    resolver: zodResolver(formSchema), // handle form validation based on formSchema defined above
    defaultValues: currentUser
  });

  // reset form with appropriate user data
  useEffect(()=>{
    form.reset(currentUser);
  }, [currentUser, form]);

  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSave)} className="space-y-4 rounded-lg md:p-10">
            <div>
                <h2 className="text-2xl">Profile</h2>
                <FormDescription className="text-md text-primary-foreground">View and edit your profile information</FormDescription>
            </div>
            <FormField control={form.control} name="email" render={({field})=>(
                <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                        <Input {...field} disabled className=""></Input>
                    </FormControl>
                </FormItem>
            )}/>
             <FormField control={form.control} name="name" render={({field})=>(
                <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                        <Input {...field} className=""></Input>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}/>
            <FormField control={form.control} name="addressLine" render={({field})=>(
                <FormItem>
                    <FormLabel>Address Line</FormLabel>
                    <FormControl>
                        <Input {...field} className=""></Input>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}/>
            <div className="flex flex-col md:flex-row md:space-x-3">
                <FormField control={form.control} name="city" render={({field})=>(
                    <FormItem className="flex-1">
                        <FormLabel>City</FormLabel>
                        <FormControl>
                            <Input {...field} className=""></Input>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}/>
                <FormField control={form.control} name="zipCode" render={({field})=>(
                    <FormItem className="flex-1">
                        <FormLabel>Zip Code</FormLabel>
                        <FormControl>
                            <Input {...field} className=""></Input>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}/>
                <FormField control={form.control} name="country" render={({field})=>(
                    <FormItem className="flex-1">
                        <FormLabel>Country</FormLabel>
                        <FormControl>
                            <Input {...field} className=""></Input>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}/>
            </div>
            { isLoading ? (
                <LoadingButton variant="secondary"/>
            ) : (
                <Button type="submit" variant="secondary">Save Changes</Button>
            )}
        </form>
    </Form>
  );
}

export default UserProfileForm;
