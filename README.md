# Prg Form

> React Form components for Bulma.css.

There is [API Documentation](http://pragonauts.github.io/prg-form).

## Usage within Form

```javascript

import { Form, Input } from 'prg-form';

<Form
    className="special-class"
    onSubmit={(values, form) => console.log(values)}
    onChange={(input) => console.log(input.name, input.getValue())}
    values={values}
>
    <Input type="email" name="inputName" label="Input Label" />
    <button>Submit</button>
</Form>
```

## Usage without Form

- onchange event is not passed to form

```javascript

import { Input } from 'prg-form';

<Input
    name="inputName"
    label="Input Label"
    value={value}
    onChange={(value, input) => {}}
/>
```

## Basic Form Components

- **<Input>**

  ```javascript
  import { Input } from 'prg-form';

  <Input
      name="inputName"
      label="Input Label"
      type="password"
      maxLength={24}
  />
  ```

- **<Checkbox>**

  ```javascript
  import { Checkbox } from 'prg-form';

  <Checkbox
      name="checkbox"
      defaultValue
  />
  ```

- **<TextArea>**

  ```javascript
  import { TextArea } from 'prg-form';

  <TextArea
      name="inputName"
      readOnly
      cols={30}
      rows={7}
  />
  ```