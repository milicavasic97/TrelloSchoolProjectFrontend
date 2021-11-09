import { toast } from "react-toastify";

export const handleInsertError = (error) => {
    console.log(error);
    if(error.response.status === 409)
        toast.error("Duplicate!");
    else
        toast.error("Insert failed!");
} 

export const handleEditError = (error) => {
    console.log(error);
    if(error.response.status === 409)
        toast.error("Duplicate!");
    else
        toast.error("Edit failed!");
}

export const handleDeleteError = (error) => {
    console.log(error);
    toast.error("Delete failed!");
}