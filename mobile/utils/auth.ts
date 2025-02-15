import * as SecureStore from "expo-secure-store";

export async function saveValue(key: string, value: string) {
  await SecureStore.setItemAsync(key, value);
  return;
}

export async function getValue(key: string) {
  const token = await SecureStore.getItemAsync(key);
  return token;
}

export async function deleteValue(key: string) {
  await SecureStore.deleteItemAsync(key);
  return;
}
