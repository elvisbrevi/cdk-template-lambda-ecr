"use-strict"
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { IRepository } from 'aws-cdk-lib/aws-ecr';
import { ServiceHelper } from './service-helper';
import { SqsEventSource } from 'aws-cdk-lib/aws-lambda-event-sources';
import { IQueue } from 'aws-cdk-lib/aws-sqs';

export class LambdaHelper extends ServiceHelper {
    
    public CreateFunctionFromEcr(
        repository: IRepository, name: string, stageName: string) : lambda.IFunction {
        return new lambda.DockerImageFunction(this.construct, name, {
            code: lambda.DockerImageCode.fromEcr(repository),
            functionName: name,
            environment: { stageName: stageName }
        });
    }

    public AddEventSource(fn: lambda.IFunction, queue: IQueue) {
        const eventSource = new SqsEventSource(queue);
        fn.addEventSource(eventSource);
    }
}
