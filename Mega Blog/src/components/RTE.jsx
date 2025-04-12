//RTE file is basically for the editor

import React from 'react'
import {Editor } from '@tinymce/tinymce-react';
import {Controller } from 'react-hook-form';


/*The below control comes from react hook forms and it
 will pass on the value whoever called control anywhere*/

export default function RTE({name, control, label, defaultValue =""}) {
  return (

    
    /* This inside the label tags, is how the actual text
     of the label is displayed. The value of the label
      variable is inserted here. */

    <div className='w-full'> 
    {label && <label className='inline-block mb-1 pl-1'>{label}</label>}


   { /*The control element is passed same as the parent
    element whatever the value it is it is diurectly
    passes to control through parent element so that it
    will take all the control whatever the states
    events etc */}

    <Controller
    name={name || "content"}
    control={control}
    //we had to monitor the onchange value which is done below

    render={({field: {onChange}}) => (
        <Editor
        initialValue={defaultValue}
        init={{
            initialValue: defaultValue,
            height: 500,
            menubar: true,
            plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
            ],
            toolbar:
            "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
        }}
        onEditorChange={onChange}
        />
    )}
    />
    {/* Correct placement of the closing tag */}

     </div>
  )
}

