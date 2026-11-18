export function lastNameFormData(lastName: string): FormData {
  const formData = new FormData();
  formData.append("lastname", lastName);
  return formData;
}
