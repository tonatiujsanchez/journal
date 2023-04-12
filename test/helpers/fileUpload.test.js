import { v2 as cloudinary } from 'cloudinary'

import { fileUpload } from "../../src/helpers/fileUpload"

cloudinary.config({
    cloud_name: '',
    api_key: '',
    api_secret: '',
    secure: true
})



describe('Pruenas en fileUpload', () => {

    test('Debe de subir el archivo correctamente a Cloudinary', async() => {

        const imageUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png'
        const resp = await fetch( imageUrl )
        const blob = await resp.blob()

        const file = new File([blob], 'foto.png')

        const url = await fileUpload( file )

        
        expect( typeof url ).toBe('string')

        // https://res.cloudinary.com/dyyacuzl8/image/upload/v1681242957/journal/ie8rc0lg40awwh1xfach.png
        const segments = url.split('/')
        const imageId = segments[ segments.length - 1 ].replace('.png', '')

        await cloudinary.api.delete_resources([`journal/${imageId}`], {
            resource_type: 'image'
        })
    })

    test('Debe de retornar null', async() => {

        const file = new File([], 'foto.jpg')

        const url = await fileUpload( file )

        expect( url ).toBe(null)
    })

})