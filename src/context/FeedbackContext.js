import React from "react";
import { createContext ,useState } from "react";
import { v4 as uuidv4} from 'uuid'


const FeedbackContext = createContext()


export const FeedbackProvider = ({children}) =>{
    const[feedback, setFeedback] = useState([
        {
            id: 1,
            text: 'This is Feedback item 1',
            rating: 10,
        },
        {
            id: 2,
            text: 'This is Feedback item 2',
            rating: 5,
        },
        {
            id: 3,
            text: 'This is Feedback item 3',
            rating: 8,
        }
    ])
    // Update feedback Item
    const updateFeedback = (id, updItem) =>{
        setFeedback(feedback.map((item) => item.id === id ? { ... item, ...updItem } : item))
    }

    // Set Feedback
    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false
    })
    
    // Delete feedback
    const deleteFeedback = (id) =>{
        if(window.confirm('Delete Item?')){
            setFeedback(feedback.filter((item) => item.id !== id))
        }
    }

    // Add Feedback
    const addFeedback = (newFeedback) => {
        newFeedback.id = uuidv4();
        setFeedback([newFeedback, ...feedback])
    }

    // Edit Feedback
    const editFeedback= (item) => {
        setFeedbackEdit({
            item,
            edit: true
        })
    }

    return <FeedbackContext.Provider value={{
        feedback,
        feedbackEdit,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback,
    }}>
        {children}
    </FeedbackContext.Provider>
} 

export default FeedbackContext