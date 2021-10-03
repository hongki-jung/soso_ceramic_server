import React, { useState, useEffect } from 'react'
import ImageGallery from 'react-image-gallery';

function ProductImage(props) {

    const [Images, setImages] = useState([])

    useEffect(() =>{
      if (props.detail.main_image_path){
        let images = []
      
        images.push({
          original: props.detail.main_image_path,
          // thumbnail: props.detail.main_image_path
        })
        // console.log("images",images)
        setImages(images)
        // console.log("Images ???",Images)
      }

    }, [props.detail])

    // useEffect(() => {

    //     if (props.detail.images && props.detail.images.length > 0) {
    //         let images = []

    //         props.detail.images.map(item => {
    //             images.push({
    //                 original: `http://localhost:5000/${item}`,
    //                 thumbnail: `http://localhost:5000/${item}`
    //             })
    //         })
    //         setImages(images)
    //     }

    // }, [props.detail])


    return (
        <div>
            {Images && Images.length > 0 ? <ImageGallery items={Images} /> : null}
        </div>
    )
}



export default ProductImage
