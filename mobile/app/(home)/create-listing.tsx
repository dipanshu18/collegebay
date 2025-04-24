import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useState } from "react";
import RNPickerSelect from "react-native-picker-select";
import { COLOR } from "@/constants/COLOR";
import { Entypo } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useMutation } from "@tanstack/react-query";
import { createPost } from "@/api/mutations";
import { uploadToCloudinary } from "@/utils/cloudinary";

export default function CreateListing() {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [postDetails, setPostDetails] = useState({
    title: "",
    description: "",
    price: "",
  });
  const [selectedCategory, setSelectedCategory] = useState("");

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 1,
      selectionLimit: 4,
      allowsMultipleSelection: true,
    });

    if (!result.canceled) {
      const uris = result.assets.map((asset) => asset.uri);

      setImages(uris);
    }
  };

  async function handleCreatePost() {
    setLoading(true);
    try {
      if (!images || images.length === 0) {
        throw Alert.alert("Select atleast 1 image to create post");
      }

      const uploadedUrls = await Promise.all(
        images.map((uri) => uploadToCloudinary({ uri }))
      );

      console.log(uploadedUrls);
      const response = await createPost({
        ...postDetails,
        category: selectedCategory,
        images: uploadedUrls,
      });

      Alert.alert(response);

      setSelectedCategory("");
      setImages([]);
      setPostDetails({ title: "", description: "", price: "" });
    } catch (error) {
      console.log("ERROR:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScrollView style={{ marginVertical: 10, padding: 10 }}>
      <View style={{ flex: 1, gap: 10 }}>
        <View>
          <Pressable
            style={[
              styles.selectImagesBtn,
              { justifyContent: "center", alignItems: "center", gap: 5 },
            ]}
            onPress={pickImage}
          >
            <Entypo name="upload" color={"white"} size={28} />
            <Text style={styles.btnText}>
              Pick images from gallery (Upto 4 images)
            </Text>
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
              setPostDetails({ ...postDetails, title: text })
            }
            value={postDetails.title}
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
              setPostDetails({ ...postDetails, description: text })
            }
            value={postDetails.description}
          />
        </View>
        <View>
          <TextInput
            placeholder="enter your product resale price"
            keyboardType="numeric"
            style={{
              borderWidth: 1,
              borderRadius: 10,
              fontSize: 15,
              padding: 15,
              borderColor: "#ced4da",
            }}
            onChangeText={(text) =>
              setPostDetails({ ...postDetails, price: text })
            }
            value={postDetails.price}
          />
        </View>
        <RNPickerSelect
          placeholder={{
            label: "Product Category",
          }}
          onValueChange={(value) => setSelectedCategory(value)}
          items={[
            { label: "NOTES", value: "NOTES" },
            { label: "EQUIPMENT", value: "EQUIPMENT" },
            { label: "BOOKS", value: "BOOKS" },
            { label: "ELECTRONICS", value: "ELECTRONICS" },
            { label: "FURNITURE", value: "FURNITURE" },
          ]}
          style={{
            viewContainer: {
              borderWidth: 1,
              borderRadius: 10,
              borderColor: "#ced4da",
            },
          }}
          value={selectedCategory}
        />

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
          onPress={handleCreatePost}
          disabled={loading}
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
    </ScrollView>
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
