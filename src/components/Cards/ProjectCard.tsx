import React from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import { DeleteIcon, SecondaryLogo } from '../../utils/imagesrc';
import ProgressBar from '../../screens/App/Vendor/Home/Components/ProgressBar';
import { MiniLogo } from '../../utils/svgSrc';
import Typo from '../Typo';

interface ProjectCardProps {
  projectDetail: any;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ projectDetail }) => {
  return (
    <View style={{ backgroundColor: '#FFFFFF', borderRadius: 12, padding: 20, elevation: 3, gap: 16 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <View style={{ flexDirection: 'column' }}>
          {projectDetail?.customer?.name && (
            <Typo label={projectDetail?.customer?.name} color='#030204' variant='bodyLargeSecondary' />
          )}
          {projectDetail?.projectCode && (
            <Typo label={`ID: ${projectDetail?.projectCode}`} color='#67606E' variant='bodyMediumTertiary' />
          )}
        </View>
        <TouchableOpacity style={{ backgroundColor: '#CAF7E6', padding: 10, borderRadius: 50 }}>
          <DeleteIcon />
        </TouchableOpacity>
      </View>

      <View>
        <Typo label={projectDetail?.vendor?.name} color='#030204' variant='bodyMediumTertiary' />
        <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 8 }}>
          <Typo label={`₹${Number(projectDetail?.totalAmount)?.toFixed(2)}`} color='#030204' variant='titleLargeSecondary' />
          <Typo label='Value' color='#67606E' variant='bodyMediumTertiary' />
        </View>
      </View>

      <View style={{ gap: 10 }}>
        <ProgressBar percent={projectDetail?.progress} />

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typo label={`${projectDetail?.progress}% completed`} color='#67606E' variant='bodySmallTertiary' />
          {projectDetail?.isLead && (
            <View style={{ flexDirection: 'row', alignItems: "center", gap: 4, backgroundColor: '#D5FCED', paddingVertical: 4, paddingHorizontal: 8, borderRadius: 40 }}>
              <MiniLogo />
              <Typo label={'Lead by Rengy'} color='#030204' variant='bodySmallTertiary' />
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

interface ProjectListProps {
  projects: any[];
}

const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
  return (
    <FlatList
      data={projects}
      renderItem={({ item }) => <ProjectCard projectDetail={item} />}
      contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 24, gap: 20 }}

    />
  );
};

export default ProjectList;
