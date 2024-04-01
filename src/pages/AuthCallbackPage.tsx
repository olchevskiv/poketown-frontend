import { useCreate } from "@/api/MyUserAPI";
import Loader from "@/components/Loader";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const AuthCallbackPage = () => {
    const { user } = useAuth0();
    const { createUser } = useCreate();
    const navigate = useNavigate();

    const hasCreatedUser = useRef(false);

    useEffect(() => {
        if (user?.sub && user?.email && !hasCreatedUser.current) {
            console.log("creating user")
            createUser({auth0Id: user.sub, email: user.email});
            hasCreatedUser.current = true;
        }
        navigate("/");
    },[createUser, navigate, user]);


    return <Loader/>;
}

export default AuthCallbackPage;