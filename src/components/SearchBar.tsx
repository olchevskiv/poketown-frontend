import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { Search, Undo2 } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useEffect } from "react";

const formSchema = z.object({
  searchQuery: z.string({
    required_error: "Restaurant name is required",
  }),
});

export type SearchForm = z.infer<typeof formSchema>;

type Props = {
    onSubmit: (formData: SearchForm) => void;
    placeHolder: string;
    onReset?: () => void;
    searchQuery?: string;
};

const SearchBar = ({ onSubmit, onReset, placeHolder, searchQuery }: Props) => {
    const form = useForm<SearchForm>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            searchQuery,
        },
    });

    useEffect(() => {
        form.reset({ searchQuery });
    }, [form, searchQuery]);

    const handleReset = () => {
        form.reset({
            searchQuery: "",
        });

        if (onReset) {
            onReset();
        }
    };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}
        className={`flex items-center gap-3 justify-between flex-row bg-muted rounded-full p-3 ${
          form.formState.errors.searchQuery && "border-red-500"
        }`}
      >
        <Search strokeWidth={2} size={20} className="ml-2 hidden md:block" aria-label="Search icon"/>
        <FormField
          control={form.control}
          name="searchQuery"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input
                  {...field}
                  className="border-none shadow-none border-primary-foreground placeholder:text-gray-500 text-lg focus-visible:ring-0"
                  placeholder={placeHolder}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Undo2 onClick={handleReset}  className="hover:text-primary cursor-pointer" aria-label="Reset searc button" />
        <Button type="submit" variant="default" aria-label="Submit search button" >Search</Button>
      </form>
    </Form>
  );
};

export default SearchBar;