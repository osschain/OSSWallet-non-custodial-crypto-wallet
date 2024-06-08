export function unixTimestampToDate(unixTimestamp: string | number, format = 'DD-MM-YYYY HH:mm:ss') {
    const date = new Date(Number(unixTimestamp) * 1000);

    const year = date.getFullYear().toString();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const seconds = ('0' + date.getSeconds()).slice(-2);

    // Replace format placeholders with actual date components
    const formattedDate = format
        .replace('YYYY', year)
        .replace('MM', month)
        .replace('DD', day)
        .replace('HH', hours)
        .replace('mm', minutes)
        .replace('ss', seconds);

    return formattedDate;
}