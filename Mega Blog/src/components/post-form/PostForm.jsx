import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
  /*if you want to continous watch any activity useForm() also
   gives watch capability*/
  //you can also pass object in useForm

    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
        //if and else is used below
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    
  /*if the user had submitted the form he must pass some of the
   data first we will make a submit name form if the post value
   exists update the value if not then create a new entry*/

  

    /*if post exists the first we will handle the upload the
     advantage of react hook forms is that we made such type of
     forms that can directly accept the data if you make form
     by your own without using reacthookform then it is 
     difficult */

    /*The below first if is for uploading the second one is 
    for deleting  */


    //This whole submit function is for edit the file

    const submit = async (data) => {
        if (post) {
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

            if (file) {
                appwriteService.deleteFile(post.featuredImage);
            }

            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined,
            });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } 
        
    //else is for the user that wants to create new forms and upload the post

        else {
            const file = await appwriteService.uploadFile(data.image[0]);

            if (file) {
                const fileId = file.$id;
                data.featuredImage = fileId;
                const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
    };

    
  /*the below line slugTransform purpose is to watch the values
   we had two values title and slug title should be watched
   and generate the value in slug if the user use space we
   had to convert it to dash(-) which is determined by using
   regex it helps us how we transform the slug value */

  /*useCallback also had the dependency array like useEffect
   but we donot need it here */


  /* const slugTransform=useCallback((value)=>{
   if(value && typeof value==='string'){
     const slug=value.toLowerCase().replace(/ /g,'-)
     setValue('slug',slug)
     return slug
   }
   }) 
   
   The upper program is the first method for slugTransform
    you can use it but i am using the second method
   */


  //This is the second method for slugTransform

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                //The regex that i had written below is generated from the chatgpt regex is difficult to understand
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
    
    /*subscription is just a avriable name you can use any 
    variable here*/

    //The below code is only for optimization purpose

        const subscription = watch((value, { name }) => {
            if (name === "title") {
            
            
        /*we use setValue where the title is and the setValue is
         set in slug we had to fill value of slugTransform in slug*/

                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />

            
        {/*The second inputbox label must be slug because we are
         working on it*/}
         
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}
