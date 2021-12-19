import React, { useState } from 'react';
import TableProperties from "../../Components/TableProperties";
import { useAppSelector } from '../../app/hooks';
import {
  selectUser,
} from './userSlice';
import { isProduction, log } from '../../Utilties/debug';

export function User() {

  const user = useAppSelector(selectUser);

  const getUserProfile = ():object => user.user || {};
  const getUserToken = ():object => user.token || {};

  const isProductionResult = isProduction().toString();
  log(isProductionResult);

  return (
    <div className="GitHubProfile">
      <h4>GitHub Profile</h4>
        <TableProperties name="GitHub Profile" data={getUserProfile()}/>
        { !isProduction() && 
          <TableProperties name="GitHub Auth Token" data={getUserToken()}/>
        }
    </div>
  );
}
