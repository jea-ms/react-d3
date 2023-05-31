const Item = ({ item, setTime }) => {
    let msg = ''
    let recDate = item[3].split(' ')
    let recTime = recDate[1].split(":")
    let hour = recTime[0]
    if(parseInt(setTime) === parseInt(hour)) {
        msg = " " + recDate[1] + " " + item[2] + item[3]
    }
    return (
        <>
            {msg ?? ""}
        </>

    )
}

export default Item