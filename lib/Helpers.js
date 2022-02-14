const filterForOnlyDaily = (data) => {
  const filtered = [];

  for (let i = 0; i < data.length; i++) {
    const date = new Date(data[i].at);

    const lastValid = new Date(filtered[filtered.length - 1]?.at);

    // Assuming that data is already sorted in ascending order
    // First element will be the first element in sorted list
    if (
      filtered.length === 0 ||
      // This will validate the same month
      (date.getHours() > 12 && date.getDate() !== lastValid.getDate()) ||
      // If there is month gap in data -> 03-29 == 04-29 we need to validate if months differs
      (date.getHours() > 12 && date.getDate() === lastValid.getDate() && date.getMonth() > lastValid.getMonth()) ||
      // If there is year gap in data -> 2022-03-29 == 2023-04-29 we need to validate if years differs
      (date.getHours() > 12 && date.getDate() === lastValid.getDate() && date.getMonth() === lastValid.getMonth() && date.getFullYear() > lastValid.getFullYear())
    ) {
      filtered.push(data[i]);
    }
  }

  return filtered;
};

module.exports = {
  filterForOnlyDaily,
};
