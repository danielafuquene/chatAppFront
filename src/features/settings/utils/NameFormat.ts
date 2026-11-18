export function nameFormData(firstName: string): FormData {
  const formData = new FormData();
  formData.append("firstname", firstName);
  return formData;
}
