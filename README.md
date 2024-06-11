# simple-form-data

This package provides a utility function `simpleFormData` for converting a JavaScript object into `FormData` format, which is especially useful when the content type is `"multipart/form-data"`. This utility can be used directly in the `body` of a `fetch` request.

## Installation

To install the package, use npm:

```sh
npm install simple-form-data
```

## Usage

### `simpleFormData`

The `simpleFormData` function takes an object and converts it into a `FormData` instance. This is useful when you need to send form data, including nested objects and arrays, using a `fetch` request.

#### Parameters

- `body`: The object to be converted into `FormData`.
- `formDataWithChild` (optional): A boolean indicating whether the `body` contains nested arrays or not. Default is `false`.

#### Returns

- A `FormData` instance with the provided key-value pairs.

### Simple Example Without Nested Arrays

If your body object does not contain nested arrays, you can use simpleFormData with the default formDataWithChild parameter set to false (or omit it entirely).

```javascript
import { simpleFormData } from "simple-form-data";

const body = {
  name: "John Doe",
  email: "john.doe@example.com",
  profilePicture: new File(["content"], "profile.jpg"),
};

const formData = simpleFormData(body);

fetch("https://example.com/api/update-profile", {
  method: "POST", // or any method you want
  body: formData,
})
  .then((response) => {
    // handle response
  })
  .catch((error) => {
    // handle error
  });
```

### Example (Array with children)

Here's an example of how to use `simpleFormData` in a `fetch` request:

```javascript
import { simpleFormData } from "simple-form-data";

const body = {
  id: 1,
  publicFiles: [
    { fieldId: 1, file: new File(["content"], "example1.txt") },
    { fieldId: 9, file: new File(["content"], "example2.txt") },
  ],
  privateFiles: [
    { fieldId: 12, file: new File(["content"], "example3.txt") },
    { fieldId: 13, file: new File(["content"], "example4.txt") },
  ],
};

const formData = simpleFormData(body, true);

fetch("https://example.com/api/upload", {
  method: "POST", // or any method you want
  headers: {
    "Content-Type": "multipart/form-data",
    // Another headers options
  },
  body: formData,
})
  .then((response) => {
    // handle response
  })
  .catch((error) => {
    // handle error
  });
```

### Changes and Improvements

- **No Need to Manually Create `FormData`**: The function automatically creates a `FormData` instance, removing the need for the user to manually instantiate it.
- **Simplified Looping**: The function uses a single `for` loop to iterate through the entries of the `body` object, and a helper function `appendToFormData` to handle nested objects and arrays. This reduces the complexity and improves readability.
- **Handles Various Data Types**: The function now correctly handles `File` objects, nested objects, and other data types, ensuring all types are appended correctly to the `FormData`.

This highlights the enhancements made to the `simpleFormData` function, making it more efficient, easier to use, and capable of handling a wider range of data types and structures.

## License

This package is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more information.

Please note that this is a basic README.md template, and you may need to modify it further to match your specific package and requirements
