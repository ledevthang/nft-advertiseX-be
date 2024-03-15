import axios from "axios";

export const imageUrlToBuffer = async (imageUrl: string) => {
  const response = await axios({
    url: imageUrl,
    method: "GET",
    responseType: "arraybuffer",
  });

  const buffer = Buffer.from(response.data, "binary");

  return buffer;
};
