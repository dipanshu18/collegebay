import { COLOR } from "@/constants/COLOR";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { uploadToCloudinary } from "@/utils/cloudinary";
import { createRequest } from "@/api/mutations";

export default function CreateRequest() {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");
  const [requestDetails, setRequestDetails] = useState({
    title: "",
    description: "",
  });

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 1,
      selectionLimit: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImage(uri);
    }
  };
  async function handleCreateRequest() {
    setLoading(true);
    try {
      if (!image || image.length === 0) {
        throw Alert.alert("Select atleast 1 image to create request");
      }

      const uploadedUrl = await uploadToCloudinary({ uri: image });

      console.log(uploadedUrl);
      const response = await createRequest({
        ...requestDetails,
        image: uploadedUrl,
      });

      Alert.alert(response);

      setImage("");
      setRequestDetails({ title: "", description: "" });
    } catch (error) {
      console.log("ERROR:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={{ flex: 1, marginVertical: 10, padding: 10, gap: 10 }}>
      <View>
        <Pressable
          style={[
            styles.selectImagesBtn,
            { justifyContent: "center", alignItems: "center", gap: 5 },
          ]}
          onPress={pickImage}
        >
          <Entypo name="upload" color={"white"} size={28} />
          <Text style={styles.btnText}>Pick image from gallery</Text>
        </Pressable>
      </View>
      <View>
        <TextInput
          placeholder="enter product title"
          style={{
            borderWidth: 1,
            borderRadius: 10,
            fontSize: 15,
            padding: 15,
            borderColor: "#ced4da",
          }}
          onChangeText={(text) =>
            setRequestDetails({ ...requestDetails, title: text })
          }
          value={requestDetails.title}
        />
      </View>
      <View>
        <TextInput
          placeholder="enter product description"
          multiline={true}
          numberOfLines={20}
          style={{
            borderWidth: 1,
            borderRadius: 10,
            fontSize: 15,
            padding: 15,
            borderColor: "#ced4da",
          }}
          onChangeText={(text) =>
            setRequestDetails({ ...requestDetails, description: text })
          }
          value={requestDetails.description}
        />
      </View>

      <Pressable
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "center",
          marginVertical: 10,
          paddingVertical: 15,
          backgroundColor: "#354F52",
          borderRadius: 10,
        }}
        disabled={loading}
        onPress={handleCreateRequest}
      >
        <Text
          style={{
            color: "white",
            fontSize: 15,
            fontWeight: "600",
            letterSpacing: 1,
          }}
        >
          {loading ? "Submitting..." : "Create"}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  selectImagesBtn: {
    backgroundColor: COLOR.info,
    paddingVertical: 20,
    borderRadius: 10,
  },
  btnText: {
    textAlign: "center",
    color: "white",
    fontSize: 15,
    fontWeight: "600",
  },
});
