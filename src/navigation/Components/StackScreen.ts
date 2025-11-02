// import RengyAMC from '../../../screens/App/Customer/RengyAMC';
// import AddLeads from '../../../screens/App/Vendor/AddLeads';
// import {
//   DynamicLoader,
//   SelectProjDetail,
// } from '../../../screens/App/Vendor/Calculate/SubPage';
// import {
//   RaiseRequest,
//   RequestDetails,
// } from '../../../screens/App/Vendor/Reports/SubScreen';
// import SiteSUrveyScreen from '../../../screens/App/Vendor/SiteSurvey';
// import CreatePasswordScreen from '../../../screens/Auth/CreatePassword';
// import Login from '../../../screens/Auth/Login';
// import RegisterScreen from '../../../screens/Auth/Registration/Register';
// import SolarInfoScreen from '../../../screens/Auth/SolarInfoScreen';
// import UserType from '../../../screens/Auth/UserType';
// import VendorDetails from '../../../screens/Auth/Registration/VendorDetails';
// import VendorRegisterScreen from '../../../screens/Auth/Registration/VendorRegister';
// import InviteFriendScreen from '../../../screens/Common/InviteFriend/InviteFriendScreen';
// import NotificationScreen from '../../../screens/Common/Notification/NotificationScreen';
// import ProfileScreen from '../../../screens/Common/Profile';
// import GetSupportScreen from '../../../screens/Common/Support/GetSupportScreen';
// import SearchScreen from '../../../screens/Common/Search/SearchScreen';
// import Onboarding from '../../../screens/Onboarding';
// import SplashScreen from '../../../screens/Splash/SplashScreen';
// import BottomTabView from '../BottomTabNav';
// import ChangePassword from '../../../screens/Common/ChangePassword/ChangePassword';
// import WalletScreen from '../../../screens/Common/Wallet/Wallet';
// import ChatSupport from '../../../screens/Common/Support/ChatWithUs';
// import FaqSupport from '../../../screens/Common/Support/FaqScreen';
// import ContactUsScreen from '../../../screens/Common/Support/ContactUs';
// import MaintenanceTips from '../../../screens/Common/Support/MaintenanceTipsScreen';
// import AboutUs from '../../../screens/Common/AboutUs';
// import PrivacyPolicy from '../../../screens/Common/Policies';
// import TermsConditions from '../../../screens/Common/Policies/Terms';
// import ProjectDetailsScreen from '../../../screens/App/Customer/RequestDetails/index';
// import AccountSettingsScreen from '../../../screens/Common/AccountSettings/AccountSettingsScreen';
// import HelpScreen from '../../../screens/Common/Help/Help';
// import EditProfile from '../../../screens/Common/Profile/Tabs/ProfileTab/Components/EditProfile';
// import EditBusinessDetails from '../../../screens/Common/Profile/Tabs/ProfileTab/Components/EditBusinessDetail';
// import ForgotPasswordScreen from '../../../screens/Auth/ForgotPassword/index';
// import SuccessModal from '../../../screens/Auth/SuccessModal';
// import LeaderBoardScreen from '../../../screens/Common/LeaderBoard';
// import SubscriptionFlow from '../../../screens/App/Customer/RengyAMC/SubscriptionFlow';
// import RequestList from '../../../screens/App/Customer/RequestList';
// import NewLeadNotify from '../../../screens/Common/Notification/NewLeadNotify';
// import LeadLocation from '../../../screens/Common/Notification/LeadLocation';
// import PreviewArvr from '../../../screens/App/Vendor/ArVr/PreviewArvr';
// import PreviewArvrImg from '../../../screens/App/Vendor/ArVr/PreviewArvrImg';

// export const screens = [
//   { name: 'BottomTab', component: BottomTabView },
//   { name: 'Splash', component: SplashScreen },
//   { name: 'Onboarding', component: Onboarding },
//   { name: 'UserType', component: UserType },
//   { name: 'Login', component: Login },
//   { name: 'Register', component: RegisterScreen },
//   { name: 'VendorRegister', component: VendorRegisterScreen },
//   { name: 'CreatePassword', component: CreatePasswordScreen },
//   { name: 'ForgotPassword', component: ForgotPasswordScreen },
//   { name: 'SolarInfo', component: SolarInfoScreen },
//   { name: 'SuccessModal', component: SuccessModal },
//   { name: 'Profile', component: ProfileScreen },
//   { name: 'AccountSettings', component: AccountSettingsScreen },
//   { name: 'Search', component: SearchScreen },
//   { name: 'changepassword', component: ChangePassword },
//   { name: 'Wallet', component: WalletScreen },
//   { name: 'RengyAMC', component: RengyAMC },
//   { name: 'GetSupport', component: GetSupportScreen },
//   { name: 'InviteFriend', component: InviteFriendScreen },
//   { name: 'Notification', component: NotificationScreen },
//   { name: 'RequestDetails', component: RequestDetails },
//   { name: 'RequestList', component: RequestList },
//   { name: 'SelectProjDetail', component: SelectProjDetail },
//   { name: 'RaiseRequest', component: RaiseRequest },
//   { name: 'SiteSurvey', component: SiteSUrveyScreen },
//   { name: 'VendorDetails', component: VendorDetails },
//   { name: 'AddLeads', component: AddLeads },
//   { name: 'ChatSupport', component: ChatSupport },
//   { name: 'FaqSupport', component: FaqSupport },
//   { name: 'Help', component: HelpScreen },
//   { name: 'ContactUs', component: ContactUsScreen },
//   { name: 'MaintenanceTips', component: MaintenanceTips },
//   { name: 'AboutUs', component: AboutUs },
//   { name: 'PrivacyPolicy', component: PrivacyPolicy },
//   { name: 'terms', component: TermsConditions },
//   { name: 'ProjectDetailsScreen', component: ProjectDetailsScreen },
//   { name: 'EditProfile', component: EditProfile },
//   { name: 'EditBusinessDetails', component: EditBusinessDetails },
//   { name: 'Leaderboard', component: LeaderBoardScreen },
//   { name: 'SubscriptionFlow', component: SubscriptionFlow },
//   { name: 'DynamicLoader', component: DynamicLoader },
//   { name: 'NewLeadNotify', component: NewLeadNotify },
//   { name: 'LeadLocation', component: LeadLocation },
//   { name: 'PreviewArvr', component: PreviewArvr },
//   { name: 'PreviewArvrImg', component: PreviewArvrImg },
// ];
import BottomTabView from "../BottomTabNav";
import SplashScreen from "../../screens/Splash/SplashScreen";
import UserType from "../../screens/Auth/UserType";
import Onboarding from "../../screens/Onboarding";
import Login from "../../screens/Auth/Login";
import ProfileScreen from "../../screens/Common/Profile";
import EditProfile from "../../screens/Common/Profile/Tabs/ProfileTab/Components/EditProfile";
import EditBusinessDetails from "../../screens/Common/Profile/Tabs/ProfileTab/Components/EditBusinessDetail";
import RegisterScreen from "../../screens/Auth/Registration/Register";
import VendorRegisterScreen from "../../screens/Auth/Registration/VendorRegister";

export const screens =[
  // auth screens
  { name: 'BottomTab', component: BottomTabView },
  { name: 'Splash', component: SplashScreen },
  { name: 'UserType', component: UserType },
  { name: 'Onboarding', component: Onboarding },
  { name: 'Login', component: Login },
  { name: 'Register', component: RegisterScreen },
  { name: 'VendorRegister', component: VendorRegisterScreen },

  { name: 'Profile', component: ProfileScreen },
  { name: 'EditProfile', component: EditProfile },
  { name: 'EditBusinessDetails', component: EditBusinessDetails },
]