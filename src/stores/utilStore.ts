import { defineStore } from "pinia";
import { ref } from "vue";

const useUtilStore = defineStore("util", () => {
  const images = ref();

  return {images};
});

export default useUtilStore;
