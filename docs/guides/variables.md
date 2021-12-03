# Variables

All values entered in a form are stored in variables and can be displayed and edited with subsequent task forms. In this section you will learn how to display those variables as read only and editable.

## Define form fields as workflow values

In case you are defining form fields via the Online Workflow Modeler, like in the example below, all field IDs are directly stored as workflow variables. If you use those IDs in multiple steps in the workflow model, the content entered in previous steps are displayed automatically.

In case you would like to use workflow variables from a trigger form, there are a few additional steps to do. These steps are described in this tutorial [Tutorial: Create a new BPMN workflow](https://pipeforce.github.io/docs/tutorials/beginner/create-BPMN-workflow) , section 9 and 10.

## Display workflow variables

To display values entered during the workflow in subsequent (task) forms you can just create a field with the identical ID in the Online Workflow Modeler (e.g. taxRate).

![](../img/form-deploy.png)

## Make a variable read-only

Per default, the values are editable. That means a user who is assigned to this task is able to see the entered value and overwrite it. To change it to “read only” you have to follow these steps:

1.  Go to your online BPMN model
    
2.  Change to XML view
    
3.  Add this section below the field you would like to define as “read only” direct in the XML-Editor:
    

```
<camunda:validation>
  <camunda:constraint name="readonly" />
</camunda:validation>
```

Example:

![](../img/img.png)

In this example the field named `f1` is set to read only.
