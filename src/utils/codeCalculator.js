export function customAddMultiple(...inputs) {
    if (inputs.length === 0) return '';

    const charset = "123456789ABCDEFGHIJKLMNPQRSTUVWXYZ"; // Base34 1-9 A-Z without O
    const baseValue = charset.length;

    const charToIndex = {};
    const indexToChar = {};

    for (let i = 0; i < charset.length; i++) {
        charToIndex[charset[i]] = i;
        indexToChar[i] = charset[i];
    }
    charToIndex['1'] = 0; // 1 = 0

    const maxLength = Math.max(...inputs.map(s => s.length));
    const padded = inputs.map(s => s.padStart(maxLength, '1'));

    let carry = 0;
    let result = '';

    for (let i = maxLength - 1; i >= 0; i--) {
        let sum = carry;
        for (const str of padded) {
            sum += charToIndex[str[i]] || 0; // Treat empty or invalid chars as 0
        }
        const digit = sum % baseValue;
        carry = Math.floor(sum / baseValue);
        result = indexToChar[digit] + result;
    }

    while (carry > 0) {
        const digit = carry % baseValue;
        carry = Math.floor(carry / baseValue);
        result = indexToChar[digit] + result;
    }

    return result;
}
