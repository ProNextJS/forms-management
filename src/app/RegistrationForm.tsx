"use client";
import { useFormState } from "react-dom";
import { useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { number, z } from "zod";

import { schema } from "./registrationSchema";
import SubmitButton from "./sumbit-button";
import { Button } from "@/components/ui/button";

export const RegistrationForm = ({
  onFormAction,
}: {
  onFormAction: (
    additional: {
      userId: number;
    },
    prevState: {
      message: string;
      success: boolean;
      user?: z.infer<typeof schema>;
      issues?: string[];
    },
    data: FormData
  ) => Promise<{
    message: string;
    success: boolean;
    user?: z.infer<typeof schema>;
    issues?: string[];
  }>;
}) => {
  const withId = onFormAction.bind(null, {
    userId: 1
  })
  const [state, formAction] = useFormState(withId, {
    success: false,
    message: "",
  });
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      first: "",
      last: "",
      email: "",
      zipcode: "",
    },
    mode: 'all'
  });

  const formRef = useRef<HTMLFormElement>(null);
  return (<>
    <Button onClick={() => {
      formRef.current?.requestSubmit()
    }}>test Programmatic form submission </Button>
    <Form {...form}>
      <div>{state?.message}</div>
      <form
        ref={formRef}
        action={formAction}
        className="space-y-8"
      >
        <div className="flex gap-2">
          <FormField
            control={form.control}
            name="first"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormDescription>Your first name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="last"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormDescription>Your last name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="zipcode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Zip Code</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription>Your zipcode (NNNNN).</FormDescription>
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
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription>Your email address.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <SubmitButton text="Submit"></SubmitButton>
      </form>
    </Form></>
  );
};
