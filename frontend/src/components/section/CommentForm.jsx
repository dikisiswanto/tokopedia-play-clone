/* eslint-disable react-hooks/exhaustive-deps */
import { Loader2Icon } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import UserInfo from '@/components/section/UserInfo';
import { Button } from '@/components/ui/Button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import useSession from '@/hooks/useSession';
import { isObjectEmpty } from '@/lib/utils';

export default function CommentForm({ onSubmit, ...props }) {
  const [session] = useSession();

  const validationSchema = {
    comment: {
      required: 'This field is required',
    },
  };

  if (isObjectEmpty(session)) {
    validationSchema.fullname = {
      required: 'This field is required',
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
      fullname: '',
      comment: '',
    },
  });

  const {
    reset,
    control,
    handleSubmit,
    formState: { isSubmitting, isSubmitSuccessful },
  } = form;

  useEffect(() => {
    reset();
  }, [isSubmitSuccessful]);

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} {...props}>
        {isObjectEmpty(session) ? (
          <FormField
            control={control}
            name="fullname"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs">Full Name *</FormLabel>
                <FormControl>
                  <Input {...field} className="text-sm bg-slate-600 border-slate-500" />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        ) : (
          <UserInfo session={session} />
        )}
        <FormField
          control={control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">Comment *</FormLabel>
              <FormControl>
                <Textarea {...field} className="text-sm bg-slate-600 border-slate-500 min-h-12" />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="inline-flex items-center w-full mt-5"
          variant="primary"
          disabled={isSubmitting}
        >
          {isSubmitting && <Loader2Icon className="animate-spin inline-block mr-1" />}
          Submit
        </Button>
      </form>
    </Form>
  );
}
