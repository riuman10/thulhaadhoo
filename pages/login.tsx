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
      <main className="flex items-center justify-center h-screen w-screen bg-gradient-to-b from-white via-white to-yellow-200">
        <div className="w-[300px] md:w-[400px]">
          <p className="text-6xl font-huseynu text-yellow-400 text-center leading-10 mb-8">ތުޅާދޫ ދާއިރާ</p>
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              style: {
                input : {background: "white", borderRadius : "8px"},
                button : {borderRadius : "8px"}
              },
              variables: {
                default: {
                  colors: {
                    brand: "#0A0A0A",
                    brandAccent: "#0A0A0A",
                  },
                },
              },
            }}
            providers={["google", "apple", "twitter"]}
            theme="light"
            showLinks={false}
          />
        </div>
      </main>
    </div>
  );
}

export default Login;
