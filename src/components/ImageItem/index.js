import './index.css'

const ImageItem = props => {
  const {imageDetails, clickThumbnail} = props
  const {id, thumbnailUrl} = imageDetails

  const onClickThumbnail = () => {
    clickThumbnail(id)
  }

  return (
    <li className="thumbnail-item">
      <button
        type="button"
        className="thumbnail-button"
        onClick={onClickThumbnail}
      >
        <img src={thumbnailUrl} alt="thumbnail" className="thumbnail-image" />
      </button>
    </li>
  )
}

export default ImageItem
