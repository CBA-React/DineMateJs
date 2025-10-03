import { startVeriffSession as startVeriffSessionApi } from "@/services/veriffService";

export const useVeriff = () => {
  const start = async () => {
    const response = await startVeriffSessionApi();
    return response;
  };

  return { startVeriffSession: start };
};