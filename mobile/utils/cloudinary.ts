import { upload } from "cloudinary-react-native";
import { Cloudinary } from "@cloudinary/url-gen";

const cld = new Cloudinary({
  cloud: {
    cloudName: process.env.EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME,
  },
});

const options = {
  upload_preset: process.env.EXPO_PUBLIC_CLOUDINARY_PRESET_NAME,
  unsigned: true,
};

export async function uploadToCloudinary({ uri }: { uri: string }) {
  let url = "";
  await upload(cld, {
    file: uri,
    options,
    callback: (error, response) => {
      if (response) {
        url = response.secure_url;
      }
    },
  });

  return url;
}
