export const formatValue = (value: string) => {
  if (!value) return "";

  return value
    .replace(/(\d+(?:\.\d+)?)([a-zA-Z/]+)/g, "$1 $2")
    .replace(/_/g, " ")
    .replace(/^\w/, (c) => c.toUpperCase());
};

export const formatFormText = (text: string) => {
  if (!text) return "";
  return text.replace(/_/g, " ").replace(/^\w/, (c) => c.toUpperCase());
};
