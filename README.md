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

- **<File>**

    Is nice, because it works with native `<File>` objects.

    ```javascript
    import { File } from 'prg-form';

    // as array of files
    <File
        name="files[]"
        multiple
    />

    <File
        name="file"
    />
    ```

## Advanced using the file upload

```javascript
import { File, ValidatorForm, flat } from 'prg-form';
import Validator from 'prg-validator';

export default function Component ({ onSendSuccess, onSendError }) {
    const validator = new Validator();

    validator.add('file')
        .isFileMaxLength('shlould be smaller then 1Mb', '1m')
        .isFileMime('Should be an excel file', [
            'application/vnd.ms-excel',
            'application/msexcel',
            'application/x-msexcel',
            'application/x-ms-excel',
            'application/x-excel',
            'application/x-dos_ms_excel',
            'application/xls',
            'application/x-xls',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        ])
        .toFileData();

    const onSubmit = (formData) => {
        const data = new FormData();

        const flatData = flat(formData);

        Object.keys(flatData)
            .forEach((key) => {
                data.append(key, flatData[key]);
            });

        this.request = $.ajax({
            method: 'POST',
            url: '/api/upload',
            dataType: 'json',   // JSON Response
            processData: false, // Don't process the files
            contentType: false, // Automatic content type
            data,
            success: responseData => onSendSuccess(responseData),
            error: jqXHR => onSendError(jqXHR)
        });
    };

    return (<div className="container">
        <ValidatorForm
            validator={validator}
            onSubmit={data => onSubmit(data)}
        >
            <File
                name="file"
                label="Please put the Excel file here"
            />
            <button className="button">Go</button>
        </ValidatorForm>
    </div>);
}

```