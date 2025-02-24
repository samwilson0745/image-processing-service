import axios from "axios";

async function uploadFile(file:File){
    const formdata = new FormData();
    formdata.append('file',file)
    try{
        const response = await axios.post(
            "http://localhost:3000/api/image/upload-image",
            formdata,
            {
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            }
        )
        return response.data.message
    }catch(err){
        throw Error("Error while uploading Image")
    }
}