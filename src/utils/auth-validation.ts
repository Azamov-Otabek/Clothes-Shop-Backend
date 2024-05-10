export const LoginlPasswordValidate = [
      {
        required: true,
        message: 'Formani toldiring ！',
      },
]

export const LoginEmailValidate = [
    {
        required: true,
        message: 'Formani toldiring!',
    },
    {
        type: 'email',
        message: 'Emailni togri formatda kiriting!',
    }
]

export const RegisterlPasswordValidate = [
    {
    required: true,
    message: 'Formani toldiring ！',
  },
  {
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
    message: "Parolingizda 1 ta belgi 1 ta Katta harf 1 ta Son qatnashishi kerak !",
    validateTrigger: 'onBlur',
  },
  {
    min: 8,
    message: 'Parolingiz 8 ta belgidan iborat bo\'lishi kerak!',
  },
]