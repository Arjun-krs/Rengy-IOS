import { CLOUDINARY_BASE } from '@env';
import { CallIcon } from '../utils/svgSrc';
export const cloudinary = (fileName: string) => `${CLOUDINARY_BASE}${fileName}`;

// Export multiple images
export const Icons = {
  Banglore: cloudinary('v1760592473/vectore_Bengaluru_i5llne.png'),
  Chennai: cloudinary('v1760592474/Chennai_wphmju.png'),
  Kolkata: cloudinary('v1760592473/Kolkata_laijjv.png'),
  Hydrabad: cloudinary('v1760592474/Hyderabad_yhmmmy.png'),
  Pune: cloudinary('v1760592473/Pune_y1lyic.png'),
  Delhi: cloudinary('v1760592473/New_Delhi_zjperq.png'),
  Mumbai: cloudinary('v1760592474/Mumbai_bchwh4.png'),
  locationPointer: cloudinary('v1760603583/LocatePointer_kbqz2a.png'),
  AddPointer: cloudinary('v1760606149/AddIcon_rurlts.png'),
  SearchIcon: cloudinary('v1760606764/Frame_2_ztzs0d.png'),
  rightArrow: cloudinary('v1760609214/Vector_1_vkmyn3.png'),
  residentSavings: cloudinary('v1761074990/Vec_Empty_u0ygl3.png'),
  commercialSavings: cloudinary('v1761074990/Chats_illustration_fnj9qq.png'),
  successIcon: cloudinary('v1761126523/Successful-icon_l4n5n4.png'),
  dynamicLoader: cloudinary('v1761213527/dynamicPriceLoader_xqogma.png'),
  popupIcon: cloudinary('v1761216121/Vec_Empty_1_ipxbg9.png'),
  DiscordIcon: cloudinary('v1761282425/discord_munhjr.png'),
  InstagramIcon: cloudinary('v1761282425/instagram_fpkvz9.png'),
  TwitterIcon: cloudinary('v1761282425/twitter_xccpct.png'),
  LinkedInIcon: cloudinary('v1761289363/linkedin_rgmw9t.jpg'),
  resicon: cloudinary('v1761590982/solar_1_ynt01f.png'),
  comicon: cloudinary('v1761590982/solar_ku7zbd.png'),
  CallIcon: cloudinary('v1761715499/callbutton_x5z7nm.png'),
  downloadIcon: cloudinary('v1761741550/Frame_3_u0jrsg.png'),
  amcIcon: cloudinary('v1761742220/amcIcon_kub2yq.png'),
  SolarIcon: cloudinary('v1761889144/solarIcon_g04egs.png'),
  callCtaIcon: cloudinary('v1761904748/callIconCta_febtm8.png'),
};
