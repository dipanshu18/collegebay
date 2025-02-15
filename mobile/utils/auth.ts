import * as SecureStore from "expo-secure-store";

export async function saveToken(key: string, value: string) {
  await SecureStore.setItemAsync(key, value);
  return;
}

export async function getToken(key: string) {
  const token = await SecureStore.getItemAsync(key);
  return token;
}

export async function deleteToken(key: string) {
  await SecureStore.deleteItemAsync(key);
  return;
}
