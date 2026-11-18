import { File } from "expo-file-system";
import * as ImagePicker from "expo-image-picker";

export function avatarFormData(photo: ImagePicker.ImagePickerAsset): FormData {
  const formData = new FormData();
  formData.append("avatar", new File(photo.uri));
  return formData;
}
