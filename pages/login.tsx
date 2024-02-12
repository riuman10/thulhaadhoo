import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/supabase";

type Props = {};

function Login({}: Props) {
  const router = useRouter();
  const [session, setSession] = useState<any>(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session) {
      return;
    }
    if (session) {
      router.push("/dashboard");
    }
  }, [session]);
  return (
    <div>
      <main className="flex items-center justify-center h-screen w-screen">
        <div className="w-[400px]">
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: "#0EA5E9",
                    brandAccent: "#0EA5E9",
                  },
                },
              },
            }}
            providers={["google", "apple", "twitter"]}
            theme="dark"
          />
        </div>
      </main>
    </div>
  );
}

export default Login;
