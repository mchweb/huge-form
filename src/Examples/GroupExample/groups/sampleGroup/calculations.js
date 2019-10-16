import createDecorator from "final-form-calculate";
import FIELDS from "./_fields";

const calculator = createDecorator({
  field: FIELDS.SOME_FIELD,
  updates: {
    [FIELDS.ANOTHER_FIELD]: (someFieldValue, allValues) => {
      return someFieldValue + "1";
    }
  }
});

export default calculator;
