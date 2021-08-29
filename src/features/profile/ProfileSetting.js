import { NavLink, Route, useHistory, useParams } from 'react-router-dom';
import Modal from '../Ui/Modal';
import ChangeProfilePhoto from './setting/ChangeProfilePhoto';
import ChangeUserName from './setting/ChangeUserName';
import GeneralSetting from './setting/GeneralSetting';

const ProfileSetting = () => {
  const history = useHistory();
  const { userId } = useParams();

  const closeSetting = () => {
    history.push(`/profile/${userId}`);
  };

  return (
    <Modal onClose={closeSetting}>
      <div className="w-full h-full flex flex-col gap-8">
        <div className="flex gap-4">
          <NavLink
            to={`/profile/${userId}/setting/general`}
            className="p-1"
            activeClassName="border-b-2 border-gray-300"
          >
            General
          </NavLink>
          <NavLink
            to={`/profile/${userId}/setting/profilePhoto`}
            className="p-1"
            activeClassName="border-b-2 border-gray-300"
          >
            Profile photo
          </NavLink>
          <NavLink
            to={`/profile/${userId}/setting/username`}
            className="p-1"
            activeClassName="border-b-2 border-gray-300"
          >
            Username
          </NavLink>
        </div>
        <div>
          <Route path="/profile/:userId/setting/general">
            <GeneralSetting />
          </Route>
          <Route path="/profile/:userId/setting/profilePhoto">
            <ChangeProfilePhoto />
          </Route>
          <Route path="/profile/:userId/setting/username">
            <ChangeUserName />
          </Route>
        </div>
      </div>
    </Modal>
  );
};

export default ProfileSetting;
