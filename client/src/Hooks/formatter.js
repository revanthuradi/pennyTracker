import { useAuth } from "../Context/AuthContext";
const formatNumberIndian = (num) => {
  const { currencySymbol } = useAuth();
  if (num === undefined || num === null) return "";
  const numStr = num.toString();
  const lastThree = numStr.slice(-3);
  const otherNumbers = numStr.slice(0, -3);
  const formattedOtherNumbers = otherNumbers.replace(
    /\B(?=(\d{2})+(?!\d))/g,
    ","
  );
  return otherNumbers
    ? currencySymbol + formattedOtherNumbers + "," + lastThree
    : currencySymbol + lastThree;
};

export default formatNumberIndian;
