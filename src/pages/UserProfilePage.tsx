import { useGet, useUpdate } from "@/api/MyUserAPI";
import UserProfileForm from "@/forms/user/profile/UserProfileForm";
import { Loader2 } from "lucide-react";

const UserProfilePage = () => {

  const { updateUser, isLoading: isUpdateLoading } = useUpdate();
  const { myUser, isLoading: isGetLoading } = useGet();

  if (isGetLoading) {
    return <Loader2 className="mr-2 h-6 w-6 animate-spin"/>;
  }

  if (!myUser){
    return <span>Unable to load profile. Please try again.</span>;
  }

  return <UserProfileForm currentUser={myUser} onSave={updateUser} isLoading={isUpdateLoading} />;
}

export default UserProfilePage;