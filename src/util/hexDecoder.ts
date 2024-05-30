export const hexDecoder = (hexValue: string) => {
    // Step 1: Convert hexadecimal to decimal
    const decimalValue = parseInt(hexValue, 16);

    // Step 2: Convert wei to ether
    const weiToEtherConversion = 10 ** 18;
    const etherValue = decimalValue / weiToEtherConversion;

    return etherValue;
}