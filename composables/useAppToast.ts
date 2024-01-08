interface IToastOptions {
    id?: string;
    title?: string;
    description?: string;
    icon?: string;
}

export const useAppToast = () => {
    const toast = useToast();
  
    return {
      toastSuccess: ({ title, description }: IToastOptions) => {
        toast.add({
          title,
          description,
          icon: 'i-heroicons-check-circle',
          color: 'green'
        })
      },
      
      toastError: ({ title, description }: IToastOptions) => {
        toast.add({
          title,
          description,
          icon: 'i-heroicons-exclamation-circle',
          color: 'red'
        })
      }
    }
  }