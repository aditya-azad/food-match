import React from 'react';
import { PageContainer, CenterContainer } from '../styleComponents';
import Layout from "../Layout";

const Profile = () => {
  return (
    <Layout isHome={false}>
      <PageContainer>
        <CenterContainer>
          <h1>Profile</h1>
        </CenterContainer>
      </PageContainer>
    </Layout>
  );
};

export default Profile;
