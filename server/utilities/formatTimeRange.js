const formatTimeRange = (fromTime, toTime) => {
    // Parsing the input strings to get hour and minute values
    const from = fromTime.split(':').map(Number);
    const to = toTime.split(':').map(Number);
  
    // Formatting the time into 'am' or 'pm' format
    const formatAmPm = (hour, minute) => {
      const period = hour >= 12 ? 'pm' : 'am';
      const displayHour = hour % 12 || 12; // Convert 0 to 12
      return `${displayHour}:${minute < 10 ? '0' : ''}${minute}${period}`;
    };
  
    // Creating the formatted time strings
    const formattedFrom = formatAmPm(from[0], from[1]);
    const formattedTo = formatAmPm(to[0], to[1]);
  
    return `${formattedFrom} - ${formattedTo}`;
  };

  module.exports = formatTimeRange;