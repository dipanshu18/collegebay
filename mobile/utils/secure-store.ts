import * as SecureStore from "expo-secure-store";

export function saveValue(key: string, value: string) {
  SecureStore.setItem(key, value);
  return;
}

export function getValue(key: string) {
  const token = SecureStore.getItem(key);
  return token;
}

export async function deleteValue(key: string) {
  SecureStore.deleteItemAsync(key);
  return;
}
