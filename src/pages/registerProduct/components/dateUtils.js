const formatDateRelease = (date) => {
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
};

const formatDateReleaseFetch = (date) => {
    if (!date) return '';
    const [day, month, year] = date.split('/');
    return `${year}-${month}-${day}`;
};

export {
    formatDateRelease,
    formatDateReleaseFetch
};