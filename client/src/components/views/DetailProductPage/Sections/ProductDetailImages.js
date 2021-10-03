import React, { useState, useEffect } from 'react'
// import ImageGallery from 'react-image-gallery';

function ProductDetailImages(props) {

    const [Images, setImages] = useState([])

    useEffect(() =>{
      let images = []
      // console.log("props.detail.productDetailImg")
      setImages(props.detail.productDetailImg)

    }, [props])

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
          {props.detail.productDetailImg.map((image, index) => (
              <div key={index}>
                  <img style={{ width: '100%', maxHeight: '600px' }}
                      src={image.path} />
              </div>
          ))}
      </div>
  )
}

export default ProductDetailImages
