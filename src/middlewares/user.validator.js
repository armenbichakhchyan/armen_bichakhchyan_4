class UserValidator {
    static validatorRegistration ({name, username, email, password, confirmPassword}) {
        const errors = {};

        if(!name?.trim()) {
            errors.name = 'Name is required';
        }else if(name.length < 5) {
            errors.name = 'Name must be at least 5 characters long';
        }

        if(!username?.trim()) {
            errors.username = 'Username is required';
        }else if(username.length < 5) {
            errors.username = 'Username must be at least 5 characters long';
        }

        if(!email?.trim()) {
            errors.email = 'Email is required';
        }else if(!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            errors.email = 'Invalid Email Format';
        }

        if(!password?.trim()) {
            errors.password = 'Password is required';
        }else if(!name?.trim()) {
            errors.name = 'Name must be at least 6 characters long';
        }

        if(password !== confirmPassword) {
            errors.password = 'Password must match confirm password';
        }
        return errors;
    };

    static validateLogin({ email, password }) {
        const errors = {};

        if (!email?.trim()) {
            errors.email = "Email is required";
        } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            errors.email = "Invalid email format";
        }

        if (!password?.trim()) {
            errors.password = "Password is required";
        } else if (password.length < 8) {
            errors.password = "Password must be at least 8 characters";
        }

        return errors;
    }
}

export default UserValidator