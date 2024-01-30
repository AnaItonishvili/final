const formatDate = (date) => {
    const newDate = new Date(date);
    const options = {
        weekday: "long",
        day: "numeric",
        month: "short",
        year: "numeric",
    };
    return newDate.toLocaleString("en-US", options);
};

export default formatDate;