# goalie-confirmation
Service that sends updates about confirmed goalies

Requires the following environment variables
`MONGO_URL`, `SCRAPE_URL`, `SLACK_WEBHOOK_URL`

Can be passed via local environment variables and running `envsubst < kube.yml | kubectl apply -f -`
