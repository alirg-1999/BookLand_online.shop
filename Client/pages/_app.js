import "@/styles/globals.css";
import { AnimatePresence } from "framer-motion";
import { Provider } from "react-redux";
import store from "@/redux/Store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <AnimatePresence>
        <Component {...pageProps} />
      </AnimatePresence>
      <ToastContainer />
    </Provider>
  );
}
