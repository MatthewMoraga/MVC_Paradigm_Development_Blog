module.exports = {
    format_date: (date) => {
        const d = new Date(date);
        const dateFormat = `${d.getMonth() +1}/${d.getDate()}/${d.getFullYear()}`;
        const hours = d.getHours().toString().padStart(2, "0");
        const minutes = d.getMinutes().toString().padStart(2, "0");
        const timeFormat = `${hours}:${minutes}`;

        return `${dateFormat} At ${timeFormat}`
    }
}