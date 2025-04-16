import SignIn from "@/components/sign-in";

export default async function SignInPage() {
  return (
    <section className="flex h-screen flex-col items-center justify-center gap-4">
      <SignIn />
    </section>
  );
}
