import FIELDS from "./_fields";

export default ({ values, setFieldData }) => {
  if (values[FIELDS.SOME_FIELD] === "X") {
    setFieldData(FIELDS.SOME_FIELD, {
      warning: "Warning text"
    });
  }
};
