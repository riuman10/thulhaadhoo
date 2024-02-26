import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/supabase";
import { useUserStore } from "@/store";

type Props = {};

function Login({}: Props) {
  const router = useRouter();
  const { session, user, setUser, setSession } = useUserStore();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      getUser(session?.user?.id);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log(_event);
      if (_event === "SIGNED_IN") {
        setSession(session);
        getUser(session?.user?.id);
      } else return;
    });

    return () => subscription.unsubscribe();
  }, []);

  const getUser = async (id: any) => {
    if (!id) return;
    const { data } = await supabase.from("users").select("*").eq("id", id);
    if (data) {
      setUser(data ? data[0] : false);
    }
  };

  useEffect(() => {
    if (!user) {
      return;
    }
    if (user) {
      router.push("/dashboard");
    }
  }, [user]);

  return (
    <div>
      <main className="flex items-center justify-center h-screen w-screen">
        <div className="w-[300px] md:w-[400px]">
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: "#EAB308",
                    brandAccent: "#EAB308",
                  },
                },
              },
            }}
            providers={["google", "apple", "twitter"]}
            theme="dark"
            showLinks={true}
          />
        </div>
      </main>
    </div>
  );
}

export default Login;
