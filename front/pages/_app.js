import wrapper from '../store/configureStore'
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datetime/css/react-datetime.css";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default wrapper.withRedux(MyApp);
