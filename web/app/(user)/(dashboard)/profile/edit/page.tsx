import { toast } from "sonner";

import { fetchUserProfile } from "@/actions/user";
import { UpdateProfileForm } from "@/components/update-profile-form";
import type { UserProfile } from "@/types";

export default async function UpdateUserProfile() {
  const response = await fetchUserProfile();
  // biome-ignore lint/style/noVar: <explanation>
  var userProfile: UserProfile;
  if (response?.error) {
    toast.error(response?.error);
    return;
  }
  userProfile = response?.success;

  return (
    <div className="p-5">
      <h1 className="text-xl font-bold text-primary">Update your profile</h1>
      <div className="my-5 p-5 bg-gray-100 rounded shadow max-w-xl">
        <UpdateProfileForm user={userProfile} />
      </div>
    </div>
  );
}
