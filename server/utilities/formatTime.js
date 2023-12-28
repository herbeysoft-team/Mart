const formatTime = (time) => {
    // Parsing the input strings to get hour and minute values
    const tm = time.split(':').map(Number);
    
    // Formatting the time into 'am' or 'pm' format
    const formatAmPm = (hour, minute) => {
      const period = hour >= 12 ? 'pm' : 'am';
      const displayHour = hour % 12 || 12; // Convert 0 to 12
      return `${displayHour}:${minute < 10 ? '0' : ''}${minute}${period}`;
    };
  
    // Creating the formatted time strings
    const formattedTime = formatAmPm(tm[0], tm[1]);

  
    return `${formattedTime}`;
  };

  module.exports = formatTime