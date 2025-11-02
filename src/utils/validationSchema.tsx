import * as Yup from 'yup';

interface ContactUsInquiry {
    isGeneralInquiry: boolean;
    isSupportRequest: boolean;
    isPartnership: boolean;
    isFeedback: boolean;
}

export const RegisterSchema = Yup.object().shape({
    fullName: Yup.string().required('Full name is required'),
    email: Yup.string().email('Invalid email').optional(),
    mobileNumber: Yup.string().required('Mobile number is required'),
    termsAccepted: Yup.boolean().oneOf(
        [true],
        'You must accept the terms & conditions',
    ),
});

export const createPasswordSchema = Yup.object().shape({
    password: Yup.string()
        .required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords do not match')
        .required('Confirm password is required'),
});

export const addLeadsSchema = Yup.object().shape({
    name: Yup.string().required('Lead name is required'),
    email: Yup.string().email('Enter valid email').required('Email is required'),
    mobileNumber: Yup.string()
        .matches(/^[0-9]{10}$/, 'Enter a valid 10-digit mobile number')
        .required('Mobile number is required'),
    address: Yup.string().required('Address is required'),

    ebName: Yup.string().required('Name (as on the electricity bill)'),
    projectType: Yup.string().required('Project type is required'),
    siteVisitDate: Yup.string().required('Site visit date is required'),
    requiredCapacity: Yup.string().required('Capacity requirement is required'),
    serviceConnNo: Yup.string().required('service Connection Number is required'),
    comments: Yup.string().nullable(),
});

export const profileSchema = Yup.object({
    fullName: Yup.string().required('Full name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    mobile: Yup.string().required('Mobile number is required'),
})

export const businessDetailSchema = Yup.object({
    businessEmail: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),

    businessMobile: Yup.string()
        .matches(/^[0-9]{10}$/, 'Enter a valid 10-digit number')
        .required('Phone number is required'),

    companyAddress: Yup.string()
        .required('Company address is required'),

    registered: Yup.boolean()
        .oneOf([true, false], 'Please select Yes or No')
        .required('This field is required'),

    aadharNumber: Yup.string()
        .matches(/^[0-9]{12}$/, 'Enter valid 12-digit Aadhar number')
        .required('Aadhar number is required'),

    panNumber: Yup.string()
        .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Enter valid PAN number')
        .required('PAN number is required'),

    gstNumber: Yup.string()
        .matches(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, 'Enter valid GST number')
        .required('GST number is required'),

    canceledChequeNumber: Yup.string()
        .matches(/^[0-9]{9,18}$/, 'Enter valid account number')
        .required('Cancelled cheque number is required'),
});

export const raiseReqSchema = Yup.object().shape({
    projectId: Yup.string().required('Project ID is required'),
    requestType: Yup.string().required('Request type is required'),
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    priority: Yup.string().required('Priority is required'),
});

export const dynamicCalcProjSchema = Yup.object().shape({
    projectType: Yup.string().required('Type of project is required'),
    module: Yup.string().required('Module is required'),
    inverter: Yup.string().required('Inverter is required'),
    structureType: Yup.string().required('Structure type is required'),
})

export const contactUsSchema = Yup.object().shape({
    fullName: Yup.string().required('Full name is required'),
    email: Yup.string().required('Email is required'),
    mobile: Yup.string().required('Phone number is required'),
    message: Yup.string().required('Message is required'),
    enquiryType: Yup.object().test(
        'at-least-one-selected',
        'Select at least one Request category',
        (value: ContactUsInquiry) => {
            return (
                value?.isGeneralInquiry ||
                value?.isSupportRequest ||
                value?.isPartnership ||
                value?.isFeedback
            );
        }
    ),
})

export const changePasswordSchema = Yup.object().shape({
    currentPassword: Yup.string().required('Current password is required'),
    newPassword: Yup.string()
        .required('New password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword')], 'Passwords do not match')
        .required('Confirm password is required'),
});

export const dynamicCalcSchema = Yup.object().shape({
    capacityRequirement: Yup.string().required('Capacity requirement is required'),
    city: Yup.string().required('City is required'),
    buildingHeight: Yup.string().required('Building height is required'),
    inverterLocation: Yup.string().required('Inverter location is required'),
    acCableLength: Yup.string().required('AC cable length is required'),
    earthingCableLength: Yup.string().required('Earthing cable length is required'),
    dcCableLength: Yup.string().required('DC cable length is required'),
});