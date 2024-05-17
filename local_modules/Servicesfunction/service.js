function calculateAverage(services, priceType) {
  // Create an object to store services grouped by name
  const groupedServices = {};

  // Group services by name
  services.forEach((service) => {
    service.forEach((item) => {
      if (!groupedServices[item.name]) {
        groupedServices[item.name] = [];
      }
      groupedServices[item.name].push(item[priceType]);
    });
  });

  // Calculate average for each group
  const averages = {};
  Object.keys(groupedServices).forEach((name) => {
    const total = groupedServices[name].reduce((acc, val) => acc + val, 0);
    const average = total / groupedServices[name].length;
    name = capitalizeFirstLetter(name);
    averages[name] = Math.round(average); // Adjust the number of decimal places as needed
  });
  console.log(averages);
  return averages;
}
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
module.exports = { calculateAverage };
