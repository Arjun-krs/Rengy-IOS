export interface ProjectStatus {
  id: string;
  name: string;
  completed: boolean;
  current: boolean;
}

export interface SiteDetails {
  visitDate: string;
  visitTime: string;
  location: string;
  layoutImage?: string;
  slaDoc?: string;
  confirmed: boolean;
}

export interface PaymentInfo {
  loanAmount: number;
  applicationDate: string;
  status: string;
  documentsUploaded: string[];
  disbursedPercentage: number;
}

export interface DPRReport {
  filename: string;
  size: string;
  approved: boolean;
}

export interface DispatchInfo {
  procurementStarted: string;
  materialsProcured: string;
  deliveryItems: {
    modulesDelivered: string;
    inverterDelivered: string;
    structureDelivered: string;
    bosDelivered: string;
  };
  transporter: {
    name: string;
    vehicleNo: string;
    driverContact: string;
    expectedDelivery: string;
    trackingId: string;
    status: string;
  };
}

export interface InstallationInfo {
  materialDispatched: string;
  materialDelivered: string;
  installationStarted: string;
  panelMounting: string;
  electricalConnections: string;
  systemInstallationStarted: string;
  systemInstallation: string;
  installationReport: string;
  pictures: string[];
  completed: boolean;
}

export interface ProjectData {
  id: string;
  statuses: ProjectStatus[];
  siteDetails: SiteDetails;
  payment: PaymentInfo;
  dprReport: DPRReport;
  dispatch: DispatchInfo;
  installation: InstallationInfo;
}

export interface FeedbackData {
  overallRating: number;
  overallReview: string;
  vendorRating: number;
  vendorReview: string;
}

