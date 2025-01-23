import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { UploadPostRoute } from '../../../utils/ApiRoutes';
import axios from 'axios';
import { useSelector } from 'react-redux';
import PostImages from './PostImages';
import { HiOutlineX } from "react-icons/hi";

export default function Create({ setShowCreate }) {
  const [arr, setArr] = useState(1);
  const { handleSubmit, register, reset } = useForm();
  const [images, setImages] = useState([]);

  const handleCloseCreate = () => {
    setShowCreate(false);
    setImages([]);
  };

  const handlePrev = () => {
    setArr((prev) => Math.min(3, prev - 1));
  };

  const handleNext = () => {
    setArr((prev) => Math.max(3, prev + 1));
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    setImages((prev) => [...prev, ...files]);
    if (files.length) {
      setArr(2);
    }
  };

  const handleFileDragOver = (e) => {
    e.preventDefault();
  };

  const handleFileChange = (e) => {
    setImages((prev) => [...prev, ...Array.from(e.target.files)]);
    setArr(2);
  };

  const current = () => {
    switch (arr) {
      case 1:
        return (
          <section>
            <div className="flex flex-col justify-center w-80 lg:w-[30rem]">
              <input
                type="file"
                id="inputfiles"
                multiple
                {...register('files')}
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
              />
              <div
                className="z-50 w-full flex justify-center text-sm lg:text-base h-[34rem]"
                id="inputbox"
              >
                <label
                  htmlFor="inputfiles"
                  className="mt-[40%] w-[50%] h-14 mx-12 bg-blue-500 text-center hover:opacity-75 hover:cursor-grab transition-all pt-4 border-2 border-solid left-0 z-50"
                >
                  Select From Computer
                </label>
              </div>
            </div>
            <section
              className="fixed top-0 left-0 w-screen h-screen bg-gray-400 opacity-30 clip"
              style={{ zIndex: 0 }}
              onDrop={handleFileDrop}
              onDragOver={handleFileDragOver}
            ></section>
          </section>
        );
      case 2:
        return (
          <section className="lg:w-[30rem] w-80 h-[30rem]">
            <PostImages images={images} forpost={false} />
          </section>
        );

      case 3:
        return (
          <>
            <div className="flex flex-col lg:flex lg:flex-row w-min">
              <section className="lg:w-[30rem] w-80 p-2 h-[30rem]">
                <PostImages images={images} forpost={false} />
              </section>
              <div className="border-2 w-80 lg:relative absolute -bottom-12 lg:bottom-0 lg:h-[70%]">
                <textarea
                  {...register('caption')}
                  placeholder="caption"
                  className="top-0 outline-none lg:h-32 w-80"
                  autoFocus
                />
              </div>
              <button className="absolute right-2 -top-9">submit</button>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  const submit = async (formData) => {
    const data = new FormData();
    images.forEach((image) => {
      data.append('files', image);
    });
    data.append('caption', formData.caption);

    try {
      const response = await axios.post(UploadPostRoute, data, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      reset();
      setImages([]);
      setArr(1);
      setShowCreate(false);
      if (window.location.pathname.startsWith("/profile")) {
        location.reload();
      }
    } catch (error) {
      console.error('Error uploading post:', error);
    }
  };

  return (
    <div className="fixed flex justify-center w-screen h-screen pt-2 border-solid lg:pl-12">
      <button
        className="fixed z-50 right-4 top-4 md:text-3xl"
        onClick={handleCloseCreate}
      >
        <HiOutlineX />
      </button>
      <div className="relative border-2 h-[72%] w-[20.6rem] mt-12 lg:mt-0 lg:w-max">
        {arr > 1 && (
          <div className="absolute flex justify-between w-full p-3 border-2 border-b-0 -top-12">
            <button onClick={handlePrev}>Prev</button>
            {arr !== 3 && (
              <button onClick={handleNext}>Next</button>
            )}
          </div>
        )}
        <form onSubmit={handleSubmit(submit)}>
          {current()}
        </form>
      </div>
    </div>
  );
}
