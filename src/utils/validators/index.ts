export interface Rules {
  maxLength?: number;
  minLength?: number;
  isRequired: boolean;
  isEmail?: boolean;
  isSelected?: boolean;
}

export const formValidator = (value: string | number, rules: Rules) => {
  const cleanNumberInput = (number: number): number => {
    const stringNumber = number.toString();
    const cleanStringNumber = stringNumber.trim();
    const cleanNumberValue = Number(cleanStringNumber);
    return cleanNumberValue;
  };

  let isValid = true;
  let cleanStringValue: string = typeof value === "string" ? value.trim() : "";
  let cleanNumberValue: number =
    typeof value === "number" ? cleanNumberInput(value) : 0;

  for (let rule in rules) {
    switch (rule) {
      case "maxLength":
        isValid = isValid && maxLengthValidator(cleanStringValue, rules[rule]);
        break;

      case "minLength":
        isValid = isValid && minLengthValidator(cleanStringValue, rules[rule]);
        break;

      case "isRequired": {
        if (cleanStringValue) {
          isValid = isValid && requiredValidator(cleanStringValue);
        }

        if (cleanNumberValue) {
          isValid = isValid && requiredValidator(cleanNumberValue);
        }

        break;
      }

      case "isEmail":
        isValid = isValid && emailValidator(cleanStringValue);
        break;

      default:
        isValid = true;
        break;
    }
  }

  return isValid;
};

const maxLengthValidator = (value: string, maxLength: number | undefined) => {
  if (maxLength) {
    return value.length <= maxLength;
  }
  return true;
};

const minLengthValidator = (value: string, minLength: number | undefined) => {
  return value.length >= minLength!;
};

const requiredValidator = (value: string | number): boolean => {
  if (typeof value === "string" || typeof value === "number") {
    return value !== "";
  }

  return false;
};

const emailValidator = (value: string) => {
  var re =
    /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(value).toLowerCase());
};

const numberValidator = (value: number) => !isNaN(value);

// const isSelectedValidator = optionsArray => {
//   return optionsArray.some(option => {
//     return option.checked === true
//   })
// }
