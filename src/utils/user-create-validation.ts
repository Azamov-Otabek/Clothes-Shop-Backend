export const UserNameValidation = [
    {
        required: true,
        message: 'Ismni kiriting',
    },
]

export const UserEmailValidation = [
    {
        required: true,
        message: 'Emailni kiriting',
    },
    {
        type: 'email',
        message: 'Emailni to\'ri formatda kiriting',
    },
]

export const PasswordValidation = [
    {
        required: true,
        message: 'Parolni kiriting',
    },
    {
        min: 8,
        message: 'Parolni 8 ta belgidan iborat bo\'lishi kerak',
    },
    {
        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        message: "Parolda 1 ta belgi 1 ta Katta harf 1 ta Son qatnashishi kerak !",
        validateTrigger: 'onBlur',
      },

]
export const UserLastNameValidation = [
    {
        required: true,
        message: 'Familiyani kiriting',
    }
]

export const UserAgeValidation = [
    {
        required: true,
        message: 'Yoshni kiriting',
    },
]

export const UserPhoneValidation = [
    {
        required: true,
        message: 'Telefon raqamni kiriting',
    },
    {
        pattern: /^\+998\d{9}$/,
        message: 'Telefon raqamni to\'gri kiriting (+998)',
    }
]
