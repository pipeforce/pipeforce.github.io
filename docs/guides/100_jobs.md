# 10. Jobs

Sometimes it is necessary that you trigger the commands in your pipeline after a certain time interval. For this you can
use the concept of pipeline jobs in PIPEFORCE.

## Creating a Pipeline Job

To register a pipeline job, you can use the [job](../api/commands#job-v1) command.

Let's assume you have a pipeline like the one below which sends an email with current date and time:

```yaml
pipeline:

  - mail.send:
      to: "user@company.tld"
      subject: "Reminder"
      message: "Hello, it's #{@date.nowIso8601()}"
```

In case you would like to send this email every 2 minutes, you simply need to add the job command at the very beginning:

```yaml
pipeline:

  - job:
      schedule: "EVERY_2_MIN"

  - mail.send:
      to: "user@company.tld"
      subject: "Reminder"
      message: "Hello, it's #{@date.nowIso8601()}"
```

As soon as you save this pipeline in the property store, a new job will be scheduled which runs every 2 minutes and
executes any command below.

:::info
- The job command must be the very first command in the pipeline.
- It's not allowed to have more than one such command per pipeline.
:::

:::caution 
Whenever you delete a pipeline with a `job` command in it, the according job will be deleted. The same is
true in case you remove the `job` command from the pipeline. In case you rename the pipeline or change parameters of the
command, the pipeline job will be replaced by a new one. So make sure to change such a pipeline only in development
mode, never in production.
:::

## Schedules

### Fixed schedules

There are different fixed schedules available:

- `EVERY_2_MIN` - Runs every 2 minutes (Enterprise hosting only).
- `EVERY_5_MIN` - Runs every 5 minutes (Enterprise hosting only).
- `EVERY_15_MIN` - Runs every 15 minutes.
- `EVERY_30_MIN` - Runs every 30 minutes.
- `EVERY_45_MIN` - Runs every 45 minutes.
- `HOURLY` - Runs at every full hour initially starting at a random minute.
- `DAILY` - Runs every day at the very morning on a random time between 2AM and 4AM.
- `WEEKLY` - Runs weekly at a random day and on a random time between 2AM and 4AM.
- `MONTHLY` - Runs monthly at a random day and on a random time between 2AM and 4AM.

Example:

```yaml
pipeline:
  - job:
     schedule: "HOURLY"

  # The commands, the job must execute go here...
```

:::info
Since too many jobs can slow down your system drastically, make sure your jobs are well-designed
and run in a minimal amount of time. There are some limits for jobs:

 - Max. of 20 jobs is allowed to be registered per namespace.
 - The max. execution time per job is 2 min. All jobs running longer will be cancelled by the system if required.
:::

In case you need to increase those limits, please ask the PIPEFORCE support (in case you're using the hosted version) or you can write a microservice for this.

### Dynamic schedules

Dynamic triggers, also known as cron expressions, are not enabled by default.

Since they can slow down the system drastically and therefore need to be managed carefully, you
have to enable this kind of triggers separately by asking the PIPEFORCE support in case you're
using the hosted version of PIPEFORCE. 

## List registered Pipeline Jobs

In order to monitor the registered pipeline jobs, you can use the command [job.list](../api/commands#joblist-v1). This will
return a JSON with information about all currently registered pipeline jobs. Such a result can look like this:

```json
[
	{
		"pipelineKey": "/pipeforce/namespace/global/app/myapp/pipeline/somejob",
		"cron": "4 */2 * * * ?",
		"schedule": "EVERY_2_MIN", 
        "lastRun": "2022-05-07T06:26:04.022Z", 
        "lastDuration": "00:00:00.021",
		"created": "2022-05-07T06:24:16.745Z",
		"running": true
	}
]
``` 

:::info
Only Pipeline Jobs are shown here and no system-internally jobs.
:::

 - `pipelineKey` = The property path of the pipeline which will be executed.
 - `cron` = The cron expression automatically calculated by the system.
 - `schedule` = The input schedule.
 - `lastRun` = The time when this job was last executed in ISO-8061 format.
 - `lastDuration` = The time, the last job execution took in the format `HH:mm:ss.SSS`.
 - `created` = The time when this job was created in ISO-8061 format.
 - `running` = In case the job is currently actively running. If false, the job is registered, but paused.

In case you would like to get information about a single job, you can use the [job.status](../api/commands#jobstatus-v1) command instead.

## Report an Issue
:::tip Your help is needed!
In case you're missing something on this page, you found an error or you have an idea for improvement, please [click here to create a new issue](https://github.com/pipeforce/pipeforce.github.io/issues/new). Another way to contribute is, to click **Edit this page** below and directly add your changes in GitHub. Many thanks for your contribution in order to improve PIPEFORCE!
:::