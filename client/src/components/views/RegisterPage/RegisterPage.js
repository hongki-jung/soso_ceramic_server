import React from "react";
import moment from "moment";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { registerUser } from "../../../_actions/user_actions";
import { useDispatch } from "react-redux";

import {
  Form,
  Input,
  Button,
} from 'antd';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

function RegisterPage(props) {
  const dispatch = useDispatch();
  return (

    <Formik
      initialValues={{
        email: '',
        name: '',
        password: '',
        phoneNumber:'',
        confirmPassword: ''
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string()
          .required('Name is required'),
        email: Yup.string()
          .email('Email is invalid')
          .required('Email is required'),
        password: Yup.string()
          .min(6, 'Password must be at least 6 characters')
          .required('Password is required'),
        phoneNumber: Yup.string()
          .required("전화번호를 입력해주세요"),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Passwords must match')
          .required('Confirm Password is required')
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {

          let dataToSubmit = {
            user_email: values.email,
            user_pwd: values.password,
            user_name: values.name,
            phone_number : values.phoneNumber
            // image: `http://gravatar.com/avatar/${moment().unix()}?d=identicon`
          };
          // console.log("dataToSubmit",dataToSubmit)
          dispatch(registerUser(dataToSubmit))
            .then(response => {
              if (response.payload.success) {
                props.history.push("/login");
              } else {
                alert(response.payload.err.errmsg)
              }
            })
            .catch(error => {
              if(error.response.status == 409){
                alert('이미 가입된 이메일입니다.')
              }})

          setSubmitting(false);
        }, 500);
      }}
    >
      {props => {
        const {
          values,
          touched,
          errors,
          dirty,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset,
        } = props;
        return (
          <div className="app">
            <h2>회원가입</h2>
            <Form style={{ minWidth: '375px' }} {...formItemLayout} onSubmit={handleSubmit} >

 



              <Form.Item required label="이메일" hasFeedback validateStatus={errors.email && touched.email ? "error" : 'success'}>
                <Input
                  id="email"
                  placeholder="이메일을 입력해주세요"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.email && touched.email ? 'text-input error' : 'text-input'
                  }
                />
                {errors.email && touched.email && (
                  <div className="input-feedback">{errors.email}</div>
                )}
              </Form.Item>

              <Form.Item required label="비밀번호" hasFeedback validateStatus={errors.password && touched.password ? "error" : 'success'}>
                <Input
                  id="password"
                  placeholder="비밀번호를 입력해주세요"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.password && touched.password ? 'text-input error' : 'text-input'
                  }
                />
                {errors.password && touched.password && (
                  <div className="input-feedback">{errors.password}</div>
                )}
              </Form.Item>

              <Form.Item required label="비밀번호 확인" hasFeedback>
                <Input
                  id="confirmPassword"
                  placeholder="비밀번호 재입력"
                  type="password"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.confirmPassword && touched.confirmPassword ? 'text-input error' : 'text-input'
                  }
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <div className="input-feedback">{errors.confirmPassword}</div>
                )}
              </Form.Item>
              <Form.Item required label="이름">
                <Input
                  id="name"
                  placeholder="이름을 입력해주세요"
                  type="text"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.name && touched.name ? 'text-input error' : 'text-input'
                  }
                />
                {errors.name && touched.name && (
                  <div className="input-feedback">{errors.name}</div>
                )}
              </Form.Item>
              <Form.Item required label="전화번호">
                <Input
                  id="phoneNumber"
                  placeholder="전화번호을 입력해주세요"
                  type="text"
                  value={values.phoneNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.phoneNumber && touched.phoneNumber ? 'text-input error' : 'text-input'
                  }
                />
                {errors.phoneNumber && touched.phoneNumber && (
                  <div className="input-feedback">{errors.phoneNumber}</div>
                )}
              </Form.Item>
              <Form.Item {...tailFormItemLayout}>
                <Button style={{width:'100%'}}onClick={handleSubmit} type="primary" disabled={isSubmitting}>
                  회원가입
                </Button>
              </Form.Item>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
};


export default RegisterPage

// import React from "react";
// import moment from "moment";
// import { Formik } from 'formik';
// import * as Yup from 'yup';
// import { registerUser } from "../../../_actions/user_actions";
// import { useDispatch } from "react-redux";
// import { Form, Icon, Input, Button, Checkbox, Typography } from 'antd';


// const formItemLayout = {
//   labelCol: {
//     xs: { span: 24 },
//     sm: { span: 8 },
//   },
//   wrapperCol: {
//     xs: { span: 24 },
//     sm: { span: 16 },
//   },
// };
// const tailFormItemLayout = {
//   wrapperCol: {
//     xs: {
//       span: 24,
//       offset: 0,
//     },
//     sm: {
//       span: 16,
//       offset: 8,
//     },
//   },
// };

// function RegisterPage(props) {
//   const { Title } = Typography

//   const dispatch = useDispatch();
//   return (

//     <Formik
//       initialValues={{
//         email: '',
//         phoneNumber:'',
//         name: '',
//         password: '',
//         confirmPassword: ''
//       }}
//       validationSchema={Yup.object().shape({
//         name: Yup.string()
//           .required('Name is required'),
//         lastName: Yup.string()
//           .required('Last Name is required'),
//         email: Yup.string()
//           .email('Email is invalid')
//           .required('Email is required'),
//         password: Yup.string()
//           .min(6, 'Password must be at least 6 characters')
//           .required('Password is required'),
//         confirmPassword: Yup.string()
//           .oneOf([Yup.ref('password'), null], 'Passwords must match')
//           .required('Confirm Password is required')
//       })}
//       onSubmit={(values, { setSubmitting }) => {
//         console.log("ihih")
//         setTimeout(() => {

//           let dataToSubmit = {
//             user_email: values.email,
//             user_pwd: values.password,
//             phone_number: values.phoneNumber,
//             user_name: values.name,
            
//             // image: `http://gravatar.com/avatar/${moment().unix()}?d=identicon`
//           };
//           console.log("dataToSubmit befor dispatch",dataToSubmit)
//           dispatch(registerUser(dataToSubmit)).then(response => {
//             if (response.payload.success) {
//               props.history.push("/login");
//             } else {
//               alert(response.payload.err.errmsg)
//             }
//           })

//           setSubmitting(false);
//         }, 500);
//       }}
//     >
//       {props => {
//         const {
//           values,
//           touched,
//           errors,
//           dirty,
//           isSubmitting,
//           handleChange,
//           handleBlur,
//           handleSubmit,
//           handleReset,
//         } = props;
//         return (
//           <div className="app">
//             <Title level={2}>회원가입</Title>
//             <Form style={{ minWidth: '400px' }} {...formItemLayout} onSubmit={handleSubmit} >
//               <Form.Item required label="이메일" hasFeedback validateStatus={errors.email && touched.email ? "error" : 'success'}>
//                 <Input
//                   id="email"
//                   placeholder="이메일을 입력해주세요."
//                   type="email"
//                   value={values.email}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   className={
//                     errors.email && touched.email ? 'text-input error' : 'text-input'
//                   }
//                 />
//                 {errors.email && touched.email && (
//                   <div className="input-feedback">{errors.email}</div>
//                 )}
//               </Form.Item>
//               <Form.Item required label="이름">
//                 <Input
//                   id="name"
//                   placeholder="이름을 입력해주세요"
//                   type="text"
//                   value={values.name}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   className={
//                     errors.name && touched.name ? 'text-input error' : 'text-input'
//                   }
//                 />
//                 {errors.name && touched.name && (
//                   <div className="input-feedback">{errors.name}</div>
//                 )}
                
//               </Form.Item>
//               <Form.Item required label="전화번호">
//                 <Input
//                   id="phoneNumber"
//                   placeholder="전화번호를 입력해주세요"
//                   type="text"
//                   value={values.phoneNumber}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   className={
//                     errors.phoneNumber && touched.phoneNumber ? 'text-input error' : 'text-input'
//                   }
//                 />
//                 {errors.phoneNumber && touched.phoneNumber && (
//                   <div className="input-feedback">{errors.phoneNumber}</div>
//                 )}
                
//               </Form.Item>


//                 {/* <div>
//                   <Button>이메일 주소 인증</Button>
//                 </div>
//                 <div>
//                   <Input style={{width:'50%', marginRight:'5px'}}></Input>
//                   <Button>인증번호 확인</Button>
//                 </div> */}

//               <Form.Item required label="비밀번호" hasFeedback validateStatus={errors.password && touched.password ? "error" : 'success'}>
//                 <Input
//                   id="password"
//                   placeholder="비밀번호"
//                   type="password"
//                   value={values.password}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   className={
//                     errors.password && touched.password ? 'text-input error' : 'text-input'
//                   }
//                 />
//                 {errors.password && touched.password && (
//                   <div className="input-feedback">{errors.password}</div>
//                 )}
//               </Form.Item>

//               <Form.Item required label="비밀번호 확인" hasFeedback>
//                 <Input
//                   id="confirmPassword"
//                   placeholder="비밀번호 확인"
//                   type="password"
//                   value={values.confirmPassword}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   className={
//                     errors.confirmPassword && touched.confirmPassword ? 'text-input error' : 'text-input'
//                   }
//                 />
//                 {errors.confirmPassword && touched.confirmPassword && (
//                   <div className="input-feedback">{errors.confirmPassword}</div>
//                 )}
//               </Form.Item>

//               <Form.Item {...tailFormItemLayout}>
//                 <Button  onClick={handleSubmit} type="primary" disabled={isSubmitting}>
//                   회원가입
//                 </Button>
//               </Form.Item>
//             </Form>
//           </div>
//         );
//       }}
//     </Formik>
//   );
// };


// export default RegisterPage
