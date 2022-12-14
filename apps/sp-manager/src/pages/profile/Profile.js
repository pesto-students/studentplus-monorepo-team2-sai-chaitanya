import React, { useEffect, useState } from 'react';
import { Listing } from '../../components';
import {
  Avatar,
  Button,
  Card,
  InputGroup,
  HomeOutlined,
  MailOutlined,
  PhoneOutlined,
  Label,
  Col,
  Row,
  Skeleton,
} from '../../../../../libs/ui-shared/src/lib/components/';
import styles from './profile.module.scss';
import { useOktaAuth } from '@okta/okta-react';
import { useHistory } from 'react-router-dom';
import { getUserInfo, getDiscussionsByCohort } from '../../routes/serverCalls';
import { List, Segmented } from 'antd';

function Profile() {
  const { oktaAuth, authState } = useOktaAuth();
  const [userDetails, setUserDetails] = useState({});
  const [userAddress, setUserAddress] = useState('');
  const [userCohorts, setUserCohorts] = useState([]);
  const [discussions, setDiscussions] = useState([]);
  const history = useHistory();

  //get calls for user data and discussions.

  useEffect(() => {
    getUserInfo(authState.idToken.claims.studentid).then((resp) => {
      setUserDetails(resp);
      const address = `${resp.streetAddr}, ${resp.city}, ${resp.state}, ${
        resp.country ? resp.country : ''
      }`;
      getDiscussionsByCohort(resp.cohort).then((res) => {
        setDiscussions(res);
      });
      setUserAddress(address);
    });
  }, []);
  
  useEffect(() => {
    const cohorts = !!userDetails.cohorts ? userDetails.cohorts : [];
    console.log(cohorts);
    setUserCohorts(cohorts);
  }, [userDetails]);

  //Redirect to account settings
  const onEditClickHandler = () => {
    window.sessionStorage.setItem('currentPage', 'ACCOUNT_SETTINGS');
    history.push('/account-settings');
  };

  return (
    <div className={styles.profileContainer}>
      <Row>
        <Col span={14} xs={24} sm={24} md={24} lg={12} xl={12}>
          <Card>
            <div className={styles.avatarCover}>
              <Avatar size={150} src={userDetails.img} />
              <Label strong={false} className={styles.label}>
                {userDetails.firstName} {userDetails.lastName}
              </Label>
            </div>
            <div className={styles.userInfoCover}>
              <InputGroup>
                <Row gutter={8}>
                  <Col span={24}>
                    <div className={styles.profileDataCover}>
                      <HomeOutlined />
                      <Label className={styles.profileLabel}>
                        {userAddress}
                      </Label>
                    </div>
                  </Col>
                  <Col span={24}>
                    <div className={styles.profileDataCover}>
                      <PhoneOutlined />
                      <Label className={styles.profileLabel}>
                        {userDetails.phone}
                      </Label>
                    </div>
                  </Col>
                  <Col span={24}>
                    <div className={styles.profileDataCover}>
                      <MailOutlined />
                      <Label className={styles.profileLabel}>
                        {userDetails.email}
                      </Label>
                    </div>
                  </Col>
                </Row>
              </InputGroup>
              <div className={styles.buttonCover}>
                <Button
                  htmltype="button"
                  className={styles.editProfileBtn}
                  onClickHandler={onEditClickHandler}
                >
                  Edit
                </Button>
              </div>
            </div>
          </Card>
        </Col>
        <Col span={10} xs={24} sm={24} md={24} lg={12} xl={12}>
          <Row>
            <Col span={24}>
              <div className={styles.info}>
                <Card title="Cohorts">
                  {!userCohorts.length ? (
                    <Skeleton loading={true} active></Skeleton>
                  ) : (
                    <List
                      grid={{
                        gutter: 16,
                        xs: 1,
                        sm: 1,
                        md: 1,
                        lg: 1,
                        xl: 1,
                        xxl: 1,
                      }}
                      itemLayout="horizontal"
                      dataSource={userCohorts}
                      renderItem={(item, index) => (
                        <List.Item>
                          <Listing
                            key={index}
                            title={item.cohortID}
                            excerpt="This is a test excerpt"
                            status={item.status}
                            type = "link"
                          />
                        </List.Item>
                      )}
                    />
                  )}
                </Card>
              </div>
            </Col>
            <Col span={24}>
              <div className={styles.info}>
                <Card title="Discussions">
                  {!discussions.length ? (
                    <Skeleton loading={true} active></Skeleton>
                  ) : (
                    <List
                      grid={{
                        gutter: 16,
                        xs: 1,
                        sm: 1,
                        md: 1,
                        lg: 1,
                        xl: 1,
                        xxl: 1,
                      }}
                      itemLayout="horizontal"
                      dataSource={discussions}
                      renderItem={(item, index) => (
                        <List.Item>
                          <Listing
                            key={index}
                            title={item.discussionTitle}
                            description={item.boardDesc}
                            excerpt="This is a test excerpt"
                            type="link"
                          />
                        </List.Item>
                      )}
                    />
                  )}
                </Card>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default Profile;
