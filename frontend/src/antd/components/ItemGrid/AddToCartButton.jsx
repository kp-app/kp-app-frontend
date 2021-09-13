import { addItem, removeItem } from "../../../app/productsSlice"
import {Button} from "antd"
import { useDispatch } from "react-redux"
import { useState } from "react"
import { CheckOutlined } from "@ant-design/icons"
export const AddButton = props => {
    // useMemo??
    const [isAdded, toggleAdd] = useState(false)
    const dispatch = useDispatch()
    const handleToggle = (e) => {
        toggleAdd(prevState => !prevState)
        !isAdded ? dispatch(addItem(props.item)) : dispatch(removeItem(props.item))
        let delay;
        !isAdded ? delay = setTimeout(() => {
            toggleAdd(prevState => !prevState)
        }, 2500) : null
        return (delay) => {
            delay ? clearTimeout(delay) : null 
        } 
    }
    return <Button icon={isAdded ? <CheckOutlined /> : null} onClick={handleToggle}>{isAdded ? "Добавлено в КП" : "Добавить в КП"}</Button>
}