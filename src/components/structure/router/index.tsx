import * as React from 'react';
import { Route, Switch, RouteComponentProps, withRouter } from 'react-router-dom';

export const navItems = [{
  label: 'Inbox',
  to: '/',
  exact: true,
  icon: 'inbox',
}, {
  label: 'Starred',
  to: `/starred`,
  icon: 'star',
}, {
  label: 'Send mail',
  to: `/send-mail`,
  icon: 'send',
}, {
  label: 'Drafts',
  to: `/drafts`,
  icon: 'drafts',
}];

const Content = React.lazy(() => import('../../content/content').then(x => ({ default: x.Content })))

type AppRouterProps = RouteComponentProps<{}>;
const AppRouterComponent: React.FunctionComponent<AppRouterProps> = (props) => (
  <Switch key={props.location.pathname}>
    {navItems.map(x => <React.Suspense fallback={`I'm loading ${x.label} here`}><Route key={x.label} path={x.to} exact={x.exact} component={Content} /></React.Suspense>)}
  </Switch>
);

export const AppRouter = withRouter(AppRouterComponent); 