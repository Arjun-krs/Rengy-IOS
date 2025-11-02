import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
  Dimensions,
  StyleSheet,
  Platform,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../api/store';
import { useToast } from '../../../utils/ToastManager';
// Actions and Thunks
import { VendorRegisterMutate } from '../../../api/action/vendorCreate/index';
import { resetUpload, selectUpload } from '../../../api/slice/uploadSlice';

// Components
import CustomTextInput from '../../../components/form/CustomTextInput';
import CustomToggleSelect from '../../../components/form/CustomToggle';
import { Button, TypoComp, UploadMedia } from '../../../components/common';
import { BackIcon } from '../../../utils/svgSrc';
import UploadProgressModal from '../../../components/common/UploadProgressModal/UploadProgressModal';

// --- Type Definitions ---
// Define the shape of the file object expected from the UploadMedia component
interface File {
  uri: string;
  type: string;
  fileName: string;
}

// Update VendorFormValues to include new fields from the design
interface VendorFormValues {
  // New: Company Name
  companyName: string; 
  businessEmail: string;
  businessMobile: string;
  // Address is now split
  streetAddress: string; // Renamed companyAddress to streetAddress for clarity
  city: string;
  state: string;
  pincode: string; 

  gstNumber: string;
  isNationalPortal: boolean;
  aadharNumber: string;
  panNumber: string;
  
  // New: Bank details
  bankAccountNumber: string;
  ifscCode: string;
  kycKybNumber: string;

  canceledChequeNumber: string;
  aadharFiles: File[];
  panFiles: File[];
  gstFiles: File[];
  canceledChequeFiles: File[];
  labourCertificateFiles: File[];
  nationalPortalFiles: File[];
}

// Define the navigation param list for type-safe navigation
type RootStackParamList = {
  VendorDetails: { userData: Record<string, any> };
  Login: undefined;
  SuccessModal: { role: string };
  // ... other screens
};

type VendorDetailsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'VendorDetails'
>;
type VendorDetailsScreenRouteProp = RouteProp<
  RootStackParamList,
  'VendorDetails'
>;

const { height, width } = Dimensions.get('window');

const VendorDetails: React.FC = () => {
  const navigation = useNavigation<VendorDetailsScreenNavigationProp>();
  const route = useRoute<VendorDetailsScreenRouteProp>();
  const dispatch = useDispatch();
  const { userData ,role} = route.params;
  console.log(userData, 'userData');

  // Check if userData has _parts
  const userObj = Array.isArray(userData)
    ? Object.fromEntries(userData) // normal array of pairs
    : userData._parts && Array.isArray(userData._parts)
    ? Object.fromEntries(userData._parts) // from FormData-like structure
    : {};

  const [user, setUser] = React.useState(userData);
  const { showToast } = useToast();

console.log(user, 'user');
  const { progress, isLoading: isUploading } = useSelector(selectUpload);

  const formik = useFormik<VendorFormValues>({
    initialValues: {
      // Initialize new fields
      companyName: '',
      businessEmail: '',
      businessMobile: '',
      streetAddress: '', // Renamed from companyAddress
      city: '',
      state: '',
      pincode: '',
      gstNumber: '',
      isNationalPortal: false,
      aadharNumber: '',
      panNumber: '',
      bankAccountNumber: '', // New
      ifscCode: '',          // New
      kycKybNumber: '',      // New
      canceledChequeNumber: '',
      aadharFiles: [],
      panFiles: [],
      gstFiles: [],
      canceledChequeFiles: [],
      labourCertificateFiles: [],
      nationalPortalFiles: [],
    },
    validationSchema: Yup.object().shape({
      companyName: Yup.string().required('Company name is required'), // New
      businessEmail: Yup.string()
        .email('Invalid email')
        .required('Business email is required'),
      businessMobile: Yup.string()
        .matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits')
        .required('Business mobile number is required'),
      streetAddress: Yup.string().required('Street address is required'), // Renamed
      city: Yup.string().required('City is required'),                   // New
      state: Yup.string().required('State is required'),                 // New
      pincode: Yup.string()                                              // New
        .matches(/^[0-9]{6}$/, 'Pincode must be 6 digits')
        .required('Pincode is required'),
      gstNumber: Yup.string()
        .matches(
          /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
          'Invalid GST number format',
        )
        .required('GST number is required'),
      aadharNumber: Yup.string()
        .matches(/^[0-9]{12}$/, 'Aadhar number must be 12 digits')
        .required('Aadhar number is required'),
      panNumber: Yup.string()
        .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Invalid PAN number format')
        .required('PAN number is required'),
      // New Bank Details Validation
      bankAccountNumber: Yup.string()
          .required('Bank account number is required'),
      ifscCode: Yup.string()
          .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, 'Invalid IFSC code format')
          .required('IFSC code is required'),
      kycKybNumber: Yup.string().required('KYC/KYB is required'),

      canceledChequeNumber: Yup.string().required(
        'Cancelled cheque number is required',
      ),
      aadharFiles: Yup.array<File>().min(1, 'Aadhar card is required'),
      panFiles: Yup.array<File>().min(1, 'PAN card is required'),
      gstFiles: Yup.array<File>().min(1, 'GST certificate is required'),
      canceledChequeFiles: Yup.array<File>().min(
        1,
        'Cancelled cheque is required',
      ),
      labourCertificateFiles: Yup.array<File>(),
      nationalPortalFiles: Yup.array<File>(),
    }),
    onSubmit: async values => {
      dispatch(resetUpload());

      const formData = new FormData();

      // --- 1. Define Document Map and Extract Data ---
      const documentMap = [
        {
          type: 'Aadhar',
          number: values.aadharNumber,
          files: values.aadharFiles,
        },
        {
          type: 'PAN',
          number: values.panNumber,
          files: values.panFiles,
        },
        {
          type: 'GST',
          number: values.gstNumber,
          files: values.gstFiles,
        },
        {
          type: 'Canceled Cheque',
          number: values.canceledChequeNumber,
          files: values.canceledChequeFiles,
        },
        // Optional documents
        {
          type: 'Labour Certificate',
          number: '',
          files: values.labourCertificateFiles,
        },
        {
          type: 'National Portal Proof',
          number: '',
          files: values.nationalPortalFiles,
        },
      ];

      // Declare variables which were missing and causing the ReferenceError
      const documentTypes: string[] = [];
      const documentNumbers: string[] = [];
      const documents: File[] = [];

      // Loop through the map to populate the arrays
      documentMap.forEach(doc => {
        if (doc.files && doc.files.length > 0) {
          doc.files.forEach(file => {
            documentTypes.push(doc.type);
            // Use a placeholder if number is empty (for optional files)
            documentNumbers.push(doc.number || 'N/A');
            documents.push(file);
          });
        }
      });

      // --- 2. Append User/Account Details ---
      formData.append('name', user.fullName);
      formData.append('email', user.email);
      formData.append('mobileNumber', user.mobileNumber);
      formData.append('password', user.password);
      formData.append('isEmailVerified', 'true');
      formData.append('isMobileVerified', 'true');
      
      // Address Fields - Hardcoded IDs kept, but address fields changed
      formData.append('countryId','101');
      formData.append('cityId',  '57594'); // Should be dynamic based on city/state fields
      formData.append('stateId', '4035');  // Should be dynamic based on city/state fields

      formData.append('userType', '2'); // Vendor user type
      
      // Append new form fields
      formData.append('companyName', values.companyName); // Use form value
      formData.append('businessEmail', values.businessEmail);
      formData.append('businessMobile', values.businessMobile);
      formData.append('streetAddress', values.streetAddress); // Updated field name
      formData.append('city', values.city);                   // New
      formData.append('state', values.state);                 // New
      formData.append('pincode', values.pincode);             // New
      
      // Append Bank Details
      formData.append('bankAccountNumber', values.bankAccountNumber);
      formData.append('ifscCode', values.ifscCode);
      formData.append('kycKybNumber', values.kycKybNumber);

      formData.append(
        'isNationalPortal',
        values.isNationalPortal.toString(),
      );

      // --- 4. Append Document Arrays to FormData ---
      documentTypes.forEach(type => {
        formData.append('documentTypes[]', type);
      });

      documentNumbers.forEach(num => {
        formData.append('documentNumbers[]', num);
      });

      // Append files. The 'documents' field is expected to be an array of file objects.
      documents.forEach(file => {
        formData.append('documents', {
          uri: file.uri,
          type: file.type,
          name: file.fileName,
        } as any); // Type assertion might be necessary for React Native file objects
      });

      console.log(formData, ' payload response');

      // ✅ now dispatch correctly
      const response: any = await dispatch(VendorRegisterMutate({ formData }));

      console.log(response, ' response response');

      if (VendorRegisterMutate.fulfilled.match(response)) {
        dispatch(resetUpload());

        // Navigate to SuccessModal on success
        navigation.navigate('SuccessModal', {
          role: 'vendor',
        });
      } else {
        dispatch(resetUpload());
        // 🚀 Using the provided toast format: showToast(message, type)
        const errorMessage = response.payload || 'Failed to register vendor';
        showToast(errorMessage, 'error');
      }
    },
  });

  // console.log(formik.values, 'formik');
  return (
    <SafeAreaView style={styles.safeArea}>
      <UploadProgressModal visible={isUploading} progress={progress} />
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <BackIcon />
          </TouchableOpacity>
          <View>
            <TypoComp
              label="Business details"
              variant="headingLargePrimary"
              color="#030204"
            />
            <TypoComp
              label="Enter your business’s legal name and other details"
              variant="bodyMediumTertiary"
              color="#67606E"
            />
          </View>
        </View>

        {/* Form */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.formContainer}>
            {/* 1. Company Name (New) */}
            <CustomTextInput
              label="Company Name"
              placeholder="Enter your company name"
              value={formik.values.companyName}
              onChangeText={formik.handleChange('companyName')}
              onBlur={formik.handleBlur('companyName')}
              error={
                formik.touched.companyName && formik.errors.companyName
              }
              isMandatory
              autoCapitalize="words"
            />
            {/* Business Email & Mobile (Existing) */}
            <CustomTextInput
              label="Business email address"
              placeholder="Enter your Business email address"
              value={formik.values.businessEmail}
              onChangeText={formik.handleChange('businessEmail')}
              onBlur={formik.handleBlur('businessEmail')}
              error={
                formik.touched.businessEmail && formik.errors.businessEmail
              }
              isMandatory
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <CustomTextInput
              label="Business mobile number"
              placeholder="Enter your Business mobile number"
              value={formik.values.businessMobile}
              onChangeText={formik.handleChange('businessMobile')}
              onBlur={formik.handleBlur('businessMobile')}
              error={
                formik.touched.businessMobile && formik.errors.businessMobile
              }
              isMandatory
              keyboardType="phone-pad"
              maxLength={10}
            />
            {/* 2. Street Address (Updated) */}
            <CustomTextInput
              label="Company address"
              placeholder="Enter your company address"
              value={formik.values.streetAddress}
              onChangeText={formik.handleChange('streetAddress')}
              onBlur={formik.handleBlur('streetAddress')}
              error={
                formik.touched.streetAddress && formik.errors.streetAddress
              }
              isMandatory
            />

            {/* City, State, Pincode (New - Grouped in the design) */}
            <View style={styles.inlineGroup}>
              <View style={{ width: '48%' }}>
                <CustomTextInput
                  label="City"
                  placeholder="City"
                  value={formik.values.city}
                  onChangeText={formik.handleChange('city')}
                  onBlur={formik.handleBlur('city')}
                  error={formik.touched.city && formik.errors.city}
                  isMandatory
                  autoCapitalize="words"
                />
              </View>
              <View style={{ width: '48%' }}>
                <CustomTextInput
                  label="State"
                  placeholder="State"
                  value={formik.values.state}
                  onChangeText={formik.handleChange('state')}
                  onBlur={formik.handleBlur('state')}
                  error={formik.touched.state && formik.errors.state}
                  isMandatory
                  autoCapitalize="words"
                />
              </View>
            </View>
            <CustomTextInput
              label="Pincode"
              placeholder="Enter pincode"
              value={formik.values.pincode}
              onChangeText={formik.handleChange('pincode')}
              onBlur={formik.handleBlur('pincode')}
              error={formik.touched.pincode && formik.errors.pincode}
              isMandatory
              keyboardType="numeric"
              maxLength={6}
            />

            {/* Registered on national portal? (Existing) */}
            <CustomToggleSelect
              label="Registered on national portal?"
              value={formik?.values?.isNationalPortal ? 'Yes' : 'No'}
              onSelect={(val: 'Yes' | 'No') =>
                formik.setFieldValue('isNationalPortal', val === 'Yes')
              }
              error={
                formik?.touched?.isNationalPortal && formik?.errors?.isNationalPortal
              }
            />
            
            {/* Aadhar (Existing) */}
            <CustomTextInput
              label="Aadhar number"
              placeholder="Enter your Aadhar number"
              value={formik.values.aadharNumber}
              onChangeText={formik.handleChange('aadharNumber')}
              onBlur={formik.handleBlur('aadharNumber')}
              error={formik.touched.aadharNumber && formik.errors.aadharNumber}
              isMandatory
              keyboardType="numeric"
              maxLength={12}
            />
            <UploadMedia
              label="Aadhar card"
              type="doc"
              docHeader="Upload Aadhar card"
              onMediaSelect={(formData, files) =>
                formik.setFieldValue('aadharFiles', files)
              }
              error={formik.touched.aadharFiles && formik.errors.aadharFiles}
              isMandatory
            />

            {/* PAN (Existing) */}
            <CustomTextInput
              label="PAN number"
              placeholder="Enter your PAN number"
              value={formik.values.panNumber}
              onChangeText={formik.handleChange('panNumber')}
              onBlur={formik.handleBlur('panNumber')}
              error={formik.touched.panNumber && formik.errors.panNumber}
              isMandatory
              autoCapitalize="characters"
              maxLength={10}
            />
            <UploadMedia
              label="PAN card"
              type="doc"
              docHeader="Upload PAN card"
              onMediaSelect={(formData, files) =>
                formik.setFieldValue('panFiles', files)
              }
              error={formik.touched.panFiles && formik.errors.panFiles}
              isMandatory
            />
            
            {/* GST (Existing) */}
            <CustomTextInput
              label="GST Number"
              placeholder="Enter your GST Number"
              value={formik.values.gstNumber}
              onChangeText={formik.handleChange('gstNumber')}
              onBlur={formik.handleBlur('gstNumber')}
              error={formik.touched.gstNumber && formik.errors.gstNumber}
              isMandatory
              autoCapitalize="characters"
            />
            <UploadMedia
              label="Firm GST certificate"
              type="doc"
              docHeader="Upload Firm GST certificate"
              onMediaSelect={(formData, files) =>
                formik.setFieldValue('gstFiles', files)
              }
              error={formik.touched.gstFiles && formik.errors.gstFiles}
              isMandatory
            />

            {/* 3. Bank Account Details (New) */}
            <CustomTextInput
              label="Firm Bank Account number"
              placeholder="Enter Firm Bank Account number"
              value={formik.values.bankAccountNumber}
              onChangeText={formik.handleChange('bankAccountNumber')}
              onBlur={formik.handleBlur('bankAccountNumber')}
              error={formik.touched.bankAccountNumber && formik.errors.bankAccountNumber}
              isMandatory
              keyboardType="numeric"
            />
            <CustomTextInput
              label="IFSC Code"
              placeholder="Enter IFSC Code"
              value={formik.values.ifscCode}
              onChangeText={formik.handleChange('ifscCode')}
              onBlur={formik.handleBlur('ifscCode')}
              error={formik.touched.ifscCode && formik.errors.ifscCode}
              isMandatory
              autoCapitalize="characters"
            />
            <CustomTextInput
              label="KYC/KYB"
              placeholder="Enter KYC/KYB name"
              value={formik.values.kycKybNumber}
              onChangeText={formik.handleChange('kycKybNumber')}
              onBlur={formik.handleBlur('kycKybNumber')}
              error={formik.touched.kycKybNumber && formik.errors.kycKybNumber}
              isMandatory
              autoCapitalize="words"
            />

            {/* Cancelled Cheque (Existing) */}
            <CustomTextInput
              label="Cancelled cheque number"
              placeholder="Enter your Cancelled cheque number"
              value={formik.values.canceledChequeNumber}
              onChangeText={formik.handleChange('canceledChequeNumber')}
              onBlur={formik.handleBlur('canceledChequeNumber')}
              error={
                formik.touched.canceledChequeNumber &&
                formik.errors.canceledChequeNumber
              }
              isMandatory
              keyboardType="numeric"
            />
            <UploadMedia
              label="Firm cancelled cheque"
              type="doc"
              docHeader="Upload Firm cancelled cheque"
              onMediaSelect={(formData, files) =>
                formik.setFieldValue('canceledChequeFiles', files)
              }
              error={
                formik.touched.canceledChequeFiles &&
                formik.errors.canceledChequeFiles
              }
              isMandatory
            />
            
            {/* Optional Documents (Existing) */}
            <UploadMedia
              label="Labour certificate (if any)"
              type="doc"
              docHeader="Upload Labour certificate"
              onMediaSelect={(formData, files) =>
                formik.setFieldValue('labourCertificateFiles', files)
              }
              error={
                formik.touched.labourCertificateFiles &&
                formik.errors.labourCertificateFiles
              }
            />
            <UploadMedia
              label="National portal registration proof (if any)"
              type="doc"
              docHeader="Upload National portal registration proof"
              onMediaSelect={(formData, files) =>
                formik.setFieldValue('nationalPortalFiles', files)
              }
              error={
                formik.touched.nationalPortalFiles &&
                formik.errors.nationalPortalFiles
              }
            />
          </View>
        </ScrollView>

        {/* Submit Button */}
        <View style={styles.buttonContainer}>
          <Button
            title="Register"
            onPress={() => formik.handleSubmit()}
            disabled={isUploading}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFFFFF' },
  container: { flex: 1, padding: 16, gap: 24 },
  header: { flexDirection: 'column', gap: 20 },
  scrollView: { flex: 1 }, // Added flex 1 for proper scrolling
  scrollContent: { paddingBottom: height * 0.12 },
  formContainer: { flexDirection: 'column', gap: 24 },
  // New style for side-by-side inputs (City/State)
  inlineGroup: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'flex-start' 
  },
  buttonContainer: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 20 : 10,
    left: 16,
    right: 16,
    width: width - 32,
    backgroundColor: '#FFFFFF',
    paddingTop: 10,
  },
});

export default VendorDetails;