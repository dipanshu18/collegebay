import { fetchUserProfile } from "@/actions/user";
import { UpdateProfileForm } from "@/components/update-profile-form";

export default async function UpdateUserProfile() {
  const response = await fetchUserProfile();
  let userProfile;
  if (response?.success) {
    userProfile = response.success;
  }

  return (
    <>
      <h1 className="pl-4 text-xl font-bold">Update your profile</h1>
      <div className="p-4">
        <UpdateProfileForm user={userProfile} />
      </div>
    </>
  );
}
