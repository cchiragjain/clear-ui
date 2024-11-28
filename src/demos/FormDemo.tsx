import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../components/base/Button";
import { Checkbox } from "../components/base/Checkbox";
import { FormField } from "../components/base/FormField";
import { Input } from "../components/base/Input";
import { MultiSelect } from "../components/base/MultiSelect";
import { Select } from "../components/base/Select";
import { TextArea } from "../components/base/TextArea";
import { useToast } from "../hooks/use-toast";
import { demoData } from "../lib/demo-data";
import { userFormSchema, type UserFormData } from "../lib/schemas";

export function FormDemo() {
  const { showToast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<UserFormData>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      newsletter: false,
      interests: [],
    },
  });

  const onSubmit = (data: UserFormData) => {
    console.log("Form submitted:", data);
    showToast("Form submitted successfully!", "success");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h1 className="text-2xl font-bold mb-6">User Registration Form</h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                label="First Name"
                error={errors.firstName?.message}
                required
              >
                <Input
                  {...register("firstName")}
                  placeholder="Enter your first name"
                  error={!!errors.firstName}
                />
              </FormField>

              <FormField
                label="Last Name"
                error={errors.lastName?.message}
                required
              >
                <Input
                  {...register("lastName")}
                  placeholder="Enter your last name"
                  error={!!errors.lastName}
                />
              </FormField>
            </div>

            <FormField label="Email" error={errors.email?.message} required>
              <Input
                {...register("email")}
                type="email"
                placeholder="Enter your email"
                error={!!errors.email}
              />
            </FormField>

            <FormField label="Age" error={errors.age?.message} required>
              <Input
                {...register("age", { valueAsNumber: true })}
                type="number"
                placeholder="Enter your age"
                error={!!errors.age}
              />
            </FormField>

            <FormField label="Country" error={errors.country?.message} required>
              <Select
                options={demoData.countries}
                value={watch("country")}
                onChange={(value) => setValue("country", value)}
                error={!!errors.country}
                placeholder="Select your country"
              />
            </FormField>

            <FormField
              label="Interests"
              error={errors.interests?.message}
              required
            >
              <MultiSelect
                options={demoData.interests}
                value={watch("interests")}
                onChange={(value) => setValue("interests", value)}
                error={!!errors.interests}
                placeholder="Select your interests"
              />
            </FormField>

            <FormField
              label="Bio"
              error={errors.bio?.message}
              helperText="Tell us about yourself"
            >
              <TextArea
                {...register("bio")}
                placeholder="Write a short bio..."
                error={!!errors.bio}
              />
            </FormField>
            <FormField>
              <Checkbox
                {...register("newsletter")}
                label="Subscribe to newsletter"
              />
            </FormField>

            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
