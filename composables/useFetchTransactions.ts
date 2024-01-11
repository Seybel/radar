import type { ITransaction, IPeriod } from "~/utils/interfaces/Transaction";

export const useFetchTransactions = (period: Ref<IPeriod>) => {
  const supabase = useSupabaseClient();
  const transactions: Ref<ITransaction[]> = ref([]);
  const pending = ref(false);

  const {
    incomeCount,
    expenseCount,
    incomeTotal,
    expenseTotal,
    investmentTotal,
    savingTotal,
  } = useTransaction(transactions);

  // Group transactions by date
  const categorizeTransactionsByDate = computed(() => {
    let dateGroup: any = {};

    transactions.value.forEach((transaction: ITransaction) => {
      let date: string = new Date(transaction?.created_at)
        .toISOString()
        .split("T")[0];
      if (!dateGroup[date]) {
        dateGroup[date] = [];
      }

      dateGroup[date].push(transaction);
    });

    return dateGroup;
  });
  // Fetch Transactions
  const fetchTransactions = async () => {
    pending.value = true;
    const isAllTime = Object.values(period.value).some(value => value === "ALL_TIME");

    const formatDateStr = (date: Date | string): string => {
      if (date instanceof Date) {
        return date.toDateString();
      } else {
        return `date-${Math.random()}`;
      }
    };

    try {
      const { data  } = await useAsyncData<ITransaction[]>(
        `transactions-${formatDateStr(period.value.from)}-${formatDateStr(period.value.to)}`,
        async () => {
          if(isAllTime) {
            const { data, error } = await supabase
              .from("transactions")
              .select()
              .order("created_at", { ascending: false });

              if (error) return [];
              return data;
          } else {
            const { data, error } = await supabase
              .from("transactions")
              .select()
              .gte("created_at", formatDateStr(period.value.from))
              .lte("created_at",formatDateStr(period.value.to))
              .order("created_at", { ascending: false });

              if (error) return [];
              return data;
          }
        }
      );

      return data.value as ITransaction[];
    } finally {
      pending.value = false;
    }
  };

  const refresh = async () => (transactions.value = await fetchTransactions());

  watch(
    period,
    async () => await refresh(),
  );

  return {
    transactions: {
      all: transactions,
      grouped: {
        byDate: categorizeTransactionsByDate,
      },
      incomeCount,
      expenseCount,
      incomeTotal,
      expenseTotal,
      investmentTotal,
      savingTotal,
    },
    pending,
    refreshTransactions: refresh,
  };
};
