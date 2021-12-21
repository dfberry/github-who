import TableProperties from "../../Components/TableProperties";
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
        <TableProperties name="GitHub Profile" data={getUserProfile()}/>
        { !environment.isProduction && 
          <TableProperties name="GitHub Auth Token" data={getUserToken()}/>
        }
    </div>
  );
}
