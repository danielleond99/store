import AppRouter from './router';

import 'primereact/resources/themes/md-light-indigo/theme.css';

import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import '/node_modules/primeflex/primeflex.css';

import { ReactElement } from 'react';

function App(): ReactElement {
  return <AppRouter />;
}

export default App;
