

export const  fileUpload = async( file ) => {

    if( !file ){
        throw new Error('No hay ningún archivo a subir')
    }

    const cloudUrl = 'https://api.cloudinary.com/v1_1/dyyacuzl8/image/upload'

    const formData = new FormData()
    formData.append('upload_preset', 'journal-react')
    formData.append('file', file)

    try {
        
        const resp = await fetch( cloudUrl, {
            method: 'POST',
            body: formData
        })

        if( !resp.ok ){
            throw new Error('No se pudo subir la imagen')
        }

        const result = await resp.json()

        return result.secure_url

    } catch (error) {
        console.log(error);
        throw new Error( error.message )
    }

}