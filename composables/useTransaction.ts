import { type ITransaction } from "~/utils/interfaces/Transaction";

export const useTransaction = (transactions: Ref<ITransaction[]>) => {
  // Get transaction type e.g Income, Expense
  const transactionType = (type: string) => {
    const filteredTransaction = transactions.value.filter(
      (t) => t.type.toLowerCase() === `${type}`
    );
    return filteredTransaction;
  };
  // Calculate sum of transaction
  const transactionTotal = (transactionsType: ITransaction[]) => {
    return transactionsType.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );
  };

  const income = computed(() => transactionType("income"));
  const expense = computed(() => transactionType("expense"));
  const investments = computed(() => transactionType("investments"));
  const saving = computed(() => transactionType("saving"));

  const incomeCount = computed(() => income.value.length);
  const expenseCount = computed(() => expense.value.length);
  const investmentsCount = computed(() => investments.value.length);
  const savingCount = computed(() => saving.value.length);

  const incomeTotal = computed(() => transactionTotal(income.value));
  const expenseTotal = computed(() => transactionTotal(expense.value));
  const investmentTotal = computed(() => transactionTotal(investments.value));
  const savingTotal = computed(() => transactionTotal(saving.value));

  return {
    incomeCount,
    expenseCount,
    investmentsCount,
    savingCount,
    incomeTotal,
    expenseTotal,
    investmentTotal,
    savingTotal,
  };
};
