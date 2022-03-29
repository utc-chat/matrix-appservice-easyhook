import React from 'react';
import PrivateRoute from '../routing/PrivateRoute';
import SettingsPage from '../Settings';
import BotPage from '../Bot';
import RoomPage from '../Room';
import RulePage from '../Rule';
import RulesPage from '../Rules';

const RouteTree = () => {
  return (
    <React.Fragment>
      <PrivateRoute exact path='/settings' component={SettingsPage} />
      <PrivateRoute exact path='/bot' component={BotPage} />
      <PrivateRoute exact path='/room' component={RoomPage} />
      <PrivateRoute exact path='/rule' component={RulePage} />
      <PrivateRoute exact path='/rules' component={RulesPage} />
      <PrivateRoute exact path='/' component={SettingsPage} />
    </React.Fragment>
  )
}

export default RouteTree;