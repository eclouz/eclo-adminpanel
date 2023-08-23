export function formatDate(date: Date): string {
    const dateObject = new Date(date);

    const year = dateObject.getFullYear();
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
    const day = dateObject.getDate().toString().padStart(2, '0');

    let hours = dateObject.getHours();
    const minutes = dateObject.getMinutes().toString().padStart(2, '0');

    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;

    return `${day}.${month}.${year} ${hours}:${minutes} ${ampm}`;
}