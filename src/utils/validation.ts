export const emailValidation = (value: string) => {
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]+$/;
    if (!emailPattern.test(value)) {
        return 'Неверный формат почты';
    }
    return false;
};

export const loginValidation = (value: string) => {
    const loginPattern = /^(?=.*[A-Za-z])[A-Za-z0-9_-]{3,20}$/;
    if (!loginPattern.test(value)) {
        return 'Invalid login format';
    }
    return false;
};

export const passwordValidation = (value: string) => {
    const passwordPattern = /^(?=.*[A-Z])(?=.*\d).{8,40}$/;
    if (!passwordPattern.test(value)) {
        return 'Invalid password format';
    }
    return false;
};

export const nameValidation = (value: string) => {
    const namePattern = /^[A-ZА-Я][a-zа-яA-ZА-Я-]*$/;
    if (!namePattern.test(value)) {
        return 'Invalid name format';
    }
    return false;
};

export const phoneValidation = (value: string) => {
    const phonePattern = /^\+?\d{10,15}$/;
    if (!phonePattern.test(value)) {
        return 'Invalid phone format';
    }
    return false;
};

export const messageValidation = (value: string) => {
    if (!value.trim()) {
        return 'Field cannot be empty';
    }
    return false;
};
