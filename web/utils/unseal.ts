import { unsealData } from "iron-session";

export async function unsealCookie(encryptedData: string) {
  const result = await unsealData(encryptedData, {
    password: process.env.SEAL_PASSWORD as string,
  });
  return result;
}
