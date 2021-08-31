import * as Yup from 'yup'

import React from 'react'

  // form validation rules
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('Lütfen isimizi giriniz.'),
    lastName: Yup.string().required('Lütfen soyisminizi giriniz.'),
    age: Yup.number()
      .positive()
      .integer()
      .required('Lütfen yaşınızı giriniz')
      .typeError('Lütfen yaşınızı giriniz')
      .min(18, 'En az 18 yaşında olmalısın')
      .max(99, 'En fazla 99 yaşında olmalısın'),
    email: Yup.string()
      .required('Lütfen e-postanızı giriniz.')
      .email('Geçersiz e-posta'),
    idNo: Yup.string()
      .min(11, 'Kimlik Numaranız 11 hane olmalı')
      .max(11, 'Kimlik Numaranız 11 hane olmalı')
      .required('Lütfen TC No girinizç'),

    description: Yup.string().required('Lütfen açıklamanızı yazınız.'),
    address: Yup.string().required('Lütfen adresinizi giriniz.'),
  })

  export default validationSchema