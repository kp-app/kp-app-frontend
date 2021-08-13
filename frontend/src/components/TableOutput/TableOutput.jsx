import { useSelector } from "react-redux"

export const TableOutput = (props) => {
    const data = useSelector(state => state.products.addedProducts)
    const tableData = [(
        <tr>
            <td>Номер позиции</td>
            <td>Оборудование</td>
            <td>Количество</td>
            <td>Цена, евро</td>
        </tr>
    )].concat( 
    data.map((entry, index) => {
        return (
            <tr>
                <td>{index + 1}</td>
                <td>{entry.fullName}</td>
                <td>{entry.quantity}</td>
                <td>{entry.price * entry.quantity}</td>
            </tr>
        )
    }))
    return (
        <div>
            <table>{tableData}</table>
        </div>
    )
}

