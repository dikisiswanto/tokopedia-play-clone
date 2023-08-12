import { SearchIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';

import { Form, FormControl, FormField, FormItem } from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';

export default function SearchForm({ onSubmit }) {
  const form = useForm();
  return (
    <Form {...form}>
      <form onSubmit={onSubmit} method="post">
        <FormField
          control={form.control}
          name="q"
          render={({ field }) => (
            <FormItem className="relative">
              <FormControl className="bg-slate-700 border outline-0 border-slate-600">
                <Input placeholder="Search video" autoComplete="off" {...field} />
              </FormControl>
              <SearchIcon
                className="absolute top-1 right-0 mr-3 transform text-slate-400"
                size={16}
              />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
