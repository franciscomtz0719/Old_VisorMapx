import { CContainer, CFade } from '@coreui/react';
import React, { Suspense } from 'react';
import {
  Redirect,
  Route,
  Switch
} from 'react-router-dom';
import routes from '../routes';
import './Containers.css';

  
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

const TheContent = () => {

  return (
    <main className="c-main">
      <CContainer fluid>
        <Suspense fallback={loading}>
          <Switch>
            {routes.map((route, idx) => {
              return route.component && (
                
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  
                  render={props => (                 
                    <CFade>
                      <route.component {...props} />
                    </CFade>
                  )} />
              )

            })}
            <Redirect from="/" to="/landpage" />
          </Switch>
        </Suspense>
      </CContainer>
    </main>
  )
}

export default React.memo(TheContent)
