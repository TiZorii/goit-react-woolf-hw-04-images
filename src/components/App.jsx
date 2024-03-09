import React, { useState, useEffect } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import styles from './App.module.css';
import { getImg } from '../api/images-api';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';

const App = () => {
  const [images, setImages] = useState([]);
  const [isLoader, setIsLoader] = useState(false);
  const [currentTargetPage, setCurrentTargetPage] = useState(1);
  const [allPages, setAllPages] = useState(0);
  const [search, setSearch] = useState('');
  const [largeImageURL, setLargeImageURL] = useState('');
  const [tags, setTags] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoader(true);
      try {
        const { hits, totalHits } = await getImg(search, currentTargetPage);
        const formattedImages = hits.map(({ id, largeImageURL, webformatURL, tags }) => ({
          id,
          largeImageURL,
          webformatURL,
          tags,
        }));
        setImages(prevImages => [...prevImages, ...formattedImages]);
        setAllPages(Math.ceil(totalHits / 12));
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoader(false);
      }
    };

    if (search !== '') {
      fetchData();
    }
  }, [search, currentTargetPage]);

  const onSubmit = searchValue => {
    setSearch(searchValue);
    setImages([]);
    setCurrentTargetPage(1);
  };

  const loadMore = () => {
    setCurrentTargetPage(prevPage => prevPage + 1);
  };

  const toggleModal = (imageURL, imageTags) => {
    setShowModal(prevShowModal => !prevShowModal);
    setLargeImageURL(imageURL);
    setTags(imageTags);
  };

  return (
    <div className={styles.App}>
      {showModal && (
        <Modal closeModal={toggleModal}>
          <img src={largeImageURL} alt={tags} />
        </Modal>
      )}
      <Searchbar onSubmit={onSubmit} />
      <ImageGallery images={images} openModal={toggleModal} />
      {images.length > 0 && !isLoader && allPages !== currentTargetPage && (
        <Button onClick={loadMore}>Load more</Button>
      )}
      {isLoader && <Loader />}
    </div>
  );
};

export default App;
