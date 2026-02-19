import * as SecureStore from "expo-secure-store";


export const storeAccessToken = async (token:string):Promise<void> =>{
    try{
       await SecureStore.setItemAsync("access_token", token);
    }catch(error){
        console.error("Error storing access token:",error);
    }
}
export const removeAccessToken = async ():Promise<void> =>{
    try{ 
        await SecureStore.deleteItemAsync("access_token");
    }catch(error){
        console.error("Error storing access token:",error);
    }
}