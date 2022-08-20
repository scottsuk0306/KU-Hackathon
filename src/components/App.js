import AppRouter from "components/Router";
import { useState, useEffect } from "react";
import { authService } from "fbase";
import { getAuth, onAuthStateChanged, updateCurrentUser } from "firebase/auth";

function App() {
  const [init, setInit] = useState(false);
  const [userObj,setuserObj]=useState(null);
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setuserObj({
          uid:user.uid,
          displayName:user.displayName,
          updateProfile: (args)=>user.updateProfile(args),
        });
      } else {
        setuserObj(false);
      }
      setInit(true);
    });
  }, []);
  const refreshUser=async()=>{
    await updateCurrentUser(authService,authService.currentUser);
    setuserObj(authService.currentUser);
  };
  return (
    <>
      {init ? <AppRouter refreshUser={refreshUser} isLoggedIn={Boolean(userObj)} userObj={userObj} /> : "Initializing..."}
      
      <footer>&copy; NWITTER {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
