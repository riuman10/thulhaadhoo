import { create } from "zustand";

type userData = {
  user : any,
  setUser: (userObj: unknown) => void,
}


const useUserStore = create<userData>((set) => {
  return {
    user: false,
    setUser: (userObj) => {
      set({ user: userObj });
      localStorage.setItem("user", JSON.stringify(userObj));
    },
  };
});


export {useUserStore}