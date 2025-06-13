import { useSession as useBetterAuthSession, signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export const useAuth = () => {
  const { data: session, isPending } = useBetterAuthSession();
  const router = useRouter();

  const signOutHandler = async () => {
    await signOut();
    router.push("/login");
  };

  return {
    user: session?.user || null,
    session,
    isPending,
    isAuthenticated: !!session,
    signOutHandler,
  };
};
