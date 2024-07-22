import crypto from 'crypto';


export const handler = async (event) => {
    console.log(event);
  
    let hash;
    try {
        hash = crypto.createHash('md5').update(event.value).digest('hex');
        console.log(hash);
    } catch (error) {
        return {
            statusCode: 400,
            body: JSON.stringify({
                message: 'Invalid input format. Unable to parse input string.',
                error: error.message
            })
        };
    }

    // Prepare the data to be sent
    const data = {
        banner: "B00981520",
        result: hash,
        arn: "arn:aws:lambda:us-east-1:835573539094:function:md5-lambda",
        action: "md5",
        value: event.value
    };
    console.log(data)
    
    // URL to which the data will be sent (specify your URL here)
    const url = event.course_uri;

    // Send the data using fetch API
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        console.log('Data sent successfully');
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'Error sending data to the specified URL',
                error: error.message
            })
        };
    }

    // Return a successful response
    return {
        statusCode: 200,
        body: JSON.stringify('Hello md5 Lambda!'),
    };
};
