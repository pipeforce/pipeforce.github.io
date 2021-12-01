# Gateways

A gateway in BPMN is a branch of the workflow. Depending on a condition, the flow of the process can branch into different directions.

# Where to define gateways conditions

In this example, depending on whether the supervisor has approved or declined the vacation request, the workflow should execute the “Send declined email” or the “Send approved email” task. For this, we need to define rules on the gateway edges:

1.  To define the rule for the decline gateway, select the **declined** edge of the gateway and fill-in this condition: `${vacationApproved == false}`:  
    
    ![](https://logabit.atlassian.net/wiki/download/attachments/2151288607/grafik-20210727-131453.png?api=v2)
2.  This makes sure that this branch is executed in case the supervisor set `vacationApproved` to false in the task form.
    
3.  Repeat these steps for the task “Send approved email” and set the condition to  
    `${vacationApproved == true}`.
    
4.  Click `SAVE` to save the current state of the BPMN workflow.
    

# How to design gateways

The gateway design is defined by a specific expression language named _JUEL_. Below you will find the most important operators are:

*   **Arithmetic**: `+`, `-` (binary), `*`, `/` and `div`, `%` and `mod`, `-` (unary)
    
*   **Logical**: `and`, `&&`, `or`, `||`, `not`, `!`
    
*   **Relational**: `==`, `eq`, `!=`, `ne`, `<`, `lt`, `>`, `gt`, `<=`, `ge`, `>=`, `le`. Comparisons can be made against other values, or against boolean, string, integer, or floating point literals.
    
*   **Empty**: The `empty` operator is a prefix operation that can be used to determine whether a value is `null` or empty.
    
*   **Conditional**: `A ? B : C`. Evaluate `B` or `C`, depending on the result of the evaluation of `A`.
    

For more details see [https://docs.oracle.com/javaee/5/tutorial/doc/bnahq.html](https://docs.oracle.com/javaee/5/tutorial/doc/bnahq.html)

# Examples of gateway conditions

## Condition for dropdown

*   Condition refers to a field named “decision”
    
*   Field provides a dropdown list for user (Approve, Decline, Delegate)  
    
    ![](https://logabit.atlassian.net/wiki/download/attachments/2151288607/image-20211026-042805.png?api=v2)
*   Gateway should represent the “Approve” selection
    
*   Condition looks like this:
    
    ![](https://logabit.atlassian.net/wiki/download/attachments/2151288607/image-20211026-043538.png?api=v2)

## Condition for checkbox

*   Condition refers to a field named “checked”
    
*   Field provides a checkbox  
    
    ![](https://logabit.atlassian.net/wiki/download/attachments/2151288607/image-20211026-050043.png?api=v2)
*   Gateway should represent the situation that the checkbox is ticked
    
*   Condition looks like this:  
    
    ![](https://logabit.atlassian.net/wiki/download/attachments/2151288607/image-20211026-044236.png?api=v2)

${ checked } works also. Similar ${ !checked } can be use in place of ${ checked == false }

## Condition for value

*   Condition refers to a field named “Kosten”  
    
    ![](https://logabit.atlassian.net/wiki/download/attachments/2151288607/image-20211026-050320.png?api=v2)
*   Field provides the option to type in numbers
    
*   Gateway should represent the situation that the value is > 100 but < 1000
    
*   Condition looks like this:  
    
    ![](https://logabit.atlassian.net/wiki/download/attachments/2151288607/image-20211026-050440.png?api=v2)

## Multiple conditions

*   Condition refers to the fields “decision” and “checked”
    
*   Field “decision” provides a dropdown list for user (Approve, Decline, Delegate)
    
*   Field “checked” provides a checkbox
    
*   Gateway should represent the situation that:
    
    *   “Approved” is selected from dropdown
        
    *   Tick is set for “checked”
        
*   Condition looks like this:  
    
    ![](https://logabit.atlassian.net/wiki/download/attachments/2151288607/image-20211026-045846.png?api=v2)
