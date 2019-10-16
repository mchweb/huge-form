import FIELDS from "./_fields";

export default values => {
  const errors = {};
  if (!values[FIELDS.SOME_FIELD]) errors[FIELDS.SOME_FIELD] = "Required";
  return errors;
};
