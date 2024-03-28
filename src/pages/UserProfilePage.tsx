import { useGet, useUpdate } from "@/api/MyUserAPI";
import Loader from "@/components/Loader";
import UserProfileForm from "@/forms/user/profile/UserProfileForm";

const UserProfilePage = () => {

  const { updateUser, isLoading: isUpdateLoading } = useUpdate();
  const { myUser, isLoading: isGetLoading } = useGet();

  if (isGetLoading) {
    return <Loader />;
  }

  if (!myUser){
    return <span>Unable to load profile. Please try again.</span>;
  }

  return <UserProfileForm currentUser={myUser} onSave={updateUser} isLoading={isUpdateLoading} />;
}

export default UserProfilePage;