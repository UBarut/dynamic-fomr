# Dynamic Form

In the project, which currently has two types of dynamic control structure in form control, it is aimed to present various variations visually.You can easily shape your form with the parameters you use.

```bash
forms.formValidation({parameters});
```

The project is still under development. [The link](https://codepen.io/ubarut/pen/poOprPp) of the sample study where you can review the project.



## Multiple form control

It allows you to work with more than one form on one page. If you want to give different properties to different forms, you can define them separately with the extentions method, or if you want to define the same rules in all of them, you can select all the forms and apply the method.

```bash
formA.formValidation(parametersObjA);
formB.formValidation(parametersObjB);
```

```bash
forms.formValidation({parameters});
```

## What do we mean by two types of dynamic control?

#### Controlling the form page with the button active.

When the forward or submit buttons are clicked, it gives a warning in the required inputs and does not allow the form to be submitted to the other page.

It is sufficient to set the controlType parameter in the method to BUTTONS. The default value of the control Type parameter is BUTTONS.

```bash
  forms.formValidation({
    controlType : 'BUTTONS'
  });
```

#### Providing control on the form page with button passive state.

Another method is that when the form is filled in correctly, the forward or submit buttons become active from passive.

It is sufficient to set the controlType parameter in the method to INPUTS.

```bash
  forms.formValidation({
    controlType : 'INPUTS'
  });
```

## You can make a form consisting of more than one page. The control structure is structured accordingly.

```bash
  <form action="/" id="form">
      <div class="form-page active"> <!--Page-1-->
      </div>
      <div class="form-page"> <!--Page-2-->
      </div>
  </form>
```

Each page is named with '.form-page'. This structure should also be created in a form structure consisting of a single page. The page that will be visible must have the '.active' class.

## 'input-part' class

Each form element to be created must be added to the '.input-part' class content.

```bash
  <div class="input-part">
    <div class="inner-input">
    </div>
  </div>
```

## localStorage

You can keep incomplete forms in storage if you want.
The default value is false. When the form is interrupted and the user wants to fill the form again, the inputs will be filled. Whenever he submits the form, the cookie kept behind will be deleted.

```bash
  forms.formValidation({
    formCookies : true
  });
```

## Types of input placeholders that you can use as a design.

There are 3 types of placeholders.These work with the two attributes that the element with inner-input class takes. 
The parameter in the method is shown below. If you leave the parameter blank, you can enter each element manually.

```bash
  forms.formValidation({
    placeholderType : 'classic'
  });

  forms.formValidation({
    placeholderType : 'title'
  });

  forms.formValidation({
    placeholderType : 'anim'
  });
```
The three types are shown separately below. You can see the work of this section in the 'inputDesignTypes.html' file in the project.

### Header on input

If you want a title to be above the input, just add the 'type-pu' attribute. 'data-placeholder' is the title content.

```bash
  <div class="input-part">
    <div class="inner-input" type-pu data-placeholder="Header on input">
    </div>
  </div>
```

### Placeholder

Classic placeholder. The header that is seen in the input when the input is empty. It works with type-ph.

```bash
  <div class="input-part">
    <div class="inner-input" type-ph data-placeholder="Placeholder">
    </div>
  </div>
```

### Animated placeholder

The placeholder slides and pins to the top of the input when the input is focused and its content is not empty. It is enabled with type-pa and also a class called anim must be added.

```bash
  <div class="input-part">
    <div class="inner-input anim" type-pa data-placeholder="Animation Placeholder">
    </div>
  </div>
```

## befill Attribute

If it is an input that must be filled in, the befill element must be added. The element to be found may vary according to the input type. You can find befill positions in the following input types.

```bash
  <div class="input-part">
    <div class="inner-input anim" type-pa data-placeholder="Name Surname">
      <input type="text" befill>
    </div>
  </div>
```

## Buttons

We have two button elements. The second button varies. When it comes to the last page, it takes the value in the submit-title="Submit" attribute as the button name. The Forward button gets its name from the forward-title="Next" attribute.

```bash
  <div class="buttons">
      <a method="button" class="button btn-form d-none">Prev</a>
      <a method="button" class="button btn-form" forward-title="Next"
          submit-title="Submit"><span>Next</span></a>
  </div>
```

## Input Error element

If you want it to give error messages, you can add the '.error-input' class element into the '.inner-input' class element.

```bash
  <div class="input-part">
    <div class="inner-input">
    </div>
    <h5 class="input-error"></h5>
  </div>
```

## Input Error messages

The 'messages' object under the 'SetStateOfInput' method contains error messages. There are ready messages created for the input types in the project. If you want, you can change your messages in this section.

```bash
 let messages = {
    101: 'Doldurulmasi gerekli alan.',
    102: 'Hatalı yazım, lüttfen kontrol ediniz.',
    201: 'Telefon numarası hatalıdır.',
    202: 'Eksik numara girilmiştir.',
    ...
  }
```

## Input Types

Some input control types in the package will be transferred under this heading. New ones will be added over time.

#### Name-Surname

The rule that it must consist of at least two words is provided by the 'namesurname' class. You can also enter min and max values. The 'onlyLetters' class only allows word content.

```bash
  <div class="input-part">
    <div class="inner-input anim" type-pa data-placeholder="Name Surname">
      <input type="text" class="namesurname onlyLetters" name="namesurname" id="namesurname" minlength="5" maxlength="8" befill>
    </div>
    <h5 class="input-error"></h5>
  </div>
```

#### ID

The rule sequence here is made according to the Turkish identity number. You can change its content according to you.

```bash
  <div class="input-part">
    <div class="inner-input anim" type-pa data-placeholder="Name Surname">
      <input type="text" class="id-number" name="user-id" id="user-id" befill>
    </div>
    <h5 class="input-error"></h5>
  </div>
```

#### Textarea

The setup to be used in the textarea input is as follows. You can also enter min and max values.

```bash
  <div class="input-part">
      <div class="inner-input" type-ph data-placeholder="Textarea">
          <textarea minlength="8" maxlength="100" name="textarea" id="textarea" befill></textarea>
      </div>
      <h5 class="input-error"></h5>
  </div>
```

#### Date

The setup to be used in the date input is as follows.

```bash
  <div class="input-part">
    <div class="inner-input" type-ph data-placeholder="Birthday">
      <input type="date" class="input-date" name="birthday" id="birthday" befill>
      <div class="input-icon"></div>
    </div>
    <h5 class="input-error"></h5>
  </div>
```

#### Year

The setup to be used in the year input is as follows. You must specify the range with the min and max attributes.

```bash
  <div class="input-part">
    <div class="inner-input anim" type-pu data-placeholder="Year Input">
      <input type="number" class="year" name="year" id="year" min="1960" max="2022" maxlength="4">
    </div>
    <h5 class="input-error"></h5>
  </div>
```

#### Email

The setup to be used in the mail input is as follows.

```bash
  <div class="input-part">
    <div class="inner-input" type-ph data-placeholder="Email">
      <input type="email" name="email" id="email" befill>
    </div>
    <h5 class="input-error"></h5>
  </div>
```

#### Phone

The setup to be used in the phone input is as follows. JQuery library is used for phone input masking. You can edit within the project to customize it.

```bash
  <div class="input-part">
    <div class="inner-input anim" type-pa data-placeholder="Phone Number">
      <input type="tel" class="tel-input" name="phone" id="phone" befill data-pattern="(999) 999 99 99">
    </div>
    <h5 class="input-error"></h5>
  </div>
```

#### File

The setup to be used in the file input is as follows. The file input is designed to attach a single file for a while. And it is not dynamic. Multiple or single file options, file number limit, file size and visual variations will be added in future updates.

```bash
  <div class="input-part">
    <div class="inner-input" type-pu data-placeholder="Profile Photo">
      <input type="file" name="photo" id="photo">
      <div class="file-input">
        <p class="result" file-title="Import File" file-name>Import File</p>
        <div class="btn-file">Click</div>
      </div>
    </div>
    <h5 class="input-error"></h5>
  </div>
```

#### Checkbox Button

If you want to have a selection limit in your checkbox input, you should change the minLimit and maxLimit values according to your desire. When you are not going to use a limit, you do not need to add it.

_You must use the content and groups classes. Even if you do not want to reflect the contents of the content, you must add it._

```bash
 <div class="input-part">
    <fieldset class="checkboxFieldset" id="checkboxFieldset-1" minLimit="0" maxLimit="3" befill>
        <div class="content">
            <div class="title">CheckboxFieldset</div>
            <div class="desc">Checkbox description</div>
        </div>
        <div class="groups">
            <div class="checkbox">
                <input type="checkbox" name="checkbox1" id="checkbox1-1">
                <label for="checkbox1-1">checkbox-1</label>
            </div>
            <div class="checkbox">
                <input type="checkbox" name="checkbox1" id="checkbox1-2">
                <label for="checkbox1-2">checkbox-2</label>
            </div>
            <div class="checkbox">
                <input type="checkbox" name="checkbox1" id="checkbox1-3">
                <label for="checkbox1-3">checkbox-3</label>
            </div>
        </div>
        <h5 class="input-error"></h5>
    </fieldset>
</div>
```

#### Radio Button

The setup to be used in the radio fieldset is as follows.

_You must use the content and groups classes. Even if you do not want to reflect the contents of the content, you must add it._

```bash
  <div class="input-part">
    <fieldset class="radioFieldset" id="radioFieldset" befill>
        <div class="content">
            <div class="title">RadioFieldset</div>
            <div class="desc">Radio description</div>
        </div>
        <div class="groups">
            <div class="radio">
                <input type="radio" name="radio1" id="radio1-1">
                <label for="radio1-1">Radio-1</label>
            </div>
            <div class="radio">
                <input type="radio" name="radio1" id="radio1-2">
                <label for="radio1-2">Radio-2</label>
            </div>
            <div class="radio">
                <input type="radio" name="radio1" id="radio1-3">
                <label for="radio1-3">Radio-3</label>
            </div>
        </div>
        <h5 class="input-error"></h5>
    </fieldset>
  </div>
```

#### Trigger Radio Button

If you want to disable some inputs with a radio button, the structure you should use is mentioned in the example below.

The trigger attribute 'trigger-radio' is added to the fieldset element.
The 'radio-refuse' attribute is added to the radio button that affects the elements to be triggered.
The -triggered-by-radio="radioFieldset-1"- attribute is added to the element containing the 'inner-input' class of the triggered input, by making it equal to the trigger's id.
Disabled inputs get disabled attribute.

```bash
  <fieldset class="radioFieldset" id="radioFieldset-1" trigger-radio befill>
      <div class="content">
          <div class="title">Radio is corrent?</div>
          <div class="desc">Radio description</div>
      </div>
      <div class="groups">
          <div class="radio">
              <input type="radio" name="radio2" id="radio2-1" radio-accept>
              <label for="radio2-1">Yes</label>
          </div>
          <div class="radio">
              <input type="radio" name="radio2" id="radio2-2" radio-refuse>
              <label for="radio2-2">No</label>
          </div>
      </div>
      <!-- <h5 class="input-error"></h5> -->
  </fieldset>
```

```bash
<div class="input-part">
  <div class="inner-input" triggered-by-radio="radioFieldset-1">
      <input type="text">
  </div>
</div>
```