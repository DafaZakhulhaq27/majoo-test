const errorResponse = (error) => {
    let errorResponse = error.response
      ? typeof error.response.data.errors == "string"
        ? error.response.data.errors
        : error.response.data.message
        ? error.response.data.message
        :  error.response.data.error 
        ? error.response.data.error 
        : error.response.data.errors[0]
      : error.message ;
  
    return errorResponse;
  };
  
  export default errorResponse;
  