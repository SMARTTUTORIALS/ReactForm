import * as yup from 'yup'

//define data validation schema

export const userSchema = yup.object().shape({
    username: yup.string().required("This field is required"),
    age: yup.string().required("This field is required")    //match for requied field and date or age format
    .matches(/((([0-2][0-9]|30|31)\/((0[13456789])|(1[0-2]))\/([0-9]{4}))|(([0-2][0-9])\/(02)\/([0-9]{4})))|(\d+)/,{
        message:"Enter your DOB in DD/MM/YYYY format or Age in Years",
    }),
    gender: yup.string().required("Please select a valid option"),
    mobile: yup.string().nullable().notRequired().matches(/^(\+91[\s]?)?[0]?(91)?[6789]\d{9}$/, {   //match for valid Indian mobile number
        message: "Enter a valid mobile number",
        excludeEmptyString: true,  // allow empty string to pass so that this field becomes optional
    })
    ,
    govtIdType: yup.string().nullable().notRequired(),
    govtId: yup.string().when('govtIdType', {     // conditional matching depending on previous field.
        is: (govtIdType) => govtIdType === 'Aadhar',
        then: (schema) => schema.matches(/^\d{12}$/, {   // regex matches for valid 12 digit number
            message: "Enter a valid Aadhar number",
        }),
        otherwise: (schema) => schema.nullable().notRequired(),  // if no match then field becomes optional

    }).when('govtIdType', {
        is: (govtIdType) => govtIdType === 'PAN',
        then: (schema) => schema.matches(/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/ , {  //regex matches for valid alphanumeric number (PAN specifically)
            message: "Enter a valid PAN number",
        }),
        otherwise: (schema) => schema.nullable().notRequired(), // if no match then field becomes optional

    }),
    guardianSalutation: yup.string().nullable().notRequired(),
    guardianName: yup.string().nullable().notRequired(),
    email: yup.string().email().nullable().notRequired(),
    emergencyPhone: yup.string().nullable().notRequired().matches(/^(\+91[\s]?)?[0]?(91)?[6789]\d{9}$/, {  //match for valid Indian mobile number
        message: "Enter a valid mobile number",
        excludeEmptyString: true,  // allow empty string to pass so that this field becomes optional
    }),
    address: yup.string().nullable().notRequired(),
    state: yup.string().nullable().notRequired(),
    city: yup.string().nullable().notRequired(),
    country: yup.string().nullable().notRequired(),
    pincode: yup.string().nullable().notRequired(),
    occupation: yup.string().nullable().notRequired(),
    religion: yup.string().nullable().notRequired(),
    maritalStatus: yup.string().nullable().notRequired(),
    bloodGroup: yup.string().nullable().notRequired(),
    nationality: yup.string().nullable().notRequired()
});