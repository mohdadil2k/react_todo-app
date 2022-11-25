import { useEffect } from "react";

const ShowAlert = ({message,type,items,showErr}) =>{
    useEffect(()=>{
        const err = setTimeout(()=>{
            showErr()
        },3000)
        return ()=>clearTimeout(err)
    },[items])
    return <p className={`alert alert-${type}`}>{message}</p>
}

export default ShowAlert