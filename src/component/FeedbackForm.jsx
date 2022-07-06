import React from "react"
import { useState, useContext, useEffect } from "react"
import RatingSelect from "./RatingSelect"
import Card from "./shared/Card"
import Button from "./shared/Button"
import FeedbackContext from "../context/FeedbackContext"


function FeedbackForm() {
    const [text, setText] = useState('')
    const [rating, setRating] = useState(10)
    const [btnDisabled, setBtnDisabled] = useState(true)
    const [msg, setMsg] = useState('')
    
    const { addFeedback, feedbackEdit, updateFeedback } = useContext(FeedbackContext)

    useEffect( () => {
        if(feedbackEdit.edit === true){
            setBtnDisabled(false)
            setText(feedbackEdit.item.text)
            setRating(feedbackEdit.item.rating)
        }
    }, [feedbackEdit] )

    const handleTextChange = (e) =>{
        if(text === ''){
            setBtnDisabled(true)
            setMsg(null)
        } else if (text !== '' && text.trim().length <= 10) {
            setMsg('Text must be 10 characters')
            setBtnDisabled(true)
        }else {
            setMsg(null)
            setBtnDisabled(false)
        }
        setText(e.target.value)
    } 

    const handleSubmit = (e) => {
        e.preventDefault()
        if(text.trim().length > 10){
            const newFeedback = {
               text,
               rating
            }

            if(feedbackEdit.edit === true){
                updateFeedback(feedbackEdit.item.id, newFeedback)
            } else{
                addFeedback(newFeedback);
            }

            setText('')
        }

    }


  return (
    <Card>
        <form onSubmit={handleSubmit}>
            <h2>Rate me Please</h2>
            <RatingSelect select={(rating) => setRating(rating)}/>
            <div className="input-group">
                <input onChange={handleTextChange} type="text" placeholder="Write a Review" value={text}/>

                <Button type='submit' isDisabled={btnDisabled}>Send</Button>
            </div>
            {msg && <div className='message'>{msg}</div>}
        </form>
    </Card>
  )
}

export default FeedbackForm