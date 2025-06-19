import RegisterForm from "@components/auth/RegisterForm";

const page = () => {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <RegisterForm />
    </div>
  );
};

export default page;
