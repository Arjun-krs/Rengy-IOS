import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  SafeAreaView,
} from 'react-native';
import ProgressBar from './components/ProgressBar';
import CollapsibleSection from './components/CollapsibleSection';
import FeedbackModal from './components/FeedbackModal';
import SuccessModal from './components/SuccessModal';
import {ProjectData, FeedbackData} from './types';
import {dummyProjectData} from './data/dummyData';

const ProjectDetailsScreen: React.FC = () => {
  const [projectData, setProjectData] = useState<ProjectData>(dummyProjectData);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const handleFeedbackSubmit = (feedback: FeedbackData) => {
    console.log('Feedback submitted:', feedback);
    setFeedbackSubmitted(true);
    setShowFeedback(false);
    setShowSuccess(true);
  };

  const handleConfirmProceed = () => {
    const updatedData = {
      ...projectData,
      siteDetails: {
        ...projectData.siteDetails,
        confirmed: true,
      },
    };
    setProjectData(updatedData);
    Alert.alert('Success', 'Site survey confirmed! Proceeding to next step.');
  };

  const handleApproveDPR = () => {
    const updatedData = {
      ...projectData,
      dprReport: {
        ...projectData.dprReport,
        approved: true,
      },
    };
    setProjectData(updatedData);
    Alert.alert('Success', 'DPR Report approved!');
  };

  const handleUploadPictures = () => {
    // Simulate adding installation pictures
    const updatedData = {
      ...projectData,
      installation: {
        ...projectData.installation,
        pictures: [
          'https://via.placeholder.com/200x150/4CAF50/white?text=Solar+Panel+1',
          'https://via.placeholder.com/200x150/4CAF50/white?text=Solar+Panel+2',
        ],
      },
    };
    setProjectData(updatedData);
    Alert.alert('Success', 'Installation pictures uploaded!');
  };

  const handleProjectCompletion = () => {
    const updatedData = {
      ...projectData,
      statuses: projectData.statuses.map(status =>
        status.id === '5'
          ? {...status, completed: true, current: false}
          : status.id === '6'
          ? {...status, current: true}
          : status
      ),
      installation: {
        ...projectData.installation,
        completed: true,
      },
    };
    setProjectData(updatedData);
    Alert.alert('Success', 'Project installation completed!');
  };

  const InfoRow = ({label, value}: {label: string; value: string}) => (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );

  const StatusBadge = ({
    status,
    type = 'default',
  }: {
    status: string;
    type?: 'success' | 'warning' | 'info' | 'default';
  }) => {
    const getStatusStyle = () => {
      switch (type) {
        case 'success':
          return styles.successBadge;
        case 'warning':
          return styles.warningBadge;
        case 'info':
          return styles.infoBadge;
        default:
          return styles.defaultBadge;
      }
    };

    return (
      <View style={[styles.badge, getStatusStyle()]}>
        <Text style={[styles.badgeText, getStatusStyle()]}>{status}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          <Text style={styles.projectId}>#{projectData.id}</Text>
        </View>

        {/* Tab Navigation */}
        <View style={styles.tabContainer}>
          <View style={styles.activeTab}>
            <Text style={styles.activeTabText}>Overview</Text>
          </View>
          <TouchableOpacity style={styles.inactiveTab}>
            <Text style={styles.inactiveTabText}>Message</Text>
          </TouchableOpacity>
        </View>

        {/* Progress Bar */}
        <ProgressBar statuses={projectData.statuses} />

        {/* Sections */}
        <View style={styles.sectionsContainer}>
          {/* Site Survey */}
          <CollapsibleSection title="Site survey" expanded>
            <Text style={styles.sectionSubtitle}>Site details</Text>
            <InfoRow
              label="Site visit date (Scheduled)"
              value={projectData.siteDetails.visitDate}
            />
            <InfoRow
              label="Site visit time"
              value={projectData.siteDetails.visitTime}
            />
            <InfoRow label="Location" value={projectData.siteDetails.location} />

            <View style={styles.layoutContainer}>
              <Text style={styles.layoutTitle}>
                Proposed site layout (PDF / 3D)
              </Text>
              <Image
                source={{uri: projectData.siteDetails.layoutImage}}
                style={styles.layoutImage}
              />
              <TouchableOpacity style={styles.downloadButton}>
                <Text style={styles.downloadButtonText}>
                  ⬇ Download design pdf
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.agreementTitle}>
              Awaiting agreement acceptance
            </Text>
            <View style={styles.documentRow}>
              <View style={styles.documentInfo}>
                <Text style={styles.documentIcon}>📄</Text>
                <View>
                  <Text style={styles.documentName}>
                    {projectData.siteDetails.slaDoc}
                  </Text>
                  <Text style={styles.documentSize}>200KB</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.downloadIcon}>
                <Text style={styles.downloadButtonText}>⬇</Text>
              </TouchableOpacity>
            </View>
            
            {projectData.siteDetails.confirmed ? (
              <StatusBadge status="Agreement Confirmed" type="success" />
            ) : (
              <TouchableOpacity
                style={styles.proceedButton}
                onPress={handleConfirmProceed}>
                <Text style={styles.proceedButtonText}>Confirm to proceed</Text>
              </TouchableOpacity>
            )}
          </CollapsibleSection>

          {/* Payment */}
          <CollapsibleSection title="Payment">
            <InfoRow
              label="Loan amount requested"
              value={`₹${projectData.payment.loanAmount.toLocaleString()}`}
            />
            <InfoRow
              label="Application submitted"
              value={projectData.payment.applicationDate}
            />
            <InfoRow label="Status" value={projectData.payment.status} />
            <InfoRow
              label="Documents uploaded"
              value={projectData.payment.documentsUploaded.join(', ')}
            />
          </CollapsibleSection>

          {/* DPR Report */}
          <CollapsibleSection title="DPR Report">
            <View style={styles.documentRow}>
              <View style={styles.documentInfo}>
                <Text style={styles.documentIcon}>📄</Text>
                <View>
                  <Text style={styles.documentName}>
                    {projectData.dprReport.filename}
                  </Text>
                  <Text style={styles.documentSize}>
                    {projectData.dprReport.size}
                  </Text>
                </View>
              </View>
              <TouchableOpacity style={styles.downloadIcon}>
                <Text style={styles.downloadButtonText}>⬇</Text>
              </TouchableOpacity>
            </View>
            
            {projectData.dprReport.approved ? (
              <StatusBadge status="Approved" type="success" />
            ) : (
              <TouchableOpacity
                style={styles.approveButton}
                onPress={handleApproveDPR}>
                <Text style={styles.approveButtonText}>Approve</Text>
              </TouchableOpacity>
            )}
          </CollapsibleSection>

          {/* Dispatch */}
          <CollapsibleSection title="Dispatch">
            <Text style={styles.sectionSubtitle}>Procurement in Progress</Text>
            <InfoRow
              label="Procurement Started"
              value={projectData.dispatch.procurementStarted}
            />
            <InfoRow
              label="Materials Procured"
              value={projectData.dispatch.materialsProcured}
            />

            <Text style={styles.sectionSubtitle}>Dispatch progress</Text>
            <InfoRow
              label="Modules delivered at site"
              value={projectData.dispatch.deliveryItems.modulesDelivered}
            />
            <InfoRow
              label="Inverter delivered at site"
              value={projectData.dispatch.deliveryItems.inverterDelivered}
            />
            <InfoRow
              label="Structure delivered at site"
              value={projectData.dispatch.deliveryItems.structureDelivered}
            />
            <InfoRow
              label="BoS Delivered at site"
              value={projectData.dispatch.deliveryItems.bosDelivered}
            />

            <Text style={styles.sectionSubtitle}>Transporter details</Text>
            <InfoRow
              label="Transporter"
              value={projectData.dispatch.transporter.name}
            />
            <InfoRow
              label="Vehicle No"
              value={projectData.dispatch.transporter.vehicleNo}
            />
            <InfoRow
              label="Driver contact"
              value={projectData.dispatch.transporter.driverContact}
            />
            <InfoRow
              label="Expected delivery"
              value={projectData.dispatch.transporter.expectedDelivery}
            />
            <InfoRow
              label="Tracking ID"
              value={projectData.dispatch.transporter.trackingId}
            />
            <InfoRow
              label="Status"
              value={projectData.dispatch.transporter.status}
            />

            <TouchableOpacity style={styles.supportButton}>
              <Text style={styles.supportButtonText}>Call for support</Text>
            </TouchableOpacity>
          </CollapsibleSection>

          {/* Installation */}
          <CollapsibleSection title="Installation" expanded>
            <InfoRow
              label="Material dispatched"
              value={projectData.installation.materialDispatched}
            />
            <InfoRow
              label="Material delivered"
              value={projectData.installation.materialDelivered}
            />
            <InfoRow
              label="Installation started"
              value={projectData.installation.installationStarted}
            />
            <InfoRow
              label="Panel mounting"
              value={projectData.installation.panelMounting}
            />
            <InfoRow
              label="Electrical connections"
              value={projectData.installation.electricalConnections}
            />

            {projectData.installation.pictures.length > 0 && (
              <View style={styles.picturesContainer}>
                <Text style={styles.picturesTitle}>Installation pictures</Text>
                <View style={styles.picturesGrid}>
                  {projectData.installation.pictures.map((pic, index) => (
                    <View key={index} style={styles.pictureContainer}>
                      <Image source={{uri: pic}} style={styles.installationPicture} />
                      <View style={styles.pictureOverlay}>
                        <Text style={styles.pictureIcon}>📷</Text>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            )}

            <View style={styles.uploadContainer}>
              <Text style={styles.uploadTitle}>
                Help us complete your project record by uploading photos of your
                installed system.
              </Text>
              
              {projectData.installation.pictures.length === 0 ? (
                <TouchableOpacity
                  style={styles.uploadButton}
                  onPress={handleUploadPictures}>
                  <Text style={styles.uploadButtonText}>
                    Upload installation pictures
                  </Text>
                </TouchableOpacity>
              ) : (
                <View style={styles.completedContainer}>
                  <StatusBadge status="Pictures Uploaded" type="success" />
                  {!projectData.installation.completed && (
                    <TouchableOpacity
                      style={styles.completeButton}
                      onPress={handleProjectCompletion}>
                      <Text style={styles.completeButtonText}>
                        Confirm project completion
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}
            </View>
          </CollapsibleSection>

          {/* Project Handover */}
          <CollapsibleSection title="Project handover">
            {projectData.installation.completed ? (
              <View style={styles.handoverContainer}>
                <Text style={styles.handoverTitle}>
                  Project completed successfully!
                </Text>
                <Text style={styles.handoverSubtitle}>
                  Your solar installation is now ready. You can start generating
                  clean energy right away.
                </Text>
                <StatusBadge status="Ready for Handover" type="success" />
              </View>
            ) : (
              <Text style={styles.pendingText}>
                Handover will be available once installation is completed.
              </Text>
            )}
          </CollapsibleSection>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtonsContainer}>
          {projectData.installation.completed && !feedbackSubmitted && (
            <TouchableOpacity
              style={styles.feedbackButton}
              onPress={() => setShowFeedback(true)}>
              <Text style={styles.feedbackButtonText}>Give Feedback</Text>
            </TouchableOpacity>
          )}

          {feedbackSubmitted && (
            <View style={styles.thankYouContainer}>
              <Text style={styles.thankYouText}>
                Thank you for your feedback! 🎉
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      <FeedbackModal
        visible={showFeedback}
        onClose={() => setShowFeedback(false)}
        onSubmit={handleFeedbackSubmit}
      />

      <SuccessModal
        visible={showSuccess}
        onClose={() => setShowSuccess(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  backButton: {
    marginRight: 16,
    padding: 4,
  },
  backArrow: {
    fontSize: 20,
    color: '#333',
    fontWeight: 'bold',
  },
  projectId: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  activeTab: {
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  activeTabText: {
    color: '#333',
    fontWeight: '600',
    fontSize: 14,
  },
  inactiveTab: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  inactiveTabText: {
    color: '#666',
    fontSize: 14,
  },
  sectionsContainer: {
    padding: 16,
  },
  sectionSubtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
    marginTop: 8,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    alignItems: 'flex-start',
  },
  infoLabel: {
    flex: 1,
    color: '#666',
    fontSize: 14,
    marginRight: 16,
  },
  infoValue: {
    color: '#333',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'right',
    flex: 0.7,
  },
  layoutContainer: {
    marginVertical: 16,
  },
  layoutTitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    fontWeight: '500',
  },
  layoutImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: '#f0f0f0',
  },
  downloadButton: {
    alignSelf: 'flex-start',
  },
  downloadButtonText: {
    color: '#4CAF50',
    fontSize: 14,
    fontWeight: '500',
  },
  agreementTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginTop: 20,
    marginBottom: 12,
  },
  documentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  documentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  documentIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  documentName: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  documentSize: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  downloadIcon: {
    padding: 8,
  },
  proceedButton: {
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  proceedButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '500',
  },
  approveButton: {
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 16,
  },
  approveButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '500',
  },
  supportButton: {
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 16,
  },
  supportButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '500',
  },
  uploadContainer: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
  },
  uploadTitle: {
    fontSize: 14,
    color: '#333',
    marginBottom: 16,
    lineHeight: 20,
  },
  uploadButton: {
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  uploadButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '500',
  },
  picturesContainer: {
    marginTop: 16,
  },
  picturesTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  picturesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  pictureContainer: {
    width: '48%',
    marginRight: '2%',
    marginBottom: 8,
    position: 'relative',
  },
  installationPicture: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  pictureOverlay: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 4,
    padding: 4,
  },
  pictureIcon: {
    fontSize: 16,
  },
  completedContainer: {
    alignItems: 'center',
  },
  completeButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 16,
    width: '100%',
  },
  completeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  handoverContainer: {
    alignItems: 'center',
    padding: 16,
  },
  handoverTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
  },
  handoverSubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 20,
  },
  pendingText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: 'center',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  successBadge: {
    backgroundColor: '#E8F5E8',
  },
  warningBadge: {
    backgroundColor: '#FFF3CD',
  },
  infoBadge: {
    backgroundColor: '#D1ECF1',
  },
  defaultBadge: {
    backgroundColor: '#F8F9FA',
  },
  actionButtonsContainer: {
    padding: 16,
  },
  feedbackButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
  },
  feedbackButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  thankYouContainer: {
    backgroundColor: '#E8F5E8',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  thankYouText: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: '600',
  },
});

export default ProjectDetailsScreen;