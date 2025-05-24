/* eslint-disable no-unused-vars */
import { memo } from "react";
import { motion } from "framer-motion";

const FormInput = memo(
  ({
    label,
    type,
    name,
    value,
    onChange,
    placeholder,
    required,
    readOnly,
    options,
    errors,
  }) => {
    return (
      <motion.div
        className="mb-6"
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        }}
      >
        <label htmlFor={name} className="block mb-2 font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>

        {type === "select" ? (
          <div className="relative">
            <select
              id={name}
              name={name}
              value={value}
              onChange={onChange}
              className="w-full px-4 py-3 transition-all bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required={required}
            >
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        ) : (
          <input
            type={type}
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
              errors[name] ? "border-red-500" : "border-gray-300"
            } ${readOnly ? "bg-gray-50" : ""}`}
            placeholder={placeholder}
            required={required}
            readOnly={readOnly}
          />
        )}

        {errors[name] && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-1 text-sm text-red-500"
          >
            {errors[name]}
          </motion.p>
        )}
      </motion.div>
    );
  }
);

export default FormInput;
