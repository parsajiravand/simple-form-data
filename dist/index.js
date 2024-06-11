export function simpleFormData(body, formDataWithChild) {
    let payload = {
        append: (key, value) => { },
    };
    if (formDataWithChild) {
        //array inside object
        payload = new FormData();
        //get key and value from body
        for (const [key, value] of Object.entries(body)) {
            if (Array.isArray(value)) {
                //if value is array
                //loop through array
                for (let i = 0; i < value.length; i++) {
                    //loop through object
                    for (const [keyChild, valueChild] of Object.entries(value[i])) {
                        //append key and value to payload
                        payload.append(`${key}[${i}].${keyChild}`, valueChild);
                    }
                }
            }
            else {
                //if value is not array
                //append key and value to payload
                payload.append(key, value);
            }
        }
        return payload;
    }
    else {
        //{ label: "logo", value: logo.value }
        payload = new FormData();
        //get key and value from body
        for (const [key, value] of Object.entries(body)) {
            payload.append(key, value);
        }
        return payload;
    }
}
//# sourceMappingURL=index.js.map