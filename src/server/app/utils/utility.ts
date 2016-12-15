// Function to check a string against a REGEX for email validity

export function validateEmail(email: string) {
    let re = {
        email: {
            complex: {
                // Complex Javascript Regex (ASCII Only)
                // https://regex101.com/r/dZ6zE6/1#
                ascii: /^(?=[A-Za-z0-9][A-Za-z0-9@._%+-]{5,253}$)[A-Za-z0-9._%+-]{1,64}@(?:(?=[A-Za-z0-9-]{1,63}\.)[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*\.){1,8}[A-Za-z]{2,63}$/g,
                // Complex Javascript Regex (With Non ASCII Support)
                // https://regex101.com/r/sF6jE4/1
                nonascii: /^(?=([A-Za-z0-9]|[^\x00-\x7F])([A-Za-z0-9@._%+-]|[^\x00-\x7F]){5,253}$)([A-Za-z0-9._%+-]|[^\x00-\x7F]){1,64}@(?:(?=([A-Za-z0-9-]|[^\x00-\x7F]){1,63}\.)([A-Za-z0-9]|[^\x00-\x7F])+(?:-([A-Za-z0-9]|[^\x00-\x7F])+)*\.){1,8}([A-Za-z]|[^\x00-\x7F]){2,63}$/g
            },
            simple: {
                // Simple 'Good Enough' Javascript Regex (ASCII Only)
                // https://regex101.com/r/aI9yY6/1
                ascii: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,63}$/g,
                // Simple 'Good Enough' Javascript Regex (With Non ASCII Support)
                // https://regex101.com/r/hM7lN3/1
                nonascii: /^([a-zA-Z0-9._%+-]|[^\x00-\x7F])+?@([a-zA-Z0-9.-]|[^\x00-\x7F])+\.([a-zA-Z]|[^\x00-\x7F]){2,63}$/g
            }
        }
    };
    // Test the passed in `email` against the specified result and return the
    // result
    return re.email.complex.nonascii.test(email);
};


// Helper function to validate string length
export function checkLength(input: string, min: number, max: number) {
    console.log(input);
    // If the string is outside the passed in bounds...
    if (input.length > max || input.length < min)
        return false;

    else
        return true;
};