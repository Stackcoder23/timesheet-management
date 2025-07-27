import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 h-screen">
      <div className="flex items-center justify-center bg-white h-full">
        <div className="w-full max-w-md px-4 sm:px-6 lg:px-8 space-y-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 text-center">
              Welcome Back
            </h1>
          </div>
          <LoginForm />
        </div>
      </div>

      <div className="hidden lg:flex items-center justify-center bg-[#1a57db] p-12 h-full">
        <div className="text-center mx-5">
          <h2 className="text-4xl font-bold text-white text-left">ticktock</h2>
          <p className="mt-4 text-lg text-white/80 text-left">
            Introducing ticktock, our cutting-edge timesheet web application
            designed to revolutionize how you manage employee work hours. With
            ticktock, you can effortlessly track and monitor employee attendance
            and productivity from anywhere, anytime, using any
            internet-connected device.
          </p>
        </div>
      </div>
    </div>
  );
}
