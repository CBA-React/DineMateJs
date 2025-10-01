import { useCallback, useEffect, useRef, useState } from "react";
import { getMatches } from "@/services/matchesService";

function stableStringify(obj) {
  if (obj == null) return "";
  const allKeys = Object.keys(obj).sort();
  return JSON.stringify(obj, allKeys);
}

export function useMatches({
  pageSize = 10,
  deps = [],
  filters,
  mapItem = (x) => ({
    id: x.id,
    full_name: x.full_name ?? x.name ?? "",
    age: x.age,
    city: x.city ?? "",
    distance: x.distance,
    interests: x.interests ?? [],
    is_verified: x.is_verified ?? false,
    is_vip: x.is_vip ?? false,
    similarity: x.similarity,
  }),
} = {}) {
  const [matches, setMatches] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const reqIdRef = useRef(0);

  const extractResults = (data) => {
    if (Array.isArray(data)) return data;
    return data?.results ?? data?.items ?? data?.data ?? data?.profiles ?? [];
  };

  const load = useCallback(
  async (start) => {
    setLoading(true);
    setError(null);
    const rid = ++reqIdRef.current;

    try {
      const raw = await getMatches(start, pageSize, filters);
      if (rid !== reqIdRef.current) return 0;

      const items = extractResults(raw).map(mapItem);

      setMatches((prev) => {
        const seen = new Set(prev.map((p) => String(p.id)));
        return [...prev, ...items.filter((p) => !seen.has(String(p.id)))];
      });

      setOffset(start + items.length);
      setHasMore(items.length >= pageSize);

      return items.length;
    } catch (e) {
      if (rid === reqIdRef.current) setError(e);
      return 0;
    } finally {
      if (rid === reqIdRef.current) setLoading(false);
    }
  },
  [pageSize, mapItem, filters]  
);

  const loadMore = useCallback(() => load(offset, filters), [load, offset, filters]);

  const reload = useCallback(async () => {
    reqIdRef.current++;
    setMatches([]);
    setOffset(0);
    setHasMore(true);
    setError(null);
    return load(0, filters); 
  }, [load, filters]);

  const depsKey = stableStringify({ deps, ...filters });
  const lastRunKeyRef = useRef(null);

  useEffect(() => {
    if (lastRunKeyRef.current === depsKey) return;
    lastRunKeyRef.current = depsKey;
    reload();
  }, [depsKey, reload]);

  return { matches, loading, error, hasMore, loadMore, reload };
}
