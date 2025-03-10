
import { useState, useEffect } from 'react'

export const useFetch = (url) => {
    const [data, setData] = useState(null)
    // Refatorando o post
    const [config, setConfig] = useState(null)
    const [method, setMethod] = useState(null)
    const [callFetch, setCallFetch] = useState(false)
    // Loading
    const [loading, setLoading] = useState(false)

    //Tratando erros
    const [error, setError] = useState(null)

    //Remover itens desafio 6
    const [itemId, setItemId] = useState(null)

    const httpConfig = (data, method) => {
        if(method === "POST") {
            setConfig({
                method,
                headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(data)
            });
            setMethod(method);
        } else if(method === "DELETE") {
            setConfig({
                method,
                headers: {
                    "Content-Type": "application/json",
                  },
            });
            setMethod(method);
            setItemId(data)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const res = await fetch(url);
                const json = await res.json();
                setData(json);
            } catch (error) {
                console.log(error.message)
                setError("Houve erro em carregar a pagina")
            }
            setLoading(false)
        };
        
        fetchData();
    
    }, [url, callFetch]);

    // refatorando post
    useEffect(() => {
        const httpRequest = async () => {
            let json
            if(method === "POST") {
                let fetchOptions = [url, config];
                const res = await fetch(...fetchOptions);
                json = await res.json()
                
            } else if(method === "DELETE") {
                let removeUrl = `${url}/${itemId}`
                const res = await fetch(removeUrl, config)
                json = await res.json()
            }
            setCallFetch(json)
        };

        httpRequest();
    }, [config, method, url]);

    return {data, httpConfig, loading, error};


}