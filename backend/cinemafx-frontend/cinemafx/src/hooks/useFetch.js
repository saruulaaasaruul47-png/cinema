import { useState, useEffect, useCallback } from "react";

/**
 * useFetch — generic data fetching hook
 * @param {Function} fetchFn  — async function that returns data
 * @param {Array}    deps     — re-fetch when these change
 * @param {boolean}  immediate — fetch on mount (default true)
 */
export function useFetch(fetchFn, deps = [], immediate = true) {
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(immediate);
  const [error,   setError]   = useState(null);

  const run = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchFn();
      setData(res);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    if (immediate) run();
  }, [run, immediate]);

  return { data, loading, error, refetch: run };
}

/**
 * useMutation — POST / PUT / PATCH / DELETE actions
 */
export function useMutation(mutateFn) {
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);

  const mutate = useCallback(async (...args) => {
    setLoading(true);
    setError(null);
    try {
      const res = await mutateFn(...args);
      return res;
    } catch (e) {
      setError(e.message);
      throw e;
    } finally {
      setLoading(false);
    }
  }, [mutateFn]);

  return { mutate, loading, error };
}
