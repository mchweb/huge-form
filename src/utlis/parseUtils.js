export const parseNumber = value => {
  if (!value) return value;
  return value.replace(/[^\d]/g, "");
};
