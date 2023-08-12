import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/Button";
import useSession from "@/hooks/useSession";
import { isObjectEmpty } from "@/lib/utils";
import UserInfo from "@/components/section/UserInfo";

export default function CommentForm({ onSubmit, ...props }) {
  const validationSchema = {
    comment: {
      required: "This field is required",
    },
  };

  const [session] = useSession();

  if (isObjectEmpty(session)) {
    validationSchema.fullname = {
      required: "This field is required",
    };
  }

  const form = useForm({
    resolver: async (data) => {
      const errors = {};
      for (const field in validationSchema) {
        if (!data[field]) {
          errors[field] = { message: validationSchema[field].required };
        }
      }
      return {
        values: data,
        errors,
      };
    },
    defaultValues: {
      fullname: "",
      comment: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} {...props}>
        {isObjectEmpty(session) ? (
          <FormField
            control={form.control}
            name="fullname"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs">Full Name *</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    defaultValue={session.fullname}
                    className="text-sm bg-slate-600 border-slate-500"
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        ) : (
          <UserInfo session={session} />
        )}
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">Comment *</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  className="text-sm bg-slate-600 border-slate-500 min-h-12"
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <Button type="submit" className="block mt-5 w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
}
