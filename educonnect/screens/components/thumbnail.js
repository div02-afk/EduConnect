import React, { useState, useEffect } from 'react';
import axios from 'axios';

export function getYouTubeVideoId(url) {
    // Regular expression to match YouTube video ID
    let regExp = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    let match = url.match(regExp);

    // If match found, return the video ID
    if (match && match[1]) {
        return match[1];
    } else {
        return null;
    }
}


export const fetchYouTubeThumbnail = async (url) => {
    const videoId = getYouTubeVideoId(url);
    try {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=YOUR_YOUTUBE_API_KEY`
      );
  
      if (response.data.items.length > 0) {
        const thumbnailUrl = response.data.items[0].snippet.thumbnails.default.url;
        return thumbnailUrl;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error fetching YouTube thumbnail:', error);
      return null;
    }
  };
  