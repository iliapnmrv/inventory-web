import { useEffect, useState } from "react"

const useFetch = (url) => {
    const [data, setData] = useState([])
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState()

    useEffect(() => {
        fetch(url)
            .then(res => {
                if (!res.ok) {
                    throw new Error(`Произошла ошибка при получении данных: ${url}`)
                }
                return res.json()
            })
            .then(data => {
                setData(data)
                setIsPending(false)
                setError(null)
            })
            .catch(e => {
                setIsPending(false)
                setError(e.message)
                console.log(e.message);
            })
    }, [url])

    return { data, isPending, error }
}

export default useFetch