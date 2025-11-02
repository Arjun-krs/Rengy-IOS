import React from 'react';
import Svg, { ClipPath, Defs, G, Path, SvgProps } from 'react-native-svg';

type IconProps = SvgProps & {
  color?: string;
  width?: number;
  height?: number;
  xmlns?: string;
};

const HomeIcon: React.FC<IconProps> = ({ color = '#148057', ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      fill={color}
      d="M18.216 6.287H6.784v11.429l-2.857-2.857V3.427H13.93V2l4.287 4.287Z"
    />
    <Path
      fill={color}
      d="M6.785 17.713h11.431V6.284l2.857 2.857v11.432H11.072V22l-4.287-4.287Z"
    />
    <Path
      fill={color}
      d="M17.501 14.474c-3.808 0-4.742-1.728-5.37-3.5-.364-1.028-.451-1.272-1.728-1.272v-2.74c3.21 0 3.898 1.938 4.31 3.094.397 1.117.597 1.679 2.788 1.679v2.74Z"
    />
  </Svg>
);

const CalculateIcon: React.FC<IconProps> = ({ color = '#67606E', ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.25}
      d="M18.5 2h-12a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2ZM8.5 6h8M16.5 14v4M16.5 10h.01M12.5 10h.01M8.5 10h.01M12.5 14h.01M8.5 14h.01M12.5 18h.01M8.5 18h.01"
    />
  </Svg>
);

const InstallIcon: React.FC<IconProps> = ({ color = '#67606E', ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M19.5 3h-14M12.5 21V7M6.5 15l6 6 6-6"
    />
  </Svg>
);


const RequestIcon: React.FC<IconProps> = ({ color = '#67606E', ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M15 2H9a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1Z"
    />
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2M12 11h4M12 16h4M8 11h.01M8 16h.01"
    />
  </Svg>
);

const ReportsIcon: React.FC<IconProps> = ({ color = '#67606E', ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.25}
      d="M15.5 2h-9a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7l-5-5Z"
    />
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.25}
      d="M14.5 2v4a2 2 0 0 0 2 2h4M16.5 13 13 16.5l-2-2L8.5 17"
    />
  </Svg>
);

const ArVrIcon: React.FC<IconProps> = ({ color = '#67606E', ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={25}
    fill="none"
    {...props}
  >
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeWidth={1.25}
      d="M22.5 6.36c0-.795-.79-1.526-2.117-2.107C19.208 3.739 18 4.72 18 6.003V9.22m4.5-2.86c0 1.195-1.789 2.247-4.5 2.86m4.5-2.86V9.5m-20-3.14c0-.795.79-1.526 2.117-2.107C5.792 3.739 7 4.72 7 6.003V9.22M2.5 6.36v12.716c0 1.891 4.477 3.424 10 3.424s10-1.533 10-3.424V13.5m-20-7.14c0 1.195 1.789 2.247 4.5 2.86m0 0c1.578.356 3.468.564 5.5.564s3.922-.208 5.5-.564"
    />
    <Path
      stroke={color}
      strokeWidth={1.25}
      d="M20 13.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
    />
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeWidth={1.25}
      d="m21.5 20.5-2.496-2.149a2.405 2.405 0 0 0-2.889-.166l-.23.155a1.601 1.601 0 0 1-1.986-.164l-3.32-3.177a1.84 1.84 0 0 0-2.433-.078L6.79 16.057 3 19.604"
    />
  </Svg>
);

const ArrowIcon: React.FC<IconProps> = ({ color = '#67606E', ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={12}
    height={8}
    fill="none"
    {...props}
  >
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.25}
      d="m1 1.5 5 5 5-5"
    />
  </Svg>
);

const CallIcon: React.FC<IconProps> = ({ color = '#26805E', width = 20, height = 20, ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 20 20"
    fill="none"
    {...props}
  >
    <Path
      d="M11.527 13.807C11.6991 13.886 11.893 13.9041 12.0767 13.8582C12.2605 13.8123 12.4231 13.7052 12.5378 13.5545L12.8337 13.167C12.9889 12.96 13.1902 12.792 13.4216 12.6763C13.6531 12.5606 13.9083 12.5003 14.167 12.5003H16.667C17.109 12.5003 17.5329 12.6759 17.8455 12.9885C18.1581 13.301 18.3337 13.725 18.3337 14.167V16.667C18.3337 17.109 18.1581 17.5329 17.8455 17.8455C17.5329 18.1581 17.109 18.3337 16.667 18.3337C12.6887 18.3337 8.87344 16.7533 6.06039 13.9403C3.24734 11.1272 1.66699 7.31191 1.66699 3.33366C1.66699 2.89163 1.84259 2.46771 2.15515 2.15515C2.46771 1.84259 2.89163 1.66699 3.33366 1.66699H5.83366C6.27569 1.66699 6.69961 1.84259 7.01217 2.15515C7.32473 2.46771 7.50033 2.89163 7.50033 3.33366V5.83366C7.50033 6.0924 7.44008 6.34759 7.32437 6.57901C7.20866 6.81044 7.04065 7.01175 6.83366 7.16699L6.44366 7.45949C6.29067 7.57631 6.18284 7.74248 6.13848 7.92978C6.09413 8.11709 6.11598 8.31397 6.20033 8.48699C7.33923 10.8002 9.21235 12.671 11.527 13.807Z"
      stroke={color}
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const MiniLogo: React.FC<IconProps> = ({ color = '#131337', ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={15}
    height={17}
    fill="none"
    {...props}
  >
    <Path
      fill={color}
      d="M12.64 3.783H3.202v9.436L.842 10.86V1.422h8.259V.243l3.54 3.54Z"
    />
    <Path
      fill={color}
      d="M3.202 13.216h9.439V3.78L15 6.14v9.438H6.742v1.178l-3.54-3.54Z"
    />
    <Path
      fill={color}
      d="M12.05 10.543c-3.143 0-3.914-1.428-4.432-2.89-.301-.85-.374-1.05-1.428-1.05V4.34c2.651 0 3.219 1.599 3.558 2.553.328.923.493 1.387 2.303 1.387v2.262Z"
    />
  </Svg>
)

const TickIcon: React.FC<IconProps> = ({ color = '#FFFFFF', ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={11}
    fill="none"
    {...props}
  >
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.25}
      d="M14.666 1 5.5 10.167 1.333 6"
    />
  </Svg>
)

const PlusIcon: React.FC<IconProps> = ({ color = '#148057', width = 20, height = 20, ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M4.167 10h11.666M10 4.168v11.667"
    />
  </Svg>
)

const AttachmentIcon: React.FC<IconProps> = ({ color = '#67606E', ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.25}
      d="m13.334 5.001-7.012 7.155a1.667 1.667 0 1 0 2.357 2.357l7.012-7.155a3.333 3.333 0 1 0-4.714-4.714L3.994 9.77a5 5 0 1 0 7.071 7.071l6.983-7.126"
    />
  </Svg>
)

const BackIcon: React.FC<IconProps> = ({ color = '#148057', ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.042}
      d="m12 19-7-7 7-7M19 12H5"
    />
  </Svg>
)

const DownloadIcon: React.FC<IconProps> = ({ color = '#148057', ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.25}
      d="M10 12.5v-10M17.5 12.5v3.333a1.666 1.666 0 0 1-1.667 1.667H4.167A1.667 1.667 0 0 1 2.5 15.833V12.5M5.833 8.332 10 12.499l4.166-4.167"
    />
  </Svg>
)

const ShareIcon: React.FC<IconProps> = ({ color = '#148057', ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M18 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM6 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM18 22a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98"
    />
  </Svg>
)

const ChangePassIcon: React.FC<IconProps> = ({ color = '#148057', ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.25}
      d="M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2ZM7 11V7a5 5 0 1 1 10 0v4"
    />
  </Svg>
)

const HelpIcon: React.FC<IconProps> = ({ color = '#148057', ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.25}
      d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z"
    />
    <Path
      stroke="#148057"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.25}
      d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01"
    />
  </Svg>
)

const SettingsIcon: React.FC<IconProps> = ({ color = '#148057', ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.25}
      d="M9.67 4.134a2.34 2.34 0 0 1 4.66 0 2.34 2.34 0 0 0 3.318 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.83 2.34 2.34 0 0 1 2.33-4.034 2.34 2.34 0 0 0 3.318-1.915"
    />
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.25}
      d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
    />
  </Svg>
)

const WalletIcon: React.FC<IconProps> = ({ color = '#148057', ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.25}
      d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 1 0 0 4h15a1 1 0 0 1 1 1v4m0 0h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1Z"
    />
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.25}
      d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"
    />
  </Svg>
)

const LeaderboardIcon: React.FC<IconProps> = ({ color = '#148057', ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.25}
      d="M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978M14 14.66v1.626a2 2 0 0 0 .976 1.696A4.998 4.998 0 0 1 17 21.978M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16"
    />
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.25}
      d="M6 9a6 6 0 1 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v6ZM6 9H4.5a2.5 2.5 0 1 1 0-5H6"
    />
  </Svg>
)

const PhoneIcon: React.FC<IconProps> = ({ color = '#148057', ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.25}
      d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384Z"
    />
  </Svg>
)

const AboutUsIcon: React.FC<IconProps> = ({ color = '#148057', ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.25}
      d="M4 22V4a1 1 0 0 1 .4-.8A6 6 0 0 1 8 2c3 0 5 2 7.333 2 1.333 0 2.356-.267 3.067-.8A1 1 0 0 1 20 4v10a.999.999 0 0 1-.4.8A6 6 0 0 1 16 16c-3 0-5-2-8-2a6 6 0 0 0-4 1.528"
    />
  </Svg>
)

const InfoIcon: React.FC<IconProps> = ({ color = '#148057', ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.25}
      d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10ZM12 16v-4M12 8h.01"
    />
  </Svg>
)

const PrivacyIcon: React.FC<IconProps> = ({ color = '#148057', ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.25}
      d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1v7ZM8 12h.008M12 12h.008M16 12h.008"
    />
  </Svg>
)

const AMCIcon: React.FC<IconProps> = ({ color = '#148057', ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.25}
      d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.106-3.105c.32-.322.863-.22.983.218a6.001 6.001 0 0 1-8.259 7.057l-7.91 7.91a2.121 2.121 0 0 1-2.999-3l7.91-7.91a6 6 0 0 1 7.057-8.26c.438.12.54.663.219.985L14.7 6.3Z"
    />
  </Svg>
)

const GetSupportIcon: React.FC<IconProps> = ({ color = '#148057', ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.25}
      d="M3 11h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Zm0 0a9 9 0 1 1 18 0m0 0v5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3Z"
    />
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.25}
      d="M21 16v2a4 4 0 0 1-4 4h-5"
    />
  </Svg>
)

const ReferFriend: React.FC<IconProps> = ({ color = '#148057', ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.25}
      d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM19 8v6M22 11h-6"
    />
  </Svg>
)

const RightArrow: React.FC<IconProps> = ({ color = '#148057', width = 20, height = 20, ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="none"
    {...props}
  >
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.25}
      d="m9 18 6-6-6-6"
    />
  </Svg>
)

const MailIcon: React.FC<IconProps> = ({ color = '#030204', ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <G
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.25}
      opacity={0.7}
    >
      <Path d="m18.333 5.832-7.493 4.772a1.667 1.667 0 0 1-1.674 0l-7.5-4.772" />
      <Path d="M16.666 3.332H3.333c-.92 0-1.667.746-1.667 1.667v10c0 .92.746 1.666 1.667 1.666h13.333c.92 0 1.667-.746 1.667-1.666v-10c0-.92-.746-1.667-1.667-1.667Z" />
    </G>
  </Svg>
)

const HeaderPhoneIcon: React.FC<IconProps> = ({ color = '#030204', ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.25}
      d="M11.526 13.808a.834.834 0 0 0 1.01-.252l.297-.388a1.665 1.665 0 0 1 1.333-.667h2.5a1.666 1.666 0 0 1 1.667 1.667v2.5a1.667 1.667 0 0 1-1.667 1.667 15 15 0 0 1-15-15 1.667 1.667 0 0 1 1.667-1.667h2.5a1.667 1.667 0 0 1 1.666 1.667v2.5a1.667 1.667 0 0 1-.666 1.333l-.39.292a.833.833 0 0 0-.244 1.028 11.667 11.667 0 0 0 5.327 5.32Z"
      opacity={0.7}
    />
  </Svg>
)

const VerifyIcon: React.FC<IconProps> = ({ color = '#148057', ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <G
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.25}
      clipPath="url(#a)"
    >
      <Path d="M8 14.67A6.667 6.667 0 1 0 8 1.335a6.667 6.667 0 0 0 0 13.333Z" />
      <Path d="m6 7.997 1.333 1.334L10 6.664" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h16v16H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)

const CameraIcon: React.FC<IconProps> = ({ color = '#148057', ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.25}
      d="M11.665 3.332a1.667 1.667 0 0 1 1.466.875l.405.75a1.666 1.666 0 0 0 1.467.875h1.664a1.667 1.667 0 0 1 1.667 1.667v7.5a1.667 1.667 0 0 1-1.667 1.666H3.334A1.667 1.667 0 0 1 1.667 15v-7.5a1.667 1.667 0 0 1 1.667-1.667h1.664a1.667 1.667 0 0 0 1.466-.873l.407-.754a1.667 1.667 0 0 1 1.466-.873h3.328Z"
    />
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.25}
      d="M10 13.332a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"
    />
  </Svg>
)

const CurrentLocation: React.FC<IconProps> = ({ color = '#148057', ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M2 12h3M19 12h3M12 2v3M12 19v3M12 19a7 7 0 1 0 0-14 7 7 0 0 0 0 14Z"
    />
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
    />
  </Svg>
)

const VerifiedIcon: React.FC<IconProps> = ({ color = '#148057', ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.25}
      d="M10 18.335a8.333 8.333 0 1 0 0-16.667 8.333 8.333 0 0 0 0 16.667Z"
    />
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.25}
      d="m7.5 9.999 1.667 1.666L12.5 8.332"
    />
  </Svg>
)

const CalanderIcon: React.FC<IconProps> = ({ color = '#148057', ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.25}
      d="M6.667 1.667V5M13.333 1.667V5M15.833 3.333H4.167C3.247 3.333 2.5 4.079 2.5 5v11.666c0 .92.746 1.667 1.667 1.667h11.666c.92 0 1.667-.746 1.667-1.667V5c0-.92-.746-1.667-1.667-1.667ZM2.5 8.333h15"
    />
  </Svg>
)

const MyLocation: React.FC<IconProps> = ({ color = '#148057', ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.25}
      d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 1 1 16 0Z"
    />
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.25}
      d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
    />
  </Svg>
)

const WhatsAppIcon: React.FC<IconProps> = ({ color = '#148057', ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M12.001 2a10 10 0 0 0-8.296 15.583L2.001 22l4.548-1.626A10 10 0 1 0 12 2Z"
    />
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M9.828 14.175c1.13 1.13 3.626 2.609 4.782 2.609a2.2 2.2 0 0 0 2.174-1.74v-.869s-1.07-.522-1.739-.87c-.67-.347-1.74.87-1.74.87a5.67 5.67 0 0 1-2.173-1.304 5.67 5.67 0 0 1-1.304-2.174s1.217-1.07.87-1.74c-.349-.669-.87-1.738-.87-1.738h-.87a2.2 2.2 0 0 0-1.74 2.174c0 1.156 1.48 3.652 2.61 4.782Z"
    />
  </Svg>
)

const PassInfo: React.FC<IconProps> = ({ color = '#148057', ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.25}
      d="M10 18.335a8.333 8.333 0 1 0 0-16.667 8.333 8.333 0 0 0 0 16.667ZM10 13.333V10M10 6.668h.008"
    />
  </Svg>
)

const PassError: React.FC<IconProps> = ({ color = '#148057', ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <Path
      stroke="#D92D20"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.25}
      d="M10 18.335a8.333 8.333 0 1 0 0-16.667 8.333 8.333 0 0 0 0 16.667ZM12.5 7.5l-5 5M7.5 7.5l5 5"
    />
  </Svg>
)

const ShareLoc: React.FC<IconProps> = ({ color = '#148057', ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.25}
      d="M9.69 14.458a.334.334 0 0 0 .624-.016l4.333-12.667a.33.33 0 0 0-.423-.423L1.557 5.685a.333.333 0 0 0-.016.625l5.287 2.12a1.333 1.333 0 0 1 .741.74l2.12 5.288ZM14.57 1.432 7.278 8.724"
    />
  </Svg>
)

const CancelIcon: React.FC<IconProps> = ({ color = '#148057', ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.25}
      d="M18 6 6 18M6 6l12 12"
    />
  </Svg>
)

export {
  HomeIcon,
  RequestIcon,
  CalculateIcon,
  InstallIcon,
  ReportsIcon,
  ArVrIcon,
  ArrowIcon,
  CallIcon,
  MiniLogo,
  TickIcon,
  PlusIcon,
  AttachmentIcon,
  BackIcon,
  DownloadIcon,
  ShareIcon,
  ChangePassIcon,
  HelpIcon,
  SettingsIcon,
  WalletIcon,
  LeaderboardIcon,
  PhoneIcon,
  AboutUsIcon,
  InfoIcon,
  PrivacyIcon,
  AMCIcon,
  GetSupportIcon,
  ReferFriend,
  RightArrow,
  MailIcon,
  HeaderPhoneIcon,
  VerifyIcon,
  CameraIcon,
  CurrentLocation,
  VerifiedIcon,
  CalanderIcon,
  MyLocation,
  WhatsAppIcon,
  PassInfo,
  PassError,
  ShareLoc,
  CancelIcon
};
