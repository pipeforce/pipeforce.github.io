# App Testing

## App Testing - What is it?

In any system, testing workflows and integrations is a very complex task because of many states, data conversions and different interfaces involved.

PIPEFORCE has many toolings and best practises to simplify testing.

## Testing JavaScript

You can test your JavaScript scripts located inside `global/app/youapp/script` by creating a function starting with name `test`. Inside this method you can define your test asserts. In case such a test assert has been failed, throw an exception. 

:::note Best Practise
It's good practise to embed the test method directly inside the origin JavaScript source under test. This makes it easier to test and debug using your local development environment as well as to run the test remote.
:::

Example:

```javascript
function helloWorld() {

    return "Hello World!";
}

function testHelloWorld() {

    // Your test goes here...

    var result = helloWorld();
    if(result != "Hello World!") {
        throw "Expected 'Hello World!' but was: " + result;
    }
}
```

## Testing Pipelines

In order to test pipelines, it is best practise to create a JavaScript inside the `global/app/yourapp/test` folder which has the same name as the pipeline but ends with `.test.pi.js`:

 - `myapp`
   - `pipeline`
     - `my-pipeline`
   - `test`
     - `my-pipeline.test.pi.js`

Inside the test script you can load and mock commands of a pipeline like this:

```javascript
function testPipeline() {

    var test = pipeforce.createPipelineTest();
    test.setPipelineFromPath("uri:property:global/app/myapp/pipeline/my-pipeline");

    test.mockCommand("event.listen")
      .thenSetBody("...")
      
    // More mocking here...
    
    // Execute the pipeline
    var resultMessage = test.run();
    var resultBody = resultMessage.body;
    
    // Verify the result here...
}
```

Inside the test script you will have access to the implicit object `pipeforce`. Using this object you can create a new instance of a pipeline test. Such a test instance contains plenty of useful test methods:

### mockCommand(commandName)   
Replaces the real command in the pipeline with a mock version.

#### Returns  
``test`` - The test instance.

#### Parameters  
Name | Type | Description
--- | --- | ---
commandName | ``string`` | The name of the command to mock.

### run()   
Runs the pipeline with mocked commands.

#### Returns  
``message`` - The resulting pipeline message after the execution of the pipeline under test.

### setPipelineFromPath(uri)   
Defines the path to the pipeline script to be loaded for this test.

#### Returns  
``test`` - The test instance.

#### Parameters  
Name | Type | Description
--- | --- | ---
uri | ``string`` | The uri to the pipeline script.

### thenSetBody(value)   
A value or Pipeline Expression to be set on the body in case this mock applies.

#### Returns  
``test`` - The test instance.

#### Parameters  
Name | Type | Description
--- | --- | ---
value | ``any`` | The value or Pipeline Expression to be set as body.

### thenSetHeader(name, value)   
A value or Pipeline Expression to be set as header in case this mock applies.

#### Returns  
``test`` - The test instance.

#### Parameters  
Name | Type | Description
--- | --- | ---
name | ``string`` | The name of the header to set.
value | ``any`` | The value or Pipeline Expression to be set as header.

### thenSetVar(name, value)   
A value or Pipeline Expression to be set as variable in case this mock applies.

#### Returns  
``test`` - The test instance.

#### Parameters  
Name | Type | Description
--- | --- | ---
name | ``string`` | The name of the variable to set.
value | ``any`` | The value or Pipeline Expression to be set as var.

### when(condition)   
A condition as Pipeline Expression to define when a command must be mocked. For example only it has a certain `id` or parameter given.

#### Returns  
``test`` - The test instance.

#### Parameters  
Name | Type | Description
--- | --- | ---
condition | ``string`` | The condition as Pipeline Expression.

## Executing tests

You have multiple options to run tests stored in PIPEFORCE.

### Using a command

You can use the [`test.run`](../../../docs/api/commands#testrun-v1) command to run the tests:

```yaml
pipeline:
  - test.run
```

### Using the CLI

In order to execute a test run using the CLI use this line in your terminal:

```
pi command test.run
```

### Test Run Report

When executing via CLI or command, the result will always be a test run report in JSON format which has a structure similar to this example:

```json
{
  "testUnits": [
    
    {
      "location": "/path/to/the/test/mytestscript",
      "type": "js",
      "unitResult": "FAILED"
      "tests": [
        {
          "testResult": "PASSED",
          "testName": "testMethodName1",
          "testStartLine": lineNumberOfTestMethod,
          "testDuration": {
            "startTime": "2021-12-26T06:19:35.899Z",
            "timeElapsed": "00:00:00.049",
            "timeElapsedInMs": 49,
            "startTimeInMs": 1640499575899
          },
          exception: null
        },
        {
          "testResult": "FAILED",
          "testName": "testMethodName2",
          "testStartLine": lineNumberOfTestMethod,
          "testDuration": {
            "startTime": "2021-12-26T06:19:35.899Z",
            "timeElapsed": "00:00:00.445",
            "timeElapsedInMs": 445,
            "startTimeInMs": 1640499575900
          },
          "exception": "Assert failed foo bar."
        }
      ],
      "unitSummary": {
        "total": 2,
        "passed": 1,
        "failed": 1, 
        "error": 0,
        "ignored": 0
      },
      "unitDuration": {
        "startTime": "2021-12-26T06:19:35.899Z",
        "timeElapsed": "00:00:00.049",
        "timeElapsedInMs": 49,
        "startTimeInMs": 1640499575899
      },
    }
    
    ...
  ],
  
  "locationPatterns": ["globa/app/*/script/*"],
  "overallSummary": {
    "total": 10,
    "passed": 7,
    "failed": 2, 
    "error": 0,
    "ignored": 1
  },
  "overallDuration": {
    "startTime": "2021-12-26T06:19:35.899Z",
    "timeElapsed": "00:00:00.445",
    "timeElapsedInMs": 445,
    "startTimeInMs": 1640499575900
  },
  "overallResult": "FAILED"
}
```

- `testUnits` = An array of all test units (= test scripts)
- `location` = The location of the test script in the property editor.
- `type` = The script type. Is usually always js = JavaScript.
- `unitResult` = The final result of the test unit (= `PASSED` if all passed, `FAILED` if at least one has been failed). One of `PASSED`, `FAILED`, `ERROR` or `IGNORED`.
  - `tests` = An array containing all tests found in the location script and their result.
    - `testResult` = The test result. One of 
      - `PASSED` = Test run was successful.
      - `FAILED` = Test run was not successful because of an assert has been failed.
      - `ERROR` = Test run was not successful because an exception has been thrown.
      - `IGNORED` = The test was not executed because if was marked as ignore.
    - `testName` = The name of the test (method) inside the test script.
    - `testStartLine` = The line number where the test (method) is located or null in case it could not be detected.
    - `testDuration` = Start time and duration information of the test run.
    - `exception` = The exception message in case of FAILED or ERROR. This value is null in any other cases.
  - `unitSummary` = A summary of all tests of this unit.
  - `unitDuration` = Start time and duration information of all tests in this unit
- `locationpatterns` = The patterns passed to the test.run command.
- `overallSummary` = A summary of all tests.
- `overallDuration` = Start time and duration information of the overall test run.
- `overallResult` = The final result of the full test run. One of `PASSED`, `FAILED`, `ERROR`, `IGNORED` or `NO_TESTS`.


### Online Test Console

You can run all of your remote tests also online using the Test Console. To do so, login to PIPEFORCE with your developer account and then in the `LOW CODE` section click on `Test Console` and then `Run Tests`. The test result is finally shown as a test report like this example shows:

![](../../img/test-console.png)