'use strict';

exports.handler = (event, context, callback) => {
    const request = event.Records[0].cf.request;

    

    const countryToRegion = {
        'US': 'us-east-1',
        'IE': 'eu-west-1',
        'FR': 'eu-west-3',
        'UK': 'eu-west-2',

    };

    if (request.headers['cloudfront-viewer-country']) {
        const countryCode = request.headers['cloudfront-viewer-country'][0].value;
        const region = countryToRegion[countryCode];
        
          
        if (region) {
           
            request.origin.s3.region = region;
            const domainName = `my-bucket-in-${region}.s3.amazonaws.com`;
            request.origin.s3.domainName = domainName;
            request.headers['host'] = [{ key: 'host', value: domainName }];
        }
    }

    callback(null, request);
};