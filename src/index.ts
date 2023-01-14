interface Env {
	ENVIRONMENT: string;
	AWS_ACCESS_KEY_ID: string;
	AWS_SECRET_ACCESS_KEY: string;
	LAMBDA_FUNCTION_URL: string;
}

import { AwsClient } from 'aws4fetch'

export default {
	async fetch(request: Request, env: Env) {
		// Assuming you follow this guide:
		// https://docs.aws.amazon.com/lambda/latest/dg/urls-tutorial.html

		// Create a blank IAM user with no roles, then run:
		/*
		aws lambda add-permission \
			--function-name my-url-function \
			--action lambda:InvokeFunctionUrl \
			--principal arn:aws:iam::123456789012:user/your-empty-iam-user \
			--function-url-auth-type "AWS_IAM" \
			--statement-id example0-cross-account-statement
		*/

		// For dev testing, create a file called `.dev.vars` with the following:
		/*
		AWS_ACCESS_KEY_ID = "your_key_id_here"
		AWS_SECRET_ACCESS_KEY = "your_access_key_here"
		LAMBDA_FUNCTION_URL = "https://your_url_here.lambda-url.your-aws-region.on.aws/"
		*/

		const aws = new AwsClient({ accessKeyId: env.AWS_ACCESS_KEY_ID, secretAccessKey: env.AWS_SECRET_ACCESS_KEY, service: "lambda" });

		const submit_body = {
			num1: 10,
			num2: 10
		}

		const lambdaResponse = await aws.fetch(env.LAMBDA_FUNCTION_URL, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(submit_body),
		})

		return lambdaResponse;
	},
};