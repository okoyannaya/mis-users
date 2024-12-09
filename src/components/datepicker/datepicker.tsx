// DatePicker.tsx
import { FC, useEffect, useRef } from "react";
import AirDatepicker from "air-datepicker";

import "air-datepicker/air-datepicker.css";
import "./datepicker.css";

interface DatePickerProps {
  value: Date | null;
  error?: string;
  onChange: (value: Date) => void;
  clearError: () => void;
}

export const DatePicker: FC<DatePickerProps> = ({ value, error, onChange, clearError }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const datepickerRef = useRef<AirDatepicker<HTMLInputElement> | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      const datepicker = new AirDatepicker(inputRef.current, {
        maxDate: new Date(new Date().setFullYear(new Date().getFullYear() - 18)),
        selectedDates: value ? [value] : [],
        onSelect({ date }: { date: Date | Date[] }) {
          if (Array.isArray(date)) {
            if (date.length > 0) {
              onChange(date[0]);
              clearError();
            }
          } else if (date instanceof Date) {
            onChange(date);
            clearError();
          }
        },
        position({ $datepicker, $target, $pointer }) {
          const coords = $target.getBoundingClientRect()
           
          const top = coords.bottom + window.scrollY + 10; // 10px от нижней части инпута
          const left = coords.left;

          $datepicker.style.left = `${left - 22}px`;
          $datepicker.style.top = `${top}px`;

          $pointer.style.display = "none";
        },
        // Отключаем выбор нескольких дат
        multipleDates: false,
      });

      datepickerRef.current = datepicker;

      return () => {
        datepicker.destroy();
      };
    }
  }, [onChange, clearError]);

  useEffect(() => {
    if (inputRef.current) {
      if (value) {
        // Форматируем дату в формат DD.MM.YYYY
        const formattedDate = value.toLocaleDateString("ru-RU");
        inputRef.current.value = formattedDate;
      } else {
        inputRef.current.value = "";
      }
    }
  }, [value]);

  const handleInputClick = () => {
    datepickerRef.current?.show();
  };

  return (
    <div className="date-wrapper">
      <div className="date-title">
        Дата рождения <span className="require">*</span>
      </div>
      <input
        type="text"
        ref={inputRef}
        className={`date_input ${error ? "is-invalid" : ""}`}
        placeholder="00.00.0000"
        readOnly
        onClick={handleInputClick} // Открываем календарь при клике
      />
      <div className="error-container">
        {error && <div className="error">{error}</div>}
      </div>
      <div className="date-icon" onClick={handleInputClick} style={{ cursor: "pointer" }} />
    </div>
  );
};
