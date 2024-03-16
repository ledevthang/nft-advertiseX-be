import axios from "axios";

export const imageUrlToBuffer = async (imageUrl: string) => {
  console.log("imageUrl: ", imageUrl);

  const response = await axios({
    url: imageUrl,
    method: "GET",
    responseType: "arraybuffer",
  });

  const buffer = Buffer.from(response.data, "binary");

  console.log("buffer: ", buffer);

  return buffer;
};
