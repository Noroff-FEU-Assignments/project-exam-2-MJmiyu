import '../styles/globals.css';
import { AuthAPIProvider } from '../util/AuthAPIContext';
import { APIProvider } from '../util/APIContext';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

const Holidaze = ({ Component, pageProps }) => {
  return (
    <APIProvider>
      <AuthAPIProvider>
        <Component {...pageProps} />
      </AuthAPIProvider>
    </APIProvider>
  );
};

export default Holidaze;
