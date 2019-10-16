# Huge Form

This project uses [Final-Form](https://final-form.org/) to create huge complex forms with reusable field groups, two-level validations (erros and warnings) and cross-form calculations. It also contains a minimalistic UI framework to implement such form.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

> **Work in progress!** A lot of these things will probably change.

## Getting started

1. Install [Final-Form](https://final-form.org/docs/react-final-form/getting-started) and take a look at the [Simple React Example](https://final-form.org/docs/react-final-form/examples/simple).

   > If you want to get a better understanding how Final-Form works, see [this video](https://youtu.be/WoSzy-4mviQ).

2. Take a look at these examples which shows how to use next Final-Form features:

   - Form validation as a function: [link](https://final-form.org/docs/react-final-form/examples/record-level-validation)
   - Warning generation: [link](https://codesandbox.io/s/m5qwxpr6o8)
     > Note: this example uses outdated final-form version. In current version `mutators` are moved from `props.mutators` to `props.form.mutators`.
   - Parsing values: [link](https://codesandbox.io/s/10rzowm323)
   - Updating form values after some field change (it is called `calculations` in this project, advanced developers call it decorators): [link](https://codesandbox.io/s/oq52p6v96y)
   - Field grouping using prefixes: [link](https://codesandbox.io/s/react-final-form-prefixed-fields-seiy8)
   - Implementing adapters for third-party components to use it with Final-Form: [link](https://codesandbox.io/s/40mr0v2r87)

3. We can split form in groups, which can be re-used later (see App/groups). Each group has its own list of fields, `validate` function, `warnings` generation function and `calculations`. We just need to combine it and send to `Form` (see App/GroupApp.js)

4. To make complex calculations, instead of `value` string each field contains an object with the next structure:

```
value: {
    inputValue: "", // text value to show in the field
    fieldValue: {}, // 'real' field value (Date, Table row...),

    disabled,
    required,

    calculated, // mark calculated values

    ... // all other stuff we need for calculations
}
```

5. Now we just need to use correct Adapters to extract necessary data from `input.value` and bind it to our Field components.

6. And of course, `values` in `onSubmit` function are also objects, not just strings. Format it the way you want before sending somewhere.

## UI Components Library

All components designed using universal color palette, 6px basic grid, main font-size/line-height = 13px/18px. Styled with SASS using BEM naming convention (`blockName__elementName_modificatorName`). Dark mode implemented using [this principle](https://medium.com/@katiemctigue/how-to-create-a-dark-mode-in-sass-609f131a3995). Components showcase is available in Examples/ComponentShowcase.js

### \_base

Container with some global styling, provides switching between default/dark theme (`<Base theme="..." />`)

### Icons

Icon Font from [React Fabric UI](https://developer.microsoft.com/en-us/fabric#/styles/web/icons)

### Button and Link

```
<Button type="button/submit" primary fluid />
<Link onClick={...} />
```

### Grid

12-column fluid (`max-width: 1200px`) grid layout:

```
<Container>
  <Row>
    <Col size={...}>
  </Row>
</Container>
```

### Card

Basic container to split form into separate sections. Expandable cards can also be switched on/off.

```
<Card title={...} expandable>
```

### Tab

Another container to group fields.

```
<Tabs defaultTab={...}>
  <Tab label={...} name={...}>{tab content}</Tab>
</Tabs>
```

### List

Component to display arrays of data, such as Dropdown Field items:

```
<List items={[..., ...]}>
```

### Table

```
<Table
  columnConfig={[name, key, width]}
  data={[ {...}, {...} ]}
/>
```

### BaseField

Common visual component for all fields. Contains label, prefix, text input field, icon (shows spinner in `isBusy` state) and description to display warning/error. `FieldPopup` wraps dropdown content and displays expand button for expandable popups (List -> Table)

```
<BaseField
  label
  prefix
  icon
  required
  disabled
  hasWarning
  hasError
  description
  isBusy

  onChange
  onBlur
  onFocus
  onIconClick

  inputProps // go directly to html <input/>
>
  <FieldPopup
    onExpand
    isExpanded
  >
    { ...popup content... }
  </FieldPopup>
</BaseField>
```

### Field Types

4 types of fields with Final-Form adapters:

- TextField,
- DateField,
- DropdownField,
- SearchField

## Examples

### Simple Form

Shows how to use validations, calculations and warning generation together in a simple form with non-styled html input fields.

### Groups

Shows how to split form into separate groups and re-use it.

### Styled Form

Shows how to use `Field` components from UI library with Final Form `Field`.
