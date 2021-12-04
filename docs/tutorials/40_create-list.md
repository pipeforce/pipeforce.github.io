# Tutorial 4: Create a List

**Estimated time:** 15 min.

## Prerequisites

*   PIPEFORCE Enterprise 7.0 or higher.
    
*   You have a valid PIPEFORCE Developer account.
    
*   You have executed tutorial [Tutorial: Create a new app](../tutorials/beginner/create-app).
    
*   You have executed tutorial [Tutorial: Create a new form](../tutorials/beginner/create-form).
    
*   You have already added 3 or more data sets using your form.
    

## 1 - Create your list

Up to this step you already created an app with a new form inside in the previous tutorials. When you submit the form the data of the form will be automatically stored for you in PIPEFORCE, but you cant see it yet. In this step we want to display this data using a list. To do so, follow these steps:

1.  Login to your portal https://YOUR\_NAMESPACE.pipeforce.net.
    
2.  Navigate to LOW CODE → Workbench.
    
3.  Select your app node in the property tree and click the plus icon at the top.
    
4.  The new property view opens:
    
    1.  As a property key use the value `global/app/MY_APP/list/person`. Replace `MY_APP` with the name of the app you created before, for example `myapp24`. **Do use only lower case letters and don’t use special characters or spaces!**
        
    2.  As mime type select `application/json; type=list`.
        
5.  Click SAVE.
    

## 2 - Open your new list

1.  The list property has been created for you and pre-configured using the person schema, you created in the last tutorial. Do not change anything in here.
    
2.  Navigate to `All Apps`
    
3.  Click on your app.
    
4.  Click on “person”
    
5.  You should now see all the person data sets added before using your form:  
    
    ![](../img/grafik-20210720-142349.png)

You can search and sort the list.

**Congrats, you have created your first list!**
