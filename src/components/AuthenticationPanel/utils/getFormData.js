const getFormData = (formID) => {
  let myForm = document.getElementById(formID);
  let formData = new FormData(myForm);
  let data = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });
  return data;
};

export default getFormData;
