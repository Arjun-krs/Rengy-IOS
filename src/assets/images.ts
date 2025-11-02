import { CLOUDINARY_BASE } from '@env';
export const cloudinary = (fileName: string) => `${CLOUDINARY_BASE}${fileName}`;

// Export multiple images
export const Images = {
  placeholderimage: cloudinary('v1760512587/131337_1_op2icf.png'),
  customerwalk1: cloudinary('v1760347637/Img_Intro1_rgcywd.png'),
  customerwalk2: cloudinary('v1760347641/Img_Intro2_hyryjd.png'),
  customerwalk3: cloudinary('v1760347643/Img_Intro3_r9dgph.png'),
  customerwalk4: cloudinary('v1760347638/Img_Intro4_skjnur.png'),
  customerwalk5: cloudinary('v1760347639/Img_Intro5_lur30y.png'),
  vendorwalk1: cloudinary('v1760347641/walk1_b7xfug.png'),
  vendorwalk2: cloudinary('v1760347642/walk2_hvh8zh.png'),
  vendorwalk3: cloudinary('v1760347643/walk3_hksng0.png'),
  vendorwalk4: cloudinary('v1760347645/walk4_igmlwd.png'),
  vendorwalk5: cloudinary('v1760347647/walk5_j9rnyh.png'),
  homestep1: cloudinary('v1760351518/step1_bdpbbt.png'),
  homestep2: cloudinary('v1760351518/step2_uctrt0.png'),
  homestep3: cloudinary('v1760351518/step3_rpkycb.png'),
  homestep4: cloudinary('v1760351518/step4_t3kqhm.png'),
  amcstep1: cloudinary('v1760352573/amc1_xq3f6f.png'),
  amcstep2: cloudinary('v1760352573/amc2_jhj4su.png'),
  amcstep3: cloudinary('v1760352573/amc3_stmjrd.png'),
  amcstep4: cloudinary('v1760352573/amc4_mpdsa1.png'),
  homeImage1: cloudinary('v1760427576/solarBuilding_mjaqtf.png'),
  homeImage2: cloudinary('v1760420369/One_switch_Big_impact_mmkyly.png'),

  amcbenefit1: cloudinary('v1760428681/benefit1_fw5ctr.png'),
  amcbenefit2: cloudinary('v1760428681/benefit2_cvljev.png'),
  amcbenefit3: cloudinary('v1760428682/benefit3_t9bp6p.png'),
  amcbenefit4: cloudinary('v1760428682/benefit4_lrmdc2.png'),
  amcbenefit5: cloudinary('v1760428682/benefit5_vdyi1p.png'),

  cardBottom: cloudinary('v1760424896/cardBottom_hw8zkq.png'),
  FloatingSolar: cloudinary('v1760428281/rooftop_mjwbss.png'),
  RooftopSolar: cloudinary('v1760428280/solarinstall_kwkggn.png'),
  ContactUcIcon: cloudinary('v1761282272/contactUs_jsc9dt.jpg'),

  ResidentialImg: cloudinary('v1761590986/Rectangle_34626080_uobfha.png'),
  CommercialImg: cloudinary('v1761590984/Rectangle_34626080_1_ukjonh.png'),


  NewSolarInstallation: cloudinary('v1761629578/Rectangle_34626056_4_elqkve.png'),
  SolarMaintenance: cloudinary('v1761629578/Rectangle_34626056_3_hld6lv.png'),
  SolarUpgrade: cloudinary('v1761629576/Rectangle_34626056_5_ay3ihh.png'),
  HomeOneBigImg: cloudinary('v1761744966/One_switch_Big_impact_1_ukjvol.png'),

};