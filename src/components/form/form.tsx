import { SubmitHandler, useForm } from "react-hook-form";
import { DatePicker } from "@components/datepicker";
import { yupResolver } from "@hookform/resolvers/yup";

import { validationSchema } from "./validationSchema";

interface FormData {
  name: string;
  birthdate: Date;
}

export const Form = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    clearErrors,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: "",
      birthdate: new Date(),
    },
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log("Submitted Data:", data);
  };

  const birthdate = watch("birthdate");

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label>
          ФИО <span className="require">*</span>
        </label>
        <input
          type="text"
          className={`form-control ${errors.name ? "is-invalid" : ""}`}
          {...register("name")}
          placeholder="Введите ФИО"
        />
        {errors.name && <span className="error">{errors.name.message}</span>}
      </div>

      <DatePicker
        value={birthdate}
        error={errors.birthdate?.message}
        onChange={(date) => setValue("birthdate", date, { shouldValidate: true })}
        clearError={() => clearErrors("birthdate")}
      />

      <button type="submit">Отправить</button>
    </form>
  );
};
