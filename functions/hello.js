exports.handler = async (event, context) => {
    console.log(event, context);
    return {
      statusCode: 200,
      body: "Hello, World"
    };
  };