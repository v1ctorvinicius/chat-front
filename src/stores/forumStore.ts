import type { Forum } from "@/types/forum";
import { defineStore } from "pinia";
import { ref } from "vue";
import axiosInstance from "@/plugins/axiosConfig";
import { arraysEqual } from "@/util/arrays";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export const useForumStore = defineStore("forumStore", () => {
  const forums = ref<Forum[]>([]);

  function updateForums() {
    axiosInstance.get(apiBaseUrl + "/forums/").then((res) => {
      const response = res.data as Forum[];
      // console.log("response: ", response);

      const currentForums = forums.value;

      const forumsDifference = response.filter((forum) => {
        return !currentForums.some(
          (currentForum) => currentForum.id === forum.id
        );
      });

      // console.log("forumsDifference: ", forumsDifference);

      // Atualiza os fóruns se houver diferença
      if (forumsDifference.length > 0) {
        forums.value.push(...forumsDifference);
      }
    });
  }

  return { forums, updateForums };
});
