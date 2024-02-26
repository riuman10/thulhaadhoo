import { create } from "zustand";

type userData = {
  user : any,
  session : any,
  setUser: (userObj: any) => void,
  setSession : (sessionObj : any) => void
}


const useUserStore = create<userData>((set) => {
  return {
    user: false,
    session: false,
    setUser: (userObj) => {
      set({ user: userObj });
      localStorage.setItem("user", JSON.stringify(userObj));
    },
    setSession: (sessionObj) => {
      set({ session: sessionObj });
      localStorage.setItem("session", JSON.stringify(sessionObj));
    },
  };
});


export {useUserStore}