import React, {useState} from 'react';
import {Fab} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import moment from 'moment'
import ModalContainer from '../ModalContainer'
import FormSendTweet from '../FormSendTweet'

import {TWEET_STORAGE} from '../../utils/constants'

import './SendTweet.scss'

const SendTweet = (props) => {

  const {allTweets,setToastProps, setAllTweets} = props

  const [isOpenModal, setIsOpenModal] = useState(false)

  const openModal = () => {
    setIsOpenModal(true)
  }

  const closeModal = () => {
    setIsOpenModal(false)
  }

  const sendTweet = (event, formValue) => {
    event.preventDefault();
    const {name, tweet} = formValue
    let allTweetsArray = []

    if(allTweets){
      allTweetsArray = allTweets
    }

    if(!name || !tweet){
      setToastProps({
        open: true,
        text: "WARNING: Todos los campos son obligatorios",
        type: "error"
      })
    }else{
      formValue.time = moment();
      allTweetsArray.push(formValue)
      localStorage.setItem(TWEET_STORAGE, JSON.stringify(allTweetsArray))
      const AllTweetsStorage = localStorage.getItem(TWEET_STORAGE)
      setAllTweets(JSON.parse(AllTweetsStorage))
      setToastProps({
        open: true,
        text: "Tweet enviado correctamente",
        type: "success"
      })
      closeModal()
    }
    allTweetsArray = []
  }

  return (
    <div className="send-tweet">
      <Fab
        className="send-tweet__open-modal"
        color="primary"
        aria-label="add"
        onClick={openModal}
      >
        <AddIcon/>
      </Fab>
      <ModalContainer isOpenModal={isOpenModal} closeModal={closeModal}>
        <FormSendTweet sendTweet={sendTweet}/>
      </ModalContainer>
    </div>
  );
}

export default SendTweet;
