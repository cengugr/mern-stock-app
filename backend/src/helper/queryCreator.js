import dayjs from "dayjs";

const convertToRegex = (value) => {
    // Escape special characters in the string
    const escapedValue = value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    // Create a case-insensitive regex pattern
    const regexPattern = new RegExp(escapedValue, 'i');
    return regexPattern;
};

const convertToDateRange = (date) => {
    const startDate = dayjs(date).startOf('day'); // Set the time to the start of the day
    const endDate = dayjs(date).endOf('day'); // Set the time to the end of the day
  
    return {
      startDate: startDate.toDate(), 
      endDate: endDate.toDate(),   
    };
  };

  
 exports.convertToQuery = (object) => {
    const query = {};
    Object.keys(object).forEach((key) => {
      const value = object[key];

       if(value){
    //   if (dayjs(value).isValid()) {
    //     const { startDate, endDate } = convertToDateRange(value); 
    //     query[key] = {
    //         $gte: startDate,
    //         $lte: endDate,
    //       };
    //   } else    
      if(key=='deliveryDate' || key=='salesDate'){ 
          const { startDate, endDate } = convertToDateRange(value); 
        query[key] = {
            $gte: startDate,
            $lte: endDate,
          };
        } 
      else
      if (typeof value === 'string') {
        query[key] = convertToRegex(value);
      } else{
        query[key] = value;
      }
    }
    });
    return query;
  };

