import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Image, ScrollView, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useFormik } from 'formik';

import HeaderComp from '../../../navigation/DynamicRoutes/Components/HeaderComp';
import { TypoComp } from '../../../components/common';
import { HeaderPhoneIcon, MailIcon, MyLocation, WhatsAppIcon } from '../../../utils/svgSrc';
import { Icons } from '../../../assets/icons';
import CustomTextInput from '../../../components/form/CustomTextInput';
import CustomCheckBox from '../../../components/form/CustomCheckBox';
import Button from '../../../components/common/Button';
import { contactUsSchema } from '../../../utils/validationSchema';
import useFetchUserData from '../../../hooks/useFetchUser';
import { ContactUsImage } from '../../../utils/imagesrc';

const ContactUsScreen = () => {
  const navigation = useNavigation();
  const { user } = useFetchUserData();

  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      countryId: '',
      mobile: '',
      message: '',
      enquiryType: {
        isGeneralInquiry: false,
        isSupportRequest: false,
        isPartnership: false,
        isFeedback: false,
      },
    },
    validationSchema: contactUsSchema,
    onSubmit: (values) => {
      console.log(values, 'values');
    }
  });

  const Card = ({ icon, label }) => (
    <View style={{ flex: 1, alignItems: 'flex-start', backgroundColor: '#FFFFFF', borderRadius: 12, padding: 20, shadowOffset: { width: 2, height: 2 }, shadowOpacity: 0.1, shadowRadius: 6, elevation: 3, gap: 24 }}>
      <View style={{ padding: 14, borderWidth: 2, borderColor: '#70F4C333', borderRadius: 8, borderStyle: 'solid' }}>
        {icon}
      </View>
      <TypoComp label={label} color="#030204" variant={user?.user?.userType !== 2 ? "bodyLargeTertiary" : "titleMediumSecondary"} />
    </View>
  );
  console.log(formik.errors);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <HeaderComp isPrimaryHeader={false} isSecondaryHeader={true} isPrimary={false} isBack={true} screenName="Contact Us" onBackPress={() => navigation.navigate('BottomTab', { screen: 'Home' })} />

      <ScrollView contentContainerStyle={{ paddingBottom: 20 }} showsVerticalScrollIndicator={false}>
        {user?.user?.userType !== 2 ? (
          <>
            <LinearGradient
              colors={['#E5F8E6', '#FFFFFF']}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={{ flex: 1, padding: 16, gap: 16 }}
            >

              <View style={{ flexDirection: 'row', gap: 16 }}>
                <Card icon={<MailIcon color="#148057" />} label="rengy@gmail.com" />
                <Card icon={<HeaderPhoneIcon color="#148057" />} label="+1012 3456 789" />
              </View>

              <Card icon={<MyLocation color="#148057" />} label="132 Dartmouth Street Boston, Massachusetts 02156 United States" />
            </LinearGradient>
            <View style={{ paddingVertical: 24, paddingHorizontal: 16, justifyContent: 'center', alignItems: 'center', gap: 20 }}>
              <TypoComp label='Follow us on' color='#030204' variant='bodyLargeSecondary' />
              <View style={{ flexDirection: 'row', gap: 32 }}>
                <Image source={{ uri: Icons.DiscordIcon }} width={40} height={40} />
                <Image source={{ uri: Icons.TwitterIcon }} width={40} height={40} />
                <Image source={{ uri: Icons.InstagramIcon }} width={40} height={40} />
              </View>
            </View>

            <View style={{ padding: 16, gap: 24 }}>
              <CustomTextInput
                label='Full name'
                placeholder='Enter full name'
                value={formik.values.fullName}
                onChangeText={formik.handleChange('fullName')}
                onBlur={formik.handleBlur('fullName')}
                error={formik.touched.fullName && formik.errors.fullName}
                isMandatory
              />
              <CustomTextInput
                label='Email address'
                placeholder='Enter email address'
                value={formik.values.email}
                onChangeText={formik.handleChange('email')}
                onBlur={formik.handleBlur('email')}
                error={formik.touched.email && formik.errors.email}
                isMandatory
              />
              <CustomTextInput
                label='Mobile number'
                placeholder='Enter mobile number'
                type='mobile'
                value={formik.values.mobile}
                onCountrySelect={(el) => formik.setFieldValue('countryId', el)}
                onChangeText={formik.handleChange('mobile')}
                onBlur={formik.handleBlur('mobile')}
                error={formik.touched.mobile && formik.errors.mobile}
                isMandatory
              />
              <View>
                <View style={{ flexDirection: 'row', gap: 4 }}>
                  <TypoComp label="Request Category" color={formik.touched.enquiryType && formik.errors.enquiryType ? "#FF0004" : "#030204"} variant="bodyMediumTertiary" />
                  <Text style={{ color: '#FF0004', transform: [{ translateY: -2 }] }}>
                    *
                  </Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
                  <View style={{ flex: 1, marginRight: 8 }}>
                    <CustomCheckBox
                      label="General inquiry"
                      value={formik.values.enquiryType.isGeneralInquiry}
                      onValueChange={(el) => formik.setFieldValue('enquiryType.isGeneralInquiry', el)}
                    />
                  </View>
                  <View style={{ flex: 1, marginLeft: 8 }}>
                    <CustomCheckBox
                      label="Support request"
                      value={formik.values.enquiryType.isSupportRequest}
                      onValueChange={(el) => formik.setFieldValue('enquiryType.isSupportRequest', el)}
                    />
                  </View>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
                  <View style={{ flex: 1, marginRight: 8 }}>
                    <CustomCheckBox
                      label="Partnership"
                      value={formik.values.enquiryType.isPartnership}
                      onValueChange={(el) => formik.setFieldValue('enquiryType.isPartnership', el)}
                    />
                  </View>
                  <View style={{ flex: 1, marginLeft: 8 }}>
                    <CustomCheckBox
                      label="Feedback"
                      value={formik.values.enquiryType.isFeedback}
                      onValueChange={(el) => formik.setFieldValue('enquiryType.isFeedback', el)}
                    />
                  </View>
                </View>
                {formik.touched.enquiryType && formik.errors.enquiryType && (
                  <TypoComp color={'#FF0004'} label={formik.touched.enquiryType && formik.errors.enquiryType} variant="bodyMediumTertiary" />
                )}
              </View>
              <CustomTextInput
                label='Message'
                placeholder='Enter message'
                value={formik.values.message}
                onChangeText={formik.handleChange('message')}
                onBlur={formik.handleBlur('message')}
                error={formik.touched.message && formik.errors.message}
                isMandatory
              />
            </View>
            <View style={{ paddingHorizontal: 16 }}>
              <Button title='Send Message' onPress={formik.handleSubmit} />
            </View>
          </>
        ) : (
          <>
            <LinearGradient
              colors={['#E5F8E6', '#FFFFFF']}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={{ flex: 1, paddingTop: 20, paddingHorizontal: 32, gap: 16, alignItems: 'center' }}
            >
              <View style={{ flexDirection: 'column', alignItems: 'center', gap: 12 }}>
                <TypoComp label='We are ready to help you' color='#030204' variant='titleMediumSecondary' style={{ textAlign: 'center' }} />
                <TypoComp label='Simply dummy text of the printing and type setting industry. Lorem Ipsum' color='#67606E' variant='bodyMediumTertiary' style={{ textAlign: 'center' }} />
              </View>
              <ContactUsImage />
            </LinearGradient>
            <View style={{ flexDirection: 'row', gap: 16, paddingHorizontal: 16, paddingVertical: 24 }}>
              <Card icon={<MailIcon />} label={'Send Email'} />
              <Card icon={<WhatsAppIcon />} label={'Chat with us'} />
            </View>

            <View style={{ paddingVertical: 40, paddingHorizontal: 16 }}>
              <View style={{ borderWidth: 0.5, position: 'relative', borderColor: '#D4CEDA' }}>
                <TypoComp label={'support@rengy.com'} color='#67606E' variant='bodyMediumTertiary' style={{ position: 'absolute', top: -12, backgroundColor: '#FFFFFF', paddingHorizontal: 5, left: '50%', transform: [{ translateX: -50 - 16 }] }} />
              </View>
            </View>

            <View style={{ paddingBottom: 24, paddingHorizontal: 16, justifyContent: 'center', alignItems: 'center', gap: 20 }}>
              <TypoComp label='Follow us on' color='#030204' variant='bodyLargeSecondary' />
              <View style={{ flexDirection: 'row', gap: 32 }}>
                <Image source={{ uri: Icons.LinkedInIcon }} width={40} height={40} />
                <Image source={{ uri: Icons.InstagramIcon }} width={40} height={40} />
              </View>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ContactUsScreen;
