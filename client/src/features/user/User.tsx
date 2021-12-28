import { DetailsListBasic } from "../../Components/DetailsListBasic";
import { useAppSelector } from '../../app/hooks';
import {
  selectUser,
} from './userSlice';
import {
  selectEnvironment,
} from '../../features/environment/environmentSlice';

export function User() {

  const user = useAppSelector(selectUser);
  const environment = useAppSelector(selectEnvironment);

  const getUserProfile = ():object => user.user || {};
  const getUserToken = ():object => user.token || {};

  return (
    <div className="GitHubProfile">
      <h4>GitHub Profile</h4>
        <DetailsListBasic name="GitHub Profile" data={getUserProfile()}/>
        { !environment.isProduction && 
          <DetailsListBasic name="GitHub Auth Token" data={getUserToken()}/>
        }
    </div>
  );
}
