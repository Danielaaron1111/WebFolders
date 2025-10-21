# CPSC1520 -- JavaScript 4 Exercise: Making Decisions and Forms

> *Do **not** edit this file! If there are any changes/corrections that your instructor offers for this assignment, they will inform you and may make direct changes to this file.*

## Introduction

Validation of forms is everywhere when you create a JavaScript
application and a web application in general. You want to ensure that
you're getting correct and valid information from your users so that you
can (for us in the future) save this information.

## Exercise Step 1 -- Adding a new Item to our Order

1.  Link your JavaScript file in the HTML; do not change any HTML
    otherwise.

2.  Select the form with the id `new-order-form`.

3.  Add an event listener on the form that will handle the `submit`
    event.

4.  Using the `event` object, prevent the default action from happening.

5.  Assign the form elements using the `elements` property on the
    `event.target` to variables with appropriate names.

6.  Pass the form input **values** to the `addOrderItem` function given.

    a.  If you're ever confused about a specific variable, you can
        always use the console to print out the variables. The output
        should look something like this once you click the "Add to
        Order" button:\
        ![A screenshot of a computer Description automatically generated
        with medium
        confidence](media/image1.png)

## Exercise Step 2 -- Validating Elements of the Form

1.  There's a bug in our application. We get a blank row to our order if
    we submit our form with nothing in it. We only want populated rows
    because that is what we expect in our application.![A screenshot of
    a computer Description automatically generated with medium
    confidence](media/image2.png)

2.  Create a variable named `isFormValid` that will be assigned a
    Boolean value. Using this variable you will either execute or not execute
    the `addOrderItem` function with the values from the form.

3.  In the following steps, use the `isFormValid` with the validation
    functions `isValueNotEmpty` and `isGreaterThanFive`.

4.  Validate the **order item name**.

    a.  If the order item name is **not** an empty string, then the item
        name is **valid**. 
        
        i.  Remove the "is-invalid" class on the order item name using
            the element's "classList.remove" function.

    b.  If the order item name is an empty string, then the item name is
        **invalid**.

        i.  Remove the "is-invalid" class on the order item name using
            the elements' "classList.add" function.

        ii. Set "isFormValid" to false.

5.  Validate the **order item price**.

    a.  If the order item price is **not** an empty string, and if it's
        **greater than five** then the item price is **valid**.

        i.  Remove the "is-invalid" class on the order item price using
            the element's "classList.remove" function.

    b.  If the order item price is an **empty** string, or if the price is
        **less than five** then the item price is invalid.

        i.  Remove the "is-invalid" class on the order item name using
            the element's "classList.add" function.

        ii. Set "isFormValid" to false.

6.  Validate the order size.

    a.  If the order size is *not* an empty string, then it's **valid**.

        i.  Remove the "is-invalid" class on the order item size using
            the element's "classList.remove" function.

    b.  If the order size is an empty string, then it's **invalid**.

        i.  Remove the "is-invalid" class on the order item size using
            the element's "classList.add" function.

        ii. Set "isFormValid" to false.

7.  Execute the `addOrderItem` function only if `isFormValid` is true.

8.  You will **reset** the values of each input on a **successful** form
    submission.

9.  The functionality should look like the following result.

    a.  Successful result\
        ![A screenshot of a computer Description automatically generated
        with medium
        confidence](media/image3.png)

    b.  Invalid result with all of the inputs invalid.\
        ![A screenshot of a computer Description automatically generated
        with medium
        confidence](media/image4.png)

### Test Cases

You might need clarification and need to know what values to test; here are some examples to help you out.

-   test case: form invalid

    -   Item Name: Burger

    -   Price:

    -   Size:

-   test case: form invalid

    -   Item Name:

    -   Price: 18

    -   Size:

-   test case: form invalid

    -   Item Name: pop

    -   Price: 4

    -   Size: small

-   test case: form invalid

    -   Item Name:

    -   Price:

    -   Size: Small

-   Test case: valid form

    -   Item Name: pop

    -   Price: 6

    -   Size: small

----

## Grading

This Lab is graded out of **5** marks:

| Grade  |  Criteria |
|---|---|
|  5 |  All requirements satisfied, Code Quality follows class standards  |
|  4 | All requirements satisfied, Code Quality could be improved  |
|  3 |  Most requirements satisfied |
|  2 |  Some requirements satisfied  |
|  1 |  Made a reasonable attempt but no requirements satisfied  |
|  0 | Did not attend the in class lab |

**You can use the automated tests as a guide to help you verify that your solution meets all the requirements. To run the tests simply push your solution to Github and look for the results in the feedback pull request.**
