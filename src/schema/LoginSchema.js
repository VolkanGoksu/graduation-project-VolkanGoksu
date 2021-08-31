import * as Yup from 'yup'

const schema = Yup.object().shape({
  username: Yup.string().required('Lütfen kullanıcı adınızı giriniz.'),
  password: Yup.string().required('Lütfen şifrenizi giriniz'),
})

export default schema
