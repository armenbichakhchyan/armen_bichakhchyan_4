class PostValidator {
    static postValidator({title, content}) {
        let errors = {};

        if(!title.trim()) {
            errors.title = "Title is required";
        }else if(title.length > 20) {
            errors.title = "The title should not exceed 10 characters"
        }

        if(!content.trim()) {
            errors.content = "Content is required";
        }else if(content.length > 50) {
            errors.content = "The content should be at least 50 characters";
        }

        return errors;
    }
}
export default PostValidator;