import * as yup from "yup";

export const validationSchema = yup.object().shape({
    name: yup
      .string()
      .required("Поле ФИО обязательно")
      .min(3, "ФИО должно содержать не менее 3 символов"),
    birthdate: yup
      .date()
      .nullable()  // разрешаем null
      .typeError("Некорректная дата")
      .required("Дата рождения обязательна")
      .max(
        new Date(new Date().setFullYear(new Date().getFullYear() - 18)),
        "Возраст должен быть 18 лет или старше"
      ),
  });