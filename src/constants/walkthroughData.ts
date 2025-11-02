import { Images } from '../assets/images';

type WalkthroughItem = {
  id: string;
  title: string;
  description: string;
  type: "svg" | "png";
  image: any; // SVG component or require() source
};
console.log(Images.customerwalk1)
export const customerWalkthrough: WalkthroughItem[] = [
  {
    id: "1",
    title: "Let the sun pay your power bills",
    description: "Smart solar solutions that turn sunshine into savings.",
    type: "svg",
    image: Images.customerwalk1,
  },
  {
    id: "2",
    title: "Best in market installation and Commissioning services",
    description: "Delivering precision, performance, and reliability in every installation",
    type: "svg",
    image: Images.customerwalk2,
  },
  {
    id: "3",
    title: "Hassle free Loan & Subsidy assistance",
    description: "End-to-end support for quick loans and seamless subsidy approvals.",
    type: "svg",
    image: Images.customerwalk3,
  },
  {
    id: "4",
    title: "Track your daily Energy generation",
    description: "Real-time insights for smarter energy management.",
    type: "svg",
    image: Images.customerwalk4,
  },
  {
    id: "5",
    title: "Get After maintenance services",
    description: "Because great service doesn’t end after installation.",
    type: "svg",
    image: Images.customerwalk5,
  },
];

export const vendorWalkthrough: WalkthroughItem[] = [
  {
    id: "1",
    title: "Grow your solar business",
    description: "Power your business with data-driven solar innovation, from design to delivery — simplify every step",
    type: "png",
    image: Images.vendorwalk1,
  },
  {
    id: "2",
    title: "Best in market quotation ",
    description: "Dynamic pricing powered by real-time data, Generate instant quotes with maximum profits.",
    type: "png",
    image: Images.vendorwalk2,
  },
  {
    id: "3",
    title: "Faster loan processing",
    description: "Accelerating vendor growth with faster, smarter, seamless loan approvals.",
    type: "png",
    image: Images.vendorwalk3,
  },
  {
    id: "4",
    title: "Faster material dispatch",
    description: "Delivering materials at record speed with integrated supply chain, minimal TAT-maximum efficiency",
    type: "png",
    image: Images.vendorwalk4,
  },
  {
    id: "5",
    title: "Hassle-free Net-metering and subsidy process",
    description: "End-to-end support for effortless approvals, we make Net-metering simple",
    type: "png",
    image: Images.vendorwalk5,
  },
];
