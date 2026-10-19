import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteEmail } from "../api/emails";

export function useDeleteEmail() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteEmail,

    onMutate: async (deletedId) => {
      await queryClient.cancelQueries({
        queryKey: ["emails"],
      });

      const previousEmails = queryClient.getQueriesData({
        queryKey: ["emails"],
      });

      queryClient.setQueriesData({ queryKey: ["emails"] }, (oldData) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          data: oldData.data.filter((email) => email.id !== deletedId),
        };
      });

      return { previousEmails };
    },

    onError: (error, deletedId, context) => {
      context?.previousEmails.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data);
      });
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["emails"],
      });
    },
  });
}
