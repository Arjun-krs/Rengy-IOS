import {ProjectData} from '../types';

export const dummyProjectData: ProjectData = {
  id: 'RENGY12345',
  statuses: [
    {id: '1', name: 'Site survey', completed: true, current: false},
    {id: '2', name: 'Payment', completed: true, current: false},
    {id: '3', name: 'DPR Report', completed: true, current: false},
    {id: '4', name: 'Dispatch', completed: true, current: false},
    {id: '5', name: 'Installation', completed: false, current: true},
    {id: '6', name: 'Handover', completed: false, current: false},
  ],
  siteDetails: {
    visitDate: '12 Dec 2025',
    visitTime: '11:30 am',
    location: '1st cross, HSR Layout, Bangalore',
    layoutImage: 'https://via.placeholder.com/400x200/f0f0f0/666?text=Solar+Layout+Design',
    slaDoc: 'SLA.pdf',
    confirmed: false,
  },
  payment: {
    loanAmount: 350000,
    applicationDate: '21 may 2025',
    status: '60% Disbursed',
    documentsUploaded: ['PAN card'],
    disbursedPercentage: 60,
  },
  dprReport: {
    filename: 'DRL Report',
    size: '200KB',
    approved: false,
  },
  dispatch: {
    procurementStarted: '20 Jun 2025',
    materialsProcured: '24 Jun 2025',
    deliveryItems: {
      modulesDelivered: '26 Jun 2025',
      inverterDelivered: '28 Jun 2025',
      structureDelivered: '01 Jul 2025',
      bosDelivered: '07 Jul 2025',
    },
    transporter: {
      name: 'GreenTrans Logistics',
      vehicleNo: 'KA-05-MP-7865',
      driverContact: '+91 98765 43210',
      expectedDelivery: '23 Aug 2025',
      trackingId: 'GTL-DEL-09215',
      status: 'In Transit',
    },
  },
  installation: {
    materialDispatched: '26 Jun 2025',
    materialDelivered: '7 Jul 2025',
    installationStarted: 'In progress',
    panelMounting: 'Completed',
    electricalConnections: 'Completed',
    systemInstallationStarted: '26 Jun 2025',
    systemInstallation: 'Completed',
    installationReport: 'Completed',
    pictures: [],
    completed: false,
  },
};

// Alternative project states for testing different scenarios
export const completedProjectData: ProjectData = {
  ...dummyProjectData,
  statuses: [
    {id: '1', name: 'Site survey', completed: true, current: false},
    {id: '2', name: 'Payment', completed: true, current: false},
    {id: '3', name: 'DPR Report', completed: true, current: false},
    {id: '4', name: 'Dispatch', completed: true, current: false},
    {id: '5', name: 'Installation', completed: true, current: false},
    {id: '6', name: 'Handover', completed: false, current: true},
  ],
  installation: {
    ...dummyProjectData.installation,
    completed: true,
    pictures: [
      'https://via.placeholder.com/200x150/4CAF50/white?text=Install+1',
      'https://via.placeholder.com/200x150/4CAF50/white?text=Install+2',
    ],
  },
};

export const earlyStageProjectData: ProjectData = {
  ...dummyProjectData,
  statuses: [
    {id: '1', name: 'Site survey', completed: false, current: true},
    {id: '2', name: 'Payment', completed: false, current: false},
    {id: '3', name: 'DPR Report', completed: false, current: false},
    {id: '4', name: 'Dispatch', completed: false, current: false},
    {id: '5', name: 'Installation', completed: false, current: false},
    {id: '6', name: 'Handover', completed: false, current: false},
  ],
  siteDetails: {
    ...dummyProjectData.siteDetails,
    confirmed: false,
  },
  dprReport: {
    ...dummyProjectData.dprReport,
    approved: false,
  },
};