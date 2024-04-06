import { FcGoogle } from "react-icons/fc";
import { useAppDispatch } from "../../store/hooks";
import { GoogleAuthProvider, signInWithPopup } from "@firebase/auth";
import { auth, db, usersRef } from "../../configs/firebase";
import { addDoc, collection, getDocs, query, where } from "@firebase/firestore";
import { setUserStatus } from "../../store";

import "./styles.scss";

const Login = () => {
  const dispatch = useAppDispatch();

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    const {
      user: { email, uid },
    } = await signInWithPopup(auth, provider);

    if (email) {
      const firestoreQuery = query(usersRef, where("uid", "==", uid));
      const fetchedUser = await getDocs(firestoreQuery);
      if (fetchedUser.docs.length === 0) {
        await addDoc(collection(db, "users"), {
          uid,
          email,
        });
      }
      dispatch(setUserStatus({ email }));
    }
  };

  return (
    <div className="login">
      <button onClick={handleLogin} className="login-btn">
        <FcGoogle /> Login with Google
      </button>
    </div>
  );
};

export default Login;
