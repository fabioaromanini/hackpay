# Hackpay Backend

Node.js express aplication, configured for continuous integration/deploy on a Elastic Beanstalk environemnt, using Travis as ci tool.
In order to run this application, some enviroment variables are required:

- API_GW_URL_BASE (zoop api)
- API_PUBLISHABLE_KEY (zoop key)
- MARKETPLACE_ID (zoop id)
- REGION (aws region)
- USERS_TABLE (aws dynamodb table)
- WAVY_ACCESS_KEY (wavy key)
- WAVY_URL (wavy api)
