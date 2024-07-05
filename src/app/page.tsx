import { RegistrationForm } from "./RegistrationForm";
import { z } from "zod";

import { schema } from "./registrationSchema";

export default function Home() {
  const onFormAction = async (
    additional: {
      userId: number;
    },
    prevState: {
      message: string;
      success: boolean;
      user?: z.infer<typeof schema>;
      issues?: string[];
    },
    formData: FormData
  ) => {
    "use server";
    console.log(additional, formData)
    const data = Object.fromEntries(formData);
    const parsed = await schema.safeParseAsync(data);

    if (parsed.success) {
      console.log("User registered");
      return { success: true, message: "User registered", user: parsed.data };
    } else {
      const obj = {
        success: false,
        message: "Invalid data",
        issues: parsed.error.issues.map((issue) => issue.message),
      }
      console.log(JSON.stringify(obj))
      return obj;
    }
  };

  return (
    <div className="mx-auto max-w-xl">
      <RegistrationForm
        onFormAction={onFormAction}
      />
    </div>
  );
}
