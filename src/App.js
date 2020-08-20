import React, { useState, useEffect } from "react";
import { Container, Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import Header from "./components/Header";
import SendTweet from "./components/SendTweet";
import { TWEET_STORAGE } from "./utils/constants";
import ListTweets from "./components/ListTweets"

function App() {
  const [toastProps, setToastProps] = useState({
    open: false,
    text: null,
    type: null,
  });

  const [allTweets, setAllTweets] = useState([]);

  const [reloadTweets, setReloadTweets] = useState(false)

  useEffect(() => {
    const AllTweetsStorage = localStorage.getItem(TWEET_STORAGE);
    const allTweetsArray = JSON.parse(AllTweetsStorage);
    setAllTweets(allTweetsArray);
    setReloadTweets(false)
  }, [reloadTweets]);

  const deleteTweet = (index) => {
    allTweets.splice(index,1)
    setAllTweets(allTweets)
    localStorage.setItem(TWEET_STORAGE, JSON.stringify(allTweets))
    setReloadTweets(true)
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setToastProps({
      ...toastProps,
      open: false,
      text: null,
    });
  };

  return (
    <Container className="tweets-simulator" maxWidth={false}>
      <Header />
      <SendTweet
        setToastProps={setToastProps}
        allTweets={allTweets}
        setAllTweets={setAllTweets}
      />
      <ListTweets allTweets={allTweets} deleteTweet={deleteTweet}/>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={toastProps.open}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <Alert severity={toastProps.type}>{toastProps.text}</Alert>
      </Snackbar>
    </Container>
  );
}

export default App;
