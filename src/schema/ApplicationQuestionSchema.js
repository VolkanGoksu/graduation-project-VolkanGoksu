import * as Yup from 'yup'

const ApplicationQuestionSchema = Yup.object().shape({
  FormQuestion: Yup.string().required(
    'yapıştırıken inputun başladığı noktaya dikkat edin,Lütfen Başvuru No giriniz'
  ),
})

export default ApplicationQuestionSchema
